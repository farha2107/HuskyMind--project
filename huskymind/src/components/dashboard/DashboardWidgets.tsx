"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Activity, Zap, Shield, Globe, Cpu, Hash,
    Target, Award, Clock, Calendar, FileText,
    Briefcase, GraduationCap, ArrowRight, Star,
    Terminal, Lock, Search, TrendingUp, Layers
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useFloatAnimation } from "@/hooks/useFloatAnimation";

// --- ZONE A: COMMAND & CONTROL ---

export const AI_GreetingWidget = () => {
    const [time, setTime] = useState(new Date());
    const [quoteIndex, setQuoteIndex] = useState(0);

    const quotes = [
        { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { text: "Code is the language of the modern world.", author: "Unknown" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
        { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" }
    ];

    useEffect(() => {
        // Clock Tick
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Rotate Quote every 10 seconds
        const quoteTimer = setInterval(() => {
            setQuoteIndex(prev => (prev + 1) % quotes.length);
        }, 10000);

        return () => {
            clearInterval(timer);
            clearInterval(quoteTimer);
        };
    }, []);

    const hour = time.getHours();
    const getGreeting = () => {
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <GlassCard className="h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-white/10 group">
            <div className="absolute top-0 right-0 p-4 opacity-20">
                <Cpu size={64} className="text-cyan-400 group-hover:rotate-12 transition-transform duration-700" />
            </div>

            {/* Top Status */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-white/50">System Online</span>
                </div>
                <h3 className="text-2xl font-light text-white">
                    {getGreeting()}, <span className="font-bold text-cyan-400">Architect</span>.
                </h3>
            </div>

            {/* Quote Section */}
            <div className="relative z-10">
                <div className="min-h-[60px] flex flex-col justify-center">
                    <motion.p
                        key={quoteIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-slate-300 italic mb-1"
                    >
                        "{quotes[quoteIndex].text}"
                    </motion.p>
                    <motion.span
                        key={`author-${quoteIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-[10px] text-cyan-500 font-mono"
                    >
              // {quotes[quoteIndex].author}
                    </motion.span>
                </div>
            </div>

            {/* Action Button */}
            <button className="mt-2 w-fit px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white flex items-center gap-2 transition-all border border-white/5">
                <Zap size={14} className="text-yellow-400" /> INITIALIZE_WORKFLOW
            </button>
        </GlassCard>
    );
};

export const MissionControlWidget = () => {
    return (
        <GlassCard className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Career Vitality</h4>
                <Activity size={14} className="text-green-400" />
            </div>
            <div className="flex-1 flex items-center justify-center relative">
                <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="351.86" strokeDashoffset="35.18" className="text-cyan-500 animate-[spin_3s_ease-out_reverse]" />
                </svg>
                <div className="absolute text-center">
                    <div className="text-3xl font-bold text-white">90%</div>
                    <div className="text-[9px] text-cyan-400 uppercase">Optimized</div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[9px] font-mono text-slate-500">
                <div className="bg-white/5 rounded p-1">RES: OK</div>
                <div className="bg-white/5 rounded p-1">PRT: OK</div>
                <div className="bg-white/5 rounded p-1">ATS: OK</div>
            </div>
        </GlassCard>
    );
};

export const MentorUplinkWidget = () => {
    return (
        <GlassCard className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Neural Link</h4>
                <div className="flex gap-1">
                    <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                    <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                    <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                </div>
            </div>
            <div className="space-y-3">
                {['TITAN', 'NOVA', 'ZEN'].map((agent, i) => (
                    <div key={agent} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-cyan-500' : 'bg-green-500'}`} />
                            <span className="text-[10px] font-bold text-white">{agent}</span>
                        </div>
                        <span className="text-[9px] text-white/30 font-mono">IDLE</span>
                    </div>
                ))}
            </div>
            <button className="w-full mt-2 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold rounded hover:bg-cyan-500/20 transition-colors">
                PING_ALL_AGENTS
            </button>
        </GlassCard>
    );
};

export const PrivacyShieldWidget = () => {
    return (
        <GlassCard className="h-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-emerald-900/20 to-transparent border-emerald-500/20">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Lock size={20} className="text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">BYOK Secured</h4>
            <p className="text-[10px] text-emerald-400/70 font-mono mb-3">AES-256 ENCRYPTION</p>
            <div className="text-[9px] text-slate-500 max-w-[150px] leading-tight">
                Your API Key is stored locally via Neural Vault technology.
            </div>
        </GlassCard>
    );
};

// --- ZONE B: INTELLIGENCE ---

export const JobMarketRadarWidget = () => {
    return (
        <GlassCard className="h-full relative overflow-hidden flex flex-col">
            <div className="absolute top-3 left-4 z-10">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Search size={12} /> Market Radar
                </h4>
            </div>

            {/* Radar Animation */}
            <div className="flex-1 flex items-center justify-center relative">
                <div className="w-48 h-48 rounded-full border border-white/5 relative flex items-center justify-center bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)]">
                    <div className="absolute inset-0 rounded-full border border-white/10 scale-50" />
                    <div className="absolute inset-0 rounded-full border border-white/5 scale-75" />

                    {/* Scanner */}
                    <div className="absolute w-full h-full animate-[spin_4s_linear_infinite]">
                        <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-cyan-500/20 border-r border-cyan-500/50 origin-right absolute right-1/2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }} />
                    </div>

                    {/* Blips */}
                    <div className="absolute top-10 right-12 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <div className="absolute bottom-14 left-10 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                </div>
                <div className="absolute bottom-2 text-center w-full">
                    <span className="text-[10px] font-mono text-cyan-400 bg-black/40 px-2 py-0.5 rounded">24 NEW ROLES DETECTED</span>
                </div>
            </div>
        </GlassCard>
    );
};

export const SkillHelixWidget = () => {
    return (
        <GlassCard className="h-full flex flex-col relative overflow-hidden bg-black/20">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                {/* Simple CSS DNA Animation */}
                <div className="flex gap-2 h-32">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 bg-electric-purple rounded-full"
                            animate={{ height: ['20%', '100%', '20%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                        />
                    ))}
                </div>
            </div>
            <div className="relative z-10 p-4">
                <h4 className="text-xs font-bold text-white mb-4">Top Skills</h4>
                <ul className="space-y-3">
                    {['React.js', 'TypeScript', 'Node.js'].map(skill => (
                        <li key={skill} className="flex justify-between items-center text-xs">
                            <span className="text-slate-300">{skill}</span>
                            <span className="text-electric-purple font-mono">98%</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-auto p-4 border-t border-white/5">
                <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>GROWTH RATE</span>
                    <span className="text-green-400">+12%</span>
                </div>
            </div>
        </GlassCard>
    );
};

export const SalaryEstimatorWidget = () => {
    return (
        <GlassCard className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Income</h4>
                    <div className="text-2xl font-black text-white mt-1">$145k</div>
                </div>
                <TrendingUp size={16} className="text-green-400" />
            </div>

            <div className="h-16 flex items-end justify-between gap-1 px-1">
                {[40, 65, 55, 80, 75, 90, 85].map((h, i) => (
                    <div key={i} className="w-full bg-cyan-500/20 rounded-t-sm hover:bg-cyan-500/50 transition-colors" style={{ height: `${h}%` }} />
                ))}
            </div>

            <div className="text-[9px] text-slate-500 text-center font-mono mt-2">
                MARKET: HIGH DEMAND
            </div>
        </GlassCard>
    );
};

// --- ZONE C: OPERATIONS ---

export const ApplicationTrackerWidget = () => {
    return (
        <GlassCard className="h-full flex flex-col">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Active Applications</h4>
            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
                {[
                    { company: "Vercel", role: "Frontend Eng", status: "Interview", color: "text-yellow-400" },
                    { company: "Linear", role: "Product Eng", status: "Applied", color: "text-blue-400" },
                    { company: "OpenAI", role: "Design Eng", status: "Rejected", color: "text-red-400" },
                ].map((job, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer">
                        <div>
                            <div className="font-bold text-white text-xs">{job.company}</div>
                            <div className="text-[9px] text-slate-500">{job.role}</div>
                        </div>
                        <div className={`text-[10px] font-mono ${job.color}`}>{job.status}</div>
                    </div>
                ))}
            </div>
            <button className="mt-2 w-full text-[10px] text-center text-slate-500 hover:text-white transition-colors">
                VIEW ALL (12)
            </button>
        </GlassCard>
    );
};

export const DailyQuestsWidget = () => {
    return (
        <GlassCard className="h-full flex flex-col bg-gradient-to-br from-purple-900/10 to-transparent">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target size={12} className="text-purple-400" /> Daily Quests
            </h4>
            <div className="space-y-2">
                {[
                    { text: "Update Resume Summary", done: true },
                    { text: "Apply to 3 Jobs", done: false },
                    { text: "Complete 'React' Quiz", done: false },
                ].map((quest, i) => (
                    <div key={i} className="flex items-center gap-3 p-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${quest.done ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`}>
                            {quest.done && <span className="text-white text-[10px]">✓</span>}
                        </div>
                        <span className={`text-xs ${quest.done ? 'text-white/30 line-through' : 'text-white'}`}>{quest.text}</span>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
};

export const StreakReactorWidget = () => {
    return (
        <GlassCard className="h-full flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-500/5 animate-pulse" />
            <div className="relative text-center">
                <div className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                    7
                </div>
                <div className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.3em] mt-1">Day Streak</div>
            </div>
            <div className="flex gap-1 mt-4">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-1.5 h-6 bg-orange-500 rounded-full opacity-80" />
                ))}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-6 bg-white/10 rounded-full" />
                ))}
            </div>
        </GlassCard>
    );
};

// --- ZONE D: SYSTEM ---

export const SystemLogWidget = () => {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const messages = [
            "Optimizing Assets...", "Syncing Market Data...", "Updating Neural Weights...",
            "Checking GitHub API...", "Verifying Integrity...", "Compiling Modules...",
            "Refining UX Patterns...", "Analyzing Trends..."
        ];

        const interval = setInterval(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 5));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <GlassCard className="h-full font-mono text-[9px] text-green-400 p-4 bg-black/40 overflow-hidden flex flex-col">
            <div className="text-[10px] text-white/30 border-b border-white/5 pb-1 mb-2 uppercase tracking-widest">
                System Console
            </div>
            <div className="flex-1 overflow-hidden space-y-1 opacity-70">
                {logs.map((log, i) => (
                    <div key={i} className="truncate">
                        <span className="text-green-600 mr-2">{'>'}</span>{log}
                    </div>
                ))}
            </div>
        </GlassCard>
    );
};

export const NewsTickerWidget = () => {
    return (
        <GlassCard className="h-full flex items-center overflow-hidden bg-black/20">
            <div className="bg-red-500/20 px-2 py-1 rounded text-[9px] text-red-400 font-bold mr-3 border border-red-500/20 whitespace-nowrap">
                LIVE NEWS
            </div>
            <div className="whitespace-nowrap overflow-hidden relative w-full">
                <motion.div
                    className="text-xs text-slate-300 inline-block"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    React 19 Alpha Released • AI Agents Replace Junior Devs? • TypeScript 6.0 Features Leak • Vercel Unveils New Edge Network •
                </motion.div>
            </div>
        </GlassCard>
    );
};
