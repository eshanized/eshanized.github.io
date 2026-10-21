export interface Chapter {
  id: string;
  number: string;
  title: string;
}

export const chapters: Chapter[] = [
  { id: 'introduction', number: '01', title: 'The Introduction' },
  { id: 'mindset', number: '02', title: 'The Engineering Mindset' },
  { id: 'ideas-to-systems', number: '03', title: 'From Ideas to Systems' },
  { id: 'm31a', number: '04', title: 'M31A & Verifiable Agents' },
  { id: 'snigdha-os', number: '05', title: 'Snigdha OS & Linux' },
  { id: 'portfolio', number: '06', title: 'Distributed Systems & Open Source' },
  { id: 'philosophy', number: '07', title: 'Engineering Philosophy' },
  { id: 'road-ahead', number: '08', title: 'The Road Ahead' },
  { id: 'contact', number: '09', title: 'Closing & Contact' },
];

export const philosophyPrinciples = [
  {
    title: 'Architecture supports maintainability',
    body: 'Systems should be designed so that the next person to touch the code — including your future self — can reason about them without spelunking through layers of indirection.',
  },
  {
    title: 'Reliability is verified, not asserted',
    body: 'A model declaring success is not proof. Completion requires empirical evidence: clean compilers, passing tests, and verifiable digests. Claims are rejected until proven.',
  },
  {
    title: 'Developer experience is system design',
    body: 'The ergonomics of a tool — its installation, its interface, its error messages — are not polish applied at the end. They are architectural decisions made from the first commit.',
  },
  {
    title: 'Open source should be useful and understandable',
    body: 'Shipping code in the open is not the same as making it accessible. Documentation, structure, and honest status labels matter as much as the implementation itself.',
  },
  {
    title: 'Automation needs boundaries and observability',
    body: 'Autonomous systems must fail closed. Every action should pass through non-bypassable gates, and every execution state should be observable and recoverable.',
  },
  {
    title: 'Performance improvements require measurement',
    body: 'Optimization without measurement is guessing. Improvements should be supported by data, not by intuition about what feels faster.',
  },
];

export const pipelineStages = [
  {
    label: 'Concept',
    description: 'Identify a real problem worth solving. Define the boundary between what the system should and should not do.',
  },
  {
    label: 'Architecture',
    description: 'Design the structure: module hierarchy, data flow, security boundaries, and failure modes. The shape of the system before a single line of code.',
  },
  {
    label: 'Implementation',
    description: 'Build with the architecture as the guide. Strict module ordering, typed interfaces, and no shortcuts that bypass the security boundary.',
  },
  {
    label: 'Verification',
    description: 'Prove it works. Clean compilers, passing test suites, and cryptographic evidence. No claim of success without empirical proof.',
  },
  {
    label: 'Release',
    description: 'Ship with documentation, honest status, and open source. The work is not done until someone else can understand, operate, and depend on it.',
  },
];

export const roadAhead = [
  {
    title: 'More capable autonomous coding systems',
    body: 'Exploring how autonomous agents can move beyond single-mission execution toward long-running, multi-session engineering work with stronger guarantees.',
    status: 'Research',
  },
  {
    title: 'Better developer infrastructure',
    body: 'Building the tools that sit underneath applications — code hosting, review systems, and the infrastructure that makes development reliable.',
    status: 'Building',
  },
  {
    title: 'Reliable systems tooling',
    body: 'Low-level systems work: storage engines, process confinement, and the foundations that everything else depends on.',
    status: 'Ongoing',
  },
  {
    title: 'Open-source ecosystems',
    body: 'Contributing to and maintaining open-source ecosystems that can be understood, owned, and depended on by the people who use them.',
    status: 'Ongoing',
  },
];
