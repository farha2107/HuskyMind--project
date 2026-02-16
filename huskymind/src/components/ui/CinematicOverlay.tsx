"use client";

import React from "react";

/**
 * CinematicOverlay Component
 * Adds a subtle film grain, vignette, and scanline effect to the entire application.
 * This creates a high-end "Retro-Futuristic" or "Cyberpunk" aesthetic.
 * All effects are pointer-events-none to prevent blocking interactions.
 */
export default function CinematicOverlay() {
    return (
        <>
            {/* 1. FILM GRAIN (Noise Texture) */}
            <div
                className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                }}
            />

            {/* 2. VIGNETTE (Darkened Corners) */}
            <div
                className="fixed inset-0 z-50 pointer-events-none mix-blend-multiply"
                style={{
                    background: "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.4) 100%)",
                }}
            />

            {/* 3. SCANLINES (CRT Effect) */}
            <div
                className="fixed inset-0 z-50 pointer-events-none opacity-[0.02]"
                style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))",
                    backgroundSize: "100% 4px"
                }}
            />

            {/* 4. CHROMATIC ABERRATION (Subtle Edge Blur) */}
            {/* Implemented as a very subtle CSS effect if needed, but keeping clean for now to avoid text blur issues. */}
        </>
    );
}
