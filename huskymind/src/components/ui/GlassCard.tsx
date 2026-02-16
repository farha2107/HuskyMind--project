"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, MouseEvent } from "react";
import clsx from "clsx";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    noTilt?: boolean;
    floating?: boolean;
}

export default function GlassCard({ children, className, noTilt = false, floating = false }: GlassCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    function onMouseMove(event: MouseEvent<HTMLDivElement>) {
        if (noTilt) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXPos = event.clientX - rect.left;
        const mouseYPos = event.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function onMouseLeave() {
        if (noTilt) return;
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            animate={floating ? { y: [0, -10, 0] } : {}}
            transition={floating ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : {}}
            style={{
                rotateX: noTilt ? 0 : rotateX,
                rotateY: noTilt ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            className={clsx(
                "relative rounded-2xl glass-panel p-6 overflow-hidden group transition-all duration-500",
                "before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
                className
            )}
        >
            {/* Edge Glow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-500" />

            {/* Content */}
            <div className="relative z-10 translate-z-10">
                {children}
            </div>
        </motion.div>
    );
}
