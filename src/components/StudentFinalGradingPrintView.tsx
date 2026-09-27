import React, { useRef } from 'react';
import { Printer, X, Download, ShieldCheck, CheckCircle2, Award, GraduationCap } from 'lucide-react';
import { transmuteInitialGrade, getQualitativeDescriptor } from '../data/gradingRules';

export interface SubjectGradeItem {
  subjectCode: string;
  subjectTitle: string;
  term1Grade: number;
  term2Grade: number;
  term3Grade: number;
  finalRating: number;
  remarks: 'PASSED' | 'FAILED' | 'REMEDIAL';
}

export interface StudentPrintSummaryProps {
  studentName: string;
  lrnId?: string;
  gradeLevel: string;
  section?: string;
  schoolYear?: string;
  schoolName?: string;
  trackStrand?: string;
  teacherName?: string;
  principalName?: string;
  subjectGrades?: SubjectGradeItem[];
  overallGpa?: number;
  honorStatus?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentFinalGradingPrintView: React.FC<StudentPrintSummaryProps> = ({
  studentName = 'Juan Dela Cruz',
  lrnId = '136514260001',
  gradeLevel = 'Grade 11',
  section = 'STEM ABELLS',
  schoolYear = 'SY 2026-2027',
  schoolName = 'Lanao del Norte National Comprehensive High School',
  trackStrand = 'Technical-Vocational-Livelihood (TVL) / Academic STEM',
  teacherName = 'Steaven Kinth D. Boiser',
  principalName = 'ANISAH A. SINAL, PRINCIPAL III',
  subjectGrades = [
    { subjectCode: 'ENG11-COMM', subjectTitle: 'Oral Communication in Context', term1Grade: 92, term2Grade: 94, term3Grade: 95, finalRating: 93.6, remarks: 'PASSED' },
    { subjectCode: 'MATH11-GEN', subjectTitle: 'General Mathematics', term1Grade: 88, term2Grade: 90, term3Grade: 91, finalRating: 89.6, remarks: 'PASSED' },
    { subjectCode: 'SCI11-EARTH', subjectTitle: 'Earth and Life Science', term1Grade: 95, term2Grade: 96, term3Grade: 97, finalRating: 96.0, remarks: 'PASSED' },
    { subjectCode: 'AP11-PPG', subjectTitle: 'Philippine Politics and Governance', term1Grade: 91, term2Grade: 93, term3Grade: 94, finalRating: 92.6, remarks: 'PASSED' },
    { subjectCode: 'TVL11-ICT', subjectTitle: 'Computer Systems Servicing (CSS)', term1Grade: 96, term2Grade: 97, term3Grade: 98, finalRating: 97.0, remarks: 'PASSED' },
  ],
  overallGpa = 93.76,
  honorStatus = 'With High Honors',
  isOpen,
  onClose,
}) => {
  const printContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const calculatedGpa = overallGpa || +(
    subjectGrades.reduce((acc, curr) => acc + curr.finalRating, 0) / (subjectGrades.length || 1)
  ).toFixed(2);

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Container holding controls + printable sheet */}
      <div className="bg-stone-200 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-stone-300">
        
        {/* Top Control Bar (Hidden on Print) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-amber-400 text-stone-950 rounded-xl font-bold">
              <Printer className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-black tracking-tight">Official A4 Student Grading Summary</h3>
              <p className="text-[11px] text-slate-400 font-mono">DepEd DO 3, s. 2026 MATATAG Standard Print Layout</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerPrint}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow flex items-center gap-2 cursor-pointer transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print A4 Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet (A4 Dimensions) */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 flex justify-center bg-stone-300">
          <div
            ref={printContainerRef}
            className="a4-printable-sheet bg-white text-stone-900 p-8 sm:p-12 rounded-xl shadow-xl w-full max-w-[210mm] min-h-[297mm] mx-auto text-xs space-y-6 font-serif border border-stone-300 relative"
          >
            {/* Embedded Print CSS */}
            <style>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                .no-print, header, nav, footer, button, .chathead-container {
                  display: none !important;
                }
                .a4-printable-sheet, .a4-printable-sheet * {
                  visibility: visible !important;
                }
                .a4-printable-sheet {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 210mm !important;
                  min-height: 297mm !important;
                  margin: 0 !important;
                  padding: 15mm !important;
                  box-shadow: none !important;
                  border: none !important;
                  background: white !important;
                  color: black !important;
                  font-size: 11pt !important;
                }
                @page {
                  size: A4 portrait;
                  margin: 0;
                }
              }
            `}</style>

            {/* Official DepEd Header */}
            <div className="text-center space-y-1 border-b-2 border-stone-900 pb-4">
              <div className="flex items-center justify-between px-4">
                <div className="w-16 h-16 rounded-full border border-stone-800 p-1 flex items-center justify-center font-bold text-[10px] text-stone-700 font-sans">
                  DEPED LOGO
                </div>
                <div className="space-y-0.5">
                  <p className="uppercase text-[10px] tracking-widest font-mono text-stone-600 font-sans">Republic of the Philippines</p>
                  <p className="font-bold uppercase text-xs text-stone-900 font-sans">Department of Education</p>
                  <p className="text-[11px] font-semibold text-stone-800 font-sans">Region X – Northern Mindanao</p>
                  <p className="text-[11px] text-stone-700 font-sans">Division of Lanao del Norte</p>
                  <h1 className="text-sm font-black uppercase text-stone-900 pt-1 font-sans">{schoolName}</h1>
                </div>
                <div className="w-16 h-16 rounded-full border border-stone-800 p-1 flex items-center justify-center font-bold text-[10px] text-stone-700 font-sans">
                  SEAL
                </div>
              </div>
              <div className="pt-2">
                <span className="inline-block px-4 py-1 bg-stone-900 text-white font-sans text-xs font-black uppercase tracking-wider rounded-sm">
                  OFFICIAL STUDENT FINAL GRADING SUMMARY &amp; REPORT CARD (SY 2026-2027)
                </span>
              </div>
            </div>

            {/* Student Profile Info Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-sans text-[11px] bg-stone-50 p-4 rounded-lg border border-stone-300">
              <div>
                <span className="text-stone-500 uppercase text-[10px] block font-semibold">Learner Name:</span>
                <strong className="text-stone-900 text-sm font-black">{studentName}</strong>
              </div>
              <div>
                <span className="text-stone-500 uppercase text-[10px] block font-semibold">Learner Reference No. (LRN):</span>
                <strong className="text-stone-900 font-mono text-xs">{lrnId}</strong>
              </div>
              <div>
                <span className="text-stone-500 uppercase text-[10px] block font-semibold">Grade &amp; Section:</span>
                <span className="font-bold text-stone-800">{gradeLevel} — {section}</span>
              </div>
              <div>
                <span className="text-stone-500 uppercase text-[10px] block font-semibold">Track &amp; Strand / Specialization:</span>
                <span className="font-medium text-stone-800">{trackStrand}</span>
              </div>
              <div>
                <span className="text-stone-500 uppercase text-[10px] block font-semibold">School Year &amp; Term Sequence:</span>
                <span className="font-bold text-stone-800">{schoolYear} (Three-Term Calendar)</span>
              </div>
              <div>
                <span className="text-stone-500 uppercase text-[10px] block font-semibold">Class Adviser:</span>
                <span className="font-bold text-stone-800">{teacherName}</span>
              </div>
            </div>

            {/* Subject Grades Table */}
            <div className="space-y-2">
              <h3 className="font-sans font-black text-xs uppercase tracking-wide text-stone-900 border-b border-stone-400 pb-1 flex justify-between items-center">
                <span>I. QUARTERLY SUBJECT SCHOLASTIC PERFORMANCE (DO 3, s. 2026)</span>
                <span className="font-mono text-[10px] text-stone-500">Transmuted Ratings</span>
              </h3>

              <table className="w-full border-collapse border border-stone-800 font-sans text-[11px]">
                <thead>
                  <tr className="bg-stone-200 text-stone-900 uppercase font-black text-[10px] border-b border-stone-800">
                    <th className="p-2 text-left border-r border-stone-800">Learning Area / Subject</th>
                    <th className="p-2 text-center border-r border-stone-800 w-16">Term 1</th>
                    <th className="p-2 text-center border-r border-stone-800 w-16">Term 2</th>
                    <th className="p-2 text-center border-r border-stone-800 w-16">Term 3</th>
                    <th className="p-2 text-center border-r border-stone-800 w-20">Final Rating</th>
                    <th className="p-2 text-center border-r border-stone-800 w-28">Descriptor</th>
                    <th className="p-2 text-center w-20">Action Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectGrades.map((sub, idx) => {
                    const desc = getQualitativeDescriptor(sub.finalRating);
                    return (
                      <tr key={idx} className="border-b border-stone-300">
                        <td className="p-2 border-r border-stone-800 font-bold text-stone-900">
                          {sub.subjectTitle}
                          <span className="block font-mono text-[9px] text-stone-500 font-normal">{sub.subjectCode}</span>
                        </td>
                        <td className="p-2 text-center border-r border-stone-800 font-mono">{sub.term1Grade}</td>
                        <td className="p-2 text-center border-r border-stone-800 font-mono">{sub.term2Grade}</td>
                        <td className="p-2 text-center border-r border-stone-800 font-mono">{sub.term3Grade}</td>
                        <td className="p-2 text-center border-r border-stone-800 font-mono font-black text-stone-900">{sub.finalRating}</td>
                        <td className="p-2 text-center border-r border-stone-800 text-[10px] font-semibold">{desc.descriptor}</td>
                        <td className="p-2 text-center font-bold text-[10px]">
                          <span className={sub.remarks === 'PASSED' ? 'text-emerald-900' : 'text-rose-900'}>
                            {sub.remarks}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-stone-100 font-black border-t-2 border-stone-800">
                    <td colSpan={4} className="p-2.5 text-right border-r border-stone-800 uppercase text-[10px]">
                      General Average (GPA):
                    </td>
                    <td className="p-2.5 text-center border-r border-stone-800 font-mono text-sm text-stone-900">
                      {calculatedGpa}
                    </td>
                    <td colSpan={2} className="p-2.5 text-center uppercase text-[10px] text-stone-800">
                      {honorStatus ? (
                        <span className="font-black text-purple-950">
                          {honorStatus} <span className="text-[9px] font-normal text-stone-500 block">(End of S.Y. Final Rating)</span>
                        </span>
                      ) : (
                        getQualitativeDescriptor(calculatedGpa).descriptor
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Honors & Transmutation Scale Info */}
            <div className="grid grid-cols-2 gap-4 font-sans text-[10px]">
              <div className="p-3 border border-stone-300 rounded bg-stone-50 space-y-1">
                <span className="font-bold text-stone-900 uppercase block border-b border-stone-200 pb-0.5">
                  DepEd Order No. 3, s. 2026 Grading Scale
                </span>
                <ul className="space-y-0.5 text-stone-700">
                  <li><strong>90 – 100</strong>: Outstanding (O)</li>
                  <li><strong>85 – 89</strong>: Very Satisfactory (VS)</li>
                  <li><strong>80 – 84</strong>: Satisfactory (S)</li>
                  <li><strong>75 – 79</strong>: Fairly Satisfactory (FS)</li>
                  <li><strong>Below 75</strong>: Did Not Meet Expectations (Did Not Pass)</li>
                </ul>
              </div>

              <div className="p-3 border border-stone-300 rounded bg-stone-50 space-y-1">
                <span className="font-bold text-stone-900 uppercase block border-b border-stone-200 pb-0.5">
                  Academic Honors (DO 36, s. 2016 &amp; DO 3, s. 2026)
                </span>
                <ul className="space-y-0.5 text-stone-700">
                  <li><strong>98 – 100</strong>: With Highest Honors (No grade below 90)</li>
                  <li><strong>95 – 97</strong>: With High Honors (No grade below 85)</li>
                  <li><strong>90 – 94</strong>: With Honors (No grade below 85)</li>
                  <li className="pt-1 text-amber-900 font-bold">
                    ⚠️ Note: Honors are officially conferred at the <u>End of School Year</u>.
                  </li>
                </ul>
              </div>
            </div>

            {/* Official Signatures Section */}
            <div className="pt-8 font-sans space-y-8">
              <div className="grid grid-cols-3 gap-6 text-center text-[10px]">
                <div className="space-y-8">
                  <div className="border-b border-stone-900 pb-1">
                    <strong className="block text-xs uppercase font-bold text-stone-900">{teacherName}</strong>
                    <span className="text-stone-500 uppercase text-[9px] block">Class Adviser</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="border-b border-stone-900 pb-1">
                    <strong className="block text-xs uppercase font-bold text-stone-900">Dr. Robert H. Villanueva</strong>
                    <span className="text-stone-500 uppercase text-[9px] block">Department Head</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="border-b border-stone-900 pb-1">
                    <strong className="block text-xs uppercase font-bold text-stone-900">{principalName}</strong>
                    <span className="text-stone-500 uppercase text-[9px] block">School Principal / Administrator</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-[9px] font-mono text-stone-500 pt-4 border-t border-stone-200">
                Official DepEd LNNCHS Document • Generated via BOISER POWER TOOLS LITE • Date Printed: {new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
