import React from 'react';
import { ShieldCheck, Award, Target, CheckCircle2 } from 'lucide-react';

export const TechProRubric: React.FC = () => {
  const criteria = [
    { level: 5, label: 'Advanced / Mastered', desc: 'Performs task independently with zero errors, follows all safety protocols, and demonstrates deep conceptual understanding.' },
    { level: 4, label: 'Proficient', desc: 'Performs task with minimal supervision, minor non-critical errors, and correct application of procedural steps.' },
    { level: 3, label: 'Developing', desc: 'Requires moderate guidance to complete tasks; follows safety rules but lacks speed and precision.' },
    { level: 2, label: 'Emerging', desc: 'Can identify tools/steps but requires constant supervision and correction during performance.' },
    { level: 1, label: 'Beginning', desc: 'Demonstrates limited awareness of tools or procedures; cannot perform task without direct hands-on assistance.' }
  ];

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 space-y-4 shadow-sm animate-in fade-in duration-300">
      <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-amber-400">
          <Award size={20} />
        </div>
        <div>
          <h3 className="text-sm font-black text-stone-900 uppercase tracking-tight">DepEd Regional TechPro 5-Point Competency Rubric</h3>
          <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">In accordance with Memorandum No. 018, s. 2026</p>
        </div>
      </div>

      <div className="space-y-2">
        {criteria.map((c) => (
          <div key={c.level} className="flex gap-4 p-3 rounded-2xl bg-white border border-stone-100 hover:border-blue-300 transition group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
              c.level >= 4 ? 'bg-emerald-100 text-emerald-700' : 
              c.level === 3 ? 'bg-blue-100 text-blue-700' : 
              'bg-amber-100 text-amber-700'
            }`}>
              {c.level}
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-black text-stone-800 group-hover:text-blue-900 transition">{c.label}</div>
              <p className="text-[11px] text-stone-500 leading-snug">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center gap-2 text-[10px] text-emerald-700 font-black uppercase">
        <ShieldCheck size={14} />
        <span>Validated for SY 2026-2027 Workplace Simulations</span>
      </div>
    </div>
  );
};
