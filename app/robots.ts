import type { MetadataRoute } from 'next';
import { CANONICAL_ORIGIN } from '@/lib/identity';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/css/', '/_next/static/media/', '/images/'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
    host: CANONICAL_ORIGIN,
  };
}
