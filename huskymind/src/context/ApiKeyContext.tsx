"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ApiKeyContextType {
    apiKey: string | null;
    saveApiKey: (key: string) => void;
    clearApiKey: () => void;
    isValid: boolean;
    userName: string;
    updateUserName: (name: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("Alex Student");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Load on mount
        const storedKey = localStorage.getItem('husky_gemini_key');
        const storedName = localStorage.getItem('husky_user_name');

        if (storedKey) {
            setApiKey(storedKey);
            setIsValid(true);
        }
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const saveApiKey = (key: string) => {
        if (!key.trim()) return;
        localStorage.setItem('husky_gemini_key', key);
        setApiKey(key);
        setIsValid(true);
    };

    const updateUserName = (name: string) => {
        if (!name.trim()) return;
        localStorage.setItem('husky_user_name', name);
        setUserName(name);
    };

    const clearApiKey = () => {
        localStorage.removeItem('husky_gemini_key');
        setApiKey(null);
        setIsValid(false);
    };

    return (
        <ApiKeyContext.Provider value={{ apiKey, saveApiKey, clearApiKey, isValid, userName, updateUserName }}>
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
