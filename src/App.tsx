import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, ChevronRight, ChevronLeft, Play, Pause, RotateCcw } from 'lucide-react';
import IndiaMap from './components/IndiaMap';
import IntelligenceLoop from './components/IntelligenceLoop';
import Dashboard from './components/Dashboard';
import DataParticles from './components/DataParticles';

const scenes = [
  { id: 1, title: 'THE PROBLEM', duration: 10000, narration: '"Weather information is everywhere, but it is fragmented across APIs, news, social platforms, citizen reports, images and videos."' },
  { id: 2, title: 'SIGNIFICANCE', duration: 8000, narration: '"The challenge is not simply collecting more data. Weather situations evolve continuously, while reports can be duplicated, incomplete, delayed or contradictory."' },
  { id: 3, title: 'THE GAP', duration: 9000, narration: '"Existing systems provide valuable weather data, but information can remain distributed. What is needed is a system that continuously updates its understanding as new evidence arrives."' },
  { id: 4, title: 'LOOP ENGINEERING', duration: 10000, narration: '"IndraCast uses a Loop Engineering approach. The platform continuously collects, understands, verifies and refreshes weather intelligence."' },
  { id: 5, title: 'WHAT IS INDRACAST', duration: 7000, narration: '"IndraCast transforms this continuous flow of information into consolidated, location-aware and verification-aware weather intelligence."' },
  { id: 6, title: 'MULTI-SOURCE INGESTION', duration: 6000, narration: '"The loop begins by continuously collecting information from multiple weather, public and user-generated sources."' },
  { id: 7, title: 'AI EVENT UNDERSTANDING', duration: 6000, narration: '"AI-assisted processing identifies the event, hazard, location, time and relevant context."' },
  { id: 8, title: 'DEDUPLICATION & CLUSTERING', duration: 7000, narration: '"The system identifies duplicate and related reports and consolidates them into a unified weather event."' },
  { id: 9, title: 'CONTINUOUS VERIFICATION', duration: 8000, narration: '"As new evidence arrives, IndraCast reassesses the event and updates its verification-aware status."' },
  { id: 10, title: 'GEO-SPATIAL INTELLIGENCE', duration: 6000, narration: '"Every event is connected to its geographic context, enabling monitoring from national level down to specific areas."' },
  { id: 11, title: 'DECISION SUPPORT', duration: 7000, narration: '"The updated intelligence powers live monitoring, analytics, alerts and decision-support views for users and authorities."' },
  { id: 12, title: 'THE LOOP CONTINUES', duration: 4000, narration: '"And the loop continues, allowing IndraCast to evolve its event intelligence as the situation changes."' },
  { id: 13, title: 'FINAL', duration: 6000, narration: '"IndraCast turns continuously changing weather information into continuously updated, verification-aware intelligence."' },
];

function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const nextScene = useCallback(() => {
    setCurrentScene(prev => (prev < scenes.length - 1 ? prev + 1 : prev));
    setProgress(0);
  }, []);

  const prevScene = useCallback(() => {
    setCurrentScene(prev => (prev > 0 ? prev - 1 : prev));
    setProgress(0);
  }, []);

  const restart = useCallback(() => {
    setCurrentScene(0);
    setProgress(0);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const duration = scenes[currentScene].duration;
    const interval = 50;
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + (interval / duration) * 100;
        if (next >= 100) {
          if (currentScene < scenes.length - 1) {
            nextScene();
          } else {
            setIsPlaying(false);
          }
          return 0;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [currentScene, isPlaying, nextScene]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setIsPlaying(false);
        nextScene();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        prevScene();
      } else if (e.key === 'p' || e.key === 'P') {
        setIsPlaying(prev => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        restart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScene, prevScene, restart]);

  return (
    <div className="w-full h-full bg-[#0a1628] text-white overflow-hidden relative">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Data particles */}
      <DataParticles />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-cyan-900/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Cloud size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider">INDRACAST</h1>
              <p className="text-[10px] text-cyan-400/60">Weather Intelligence & Event Verification Platform</p>
            </div>
            <div className="ml-3 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
              <span className="text-[9px] text-orange-400 font-semibold tracking-wider">SMART INDIA HACKATHON</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-900/30">
              <span className="text-[10px] text-cyan-400 font-semibold tracking-wider">
                {scenes[currentScene].title}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {currentScene + 1}/{scenes.length}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 rounded bg-cyan-900/30 hover:bg-cyan-900/50 transition-colors">
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button onClick={restart} className="p-1.5 rounded bg-cyan-900/30 hover:bg-cyan-900/50 transition-colors">
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-cyan-900/20">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Scene content */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center p-8 pb-16"
            >
              {renderScene(currentScene)}
            </motion.div>
          </AnimatePresence>

          {/* Narration subtitle bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`narration-${currentScene}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-3xl w-full px-6"
            >
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-cyan-900/30">
                <p className="text-xs text-cyan-100/90 text-center italic leading-relaxed">
                  {scenes[currentScene].narration}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <div className="flex items-center justify-between px-6 py-2.5 border-t border-cyan-900/20">
          <button
            onClick={prevScene}
            disabled={currentScene === 0}
            className="flex items-center gap-1 text-xs text-cyan-400 disabled:opacity-30 hover:text-cyan-300 transition-colors"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {scenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentScene(i); setProgress(0); setIsPlaying(false); }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentScene ? 'bg-cyan-400 w-8' : 'bg-cyan-900/50 w-1.5 hover:bg-cyan-800/50'
                  }`}
                />
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 text-[9px] text-gray-600">
              <span className="px-1.5 py-0.5 rounded bg-gray-800/50 border border-gray-700/30">←→</span>
              <span>Navigate</span>
              <span className="px-1.5 py-0.5 rounded bg-gray-800/50 border border-gray-700/30">P</span>
              <span>Play/Pause</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[9px] text-cyan-600 font-semibold tracking-wider hidden sm:inline">SIH DEMO</span>
            <button
              onClick={nextScene}
              disabled={currentScene === scenes.length - 1}
              className="flex items-center gap-1 text-xs text-cyan-400 disabled:opacity-30 hover:text-cyan-300 transition-colors"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderScene(sceneIndex: number) {
  switch (sceneIndex) {
    case 0: return <Scene1_Problem />;
    case 1: return <Scene2_Significance />;
    case 2: return <Scene3_Gap />;
    case 3: return <Scene4_LoopEngineering />;
    case 4: return <Scene5_WhatIsIndraCast />;
    case 5: return <Scene6_MultiSource />;
    case 6: return <Scene7_AIUnderstanding />;
    case 7: return <Scene8_Deduplication />;
    case 8: return <Scene9_Verification />;
    case 9: return <Scene10_GeoSpatial />;
    case 10: return <Scene11_DecisionSupport />;
    case 11: return <Scene12_LoopContinues />;
    case 12: return <Scene13_Final />;
    default: return null;
  }
}

// ============ SCENE COMPONENTS ============

function Scene1_Problem() {
  const events = [
    { x: 300, y: 180, type: 'rain', label: 'Heavy Rainfall' },
    { x: 200, y: 250, type: 'flood', label: 'Flooding' },
    { x: 320, y: 300, type: 'storm', label: 'Thunderstorm' },
    { x: 250, y: 150, type: 'heat', label: 'Heatwave' },
    { x: 180, y: 320, type: 'fog', label: 'Dense Fog' },
    { x: 350, y: 220, type: 'wind', label: 'Strong Winds' },
  ];

  const sources = ['Weather APIs', 'News', 'Citizen Reports', 'Social Media', 'Images/Videos'];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">FRAGMENTED WEATHER INFORMATION</h2>
        <p className="text-cyan-400/70 text-sm max-w-xl">
          Weather information is everywhere, but it is fragmented across APIs, news, social platforms, citizen reports, images and videos.
        </p>
      </motion.div>

      <div className="flex items-center gap-8 w-full max-w-5xl">
        {/* India Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-1/2 h-64"
        >
          <IndiaMap events={events} />
        </motion.div>

        {/* Sources */}
        <div className="w-1/2 space-y-2">
          {sources.map((source, i) => (
            <motion.div
              key={source}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.2 }}
              className="glass-card px-4 py-2 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-100">{source}</span>
              <div className="flex-1 flex justify-end gap-1">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="w-8 h-1 bg-cyan-800/50 rounded" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Multiple reports describing same event */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex gap-3 mt-2"
      >
        {['"Heavy rain in Noida"', '"Waterlogging in Noida"', '"Roads flooded in Noida"'].map((report, i) => (
          <div key={i} className="glass-card px-3 py-1.5 text-xs text-gray-300 border-l-2 border-cyan-500">
            {report}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Scene2_Significance() {
  const reports = [
    { text: 'Heavy rain in Noida', source: 'Citizen Report' },
    { text: 'Waterlogging reported in Noida', source: 'News' },
    { text: 'Roads flooded after heavy rainfall', source: 'Social Media' },
    { text: 'Noida sees record rainfall today', source: 'Weather API' },
    { text: 'Traffic disrupted due to waterlogging', source: 'Citizen Report' },
    { text: 'Flood situation in Sector 62, Noida', source: 'News' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-center"
      >
        MORE DATA ≠ BETTER INTELLIGENCE
      </motion.h2>
      <p className="text-cyan-400/70 text-sm max-w-2xl text-center">
        Weather situations evolve continuously. Reports can be duplicated, incomplete, delayed or contradictory.
      </p>

      <div className="grid grid-cols-3 gap-3 max-w-4xl w-full">
        {reports.map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.3 }}
            className="glass-card p-3 border-l-2 border-yellow-500/50"
          >
            <p className="text-xs text-white mb-1">"{report.text}"</p>
            <p className="text-[10px] text-gray-500">— {report.source}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="flex items-center gap-2 mt-4"
      >
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
        <span className="text-yellow-400 text-xs">Reports arriving continuously...</span>
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </motion.div>
    </div>
  );
}

function Scene3_Gap() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-bold text-center"
      >
        THE GAP: DATA EXISTS. CONTINUOUS INTELLIGENCE IS MISSING.
      </motion.h2>

      <div className="flex items-center gap-8 w-full max-w-5xl">
        {/* LEFT - Disconnected */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="glass-card p-4 border-red-900/30">
            <h3 className="text-sm font-bold text-red-400 mb-3">DISCONNECTED APPROACH</h3>
            <div className="space-y-2">
              {['Multiple data sources', 'Separate reports', 'Manual comparison', 'Static information', 'No continuous updates'].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="flex items-center gap-2 text-xs text-gray-400"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <ChevronRight size={24} className="text-cyan-400" />
          <span className="text-[10px] text-cyan-400">NEEDED</span>
          <ChevronRight size={24} className="text-cyan-400" />
        </motion.div>

        {/* RIGHT - Loop forming */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex-1 flex items-center justify-center"
        >
          <IntelligenceLoop compact active highlightStage={-1} />
        </motion.div>
      </div>
    </div>
  );
}

function Scene4_LoopEngineering() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % 7);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-gradient"
      >
        CONTINUOUS WEATHER INTELLIGENCE LOOP
      </motion.h2>
      <p className="text-cyan-400/60 text-xs text-center max-w-xl">
        Instead of processing information once, the platform continuously collects, understands, verifies and refreshes.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <IntelligenceLoop active highlightStage={activeStage} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 mt-2"
      >
        {['COLLECT', '→', 'UNDERSTAND', '→', 'CONSOLIDATE', '→', 'VERIFY', '→', 'VISUALIZE', '→', 'ACT', '→', 'UPDATE', '→', '↺'].map((item, i) => (
          <span key={i} className={`text-[10px] ${item === '→' || item === '↺' ? 'text-cyan-600' : 'text-cyan-300 font-semibold'}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Scene5_WhatIsIndraCast() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center glow-cyan">
            <Cloud size={24} className="text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gradient mb-2">INDRACAST</h2>
        <p className="text-cyan-400/80 text-sm">India's Weather Intelligence & Event Verification Platform</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Dashboard showAnalytics showEvents />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-gray-400 text-center max-w-lg"
      >
        Transforms continuous information flow into consolidated, location-aware and verification-aware weather intelligence.
      </motion.p>
    </div>
  );
}

function Scene6_MultiSource() {
  const sources = [
    { name: 'Weather APIs', icon: '🌐', color: 'border-blue-500' },
    { name: 'Citizen Reports', icon: '👤', color: 'border-cyan-500' },
    { name: 'News & Web', icon: '📰', color: 'border-purple-500' },
    { name: 'Social Media', icon: '📱', color: 'border-green-500' },
    { name: 'Images / Videos', icon: '📷', color: 'border-orange-500' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold"
      >
        MULTI-SOURCE DATA INGESTION
      </motion.h2>

      <div className="flex items-center gap-6 w-full max-w-4xl">
        {/* Sources */}
        <div className="flex-1 space-y-3">
          {sources.map((source, i) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className={`glass-card px-4 py-3 border-l-4 ${source.color} flex items-center gap-3`}
            >
              <span className="text-xl">{source.icon}</span>
              <span className="text-sm text-white">{source.name}</span>
              <div className="flex-1" />
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
            </motion.div>
          ))}
        </div>

        {/* Arrow/Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="text-cyan-400 text-2xl">→</div>
          <div className="text-cyan-400 text-2xl">→</div>
          <div className="text-cyan-400 text-2xl">→</div>
        </motion.div>

        {/* IndraCast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="glass-card p-6 glow-cyan text-center">
            <Cloud size={32} className="text-cyan-400 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-gradient">INDRACAST</h3>
            <p className="text-[10px] text-cyan-400/60 mt-1">Continuous Intelligence Loop</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Scene7_AIUnderstanding() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold"
      >
        AI-POWERED EVENT UNDERSTANDING
      </motion.h2>

      <div className="flex items-center gap-8 w-full max-w-4xl">
        {/* Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="glass-card p-4 border-l-4 border-cyan-500">
            <p className="text-xs text-gray-500 mb-1">RAW REPORT</p>
            <p className="text-sm text-white italic">"Heavy rain reported in Noida at 3 PM causing waterlogging on main roads."</p>
          </div>
        </motion.div>

        {/* AI Processing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center animate-pulse-ring">
            <span className="text-2xl">🧠</span>
          </div>
          <span className="text-[10px] text-cyan-400">AI Processing</span>
        </motion.div>

        {/* Output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
          className="flex-1"
        >
          <div className="glass-card p-4 space-y-2">
            <p className="text-xs text-gray-500">EXTRACTED INTELLIGENCE</p>
            {[
              { label: 'Hazard', value: 'Heavy Rain', color: 'text-blue-400' },
              { label: 'Location', value: 'Noida, UP', color: 'text-cyan-400' },
              { label: 'Time', value: '3:00 PM', color: 'text-green-400' },
              { label: 'Category', value: 'Rainfall', color: 'text-purple-400' },
              { label: 'Impact', value: 'Waterlogging', color: 'text-orange-400' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.15 }}
                className="flex items-center justify-between"
              >
                <span className="text-[10px] text-gray-500">{item.label}</span>
                <span className={`text-xs font-semibold ${item.color}`}>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Scene8_Deduplication() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold"
      >
        DEDUPLICATION + EVENT CLUSTERING
      </motion.h2>

      <div className="flex items-center gap-8 w-full max-w-4xl">
        {/* Multiple reports */}
        <div className="flex-1 space-y-2">
          {['REPORT A: Heavy rain in Noida', 'REPORT B: Waterlogging in Noida', 'REPORT C: Flood in Sector 62', 'REPORT D: Rain causing disruption'].map((report, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="glass-card px-3 py-2 text-xs text-gray-300 border-l-2 border-yellow-500/50"
            >
              {report}
            </motion.div>
          ))}
        </div>

        {/* Processing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-cyan-400 text-lg">→</div>
          <div className="glass-card px-3 py-2 text-center">
            <p className="text-[10px] text-cyan-400">Similarity</p>
            <p className="text-[10px] text-cyan-400">Analysis</p>
          </div>
          <div className="text-cyan-400 text-lg">→</div>
        </motion.div>

        {/* Consolidated event */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="flex-1"
        >
          <div className="glass-card p-4 border-2 border-green-500/50 glow-green">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px]">✓</div>
              <span className="text-xs font-bold text-green-400">CONSOLIDATED EVENT</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white font-semibold">Heavy Rain / Noida</p>
              <p className="text-[10px] text-gray-400">4 reports merged • Confidence: High</p>
              <p className="text-[10px] text-gray-400">Status: Corroborated</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="text-xs text-cyan-400/60 text-center"
      >
        The system identifies duplicate and related reports and consolidates them into a unified weather event.
      </motion.p>
    </div>
  );
}

function Scene9_Verification() {
  const [status, setStatus] = useState<'review' | 'corroborated' | 'flagged'>('review');

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => {
        if (prev === 'review') return 'corroborated';
        if (prev === 'corroborated') return 'flagged';
        return 'review';
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    review: { color: 'border-yellow-500', bg: 'bg-yellow-500', label: 'UNDER REVIEW', icon: '?' },
    corroborated: { color: 'border-green-500', bg: 'bg-green-500', label: 'CORROBORATED', icon: '✓' },
    flagged: { color: 'border-red-500', bg: 'bg-red-500', label: 'FLAGGED', icon: '⚠' },
  };

  const current = statusConfig[status];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold"
      >
        CONTINUOUS CORROBORATION
      </motion.h2>

      <div className="flex items-center gap-8 w-full max-w-4xl">
        {/* Existing event */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className={`glass-card p-4 border-2 ${current.color} transition-all duration-500`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-5 h-5 rounded-full ${current.bg} flex items-center justify-center text-[10px] text-white font-bold transition-all duration-500`}>
                {current.icon}
              </div>
              <span className="text-sm font-bold text-white">Heavy Rain — Noida</span>
            </div>
            <div className={`text-xs font-semibold ${current.color.replace('border', 'text')} transition-all duration-500`}>
              Status: {current.label}
            </div>
          </div>
        </motion.div>

        {/* New evidence arriving */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-[10px] text-cyan-400 mb-1">NEW EVIDENCE</div>
          {['Weather API data', 'Citizen Report', 'Official Warning'].map((evidence, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.4 }}
              className="glass-card px-3 py-1.5 text-[10px] text-cyan-300 border-l-2 border-cyan-500"
            >
              {evidence}
            </motion.div>
          ))}
          <div className="text-cyan-400 text-sm mt-1">↓</div>
          <div className="text-[10px] text-cyan-400">RE-EVALUATION</div>
        </motion.div>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex-1 space-y-2"
        >
          <div className="text-[10px] text-gray-500 mb-2">POSSIBLE STATUSES:</div>
          {[
            { status: 'CORROBORATED', color: 'bg-green-500', desc: 'Multiple sources agree' },
            { status: 'UNDER REVIEW', color: 'bg-yellow-500', desc: 'Insufficient evidence' },
            { status: 'FLAGGED', color: 'bg-red-500', desc: 'Contradictory data' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 p-2 rounded transition-all duration-300 ${
              current.label === item.status ? 'bg-white/5 border border-white/10' : 'opacity-50'
            }`}>
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <div>
                <p className="text-[10px] text-white font-semibold">{item.status}</p>
                <p className="text-[8px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Scene10_GeoSpatial() {
  const events = [
    { x: 300, y: 180, type: 'rain', label: 'Noida' },
    { x: 200, y: 250, type: 'flood', label: 'Chennai' },
    { x: 320, y: 300, type: 'storm', label: 'Mumbai' },
    { x: 250, y: 150, type: 'heat', label: 'Delhi' },
    { x: 180, y: 320, type: 'fog', label: 'Punjab' },
    { x: 350, y: 220, type: 'wind', label: 'Kolkata' },
    { x: 280, y: 380, type: 'rain', label: 'Bangalore' },
    { x: 220, y: 400, type: 'storm', label: 'Kerala' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold"
      >
        GEO-SPATIAL WEATHER INTELLIGENCE
      </motion.h2>
      <p className="text-cyan-400/60 text-xs text-center max-w-lg">
        Every event is connected to its geographic context, enabling monitoring from national level down to specific areas.
      </p>

      <div className="flex items-center gap-6 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-2/3 h-72"
        >
          <IndiaMap events={events} showHeatmap />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="w-1/3 space-y-2"
        >
          <div className="text-[10px] text-cyan-400 font-semibold mb-2">ZOOM LEVELS</div>
          {['India (National)', 'State Level', 'District Level', 'City Level', 'Area Level'].map((level, i) => (
            <motion.div
              key={level}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.2 }}
              className="glass-card px-3 py-2 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ opacity: 1 - i * 0.15 }} />
              <span className="text-xs text-gray-300">{level}</span>
            </motion.div>
          ))}
          <div className="mt-3 text-[10px] text-gray-500">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500/50" /> <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" /> <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500/50" /> <span>Low / Verified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Scene11_DecisionSupport() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold"
      >
        DECISION SUPPORT
      </motion.h2>
      <p className="text-cyan-400/60 text-xs text-center max-w-lg">
        Updated intelligence powers live monitoring, analytics, alerts and decision-support views.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-5xl"
      >
        <Dashboard showAnalytics showEvents />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-4 mt-2"
      >
        {['Live Weather', 'Weather Reports', 'Live Events', 'Analytics', 'Alerts'].map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.15 }}
            className="glass-card px-3 py-2 text-xs text-cyan-300"
          >
            {feature}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function Scene12_LoopContinues() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % 7);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-gradient"
      >
        THE LOOP CONTINUES
      </motion.h2>

      <div className="flex items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <IntelligenceLoop active highlightStage={activeStage} compact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          {[
            { text: 'NEW DATA', desc: 'Reports continuously arrive' },
            { text: 'NEW EVIDENCE', desc: 'AI extracts intelligence' },
            { text: 'UPDATED EVENT', desc: 'Events are re-evaluated' },
            { text: 'UPDATED INTELLIGENCE', desc: 'Map & analytics refresh' },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
              <div>
                <p className="text-xs font-bold text-cyan-300">{item.text}</p>
                <p className="text-[10px] text-gray-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Scene13_Final() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="space-y-2">
          {[
            'FRAGMENTED INFORMATION',
            '↓',
            'CONTINUOUS INTELLIGENCE LOOP',
            '↓',
            'CONSOLIDATED EVENTS',
            '↓',
            'VERIFICATION-AWARE INSIGHTS',
            '↓',
            'DECISION SUPPORT',
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.2 }}
              className={`text-sm ${line === '↓' ? 'text-cyan-600' : 'text-cyan-200 font-semibold'}`}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
        className="text-center mt-4"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center glow-cyan">
            <Cloud size={28} className="text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gradient mb-2">INDRACAST</h2>
        <p className="text-cyan-400/80 text-sm">India's Weather Intelligence & Event Verification Platform</p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="text-xs text-gray-400 mt-4 max-w-md mx-auto"
        >
          Continuously turns changing weather information into updated, consolidated and verification-aware event intelligence.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="flex items-center gap-1 mt-4"
      >
        {['COLLECT', '→', 'UNDERSTAND', '→', 'CONSOLIDATE', '→', 'VERIFY', '→', 'VISUALIZE', '→', 'ACT', '→', 'UPDATE', '→', '↺'].map((item, i) => (
          <span key={i} className={`text-[10px] ${item === '→' || item === '↺' ? 'text-cyan-600' : 'text-cyan-300 font-bold'}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default App;
