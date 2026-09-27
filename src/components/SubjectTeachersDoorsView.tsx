import React, { useState } from 'react';
import {
  BookOpen,
  FileSpreadsheet,
  Sparkles,
  Users,
  Award,
  BarChart3,
  Calendar,
  Lock,
  ArrowLeft,
  Search,
  Check,
  X,
  Compass,
  Zap,
  FolderOpen,
  FileCheck2,
  Layers,
  Smartphone,
  MessageSquare,
  Camera,
  ShieldCheck,
  Building
} from 'lucide-react';
import { ILAWGenerator } from './ILAWGenerator';
import { ChalkScoringSheetToolkit } from './ChalkScoringSheetToolkit';
import { ImproveMyDocumentSuite } from './ImproveMyDocumentSuite';
import { SummativeHub } from './SummativeHub';
import { LASGenerator } from './LASGenerator';
import { LRMDSModule } from './LRMDSModule';
import { PosterMaker } from './PosterMaker';
import { useAuth } from '../context/AuthContext';

export interface SubjectTeacherDoorDef {
  id: string;
  code: string;
  subjectTitle: string;
  gradeLevel: string;
  trackOrStrand: string;
  facultyLead: string;
  description: string;
  colorScheme: string;
  badge: string;
}

export const SubjectTeachersDoorsView: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [selectedDoorId, setSelectedDoorId] = useState<string | null>(null);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeInternalTab, setActiveInternalTab] = useState<
    'ilaw_6command' | 'chalk_scoring' | 'doc_intelligence' | 'las_worksheets' | 'item_analysis' | 'lrmds' | '3d_visuals'
  >('ilaw_6command');

  const SUBJECT_TEACHER_DOORS: SubjectTeacherDoorDef[] = [
    {
      id: 'subj-bio-shs',
      code: 'SUBJ-SHS-BIO',
      subjectTitle: 'General Biology 1 & 2 (STEM)',
      gradeLevel: 'Grade 11 & 12',
      trackOrStrand: 'Academic Track — STEM',
      facultyLead: 'Steaven Kinth D. Boiser / Science Faculty',
      description: 'Photosynthesis, Cellular Bioenergetics, Genetics, Molecular Biology & Anatomy.',
      colorScheme: 'from-emerald-950 via-teal-900 to-slate-950',
      badge: 'SHS Science'
    },
    {
      id: 'subj-chem-shs',
      code: 'SUBJ-SHS-CHEM',
      subjectTitle: 'General Chemistry 1 & 2',
      gradeLevel: 'Grade 11 & 12',
      trackOrStrand: 'Academic Track — STEM',
      facultyLead: 'Chemistry Faculty Lead',
      description: 'Stoichiometry, Thermochemistry, Chemical Equilibrium & Organic Chemistry.',
      colorScheme: 'from-cyan-950 via-blue-900 to-slate-950',
      badge: 'SHS Science'
    },
    {
      id: 'subj-phys-shs',
      code: 'SUBJ-SHS-PHYS',
      subjectTitle: 'General Physics 1 & 2',
      gradeLevel: 'Grade 12',
      trackOrStrand: 'Academic Track — STEM',
      facultyLead: 'Physics Faculty Lead',
      description: 'Mechanics, Electromagnetism, Optics, Thermodynamics & Modern Physics.',
      colorScheme: 'from-indigo-950 via-blue-950 to-slate-950',
      badge: 'SHS Science'
    },
    {
      id: 'subj-pr-shs',
      code: 'SUBJ-SHS-PR',
      subjectTitle: 'Practical Research 1 & 2 (Inquiries)',
      gradeLevel: 'Grade 11 & 12',
      trackOrStrand: 'Core Curriculum — All Strands',
      facultyLead: 'Research Faculty Lead',
      description: 'Qualitative & Quantitative Research Methodologies, Statistical Analysis & BERF Mentorship.',
      colorScheme: 'from-purple-950 via-violet-900 to-slate-950',
      badge: 'SHS Research'
    },
    {
      id: 'subj-math-g7',
      code: 'SUBJ-JHS-M7',
      subjectTitle: 'Grade 7 Mathematics (MATATAG)',
      gradeLevel: 'Grade 7',
      trackOrStrand: 'JHS Core Curriculum',
      facultyLead: 'Grade 7 Math Subject Teachers',
      description: 'Sets, Real Number Systems, Measurements, Algebraic Expressions & Linear Equations.',
      colorScheme: 'from-blue-950 via-indigo-900 to-slate-950',
      badge: 'JHS Math'
    },
    {
      id: 'subj-sci-g7',
      code: 'SUBJ-JHS-S7',
      subjectTitle: 'Grade 7 Science (MATATAG)',
      gradeLevel: 'Grade 7',
      trackOrStrand: 'JHS Core Curriculum',
      facultyLead: 'Grade 7 Science Subject Teachers',
      description: 'Microscopy, Living Things, Mixtures, Solutions, Motion & Force.',
      colorScheme: 'from-emerald-950 via-teal-900 to-slate-950',
      badge: 'JHS Science'
    },
    {
      id: 'subj-eng-g8',
      code: 'SUBJ-JHS-E8',
      subjectTitle: 'Grade 8 English Communication & Literature',
      gradeLevel: 'Grade 8',
      trackOrStrand: 'JHS Core Curriculum',
      facultyLead: 'Grade 8 English Subject Teachers',
      description: 'Afro-Asian Literature, Modal Verbs, Informative Essay Writing & Public Speaking.',
      colorScheme: 'from-amber-950 via-yellow-900 to-slate-950',
      badge: 'JHS English'
    },
    {
      id: 'subj-fil-g9',
      code: 'SUBJ-JHS-F9',
      subjectTitle: 'Grade 9 Filipino (Panitikang Asyano)',
      gradeLevel: 'Grade 9',
      trackOrStrand: 'JHS Core Curriculum',
      facultyLead: 'Grade 9 Filipino Subject Teachers',
      description: 'Maikling Kwento, Dula, Tula, Sanaysay, Nobela at Balarilang Filipino.',
      colorScheme: 'from-red-950 via-rose-900 to-slate-950',
      badge: 'JHS Filipino'
    },
    {
      id: 'subj-ap-g10',
      code: 'SUBJ-JHS-AP10',
      subjectTitle: 'Grade 10 Araling Panlipunan (Kontemporaryong Isyu)',
      gradeLevel: 'Grade 10',
      trackOrStrand: 'JHS Core Curriculum',
      facultyLead: 'Grade 10 AP Subject Teachers',
      description: 'Isyung Pangkapaligiran, Pang-ekonomiya, Karapatang Pantao at Sibika.',
      colorScheme: 'from-rose-950 via-pink-900 to-slate-950',
      badge: 'JHS AP'
    },
    {
      id: 'subj-tle-ict',
      code: 'SUBJ-JHS-TLE',
      subjectTitle: 'TLE ICT / Computer Systems Servicing',
      gradeLevel: 'Grades 9 & 10',
      trackOrStrand: 'JHS TLE & TVL Track',
      facultyLead: 'TLE ICT Faculty Lead',
      description: 'Computer Hardware, Network Configuration, Software Diagnostics & Safety.',
      colorScheme: 'from-teal-950 via-cyan-900 to-slate-950',
      badge: 'JHS TLE'
    }
  ];

  const filteredDoors = SUBJECT_TEACHER_DOORS.filter((door) => {
    const matchesGrade =
      selectedGradeFilter === 'all' ||
      (selectedGradeFilter === 'SHS' && door.gradeLevel.includes('11') || door.gradeLevel.includes('12')) ||
      (selectedGradeFilter === 'JHS' && !door.gradeLevel.includes('11') && !door.gradeLevel.includes('12'));
    const matchesSearch =
      door.subjectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      door.facultyLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      door.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const activeDoor = SUBJECT_TEACHER_DOORS.find((d) => d.id === selectedDoorId);

  return (
    <div className="w-full bg-[#050c1a] text-stone-100 rounded-3xl border-2 border-cyan-500/40 shadow-2xl overflow-hidden animate-in fade-in duration-300">
      
      {/* =========================================================================
          TOP BANNER: SUBJECT TEACHERS (NON-ADVISERS) DOORS
      ========================================================================== */}
      <div className="p-5 sm:p-7 bg-gradient-to-r from-[#031533] via-[#092b62] to-[#04122b] border-b border-cyan-400/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 flex items-center justify-center font-black shadow-xl shrink-0 border-2 border-white/30">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  SUBJECT TEACHERS (NON-ADVISER) DOORS
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-black uppercase">
                  All Specialized Teaching Areas
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  6-Command ILAW &amp; Chalk Ready
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-1">
                Subject-specific lesson plans, formative worksheets, mobile grading sync, and assessment analysis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto justify-end flex-wrap">
            {selectedDoorId && (
              <button
                onClick={() => setSelectedDoorId(null)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Subject Doors</span>
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition cursor-pointer"
                title="Close Subject Doors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* =========================================================================
          VIEW 1: SELECTED SUBJECT TEACHER DOOR WORKSPACE
      ========================================================================== */}
      {activeDoor ? (
        <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-200">
          
          <div className={`p-6 rounded-3xl bg-gradient-to-r ${activeDoor.colorScheme} border-2 border-cyan-400/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  {activeDoor.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono font-bold">
                  {activeDoor.code}
                </span>
                <span className="text-xs text-slate-300 font-mono">({activeDoor.gradeLevel})</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {activeDoor.subjectTitle}
              </h2>
              <p className="text-xs text-blue-200">
                {activeDoor.trackOrStrand} • Lead: <strong>{activeDoor.facultyLead}</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-300 uppercase block font-mono">Curriculum Scope</span>
              <span className="text-xs font-bold text-amber-300 max-w-xs block">{activeDoor.description}</span>
            </div>
          </div>

          {/* Subject Navigation Subtabs */}
          <div className="bg-[#020917] p-2 rounded-2xl border border-cyan-400/20 overflow-x-auto">
            <div className="flex items-center gap-1.5 min-w-max">
              {[
                { id: 'ilaw_6command', label: '📝 6-Command ILAW Generator', icon: '⚡' },
                { id: 'chalk_scoring', label: '📊 Chalk Scoring (Mobile Sync)', icon: '📱' },
                { id: 'doc_intelligence', label: '✨ Document Intelligence', icon: '🔍' },
                { id: 'las_worksheets', label: '📚 LAS & Worksheets', icon: '📝' },
                { id: 'item_analysis', label: '📈 Item Analysis & TOS Hub', icon: '📊' },
                { id: 'lrmds', label: '📦 DepEd LRMDS Hub', icon: '📁' },
                { id: '3d_visuals', label: '🎨 3D Visual Poster Engine', icon: '🎨' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInternalTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                    activeInternalTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg border border-cyan-300'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subtab Contents */}
          <div className="space-y-6">
            
            {/* 1. 6-COMMAND ILAW LESSON PLAN GENERATOR (ALWAYS INTEGRATED) */}
            {activeInternalTab === 'ilaw_6command' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#092B62] to-[#04122b] border border-cyan-400/30 text-xs text-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span>
                      <strong>6-Command ILAW Lesson Plan Generator:</strong> Always integrated for {activeDoor.subjectTitle} adhering strictly to DepEd MATATAG standards.
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    6-Command Active
                  </span>
                </div>
                <ILAWGenerator />
              </div>
            )}

            {/* 2. CHALK SCORING TOOLKIT & MOBILE STUDENT SYNC */}
            {activeInternalTab === 'chalk_scoring' && (
              <ChalkScoringSheetToolkit
                sectionName={activeDoor.subjectTitle}
                defaultAssignmentName={`Quiz 1 - ${activeDoor.subjectTitle}`}
              />
            )}

            {/* 3. DOCUMENT INTELLIGENCE SUITE */}
            {activeInternalTab === 'doc_intelligence' && (
              <ImproveMyDocumentSuite
                initialDocTitle={`${activeDoor.subjectTitle} — Lesson & Activity Dossier`}
                initialCategory="general"
              />
            )}

            {/* 4. LAS & WORKSHEETS */}
            {activeInternalTab === 'las_worksheets' && (
              <LASGenerator />
            )}

            {/* 5. ITEM ANALYSIS & TOS */}
            {activeInternalTab === 'item_analysis' && (
              <SummativeHub sectionName={activeDoor.subjectTitle} gradeLevel={activeDoor.gradeLevel} />
            )}

            {/* 6. LRMDS */}
            {activeInternalTab === 'lrmds' && (
              <LRMDSModule />
            )}

            {/* 7. 3D VISUALS */}
            {activeInternalTab === '3d_visuals' && (
              <PosterMaker />
            )}

          </div>

        </div>
      ) : (
        /* =========================================================================
            VIEW 2: GRID OF ALL SUBJECT TEACHER DOORS
        ========================================================================== */
        <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedGradeFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedGradeFilter === 'all'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setSelectedGradeFilter('SHS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedGradeFilter === 'SHS'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                Senior High School (11 &amp; 12)
              </button>
              <button
                onClick={() => setSelectedGradeFilter('JHS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedGradeFilter === 'JHS'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                Junior High School (7–10)
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject or lead..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

          </div>

          {/* Grid of Subject Doors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoors.map((door) => (
              <div
                key={door.id}
                className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0c162b] border-2 border-slate-700 hover:border-cyan-400 transition-all text-left flex flex-col justify-between gap-4 group hover:scale-[1.02] shadow-xl"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-black uppercase border border-cyan-400/40">
                      {door.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {door.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-white group-hover:text-cyan-300 transition leading-snug">
                      {door.subjectTitle}
                    </h3>
                    <p className="text-[11px] text-blue-200 mt-1 line-clamp-2">
                      {door.description}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-[10px]">
                    <div className="text-slate-300">
                      <strong>Faculty:</strong> {door.facultyLead}
                    </div>
                    <div className="text-amber-300 font-mono">
                      <strong>Grade:</strong> {door.gradeLevel} ({door.trackOrStrand})
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDoorId(door.id)}
                  className="w-full py-2.5 rounded-xl bg-[#0038A8] hover:bg-cyan-600 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Building className="w-4 h-4" />
                  <span>Enter Subject Door →</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
