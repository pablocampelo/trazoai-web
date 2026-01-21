import GalleryClient from './client';
import { headers } from 'next/headers';

export default async function GalleryPage() {
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? (host?.includes('localhost') ? 'http' : 'https');
  const base = host
    ? `${proto}://${host}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  try {
    const res = await fetch(`${base}/api/gallery/public`, { cache: 'no-store' });

    // ✅ Si el servidor respondió con error, NO intentes parsear JSON
    if (!res.ok) {
      console.error('Gallery API error:', res.status, await res.text());
      return <GalleryClient initialItems={[]} />;
    }

    const data = (await res.json().catch(() => null)) as any;

    return <GalleryClient initialItems={data?.items ?? []} />;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return <GalleryClient initialItems={[]} />;
  }
}
