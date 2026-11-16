import { identity, CANONICAL_ORIGIN } from './identity';

export const siteConfig = {
  name: identity.name,
  handle: identity.alternateName,
  tagline: `${identity.primaryRole} · ${identity.organization.name}`,
  description: identity.biography,
  shortDescription: identity.shortDescription,
  positioning: identity.positioning,
  url: CANONICAL_ORIGIN,
  canonicalUrl: identity.canonicalUrl,
  ogImage: identity.images.openGraphCard.url,
  avatarImage: identity.images.avatar,
  organization: {
    name: identity.organization.name,
    url: identity.organization.url,
    shortName: identity.organization.shortName,
    canonicalId: identity.organization.canonicalId,
    role: identity.organization.role,
  },
  location: 'India',
  links: {
    github: identity.profiles.github.url,
    gitlab: identity.profiles.gitlab.url,
    dev: identity.profiles.dev.url,
    pypi: identity.profiles.pypi.url,
    orcid: identity.profiles.orcid.url,
    crates: identity.profiles.crates.url,
    website: identity.canonicalUrl,
    about: identity.profiles.aboutMe.url,
    x: identity.profiles.x.url,
  },
  projects: {
    m31a: {
      repo: 'https://github.com/eshanized/M31A',
      site: 'https://m31a.tonmoyinfrastructure.org',
    },
    snigdha: {
      githubOrg: 'https://github.com/Snigdha-OS',
      gitlabOrg: 'https://gitlab.com/SnigdhaOS',
    },
    polaris: {
      crate: 'https://crates.io/crates/eshanized-polaris',
      repo: 'https://github.com/eshanized/polaris',
    },
    veda: {
      repo: 'https://github.com/TIVerse/veda-rs',
    },
    depInsight: {
      repo: 'https://github.com/TIVerse/dep-insight',
    },
    multigit: {
      repo: 'https://github.com/TIVerse/multigit',
    },
  },
};

export type SiteConfig = typeof siteConfig;
