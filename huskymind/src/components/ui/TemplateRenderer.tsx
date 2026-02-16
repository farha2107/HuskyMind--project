import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

// --- TYPES ---
export type ResumeData = {
    personal: {
        name: string;
        role: string;
        email: string;
        phone: string;
        location: string;
        links?: string[];
    };
    sections: {
        id: string;
        type: string;
        title: string;
        data: any;
    }[];
};

type TemplateProps = {
    data: ResumeData;
    color: string;
    font: string;
};

// --- LAYOUT A: CLASSIC (Single Column, Centered Header) ---
const LayoutClassic = ({ data, color, font }: TemplateProps) => {
    const summary = data.sections.find(s => s.type === 'summary');
    const experience = data.sections.filter(s => s.type === 'experience');
    const education = data.sections.filter(s => s.type === 'education');
    const skills = data.sections.filter(s => s.type === 'skills');
    const projects = data.sections.filter(s => s.type === 'projects');

    return (
        <div className={`p-16 h-full flex flex-col ${font} text-slate-900`}>
            {/* Header */}
            <header className="text-center border-b-2 border-slate-200 pb-8 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{data.personal.name}</h1>
                <p className={`text-lg font-medium text-[${color}] opacity-80 mb-4`}>{data.personal.role}</p>
                <div className="flex justify-center gap-6 text-xs text-slate-500 font-medium tracking-wide">
                    {data.personal.email && <span className="flex items-center gap-1"><Mail size={10} /> {data.personal.email}</span>}
                    {data.personal.phone && <span className="flex items-center gap-1"><Phone size={10} /> {data.personal.phone}</span>}
                    {data.personal.location && <span className="flex items-center gap-1"><MapPin size={10} /> {data.personal.location}</span>}
                </div>
            </header>

            {/* Content */}
            <div className="space-y-6">
                {summary && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">Professional Summary</h3>
                        <p className="text-sm leading-relaxed text-slate-700">{summary.data}</p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-slate-200 pb-1">Work Experience</h3>
                        <div className="space-y-6">
                            {experience[0].data.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-base">{exp.role}</h4>
                                        <span className="text-xs font-semibold text-slate-500">{exp.date}</span>
                                    </div>
                                    <p className={`text-sm font-medium opacity-80 mb-2 italic`}>{exp.company}</p>
                                    <ul className="list-disc list-outside ml-4 space-y-1">
                                        {exp.points.map((pt: string, p: number) => (
                                            <li key={p} className="text-sm text-slate-600 leading-relaxed pl-1">{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-slate-200 pb-1">Education</h3>
                        {education[0].data.map((edu: any, i: number) => (
                            <div key={i} className="flex justify-between">
                                <div>
                                    <h4 className="font-bold text-sm">{edu.school}</h4>
                                    <p className="text-xs text-slate-600">{edu.degree}</p>
                                </div>
                                <span className="text-xs font-medium text-slate-500">{edu.year}</span>
                            </div>
                        ))}
                    </section>
                )}

                {skills.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills[0].data.map((skill: string, i: number) => (
                                <span key={i} className="text-sm text-slate-700 font-medium">• {skill}</span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

// --- LAYOUT B: MODERN SIDEBAR (Left Sidebar) ---
const LayoutModernSidebar = ({ data, color, font }: TemplateProps) => { // 'color' expected to be a faint bg color class or hex for sidebar
    const summary = data.sections.find(s => s.type === 'summary');
    const experience = data.sections.filter(s => s.type === 'experience');
    const education = data.sections.filter(s => s.type === 'education');
    const skills = data.sections.filter(s => s.type === 'skills');

    // Extract tailwind color class prefix (e.g., from 'from-cyan-900' -> 'cyan') or default to slate
    // This is a simplified extraction for the demo
    const accentColor = color.includes('cyan') ? 'text-cyan-600' : color.includes('blue') ? 'text-blue-600' : 'text-slate-800';
    const sidebarBg = color.includes('cyan') ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900';
    const sidebarText = color.includes('cyan') ? 'text-slate-300' : 'text-slate-600';

    return (
        <div className={`h-full flex ${font}`}>
            {/* SIDEBAR */}
            <aside className={`w-1/3 p-8 flex flex-col ${sidebarBg}`}>
                <div className="mb-8">
                    <div className="w-20 h-20 bg-white/20 rounded-full mb-4 flex items-center justify-center text-2xl font-bold">
                        {data.personal.name.charAt(0)}
                    </div>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Contact</h2>
                    <div className={`space-y-3 text-xs ${sidebarText}`}>
                        <div className="flex items-center gap-2"><Mail size={12} /> {data.personal.email}</div>
                        <div className="flex items-center gap-2"><Phone size={12} /> {data.personal.phone}</div>
                        <div className="flex items-center gap-2"><MapPin size={12} /> {data.personal.location}</div>
                    </div>
                </div>

                {education.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Education</h2>
                        {education[0].data.map((edu: any, i: number) => (
                            <div key={i} className="mb-3">
                                <h4 className="font-bold text-sm">{edu.degree}</h4>
                                <p className={`text-xs ${sidebarText}`}>{edu.school}, {edu.year}</p>
                            </div>
                        ))}
                    </div>
                )}

                {skills.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills[0].data.map((skill: string, i: number) => (
                                <span key={i} className={`px-2 py-1 bg-white/10 rounded text-xs`}>{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-12 bg-white text-slate-800">
                <header className="mb-10 border-b-4 border-black pb-6">
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">{data.personal.name}</h1>
                    <p className={`text-xl font-bold ${accentColor} tracking-wide`}>{data.personal.role}</p>
                </header>

                {summary && (
                    <section className="mb-8">
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-3 ${accentColor}`}>Profile</h3>
                        <p className="text-sm leading-relaxed font-medium text-slate-600">{summary.data}</p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section>
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${accentColor}`}>Experience</h3>
                        <div className="space-y-8 border-l-2 border-slate-100 pl-6 relative">
                            {experience[0].data.map((exp: any, i: number) => (
                                <div key={i} className="relative">
                                    <div className={`absolute -left-[29px] top-1.5 w-3 h-3 rounded-full ${accentColor.replace('text', 'bg')}`} />
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-lg">{exp.role}</h4>
                                        <span className="text-xs font-bold text-slate-400">{exp.date}</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 mb-2">{exp.company}</p>
                                    <ul className="list-none space-y-2">
                                        {exp.points.map((pt: string, p: number) => (
                                            <li key={p} className="text-sm text-slate-600 leading-relaxed pl-0">{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

// --- LAYOUT C: CREATIVE SIDEBAR (Right Sidebar) ---
const LayoutCreative = ({ data, color, font }: TemplateProps) => {
    // Similar to Modern but sidebar on right, bolder transitions
    const summary = data.sections.find(s => s.type === 'summary');
    const experience = data.sections.filter(s => s.type === 'experience');
    const education = data.sections.filter(s => s.type === 'education');
    const skills = data.sections.filter(s => s.type === 'skills');

    const accentBg = color.includes('yellow') ? 'bg-yellow-400' : 'bg-slate-900';
    const accentText = color.includes('yellow') ? 'text-black' : 'text-white';

    return (
        <div className={`h-full flex flex-row-reverse ${font}`}>
            {/* SIDEBAR RIGHT */}
            <aside className={`w-1/3 p-8 flex flex-col ${accentBg} ${accentText}`}>
                <div className="mt-auto">
                    <h1 className="text-4xl font-black uppercase leading-none mb-4 break-words">{data.personal.name}</h1>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-8">{data.personal.role}</p>

                    <div className="space-y-6 text-xs font-bold">
                        <div>
                            <p className="opacity-50 uppercase tracking-widest mb-1">Contact</p>
                            <p>{data.personal.email}</p>
                            <p>{data.personal.phone}</p>
                            <p>{data.personal.location}</p>
                        </div>

                        {education.length > 0 && (
                            <div>
                                <p className="opacity-50 uppercase tracking-widest mb-1">Education</p>
                                {education[0].data.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <p>{edu.degree}</p>
                                        <p className="opacity-70">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {skills.length > 0 && (
                            <div>
                                <p className="opacity-50 uppercase tracking-widest mb-1">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {skills[0].data.map((skill: string, i: number) => (
                                        <span key={i} className="border-b border-black/20 pb-0.5">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT LEFT */}
            <main className="flex-1 p-12 bg-white text-black flex flex-col justify-center">
                {summary && (
                    <div className="mb-12">
                        <p className="text-lg font-medium leading-relaxed indent-8">{summary.data}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div className="space-y-12">
                        {experience[0].data.map((exp: any, i: number) => (
                            <div key={i} className="group">
                                <div className="flex gap-4 items-baseline mb-2">
                                    <span className="text-xs font-bold bg-black text-white px-2 py-1">{exp.date}</span>
                                    <h4 className="font-bold text-xl group-hover:underline decoration-4 decoration-yellow-400 underline-offset-4">{exp.role}</h4>
                                </div>
                                <p className="text-sm font-bold uppercase tracking-widest mb-4 pl-16 opacity-50">{exp.company}</p>
                                <div className="pl-16 space-y-2">
                                    {exp.points.map((pt: string, p: number) => (
                                        <p key={p} className="text-sm border-l-2 border-slate-200 pl-4 py-1">{pt}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

// --- LAYOUT D: GRID (Modern Grid) ---
const LayoutGrid = ({ data, color, font }: TemplateProps) => {
    const summary = data.sections.find(s => s.type === 'summary');
    const experience = data.sections.filter(s => s.type === 'experience');
    const education = data.sections.filter(s => s.type === 'education');
    const skills = data.sections.filter(s => s.type === 'skills');
    const projects = data.sections.filter(s => s.type === 'projects');

    return (
        <div className={`p-10 h-full flex flex-col ${font} bg-slate-50`}>
            <header className="flex justify-between items-end border-b-2 border-slate-300 pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">{data.personal.name}</h1>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{data.personal.role}</p>
                </div>
                <div className="text-right text-xs font-mono text-slate-500">
                    <p>{data.personal.email}</p>
                    <p>{data.personal.location}</p>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-12 gap-8">
                {/* LEFT COLUMN (Wide) */}
                <div className="col-span-8 space-y-8">
                    {summary && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">About</h3>
                            <p className="text-sm text-slate-800 leading-relaxed font-medium">{summary.data}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Experience</h3>
                            <div className="space-y-6">
                                {experience[0].data.map((exp: any, i: number) => (
                                    <div key={i} className="bg-white p-4 shadow-sm border border-slate-100 rounded-sm">
                                        <div className="flex justify-between mb-2">
                                            <h4 className="font-bold text-sm text-slate-900">{exp.role}</h4>
                                            <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{exp.date}</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-500 mb-3">{exp.company}</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            {exp.points.map((pt: string, p: number) => (
                                                <li key={p} className="text-xs text-slate-600 leading-relaxed">{pt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN (Narrow) */}
                <div className="col-span-4 space-y-8">
                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Stack</h3>
                            <div className="flex flex-wrap gap-1">
                                {skills[0].data.map((skill: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-600 uppercase w-full text-center">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Education</h3>
                            {education[0].data.map((edu: any, i: number) => (
                                <div key={i} className="bg-white p-3 border border-slate-200 text-center">
                                    <h4 className="font-bold text-xs text-slate-900">{edu.school}</h4>
                                    <p className="text-[10px] text-slate-500">{edu.degree}</p>
                                    <p className="text-[10px] font-mono text-slate-400 mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Projects</h3>
                            {projects[0].data.map((proj: any, i: number) => (
                                <div key={i} className="mb-3">
                                    <h4 className="font-bold text-xs text-slate-900">{proj.name}</h4>
                                    <p className="text-[10px] text-slate-500 leading-tight">{proj.desc}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- RENDERER COMPONENT ---
export default function TemplateRenderer({ templateId, data }: { templateId: string, data: ResumeData }) {
    // Map ID to Layout Engine + Styles
    const getLayoutConfig = (id: string) => {
        switch (id) {
            // A: CLASSIC
            case 'executive': return { Layout: LayoutClassic, font: 'font-serif', color: 'text-slate-900' };
            case 'diplomat': return { Layout: LayoutClassic, font: 'font-serif', color: 'text-blue-900' };
            case 'scholar': return { Layout: LayoutClassic, font: 'font-serif', color: 'text-orange-900' }; // Academic style
            case 'ivy': return { Layout: LayoutClassic, font: 'font-serif', color: 'text-emerald-900' };

            // B: MODERN SIDEBAR (Left)
            case 'quantum': return { Layout: LayoutModernSidebar, font: 'font-sans', color: 'from-cyan-900' }; // Dark Tech
            case 'engineer': return { Layout: LayoutModernSidebar, font: 'font-mono', color: 'from-slate-800' }; // System font
            case 'titan': return { Layout: LayoutModernSidebar, font: 'font-sans', color: 'from-blue-900' };
            case 'analyst': return { Layout: LayoutModernSidebar, font: 'font-sans', color: 'from-indigo-800' };

            // C: CREATIVE SIDEBAR (Right)
            case 'disruptor': return { Layout: LayoutCreative, font: 'font-sans', color: 'bg-yellow-400' };
            case 'artist': return { Layout: LayoutCreative, font: 'font-sans', color: 'bg-pink-500' };
            case 'founder': return { Layout: LayoutCreative, font: 'font-serif', color: 'bg-purple-900' };
            case 'futurist': return { Layout: LayoutCreative, font: 'font-mono', color: 'bg-violet-900' };

            // D: GRID (Minimal/Modular)
            case 'minimalist': return { Layout: LayoutGrid, font: 'font-sans', color: 'bg-gray-50' };
            case 'strategist': return { Layout: LayoutGrid, font: 'font-sans', color: 'bg-slate-100' };
            case 'global': return { Layout: LayoutGrid, font: 'font-serif', color: 'bg-teal-50' };

            default: return { Layout: LayoutClassic, font: 'font-sans', color: 'text-black' };
        }
    };

    const config = getLayoutConfig(templateId);
    const LayoutComponent = config.Layout;

    return <LayoutComponent data={data} color={config.color} font={config.font} />;
}
