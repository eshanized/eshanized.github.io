import type { Metadata } from 'next';
import { siteConfig } from './site-config';

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  const title = overrides?.title ?? `${siteConfig.name} (${siteConfig.handle}) — Systems Engineer & Open-Source Builder`;
  const description = overrides?.description ?? siteConfig.description;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
    },
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
          alt: `${siteConfig.name} — ${siteConfig.handle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    jobTitle: 'Systems Engineer',
    description: siteConfig.description,
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
    name: `${siteConfig.name} (${siteConfig.handle})`,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      alternateName: siteConfig.handle,
    },
  };
}

export function createProfilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: siteConfig.name,
      alternateName: siteConfig.handle,
      url: siteConfig.url,
      description: siteConfig.description,
    },
    url: siteConfig.url,
  };
}
