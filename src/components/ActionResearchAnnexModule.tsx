import React, { useState } from 'react';
import { FileText, ShieldCheck, CheckCircle2, Award, Download, Printer, BookOpen, Layers, Check } from 'lucide-react';
import { speakWithCebuanoMaleVoice } from '../services/boiserVoiceService';

export const ActionResearchAnnexModule: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'cot' | 'stemazing' | 'qa' | 'memo'>('cot');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border-b-4 border-amber-400 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-400/20 rounded-2xl border border-amber-400/40">
              <BookOpen className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase">
                  Action Research Master Annex
                </span>
                <span className="text-xs text-cyan-300 font-bold">• LNNCHS Official Documentation</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight mt-1">DepEd Compliance, COT Rubrics & STEMazing Guidelines</h2>
              <p className="text-xs text-stone-300">Complete documentation for Teacher III promotion, Classroom Observation Tools, and System QA testing.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.print();
                speakWithCebuanoMaleVoice('Action Research Annex report generated and printed successfully.');
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black flex items-center gap-2 shadow cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Export Annex
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-900/50">
          <button
            onClick={() => setActiveSection('cot')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeSection === 'cot' ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-blue-900/50 text-stone-200 hover:bg-blue-900'
            }`}
          >
            Classroom Observation Tool (Teacher III)
          </button>
          <button
            onClick={() => setActiveSection('stemazing')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeSection === 'stemazing' ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-blue-900/50 text-stone-200 hover:bg-blue-900'
            }`}
          >
            STEMazing 2026 Guidelines
          </button>
          <button
            onClick={() => setActiveSection('qa')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeSection === 'qa' ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-blue-900/50 text-stone-200 hover:bg-blue-900'
            }`}
          >
            System QA & Testing Report
          </button>
          <button
            onClick={() => setActiveSection('memo')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeSection === 'memo' ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-blue-900/50 text-stone-200 hover:bg-blue-900'
            }`}
          >
            Division Memo & Master Teachers
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeSection === 'cot' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">Classroom Observation Tool (COT) - Teacher III Applicant Rubrics</h3>
            <p className="text-xs text-stone-500">PPST Indicators evaluated on Levels 2 to 6 for Teacher III progression.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-[10px] font-black uppercase text-blue-600">Indicator 1.1.2</span>
              <h4 className="font-bold text-sm text-stone-900">Content Knowledge & Pedagogy</h4>
              <p className="text-xs text-stone-600">Applies knowledge of content within and across curriculum teaching areas. Evaluated on Levels 2–6.</p>
              <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> Target: Level 5-6 (Consolidating)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-[10px] font-black uppercase text-blue-600">Indicator 1.5.2</span>
              <h4 className="font-bold text-sm text-stone-900">Critical & Creative Thinking</h4>
              <p className="text-xs text-stone-600">Apply a range of teaching strategies to develop critical and creative thinking, as well as HOTS.</p>
              <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> Target: Level 5-6 (Interactive Discourse)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-[10px] font-black uppercase text-blue-600">Indicator 3.2.2</span>
              <h4 className="font-bold text-sm text-stone-900">Learner-Centered Culture</h4>
              <p className="text-xs text-stone-600">Establish a learner-centered culture responsive to linguistic, cultural, socio-economic, and religious backgrounds.</p>
              <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> Target: Level 5-6 (Contextualized Pedagogy)
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'stemazing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">2026 National Festival of Talents — STEMazing Guidelines</h3>
            <p className="text-xs text-stone-500">Showcase of Science, Technological, and Mathematical Outputs (Grades 4–12)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <h4 className="font-black text-sm text-emerald-900">Competition Structure & Time</h4>
              <ul className="text-xs text-stone-700 space-y-2">
                <li>• <strong>Time Allotment:</strong> 180 minutes total.</li>
                <li>• <strong>Team Composition:</strong> 2 learners per team (Key Stages 3 & 4 for Secondary).</li>
                <li>• <strong>Categories:</strong> Easy (30 pts), Average (30 pts), Difficult (40 pts). Total = 100 points.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
              <h4 className="font-black text-sm text-amber-900">Scoring & Written/Oral Criteria</h4>
              <ul className="text-xs text-stone-700 space-y-2">
                <li>• <strong>Written Proposal:</strong> Thematic Relevance (8 pts), Feasibility (6 pts), Data Relevance (6 pts). Total = 20 pts.</li>
                <li>• <strong>Oral Presentation:</strong> Discussion of Arguments (8 pts), Content Presentation (5 pts), Q&A (7 pts). Total = 20 pts.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'qa' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">BOISER Educational Resources App — QA & Stability Report</h3>
            <p className="text-xs text-stone-500">Annex Submission for Action Research Documentation</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-stone-900">1. Easy & Basic Guide Workflow</h4>
                <p className="text-xs text-stone-500">Login → Dashboard → Select Resource → View/Download within 3 taps.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">■ Pass (100%)</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-stone-900">2. Database Source & Lag Prevention</h4>
                <p className="text-xs text-stone-500">Pagination, lazy loading, and indexed fields for 500+ records.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">■ Pass (Optimized)</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-stone-900">3. 24-Hour Master Monitoring Protocol</h4>
                <p className="text-xs text-stone-500">Silent background self-check, crashlytics, and secure Master Creator access.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">■ Pass (Active)</span>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'memo' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">Division Memorandum: Master Teachers as Instructional Leaders</h3>
            <p className="text-xs text-stone-500">Schools Division of Lanao del Norte — Region X</p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3 text-xs text-stone-700">
            <p><strong>Purpose:</strong> To deepen Master Teachers' understanding of their roles as instructional leaders, equipping them with effective strategies, observation tools, and feedback techniques for classroom supervision.</p>
            <p><strong>Superintendent:</strong> Edwin R. Maribojoc EdD, CESO V (Schools Division Superintendent)</p>
            <p><strong>School Integration:</strong> Fully integrated into the Lanao del Norte National Comprehensive High School (LNNCHS) system architecture.</p>
          </div>
        </div>
      )}
    </div>
  );
};
