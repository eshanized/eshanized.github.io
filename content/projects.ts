export type ProjectStatus = 'released' | 'active' | 'building' | 'experimental';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  links: ProjectLink[];
  narrative: string[];
  visual: {
    type: 'agent-pipeline' | 'linux-system' | 'code-review' | 'slm' | 'mcp';
    accent: string;
  };
}

export const flagshipProjects: Project[] = [
  {
    id: 'm31a',
    name: 'M31A',
    tagline: 'Autonomous coding-agent runtime',
    description:
      'A Rust-native autonomous software-engineering runtime with non-bypassable policy gates and verifiable execution. The model proposes actions; the runtime decides what is allowed to happen.',
    status: 'active',
    technologies: ['Rust', 'TUI', 'LLMs', 'Git', 'Systems', 'SQLite'],
    links: [
      { label: 'Repository', url: 'https://github.com/eshanized/M31A' },
      { label: 'Documentation', url: 'https://m31a.tonmoyinfrastructure.org' },
    ],
    narrative: [
      'Most coding agents are chatbots with terminal access. M31A is an autonomous engineering runtime with an intelligence engine inside.',
      'A deterministic 11-stage policy gate sits between the model and every file mutation, command execution, and network request. The model never possesses ambient permissions or direct shell access.',
      'Completion is not declared — it is verified. A mission is admitted as complete only when compiler diagnostics are clean, tests pass in a clean sandbox, and a cryptographic SHA-256 evidence digest is generated.',
      'Failures are treated as recoverable execution states. Two-phase atomic SQLite WAL commits preserve verified checkpoints while isolating failures, and crash recovery verifies invariants before safely resuming.',
    ],
    visual: {
      type: 'agent-pipeline',
      accent: 'coral',
    },
  },
  {
    id: 'snigdha-os',
    name: 'Snigdha OS',
    tagline: 'Arch-based Linux ecosystem',
    description:
      'An Arch-based Linux distribution focused on a cohesive desktop experience, system tooling, package management, and developer utilities. Performance meets elegance.',
    status: 'active',
    technologies: ['Linux', 'Arch', 'Rust', 'Shell', 'Desktop'],
    links: [
      { label: 'GitHub Organization', url: 'https://github.com/Snigdha-OS' },
      { label: 'GitLab Organization', url: 'https://gitlab.com/SnigdhaOS' },
    ],
    narrative: [
      'Snigdha OS is a lightweight, fast, and efficient operating system built for modern users. It combines the best aspects of traditional Linux with a focus on performance, customization, and user-centric design.',
      'The ecosystem spans system configuration, desktop experience, packaging via PKGBUILD scripts, an interactive system assistant, and developer utilities — all maintained in the open.',
      'It is more than another Linux distribution. It is a system designed to combine performance, flexibility, and a cohesive experience that respects the user.',
    ],
    visual: {
      type: 'linux-system',
      accent: 'coral',
    },
  },
];

export const portfolioProjects: Project[] = [
  {
    id: 'octate',
    name: 'Octate',
    tagline: 'Terminal-native AI code review CLI',
    description:
      'Combines local Tree-sitter WASM AST parsing, cross-file reference graphs, and static linter discovery with multi-stage LLM review DAGs and a two-stage critic quality gate.',
    status: 'building',
    technologies: ['Rust', 'Tree-sitter', 'WASM', 'LLMs'],
    links: [{ label: 'TIV', url: 'https://tonmoyinfrastructure.org' }],
    narrative: [
      'Octate brings deterministic repository intelligence together with LLM reasoning to produce code reviews that understand your codebase, not just your diff.',
    ],
    visual: { type: 'code-review', accent: 'coral' },
  },
  {
    id: 'slmgen',
    name: 'SLMGen',
    tagline: 'Small-language-model experimentation infrastructure',
    description:
      'Infrastructure for experimenting with small language models — fine-tuning, evaluation, and training pipelines built around practical ML engineering.',
    status: 'experimental',
    technologies: ['Python', 'ML', 'SLMs', 'Fine-tuning'],
    links: [{ label: 'GitHub', url: 'https://github.com/eshanized' }],
    narrative: [
      'SLMGen provides the scaffolding for experimenting with compact language models, making it practical to fine-tune, evaluate, and iterate without massive compute budgets.',
    ],
    visual: { type: 'slm', accent: 'coral' },
  },
  {
    id: 'mcp-superassistant',
    name: 'MCP SuperAssistant',
    tagline: 'Developer tooling for the Model Context Protocol',
    description:
      'Developer tooling built around the Model Context Protocol ecosystem, making it easier to build, test, and compose MCP-compatible tools and integrations.',
    status: 'building',
    technologies: ['TypeScript', 'MCP', 'Developer Tools'],
    links: [{ label: 'GitHub', url: 'https://github.com/eshanized' }],
    narrative: [
      'MCP SuperAssistant is a collection of tools that make the Model Context Protocol more approachable — reducing the friction of building and composing MCP integrations.',
    ],
    visual: { type: 'mcp', accent: 'coral' },
  },
];

export const statusLabels: Record<ProjectStatus, string> = {
  released: 'Released',
  active: 'Active',
  building: 'Building',
  experimental: 'Experimental',
};

export const statusColors: Record<ProjectStatus, string> = {
  released: 'text-emerald-400',
  active: 'text-coral-400',
  building: 'text-amber-400',
  experimental: 'text-sky-400',
};
