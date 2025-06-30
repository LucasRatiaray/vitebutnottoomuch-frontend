import { NextResponse } from 'next/server';

/**
 * Route API pour vérifier le statut du backend
 * Permet de monitoring la santé de l'API Railway
 */
export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Configuration backend manquante',
          frontend: 'ok',
          backend: 'unknown'
        },
        { status: 500 }
      );
    }

    console.log('🏥 Health check backend:', `${backendUrl}/health`);

    const response = await fetch(`${backendUrl}/health`, {
      next: { revalidate: 60 }, // Cache 1min
    });

    const backendHealth = response.ok ? await response.json() : null;

    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      frontend: 'ok',
      backend: response.ok ? 'ok' : 'error',
      backendResponse: backendHealth,
      version: process.env.npm_package_version || '1.0.0'
    };

    console.log('✅ Health check complété:', { 
      frontend: 'ok', 
      backend: response.ok ? 'ok' : 'error' 
    });

    return NextResponse.json(healthStatus, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('💥 Erreur health check:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Erreur lors du health check',
        frontend: 'ok',
        backend: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}