export const siteConfig = {
  name: 'Eshan Roy',
  handle: 'eshanized',
  tagline: 'Systems Engineer · Distributed Infrastructure Architect · Open-Source Founder',
  description:
    'Eshan Roy, known as eshanized, builds systems software, distributed runtimes, and autonomous engineering infrastructure. Founder of Tonmoy Infrastructure & Vision (TIV) and lead maintainer of Snigdha OS.',
  positioning: 'I build systems that help software do more.',
  url: 'https://eshanized.is-a.dev',
  ogImage: '/og-image.png',
  organization: {
    name: 'Tonmoy Infrastructure & Vision',
    url: 'https://tonmoyinfrastructure.org',
    shortName: 'TIV',
  },
  location: 'India',
  links: {
    github: 'https://github.com/eshanized',
    dev: 'https://dev.to/eshanized',
    pypi: 'https://pypi.org/user/eshanized/',
    orcid: 'https://orcid.org/0009-0007-1261-6805',
    crates: 'https://crates.io/users/eshanized',
    website: 'https://eshanized.is-a.dev/',
    about: 'https://about.me/eshanized',
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
