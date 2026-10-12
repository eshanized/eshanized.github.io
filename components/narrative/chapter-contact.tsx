import { Reveal } from '@/components/motion/reveal';
import { siteConfig } from '@/lib/site-config';
import { Github, FileText, Package, BookOpen, Globe, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ContactLink {
  label: string;
  url: string;
  icon: LucideIcon;
  description: string;
}

const contactLinks: ContactLink[] = [
  {
    label: 'GitHub',
    url: siteConfig.links.github,
    icon: Github,
    description: 'Source code, repositories, and open-source projects.',
  },
  {
    label: 'DEV Community',
    url: siteConfig.links.dev,
    icon: FileText,
    description: 'Technical writing and articles on systems engineering.',
  },
  {
    label: 'PyPI',
    url: siteConfig.links.pypi,
    icon: Package,
    description: 'Published Python packages.',
  },
  {
    label: 'ORCID',
    url: siteConfig.links.orcid,
    icon: BookOpen,
    description: 'Research and scholarly identifier.',
  },
  {
    label: 'crates.io',
    url: siteConfig.links.crates,
    icon: Package,
    description: 'Published Rust crates.',
  },
  {
    label: 'TIV',
    url: siteConfig.organization.url,
    icon: Globe,
    description: 'Tonmoy Infrastructure & Vision — the organization.',
  },
];

export function ChapterContact() {
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline bg-grain"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse-coral" />
            <span className="chapter-label">09 — Closing & Contact</span>
          </div>
        </Reveal>

        {/* Closing statement — callback to the opening */}
        <Reveal>
          <p className="font-mono text-sm text-coral-500 tracking-[0.2em] uppercase mb-6">
            {siteConfig.handle}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <h2
            id="contact-heading"
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8 text-balance"
          >
            Eshan Roy
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <p className="font-display text-xl md:text-2xl text-foreground-muted leading-relaxed max-w-3xl mb-4 text-balance">
            Engineering, open source, and building useful systems.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <p className="text-base text-foreground-muted/70 leading-relaxed max-w-2xl mb-16 text-pretty">
            The relationship between systems engineering and open source is
            simple: build things that can be understood, owned, and depended on.
            That is the work. That is the story.
          </p>
        </Reveal>

        {/* Contact links grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Reveal key={link.label} delay={((i + 1) % 5) as 0 | 1 | 2 | 3 | 4}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 p-5 border border-border rounded-xl bg-card hover:border-coral-500/30 hover:bg-secondary/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-5 h-5 text-foreground-muted group-hover:text-coral-400 transition-colors" />
                    <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-coral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <span className="font-display text-base font-semibold text-foreground">
                    {link.label}
                  </span>
                  <span className="text-xs text-foreground-muted leading-relaxed">
                    {link.description}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Footer */}
        <Reveal delay={3}>
          <footer className="pt-8 border-t border-hairline">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                <span className="font-mono text-xs text-foreground-subtle">
                  {siteConfig.name} · {siteConfig.handle}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-foreground-subtle">
                  &copy; {year} {siteConfig.name}
                </span>
                <a
                  href={siteConfig.organization.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-foreground-subtle hover:text-coral-400 transition-colors"
                >
                  {siteConfig.organization.shortName}
                </a>
              </div>
            </div>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
