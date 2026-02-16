"use client";

import { motion } from "framer-motion";

export default function TacticalGridBackground({ scanning = false }: { scanning?: boolean }) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
            {/* 1. BASE GRID (Perspective Plane) */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #1f2937 1px, transparent 1px),
                                      linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
                    transformOrigin: 'top center',
                }}
            />

            {/* 2. RADAR SCAN LINE (CONDITIONAL) */}
            {scanning && (
                <motion.div
                    className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)] z-10"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            )}

            {/* 3. VIGNETTE OVERLAY */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />

            {/* 4. DECORATIVE HUD ELEMENTS */}
            <div className="absolute top-10 left-10 p-2 border-l-2 border-t-2 border-cyan-500/30 w-16 h-16 opacity-50" />
            <div className="absolute bottom-10 right-10 p-2 border-r-2 border-b-2 border-cyan-500/30 w-16 h-16 opacity-50" />

            <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-2 opacity-20">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-cyan-500 rounded-full" />
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-500/30 tracking-[0.5em]">
                SYSTEM_SECURE // ENCRYPTION_ACTIVE
            </div>
        </div>
    );
}
