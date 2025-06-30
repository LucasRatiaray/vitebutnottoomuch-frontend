// Imports conditionnels pour éviter les erreurs côté client
let writeFile: typeof import('fs/promises').writeFile | undefined;
let readFile: typeof import('fs/promises').readFile | undefined;
let mkdir: typeof import('fs/promises').mkdir | undefined;
let join: typeof import('path').join | undefined;

if (typeof window === 'undefined') {
  // Côté serveur uniquement
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs/promises');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path');
  writeFile = fs.writeFile;
  readFile = fs.readFile;
  mkdir = fs.mkdir;
  join = path.join;
}
import { Site } from './types';

/**
 * Service de synchronisation automatique entre API Railway et fichiers locaux
 * Maintient un fallback toujours à jour
 */

// Constantes conditionnelles
const DATA_DIR = typeof window === 'undefined' && join ? join(process.cwd(), 'src/data') : '';
const EXPORT_FILE = typeof window === 'undefined' && join && DATA_DIR ? join(DATA_DIR, 'export.json') : '';
const META_FILE = typeof window === 'undefined' && join && DATA_DIR ? join(DATA_DIR, 'meta.json') : '';
const VERSION_FILE = typeof window === 'undefined' && join && DATA_DIR ? join(DATA_DIR, 'version.txt') : '';

export interface ExportData {
  sites: Site[];
  stats: {
    total: number;
    enriched: number;
    categories: string[];
    avgVitebutnottoomuchScore: number;
  };
  version: string;
  generated: string;
  lastUpdate: string;
}

class SyncService {
  private isUpdating = false;
  private lastCheck = 0;
  private checkInterval = 60 * 60 * 1000; // 1 heure en millisecondes
  private cache: { data: Site[]; version: string; timestamp: number } | null = null;

  /**
   * Récupère la version locale actuelle
   */
  async getLocalVersion(): Promise<string | null> {
    if (typeof window !== 'undefined') {
      // Côté client, pas d'accès aux fichiers
      return null;
    }
    
    try {
      if (!readFile) return null;
      const version = await readFile(VERSION_FILE, 'utf-8');
      return version.trim();
    } catch {
      return null;
    }
  }

  /**
   * Récupère les métadonnées locales
   */
  async getLocalMeta(): Promise<Record<string, unknown> | null> {
    if (typeof window !== 'undefined') {
      // Côté client, pas d'accès aux fichiers
      return null;
    }
    
    try {
      if (!readFile) return null;
      const metaContent = await readFile(META_FILE, 'utf-8');
      return JSON.parse(metaContent) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  /**
   * Met à jour les fichiers locaux avec les nouvelles données
   */
  async updateLocalFiles(exportData: ExportData): Promise<void> {
    if (typeof window !== 'undefined') {
      console.warn('⚠️ Mise à jour des fichiers impossible côté client');
      return;
    }
    
    if (this.isUpdating) {
      console.log('⏳ Mise à jour déjà en cours...');
      return;
    }

    try {
      this.isUpdating = true;
      console.log('📝 Mise à jour des fichiers locaux...');

      // Créer le dossier si nécessaire
      if (!mkdir || !writeFile) return;
      await mkdir(DATA_DIR, { recursive: true });

      // Mettre à jour export.json
      await writeFile(EXPORT_FILE, JSON.stringify(exportData.sites, null, 2));

      // Mettre à jour meta.json
      const metaData = {
        version: exportData.version,
        generated: exportData.generated,
        lastUpdate: exportData.lastUpdate,
        stats: exportData.stats
      };
      await writeFile(META_FILE, JSON.stringify(metaData, null, 2));

      // Mettre à jour version.txt
      await writeFile(VERSION_FILE, exportData.version);

      console.log('✅ Fichiers locaux mis à jour avec la version:', exportData.version);
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour des fichiers:', error);
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Vérifie si une mise à jour est nécessaire avec comparaison intelligente
   */
  async needsUpdate(remoteVersion: string): Promise<boolean> {
    const localVersion = await this.getLocalVersion();
    
    if (!localVersion) {
      console.log('🆕 Aucune version locale, mise à jour nécessaire');
      return true;
    }

    // Comparaison intelligente des versions timestamp
    const { compareVersions } = await import('./version');
    const comparison = compareVersions(localVersion, remoteVersion);
    
    if (comparison.needsUpdate) {
      console.log(`🔄 Mise à jour nécessaire: ${localVersion} → ${remoteVersion}`);
      if (comparison.isOlder) {
        console.log('📅 Version locale plus ancienne');
      }
    } else {
      console.log(`✅ Version locale à jour: ${localVersion}`);
      if (comparison.isNewer) {
        console.log('⚡ Version locale plus récente que le backend');
      }
    }

    return comparison.needsUpdate;
  }

  /**
   * Vérification automatique et intelligente des versions
   */
  private async shouldCheckForUpdates(): Promise<boolean> {
    const now = Date.now();
    
    // Ne vérifier que toutes les heures maximum
    if (now - this.lastCheck < this.checkInterval) {
      console.log('⏭️ Vérification récente, skip check (dernière: ' + 
        new Date(this.lastCheck).toLocaleTimeString() + ')');
      return false;
    }

    this.lastCheck = now;
    return true;
  }

  /**
   * Récupère la version distante du backend avec gestion d'erreur sécurisée
   */
  private async getRemoteVersion(): Promise<string | null> {
    try {
      const response = await fetch('/api/export');
      if (!response.ok) {
        console.warn(`⚠️ Backend API indisponible (${response.status}), utilisation fallback`);
        return null;
      }

      const data = await response.json();
      return data.data?.version || null;
    } catch (error) {
      console.warn('⚠️ Erreur réseau backend, utilisation fallback:', error instanceof Error ? error.message : 'Erreur inconnue');
      return null;
    }
  }

  /**
   * Synchronisation intelligente avec vérification de version
   */
  async syncWithBackend(): Promise<{
    success: boolean;
    source: 'api' | 'cache' | 'memory';
    version?: string;
    data: Site[];
    fromCache?: boolean;
  }> {
    // 1. Utiliser le cache en mémoire si disponible et récent
    if (this.cache && (Date.now() - this.cache.timestamp < 30 * 60 * 1000)) { // 30min
      console.log('⚡ Utilisation du cache mémoire (version: ' + this.cache.version + ')');
      return {
        success: true,
        source: 'memory',
        version: this.cache.version,
        data: this.cache.data,
        fromCache: true
      };
    }

    // 2. Vérifier s'il faut checker les mises à jour
    const shouldCheck = await this.shouldCheckForUpdates();
    
    if (!shouldCheck && this.cache) {
      console.log('📦 Utilisation du cache existant');
      return {
        success: true,
        source: 'memory',
        version: this.cache.version,
        data: this.cache.data,
        fromCache: true
      };
    }

    try {
      console.log('🔄 Vérification des mises à jour...');

      // 3. Récupérer la version distante
      const remoteVersion = await this.getRemoteVersion();
      const localVersion = await this.getLocalVersion();

      console.log(`📊 Versions - Local: ${localVersion} | Distant: ${remoteVersion}`);

      // 4. Si pas de nouvelle version, utiliser le cache local
      if (remoteVersion && localVersion && remoteVersion === localVersion) {
        console.log('✅ Versions identiques, utilisation des données locales');
        return await this.getLocalFallback();
      }

      // 5. Nouvelle version détectée, récupérer les nouvelles données
      console.log('🆕 Nouvelle version détectée, téléchargement...');
      
      const response = await fetch('/api/export');
      if (!response.ok) {
        throw new Error(`Backend API inaccessible (${response.status}): ${response.statusText}`);
      }

      const apiData = await response.json();
      if (!apiData.success || !apiData.data) {
        throw new Error('Format de données API invalide - authentification ou structure incorrecte');
      }

      const exportData: ExportData = {
        sites: apiData.data.sites || [],
        stats: apiData.data.stats || {},
        version: apiData.data.version,
        generated: apiData.data.generated,
        lastUpdate: new Date().toISOString()
      };

      // 6. Mettre à jour le cache mémoire immédiatement
      this.cache = {
        data: exportData.sites,
        version: exportData.version,
        timestamp: Date.now()
      };

      // 7. Mise à jour fichiers en arrière-plan (non-bloquant)
      if (await this.needsUpdate(exportData.version)) {
        console.log('💾 Mise à jour des fichiers en arrière-plan...');
        this.updateLocalFiles(exportData).catch(console.error);
      }

      console.log('✅ Synchronisation réussie, version:', exportData.version);

      return {
        success: true,
        source: 'api',
        version: exportData.version,
        data: exportData.sites
      };

    } catch (error) {
      console.warn('⚠️ Erreur API, fallback vers données locales:', 
        error instanceof Error ? error.message : 'Erreur inconnue');
      
      // Fallback vers les données locales
      return this.getLocalFallback();
    }
  }

  /**
   * Récupère les données locales comme fallback
   */
  async getLocalFallback(): Promise<{
    success: boolean;
    source: 'cache';
    version?: string;
    data: Site[];
    fromCache?: boolean;
  }> {
    try {
      // Charger les données statiques comme fallback
      const { default: staticData } = await import('@/data/export.json');
      const localVersion = await this.getLocalVersion();

      console.log('📁 Utilisation des données locales, version:', localVersion || 'inconnue');

      // Extraire les sites de la structure de données
      const staticSites = (staticData as { pages?: Site[] }).pages || [];

      // Mettre en cache les données statiques si pas déjà fait
      if (!this.cache) {
        this.cache = {
          data: staticSites as Site[],
          version: localVersion || 'static',
          timestamp: Date.now()
        };
      }

      return {
        success: true,
        source: 'cache',
        version: localVersion || undefined,
        data: staticSites as Site[],
        fromCache: true
      };

    } catch (error) {
      console.error('❌ Impossible de charger les données locales:', error);
      
      return {
        success: false,
        source: 'cache',
        data: [],
        fromCache: false
      };
    }
  }

  /**
   * Force une synchronisation complète
   */
  async forceSync(): Promise<void> {
    try {
      const response = await fetch('/api/export');
      if (!response.ok) return;

      const apiData = await response.json();
      if (!apiData.success) return;

      const exportData: ExportData = {
        sites: apiData.data.sites || [],
        stats: apiData.data.stats || {},
        version: apiData.data.version,
        generated: apiData.data.generated,
        lastUpdate: new Date().toISOString()
      };

      await this.updateLocalFiles(exportData);
      console.log('✅ Synchronisation forcée terminée');
    } catch (error) {
      console.error('❌ Erreur lors de la synchronisation forcée:', error);
    }
  }
}

// Instance singleton
export const syncService = new SyncService();

/**
 * Hook principal pour récupérer les sites avec auto-sync
 */
export async function getSitesWithSync(): Promise<Site[]> {
  const result = await syncService.syncWithBackend();
  return result.data;
}

/**
 * Utilitaires pour le monitoring
 */
export const sync = {
  getSites: getSitesWithSync,
  forceSync: () => syncService.forceSync(),
  getLocalVersion: () => syncService.getLocalVersion(),
  needsUpdate: (remoteVersion: string) => syncService.needsUpdate(remoteVersion),
} as const;