import { Reveal } from '@/components/motion/reveal';
import { philosophyPrinciples } from '@/content/narrative';

export function ChapterPhilosophy() {
  return (
    <section
      id="philosophy"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline"
      aria-labelledby="philosophy-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-2 h-2 rounded-full bg-coral-500" aria-hidden="true" />
            <span className="chapter-label">07 — Engineering Philosophy</span>
          </div>
        </Reveal>

        {/* Opening */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <Reveal>
            <h2
              id="philosophy-heading"
              className="font-display text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-balance"
            >
              The standards
              <br />
              behind the work.
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="space-y-4">
              <p className="text-base text-foreground-muted leading-relaxed text-pretty">
                These are not aspirational values posted to a mission page. They
                are the constraints that shape every design decision — from the
                structure of a module hierarchy to the behavior of a security
                boundary under failure.
              </p>
              <p className="text-sm text-foreground-subtle leading-relaxed text-pretty">
                Good engineering is not about the number of abstractions or the
                elegance of the code. It is about whether the system does what
                it claims, continues doing it under stress, and can be
                understood by someone who was not there when it was built.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Principles as numbered editorial list */}
        <div className="space-y-0">
          {philosophyPrinciples.map((principle, i) => (
            <Reveal key={principle.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="group grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] gap-6 md:gap-10 py-8 border-b border-hairline last:border-0 hover:bg-secondary/15 transition-colors -mx-4 px-4 rounded-lg">
                {/* Number */}
                <div className="pt-1">
                  <span className="font-mono text-2xl md:text-3xl font-bold text-foreground/[0.04] group-hover:text-coral-500/15 transition-colors leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-coral-500/70 group-hover:text-coral-500 transition-colors tracking-wider">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-semibold text-foreground leading-tight">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-foreground-muted leading-relaxed text-pretty max-w-2xl">
                    {principle.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
