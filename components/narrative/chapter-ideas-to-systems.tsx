import { Reveal } from '@/components/motion/reveal';
import { pipelineStages } from '@/content/narrative';

function PipelineDiagram() {
  const stages = pipelineStages;

  return (
    <svg
      viewBox="0 0 680 260"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Engineering pipeline: Concept → Architecture → Implementation → Verification → Release"
      role="img"
    >
      {/* Connecting track */}
      <line x1="40" y1="100" x2="640" y2="100" stroke="hsl(20 10% 12%)" strokeWidth="2" />

      {/* Coral progress track */}
      <line x1="40" y1="100" x2="640" y2="100" stroke="hsl(4 82% 56%)" strokeWidth="2" strokeDasharray="600" strokeDashoffset="600" className="animate-[dash_2.5s_ease-out_1s_forwards]" />

      {stages.map((stage, i) => {
        const x = 40 + i * 150;
        const isLast = i === stages.length - 1;

        return (
          <g key={stage.label}>
            {/* Above: stage number */}
            <text
              x={x}
              y="60"
              textAnchor="middle"
              fontSize="10"
              fill={isLast ? 'hsl(4 82% 56%)' : 'hsl(4 76% 66% / 0.6)'}
              fontFamily="monospace"
              fontWeight="600"
              letterSpacing="1"
            >
              {String(i + 1).padStart(2, '0')}
            </text>

            {/* Connector tick */}
            <line x1={x} y1="76" x2={x} y2="92" stroke="hsl(20 10% 18%)" strokeWidth="1" />

            {/* Node circle */}
            <circle
              cx={x}
              cy="100"
              r={isLast ? 11 : 7}
              fill={isLast ? 'hsl(4 82% 56%)' : 'hsl(20 14% 10%)'}
              stroke={isLast ? 'hsl(4 80% 60%)' : 'hsl(20 10% 22%)'}
              strokeWidth={isLast ? 2 : 1.5}
            />

            {/* Below: stage label */}
            <text
              x={x}
              y="132"
              textAnchor="middle"
              fontSize="12"
              fill="hsl(30 20% 80%)"
              fontFamily="sans-serif"
              fontWeight="500"
            >
              {stage.label}
            </text>

            {/* Sub-label */}
            <text
              x={x}
              y="150"
              textAnchor="middle"
              fontSize="8"
              fill="hsl(30 8% 40%)"
              fontFamily="monospace"
            >
              {['define', 'design', 'build', 'prove', 'ship'][i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ChapterIdeasToSystems() {
  return (
    <section
      id="ideas-to-systems"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline"
      aria-labelledby="ideas-heading"
    >
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-2 h-2 rounded-full bg-coral-500" aria-hidden="true" />
            <span className="chapter-label">03 — From Ideas to Systems</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <Reveal>
            <h2
              id="ideas-heading"
              className="font-display text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-balance"
            >
              How an idea
              <br />
              becomes a
              <br />
              <span className="text-foreground-muted">functioning system.</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="text-lg text-foreground-muted leading-relaxed text-pretty">
              Every project starts as a problem definition. Not a feature list —
              a clear statement of what is broken, who is affected, and what a
              correct solution would look like. That clarity drives every
              subsequent decision.
            </p>
          </Reveal>
        </div>

        {/* Pipeline diagram */}
        <Reveal delay={1}>
          <div className="mb-16 overflow-x-auto border border-border/50 rounded-xl bg-card/50 p-6">
            <div className="min-w-[500px]">
              <PipelineDiagram />
            </div>
          </div>
        </Reveal>

        {/* Stage descriptions as list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pipelineStages.map((stage, i) => (
            <Reveal key={stage.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="group space-y-2 p-4 rounded-lg hover:bg-secondary/30 transition-colors">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-mono text-[10px] text-coral-500 tracking-wider">
                    0{i + 1}
                  </span>
                  <div className="h-px flex-1 bg-border/50 group-hover:bg-coral-500/20 transition-colors" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {stage.label}
                </h3>
                <p className="text-xs text-foreground-muted leading-relaxed text-pretty">
                  {stage.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <p className="font-display text-xl md:text-2xl text-foreground-muted mt-14 leading-relaxed max-w-3xl text-balance">
            Every project that follows — M31A, Snigdha OS, and the broader
            portfolio — is built this way.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
