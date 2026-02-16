"use client";

import { motion } from "framer-motion";

export default function BlueprintBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a192f] pointer-events-none">
            {/* 1. BLUEPRINT GRID */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #64ffda 1px, transparent 1px),
                                      linear-gradient(to bottom, #64ffda 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(to right, #64ffda 1px, transparent 1px),
                                      linear-gradient(to bottom, #64ffda 1px, transparent 1px)`,
                    backgroundSize: '200px 200px',
                }}
            />

            {/* 2. TECHNICAL MARKINGS */}
            <div className="absolute top-10 left-10 p-4 border-l border-t border-cyan-500/20 w-32 h-32" />
            <div className="absolute bottom-10 right-10 p-4 border-r border-b border-cyan-500/20 w-32 h-32" />

            <div className="absolute top-1/2 right-10 -translate-y-1/2 flex flex-col gap-8 opacity-20">
                <div className="w-1 h-32 bg-cyan-500/50" />
                <div className="w-1 h-16 bg-cyan-500/30" />
                <div className="w-1 h-8 bg-cyan-500/10" />
            </div>

            {/* 3. MEASUREMENT LINES */}
            <motion.div
                className="absolute left-0 w-full h-px bg-cyan-500/10"
                style={{ top: '30%' }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-0 h-full w-px bg-cyan-500/10"
                style={{ left: '30%' }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* 4. VIGNETTE */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020c1b_90%)]" />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-500/30 tracking-[0.5em]">
                ARCHITECT_MODE // DRAFTING_SURFACE_V1
            </div>
        </div>
    );
}
