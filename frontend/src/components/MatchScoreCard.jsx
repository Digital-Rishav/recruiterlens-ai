import React from 'react';
import { Award, CheckCircle, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

export default function MatchScoreCard({ score = 0, recommendation = '', reason = '' }) {
  // Score-dependent color theming
  const getScoreTheme = (val) => {
    if (val >= 80) {
      return {
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        ring: '#10b981',
        label: 'Strong Match',
      };
    }
    if (val >= 60) {
      return {
        text: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/30',
        ring: '#6366f1',
        label: 'Moderate Match',
      };
    }
    if (val >= 40) {
      return {
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        ring: '#f59e0b',
        label: 'Borderline Match',
      };
    }
    return {
      text: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      ring: '#f43f5e',
      label: 'Low Compatibility',
    };
  };

  // Recommendation pill formatting
  const getRecommendationBadge = (rec) => {
    const norm = (rec || '').toUpperCase();
    if (norm.includes('SHORTLIST') || norm === 'YES') {
      return {
        label: 'SHORTLIST CANDIDATE',
        classes: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20',
        icon: <CheckCircle className="h-4 w-4 text-emerald-400" />,
      };
    }
    if (norm.includes('CONSIDER') || norm === 'MAYBE') {
      return {
        label: 'CONSIDER / FURTHER REVIEW',
        classes: 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-amber-500/20',
        icon: <AlertTriangle className="h-4 w-4 text-amber-400" />,
      };
    }
    return {
      label: 'DO NOT SHORTLIST',
      classes: 'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-rose-500/20',
      icon: <XCircle className="h-4 w-4 text-rose-400" />,
    };
  };

  const theme = getScoreTheme(score);
  const badge = getRecommendationBadge(recommendation);

  // SVG circular gauge math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Score Ring */}
        <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-700/60 pb-6 md:pb-0 md:pr-6">
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-700/50"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke={theme.ring}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold tracking-tight ${theme.text}`}>
                {score}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold ${theme.bg} ${theme.text} ${theme.border} border`}>
              {theme.label}
            </span>
          </div>
        </div>

        {/* Shortlist Verdict & Executive Summary */}
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              <span>Verdict & Hiring Summary</span>
            </div>

            <div className={`px-3.5 py-1 rounded-full border text-xs font-bold tracking-wide shadow-sm flex items-center space-x-2 ${badge.classes}`}>
              {badge.icon}
              <span>{badge.label}</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {reason || 'No executive summary provided for this candidate.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
