import type { Metadata } from 'next';
import {
  identity,
  CANONICAL_ORIGIN,
  CANONICAL_PERSON_ID,
  CANONICAL_WEBSITE_ID,
  CANONICAL_ORGANIZATION_ID,
  CANONICAL_PROFILE_PAGE_ID,
  VERIFIED_SAME_AS_URLS,
  getCanonicalUrl,
  serializeJsonLd,
} from './identity';

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

/**
 * Creates standardized, search-engine-accessible metadata for any page in the application.
 */
export function createMetadata(options?: PageMetadataOptions): Metadata {
  const pagePath = options?.path ?? '/';
  const canonical = getCanonicalUrl(pagePath);
  const title = options?.title
    ? `${options.title} — ${identity.name} (${identity.alternateName})`
    : `${identity.name} (${identity.alternateName}) — ${identity.jobTitle}`;
  const description = options?.description ?? identity.shortDescription;
  const ogImageUrl = options?.ogImage ?? `${CANONICAL_ORIGIN}${identity.images.openGraphCard.url}`;

  return {
    metadataBase: new URL(CANONICAL_ORIGIN),
    title,
    description,
    alternates: {
      canonical,
      types: {
        'text/markdown': `${CANONICAL_ORIGIN}/index.md`,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical,
      siteName: `${identity.name} (${identity.alternateName})`,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: identity.images.openGraphCard.width,
          height: identity.images.openGraphCard.height,
          alt: `${identity.name} (${identity.alternateName}) — ${identity.jobTitle}`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: `@${identity.alternateName}`,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: identity.name, url: identity.profiles.github.url }],
    creator: identity.name,
    publisher: identity.name,
    themeColor: '#0d0a07',
  };
}

/**
 * Creates the canonical Schema.org Person entity.
 * Identifier: https://eshanized.is-a.dev/#person
 */
export function createPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': CANONICAL_PERSON_ID,
    name: identity.name,
    alternateName: identity.alternateName,
    url: identity.canonicalUrl,
    image: `${CANONICAL_ORIGIN}${identity.images.portraitSquare.url}`,
    jobTitle: identity.jobTitle,
    description: identity.biography,
    mainEntityOfPage: identity.canonicalUrl,
    sameAs: [...VERIFIED_SAME_AS_URLS],
    worksFor: {
      '@type': 'Organization',
      '@id': CANONICAL_ORGANIZATION_ID,
      name: identity.organization.name,
      url: identity.organization.url,
    },
    knowsAbout: [...identity.knowsAbout],
  };
}

/**
 * Creates the Schema.org Organization entity.
 * Identifier: https://tonmoyinfrastructure.org/#organization
 */
export function createOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': CANONICAL_ORGANIZATION_ID,
    name: identity.organization.name,
    url: identity.organization.url,
    founder: {
      '@type': 'Person',
      '@id': CANONICAL_PERSON_ID,
      name: identity.name,
      alternateName: identity.alternateName,
      url: identity.canonicalUrl,
    },
  };
}

/**
 * Creates the Schema.org WebSite entity.
 * Identifier: https://eshanized.is-a.dev/#website
 */
export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': CANONICAL_WEBSITE_ID,
    name: `${identity.name} (${identity.alternateName})`,
    url: identity.canonicalUrl,
    description: identity.biography,
    inLanguage: 'en-US',
    publisher: {
      '@id': CANONICAL_PERSON_ID,
    },
    author: {
      '@type': 'Person',
      '@id': CANONICAL_PERSON_ID,
      name: identity.name,
      alternateName: identity.alternateName,
    },
  };
}

/**
 * Creates the Schema.org ProfilePage entity for the dedicated biography route (/about).
 * Identifier: https://eshanized.is-a.dev/about#profilepage
 */
export function createProfilePageJsonLd() {
  const profileUrl = getCanonicalUrl('/about');
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': CANONICAL_PROFILE_PAGE_ID,
    url: profileUrl,
    name: `About ${identity.name} (${identity.alternateName}) — Biography & Leadership`,
    description: identity.biography,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': CANONICAL_WEBSITE_ID,
    },
    mainEntity: {
      '@type': 'Person',
      '@id': CANONICAL_PERSON_ID,
      name: identity.name,
      alternateName: identity.alternateName,
      url: identity.canonicalUrl,
      jobTitle: identity.jobTitle,
      description: identity.biography,
      image: `${CANONICAL_ORIGIN}${identity.images.portraitSquare.url}`,
      sameAs: [...VERIFIED_SAME_AS_URLS],
      worksFor: {
        '@type': 'Organization',
        '@id': CANONICAL_ORGANIZATION_ID,
        name: identity.organization.name,
        url: identity.organization.url,
      },
    },
  };
}

/**
 * Creates an interconnected Schema.org @graph definition for complete entity-level indexing.
 */
export function createCombinedEntityGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      createPersonJsonLd(),
      createOrganizationJsonLd(),
      createWebsiteJsonLd(),
    ],
  };
}

export { serializeJsonLd };
