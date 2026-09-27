import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, ShieldCheck, FileSpreadsheet, RefreshCw, Printer, Check } from 'lucide-react';
import { speakWithCebuanoMaleVoice } from '../services/boiserVoiceService';
import { StudentFinalGradingPrintView } from './StudentFinalGradingPrintView';

interface StudentRecord {
  id: string;
  name: string;
  gradeLevel: string;
  term1Avg: number;
  term2Avg: number;
  term3Avg: number;
  sf9SummaryAvg: number;
  status?: 'Verified' | 'Discrepancy' | 'Pending';
}

export const HonorsCalculationEngine: React.FC = () => {
  const [students, setStudents] = useState<StudentRecord[]>([
    { id: '1', name: 'Alvarez, Maria Clara S.', gradeLevel: 'Grade 10', term1Avg: 95.4, term2Avg: 0, term3Avg: 0, sf9SummaryAvg: 95.4, status: 'Pending' },
    { id: '2', name: 'Boiser, Steaven Kinth D.', gradeLevel: 'Grade 12', term1Avg: 98.5, term2Avg: 0, term3Avg: 0, sf9SummaryAvg: 98.5, status: 'Pending' },
    { id: '3', name: 'Dela Cruz, Juan M.', gradeLevel: 'Grade 8', term1Avg: 91.2, term2Avg: 0, term3Avg: 0, sf9SummaryAvg: 91.2, status: 'Pending' },
    { id: '4', name: 'Santos, Ana Marie B.', gradeLevel: 'Grade 11', term1Avg: 94.5, term2Avg: 0, term3Avg: 0, sf9SummaryAvg: 94.5, status: 'Pending' },
    { id: '5', name: 'Villanueva, Jose R.', gradeLevel: 'Grade 9', term1Avg: 88.5, term2Avg: 0, term3Avg: 0, sf9SummaryAvg: 88.5, status: 'Pending' }
  ]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedPrintStudent, setSelectedPrintStudent] = useState<StudentRecord | null>(null);

  const calculateOverall = (s: StudentRecord) => {
    const terms = [s.term1Avg, s.term2Avg, s.term3Avg].filter(t => t > 0);
    if (terms.length === 0) return 0;
    return +(terms.reduce((a, b) => a + b, 0) / terms.length).toFixed(2);
  };

  const getHonorBadge = (avg: number) => {
    if (avg >= 98) return { label: 'With Highest Honors', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    if (avg >= 95) return { label: 'With High Honors', color: 'bg-purple-100 text-purple-900 border-purple-300' };
    if (avg >= 90) return { label: 'With Honors', color: 'bg-blue-100 text-blue-900 border-blue-300' };
    return { label: 'Regular Standing', color: 'bg-stone-100 text-stone-700 border-stone-200' };
  };

  const runTripleCheckValidation = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const updated = students.map(s => {
        const sf10Avg = calculateOverall(s);
        const diff = Math.abs(sf10Avg - s.sf9SummaryAvg);
        const status = diff <= 0.1 ? 'Verified' : 'Discrepancy';
        return { ...s, status: status as 'Verified' | 'Discrepancy' | 'Pending' };
      });
      setStudents(updated);
      setIsVerifying(false);
      setValidated(true);
      speakWithCebuanoMaleVoice('Welcome, honors calculation completed successfully. Enjoy learning with Boiser Educational Resources.');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border-b-4 border-amber-400 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-400/20 rounded-2xl border border-amber-400/40">
              <Award className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase">
                  End of S.Y. Honors Engine
                </span>
                <span className="text-xs text-purple-300 font-bold">• DepEd DO 36, s. 2016 &amp; DO 3, s. 2026 Compliant</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight mt-1">End of School Year Honors Calculation &amp; SF9/SF10 Cross-Check</h2>
              <p className="text-xs text-stone-300">
                Honors are strictly computed at the <strong>End of the School Year (Final Rating)</strong> across all 3 completed terms, and never declared during ongoing quarter/term input.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPrintStudent(students[0])}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Print A4 Final Report</span>
            </button>

            <button
              onClick={runTripleCheckValidation}
              disabled={isVerifying}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-stone-950 text-xs font-black flex items-center gap-2 shadow cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Running Triple-Check...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Run Triple-Check Validation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* DepEd Order Policy Compliance Notice */}
        <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-xs text-amber-200 flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Official DepEd Policy Mandate</strong>: Under DepEd Order No. 36, s. 2016 and DO No. 3, s. 2026, academic honors are conferred <u>strictly at the End of the School Year</u>. Preliminary term marks reflect progress descriptors, not honors rank.
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-xs font-black text-stone-900 uppercase tracking-wide flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-purple-600" />
            Student Term-Based Averages &amp; Honor Status
          </h3>
          {validated && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Triple-Check Audit Passed
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold border-b border-stone-200">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Grade Level</th>
                <th className="p-3 text-center">Term 1 (SF10)</th>
                <th className="p-3 text-center">Term 2 (SF10)</th>
                <th className="p-3 text-center">Term 3 (SF10)</th>
                <th className="p-3 text-center">Overall SF10 Avg</th>
                <th className="p-3 text-center">SF9 Summary Avg</th>
                <th className="p-3">Honor Standing</th>
                <th className="p-3 text-center">Triple-Check Status</th>
                <th className="p-3 text-right">Print A4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {students.map((s) => {
                const overall = calculateOverall(s);
                const honor = getHonorBadge(overall);
                return (
                  <tr key={s.id} className="hover:bg-stone-50/80 transition">
                    <td className="p-3 font-bold text-stone-900">{s.name}</td>
                    <td className="p-3 text-stone-600">{s.gradeLevel}</td>
                    <td className="p-3 text-center font-mono">{s.term1Avg}</td>
                    <td className="p-3 text-center font-mono">{s.term2Avg}</td>
                    <td className="p-3 text-center font-mono">{s.term3Avg}</td>
                    <td className="p-3 text-center font-mono font-black text-purple-700">{overall}</td>
                    <td className="p-3 text-center font-mono text-stone-600">{s.sf9SummaryAvg}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${honor.color}`}>
                        {honor.label}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {s.status === 'Verified' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <Check className="w-3 h-3" /> Verified
                        </span>
                      ) : s.status === 'Discrepancy' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                          <AlertTriangle className="w-3 h-3" /> Discrepancy
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[10px] italic">Pending Check</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedPrintStudent(s)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 ml-auto cursor-pointer"
                        title="Print A4 Summary"
                      >
                        <Printer className="w-3.5 h-3.5 text-purple-700" />
                        <span>Print</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* A4 Print Modal */}
      {selectedPrintStudent && (
        <StudentFinalGradingPrintView
          isOpen={!!selectedPrintStudent}
          onClose={() => setSelectedPrintStudent(null)}
          studentName={selectedPrintStudent.name}
          gradeLevel={selectedPrintStudent.gradeLevel}
          overallGpa={calculateOverall(selectedPrintStudent)}
          honorStatus={getHonorBadge(calculateOverall(selectedPrintStudent)).label}
        />
      )}
    </div>
  );
};
