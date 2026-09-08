import React from 'react';
import { FileText, Briefcase, Sparkles, Trash2, Clipboard, Zap } from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/sampleData';

export default function InputSection({
  resume,
  setResume,
  jobDescription,
  setJobDescription,
  onAnalyze,
  isLoading,
}) {
  const handleLoadPreset = (preset) => {
    setResume(preset.resume);
    setJobDescription(preset.jobDescription);
  };

  const handleClear = () => {
    setResume('');
    setJobDescription('');
  };

  const isFormValid = resume.trim().length >= 20 && jobDescription.trim().length >= 20;

  return (
    <div className="space-y-4">
      {/* Demo Presets Toolbar */}
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <Zap className="h-4 w-4 text-amber-400" />
          <span>Quick Demo Presets:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleLoadPreset(preset)}
              type="button"
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-indigo-600/20 hover:text-indigo-300 hover:border-indigo-500/40 border border-slate-700 text-slate-300 transition flex items-center space-x-1.5"
            >
              <span>{preset.name}</span>
            </button>
          ))}

          {(resume || jobDescription) && (
            <button
              onClick={handleClear}
              type="button"
              className="px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition flex items-center space-x-1"
              title="Clear all inputs"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Dual Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Candidate Resume */}
        <div className="flex flex-col bg-slate-800/60 border border-slate-750 rounded-2xl p-4 transition-all focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold text-white">Candidate Resume</h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {resume.length} chars
            </span>
          </div>

          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste raw resume text, markdown, or candidate bio here (minimum 20 characters)..."
            rows={12}
            className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 resize-y focus:outline-none font-mono leading-relaxed"
          />

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/40 mt-2">
            <span>Supports raw text, skills list, employment history</span>
            {resume.trim().length > 0 && resume.trim().length < 20 && (
              <span className="text-amber-400 font-medium">At least 20 chars required</span>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="flex flex-col bg-slate-800/60 border border-slate-750 rounded-2xl p-4 transition-all focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Briefcase className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold text-white">Target Job Description</h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {jobDescription.length} chars
            </span>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste target job specifications, required technologies, responsibilities, and seniority level..."
            rows={12}
            className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 resize-y focus:outline-none font-mono leading-relaxed"
          />

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/40 mt-2">
            <span>Include required qualifications, stack, and seniority</span>
            {jobDescription.trim().length > 0 && jobDescription.trim().length < 20 && (
              <span className="text-amber-400 font-medium">At least 20 chars required</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onAnalyze}
          disabled={!isFormValid || isLoading}
          type="button"
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg flex items-center justify-center space-x-2.5 ${
            isFormValid && !isLoading
              ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
          }`}
        >
          <Sparkles className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Analyzing Compatibility with Gemini...' : 'Analyze Candidate Compatibility'}</span>
        </button>
      </div>
    </div>
  );
}
