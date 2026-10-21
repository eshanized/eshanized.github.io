'use client';

import { Reveal } from '@/components/motion/reveal';
import { AgentPipeline } from '@/components/projects/visuals';
import { flagshipProjects, statusLabels, statusColors } from '@/content/projects';
import { ExternalLink, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PolicyGateInspector } from '@/components/exhibits/policy-gate-inspector';

const m31a = flagshipProjects.find((p) => p.id === 'm31a')!;

const features = [
  {
    number: '01',
    title: '11-Stage Policy Pipeline',
    body: 'Monotonic evaluation across 10 authority layers. Layer 0 safety vetoes can never be weakened. Higher authority always overrules lower.',
  },
  {
    number: '02',
    title: 'Process Confinement',
    body: 'Linux cgroups v2 memory bounds (default 512MB RSS), POSIX rlimits, and process group supervision prevent resource starvation.',
  },
  {
    number: '03',
    title: 'Cryptographic Evidence',
    body: 'Completion requires SHA-256 evidence digests from compiler exit codes and passing unit/integration test suites. Claims are rejected until proven.',
  },
  {
    number: '04',
    title: 'Two-Phase SQLite WAL',
    body: 'Verified task checkpoints commit atomically to local SQLite WAL storage. Crash recovery verifies invariants before safely resuming.',
  },
];

export function ChapterM31A() {
  return (
    <section
      id="m31a"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline bg-background-elevated/30"
      aria-labelledby="m31a-heading"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        {/* Header */}
        <div>
          <Reveal>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-coral-500" aria-hidden="true" />
                <span className="chapter-label">04 — M31A & Verifiable Agents</span>
              </div>
              <span className={`font-mono text-xs ${statusColors[m31a.status]}`}>
                {statusLabels[m31a.status]}
              </span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <Reveal>
                <h2
                  id="m31a-heading"
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance"
                >
                  The model proposes.
                  <br />
                  <span className="text-gradient-coral">The runtime decides.</span>
                </h2>
              </Reveal>

              <Reveal delay={1}>
                <p className="text-lg text-foreground-muted leading-relaxed text-pretty">
                  {m31a.description}
                </p>
              </Reveal>

              <div className="space-y-5">
                {m31a.narrative.map((paragraph, i) => (
                  <Reveal key={i} delay={((i + 1) % 4) as 0 | 1 | 2 | 3}>
                    <p className="text-base text-foreground-muted/80 leading-relaxed text-pretty">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* Technologies */}
              <Reveal delay={2}>
                <div className="flex flex-wrap gap-2 pt-4">
                  {m31a.technologies.map((tech) => (
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
                <div className="flex flex-wrap gap-6 pt-4">
                  {m31a.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-coral-400 hover:text-coral-300 transition-colors font-medium"
                    >
                      {link.label}
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Pipeline SVG + architecture features */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal delay={1}>
                <div className="border border-border/60 rounded-xl bg-card p-4 overflow-x-auto">
                  <AgentPipeline className="w-full min-w-[360px] h-auto" />
                </div>
              </Reveal>

              {/* Architecture features as stacked cards */}
              <div className="space-y-3">
                {features.map((feature, i) => (
                  <Reveal key={feature.number} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <div className="group border border-border hover:border-coral-500/25 rounded-lg p-4 bg-card hover:bg-secondary/20 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[10px] text-coral-500/60 group-hover:text-coral-500 transition-colors">{feature.number}</span>
                        <h4 className="font-display text-sm font-semibold text-foreground">{feature.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-muted leading-relaxed pl-7">
                        {feature.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Exhibit: Policy Gate Simulator */}
        <Reveal delay={2}>
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                <span className="font-mono text-xs uppercase tracking-wider text-coral-400 font-semibold">
                  Exhibit 01 · Interactive Policy Gate Execution Simulator
                </span>
              </div>
              <span className="font-mono text-[11px] text-foreground-subtle hidden sm:inline">
                Live Invariant Verification Engine
              </span>
            </div>

            <PolicyGateInspector />
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={3}>
          <div className="pt-8 border-t border-hairline flex flex-wrap items-center gap-6">
            <a
              href={m31a.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-foreground-muted hover:text-coral-400 transition-colors"
            >
              <span className="font-display text-lg">Explore M31A on GitHub</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </a>
            {m31a.links[1] && (
              <a
                href={m31a.links[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-foreground-subtle hover:text-coral-400 transition-colors"
              >
                Documentation ↗
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
