import React from 'react';
import { Terminal, Cpu, Cloud, Zap, Activity } from 'lucide-react';

const HolographicTimeline = () => {
    return (
        <div className="mb-16">
            <h3 className="text-cyan-500 font-bold mb-6 text-xs uppercase tracking-widest flex items-center gap-2 animate-pulse">
                <Activity size={14} /> NEURAL ACTIVITY STREAM
            </h3>

            {/* HOLOGRAPHIC TIMELINE CONTAINER */}
            <div className="relative h-64 w-full bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden group">

                {/* Background Grid & Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />

                {/* Central Data Stream Line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_15px_cyan]" />

                {/* Floating Particles (CSS Animation) */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            opacity: Math.random() * 0.5
                        }}
                    />
                ))}

                {/* Timeline Nodes */}
                <div className="absolute inset-0 flex items-center justify-between px-16 z-10">
                    {[
                        { year: '2023', title: 'System Initialization', icon: Terminal },
                        { year: '2024', title: 'Neural Upgrade: v1.0', icon: Cpu },
                        { year: '2025', title: 'Cloud Integration', icon: Cloud },
                        { year: '2026', title: 'Singularity Event', icon: Zap }
                    ].map((milestone, i) => (
                        <div key={i} className="relative flex flex-col items-center group/node cursor-pointer">
                            {/* The Node */}
                            <div className="w-4 h-4 rounded-full bg-black border-2 border-cyan-500 shadow-[0_0_20px_cyan] group-hover/node:scale-150 group-hover/node:bg-cyan-500 transition-all duration-300 z-20 relative">
                                <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500 opacity-20 group-hover/node:opacity-50" />
                            </div>

                            {/* Vertical Line Connector */}
                            <div className={`absolute ${i % 2 === 0 ? 'bottom-0 h-16 bg-gradient-to-t' : 'top-0 h-16 bg-gradient-to-b'} w-px from-cyan-500/50 to-transparent -z-10`}
                                style={{ [i % 2 === 0 ? 'marginBottom' : 'marginTop']: '16px' }}
                            />

                            {/* Info Card (Alternating Top/Bottom) */}
                            <div className={`absolute ${i % 2 === 0 ? 'bottom-full mb-8' : 'top-full mt-8'} w-48 p-4 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-xl opacity-0 group-hover/node:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/node:translate-y-0 text-center`}>
                                <milestone.icon size={24} className="mx-auto text-cyan-400 mb-2" />
                                <div className="text-xs font-bold text-white uppercase tracking-wider">{milestone.year}</div>
                                <div className="text-[10px] text-slate-400 mt-1">{milestone.title}</div>
                                <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HolographicTimeline;
