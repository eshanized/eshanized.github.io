export interface Publication {
  id: string;
  title: string;
  platform: string;
  publishedDate: string;
  url: string;
  description: string;
  tags: string[];
  readingTimeMinutes?: number;
}

export const publications: Publication[] = [
  {
    id: 'snigdha-os-decentralize',
    title: 'Introducing Snigdha OS Decentralize: A Privacy-First Arch Linux Operating System',
    platform: 'DEV Community',
    publishedDate: '2026-11-14',
    url: 'https://dev.to/snigdhaos/introducing-snigdha-os-decentralize-a-privacy-first-arch-linux-operating-system-45a4',
    description:
      'What if your operating system was designed to forget by default? Examining memory-first, decentralized Arch Linux system architecture and ephemeral state management.',
    tags: ['Linux', 'Open Source', 'Privacy', 'Arch Linux'],
    readingTimeMinutes: 9,
  },
  {
    id: 'autonomous-ai-engineer-rust',
    title: "I’m Building an Autonomous AI Software Engineer in Rust. Here's What Happens Beyond Code Generation.",
    platform: 'DEV Community',
    publishedDate: '2026-11-08',
    url: 'https://dev.to/eshanized/im-building-an-autonomous-ai-software-engineer-in-rust-heres-what-happens-beyond-code-generation-4bj9',
    description:
      'An AI coding agent shouldn\'t just generate code. Exploring non-bypassable policy gates, isolated compiler sandboxes, and cryptographic execution digests in M31A.',
    tags: ['AI Agents', 'Rust', 'Systems', 'Verification'],
    readingTimeMinutes: 6,
  },
  {
    id: 'introducing-snigdha-os',
    title: 'Introducing Snigdha OS: A Fresh Take on Open-Source Operating Systems',
    platform: 'DEV Community',
    publishedDate: '2024-12-01',
    url: 'https://dev.to/eshanized/introducing-snigdha-os-a-fresh-take-on-open-source-operating-systems-40dk',
    description:
      'Lightweight, customizable, and developer-friendly Arch-based Linux distribution engineered from the kernel outward.',
    tags: ['Operating Systems', 'Linux', 'Arch Linux', 'Open Source'],
    readingTimeMinutes: 3,
  },
  {
    id: 'git-conventional-commits',
    title: 'Mastering Git with Conventional Commits',
    platform: 'DEV Community',
    publishedDate: '2024-12-01',
    url: 'https://dev.to/eshanized/mastering-git-with-conventional-commits-53cm',
    description:
      'Structured commit conventions for polyrepo maintenance, semantic versioning, and automated changelogs across large developer infrastructures.',
    tags: ['Git', 'Developer Tooling', 'Infrastructure'],
    readingTimeMinutes: 4,
  },
];
