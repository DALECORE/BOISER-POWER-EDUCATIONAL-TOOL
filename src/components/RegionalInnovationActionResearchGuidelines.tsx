import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Award,
  Download,
  Printer,
  BookOpen,
  Layers,
  Check,
  Sparkles,
  Zap,
  HelpCircle,
  Copy,
  Calendar,
  Building,
  BarChart3,
  DollarSign,
  Share2,
  BookMarked,
  Info,
  CheckCheck
} from 'lucide-react';
import { speakWithCebuanoMaleVoice } from '../services/boiserVoiceService';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const RegionalInnovationActionResearchGuidelines: React.FC = () => {
  const { currentUser, isOwner } = useAuth();
  const [thematicArea, setThematicArea] = useState<'teaching_learning' | 'governance_operations'>('teaching_learning');
  const [isSavedFormat, setIsSavedFormat] = useState<boolean>(() => {
    return localStorage.getItem('boiser_regional_innovation_guidelines_active') === 'true';
  });
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const handleSaveAndFollowFormat = async () => {
    localStorage.setItem('boiser_regional_innovation_guidelines_active', 'true');
    localStorage.setItem('boiser_action_research_format_version', 'DO_16_S2017_RA_11293_REGIONAL_INNOVATION');
    setIsSavedFormat(true);
    setSaveSuccessMsg('✓ Regional Action Research Innovation Format Saved & Activated! Proposal outline now follows DO 16, s. 2017 & RA 11293.');

    try {
      if (db) {
        await addDoc(collection(db, 'action_research_policies'), {
          policy: 'Regional Innovation Guidelines (DO 16, s. 2017 & RA 11293)',
          thematicArea,
          status: 'ACTIVE_FOLLOWED',
          savedBy: currentUser?.email || 'boisersteavenkinth@gmail.com',
          timestamp: new Date().toISOString()
        });
      }
    } catch {
      // Offline fallback already stored in localStorage
    }

    speakWithCebuanoMaleVoice('Regional Action Research Innovation format saved and applied to your study under DepEd Order 16, s. 2017 and Philippine Innovation Act.');
    setTimeout(() => setSaveSuccessMsg(null), 5000);
  };

  const handleCopyAll = () => {
    const fullProposal = `
REGIONAL ACTION RESEARCH PROPOSAL FOR INNOVATION
Anchored on DepEd Order No. 16, s. 2017 (Research Management Guidelines),
DepEd Order No. 43, s. 2015 (Basic Education Research Fund - BERF),
and Republic Act No. 11293 (Philippine Innovation Act)

RESEARCH TITLE:
PROJECT B.O.I.S.E.R. (Building Organizational Intelligence for Sustainable Educational Results):
An Automated Three-Term Instructional and Data Governance Platform for Optimizing Teacher Productivity and School Operations at LNNCHS

PROPONENT:
STEAVEN KINTH D. BOISER
Senior High School Faculty / Master Innovator
Lanao del Norte National Comprehensive High School (LNNCHS)
Division of Lanao del Norte, Region X

CORE THEMATIC AREA:
${thematicArea === 'teaching_learning' ? 'Teaching and Learning (Instructional Delivery, Least-Learned Competencies, & ILAW Automation)' : 'Governance and Operations (Process Automation, Workload Optimization, & School Data Integrity)'}

I. CONTEXT AND RATIONALE
Public school educators at Lanao del Norte National Comprehensive High School face significant instructional time loss caused by manual preparation of School Forms (SF1 to SF10), four-day ILAW lesson plans, and complex trimester grade transmutation calculations under DepEd Order No. 009, s. 2026. This administrative burden detracts from direct student engagement and timely interventions. In compliance with the MATATAG Agenda, DepEd Order No. 16, s. 2017, and the Philippine Innovation Act (RA 11293), Project B.O.I.S.E.R. was conceptualized as a localized digital innovation that automates routine workflows while keeping student data isolated and secure through role-based Adviser Doors.

II. ACTION RESEARCH QUESTIONS
This study specifically answers the following:
1. (Baseline Assessment) What is the average time (in hours per week) spent by LNNCHS Senior High School teachers on administrative documentation, lesson planning, and grade transmutation prior to using Project B.O.I.S.E.R.?
2. (Intervention Mechanics) How is the Project B.O.I.S.E.R. platform utilized in terms of:
   a. Daily ILAW 4-day lesson plan auto-generation;
   b. Term-end automated grade tallying and transmutation; and
   c. Offline-first local data vault and document generation?
3. (Efficacy & Impact) Is there a statistically significant difference in teacher productivity, report card turnaround time, and grading precision after the implementation of Project B.O.I.S.E.R.?

III. PROPOSED INNOVATION, INTERVENTION, AND STRATEGY (P.I.I.S.)
- Innovation Description: A full-stack, offline-first educational operating system featuring 18 unified modules, including 4-Day ILAW lesson generator, Three-Term SF9 grading engine, Adviser Doors, and local PWA container caching.
- Teacher Activities: Teachers access the system via browser or installed Android/desktop app, input student raw scores, generate lesson plans with localized competencies, and print A4-compliant DepEd documents in 1-click.
- Frequency & Duration: Daily lesson plan preparation (15 mins/day vs. 2 hrs manual) and term-end grading cycles across all three terms of School Year 2026–2027.
- Verification & Control: Supervised under School Head and Assistant Principal monitoring with automated audit trails and Zero-Plagiarism Turnitin shields.

IV. ACTION RESEARCH METHODS
A. Participants and Data Sources:
   - 45 Senior High School teachers across STEM, TVL, HUMSS, and ABM tracks at LNNCHS (complete enumeration).
   - Administrative records including SF2 attendance accuracy and SF9 grade submission timestamps.
B. Data Gathering Methods:
   - Pre-intervention and post-intervention time-study logs.
   - Standardized Technology Acceptance Model (TAM) survey measuring Perceived Usefulness (PU) and Perceived Ease of Use (PEOU) on a 5-point Likert scale.
   - Automated system telemetry and processing speed benchmarks.
C. Data Analysis Plan:
   - Paired-samples t-test (p < 0.05) to measure significant reduction in administrative hours.
   - Descriptive statistics (mean, standard deviation, and percentage) for TAM usability ratings.
   - Strict adherence to RA 10173 (Data Privacy Act of 2012) and DepEd research ethics protocols.

V. WORK PLAN AND TIMELINES
- Month 1-2: Proposal finalization, School Division Research Committee (SDRC) review, and baseline time survey.
- Month 3-5: Term 1 implementation, pilot testing of ILAW generator and Adviser Doors, and mid-intervention focus group.
- Month 6-8: Term 2 and Term 3 full-scale rollout, automated grading transmutation execution.
- Month 9-10: Post-intervention survey, data triangulation, statistical analysis, and manuscript finalization.
- Month 11-12: SDRC research dissemination, Division LAC sharing, and school policy adoption.

VI. COST ESTIMATES (BERF-ALIGNED BREAKDOWN)
1. Paper, Printing, and Reproduction of Instruments & A4 Dossiers: ₱ 8,500.00
2. Cloud Storage, Domain & PWA Hosting Infrastructure: ₱ 12,000.00
3. Localized Training & School-Level LAC Orientation Materials: ₱ 6,500.00
4. Research Dissemination & Poster Production (Division Research Congress): ₱ 5,000.00
TOTAL ESTIMATED GRANT (Within BERF Action Research Threshold): ₱ 32,000.00

VII. PLANS FOR DISSEMINATION AND UTILIZATION
- School Level: Presentation in Mid-Year Learning Action Cell (LAC) sessions and integration into LNNCHS School Improvement Plan (SIP).
- Division Level: Submission to SDO Lanao del Norte Division Research Congress and SDRC publication repository.
- Regional Level: Entry to Regional Innovation Forum and publication in PPRD Regional Research Journal.
- Policy Translation: Draft Institutional Memo standardizing digital ILAW and 3-term automated grading workflows.

VIII. REFERENCES (APA 7th Edition)
1. Department of Education. (2017). DepEd Order No. 16, s. 2017: Research Management Guidelines. Pasig City: DepEd.
2. Department of Education. (2015). DepEd Order No. 43, s. 2015: Basic Education Research Fund (BERF). Pasig City: DepEd.
3. Republic of the Philippines. (2019). Republic Act No. 11293: Philippine Innovation Act. Official Gazette.
4. Department of Education. (2026). DepEd Order No. 009, s. 2026: Implementation of the Three-Term Academic Calendar.
5. Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. MIS Quarterly, 13(3), 319-340.
6. Department of Education. (2023). MATATAG: Bansang Makabata, Batang Makabansa. DepEd Memorandum No. 002, s. 2023.
7. Republic of the Philippines. (2012). Republic Act No. 10173: Data Privacy Act of 2012. Official Gazette.
    `.trim();

    navigator.clipboard.writeText(fullProposal);
    setCopiedAll(true);
    speakWithCebuanoMaleVoice('Full Regional Innovation Action Research Proposal copied to clipboard in official DepEd format.');
    setTimeout(() => setCopiedAll(false), 3000);
  };

  const copySectionText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Policy Foundation Header Banner */}
      <div className="bg-gradient-to-r from-[#002776] via-[#092B62] to-[#001f5c] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-b-4 border-amber-400 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116]/20 border border-[#FCD116]/40 text-[#FCD116] text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#FCD116]" />
              <span>Official DepEd Regional Innovation Standards</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <Award className="w-7 h-7 text-amber-300 shrink-0" />
              <span>Regional Action Research Guidelines for Innovation (DepEd)</span>
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-3xl leading-relaxed">
              Strict compliance with <strong>DepEd Order No. 16, s. 2017</strong> (Research Management Guidelines), <strong>DepEd Order No. 43, s. 2015</strong> (BERF), and the <strong>Philippine Innovation Act (RA 11293)</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleSaveAndFollowFormat}
              className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
                isSavedFormat
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-stone-950 border-2 border-emerald-300'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950 border-2 border-amber-300 animate-pulse'
              }`}
            >
              {isSavedFormat ? <CheckCheck className="w-4 h-4" /> : <Zap className="w-4 h-4 fill-stone-950" />}
              <span>{isSavedFormat ? '✓ Format Active & Enforced' : '⚡ Save & Follow This Format'}</span>
            </button>

            <button
              onClick={handleCopyAll}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-bold text-xs flex items-center gap-2 transition cursor-pointer"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-300" />}
              <span>{copiedAll ? 'Copied Entire Proposal!' : 'Copy Full Proposal'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-3 bg-white hover:bg-stone-100 text-[#002776] rounded-2xl font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4 text-[#002776]" />
              <span>Print A4 Dossier</span>
            </button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="p-3.5 bg-emerald-500/20 border border-emerald-400 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Legal & Policy Anchors Quick Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-[11px]">
          <div className="p-2.5 bg-white/10 backdrop-blur rounded-xl border border-white/10">
            <span className="font-black text-amber-300 block uppercase">1. National Mandates</span>
            <span className="text-blue-100">DO 16, s. 2017 (RMG) & DO 43, s. 2015 (BERF)</span>
          </div>
          <div className="p-2.5 bg-white/10 backdrop-blur rounded-xl border border-white/10">
            <span className="font-black text-emerald-300 block uppercase">2. Innovation Mandate</span>
            <span className="text-blue-100">RA 11293 (Philippine Innovation Act)</span>
          </div>
          <div className="p-2.5 bg-white/10 backdrop-blur rounded-xl border border-white/10">
            <span className="font-black text-cyan-300 block uppercase">3. Regional Directives</span>
            <span className="text-blue-100">PPRD Research & Innovation Guidelines (2026 Framework)</span>
          </div>
        </div>
      </div>

      {/* Thematic Area Selection Switcher */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#002776]" />
            <span>Core Thematic Area for Innovation</span>
          </h3>
          <p className="text-[11px] text-stone-500">
            Select the DepEd research priority theme aligned with your study focus.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setThematicArea('teaching_learning')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              thematicArea === 'teaching_learning'
                ? 'bg-[#002776] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Teaching &amp; Learning</span>
          </button>
          <button
            onClick={() => setThematicArea('governance_operations')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              thematicArea === 'governance_operations'
                ? 'bg-[#002776] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Governance &amp; Operations</span>
          </button>
        </div>
      </div>

      {/* Thematic Area Description Alert */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-950 text-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-900">
            {thematicArea === 'teaching_learning'
              ? 'Theme: Teaching and Learning'
              : 'Theme: Governance and Operations'}
          </span>
          <p className="text-blue-800 text-[11px] mt-0.5">
            {thematicArea === 'teaching_learning'
              ? 'Prioritizes research-based instructional interventions, 4-day ILAW delivery, remediation of least-learned competencies, reading and numeracy enhancement.'
              : 'Prioritizes administrative process automation, school operations optimization, reduction of student dropout rates, and teacher workload decongestion.'}
          </p>
        </div>
      </div>

      {/* STRICT STANDARD ACTION RESEARCH PROPOSAL OUTLINE (8 SECTIONS) */}
      <div className="space-y-4">
        
        {/* SECTION 1: CONTEXT AND RATIONALE */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#002776] text-white font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wide">Context and Rationale</h3>
            </div>
            <button
              onClick={() => copySectionText('sec1', `I. CONTEXT AND RATIONALE\nPublic school educators at Lanao del Norte National Comprehensive High School face significant instructional time loss caused by manual preparation of School Forms (SF1 to SF10), four-day ILAW lesson plans, and complex trimester grade transmutation calculations under DepEd Order No. 009, s. 2026. This administrative burden detracts from direct student engagement and timely interventions. In compliance with the MATATAG Agenda, DepEd Order No. 16, s. 2017, and the Philippine Innovation Act (RA 11293), Project B.O.I.S.E.R. was conceptualized as a localized digital innovation that automates routine workflows while keeping student data isolated and secure through role-based Adviser Doors.`)}
              className="text-[11px] font-bold text-[#002776] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === 'sec1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sec1' ? 'Copied' : 'Copy Section'}</span>
            </button>
          </div>
          <div className="text-xs text-stone-700 leading-relaxed space-y-2">
            <p>
              <strong>Regional Innovation Standard:</strong> Must identify the specific, localized problem in the school or classroom with clear baseline empirical evidence.
            </p>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-800 leading-normal">
              Public school educators at Lanao del Norte National Comprehensive High School face significant instructional time loss caused by manual preparation of School Forms (SF1 to SF10), four-day ILAW lesson plans, and complex trimester grade transmutation calculations under DepEd Order No. 009, s. 2026. This administrative burden detracts from direct student engagement and timely interventions. In compliance with the MATATAG Agenda, DepEd Order No. 16, s. 2017, and the Philippine Innovation Act (RA 11293), Project B.O.I.S.E.R. was conceptualized as a localized digital innovation that automates routine workflows while keeping student data isolated and secure through role-based Adviser Doors.
            </div>
          </div>
        </div>

        {/* SECTION 2: ACTION RESEARCH QUESTIONS */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#002776] text-white font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wide">Action Research Questions</h3>
            </div>
            <button
              onClick={() => copySectionText('sec2', `II. ACTION RESEARCH QUESTIONS\nThis study specifically answers the following:\n1. (Baseline Assessment) What is the average time (in hours per week) spent by LNNCHS Senior High School teachers on administrative documentation, lesson planning, and grade transmutation prior to using Project B.O.I.S.E.R.?\n2. (Intervention Mechanics) How is the Project B.O.I.S.E.R. platform utilized in terms of:\n   a. Daily ILAW 4-day lesson plan auto-generation;\n   b. Term-end automated grade tallying and transmutation; and\n   c. Offline-first local data vault and document generation?\n3. (Efficacy & Impact) Is there a statistically significant difference in teacher productivity, report card turnaround time, and grading precision after the implementation of Project B.O.I.S.E.R.?`)}
              className="text-[11px] font-bold text-[#002776] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === 'sec2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sec2' ? 'Copied' : 'Copy Section'}</span>
            </button>
          </div>
          <div className="text-xs text-stone-700 leading-relaxed space-y-2">
            <p>
              <strong>Regional Innovation Standard:</strong> Must formulate specific research questions where at least one directly addresses the intervention/innovation itself.
            </p>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-800 leading-normal space-y-1.5">
              <p>1. <strong>Baseline Question:</strong> What is the average weekly time (in hours) spent by teachers on paperwork and manual calculations prior to intervention?</p>
              <p>2. <strong>Intervention Question:</strong> How is Project B.O.I.S.E.R. utilized in terms of daily ILAW generation, 3-term SF9 transmutations, and offline vault caching?</p>
              <p>3. <strong>Efficacy Question:</strong> Is there a statistically significant increase in teacher instructional availability and grading turnaround time following the digital adoption?</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: PROPOSED INNOVATION, INTERVENTION, AND STRATEGY */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#002776] text-white font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wide">Proposed Innovation, Intervention, and Strategy</h3>
            </div>
            <button
              onClick={() => copySectionText('sec3', `III. PROPOSED INNOVATION, INTERVENTION, AND STRATEGY (P.I.I.S.)\n- Innovation Description: A full-stack, offline-first educational operating system featuring 18 unified modules, including 4-Day ILAW lesson generator, Three-Term SF9 grading engine, Adviser Doors, and local PWA container caching.\n- Teacher Activities: Teachers access the system via browser or installed Android/desktop app, input student raw scores, generate lesson plans with localized competencies, and print A4-compliant DepEd documents in 1-click.\n- Frequency & Duration: Daily lesson plan preparation (15 mins/day vs. 2 hrs manual) and term-end grading cycles across all three terms of School Year 2026–2027.\n- Verification & Control: Supervised under School Head and Assistant Principal monitoring with automated audit trails and Zero-Plagiarism Turnitin shields.`)}
              className="text-[11px] font-bold text-[#002776] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === 'sec3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sec3' ? 'Copied' : 'Copy Section'}</span>
            </button>
          </div>
          <div className="text-xs text-stone-700 leading-relaxed space-y-2">
            <p>
              <strong>Regional Innovation Standard:</strong> Clear, repeatable description of what the teacher and learner will do, how often (dosage), and for how long.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900 text-[11px] block">What Teacher Does:</span>
                <span className="text-[10px] text-amber-800">Enters raw scores, chooses weekly competencies, generates 4-day ILAW and printable SF9 in 1 click.</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900 text-[11px] block">Frequency & Dosage:</span>
                <span className="text-[10px] text-blue-800">Daily routine (15 mins ILAW generation) and tri-term grading cycles across SY 2026–2027.</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 text-[11px] block">Monitoring & Fidelity:</span>
                <span className="text-[10px] text-emerald-800">Principal III and Assistant Principal supervise through Adviser Door logs and submission sign-offs.</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: ACTION RESEARCH METHODS */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#002776] text-white font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wide">Action Research Methods</h3>
            </div>
            <button
              onClick={() => copySectionText('sec4', `IV. ACTION RESEARCH METHODS\nA. Participants and Data Sources:\n   - 45 Senior High School teachers across STEM, TVL, HUMSS, and ABM tracks at LNNCHS (complete enumeration).\n   - Administrative records including SF2 attendance accuracy and SF9 grade submission timestamps.\nB. Data Gathering Methods:\n   - Pre-intervention and post-intervention time-study logs.\n   - Standardized Technology Acceptance Model (TAM) survey measuring Perceived Usefulness (PU) and Perceived Ease of Use (PEOU) on a 5-point Likert scale.\n   - Automated system telemetry and processing speed benchmarks.\nC. Data Analysis Plan:\n   - Paired-samples t-test (p < 0.05) to measure significant reduction in administrative hours.\n   - Descriptive statistics (mean, standard deviation, and percentage) for TAM usability ratings.\n   - Strict adherence to RA 10173 (Data Privacy Act of 2012) and DepEd research ethics protocols.`)}
              className="text-[11px] font-bold text-[#002776] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === 'sec4' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sec4' ? 'Copied' : 'Copy Section'}</span>
            </button>
          </div>
          <div className="text-xs text-stone-700 leading-relaxed space-y-2">
            <p>
              <strong>Regional Innovation Standard:</strong> Must specify research design, participants/data sources, data gathering methods, and data analysis plan.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-[11px] block">A. Participants</span>
                <span className="text-[10px] text-stone-600">45 SHS faculty members of LNNCHS across STEM, TVL, HUMSS, and ABM strands.</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-[11px] block">B. Data Gathering</span>
                <span className="text-[10px] text-stone-600">Standardized TAM questionnaires, automated time tracking, and SF submission logs.</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-[11px] block">C. Data Analysis</span>
                <span className="text-[10px] text-stone-600">Paired t-test (pre vs post hours), Mean & SD, compliance with RA 10173 Data Privacy.</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: WORK PLAN AND TIMELINES */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#002776] text-white font-bold text-xs flex items-center justify-center">5</span>
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wide">Work Plan and Timelines</h3>
            </div>
            <button
              onClick={() => copySectionText('sec5', `V. WORK PLAN AND TIMELINES\n- Month 1-2: Proposal finalization, School Division Research Committee (SDRC) review, and baseline time survey.\n- Month 3-5: Term 1 implementation, pilot testing of ILAW generator and Adviser Doors, and mid-intervention focus group.\n- Month 6-8: Term 2 and Term 3 full-scale rollout, automated grading transmutation execution.\n- Month 9-10: Post-intervention survey, data triangulation, statistical analysis, and manuscript finalization.\n- Month 11-12: SDRC research dissemination, Division LAC sharing, and school policy adoption.`)}
              className="text-[11px] font-bold text-[#002776] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === 'sec5' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sec5' ? 'Copied' : 'Copy Section'}</span>
            </button>
          </div>
          <div className="text-xs text-stone-700 leading-relaxed">
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-800 space-y-1">
              <p>• <strong>Months 1–2:</strong> SDRC Protocol submission, teacher baseline time survey, and ethical clearance.</p>
              <p>• <strong>Months 3–5:</strong> Term 1 pilot rollout (4-Day ILAW generator & Adviser Doors).</p>
              <p>• <strong>Months 6–8:</strong> Terms 2 & 3 full implementation & SF9 transmutation runs.</p>
              <p>• <strong>Months 9–10:</strong> Post-intervention TAM survey, statistical t-test, and drafting of research report.</p>
              <p>• <strong>Months 11–12:</strong> Dissemination at SDO Lanao del Norte Congress and policy institutionalization.</p>
            </div>
          </div>
        </div>

        {/* SECTION 6: COST ESTIMATES */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#002776] text-white font-bold text-xs flex items-center justify-center">6</span>
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wide">Cost Estimates (BERF Guidelines Compliant)</h3>
            </div>
            <button
              onClick={() => copySectionText('sec6', `VI. COST ESTIMATES (BERF-ALIGNED BREAKDOWN)\n1. Paper, Printing, and Reproduction of Instruments & A4 Dossiers: ₱ 8,500.00\n2. Cloud Storage, Domain & PWA Hosting Infrastructure: ₱ 12,000.00\n3. Localized Training & School-Level LAC Orientation Materials: ₱ 6,500.00\n4. Research Dissemination & Poster Production (Division Research Congress): ₱ 5,000.00\nTOTAL ESTIMATED GRANT: ₱ 32,000.00`)}
              className="text-[11px] font-bold text-[#002776] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === 'sec6' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sec6' ? 'Copied' : 'Copy Section'}</span>
            </button>
          </div>
          <div className="text-xs text-stone-700 leading-relaxed">
            <p className="mb-2">
              <strong>Regional Innovation Standard:</strong> Budget breakdown strictly restricted to non-capital, allowable research operational expenses under DepEd Order No. 43, s. 2015.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px]">A4 Papers & Printing</span>
                <span className="font-black text-stone-900 text-xs">₱ 8,500.00</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px]">Cloud & Domain Hosting</span>
                <span className="font-black text-stone-900 text-xs">₱ 12,000.00</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px]">LAC Training Kits</span>
                <span className="font-black text-stone-900 text-xs">₱ 6,500.00</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-700 block text-[10px] font-bold">Total BERF Grant</span>
                <span className="font-black text-emerald-950 text-sm">₱ 32,000.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: PLANS FOR DISSEMINATION AND UTILIZATION */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#002776] text-white font-bold text-xs flex items-center justify-center">7</span>
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wide">Plans for Dissemination and Utilization</h3>
            </div>
            <button
              onClick={() => copySectionText('sec7', `VII. PLANS FOR DISSEMINATION AND UTILIZATION\n- School Level: Presentation in Mid-Year Learning Action Cell (LAC) sessions and integration into LNNCHS School Improvement Plan (SIP).\n- Division Level: Submission to SDO Lanao del Norte Division Research Congress and SDRC publication repository.\n- Regional Level: Entry to Regional Innovation Forum and publication in PPRD Regional Research Journal.\n- Policy Translation: Draft Institutional Memo standardizing digital ILAW and 3-term automated grading workflows.`)}
              className="text-[11px] font-bold text-[#002776] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === 'sec7' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sec7' ? 'Copied' : 'Copy Section'}</span>
            </button>
          </div>
          <div className="text-xs text-stone-700 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-[11px] block">1. Research Dissemination</span>
                <span className="text-[10px] text-stone-600">Presentation at LNNCHS School LAC, Division Research Congress (SDO Lanao del Norte), and Regional Innovation Fair.</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-[11px] block">2. Policy Translation</span>
                <span className="text-[10px] text-stone-600">Institutional School Memo adopting Project B.O.I.S.E.R. as the standard automated lesson plan and grading framework.</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 8: REFERENCES */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#002776] text-white font-bold text-xs flex items-center justify-center">8</span>
              <h3 className="font-black text-stone-900 text-sm uppercase tracking-wide">References (APA 7th Edition)</h3>
            </div>
            <button
              onClick={() => copySectionText('sec8', `VIII. REFERENCES (APA 7th Edition)\n1. Department of Education. (2017). DepEd Order No. 16, s. 2017: Research Management Guidelines. Pasig City: DepEd.\n2. Department of Education. (2015). DepEd Order No. 43, s. 2015: Basic Education Research Fund (BERF). Pasig City: DepEd.\n3. Republic of the Philippines. (2019). Republic Act No. 11293: Philippine Innovation Act. Official Gazette.\n4. Department of Education. (2026). DepEd Order No. 009, s. 2026: Implementation of the Three-Term Academic Calendar.\n5. Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. MIS Quarterly, 13(3), 319-340.\n6. Department of Education. (2023). MATATAG: Bansang Makabata, Batang Makabansa. DepEd Memorandum No. 002, s. 2023.\n7. Republic of the Philippines. (2012). Republic Act No. 10173: Data Privacy Act of 2012. Official Gazette.`)}
              className="text-[11px] font-bold text-[#002776] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === 'sec8' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'sec8' ? 'Copied' : 'Copy Section'}</span>
            </button>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-800 space-y-1.5 leading-relaxed">
            <p>1. Department of Education. (2017). <em>DepEd Order No. 16, s. 2017: Research Management Guidelines</em>. Pasig City: DepEd.</p>
            <p>2. Department of Education. (2015). <em>DepEd Order No. 43, s. 2015: Basic Education Research Fund (BERF)</em>. Pasig City: DepEd.</p>
            <p>3. Republic of the Philippines. (2019). <em>Republic Act No. 11293: Philippine Innovation Act</em>. Official Gazette of the Philippines.</p>
            <p>4. Department of Education. (2026). <em>DepEd Order No. 009, s. 2026: Implementation of the Three-Term Academic Calendar</em>.</p>
            <p>5. Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. <em>MIS Quarterly</em>, 13(3), 319-340.</p>
            <p>6. Department of Education. (2023). <em>MATATAG: Bansang Makabata, Batang Makabansa</em>. DepEd Memorandum No. 002, s. 2023.</p>
            <p>7. Republic of the Philippines. (2012). <em>Republic Act No. 10173: Data Privacy Act of 2012</em>. Official Gazette.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
