import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  // Respuesta consistente con tu versión actual
  const response = NextResponse.json({ message: 'Logged out' });

  // Borramos cookies demo (si existen)
  response.cookies.set({
    name: 'demo_session',
    value: '',
    path: '/',
    maxAge: 0,
  });

  response.cookies.set({
    name: 'demo_email',
    value: '',
    path: '/',
    maxAge: 0,
  });

  return response;
}
