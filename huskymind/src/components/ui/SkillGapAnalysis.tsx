"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BrainCircuit, Activity, ChevronRight, Lock,
    Unlock, Sparkles, TrendingUp, AlertTriangle,
    CheckCircle, Download, Share2, Zap, Target,
    Cpu, Database, Globe, Shield, Terminal, Layers, Search,
    ScanLine,
    Network
} from "lucide-react";


// --- TYPES ---
type SkillNode = {
    id: string;
    label: string;
    category: "frontend" | "backend" | "cloud" | "ai" | "security" | "web3";
    status: "acquired" | "missing" | "learning";
    x: number;
    y: number;
    marketDemand: number; // +% relative to baseline
    complexity: "L1" | "L2" | "L3"; // Depth level
    relatedTo?: string[]; // IDs of related skills to draw mesh lines
    salaryPremium: number; // Extra $k added to annual comp (2026 Adjusted)
    year?: string; // Optional context year
};

type MarketTicker = {
    symbol: string;
    price: string;
    change: string;
    isUp: boolean;
};

// --- EXPANDED DATASET (REALISTIC 2026 CALIBRATION) ---
// Base Salary Assumption: $110k (Mid-Level)
const INITIAL_NODES: SkillNode[] = [
    // --- FRONTEND CLUSTER (Left) ---
    { id: "react", label: "React.js", category: "frontend", status: "acquired", x: 100, y: 150, marketDemand: 12, complexity: "L2", relatedTo: ["next", "ts", "tailwind"], salaryPremium: 15 },
    { id: "ts", label: "TypeScript", category: "frontend", status: "acquired", x: 180, y: 100, marketDemand: 18, complexity: "L2", relatedTo: ["react", "node", "angular"], salaryPremium: 12 },
    { id: "tailwind", label: "Tailwind CSS", category: "frontend", status: "acquired", x: 180, y: 200, marketDemand: 8, complexity: "L1", salaryPremium: 5 },
    { id: "next", label: "Next.js 14", category: "frontend", status: "learning", x: 100, y: 250, marketDemand: 22, complexity: "L2", relatedTo: ["react", "node"], salaryPremium: 18 },
    { id: "three", label: "Three.js", category: "frontend", status: "missing", x: 50, y: 320, marketDemand: 15, complexity: "L3", relatedTo: ["react"], salaryPremium: 22 }, // Niche high value

    // --- BACKEND CLUSTER (Center-Left) ---
    { id: "node", label: "Node.js", category: "backend", status: "acquired", x: 350, y: 150, marketDemand: 10, complexity: "L2", relatedTo: ["express", "nest", "graphql"], salaryPremium: 10 },
    { id: "python", label: "Python", category: "backend", status: "acquired", x: 350, y: 250, marketDemand: 14, complexity: "L1", relatedTo: ["django", "fastapi", "ai_core"], salaryPremium: 12 },
    { id: "go", label: "Go (Golang)", category: "backend", status: "missing", x: 350, y: 350, marketDemand: 28, complexity: "L2", relatedTo: ["k8s", "docker"], salaryPremium: 35 }, // High demand systems
    { id: "rust", label: "Rust", category: "backend", status: "missing", x: 350, y: 450, marketDemand: 35, complexity: "L3", relatedTo: ["wasm", "solana"], salaryPremium: 45 }, // Very high premium
    { id: "graphql", label: "GraphQL", category: "backend", status: "learning", x: 450, y: 120, marketDemand: 16, complexity: "L2", relatedTo: ["node", "ts"], salaryPremium: 14 },

    // --- CLOUD CLUSTER (Center-Right) ---
    { id: "docker", label: "Docker", category: "cloud", status: "acquired", x: 600, y: 100, marketDemand: 25, complexity: "L2", relatedTo: ["k8s", "aws"], salaryPremium: 15 },
    { id: "k8s", label: "Kubernetes", category: "cloud", status: "missing", x: 600, y: 200, marketDemand: 40, complexity: "L3", relatedTo: ["docker", "terraform", "helm"], salaryPremium: 40 }, // Gold standard
    { id: "aws", label: "AWS Core", category: "cloud", status: "acquired", x: 700, y: 150, marketDemand: 30, complexity: "L2", relatedTo: ["terraform", "lambda"], salaryPremium: 25 },
    { id: "terraform", label: "Terraform", category: "cloud", status: "missing", x: 700, y: 250, marketDemand: 32, complexity: "L2", relatedTo: ["aws", "azure"], salaryPremium: 28 },
    { id: "azure", label: "Azure", category: "cloud", status: "missing", x: 700, y: 350, marketDemand: 20, complexity: "L2", relatedTo: ["terraform"], salaryPremium: 20 },

    // --- AI / FUTURE CLUSTER (Right) ---
    { id: "ai_core", label: "PyTorch/TF", category: "ai", status: "missing", x: 850, y: 150, marketDemand: 45, complexity: "L3", relatedTo: ["python", "llm"], salaryPremium: 55 }, // AI Base
    { id: "llm", label: "LLM Ops", category: "ai", status: "missing", x: 850, y: 250, marketDemand: 85, complexity: "L3", relatedTo: ["langchain", "vector_db"], salaryPremium: 85 }, // Peak Hype/Value
    { id: "langchain", label: "LangChain", category: "ai", status: "learning", x: 950, y: 200, marketDemand: 60, complexity: "L2", relatedTo: ["llm"], salaryPremium: 45 },
    { id: "vector_db", label: "Vector DBs", category: "ai", status: "missing", x: 950, y: 300, marketDemand: 55, complexity: "L2", relatedTo: ["llm"], salaryPremium: 40 },

    // --- WEB3 / SECURITY (Scattered High Value) ---
    { id: "solidity", label: "Solidity", category: "web3", status: "missing", x: 500, y: 500, marketDemand: 42, complexity: "L3", relatedTo: ["rust"], salaryPremium: 50 },
    { id: "security", label: "DevSecOps", category: "security", status: "missing", x: 600, y: 400, marketDemand: 38, complexity: "L2", relatedTo: ["k8s", "aws"], salaryPremium: 35 },
];

const TICKER_DATA: MarketTicker[] = [
    { symbol: "REACT", price: "$135k", change: "+1.2%", isUp: true }, // Stable
    { symbol: "K8S", price: "$172k", change: "+8.4%", isUp: true }, // High
    { symbol: "RUST", price: "$195k", change: "+12.1%", isUp: true }, // Very High
    { symbol: "PHP", price: "$95k", change: "-0.5%", isUp: false }, // Stagnant
    { symbol: "AI_OPS", price: "$240k", change: "+28.5%", isUp: true }, // Exploding (LLMs)
    { symbol: "GO", price: "$168k", change: "+6.9%", isUp: true },
    { symbol: "RUBY", price: "$125k", change: "-1.2%", isUp: false },
    { symbol: "SOLIDITY", price: "$188k", change: "+4.2%", isUp: true }, // Stabilized High
];

// --- COMPONENT ---
export default function SkillGapAnalysis({
    userSkills = [],
    targetRole = "Cloud Architect",
    onClose
}: {
    userSkills?: string[],
    targetRole?: string,
    onClose: () => void
}) {
    const [nodes, setNodes] = useState(INITIAL_NODES);
    const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
    const [generatingDetail, setGeneratingDetail] = useState(false);
    const [aiProtocol, setAiProtocol] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // 1. FILTER NODES LOGIC
    const filteredNodes = useMemo(() => {
        return nodes.filter(n => {
            const matchesSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter ? n.category === activeFilter : true;
            return matchesSearch && matchesFilter;
        });
    }, [nodes, searchQuery, activeFilter]);

    // 2. GENERATE PROTOCOL (MOCKED AI CALL)
    const generateProtocol = async (skill: SkillNode) => {
        setGeneratingDetail(true);
        await new Promise(r => setTimeout(r, 1500)); // Simulate think time

        const protocol = `
### ⚡ MISSION PROTOCOL: OPERATION ${skill.label.toUpperCase()}
**Time-To-Viability: 24 Hours**

#### 08:00 - TACTICAL INFILTRATION (Fundamentals)
- **Objective**: Understand Core Primitives.
- **Micro-Lecture**: "Why ${skill.label}? The ${skill.year || '2026'} Context".
- **Lab**: Deploy "Hello World" in a ${skill.category} sandbox.

#### 13:00 - COMBAT DRILLS (Execution)
- **Objective**: Build a deployable artifact.
- **Action**: Clone repo 'husky-templates/${skill.id}-starter'.
- **Lab**: Modify the config to serve a custom JSON payload.

#### 19:00 - DEPLOYMENT (Verification)
- **Assessment**: Pass the "HuskyMind L${skill.complexity === 'L3' ? '3' : '1'} ${skill.label} Exam" (Score > 85%).
- **Outcome**: Badge "${skill.label} Practitioner" added to neural profile.
    `;

        setAiProtocol(protocol);
        setGeneratingDetail(false);
    };

    // 3. LIVE MARKET SIMULATION
    const [tickerIndex, setTickerIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTickerIndex(prev => (prev + 1) % TICKER_DATA.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-full flex flex-col bg-black/20 overflow-hidden relative font-sans animate-in fade-in duration-500">

            {/* 🔥 ANTI-GRAVITY BACKGROUND UPGRADE 🔥 */}
            {/* StarBackground lifted to page.tsx for performance */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-0" />

            {/* HEADER - GLASSMORPHIC */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl z-20 relative">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-neon-cyan/10 rounded-lg">
                        <Network className="text-neon-cyan" size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-widest flex items-center gap-2">
                            NEURAL GAP ANALYSIS <span className="bg-neon-cyan/20 text-neon-cyan px-1.5 py-0.5 rounded text-[9px] border border-neon-cyan/30 shadow-[0_0_10px_rgba(6,182,212,0.3)]">V2.4</span>
                        </h2>
                        <p className="text-[10px] text-slate-400 font-mono tracking-wider flex items-center gap-1">
                            <Target size={10} /> TARGET: <span className="text-white">{targetRole.toUpperCase()}</span>
                        </p>
                    </div>
                </div>

                {/* LIVE MARKET TICKER - HOLOGRAPHIC STYLE */}
                <div className="hidden xl:flex items-center gap-6 px-6 py-2 bg-black/60 rounded-full border border-white/10 shadow-[inner_0_0_10px_rgba(255,255,255,0.05)] backdrop-blur-md">
                    <Activity size={14} className="text-green-400 animate-pulse" />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tickerIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex gap-4 text-xs font-mono w-48 justify-between"
                        >
                            <span className="text-white font-bold tracking-wider">{TICKER_DATA[tickerIndex].symbol}</span>
                            <span className="text-slate-300">{TICKER_DATA[tickerIndex].price}</span>
                            <span className={`${TICKER_DATA[tickerIndex].isUp ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                                {TICKER_DATA[tickerIndex].isUp ? '▲' : '▼'} {TICKER_DATA[tickerIndex].change}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* FILTERS & SEARCH */}
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block group">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-neon-cyan transition-colors" />
                        <input
                            type="text"
                            placeholder="Search skill mesh..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:border-neon-cyan/50 focus:bg-white/5 outline-none w-48 transition-all"
                        />
                    </div>
                    <button onClick={onClose} className="px-4 py-1.5 rounded border border-white/10 text-xs text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all font-mono">
                        CLOSE [ESC]
                    </button>
                </div>
            </div>

            {/* FILTER BAR (Category Tabs) */}
            <div className="h-10 border-b border-white/5 flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm z-10 relative">
                {["All", "frontend", "backend", "cloud", "ai", "web3"].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat === "All" ? null : cat)}
                        className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full transition-all border
                    ${(activeFilter === cat || (!activeFilter && cat === "All"))
                                ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                                : "text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/5"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* MAIN VISUALIZATION AREA */}
            <div className="flex-1 relative overflow-hidden flex cursor-move z-0">

                {/* LEFT: CANVAS (The Neural Bridge) */}
                <div className="flex-1 relative cursor-grab active:cursor-grabbing">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {/* 🌟 NEURONAL MESH: Glowing Connections */}
                        {filteredNodes.map(source => (
                            source.relatedTo?.map(targetId => {
                                const target = nodes.find(n => n.id === targetId);
                                if (!target || !filteredNodes.includes(target)) return null;
                                return (
                                    <motion.g key={`${source.id}-${target.id}`}>
                                        <motion.line
                                            x1={source.x} y1={source.y}
                                            x2={target.x} y2={target.y}
                                            stroke="url(#gradient-line)"
                                            strokeWidth="1"
                                            className="opacity-20"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, delay: 0.2 }}
                                        />
                                        {/* Animated Data Packet */}
                                        <circle r="2" fill="#06b6d4">
                                            <animateMotion
                                                dur={`${2 + Math.random() * 2}s`}
                                                repeatCount="indefinite"
                                                path={`M${source.x},${source.y} L${target.x},${target.y}`}
                                            />
                                        </circle>
                                    </motion.g>
                                );
                            })
                        ))}
                        <defs>
                            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(6,182,212,0)" />
                                <stop offset="50%" stopColor="rgba(6,182,212,0.2)" />
                                <stop offset="100%" stopColor="rgba(6,182,212,0)" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* RENDER NODES (ORBS) */}
                    {filteredNodes.map(node => (
                        <motion.div
                            key={node.id}
                            layoutId={node.id}
                            onClick={() => setSelectedNode(node)}
                            className={`absolute flex flex-col items-center justify-center transition-all z-10 group
                            ${node.complexity === 'L3' ? 'w-24 h-24' : node.complexity === 'L2' ? 'w-20 h-20' : 'w-16 h-16'}
                        `}
                            style={{ left: node.x - 40, top: node.y - 40 }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.2, zIndex: 50 }}
                        >
                            {/* 🌟 ORB VISUAL */}
                            <div className={`
                            w-full h-full rounded-full backdrop-blur-sm flex flex-col items-center justify-center relative transition-all duration-300
                            ${node.status === 'acquired'
                                    ? 'bg-cyan-500/10 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] group-hover:bg-cyan-500/20'
                                    : node.status === 'learning'
                                        ? 'bg-yellow-500/10 border border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)] group-hover:shadow-[0_0_50px_rgba(234,179,8,0.6)]'
                                        : 'bg-red-500/10 border border-red-500/50 border-dashed shadow-[0_0_30px_rgba(239,68,68,0.1)] group-hover:shadow-[0_0_50px_rgba(239,68,68,0.4)]'
                                }
                            ${selectedNode?.id === node.id ? 'ring-2 ring-white scale-110 shadow-[0_0_60px_rgba(255,255,255,0.3)]' : ''}
                        `}>
                                {/* Inner Core */}
                                <div className={`w-3/4 h-3/4 rounded-full bg-gradient-to-br opacity-50
                                    ${node.status === 'acquired' ? 'from-cyan-400 to-transparent' : node.status === 'learning' ? 'from-yellow-400 to-transparent' : 'from-red-500 to-transparent'}
                                `} />

                                {/* Icon / Initials */}
                                <span className={`absolute text-xs font-black z-20 ${node.status === 'acquired' ? 'text-cyan-100' : node.status === 'learning' ? 'text-yellow-100' : 'text-red-100'}`}>
                                    {node.label.substring(0, 2).toUpperCase()}
                                </span>

                                {/* Floating Label (Always Visible but styled better) */}
                                <motion.div
                                    className="absolute -bottom-8 pointer-events-none"
                                    initial={{ opacity: 0.7 }}
                                    whileHover={{ opacity: 1, y: -2 }}
                                >
                                    <div className="bg-black/80 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-[10px] text-white font-bold whitespace-nowrap shadow-lg">
                                        {node.label}
                                    </div>
                                </motion.div>

                                {/* Complexity Badge */}
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black border border-white/20 text-[8px] flex items-center justify-center text-white/90 shadow-lg z-20 font-mono">
                                    {node.complexity}
                                </span>

                                {/* Status Pulse */}
                                {(node.status === 'missing' || node.status === 'learning') && (
                                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${node.status === 'missing' ? 'bg-red-500' : 'bg-yellow-400'}`} />
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* LEGEND overlay */}
                    <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-slate-400 backdrop-blur-md z-20 shadow-2xl">
                        <h4 className="text-white font-bold mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <Activity size={12} className="text-neon-cyan" /> Network Topology
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]" />
                                <span className="text-cyan-100">Acquired (Stable)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308]" />
                                <span className="text-yellow-100">In Progress (Syncing)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-red-100">Missing (Critical Gap)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: INTELLIGENCE PANEL (Slide Over) - GLASS SKEUOMORPHISM */}
                <AnimatePresence>
                    {selectedNode && (
                        <motion.div
                            initial={{ x: "110%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "110%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-[450px] m-4 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/10 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] z-30 relative overflow-hidden"
                        >
                            {/* Decorative Gradient Blob */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-cyan/20 blur-[100px] pointer-events-none" />

                            {/* Panel Header */}
                            <div className="p-8 border-b border-white/10 relative z-10">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-3xl font-black text-white tracking-tight">{selectedNode.label}</h3>
                                    <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                                        ✕
                                    </button>
                                </div>
                                <div className="flex gap-2 mb-6">
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border ${selectedNode.status === 'acquired' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-white/10 text-slate-300 border-white/10'}`}>
                                        {selectedNode.category}
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-400 border border-white/5 uppercase tracking-wider">
                                        Tier: {selectedNode.complexity}
                                    </span>
                                </div>

                                {/* Salary Impact Simulator */}
                                <div className="p-5 bg-[#0a0a0a] rounded-xl border border-white/10 shadow-inner group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase tracking-wide font-bold relative z-10">
                                        <span>Market Value Impact</span>
                                        <span className="text-green-400 flex items-center gap-1"><Zap size={10} /> High Confidence</span>
                                    </div>
                                    <div className="relative h-2 bg-white/10 rounded-full mb-3 overflow-hidden">
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 bg-green-500 shadow-[0_0_10px_#22c55e]"
                                            initial={{ width: "60%" }}
                                            animate={{ width: "85%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center relative z-10">
                                        <span className="text-xl font-bold text-slate-600 line-through decoration-slate-600/50">$110k</span>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={16} className="text-green-400 animate-bounce" />
                                            <span className="text-2xl font-black text-white decoration-green-500/30 underline decoration-2 underline-offset-4">
                                                ${110 + (selectedNode.salaryPremium || 0)}k
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Panel Body: AI Protocol */}
                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
                                {selectedNode.status !== 'acquired' ? (
                                    <>
                                        {!aiProtocol ? (
                                            <div className="text-center py-10">
                                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                                    <div className="absolute inset-0 border border-red-500/30 rounded-full animate-ping opacity-20" />
                                                    <ScanLine size={32} className="text-red-400" />
                                                </div>
                                                <h4 className="text-white font-bold mb-2">Gap Detected: {selectedNode.label}</h4>
                                                <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                                                    This skill is critical for {targetRole}. Initiate AI analysis to generate a tactical 24-hour learning plan.
                                                </p>
                                                <button
                                                    onClick={() => generateProtocol(selectedNode)}
                                                    disabled={generatingDetail}
                                                    className="w-full py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                                >
                                                    {generatingDetail ? (
                                                        <><Activity className="animate-spin" size={18} /> COMPUTING PATHWAY...</>
                                                    ) : (
                                                        <><Sparkles size={18} /> GENERATE PROTOCOL</>
                                                    )}
                                                </button>
                                            </div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="space-y-4"
                                            >
                                                <div className="flex items-center gap-2 text-neon-cyan text-xs font-bold uppercase tracking-widest mb-2 px-1">
                                                    <Terminal size={14} /> Mission Brief
                                                </div>
                                                <div className="p-6 bg-black/40 border border-neon-cyan/20 rounded-xl text-sm text-slate-300 whitespace-pre-line leading-relaxed font-mono shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/50 to-neon-cyan/0 opacity-50" />
                                                    {aiProtocol}
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <button className="py-3 bg-neon-cyan text-black hover:bg-cyan-400 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2">
                                                        <Cpu size={14} /> Start Lab
                                                    </button>
                                                    <button className="py-3 bg-white/5 text-white hover:bg-white/10 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors border border-white/10 flex items-center justify-center gap-2">
                                                        <Download size={14} /> Save Plan
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                                        <CheckCircle size={64} className="text-green-500 mx-auto mb-6 shadow-[0_0_30px_#22c55e]" />
                                        <h3 className="text-2xl font-bold text-white mb-2">Skill Verified</h3>
                                        <p className="text-sm text-slate-400">Mastery Level: {selectedNode.complexity}. Node Active.</p>
                                    </div>
                                )}
                            </div>

                            {/* Panel Footer */}
                            <div className="p-4 border-t border-white/10 bg-black/90 text-[10px] text-slate-600 text-center font-mono">
                                SYSTEM_ID: {selectedNode.id.toUpperCase()}_V{selectedNode.marketDemand} // LATENCY: 12ms // SECURE
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
