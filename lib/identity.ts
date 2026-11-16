/**
 * Centralized Canonical Identity Configuration for Eshan Roy (eshanized).
 *
 * This file serves as the single authoritative source of truth for all personal,
 * professional, organizational, and technical identity data across the application.
 * All metadata, Schema.org JSON-LD structured data, and visible identity components
 * must derive their values from this configuration.
 */

export interface ImageVariant {
  url: string;
  width: number;
  height: number;
  aspectRatio: string;
  alt: string;
  mimeType: 'image/jpeg' | 'image/png' | 'image/svg+xml';
}

export interface ProjectReference {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  repositoryUrl?: string;
  technologies: string[];
}

export interface VerifiedProfile {
  platform: string;
  url: string;
  username: string;
  verified: boolean;
  notes?: string;
}

export const CANONICAL_ORIGIN = 'https://eshanized.is-a.dev';
export const CANONICAL_PERSON_ID = `${CANONICAL_ORIGIN}/#person`;
export const CANONICAL_WEBSITE_ID = `${CANONICAL_ORIGIN}/#website`;
export const CANONICAL_PROFILE_PAGE_ID = `${CANONICAL_ORIGIN}/about#profilepage`;
export const CANONICAL_ORGANIZATION_ID = 'https://tonmoyinfrastructure.org/#organization';

export const identity = {
  // Individual Identity
  name: 'Eshan Roy',
  alternateName: 'eshanized',
  handle: 'eshanized',
  jobTitle: 'Founder & CEO, Systems Engineer',
  primaryRole: 'Founder & CEO · Systems Engineer',
  tagline: 'Founder & CEO · Systems Engineer',

  // Canonical URLs
  origin: CANONICAL_ORIGIN,
  canonicalUrl: `${CANONICAL_ORIGIN}/`,

  // Approved Biography
  biography:
    'Eshan Roy, known professionally as eshanized, is a technology entrepreneur, systems engineer, and Founder & CEO of Tonmoy Infrastructure & Vision. His work focuses on building operating systems, autonomous AI engineering systems, developer infrastructure, and open-source software.',

  // Approved Short Description
  shortDescription:
    'A technology entrepreneur building operating systems, autonomous AI engineering systems, developer infrastructure and open-source software.',

  // Extended Positioning (used in monograph and visual identity)
  positioning: 'I build systems that help software do more.',

  // Focus & Areas of Knowledge (Schema.org knowsAbout)
  knowsAbout: [
    'Operating systems engineering',
    'Autonomous AI engineering systems',
    'Developer infrastructure',
    'Open-source software',
    'Distributed systems',
  ] as const,

  // Photographic & Graphical Identity
  images: {
    avatar: '/images/eshan-roy.jpg',
    portraitSquare: {
      url: '/images/eshan-roy-1x1.jpg',
      width: 800,
      height: 800,
      aspectRatio: '1:1',
      alt: 'Eshan Roy (eshanized) — Systems Engineer and Founder & CEO',
      mimeType: 'image/jpeg',
    } as ImageVariant,
    portraitThreeByFour: {
      url: '/images/eshan-roy-3x4.jpg',
      width: 600,
      height: 800,
      aspectRatio: '3:4',
      alt: 'Eshan Roy (eshanized) — 3:4 portrait',
      mimeType: 'image/jpeg',
    } as ImageVariant,
    landscapeWide: {
      url: '/images/eshan-roy-16x9.jpg',
      width: 1200,
      height: 675,
      aspectRatio: '16:9',
      alt: 'Eshan Roy (eshanized) — 16:9 landscape representation',
      mimeType: 'image/jpeg',
    } as ImageVariant,
    openGraphCard: {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      aspectRatio: '1.91:1',
      alt: 'Eshan Roy (eshanized) — Founder & CEO, Systems Engineer',
      mimeType: 'image/png',
    } as ImageVariant,
  },

  // Company Identity
  organization: {
    name: 'Tonmoy Infrastructure & Vision',
    legalName: 'Tonmoy Infrastructure & Vision',
    shortName: 'TIV',
    url: 'https://tonmoyinfrastructure.org',
    canonicalId: CANONICAL_ORGANIZATION_ID,
    role: 'Founder & CEO',
    description:
      'Engineers sovereign software platforms, verifiable runtimes, and distributed architecture.',
  },

  // Verified External Profiles
  profiles: {
    github: {
      platform: 'GitHub',
      url: 'https://github.com/eshanized',
      username: 'eshanized',
      verified: true,
      notes: 'Authoritative code repository and organization lead',
    },
    gitlab: {
      platform: 'GitLab',
      url: 'https://gitlab.com/eshanized',
      username: 'eshanized',
      verified: true,
      notes: 'Secondary code repository; verified via GitLab API',
    },
    dev: {
      platform: 'DEV Community',
      url: 'https://dev.to/eshanized',
      username: 'eshanized',
      verified: true,
      notes: 'Authoritative technical writing on operating systems and autonomous agents',
    },
    aboutMe: {
      platform: 'About.me',
      url: 'https://about.me/eshanized',
      username: 'eshanized',
      verified: true,
      notes: 'Verified biographical landing profile',
    },
    crates: {
      platform: 'crates.io',
      url: 'https://crates.io/users/eshanized',
      username: 'eshanized',
      verified: true,
      notes: 'Published Rust crates and libraries',
    },
    orcid: {
      platform: 'ORCID',
      url: 'https://orcid.org/0009-0007-1261-6805',
      username: '0009-0007-1261-6805',
      verified: true,
      notes: 'Persistent digital identifier for research and technical scholarship',
    },
    pypi: {
      platform: 'PyPI',
      url: 'https://pypi.org/user/eshanized/',
      username: 'eshanized',
      verified: true,
      notes: 'Published Python packages',
    },
    x: {
      platform: 'X',
      url: 'https://x.com/eshanized',
      username: 'eshanized',
      verified: true,
      notes: 'Public professional handle referenced across GitHub and ORCID',
    },
  } as Record<string, VerifiedProfile>,

  // Canonical Major Projects
  projects: [
    {
      id: 'snigdha-os',
      name: 'Snigdha OS',
      tagline: 'Arch-based Linux distribution ecosystem',
      description:
        'An Arch-based Linux distribution focused on an efficient desktop experience, system tooling, package management, and developer utilities.',
      url: 'https://github.com/Snigdha-OS',
      repositoryUrl: 'https://github.com/Snigdha-OS',
      technologies: ['Linux Kernel', 'Arch Linux', 'Rust', 'Shell', 'PKGBUILD'],
    },
    {
      id: 'm31a',
      name: 'M31A',
      tagline: 'Autonomous coding-agent runtime with verifiable policy gates',
      description:
        'A Rust-native autonomous software-engineering runtime with non-bypassable policy gates and verifiable execution.',
      url: 'https://m31a.tonmoyinfrastructure.org',
      repositoryUrl: 'https://github.com/eshanized/M31A',
      technologies: ['Rust', 'TUI', 'LLMs', 'Git Internals', 'Linux cgroups v2', 'SQLite WAL'],
    },
    {
      id: 'polaris',
      name: 'Polaris',
      tagline: 'Distributed compute & orchestration framework',
      description:
        'A Rust-native distributed task orchestration engine featuring cluster state consensus and procedural macros.',
      url: 'https://crates.io/crates/eshanized-polaris',
      repositoryUrl: 'https://github.com/eshanized/polaris',
      technologies: ['Rust', 'Distributed Systems', 'Tokio', 'Proc Macros', 'RPC'],
    },
    {
      id: 'veda',
      name: 'Veda',
      tagline: 'High-performance persistent key-value engine in Rust',
      description:
        'An experimental append-only log and LSM storage engine designed for predictable latency under heavy concurrent writes.',
      url: 'https://github.com/TIVerse/veda-rs',
      repositoryUrl: 'https://github.com/TIVerse/veda-rs',
      technologies: ['Rust', 'LSM-Tree', 'Zero-Copy I/O', 'Concurrency'],
    },
    {
      id: 'dep-insight',
      name: 'Dep Insight',
      tagline: 'Static dependency vulnerability and license topology analyzer',
      description:
        'Multi-ecosystem dependency graph generator detecting transitive security vulnerabilities, duplicate packages, and license incompatibilities.',
      url: 'https://github.com/TIVerse/dep-insight',
      repositoryUrl: 'https://github.com/TIVerse/dep-insight',
      technologies: ['Rust', 'AST Analysis', 'Graph Theory', 'CLI'],
    },
    {
      id: 'multigit',
      name: 'MultiGit',
      tagline: 'Multi-repository orchestration and synchronizer for polyrepo architectures',
      description:
        'Cross-repository git state synchronizer managing branch topologies, pull-request matrices, and commit signing across hundreds of repositories.',
      url: 'https://github.com/TIVerse/multigit',
      repositoryUrl: 'https://github.com/TIVerse/multigit',
      technologies: ['Go', 'Git Wire Protocol', 'Concurrency', 'CLI'],
    },
  ] as ProjectReference[],
} as const;

/**
 * Array of verified external URLs for Schema.org sameAs.
 * Strictly verified candidates only.
 */
export const VERIFIED_SAME_AS_URLS: readonly string[] = [
  identity.profiles.github.url,
  identity.profiles.gitlab.url,
  identity.profiles.dev.url,
  identity.profiles.aboutMe.url,
  identity.profiles.crates.url,
  identity.profiles.orcid.url,
  identity.profiles.pypi.url,
  identity.profiles.x.url,
];

/**
 * Formats a canonical URL with consistent host, protocol, and trailing slash handling.
 */
export function getCanonicalUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') {
    return `${CANONICAL_ORIGIN}/`;
  }
  // Strip trailing slash for sub-paths to maintain deterministic consistency
  const trimmed = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
  return `${CANONICAL_ORIGIN}${trimmed}`;
}

/**
 * Validates that an identity URL is secure (HTTPS) and syntactically valid.
 */
export function validateSecureUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Safe JSON serializer for embedding JSON-LD in HTML script tags.
 * Escapes closing script tags and HTML-special characters to prevent XSS / parser hijacking.
 */
export function serializeJsonLd(data: unknown): string {
  const jsonString = JSON.stringify(data);
  return jsonString
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export type Identity = typeof identity;
