import React, { useState } from 'react';
import { Lock, Unlock, Send, AlertTriangle, FileDown } from 'lucide-react';

import { useAuth, REGISTRAR_SHS, REGISTRAR_JHS } from '../context/AuthContext';
import { generateGradingSummaryPDF } from '../utils/gradingPdfExporter';

interface GradeTally {
  term1: number;
  term2: number;
  term3: number;
}

export const GradeTallyInputForm = ({ sectionId, onPush }: { sectionId: string, onPush: (tally: GradeTally, code: string) => void }) => {
  const { currentUser, isOwner } = useAuth();
  const [tally, setTally] = useState<GradeTally>({ term1: 88, term2: 90, term3: 92 });
  const [code, setCode] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  
  const canPush = isOwner || 
                 currentUser.email === REGISTRAR_SHS || 
                 currentUser.email === REGISTRAR_JHS ||
                 (currentUser.role as string) === 'adviser';

  const handleExportPDF = () => {
    const finalGrade = Math.round((tally.term1 + tally.term2 + tally.term3) / 3) || 0;
    generateGradingSummaryPDF({
      title: `Official Section Grade Tally & Trimester Summary Report`,
      schoolName: 'Lanao del Norte National Comprehensive High School (LNNCHS)',
      sectionName: sectionId,
      adviserName: currentUser?.name || 'Class Adviser',
      gradingPeriod: 'SY 2026-2027 (DepEd Order No. 009 & 015, s. 2026)',
      generalAverage: finalGrade,
      descriptor: finalGrade >= 90 ? 'Outstanding' : finalGrade >= 85 ? 'Very Satisfactory' : finalGrade >= 80 ? 'Satisfactory' : 'Fairly Satisfactory',
      subjectData: [
        {
          subjectTitle: 'Trimester Consolidated Grade Tally',
          writtenWorksWeight: '30%',
          performanceTasksWeight: '50%',
          quarterlyExamWeight: '20%',
          term1: tally.term1,
          term2: tally.term2,
          term3: tally.term3,
          finalGrade,
          descriptor: finalGrade >= 90 ? 'Outstanding' : finalGrade >= 85 ? 'Very Satisfactory' : 'Satisfactory',
          remarks: finalGrade >= 75 ? 'PASSED & PROMOTED' : 'REMEDIATION'
        }
      ]
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-stone-900">Final Grade Tally Input & PDF Report</h3>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <FileDown size={14} />
          <span>Export Formatted PDF</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {['term1', 'term2', 'term3'].map((t) => (
          <div key={t}>
            <label className="text-[10px] font-bold text-stone-500 uppercase">{t}</label>
            <input 
              type="number"
              value={tally[t as keyof GradeTally]}
              onChange={(e) => setTally({...tally, [t]: Number(e.target.value)})}
              className="w-full p-2 rounded-xl border border-stone-300 text-xs font-bold"
              disabled={isLocked}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          type="password"
          placeholder="BOISER CODE #"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-2 rounded-xl border border-stone-300 text-xs font-mono"
        />
        <button 
          onClick={() => { 
            if(!canPush) { alert('Unauthorized: Only Advisers or Registrars can push final tallies.'); return; }
            if(code === 'BOISER_SECRET_123') { setIsLocked(true); onPush(tally, code); } else { alert('Invalid Code'); } 
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black text-white ${isLocked ? 'bg-emerald-600' : 'bg-[#092B62]'} ${!canPush ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLocked ? <Lock size={14} /> : <Send size={14} />}
        </button>
      </div>
    </div>
  );
};
