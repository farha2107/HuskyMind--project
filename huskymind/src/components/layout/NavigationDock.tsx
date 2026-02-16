"use client";

import { useUserProgress } from "@/context/UserProgressContext";
import { Home, FileText, Briefcase, GraduationCap, Brain, User, BarChart2, Users, Target, Zap, Trophy, Flame, Cpu } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Target, label: "ATS War Room", id: "war-room" },
    { icon: FileText, label: "Resume Studio", id: "resume" },
    { icon: Briefcase, label: "Portfolio Hub", id: "portfolio" },
    { icon: GraduationCap, label: "Courses", id: "courses" },
    { icon: Brain, label: "AI Assessments", id: "assessments" },
    { icon: Cpu, label: "Genesis Architect", id: "genesis" },
    { icon: User, label: "AI Mentor", id: "mentor" },
    { icon: BarChart2, label: "Skill Gap", id: "skill-gap" },
    { icon: Users, label: "Community", id: "community" },
];

// ... existing code ...

import { useApiKey } from "@/context/ApiKeyContext";
import { LogOut } from "lucide-react";

export default function NavigationDock({ activeView, setActiveView }: { activeView: string, setActiveView: (view: string) => void }) {
    const { level, rank, xp, streak, levelProgress } = useUserProgress();
    const { clearApiKey } = useApiKey();

    const handleLogout = () => {
        if (confirm("Disconnect Neural Link? This will clear your API Key from local storage.")) {
            clearApiKey();
            window.location.reload(); // Force modal to reappear
        }
    };

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col">
            {/* Sidebar Header */}
            <div className="h-20 flex items-center px-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-purple to-neon-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                        <span className="font-bold text-white text-md">H</span>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white tracking-wide">HUSKYMIND</div>
                        <div className="text-[9px] text-white/40 font-mono tracking-widest">OS v2.0</div>
                    </div>
                </div>
            </div>

            {/* GAMIFICATION HUD */}
            <div className="px-6 py-6 border-b border-white/5 bg-white/2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="px-1.5 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded text-[10px] font-bold text-cyan-400">
                            LVL {level}
                        </div>
                        <span className="text-[10px] uppercase text-slate-500 font-mono tracking-wide">{rank}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-orange-400">
                        <Flame size={10} fill="currentColor" /> {streak}
                    </div>
                </div>

                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3 relative group">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
                        style={{ width: `${levelProgress}%` }}
                    />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5"><Zap size={10} className="text-yellow-400" fill="currentColor" /> {xp.toLocaleString()} XP</span>
                    <span>NEXT: {Math.floor(xp + (100 - levelProgress) * 10)}</span>
                </div>
            </div>

            {/* Nav Items */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = activeView === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-white/5 text-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] border border-white/10"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {/* Active Glow Bar */}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-cyan shadow-[0_0_10px_#00f3ff]" />
                            )}

                            <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className={clsx("transition-colors", isActive ? "text-neon-cyan" : "group-hover:text-white")} />
                            <span className={clsx("text-sm font-medium tracking-wide", isActive ? "text-white" : "")}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Sidebar Footer / User Profile */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <div className="glass-panel p-3 rounded-xl flex items-center gap-3 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                        <User size={14} className="text-white/60 group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-bold text-white">Alex Student</div>
                        <div className="text-[9px] text-neon-cyan font-mono">:: ONLINE</div>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 p-2 text-[10px] text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors border border-transparent hover:border-red-500/20"
                >
                    <LogOut size={12} /> Disconnect Key
                </button>
            </div>
        </aside>
    );
}
