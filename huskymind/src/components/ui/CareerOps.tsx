"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, TrendingUp, DollarSign, MapPin, Activity, Briefcase, Search, Clock, ShieldCheck, Zap, Upload, FileText, CheckCircle2, TrendingDown, RefreshCcw } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

// --- MOCK DATA ---

const SKILL_STOCKS = [
    { symbol: "RJS", name: "React.js", price: "4.2k", change: "+5.4%", trend: "up" },
    { symbol: "TSX", name: "TypeScript", price: "3.8k", change: "+3.2%", trend: "up" },
    { symbol: "PYT", name: "Python", price: "5.1k", change: "+8.1%", trend: "up" },
    { symbol: "AI", name: "TensorFlow", price: "6.5k", change: "+12.4%", trend: "up" },
    { symbol: "JQV", name: "jQuery", price: "0.8k", change: "-4.2%", trend: "down" },
    { symbol: "PHP", name: "Legacy PHP", price: "1.2k", change: "-1.5%", trend: "down" },
    { symbol: "RST", name: "Rust", price: "4.9k", change: "+9.2%", trend: "up" },
];

const INTERNSHIPS = [
    { role: "Software Engineer Intern", company: "Google", loc: "Remote / Hybrid", salary: "$45/hr", time: "2m ago", tags: ["Java", "C++"] },
    { role: "Frontend Intern (React)", company: "Vercel", loc: "Remote", salary: "$50/hr", time: "12m ago", tags: ["Next.js", "TS"] },
    { role: "AI Research Intern", company: "OpenAI", loc: "San Francisco", salary: "$75/hr", time: "24m ago", tags: ["Python", "PyTorch"] },
    { role: "DevOps Junior", company: "Netflix", loc: "Los Gatos", salary: "$60/hr", time: "1h ago", tags: ["AWS", "Docker"] },
    { role: "Product Design Intern", company: "Airbnb", loc: "Remote", salary: "$40/hr", time: "1h ago", tags: ["Figma", "UX"] },
    { role: "Cybersecurity Analyst", company: "CrowdStrike", loc: "Austin, TX", salary: "$48/hr", time: "2h ago", tags: ["Security", "Net"] },
];

const HOT_ZONES = [
    { city: "San Francisco", tech: "AI / LLM", demand: "Critical", count: 842 },
    { city: "New York", tech: "FinTech / Rust", demand: "High", count: 520 },
    { city: "Austin", tech: "Cloud Native", demand: "High", count: 410 },
    { city: "Berlin", tech: "Distributed Systems", demand: "High", count: 350 },
    { city: "Remote", tech: "Full Stack", demand: "Ultra", count: 2100 },
];

export default function CareerOps() {
    const [atsScanning, setAtsScanning] = useState(false);
    const [atsScore, setAtsScore] = useState<number | null>(null);

    const runAtsScan = () => {
        setAtsScanning(true);
        setAtsScore(null);
        setTimeout(() => {
            setAtsScanning(false);
            setAtsScore(88);
        }, 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="max-w-7xl mx-auto w-full h-full flex flex-col gap-6 pt-8"
        >
            {/* HEADER */}
            <div className="flex justify-between items-end border-b border-green-500/20 pb-4">
                <div>
                    <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                        <Globe className="text-green-500" /> CAREER OPERATIONS
                    </h2>
                    <p className="text-slate-400 font-mono text-xs tracking-widest">GLOBAL_MARKET_INTELLIGENCE // LIVE_FEED_V2.1</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs font-mono">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    MARKET OPEN
                </div>
            </div>

            {/* TOP BAR: SKILL STOCK TICKER */}
            <GlassCard className="h-20 flex items-center px-6 overflow-hidden relative border-green-500/20 bg-black/60 shadow-lg shadow-green-900/10 hover:shadow-green-500/20 transition-all duration-500 group">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10" />

                <div className="flex items-center gap-4 w-full">
                    <div className="p-2 bg-green-900/20 rounded-lg border border-green-500/30 group-hover:scale-110 transition-transform">
                        <TrendingUp size={20} className="text-green-400" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <motion.div
                            className="flex gap-12 whitespace-nowrap"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        >
                            {[...SKILL_STOCKS, ...SKILL_STOCKS].map((stock, i) => (
                                <div key={i} className="flex items-center gap-3 font-mono">
                                    <span className="text-slate-400 font-bold">{stock.symbol}</span>
                                    <span className="text-white text-sm">{stock.name}</span>
                                    <span className={`text-xs px-1.5 py-0.5 rounded ${stock.trend === 'up' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
                                        }`}>
                                        {stock.price} ({stock.change})
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[500px]">
                {/* LEFT COLUMN: VISUALS (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* 1. GLOBAL DEMAND MAP */}
                    <GlassCard className="h-[500px] relative overflow-hidden p-0 border-white/10 bg-gradient-to-br from-[#0a0a0a] to-black group flex flex-col shadow-2xl hover:shadow-green-900/20 transition-all duration-500 hover:border-green-500/40">
                        {/* Header Bar */}
                        <div className="relative z-20 p-6 border-b border-white/5 bg-black/40 backdrop-blur-md flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Search size={18} className="text-green-400" /> GLOBAL DEMAND MAP
                            </h3>
                            <div className="flex gap-4 text-[10px] font-mono text-green-400/60 uppercase tracking-wider">
                                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" /> High Demand</span>
                                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Emerging</span>
                            </div>
                        </div>

                        <div className="relative flex-1 w-full">
                            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-20 grayscale invert" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                            {HOT_ZONES.map((zone, i) => (
                                <motion.div
                                    key={zone.city}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="absolute p-3 rounded-xl bg-black/90 border border-green-500/30 backdrop-blur-md flex items-center gap-3 hover:scale-110 hover:z-50 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.2)] group/pin"
                                    style={{
                                        top: `${20 + i * 15}%`,
                                        left: `${10 + i * 20}%`
                                    }}
                                >
                                    <div className="relative">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping absolute inset-0 opacity-50" />
                                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full relative z-10 box-shadow-[0_0_10px_#22c55e]" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white group-hover/pin:text-green-300 transition-colors">{zone.city}</div>
                                        <div className="text-[9px] text-green-500 font-mono uppercase tracking-wider">{zone.tech}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* RIGHT COLUMN: FEED & TOOLS (1/3) */}
                <div className="space-y-6 flex flex-col h-full">
                    {/* 2. INTERNSHIP FEED (Primary) */}
                    <GlassCard className="flex-1 min-h-[300px] flex flex-col p-0 border-white/10 bg-gradient-to-b from-[#111] to-black overflow-hidden shadow-2xl hover:border-green-500/30 transition-all duration-500">
                        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center backdrop-blur-sm">
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <Zap size={14} className="text-yellow-500" /> INTERNSHIP FEED
                            </h3>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-mono animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                LIVE
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                            {INTERNSHIPS.map((job, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-green-500/30 transition-all cursor-pointer group hover:translate-x-1"
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-slate-200 group-hover:text-green-400 transition-colors">{job.role}</span>
                                        <span className="text-[10px] font-mono text-green-500 bg-green-500/5 px-1.5 py-0.5 rounded border border-green-500/10">{job.salary}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2">
                                        <div className="flex items-center gap-1">
                                            <Briefcase size={10} /> {job.company}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={10} /> {job.time}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {job.tags.map(tag => (
                                            <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-black/40 rounded text-slate-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </GlassCard>

                    {/* 3. ATS SCANNER (Secondary) */}
                    <GlassCard className="p-6 border-white/10 bg-gradient-to-br from-[#1a1a1a] to-black relative overflow-hidden shadow-2xl hover:border-purple-500/40 transition-all duration-500 group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        <div className="flex justify-between items-start mb-6 z-10 relative">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <FileText size={16} className="text-purple-400" /> ATS_RESUME_SCANNER
                            </h3>
                        </div>

                        {!atsScanning && atsScore === null && (
                            <div
                                onClick={runAtsScan}
                                className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-purple-500/5 hover:border-purple-500/50 transition-all group/upload"
                            >
                                <div className="p-3 bg-white/5 rounded-full mb-3 group-hover/upload:scale-110 transition-transform group-hover/upload:bg-purple-500/20">
                                    <Upload size={20} className="text-purple-500" />
                                </div>
                                <p className="text-xs font-bold text-white mb-1">Upload Resume</p>
                                <p className="text-[9px] text-slate-400">PDF / DOCX</p>
                            </div>
                        )}

                        {atsScanning && (
                            <div className="h-24 flex flex-col items-center justify-center text-center space-y-3">
                                <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
                                <div className="text-[10px] font-mono text-purple-300 animate-pulse">
                                    ANALYZING...
                                </div>
                            </div>
                        )}

                        {atsScore !== null && (
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                                        <circle cx="32" cy="32" r="28" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="4" fill="none" />
                                        <motion.circle
                                            cx="32" cy="32" r="28"
                                            stroke="#a855f7" strokeWidth="4" fill="none"
                                            strokeDasharray="175.9"
                                            strokeDashoffset="175.9"
                                            animate={{ strokeDashoffset: 175.9 - (175.9 * atsScore) / 100 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="text-lg font-black text-white">{atsScore}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">High Match</p>
                                    <button onClick={() => setAtsScore(null)} className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-1 transition-colors">
                                        <RefreshCcw size={10} /> Scan Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </motion.div>
    );
}
