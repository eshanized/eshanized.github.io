import type { Metadata } from 'next';
import { SiteHeader } from '@/components/navigation/site-header';
import { identity } from '@/lib/identity';
import { createMetadata, serializeJsonLd } from '@/lib/metadata';
import { flagshipProjects } from '@/content/projects';
import { ExternalLink, Terminal, GitBranch, Layers, CheckCircle } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Engineering Projects & Systems Portfolio',
  description:
    'Authoritative systems engineering portfolio of Eshan Roy (eshanized), spanning Snigdha OS, M31A autonomous agent runtime, Polaris, and distributed infrastructure.',
  path: '/projects',
});

export default function ProjectsPage() {
  const projectsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Engineering Projects by ${identity.name} (${identity.alternateName})`,
    description: 'Operating systems, autonomous AI agent runtimes, and distributed infrastructure projects.',
    itemListElement: identity.projects.map((proj, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: proj.name,
        description: proj.description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Linux, POSIX',
        url: proj.url,
        author: {
          '@type': 'Person',
          '@id': `${identity.origin}/#person`,
          name: identity.name,
          alternateName: identity.alternateName,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(projectsJsonLd),
        }}
      />
      <SiteHeader backToHome />

      <main className="flex-1 bg-grain py-12 md:py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto w-full space-y-12">
        <header className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse-coral" aria-hidden="true" />
            <span className="chapter-label">Verified Systems Portfolio</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Systems &amp; Open-Source Projects
          </h1>
          <p className="text-base text-foreground-muted max-w-3xl leading-relaxed">
            Engineering architectures built from first principles. Every system listed below is authored or lead-maintained
            by <span className="text-foreground font-semibold">Eshan Roy</span> (<span className="font-mono text-coral-400">eshanized</span>)
            under open-source or Tonmoy Infrastructure &amp; Vision governance.
          </p>
        </header>

        {/* Flagship Projects: Detailed Showcase */}
        <section aria-labelledby="flagship-heading" className="space-y-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-coral-500" />
            <h2 id="flagship-heading" className="font-display text-2xl font-semibold text-foreground">
              Flagship Platforms &amp; Runtimes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {flagshipProjects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-coral-500/40 transition-all shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-secondary text-coral-400 font-medium">
                      {proj.status}
                    </span>
                    <span className="font-mono text-xs text-foreground-subtle">
                      Lead Maintainer
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {proj.name}
                  </h3>
                  <p className="font-mono text-xs text-coral-500">{proj.tagline}</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    {proj.narrative.slice(0, 2).map((para, i) => (
                      <p key={i} className="text-xs text-foreground-subtle leading-normal">
                        &bull; {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/60 text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {proj.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-coral-400 hover:text-coral-300 transition-colors"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Distributed & Infrastructure Systems */}
        <section aria-labelledby="infra-heading" className="space-y-6 pt-6 border-t border-hairline">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-coral-500" />
            <h2 id="infra-heading" className="font-display text-2xl font-semibold text-foreground">
              Tonmoy Infrastructure &amp; Vision Systems
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {identity.projects.slice(3).map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-coral-500/30 transition-all"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {proj.name}
                  </h3>
                  <p className="font-mono text-xs text-coral-500 mt-0.5">{proj.tagline}</p>
                  <p className="text-xs text-foreground-muted mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] px-2 py-0.5 rounded bg-secondary/50 text-foreground-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.repositoryUrl && (
                    <a
                      href={proj.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-foreground-muted hover:text-coral-400 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
