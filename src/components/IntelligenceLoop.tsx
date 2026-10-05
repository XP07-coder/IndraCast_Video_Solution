import React from 'react';

const LOOP_STAGES = [
  { label: 'COLLECT', icon: '📡', color: '#06b6d4' },
  { label: 'UNDERSTAND', icon: '🧠', color: '#2563eb' },
  { label: 'CONSOLIDATE', icon: '🔗', color: '#8b5cf6' },
  { label: 'VERIFY', icon: '✅', color: '#10b981' },
  { label: 'VISUALIZE', icon: '🗺️', color: '#06b6d4' },
  { label: 'ACT', icon: '⚡', color: '#f59e0b' },
  { label: 'UPDATE', icon: '🔄', color: '#ef4444' },
];

interface IntelligenceLoopProps {
  active?: boolean;
  highlightStage?: number;
  compact?: boolean;
}

const IntelligenceLoop: React.FC<IntelligenceLoopProps> = ({ active = true, highlightStage = -1, compact = false }) => {
  const size = compact ? 280 : 380;
  const radius = compact ? 100 : 140;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer rotating ring */}
      <svg width={size} height={size} className="absolute inset-0">
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 20}
          fill="none"
          stroke="rgba(6,182,212,0.1)"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-rotate-slow"
          style={{ transformOrigin: 'center' }}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 30}
          fill="none"
          stroke="rgba(37,99,235,0.08)"
          strokeWidth="1"
          strokeDasharray="3,7"
          className="animate-rotate-reverse"
          style={{ transformOrigin: 'center' }}
        />
      </svg>

      {/* Connection lines */}
      <svg width={size} height={size} className="absolute inset-0">
        {LOOP_STAGES.map((_, i) => {
          const angle1 = (i * 360 / LOOP_STAGES.length - 90) * (Math.PI / 180);
          const angle2 = ((i + 1) * 360 / LOOP_STAGES.length - 90) * (Math.PI / 180);
          const x1 = centerX + radius * Math.cos(angle1);
          const y1 = centerY + radius * Math.sin(angle1);
          const x2 = centerX + radius * Math.cos(angle2);
          const y2 = centerY + radius * Math.sin(angle2);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(6,182,212,0.3)"
              strokeWidth="2"
              strokeDasharray="4,4"
              className="animate-dash-flow"
            />
          );
        })}
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`font-bold text-cyan-400 ${compact ? 'text-xs' : 'text-sm'} animate-pulse-ring`}>
            CONTINUOUS
          </div>
          <div className={`font-bold text-white ${compact ? 'text-sm' : 'text-lg'}`}>
            INTELLIGENCE
          </div>
          <div className={`font-bold text-cyan-400 ${compact ? 'text-xs' : 'text-sm'} animate-pulse-ring`}>
            LOOP
          </div>
        </div>
      </div>

      {/* Stage nodes */}
      {LOOP_STAGES.map((stage, i) => {
        const angle = (i * 360 / LOOP_STAGES.length - 90) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const isActive = highlightStage === i;
        const nodeSize = compact ? 36 : 48;

        return (
          <div
            key={i}
            className={`absolute loop-node flex flex-col items-center justify-center rounded-full transition-all duration-300 ${
              isActive ? 'scale-125 z-10' : ''
            }`}
            style={{
              left: x - nodeSize / 2,
              top: y - nodeSize / 2,
              width: nodeSize,
              height: nodeSize,
              background: isActive 
                ? `radial-gradient(circle, ${stage.color}40, ${stage.color}20)`
                : 'rgba(10, 22, 40, 0.9)',
              border: `2px solid ${isActive ? stage.color : 'rgba(6,182,212,0.3)'}`,
              boxShadow: isActive ? `0 0 20px ${stage.color}60` : 'none',
            }}
          >
            <span className={compact ? 'text-xs' : 'text-sm'}>{stage.icon}</span>
          </div>
        );
      })}

      {/* Stage labels */}
      {LOOP_STAGES.map((stage, i) => {
        const angle = (i * 360 / LOOP_STAGES.length - 90) * (Math.PI / 180);
        const labelRadius = radius + (compact ? 32 : 42);
        const x = centerX + labelRadius * Math.cos(angle);
        const y = centerY + labelRadius * Math.sin(angle);
        const isActive = highlightStage === i;

        return (
          <div
            key={`label-${i}`}
            className={`absolute text-center transition-all duration-300 ${
              isActive ? 'text-cyan-300 font-bold' : 'text-cyan-500/70'
            }`}
            style={{
              left: x - 35,
              top: y - 8,
              width: 70,
              fontSize: compact ? '8px' : '10px',
              letterSpacing: '0.05em',
            }}
          >
            {stage.label}
          </div>
        );
      })}

      {/* Animated data particles flowing around the loop */}
      {active && (
        <svg width={size} height={size} className="absolute inset-0">
          {[0, 1, 2].map(p => (
            <circle key={p} r="3" fill="#06b6d4" opacity="0.8">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${p * 1.3}s`}
                path={`M${centerX},${centerY - radius} A${radius},${radius} 0 1,1 ${centerX - 0.01},${centerY - radius}`}
              />
            </circle>
          ))}
        </svg>
      )}
    </div>
  );
};

export default IntelligenceLoop;
