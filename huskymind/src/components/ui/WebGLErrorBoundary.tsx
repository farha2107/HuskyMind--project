"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class WebGLErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("WebGL Context Error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex items-center justify-center h-full w-full bg-slate-900/50 backdrop-blur-sm border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-400">
                        <AlertTriangle size={16} />
                        <span className="text-xs font-mono">RENDER_FAIL: LOW_MEMORY</span>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
