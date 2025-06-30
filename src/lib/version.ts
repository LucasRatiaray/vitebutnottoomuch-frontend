/**
 * Utilitaires pour la gestion des versions et synchronisation
 */

export interface VersionInfo {
  local: string | null;
  remote: string | null;
  lastCheck: number;
  needsUpdate: boolean;
}

/**
 * Compare deux versions (timestamps)
 */
export function compareVersions(local: string | null, remote: string | null): {
  needsUpdate: boolean;
  isNewer: boolean;
  isOlder: boolean;
  isDifferent: boolean;
} {
  if (!local && !remote) {
    return { needsUpdate: false, isNewer: false, isOlder: false, isDifferent: false };
  }
  
  if (!local && remote) {
    return { needsUpdate: true, isNewer: false, isOlder: true, isDifferent: true };
  }
  
  if (local && !remote) {
    return { needsUpdate: false, isNewer: true, isOlder: false, isDifferent: true };
  }
  
  if (local === remote) {
    return { needsUpdate: false, isNewer: false, isOlder: false, isDifferent: false };
  }
  
  const localTime = parseInt(local!, 10);
  const remoteTime = parseInt(remote!, 10);
  
  if (isNaN(localTime) || isNaN(remoteTime)) {
    return { needsUpdate: true, isNewer: false, isOlder: false, isDifferent: true };
  }
  
  const isNewer = localTime > remoteTime;
  const isOlder = localTime < remoteTime;
  
  return {
    needsUpdate: isOlder,
    isNewer,
    isOlder,
    isDifferent: true
  };
}

/**
 * Formate une version timestamp en date lisible
 */
export function formatVersion(version: string | null): string {
  if (!version) return 'Inconnue';
  
  const timestamp = parseInt(version, 10);
  if (isNaN(timestamp)) return version;
  
  return new Date(timestamp).toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Récupère les informations de version actuelles
 */
export async function getVersionInfo(): Promise<VersionInfo> {
  try {
    const { sync } = await import('./sync');
    const local = await sync.getLocalVersion();
    
    // Essayer de récupérer la version distante
    let remote: string | null = null;
    try {
      const response = await fetch('/api/export');
      if (response.ok) {
        const data = await response.json();
        remote = data.data?.version || null;
      }
    } catch {
      // Ignorer les erreurs de réseau
    }
    
    const comparison = compareVersions(local, remote);
    
    return {
      local,
      remote,
      lastCheck: Date.now(),
      needsUpdate: comparison.needsUpdate
    };
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des versions:', error);
    return {
      local: null,
      remote: null,
      lastCheck: Date.now(),
      needsUpdate: false
    };
  }
}

/**
 * Utilitaire pour forcer une synchronisation avec vérification
 */
export async function forceSyncIfNeeded(): Promise<{
  success: boolean;
  wasNeeded: boolean;
  versions: VersionInfo;
}> {
  const versions = await getVersionInfo();
  
  if (!versions.needsUpdate) {
    return {
      success: true,
      wasNeeded: false,
      versions
    };
  }
  
  try {
    const { sync } = await import('./sync');
    await sync.forceSync();
    
    // Récupérer les nouvelles versions après sync
    const updatedVersions = await getVersionInfo();
    
    return {
      success: true,
      wasNeeded: true,
      versions: updatedVersions
    };
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation forcée:', error);
    return {
      success: false,
      wasNeeded: true,
      versions
    };
  }
}