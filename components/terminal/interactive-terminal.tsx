'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { cratePackages } from '@/content/projects';

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'eshanized --status',
      output: (
        <div className="space-y-1 text-xs text-foreground-muted">
          <p className="text-coral-400 font-semibold">
            ● Eshan Roy (eshanized) — Systems Engineer & Distributed Infrastructure Architect
          </p>
          <p className="text-foreground-subtle">
            Operating Environment: Linux x86_64 · Rust 2024 Edition · Arch Linux Kernel
          </p>
          <p className="text-foreground-muted">
            Type <span className="text-coral-400 font-mono">help</span> or click command chips below to explore runtimes, crates, and systems.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    let result: React.ReactNode;

    switch (lower) {
      case 'help':
        result = (
          <div className="space-y-1 text-xs">
            <p className="text-coral-400 font-semibold mb-1">Available System Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-foreground-muted">
              <div>
                <span className="text-emerald-400 font-mono">whoami</span> — Identity & engineering positioning
              </div>
              <div>
                <span className="text-emerald-400 font-mono">projects</span> — Index of all flagship systems
              </div>
              <div>
                <span className="text-emerald-400 font-mono">polaris</span> — Distributed compute & orchestration crate
              </div>
              <div>
                <span className="text-emerald-400 font-mono">m31a</span> — Autonomous runtime & 11 policy gates
              </div>
              <div>
                <span className="text-emerald-400 font-mono">snigdha</span> — Arch-based Linux OS ecosystem
              </div>
              <div>
                <span className="text-emerald-400 font-mono">veda</span> — High-performance parallel runtime
              </div>
              <div>
                <span className="text-emerald-400 font-mono">crates</span> — Published crates on crates.io
              </div>
              <div>
                <span className="text-emerald-400 font-mono">contact</span> — External links & researcher IDs
              </div>
              <div>
                <span className="text-emerald-400 font-mono">clear</span> — Flush console screen
              </div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        result = (
          <div className="space-y-1.5 text-xs text-foreground-muted">
            <p className="text-foreground font-semibold">{siteConfig.name} (@{siteConfig.handle})</p>
            <p>{siteConfig.tagline}</p>
            <p className="text-coral-400 italic">&ldquo;{siteConfig.positioning}&rdquo;</p>
            <p className="text-foreground-subtle">
              Founder & CEO at {siteConfig.organization.name} ({siteConfig.organization.shortName}).
              Focusing on low-level process confinement, verified multi-agent runtimes, and Linux infrastructure.
            </p>
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="space-y-2 text-xs">
            <p className="text-coral-400 font-semibold">Flagship & Open-Source Systems:</p>
            <ul className="space-y-1 text-foreground-muted">
              <li>
                <span className="text-foreground font-mono font-medium">M31A</span> — Autonomous agent runtime with 11-stage policy gates & SQLite WAL.
              </li>
              <li>
                <span className="text-foreground font-mono font-medium">Polaris</span> — Distributed compute orchestration engine published on crates.io.
              </li>
              <li>
                <span className="text-foreground font-mono font-medium">Snigdha OS</span> — Arch-based Linux distribution with custom kernel & PKGBUILDs.
              </li>
              <li>
                <span className="text-foreground font-mono font-medium">Veda (veda-rs)</span> — Work-stealing parallel execution runtime in Rust.
              </li>
              <li>
                <span className="text-foreground font-mono font-medium">dep-insight</span> — Cargo dependency analysis & vulnerability graph visualizer.
              </li>
              <li>
                <span className="text-foreground font-mono font-medium">multigit</span> — Multi-remote Git fleet synchronization CLI.
              </li>
            </ul>
          </div>
        );
        break;

      case 'polaris':
        result = (
          <div className="space-y-1.5 text-xs text-foreground-muted border-l-2 border-coral-500/60 pl-3">
            <p className="text-coral-400 font-mono font-bold">eshanized-polaris (crates.io / docs.rs)</p>
            <p>
              A Rust-native distributed compute framework. Transforms standard async functions into distributed cluster tasks via procedural macros (<span className="text-emerald-400 font-mono">#[task]</span>).
            </p>
            <p className="text-foreground-subtle">
              Consists of: <span className="font-mono text-foreground">eshanized-polaris-core</span> (consensus, node heartbeats), <span className="font-mono text-foreground">eshanized-polaris-cli</span> (orchestration CLI), and <span className="font-mono text-foreground">eshanized-polaris-macros</span>.
            </p>
            <p className="font-mono text-[11px] text-coral-300 bg-secondary/80 p-1.5 rounded inline-block">
              $ cargo add eshanized-polaris
            </p>
          </div>
        );
        break;

      case 'm31a':
        result = (
          <div className="space-y-1.5 text-xs text-foreground-muted border-l-2 border-emerald-500/60 pl-3">
            <p className="text-emerald-400 font-mono font-bold">M31A — Verifiable Autonomous Runtime</p>
            <p>
              Autonomous engineering runtime with an intelligence engine inside. An 11-stage monotonic policy pipeline sits between the model and every file mutation, network request, or command.
            </p>
            <p className="text-foreground-subtle">
              Invariants: cgroups v2 512MB RSS bound, clean compiler diagnostics, passing sandbox tests, and SHA-256 evidence digests before two-phase SQLite WAL commits.
            </p>
            <p className="font-mono text-[11px] text-emerald-300">
              Repository: github.com/eshanized/M31A
            </p>
          </div>
        );
        break;

      case 'snigdha':
      case 'snigdha-os':
        result = (
          <div className="space-y-1.5 text-xs text-foreground-muted border-l-2 border-sky-500/60 pl-3">
            <p className="text-sky-400 font-mono font-bold">Snigdha OS — Arch Linux Ecosystem</p>
            <p>
              Lightweight, fast, and secure Arch-based Linux distribution. Features curated hardware tunings, custom PKGBUILD build infrastructure, an interactive system assistant, and penetration testing editions.
            </p>
            <p className="font-mono text-[11px] text-sky-300">
              github.com/Snigdha-OS · gitlab.com/SnigdhaOS
            </p>
          </div>
        );
        break;

      case 'veda':
      case 'veda-rs':
        result = (
          <div className="space-y-1.5 text-xs text-foreground-muted border-l-2 border-amber-500/60 pl-3">
            <p className="text-amber-400 font-mono font-bold">Veda (veda-rs)</p>
            <p>
              High-performance Rust parallel runtime. Implements adaptive work-stealing scheduling with lock-free double-ended queues (deques) and NUMA-aware core binding.
            </p>
            <p className="font-mono text-[11px] text-amber-300">
              github.com/TIVerse/veda-rs
            </p>
          </div>
        );
        break;

      case 'crates':
        result = (
          <div className="space-y-2 text-xs">
            <p className="text-coral-400 font-semibold">Published Rust Crates on crates.io:</p>
            <div className="space-y-1.5">
              {cratePackages.map((c) => (
                <div key={c.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/40 pb-1">
                  <div>
                    <span className="font-mono text-foreground font-medium">{c.name}</span>
                    <span className="font-mono text-[10px] text-coral-400 ml-2">v{c.version}</span>
                    <p className="text-[11px] text-foreground-subtle">{c.description}</p>
                  </div>
                  <code className="text-[10px] font-mono text-emerald-400 bg-secondary px-2 py-0.5 rounded whitespace-nowrap">
                    {c.installCommand}
                  </code>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="space-y-1 text-xs text-foreground-muted">
            <p className="text-coral-400 font-semibold">Coordinates & Verified Identities:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-foreground hover:text-coral-400">
                • GitHub: github.com/{siteConfig.handle}
              </a>
              <a href={siteConfig.links.crates} target="_blank" rel="noreferrer" className="text-foreground hover:text-coral-400">
                • Crates.io: crates.io/users/{siteConfig.handle}
              </a>
              <a href={siteConfig.links.orcid} target="_blank" rel="noreferrer" className="text-foreground hover:text-coral-400">
                • ORCID: 0009-0007-1261-6805
              </a>
              <a href={siteConfig.links.pypi} target="_blank" rel="noreferrer" className="text-foreground hover:text-coral-400">
                • PyPI: pypi.org/user/{siteConfig.handle}
              </a>
              <a href={siteConfig.organization.url} target="_blank" rel="noreferrer" className="text-foreground hover:text-coral-400">
                • TIV: {siteConfig.organization.url}
              </a>
            </div>
          </div>
        );
        break;

      case 'clear':
        setOutputs([]);
        setInput('');
        return;

      default:
        result = (
          <p className="text-xs text-destructive">
            command not found: <span className="font-mono">{trimmed}</span>. Type <span className="font-mono text-coral-400">help</span> for available commands.
          </p>
        );
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: `out-${Date.now()}`,
        command: trimmed,
        output: result,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  const chips = ['help', 'polaris', 'm31a', 'snigdha', 'crates', 'contact'];

  return (
    <div
      className={`border border-border/80 rounded-xl bg-background-elevated shadow-2xl backdrop-blur-md flex flex-col font-mono transition-all duration-300 overflow-hidden ${
        isExpanded ? 'h-[480px]' : 'h-[360px]'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-secondary/60 border-b border-border/60 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-foreground-subtle text-[11px]">
            <TerminalIcon className="w-3.5 h-3.5 text-coral-400" />
            <span>eshanized@systems:~</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOutputs([]);
            }}
            title="Clear Terminal"
            className="text-foreground-subtle hover:text-foreground transition-colors p-1"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            title={isExpanded ? 'Compact View' : 'Expand View'}
            className="text-foreground-subtle hover:text-foreground transition-colors p-1"
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 font-mono text-xs text-foreground">
        {outputs.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-foreground-subtle text-[11px]">
              <span className="text-coral-500 font-bold">$</span>
              <span className="text-foreground font-semibold">{item.command}</span>
            </div>
            <div className="pl-3.5">{item.output}</div>
          </div>
        ))}

        {/* Input row */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-coral-500 font-bold text-[11px]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or click a command below..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-foreground placeholder:text-foreground-subtle/50 font-mono"
            aria-label="Interactive terminal input"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Chips Footer */}
      <div className="px-3 py-2 bg-secondary/30 border-t border-border/50 flex flex-wrap items-center gap-1.5 text-[10px]">
        <span className="text-foreground-subtle flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-coral-400" /> Quick:
        </span>
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(chip);
            }}
            className="px-2 py-0.5 rounded bg-secondary hover:bg-secondary/80 text-foreground-muted hover:text-coral-400 border border-border/60 transition-colors font-mono"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
