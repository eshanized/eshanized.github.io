'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/reveal';
import { siteConfig } from '@/lib/site-config';
import { ChevronDown } from 'lucide-react';

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
      <text x="240" y="72" textAnchor="middle" fontSize="7" fill="hsl(30 8% 35%)" fontFamily="monospace">infrastructure</text>
      <text x="404" y="344" textAnchor="middle" fontSize="7" fill="hsl(30 8% 35%)" fontFamily="monospace">systems</text>
      <text x="76" y="344" textAnchor="middle" fontSize="7" fill="hsl(30 8% 35%)" fontFamily="monospace">open-source</text>
      <text x="240" y="462" textAnchor="middle" fontSize="7" fill="hsl(4 82% 56% / 0.6)" fontFamily="monospace">M31A</text>
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
  return (
    <section
      id="introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grain"
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
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center px-6 md:px-12 lg:px-20 pt-24 pb-16 max-w-7xl mx-auto w-full">
        {/* Left: Identity */}
        <div className="max-w-2xl">
          <AnimatedHandle />

          <Reveal delay={1}>
            <h1
              id="introduction-heading"
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-bold leading-[0.92] tracking-tight text-balance"
            >
              Eshan
              <br />
              <span className="text-gradient-fade">Roy</span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-8 border-l-2 border-coral-500/50 pl-5">
              <p className="font-display text-xl md:text-2xl text-foreground-muted leading-snug max-w-xl text-balance">
                Systems Engineer &middot; Open-Source Builder
                <br />
                Infrastructure Architect
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <p className="text-base md:text-lg text-foreground-muted/70 mt-6 max-w-xl leading-relaxed text-pretty">
              I build systems that help software do more. My work lives at the
              intersection of Linux engineering, developer infrastructure, and
              autonomous software — from the kernel outward.
            </p>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#mindset"
                className="group inline-flex items-center gap-3 text-foreground hover:text-coral-400 transition-colors"
              >
                <span className="text-sm font-medium">Explore the work</span>
                <span className="w-10 h-px bg-foreground-subtle group-hover:bg-coral-500 group-hover:w-16 transition-all duration-300" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-foreground-subtle hover:text-coral-400 transition-colors"
              >
                github.com/eshanized ↗
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: Systems visual */}
        <Reveal delay={2}>
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="w-full max-w-[420px] aspect-square">
              <HeroSystemsVisual />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-subtle z-10">
        <span className="font-mono text-[9px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
