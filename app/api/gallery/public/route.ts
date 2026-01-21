import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MOCK_PUBLIC_TATTOOS = [
  {
    id: 'public-1',
    prompt: 'Japanese dragon tattoo',
    style: 'japanese',
    url: '/skull-clock-tattoo.png',
    created_at: new Date().toISOString(),
  },
  {
    id: 'public-2',
    prompt: 'Blackwork angel tattoo',
    style: 'blackwork',
    url: '/angel-tattoo.png',
    created_at: new Date().toISOString(),
  },
  {
    id: 'public-3',
    prompt: 'Geometric wolf tattoo',
    style: 'geometric',
    url: '/wolf-tattoo.png',
    created_at: new Date().toISOString(),
  },
  {
    id: 'public-4',
    prompt: 'Fine line flower tattoo',
    style: 'fineline',
    url: '/flower-tattoo.png',
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  // Simular latencia
  await new Promise((r) => setTimeout(r, 150));

  return NextResponse.json({
    items: MOCK_PUBLIC_TATTOOS,
  });
}
