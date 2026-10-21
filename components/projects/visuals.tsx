interface VisualProps {
  className?: string;
}

/** Agent execution pipeline: Understand → Plan → Execute → Verify → Ship */
export function AgentPipeline({ className }: VisualProps) {
  const stages = [
    { label: 'Understand', y: 80 },
    { label: 'Plan', y: 160 },
    { label: 'Execute', y: 240 },
    { label: 'Verify', y: 320 },
    { label: 'Ship', y: 400 },
  ];

  return (
    <svg
      viewBox="0 0 500 480"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="M31A agent execution pipeline showing five stages: Understand, Plan, Execute, Verify, Ship"
      role="img"
    >
      {/* Vertical spine */}
      <line
        x1="60"
        y1="80"
        x2="60"
        y2="400"
        stroke="hsl(20 10% 18%)"
        strokeWidth="2"
      />

      {/* Policy gate indicator */}
      <rect x="30" y="40" width="60" height="24" rx="4" fill="hsl(var(--coral-900) / 0.3)" stroke="hsl(var(--coral-600) / 0.5)" strokeWidth="1" />
      <text x="60" y="56" textAnchor="middle" fontSize="9" fill="hsl(var(--coral-400))" fontFamily="monospace" letterSpacing="0.1em">POLICY GATE</text>

      {stages.map((stage, i) => (
        <g key={stage.label}>
          {/* Node */}
          <circle
            cx="60"
            cy={stage.y}
            r={i === 4 ? 8 : 6}
            fill={i === 4 ? 'hsl(var(--coral-500))' : 'hsl(20 10% 18%)'}
            stroke={i === 4 ? 'hsl(var(--coral-400))' : 'hsl(20 10% 28%)'}
            strokeWidth="1.5"
          />

          {/* Connection to stage box */}
          <line
            x1="70"
            y1={stage.y}
            x2="120"
            y2={stage.y}
            stroke="hsl(20 10% 14%)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Stage box */}
          <rect
            x="120"
            y={stage.y - 18}
            width="340"
            height="36"
            rx="6"
            fill="hsl(20 14% 6%)"
            stroke="hsl(20 10% 14%)"
            strokeWidth="1"
          />

          {/* Stage number */}
          <text
            x="138"
            y={stage.y + 4}
            fontSize="11"
            fill="hsl(var(--coral-500))"
            fontFamily="monospace"
            fontWeight="500"
          >
            0{i + 1}
          </text>

          {/* Stage label */}
          <text
            x="170"
            y={stage.y + 4}
            fontSize="13"
            fill="hsl(30 20% 80%)"
            fontFamily="sans-serif"
            fontWeight="500"
          >
            {stage.label}
          </text>

          {/* Stage detail */}
          <text
            x="420"
            y={stage.y + 4}
            textAnchor="end"
            fontSize="10"
            fill="hsl(30 10% 42%)"
            fontFamily="monospace"
          >
            {['SCAN', 'GRAPH', 'DIFF', 'TEST', 'COMMIT'][i]}
          </text>
        </g>
      ))}

      {/* Evidence badge */}
      <g transform="translate(120, 430)">
        <rect width="340" height="32" rx="6" fill="hsl(var(--coral-900) / 0.15)" stroke="hsl(var(--coral-600) / 0.3)" strokeWidth="1" />
        <circle cx="18" cy="16" r="4" fill="hsl(var(--coral-500))" />
        <text x="32" y="20" fontSize="10" fill="hsl(var(--coral-300))" fontFamily="monospace">
          SHA-256 EVIDENCE · sha:7f3a...c92e · VERIFIED
        </text>
      </g>
    </svg>
  );
}

/** Linux system architecture diagram */
export function LinuxSystem({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 500 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Snigdha OS layered architecture showing desktop, tools, kernel, and hardware layers"
      role="img"
    >
      {/* Hardware layer */}
      <rect x="40" y="310" width="420" height="60" rx="8" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 14%)" strokeWidth="1" />
      <text x="250" y="335" textAnchor="middle" fontSize="11" fill="hsl(30 10% 42%)" fontFamily="monospace" letterSpacing="0.1em">HARDWARE</text>
      <text x="250" y="354" textAnchor="middle" fontSize="9" fill="hsl(30 8% 32%)" fontFamily="monospace">x86_64 · UEFI · devices</text>

      {/* Kernel layer */}
      <rect x="40" y="230" width="420" height="60" rx="8" fill="hsl(20 14% 8%)" stroke="hsl(var(--coral-600) / 0.25)" strokeWidth="1" />
      <text x="250" y="255" textAnchor="middle" fontSize="11" fill="hsl(var(--coral-400))" fontFamily="monospace" letterSpacing="0.1em">LINUX KERNEL</text>
      <text x="250" y="274" textAnchor="middle" fontSize="9" fill="hsl(30 8% 38%)" fontFamily="monospace">sched · fs · net · drivers · cgroups</text>

      {/* System tools layer */}
      <rect x="40" y="150" width="420" height="60" rx="8" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 14%)" strokeWidth="1" />
      <text x="250" y="175" textAnchor="middle" fontSize="11" fill="hsl(30 20% 70%)" fontFamily="monospace" letterSpacing="0.1em">SYSTEM TOOLS</text>
      <text x="250" y="194" textAnchor="middle" fontSize="9" fill="hsl(30 8% 38%)" fontFamily="monospace">pacman · shell · init · packaging</text>

      {/* Desktop layer */}
      <rect x="40" y="70" width="420" height="60" rx="8" fill="hsl(20 14% 8%)" stroke="hsl(var(--coral-600) / 0.2)" strokeWidth="1" />
      <text x="250" y="95" textAnchor="middle" fontSize="11" fill="hsl(30 20% 80%)" fontFamily="monospace" letterSpacing="0.1em">DESKTOP EXPERIENCE</text>
      <text x="250" y="114" textAnchor="middle" fontSize="9" fill="hsl(30 8% 42%)" fontFamily="monospace">WM · themes · assistant · settings</text>

      {/* Connection lines */}
      {[100, 190, 270, 350].map((y) => (
        <line key={y} x1="250" y1={y} x2="250" y2={y + 10} stroke="hsl(20 10% 18%)" strokeWidth="1" />
      ))}

      {/* Side labels */}
      <text x="30" y="105" textAnchor="end" fontSize="8" fill="hsl(30 8% 30%)" fontFamily="monospace">04</text>
      <text x="30" y="185" textAnchor="end" fontSize="8" fill="hsl(30 8% 30%)" fontFamily="monospace">03</text>
      <text x="30" y="265" textAnchor="end" fontSize="8" fill="hsl(30 8% 30%)" fontFamily="monospace">02</text>
      <text x="30" y="345" textAnchor="end" fontSize="8" fill="hsl(30 8% 30%)" fontFamily="monospace">01</text>
    </svg>
  );
}

/** Code review DAG visualization for Octate */
export function CodeReviewDAG({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Octate code review pipeline: AST parsing, reference graphs, LLM review, and critic quality gate"
      role="img"
    >
      {/* AST node */}
      <rect x="20" y="30" width="120" height="44" rx="6" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 16%)" strokeWidth="1" />
      <text x="80" y="48" textAnchor="middle" fontSize="10" fill="hsl(30 20% 75%)" fontFamily="monospace">Tree-sitter</text>
      <text x="80" y="62" textAnchor="middle" fontSize="8" fill="hsl(30 8% 40%)" fontFamily="monospace">WASM AST</text>

      {/* Ref graph node */}
      <rect x="20" y="110" width="120" height="44" rx="6" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 16%)" strokeWidth="1" />
      <text x="80" y="128" textAnchor="middle" fontSize="10" fill="hsl(30 20% 75%)" fontFamily="monospace">Reference</text>
      <text x="80" y="142" textAnchor="middle" fontSize="8" fill="hsl(30 8% 40%)" fontFamily="monospace">cross-file graph</text>

      {/* LLM review node */}
      <rect x="180" y="70" width="120" height="44" rx="6" fill="hsl(20 14% 8%)" stroke="hsl(var(--coral-600) / 0.25)" strokeWidth="1" />
      <text x="240" y="88" textAnchor="middle" fontSize="10" fill="hsl(var(--coral-400))" fontFamily="monospace">LLM Review</text>
      <text x="240" y="102" textAnchor="middle" fontSize="8" fill="hsl(30 8% 40%)" fontFamily="monospace">multi-stage DAG</text>

      {/* Critic gate node */}
      <rect x="180" y="160" width="120" height="44" rx="6" fill="hsl(var(--coral-900) / 0.2)" stroke="hsl(var(--coral-600) / 0.3)" strokeWidth="1" />
      <text x="240" y="178" textAnchor="middle" fontSize="10" fill="hsl(var(--coral-300))" fontFamily="monospace">Critic Gate</text>
      <text x="240" y="192" textAnchor="middle" fontSize="8" fill="hsl(30 8% 38%)" fontFamily="monospace">two-stage</text>

      {/* Output */}
      <rect x="180" y="240" width="120" height="40" rx="6" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 16%)" strokeWidth="1" />
      <text x="240" y="264" textAnchor="middle" fontSize="10" fill="hsl(30 20% 70%)" fontFamily="monospace">Review Output</text>

      {/* Connections */}
      <path d="M 140 52 Q 160 52 180 82" stroke="hsl(20 10% 18%)" strokeWidth="1" fill="none" />
      <path d="M 140 132 Q 160 132 180 92" stroke="hsl(20 10% 18%)" strokeWidth="1" fill="none" />
      <path d="M 240 114 L 240 160" stroke="hsl(var(--coral-600) / 0.3)" strokeWidth="1" fill="none" />
      <path d="M 240 204 L 240 240" stroke="hsl(20 10% 18%)" strokeWidth="1" fill="none" />
    </svg>
  );
}

/** SLM training pipeline for SLMGen */
export function SLMTraining({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 400 250"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SLMGen small language model training pipeline"
      role="img"
    >
      {['Dataset', 'Tokenize', 'Fine-tune', 'Evaluate', 'Checkpoint'].map((label, i) => {
        const x = 30 + i * 75;
        return (
          <g key={label}>
            <rect
              x={x}
              y="90"
              width="60"
              height="50"
              rx="6"
              fill="hsl(20 14% 6%)"
              stroke={i === 2 ? 'hsl(var(--coral-600) / 0.3)' : 'hsl(20 10% 16%)' }
              strokeWidth="1"
            />
            <text x={x + 30} y="112" textAnchor="middle" fontSize="8" fill={i === 2 ? 'hsl(var(--coral-400))' : 'hsl(30 20% 72%)'} fontFamily="monospace">
              {label}
            </text>
            <text x={x + 30} y="126" textAnchor="middle" fontSize="7" fill="hsl(30 8% 38%)" fontFamily="monospace">
              {['raw', 'bpe', 'lora', 'bench', 'save'][i]}
            </text>
            {i < 4 && (
              <line x1={x + 60} y1="115" x2={x + 75} y2="115" stroke="hsl(20 10% 14%)" strokeWidth="1" />
            )}
          </g>
        );
      })}
      {/* Loop back arrow */}
      <path d="M 330 140 Q 200 200 105 140" stroke="hsl(20 10% 12%)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <text x="200" y="210" textAnchor="middle" fontSize="8" fill="hsl(30 8% 35%)" fontFamily="monospace">iterate</text>
    </svg>
  );
}

/** MCP tool composition diagram */
export function MCPComposition({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 400 250"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MCP SuperAssistant tool composition diagram"
      role="img"
    >
      {/* Central hub */}
      <circle cx="200" cy="125" r="36" fill="hsl(20 14% 8%)" stroke="hsl(var(--coral-600) / 0.3)" strokeWidth="1.5" />
      <text x="200" y="122" textAnchor="middle" fontSize="9" fill="hsl(var(--coral-400))" fontFamily="monospace">MCP</text>
      <text x="200" y="134" textAnchor="middle" fontSize="7" fill="hsl(30 8% 40%)" fontFamily="monospace">hub</text>

      {/* Surrounding tool nodes */}
      {[
        { x: 80, y: 50, label: 'tools' },
        { x: 320, y: 50, label: 'prompts' },
        { x: 60, y: 125, label: 'files' },
        { x: 340, y: 125, label: 'search' },
        { x: 80, y: 200, label: 'git' },
        { x: 320, y: 200, label: 'build' },
      ].map((node) => (
        <g key={node.label}>
          <line x1={node.x} y1={node.y} x2="200" y2="125" stroke="hsl(20 10% 14%)" strokeWidth="1" />
          <rect x={node.x - 28} y={node.y - 14} width="56" height="28" rx="4" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 16%)" strokeWidth="1" />
          <text x={node.x} y={node.y + 3} textAnchor="middle" fontSize="8" fill="hsl(30 20% 70%)" fontFamily="monospace">{node.label}</text>
        </g>
      ))}
    </svg>
  );
}

/** Pipeline stages diagram for Chapter 03 */
export function PipelineStages({ className }: VisualProps) {
  const stages = ['Concept', 'Architecture', 'Implementation', 'Verification', 'Release'];

  return (
    <svg
      viewBox="0 0 500 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Engineering pipeline from concept to release in five stages"
      role="img"
    >
      {/* Main path */}
      <path
        d="M 30 100 L 470 100"
        stroke="hsl(20 10% 14%)"
        strokeWidth="2"
      />

      {/* Coral progress path */}
      <path
        d="M 30 100 L 470 100"
        stroke="hsl(var(--coral-500))"
        strokeWidth="2"
        strokeDasharray="440"
        strokeDashoffset="440"
        className="animate-[dash_2s_ease-out_forwards]"
      />

      {stages.map((stage, i) => {
        const x = 50 + i * 100;
        return (
          <g key={stage}>
            {/* Vertical connector */}
            <line x1={x} y1="60" x2={x} y2="100" stroke="hsl(20 10% 18%)" strokeWidth="1" />

            {/* Node */}
            <circle
              cx={x}
              cy="100"
              r={i === 4 ? 10 : 7}
              fill={i === 4 ? 'hsl(var(--coral-500))' : 'hsl(20 14% 8%)'}
              stroke={i === 4 ? 'hsl(var(--coral-400))' : 'hsl(20 10% 22%)'}
              strokeWidth="1.5"
            />

            {/* Stage number above */}
            <text x={x} y="48" textAnchor="middle" fontSize="10" fill="hsl(var(--coral-500))" fontFamily="monospace" fontWeight="500">
              0{i + 1}
            </text>

            {/* Stage label below */}
            <text x={x} y="130" textAnchor="middle" fontSize="11" fill="hsl(30 20% 78%)" fontFamily="sans-serif" fontWeight="500">
              {stage}
            </text>

            {/* Sub-label */}
            <text x={x} y="146" textAnchor="middle" fontSize="8" fill="hsl(30 8% 38%)" fontFamily="monospace">
              {['define', 'design', 'build', 'prove', 'ship'][i]}
            </text>

            {/* Detail */}
            <text x={x} y="170" textAnchor="middle" fontSize="7" fill="hsl(30 8% 30%)" fontFamily="monospace">
              {['boundary', 'structure', 'typed', 'evidence', 'open'][i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Philosophy diagram: concentric circles representing layered principles */
export function PhilosophyDiagram({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Engineering philosophy: layered principles from foundation to user"
      role="img"
    >
      <circle cx="150" cy="150" r="130" fill="none" stroke="hsl(20 10% 10%)" strokeWidth="1" />
      <circle cx="150" cy="150" r="100" fill="none" stroke="hsl(20 10% 12%)" strokeWidth="1" />
      <circle cx="150" cy="150" r="70" fill="none" stroke="hsl(20 10% 14%)" strokeWidth="1" />
      <circle cx="150" cy="150" r="40" fill="hsl(var(--coral-900) / 0.15)" stroke="hsl(var(--coral-600) / 0.3)" strokeWidth="1" />

      <text x="150" y="148" textAnchor="middle" fontSize="9" fill="hsl(var(--coral-400))" fontFamily="monospace">verify</text>
      <text x="150" y="160" textAnchor="middle" fontSize="7" fill="hsl(30 8% 38%)" fontFamily="monospace">evidence</text>

      {/* Labels on rings */}
      <text x="150" y="32" textAnchor="middle" fontSize="8" fill="hsl(30 10% 42%)" fontFamily="monospace">MAINTAIN</text>
      <text x="150" y="62" textAnchor="middle" fontSize="8" fill="hsl(30 10% 42%)" fontFamily="monospace">ARCHITECTURE</text>
      <text x="150" y="92" textAnchor="middle" fontSize="8" fill="hsl(30 10% 48%)" fontFamily="monospace">BOUNDARIES</text>
      <text x="270" y="153" textAnchor="end" fontSize="8" fill="hsl(30 10% 42%)" fontFamily="monospace">OPEN</text>
      <text x="30" y="153" fontSize="8" fill="hsl(30 10% 42%)" fontFamily="monospace">DX</text>
      <text x="150" y="280" textAnchor="middle" fontSize="8" fill="hsl(30 10% 42%)" fontFamily="monospace">MEASURE</text>
    </svg>
  );
}

/** Distributed compute cluster topology: Polaris */
export function DistributedCompute({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 460 260"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Polaris distributed compute cluster topology"
      role="img"
    >
      {/* Coordinator node */}
      <rect x="180" y="20" width="100" height="48" rx="6" fill="hsl(20 14% 7%)" stroke="hsl(var(--coral-500) / 0.5)" strokeWidth="1.5" />
      <text x="230" y="42" textAnchor="middle" fontSize="10" fill="hsl(var(--coral-400))" fontFamily="monospace" fontWeight="600">POLARIS</text>
      <text x="230" y="56" textAnchor="middle" fontSize="8" fill="hsl(30 10% 50%)" fontFamily="monospace">coordinator</text>

      {/* Task dispatch bus */}
      <line x1="230" y1="68" x2="230" y2="105" stroke="hsl(var(--coral-500) / 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Distribution crossbar */}
      <line x1="75" y1="105" x2="385" y2="105" stroke="hsl(20 10% 18%)" strokeWidth="1.5" />

      {/* Worker connections */}
      <line x1="75" y1="105" x2="75" y2="140" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <line x1="230" y1="105" x2="230" y2="140" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <line x1="385" y1="105" x2="385" y2="140" stroke="hsl(20 10% 18%)" strokeWidth="1" />

      {/* Worker 1 */}
      <rect x="25" y="140" width="100" height="70" rx="6" fill="hsl(20 14% 5%)" stroke="hsl(20 10% 16%)" strokeWidth="1" />
      <text x="75" y="162" textAnchor="middle" fontSize="9" fill="hsl(30 20% 80%)" fontFamily="monospace">Worker 01</text>
      <text x="75" y="178" textAnchor="middle" fontSize="8" fill="hsl(142 70% 50%)" fontFamily="monospace">● heartbeat</text>
      <text x="75" y="194" textAnchor="middle" fontSize="7" fill="hsl(30 8% 40%)" fontFamily="monospace">latency: 0.3ms</text>

      {/* Worker 2 */}
      <rect x="180" y="140" width="100" height="70" rx="6" fill="hsl(20 14% 5%)" stroke="hsl(var(--coral-500) / 0.3)" strokeWidth="1" />
      <text x="230" y="162" textAnchor="middle" fontSize="9" fill="hsl(30 20% 80%)" fontFamily="monospace">Worker 02</text>
      <text x="230" y="178" textAnchor="middle" fontSize="8" fill="hsl(142 70% 50%)" fontFamily="monospace">● #[task] exec</text>
      <text x="230" y="194" textAnchor="middle" fontSize="7" fill="hsl(30 8% 40%)" fontFamily="monospace">latency: 0.4ms</text>

      {/* Worker 3 */}
      <rect x="335" y="140" width="100" height="70" rx="6" fill="hsl(20 14% 5%)" stroke="hsl(20 10% 16%)" strokeWidth="1" />
      <text x="385" y="162" textAnchor="middle" fontSize="9" fill="hsl(30 20% 80%)" fontFamily="monospace">Worker 03</text>
      <text x="385" y="178" textAnchor="middle" fontSize="8" fill="hsl(142 70% 50%)" fontFamily="monospace">● heartbeat</text>
      <text x="385" y="194" textAnchor="middle" fontSize="7" fill="hsl(30 8% 40%)" fontFamily="monospace">latency: 0.5ms</text>

      {/* Protocol footnote */}
      <text x="230" y="240" textAnchor="middle" fontSize="8" fill="hsl(30 8% 35%)" fontFamily="monospace">consensus: state-machine replication · fail-tolerant</text>
    </svg>
  );
}

/** Parallel runtime with work-stealing deque: Veda */
export function ParallelRuntime({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 440 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Veda work-stealing parallel runtime architecture"
      role="img"
    >
      {/* Core pool box */}
      <rect x="20" y="20" width="400" height="200" rx="8" fill="hsl(20 14% 5%)" stroke="hsl(20 10% 14%)" strokeWidth="1" />
      <text x="40" y="44" fontSize="10" fill="hsl(var(--coral-400))" fontFamily="monospace" fontWeight="600">VEDA RUNTIME</text>
      <text x="360" y="44" textAnchor="end" fontSize="8" fill="hsl(30 8% 40%)" fontFamily="monospace">adaptive work-stealing</text>

      {/* Core 0 Deque */}
      <rect x="40" y="65" width="160" height="60" rx="4" fill="hsl(20 14% 7%)" stroke="hsl(20 10% 20%)" strokeWidth="1" />
      <text x="52" y="84" fontSize="9" fill="hsl(30 20% 80%)" fontFamily="monospace">Thread 0 (NUMA 0)</text>
      <rect x="52" y="94" width="30" height="20" rx="2" fill="hsl(var(--coral-500) / 0.2)" stroke="hsl(var(--coral-500) / 0.5)" strokeWidth="1" />
      <text x="67" y="108" textAnchor="middle" fontSize="8" fill="hsl(var(--coral-300))" fontFamily="monospace">T1</text>
      <rect x="88" y="94" width="30" height="20" rx="2" fill="hsl(20 14% 10%)" stroke="hsl(20 10% 26%)" strokeWidth="1" />
      <text x="103" y="108" textAnchor="middle" fontSize="8" fill="hsl(30 10% 60%)" fontFamily="monospace">T2</text>
      <rect x="124" y="94" width="30" height="20" rx="2" fill="hsl(20 14% 10%)" stroke="hsl(20 10% 26%)" strokeWidth="1" />
      <text x="139" y="108" textAnchor="middle" fontSize="8" fill="hsl(30 10% 60%)" fontFamily="monospace">T3</text>

      {/* Core 1 Deque */}
      <rect x="240" y="65" width="160" height="60" rx="4" fill="hsl(20 14% 7%)" stroke="hsl(20 10% 20%)" strokeWidth="1" />
      <text x="252" y="84" fontSize="9" fill="hsl(30 20% 80%)" fontFamily="monospace">Thread 1 (NUMA 1)</text>
      <rect x="252" y="94" width="30" height="20" rx="2" fill="hsl(20 14% 10%)" stroke="hsl(20 10% 26%)" strokeWidth="1" />
      <text x="267" y="108" textAnchor="middle" fontSize="8" fill="hsl(30 10% 60%)" fontFamily="monospace">T4</text>
      <rect x="288" y="94" width="30" height="20" rx="2" fill="hsl(var(--coral-500) / 0.2)" stroke="hsl(var(--coral-500) / 0.5)" strokeWidth="1" />
      <text x="303" y="108" textAnchor="middle" fontSize="8" fill="hsl(var(--coral-300))" fontFamily="monospace">T5</text>

      {/* Steal arrow */}
      <path d="M 240 105 Q 220 70 170 105" stroke="hsl(var(--coral-400))" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      <text x="220" y="80" textAnchor="middle" fontSize="8" fill="hsl(var(--coral-400))" fontFamily="monospace">steal</text>

      {/* Lock-free deque stats */}
      <text x="220" y="165" textAnchor="middle" fontSize="8" fill="hsl(142 70% 50%)" fontFamily="monospace">● lock-free chase-lev deque · zero spinlock contention</text>
      <text x="220" y="185" textAnchor="middle" fontSize="7" fill="hsl(30 8% 40%)" fontFamily="monospace">microsecond task dispatch · thread-affinity aware</text>
    </svg>
  );
}

/** Dependency tree audit visualizer: dep-insight */
export function DependencyGraph({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 420 230"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="dep-insight cargo dependency tree visualizer"
      role="img"
    >
      {/* Root crate */}
      <rect x="150" y="20" width="120" height="34" rx="4" fill="hsl(20 14% 8%)" stroke="hsl(var(--coral-500) / 0.6)" strokeWidth="1" />
      <text x="210" y="41" textAnchor="middle" fontSize="9" fill="hsl(var(--coral-400))" fontFamily="monospace">workspace_root</text>

      {/* Tree lines */}
      <line x1="210" y1="54" x2="210" y2="80" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <line x1="90" y1="80" x2="330" y2="80" stroke="hsl(20 10% 18%)" strokeWidth="1" />

      <line x1="90" y1="80" x2="90" y2="110" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <line x1="210" y1="80" x2="210" y2="110" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <line x1="330" y1="80" x2="330" y2="110" stroke="hsl(20 10% 18%)" strokeWidth="1" />

      {/* Sub-deps */}
      <rect x="40" y="110" width="100" height="32" rx="4" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <text x="90" y="130" textAnchor="middle" fontSize="8" fill="hsl(30 20% 75%)" fontFamily="monospace">tokio v1.38</text>

      <rect x="160" y="110" width="100" height="32" rx="4" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <text x="210" y="130" textAnchor="middle" fontSize="8" fill="hsl(30 20% 75%)" fontFamily="monospace">serde v1.0</text>

      <rect x="280" y="110" width="100" height="32" rx="4" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <text x="330" y="130" textAnchor="middle" fontSize="8" fill="hsl(30 20% 75%)" fontFamily="monospace">tree-sitter</text>

      {/* Audit badge */}
      <rect x="110" y="170" width="200" height="28" rx="4" fill="hsl(142 70% 10% / 0.4)" stroke="hsl(142 70% 40% / 0.5)" strokeWidth="1" />
      <text x="210" y="188" textAnchor="middle" fontSize="8" fill="hsl(142 70% 50%)" fontFamily="monospace">0 duplicate crates · 0 vulnerabilities</text>
    </svg>
  );
}

/** MultiGit sync visualizer */
export function MultiGitSync({ className }: VisualProps) {
  return (
    <svg
      viewBox="0 0 420 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="multigit multi-remote fleet synchronization visualizer"
      role="img"
    >
      {/* Local repo */}
      <rect x="150" y="20" width="120" height="36" rx="4" fill="hsl(20 14% 8%)" stroke="hsl(var(--coral-500) / 0.6)" strokeWidth="1.5" />
      <text x="210" y="42" textAnchor="middle" fontSize="9" fill="hsl(var(--coral-400))" fontFamily="monospace">Local Git Index</text>

      {/* Fan out lines */}
      <line x1="210" y1="56" x2="80" y2="120" stroke="hsl(20 10% 18%)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="210" y1="56" x2="210" y2="120" stroke="hsl(20 10% 18%)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="210" y1="56" x2="340" y2="120" stroke="hsl(20 10% 18%)" strokeWidth="1" strokeDasharray="3 3" />

      {/* Remote 1: GitHub */}
      <rect x="30" y="120" width="100" height="46" rx="4" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <text x="80" y="142" textAnchor="middle" fontSize="9" fill="hsl(30 20% 80%)" fontFamily="monospace">GitHub</text>
      <text x="80" y="156" textAnchor="middle" fontSize="7" fill="hsl(142 70% 50%)" fontFamily="monospace">● synchronized</text>

      {/* Remote 2: GitLab */}
      <rect x="160" y="120" width="100" height="46" rx="4" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <text x="210" y="142" textAnchor="middle" fontSize="9" fill="hsl(30 20% 80%)" fontFamily="monospace">GitLab</text>
      <text x="210" y="156" textAnchor="middle" fontSize="7" fill="hsl(142 70% 50%)" fontFamily="monospace">● synchronized</text>

      {/* Remote 3: Self-hosted */}
      <rect x="290" y="120" width="100" height="46" rx="4" fill="hsl(20 14% 6%)" stroke="hsl(20 10% 18%)" strokeWidth="1" />
      <text x="340" y="142" textAnchor="middle" fontSize="9" fill="hsl(30 20% 80%)" fontFamily="monospace">Self-Hosted</text>
      <text x="340" y="156" textAnchor="middle" fontSize="7" fill="hsl(142 70% 50%)" fontFamily="monospace">● synchronized</text>

      <text x="210" y="198" textAnchor="middle" fontSize="8" fill="hsl(30 8% 40%)" fontFamily="monospace">parallel multi-ref dispatch · atomic branch verification</text>
    </svg>
  );
}
