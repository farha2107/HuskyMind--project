"use client";

import { motion } from "framer-motion";

export default function CentralOrb() {
    return (
        <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 mx-auto mt-10">
            {/* Core Orb */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric-purple to-neon-cyan blur-md opacity-80"
            />

            {/* Inner White Core */}
            <div className="absolute w-20 h-20 bg-white rounded-full blur-sm opacity-90 z-10" />

            {/* Wolf Logo Placeholder (SVG) */}
            <div className="relative z-20 w-16 h-16 text-deep-navy">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
                </svg>
            </div>

            {/* Rotating Rings */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] rounded-full border border-neon-cyan/30 border-dashed"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] rounded-full border border-electric-purple/20 border-dotted"
            />
        </div>
    );
}
