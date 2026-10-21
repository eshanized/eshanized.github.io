'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/reveal';
import { siteConfig } from '@/lib/site-config';
import { ChevronDown, Terminal, Cpu, ArrowRight } from 'lucide-react';
import { InteractiveTerminal } from '@/components/terminal/interactive-terminal';

function HeroSystemsVisual() {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Abstract systems architecture — interconnected nodes representing layers of infrastructure"
      role="img"
      className="w-full h-full opacity-70"
    >
      {/* Outer ring nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 240 + 190 * Math.cos(rad);
        const cy = 260 + 190 * Math.sin(rad);
        return (
          <g key={angle}>
            <circle
              cx={cx}
              cy={cy}
              r={i % 2 === 0 ? 18 : 12}
              fill="hsl(20 14% 6%)"
              stroke={i % 3 === 0 ? 'hsl(4 82% 56% / 0.4)' : 'hsl(20 10% 18%)'}
              strokeWidth="1"
            />
            <line
              x1={cx}
              y1={cy}
              x2="240"
              y2="260"
              stroke="hsl(20 10% 12%)"
              strokeWidth="1"
              strokeDasharray={i % 2 === 0 ? '4 6' : '2 8'}
            />
          </g>
        );
      })}

      {/* Mid ring */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 240 + 110 * Math.cos(rad);
        const cy = 260 + 110 * Math.sin(rad);
        return (
          <g key={`mid-${angle}`}>
            <circle
              cx={cx}
              cy={cy}
              r={8}
              fill="hsl(20 14% 8%)"
              stroke={i === 1 ? 'hsl(4 82% 56% / 0.6)' : 'hsl(20 10% 16%)'}
              strokeWidth="1"
            />
          </g>
        );
      })}

      {/* Connection web between outer nodes */}
      <polygon
        points={[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return `${240 + 190 * Math.cos(rad)},${260 + 190 * Math.sin(rad)}`;
        }).join(' ')}
        fill="none"
        stroke="hsl(20 10% 10%)"
        strokeWidth="0.5"
      />

      {/* Center core */}
      <circle cx="240" cy="260" r="42" fill="hsl(20 14% 5%)" stroke="hsl(4 82% 56% / 0.2)" strokeWidth="1" />
      <circle cx="240" cy="260" r="28" fill="hsl(20 14% 7%)" stroke="hsl(4 82% 56% / 0.35)" strokeWidth="1" />
      <circle cx="240" cy="260" r="14" fill="hsl(4 82% 56% / 0.1)" stroke="hsl(4 82% 56% / 0.6)" strokeWidth="1.5" />
      <circle cx="240" cy="260" r="4" fill="hsl(4 82% 56%)" />

      {/* Axis lines */}
      <line x1="240" y1="30" x2="240" y2="490" stroke="hsl(20 10% 9%)" strokeWidth="0.5" strokeDasharray="2 10" />
      <line x1="30" y1="260" x2="450" y2="260" stroke="hsl(20 10% 9%)" strokeWidth="0.5" strokeDasharray="2 10" />

      {/* Orbital path */}
      <ellipse cx="240" cy="260" rx="190" ry="190" stroke="hsl(20 10% 10%)" strokeWidth="0.5" fill="none" />
      <ellipse cx="240" cy="260" rx="110" ry="110" stroke="hsl(20 10% 12%)" strokeWidth="0.5" fill="none" />

      {/* Labels */}
      <text x="240" y="72" textAnchor="middle" fontSize="7" fill="hsl(30 8% 35%)" fontFamily="monospace">distributed-compute</text>
      <text x="404" y="344" textAnchor="middle" fontSize="7" fill="hsl(30 8% 35%)" fontFamily="monospace">systems-rust</text>
      <text x="76" y="344" textAnchor="middle" fontSize="7" fill="hsl(30 8% 35%)" fontFamily="monospace">linux-kernel</text>
      <text x="240" y="462" textAnchor="middle" fontSize="7" fill="hsl(4 82% 56% / 0.6)" fontFamily="monospace">M31A & POLARIS</text>
    </svg>
  );
}

function AnimatedHandle() {
  const handle = 'eshanized';
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    handle.split('').forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setRevealed(i + 1);
        }, 300 + i * 80)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <p
      className="font-mono text-sm tracking-[0.25em] uppercase text-coral-500 mb-6"
      aria-label={handle}
    >
      {handle.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-300"
          style={{
            opacity: i < revealed ? 1 : 0,
            transform: i < revealed ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}

export function ChapterIntroduction() {
  const [viewMode, setViewMode] = useState<'terminal' | 'diagram'>('terminal');

  return (
    <section
      id="introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grain pt-20 pb-16"
      aria-labelledby="introduction-heading"
    >
      {/* Large background handle text — purely decorative */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="font-display text-[18vw] font-bold text-foreground/[0.02] whitespace-nowrap leading-none tracking-tighter">
          eshanized
        </span>
      </div>

      {/* Chapter marker */}
      <div className="absolute top-8 left-6 md:left-12 lg:left-20 flex items-center gap-2.5 z-10">
        <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse-coral" aria-hidden="true" />
        <span className="chapter-label">01 — The Introduction</span>
      </div>

      {/* Main two-column layout */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        {/* Left: Identity (Col 6) */}
        <div className="lg:col-span-6 max-w-2xl">
          <AnimatedHandle />

          <Reveal delay={1}>
            <h1
              id="introduction-heading"
              className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.92] tracking-tight text-balance"
            >
              Eshan
              <br />
              <span className="text-gradient-fade">Roy</span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-6 border-l-2 border-coral-500/50 pl-5">
              <p className="font-display text-lg md:text-xl text-foreground-muted leading-snug max-w-xl text-balance">
                Systems Engineer &middot; Distributed Infrastructure Architect
                <br />
                Open-Source Founder
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <p className="text-sm md:text-base text-foreground-muted/80 mt-5 max-w-xl leading-relaxed text-pretty">
              I build systems that help software do more. My work spans Rust distributed
              orchestration (<span className="text-foreground font-mono">Polaris</span>),
              verifiable autonomous runtimes (<span className="text-foreground font-mono">M31A</span>),
              and Arch Linux engineering (<span className="text-foreground font-mono">Snigdha OS</span>)
              — engineered from the kernel outward.
            </p>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#mindset"
                className="group inline-flex items-center gap-3 text-foreground hover:text-coral-400 transition-colors"
              >
                <span className="text-sm font-medium">Explore the monograph</span>
                <span className="w-10 h-px bg-foreground-subtle group-hover:bg-coral-500 group-hover:w-16 transition-all duration-300" />
              </a>
              <a
                href="#m31a"
                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-border hover:border-coral-500/40 text-foreground-muted hover:text-coral-400 transition-colors"
              >
                <span>Policy Simulator</span>
                <ArrowRight className="w-3 h-3" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-foreground-subtle hover:text-coral-400 transition-colors"
              >
                github.com/eshanized ↗
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: Interactive Console or Systems Visual (Col 6) */}
        <div className="lg:col-span-6 w-full">
          <Reveal delay={2}>
            <div className="space-y-3">
              {/* Tab Switcher */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('terminal')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md border transition-all ${
                      viewMode === 'terminal'
                        ? 'bg-secondary border-coral-500/50 text-coral-400 font-semibold'
                        : 'border-transparent text-foreground-subtle hover:text-foreground'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Interactive Console</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('diagram')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md border transition-all ${
                      viewMode === 'diagram'
                        ? 'bg-secondary border-coral-500/50 text-coral-400 font-semibold'
                        : 'border-transparent text-foreground-subtle hover:text-foreground'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Systems Topology</span>
                  </button>
                </div>
                <span className="hidden sm:inline font-mono text-[10px] text-foreground-subtle">
                  LIVE CONSOLE
                </span>
              </div>

              {/* View Content */}
              {viewMode === 'terminal' ? (
                <InteractiveTerminal />
              ) : (
                <div className="border border-border/80 rounded-xl bg-background-elevated p-6 flex items-center justify-center aspect-[4/3]">
                  <div className="w-full max-w-[340px] aspect-square">
                    <HeroSystemsVisual />
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-12 flex flex-col items-center gap-1.5 text-foreground-subtle z-10">
        <span className="font-mono text-[9px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
