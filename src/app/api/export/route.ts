import { NextResponse } from 'next/server';

/**
 * Route API pour récupérer l'export complet des données
 * Utilisée pour synchroniser avec le backend de façon sécurisée
 */
export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_API_URL;
    const apiKey = process.env.BACKEND_API_KEY;

    if (!backendUrl || !apiKey) {
      return NextResponse.json(
        { error: 'Configuration API manquante' },
        { status: 500 }
      );
    }

    console.log('📤 Récupération export depuis:', `${backendUrl}/export`);

    const response = await fetch(`${backendUrl}/export`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1800 }, // Cache 30min
    });

    if (!response.ok) {
      console.error('❌ Erreur export backend:', response.status);
      return NextResponse.json(
        { error: 'Erreur lors de l\'export des données' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Export récupéré, version:', data.data?.version || 'N/A');

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('💥 Erreur API export:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}