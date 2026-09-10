import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw, Cpu } from 'lucide-react';

export default function Navbar({ health, checkingHealth, onRefreshHealth }) {
  const isHealthy = health?.status === 'UP';
  const isAiReady = health?.geminiConfigured;

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Recruiter<span className="text-indigo-400">Lens</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                AI MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Candidate-Job Compatibility Intelligence
            </p>
          </div>
        </div>

        {/* Backend / AI Status Badge */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefreshHealth}
            disabled={checkingHealth}
            title="Check backend status"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-800/60 hover:bg-slate-800 transition text-xs text-slate-300"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${checkingHealth ? 'animate-spin text-indigo-400' : 'text-slate-400'}`} />
            <div className="flex items-center space-x-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  isHealthy ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                }`}
              />
              <span className="font-medium">
                {isHealthy ? (isAiReady ? 'Live • Gemini AI Connected' : 'Backend Ready (Key Unset)') : 'Backend Offline'}
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-1.5 text-xs text-slate-400 border-l border-slate-800 pl-3">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span>Java 21 + Spring Boot</span>
          </div>
        </div>
      </div>
    </header>
  );
}
