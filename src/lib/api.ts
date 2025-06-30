import { Site } from './types';

/**
 * Service API centralisé pour communiquer avec le backend de façon sécurisée
 * Toutes les clés API sont gérées côté serveur via les routes API Next.js
 */

const API_BASE = '/api'; // Routes API Next.js locales (sécurisées)

class ApiService {
  /**
   * Récupère tous les sites depuis le backend via l'API Next.js
   */
  async fetchSites(): Promise<Site[]> {
    try {
      console.log('📡 Récupération des sites...');
      
      const response = await fetch(`${API_BASE}/sites`, {
        next: { revalidate: 3600 }, // Cache 1h
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Sites récupérés:', data.length);
      
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des sites:', error);
      throw new Error('Impossible de récupérer les sites');
    }
  }

  /**
   * Récupère l'export complet des données
   */
  async fetchExport(): Promise<{
    success: boolean;
    data: {
      version: string;
      generated: string;
      pages: number;
      sites: Site[];
    };
  }> {
    try {
      console.log('📤 Récupération de l\'export...');
      
      const response = await fetch(`${API_BASE}/export`, {
        next: { revalidate: 1800 }, // Cache 30min
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Export récupéré, version:', data.data?.version);
      
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'export:', error);
      throw new Error('Impossible de récupérer l\'export');
    }
  }

  /**
   * Vérifie la santé du système (frontend + backend)
   */
  async checkHealth(): Promise<{
    status: string;
    frontend: string;
    backend: string;
    timestamp: string;
  }> {
    try {
      const response = await fetch(`${API_BASE}/health`, {
        next: { revalidate: 60 }, // Cache 1min
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('🏥 Health check:', data.status);
      
      return data;
    } catch (error) {
      console.error('❌ Erreur health check:', error);
      return {
        status: 'error',
        frontend: 'ok',
        backend: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Mode hybride intelligent avec auto-sync du fallback
   * Récupère automatiquement les données depuis l'API ou fallback vers le statique
   */
  async fetchSitesWithSync(): Promise<Site[]> {
    try {
      const { getSitesWithSync } = await import('./sync');
      const sites = await getSitesWithSync();
      
      if (sites.length === 0) {
        console.warn('⚠️ Aucune donnée récupérée, fallback vers données statiques');
        const { getAllSites } = await import('./data');
        return await getAllSites();
      }
      
      return sites;
    } catch (error) {
      console.error('❌ Erreur mode hybride:', error);
      console.log('🔄 Fallback vers données statiques');
      const { getAllSites } = await import('./data');
      return await getAllSites();
    }
  }
}

// Instance singleton du service API
export const apiService = new ApiService();

/**
 * Hooks et utilitaires pour l'utilisation dans les composants
 */
export const api = {
  sites: {
    getAll: () => apiService.fetchSitesWithSync(),
    getAllFromApi: () => apiService.fetchSites(),
    getAllStatic: async () => {
      const { getAllSites } = await import('./data');
      return getAllSites();
    },
  },
  export: {
    getFull: () => apiService.fetchExport(),
  },
  health: {
    check: () => apiService.checkHealth(),
  },
  sync: {
    forceSync: async () => {
      const { sync } = await import('./sync');
      return sync.forceSync();
    },
    getLocalVersion: async () => {
      const { sync } = await import('./sync');
      return sync.getLocalVersion();
    },
    getVersionInfo: async () => {
      const { getVersionInfo } = await import('./version');
      return getVersionInfo();
    },
    forceSyncIfNeeded: async () => {
      const { forceSyncIfNeeded } = await import('./version');
      return forceSyncIfNeeded();
    },
  },
} as const;