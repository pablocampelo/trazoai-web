import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const planId = String(body?.planId ?? '').toLowerCase();

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }

    // En demo: no permitimos "free" como checkout (igual que tu lógica actual)
    if (planId === 'free') {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Simula latencia de Stripe
    await new Promise((r) => setTimeout(r, 350));

    // Devolvemos un sessionId falso para mantener contrato con el frontend
    const sessionId = `demo_cs_${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 10)}`;

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('Stripe checkout mock error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
