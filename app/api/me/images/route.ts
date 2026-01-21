import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Datos demo (pueden ser URLs de /public/* o placeholders)
const DEMO_IMAGES = [
  {
    id: 'img_001',
    url: '/angel-tattoo.png',
    prompt: 'Angel tattoo, fine line, minimal',
    style: 'fine-line',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'img_002',
    url: '/wolf-tattoo.png',
    prompt: 'Wolf tattoo, blackwork, bold',
    style: 'blackwork',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: 'img_003',
    url: '/flower-tattoo.png',
    prompt: 'Floral tattoo, delicate, dotwork',
    style: 'dotwork',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

export async function GET() {
  // Simula latencia
  await new Promise((r) => setTimeout(r, 200));

  // Mantiene el contrato: { items: [...] }
  return NextResponse.json({
    items: DEMO_IMAGES.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('id');

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    // Demo: simulamos “borrado ok” siempre, aunque el id no exista
    await new Promise((r) => setTimeout(r, 150));

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
      id: imageId,
    });
  } catch (error) {
    console.error('Delete image API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
