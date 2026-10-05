import React from 'react';
import { Cloud, MapPin, AlertTriangle, CheckCircle, Clock, BarChart3, Activity, Eye } from 'lucide-react';

interface DashboardProps {
  showAnalytics?: boolean;
  showEvents?: boolean;
  compact?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ showAnalytics = false, showEvents = true, compact = false }) => {
  return (
    <div className={`glass-card p-3 ${compact ? 'text-xs' : 'text-sm'} w-full`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-cyan-900/30 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Cloud size={12} className="text-white" />
          </div>
          <span className="font-bold text-white">INDRACAST</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px]">LIVE</span>
          </div>
          <span className="text-cyan-400/60 text-[10px]">
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <StatCard icon={<Activity size={12} />} label="Active Events" value="24" color="cyan" />
        <StatCard icon={<AlertTriangle size={12} />} label="Flagged" value="3" color="red" />
        <StatCard icon={<CheckCircle size={12} />} label="Verified" value="18" color="green" />
        <StatCard icon={<Clock size={12} />} label="Under Review" value="3" color="yellow" />
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-3 gap-2">
        {/* Map area */}
        <div className="col-span-2 bg-navy-light/50 rounded-lg p-2 border border-cyan-900/20 relative overflow-hidden" style={{ minHeight: compact ? 120 : 180 }}>
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 200 150" className="w-full h-full">
              <path d="M100 10 L120 20 L140 35 L150 55 L155 80 L150 105 L140 120 L120 135 L100 145 L80 135 L60 120 L50 105 L45 80 L50 55 L60 35 L80 20 Z"
                fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
            </svg>
          </div>
          {/* Event markers on map */}
          <div className="absolute top-[20%] left-[55%]">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="absolute top-[40%] left-[35%]">
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute top-[60%] left-[60%]">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute top-[30%] left-[70%]">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
          <div className="absolute bottom-[20%] left-[45%]">
            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.7s' }} />
          </div>
          <div className="absolute bottom-1 left-1 text-[8px] text-cyan-400/50">
            <MapPin size={8} className="inline" /> India Weather Map
          </div>
        </div>

        {/* Events list */}
        {showEvents && (
          <div className="space-y-1.5">
            <div className="text-[10px] text-cyan-400 font-semibold mb-1 flex items-center gap-1">
              <Eye size={10} /> LIVE EVENTS
            </div>
            <EventItem type="corroborated" title="Heavy Rain" location="Noida, UP" />
            <EventItem type="flagged" title="Flooding" location="Chennai, TN" />
            <EventItem type="review" title="Heatwave" location="Delhi NCR" />
            <EventItem type="corroborated" title="Thunderstorm" location="Mumbai, MH" />
            <EventItem type="review" title="Fog" location="Punjab" />
          </div>
        )}
      </div>

      {/* Analytics section */}
      {showAnalytics && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-navy-light/50 rounded-lg p-2 border border-cyan-900/20">
            <div className="text-[10px] text-cyan-400 font-semibold mb-1 flex items-center gap-1">
              <BarChart3 size={10} /> EVENT TRENDS
            </div>
            <div className="flex items-end gap-1 h-12">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t opacity-70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="bg-navy-light/50 rounded-lg p-2 border border-cyan-900/20">
            <div className="text-[10px] text-cyan-400 font-semibold mb-1">SOURCE DISTRIBUTION</div>
            <div className="space-y-1">
              <SourceBar label="Weather APIs" pct={35} color="bg-blue-500" />
              <SourceBar label="Citizen Reports" pct={28} color="bg-cyan-500" />
              <SourceBar label="News" pct={20} color="bg-purple-500" />
              <SourceBar label="Social Media" pct={17} color="bg-green-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => {
  const colorMap: Record<string, string> = {
    cyan: 'text-cyan-400 border-cyan-900/30',
    red: 'text-red-400 border-red-900/30',
    green: 'text-green-400 border-green-900/30',
    yellow: 'text-yellow-400 border-yellow-900/30',
  };
  return (
    <div className={`rounded-lg p-1.5 border ${colorMap[color]} bg-navy-light/30`}>
      <div className={`${colorMap[color].split(' ')[0]} flex items-center gap-1`}>
        {icon}
        <span className="font-bold text-sm">{value}</span>
      </div>
      <div className="text-[8px] text-gray-400 mt-0.5">{label}</div>
    </div>
  );
};

const EventItem: React.FC<{ type: 'corroborated' | 'flagged' | 'review'; title: string; location: string }> = ({ type, title, location }) => {
  const statusColor = type === 'corroborated' ? 'bg-green-500' : type === 'flagged' ? 'bg-red-500' : 'bg-yellow-500';
  const statusLabel = type === 'corroborated' ? '✓' : type === 'flagged' ? '⚠' : '?';
  return (
    <div className="flex items-center gap-1.5 bg-navy-light/30 rounded px-1.5 py-1 border border-cyan-900/10">
      <div className={`w-4 h-4 rounded-full ${statusColor} flex items-center justify-center text-[8px] text-white font-bold`}>
        {statusLabel}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-[10px] truncate">{title}</div>
        <div className="text-gray-500 text-[8px] truncate">{location}</div>
      </div>
    </div>
  );
};

const SourceBar: React.FC<{ label: string; pct: number; color: string }> = ({ label, pct, color }) => (
  <div className="flex items-center gap-1">
    <span className="text-[8px] text-gray-400 w-16 truncate">{label}</span>
    <div className="flex-1 h-1.5 bg-navy-light rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
    </div>
    <span className="text-[8px] text-gray-500">{pct}%</span>
  </div>
);

export default Dashboard;
