import React from 'react';

interface IndiaMapProps {
  events?: Array<{ x: number; y: number; type: string; label: string }>;
  showHeatmap?: boolean;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ events = [], showHeatmap = false }) => {
  return (
    <svg viewBox="0 0 500 600" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.15))' }}>
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
          <stop offset="100%" stopColor="rgba(6,182,212,0)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="250" cy="300" rx="180" ry="250" fill="url(#mapGlow)" />

      {/* India outline - more detailed */}
      <path
        d="M230 45 L245 42 L260 45 L275 50 L290 55 L305 62 L318 72 L330 85 L340 100 
           L348 115 L355 132 L360 150 L365 168 L368 185 L372 200 L378 218 L385 235 
           L390 252 L393 270 L395 288 L392 305 L388 322 L382 338 L375 355 L368 370 
           L358 385 L348 398 L338 412 L325 425 L312 438 L298 448 L285 458 L272 468 
           L260 478 L252 490 L248 502 L245 515 L242 505 L238 492 L232 480 L225 468 
           L215 455 L205 442 L195 430 L185 418 L175 405 L165 390 L155 375 L148 358 
           L142 342 L138 325 L135 308 L132 290 L130 272 L132 255 L135 238 L140 220 
           L145 205 L152 188 L158 172 L165 158 L175 142 L185 128 L195 115 L205 102 
           L215 90 L225 78 L230 65 L230 45 Z"
        fill="rgba(6, 182, 212, 0.04)"
        stroke="rgba(6, 182, 212, 0.5)"
        strokeWidth="1.5"
        filter="url(#glow)"
      />

      {/* Kashmir region */}
      <path
        d="M200 55 L215 48 L230 45 L225 58 L215 65 L205 62 Z"
        fill="rgba(6, 182, 212, 0.03)"
        stroke="rgba(6, 182, 212, 0.3)"
        strokeWidth="1"
      />

      {/* Northeast region */}
      <path
        d="M340 100 L355 95 L370 100 L380 112 L375 125 L365 130 L355 128 L345 120 L340 110 Z"
        fill="rgba(6, 182, 212, 0.03)"
        stroke="rgba(6, 182, 212, 0.3)"
        strokeWidth="1"
      />

      {/* Sri Lanka */}
      <ellipse cx="258" cy="545" rx="12" ry="18" fill="rgba(6, 182, 212, 0.03)" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />

      {/* State boundaries - internal lines */}
      <path d="M175 150 L350 145" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.8" strokeDasharray="4,6" />
      <path d="M155 200 L370 195" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.8" strokeDasharray="4,6" />
      <path d="M145 250 L385 248" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.8" strokeDasharray="4,6" />
      <path d="M140 300 L390 298" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.8" strokeDasharray="4,6" />
      <path d="M148 350 L375 348" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.8" strokeDasharray="4,6" />
      <path d="M165 400 L345 398" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.8" strokeDasharray="4,6" />
      <path d="M200 440 L300 438" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.8" strokeDasharray="4,6" />
      
      {/* Vertical state boundaries */}
      <path d="M200 70 L185 430" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.8" strokeDasharray="4,6" />
      <path d="M260 50 L250 510" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.8" strokeDasharray="4,6" />
      <path d="M320 80 L310 440" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.8" strokeDasharray="4,6" />

      {/* City dots (major cities) */}
      {[
        { x: 240, y: 120, name: 'Delhi' },
        { x: 310, y: 180, name: 'Lucknow' },
        { x: 340, y: 210, name: 'Patna' },
        { x: 360, y: 240, name: 'Kolkata' },
        { x: 200, y: 280, name: 'Mumbai' },
        { x: 230, y: 350, name: 'Bangalore' },
        { x: 260, y: 420, name: 'Chennai' },
        { x: 180, y: 320, name: 'Goa' },
        { x: 280, y: 300, name: 'Hyderabad' },
      ].map((city, i) => (
        <g key={city.name} opacity="0.5">
          <circle cx={city.x} cy={city.y} r="2" fill="rgba(6,182,212,0.6)" />
          <text x={city.x + 5} y={city.y + 3} fill="rgba(6,182,212,0.4)" fontSize="7" fontFamily="Inter">{city.name}</text>
        </g>
      ))}

      {/* Heatmap overlay */}
      {showHeatmap && (
        <>
          <circle cx="300" cy="180" r="45" fill="rgba(239, 68, 68, 0.08)">
            <animate attributeName="r" values="40;50;40" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="260" r="55" fill="rgba(249, 115, 22, 0.06)">
            <animate attributeName="r" values="50;60;50" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="340" cy="300" r="40" fill="rgba(245, 158, 11, 0.08)">
            <animate attributeName="r" values="35;45;35" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="250" cy="400" r="50" fill="rgba(239, 68, 68, 0.06)">
            <animate attributeName="r" values="45;55;45" dur="4.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="180" cy="340" r="35" fill="rgba(245, 158, 11, 0.07)">
            <animate attributeName="r" values="30;40;30" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="220" r="38" fill="rgba(6, 182, 212, 0.06)">
            <animate attributeName="r" values="33;43;33" dur="3.8s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Event markers */}
      {events.map((event, i) => (
        <g key={i} filter="url(#glow)">
          {/* Pulse ring */}
          <circle cx={event.x} cy={event.y} r="6" fill="none" stroke={getEventColor(event.type)} strokeWidth="1.5" opacity="0.5">
            <animate attributeName="r" values="6;16;6" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
          </circle>
          {/* Inner ring */}
          <circle cx={event.x} cy={event.y} r="8" fill="none" stroke={getEventColor(event.type)} strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="8;20;8" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3 + 0.5}s`} />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3 + 0.5}s`} />
          </circle>
          {/* Core dot */}
          <circle cx={event.x} cy={event.y} r="4" fill={getEventColor(event.type)} opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          </circle>
          {/* Label */}
          <text x={event.x + 12} y={event.y - 6} fill="white" fontSize="8" fontFamily="Inter" opacity="0.85" fontWeight="500">
            {event.label}
          </text>
          {/* Type indicator */}
          <text x={event.x + 12} y={event.y + 5} fill={getEventColor(event.type)} fontSize="6" fontFamily="Inter" opacity="0.6">
            {getEventTypeLabel(event.type)}
          </text>
        </g>
      ))}
    </svg>
  );
};

function getEventColor(type: string): string {
  switch(type) {
    case 'flood': return '#ef4444';
    case 'rain': return '#3b82f6';
    case 'storm': return '#f97316';
    case 'heat': return '#f59e0b';
    case 'fog': return '#94a3b8';
    case 'wind': return '#06b6d4';
    default: return '#06b6d4';
  }
}

function getEventTypeLabel(type: string): string {
  switch(type) {
    case 'flood': return 'FLOOD RISK';
    case 'rain': return 'HEAVY RAIN';
    case 'storm': return 'THUNDERSTORM';
    case 'heat': return 'HEATWAVE';
    case 'fog': return 'DENSE FOG';
    case 'wind': return 'STRONG WIND';
    default: return 'WEATHER';
  }
}

export default IndiaMap;
