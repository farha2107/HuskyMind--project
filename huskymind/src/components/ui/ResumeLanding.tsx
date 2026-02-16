"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Zap, Award, Target, CheckCircle2, Star, Sparkles, Shield, Upload } from 'lucide-react';

interface ResumeLandingProps {
    onStart: () => void;
}

export default function ResumeLanding({ onStart }: ResumeLandingProps) {
    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center p-8">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,#050505_100%)]" />
            </div>

            <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* LEFT: CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider">
                        <Sparkles size={12} />
                        v2.0 ARCHITECT ENGINE
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                            Build Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                Professional Identity
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                            Stop using generic templates. Deploy a **tactical operations blueprint** designed for ATS dominance and executive impact.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={onStart}
                            className="group relative px-8 py-4 bg-emerald-500 text-black font-bold text-sm rounded-xl overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                INITIALIZE CAREER FORGE
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>

                        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-sm rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3">
                            <Upload size={16} className="text-slate-400" />
                            IMPORT EXISTING DATA
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-white">98%</div>
                            <div className="text-xs text-slate-500 font-mono">ATS PARSE RATE</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-white">15+</div>
                            <div className="text-xs text-slate-500 font-mono">TACTICAL LAYOUTS</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-white">4.9/5</div>
                            <div className="text-xs text-slate-500 font-mono">RECRUITER RATING</div>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT: VISUALS */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative"
                >
                    {/* Floating Cards Effect */}
                    <div className="relative w-full aspect-[4/5] perspective-1000">

                        {/* Resume Card 1 (Back) */}
                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [-5, -7, -5] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 right-10 w-3/4 h-full bg-slate-800 rounded-lg opacity-40 transform -rotate-6 scale-90 border border-white/10"
                        />

                        {/* Resume Card 2 (Middle) */}
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [3, 5, 3] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute top-4 left-4 w-3/4 h-full bg-slate-900 rounded-lg opacity-60 transform rotate-3 scale-95 border border-white/20"
                        />

                        {/* Main Resume Card (Front) */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-8 left-12 w-3/4 h-full bg-[#0a0a0a] rounded-xl border border-emerald-500/30 shadow-2xl shadow-emerald-900/20 overflow-hidden"
                        >
                            {/* Mock Resume Content */}
                            <div className="p-6 space-y-4 opacity-50">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/20" />
                                    <div className="space-y-2 flex-1 pt-2">
                                        <div className="h-4 bg-white/20 rounded w-3/4" />
                                        <div className="h-3 bg-white/10 rounded w-1/2" />
                                    </div>
                                </div>
                                <div className="h-px bg-white/10 w-full my-6" />
                                <div className="space-y-3">
                                    <div className="h-3 bg-white/10 rounded w-full" />
                                    <div className="h-3 bg-white/10 rounded w-5/6" />
                                    <div className="h-3 bg-white/10 rounded w-4/6" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="h-24 bg-white/5 rounded" />
                                    <div className="h-24 bg-white/5 rounded" />
                                </div>
                            </div>

                            {/* Scanning Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent h-1/2 w-full animate-scan pointer-events-none" />
                        </motion.div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-4 top-20 bg-[#0f172a] border border-emerald-500/30 p-4 rounded-xl shadow-xl flex items-center gap-3"
                        >
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <CheckCircle2 size={20} className="text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">ATS Optimized</div>
                                <div className="text-emerald-400 text-xs">Score: 98/100</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -left-8 bottom-32 bg-[#0f172a] border border-blue-500/30 p-4 rounded-xl shadow-xl flex items-center gap-3"
                        >
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Target size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Recruiter Ready</div>
                                <div className="text-blue-400 text-xs">Top 1% Format</div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
