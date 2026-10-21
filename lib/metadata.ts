import type { Metadata } from 'next';
import { siteConfig } from './site-config';

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  const title = overrides?.title ?? `${siteConfig.name} (${siteConfig.handle}) — Systems Engineer`;
  const description = overrides?.description ?? siteConfig.description;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
      types: {
        'text/markdown': '/index.md',
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
      url: siteConfig.url,
      siteName: `${siteConfig.name} (${siteConfig.handle})`,
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} (${siteConfig.handle}) — Systems Engineer`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: `@${siteConfig.handle}`,
      images: [siteConfig.ogImage],
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
    authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    ...overrides,
  };
}

export function createPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    jobTitle: 'Systems Engineer',
    description: siteConfig.description,
    mainEntityOfPage: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.dev,
      siteConfig.links.pypi,
      siteConfig.links.orcid,
      siteConfig.links.crates,
      siteConfig.links.about,
    ],
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      url: siteConfig.organization.url,
    },
    knowsAbout: [
      'Systems programming',
      'Linux',
      'Open source',
      'Autonomous software engineering',
      'Developer infrastructure',
      'Rust',
    ],
  };
}

export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: `${siteConfig.name} (${siteConfig.handle})`,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${siteConfig.url}/#person`,
    },
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.name,
      alternateName: siteConfig.handle,
    },
  };
}

export function createProfilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    name: `${siteConfig.name} (${siteConfig.handle}) — Systems Engineer`,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.name,
      alternateName: siteConfig.handle,
      url: siteConfig.url,
      description: siteConfig.description,
    },
  };
}
