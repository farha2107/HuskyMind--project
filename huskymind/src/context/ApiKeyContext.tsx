"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ApiKeyContextType {
    apiKey: string | null;
    saveApiKey: (key: string) => void;
    clearApiKey: () => void;
    isValid: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Load on mount
        const stored = localStorage.getItem('husky_gemini_key');
        if (stored) {
            setApiKey(stored);
            setIsValid(true);
        }
    }, []);

    const saveApiKey = (key: string) => {
        if (!key.trim()) return;
        localStorage.setItem('husky_gemini_key', key);
        setApiKey(key);
        setIsValid(true);
    };

    const clearApiKey = () => {
        localStorage.removeItem('husky_gemini_key');
        setApiKey(null);
        setIsValid(false);
    };

    return (
        <ApiKeyContext.Provider value={{ apiKey, saveApiKey, clearApiKey, isValid }}>
            {children}
        </ApiKeyContext.Provider>
    );
}

export function useApiKey() {
    const context = useContext(ApiKeyContext);
    if (context === undefined) {
        throw new Error('useApiKey must be used within an ApiKeyProvider');
    }
    return context;
}
