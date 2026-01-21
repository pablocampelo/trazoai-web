import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ message: 'Email y contraseña son obligatorios' }, { status: 400 });
  }

  // Simula latencia
  await new Promise((r) => setTimeout(r, 350));

  // Respuesta mock: mantenemos el mismo mensaje que tu versión actual
  const response = NextResponse.json({
    ok: true,
    message: 'Revisa tu correo para verificar la cuenta',
  });

  // En demo, podemos crear “sesión” automáticamente (opcional).
  // Esto ayuda a que el usuario pueda entrar al dashboard sin fricción.
  response.cookies.set({
    name: 'demo_session',
    value: '1',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

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
