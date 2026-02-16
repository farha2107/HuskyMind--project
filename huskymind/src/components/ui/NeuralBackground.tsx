"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import WebGLErrorBoundary from "./WebGLErrorBoundary";

function NeuralNetwork() {
    const count = 50; // Reduced from 100 for performance
    const connectionDistance = 3.5; // Increased slightly to maintain visual density

    // Create stable buffers once
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;
            temp.push({
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015, 0) // Slower speed
            });
        }
        return temp;
    }, []);

    const linesGeometry = useRef<THREE.BufferGeometry>(null);
    const pointsGeometry = useRef<THREE.BufferGeometry>(null);

    // Pre-allocate arrays to avoid GC
    const positions = useMemo(() => new Float32Array(count * 3), []);
    const linePositions = useMemo(() => new Float32Array(count * count * 3), []); // Max potential lines
    const lineColors = useMemo(() => new Float32Array(count * count * 4), []);

    useFrame(() => {
        // Update particle positions
        let posIdx = 0;
        particles.forEach(p => {
            p.position.add(p.velocity);

            // Boundary bounce
            if (Math.abs(p.position.x) > 10) p.velocity.x *= -1;
            if (Math.abs(p.position.y) > 10) p.velocity.y *= -1;

            positions[posIdx++] = p.position.x;
            positions[posIdx++] = p.position.y;
            positions[posIdx++] = p.position.z;
        });

        if (pointsGeometry.current) {
            pointsGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            pointsGeometry.current.attributes.position.needsUpdate = true;
        }

        // Connect lines - Optimized Loop
        let lineIdx = 0;
        let colorIdx = 0;

        // We only check a subset or optimize by not creating new arrays
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const p1 = particles[i].position;
                const p2 = particles[j].position;
                const distSq = p1.distanceToSquared(p2); // Faster than distanceTo

                if (distSq < connectionDistance * connectionDistance) {
                    // Lines
                    linePositions[lineIdx++] = p1.x;
                    linePositions[lineIdx++] = p1.y;
                    linePositions[lineIdx++] = p1.z;
                    linePositions[lineIdx++] = p2.x;
                    linePositions[lineIdx++] = p2.y;
                    linePositions[lineIdx++] = p2.z;

                    // Colors
                    const alpha = 1.0 - (Math.sqrt(distSq) / connectionDistance);
                    lineColors[colorIdx++] = 0;
                    lineColors[colorIdx++] = 0.95;
                    lineColors[colorIdx++] = 1;
                    lineColors[colorIdx++] = alpha;
                    lineColors[colorIdx++] = 0;
                    lineColors[colorIdx++] = 0.95;
                    lineColors[colorIdx++] = 1;
                    lineColors[colorIdx++] = alpha;
                }
            }
        }

        if (linesGeometry.current) {
            linesGeometry.current.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIdx), 3));
            linesGeometry.current.setAttribute('color', new THREE.BufferAttribute(lineColors.slice(0, colorIdx), 4));
            linesGeometry.current.attributes.position.needsUpdate = true;
            linesGeometry.current.attributes.color.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* Points */}
            <points>
                <bufferGeometry ref={pointsGeometry}>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.1} color="#00f3ff" transparent opacity={0.6} sizeAttenuation={true} />
            </points>

            {/* Connecting Lines */}
            <lineSegments>
                <bufferGeometry ref={linesGeometry} />
                <lineBasicMaterial vertexColors={true} transparent={true} blending={THREE.AdditiveBlending} depthWrite={false} />
            </lineSegments>
        </group>
    );
}

export default function NeuralBackground({ className = "" }: { className?: string }) {
    return (
        <div className={`fixed inset-0 z-[-1] w-full h-full bg-[#050505] pointer-events-none transition-opacity duration-700 ease-in-out ${className}`}>
            <WebGLErrorBoundary>
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 60 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                >
                    <NeuralNetwork />
                </Canvas>
            </WebGLErrorBoundary>
        </div>
    );
}
