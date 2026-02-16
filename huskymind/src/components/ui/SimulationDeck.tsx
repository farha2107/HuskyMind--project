"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Cpu, Database, Play, Lock, ChevronRight, XCircle, CheckCircle, AlertTriangle, Cloud, Server, Code, GitBranch, Layout, Users, Trophy } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

// --- MOCK DATA ---

const SCENARIOS = [
    {
        id: "sim-001",
        title: "PRODUCTION_OUTAGE: PAYMENT_GATEWAY",
        difficulty: "HARD",
        type: "INCIDENT_RESPONSE",
        icon: ShieldAlert,
        desc: "CRITICAL ALERT: 50% of payment requests are failing. Latency spike detected in the US-EAST-1 region. Diagnose and mitigate.",
        stack: ["AWS", "Microservices", "Datadog"],
        status: "ACTIVE"
    },
    {
        id: "sim-004",
        title: "GIT_DISASTER: DETACHED_HEAD",
        difficulty: "EASY",
        type: "VERSION_CONTROL",
        icon: GitBranch,
        desc: "You are in a 'detached HEAD' state after a bad checkout. Recover your commits and merge back to main without losing data.",
        stack: ["Git", "CLI"],
        status: "ACTIVE"
    },
    {
        id: "sim-005",
        title: "CSS_OVERFLOW: MOBILE_BREAK",
        difficulty: "EASY",
        type: "FRONTEND_DEBUG",
        icon: Layout,
        desc: "The checkout button is unclickable on iPhone SE. Inspect the z-index stacking context and viewport meta tags.",
        stack: ["CSS", "Chrome DevTools"],
        status: "ACTIVE"
    },
    {
        id: "sim-002",
        title: "SCALABILITY_CHALLENGE: 10M_USERS",
        difficulty: "EXTREME",
        type: "SYSTEM_DESIGN",
        icon: Database,
        desc: "Architect a real-time notification system for 10 million concurrent users. Must handle <100ms latency.",
        stack: ["Kafka", "Redis", "WebSockets"],
        status: "LOCKED"
    },
    {
        id: "sim-003",
        title: "SEC_BREACH: SQL_INJECTION",
        difficulty: "MEDIUM",
        type: "SECURITY_AUDIT",
        icon: Lock,
        desc: "Anomalous query patterns detected in the legacy user database. Identify the vulnerability and patch the endpoint.",
        stack: ["SQL", "Security", "Python"],
        status: "LOCKED"
    }
];

const ACTIVITY_LOG = [
    { user: "Alex_Dev", action: "Patched SQL Injection", time: "2s ago", status: "success" },
    { user: "Sarah_99", action: "Deployed K8s Cluster", time: "5s ago", status: "success" },
    { user: "Mike_T", action: "Failed Unit Test", time: "12s ago", status: "fail" },
    { user: "Jessica_R", action: "Resolved Git Conflict", time: "24s ago", status: "success" },
    { user: "User_882", action: "Crashed Production", time: "45s ago", status: "fail" },
];

const LEADERBOARD = [
    { rank: 1, user: "Dev_Master", score: 9850, badge: "Grandmaster" },
    { rank: 2, user: "System_Arch", score: 9420, badge: "Elite" },
    { rank: 3, user: "FullStack_J", score: 8900, badge: "Diamond" },
    { rank: 4, user: "Python_Wiz", score: 8250, badge: "Platinum" },
];

export default function SimulationDeck() {
    const [activeScenario, setActiveScenario] = useState<string | null>(null);
    const [logIndex, setLogIndex] = useState(0);

    // Simulate Live Activity Feed
    useEffect(() => {
        const interval = setInterval(() => {
            setLogIndex(prev => (prev + 1) % ACTIVITY_LOG.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full pt-8 max-w-[1600px] mx-auto"
        >
            {/* HEADER */}
            <div className="flex justify-between items-end border-b border-red-500/20 pb-4 mb-8">
                <div>
                    <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                        <Terminal className="text-red-500" /> SIMULATION DECK
                    </h2>
                    <p className="text-red-400/60 font-mono text-xs tracking-widest">ADVANCED_COMBAT_TRAINING // WAR_ROOM</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-mono">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    LIVE OPS: 428 ACTIVE
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)] min-h-[600px]">

                {/* COLUMN 1: SCENARIO LIST (Selection) */}
                <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Play size={12} className="text-red-500" /> MISSION_SELECT
                    </h3>
                    {SCENARIOS.map((sim, i) => (
                        <motion.button
                            key={sim.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setActiveScenario(sim.id)}
                            disabled={sim.status === 'LOCKED'}
                            className={`w-full text-left relative overflow-hidden group transition-all duration-300 rounded-xl border shadow-lg ${activeScenario === sim.id
                                    ? 'border-red-500 bg-red-950/20 shadow-red-900/20 scale-[1.02]'
                                    : 'border-white/10 bg-black/40 hover:bg-white/5 hover:border-red-500/30 hover:shadow-red-900/10'
                                }`}
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-md transition-colors ${activeScenario === sim.id ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-slate-400 group-hover:bg-red-500/10 group-hover:text-red-400'}`}>
                                            <sim.icon size={16} />
                                        </div>
                                        <span className="text-xs font-mono text-red-400/80">{sim.id}</span>
                                    </div>
                                    {sim.status === 'LOCKED' && <Lock size={12} className="text-slate-600" />}
                                </div>
                                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-red-300 transition-colors">{sim.title.split(':')[0]}</h4>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {sim.stack.slice(0, 2).map(tech => (
                                        <span key={tech} className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-slate-500 border border-white/5 group-hover:border-white/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* COLUMN 2: ACTIVE CONSOLE (Main Stage) */}
                <div className="lg:col-span-2 flex flex-col h-full">
                    <GlassCard className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#120505] to-black border-red-500/20 flex flex-col p-0 shadow-2xl shadow-red-900/10">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20" />

                        {activeScenario ? (
                            <div className="relative z-10 flex flex-col h-full p-6">
                                {/* CONSOLE HEADER */}
                                <div className="border-b border-red-500/20 pb-4 mb-4 flex justify-between items-center bg-black/20 -mx-6 -mt-6 p-6 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 text-red-500">
                                        <AlertTriangle size={18} />
                                        <span className="font-mono text-sm tracking-widest font-bold">INCIDENT_COMMAND</span>
                                    </div>
                                    <div className="font-mono text-xs text-red-500/60 animate-pulse">LIVE_CONNECTION_ESTABLISHED</div>
                                </div>

                                {/* TERMINAL OUTPUT */}
                                <div className="flex-1 font-mono text-xs bg-black/80 rounded-lg p-4 border border-white/10 overflow-y-auto custom-scrollbar text-slate-300 space-y-2 mb-6 shadow-inner shadow-black relative">
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500/20" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                    </div>
                                    <div className="text-green-500">$ system_diag --target {activeScenario}</div>
                                    <div className="text-white/50">{`> Initializing environment...`}</div>
                                    <div className="text-white/50">{`> Loading scenario context...`}</div>
                                    <div className="text-red-400">{`[ALERT] Anomaly detected in subsystem.`}</div>
                                    <div className="text-slate-400 italic pl-4 border-l-2 border-slate-700 my-2 py-1">
                                        "Operator, we have a situation. Check the logs and propose a fix immediately."
                                    </div>
                                    <div className="animate-pulse mt-2 text-red-500">_</div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="p-4 border border-white/10 hover:border-red-500/50 bg-white/5 hover:bg-red-950/30 rounded-lg text-left transition-all group hover:translate-y-[-2px] hover:shadow-lg hover:shadow-red-900/10">
                                        <div className="text-xs font-mono text-slate-500 mb-1 group-hover:text-red-400">OPTION_A</div>
                                        <div className="font-bold text-white text-sm">Analyze Logs</div>
                                    </button>
                                    <button className="p-4 border border-white/10 hover:border-red-500/50 bg-white/5 hover:bg-red-950/30 rounded-lg text-left transition-all group hover:translate-y-[-2px] hover:shadow-lg hover:shadow-red-900/10">
                                        <div className="text-xs font-mono text-slate-500 mb-1 group-hover:text-red-400">OPTION_B</div>
                                        <div className="font-bold text-white text-sm">Deploy Hotfix</div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                <div className="p-8 rounded-full bg-red-500/5 border border-red-500/10 mb-6 animate-pulse">
                                    <Terminal size={64} className="text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">AWAITING MISSION PROTOCOL</h3>
                                <p className="font-mono text-xs text-slate-400">SELECT A LIVE SCENARIO TO INITIALIZE WAR ROOM</p>
                            </div>
                        )}
                    </GlassCard>
                </div>

                {/* COLUMN 3: LIVE OPS (Activity & Leaderboard) */}
                <div className="lg:col-span-1 flex flex-col gap-6">

                    {/* GLOBAL ACTIVITY LOG */}
                    <div className="flex-1">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Users size={12} className="text-blue-500" /> GLOBAL_ACTIVITY
                        </h3>
                        <GlassCard className="h-full p-4 border-white/10 bg-gradient-to-br from-[#050510] to-black overflow-hidden relative shadow-xl">
                            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
                            <div className="space-y-3">
                                <AnimatePresence mode="popLayout">
                                    {/* Rotating simplified log view */}
                                    {[0, 1, 2, 3, 4].map((offset) => {
                                        const idx = (logIndex + offset) % ACTIVITY_LOG.length;
                                        const log = ACTIVITY_LOG[idx];
                                        return (
                                            <motion.div
                                                key={`${idx}-${offset}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-3 text-[10px] border-b border-white/5 pb-2 group hover:bg-white/5 p-1 rounded transition-colors"
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_5px] ${log.status === 'success' ? 'bg-green-500 shadow-green-500' : 'bg-red-500 shadow-red-500'}`} />
                                                <div className="flex-1">
                                                    <span className="text-slate-300 font-bold mr-2 group-hover:text-white transition-colors">{log.user}</span>
                                                    <span className="text-slate-500">{log.action}</span>
                                                </div>
                                                <span className="text-slate-600 font-mono">{log.time}</span>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </GlassCard>
                    </div>

                    {/* LEADERBOARD */}
                    <div className="h-1/3 min-h-[200px]">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Trophy size={12} className="text-yellow-500" /> TOP_ENGINEERS
                        </h3>
                        <GlassCard className="h-full p-0 border-yellow-500/10 bg-gradient-to-br from-[#1a1100] to-black overflow-hidden shadow-xl hover:shadow-yellow-900/10 transition-all">
                            {LEADERBOARD.map((entry, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 border-b border-white/5 hover:bg-yellow-500/10 transition-colors group cursor-default">
                                    <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold font-mono ${i === 0 ? 'bg-yellow-500 text-black shadow-[0_0_10px_#eab308]' : 'bg-white/5 text-yellow-500'}`}>
                                        #{entry.rank}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-white group-hover:text-yellow-200 transition-colors">{entry.user}</div>
                                        <div className="text-[9px] text-yellow-500/60 uppercase">{entry.badge}</div>
                                    </div>
                                    <div className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors">{entry.score}</div>
                                </div>
                            ))}
                        </GlassCard>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
