'use client';

import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Cpu,
  Layers,
  Database,
  Terminal,
} from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  category: string;
  rule: string;
  invariant: string;
}

const STAGES: Stage[] = [
  {
    id: 1,
    name: 'Layer 0 Safety Invariant',
    category: 'Authority',
    rule: 'Monotonic evaluation across 10 authority layers. Safety vetoes cannot be weakened by any sub-agent or model prompt.',
    invariant: 'INVARIANT: higher_authority > lower_authority && veto_state.is_permanent()',
  },
  {
    id: 2,
    name: 'Path Sandboxing & Working Tree',
    category: 'Filesystem',
    rule: 'Strict path jail preventing directory traversal (`../`). Requires clean Git index before workspace mutation.',
    invariant: 'INVARIANT: canonicalize(path).starts_with(workspace_root) && git_status.is_clean()',
  },
  {
    id: 3,
    name: 'Process Confinement (cgroups v2)',
    category: 'Kernel Sandbox',
    rule: 'Linux cgroups v2 memory bounds (max 512MB RSS), CPU quota caps, and process group supervision.',
    invariant: 'INVARIANT: memory.current <= 512MB && rlimit_as <= 1GB',
  },
  {
    id: 4,
    name: 'Network Egress Boundary',
    category: 'Networking',
    rule: 'Strict fail-closed outbound socket filter. Direct internet access blocked; only explicit localhost proxies permitted.',
    invariant: 'INVARIANT: egress_policy == Policy::FailClosed && allowed_endpoints.contains(&dest)',
  },
  {
    id: 5,
    name: 'Command Execution Arbiter',
    category: 'Execution',
    rule: 'AST syntax audit before executing any shell utility. Disallows dangerous shells, sudo, or destructive command forks.',
    invariant: 'INVARIANT: !banned_binaries.contains(cmd.binary) && ast_tree.has_no_eval()',
  },
  {
    id: 6,
    name: 'Tree-sitter Semantic Diff Gate',
    category: 'Code Quality',
    rule: 'Semantic AST comparison verifying that edits preserve function signatures and don\'t corrupt file structure.',
    invariant: 'INVARIANT: ast_parser.parse(patch).is_ok() && syntax_errors == 0',
  },
  {
    id: 7,
    name: 'Ephemeral Container Sandbox',
    category: 'Isolation',
    rule: 'Spawns clean execution jail for build and verification tasks without modifying host configuration.',
    invariant: 'INVARIANT: container.is_isolated() && namespaces == [Mount, PID, Net]',
  },
  {
    id: 8,
    name: 'Compiler Diagnostics Gate',
    category: 'Verification',
    rule: 'Compiler diagnostics must exit cleanly with code 0 and zero warnings treated as errors.',
    invariant: 'INVARIANT: compiler.exit_code == 0 && diagnostics.errors.is_empty()',
  },
  {
    id: 9,
    name: 'Empirical Test Suite Proof',
    category: 'Verification',
    rule: 'All unit and integration test harnesses must pass inside the sandbox. Assertions cannot be skipped or mocked away.',
    invariant: 'INVARIANT: test_runner.failures == 0 && test_runner.passed >= baseline',
  },
  {
    id: 10,
    name: 'Cryptographic Evidence Digest',
    category: 'Attestation',
    rule: 'Generates immutable SHA-256 evidence digest computed from compiler binaries, test logs, and patch contents.',
    invariant: 'INVARIANT: digest == sha256(patch + compiler_receipt + test_stdout)',
  },
  {
    id: 11,
    name: 'Two-Phase SQLite WAL Commit',
    category: 'Persistence',
    rule: 'Checkpoints mission state atomically to local SQLite WAL storage. Invariant verified before release of lock.',
    invariant: 'INVARIANT: db.execute("PRAGMA journal_mode=WAL") && commit_phase == TwoPhase::Committed',
  },
];

type ScenarioType = 'safe' | 'malicious' | 'test-fail';

export function PolicyGateInspector() {
  const [scenario, setScenario] = useState<ScenarioType>('safe');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Determine stage status based on scenario
  const getStageStatus = (index: number) => {
    if (index > currentStageIndex) return 'pending';

    if (scenario === 'safe') {
      return index === currentStageIndex && isRunning ? 'evaluating' : 'passed';
    }

    if (scenario === 'malicious') {
      // Fails at Stage 4 (Command Arbiter / Safety)
      if (index < 4) return 'passed';
      if (index === 4) return 'vetoed';
      return 'aborted';
    }

    if (scenario === 'test-fail') {
      // Fails at Stage 8 (Test suite verification)
      if (index < 8) return 'passed';
      if (index === 8) return 'failed';
      return 'aborted';
    }

    return 'passed';
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      const maxStage =
        scenario === 'safe' ? STAGES.length - 1 : scenario === 'malicious' ? 4 : 8;

      if (currentStageIndex < maxStage) {
        timer = setTimeout(() => {
          setCurrentStageIndex((prev) => prev + 1);
        }, 450);
      } else {
        setIsRunning(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStageIndex, scenario]);

  const handleStartRun = () => {
    setCurrentStageIndex(0);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStageIndex(0);
  };

  const activeStage = STAGES[Math.min(currentStageIndex, STAGES.length - 1)];
  const activeStatus = getStageStatus(currentStageIndex);

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden shadow-2xl font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 bg-secondary/50 border-b border-border">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-coral-400" />
          <span className="font-mono text-xs uppercase tracking-wider text-foreground font-bold">
            M31A Monotonic Policy Pipeline Simulator
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleStartRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white transition-colors"
          >
            <Play className="w-3 h-3" /> Run Pipeline
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-foreground-subtle hover:text-foreground border border-border rounded hover:bg-secondary transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="px-5 py-2.5 bg-background border-b border-border flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono text-foreground-subtle text-[11px] mr-1">Scenario:</span>
        <button
          type="button"
          onClick={() => {
            setScenario('safe');
            handleReset();
          }}
          className={`px-2.5 py-1 rounded font-mono text-xs border transition-colors ${
            scenario === 'safe'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
              : 'border-border text-foreground-muted hover:border-foreground-subtle'
          }`}
        >
          ● Safe Task (AST Refactor + Clean Tests)
        </button>
        <button
          type="button"
          onClick={() => {
            setScenario('malicious');
            handleReset();
          }}
          className={`px-2.5 py-1 rounded font-mono text-xs border transition-colors ${
            scenario === 'malicious'
              ? 'bg-destructive/10 border-destructive/40 text-destructive'
              : 'border-border text-foreground-muted hover:border-foreground-subtle'
          }`}
        >
          ▲ Malicious Command (Shell Injection)
        </button>
        <button
          type="button"
          onClick={() => {
            setScenario('test-fail');
            handleReset();
          }}
          className={`px-2.5 py-1 rounded font-mono text-xs border transition-colors ${
            scenario === 'test-fail'
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
              : 'border-border text-foreground-muted hover:border-foreground-subtle'
          }`}
        >
          ■ Failing Assertion (Zero Digest)
        </button>
      </div>

      {/* Pipeline 11-Stage Scrubber Strip */}
      <div className="px-5 py-4 border-b border-border/80 bg-background/50 overflow-x-auto">
        <div className="flex items-center min-w-[620px] justify-between relative">
          {/* Background rail */}
          <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-0.5 bg-border -z-0" />

          {STAGES.map((s, idx) => {
            const status = getStageStatus(idx);
            const isCurrent = idx === currentStageIndex;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setIsRunning(false);
                  setCurrentStageIndex(idx);
                }}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
                title={`Stage ${s.id}: ${s.name}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-all ${
                    status === 'passed'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                      : status === 'evaluating'
                      ? 'bg-coral-500 border-coral-300 text-white animate-pulse'
                      : status === 'vetoed' || status === 'failed'
                      ? 'bg-destructive/80 border-destructive text-white'
                      : status === 'aborted'
                      ? 'bg-background border-destructive/40 text-foreground-subtle opacity-40'
                      : 'bg-background border-border text-foreground-subtle group-hover:border-foreground-muted'
                  } ${isCurrent ? 'ring-2 ring-coral-400/60 scale-110' : ''}`}
                >
                  {status === 'passed' ? (
                    '✓'
                  ) : status === 'vetoed' || status === 'failed' ? (
                    '✕'
                  ) : (
                    s.id
                  )}
                </div>
                <span
                  className={`mt-1.5 font-mono text-[9px] tracking-tight whitespace-nowrap ${
                    isCurrent ? 'text-coral-400 font-semibold' : 'text-foreground-subtle'
                  }`}
                >
                  L{s.id - 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Inspector Panel */}
      <div className="p-5 grid md:grid-cols-12 gap-5 items-start">
        {/* Left: Active Stage Info */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-secondary text-coral-400 font-medium">
              Stage {String(activeStage.id).padStart(2, '0')} / 11
            </span>
            <span className="font-mono text-xs text-foreground-subtle">
              Category: {activeStage.category}
            </span>
            <span
              className={`font-mono text-[11px] px-2 py-0.5 rounded ml-auto uppercase font-semibold ${
                activeStatus === 'passed'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : activeStatus === 'vetoed' || activeStatus === 'failed'
                  ? 'text-destructive bg-destructive/10'
                  : activeStatus === 'evaluating'
                  ? 'text-coral-400 bg-coral-500/10'
                  : 'text-foreground-subtle bg-secondary'
              }`}
            >
              Status: {activeStatus}
            </span>
          </div>

          <h4 className="font-display text-xl font-bold text-foreground">
            {activeStage.name}
          </h4>

          <p className="text-sm text-foreground-muted leading-relaxed">
            {activeStage.rule}
          </p>

          <div className="pt-2">
            <span className="font-mono text-[10px] uppercase text-foreground-subtle block mb-1">
              Deterministic Runtime Invariant:
            </span>
            <pre className="p-2.5 rounded bg-secondary/80 border border-border/70 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap">
              {activeStage.invariant}
            </pre>
          </div>
        </div>

        {/* Right: Live Telemetry & Log Stream */}
        <div className="md:col-span-5 bg-background border border-border/80 rounded-lg p-3.5 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-foreground-subtle border-b border-border/60 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-coral-400" />
              Runtime Telemetry Stream
            </span>
            <span className="text-[10px] text-emerald-400">cgroups: 48MB / 512MB</span>
          </div>

          <div className="space-y-1 text-[11px] leading-tight">
            <p className="text-foreground-subtle">[00.01s] scheduler: session initialized with isolation harness</p>
            <p className="text-foreground-subtle">[00.04s] monotonic_authority: layer 0 non-bypassable hooks engaged</p>

            {currentStageIndex >= 1 && (
              <p className="text-emerald-400">[00.09s] sandbox: workspace root locked at /tmp/m31a/isolate-14</p>
            )}
            {currentStageIndex >= 2 && (
              <p className="text-emerald-400">[00.12s] cgroups_v2: memory.high=512M applied to pid 49201</p>
            )}
            {currentStageIndex >= 3 && (
              <p className="text-emerald-400">[00.18s] network: socket table restricted to 127.0.0.1 loopback</p>
            )}

            {scenario === 'malicious' && currentStageIndex >= 4 ? (
              <p className="text-destructive font-bold">
                [00.22s] SECURITY_VETO: Layer 0 veto invoked! Destructive binary pattern detected. Session aborted.
              </p>
            ) : currentStageIndex >= 4 ? (
              <p className="text-emerald-400">[00.23s] ast_arbiter: command syntax validated clean</p>
            ) : null}

            {scenario === 'test-fail' && currentStageIndex >= 8 ? (
              <p className="text-amber-400 font-bold">
                [00.41s] VERIFICATION_FAILED: compiler diagnostics clean, but 1 test failed in sandbox. Rejecting digest.
              </p>
            ) : currentStageIndex >= 8 ? (
              <p className="text-emerald-400">[00.45s] verification: 18 unit tests passed, 0 failures</p>
            ) : null}

            {scenario === 'safe' && currentStageIndex >= 10 && (
              <div className="pt-1 border-t border-border/60 text-emerald-400 space-y-0.5">
                <p>[00.52s] sha256: d41d8cd98f00b204e9800998ecf8427e</p>
                <p className="font-semibold text-coral-400">[00.56s] wal_commit: Two-Phase Commit SUCCESSFUL</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
