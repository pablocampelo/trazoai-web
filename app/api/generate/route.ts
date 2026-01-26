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

type ColorMode = 'bw' | 'single' | 'full';
type ColorsNormalized = { mode: ColorMode; hex: string | null };
type ColorsInput =
  | string
  | {
      mode?: string;
      hex?: unknown;
    }
  | null
  | undefined;

type GenerateRequestBody = {
  prompt?: unknown;
  style?: unknown;
  colors?: ColorsInput;
  source?: unknown;
};

function normalizeColors(colors: ColorsInput): ColorsNormalized {
  // Mantiene tu lógica, pero tipada
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

  // Si viene como objeto, intentamos normalizar de forma segura
  if (colors && typeof colors === 'object') {
    const modeRaw = typeof colors.mode === 'string' ? colors.mode : 'full';
    const mode: ColorMode =
      modeRaw === 'bw' || modeRaw === 'black-and-white'
        ? 'bw'
        : modeRaw === 'single' || modeRaw === 'single-color'
          ? 'single'
          : 'full';

    const hex = typeof colors.hex === 'string' ? colors.hex : null;
    return { mode, hex };
  }

  return { mode: 'full', hex: null };
}

function pickImage(style: string) {
  const key = style.toLowerCase();
  const pool = STYLE_TO_IMAGE[key] ?? STYLE_TO_IMAGE.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as GenerateRequestBody;

    // Validación mínima
    const prompt = body.prompt;
    if (typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt es requerido y debe ser string' }, { status: 400 });
    }

    const style = body.style;
    if (typeof style !== 'string' || style.trim().length === 0) {
      return NextResponse.json({ error: 'Style es requerido' }, { status: 400 });
    }

    // Normalizar colores (para mantener compatibilidad)
    const normalizedColors = normalizeColors(body.colors);

    // Simula latencia de IA
    await new Promise((r) => setTimeout(r, 650));

    const url = pickImage(style);
    const id = `demo_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    // Respuesta compatible con el frontend (id + url)
    // Meter metadata extra NO rompe al cliente si no la usa.
    return NextResponse.json({
      id,
      url,
      prompt: prompt.trim(),
      style,
      colors: normalizedColors,
      source: typeof body.source === 'string' ? body.source : undefined,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
