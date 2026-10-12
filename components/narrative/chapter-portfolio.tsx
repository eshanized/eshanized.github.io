import { Reveal } from '@/components/motion/reveal';
import {
  portfolioProjects,
  statusLabels,
  statusColors,
} from '@/content/projects';
import {
  CodeReviewDAG,
  SLMTraining,
  MCPComposition,
} from '@/components/projects/visuals';
import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

const visualMap: Record<string, (props: { className?: string }) => ReactNode> = {
  'code-review': CodeReviewDAG,
  slm: SLMTraining,
  mcp: MCPComposition,
};

export function ChapterPortfolio() {
  return (
    <section
      id="portfolio"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline bg-background-elevated/30"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-2 h-2 rounded-full bg-coral-500" />
            <span className="chapter-label">06 — The Broader Portfolio</span>
          </div>
        </Reveal>

        <Reveal>
          <h2
            id="portfolio-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance"
          >
            Beyond the flagships.
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <p className="text-lg text-foreground-muted leading-relaxed mb-16 max-w-2xl text-pretty">
            A curated selection of other engineering work — each addressing a
            real problem in the developer infrastructure and AI tooling space.
          </p>
        </Reveal>

        {/* Projects as alternating editorial layouts */}
        <div className="space-y-20">
          {portfolioProjects.map((project, i) => {
            const Visual = visualMap[project.visual.type];
            const isReversed = i % 2 === 1;

            return (
              <Reveal key={project.id}>
                <article
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    isReversed ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Text */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-foreground-subtle">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-mono text-xs ${statusColors[project.status]}`}
                      >
                        {statusLabels[project.status]}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-bold">
                      {project.name}
                    </h3>

                    <p className="font-mono text-sm text-coral-400">
                      {project.tagline}
                    </p>

                    <p className="text-sm text-foreground-muted leading-relaxed text-pretty">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] font-mono text-foreground-muted border border-border rounded bg-secondary/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-3">
                      {project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm text-coral-400 hover:text-coral-300 transition-colors"
                        >
                          {link.label}
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Visual */}
                  {Visual && (
                    <div className="border border-border rounded-xl bg-card p-4 overflow-x-auto">
                      <Visual className="w-full min-w-[300px] h-auto" />
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
