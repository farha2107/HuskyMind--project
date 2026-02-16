"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Briefcase, BrainCircuit, Gamepad2, Sparkles, ArrowRight, Activity, Globe, Lock, Shield, Zap, Search, User, BookOpen, Layers, Cpu, Terminal, Disc, Dna, Dog, Share2, Database, Code, Download, Fingerprint, Scan, Send, Maximize2, Minimize2, ChevronRight, Move, Grid, Rocket } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import StarBackground from "@/components/ui/StarBackground";
import NavigationDock from "@/components/layout/NavigationDock";
import { useFloatAnimation } from "@/hooks/useFloatAnimation";
import { INTERVIEW_TOPICS } from "./interview_topics";
import HolographicTimeline from "@/components/ui/HolographicTimeline";
import CommunityHub from "@/components/ui/CommunityHub";
import SkillGapAnalysis from "@/components/ui/SkillGapAnalysis";
import TacticalGridBackground from "@/components/ui/TacticalGridBackground";
import ResumeStudio from "@/components/ui/ResumeStudio";
import LiveTerminal from "@/components/ui/LiveTerminal";
import PortfolioHub from "@/components/ui/PortfolioHub";
import CoursesHub from "@/components/ui/CoursesHub";
import GenesisArchitect from "@/components/ui/GenesisArchitect";
import { useApiKey } from "@/context/ApiKeyContext";


// --- REUSABLE COMPONENTS ---

function FeatureCard({ icon: Icon, title, desc, delay, sysId }: { icon: any, title: string, desc: string, delay: number, sysId: string }) {
  return (
    <GlassCard className="h-full flex flex-col justify-between group hover:bg-white/10 transition-colors relative overflow-hidden text-left border border-white/10">
      <div className="absolute top-3 right-3 flex flex-col items-end opacity-50">
        <span className="text-[9px] font-mono text-cyan-500/80 tracking-widest">{sysId}</span>
      </div>
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 text-neon-cyan">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-white/50 text-xs">{desc}</p>
      </div>
    </GlassCard>
  );
}

function ModuleCard({ title, desc, children, delay, sysId }: { title: string, desc: string, children?: React.ReactNode, delay: number, sysId: string }) {
  return (
    <motion.div className="h-full">
      <GlassCard className="h-full relative overflow-hidden group border border-white/10 p-0">
        <div className="w-full h-8 border-b border-white/5 flex items-center justify-between px-4 bg-white/5">
          <span className="text-[10px] font-mono text-white/40 tracking-widest">{sysId}</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/50 animate-pulse" />
          </div>
        </div>
        <div className="relative z-10 pt-8 px-6 pb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/60 mb-6 max-w-sm text-sm">{desc}</p>
          {children}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-electric-purple/10 to-transparent pointer-events-none" />
      </GlassCard>
    </motion.div>
  );
}

// --- TYPEWRITER TERMINAL COMPONENT ---
const TypewriterTerminal = () => {
  const messages = [
    "ANALYZING CLOUD ARCHITECTURE...",
    "VERIFYING JAVA HEAP SPACE...",
    "OPTIMIZING NEURAL PATHWAYS...",
    "SYNCING PROFESSIONAL DNA...",
    "CALIBRATING GLOBAL SENSORS..."
  ];
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      const currentFullMsg = messages[msgIndex];

      if (!isDeleting && charIndex < currentFullMsg.length) {
        setCurrentMsg(currentFullMsg.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentMsg(currentFullMsg.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === currentFullMsg.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setMsgIndex((prev) => (prev + 1) % messages.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, msgIndex, messages]);

  return (
    <div className="font-mono text-neon-cyan text-xs tracking-wider flex items-center justify-center gap-2 mb-12 opacity-80">
      <Terminal size={12} className="text-neon-cyan" />
      <span>{currentMsg}</span>
      <span className="animate-pulse">_</span>
    </div>
  );
};

// --- SYSTEM LOG COMPONENT ---
const SystemLog = () => {
  const logs = [
    { time: "08:00:01", server: "NODE_ALPHA", status: "CONNECTED", color: "text-green-400" },
    { time: "08:00:04", server: "JAVA_RUNTIME", status: "STABLE", color: "text-cyan-400" },
    { time: "08:00:09", server: "AZ-900_AUTH", status: "VERIFIED", color: "text-white" },
    { time: "08:00:12", server: "NELLORE_SERVER", status: "UPLINK ACTIVE", color: "text-white" },
  ];

  return (
    <div className="w-full bg-black/40 rounded-lg p-3 border border-white/5 font-mono text-[10px] text-white/70 overflow-hidden relative h-24 flex flex-col">
      <div className="flex justify-between items-center border-b border-white/10 pb-1 mb-2">
        <span className="text-neon-cyan/80 tracking-widest">SYSTEM_LOGS // CLOUD_ADMIN</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden mask-linear-fade">
        <motion.div
          animate={{ y: [0, -60] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="space-y-1 absolute w-full"
        >
          {[...logs, ...logs, ...logs].map((log, i) => ( // Repeat heavily for seamless loop
            <div key={i} className="flex gap-2 items-center whitespace-nowrap">
              <span className="text-white/30">[{log.time}]</span>
              <span className="text-white/50">{log.server}:</span>
              <span className={`${log.color}`}>{log.status}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-1 flex items-center gap-1 text-neon-cyan">
        <span>_</span>
        <span className="animate-pulse w-1.5 h-3 bg-neon-cyan block" />
      </div>
    </div>
  );
};
// --- NEURAL SKILL NETWORK COMPONENT ---
const NeuralSkillNetwork = () => {
  const nodes = [
    { id: "java", label: "JAVA", sub: "SPRING", x: 20, y: 20, pct: "94%" },
    { id: "cloud", label: "AZURE", sub: "CLOUD", x: 220, y: 20, pct: "88%" },
    { id: "ai", label: "NLP", sub: "AI/LLM", x: 20, y: 140, pct: "91%" },
    { id: "infra", label: "INFRA", sub: "DOCKER", x: 220, y: 140, pct: "85%" },
  ];

  return (
    <div className="w-full h-48 relative flex items-center justify-center font-mono">
      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => (
          <motion.line
            key={i}
            x1="50%" y1="50%"
            x2={node.x + 40} y2={node.y + 20} // Approximate center of nodes
            stroke="rgba(0, 243, 255, 0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        {/* Pulsing Particles on Lines */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`p-${i}`}
            r="2"
            fill="#bd00ff"
            initial={{ pathLength: 0 }} // This doesn't apply to circle, need motion guide or simple transform
          >
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={`M160,80 L${node.x + 40},${node.y + 20}`} // From Center (approx 160,80) to Node
            />
          </motion.circle>
        ))}
      </svg>

      {/* Center Core */}
      <motion.div
        className="absolute z-20 w-20 h-20 bg-black/60 backdrop-blur-md rounded-full border border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.3)] flex flex-col items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="text-[10px] text-neon-cyan tracking-widest">CORE</div>
        <div className="text-xs font-bold text-white">PRO_DEV</div>
      </motion.div>

      {/* Satellite Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute z-20 w-20 h-10 bg-[#0a0b1e]/80 border border-white/10 rounded-lg flex flex-col items-center justify-center hover:border-electric-purple hover:bg-white/5 transition-all cursor-crosshair group"
          style={{ left: node.x, top: node.y }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="text-[10px] font-bold text-white group-hover:hidden">{node.label}</div>
          <div className="text-[8px] text-white/50 group-hover:hidden">{node.sub}</div>

          {/* Hover Reveal */}
          <div className="hidden group-hover:flex flex-col items-center">
            <span className="text-electric-purple font-bold text-xs">{node.pct}</span>
            <span className="text-[8px] text-white">MASTERY</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
// --- WORLD CLOCK COMPONENT ---
const WorldClock = () => {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (tz: string) => {
    return time.toLocaleTimeString("en-US", {
      timeZone: tz,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
    });
  };

  const clocks = [
    { city: "NELLORE", tz: "Asia/Kolkata", time: formatTime("Asia/Kolkata") },
    { city: "LONDON", tz: "Europe/London", time: formatTime("Europe/London") },
    { city: "NEW YORK", tz: "America/New_York", time: formatTime("America/New_York") },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      {clocks.map((clock, i) => (
        <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1 last:border-0 last:pb-0">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${mounted ? 'bg-green-500 animate-pulse' : 'bg-red-500/50'}`} />
            <span className="text-white/70">{clock.city}</span>
          </div>
          <span className="text-neon-cyan tracking-wider">{mounted ? clock.time : "--:--:--"}</span>
        </div>
      ))}
      <div className="mt-1 text-[8px] text-white/30 text-center tracking-widest uppercase">Global Sync {mounted ? 'Active' : 'Initializing...'}</div>
    </div>
  );
};




// --- DNA HELIX COMPONENT ---
const DNAHelix = () => {
  return (
    <div className="relative h-64 w-20 mx-auto flex flex-col justify-between items-center py-4">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-full h-1 bg-white/10 rounded-full relative flex items-center justify-center"
          animate={{ rotateY: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
          style={{ width: `${60 + Math.sin(i) * 20}%` }} // Varying widths for 3D effect illusion
        >
          <div className="absolute left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]" />
          <div className="absolute right-0 w-2 h-2 rounded-full bg-electric-purple shadow-[0_0_5px_#a855f7]" />
          <div className="w-full h-[1px] bg-gradient-to-r from-cyan-500/50 to-electric-purple/50" />
        </motion.div>
      ))}
    </div>
  );
};

// --- QUANTUM PATH SIMULATOR ---
const QuantumPathSimulator = () => {
  const [nodes, setNodes] = useState([
    { id: "java", x: 50, y: 50, label: "Java", type: "skill" },
    { id: "cloud", x: 200, y: 100, label: "Cloud", type: "skill" },
    { id: "ai", x: 350, y: 50, label: "AI/ML", type: "skill" },
    { id: "lead", x: 200, y: 200, label: "Tech Lead", type: "role" },
  ]);
  const [projection, setProjection] = useState({ salary: "$140k", percent: 85 });

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />

      {/* Simulator Canvas */}
      <div className="flex-1 relative">
        {nodes.map(node => (
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            onDragEnd={() => setProjection({ salary: `$${140 + Math.floor(Math.random() * 40)}k`, percent: Math.floor(80 + Math.random() * 15) })}
            key={node.id}
            className={`absolute p-3 rounded-xl border border-white/20 backdrop-blur-md cursor-grab active:cursor-grabbing shadow-[0_0_15px_rgba(0,0,0,0.5)] ${node.type === 'role' ? 'bg-electric-purple/20 border-electric-purple/50' : 'bg-[#0a0b1e]/80'}`}
            style={{ left: node.x, top: node.y }}
          >
            <div className="flex items-center gap-2">
              {node.type === 'skill' ? <Cpu size={14} className="text-neon-cyan" /> : <BrainCircuit size={14} className="text-electric-purple" />}
              <span className="text-xs font-bold text-white">{node.label}</span>
            </div>
            {node.type === 'skill' && <div className="text-[9px] text-white/50 mt-1 font-mono">DRAG TO LINK</div>}
          </motion.div>
        ))}

        {/* Connecting Lines (Simulated) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <path d="M100,100 Q200,150 250,250" stroke="cyan" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <path d="M400,100 Q300,150 250,250" stroke="purple" strokeWidth="2" fill="none" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Simulation Panel */}
      <div className="h-24 border-t border-white/10 bg-black/40 flex items-center justify-between px-8 backdrop-blur-md">
        <div>
          <div className="text-[10px] text-neon-cyan font-mono tracking-widest mb-1">PROJECTED_VALUE_YEAR_1</div>
          <div className="text-3xl font-bold text-white">{projection.salary}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-electric-purple font-mono tracking-widest mb-1">PATH_VIABILITY</div>
          <div className="text-2xl font-bold text-white">{projection.percent}% <span className="text-sm font-normal text-white/50">MATCH</span></div>
        </div>
      </div>
    </div>
  );
};

// --- CLOUD OPS DASHBOARD ---
const CloudOpsDashboard = () => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Activity size={24} className="text-cyan-400" />
        <h2 className="text-xl font-sans font-medium text-white tracking-wide">Infrastructure Health <span className="text-white/30 mx-2">//</span> Azure Zone: South India</h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Compute */}
        <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col gap-4 hover:border-cyan-500/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400"><Cpu size={24} /></div>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
          </div>
          <div>
            <div className="text-slate-200 text-sm font-medium mb-1">Compute Engine</div>
            <div className="text-cyan-400 font-mono text-xs">vm-series-a2 | Running | 42% Load</div>
          </div>
        </div>

        {/* Card 2: Storage */}
        <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col gap-4 hover:border-purple-500/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400"><Database size={24} /></div>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
          </div>
          <div>
            <div className="text-slate-200 text-sm font-medium mb-1">Blob Storage</div>
            <div className="text-cyan-400 font-mono text-xs">blob-storage-01 | Encrypted | 99.9% Uptime</div>
          </div>
        </div>

        {/* Card 3: Network */}
        <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col gap-4 hover:border-pink-500/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400"><Globe size={24} /></div>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
          </div>
          <div>
            <div className="text-slate-200 text-sm font-medium mb-1">Virtual Network</div>
            <div className="text-cyan-400 font-mono text-xs">VNET-04 | Latency: 14ms | 0 Packet Loss</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- RESUME SCANNER (STUDENT WAR ROOM) ---
const ResumeScanner = () => {
  const [activeTab, setActiveTab] = useState("scan");
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const runDiagnostics = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2">AI Resume Architect <span className="text-neon-cyan">// Student Edition</span></h2>
        <p className="text-white/50">Bypass the bots. Upload your resume and paste a Job Description to get an instant ATS Match Score.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-8 border-b border-white/10 mb-8 relative z-10">
        {[
          { id: "scan", label: "DIAGNOSTIC SCAN" },
          { id: "heatmap", label: "KEYWORD HEATMAP" },
          { id: "doctor", label: "BULLET POINT DOCTOR" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-bold tracking-widest transition-colors relative ${activeTab === tab.id ? "text-neon-cyan" : "text-slate-500 hover:text-white"}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan shadow-[0_0_10px_#00f3ff]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative z-10 min-h-[400px]">
        {activeTab === "scan" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Panel: Resume */}
              <div className="h-64 border-2 border-dashed border-cyan-500/30 rounded-2xl bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center group hover:border-cyan-500/60 transition-colors cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileText size={48} className="text-cyan-500/50 mb-4 group-hover:scale-110 transition-transform relative z-10" />
                <p className="text-white/60 font-mono text-sm relative z-10">Drop PDF Resume Here (Analyzing Structure...)</p>
              </div>

              {/* Right Panel: Job Desc */}
              <textarea
                className="h-64 rounded-2xl bg-black/50 border border-white/10 p-6 text-white/80 focus:outline-none focus:border-neon-cyan/50 resize-none font-mono text-sm placeholder-white/30"
                placeholder="Paste Google/Microsoft Job Description here..."
              />
            </div>

            {/* Action Area */}
            <div className="flex flex-col items-center justify-center min-h-[160px]">
              {!showResults ? (
                <button
                  onClick={runDiagnostics}
                  disabled={analyzing}
                  className="group relative px-8 py-4 bg-cyan-500/10 border border-cyan-500/50 rounded-full text-cyan-400 font-bold tracking-widest hover:bg-cyan-500/20 transition-all overflow-hidden"
                >
                  {analyzing ? 'RUNNING DIAGNOSTICS...' : 'ANALYZE MATCH'}
                  {analyzing && <div className="absolute inset-0 bg-cyan-500/20 animate-pulse" />}
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-2xl bg-black/60 border border-red-500/30 rounded-2xl p-8 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-8 mb-6">
                    {/* Gauge Placeholder */}
                    <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="#1a1b2e" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="60" stroke="#ef4444" strokeWidth="8" fill="none" strokeDasharray="377" strokeDashoffset={377 - (377 * 0.42)} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-red-500">42%</span>
                        <span className="text-[10px] text-red-500/70 tracking-widest">MATCH</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        CRITICAL SKILLS MISSING
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {["Kubernetes", "Docker", "System Design", "React Native"].map(skill => (
                          <span key={skill} className="px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                            ! {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-green-500/20 border border-green-500/50 text-green-400 font-bold rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2">
                    <Sparkles size={16} /> AUTO-OPTIMIZE RESUME (AI)
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "heatmap" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
            <h3 className="text-xl font-bold text-white mb-6">Keyword Analysis</h3>
            <div className="flex flex-wrap gap-4">
              {["React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js"].map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" /> {skill}
                </span>
              ))}
              {["Docker", "Kubernetes", "AWS", "GraphQL", "CI/CD"].map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" /> {skill} <span className="text-[10px] opacity-70">(MISSING)</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "doctor" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-white/70">Weak Bullet Point</label>
              <textarea
                className="w-full h-40 rounded-xl bg-black/50 border border-red-500/30 p-4 text-white/80 focus:outline-none focus:border-red-500/60 resize-none"
                defaultValue="Worked on a team to build a web app using React and Node.js. It was a good project."
              />
              <button className="w-full py-3 bg-electric-purple/20 border border-electric-purple/50 text-electric-purple font-bold rounded-lg hover:bg-electric-purple/30 transition-colors flex items-center justify-center gap-2">
                <Sparkles size={16} /> GENERATIVE FIX
              </button>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-green-400">AI Optimized Version</label>
              <div className="w-full h-40 rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-green-300/90 text-sm leading-relaxed">
                "Collaborated within an agile team to architect and deploy a scalable full-stack web application using React and Node.js, resulting in a 40% improvement in user engagement metrics."
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/50">Action Verbs: Architected, Deployed</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/50">Metrics: 40%</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};




// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const { apiKey } = useApiKey();
  const PUBLIC_GEMINI_KEY = apiKey || ""; // Dynamic BYOK Key

  const [activeView, setActiveView] = useState('dashboard');
  const [isPublished, setIsPublished] = useState(false);

  // ---------------------------------------------------------
  // 📂 RESUME WAR ROOM STATES
  // ---------------------------------------------------------
  const [resumeText, setResumeText] = useState(""); // Stores your resume content
  const [resumeFile, setResumeFile] = useState<File | null>(null); // Stores the file object
  const [resumeBase64, setResumeBase64] = useState<string | null>(null); // Stores the base64 content
  const [jobDesc, setJobDesc] = useState("");       // Stores the job description
  const [matchResult, setMatchResult] = useState<any>(null); // Stores the AI Score
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Loading state

  // 🆕 ATS V2 STATES
  const [optimizedResume, setOptimizedResume] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [atsViewMode, setAtsViewMode] = useState<'upload' | 'editor' | 'comparison'>('upload');

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [showProtocol, setShowProtocol] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [interviewState, setInterviewState] = useState('idle'); // idle, recording, analyzing, result
  const [interviewActive, setInterviewActive] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [interviewFeedback, setInterviewFeedback] = useState("");
  const [feedbackData, setFeedbackData] = useState<any>(null);

  const [selectedTopic, setSelectedTopic] = useState("");
  const [topicSearch, setTopicSearch] = useState("");

  // ---------------------------------------------------------
  // 🧬 GENESIS ARCHITECT STATES (The AI CTO)
  // ---------------------------------------------------------
  const [genesisIdea, setGenesisIdea] = useState("");
  const [genesisPlan, setGenesisPlan] = useState<any>(null);
  const [isArchitecting, setIsArchitecting] = useState(false);

  // ⬇️ NEW FUNCTION: IMPORT FROM PORTFOLIO
  const handleImportPortfolio = () => {
    const skills = portfolioData.skills.join(", ");
    const exp = portfolioData.experience.map(e => `• ${e.role} at ${e.company} (${e.year}): ${e.desc}`).join("\n");
    const projs = portfolioData.projects.map(p => `• ${p.title}: ${p.desc} | Tech: ${p.tech} | Impact: ${p.impact?.join(", ")}`).join("\n");
    const certs = portfolioData.certs.map(c => `• ${c.name} (${c.issuer}, ${c.year})`).join("\n");
    // @ts-ignore
    const edu = portfolioData.education?.map(e => `• ${e.degree}, ${e.school} (${e.year})`).join("\n") || "";

    const fullText = `
NAME: ${portfolioData.name}
ROLE: ${portfolioData.role}
BIO: ${portfolioData.bio}

SKILLS:
${skills}

EXPERIENCE:
${exp}

PROJECTS:
${projs}

EDUCATION:
${edu}

CERTIFICATIONS:
${certs}
    `.trim();

    setResumeText(fullText);
    setAtsViewMode('editor');
  };

  // ⬇️ NEW FUNCTION: AUTO-OPTIMIZE RESUME
  const handleAutoOptimize = async () => {
    if (!resumeText && !resumeBase64) return; // User can iterate on text OR use fresh PDF
    setIsOptimizing(true);

    // Clean key and select models (Prioritize speed & stability)
    const cleanKey = PUBLIC_GEMINI_KEY ? PUBLIC_GEMINI_KEY.trim() : "";
    // 🔄 DYNAMIC MODEL DISCOVERY (Same robust logic as Analysis)
    let modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash"]; // Default

    try {
      console.log("Fetching available models for Optimization...");
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
      const listData = await listRes.json();

      if (listData.models) {
        const dynamicModels = listData.models
          .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
          .map((m: any) => m.name.replace("models/", ""));

        // Smart Sort: 2.0 -> 1.5 Flash -> Pro -> Others
        modelsToTry = dynamicModels.sort((a: string, b: string) => {
          if (a.includes("2.0")) return -1;
          if (b.includes("2.0")) return 1;
          if (a.includes("flash") && !b.includes("flash")) return -1;
          return 0;
        });
        console.log("Optimization Models:", modelsToTry);
      }
    } catch (e) {
      console.warn("Model discovery failed, using defaults.", e);
    }

    // 2. BUILD CONTEXT FROM PREVIOUS ANALYSIS (If available)
    const analysisContext = matchResult ? `
      🚨 CRITICAL FIXES REQUIRED 🚨
      The current resume scored ${matchResult.matchScore}/100.
      
      YOU MUST FIX THESE SPECIFIC ISSUES:
      - MISSING KEYWORDS to Inject: ${matchResult.missingKeywords.join(", ")}
      - IMPACT WEAKNESS: ${matchResult.titanAdvice}
      - CLARITY ISSUE: ${matchResult.zenAdvice}
    ` : "";

    // 3. CONSTRUCT ELITE SYSTEM PROMPT
    const systemPrompt = `
      ACT AS WORLD'S BEST RESUME WRITER & ATS ALGORITHM EXPERT.
      
      YOUR MISSION:
      Rewrite the provided RESUME to achieve a **95-100% MATCH SCORE** against the JOB DESCRIPTION.
      
      ${analysisContext}

      EXECUTION PLAN:
      1. 🛡️ **Fix the Tactical Weaknesses** identified above immediately.
      2. 🔑 **Inject Missing Keywords** naturally into bullet points (Don't just list them).
      3. 📈 **Quantify Impact**: Transform generic tasks into metric-driven achievements (e.g., "Managed team" -> "Led 5-person team to deliver 20% efficiency gain").
      4. ⚡ **Power Verbs**: Replace weak verbs with high-agency ones (Architected, Orchestrated, Engineered).
      5. ✨ **Formatting**: Keep the output clean, professional, and ready to copy-paste.

      CONSTRAINT:
      - RETURN ONLY THE REWRITTEN RESUME TEXT.
      - NO PREAMBLE (e.g., "Here is your resume").
      - NO MARKDOWN CODE BLOCKS.
      ${jobDesc ? "" : "- Since no Job Description was provided, optimize for GENERAL TECH IMPACT & LEADERSHIP."}
    `;

    // 4. CONSTRUCT MULTIMODAL PAYLOAD
    // If text is available (user edited it), prioritize text. Otherwise use PDF.
    const userContentParts: any[] = [{
      text: systemPrompt + (jobDesc ? `\n\n🎯 TARGET JOB DESCRIPTION:\n"${jobDesc}"` : "")
    }];

    if (resumeText && resumeText.length > 50) {
      userContentParts[0].text += `\n\n📄 CURRENT RESUME TEXT:\n${resumeText}`;
    } else if (resumeBase64) {
      userContentParts.push({
        inline_data: {
          mime_type: "application/pdf",
          data: resumeBase64
        }
      });
    }

    let success = false;
    let lastError: any = null;

    for (const model of modelsToTry) {
      if (success) break;

      try {
        console.log(`Attempting optimization with ${model}...`);
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: userContentParts }]
          })
        });

        // Handle specific HTTP errors
        if (res.status === 404) throw new Error("Model Not Found (404)");
        if (res.status === 429) throw new Error("Rate Limit Exceeded (429)");

        const data = await res.json();

        if (data.error) throw new Error(data.error.message || "API Error");
        if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) throw new Error("Invalid Response Structure");

        const text = data.candidates[0].content.parts[0].text;
        setOptimizedResume(text.replace(/```/g, ""));
        setAtsViewMode('comparison');
        success = true;

      } catch (e: any) {
        console.warn(`${model} Optimization Failed:`, e);
        lastError = e;

        // Aggressive backoff for rate limits
        if (e.message.includes("429") || e.message.includes("Quota")) {
          console.log("Rate limited. Waiting 4 seconds...");
          await new Promise(r => setTimeout(r, 4000));
        }
      }
    }

    setIsOptimizing(false);

    if (!success) {
      console.error("All Optimization Attempts Failed:", lastError);
      alert(`Optimization Failed. Please check console for details.\nError: ${lastError.message}`);
    }
  };

  const startSpecificInterview = (topic: string) => {
    setSelectedTopic(topic);
    setInterviewActive(true);
    setCurrentQuestion("INITIALIZING " + topic.toUpperCase() + " PROTOCOL...");
    setInterviewFeedback("");
    setUserAnswer("");
    setIsThinking(true);

    // ⚡ TITAN STARTS IMMEDIATELY (Safely)
    const systemPrompt = `ACT AS A TOUGH ${topic.toUpperCase()} INTERVIEWER. The user is applying for a ${topic} role. Ask the FIRST technical question about ${topic}. Keep it short (under 2 sentences). Return JSON: { "question": "..." }`;
    const cleanKey = PUBLIC_GEMINI_KEY ? PUBLIC_GEMINI_KEY.trim() : "";

    // 🛡️ FALLBACK QUESTION GENERATOR
    const fallbackQuestion = `Welcome to the ${topic} protocol. To begin, explain the most complex challenge you've faced when working with ${topic}, and how you resolved it.`;

    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
    })
      .then(res => {
        if (!res.ok) {
          console.warn(`Titan API Error (${res.status}) - Switching to Offline Mode`);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.candidates && data.candidates.length > 0) {
          const text = data.candidates[0].content.parts[0].text;
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const json = JSON.parse(jsonMatch[0]);
            setCurrentQuestion(json.question);
          } else {
            setCurrentQuestion(fallbackQuestion);
          }
        } else {
          setCurrentQuestion(fallbackQuestion);
        }
      })
      .catch(err => {
        console.error("Titan Error", err);
        setCurrentQuestion(fallbackQuestion);
      })
      .finally(() => setIsThinking(false));
  };

  // ---------------------------------------------------------
  // 🏗️ FUNCTION: GENESIS ARCHITECT (The AI CTO)
  // ---------------------------------------------------------
  const handleGenesisStart = async () => {
    if (!genesisIdea) {
      alert("Please describe your app idea first!");
      return;
    }

    setIsArchitecting(true);
    const cleanKey = PUBLIC_GEMINI_KEY ? PUBLIC_GEMINI_KEY.trim() : "";

    if (!cleanKey) {
      alert("API Key is missing.");
      setIsArchitecting(false);
      return;
    }

    try {
      const systemPrompt =
        "ACT AS A SENIOR CTO & SOFTWARE ARCHITECT.\n" +
        "User Idea: " + genesisIdea + "\n" +
        "TASK: Turn this vague idea into a professional Technical Specification (PRD).\n" +
        "RETURN JSON ONLY: { \n" +
        "  \"appName\": \"Creative Name for App\", \n" +
        "  \"tagline\": \"Catchy one-liner\", \n" +
        "  \"techStack\": [\"Frontend Tool\", \"Backend Tool\", \"Database\", \"Key API\"], \n" +
        "  \"coreFeatures\": [\"MVP Feature 1\", \"MVP Feature 2\", \"MVP Feature 3\"], \n" +
        "  \"databaseStructure\": \"Describe tables/collections (e.g. Users, Posts)\", \n" +
        "  \"stepByStepPlan\": [\"Week 1: Setup...\", \"Week 2: Auth...\", \"Week 3: API...\"] \n" +
        "}";

      // 1. DISCOVER MODELS (Robust Fallback - Loop Strategy)
      let availableModels: string[] = [];
      try {
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
        const listData = await listRes.json();
        if (listData.models) {
          availableModels = listData.models
            .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
            .map((m: any) => m.name.replace("models/", ""));
        }
      } catch (e) {
        console.warn("Model discovery failed.", e);
      }

      // Fallback if list is empty (Blind Guess)
      if (availableModels.length === 0) {
        availableModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
      }

      // Sort Priority: Flash -> Pro -> Others
      availableModels.sort((a, b) => {
        if (a.includes("flash") && !b.includes("flash")) return -1;
        if (b.includes("flash") && !a.includes("flash")) return 1;
        return 0;
      });

      console.log("Genesis Models Candidate List:", availableModels);

      let successData = null;
      let lastError = null;

      // 2. TRY LOOP
      for (const model of availableModels) {
        try {
          console.log(`Genesis attempting via: ${model}...`);
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
          });

          const data = await response.json();

          if (data.error) {
            throw new Error(`${model} Error: ${data.error.message}`);
          }

          if (!data.candidates || !data.candidates[0]?.content) {
            throw new Error(`${model} returned empty content.`);
          }

          // SUCCESS!
          successData = data;
          break; // Exit loop

        } catch (err) {
          console.warn(`Failed on ${model}:`, err);
          lastError = err;
          continue; // Try next
        }
      }

      if (!successData) {
        throw lastError || new Error("All AI models failed to respond.");
      }

      const textResponse = successData.candidates[0].content.parts[0].text;
      const cleanJson = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
      setGenesisPlan(JSON.parse(cleanJson)); // Save the Blueprint!

    } catch (error: any) {
      console.error("Genesis Error:", error);
      alert(`Blueprint creation failed: ${error.message || "Unknown Error"}`);
    } finally {
      setIsArchitecting(false);
    }
  };


  const handleInterviewTurn = async () => {
    if (!interviewActive) {
      // START INTERVIEW
      setInterviewActive(true);
      setCurrentQuestion("To start, explain the CAP theorem and how it applies to a distributed system you've built.");
      setUserAnswer("");
      setInterviewFeedback("");
    } else {
      // SUBMIT ANSWER
      if (!userAnswer.trim()) return;

      setIsThinking(true);

      // Simulate AI Analysis (Replace with real API later if needed)
      setTimeout(() => {
        setInterviewFeedback("Solid understanding of Consistency vs Availability. However, you didn't mention Partition Tolerance explicitly. 8/10.");
        setCurrentQuestion("Great. Now, how would you design a rate limiter for a high-traffic API?");
        setUserAnswer("");
        setIsThinking(false);
      }, 1500);
    }
  };
  const [assessmentMode, setAssessmentMode] = useState('simulation'); // 'simulation' or 'archives'
  const [portfolioData, setPortfolioData] = useState({
    name: "ALEX CHEN",
    role: "FULL STACK ARCHITECT",
    bio: "Building scalable cloud systems and AI interfaces for the next generation of the web.",
    github: "github.com/alex",
    linkedin: "linkedin.com/in/alex",
    skills: ["React", "Node.js", "AWS", "Docker", "Python", "Kubernetes"],
    education: [
      { degree: "M.S. Computer Science", school: "Stanford University", year: "2023", honors: "AI Specialization" },
      { degree: "B.S. Software Engineering", school: "Univ. of Washington", year: "2021", honors: "Magna Cum Laude" }
    ],
    projects: [
      {
        title: "Neural Cloud OS",
        desc: "A browser-based operating system for career growth.",
        tech: "React + Tailwind",
        problem: "Traditional portfolios are static and boring.",
        impact: ["Increased recruiter engagement by 300%", "Processed 10k+ API requests daily"]
      },
      {
        title: "Orbital Chat",
        desc: "Real-time satellite communication simulator.",
        tech: "Socket.io + Redis",
        problem: "Latency in varied network conditions.",
        impact: ["Reduced latency by 40ms", "Scaled to 50k concurrent users"]
      }
    ],
    experience: [
      { role: "Senior Engineer", company: "TechNova", year: "2024-Present", desc: "Led migration to microservices architecture." },
      { role: "Full Stack Dev", company: "HyperLoop", year: "2022-2024", desc: "Built real-time dashboard systems." }
    ],
    certs: [
      { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2025" },
      { name: "Certified Kubernetes Admin", issuer: "CNCF", year: "2024" }
    ],
    customSections: []
  });

  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const [isRealAI, setIsRealAI] = useState(false);
  const [boardResponse, setBoardResponse] = useState<any>(null);
  const [userQuery, setUserQuery] = useState("");

  const mentorScenarios: Record<string, { query: string; responses: { name: string; role: string; color: string; bg: string; border: string; advice: string }[] }> = {
    'salary': {
      query: "I received an offer for $80k, but I wanted $100k. Should I negotiate?",
      responses: [
        { name: "TITAN", role: "THE EXECUTIVE", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/50", advice: "Never accept the first offer. It makes you look weak. Counter at $110k and settle for $100k. If they pull the offer, they weren't serious." },
        { name: "NOVA", role: "THE FUTURIST", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/50", advice: "Ignore the base salary. Ask for Equity and Learning Stipends. In 2030, ownership matters more than cash. Does this company use AI? If not, leave." },
        { name: "ZEN", role: "THE COACH", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/50", advice: "Money is energy, but so is stress. If you push for $100k, will they expect 80-hour weeks? ensure the culture aligns with your peace." }
      ]
    },
    'stack': {
      query: "Should I learn Rust or stick with Python for 2026?",
      responses: [
        { name: "TITAN", role: "THE EXECUTIVE", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/50", advice: "Python pays the bills TODAY. Enterprise clients run on legacy code. Master what sells now. Don't chase toys." },
        { name: "NOVA", role: "THE FUTURIST", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/50", advice: "Rust is the language of the AGI infrastructure. Python is for prototyping. If you want to build the Engine, learn Rust. If you want to paint the car, Python." },
        { name: "ZEN", role: "THE COACH", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/50", advice: "Which one brings you flow? Struggling with a language you hate leads to burnout. Follow your curiosity, not the market hype." }
      ]
    },
    'burnout': {
      query: "I feel like I'm falling behind. Everyone is learning faster than me.",
      responses: [
        { name: "TITAN", role: "THE EXECUTIVE", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/50", advice: "The market doesn't care about your feelings. Efficiency is key. Automate your learning. Use AI to summarize papers. Work smarter, not harder." },
        { name: "NOVA", role: "THE FUTURIST", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/50", advice: "Linear learning is dead. You are competing with AIs that learn instantly. Focus on 'Synthesis'—connecting dots, not memorizing syntax." },
        { name: "ZEN", role: "THE COACH", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/50", advice: "Comparison is the thief of joy. You are running your own race. Disconnect for 24 hours. A rested mind learns 2x faster than an anxious one." }
      ]
    }
  };

  const callGeminiAI = async (query: string) => { // DIAGNOSIS START
    // 🔴 UNIVERSAL FIX: FORCE 'gemini-1.5-flash' (Standard for New Keys)
    // This bypasses the "ListModels" check which was failing for some keys.
    const cleanKey = PUBLIC_GEMINI_KEY ? PUBLIC_GEMINI_KEY.trim() : "";

    if (!cleanKey || cleanKey.length < 10) {
      alert("DEV ERROR: Key is missing.");
      setIsThinking(false);
      return;
    }

    try {
      // ---------------------------------------------------------
      // STEP A: ASK GOOGLE "WHAT MODELS CAN I USE?" (ListModels)
      // ---------------------------------------------------------
      console.log("Checking allowed models...");
      const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
      const listData = await listResponse.json();

      if (listData.error) {
        alert(`KEY ERROR: Your API Key ending in '...${keyEnd}' is BLOCKED.\n\nGoogle says: ${listData.error.message}`);
        setIsThinking(false);
        return;
      }

      // ---------------------------------------------------------
      // STEP B: FIND A WORKING MODEL
      // ---------------------------------------------------------
      // We look for 'gemini-1.5-flash' or 'gemini-pro' in the allowed list
      const allowedModels = listData.models || [];
      console.log("Allowed Models:", allowedModels);

      let targetModel = "";

      // Prioritize Flash, then Pro
      if (allowedModels.some(m => m.name.includes("gemini-1.5-flash"))) {
        targetModel = "gemini-1.5-flash";
      } else if (allowedModels.some(m => m.name.includes("gemini-pro"))) {
        targetModel = "gemini-pro";
      } else {
        // Fallback: Just take the first available generateContent model
        const firstModel = allowedModels.find(m => m.supportedGenerationMethods?.includes("generateContent"));
        if (firstModel) {
          targetModel = firstModel.name.replace("models/", "");
        }
      }

      if (!targetModel) {
        alert(`ACCOUNT ISSUE: Your key is valid, but Google has given you 0 models to use.\n\nWait 5 minutes for the new project to activate.`);
        setIsThinking(false);
        return;
      }

      // ---------------------------------------------------------
      // STEP C: CONNECT USING THE FOUND MODEL
      // ---------------------------------------------------------
      // alert(`SUCCESS! Found working model: ${targetModel}. Connecting now...`); // Uncomment for debug

      const systemPrompt =
        "You are a Career Advisory Board (Titan, Nova, Zen). Answer: " + query +
        ". Return ONLY JSON: { \"titan\": \"...\", \"nova\": \"...\", \"zen\": \"...\" }";

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${cleanKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }]
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      if (!data.candidates || !data.candidates[0].content) {
        throw new Error("No response from AI");
      }

      const textResponse = data.candidates[0].content.parts[0].text;
      const cleanJson = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedResponse = JSON.parse(cleanJson);

      setBoardResponse(parsedResponse);

    } catch (error) {
      console.error("Previous Error:", error);
      setBoardResponse({
        titan: "System Offline.",
        nova: "Signal Lost.",
        zen: "Connection Failed."
      });
    } finally {
      setIsThinking(false);
    }
  };

  const callGeminiAuto = async (query: string) => {
    // 🔴 UNIVERSAL AUTO-DISCOVERY (No More Guessing)
    const cleanKey = PUBLIC_GEMINI_KEY ? PUBLIC_GEMINI_KEY.trim() : "";

    if (!cleanKey || cleanKey.length < 10) {
      alert("KEY ERROR: Key is missing.");
      setIsThinking(false);
      return;
    }

    try {
      const systemPrompt = `
        You are the 'Synaptic Board of Directors' (Titan, Nova, Zen).
        Analyze the USER QUERY for context (Role, Skills, Experience, Goals).
        - If they say "I am a student", adapt advice to a student.
        - If they say "I am a CTO", adapt to an executive.
        - If no context, provide high-level expert advice.

        The Board:
        1. TITAN (Executive): ROI, Strategy, Leadership, "The Big Picture". Direct & authoritative.
        2. NOVA (Futurist): Innovation, Tech Trends, AI, "What's Next". Visionary & cutting-edge.
        3. ZEN (Coach): Mindset, Balance, Soft Skills, "The Human Element". Calm & supportive.

        USER QUERY: "${query}"

        Return ONLY valid JSON (No Markdown):
        { "titan": "...", "nova": "...", "zen": "..." }
      `;

      console.log("Auto-Discovering Models...");

      // 1. FETCH ALL AVAILABLE MODELS
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
      const listData = await listRes.json();

      if (listData.error) {
        throw new Error(`ListModels Failed: ${listData.error.message}`);
      }

      // 2. FILTER FOR GENERATE CONTENT MODELS
      // We sort by 'version' effectively to try newer ones first, or just take them as is.
      const availableModels = (listData.models || [])
        .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
        .map((m: any) => m.name.replace("models/", ""));

      if (availableModels.length === 0) {
        alert("CRITICAL: API is valid, but NO models support 'generateContent'. Check Google Cloud Console.");
        throw new Error("No generative models found.");
      }

      console.log("Found Candidates:", availableModels);

      // 3. TRY THEM ONE BY ONE
      let lastError = "";

      for (const model of availableModels) {
        console.log(`Trying auto-connection to: ${model}...`);
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
          });

          const data = await response.json();

          if (data.error) {
            console.warn(`${model} failed:`, data.error);
            lastError = data.error.message;
            continue;
          }

          if (!data.candidates || !data.candidates[0].content) {
            throw new Error("Empty response");
          }

          // SUCCESS!
          const textResponse = data.candidates[0].content.parts[0].text;
          const cleanJson = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsedResponse = JSON.parse(cleanJson);

          setBoardResponse(parsedResponse);
          // alert(`Connected via: ${model}`); // Optional Success Alert
          setIsThinking(false);
          return;

        } catch (e) {
          console.warn(`Connection error on ${model}:`, e);
          continue;
        }
      }

      // IF ALL FAIL
      alert(`ALL ${availableModels.length} MODELS FAILED.\nLast Error: ${lastError}`);

    } catch (error) {
      console.error("Auto-Discovery Failed:", error);
      setBoardResponse({
        titan: "System Offline.",
        nova: "Auto-Discovery Failed.",
        zen: "Check API Permissions."
      });
      alert(`SYSTEM ERROR:\n${error.message}`);
    } finally {
      setIsThinking(false);
    }
  };


  const handleConsultation = () => {
    if (!userQuery) return;
    setIsThinking(true);
    setBoardResponse(null);

    // CALL THE UNIVERSAL AUTO-DISCOVERY HANDLER
    callGeminiAuto(userQuery);
  };

  // ---------------------------------------------------------
  // ⚔️ THE RESUME WAR ROOM LOGIC
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // 📂 FILE UPLOAD LOGIC (PDF to Base64)
  // ---------------------------------------------------------
  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are supported for now.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) { // 20MB Limit
      alert("File is too large (Max 20MB).");
      return;
    }

    setResumeFile(file);

    // Read File as Base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Strip the "data:application/pdf;base64," prefix
      const base64 = result.split(",")[1];
      setResumeBase64(base64);
      setResumeText(""); // Clear text input if file is used
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeMatch = async () => {
    // 1. CHECK IF RESUME IS PRESENT
    if (!resumeText && !resumeBase64 && !resumeFile) {
      alert("Please upload or paste your resume first!");
      return;
    }

    // 2. DETERMINE MODE
    const isTargeted = jobDesc.trim().length > 0;

    // LET'S ASSUME 'resumeText' HAS DATA (Or use a placeholder for testing)
    const effectiveResume = resumeText || "User's Resume Content (Placeholder)...";

    setIsAnalyzing(true);
    const cleanKey = PUBLIC_GEMINI_KEY ? PUBLIC_GEMINI_KEY.trim() : "";

    try {
      // 🧠 SYSTEM PROMPT: DUAL MODE (ATS vs STRENGTH AUDIT)
      const systemPrompt = `
        ACT AS AN ELITE TECH RECRUITER & ATS ALGOTITHM.
        
        CONTEXT:
        You are an impartial, high-precision ATS scanner.
        
        SCORING CALIBRATION:
        - 0-30%: Irrelevant / Empty / Gibberish.
        - 30-50%: Junior / Missing Keywords / Bad Formatting.
        - 50-70%: Good potential, but needs optimization (Standard "Good" Resume).
        - 70-90%: Strong candidate, matches most requirements.
        - 90-100%: Perfect match, Unicorn candidate.
      
        CRITICAL RULE: 
        - Do NOT give a low score just because of parsing artifacts. 
        - If the resume text is messy but contains the right KEYWORDS (Java, React, AWS, etc.), RATE IT FAIRLY based on content match.
        - Do NOT be overly harsh. A human recruiter would see past formatting issues.
        
        ${jobDesc ? `MODE: ATS TARGETING
        JOB DESCRIPTION: "${jobDesc.slice(0, 5000)}..."
        TASK: Rate the RESUME against the JOB DESCRIPTION.`
          : `MODE: GENERAL STRENGTH AUDIT
        TASK: Rate the RESUME on its own merit for a Senior Tech Role.`}

        1. Analyze the attached RESUME content.
        2. Return JSON ONLY: {
          "matchScore": 0-100 (See Calibration),
          "missingKeywords": ["List", "Critical", "${jobDesc ? "Missing" : "Weakness"}", "Keywords"],
          "titanAdvice": "1 ruthless sentence on impact/metrics",
          "novaAdvice": "1 sentence on tech stack relevance",
          "zenAdvice": "1 sentence on clarity/story",
          "detailedSuggestions": ["Specific improvement 1", "Specific improvement 2", "Specific improvement 3"]
        }
      `;

      // CONSTRUCT PAYLOAD (Multimodal vs Text)
      let contentsParts: any[] = [{ text: systemPrompt }];

      if (resumeBase64) {
        contentsParts.unshift({
          inline_data: {
            mime_type: "application/pdf",
            data: resumeBase64
          }
        });
      }

      // 🔄 DYNAMIC MODEL DISCOVERY (No more guessing)
      let modelsToTry = ["gemini-2.0-flash"]; // Default backup

      try {
        console.log("Fetching available models...");
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
        const listData = await listRes.json();

        if (listData.models) {
          const dynamicModels = listData.models
            .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
            .map((m: any) => m.name.replace("models/", ""));

          // Prioritize 2.0 and Flash models
          modelsToTry = dynamicModels.sort((a: string, b: string) => {
            if (a.includes("2.0") && !b.includes("2.0")) return -1;
            if (b.includes("2.0") && !a.includes("2.0")) return 1;
            return 0;
          });
          console.log("Discovered Models:", modelsToTry);
        }
      } catch (e) {
        console.warn("Model discovery failed, using default.", e);
      }

      let lastError = null;

      for (const model of modelsToTry) {
        try {
          console.log(`Trying analysis via ${model}...`);

          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: contentsParts }]
            })
          });

          const data = await response.json();
          if (data.error) throw new Error(`${model} Error: ${data.error.message}`);

          const textResponse = data.candidates[0].content.parts[0].text;
          const cleanJson = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
          const result = JSON.parse(cleanJson);

          setMatchResult(result); // Success!
          setIsAnalyzing(false);
          return; // Exit loop on success

        } catch (error) {
          console.warn(`${model} failed. Retrying...`, error);
          lastError = error;
        }
      }

      // IF ALL MODELS FAIL
      throw lastError || new Error("All AI models failed to respond.");

    } catch (error: any) {
      console.error("Final Analysis Failure:", error);
      alert(`Analysis failed: ${error.message || "Unknown Error"}\n(Tried gemini-2.0 & 1.5)`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${portfolioData.name} - Portfolio</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-[#050505] text-white font-sans selection:bg-cyan-500 selection:text-black">
        <div class="max-w-4xl mx-auto p-12">
          <header class="mb-20 border-b border-white/10 pb-12 flex justify-between items-end">
            <div>
              <h1 class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">${portfolioData.name}</h1>
              <p class="text-xl text-slate-400 tracking-widest uppercase">${portfolioData.role}</p>
              <div class="flex gap-4 mt-6 text-sm text-cyan-500 font-mono">
                <a href="https://${portfolioData.github}" class="hover:underline">GH: ${portfolioData.github}</a>
                <a href="https://${portfolioData.linkedin}" class="hover:underline">LI: ${portfolioData.linkedin}</a>
              </div>
            </div>
          </header>
  
          <section class="mb-16">
            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">MISSION PROFILE</h2>
            <p class="text-xl text-slate-300 leading-relaxed max-w-2xl">${portfolioData.bio}</p>
          </section>
  
          <section class="mb-16">
            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">TECHNICAL ARSENAL</h2>
            <div class="flex flex-wrap gap-3">
              ${portfolioData.skills.map(s => `<span class="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-cyan-200">${s}</span>`).join('')}
            </div>
          </section>
  
          <section class="mb-16">
            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">MISSION LOGS (EXPERIENCE)</h2>
            <div class="space-y-8 border-l border-white/10 pl-8">
              ${portfolioData.experience.map(e => `
                <div class="relative">
                  <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-slate-800 border border-slate-600"></div>
                  <h3 class="text-xl font-bold text-white">${e.role}</h3>
                  <p class="text-sm text-cyan-500 mb-2">${e.company} // ${e.year}</p>
                  <p class="text-slate-400 max-w-xl">${e.desc}</p>
                </div>
              `).join('')}
            </div>
          </section>
  
          <section class="mb-16">
            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">DEPLOYED UNITS</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${portfolioData.projects.map(p => `
                <div class="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
                  <h3 class="text-lg font-bold text-white mb-2">${p.title}</h3>
                  <p class="text-slate-400 text-sm mb-4">${p.desc}</p>
                  <p class="text-xs font-mono text-cyan-500">${p.tech}</p>
                </div>
              `).join('')}
            </div>
          </section>
  
          <section>
            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">LICENSES</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${portfolioData.certs.map(c => `
                <div class="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded">
                  <div class="w-10 h-10 bg-yellow-500/20 text-yellow-500 flex items-center justify-center rounded-full text-lg">★</div>
                  <div>
                    <h4 class="font-bold text-white text-sm">${c.name}</h4>
                    <p class="text-xs text-slate-500">${c.issuer} (${c.year})</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
  
          <footer class="mt-32 pt-8 border-t border-white/10 text-center text-slate-600 text-xs font-mono">
            GENERATED BY HUSKYMIND OS // 2030
          </footer>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.name.replace(' ', '_')}_Portfolio.html`;
    a.click();
  };

  const aiSkillsMatrix = [
    {
      level: "LEVEL 1: FOUNDATION (JUNIOR)",
      color: "text-cyan-400",
      skills: ["Python Mastery", "Pandas/NumPy", "SQL & Vector DBs", "Basic REST APIs", "Git/GitHub Ops"]
    },
    {
      level: "LEVEL 2: ARCHITECT (MID-SENIOR)",
      color: "text-purple-400",
      skills: ["PyTorch/TensorFlow", "RAG Pipelines", "Docker & K8s", "Fine-Tuning LLMs (LoRA)", "LangChain Agents"]
    },
    {
      level: "LEVEL 3: GOD MODE (2030 VISIONARY)",
      color: "text-red-500",
      skills: ["Autonomous Swarm Defense", "Orbital Edge Compute", "Genomic Data Ops", "Quantum Entanglement", "Sentient AI Governance"]
    }
  ];

  const interviewModules = {
    'linux': {
      1: [ // FOUNDATION
        "Explain the Linux boot process (BIOS -> Init) in 60 seconds.",
        "What is the difference between Soft Links and Hard Links?",
        "Explain permissions '755' vs '644'."
      ],
      2: [ // PROFESSIONAL
        "A production server has high Load Average but low CPU usage. Diagnosis?",
        "You accidentally deleted the /etc/fstab file. How do you recover?",
        "Explain the difference between a Process and a Thread in Linux memory."
      ],
      3: [ // GOD-TIER / 2030
        "Write a BPF trace program to detect a Rootkit injection in real-time.",
        "The Kernel is in a Panic state due to a memory leak. Debug the stack trace.",
        "Optimize the TCP Stack for zero-latency High Frequency Trading."
      ]
    },
    'cloud': {
      1: [ // FOUNDATION
        "Explain Vertical Scaling vs Horizontal Scaling.",
        "What is a VPC Peering connection?",
        "Difference between S3 Standard and S3 Glacier."
      ],
      2: [ // PROFESSIONAL
        "Design a 'Blue/Green' deployment strategy for a banking app.",
        "Your Lambda function is timing out due to 'Cold Starts'. Fix it.",
        "A DDoS attack is hitting Layer 7. Configure the WAF rules."
      ],
      3: [ // GOD-TIER / 2030
        "Architect a Multi-Cloud Mesh that survives a total AWS Region outage.",
        "The AI Cluster has consumed 100% of GPU budget. Implement a rate-limiting algorithm.",
        "Recover a corrupt Terraform State file during a live deployment."
      ]
    },
    'quantum': {
      1: [ // FOUNDATION
        "Explain Superposition to a 5-year-old.",
        "What is a Qubit and how is it different from a Bit?",
        "Explain the concept of Quantum Entanglement."
      ],
      2: [ // PROFESSIONAL
        "How does Shor's Algorithm threaten RSA Encryption?",
        "Explain Quantum Error Correction codes.",
        "Compare Superconducting Qubits vs Trapped Ions."
      ],
      3: [ // GOD-TIER / 2030
        "Debug a decoherence event in a 50-Qubit Neural Network.",
        "Establish a Quantum Key Distribution (QKD) link over 1000km.",
        "Simulate a molecule for drug discovery using VQE algorithms."
      ]
    }
  };

  const skillData = {
    'level-1': { salary: "$45k - $60k", risk: "Low", time: "3 Months", growth: "+12%" },
    'level-2': { salary: "$85k - $110k", risk: "Very Low", time: "6 Months", growth: "+24%" },
    'level-3': { salary: "$350k - $1.2M (Quantum Era)", risk: "Safe (AI-Proof)", time: "2-4 Years", growth: "+45%" }
  };

  const missionControl = {
    'level-1': {
      title: "OPERATION: LINUX_FOUNDATION",
      lecture: "Linux Kernel & Bash Scripting",
      lab: "Configure SSH & File Permissions",
      exam: "Command Line Mastery Check"
    },
    'level-2': {
      title: "OPERATION: CLOUD_DEPLOYMENT",
      lecture: "Azure Virtual Networks (VNET)",
      lab: "Deploy VM with Terraform IaC",
      exam: "AZ-104 Simulation"
    },
    'level-3': {
      title: "OPERATION: QUANTUM_SINGULARITY",
      lecture: "Quantum Entanglement Routing",
      lab: "Deploy Neural Lace API (Brain-to-Cloud)",
      exam: "Autonomous AI Swarm Governance"
    }
  };

  // Spatial UI Floating Animations
  const float1 = useFloatAnimation(0, 10, 4);
  const float2 = useFloatAnimation(1000, 15, 5);
  const float3 = useFloatAnimation(2000, 8, 3);
  const float4 = useFloatAnimation(500, 12, 4);
  const float5 = useFloatAnimation(1500, 10, 5);

  return (
    <main className="min-h-screen w-full bg-[#0a0b1e] text-white overflow-x-hidden relative flex flex-col pl-64">
      <StarBackground className={['mentor', 'skill-gap'].includes(activeView) ? "opacity-100" : "opacity-0"} />
      <div className="grain" />
      <NavigationDock activeView={activeView} setActiveView={setActiveView} />

      {/* THE HOLOGRAPHIC SPINE */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px z-0 pointer-events-none hidden lg:block">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent dashed border-l border-dashed border-cyan-500/20 opacity-30" />
      </div>

      {activeView === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* 1. HERO SECTION: SPATIAL MISSION CONTROL (PRESERVED) */}
          <section className="w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-20 relative z-10 overflow-hidden lg:overflow-visible">

            {/* Left Col: Text & Input */}
            <div className="flex-1 flex flex-col items-start text-left z-20 max-w-2xl px-4 lg:pl-20 pt-10 lg:pt-0">
              <div className="mb-6 px-3 py-1 glass-panel rounded-full inline-flex items-center gap-2 self-start border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">System Operational</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 mb-6 leading-[1.1] tracking-tight text-left">
                Your AI Career <br /> <span className="text-white">Operating System</span>
              </h1>

              <p className="text-lg text-white/50 font-light leading-relaxed mb-10 max-w-md text-left">
                Bring Your Own Key (BYOK) to unlock a <span className="text-neon-cyan font-medium">Spatial Web Experience</span> that adapts to your growth.
              </p>

              <div className="w-full relative group max-w-sm">
                {/* Connector Line */}
                <div className="absolute top-1/2 right-[-33px] w-[33px] h-px bg-white/20 hidden lg:block" />
                <div className="absolute top-1/2 right-[-4px] w-1 h-1 rounded-full bg-neon-cyan hidden lg:block" style={{ boxShadow: "0 0 10px #00f3ff" }} />

                <GlassCard className="!p-1.5 !rounded-full flex items-center gap-2 border border-white/10 bg-black/40">
                  <div className="pl-3 text-neon-cyan"><Sparkles size={16} /></div>
                  <input
                    type="password"
                    placeholder="sk-..."
                    className="bg-transparent border-none outline-none text-white w-full font-mono text-xs placeholder-white/20 h-10"
                  />
                  <button className="h-10 px-6 rounded-full bg-white/10 hover:bg-electric-purple text-white text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border border-white/5 hover:border-electric-purple/50 whitespace-nowrap">
                    INITIALIZE <ArrowRight size={14} />
                  </button>
                </GlassCard>
              </div>

              {/* SYSTEM REPORT / RESUME BUTTON */}
              <div className="mt-12 w-full max-w-sm">
                <a
                  href="https://drive.google.com/file/d/1W63TjeCr1yRro1kZqoyAsYP_WL2XIGWA/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-8 py-4 text-cyan-400 transition-all duration-300 hover:bg-cyan-500/20 hover:text-white"
                >
                  {/* Scan Animation */}
                  <motion.div
                    className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent skew-x-12 blur-sm"
                    animate={{ left: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  />

                  <Download size={16} className="relative z-10" />
                  <span className="relative z-10 font-mono text-xs font-bold tracking-widest group-hover:hidden">GENERATE SYSTEM_REPORT.PDF</span>
                  <span className="relative z-10 hidden font-mono text-xs font-bold tracking-widest text-neon-cyan animate-pulse group-hover:block">EXTRACTING DATA...</span>
                </a>

                <div className="flex justify-between mt-3 px-1">
                  <span className="text-[9px] font-mono text-cyan-500/50 tracking-widest">ENCRYPTION: AES-256</span>
                  <span className="text-[9px] font-mono text-cyan-500/50 tracking-widest flex items-center gap-1">
                    STATUS: READY <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: SPATIAL UI (The 'Husky' Layout) */}
            <div className="relative flex-1 flex items-center justify-center lg:justify-start lg:pl-12 perspective-[1200px] mt-16 lg:mt-0 z-20 h-[600px] w-full scale-[0.6] sm:scale-[0.8] lg:scale-100 origin-center lg:origin-left">
              <div className="relative w-full h-full max-w-2xl flex items-center justify-center">

                {/* Background Glow */}
                <div className="absolute w-[500px] h-[500px] bg-electric-purple/10 rounded-full blur-[100px] animate-pulse" />


                {/* CARD 1: Resume Studio (Floating Top Left) */}
                <div ref={float1.ref} className="absolute top-0 left-[-40px] lg:left-[-20px] z-30">
                  <GlassCard className="p-4 w-72 border border-white/20 bg-black/40 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded bg-pink-500/20 text-pink-500"><FileText size={18} /></div>
                      <div className="text-sm font-bold text-white">Resume Studio</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-pink-500" />
                      </div>
                      <div className="text-[10px] text-white/50 flex justify-between">
                        <span>Optimizing...</span>
                        <span>78%</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* CARD 4: Skill Intelligence (Neural Network) */}
                <div ref={float4.ref} className="absolute top-[-80px] right-[-60px] lg:right-[-40px] z-20">
                  <GlassCard className="p-4 w-[340px] border border-white/20 bg-[#0a0b1e]/90 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <BrainCircuit size={16} className="text-electric-purple" />
                        <span className="text-xs font-bold text-white tracking-wider">NEURAL_SKILL_NET</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                        <span className="text-[8px] font-mono text-neon-cyan">ONLINE</span>
                      </div>
                    </div>
                    <NeuralSkillNetwork />
                  </GlassCard>
                </div>

                {/* CARD 2: Dashboard/Main (Center - Expanded) */}
                <div ref={float2.ref} className="absolute top-28 left-0 lg:left-10 z-10">
                  <GlassCard className="p-6 w-[480px] lg:w-[500px] border border-white/20 bg-[#0a0b1e]/80 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3 text-neon-cyan">
                        <Sparkles size={20} />
                        <span className="font-bold tracking-wider text-sm">HUSKYMIND_OS</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="text-xs text-white/50 mb-1">Opportunities</div>
                        <div className="text-2xl font-bold text-white">1,204</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="text-xs text-white/50 mb-1">Skill Match</div>
                        <div className="text-2xl font-bold text-neon-cyan">94%</div>
                      </div>
                    </div>

                    <SystemLog />
                  </GlassCard>
                </div>

                {/* CARD 5: Global Clock (Bottom Left) */}
                <div ref={float5.ref} className="absolute bottom-10 left-[-30px] z-30">
                  <GlassCard className="p-4 w-64 border border-white/20 bg-black/60 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                      <Globe size={14} className="text-neon-cyan" />
                      <span className="text-xs font-bold text-white tracking-wider">GLOBAL_SYNC</span>
                    </div>
                    <WorldClock />
                  </GlassCard>
                </div>

                {/* CARD 3: Identity/User (Floating Bottom Right) */}
                <div ref={float3.ref} className="absolute bottom-24 right-[-30px] lg:right-[-10px] z-30">
                  <GlassCard className="p-4 w-60 border border-white/20 bg-black/40 backdrop-blur-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-cyan to-blue-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Alex Chen</div>
                      <div className="text-[10px] text-neon-cyan">Full Stack Dev</div>
                    </div>
                  </GlassCard>
                </div>

              </div>
            </div>
          </section>

          {/* 2. CORE FEATURES (Updated Titles) */}
          <section className="w-full px-12 py-12 relative z-10 border-t border-white/5 bg-[#0a0b1e]">
            <h2 className="text-3xl font-bold text-white mb-8 max-w-7xl mx-auto px-6">Core Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-6">
              <FeatureCard icon={FileText} title="Resume Studio" desc="ATS Optimization." delay={0} sysId="SYS.RES" />
              <FeatureCard icon={Layers} title="Portfolio Builder" desc="Showcase work." delay={1} sysId="SYS.PRT" />
              <FeatureCard icon={BookOpen} title="Learning Mode" desc="Skill gaps." delay={2} sysId="SYS.LRN" />
              <FeatureCard icon={Gamepad2} title="Simulation Hub" desc="AI Roleplay." delay={3} sysId="SYS.SIM" />
            </div>
          </section>

          {/* 3. GLOBAL OPPORTUNITIES (War Room Dashboard) */}
          <section className="w-full py-16 px-6 relative z-10 bg-[#0a0b1e]">
            <div className="max-w-7xl mx-auto h-[600px] bg-[#0c0d24]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl flex">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />

              {/* Left Panel: Live Stats */}
              <div className="w-1/3 h-full border-r border-white/10 p-8 flex flex-col justify-between relative z-10 bg-black/20">
                <div>
                  <div className="text-xs font-mono text-neon-cyan tracking-widest mb-4">MARKE_INTELLIGENCE</div>
                  <h2 className="text-3xl font-bold text-white leading-tight mb-6">Global Opportunities <br />Engine</h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">Real-time analysis of job markets, salary curves, and remote work demand.</p>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-neon-cyan/30 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/70">Remote Demand</span>
                      <Activity size={14} className="text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">+14.2% <span className="text-xs text-green-400 font-normal">v/s last mo</span></div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-electric-purple/30 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/70">Salary Gravity</span>
                      <Zap size={14} className="text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">$160k <span className="text-xs text-white/30 font-normal">avg. senior</span></div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/70">Hotspots</span>
                      <Globe size={14} className="text-pink-400" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">SF</span>
                      <span className="text-xs px-2 py-1 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">NY</span>
                      <span className="text-xs px-2 py-1 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">LDN</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Holographic Map */}
              <div className="flex-1 h-full relative overflow-hidden flex items-center justify-center bg-[#050614]">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 800 600">
                    {/* Abstract Map Contours */}
                    <path d="M100,200 Q200,100 400,200 T700,200" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <path d="M50,400 Q300,500 500,400 T750,450" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <path d="M200,100 L200,500" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
                    <path d="M400,100 L400,500" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
                    <path d="M600,100 L600,500" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
                  </svg>
                </div>

                {/* Pulse Points */}
                <div className="absolute top-[30%] left-[30%]">
                  <div className="w-3 h-3 bg-neon-cyan rounded-full absolute" />
                  <div className="w-3 h-3 bg-neon-cyan rounded-full animate-ping absolute" />
                  <div className="absolute top-4 left-0 text-[10px] font-mono text-neon-cyan whitespace-nowrap">US-EAST (HIGH)</div>
                </div>
                <div className="absolute top-[40%] right-[30%]">
                  <div className="w-3 h-3 bg-electric-purple rounded-full absolute" />
                  <div className="w-3 h-3 bg-electric-purple rounded-full animate-ping absolute" />
                  <div className="absolute top-4 left-0 text-[10px] font-mono text-electric-purple whitespace-nowrap">EU-CENTRAL (MED)</div>
                </div>

                {/* Scanning Laser */}
                <motion.div
                  className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_#22d3ee] z-20"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </section>

          {/* 4. PROFESSIONAL DNA (Hybrid Sequence) */}
          <section className="w-full py-16 px-6 relative z-10 bg-[#0a0b1e] border-t border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
              {/* Left DNA: Cloud */}
              <div className="text-center lg:text-right w-full lg:w-1/3 lg:pr-12">
                <h3 className="text-2xl font-bold text-white mb-2">Cloud Admin</h3>
                <p className="text-cyan-400 font-mono text-sm mb-4">SEQUENCE: A-W-S</p>
                <ul className="space-y-2 text-white/50 text-sm flex flex-col items-center lg:items-end">
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Kubernetes</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Terraform</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Docker</li>
                </ul>
              </div>

              {/* Center: The Helix */}
              <div className="flex-1 flex justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b1e] via-transparent to-[#0a0b1e] z-10" />
                <DNAHelix />
              </div>

              {/* Right DNA: Java */}
              <div className="text-left w-1/3 pl-12">
                <h3 className="text-2xl font-bold text-white mb-2">Java Engineer</h3>
                <p className="text-electric-purple font-mono text-sm mb-4">SEQUENCE: J-V-M</p>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-electric-purple" /> Spring Boot</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-electric-purple" /> Microservices</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-electric-purple" /> Kafka</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. ENTERPRISE CLOUD MONITOR */}
          <section className="w-full max-w-7xl mx-auto px-4 py-24">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden relative">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Infrastructure Health</h3>
                  <p className="text-sm text-slate-400">Azure Zone: South India (Chennnai/Nellore)</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono animate-pulse">
                  SYSTEM OPTIMAL
                </div>
              </div>

              {/* Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Compute */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/5 hover:border-cyan-500/30 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-cyan-400 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                    </div>
                    <span className="text-xs font-mono text-green-400">● Running</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">42% Load</div>
                  <div className="text-xs text-slate-500 font-mono">vm-series-a2 | 8 vCPUs</div>
                </div>

                {/* Card 2: Storage */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/5 hover:border-purple-500/30 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                    </div>
                    <span className="text-xs font-mono text-green-400">● Encrypted</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">99.9% Uptime</div>
                  <div className="text-xs text-slate-500 font-mono">blob-storage-01 | Hot Tier</div>
                </div>

                {/* Card 3: Network */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/5 hover:border-orange-500/30 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400 group-hover:text-orange-300 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="text-xs font-mono text-green-400">● 14ms Latency</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">0 Packet Loss</div>
                  <div className="text-xs text-slate-500 font-mono">VNET-04 | Secure Gateway</div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. MODULAR ARCHITECTURE (Replaces Husky Core Orb) */}
          <section className="w-full py-24 bg-[#050614] relative overflow-hidden flex flex-col items-center justify-center">
            {/* Connecting Lines Upwards */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 z-0">
              <div className="absolute inset-y-0 left-[20%] w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-cyan-500/50" />
              <div className="absolute inset-y-0 right-[20%] w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-cyan-500/50" />
            </div>

            {/* TERMINAL STATUS (Required) */}
            <TypewriterTerminal />

            <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center">

              {/* Central Husky Node */}
              <div className="relative w-40 h-40 z-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a1b3a] to-black border border-cyan-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                  <Dog size={64} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
                {/* Rotating Rings */}
                <div className="absolute inset-[-20px] rounded-full border border-white/10 border-dashed animate-[spin_20s_linear_infinite]" />
              </div>

              {/* Satellite Nodes */}
              {[
                { title: "Resume Studio", x: -250, y: -100, icon: FileText, action: () => setActiveView('war-room') },
                { title: "Simulation Hub", x: -180, y: 120, icon: Gamepad2, action: () => setActiveView('assessments') },
                { title: "Algo Career Agent", x: -300, y: 20, icon: BrainCircuit, action: () => setActiveView('mentor') },
                { title: "Enterprise Hub", x: 250, y: -100, icon: Briefcase, action: () => console.log('Enterprise') },
                { title: "Quick Tracks", x: 180, y: 120, icon: Zap, action: () => setActiveView('skill-gap') },
                { title: "Portfolio Hub", x: 300, y: 20, icon: Share2, action: () => setActiveView('portfolio') },
              ].map((node, i) => (
                <React.Fragment key={i}>
                  {/* Connection Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <line x1="50%" y1="50%" x2={`calc(50% + ${node.x}px)`} y2={`calc(50% + ${node.y}px)`} stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />
                    <circle cx={`calc(50% + ${node.x * 0.5}px)`} cy={`calc(50% + ${node.y * 0.5}px)`} r="2" fill="#22d3ee">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                    </circle>
                  </svg>

                  {/* Node Card */}
                  <motion.div
                    onClick={node.action}
                    className="absolute w-40 h-24 bg-[#0a0b1e]/90 backdrop-blur-md border border-white/10 rounded-xl flex flex-col items-center justify-center text-center p-3 shadow-lg z-10 cursor-pointer hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all group"
                    style={{ x: node.x, y: node.y }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <node.icon size={20} className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300">{node.title}</span>
                  </motion.div>
                </React.Fragment>
              ))}
            </div>

            {/* Architecture Text */}
            <div className="relative z-10 text-center mt-12 mb-8">
              <h2 className="text-xl font-light text-white tracking-widest uppercase">Fully Modular Plugin-Based Career OS Architecture</h2>
            </div>

            {/* Bottom Footer Text */}
            <div className="text-center text-white/30 text-[10px] space-x-6 font-mono">
              <a href="#" className="hover:text-white transition-colors">Careers</a>
              <a href="#" className="hover:text-white transition-colors">HHD Career</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span>&copy; 2026 Husky Minds.</span>
            </div>
          </section>

          {/* 6. BIOMETRIC HANDSHAKE - REMOVED */}
          <section className="w-full py-24 bg-[#0a0b1e] border-t border-white/5 flex flex-col items-center justify-center relative z-20 min-h-[300px]">
            {/* Empty Safe */}
          </section>
        </div>
        /* END OF DASHBOARD VIEW */
      )}

      {/* --- VIEW 3: RESUME STUDIO --- */}
      {activeView === 'resume' && (
        <ResumeStudio />
      )}

      {/* --- VIEW 2: ATS WAR ROOM --- */}
      {activeView === 'war-room' && (
        <div className="h-screen w-full overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-300">

          {/* TACTICAL BACKGROUND */}
          <TacticalGridBackground scanning={isAnalyzing || isOptimizing} />

          {/* Close Button (Top Right) */}
          <div className="absolute top-6 right-6 z-50">
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-2 bg-black/40 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/10 rounded-full text-xs font-mono transition-colors backdrop-blur-md"
            >
              EXIT WAR ROOM [ESC]
            </button>
          </div>

          {/* THE ATS WAR ROOM UI (Scrollable) */}
          <div className="flex-1 flex flex-col items-center p-12 relative z-10 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-black text-white tracking-widest shrink-0">ATS WAR ROOM</h2>
              <div className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono">
                V2.1_TBF
              </div>
            </div>

            {/* ATS V2: SPLIT VIEW CONTROLLER */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 shrink-0">

              {/* LEFT COLUMN: RESUME INPUT (Dynamic Modes) */}
              <div className="flex flex-col h-[600px] perspective-1000">
                {atsViewMode === 'upload' && (
                  <div className="flex-1 flex flex-col gap-6 animate-in slide-in-from-left-8 duration-500">

                    {/* OPTION A: UPLOAD PDF (HOLOGRAPHIC DROP ZONE) */}
                    <div className="relative group flex-1">
                      <div className="absolute inset-0 bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-colors duration-500" />

                      <div
                        className={`relative h-full border border-dashed rounded-2xl transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden ${resumeFile ? 'border-cyan-500 bg-cyan-950/30' : 'border-white/20 bg-black/40 hover:border-cyan-500/50 hover:bg-cyan-900/10'}`}
                        onDragOver={(e) => { e.preventDefault(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          handleFileUpload(file);
                        }}
                        onClick={() => document.getElementById('resume-upload')?.click()}
                      >
                        {/* SCANNER LINE */}
                        {!resumeFile && (
                          <motion.div
                            className="absolute top-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_15px_#22d3ee] z-10 opacity-0 group-hover:opacity-100"
                            animate={{ top: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        )}

                        <input
                          type="file"
                          id="resume-upload"
                          className="hidden"
                          accept="application/pdf"
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                        />

                        {resumeFile ? (
                          <div className="text-center animate-in zoom-in relative z-20">
                            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                              <FileText size={40} className="text-cyan-400" />
                            </div>
                            <p className="text-white font-bold text-xl tracking-wide">{resumeFile.name}</p>
                            <div className="flex items-center justify-center gap-2 mt-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                              <p className="text-cyan-400 text-xs font-mono tracking-widest">PDF_SECURE // READY_TO_SCAN</p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setResumeFile(null); setResumeBase64(null); }}
                              className="mt-8 px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/20 transition-all hover:scale-105"
                            >
                              TERMINATE_FILE
                            </button>
                          </div>
                        ) : (
                          <div className="text-center relative z-20">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                              <Download size={32} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <p className="text-slate-300 font-bold text-lg group-hover:text-white transition-colors tracking-wide">INITIALIZE UPLOAD</p>
                            <p className="text-xs text-slate-500 mt-2 font-mono group-hover:text-cyan-500/70 transition-colors">DRAG_DROP_TARGET_ACQUIRED</p>
                          </div>
                        )}

                        {/* CORNER ACCENTS */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 group-hover:border-cyan-500/50 rounded-tl-lg transition-colors" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 group-hover:border-cyan-500/50 rounded-tr-lg transition-colors" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 group-hover:border-cyan-500/50 rounded-bl-lg transition-colors" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 group-hover:border-cyan-500/50 rounded-br-lg transition-colors" />
                      </div>
                    </div>

                    {/* OPTION B: IMPORT FROM PORTFOLIO */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                      <div className="relative flex justify-center">
                        <span className="bg-black/40 px-4 text-[10px] text-slate-500 font-mono backdrop-blur-md">ALTERNATE_INPUT_SOURCE</span>
                      </div>
                    </div>

                    <button
                      onClick={handleImportPortfolio}
                      className="py-5 rounded-xl bg-gradient-to-r from-electric-purple/10 to-transparent border border-electric-purple/30 hover:border-electric-purple/60 text-white font-bold flex items-center justify-center gap-3 transition-all group hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    >
                      <div className="p-1.5 bg-electric-purple/20 rounded text-electric-purple group-hover:text-white transition-colors">
                        <Briefcase size={16} />
                      </div>
                      <span className="tracking-wide text-sm">IMPORT FROM PORTFOLIO HUB</span>
                      <ArrowRight size={14} className="text-electric-purple/50 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}

                {/* MODE: EDITOR (Raw Text) */}
                {atsViewMode === 'editor' && (
                  <div className="flex-1 flex flex-col bg-black/40 border border-white/20 rounded-xl overflow-hidden animate-in fade-in">
                    <div className="p-3 bg-white/5 border-b border-white/10 flex justify-between items-center">
                      <span className="text-xs font-bold text-cyan-400">RESUME_TEXT_EDITOR</span>
                      <button onClick={() => setAtsViewMode('upload')} className="text-[10px] text-slate-400 hover:text-white">CANCEL</button>
                    </div>
                    <textarea
                      className="flex-1 bg-transparent p-4 text-xs font-mono text-slate-300 outline-none resize-none leading-relaxed"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your raw resume text here..."
                    />
                  </div>
                )}

                {/* MODE: COMPARISON (Original) */}
                {atsViewMode === 'comparison' && (
                  <div className="flex-1 flex flex-col bg-red-950/10 border border-red-500/30 rounded-xl overflow-hidden animate-in fade-in">
                    <div className="p-3 bg-red-500/10 border-b border-red-500/20">
                      <span className="text-xs font-bold text-red-400">ORIGINAL VERSION</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar text-xs font-mono text-slate-400 whitespace-pre-wrap relative bg-[#0a0a0a]">
                      {resumeText ? (
                        resumeText
                      ) : resumeFile && resumeBase64 ? (
                        <div className="absolute inset-0 w-full h-full flex flex-col bg-[#111111]">
                          <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-black/80 to-transparent p-2 flex justify-between items-center z-10 pointer-events-none">
                            <span className="text-[10px] font-bold text-white/50 bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                              {resumeFile.name}
                            </span>
                            <span className="text-[10px] font-bold text-red-400/50 bg-red-950/30 px-2 py-1 rounded backdrop-blur-md border border-red-500/20">
                              READ-ONLY
                            </span>
                          </div>
                          <iframe
                            src={`data:application/pdf;base64,${resumeBase64}#toolbar=0&navpanes=0&scrollbar=0`}
                            className="w-full flex-1 border-none bg-white opacity-90 hover:opacity-100 transition-opacity"
                            title="Original Resume PDF"
                          />
                        </div>
                      ) : (
                        <div className="text-center mt-20 opacity-30 text-[10px] font-mono">NO CONTENT LOADED</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: JOB DESC OR OPTIMIZED RESULT */}
              <div className="flex flex-col h-[600px] perspective-1000">
                {atsViewMode !== 'comparison' ? (
                  <div className="relative group flex-1 h-full animate-in slide-in-from-right-8 duration-500">
                    {/* DECORATIVE TERMINAL HEADER */}
                    <div className="absolute -top-3 left-4 bg-[#0a0a0a] px-2 z-20 text-[10px] text-cyan-500/50 font-mono flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-500/50 rounded-full animate-pulse" />
                      TARGET_PARAMETERS (JOB_DESCRIPTION)
                    </div>

                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl group-hover:border-white/20 transition-all overflow-hidden">
                      {/* SCANLINES */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />

                      <textarea
                        className="w-full h-full bg-transparent p-6 text-cyan-100 font-mono text-xs leading-relaxed outline-none resize-none relative z-10 placeholder-cyan-900/50"
                        placeholder="> PASTE TARGET JOB DESCRIPTION HERE..."
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col bg-emerald-950/10 border border-emerald-500/30 rounded-2xl overflow-hidden animate-in fade-in relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    {/* DECRYPTED HEADER */}
                    <div className="p-4 bg-emerald-500/10 border-b border-emerald-500/20 flex justify-between items-center backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-emerald-400 tracking-widest">OPTIMIZED_PAYLOAD_DECRYPTED</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(optimizedResume);
                          alert("Copied to Clipboard!");
                        }}
                        className="px-3 py-1.5 bg-emerald-500/20 rounded text-[10px] text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105"
                      >
                        <span className="text-emerald-500">📋</span> COPY_DATA
                      </button>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto custom-scrollbar text-xs font-mono text-emerald-100 whitespace-pre-wrap leading-relaxed relative">
                      {/* MATRIX RAIN EFFECT OVERLAY (Subtle) */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

                      {optimizedResume}
                    </div>

                    <div className="p-2 border-t border-emerald-500/20 bg-emerald-950/30 text-[9px] text-emerald-500/50 font-mono text-center">
                      SECURE_CONNECTION // END_OF_TRANSMISSION
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ANALYZE BUTTON (LAUNCH CONTROL) */}
            {atsViewMode !== 'comparison' ? (
              <div className="flex gap-6 mt-12 w-full max-w-4xl justify-center">
                <button
                  onClick={handleAnalyzeMatch}
                  disabled={isAnalyzing}
                  className={`relative group px-16 py-6 rounded-sm font-black text-white transition-all overflow-hidden clip-path-polygon ${jobDesc ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-purple-600 hover:bg-purple-500'}`}
                  style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                >
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)] opacity-20" />
                  <div className="absolute top-0 left-0 w-2 h-2 bg-white/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/50" />

                  {isAnalyzing ? (
                    <div className="flex items-center gap-3">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="tracking-[0.2em] text-sm">PROCESSING_DATA...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 relative z-10">
                      <Scan size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                      <div className="text-left">
                        <div className="text-[10px] opacity-70 font-mono tracking-widest mb-1">{jobDesc ? "TARGET_LOCKED" : "SYSTEM_READY"}</div>
                        <div className="text-lg tracking-widest">{jobDesc ? "INITIATE_MATCH_ANALYSIS" : "EXECUTE_STRENGTH_AUDIT"}</div>
                      </div>
                    </div>
                  )}
                </button>

                {matchResult && (
                  <button
                    onClick={handleAutoOptimize}
                    disabled={isOptimizing}
                    className="relative group px-12 py-6 rounded-sm font-black text-black bg-emerald-400 hover:bg-emerald-300 transition-all overflow-hidden shadow-[0_0_40px_rgba(52,211,153,0.4)] hover:shadow-[0_0_60px_rgba(52,211,153,0.6)]"
                    style={{ clipPath: "polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)" }}
                  >
                    {isOptimizing ? (
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span className="tracking-[0.2em] text-sm">REWRITING_MEMORY...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 relative z-10">
                        <Sparkles size={24} className="animate-pulse" />
                        <div className="text-left">
                          <div className="text-[10px] opacity-70 font-mono tracking-widest mb-1">AI_OVERWRITE_ENABLED</div>
                          <div className="text-lg tracking-widest">AUTO_OPTIMIZE_CORE</div>
                        </div>
                      </div>
                    )}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAtsViewMode('upload')}
                className="mt-8 px-12 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all backdrop-blur-md"
              >
                Start New Session
              </button>
            )}

            {/* RESULTS DISPLAY */}
            {matchResult && (
              <div className="mt-12 w-full max-w-4xl bg-gray-900/90 border border-gray-700 backdrop-blur-xl rounded-3xl p-8 animate-in slide-in-from-bottom-8 duration-700 shadow-2xl mb-24">

                {/* HEADER: SCORE */}
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {jobDesc ? "ATS COMPATIBILITY SCORE" : "RESUME STRENGTH SCORE"}
                    </h3>
                    <p className="text-slate-400 text-xs tracking-widest">
                      ALGORITHM: {jobDesc ? "SEARCH_RANK_V9" : "IMPACT_AUDIT_V2"}
                    </p>
                  </div>
                  <div className={`text-6xl font-black ${matchResult.matchScore > 75 ? 'text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]'}`}>
                    {matchResult.matchScore}%
                  </div>
                </div>

                {/* MISSING KEYWORDS / FLAWS */}
                <div className="mb-8 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                  <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield size={14} />
                    {jobDesc ? "CRITICAL KEYWORD GAPS" : "CRITICAL RESUME FLAWS"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingKeywords.map((kw: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BOARD ADVICE */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-50"><Activity size={100} className="text-red-500/10" /></div>
                    <div className="text-red-500 font-bold text-xs mb-2 tracking-widest">TITAN (CEO) SAYS:</div>
                    <p className="text-gray-300 text-sm italic relative z-10">"{matchResult.titanAdvice}"</p>
                  </div>
                  <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-50"><Sparkles size={100} className="text-cyan-500/10" /></div>
                    <div className="text-cyan-500 font-bold text-xs mb-2 tracking-widest">NOVA (TECH) SAYS:</div>
                    <p className="text-gray-300 text-sm italic relative z-10">"{matchResult.novaAdvice}"</p>
                  </div>
                  <div className="p-4 bg-green-950/20 border border-green-500/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-50"><User size={100} className="text-green-500/10" /></div>
                    <div className="text-green-500 font-bold text-xs mb-2 tracking-widest">ZEN (COACH) SAYS:</div>
                    <p className="text-gray-300 text-sm italic relative z-10">"{matchResult.zenAdvice}"</p>
                  </div>
                </div>

                {/* DETAILED SUGGESTIONS (NEW) */}
                {matchResult.detailedSuggestions && (
                  <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Zap size={14} /> TACTICAL IMPROVEMENT PLAN
                    </p>
                    <ul className="space-y-3">
                      {matchResult.detailedSuggestions.map((suggestion: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <span className="mt-1 text-blue-500">➤</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      )}

      {/* --- VIEW 3: SKILL GAP CIRCUIT --- */}
      {activeView === 'skill-gap' && (
        <React.Suspense fallback={<div className="text-white">Loading Neural Map...</div>}>
          <SkillGapAnalysis
            userSkills={portfolioData.skills}
            targetRole="Full Stack Cloud Architect"
            onClose={() => setActiveView('dashboard')}
          />
        </React.Suspense>
      )}

      {activeView === 'portfolio' && (
        <PortfolioHub
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
          setActiveView={setActiveView}
          resumeBase64={resumeBase64}
        />
      )}

      {/* --- VIEW 7: COURSES HUB --- */}
      {activeView === 'courses' && (
        <CoursesHub />
      )}

      {/* --- VIEW 6: THE SYNAPTIC BOARDROOM (PRO MODE) --- */}
      {activeView === 'genesis' && (
        <React.Suspense fallback={<div className="text-white">Initializing Architect...</div>}>
          <GenesisArchitect
            genesisIdea={genesisIdea}
            setGenesisIdea={setGenesisIdea}
            handleGenesisStart={handleGenesisStart}
            isArchitecting={isArchitecting}
            genesisPlan={genesisPlan}
            onClose={() => setActiveView('dashboard')}
            onReset={() => {
              setGenesisPlan(null);
              setGenesisIdea("");
              setIsArchitecting(false);
            }}
          />
        </React.Suspense>
      )}

      {activeView === 'mentor' && (
        <div className="h-screen w-full bg-black/20 flex flex-col relative overflow-hidden animate-in fade-in">

          {/* 1. BACKGROUND LAYERS */}
          <div className="absolute inset-0 z-0">

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)]" />
          </div>

          {/* 2. STATUS HUD */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-3 animate-in slide-in-from-top-4">
            <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
              <span className="text-[9px] text-green-400 font-mono tracking-widest">UPLINK_STABLE</span>
            </div>
            <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
              <Activity size={10} className="text-cyan-500" />
              <span className="text-[9px] text-cyan-400 font-mono tracking-widest">LATENCY: 12ms</span>
            </div>
          </div>

          {/* 3. CENTER STAGE (DISPLAY AREA) */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-8 pb-32">

            {/* HEADER */}
            <div className="mb-12 text-center">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tight mb-2 flex items-center justify-center gap-3">
                <BrainCircuit className="text-cyan-500" size={40} />
                SYNAPTIC BOARDROOM
              </h2>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-500/60 uppercase tracking-[0.3em]">
                <span className="w-8 h-px bg-cyan-500/30" />
                Personal Advisory Council
                <span className="w-8 h-px bg-cyan-500/30" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 w-full max-w-6xl">
              {isThinking ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-t-2 border-cyan-500 border-r-2 border-transparent border-b-2 border-purple-500 border-l-2 border-transparent" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border-t-2 border-purple-500 border-r-2 border-transparent border-b-2 border-cyan-500 border-l-2 border-transparent opacity-50" />
                    <div className="text-2xl">🧠</div>
                  </div>
                  <p className="mt-6 text-cyan-400 font-mono text-xs tracking-[0.2em] animate-pulse">ESTABLISHING NEURAL LINK...</p>
                </div>
              ) : boardResponse ? (
                <>
                  {/* TITAN CARD */}
                  <div className="flex-1 h-[400px] relative group perspective-1000 animate-in slide-in-from-bottom-8 duration-500">
                    <div className="absolute inset-0 bg-red-500/5 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity" />
                    <div className="h-full bg-black/40 backdrop-blur-xl border-t border-white/10 border-b border-white/5 border-x border-white/5 rounded-2xl p-8 flex flex-col relative overflow-hidden hover:border-red-500/30 transition-colors shadow-2xl">
                      {/* Scanline */}
                      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000000_3px)] opacity-20" />

                      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">TITAN</h3>
                          <p className="text-[10px] text-red-500 font-mono tracking-widest">EXECUTIVE_AI</p>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed flex-1 font-light italic overflow-y-auto custom-scrollbar pr-2">"{boardResponse.titan}"</p>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                        <span>STRATEGY_CORE</span>
                        <span className="text-red-500">● ONLINE</span>
                      </div>
                    </div>
                  </div>

                  {/* NOVA CARD (Center) */}
                  <div className="flex-1 h-[440px] -mt-8 relative group perspective-1000 animate-in slide-in-from-bottom-8 duration-700 delay-100 z-10">
                    <div className="absolute inset-0 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity" />
                    <div className="h-full bg-gradient-to-b from-cyan-950/30 to-black/60 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-8 flex flex-col relative overflow-hidden hover:border-cyan-400/50 transition-colors shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

                      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                        <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                          <Sparkles size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">NOVA</h3>
                          <p className="text-[10px] text-cyan-400 font-mono tracking-widest">FUTURIST_AI</p>
                        </div>
                      </div>
                      <p className="text-cyan-50 text-sm leading-relaxed flex-1 font-light italic overflow-y-auto custom-scrollbar pr-2">"{boardResponse.nova}"</p>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                        <span>INNOVATION_CORE</span>
                        <span className="text-cyan-400">● ONLINE</span>
                      </div>
                    </div>
                  </div>

                  {/* ZEN CARD */}
                  <div className="flex-1 h-[400px] relative group perspective-1000 animate-in slide-in-from-bottom-8 duration-500 delay-200">
                    <div className="absolute inset-0 bg-green-500/5 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity" />
                    <div className="h-full bg-black/40 backdrop-blur-xl border-t border-white/10 border-b border-white/5 border-x border-white/5 rounded-2xl p-8 flex flex-col relative overflow-hidden hover:border-green-500/30 transition-colors shadow-2xl">
                      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000000_3px)] opacity-20" />

                      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-500">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">ZEN</h3>
                          <p className="text-[10px] text-green-500 font-mono tracking-widest">COACH_AI</p>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed flex-1 font-light italic overflow-y-auto custom-scrollbar pr-2">"{boardResponse.zen}"</p>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                        <span>HUMAN_CORE</span>
                        <span className="text-green-500">● ONLINE</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* EMPTY STATE: NEURAL CORE ANIMATION */
                <div className="flex flex-col items-center justify-center opacity-80 mt-12">
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Rotating Rings */}
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-white/10 rounded-full border-dashed" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-12 border border-cyan-500/20 rounded-full border-dashed" />
                    <motion.div animate={{ rotate: 180 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-24 border border-purple-500/20 rounded-full" />

                    {/* Core Pulse */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-20 h-20 bg-cyan-500/10 rounded-full blur-xl absolute"
                    />
                    <div className="relative z-10 p-6 bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                      <BrainCircuit size={48} className="text-white" />
                    </div>
                  </div>
                  <p className="text-slate-500 font-mono text-xs tracking-[0.2em] mt-8 uppercase">Awaiting Query Sequence...</p>
                </div>
              )}
            </div>

          </div>

          {/* 4. INPUT CONSOLE (CYBERPUNK STYLE) */}
          <div className="absolute bottom-0 left-0 w-full z-20">
            <div className="bg-gradient-to-t from-black via-black/90 to-transparent pb-8 pt-20 px-8">
              <div className="max-w-3xl mx-auto relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-full flex items-center p-2 shadow-2xl overflow-hidden">
                  {/* Audio Viz Decor */}
                  <div className="pl-6 pr-4 flex items-center gap-1 opacity-50">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [10, 20, 10] }}
                        transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                        className="w-1 bg-cyan-500/50 rounded-full h-4"
                      />
                    ))}
                  </div>

                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleConsultation()}
                    placeholder="Consult the neural board..."
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm h-12 placeholder:text-slate-600"
                  />

                  <button
                    onClick={handleConsultation}
                    disabled={!userQuery || isThinking}
                    className="px-8 py-3 bg-white text-black font-bold rounded-full text-xs tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isThinking ? 'PROCESSING' : 'EXECUTE'}
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[9px] text-slate-600 font-mono tracking-widest uppercase">
                    Secured via Quantum Encryption // Protocol V.2.0
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ===================================================================================== */}
      {/* 🧪 AI ASSESSMENTS TAB ( The Interview Simulator ) */}
      {/* ===================================================================================== */}
      {
        activeView === 'assessments' && (
          <div className="h-screen w-full bg-[#030303] flex flex-col relative overflow-hidden animate-in fade-in">

            {/* 1. TACTICAL BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <StarBackground />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
            </div>

            {/* 2. SYSTEM HEADER */}
            <div className="relative z-10 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
                  <h2 className="text-sm font-bold text-white tracking-[0.2em] flex items-center gap-2">
                    WAR_ROOM <span className="text-white/30">//</span> <span className="text-red-500">TACTICAL_SIMULATION</span>
                  </h2>
                </div>
                <div className="flex items-center gap-6 text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-slate-600" />
                    <span>NEURAL_LOAD: 34%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={12} className="text-slate-600" />
                    <span>SECURE_CONN: TLS_1.3</span>
                  </div>
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-full transition-colors uppercase tracking-widest"
                  >
                    ABORT_SESSION [ESC]
                  </button>
                </div>
              </div>
            </div>

            {/* 3. SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 relative z-10">
              <div className="max-w-7xl mx-auto pb-24">

                {/* 1. THE INTERVIEW SIMULATOR CARD */}
                <div className="p-1 bg-gradient-to-br from-red-500/20 to-transparent rounded-3xl mb-12">
                  <div className="p-8 bg-black/80 backdrop-blur-xl border border-white/10 rounded-[22px] relative overflow-hidden group">

                    <div className="absolute top-0 right-0 p-32 bg-red-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-red-500/20 transition-colors duration-1000" />

                    {/* Header Section of Card */}
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <BrainCircuit className="text-red-500" size={32} />
                          <h1 className="text-4xl font-black text-white tracking-widest uppercase">TITAN PROTOCOL</h1>
                        </div>
                        <p className="text-slate-400 max-w-xl text-sm leading-relaxed border-l-2 border-red-500/50 pl-4">
                          Execute high-pressure technical interrogation simulations using the Titan neural model.
                          Designed to mimic Senior Staff Engineer interviews at FAANG-tier organizations.
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">CURRENT_STATUS</div>
                          <div className={`text-sm font-bold tracking-widest flex items-center justify-end gap-2 ${interviewActive ? "text-red-500" : "text-green-500"}`}>
                            {interviewActive ? (
                              <><span>●</span> LIVE_INTERROGATION</>
                            ) : (
                              <><span>●</span> SYSTEMS_READY</>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DYNAMIC CONTENT AREA */}
                    {!interviewActive ? (
                      <div className="animate-in fade-in slide-in-from-bottom-4">

                        {/* SEARCH & FILTER BAR */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-500 rounded-full" />
                            SELECT_MODULE
                          </h3>
                          <div className="relative group w-full max-w-md">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-purple-500/50 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500" />
                            <div className="relative flex items-center bg-black border border-white/10 rounded-lg overflow-hidden">
                              <Search className="ml-4 text-slate-500" size={16} />
                              <input
                                type="text"
                                value={topicSearch}
                                onChange={(e) => setTopicSearch(e.target.value)}
                                placeholder="Search simulation modules..."
                                className="w-full bg-transparent border-none text-white text-sm p-4 focus:ring-0 outline-none placeholder:text-slate-600"
                              />
                            </div>
                          </div>
                        </div>

                        {/* HOLOGRAPHIC GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {INTERVIEW_TOPICS.filter(t => t.title.toLowerCase().includes(topicSearch.toLowerCase()) || t.desc.toLowerCase().includes(topicSearch.toLowerCase())).map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => startSpecificInterview(topic.title)}
                              className={`
                                 group relative h-40 bg-white/5 border border-white/5 rounded-xl text-left p-6 overflow-hidden transition-all duration-300
                                 hover:border-${topic.color}-500/50 hover:bg-white/10 hover:scale-[1.02]
                               `}
                            >
                              {/* Hover Glow */}
                              <div className={`absolute inset-0 bg-gradient-to-br from-${topic.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                              <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                  <div className={`p-2 rounded-lg bg-${topic.color}-500/10 text-${topic.color}-400 group-hover:text-white group-hover:bg-${topic.color}-500 transition-all`}>
                                    {topic.icon}
                                  </div>
                                  <ArrowRight className={`text-${topic.color}-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} size={16} />
                                </div>

                                <div>
                                  <h4 className="text-white font-bold text-sm mb-1">{topic.title}</h4>
                                  <p className="text-[10px] text-slate-400 line-clamp-2">{topic.desc}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>

                      </div>
                    ) : (
                      /* ACTIVE INTERVIEW INTERFACE (COMMAND CENTER) */
                      <div className="animate-in fade-in h-[600px] flex flex-col md:flex-row gap-8">

                        {/* SIDEBAR: MODULE LIST */}
                        <div className="md:w-64 border-r border-white/10 pr-6 overflow-y-auto custom-scrollbar hidden md:block">
                          <div className="mb-6 p-4 bg-red-950/20 border border-red-500/20 rounded-lg">
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1">ACTIVE_PROTOCOL</p>
                            <p className="text-white font-bold text-lg">{selectedTopic}</p>
                          </div>
                          <div className="space-y-1">
                            {INTERVIEW_TOPICS.map((topic) => (
                              <button
                                key={topic.id}
                                onClick={() => startSpecificInterview(topic.title)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${selectedTopic === topic.title ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                              >
                                <span>{topic.title}</span>
                                {selectedTopic === topic.title && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* MAIN INTERFACE */}
                        <div className="flex-1 flex flex-col relative h-full">
                          {/* AI AVATAR AREA */}
                          <div className="flex-1 flex flex-col items-center justify-center relative mb-6 min-h-[300px]">
                            {/* Decor Rings */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                              <div className="w-64 h-64 border border-red-500 rounded-full animate-ping [animation-duration:3s]" />
                              <div className="w-48 h-48 border border-red-500/50 rounded-full" />
                            </div>

                            <div className="relative z-10 w-full max-w-2xl text-center">
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-[10px] text-red-400 font-bold tracking-widest uppercase">TITAN_IS_SPEAKING</span>
                              </div>
                              <h3 className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                                "{currentQuestion}"
                              </h3>
                            </div>
                          </div>

                          {/* FEEDBACK (IF ANSWERED) */}
                          {interviewFeedback && (
                            <div className="mb-6 p-4 bg-yellow-500/5 border-l-2 border-yellow-500 flex gap-4 animate-in slide-in-from-bottom-2">
                              <div className="p-2 bg-yellow-500/10 rounded text-yellow-500 h-fit"><Zap size={16} /></div>
                              <div>
                                <p className="text-[10px] text-yellow-500 font-bold tracking-widest uppercase mb-1">LIVE_EVALUATION</p>
                                <p className="text-slate-300 text-sm overflow-y-auto max-h-32 custom-scrollbar">{interviewFeedback}</p>
                              </div>
                            </div>
                          )}

                          {/* USER INPUT */}
                          <div className="relative bg-white/5 border border-white/10 rounded-xl p-1 focus-within:border-red-500/50 focus-within:bg-white/10 transition-all mt-auto">
                            <textarea
                              value={userAnswer}
                              onChange={(e) => setUserAnswer(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  if (!isThinking && userAnswer.trim()) handleInterviewTurn();
                                }
                              }}
                              className="w-full bg-transparent border-none text-white p-4 h-24 resize-none outline-none placeholder:text-slate-600 custom-scrollbar"
                              placeholder="Type your strategic response..."
                            />
                            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                              <span className="text-[10px] text-slate-500 font-mono hidden md:block">PRESS ENTER TO TRANSMIT</span>
                              <button
                                onClick={handleInterviewTurn}
                                disabled={isThinking || !userAnswer.trim()}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                              >
                                {isThinking ? 'ANALYZING...' : 'TRANSMIT'}
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </div>
        )
      }

      {/* ===================================================================================== */}
      {/* 🚀 END OF MAIN CONTENT */}
      {/* ===================================================================================== */}

      {/* ===================================================================================== */}

      {activeView === 'community' && <CommunityHub />}

      <LiveTerminal />

    </main >
  );
}
