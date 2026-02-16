"use client";

import { motion } from "framer-motion";
import { Dog } from "lucide-react";

export default function HuskyCore() {
    return (
        <div className="flex flex-col items-center gap-4 py-10">
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-black/80 to-deep-navy/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-5px_rgba(0,243,255,0.6)]"
            >
                <Dog size={48} className="text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

                {/* Inner pulsing ring */}
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border border-neon-cyan/30"
                />
            </motion.div>

            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-mint animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-soft-mint font-mono drop-shadow-[0_0_5px_rgba(0,255,157,0.5)]">
                    System Operational
                </span>
            </div>
        </div>
    );
}
