import { Reveal } from '@/components/motion/reveal';

const traits = [
  {
    number: '01',
    title: 'Root causes, not symptoms',
    body: 'Superficial patches defer failures; they do not prevent them. The interesting engineering happens at the boundary between what a system claims to do and what it actually does under pressure.',
  },
  {
    number: '02',
    title: 'Architecture before implementation',
    body: 'The shape of a system — its modules, data flow, failure modes, and security boundaries — must be designed before code is written. Structure is cheaper to fix on a whiteboard than in production.',
  },
  {
    number: '03',
    title: 'Open infrastructure',
    body: 'Systems that can be inspected, understood, and owned produce better long-term outcomes than black boxes. Open source is not a distribution model; it is an engineering discipline.',
  },
  {
    number: '04',
    title: 'Verification over assertion',
    body: 'A model declaring success is not proof. Completion requires empirical evidence: clean compilers, passing tests, and verifiable digests. Claims are rejected until proven.',
  },
];

export function ChapterMindset() {
  return (
    <section
      id="mindset"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline"
      aria-labelledby="mindset-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-2 h-2 rounded-full bg-coral-500" aria-hidden="true" />
            <span className="chapter-label">02 — The Engineering Mindset</span>
          </div>
        </Reveal>

        {/* Opening statement */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="mindset-heading"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance"
              >
                The interesting part is always
                <br />
                <span className="text-foreground-muted">
                  the layer underneath.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={1}>
              <p className="text-lg text-foreground-muted/80 mt-8 leading-relaxed text-pretty max-w-2xl">
                My interest in computing starts not at the surface where buttons
                click and forms submit, but in the layers below: where memory is
                laid out, processes are scheduled, kernels decide what runs next,
                and one engineering decision cascades into a thousand downstream
                behaviors.
              </p>
            </Reveal>
          </div>

          {/* Aside: decorative system layers */}
          <div className="hidden lg:block lg:col-span-5">
            <Reveal delay={2}>
              <div className="relative">
                <svg
                  viewBox="0 0 280 320"
                  className="w-full h-auto opacity-80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="System layers diagram: application, runtime, OS, hardware"
                  role="img"
                >
                  {/* Layer stack */}
                  {[
                    { y: 20, label: 'Application', sublabel: 'user-facing logic', accent: false },
                    { y: 90, label: 'Runtime', sublabel: 'memory · processes', accent: false },
                    { y: 160, label: 'Operating System', sublabel: 'scheduler · syscalls', accent: true },
                    { y: 230, label: 'Hardware', sublabel: 'cpu · memory · io', accent: false },
                  ].map((layer) => (
                    <g key={layer.label}>
                      <rect
                        x="20"
                        y={layer.y}
                        width="240"
                        height="54"
                        rx="6"
                        fill={layer.accent ? 'hsl(4 82% 56% / 0.05)' : 'hsl(20 14% 6%)'}
                        stroke={layer.accent ? 'hsl(4 82% 56% / 0.4)' : 'hsl(20 10% 14%)'}
                        strokeWidth="1"
                      />
                      <text
                        x="36"
                        y={layer.y + 24}
                        fontSize="11"
                        fill={layer.accent ? 'hsl(4 80% 60%)' : 'hsl(30 20% 80%)'}
                        fontFamily="sans-serif"
                        fontWeight="500"
                      >
                        {layer.label}
                      </text>
                      <text
                        x="36"
                        y={layer.y + 40}
                        fontSize="8"
                        fill="hsl(30 8% 38%)"
                        fontFamily="monospace"
                      >
                        {layer.sublabel}
                      </text>
                      {/* Connector arrow */}
                      {layer.y < 230 && (
                        <line
                          x1="140"
                          y1={layer.y + 54}
                          x2="140"
                          y2={layer.y + 70}
                          stroke="hsl(20 10% 16%)"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                      )}
                    </g>
                  ))}

                  {/* Annotation */}
                  <text x="270" y="190" textAnchor="end" fontSize="7" fill="hsl(4 82% 56% / 0.7)" fontFamily="monospace">← curiosity lives here</text>
                </svg>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Four principles */}
        <div className="grid sm:grid-cols-2 gap-6">
          {traits.map((trait, i) => (
            <Reveal key={trait.number} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="group border border-border hover:border-coral-500/20 rounded-xl p-6 bg-card hover:bg-secondary/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-coral-500">{trait.number}</span>
                  <div className="h-px flex-1 bg-border group-hover:bg-coral-500/20 transition-colors" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {trait.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed text-pretty">
                  {trait.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
