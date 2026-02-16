"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- TYPES ---
export type Rank = "Novice" | "Explorer" | "Architect" | "Titan" | "Huskymind";

interface UserProgress {
    xp: number;
    level: number;
    rank: Rank;
    streak: number;
    focusMinutes: number;
    achievements: string[];
}

interface UserProgressContextType extends UserProgress {
    addXp: (amount: number, reason?: string) => void;
    addFocusMinutes: (minutes: number) => void;
    levelProgress: number; // 0-100%
}

// --- CONFIG ---
const LEVEL_THRESHOLDS = [0, 1000, 2500, 5000, 10000, 20000]; // XP needed for Level 1, 2, 3...
const RANKS: Rank[] = ["Novice", "Explorer", "Architect", "Titan", "Huskymind"];

// --- CONTEXT ---
const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: ReactNode }) {
    // STATE
    const [xp, setXp] = useState(1250); // Start with some XP to show UI
    const [streak, setStreak] = useState(12);
    const [focusMinutes, setFocusMinutes] = useState(45);
    const [achievements, setAchievements] = useState<string[]>([]);

    // DERIVED STATE
    const [level, setLevel] = useState(1);
    const [rank, setRank] = useState<Rank>("Novice");
    const [levelProgress, setLevelProgress] = useState(0);

    // LEVEL UP LOGIC
    useEffect(() => {
        // Calculate Level
        let newLevel = 1;
        for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
            if (xp >= LEVEL_THRESHOLDS[i]) {
                newLevel = i + 1;
            } else {
                break;
            }
        }
        setLevel(newLevel);

        // Calculate Rank (Every 5 levels or custom logic)
        const rankIndex = Math.min(Math.floor((newLevel - 1) / 3), RANKS.length - 1);
        setRank(RANKS[rankIndex]);

        // Calculate Progress to Next Level
        const currentLevelBase = LEVEL_THRESHOLDS[newLevel - 1] || 0;
        const nextLevelThreshold = LEVEL_THRESHOLDS[newLevel] || (currentLevelBase * 2);
        const xpInLevel = xp - currentLevelBase;
        const xpRequired = nextLevelThreshold - currentLevelBase;

        // Prevent Divide by Zero
        const progress = xpRequired > 0 ? (xpInLevel / xpRequired) * 100 : 100;
        setLevelProgress(Math.min(progress, 100));

    }, [xp]);

    // ACTIONS
    const addXp = (amount: number, reason?: string) => {
        setXp(prev => prev + amount);
        if (reason) {
            console.log(`[XP GAIN] +${amount} XP: ${reason}`);
            // TODO: Trigger Toast Notification
        }
    };

    const addFocusMinutes = (minutes: number) => {
        setFocusMinutes(prev => prev + minutes);
        addXp(minutes * 5, "Deep Work Session"); // 5 XP per minute of focus
    };

    return (
        <UserProgressContext.Provider value={{
            xp,
            level,
            rank,
            streak,
            focusMinutes,
            achievements,
            addXp,
            addFocusMinutes,
            levelProgress
        }}>
            {children}
        </UserProgressContext.Provider>
    );
}

export function useUserProgress() {
    const context = useContext(UserProgressContext);
    if (context === undefined) {
        throw new Error("useUserProgress must be used within a UserProgressProvider");
    }
    return context;
}
