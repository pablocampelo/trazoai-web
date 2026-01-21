import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Mock data para galería privada (dashboard)
const MOCK_TATTOOS = [
  {
    id: 'demo-1',
    prompt: 'Tribal wolf tattoo',
    style: 'tribal',
    url: '/wolf-tattoo.png',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    prompt: 'Minimalist rose tattoo',
    style: 'minimal',
    url: '/flower-tattoo.png',
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    tattoos: MOCK_TATTOOS,
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Tattoo ID is required' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    id,
  });
}
