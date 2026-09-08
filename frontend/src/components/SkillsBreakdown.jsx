import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function SkillsBreakdown({ matchedSkills = [], missingSkills = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Matched Skills */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Matched Skills</h3>
            </div>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {matchedSkills.length} aligned
            </span>
          </div>

          {matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic py-2">
              No overlapping skills directly identified.
            </p>
          )}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
                <XCircle className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Missing or Unverified Skills</h3>
            </div>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {missingSkills.length} missing
            </span>
          </div>

          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition"
                >
                  <XCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-400/80 italic py-2">
              Candidate covers all critical skills listed in the job description!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
