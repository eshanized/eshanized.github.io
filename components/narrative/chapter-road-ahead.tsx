import { Reveal } from '@/components/motion/reveal';
import { roadAhead } from '@/content/narrative';

const statusColors: Record<string, string> = {
  Research: 'text-sky-400 border-sky-400/30 bg-sky-400/5',
  Building: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
  Ongoing: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
};

export function ChapterRoadAhead() {
  return (
    <section
      id="road-ahead"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline bg-background-elevated/30"
      aria-labelledby="road-ahead-heading"
    >
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-2 h-2 rounded-full bg-coral-500" aria-hidden="true" />
            <span className="chapter-label">08 — The Road Ahead</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <Reveal>
            <h2
              id="road-ahead-heading"
              className="font-display text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-balance"
            >
              What comes
              <br />
              <span className="text-foreground-muted">next.</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="space-y-4">
              <p className="text-base text-foreground-muted leading-relaxed text-pretty">
                Research interests and areas of active exploration. These are
                directions, not promises — none are presented as completed
                products or guaranteed capabilities.
              </p>
              <p className="text-sm font-mono text-foreground-subtle">
                Each item is clearly labeled with its actual status.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Road items */}
        <div className="space-y-0">
          {roadAhead.map((item, i) => (
            <Reveal key={item.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="group grid md:grid-cols-[1fr_auto] gap-6 py-8 border-b border-hairline last:border-0 items-start hover:bg-secondary/10 transition-colors -mx-4 px-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-coral-500/50 group-hover:text-coral-500/80 transition-colors tracking-wider">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-foreground-muted leading-relaxed text-pretty max-w-2xl">
                    {item.body}
                  </p>
                </div>

                <span
                  className={`font-mono text-xs border rounded-md px-3 py-1 whitespace-nowrap mt-2 ${
                    statusColors[item.status] ?? 'text-foreground-subtle border-border'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Visual transition */}
        <Reveal delay={3}>
          <div className="mt-16 pt-8 border-t border-hairline">
            <p className="font-display text-2xl md:text-3xl text-foreground-subtle leading-relaxed max-w-3xl text-balance">
              The work continues.
              <br />
              <span className="text-foreground/30">The story is not finished.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
