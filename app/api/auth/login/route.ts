import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ message: 'Email y contraseña son obligatorios' }, { status: 400 });
  }

  // Simula latencia de red (opcional pero “pro”)
  await new Promise((r) => setTimeout(r, 300));

  // Login demo: aceptamos cualquier combinación que parezca válida
  // (si quieres, podemos poner una regla tipo password.length >= 6)
  const response = NextResponse.json({ ok: true });

  // Cookie demo (útil para UI aunque ya no haya middleware)
  response.cookies.set({
    name: 'demo_session',
    value: '1',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  // También podemos guardar el email para mostrarlo en el dashboard
  response.cookies.set({
    name: 'demo_email',
    value: String(email),
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
