'use client';

import { useState } from 'react';
import { cratePackages, CratePackage } from '@/content/projects';
import { Package, Copy, Check, ExternalLink, Terminal, ArrowUpRight } from 'lucide-react';

export function CratesShowcase() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const categories = ['All', 'Distributed Systems', 'Concurrency', 'Developer Tooling'];

  const filteredCrates =
    filter === 'All'
      ? cratePackages
      : cratePackages.filter((c) => c.category === filter);

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-foreground-subtle mr-2 flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-coral-400" /> Filter Registry:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 text-xs font-mono rounded-full border transition-all ${
              filter === cat
                ? 'bg-coral-500/10 border-coral-500/50 text-coral-400'
                : 'border-border text-foreground-muted hover:border-foreground-subtle'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Crate Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCrates.map((c) => (
          <article
            key={c.name}
            className="border border-border rounded-xl bg-card p-5 flex flex-col justify-between hover:border-coral-500/30 transition-all duration-300 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-coral-400 font-semibold px-2 py-0.5 rounded bg-secondary">
                  {c.category}
                </span>
                <span className="font-mono text-[11px] text-foreground-subtle">
                  v{c.version}
                </span>
              </div>

              <div>
                <h3 className="font-mono text-base font-bold text-foreground group-hover:text-coral-400 transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                  {c.description}
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              {/* Copyable install command */}
              <div className="flex items-center justify-between bg-secondary/80 border border-border/60 rounded px-2.5 py-1.5">
                <code className="font-mono text-[11px] text-emerald-400 select-all truncate">
                  {c.installCommand}
                </code>
                <button
                  type="button"
                  onClick={() => copyToClipboard(c.installCommand)}
                  className="text-foreground-subtle hover:text-foreground p-1 transition-colors ml-2"
                  title="Copy command"
                  aria-label={`Copy ${c.installCommand}`}
                >
                  {copiedCmd === c.installCommand ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 text-xs font-mono text-foreground-subtle">
                <a
                  href={c.cratesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral-400 inline-flex items-center gap-1 transition-colors"
                >
                  crates.io <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={c.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral-400 inline-flex items-center gap-1 transition-colors"
                >
                  docs.rs <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
