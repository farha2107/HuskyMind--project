"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, Heart, Share2, TrendingUp, Users,
    Zap, Shield, Award, Hash, Search, Filter,
    MoreHorizontal, ArrowUp, ArrowDown, Sparkles,
    BrainCircuit, Activity, Cpu, Globe, Scale, BookOpen, UserPlus, CheckCircle,
    ArrowLeft, CornerDownRight, Clock
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import NeuralBackground from "@/components/ui/NeuralBackground";

// --- TYPES FOR RECURSIVE COMMENTS ---
type Comment = {
    id: string;
    author: string;
    role: string;
    content: string;
    upvotes: number;
    timestamp: string;
    replies: Comment[];
    isNew?: boolean; // Highlight effect
};

type Post = {
    id: number;
    author: string;
    role: string;
    avatar: string;
    title: string;
    content: string;
    tags: string[];
    upvotes: number;
    comments: number;
    timestamp: string;
    aiAnalysis: string;
    aiBadge: string;
    resonance: number;
    skillSynergy?: string;
    debateFactor: number;
    threadData?: Comment[]; // Nested comments
};

// --- MOCK DATA ---
const MOCK_COMMENTS: Comment[] = [
    {
        id: "c1",
        author: "Senior_Dev_One",
        role: "Staff Engineer @ Netflix",
        content: "Honestly, this advice is gold. Junior devs always over-index on tools. I'd rather see a clean Vercel deployment than a broken K8s cluster.",
        upvotes: 452,
        timestamp: "1h ago",
        replies: [
            {
                id: "c1-1",
                author: "NewGrad_2026",
                role: "CS Student",
                content: "But doesn't listing K8s help pass the ATS filters?",
                upvotes: 120,
                timestamp: "45m ago",
                replies: [
                    {
                        id: "c1-1-1",
                        author: "Recruiter_Bot_AI",
                        role: "AI Hiring Agent",
                        content: "As an AI screener, I can confirm: We check for 'Kubernetes' validation, not just the keyword. Broken links = automatic rejection.",
                        upvotes: 890,
                        timestamp: "10m ago",
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "c2",
        author: "TechLead_Austin",
        role: "Engineering Manager",
        content: "Strong disagree. If you want to be a Platform Engineer, you NEED to show you can handle complexity. Just make sure it actually works.",
        upvotes: 210,
        timestamp: "2h ago",
        replies: []
    }
];

const CHANNELS = [
    { id: "general", name: "General Signal", icon: Globe, count: 1240 },
    { id: "interview", name: "Interview War Room", icon: Shield, count: 850, active: true },
    { id: "system", name: "System Design", icon: ServerIcon, count: 620 },
    { id: "offers", name: "Offer Negotiation", icon: DollarSignIcon, count: 430 },
    { id: "roast", name: "Resume Roasts", icon: FlameIcon, count: 1500 },
];

const CHANNEL_CONTENT: Record<string, Post[]> = {
    'general': [
        {
            id: 101,
            author: "Cyber_Nomad",
            role: "Digital Nomad",
            avatar: "bg-blue-500",
            title: "Tech Scene outside the US? Thinking of moving to Tokyo.",
            content: "Remote work is great, but timezone alignment is killing me. Anyone in APAC working for US startups?",
            tags: ["Remote Work", "Digital Nomad", "Lifestyle"],
            upvotes: 420,
            comments: 45,
            timestamp: "3h ago",
            aiAnalysis: "Global Trend: APAC tech hubs are growing but timezone friction remains a top complaint.",
            aiBadge: "Lifestyle Signal",
            resonance: 88,
            skillSynergy: "Async Communication",
            debateFactor: 30,
            threadData: []
        },
        {
            id: 102,
            author: "Recruiter_Jane",
            role: "Talent Acquisition",
            avatar: "bg-pink-500",
            title: "Market Update: Q1 2026 Hiring Trends",
            content: "We're seeing a massive shift back to full-stack roles. Specialists are cool, but generalists who can deploy are gold.",
            tags: ["Hiring", "Market Trends", "Career"],
            upvotes: 890,
            comments: 120,
            timestamp: "5h ago",
            aiAnalysis: "Market Shift: 'Full Stack' is redefining to include Cloud & AI Ops.",
            aiBadge: "Market Pulse",
            resonance: 95,
            skillSynergy: "Full Stack",
            debateFactor: 10,
            threadData: []
        }
    ],
    'interview': [
        {
            id: 1,
            author: "Sarah_Dev_99",
            role: "Senior Architect",
            avatar: "bg-purple-500",
            title: "How I negotiated $50k more at Google (L5)",
            content: "The key wasn't my coding triggers, it was the 'System Design' round where I led the conversation...",
            tags: ["Negotiation", "Big Tech", "L5"],
            upvotes: 1420,
            comments: 89,
            timestamp: "2h ago",
            aiAnalysis: "High Impact Strategy: Focuses on soft skills in technical rounds.",
            aiBadge: "Top 1% Insight",
            resonance: 98,
            skillSynergy: "Negotiation",
            debateFactor: 20,
            threadData: MOCK_COMMENTS
        },
        {
            id: 202,
            author: "Algo_Master",
            role: "Competitve Programmer",
            avatar: "bg-red-500",
            title: "DP is dead. Learn Graph Neural Networks.",
            content: "Interviewers are moving away from dynamic programming puzzles. They want to see how you model data relationships.",
            tags: ["Algorithms", "Interviews", "Future Tech"],
            upvotes: 650,
            comments: 200,
            timestamp: "6h ago",
            aiAnalysis: "Controversial: DP remains a staple, but GNN knowledge shows edge.",
            aiBadge: "Hot Take",
            resonance: 70,
            skillSynergy: "Graph Theory",
            debateFactor: 90,
            threadData: []
        }
    ],
    'system': [
        {
            id: 2,
            author: "System_Breaker",
            role: "Backend Lead",
            avatar: "bg-cyan-500",
            title: "Don't use Kubernetes for your portfolio. Seriously.",
            content: "I see so many juniors over-engineering their blogs. Just use Vercel. K8s is for scale you don't have yet.",
            tags: ["DevOps", "Hot Take", "Career Advice"],
            upvotes: 850,
            comments: 232,
            timestamp: "4h ago",
            aiAnalysis: "Controversial Consensus: 70% of senior devs agree.",
            aiBadge: "Debated Topic",
            resonance: 65,
            skillSynergy: "Vercel",
            debateFactor: 85,
            threadData: MOCK_COMMENTS
        },
        {
            id: 302,
            author: "Cloud_Architect_X",
            role: "Principal Engineer",
            avatar: "bg-green-500",
            title: "Event-Driven Architecture: The 2026 Standard",
            content: "Microservices are so 2020. Event sourcing with Kafka/Redpanda is the default pattern for scalable systems now.",
            tags: ["System Design", "Architecture", "Cloud"],
            upvotes: 1200,
            comments: 56,
            timestamp: "1h ago",
            aiAnalysis: "Industry Standard: Event-driven patterns are dominating high-scale job reqs.",
            aiBadge: "Core Knowledge",
            resonance: 92,
            skillSynergy: "Kafka",
            debateFactor: 15,
            threadData: []
        }
    ],
    'offers': [
        {
            id: 401,
            author: "Equity_Hunter",
            role: "Startup Founder",
            avatar: "bg-yellow-500",
            title: "Equity vs. Cash: The 2026 Playbook",
            content: "With the AI boom, equity in the right startup > high cash salary in big tech. Here is my math...",
            tags: ["Compensation", "Startups", "Finance"],
            upvotes: 540,
            comments: 88,
            timestamp: "8h ago",
            aiAnalysis: "Risk/Reward: High variance strategy. Valid for high-growth sectors.",
            aiBadge: "Financial Intel",
            resonance: 85,
            skillSynergy: "Financial Literacy",
            debateFactor: 60,
            threadData: []
        }
    ],
    'roast': [
        {
            id: 501,
            author: "Roasted_Dev",
            role: "Junior Dev",
            avatar: "bg-gray-500",
            title: "Roast my resume. Be brutal.",
            content: "[LINK] Applying for Junior Frontend roles. usage of 'Passionate' count: 5.",
            tags: ["Resume Review", "Feedback", "Junior"],
            upvotes: 300,
            comments: 150,
            timestamp: "30m ago",
            aiAnalysis: "Critique: Overuse of subjective adjectives. Needs metric-driven bullets.",
            aiBadge: "Community Help",
            resonance: 60,
            skillSynergy: "Resume Writing",
            debateFactor: 10,
            threadData: []
        }
    ]
};

// Helper Icons
function ServerIcon(props: any) { return <Cpu {...props} /> }
function DollarSignIcon(props: any) { return <span {...props}>$</span> }
function FlameIcon(props: any) { return <Zap {...props} /> }

// --- RECURSIVE COMMENT COMPONENT ---
const CommentNode = ({ comment, depth = 0 }: { comment: Comment, depth?: number }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [localReplies, setLocalReplies] = useState<Comment[]>(comment.replies || []);

    const handleReply = () => {
        if (!replyText.trim()) return;
        const newReply: Comment = {
            id: `temp-${Date.now()}`,
            author: "You (Student)",
            role: "Aspiring Dev",
            content: replyText,
            upvotes: 1,
            timestamp: "Just now",
            replies: [],
            isNew: true
        };
        setLocalReplies([newReply, ...localReplies]);
        setReplyText("");
        setReplyOpen(false);
    };

    return (
        <div className={`relative ${depth > 0 ? "ml-4 md:ml-8 pl-4 border-l border-white/10" : "mb-4"}`}>
            {/* Thread Line Glow */}
            {depth > 0 && <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 to-transparent group-hover:from-neon-cyan/50 transition-colors" />}

            <div className={`group animate-in fade-in slide-in-from-left-2 duration-300 ${comment.isNew ? "bg-neon-cyan/5 border border-neon-cyan/20 rounded p-2" : ""}`}>
                {/* Header */}
                <div className="flex items-center gap-2 mb-1 cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{comment.author}</span>
                    <span className="text-[9px] px-1.5 rounded bg-white/5 text-slate-500 border border-white/5">{comment.role}</span>
                    <span className="text-[9px] text-slate-600">• {comment.timestamp}</span>
                    {collapsed && <span className="text-[9px] text-slate-500 italic ml-2">(+{localReplies.length} children)</span>}
                </div>

                {!collapsed && (
                    <>
                        <p className="text-sm text-slate-300 leading-relaxed pl-7 mb-2">{comment.content}</p>

                        {/* Action Bar */}
                        <div className="flex items-center gap-4 pl-7 mb-2">
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                                <button className="hover:text-orange-500 transition-colors"><ArrowUp size={14} /></button>
                                <span className="font-bold">{comment.upvotes}</span>
                                <button className="hover:text-blue-500 transition-colors"><ArrowDown size={14} /></button>
                            </div>
                            <button onClick={() => setReplyOpen(!replyOpen)} className="flex items-center gap-1 text-xs text-slate-500 hover:text-white transition-colors">
                                <MessageSquare size={12} /> Reply
                            </button>
                            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-white transition-colors">
                                <Award size={12} /> Award
                            </button>
                        </div>

                        {/* Reply Input */}
                        {replyOpen && (
                            <div className="pl-7 mb-4 animate-in slide-in-from-top-2">
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-neon-cyan outline-none mb-2"
                                    placeholder="What are your thoughts?"
                                    rows={2}
                                    autoFocus
                                />
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setReplyOpen(false)} className="text-xs text-slate-500 hover:text-white px-3 py-1">Cancel</button>
                                    <button onClick={handleReply} className="text-xs bg-white text-black font-bold px-4 py-1 rounded hover:bg-slate-200">Reply</button>
                                </div>
                            </div>
                        )}

                        {/* Recursive Children */}
                        <div className="mt-2">
                            {localReplies.map((reply) => (
                                <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};


// Helper: Parse relative time to minutes for sorting
const parseTimestamp = (timeStr: string): number => {
    if (timeStr === 'Just now') return 0;
    const value = parseInt(timeStr);
    if (isNaN(value)) return 999999;
    if (timeStr.includes('m ago') || timeStr.includes('m')) return value;
    if (timeStr.includes('h ago') || timeStr.includes('h')) return value * 60;
    if (timeStr.includes('d ago') || timeStr.includes('d')) return value * 1440;
    return value;
};

// Helper: Sort posts based on the active filter
const sortPosts = (posts: Post[], criterion: string) => {
    const sorted = [...posts];
    if (criterion === 'new') {
        sorted.sort((a, b) => parseTimestamp(a.timestamp) - parseTimestamp(b.timestamp));
    } else if (criterion === 'top') {
        sorted.sort((a, b) => b.upvotes - a.upvotes);
    } else {
        // Trending: Mix of resonance and recent activity (using resonance + upvotes/10)
        sorted.sort((a, b) => (b.resonance + b.upvotes / 10) - (a.resonance + a.upvotes / 10));
    }
    return sorted;
};

// --- MAIN COMPONENT ---
export default function CommunityHub() {
    const [activeChannel, setActiveChannel] = useState("interview");
    const [filter, setFilter] = useState("trending");

    // Sort initial load based on default filter
    const [posts, setPosts] = useState(() => sortPosts(CHANNEL_CONTENT['interview'] || [], "trending"));

    const [selectedPost, setSelectedPost] = useState<Post | null>(null); // For Thread View
    const [savedSkills, setSavedSkills] = useState<string[]>([]);
    const [titanVerdict, setTitanVerdict] = useState<null | { id: number, text: string }>(null);

    // 🔄 SWITCH CONTENT ON CHANNEL CHANGE (Resets data from source)
    useEffect(() => {
        const basePosts = CHANNEL_CONTENT[activeChannel] || [];
        setPosts(sortPosts(basePosts, filter));
    }, [activeChannel]); // We intentionally omit 'filter' here to avoid resetting data when filter changes

    // 🔄 RE-SORT CURRENT CONTENT ON FILTER CHANGE (Preserves live updates)
    useEffect(() => {
        setPosts(currentPosts => sortPosts(currentPosts, filter));
    }, [filter]);

    // 🔄 LIVE SIMULATION EFFECT
    useEffect(() => {
        const interval = setInterval(() => {
            setPosts(prevPosts => {
                const updated = prevPosts.map(post => {
                    // Randomly update upvotes and comments to simulate life
                    if (Math.random() > 0.7) {
                        return {
                            ...post,
                            upvotes: post.upvotes + Math.floor(Math.random() * 5),
                            comments: Math.random() > 0.8 ? post.comments + 1 : post.comments
                        };
                    }
                    return post;
                });

                // Optional: Re-sort if "Top" filter is active to show live movement? 
                // Let's NOT re-sort automatically to avoid UI jumping, unless user refreshes filter.
                return updated;
            });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []); // Run once on mount (or re-run if needed, but [] is safer for interval stability)

    const handleSaveSkill = (skill: string) => {
        if (!savedSkills.includes(skill)) {
            setSavedSkills([...savedSkills, skill]);
            alert(`🚀 SKILL ACQUIRED: [${skill.toUpperCase()}] added to your Neural Profile!`);
        }
    };

    const summonTitan = (postId: number) => {
        setTitanVerdict(null);
        setTimeout(() => {
            setTitanVerdict({
                id: postId,
                text: "TITAN ARBITER ANALYSIS: This thread leans heavily towards 'Use PaaS for speed'. However, comments indicate learning K8s is valuable for resume filtering. VERDICT: Build simply, but simulate scale elsewhere."
            });
        }, 1500);
    };

    return (
        <div className="h-full flex overflow-hidden animate-in fade-in duration-500 relative">

            {/* NEURAL PARTICLE BACKGROUND */}
            <NeuralBackground className="opacity-60" />

            {/* 1. LEFT SIDEBAR: NAVIGATION */}
            <div className="w-64 border-r border-white/10 p-4 flex flex-col hidden md:flex bg-black/40 relative z-10 backdrop-blur-xl">
                <div className="mb-8 px-2">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Users className="text-neon-cyan" />
                        <span className="tracking-wider">NEXUS</span>
                    </h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Professional Neural Network</p>
                </div>

                <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-500 px-2 mb-2 uppercase tracking-widest">Quantum Channels</h3>
                    {CHANNELS.map(channel => (
                        <button
                            key={channel.id}
                            onClick={() => { setActiveChannel(channel.id); setSelectedPost(null); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group ${activeChannel === channel.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                        >
                            <div className="flex items-center gap-3">
                                <channel.icon size={16} className={`${activeChannel === channel.id ? "text-neon-cyan" : "text-slate-500 group-hover:text-white"}`} />
                                <span>{channel.name}</span>
                            </div>
                            {activeChannel === channel.id && (
                                <motion.div
                                    layoutId="activeChannel"
                                    className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_5px_#00f3ff]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-8">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10">
                        <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                            <Sparkles size={12} className="text-yellow-400" /> Daily Quest
                        </h4>
                        <p className="text-[10px] text-slate-300 mb-3">Review 3 Resumes to earn the "Mentor" badge and unlock Pro Analysis.</p>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-gradient-to-r from-yellow-400 to-orange-500" />
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-[8px] text-slate-500">1/3 Completed</span>
                            <span className="text-[8px] text-yellow-400">+50 XP</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CENTER: NEURAL FEED OR THREAD VIEW */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Header */}
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/60 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        {selectedPost ? (
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={16} /> <span className="text-sm font-bold">Back to Feed</span>
                            </button>
                        ) : (
                            <>
                                <h2 className="text-lg font-bold text-white">#{CHANNELS.find(c => c.id === activeChannel)?.name}</h2>
                                <div className="h-4 w-px bg-white/10" />
                                <div className="flex gap-2">
                                    {["Trending", "New", "Top"].map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f.toLowerCase())}
                                            className={`text-xs px-3 py-1 rounded-full border ${filter === f.toLowerCase() ? "bg-white/10 border-white/20 text-white" : "border-transparent text-slate-500 hover:text-white"}`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {!selectedPost && (
                            <>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search neural signals..."
                                        className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:border-neon-cyan outline-none w-64"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05, textShadow: "0 0 8px rgb(0,243,255)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 group"
                                >
                                    <Zap size={14} className="group-hover:fill-neon-cyan transition-colors" /> BROADCAST
                                </motion.button>
                            </>
                        )}
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                    <AnimatePresence mode="wait">
                        {!selectedPost ? (
                            /* --- FEED VIEW --- */
                            <motion.div
                                key="feed"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {posts.map((post, i) => (
                                    <GlassCard key={post.id} className="p-0 overflow-hidden border border-white/10 hover:border-white/20 transition-colors group">
                                        <div className="p-4 flex gap-4">
                                            {/* Vote Column */}
                                            <div className="flex flex-col items-center gap-1 pt-1">
                                                <motion.button
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-slate-500 hover:text-orange-500 transition-colors"
                                                >
                                                    <ArrowUp size={20} />
                                                </motion.button>
                                                <span className="text-sm font-bold text-white">{post.upvotes > 1000 ? (post.upvotes / 1000).toFixed(1) + 'k' : post.upvotes}</span>
                                                <motion.button
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-slate-500 hover:text-blue-500 transition-colors"
                                                >
                                                    <ArrowDown size={20} />
                                                </motion.button>
                                                <div className="h-16 w-1 bg-white/10 rounded-full mt-2 relative overflow-hidden" title="Argument Polarity">
                                                    <div className={`absolute bottom-0 w-full rounded-full ${post.debateFactor > 50 ? 'bg-red-500' : 'bg-green-500'}`} style={{ height: `${post.debateFactor}%` }} />
                                                </div>
                                            </div>

                                            {/* Content Column */}
                                            <div className="flex-1 cursor-pointer" onClick={() => setSelectedPost(post)}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`w-5 h-5 rounded-full ${post.avatar}`} />
                                                    <span className="text-xs font-bold text-slate-300">{post.author}</span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">{post.role}</span>
                                                    <span className="text-[10px] text-slate-600">• {post.timestamp}</span>
                                                </div>

                                                <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-neon-cyan transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                                    {post.content}
                                                </p>

                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                                        <MessageSquare size={14} /> {post.comments} Comments
                                                    </span>
                                                    <div className="flex-1" />
                                                    <span className="text-[10px] text-electric-purple font-bold border border-electric-purple/30 px-2 py-0.5 rounded-full bg-electric-purple/5">
                                                        {post.aiBadge}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </motion.div>
                        ) : (
                            /* --- THREAD VIEW --- */
                            <motion.div
                                key="thread"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6 max-w-4xl mx-auto pb-20"
                            >
                                {/* MAIN POST */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <button className="text-slate-500 hover:text-orange-500 transition-colors"><ArrowUp size={24} /></button>
                                            <span className="text-lg font-bold text-white">{selectedPost.upvotes}</span>
                                            <button className="text-slate-500 hover:text-blue-500 transition-colors"><ArrowDown size={24} /></button>
                                        </div>
                                        <div className="flex-1">
                                            <h1 className="text-2xl font-bold text-white mb-4 leading-tight">{selectedPost.title}</h1>
                                            <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap mb-6">{selectedPost.content}</p>

                                            {/* AI & Actions */}
                                            <div className="bg-black/40 border border-white/10 rounded-lg p-4 mb-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <BrainCircuit size={18} className="text-electric-purple" />
                                                    <span className="text-xs font-bold text-electric-purple tracking-widest uppercase">Titan Analysis</span>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-4">{selectedPost.aiAnalysis}</p>

                                                <div className="flex gap-3">
                                                    {selectedPost.skillSynergy && (
                                                        <button
                                                            onClick={() => handleSaveSkill(selectedPost.skillSynergy!)}
                                                            className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold transition-all"
                                                        >
                                                            {savedSkills.includes(selectedPost.skillSynergy!) ? <><CheckCircle size={12} /> SAVED</> : <><BookOpen size={12} /> SAVE SKILL</>}
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => summonTitan(selectedPost.id)}
                                                        className="flex items-center gap-2 px-3 py-1.5 bg-electric-purple/10 hover:bg-electric-purple/20 border border-electric-purple/30 rounded text-xs text-electric-purple font-bold transition-all"
                                                    >
                                                        <Scale size={12} /> SUMMON ARBITER
                                                    </button>
                                                </div>

                                                <AnimatePresence>
                                                    {titanVerdict?.id === selectedPost.id && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-3 p-3 bg-white/5 rounded border-l-2 border-electric-purple text-xs text-slate-300">
                                                            {titanVerdict.text}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                <span><MessageSquare size={14} className="inline mr-1" /> {selectedPost.comments} Comments</span>
                                                <span><Share2 size={14} className="inline mr-1" /> Share</span>
                                                <span><Award size={14} className="inline mr-1" /> Award</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* COMMENT SECTION */}
                                <div className="pl-4 md:pl-0">
                                    <div className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                                        <MessageSquare size={14} /> Neural Thread ({selectedPost.comments})
                                    </div>

                                    {/* New Comment Input */}
                                    <div className="mb-8 flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500" />
                                        <div className="flex-1">
                                            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-neon-cyan outline-none resize-none" rows={3} placeholder="Add to the discussion..." />
                                            <div className="flex justify-end mt-2">
                                                <button className="px-4 py-1.5 bg-white text-black font-bold rounded text-xs hover:bg-slate-200">Comment</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recursive Comments */}
                                    <div>
                                        {selectedPost.threadData?.map((comment) => (
                                            <CommentNode key={comment.id} comment={comment} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>

            {/* 3. RIGHT SIDEBAR: TRENDING & STATS */}
            <div className="w-80 border-l border-white/10 bg-black/40 hidden xl:flex flex-col p-6 space-y-8">

                {/* User Stats Card */}
                <GlassCard className="p-5 border-white/10 relative overflow-hidden group" floating={true}>
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity"><Award size={48} className="text-neon-cyan" /></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-neon-cyan/20 blur-3xl rounded-full group-hover:bg-neon-cyan/30 transition-colors" />

                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity size={14} className="text-neon-cyan" /> Neural Resonance
                    </h3>
                    <div className="flex items-end gap-2 mb-1">
                        <span className="text-4xl font-bold text-white tracking-tight">8,420</span>
                        <span className="text-xs text-green-400 mb-1.5 flex items-center gap-0.5 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                            <ArrowUp size={10} /> 12%
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-4 font-mono">Top 5% of Neural Nodes</p>

                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider">
                            <span>Contribution</span>
                            <span className="text-white font-bold">Diamond Tier</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_#00f3ff]"
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </GlassCard>

                {/* NETWORK GRAPH WIDGET */}
                <div className="h-40 border border-white/10 rounded-xl bg-black/20 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full">
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Pulsing Nodes */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_5px_#00f3ff]"
                            initial={{ x: Math.random() * 200 - 100, y: Math.random() * 100 - 50, opacity: 0.2 }}
                            animate={{
                                x: Math.random() * 200 - 100,
                                y: Math.random() * 100 - 50,
                                opacity: [0.2, 0.8, 0.2],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, repeatType: "mirror" }}
                        />
                    ))}

                    <div className="relative z-10 text-center">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2 backdrop-blur-md">
                            <Globe size={20} className="text-white" />
                        </div>
                        <div className="text-[10px] font-bold text-slate-300">GLOBAL NETWORK</div>
                        <div className="text-[9px] text-neon-cyan animate-pulse">LIVE: 14,203 NODES</div>
                    </div>
                </div>

                {/* Trending Tags */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <TrendingUp size={14} className="text-orange-500" /> Trending Signals
                    </h3>
                    <div className="space-y-3">
                        {[
                            { topic: "Remote Jobs 2026", count: "12k signals", color: "text-blue-400" },
                            { topic: "AI Ethics", count: "8.5k signals", color: "text-purple-400" },
                            { topic: "Rust vs C++", count: "6.2k signals", color: "text-orange-400" },
                            { topic: "Portfolio Reviews", count: "5k signals", color: "text-green-400" }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.03)" }}
                                className="flex justify-between items-center group cursor-pointer p-2 rounded-lg transition-colors border border-transparent hover:border-white/5"
                            >
                                <div>
                                    <div className={`text-sm font-bold text-slate-300 group-hover:text-white transition-colors flex items-center gap-2`}>
                                        <span className="text-slate-600">#</span> {t.topic}
                                    </div>
                                    <div className="text-[10px] text-slate-600 pl-3">{t.count}</div>
                                </div>
                                <div className={`w-1.5 h-1.5 rounded-full ${t.color.replace('text-', 'bg-')} shadow-[0_0_5px_currentColor]`} />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

        </div >
    );
}
