"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import clsx from "clsx";

export default function HeroSection() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        if (apiKey.length > 5) {
            setTimeout(() => setIsConnected(true), 1000); // Simulate API check
        }
    };

    return (
        <section className="relative z-10 flex flex-col items-center justify-center pt-20 pb-12 px-4 w-full max-w-5xl mx-auto text-center perspective-1000">

            {/* Status Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 px-4 py-1.5 glass-panel rounded-full inline-flex items-center gap-2"
            >
                <span className={clsx("w-2 h-2 rounded-full animate-pulse", isConnected ? "bg-neon-cyan" : "bg-electric-purple")}></span>
                <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                    {isConnected ? "Gemini AI Connected" : "System Waiting"}
                </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] leading-tight"
            >
                Your AI Career
                <br />
                <span className="text-white/20">Operating System</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-12"
            >
                Bring Your Own Key (BYOK) to unlock a revolutionary
                <br />
                <span className="text-neon-cyan glow-text-cyan">Spatial Web Experience</span>.
            </motion.p>

            {/* BYOK Interaction */}
            <div className="relative h-16 w-full flex justify-center">
                <AnimatePresence mode="wait">
                    {!isExpanded ? (
                        <motion.button
                            key="cta"
                            layoutId="byok-container"
                            onClick={() => setIsExpanded(true)}
                            className="glass-btn px-8 h-14 rounded-full text-white font-medium flex items-center gap-3 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-electric-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Key size={18} className="text-neon-cyan" />
                            <span>Bring your AI to continue</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    ) : (
                        <motion.div
                            key="input"
                            layoutId="byok-container"
                            className="glass-panel rounded-full p-1 pl-4 pr-1 flex items-center h-14 w-full max-w-md gap-3"
                        >
                            <Key size={18} className="text-white/40 shrink-0" />
                            <input
                                type="password"
                                placeholder="sk-..."
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="bg-transparent border-none outline-none text-white placeholder-white/20 w-full font-mono text-sm"
                                autoFocus
                                onKeyDown={(e) => e.key === "Enter" && handleConnect()}
                            />
                            <button
                                onClick={handleConnect}
                                disabled={isConnected}
                                className={clsx(
                                    "h-10 px-6 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                    isConnected
                                        ? "bg-neon-cyan/20 text-neon-cyan"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                )}
                            >
                                {isConnected ? (
                                    <>
                                        <CheckCircle2 size={16} /> Connected
                                    </>
                                ) : (
                                    <>
                                        Connect <Sparkles size={14} />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
