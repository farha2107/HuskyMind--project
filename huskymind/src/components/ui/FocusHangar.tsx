"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Headphones, X, Play, Pause, RefreshCw, Zap, Volume2, VolumeX } from 'lucide-react';
import { useUserProgress } from '@/context/UserProgressContext';
import GlassCard from './GlassCard';

export default function FocusHangar() {
    const { addFocusMinutes, addXp } = useUserProgress();
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
    const [ambientSound, setAmbientSound] = useState(false);

    // Initial minimized state
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);

                // Every minute of focus, award XP (simulated real-time feel)
                if (mode === 'FOCUS' && timeLeft % 60 === 0 && timeLeft !== 25 * 60) {
                    addFocusMinutes(1);
                }
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'FOCUS') {
                addXp(100, "POMODORO COMPLETE");
                new Audio('/sounds/complete.mp3').play().catch(() => { }); // Placeholder
                setMode('BREAK');
                setTimeLeft(5 * 60);
            } else {
                setMode('FOCUS');
                setTimeLeft(25 * 60);
            }
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, addFocusMinutes, addXp]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setMode('FOCUS');
        setTimeLeft(25 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80"
                    >
                        <GlassCard className="p-6 border-cyan-500/30 bg-black/80 backdrop-blur-xl relative overflow-hidden">
                            {/* SCANLINE EFFECT */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                                        <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                                            Focus Hangar
                                        </span>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                        <X size={14} />
                                    </button>
                                </div>

                                {/* TIMER DISPLAY */}
                                <div className="text-center mb-8">
                                    <div className="text-5xl font-black text-white font-mono tracking-tighter tabular-nums mb-2 text-shadow-glow">
                                        {formatTime(timeLeft)}
                                    </div>
                                    <span className={`text-[10px] uppercase font-bold tracking-[0.2em] px-2 py-1 rounded border ${mode === 'FOCUS' ? 'text-orange-400 border-orange-500/30 bg-orange-900/10' : 'text-green-400 border-green-500/30 bg-green-900/10'}`}>
                                        {mode === 'FOCUS' ? 'Deep Work Cycle' : 'Neural Recovery'}
                                    </span>
                                </div>

                                {/* CONTROLS */}
                                <div className="flex justify-center gap-4 mb-8">
                                    <button
                                        onClick={toggleTimer}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isActive ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 hover:scale-105'}`}
                                    >
                                        {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                                    </button>
                                    <button
                                        onClick={resetTimer}
                                        className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                                    >
                                        <RefreshCw size={18} />
                                    </button>
                                </div>

                                {/* AMBIENT TOOLS */}
                                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${ambientSound ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-500'}`}>
                                            <Headphones size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white">Neural Lo-Fi</div>
                                            <div className="text-[9px] text-slate-500 font-mono">432Hz ALPHA WAVES</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setAmbientSound(!ambientSound)}
                                        className={`p-2 rounded-full transition-colors ${ambientSound ? 'text-cyan-400 hover:bg-cyan-500/10' : 'text-slate-500 hover:text-white'}`}
                                    >
                                        {ambientSound ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TOGGLE BUTTON */}
            <motion.button
                layout
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-full border backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] ${isOpen ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400' : 'bg-black/60 border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-white'}`}
            >
                {isOpen ? (
                    <span className="text-xs font-bold tracking-widest uppercase">Close Hangar</span>
                ) : (
                    <>
                        <Clock size={18} className={isActive ? "animate-pulse text-orange-400" : ""} />
                        <span className="text-xs font-bold tracking-wider">FOCUS MODE</span>
                        {isActive && (
                            <span className="bg-orange-500/20 text-orange-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-orange-500/30">
                                {formatTime(timeLeft)}
                            </span>
                        )}
                    </>
                )}
            </motion.button>
        </div>
    );
}
