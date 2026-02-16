"use client";

import React from "react";
import { BentoGrid, BentoItem } from "@/components/layout/BentoGrid";
import {
    AI_GreetingWidget,
    MissionControlWidget,
    MentorUplinkWidget,
    PrivacyShieldWidget,
    JobMarketRadarWidget,
    SkillHelixWidget,
    SalaryEstimatorWidget,
    ApplicationTrackerWidget,
    DailyQuestsWidget,
    StreakReactorWidget,
    SystemLogWidget,
    NewsTickerWidget
} from "@/components/dashboard/DashboardWidgets";
import { motion } from "framer-motion";

export default function AdvancedDashboard() {
    return (
        <div className="w-full relative z-10 space-y-8 pb-32">

            {/* --- ZONE A: COMMAND & CONTROL (Top Row) --- */}
            <div className="max-w-7xl mx-auto px-6">
                <BentoGrid className="grid-cols-1 md:grid-cols-4 auto-rows-[180px]">
                    {/* Greeting (Large) */}
                    <BentoItem colSpan={2} rowSpan={1} delay={0}>
                        <AI_GreetingWidget />
                    </BentoItem>

                    {/* Mission Control (Status) */}
                    <BentoItem colSpan={1} rowSpan={1} delay={1}>
                        <MissionControlWidget />
                    </BentoItem>

                    {/* Mentor Uplink (Agents) */}
                    <BentoItem colSpan={1} rowSpan={1} delay={2}>
                        <MentorUplinkWidget />
                    </BentoItem>
                </BentoGrid>
            </div>

            {/* --- ZONE B & C: INTELLIGENCE & OPS (Main Grid) --- */}
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-slate-800"></span>
                    INTELLIGENCE GRID
                    <span className="w-full h-px bg-slate-800"></span>
                </h3>

                <BentoGrid className="grid-cols-1 md:grid-cols-4 auto-rows-[240px]">

                    {/* Radar (Large) */}
                    <BentoItem colSpan={2} rowSpan={2} delay={3}>
                        <JobMarketRadarWidget />
                    </BentoItem>

                    {/* Skill Helix (Tall) */}
                    <BentoItem colSpan={1} rowSpan={2} delay={4} className="md:row-span-2">
                        <SkillHelixWidget />
                    </BentoItem>

                    {/* Salary Estimator */}
                    <BentoItem colSpan={1} rowSpan={1} delay={5}>
                        <SalaryEstimatorWidget />
                    </BentoItem>

                    {/* Privacy Shield */}
                    <BentoItem colSpan={1} rowSpan={1} delay={6}>
                        <PrivacyShieldWidget />
                    </BentoItem>

                    {/* Application Tracker (Wide) */}
                    <BentoItem colSpan={2} rowSpan={1} delay={7}>
                        <ApplicationTrackerWidget />
                    </BentoItem>

                    {/* Daily Quests */}
                    <BentoItem colSpan={1} rowSpan={1} delay={8}>
                        <DailyQuestsWidget />
                    </BentoItem>

                    {/* Streak Reactor */}
                    <BentoItem colSpan={1} rowSpan={1} delay={9}>
                        <StreakReactorWidget />
                    </BentoItem>

                </BentoGrid>
            </div>

            {/* --- ZONE D: SYSTEM (Bottom Ticker) --- */}
            <div className="max-w-7xl mx-auto px-6">
                <BentoGrid className="grid-cols-1 md:grid-cols-4 auto-rows-[100px]">
                    {/* System Log */}
                    <BentoItem colSpan={2} rowSpan={1} delay={10}>
                        <SystemLogWidget />
                    </BentoItem>

                    {/* News Ticker */}
                    <BentoItem colSpan={2} rowSpan={1} delay={11}>
                        <NewsTickerWidget />
                    </BentoItem>
                </BentoGrid>
            </div>

        </div>
    );
}
