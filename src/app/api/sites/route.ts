import { NextResponse } from 'next/server';

/**
 * Route API sécurisée pour récupérer tous les sites
 * La clé API est stockée côté serveur et jamais exposée au client
 */
export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_API_URL;
    const apiKey = process.env.BACKEND_API_KEY;

    if (!backendUrl || !apiKey) {
      console.error('❌ Variables d\'environnement manquantes:', { 
        hasUrl: !!backendUrl, 
        hasKey: !!apiKey 
      });
      return NextResponse.json(
        { error: 'Configuration API manquante' },
        { status: 500 }
      );
    }

    console.log('📡 Récupération des sites depuis:', backendUrl);

    const response = await fetch(`${backendUrl}/pages`, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache 1h
    });

    if (!response.ok) {
      console.error('❌ Erreur backend:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des données' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Sites récupérés:', data.length || 'N/A');

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('💥 Erreur API sites:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}