import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, CircleDashed } from 'lucide-react';

const ANALYSIS_STEPS = [
  'Extracting technical proficiencies and timeline...',
  'Evaluating job requirements against candidate background...',
  'Computing skill alignment and identifying experience gaps...',
  'Formulating targeted interview questions and executive recommendation...',
];

export default function LoadingState() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-850/80 border border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
      {/* Animated glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />

      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 shadow-inner">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">Running RecruiterLens AI Analysis</h3>
          <p className="text-sm text-slate-400 mt-1">
            Gemini is deep-evaluating candidate-role compatibility and synthesizing key insights.
          </p>
        </div>

        {/* Step Progression */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-left space-y-3">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={step} className="flex items-center space-x-3 text-xs">
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-indigo-400 animate-spin shrink-0" />
                ) : (
                  <CircleDashed className="h-4 w-4 text-slate-600 shrink-0" />
                )}
                <span
                  className={`${
                    isCompleted
                      ? 'text-slate-400 line-through'
                      : isCurrent
                      ? 'text-white font-medium'
                      : 'text-slate-600'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
