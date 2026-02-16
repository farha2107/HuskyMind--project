"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Grid, BookOpen, Share2, Eye, Edit2, Code, Briefcase, Award } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface PortfolioHubProps {
    portfolioData: any;
    setPortfolioData: (data: any) => void;
    setActiveView: (view: string) => void;
    resumeBase64: string | null;
}

export default function PortfolioHub({ portfolioData, setPortfolioData, setActiveView, resumeBase64 }: PortfolioHubProps) {
    const [isPublished, setIsPublished] = useState(false);
    const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'preview' (mobile)
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [shareUrl, setShareUrl] = useState("");

    // Sync publish state on mount
    useEffect(() => {
        const profileId = (portfolioData.name || 'user').toLowerCase().replace(/\s+/g, '-');
        if (localStorage.getItem(`huskymind_profile_${profileId}`)) {
            setIsPublished(true);
        }
    }, [portfolioData.name]);

    const handlePublish = () => {
        const profileId = (portfolioData.name || 'user').toLowerCase().replace(/\s+/g, '-');
        try {
            localStorage.setItem(`huskymind_profile_${profileId}`, JSON.stringify({
                ...portfolioData,
                resumeBase64
            }));
            setIsPublished(true);

            // Generate and show link (Simulated Production URL)
            const PRODUCTION_DOMAIN = `https://www.${profileId}.com`;
            const url = PRODUCTION_DOMAIN;
            setShareUrl(url);
            setShowLinkModal(true);
        } catch (e) {
            alert("Storage Error: PDF too large.");
        }
    };

    return (
        <div className="h-screen w-full bg-[#030303] flex flex-col overflow-hidden animate-in fade-in relative">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
            </div>

            {/* TOP BAR */}
            <div className="h-16 border-b border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-between px-6 z-20 relative">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setActiveView('dashboard')}
                        className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 rounded-full text-[10px] font-mono transition-colors uppercase tracking-wider"
                    >
                        ← Return to Base
                    </button>
                    <div className="h-4 w-px bg-white/10" />
                    <h2 className="text-sm font-bold text-white tracking-widest flex items-center gap-2">
                        <Share2 size={16} className="text-cyan-500" />
                        <span>PORTFOLIO STUDIO</span>
                        <span className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[9px] rounded border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">PRO v2.4</span>
                    </h2>
                </div>

                <div className="flex items-center gap-4">
                    {/* View Toggle (Mobile/Tablet) */}
                    <div className="flex lg:hidden bg-white/5 rounded-full p-1 border border-white/10">
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${activeTab === 'edit' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'}`}
                        >
                            <Edit2 size={12} />
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${activeTab === 'preview' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'}`}
                        >
                            <Eye size={12} />
                        </button>
                    </div>

                    <button
                        onClick={handlePublish}
                        className="group relative px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-bold border border-green-500 rounded-full text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                        <Rocket size={14} className="text-black group-hover:rotate-45 transition-transform" />
                        {isPublished ? 'UPDATE LINK' : 'GO LIVE'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden relative z-10">

                {/* LEFT: COMMAND CONSOLE (EDITOR) */}
                <div className={`w-full lg:w-[450px] border-r border-white/10 bg-black/40 flex flex-col overflow-y-auto custom-scrollbar transition-transform absolute lg:relative inset-0 lg:translate-x-0 ${activeTab === 'edit' ? 'translate-x-0 z-20' : '-translate-x-full z-0'}`}>
                    <div className="p-6 border-b border-white/10 sticky top-0 bg-[#030303]/95 z-30 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                                <Code size={14} /> Source Code
                            </h3>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">Inject data to compile your holographic identity.</p>
                    </div>

                    <div className="p-6 space-y-8 pb-32">

                        {/* 1. IDENTITY MATRIX */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">01 // Identity Matrix</h3>
                            <div className="space-y-3">
                                <div className="group">
                                    <label className="text-[9px] text-cyan-500/70 uppercase font-mono mb-1 block">Full Name</label>
                                    <input type="text" value={portfolioData.name} onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
                                        className="w-full bg-white/5 border-b border-white/10 focus:border-cyan-500 text-white text-sm py-2 px-3 outline-none transition-colors placeholder:text-white/20 font-medium" placeholder="Ex: Alex Chen" />
                                </div>
                                <div className="group">
                                    <label className="text-[9px] text-cyan-500/70 uppercase font-mono mb-1 block">Current Role</label>
                                    <input type="text" value={portfolioData.role} onChange={(e) => setPortfolioData({ ...portfolioData, role: e.target.value })}
                                        className="w-full bg-white/5 border-b border-white/10 focus:border-cyan-500 text-white text-sm py-2 px-3 outline-none transition-colors placeholder:text-white/20" placeholder="Ex: Full Stack Architect" />
                                </div>
                                <div className="group">
                                    <label className="text-[9px] text-cyan-500/70 uppercase font-mono mb-1 block">Bio / Objective</label>
                                    <textarea value={portfolioData.bio} onChange={(e) => setPortfolioData({ ...portfolioData, bio: e.target.value })}
                                        className="w-full bg-white/5 border-b border-white/10 focus:border-cyan-500 text-slate-300 text-xs py-2 px-3 h-24 outline-none resize-none placeholder:text-white/20 leading-relaxed" placeholder="Brief professional summary..." />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" value={portfolioData.github} onChange={(e) => setPortfolioData({ ...portfolioData, github: e.target.value })}
                                        className="bg-white/5 border-b border-white/10 focus:border-cyan-500 text-slate-300 text-xs py-2 px-3 outline-none" placeholder="github.com/..." />
                                    <input type="text" value={portfolioData.linkedin} onChange={(e) => setPortfolioData({ ...portfolioData, linkedin: e.target.value })}
                                        className="bg-white/5 border-b border-white/10 focus:border-cyan-500 text-slate-300 text-xs py-2 px-3 outline-none" placeholder="linkedin.com/in/..." />
                                </div>
                            </div>
                        </div>

                        {/* 2. SKILL INJECTOR */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">02 // Skill Injector</h3>
                            <textarea
                                value={portfolioData.skills.join(", ")}
                                onChange={(e) => setPortfolioData({ ...portfolioData, skills: e.target.value.split(", ") })}
                                placeholder="React, Node.js, AWS (Comma separated)"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-cyan-300 font-mono text-xs h-20 focus:border-cyan-500 outline-none resize-none focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-white/20"
                            />
                        </div>

                        {/* 3. PROJECT MANAGER */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">03 // Mission Files</h3>
                                <button
                                    onClick={() => setPortfolioData({
                                        ...portfolioData,
                                        projects: [...portfolioData.projects, { title: "New Project", desc: "Description...", tech: "Tech Stack" }]
                                    })}
                                    className="text-[9px] bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-2 py-1 rounded border border-purple-500/30 transition-colors uppercase tracking-wider"
                                >
                                    + Add Unit
                                </button>
                            </div>
                            {portfolioData.projects.map((project: any, i: number) => (
                                <GlassCard key={i} className="p-4 flex flex-col gap-3 group relative">
                                    <button
                                        onClick={() => {
                                            const newProjects = portfolioData.projects.filter((_: any, idx: number) => idx !== i);
                                            setPortfolioData({ ...portfolioData, projects: newProjects });
                                        }}
                                        className="absolute top-2 right-2 text-white/20 hover:text-red-400 transition-colors text-xs"
                                    >
                                        ✕
                                    </button>
                                    <input value={project.title} onChange={(e) => {
                                        const newProjects = [...portfolioData.projects];
                                        newProjects[i].title = e.target.value;
                                        setPortfolioData({ ...portfolioData, projects: newProjects });
                                    }} className="bg-transparent border-b border-white/10 focus:border-purple-500 text-white font-bold text-sm outline-none pb-1 w-full" placeholder="Project Name" />

                                    <input value={project.tech} onChange={(e) => {
                                        const newProjects = [...portfolioData.projects];
                                        newProjects[i].tech = e.target.value;
                                        setPortfolioData({ ...portfolioData, projects: newProjects });
                                    }} className="bg-transparent text-purple-400 font-mono text-[10px] outline-none w-full uppercase tracking-wider" placeholder="TECH STACK" />

                                    <textarea value={project.desc} onChange={(e) => {
                                        const newProjects = [...portfolioData.projects];
                                        newProjects[i].desc = e.target.value;
                                        setPortfolioData({ ...portfolioData, projects: newProjects });
                                    }} className="bg-transparent text-slate-400 text-xs outline-none resize-none h-16 w-full placeholder:text-white/20" placeholder="Project Description..." />

                                    <input value={project.problem || ""} onChange={(e) => {
                                        const newProjects = [...portfolioData.projects];
                                        newProjects[i].problem = e.target.value;
                                        setPortfolioData({ ...portfolioData, projects: newProjects });
                                    }} className="bg-transparent border-b border-white/5 focus:border-red-500/50 text-red-300 text-[10px] outline-none pb-1 w-full italic" placeholder="The Challenge..." />

                                    <textarea value={project.impact ? project.impact.join("\n") : ""} onChange={(e) => {
                                        const newProjects = [...portfolioData.projects];
                                        newProjects[i].impact = e.target.value.split("\n");
                                        setPortfolioData({ ...portfolioData, projects: newProjects });
                                    }} className="bg-green-500/5 border border-green-500/10 rounded p-2 text-green-400 text-[10px] font-mono outline-none resize-none h-16 w-full placeholder:text-green-500/30" placeholder="Impact Metrics (One per line)" />
                                </GlassCard>
                            ))}
                        </div>

                        {/* 4. EXPERIENCE LOGS */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">04 // Experience Logs</h3>
                                <button
                                    onClick={() => setPortfolioData({
                                        ...portfolioData,
                                        experience: [...portfolioData.experience, { role: "Role", company: "Company", year: "202X", desc: "Achievements..." }]
                                    })}
                                    className="text-[9px] bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30 transition-colors uppercase tracking-wider"
                                >
                                    + Add Log
                                </button>
                            </div>
                            {portfolioData.experience.map((exp: any, i: number) => (
                                <GlassCard key={i} className="p-4 flex flex-col gap-2 relative">
                                    <button
                                        onClick={() => {
                                            const newExp = portfolioData.experience.filter((_: any, idx: number) => idx !== i);
                                            setPortfolioData({ ...portfolioData, experience: newExp });
                                        }}
                                        className="absolute top-2 right-2 text-white/20 hover:text-red-400 transition-colors text-xs"
                                    >
                                        ✕
                                    </button>
                                    <div className="flex justify-between gap-4">
                                        <input value={exp.role} onChange={(e) => {
                                            const newExp = [...portfolioData.experience];
                                            newExp[i].role = e.target.value;
                                            setPortfolioData({ ...portfolioData, experience: newExp });
                                        }} className="bg-transparent border-b border-white/10 text-white font-bold text-sm outline-none w-full" placeholder="Role" />
                                        <input value={exp.year} onChange={(e) => {
                                            const newExp = [...portfolioData.experience];
                                            newExp[i].year = e.target.value;
                                            setPortfolioData({ ...portfolioData, experience: newExp });
                                        }} className="bg-transparent border-b border-white/10 text-slate-400 text-xs text-right outline-none w-20" placeholder="Year" />
                                    </div>
                                    <input value={exp.company} onChange={(e) => {
                                        const newExp = [...portfolioData.experience];
                                        newExp[i].company = e.target.value;
                                        setPortfolioData({ ...portfolioData, experience: newExp });
                                    }} className="bg-transparent text-cyan-500 text-xs font-mono outline-none uppercase tracking-wide" placeholder="COMPANY" />
                                    <textarea value={exp.desc} onChange={(e) => {
                                        const newExp = [...portfolioData.experience];
                                        newExp[i].desc = e.target.value;
                                        setPortfolioData({ ...portfolioData, experience: newExp });
                                    }} className="bg-transparent text-slate-400 text-[11px] outline-none resize-none h-16 leading-relaxed" placeholder="Achievements..." />
                                </GlassCard>
                            ))}
                        </div>

                        {/* 5. EDUCATION */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">05 // Academic Clearance</h3>
                                <button
                                    onClick={() => setPortfolioData({
                                        ...portfolioData,
                                        education: [...(portfolioData.education || []), { degree: "Degree", school: "University", year: "202X", honors: "Honors" }]
                                    })}
                                    className="text-[9px] bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-2 py-1 rounded border border-yellow-500/30 transition-colors uppercase tracking-wider"
                                >
                                    + Add Degree
                                </button>
                            </div>
                            {(portfolioData.education || []).map((edu: any, i: number) => (
                                <GlassCard key={i} className="p-3 flex flex-col gap-2 relative">
                                    <button
                                        onClick={() => {
                                            const newEdu = portfolioData.education.filter((_: any, idx: number) => idx !== i);
                                            setPortfolioData({ ...portfolioData, education: newEdu });
                                        }}
                                        className="absolute top-2 right-2 text-white/20 hover:text-red-400 transition-colors text-xs"
                                    >
                                        ✕
                                    </button>
                                    <input value={edu.school} onChange={(e) => {
                                        const newEdu = [...portfolioData.education];
                                        newEdu[i].school = e.target.value;
                                        setPortfolioData({ ...portfolioData, education: newEdu });
                                    }} className="bg-transparent border-b border-white/10 text-white font-bold text-sm outline-none" placeholder="University" />
                                    <div className="flex justify-between gap-2">
                                        <input value={edu.degree} onChange={(e) => {
                                            const newEdu = [...portfolioData.education];
                                            newEdu[i].degree = e.target.value;
                                            setPortfolioData({ ...portfolioData, education: newEdu });
                                        }} className="bg-transparent text-yellow-500 text-xs outline-none w-full" placeholder="Degree" />
                                        <input value={edu.year} onChange={(e) => {
                                            const newEdu = [...portfolioData.education];
                                            newEdu[i].year = e.target.value;
                                            setPortfolioData({ ...portfolioData, education: newEdu });
                                        }} className="bg-transparent text-slate-500 text-xs text-right outline-none w-16" placeholder="Year" />
                                    </div>
                                    <input value={edu.honors} onChange={(e) => {
                                        const newEdu = [...portfolioData.education];
                                        newEdu[i].honors = e.target.value;
                                        setPortfolioData({ ...portfolioData, education: newEdu });
                                    }} className="bg-transparent text-slate-600 text-[10px] outline-none italic" placeholder="Honors / GPA" />
                                </GlassCard>
                            ))}
                        </div>

                        {/* 6. CERTIFICATIONS */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">06 // Certifications</h3>
                                <button
                                    onClick={() => setPortfolioData({
                                        ...portfolioData,
                                        certs: [...(portfolioData.certs || []), { name: "New Certification", issuer: "Issuer", year: "202X" }]
                                    })}
                                    className="text-[9px] bg-red-500/20 hover:bg-red-500/30 text-red-300 px-2 py-1 rounded border border-red-500/30 transition-colors uppercase tracking-wider"
                                >
                                    + Add Cert
                                </button>
                            </div>
                            {(portfolioData.certs || []).map((cert: any, i: number) => (
                                <GlassCard key={i} className="p-3 flex flex-col gap-2 relative">
                                    <button
                                        onClick={() => {
                                            const newCerts = portfolioData.certs.filter((_: any, idx: number) => idx !== i);
                                            setPortfolioData({ ...portfolioData, certs: newCerts });
                                        }}
                                        className="absolute top-2 right-2 text-white/20 hover:text-red-400 transition-colors text-xs"
                                    >
                                        ✕
                                    </button>
                                    <input value={cert.name} onChange={(e) => {
                                        const newCerts = [...portfolioData.certs];
                                        newCerts[i].name = e.target.value;
                                        setPortfolioData({ ...portfolioData, certs: newCerts });
                                    }} className="bg-transparent border-b border-white/10 text-white font-bold text-sm outline-none w-full" placeholder="Certification Name" />
                                    <div className="flex justify-between gap-2">
                                        <input value={cert.issuer} onChange={(e) => {
                                            const newCerts = [...portfolioData.certs];
                                            newCerts[i].issuer = e.target.value;
                                            setPortfolioData({ ...portfolioData, certs: newCerts });
                                        }} className="bg-transparent text-slate-400 text-xs outline-none w-full" placeholder="Issuer" />
                                        <input value={cert.year} onChange={(e) => {
                                            const newCerts = [...portfolioData.certs];
                                            newCerts[i].year = e.target.value;
                                            setPortfolioData({ ...portfolioData, certs: newCerts });
                                        }} className="bg-transparent text-slate-500 text-xs text-right outline-none w-16" placeholder="Year" />
                                    </div>
                                </GlassCard>
                            ))}
                        </div>

                        {/* 7. CUSTOM MODULES */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">07 // Custom Modules</h3>
                                <button
                                    onClick={() => setPortfolioData({
                                        ...portfolioData,
                                        customSections: [...(portfolioData.customSections || []), { title: "New Section", content: "Details..." }]
                                    })}
                                    className="text-[9px] bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-2 py-1 rounded border border-purple-500/30 transition-colors uppercase tracking-wider"
                                >
                                    + Add Section
                                </button>
                            </div>
                            {(portfolioData.customSections || []).map((section: any, i: number) => (
                                <GlassCard key={i} className="p-4 flex flex-col gap-2 relative">
                                    <button
                                        onClick={() => {
                                            const newSections = portfolioData.customSections.filter((_: any, idx: number) => idx !== i);
                                            setPortfolioData({ ...portfolioData, customSections: newSections });
                                        }}
                                        className="absolute top-2 right-2 text-white/20 hover:text-red-400 transition-colors text-xs"
                                    >
                                        ✕
                                    </button>
                                    <input value={section.title} onChange={(e) => {
                                        const newSections = [...portfolioData.customSections];
                                        newSections[i].title = e.target.value;
                                        setPortfolioData({ ...portfolioData, customSections: newSections });
                                    }} className="bg-transparent border-b border-white/10 text-purple-400 font-bold text-xs uppercase tracking-wider outline-none w-full mb-1" placeholder="SECTION TITLE" />

                                    <textarea value={section.content} onChange={(e) => {
                                        const newSections = [...portfolioData.customSections];
                                        newSections[i].content = e.target.value;
                                        setPortfolioData({ ...portfolioData, customSections: newSections });
                                    }} className="bg-transparent text-slate-400 text-xs outline-none resize-none h-20 leading-relaxed" placeholder="Section content..." />
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: LIVE PREVIEW (DEVICE FRAME) */}
                <div className={`flex-1 bg-[#0a0a0a] relative overflow-hidden flex flex-col transition-transform absolute lg:relative inset-0 ${activeTab === 'preview' ? 'translate-x-0 z-20' : 'translate-x-full lg:translate-x-0 z-0'}`}>

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black pointer-events-none" />

                    <div className="absolute top-6 right-6 z-10 px-3 py-1 bg-green-500/10 text-green-400 text-[9px] font-bold rounded-full border border-green-500/20 animate-pulse flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        LIVE PREVIEW
                    </div>

                    {/* The Website Preview Canvas */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-0 lg:p-12 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-4xl bg-[#050505] lg:border border-white/10 lg:rounded-2xl shadow-2xl relative overflow-hidden flex flex-col min-h-min pb-24"
                        >
                            {/* Fake Browser Bar */}
                            <div className="hidden lg:flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 sticky top-0 z-50 backdrop-blur-md">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                </div>
                                <div className="ml-4 flex-1 h-6 bg-black/40 rounded flex items-center px-3 text-[10px] text-slate-600 font-mono">
                                    huskymind.ai/share/{portfolioData.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-8 lg:p-16">
                                {/* HEADER PREVIEW */}
                                <div className="mb-20 border-b border-white/10 pb-12">
                                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 mb-4 tracking-tight">
                                        {portfolioData.name || "YOUR NAME"}
                                    </h1>
                                    <p className="text-lg md:text-xl text-slate-400 tracking-[0.2em] uppercase font-light">
                                        {portfolioData.role || "YOUR ROLE"}
                                    </p>
                                    <div className="flex flex-wrap gap-6 mt-8 text-xs font-mono text-cyan-500">
                                        {portfolioData.github && <span className="px-3 py-1 bg-cyan-900/10 border border-cyan-500/20 rounded">GH: {portfolioData.github}</span>}
                                        {portfolioData.linkedin && <span className="px-3 py-1 bg-cyan-900/10 border border-cyan-500/20 rounded">LI: {portfolioData.linkedin}</span>}
                                    </div>
                                    <p className="mt-10 text-slate-300 leading-relaxed max-w-2xl text-sm md:text-base font-light">
                                        {portfolioData.bio || "Crafting digital experiences..."}
                                    </p>

                                    {isPublished && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-8 flex items-center gap-4"
                                        >
                                            <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                                <span className="text-xs font-mono text-green-400 tracking-wider">
                                                    PUBLISHED: AVAILABLE WORLDWIDE
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* SKILLS PREVIEW (HOLOGRAPHIC BADGES) */}
                                <div className="mb-20">
                                    <h3 className="text-cyan-500 font-bold mb-8 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Grid size={14} /> TECHNICAL ARSENAL
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {portfolioData.skills.map((skill: string, i: number) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                                className={`px-4 py-2 rounded-lg text-[10px] md:text-xs font-bold border flex items-center gap-2 uppercase tracking-wide backdrop-blur-sm ${i % 2 === 0
                                                    ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10'
                                                    : 'bg-purple-500/5 border-purple-500/20 text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10'
                                                    } transition-colors cursor-default`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'} shadow-[0_0_8px_currentColor]`} />
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>



                                {/* PROJECTS PREVIEW (MISSION FILES) */}
                                <div className="mb-20">
                                    <h3 className="text-purple-500 font-bold mb-8 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Rocket size={14} /> DEPLOYED OPERATIONS
                                    </h3>
                                    <div className="grid grid-cols-1 gap-8">
                                        {portfolioData.projects.map((project: any, i: number) => (
                                            <div key={i} className="group relative p-8 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all hover:bg-white/[0.02]">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-purple-500/20 transition-all duration-700" />

                                                <div className="relative z-10">
                                                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <h4 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{project.title}</h4>
                                                                <div className="h-px w-8 bg-purple-500/30" />
                                                            </div>
                                                            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] rounded-full uppercase tracking-wider font-bold">
                                                                {project.tech}
                                                            </span>
                                                        </div>
                                                        <span className="text-5xl text-white/5 group-hover:text-purple-500/10 font-black transition-colors font-mono">0{i + 1}</span>
                                                    </div>

                                                    {project.problem && (
                                                        <div className="mb-6 p-4 bg-black/40 rounded-lg border-l-2 border-red-500/30">
                                                            <p className="text-[9px] text-red-400 font-bold uppercase mb-1 tracking-wider">THE CHALLENGE</p>
                                                            <p className="text-sm text-slate-400 italic font-light">"{project.problem}"</p>
                                                        </div>
                                                    )}

                                                    <p className="text-sm text-slate-300 mb-8 leading-relaxed font-light">{project.desc}</p>

                                                    {project.impact && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {project.impact.map((metric: string, m: number) => (
                                                                <div key={m} className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg group-hover:border-green-500/20 transition-colors">
                                                                    <p className="text-[9px] text-green-500 font-bold uppercase mb-1 tracking-wider flex items-center gap-2">
                                                                        <span className="w-1 h-1 bg-green-500 rounded-full" /> IMPACT METRIC
                                                                    </p>
                                                                    <p className="text-green-300 text-xs font-mono font-bold">
                                                                        {metric}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* EXPERIENCE PREVIEW */}
                                <div className="mb-20">
                                    <h3 className="text-slate-500 font-bold mb-8 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Briefcase size={14} /> MISSION LOGS
                                    </h3>
                                    <div className="space-y-8 border-l border-white/10 pl-8 ml-2">
                                        {portfolioData.experience.map((exp: any, i: number) => (
                                            <div key={i} className="relative">
                                                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-slate-700 z-10" />
                                                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-cyan-500/20 animate-ping opacity-0 group-hover:opacity-100" />

                                                <h4 className="text-xl font-bold text-white mb-1">{exp.role}</h4>
                                                <p className="text-xs text-cyan-500 mb-3 font-mono">{exp.company} <span className="text-slate-600">|</span> {exp.year}</p>
                                                <p className="text-sm text-slate-400 font-light leading-relaxed max-w-2xl">{exp.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* EDUCATION PREVIEW */}
                                <div className="mb-20">
                                    <h3 className="text-yellow-500 font-bold mb-8 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                        <BookOpen size={14} /> ACADEMIC CLEARANCE
                                    </h3>
                                    <div className="space-y-4">
                                        {(portfolioData.education || []).map((edu: any, i: number) => (
                                            <div key={i} className="flex items-start gap-6 p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl border border-white/5 group-hover:scale-110 transition-transform">
                                                    🎓
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white">{edu.school}</h4>
                                                    <p className="text-yellow-500 font-mono text-xs mt-1">{edu.degree}</p>
                                                    <p className="text-slate-500 text-xs mt-1">{edu.year}</p>
                                                    {edu.honors && (
                                                        <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-2 bg-yellow-500/5 px-2 py-1 rounded w-fit border border-yellow-500/10">
                                                            <Award size={10} className="text-yellow-500" /> {edu.honors}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CERTIFICATIONS PREVIEW */}
                                {(portfolioData.certs && portfolioData.certs.length > 0) && (
                                    <div className="mb-20">
                                        <h3 className="text-red-400 font-bold mb-8 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Award size={14} /> CERTIFIED CLEARANCES
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {portfolioData.certs.map((cert: any, i: number) => (
                                                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between group">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                                                        <p className="text-xs text-slate-500 mt-1">{cert.issuer}</p>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">{cert.year}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CUSTOM SECTIONS PREVIEW */}
                                {(portfolioData.customSections || []).map((section: any, i: number) => (
                                    <div key={i} className="mb-20">
                                        <h3 className="text-purple-400 font-bold mb-8 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Code size={14} /> {section.title}
                                        </h3>
                                        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl whitespace-pre-wrap text-slate-400 text-sm leading-relaxed font-light">
                                            {section.content}
                                        </div>
                                    </div>
                                ))}

                                {/* FOOTER SIGNATURE */}
                                <div className="mt-32 pt-12 border-t border-white/5 text-center">
                                    <div className="inline-block px-4 py-2 border border-white/10 rounded-full">
                                        <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                                            GENERATED BY HUSKYMIND OS // {new Date().getFullYear()}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
            {/* SUCCESS MODAL */}
            <AnimatePresence>
                {showLinkModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <GlassCard className="p-8 max-w-md w-full border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                        <Rocket size={32} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-widest mb-1">NEURAL LINK ESTABLISHED</h3>
                                    <p className="text-xs text-slate-400 font-mono">Your Quantum Profile is live across the network.</p>
                                </div>

                                <div className="p-4 bg-black/40 rounded-xl border border-white/10 mb-6">
                                    <label className="text-[10px] text-green-500 font-bold uppercase tracking-wider mb-2 block">Secure Uplink URL</label>
                                    <div className="flex items-center gap-2">
                                        <code className="text-sm text-slate-300 font-mono break-all line-clamp-1">{shareUrl}</code>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowLinkModal(false)}
                                        className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-bold rounded-xl border border-white/10 transition-all uppercase tracking-wider"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(shareUrl);
                                            alert("Link Copied!");
                                        }}
                                        className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 text-black text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                                    >
                                        <Share2 size={14} /> Copy Link
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
