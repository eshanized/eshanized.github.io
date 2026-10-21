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
    type:
      | 'agent-pipeline'
      | 'linux-system'
      | 'distributed-compute'
      | 'parallel-runtime'
      | 'dependency-graph'
      | 'code-review'
      | 'slm'
      | 'mcp'
      | 'multigit';
    accent: string;
  };
}

export interface CratePackage {
  name: string;
  version: string;
  description: string;
  installCommand: string;
  cratesUrl: string;
  docsUrl: string;
  repoUrl: string;
  category: 'Distributed Systems' | 'Concurrency' | 'Developer Tooling';
}

export const flagshipProjects: Project[] = [
  {
    id: 'm31a',
    name: 'M31A',
    tagline: 'Autonomous coding-agent runtime',
    description:
      'A Rust-native autonomous software-engineering runtime with non-bypassable policy gates and verifiable execution. The model proposes actions; the runtime decides what is allowed to happen.',
    status: 'active',
    technologies: ['Rust', 'TUI', 'LLMs', 'Git Internals', 'Linux cgroups v2', 'SQLite WAL'],
    links: [
      { label: 'Repository', url: 'https://github.com/eshanized/M31A' },
      { label: 'Documentation', url: 'https://m31a.tonmoyinfrastructure.org' },
    ],
    narrative: [
      'Most coding agents are chatbots with terminal access. M31A is an autonomous engineering runtime with an intelligence engine inside.',
      'A deterministic 11-stage policy gate sits between the model and every file mutation, command execution, and network request. The model never possesses ambient permissions or direct shell access.',
      'Completion is not declared — it is verified. A mission is admitted as complete only when compiler diagnostics are clean, tests pass in an isolated sandbox, and a cryptographic SHA-256 evidence digest is generated.',
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
    technologies: ['Linux Kernel', 'Arch Linux', 'Rust', 'Shell', 'PKGBUILD', 'Desktop'],
    links: [
      { label: 'GitHub Organization', url: 'https://github.com/Snigdha-OS' },
      { label: 'GitLab Organization', url: 'https://gitlab.com/SnigdhaOS' },
    ],
    narrative: [
      'Snigdha OS is a lightweight, fast, and efficient operating system built for modern developers and security analysts. It combines the speed of Arch Linux with curated system tools and hardened configurations.',
      'The ecosystem spans custom kernel tunings, desktop shell configurations, packaging via automated PKGBUILD pipelines, an interactive system assistant CLI/GUI, and developer utilities — all maintained in the open.',
      'It is more than another Linux distribution. It is an operating environment designed to combine raw hardware efficiency, total user autonomy, and a cohesive developer workflow.',
    ],
    visual: {
      type: 'linux-system',
      accent: 'coral',
    },
  },
  {
    id: 'polaris',
    name: 'Polaris',
    tagline: 'Distributed compute & orchestration framework',
    description:
      'A Rust-native distributed task orchestration engine featuring cluster state consensus, declarative procedural macros, and low-latency task scheduling across heterogeneous worker nodes.',
    status: 'released',
    technologies: ['Rust', 'Distributed Systems', 'Tokio', 'Proc Macros', 'CLI', 'RPC'],
    links: [
      { label: 'crates.io', url: 'https://crates.io/crates/eshanized-polaris' },
      { label: 'docs.rs', url: 'https://docs.rs/eshanized-polaris' },
      { label: 'Repository', url: 'https://github.com/eshanized' },
    ],
    narrative: [
      'Polaris eliminates the friction of writing distributed compute jobs in Rust. With declarative #[task] and cluster annotations, developers can turn async functions into distributed jobs with zero boilerplate.',
      'Under the hood, eshanized-polaris-core manages cluster node discovery, fault-tolerant heartbeats, dynamic load balancing, and resilient message queues.',
      'Ships with a high-performance terminal CLI (polaris) for submitting batch jobs, inspecting cluster health, and streaming distributed telemetry in real time.',
    ],
    visual: {
      type: 'distributed-compute',
      accent: 'coral',
    },
  },
];

export const portfolioProjects: Project[] = [
  {
    id: 'veda',
    name: 'Veda',
    tagline: 'High-performance Rust parallel runtime',
    description:
      'A parallel execution runtime in Rust featuring adaptive work-stealing scheduling, lock-free queues, and NUMA-aware thread affinity for compute-intensive pipelines.',
    status: 'active',
    technologies: ['Rust', 'Concurrency', 'Work-Stealing', 'Lock-Free', 'NUMA'],
    links: [
      { label: 'TIVerse', url: 'https://github.com/TIVerse/veda-rs' },
      { label: 'crates.io', url: 'https://crates.io/users/eshanized' },
    ],
    narrative: [
      'Veda is engineered for workloads where standard thread pools bottleneck on task synchronization. Its adaptive work-stealing deque minimizes thread contention and delivers microsecond-level dispatch latency.',
    ],
    visual: { type: 'parallel-runtime', accent: 'coral' },
  },
  {
    id: 'dep-insight',
    name: 'dep-insight',
    tagline: 'Rust dependency analysis & audit visualizer',
    description:
      'A developer tool for analyzing Cargo dependency trees, discovering transitive vulnerabilities, identifying duplicate crates, and visualizing crate dependency graphs directly in the terminal.',
    status: 'released',
    technologies: ['Rust', 'Cargo Metadata', 'Graph Algorithms', 'CLI', 'TUI'],
    links: [{ label: 'GitHub', url: 'https://github.com/TIVerse/dep-insight' }],
    narrative: [
      'dep-insight inspects your Cargo lockfile and metadata to pinpoint bloated transitive dependencies, version duplicates, and dependency cycle risks before your build slows down.',
    ],
    visual: { type: 'dependency-graph', accent: 'coral' },
  },
  {
    id: 'multigit',
    name: 'multigit',
    tagline: 'Multi-remote Git fleet synchronization CLI',
    description:
      'Cross-platform Git synchronization utility for developers managing repositories mirrored across GitHub, GitLab, and self-hosted remotes simultaneously.',
    status: 'released',
    technologies: ['Rust', 'Git Internals', 'Concurrency', 'CLI'],
    links: [{ label: 'GitHub', url: 'https://github.com/TIVerse/multigit' }],
    narrative: [
      'multigit orchestrates parallel push, fetch, and branch verification across multiple remote providers with conflict detection and unified status reporting.',
    ],
    visual: { type: 'multigit', accent: 'coral' },
  },
  {
    id: 'octate',
    name: 'Octate',
    tagline: 'Terminal-native AI code review CLI',
    description:
      'Combines local Tree-sitter WASM AST parsing, cross-file reference graphs, and static linter discovery with multi-stage LLM review DAGs and a two-stage critic quality gate.',
    status: 'building',
    technologies: ['Rust', 'Tree-sitter', 'WASM', 'LLMs', 'AST Parsing'],
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
      'Infrastructure for experimenting with small language models — fine-tuning, evaluation, and training pipelines built around practical ML engineering and quantization.',
    status: 'experimental',
    technologies: ['Python', 'PyTorch', 'SLMs', 'LoRA', 'Fine-tuning'],
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
      'Developer tooling built around the Model Context Protocol ecosystem, making it easier to build, test, and compose MCP-compatible tools, prompts, and integrations.',
    status: 'building',
    technologies: ['TypeScript', 'MCP', 'Developer Tools', 'Async I/O'],
    links: [{ label: 'GitHub', url: 'https://github.com/eshanized' }],
    narrative: [
      'MCP SuperAssistant is a collection of tools that make the Model Context Protocol more approachable — reducing the friction of building and composing MCP integrations.',
    ],
    visual: { type: 'mcp', accent: 'coral' },
  },
];

export const cratePackages: CratePackage[] = [
  {
    name: 'eshanized-polaris',
    version: '0.1.0',
    description:
      'Primary facade crate for the Polaris distributed compute & cluster orchestration engine in Rust.',
    installCommand: 'cargo add eshanized-polaris',
    cratesUrl: 'https://crates.io/crates/eshanized-polaris',
    docsUrl: 'https://docs.rs/eshanized-polaris',
    repoUrl: 'https://github.com/eshanized/polaris',
    category: 'Distributed Systems',
  },
  {
    name: 'eshanized-polaris-core',
    version: '0.1.0',
    description:
      'Underlying runtime, node heartbeat protocol, task queue scheduler, and networking primitives for Polaris.',
    installCommand: 'cargo add eshanized-polaris-core',
    cratesUrl: 'https://crates.io/crates/eshanized-polaris-core',
    docsUrl: 'https://docs.rs/eshanized-polaris-core',
    repoUrl: 'https://github.com/eshanized/polaris',
    category: 'Distributed Systems',
  },
  {
    name: 'eshanized-polaris-cli',
    version: '0.1.0',
    description:
      'Terminal command-line utility for managing Polaris clusters, scheduling jobs, and live telemetry streaming.',
    installCommand: 'cargo install eshanized-polaris-cli',
    cratesUrl: 'https://crates.io/crates/eshanized-polaris-cli',
    docsUrl: 'https://docs.rs/eshanized-polaris-cli',
    repoUrl: 'https://github.com/eshanized/polaris',
    category: 'Distributed Systems',
  },
  {
    name: 'veda-rs',
    version: '0.1.0',
    description:
      'High-performance parallel runtime with adaptive work-stealing scheduling and lock-free thread coordination.',
    installCommand: 'cargo add veda-rs',
    cratesUrl: 'https://crates.io/users/eshanized',
    docsUrl: 'https://docs.rs/veda-rs',
    repoUrl: 'https://github.com/TIVerse/veda-rs',
    category: 'Concurrency',
  },
  {
    name: 'dep-insight',
    version: '0.1.0',
    description:
      'Cargo dependency analysis, duplicate crate detection, and security audit visualizer for Rust workspaces.',
    installCommand: 'cargo install dep-insight',
    cratesUrl: 'https://crates.io/users/eshanized',
    docsUrl: 'https://github.com/TIVerse/dep-insight',
    repoUrl: 'https://github.com/TIVerse/dep-insight',
    category: 'Developer Tooling',
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
