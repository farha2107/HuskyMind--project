"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Cloud } from "@react-three/drei";
import { Group } from "three";
import WebGLErrorBoundary from "./WebGLErrorBoundary";

function FloatingStars() {
    const ref = useRef<Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.05;
            ref.current.rotation.x = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <group ref={ref}>
            <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#00f3ff" />
            <Sparkles count={50} scale={15} size={4} speed={0.3} opacity={0.3} color="#bd00ff" />
        </group>
    );
}

export default function StarBackground({ className = "" }: { className?: string }) {
    return (
        <div className={`fixed inset-0 z-[-1] w-full h-full pointer-events-none transition-opacity duration-700 ease-in-out ${className}`}>
            <WebGLErrorBoundary>
                <Canvas
                    camera={{ position: [0, 0, 1] }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                >
                    <FloatingStars />
                </Canvas>
            </WebGLErrorBoundary>
        </div>
    );
}
