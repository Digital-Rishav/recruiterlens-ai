import React, { useState } from 'react';
import { HelpCircle, Copy, Check, Sparkles } from 'lucide-react';

export default function InterviewPrep({ questions = [] }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-lg bg-purple-500/10 text-purple-400">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Targeted Interview Questions</h3>
            <p className="text-[11px] text-slate-400">
              AI-generated questions tailored to investigate the candidate's gaps and confirm depth
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyAll}
          type="button"
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-300 transition flex items-center space-x-1.5 border border-slate-600/50"
        >
          {copiedAll ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-300">All Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-400" />
              <span>Copy All Questions</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((question, idx) => {
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={idx}
              className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-750 hover:border-indigo-500/40 rounded-xl p-3.5 transition-all flex items-start justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {question}
                </p>
              </div>

              <button
                onClick={() => handleCopy(question, idx)}
                type="button"
                className="opacity-60 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
                title="Copy question"
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
