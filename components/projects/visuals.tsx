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
