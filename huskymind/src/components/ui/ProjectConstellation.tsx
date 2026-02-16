"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ProjectConstellationProps {
    projects: any[];
}

const ProjectConstellation = ({ projects }: ProjectConstellationProps) => {
    // Generate a set of unique skills from projects to act as "Star Nodes"
    const allSkills = Array.from(new Set(projects.flatMap(p =>
        p.tech ? p.tech.split(/,|\+/).map((s: string) => s.trim()) : []
    ))).slice(0, 8); // Limit to top 8 for visual clarity

    return (
        <div className="relative w-full h-80 bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden mb-20 group">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_70%)]" />

            {/* Header */}
            <div className="absolute top-4 left-6 z-10">
                <h3 className="text-cyan-500 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    PROJECT CONSTELLATION
                </h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                    VISUALIZING KNOWLEDGE GRAPH // {projects.length} NODES ACTIVE
                </p>
            </div>

            {/* The Constellation Graph */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-lg mx-auto">

                    {/* SVG Connections Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Define Gradients */}
                        <defs>
                            <linearGradient id="lineGap" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(6,182,212,0)" />
                                <stop offset="50%" stopColor="rgba(6,182,212,0.3)" />
                                <stop offset="100%" stopColor="rgba(6,182,212,0)" />
                            </linearGradient>
                        </defs>

                        {/* Draw lines from Center (Projects) to Outer (Skills) */}
                        {projects.map((project, i) => {
                            // Simple circular distribution logic for demo visual
                            const angle = (i / projects.length) * Math.PI * 2;
                            const x = 50 + Math.cos(angle) * 30; // %
                            const y = 50 + Math.sin(angle) * 30; // %

                            return (
                                <React.Fragment key={i}>
                                    <line
                                        x1="50%" y1="50%"
                                        x2={`${x}%`} y2={`${y}%`}
                                        stroke="url(#lineGap)"
                                        strokeWidth="1"
                                    />
                                    {/* Orbiting Particle on Line */}
                                    {/* <circle r="1" fill="#fff">
                                         <animateMotion 
                                            dur={`${3 + i}s`} 
                                            repeatCount="indefinite"
                                            path={`M50,50 L${x},${y}`} 
                                         />
                                     </circle> */}
                                </React.Fragment>
                            )
                        })}
                    </svg>

                    {/* Central Core (User) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="relative w-16 h-16 bg-black/50 backdrop-blur-md border border-cyan-500/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                            <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-20" />
                            <span className="text-2xl">🧠</span>
                        </div>
                    </div>

                    {/* Project Nodes (Orbiting) */}
                    {projects.map((project, i) => {
                        const angle = (i / projects.length) * Math.PI * 2;
                        const radius = 35; // % from center
                        const x = 50 + Math.cos(angle) * radius;
                        const y = 50 + Math.sin(angle) * radius;

                        return (
                            <motion.div
                                key={i}
                                className="absolute z-20"
                                style={{ left: `${x}%`, top: `${y}%` }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.2, zIndex: 50 }}
                            >
                                <div className="relative group/node cursor-pointer">
                                    <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan]" />
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 bg-black/80 backdrop-blur border border-white/10 p-2 rounded text-center opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none">
                                        <div className="text-[9px] font-bold text-white uppercase">{project.title}</div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}

                    {/* Skill Particles (Floating Background) */}
                    {allSkills.map((skill, i) => (
                        <motion.div
                            key={`skill-${i}`}
                            className="absolute px-2 py-1 bg-white/5 rounded-full border border-white/5 text-[8px] text-white/30"
                            animate={{
                                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                                y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`
                            }}
                        >
                            {skill}
                        </motion.div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default ProjectConstellation;
