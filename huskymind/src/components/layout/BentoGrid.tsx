"use client";

import clsx from "clsx";
import GlassCard from "@/components/ui/GlassCard";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useFloatAnimation } from "@/hooks/useFloatAnimation";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

interface BentoItemProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3; // 1 = small, 2 = medium, 3 = full
    rowSpan?: 1 | 2;
    delay?: number;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={clsx("grid grid-cols-1 md:grid-cols-3 gap-6 w-full auto-rows-[200px] md:auto-rows-[250px]", className)}>
            {children}
        </div>
    );
}

export function BentoItem({ children, className, colSpan = 1, rowSpan = 1, delay = 0 }: BentoItemProps) {
    const floatY = useFloatAnimation(10, 1.5, delay); // Float 10px, 1.5s speed, with delay

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ y: floatY }} // Apply float
            className={clsx(
                "h-full w-full",
                colSpan === 2 && "md:col-span-2",
                colSpan === 3 && "md:col-span-3",
                rowSpan === 2 && "md:row-span-2",
                className
            )}
        >
            <GlassCard className="h-full w-full flex flex-col">
                {children}
            </GlassCard>
        </motion.div>
    );
}
