"use client";

import React, { useState } from 'react';
import { useApiKey } from '@/context/ApiKeyContext';
import { Key, ShieldCheck, ExternalLink, Lock } from 'lucide-react';

export default function ApiKeyModal() {
    const { apiKey, saveApiKey, isValid } = useApiKey();
    const [inputKey, setInputKey] = useState('');
    const [error, setError] = useState('');

    // If key exists and is valid, don't show modal
    if (isValid && apiKey) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputKey.length < 30 || !inputKey.startsWith('AIza')) {
            setError('Invalid Key format. Must start with "AIza".');
            return;
        }
        saveApiKey(inputKey);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-500">
            <div className="bg-[#0a0f18] border border-cyan-900/50 rounded-2xl w-full max-w-md p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">

                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <Key className="text-cyan-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Access Terminal</h2>
                        <p className="text-xs text-cyan-500 font-mono tracking-widest uppercase">Security Protocol: BYOK</p>
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    HuskyMind is an experimental AI Career OS. To activate the neural engines (Genesis Architect, AI Mentor, Resume Optimizer), you must provide your own <strong className="text-white">Google Gemini API Key</strong>.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Enter Gemini API Key</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="password"
                                value={inputKey}
                                onChange={(e) => { setInputKey(e.target.value); setError(''); }}
                                placeholder="AIzaSy..."
                                className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 outline-none transition-all font-mono text-sm shadow-inner"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-400 text-xs ml-1 animate-pulse">{error}</p>}
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            type="submit"
                            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <ShieldCheck size={18} />
                            AUTHENTICATE SESSION
                        </button>

                        <a
                            href="https://aistudio.google.com/app/apikey"
                            target="_blank"
                            rel="noreferrer"
                            className="text-center text-xs text-gray-600 hover:text-cyan-400 transition-colors flex items-center justify-center gap-1"
                        >
                            Get a free Gemini API Key <ExternalLink size={10} />
                        </a>
                    </div>
                </form>

                <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-gray-600 text-center">
                    Your key is stored locally in your browser. It is never sent to our servers.
                </div>
            </div>
        </div>
    );
}
