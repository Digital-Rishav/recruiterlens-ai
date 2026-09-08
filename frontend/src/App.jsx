import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import InputSection from './components/InputSection';
import MatchScoreCard from './components/MatchScoreCard';
import SkillsBreakdown from './components/SkillsBreakdown';
import GapsAndRecs from './components/GapsAndRecs';
import InterviewPrep from './components/InterviewPrep';
import LoadingState from './components/LoadingState';
import ErrorAlert from './components/ErrorAlert';
import { checkHealth, analyzeCandidate } from './services/api';
import { SAMPLE_PRESETS } from './data/sampleData';
import { Sparkles, ArrowDown, FileCheck, Layers, Bot } from 'lucide-react';

export default function App() {
  // Default to first realistic preset so the user sees immediate value
  const [resume, setResume] = useState(SAMPLE_PRESETS[0].resume);
  const [jobDescription, setJobDescription] = useState(SAMPLE_PRESETS[0].jobDescription);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [health, setHealth] = useState(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  const resultsRef = useRef(null);

  const fetchHealthStatus = async () => {
    setCheckingHealth(true);
    try {
      const data = await checkHealth();
      setHealth(data);
    } catch (err) {
      console.error('Health check error:', err);
    } finally {
      setCheckingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeCandidate({ resume, jobDescription });
      setResult(data);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* SaaS Navigation */}
      <Navbar
        health={health}
        checkingHealth={checkingHealth}
        onRefreshHealth={fetchHealthStatus}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-sm">
            <Bot className="h-3.5 w-3.5 text-indigo-400" />
            <span>Powered by Gemini 2.5 Flash & Spring Boot 3</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Instant AI Candidate-Job <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Compatibility Intelligence
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Evaluate resume-to-role alignment in seconds. Uncover skill matches, seniority gaps, targeted interview questions, and clear shortlist verdicts.
          </p>
        </div>

        {/* Error Banner */}
        <ErrorAlert error={error} onDismiss={() => setError(null)} />

        {/* Input Workspaces */}
        <InputSection
          resume={resume}
          setResume={setResume}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        {/* Loading Progress State */}
        {isLoading && <LoadingState />}

        {/* Results Presentation */}
        {result && !isLoading && (
          <div ref={resultsRef} className="space-y-6 pt-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Compatibility Evaluation Report</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Generated via Gemini
              </span>
            </div>

            {/* Score & Shortlist Verdict */}
            <MatchScoreCard
              score={result.matchScore}
              recommendation={result.shortlistRecommendation}
              reason={result.shortlistReason}
            />

            {/* Matched & Missing Skills Grid */}
            <SkillsBreakdown
              matchedSkills={result.matchedSkills}
              missingSkills={result.missingSkills}
            />

            {/* Gaps & Strategic Recommendations */}
            <GapsAndRecs
              experienceGaps={result.experienceGaps}
              recommendations={result.recommendations}
            />

            {/* Tailored Interview Questions */}
            <InterviewPrep questions={result.interviewQuestions} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">RecruiterLens AI</span>
            <span>—</span>
            <span>Clean Architecture MVP</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Java 21</span>
            <span>•</span>
            <span>Spring Boot 3.4</span>
            <span>•</span>
            <span>React + Vite</span>
            <span>•</span>
            <span>Gemini API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
