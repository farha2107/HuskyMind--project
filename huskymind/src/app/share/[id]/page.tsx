'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Activity, Download, FileText, Grid, Rocket, Share2, Shield, Sparkles, Terminal, Zap } from 'lucide-react';
import HolographicTimeline from '@/components/ui/HolographicTimeline';

// ---------------------------------------------------------
// 🌍 PUBLIC SHARE PAGE (READ-ONLY)
// ---------------------------------------------------------
export default function SharedProfilePage() {
    const params = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 🛡️ Simulate Fetching Data (Local Storage acting as DB)
        if (params.id) {
            try {
                const profileId = Array.isArray(params.id) ? params.id[0] : params.id;
                const localData = localStorage.getItem(`huskymind_profile_${profileId}`);

                if (localData) {
                    setData(JSON.parse(localData));
                }
            } catch (e) {
                console.error("Failed to load profile", e);
            } finally {
                setTimeout(() => setLoading(false), 800); // Fake loading for effect
            }
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                <h2 className="text-xl font-bold text-white tracking-widest animate-pulse">ESTABLISHING NEURAL LINK...</h2>
                <p className="text-xs text-slate-500 mt-2 font-mono">Decrypting Career Data Stream</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center text-center p-8">
                <Shield size={64} className="text-red-500 mb-6 animate-pulse" />
                <h2 className="text-3xl font-bold text-white tracking-widest mb-2">ACCESS DENIED</h2>
                <p className="text-slate-400 max-w-md">
                    The requested Quantum Profile could not be located on this node.
                </p>
                <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl text-left max-w-lg">
                    <p className="text-xs text-yellow-500 font-mono mb-2">DEBUG INFO (SIMULATION MODE):</p>
                    <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                        <li>This feature uses LocalStorage to simulate a database.</li>
                        <li>Ensure you clicked <strong>"GO LIVE"</strong> on the main dashboard.</li>
                        <li>Ensure you are opening this link on the <strong>same device/browser</strong>.</li>
                    </ul>
                </div>
                <a href="/" className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full transition-all">
                    RETURN TO DASHBOARD
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">

            {/* 🚀 NAVIGATION BAR (READ ONLY) */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/50 border-b border-white/5 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_cyan]">
                        <span className="font-bold text-white text-xs">HM</span>
                    </div>
                    <span className="text-sm font-bold tracking-widest hidden sm:block">HUSKYMIND <span className="text-slate-500 text-[10px] font-normal">OS v2.0 // PUBLIC_VIEW</span></span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link Copied to Clipboard!");
                        }}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
                    >
                        <Share2 size={14} /> SHARE
                    </button>
                    {data.resumeBase64 && (
                        <a
                            href={`data:application/pdf;base64,${data.resumeBase64}`}
                            download={`${data.name || 'Resume'}.pdf`}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2 transition-all"
                        >
                            <Download size={14} /> DOWNLOAD RESUME
                        </a>
                    )}
                </div>
            </nav>

            {/* 🌟 MAIN CONTENT CONTAINER */}
            <main className="max-w-7xl mx-auto p-4 sm:p-8 md:p-12">

                {/* HERO SECTION */}
                <section className="mb-24 relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />

                    <div className="text-center sm:text-left">
                        <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-4 animate-in slide-in-from-bottom-4 duration-700">
                            {data.name || "UNNAMED USER"}
                        </h1>
                        <p className="text-xl sm:text-2xl text-cyan-400 font-light tracking-[0.2em] uppercase mb-8 animate-in slide-in-from-bottom-8 duration-700 delay-100">
                            {data.role || "TECHNOLOGIST"}
                        </p>

                        <p className="max-w-2xl text-slate-300 text-lg leading-relaxed mb-8 animate-in slide-in-from-bottom-8 duration-700 delay-200">
                            {data.bio || "No biography data available in this data stream."}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 animate-in slide-in-from-bottom-8 duration-700 delay-300 sm:justify-start justify-center">
                            {data.github && (
                                <a href={`https://${data.github}`} target="_blank" className="px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:border-white/30 transition-colors flex items-center gap-2">
                                    <Terminal size={12} /> {data.github}
                                </a>
                            )}
                            {data.linkedin && (
                                <a href={`https://${data.linkedin}`} target="_blank" className="px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:border-white/30 transition-colors flex items-center gap-2">
                                    <Share2 size={12} /> {data.linkedin}
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* 🧬 HOLOGRAPHIC TIMELINE */}
                <section className="mb-24 animate-in fade-in duration-1000 delay-500">
                    <HolographicTimeline />
                </section>

                {/* 🛠️ SKILLS GRID */}
                {data.skills && data.skills.length > 0 && (
                    <section className="mb-24">
                        <h3 className="text-cyan-500 font-bold mb-8 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-4">
                            <Grid size={14} /> TECHNICAL ARSENAL
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {data.skills.map((skill: string, i: number) => (
                                <span key={i} className={`px-4 py-2 rounded-lg text-sm font-bold border flex items-center gap-2 uppercase tracking-wide hover:scale-105 transition-transform cursor-default ${i % 2 === 0
                                    ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                    : 'bg-purple-500/5 border-purple-500/20 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'}`} />
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* 🚀 PROJECTS GRID */}
                {data.projects && data.projects.length > 0 && (
                    <section className="mb-24">
                        <h3 className="text-purple-500 font-bold mb-8 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-4">
                            <Rocket size={14} /> DEPLOYED OPERATIONS
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.projects.map((project: any, i: number) => (
                                <div key={i} className="group relative p-8 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5 overflow-hidden hover:border-purple-500/50 transition-all hover:bg-white/5">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                        <span className="text-6xl font-black text-white">{i + 1}</span>
                                    </div>

                                    <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h4>
                                    <div className="flex gap-2 mb-4">
                                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30 uppercase font-bold">
                                            {project.tech}
                                        </span>
                                    </div>

                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                        {project.desc}
                                    </p>

                                    {project.impact && (
                                        <div className="space-y-2 border-t border-white/5 pt-4">
                                            {project.impact.map((metric: string, j: number) => (
                                                <div key={j} className="flex items-start gap-2 text-xs text-green-300/80">
                                                    <Sparkles size={10} className="mt-0.5 shrink-0" />
                                                    {metric}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 📄 EMBEDDED RESUME (PDF) */}
                {data.resumeBase64 && (
                    <section className="mb-24 scroll-mt-24" id="resume-section">
                        <h3 className="text-red-500 font-bold mb-8 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-4">
                            <FileText size={14} /> TACTICAL DOSSIER (RESUME)
                        </h3>
                        <div className="w-full h-[800px] bg-[#111] rounded-2xl border border-white/10 overflow-hidden relative group">
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500" />
                            <iframe
                                src={`data:application/pdf;base64,${data.resumeBase64}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-full border-none bg-white opacity-95 group-hover:opacity-100 transition-opacity"
                                title="Resume PDF"
                            />
                        </div>
                    </section>
                )}

            </main>

            {/* FOOTER */}
            <footer className="w-full py-12 border-t border-white/5 bg-black/80 text-center text-slate-600 text-[10px] font-mono">
                <p>GENERATED BY HUSKYMIND OS v2.0</p>
                <p className="mt-2 text-slate-700">SECURE QUANTUM LINK // END OF STREAM</p>
            </footer>

        </div>
    );
}
