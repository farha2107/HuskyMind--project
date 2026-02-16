
"use client";

import React, { useState } from "react";
import { Sparkles, Globe, Key, ArrowRight, Lock, User, Database, Cpu, Activity, Shield, FileText, BrainCircuit, Zap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface LandingPageProps {
    onLogin: (key: string, name: string) => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
    const [loginStep, setLoginStep] = useState<'key' | 'name'>('key');
    const [tempKey, setTempKey] = useState("");
    const [tempName, setTempName] = useState("");

    const handleFinalSubmit = () => {
        if (tempName.trim() && tempKey.trim()) {
            onLogin(tempKey, tempName);
        }
    };

    return (
        <div className="w-full relative z-10 animate-in fade-in duration-1000 bg-[#050505] selection:bg-cyan-500 selection:text-black">

            {/* --- TOP STATUS BAR --- */}
            <div className="w-full h-8 bg-black border-b border-white/10 flex items-center justify-between px-4 text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest z-50 sticky top-0">
                <div className="flex gap-6">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SYSTEM: ONLINE</span>
                    <span className="hidden md:flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> INTELLIGENCE: ACTIVE</span>
                </div>
                <div className="flex gap-6">
                    <span>GLOBAL NODES: 12,402</span>
                    <span className="text-white/30 lowercase">powered by hyskymind group</span>
                </div>
            </div>

            {/* --- HERO SECTION (THE VOID) --- */}
            <section className="flex-1 flex flex-col items-center justify-center relative z-10 pt-20 pb-32 px-4 text-center min-h-[85vh]">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

                {/* Badge */}
                <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] font-bold tracking-[0.2em] shadow-xl uppercase">
                    ● Version 2.0.4 Pre-Alpha
                </div>

                {/* MAIN TITLE (Metallic Typography) */}
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4 relative z-20">
                    HUSKY<span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">MIND</span>
                </h1>

                {/* TAGLINE */}
                <p className="text-xl text-white/50 font-light mb-12 tracking-wide text-center max-w-2xl leading-relaxed">
                    The <span className="text-white font-medium">Operating System</span> for Career Acceleration.
                    <br />
                    <span className="text-sm text-cyan-500/60 font-mono mt-2 block uppercase">Algorithmic Career Mapping™</span>
                </p>

                {/* --- CONNECT IDENTITY (API INPUT) --- */}
                <div className="w-full max-w-md relative z-30 space-y-4">
                    <div className="w-full py-4 bg-white text-black font-bold text-center rounded-lg cursor-default tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
                        <Globe size={16} /> CONNECT IDENTITY
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest justify-center">
                        <span className="h-px w-12 bg-white/10"></span>
                        OR MANUAL ACCESS
                        <span className="h-px w-12 bg-white/10"></span>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
                        <div className="relative bg-[#0a0f18] border border-white/10 rounded-lg p-1">
                            {loginStep === 'key' ? (
                                <div className="flex items-center relative">
                                    <div className="pl-4 text-white/50"><Key size={16} /></div>
                                    <input
                                        type="password"
                                        placeholder="Enter Gemini / OpenAI Key"
                                        className="w-full bg-transparent border-none text-white p-4 focus:ring-0 outline-none font-mono text-sm placeholder:text-white/20"
                                        value={tempKey}
                                        onChange={(e) => setTempKey(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && tempKey.trim().length > 10) {
                                                setLoginStep('name');
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={() => tempKey.trim().length > 10 && setLoginStep('name')}
                                        className="absolute right-2 p-2 rounded-md bg-white/5 hover:bg-cyan-500 hover:text-black text-white/40 transition-all"
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center relative animate-in slide-in-from-right-4">
                                    <div className="pl-4 text-white/50"><User size={16} /></div>
                                    <input
                                        type="text"
                                        placeholder="Enter Codename..."
                                        autoFocus
                                        className="w-full bg-transparent border-none text-white p-4 focus:ring-0 outline-none font-mono text-sm placeholder:text-white/20"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && tempName.trim()) {
                                                handleFinalSubmit();
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={handleFinalSubmit}
                                        className="absolute right-2 p-2 rounded-md bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)] hover:bg-white transition-all font-bold"
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES SECTION (THE VAULT) --- */}
            <section className="w-full bg-black/50 border-t border-white/5 backdrop-blur-sm py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-[#0a0f18] border border-white/5 hover:border-white/10 transition-all group">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white/40 mb-6 group-hover:text-neon-cyan transition-colors">
                                <Database size={24} />
                            </div>
                            <h4 className="text-white font-bold mb-3 text-lg">Private Intel</h4>
                            <p className="text-sm text-white/40 leading-relaxed">
                                Universal Resume Mapping using your own AI models. No shared data. No leaks. Total professional privacy.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-[#0a0f18] border border-white/5 hover:border-white/10 transition-all group">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white/40 mb-6 group-hover:text-neon-cyan transition-colors">
                                <Cpu size={24} />
                            </div>
                            <h4 className="text-white font-bold mb-3 text-lg">Neural Simulation</h4>
                            <p className="text-sm text-white/40 leading-relaxed">
                                Practice high-stakes technical interrogation in a secure vault. Mimic FAANG-tier interviews with a ruthless AI agent.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-[#0a0f18] border border-white/5 hover:border-white/10 transition-all group">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white/40 mb-6 group-hover:text-neon-cyan transition-colors">
                                <Activity size={24} />
                            </div>
                            <h4 className="text-white font-bold mb-3 text-lg">Quantum Tracking</h4>
                            <p className="text-sm text-white/40 leading-relaxed">
                                Real-time skill gap analysis. Visualize your career progression through a live neural network graph.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROCESS SECTION --- */}
            <section className="w-full py-32 border-t border-white/5 bg-[#030303]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <h2 className="text-4xl font-bold text-white mb-6">Initialize the Protocol</h2>
                            <p className="text-white/50 mb-12 max-w-lg leading-relaxed">
                                Step into the next generation of career management. Our BYOK (Bring Your Own Key) architecture gives you 100% control over your intelligence layer.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { step: "01", title: "INPUT_IDENTITY", desc: "Connect your AI credentials and professional codename." },
                                    { step: "02", title: "ANALYZE_CORE", desc: "Our system audits your profile for critical skill gaps." },
                                    { step: "03", title: "OPTIMIZE_DATA", desc: "Rewriting your professional narrative via neural-optimization." },
                                    { step: "04", title: "LAUNCH_MISSION", desc: "Deploy your identity to global opportunity hubs." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <span className="text-neon-cyan font-mono text-sm pt-1">{item.step}</span>
                                        <div>
                                            <h5 className="text-white font-bold text-sm tracking-widest">{item.title}</h5>
                                            <p className="text-[11px] text-white/30 uppercase mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full flex justify-center">
                            <div className="relative w-[400px] h-[400px]">
                                <div className="absolute inset-0 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute inset-10 border border-white/10 rounded-full border-dashed animate-spin-slow" />
                                <div className="absolute inset-20 border border-neon-cyan/20 rounded-full animate-reverse-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BrainCircuit size={80} className="text-white/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER STATUS --- */}
            <footer className="w-full py-8 border-t border-white/5 text-center bg-black">
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">
                    SECURED_BY_AES_256 // HUSKY_CORE_V.2.0.4
                </p>
            </footer>
        </div>
    );
}
