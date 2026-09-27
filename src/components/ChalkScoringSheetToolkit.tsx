import React, { useState } from 'react';
import {
  BookOpen,
  FileSpreadsheet,
  MessageSquare,
  Smartphone,
  Plus,
  Trash2,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  Users,
  Award,
  BarChart2,
  QrCode,
  Share2,
  Copy,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileCheck2,
  Printer,
  Mail,
  Grid
} from 'lucide-react';
import { CONSOLIDATED_LIS_STUDENTS } from '../data/lnnchsCompleteSectionsDirectory';

export interface ChalkScoreEntry {
  id: string;
  studentName: string;
  studentId?: string;
  assignment: string;
  score: number;
  outOf: number;
  percentage: number;
  transmutedGrade: number;
  descriptor: 'Outstanding' | 'Very Satisfactory' | 'Satisfactory' | 'Fairly Satisfactory' | 'Did Not Meet Expectations';
  submissionType: 'mobile_sync' | 'teacher_entry' | 'worksheet_scan';
  timestamp: string;
  feedback?: string;
  hasCellphone: boolean;
}

export interface ChalkWorksheet {
  id: string;
  title: string;
  subject: string;
  totalPoints: number;
  questionsCount: number;
  accessCode: string;
  dueDate: string;
}

interface ChalkScoringSheetToolkitProps {
  sectionName?: string;
  defaultAssignmentName?: string;
  onClose?: () => void;
  isEmbedded?: boolean;
}

export const ChalkScoringSheetToolkit: React.FC<ChalkScoringSheetToolkitProps> = ({
  sectionName = 'Grade 11 - STEM Einstein',
  defaultAssignmentName = 'Quiz 3 - Photosynthesis & Bioenergetics',
  onClose,
  isEmbedded = false
}) => {
  // Navigation Tabs: Gradebook | Worksheets | Feedback | Parent email | Seating | Mobile Sync
  const [activeTab, setActiveTab] = useState<'gradebook' | 'worksheets' | 'feedback' | 'parent_email' | 'seating' | 'mobile_sync'>('gradebook');

  // Fast Form Entry State
  const [studentName, setStudentName] = useState<string>('Jordan P.');
  const [assignment, setAssignment] = useState<string>(defaultAssignmentName);
  const [scoreInput, setScoreInput] = useState<string>('18');
  const [outOfInput, setOutOfInput] = useState<string>('20');
  const [studentHasPhone, setStudentHasPhone] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Seating / Group Generator State (matching user's screenshot)
  const [seatingNames, setSeatingNames] = useState<string>(
    'Jordan P.\nAlthea Mae Santos\nKenji Kyle Ramirez\nPrincess Bea Lumacad\nDerrick Joshua Tan\nAva\nBen\nCarla\nDeshawn'
  );
  const [seatingMode, setSeatingMode] = useState<string>('Groups');
  const [groupSize, setGroupSize] = useState<number>(4);
  const [generatedGroups, setGeneratedGroups] = useState<string[][] | null>(null);

  // Parent Email Generator State
  const [parentStudentName, setParentStudentName] = useState<string>('Jordan P.');
  const [parentEmailAddress, setParentEmailAddress] = useState<string>('parent.jordan@gmail.com');
  const [emailTemplateType, setEmailTemplateType] = useState<'progress' | 'remediation' | 'commendation'>('progress');

  // Pre-populated Chalk Scores
  const [scoresList, setScoresList] = useState<ChalkScoreEntry[]>([
    {
      id: 'c-1',
      studentName: 'Jordan P.',
      assignment: 'Quiz 3',
      score: 18,
      outOf: 20,
      percentage: 90,
      transmutedGrade: 93,
      descriptor: 'Outstanding',
      submissionType: 'mobile_sync',
      timestamp: 'Today, 10:15 AM',
      feedback: 'Excellent grasp of chloroplast photolysis. Keep up the high mastery!',
      hasCellphone: true
    },
    {
      id: 'c-2',
      studentName: 'Althea Mae Santos',
      assignment: 'Quiz 3',
      score: 19,
      outOf: 20,
      percentage: 95,
      transmutedGrade: 96,
      descriptor: 'Outstanding',
      submissionType: 'mobile_sync',
      timestamp: 'Today, 10:16 AM',
      feedback: 'Flawless analysis on cyclic phosphorylation.',
      hasCellphone: true
    },
    {
      id: 'c-3',
      studentName: 'Kenji Kyle Ramirez',
      assignment: 'Quiz 3',
      score: 15,
      outOf: 20,
      percentage: 75,
      transmutedGrade: 84,
      descriptor: 'Very Satisfactory',
      submissionType: 'teacher_entry',
      timestamp: 'Today, 10:20 AM',
      feedback: 'Good effort. Review Calvin Cycle carbon fixation steps.',
      hasCellphone: false
    },
    {
      id: 'c-4',
      studentName: 'Princess Bea Lumacad',
      assignment: 'Quiz 3',
      score: 20,
      outOf: 20,
      percentage: 100,
      transmutedGrade: 100,
      descriptor: 'Outstanding',
      submissionType: 'mobile_sync',
      timestamp: 'Today, 10:22 AM',
      feedback: 'Perfect score! Eligible for STEM peer-tutor leadership.',
      hasCellphone: true
    },
    {
      id: 'c-5',
      studentName: 'Derrick Joshua Tan',
      assignment: 'Quiz 3',
      score: 12,
      outOf: 20,
      percentage: 60,
      transmutedGrade: 75,
      descriptor: 'Fairly Satisfactory',
      submissionType: 'worksheet_scan',
      timestamp: 'Today, 10:25 AM',
      feedback: 'Recommended: Complete LAS #1 remediation worksheet.',
      hasCellphone: false
    }
  ]);

  // Worksheets List
  const [worksheetsList, setWorksheetsList] = useState<ChalkWorksheet[]>([
    {
      id: 'ws-1',
      title: 'Quiz 3 - Photosynthesis & Cellular Respiration',
      subject: 'General Biology 1',
      totalPoints: 20,
      questionsCount: 10,
      accessCode: 'BIO-Q3-LN',
      dueDate: 'S.Y. 2026-2027 Trimester 1'
    },
    {
      id: 'ws-2',
      title: 'Formative Activity #4 - Thylakoid Membrane Reactions',
      subject: 'General Biology 1',
      totalPoints: 15,
      questionsCount: 5,
      accessCode: 'LAS-04-STEM',
      dueDate: 'Weekly Task'
    }
  ]);

  // DepEd Transmutation Formula (DO 8, s. 2015 & DO 009, s. 2026)
  const calculateTransmutation = (rawPercentage: number): { transmuted: number; descriptor: ChalkScoreEntry['descriptor'] } => {
    let transmuted = 75;
    if (rawPercentage >= 100) transmuted = 100;
    else if (rawPercentage >= 96) transmuted = 97;
    else if (rawPercentage >= 92) transmuted = 95;
    else if (rawPercentage >= 88) transmuted = 92;
    else if (rawPercentage >= 84) transmuted = 89;
    else if (rawPercentage >= 80) transmuted = 87;
    else if (rawPercentage >= 76) transmuted = 85;
    else if (rawPercentage >= 72) transmuted = 82;
    else if (rawPercentage >= 68) transmuted = 80;
    else if (rawPercentage >= 64) transmuted = 78;
    else if (rawPercentage >= 60) transmuted = 75;
    else transmuted = Math.max(60, Math.round(60 + (rawPercentage / 60) * 14));

    let descriptor: ChalkScoreEntry['descriptor'] = 'Fairly Satisfactory';
    if (transmuted >= 90) descriptor = 'Outstanding';
    else if (transmuted >= 85) descriptor = 'Very Satisfactory';
    else if (transmuted >= 80) descriptor = 'Satisfactory';
    else if (transmuted >= 75) descriptor = 'Fairly Satisfactory';
    else descriptor = 'Did Not Meet Expectations';

    return { transmuted, descriptor };
  };

  // Add Score
  const handleAddScore = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const scoreNum = parseFloat(scoreInput);
    const outOfNum = parseFloat(outOfInput);

    if (isNaN(scoreNum) || isNaN(outOfNum) || outOfNum <= 0) {
      alert('Please enter valid numeric score and total points.');
      return;
    }

    const percentage = Math.round((scoreNum / outOfNum) * 100);
    const { transmuted, descriptor } = calculateTransmutation(percentage);

    let autoFeedback = '';
    if (percentage >= 90) {
      autoFeedback = `Outstanding work! Mastered all learning competencies for ${assignment}.`;
    } else if (percentage >= 75) {
      autoFeedback = `Good performance! Keep reviewing core conceptual equations for ${assignment}.`;
    } else {
      autoFeedback = `Remediation suggested: Consult teacher guide on ${assignment} for formative review.`;
    }

    const newEntry: ChalkScoreEntry = {
      id: `c-${Date.now()}`,
      studentName: studentName.trim() || 'Unnamed Learner',
      assignment: assignment.trim() || 'Quiz 3',
      score: scoreNum,
      outOf: outOfNum,
      percentage,
      transmutedGrade: transmuted,
      descriptor,
      submissionType: studentHasPhone ? 'mobile_sync' : 'teacher_entry',
      timestamp: 'Just now',
      feedback: autoFeedback,
      hasCellphone: studentHasPhone
    };

    setScoresList(prev => [newEntry, ...prev]);
    setStudentName('');
  };

  const handleDeleteScore = (id: string) => {
    setScoresList(prev => prev.filter(s => s.id !== id));
  };

  const handleCopyFeedback = (entry: ChalkScoreEntry) => {
    const text = `DepEd LNNCHS Grade & Feedback Notice\nLearner: ${entry.studentName}\nTask: ${entry.assignment}\nScore: ${entry.score}/${entry.outOf} (${entry.percentage}%)\nTransmuted Grade: ${entry.transmutedGrade} (${entry.descriptor})\nTeacher Remarks: ${entry.feedback || 'Good job!'}`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(`Feedback copied for ${entry.studentName}!`);
    setTimeout(() => setCopiedNotification(null), 3500);
  };

  // Generate Seating Chart / Groups
  const handleGenerateSeating = () => {
    const namesArray = seatingNames
      .split(/[\n,]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0);

    if (namesArray.length === 0) {
      alert('Please enter at least one student name.');
      return;
    }

    // Shuffle names
    const shuffled = [...namesArray].sort(() => 0.5 - Math.random());
    const size = Math.max(1, groupSize);
    const groups: string[][] = [];

    for (let i = 0; i < shuffled.length; i += size) {
      groups.push(shuffled.slice(i, i + size));
    }

    setGeneratedGroups(groups);
  };

  const handleExportCSV = () => {
    const headers = ['Student Name', 'Assignment', 'Score', 'Out Of', 'Percentage', 'Transmuted Grade', 'Descriptor', 'Submission Type', 'Timestamp'];
    const rows = scoresList.map(s => [
      `"${s.studentName}"`,
      `"${s.assignment}"`,
      s.score,
      s.outOf,
      `${s.percentage}%`,
      s.transmutedGrade,
      `"${s.descriptor}"`,
      s.submissionType,
      `"${s.timestamp}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Chalk_Scoring_Sheet_${sectionName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalLearners = scoresList.length;
  const averageScore = totalLearners > 0
    ? (scoresList.reduce((acc, curr) => acc + curr.score, 0) / totalLearners).toFixed(1)
    : '0';
  const averagePercentage = totalLearners > 0
    ? Math.round(scoresList.reduce((acc, curr) => acc + curr.percentage, 0) / totalLearners)
    : 0;
  const masteryCount = scoresList.filter(s => s.percentage >= 75).length;
  const masteryRate = totalLearners > 0 ? Math.round((masteryCount / totalLearners) * 100) : 0;
  const phoneUsersCount = scoresList.filter(s => s.hasCellphone).length;

  const filteredScores = scoresList.filter(s =>
    s.studentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.assignment.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className={`w-full rounded-3xl overflow-hidden shadow-2xl transition-all border border-[#2a3328] ${
      isEmbedded ? 'bg-[#161a14] text-[#e3e6dd]' : 'bg-[#181d16] text-[#e3e6dd]'
    }`}>
      
      {/* =========================================================================
          TOP CHALK HEADER
      ========================================================================== */}
      <div className="p-5 sm:p-7 bg-[#141812] border-b border-[#283125]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#f4f7ee]">
                Chalk
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffb700]/15 text-[#ffb700] border border-[#ffb700]/30 text-[10px] font-mono font-black uppercase tracking-wider">
                Teacher Toolkit
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30 text-[10px] font-mono font-black uppercase tracking-wider">
                📱 Mobile Sync Enabled
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9da596] mt-1 font-sans">
              A quick toolkit for grading, worksheets, feedback, parent emails, and seating charts
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-[#232a20] hover:bg-[#2d3629] text-[#e3e6dd] text-xs font-bold transition flex items-center gap-1.5 border border-[#374233] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#ffb700]" />
              <span>Export Scoring Sheet</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#232a20] hover:bg-[#2d3629] text-[#9da596] hover:text-white transition cursor-pointer border border-[#374233]"
                title="Close Chalk"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>

        {/* DepEd Inclusivity Notice */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-[#1b2318] border border-[#2e3b2a] text-[11px] text-[#a9b4a1] flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4ade80] shrink-0" />
            <span>
              <strong>Equitable Scoring Notice:</strong> Teachers can integrate this toolkit for students with cellphones to submit scores digitally. Students without cellphones continue seamlessly using standard paper sheets.
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#ffb700] font-bold">
            {phoneUsersCount}/{totalLearners} on Mobile Sync
          </span>
        </div>
      </div>

      {/* =========================================================================
          CHALK TAB NAVIGATION (Gradebook | Worksheets | Feedback | Parent email | Seating | Mobile Sync)
      ========================================================================== */}
      <div className="bg-[#121611] px-4 sm:px-6 pt-2 border-b border-[#252d22] flex items-center gap-1 sm:gap-2 overflow-x-auto">
        {[
          { id: 'gradebook', label: 'Gradebook', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'worksheets', label: 'Worksheets', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'parent_email', label: 'Parent email', icon: <Mail className="w-4 h-4" /> },
          { id: 'seating', label: 'Seating', icon: <Grid className="w-4 h-4" /> },
          { id: 'mobile_sync', label: '📱 Cellphone Hub', icon: <Smartphone className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 sm:px-5 py-3 font-sans font-bold text-xs sm:text-sm tracking-wide transition cursor-pointer border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#ffb700] text-[#f4f7ee]'
                : 'border-transparent text-[#7e8777] hover:text-[#c4ccc0]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Notification Toast */}
      {copiedNotification && (
        <div className="mx-6 mt-4 p-2.5 rounded-xl bg-[#4ade80]/20 border border-[#4ade80]/40 text-[#4ade80] text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span>{copiedNotification}</span>
          <button onClick={() => setCopiedNotification(null)}><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* =========================================================================
          TAB 1: GRADEBOOK
      ========================================================================== */}
      {activeTab === 'gradebook' && (
        <div className="p-5 sm:p-7 space-y-6">
          
          <div>
            <h2 className="text-2xl font-serif font-black text-[#f4f7ee]">
              Gradebook
            </h2>
            <p className="text-xs text-[#8e9887] mt-0.5">
              Quick score entry, auto DepEd transmutation, and summary statistics.
            </p>
          </div>

          <form onSubmit={handleAddScore} className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-[#9da596] block">
                  Student name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Jordan P."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs focus:outline-none focus:border-[#ffb700] transition"
                  required
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-[#9da596] block">
                  Assignment
                </label>
                <input
                  type="text"
                  value={assignment}
                  onChange={(e) => setAssignment(e.target.value)}
                  placeholder="e.g. Quiz 3"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs focus:outline-none focus:border-[#ffb700] transition"
                  required
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-[#9da596] block">
                  Score
                </label>
                <input
                  type="number"
                  step="any"
                  value={scoreInput}
                  onChange={(e) => setScoreInput(e.target.value)}
                  placeholder="18"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs focus:outline-none focus:border-[#ffb700] transition font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-[#9da596] block">
                  Out of
                </label>
                <input
                  type="number"
                  step="any"
                  value={outOfInput}
                  onChange={(e) => setOutOfInput(e.target.value)}
                  placeholder="20"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs focus:outline-none focus:border-[#ffb700] transition font-mono"
                  required
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-[#2a3426]">
              
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#a9b4a1]">
                <input
                  type="checkbox"
                  checked={studentHasPhone}
                  onChange={(e) => setStudentHasPhone(e.target.checked)}
                  className="rounded bg-[#141812] border-[#2e392a] text-[#ffb700] focus:ring-0"
                />
                <span>Student has a smartphone (Enable live mobile sync)</span>
              </label>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#f4f7ee] hover:bg-white text-[#141812] font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <Plus className="w-4 h-4 text-[#141812]" />
                <span>Add Score Entry</span>
              </button>

            </div>

          </form>

          {/* Quick Class Summary Statistics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            
            <div className="p-3.5 rounded-2xl bg-[#171c14] border border-[#283224] text-left">
              <span className="text-[10px] text-[#8e9887] uppercase font-mono font-bold block">Learners Scored</span>
              <div className="text-xl font-black text-[#f4f7ee] mt-0.5">{totalLearners}</div>
              <span className="text-[9px] text-[#4ade80] font-mono">{phoneUsersCount} on cellphones</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#171c14] border border-[#283224] text-left">
              <span className="text-[10px] text-[#8e9887] uppercase font-mono font-bold block">Class Average</span>
              <div className="text-xl font-black text-[#ffb700] mt-0.5">{averageScore} / {outOfInput || '20'}</div>
              <span className="text-[9px] text-[#ffb700] font-mono">{averagePercentage}% Accuracy</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#171c14] border border-[#283224] text-left">
              <span className="text-[10px] text-[#8e9887] uppercase font-mono font-bold block">Mastery Rate</span>
              <div className="text-xl font-black text-[#4ade80] mt-0.5">{masteryRate}%</div>
              <span className="text-[9px] text-[#4ade80] font-mono">≥75% Passing</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#171c14] border border-[#283224] text-left">
              <span className="text-[10px] text-[#8e9887] uppercase font-mono font-bold block">Section Target</span>
              <div className="text-xs font-black text-[#f4f7ee] mt-1 truncate">{sectionName}</div>
              <span className="text-[9px] text-[#8e9887] font-mono">S.Y. 2026-2027</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#171c14] border border-[#283224] text-left col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#8e9887] uppercase font-mono font-bold block">Grading Standard</span>
              <div className="text-xs font-black text-[#ffb700] mt-1">DO 8, s. 2015</div>
              <span className="text-[9px] text-[#8e9887] font-mono">DepEd Transmuted</span>
            </div>

          </div>

          {/* Scores Table */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-[#8e9887] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search student or task..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs focus:outline-none focus:border-[#ffb700]"
                />
              </div>

              <span className="text-xs text-[#8e9887] font-mono">
                Showing {filteredScores.length} of {scoresList.length} scores
              </span>
            </div>

            <div className="rounded-2xl border border-[#283224] overflow-hidden bg-[#141812]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1b2218] text-[#9da596] uppercase text-[10px] font-mono tracking-wider border-b border-[#283224]">
                    <tr>
                      <th className="p-3.5">Learner Name</th>
                      <th className="p-3.5">Task / Assignment</th>
                      <th className="p-3.5">Raw Score</th>
                      <th className="p-3.5">Accuracy %</th>
                      <th className="p-3.5">Transmuted Grade</th>
                      <th className="p-3.5">Descriptor</th>
                      <th className="p-3.5">Channel</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#232c1f]">
                    {filteredScores.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-[#8e9887]">
                          No score entries match your search.
                        </td>
                      </tr>
                    ) : (
                      filteredScores.map((score) => (
                        <tr key={score.id} className="hover:bg-[#1b2218]/60 transition">
                          
                          <td className="p-3.5 font-bold text-[#f4f7ee]">
                            {score.studentName}
                          </td>

                          <td className="p-3.5 text-[#a9b4a1]">
                            {score.assignment}
                          </td>

                          <td className="p-3.5 font-mono font-black text-[#ffb700]">
                            {score.score} / {score.outOf}
                          </td>

                          <td className="p-3.5 font-mono text-[#4ade80]">
                            {score.percentage}%
                          </td>

                          <td className="p-3.5 font-mono font-black text-[#f4f7ee]">
                            {score.transmutedGrade}
                          </td>

                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                              score.transmutedGrade >= 90
                                ? 'bg-[#4ade80]/15 text-[#4ade80]'
                                : score.transmutedGrade >= 85
                                ? 'bg-[#38bdf8]/15 text-[#38bdf8]'
                                : 'bg-[#ffb700]/15 text-[#ffb700]'
                            }`}>
                              {score.descriptor}
                            </span>
                          </td>

                          <td className="p-3.5 text-[10px] font-mono">
                            {score.hasCellphone ? (
                              <span className="text-[#4ade80] flex items-center gap-1">
                                <Smartphone className="w-3 h-3" />
                                <span>Mobile Sync</span>
                              </span>
                            ) : (
                              <span className="text-[#9da596]">Paper Worksheet</span>
                            )}
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleCopyFeedback(score)}
                                className="p-1.5 rounded-lg bg-[#232a20] hover:bg-[#2d3729] text-[#a9b4a1] hover:text-[#f4f7ee] transition cursor-pointer"
                                title="Copy feedback for mobile sharing"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteScore(score.id)}
                                className="p-1.5 rounded-lg bg-[#232a20] hover:bg-red-950/40 text-[#a9b4a1] hover:text-red-400 transition cursor-pointer"
                                title="Delete entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: WORKSHEETS
      ========================================================================== */}
      {activeTab === 'worksheets' && (
        <div className="p-5 sm:p-7 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#283224] pb-4">
            <div>
              <h2 className="text-2xl font-serif font-black text-[#f4f7ee]">
                Worksheets &amp; Digital Scoring Sheets
              </h2>
              <p className="text-xs text-[#8e9887] mt-0.5">
                Generate student smartphone QR access codes and printable paper answer keys.
              </p>
            </div>

            <button
              onClick={() => {
                const title = prompt('Enter Worksheet Title:', 'LAS #5 - Thylakoid Reactions');
                if (title) {
                  const newWs: ChalkWorksheet = {
                    id: `ws-${Date.now()}`,
                    title,
                    subject: 'General Biology 1',
                    totalPoints: 20,
                    questionsCount: 10,
                    accessCode: `CHALK-${Math.floor(1000 + Math.random() * 9000)}`,
                    dueDate: 'Today'
                  };
                  setWorksheetsList(prev => [newWs, ...prev]);
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#ffb700] hover:bg-[#e0a200] text-[#141812] font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Worksheet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {worksheetsList.map((ws) => (
              <div
                key={ws.id}
                className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-4 text-left hover:border-[#ffb700]/50 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#ffb700]/15 text-[#ffb700] text-[10px] font-mono font-bold">
                      {ws.subject}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#f4f7ee]">
                      {ws.title}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-[#141812] border border-[#2e392a] text-center shrink-0">
                    <QrCode className="w-7 h-7 text-[#4ade80] mx-auto" />
                    <span className="text-[9px] font-mono text-[#9da596] block mt-0.5">{ws.accessCode}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-xl bg-[#141812] border border-[#283224]">
                    <span className="text-[9px] text-[#8e9887] block">Points</span>
                    <span className="font-bold text-[#ffb700]">{ws.totalPoints} pts</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#141812] border border-[#283224]">
                    <span className="text-[9px] text-[#8e9887] block">Questions</span>
                    <span className="font-bold text-[#f4f7ee]">{ws.questionsCount} items</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#141812] border border-[#283224]">
                    <span className="text-[9px] text-[#8e9887] block">Mobile Access</span>
                    <span className="font-bold text-[#4ade80]">Active 📱</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#2a3426]">
                  <button
                    onClick={() => {
                      setAssignment(ws.title);
                      setOutOfInput(ws.totalPoints.toString());
                      setActiveTab('gradebook');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#f4f7ee] hover:bg-white text-[#141812] font-black text-xs uppercase cursor-pointer transition"
                  >
                    Grade This Worksheet →
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`DepEd LNNCHS Chalk Access: Join '${ws.title}' using Code: ${ws.accessCode}`);
                      setCopiedNotification(`Student mobile invite copied for ${ws.title}!`);
                      setTimeout(() => setCopiedNotification(null), 3500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#232a20] hover:bg-[#2d3729] text-[#a9b4a1] hover:text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Mobile Link</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 3: FEEDBACK
      ========================================================================== */}
      {activeTab === 'feedback' && (
        <div className="p-5 sm:p-7 space-y-6">
          
          <div className="border-b border-[#283224] pb-4">
            <h2 className="text-2xl font-serif font-black text-[#f4f7ee]">
              Feedback &amp; Formative Guidance
            </h2>
            <p className="text-xs text-[#8e9887] mt-0.5">
              Personalized feedback generator for student smartphones and parent progress cards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoresList.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-3 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#f4f7ee] text-sm">{entry.studentName}</span>
                    <span className="text-xs text-[#8e9887] font-mono">({entry.assignment})</span>
                  </div>
                  <span className="font-mono font-black text-[#ffb700] text-sm">
                    {entry.score}/{entry.outOf} ({entry.percentage}%)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#141812] border border-[#283224] text-xs text-[#c4ccc0] leading-relaxed">
                  <strong className="text-[#4ade80] block mb-0.5">Teacher Feedback:</strong>
                  {entry.feedback}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] font-mono text-[#8e9887]">
                    {entry.hasCellphone ? '📱 Direct Mobile Notification Ready' : '📄 Paper Summary Card'}
                  </span>
                  
                  <button
                    onClick={() => handleCopyFeedback(entry)}
                    className="px-3 py-1.5 rounded-lg bg-[#232a20] hover:bg-[#2d3729] text-[#a9b4a1] hover:text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy for SMS / Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 4: PARENT EMAIL TOOLKIT (NEW)
      ========================================================================== */}
      {activeTab === 'parent_email' && (
        <div className="p-5 sm:p-7 space-y-6 max-w-4xl mx-auto">
          
          <div className="border-b border-[#283224] pb-4 text-left">
            <h2 className="text-2xl font-serif font-black text-[#f4f7ee] flex items-center gap-2">
              <Mail className="w-6 h-6 text-[#ffb700]" />
              <span>Parent Email &amp; Progress Notice Generator</span>
            </h2>
            <p className="text-xs text-[#8e9887] mt-0.5">
              Draft formal DepEd academic progress updates and feedback notes for parents and guardians.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
            
            <div className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#9da596]">Select Learner</label>
                <select
                  value={parentStudentName}
                  onChange={(e) => setParentStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs focus:outline-none focus:border-[#ffb700]"
                >
                  {scoresList.map(s => (
                    <option key={s.id} value={s.studentName}>{s.studentName} ({s.assignment}: {s.score}/{s.outOf})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#9da596]">Guardian Email Address</label>
                <input
                  type="email"
                  value={parentEmailAddress}
                  onChange={(e) => setParentEmailAddress(e.target.value)}
                  placeholder="parent@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs focus:outline-none focus:border-[#ffb700]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#9da596]">Email Template Focus</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'progress', label: '📊 Weekly Progress' },
                    { id: 'remediation', label: '⚠️ Remediation' },
                    { id: 'commendation', label: '🌟 Commendation' }
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setEmailTemplateType(tpl.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        emailTemplateType === tpl.id
                          ? 'bg-[#ffb700] text-[#141812] border-[#ffb700]'
                          : 'bg-[#141812] text-[#c4ccc0] border-[#2e392a]'
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#ffb700] uppercase font-bold block">
                  Generated Email Preview (DepEd LNNCHS Standard)
                </span>
                
                <div className="p-4 rounded-xl bg-[#141812] border border-[#283224] text-xs font-mono text-[#c4ccc0] leading-relaxed space-y-2">
                  <div><strong>To:</strong> {parentEmailAddress}</div>
                  <div><strong>Subject:</strong> LNNCHS Academic Progress Update - {parentStudentName} ({sectionName})</div>
                  <hr className="border-[#283224] my-2" />
                  <p>Dear Parent / Guardian,</p>
                  <p>
                    Greetings from Lanao del Norte National Comprehensive High School (LNNCHS)! We are writing to update you on {parentStudentName}'s recent performance in {sectionName}.
                  </p>
                  <p>
                    {emailTemplateType === 'commendation' && `We are proud to share that ${parentStudentName} demonstrated outstanding mastery during recent assessments, exhibiting exemplary dedication to their studies.`}
                    {emailTemplateType === 'progress' && `During our recent evaluation for ${defaultAssignmentName}, ${parentStudentName} achieved a solid performance standing with active engagement in class activities.`}
                    {emailTemplateType === 'remediation' && `We invite your continued support as ${parentStudentName} participates in our formative remediation sessions to further strengthen core competencies.`}
                  </p>
                  <p>Thank you for your unwavering partnership in your child's education.</p>
                  <p className="pt-2">Sincerely,<br/><strong>Subject Teacher / Adviser</strong><br/>Lanao del Norte National Comprehensive High School (LNNCHS)</p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`To: ${parentEmailAddress}\nSubject: Academic Update - ${parentStudentName}\n\nDear Parent,\n\nGreetings from LNNCHS! We are pleased to provide academic feedback for ${parentStudentName} in ${sectionName}.\n\nWarm regards,\nTeacher`);
                  setCopiedNotification(`Parent email draft copied to clipboard for ${parentStudentName}!`);
                  setTimeout(() => setCopiedNotification(null), 3500);
                }}
                className="w-full py-3 rounded-xl bg-[#ffb700] hover:bg-[#e0a200] text-[#141812] font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Copy Email &amp; Send to Parent</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 5: SEATING CHART / GROUP GENERATOR (NEW - MATCHING USER SCREENSHOT)
      ========================================================================== */}
      {activeTab === 'seating' && (
        <div className="p-5 sm:p-7 space-y-6 max-w-4xl mx-auto text-left">
          
          <div className="border-b border-[#283224] pb-4">
            <h2 className="text-2xl font-serif font-black text-[#f4f7ee] flex items-center gap-2">
              <Grid className="w-6 h-6 text-[#ffb700]" />
              <span>Seating chart / group generator</span>
            </h2>
            <p className="text-xs text-[#8e9887] mt-0.5">
              Randomly organize learners into collaborative groups, pairs, or seating arrangements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#9da596] block">
                  Student names (one per line, or comma-separated)
                </label>
                <textarea
                  rows={7}
                  value={seatingNames}
                  onChange={(e) => setSeatingNames(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs font-mono focus:outline-none focus:border-[#ffb700] leading-relaxed"
                  placeholder="Ava&#10;Ben&#10;Carla&#10;Deshawn"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#9da596] block">Mode</label>
                  <select
                    value={seatingMode}
                    onChange={(e) => setSeatingMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs focus:outline-none focus:border-[#ffb700]"
                  >
                    <option value="Groups">Groups</option>
                    <option value="Random Pairs">Random Pairs</option>
                    <option value="Row Seating">Row Seating</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#9da596] block">Group size</label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value) || 4)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141812] border border-[#2e392a] text-[#f4f7ee] text-xs font-mono focus:outline-none focus:border-[#ffb700]"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateSeating}
                className="w-full py-3 rounded-xl bg-[#f4f7ee] hover:bg-white text-[#141812] font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
              >
                Generate
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-4">
              <span className="text-xs font-mono font-bold text-[#ffb700] uppercase block">
                Generated {seatingMode} Output
              </span>

              {generatedGroups ? (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {generatedGroups.map((group, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#141812] border border-[#283224] space-y-2">
                      <span className="text-[10px] font-mono font-black text-[#4ade80] uppercase">
                        Group #{idx + 1} ({group.length} Learners)
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {group.map((name, sIdx) => (
                          <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-[#232a20] text-[#f4f7ee] text-xs font-bold border border-[#374233]">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 rounded-xl bg-[#141812] border border-[#283224] flex flex-col items-center justify-center text-center p-6 text-[#8e9887]">
                  <Grid className="w-10 h-10 text-[#374233] mb-2" />
                  <p className="text-xs">Click <strong>"Generate"</strong> above to instantly randomize and assemble student seating groups for {sectionName}.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 6: STUDENT CELLPHONE INTEGRATION HUB
      ========================================================================== */}
      {activeTab === 'mobile_sync' && (
        <div className="p-5 sm:p-7 space-y-6 max-w-4xl mx-auto">
          
          <div className="text-center space-y-2 border-b border-[#283224] pb-5">
            <div className="w-14 h-14 rounded-2xl bg-[#4ade80]/15 text-[#4ade80] flex items-center justify-center font-black mx-auto border border-[#4ade80]/30 shadow-lg">
              <Smartphone className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#f4f7ee]">
              Student Cellphone Integration Hub
            </h2>
            <p className="text-xs sm:text-sm text-[#9da596]">
              Allow learners with smartphones to scan &amp; submit scores directly to your Chalk Gradebook.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            <div className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-3">
              <h3 className="text-sm font-bold text-[#f4f7ee] uppercase font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                <span>How Cellphone Integration Works</span>
              </h3>

              <ul className="space-y-2.5 text-xs text-[#a9b4a1] list-disc list-inside leading-relaxed">
                <li>
                  <strong>Optional Feature:</strong> Teachers can use this as an elective helper alongside manual score entry.
                </li>
                <li>
                  <strong>Instant Score Sync:</strong> When students submit their task on mobile, their score automatically populates your Chalk Gradebook.
                </li>
                <li>
                  <strong>Equitable Policy:</strong> For students without cellphones, teachers continue using paper optical sheets with zero disadvantage.
                </li>
                <li>
                  <strong>Live Summary Export:</strong> One-click compilation to DepEd Form 137 / SF2 grading matrices.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#1d231a] border border-[#2d3729] space-y-4 text-center">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#ffb700] block">
                  Classroom Mobile Access Pass
                </span>
                <h4 className="text-sm font-bold text-[#f4f7ee] mt-0.5">{sectionName}</h4>
              </div>

              <div className="p-4 rounded-2xl bg-white text-slate-950 inline-block mx-auto shadow-xl">
                <QrCode className="w-32 h-32" />
                <span className="text-[10px] font-mono font-black block mt-1 tracking-widest">
                  CHALK-LNNCHS-2026
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    const studentDemo = prompt('Simulate Student Name:', 'Mark Bryan V.');
                    if (studentDemo) {
                      const scoreDemo = Math.floor(14 + Math.random() * 7);
                      const newScore: ChalkScoreEntry = {
                        id: `c-${Date.now()}`,
                        studentName: studentDemo,
                        assignment: defaultAssignmentName,
                        score: scoreDemo,
                        outOf: 20,
                        percentage: Math.round((scoreDemo / 20) * 100),
                        transmutedGrade: calculateTransmutation(Math.round((scoreDemo / 20) * 100)).transmuted,
                        descriptor: calculateTransmutation(Math.round((scoreDemo / 20) * 100)).descriptor,
                        submissionType: 'mobile_sync',
                        timestamp: 'Just now (Mobile)',
                        feedback: 'Submitted via student smartphone live sync.',
                        hasCellphone: true
                      };
                      setScoresList(prev => [newScore, ...prev]);
                      setActiveTab('gradebook');
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#4ade80] hover:bg-[#3ec470] text-[#141812] font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  ⚡ Simulate Incoming Mobile Submission
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
