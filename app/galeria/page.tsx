import GalleryClient from './client';
import { headers } from 'next/headers';

export type GalleryApiItem = {
  id: string;
  url: string;
  prompt: string;
  created_at: string;
  style: string;
  user_id?: string | null;
};

type PublicGalleryResponse = {
  items: GalleryApiItem[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isGalleryApiItem(value: unknown): value is GalleryApiItem {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'string' &&
    typeof value.url === 'string' &&
    typeof value.prompt === 'string' &&
    typeof value.created_at === 'string' &&
    typeof value.style === 'string'
  );
}

function coerceGalleryItems(value: unknown): GalleryApiItem[] {
  if (!isRecord(value)) return [];
  const items = value.items;
  if (!Array.isArray(items)) return [];
  return items.filter(isGalleryApiItem);
}

export default async function GalleryPage() {
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? (host?.includes('localhost') ? 'http' : 'https');
  const base = host
    ? `${proto}://${host}`
    : (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');

  try {
    const res = await fetch(`${base}/api/gallery/public`, { cache: 'no-store' });

    // Si el servidor respondió con error, NO intentes parsear JSON
    if (!res.ok) {
      console.error('Gallery API error:', res.status, await res.text());
      return <GalleryClient initialItems={[]} />;
    }

    const json: unknown = await res.json().catch(() => null);
    const items = coerceGalleryItems(json);

    const data: PublicGalleryResponse = { items };
    return <GalleryClient initialItems={data.items} />;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return <GalleryClient initialItems={[]} />;
  }
}
