import React from 'react';
import { AlertTriangle, X, Terminal, Key } from 'lucide-react';

export default function ErrorAlert({ error, onDismiss }) {
  if (!error) return null;

  const isKeyError = error.message?.includes('GEMINI_API_KEY') || error.status === 503;

  return (
    <div className="bg-rose-950/40 border border-rose-800/80 rounded-2xl p-5 shadow-xl relative text-rose-100">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-rose-200">
              {error.title || 'Analysis Failed'}
            </h4>
            <p className="text-xs text-rose-300 leading-relaxed">
              {error.message}
            </p>

            {error.details && error.details.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-rose-400/90 list-disc list-inside">
                {error.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            )}

            {isKeyError && (
              <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-mono text-slate-300 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-400 font-sans font-semibold">
                  <Key className="h-3.5 w-3.5" />
                  <span>How to configure your Gemini API Key:</span>
                </div>
                <p className="text-slate-400 font-sans">
                  Set the key in your terminal before launching the backend:
                </p>
                <div className="bg-slate-950 px-3 py-2 rounded-lg text-emerald-400 text-[11px] overflow-x-auto">
                  <code>$env:GEMINI_API_KEY = "AIzaSy..."</code>
                </div>
                <p className="text-slate-400 font-sans">
                  Or enable mock mode for immediate testing:
                </p>
                <div className="bg-slate-950 px-3 py-2 rounded-lg text-emerald-400 text-[11px] overflow-x-auto">
                  <code>$env:GEMINI_MOCK_MODE = "true"</code>
                </div>
              </div>
            )}
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg hover:bg-rose-900/40 text-rose-400 hover:text-rose-200 transition shrink-0"
            title="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
