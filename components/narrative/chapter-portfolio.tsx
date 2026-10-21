'use client';

import { Reveal } from '@/components/motion/reveal';
import {
  portfolioProjects,
  flagshipProjects,
  statusLabels,
  statusColors,
} from '@/content/projects';
import {
  CodeReviewDAG,
  SLMTraining,
  MCPComposition,
  DistributedCompute,
  ParallelRuntime,
  DependencyGraph,
  MultiGitSync,
} from '@/components/projects/visuals';
import { ExternalLink, Package, ArrowUpRight, Sparkles } from 'lucide-react';
import { CratesShowcase } from '@/components/exhibits/crates-showcase';
import type { ReactNode } from 'react';

const visualMap: Record<string, (props: { className?: string }) => ReactNode> = {
  'distributed-compute': DistributedCompute,
  'parallel-runtime': ParallelRuntime,
  'dependency-graph': DependencyGraph,
  multigit: MultiGitSync,
  'code-review': CodeReviewDAG,
  slm: SLMTraining,
  mcp: MCPComposition,
};

const polaris = flagshipProjects.find((p) => p.id === 'polaris');

export function ChapterPortfolio() {
  return (
    <section
      id="portfolio"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 border-t border-hairline bg-background-elevated/30"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-6xl mx-auto w-full space-y-20">
        {/* Chapter Header */}
        <div>
          <Reveal>
            <div className="flex items-center gap-2.5 mb-12">
              <span className="w-2 h-2 rounded-full bg-coral-500" />
              <span className="chapter-label">06 — Distributed Systems & Open Source</span>
            </div>
          </Reveal>

          <Reveal>
            <h2
              id="portfolio-heading"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance"
            >
              Distributed runtimes &amp;
              <br />
              <span className="text-gradient-coral">open-source tooling.</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="text-lg text-foreground-muted leading-relaxed max-w-3xl text-pretty">
              Beyond single-node runtimes, engineering at scale demands distributed
              coordination, lock-free parallelism, and rigorous developer tooling.
              Here is the broader ecosystem of crates, libraries, and utilities built in the open.
            </p>
          </Reveal>
        </div>

        {/* Polaris Flagship Spotlight if present */}
        {polaris && (
          <Reveal delay={2}>
            <div className="border border-border/80 rounded-2xl bg-card p-6 md:p-8 hover:border-coral-500/40 transition-all duration-300">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-secondary text-coral-400 font-semibold">
                      Featured Distributed System
                    </span>
                    <span className={`font-mono text-xs ${statusColors[polaris.status]}`}>
                      {statusLabels[polaris.status]} on crates.io
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {polaris.name}
                  </h3>

                  <p className="font-mono text-sm text-coral-400">
                    {polaris.tagline}
                  </p>

                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {polaris.description}
                  </p>

                  <div className="space-y-2 text-xs text-foreground-muted/90">
                    {polaris.narrative.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {polaris.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[10px] font-mono text-foreground-muted border border-border rounded bg-secondary/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-3">
                    {polaris.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-xs font-mono text-coral-400 hover:text-coral-300 transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 border border-border/60 rounded-xl bg-background-elevated p-4 overflow-x-auto">
                  <DistributedCompute className="w-full min-w-[340px] h-auto" />
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Interactive Exhibit: Crates.io Registry Showcase */}
        <Reveal delay={2}>
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                <span className="font-mono text-xs uppercase tracking-wider text-coral-400 font-semibold">
                  Exhibit 02 · Crates.io Registry &amp; Package Ecosystem
                </span>
              </div>
              <span className="font-mono text-[11px] text-foreground-subtle hidden sm:inline">
                Published Rust Crates &amp; Developer Tooling
              </span>
            </div>

            <CratesShowcase />
          </div>
        </Reveal>

        {/* Broader Projects Stream */}
        <div className="space-y-16 pt-8">
          <div className="border-b border-border/80 pb-4">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Engineering Systems &amp; Tooling
            </h3>
            <p className="text-xs font-mono text-foreground-subtle mt-1">
              Deterministic AST parsing, work-stealing scheduling, multi-remote Git synchronization
            </p>
          </div>

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

                      <h4 className="font-display text-2xl md:text-3xl font-bold">
                        {project.name}
                      </h4>

                      <p className="font-mono text-sm text-coral-400">
                        {project.tagline}
                      </p>

                      <p className="text-sm text-foreground-muted leading-relaxed text-pretty">
                        {project.description}
                      </p>

                      <div className="space-y-2">
                        {project.narrative.map((n, idx) => (
                          <p key={idx} className="text-xs text-foreground-muted/80 leading-relaxed">
                            {n}
                          </p>
                        ))}
                      </div>

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
      </div>
    </section>
  );
}
