"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Cpu, Activity, Wifi } from "lucide-react";

const SYSTEM_LOGS = [
    { type: "info", text: "INITIALIZING HUSKY_CORE_V2..." },
    { type: "success", text: "NEURAL_LINK_ESTABLISHED" },
    { type: "info", text: "LOADING_USER_PROFILE: GUEST_ADMIN" },
    { type: "warning", text: "OPTIMIZING_MEMORY_HEAP..." },
    { type: "success", text: "MEMORY_OPTIMIZED: 45ms" },
    { type: "info", text: "CONNECTING_TO_SATELLITE_UPLINK..." },
    { type: "success", text: "UPLINK_SECURE [2048-bit]" },
    { type: "error", text: "THREAT_DETECTED: NONE" },
    { type: "info", text: "SCANNING_LOCAL_ASSETS..." },
    { type: "success", text: "ASSETS_VERIFIED" },
    { type: "act", text: "EXECUTING_MAIN_THREAD" },
    { type: "info", text: "RENDERING_HOLOGRAPHIC_INTERFACE..." },
    { type: "success", text: "READY." },
];

export default function LiveTerminal() {
    const [logs, setLogs] = useState<{ type: string; text: string }[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < SYSTEM_LOGS.length) {
                setLogs((prev) => [...prev, SYSTEM_LOGS[index]]);
                index++;
            } else {
                // Loop logs for "live" feel
                if (Math.random() > 0.8) {
                    const newLog = {
                        type: Math.random() > 0.9 ? "warning" : "info",
                        text: `SYS_TICK_${Math.floor(Math.random() * 9999)}: OK`
                    };
                    setLogs(prev => [...prev.slice(-15), newLog]);
                }
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="fixed bottom-4 right-4 z-40 font-mono">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 h-64 bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-lg shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* HEADER */}
                        <div className="h-8 bg-emerald-900/20 border-b border-emerald-500/20 flex items-center justify-between px-3">
                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] tracking-widest font-bold">
                                <Terminal size={12} />
                                TERMINAL_root
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                            </div>
                        </div>

                        {/* BODY */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-3 overflow-y-auto space-y-1 scrollbar-hide text-[10px]"
                        >
                            {logs.map((log, i) => (
                                <div key={i} className={`flex gap-2 ${log.type === 'error' ? 'text-red-400' :
                                        log.type === 'warning' ? 'text-amber-400' :
                                            log.type === 'success' ? 'text-emerald-400' :
                                                'text-blue-300'
                                    }`}>
                                    <span className="opacity-50">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                    <span>{log.text}</span>
                                </div>
                            ))}
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-2 h-4 bg-emerald-500/50 inline-block mt-1"
                            />
                        </div>

                        {/* STATUS BAR */}
                        <div className="h-6 bg-emerald-900/10 border-t border-emerald-500/20 flex items-center justify-between px-3 text-[9px] text-emerald-500/60">
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1"><Cpu size={10} /> 12%</span>
                                <span className="flex items-center gap-1"><Activity size={10} /> STABLE</span>
                            </div>
                            <span className="flex items-center gap-1"><Wifi size={10} /> ONLINE</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TOGGLE BUTTON */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-full border shadow-lg backdrop-blur-md transition-all ${isOpen
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-black/50 border-white/10 text-slate-400 hover:text-white"
                    }`}
            >
                <Terminal size={20} />
            </motion.button>
        </div>
    );
}
