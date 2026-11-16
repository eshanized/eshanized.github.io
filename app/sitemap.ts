import type { MetadataRoute } from 'next';
import { identity, CANONICAL_ORIGIN } from '@/lib/identity';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a stable, deterministic date for site content updates
  const lastModified = new Date('2026-11-16T12:00:00.000Z');

  return [
    {
      url: `${CANONICAL_ORIGIN}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${CANONICAL_ORIGIN}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${CANONICAL_ORIGIN}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CANONICAL_ORIGIN}/publications`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
