"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Layout, ChevronRight, Check, Zap, Sparkles, Download, Printer, Eye, Edit3, Grid, Layers, Cpu, Code, Briefcase, User, GraduationCap, Award, Target, Plus, Trash2, ChevronDown, ChevronUp, AlertCircle, TrendingUp } from 'lucide-react';
import BlueprintBackground from './BlueprintBackground';
import TemplateRenderer, { ResumeData } from './TemplateRenderer';
import ResumeLanding from './ResumeLanding';

// --- TEMPLATES (15 VARIANTS) ---
const TEMPLATES = [
    { id: 'quantum', name: 'The Quantum', desc: 'Tech-forward, dark mode optimized.', tags: ['Tech', 'Modern'], color: 'from-cyan-900 to-slate-900' },
    { id: 'executive', name: 'The Executive', desc: 'Clean serif for leadership roles.', tags: ['Leadership', 'Classic'], color: 'from-slate-100 to-white' },
    { id: 'disruptor', name: 'The Disruptor', desc: 'Bold typography for startups.', tags: ['Creative', 'Startup'], color: 'from-yellow-400 to-orange-500' },
    { id: 'ivy', name: 'The Ivy', desc: 'Dense, academic layout.', tags: ['Academic', 'Research'], color: 'from-emerald-900 to-slate-900' },
    { id: 'minimalist', name: 'The Minimalist', desc: 'Whitespace heavy, sleek.', tags: ['Design', 'Clean'], color: 'from-gray-100 to-gray-200' },
    { id: 'titan', name: 'The Titan', desc: 'Project-heavy grid layout.', tags: ['Engineering', 'Projects'], color: 'from-blue-900 to-slate-900' },
    { id: 'diplomat', name: 'The Diplomat', desc: 'Formal, traditional structure.', tags: ['Gov', 'NGO'], color: 'from-slate-200 to-slate-300' },
    { id: 'founder', name: 'The Founder', desc: 'Impact-focused, metrics heavy.', tags: ['Business', 'VC'], color: 'from-indigo-900 to-purple-900' },
    { id: 'engineer', name: 'The Engineer', desc: 'Technical skills sidebar.', tags: ['Dev', 'Systems'], color: 'from-slate-800 to-black' },
    { id: 'artist', name: 'The Artist', desc: 'Creative, colorful accents.', tags: ['Art', 'UX'], color: 'from-pink-500 to-rose-500' },
    { id: 'analyst', name: 'The Analyst', desc: 'Data-visualization elements.', tags: ['Data', 'Finance'], color: 'from-blue-800 to-cyan-900' },
    { id: 'strategist', name: 'The Strategist', desc: 'Consulting style bullet points.', tags: ['Consulting', 'Strategy'], color: 'from-slate-700 to-slate-600' },
    { id: 'global', name: 'The Global', desc: 'International CV format.', tags: ['EU', 'Asia'], color: 'from-teal-900 to-emerald-900' },
    { id: 'scholar', name: 'The Scholar', desc: 'CV style for publications.', tags: ['PhD', 'Academic'], color: 'from-amber-50 to-orange-50' },
    { id: 'futurist', name: 'The Futurist', desc: 'Experimental, web3 aesthetic.', tags: ['Web3', 'Blockchain'], color: 'from-violet-900 to-fuchsia-900' }
];

// --- MOCK DATA & TYPES ---
type ResumeSection = {
    id: string;
    type: 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'custom';
    title: string;
    isOpen: boolean;
    data: any;
};

const INITIAL_SECTIONS: ResumeSection[] = [
    {
        id: 'summary', type: 'summary', title: 'Professional Summary', isOpen: true,
        data: "Visionary Architect with 10+ years of experience in designing sustainable urban ecosystems. Proven track record of leading cross-functional teams and delivering multi-million dollar projects on time and under budget."
    },
    {
        id: 'exp1', type: 'experience', title: 'Work Experience', isOpen: false,
        data: [
            { role: "Senior Lead Engineer", company: "Tekton Global", date: "2018 - Present", points: ["Led a team of 15 engineers to develop core infrastructure.", "Reduced system latency by 40%."] },
            { role: "Software Architect", company: "CyberSystems", date: "2015 - 2018", points: ["Designed microservices architecture.", "Implemented CI/CD pipelines."] }
        ]
    },
    {
        id: 'edu1', type: 'education', title: 'Education', isOpen: false,
        data: [{ degree: "M.S. Computer Science", school: "Tech University", year: "2015" }]
    },
    {
        id: 'skills1', type: 'skills', title: 'Technical Skills', isOpen: false,
        data: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "GraphQL"]
    },
    {
        id: 'proj1', type: 'projects', title: 'Projects', isOpen: false,
        data: [
            { name: "Smart City Grid", desc: "Designed the initial blueprint for a self-sustaining energy grid." },
            { name: "AI Traffic Control", desc: "Developed a prototype for real-time traffic flow optimization." }
        ]
    }
];

export default function ResumeStudio() {
    const [view, setView] = useState<'landing' | 'gallery' | 'editor'>('landing');
    const [selectedTemplate, setSelectedTemplate] = useState('quantum');
    const [sections, setSections] = useState<ResumeSection[]>(INITIAL_SECTIONS);
    const [personalInfo, setPersonalInfo] = useState({
        name: "GUEST USER",
        role: "ARCHITECT • ENGINEER • DESIGNER",
        email: "guest@huskymind.os",
        phone: "+1 (555) 012-3456",
        location: "San Francisco, CA"
    });
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredTemplates = activeFilter === 'All'
        ? TEMPLATES
        : TEMPLATES.filter(t => t.tags.includes(activeFilter));


    const toggleSection = (id: string) => {
        setSections(sections.map(s => s.id === id ? { ...s, isOpen: !s.isOpen } : s));
    };

    const addSection = (type: ResumeSection['type']) => {
        const newSection: ResumeSection = {
            id: `sec-${Date.now()}`,
            type,
            title: type.charAt(0).toUpperCase() + type.slice(1),
            isOpen: true,
            data: type === 'experience' ? [] : type === 'skills' ? [] : ""
        };
        setSections([...sections, newSection]);
    };

    // 🖨️ WYSIWYG PDF GENERATOR (DOM Clone Strategy)
    const handleDownloadPDF = () => {
        const input = document.getElementById('resume-preview-frame');
        if (!input) {
            alert("Preview not found. Please switch to Editor view.");
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Please allow popups to download the resume.");
            return;
        }

        // 1. Get all styles from the main document (Tailwind + Animations)
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
            .map(style => style.outerHTML)
            .join('');

        // 2. Clone the node to avoid modifying the live app
        const clone = input.cloneNode(true) as HTMLElement;

        // 3. Force exact dimensions for A4 print
        clone.style.transform = 'none';
        clone.style.margin = '0';
        clone.style.boxShadow = 'none';
        clone.style.width = '210mm';
        clone.style.minHeight = '297mm';

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${personalInfo.name} - Resume</title>
                <meta charset="utf-8" />
                ${styles}
                <style>
                    @media print {
                        @page { margin: 0; size: A4; }
                        body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        #resume-preview-frame { width: 100% !important; min-height: 100vh !important; }
                    }
                    body { display: flex; justify-content: center; background: #525659; padding: 20px; }
                    #wrapper { background: white; width: 210mm; min-height: 297mm; overflow: hidden; }
                </style>
            </head>
            <body>
                <div id="wrapper">
                    ${clone.outerHTML}
                </div>
                <script>
                    window.onload = function() { 
                        // Delay slightly to ensure styles are applied
                        setTimeout(() => {
                            window.print(); 
                            window.close();
                        }, 500);
                    }
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };

    return (
        <div className="h-screen w-full overflow-hidden relative flex flex-col bg-[#050505]">
            <BlueprintBackground />

            {/* HEADER */}
            <div className="h-16 border-b border-white/10 flex justify-between items-center px-8 relative z-20 backdrop-blur-md bg-[#0a192f]/80">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('landing')}>
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <FileText size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-wide">RESUME STUDIO</h1>
                        <p className="text-[10px] text-emerald-500/50 font-mono tracking-widest">ARCHITECT_FORGE_V2</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {view === 'editor' && (
                        <>
                            <button
                                onClick={() => setView('gallery')}
                                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Layout size={14} /> TEMPLATES
                            </button>
                            <div className="h-4 w-px bg-white/10" />
                            <button
                                onClick={handleDownloadPDF}
                                className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded hover:bg-emerald-500/20 flex items-center gap-2 transition-all"
                            >
                                <Download size={14} /> EXPORT PDF
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-bold rounded hover:bg-white/10 flex items-center gap-2 transition-all"
                            >
                                <Printer size={14} /> PRINT
                            </button>
                        </>
                    )}
                </div>
            </div>


            {/* MAIN CONTENT */}
            <div className="flex-1 relative z-10 overflow-hidden">
                <AnimatePresence mode="wait">
                    {view === 'landing' ? (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="h-full"
                        >
                            <ResumeLanding onStart={() => setView('gallery')} />
                        </motion.div>
                    ) : view === 'gallery' ? (
                        /* --- TEMPLATE GALLERY (GRID VIEW) --- */
                        <motion.div
                            key="gallery"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="h-full overflow-y-auto p-12 custom-scrollbar"
                        >
                            <div className="max-w-7xl mx-auto">
                                <div className="flex items-center justify-between mb-8 z-20 relative">
                                    <button
                                        onClick={() => setView('landing')}
                                        className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors group"
                                    >
                                        <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
                                        BACK TO HOME
                                    </button>
                                    <div className="flex gap-2">
                                        {['All', 'Tech', 'Leadership', 'Creative', 'Academic', 'Business'].map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => setActiveFilter(filter)}
                                                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${activeFilter === filter
                                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                                    : 'border-white/10 text-slate-300 hover:bg-white/5 hover:border-white/30'
                                                    }`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-white mb-4">Select Operations Blueprint</h2>
                                    <p className="text-slate-400 max-w-2xl mx-auto">
                                        Choose from 15+ tactical layouts designed for high-impact professional deployment.
                                        Optimized for ATS parsing and human readability.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
                                    {filteredTemplates.map((template, i) => (
                                        <motion.div
                                            key={template.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => { setSelectedTemplate(template.id); setView('editor'); }}
                                            className="group relative aspect-[3/4] cursor-pointer perspective-1000"
                                        >
                                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${template.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                                            <div className="absolute inset-0 rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                                {/* Mockup Preview */}
                                                <div className="p-6 h-full flex flex-col pointer-events-none">
                                                    <div className="w-1/2 h-4 bg-white/20 rounded mb-4" />
                                                    <div className="w-full h-px bg-white/10 mb-4" />
                                                    <div className="space-y-2 flex-1">
                                                        {[...Array(6)].map((_, j) => (
                                                            <div key={j} className="h-2 bg-white/10 rounded w-full" style={{ width: `${Math.random() * 40 + 60}%` }} />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-6 text-center">
                                                    <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
                                                    <p className="text-xs text-slate-400 mb-4">{template.desc}</p>
                                                    <div className="flex flex-wrap gap-2 justify-center">
                                                        {template.tags.map(tag => (
                                                            <span key={tag} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold border border-emerald-500/30">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <button className="mt-6 px-6 py-2 bg-emerald-500 text-black font-bold text-xs rounded hover:bg-emerald-400 transition-colors">
                                                        DEPLOY BLUEPRINT
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* --- RESUME EDITOR (SPLIT VIEW) --- */
                        <motion.div
                            key="editor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex"
                        >
                            {/* --- LEFT: CONTROL PANEL (EDUK8U STYLE) --- */}
                            <div className="w-[500px] border-r border-white/10 bg-[#050505] flex flex-col relative z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                                    {/* AI INSIGHT BANNER */}
                                    <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-xl p-5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Sparkles size={16} className="text-emerald-400 animate-pulse" />
                                        </div>
                                        <h3 className="text-emerald-400 font-bold text-sm mb-1 flex items-center gap-2">
                                            <Zap size={14} className="fill-emerald-400" />
                                            AI Insight: Boost Your IPO Score
                                        </h3>
                                        <p className="text-emerald-100/70 text-xs leading-relaxed mb-3">
                                            Great start! Specialized sections like <span className="text-white font-bold">Volunteering</span> or <span className="text-white font-bold">Awards</span> can add the final +$50k to your valuation.
                                        </p>
                                        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded transition-colors shadow-lg shadow-emerald-900/20">
                                            + Add Section Now
                                        </button>
                                    </div>

                                    {/* PERSONAL INFO CARD */}
                                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 space-y-4">
                                        <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                                            <span>Identity Core</span>
                                            <div className="flex items-center gap-1 text-emerald-500">
                                                <Target size={12} />
                                                <span>IPO: 98.2</span>
                                            </div>
                                        </div>
                                        <input
                                            value={personalInfo.name}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold text-lg focus:border-emerald-500 outline-none placeholder-white/20"
                                            placeholder="FULL NAME"
                                        />
                                        <input
                                            value={personalInfo.role}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, role: e.target.value })}
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-emerald-400 text-sm focus:border-emerald-500 outline-none placeholder-emerald-500/30"
                                            placeholder="CURRENT ROLE / TITLE"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                value={personalInfo.email}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                                className="bg-transparent border-b border-white/10 py-2 text-slate-300 text-xs focus:border-emerald-500 outline-none"
                                                placeholder="Email"
                                            />
                                            <input
                                                value={personalInfo.phone}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                                className="bg-transparent border-b border-white/10 py-2 text-slate-300 text-xs focus:border-emerald-500 outline-none"
                                                placeholder="Phone"
                                            />
                                        </div>
                                    </div>

                                    {/* DYNAMIC SECTIONS */}
                                    <div className="space-y-4">
                                        {sections.map((section, idx) => (
                                            <div key={section.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden transition-all hover:border-white/20">
                                                {/* SECTION HEADER */}
                                                <div
                                                    className="p-4 flex items-center justify-between cursor-pointer bg-white/5 hover:bg-white/10 transition-colors"
                                                    onClick={() => toggleSection(section.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Grid size={16} className="text-slate-500" />
                                                        <span className="text-sm font-bold text-white">{section.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20 flex items-center gap-1">
                                                            <TrendingUp size={10} /> IPO: +5
                                                        </span>
                                                        {section.isOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                                                    </div>
                                                </div>

                                                {/* SECTION CONTENT */}
                                                <AnimatePresence>
                                                    {section.isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="border-t border-white/10 bg-black/40"
                                                        >
                                                            <div className="p-4 space-y-4">
                                                                {section.type === 'summary' && (
                                                                    <textarea
                                                                        value={section.data}
                                                                        onChange={(e) => {
                                                                            const newSecs = [...sections];
                                                                            newSecs[idx].data = e.target.value;
                                                                            setSections(newSecs);
                                                                        }}
                                                                        className="w-full h-32 bg-transparent text-slate-300 text-xs leading-relaxed resize-none outline-none font-mono"
                                                                        placeholder="Write a compelling summary..."
                                                                    />
                                                                )}

                                                                {section.type === 'experience' && (
                                                                    <div className="space-y-4">
                                                                        {section.data.map((exp: any, i: number) => (
                                                                            <div key={i} className="p-3 border border-white/10 rounded-lg bg-white/5 space-y-2">
                                                                                <div className="flex justify-between">
                                                                                    <input value={exp.role} className="bg-transparent font-bold text-white text-xs outline-none w-full" />
                                                                                    <input value={exp.date} className="bg-transparent text-slate-500 text-[10px] text-right outline-none w-24" />
                                                                                </div>
                                                                                <input value={exp.company} className="bg-transparent text-emerald-400 text-xs outline-none w-full" />
                                                                            </div>
                                                                        ))}
                                                                        <button className="w-full py-2 border border-dashed border-white/20 rounded text-xs text-slate-500 hover:text-white hover:border-white/40 transition-all">
                                                                            + Add Role
                                                                        </button>
                                                                    </div>
                                                                )}

                                                                {(section.type === 'skills' || section.type === 'projects' || section.type === 'education') && (
                                                                    <div className="p-8 text-center border-2 border-dashed border-white/10 rounded-lg">
                                                                        <p className="text-xs text-slate-500">Drag & Drop or Manual Entry Enabled</p>
                                                                    </div>
                                                                )}

                                                                <div className="flex justify-end pt-2">
                                                                    <button
                                                                        onClick={() => {
                                                                            const newSecs = sections.filter(s => s.id !== section.id);
                                                                            setSections(newSecs);
                                                                        }}
                                                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ADD SECTION BUTTON */}
                                    <button
                                        className="w-full py-4 border border-dashed border-white/20 rounded-xl text-slate-400 text-sm font-bold hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2 group"
                                        onClick={() => addSection('custom')}
                                    >
                                        <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                                        Add Section
                                    </button>

                                    <div className="h-20" /> {/* Spacer */}
                                </div>
                            </div>

                            {/* --- RIGHT: LIVE PREVIEW --- */}
                            <div className="flex-1 bg-[#121212] relative h-full overflow-y-auto flex items-start justify-center p-8 custom-scrollbar">
                                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                                <div
                                    id="resume-preview-frame"
                                    className="w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl transition-all duration-500 origin-top transform scale-[0.9] lg:scale-[0.65] xl:scale-[0.85] 2xl:scale-[1] mb-20"
                                    style={{ transformOrigin: 'top center' }}
                                >
                                    {/* TEMPLATE RENDERER ENGINE */}
                                    <TemplateRenderer
                                        templateId={selectedTemplate}
                                        data={{
                                            personal: personalInfo,
                                            sections: sections
                                        }}
                                    />

                                    {/* WATERMARK */}
                                    <div className="absolute bottom-8 right-8 opacity-5 pointer-events-none">
                                        <div className="text-[60px] font-bold rotate-[-15deg]">HUSKYMIND</div>
                                        <p className="text-xs font-mono text-center">ARCHITECT BUILD</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
