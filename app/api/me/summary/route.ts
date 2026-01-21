import { NextRequest, NextResponse } from 'next/server';

// Tip: para demo podemos permitir elegir plan via query (?plan=pro)
// Así puedes enseñar el UI de pricing en distintos estados.
const ALLOWED_PLANS = new Set(['free', 'pro', 'ultra']);

export async function GET(req: NextRequest) {
  try {
    // Simula latencia
    await new Promise((r) => setTimeout(r, 200));

    const planParam = req.nextUrl.searchParams.get('plan')?.toLowerCase();

    // Si viene plan en query y es válido, lo devolvemos (útil para demos)
    if (planParam && ALLOWED_PLANS.has(planParam)) {
      return NextResponse.json({ plan: planParam });
    }

    // Default demo plan
    return NextResponse.json({ plan: 'free' });
  } catch (error) {
    console.error('Error in /api/me/summary', error);
    return NextResponse.json({ error: 'Internal' }, { status: 500 });
  }
}
