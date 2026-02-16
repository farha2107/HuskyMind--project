"use client";

import { useTime, useTransform, MotionValue } from "framer-motion";

/**
 * Returns a y-offset MotionValue that oscillates in a sine wave.
 * @param distance Max distance to float up/down (pixels)
 * @param speed Speed of the oscillation (seconds per cycle approx)
 * @param delay Time offset in seconds
 */
export function useFloatAnimation(distance: number = 10, speed: number = 1, delay: number = 0) {
    const time = useTime();

    // Create a sine wave: sin(time * speed + delay) * distance
    // time is in ms, so we divide by 1000 to get seconds
    const y = useTransform(time, (t) => {
        return Math.sin(t / 1000 * speed + delay) * distance;
    });

    return y;
}
