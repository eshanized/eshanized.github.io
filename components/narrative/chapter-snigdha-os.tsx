import { Reveal } from '@/components/motion/reveal';
import { LinuxSystem } from '@/components/projects/visuals';
import { flagshipProjects, statusLabels, statusColors } from '@/content/projects';
import { ExternalLink } from 'lucide-react';

const snigdha = flagshipProjects.find((p) => p.id === 'snigdha-os')!;

const ecosystemAreas = [
  {
    title: 'Desktop Experience',
    body: 'A cohesive desktop built around window management, theming, and system-level configuration that respects user preferences.',
  },
  {
    title: 'Package Management',
    body: 'PKGBUILD scripts for building and packaging software, with additional repositories that extend the core Arch ecosystem.',
  },
  {
    title: 'System Assistant',
    body: 'An interactive tool designed to help users with system setup, configuration, and troubleshooting.',
  },
  {
    title: 'Developer Utilities',
    body: 'Tools and utilities integrated into the system for developers who work directly on Linux.',
  },
];

export function ChapterSnigdhaOS() {
  return (
    <section
      id="snigdha-os"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline"
      aria-labelledby="snigdha-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-coral-500" />
              <span className="chapter-label">05 — Snigdha OS</span>
            </div>
            <span className={`font-mono text-xs ${statusColors[snigdha.status]}`}>
              {statusLabels[snigdha.status]}
            </span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Visual */}
          <div className="lg:col-span-5 lg:order-2">
            <Reveal delay={1}>
              <div className="border border-border rounded-xl bg-card p-4 overflow-x-auto lg:sticky lg:top-24">
                <LinuxSystem className="w-full min-w-[400px] h-auto" />
              </div>
            </Reveal>
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-7 lg:order-1 space-y-8">
            <Reveal>
              <h2
                id="snigdha-heading"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance"
              >
                Performance × Elegance
              </h2>
            </Reveal>

            <Reveal delay={1}>
              <p className="text-lg text-foreground-muted leading-relaxed text-pretty">
                {snigdha.description}
              </p>
            </Reveal>

            <div className="space-y-5">
              {snigdha.narrative.map((paragraph, i) => (
                <Reveal key={i} delay={((i + 1) % 5) as 0 | 1 | 2 | 3 | 4}>
                  <p className="text-base text-foreground-muted/80 leading-relaxed text-pretty">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Ecosystem areas */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {ecosystemAreas.map((area, i) => (
                <Reveal key={area.title} delay={((i + 1) % 5) as 0 | 1 | 2 | 3 | 4}>
                  <div className="border border-border rounded-lg p-4 hover:border-coral-500/20 transition-colors">
                    <h4 className="font-mono text-xs text-coral-400 mb-2">
                      {area.title}
                    </h4>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {area.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Technologies */}
            <Reveal delay={2}>
              <div className="flex flex-wrap gap-2 pt-4">
                {snigdha.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono text-foreground-muted border border-border rounded-md bg-secondary/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Links */}
            <Reveal delay={3}>
              <div className="flex flex-wrap gap-4 pt-4">
                {snigdha.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-coral-400 hover:text-coral-300 transition-colors font-medium"
                  >
                    {link.label}
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
