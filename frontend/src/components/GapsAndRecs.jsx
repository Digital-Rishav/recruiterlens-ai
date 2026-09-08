import React from 'react';
import { AlertOctagon, Lightbulb } from 'lucide-react';

export default function GapsAndRecs({ experienceGaps = [], recommendations = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Experience Gaps */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-700/60 mb-4">
            <div className="p-1 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertOctagon className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Experience & Seniority Gaps</h3>
          </div>

          {experienceGaps.length > 0 ? (
            <ul className="space-y-2.5">
              {experienceGaps.map((gap, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-emerald-400 italic">
              No significant experience gaps detected.
            </p>
          )}
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-700/60 mb-4">
            <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Lightbulb className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Actionable Recommendations</h3>
          </div>

          {recommendations.length > 0 ? (
            <ul className="space-y-2.5">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No specific recommendations provided.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
