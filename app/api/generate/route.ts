// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Mapeo simple estilo -> imagen demo (usa assets que ya tienes en /public)
const STYLE_TO_IMAGE: Record<string, string[]> = {
  'fine-line': ['/angel-tattoo.png', '/flower-tattoo.png'],
  blackwork: ['/wolf-tattoo.png', '/skull-clock-tattoo.png'],
  dotwork: ['/flower-tattoo.png'],
  tribal: ['/wolf-tattoo.png'],
  default: [
    '/angel-tattoo.png',
    '/wolf-tattoo.png',
    '/flower-tattoo.png',
    '/skull-clock-tattoo.png',
  ],
};

function normalizeColors(colors: any) {
  // Mantiene tu lógica, pero simplificada
  if (typeof colors === 'string') {
    switch (colors) {
      case 'black-and-white':
      case 'bw':
        return { mode: 'bw', hex: null };
      case 'single-color':
      case 'single':
        return { mode: 'single', hex: null };
      case 'full-color':
      case 'full':
      default:
        return { mode: 'full', hex: null };
    }
  }
  // Si ya viene como objeto, lo devolvemos tal cual
  return colors ?? { mode: 'full', hex: null };
}

function pickImage(style: string) {
  const key = style?.toLowerCase?.() ?? 'default';
  const pool = STYLE_TO_IMAGE[key] ?? STYLE_TO_IMAGE.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Validación mínima
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt es requerido y debe ser string' }, { status: 400 });
    }

    if (!body.style || typeof body.style !== 'string') {
      return NextResponse.json({ error: 'Style es requerido' }, { status: 400 });
    }

    // Normalizar colores (para mantener compatibilidad)
    const normalizedColors = normalizeColors(body.colors);

    // Simula latencia de IA
    await new Promise((r) => setTimeout(r, 650));

    const url = pickImage(body.style);
    const id = `demo_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    // Respuesta compatible con el frontend
    return NextResponse.json({
      id,
      url,
      // Si quieres, podemos incluir metadata extra sin romper
      // prompt: body.prompt.trim(),
      // style: body.style,
      // colors: normalizedColors,
      // public: body.source === "landing",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Error interno del servidor' },
      { status: 500 },
    );
  }
}
