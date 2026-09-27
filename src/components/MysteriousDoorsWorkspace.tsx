import React, { useState } from 'react';
import { 
  Calendar, 
  BookOpen, 
  FileSpreadsheet, 
  BarChart3, 
  FolderOpen, 
  Grid, 
  QrCode, 
  Users, 
  ShieldAlert, 
  Lightbulb, 
  Headphones, 
  Award, 
  Camera, 
  Sparkles, 
  FileText, 
  Lock, 
  CheckCircle2, 
  UserCheck, 
  Eye, 
  Download, 
  MessageSquare, 
  Tv, 
  ArrowLeft,
  Zap,
  Clock,
  FileCheck,
  ListChecks,
  Compass,
  HeartPulse,
  AlarmClock,
  Activity
} from 'lucide-react';
import { SectionDefinition } from '../data/lnnchsCompleteSectionsDirectory';
import { SingleSFInspector } from './SingleSFInspector';
import { StudentDocumentVault } from './StudentDocumentVault';
import { SeatingChartManager } from './SeatingChartManager';
import { QRScannerModule } from './QRScannerModule';
import { BOWGeneratorTool } from './BOWGeneratorTool';
import { SummativeHub } from './SummativeHub';
import { GradeTallyInputForm } from './GradeTallyInputForm';
import { DoorFileSummary } from './DoorFileSummary';
import { DoorCameraScanner } from './DoorCameraScanner';
import { ILAWGenerator } from './ILAWGenerator';
import { BoiserChatbot } from './BoiserChatbot';
import { DepEdLdnOlsStatusIndicator } from './DepEdLdnOlsStatusIndicator';
import { LNNCHSMasterLISDirectorySearch } from './LNNCHSMasterLISDirectorySearch';
import { LNNCHSBlankTemplatesModule } from './LNNCHSBlankTemplatesModule';
import { LRMDSModule } from './LRMDSModule';
import { LASGenerator } from './LASGenerator';
import { EducationalSourcesHub } from './EducationalSourcesHub';
import { PosterMaker } from './PosterMaker';
import { ActionResearchAnnexModule } from './ActionResearchAnnexModule';
import { TurnitinDetectorModule } from './TurnitinDetectorModule';
import { ChalkScoringSheetToolkit } from './ChalkScoringSheetToolkit';

interface MysteriousDoorsWorkspaceProps {
  activeSection: SectionDefinition;
  onCloseDoor: () => void;
  isOfficialAuthorized: boolean;
  currentUser: any;
  showNotification: (type: 'success' | 'error', text: string) => void;
  setPreviewDoorData: (data: any) => void;
  setShowChathead: (val: boolean) => void;
  showChathead: boolean;
  setShowDemo: (val: boolean) => void;
}

export const MysteriousDoorsWorkspace: React.FC<MysteriousDoorsWorkspaceProps> = ({
  activeSection,
  onCloseDoor,
  isOfficialAuthorized,
  currentUser,
  showNotification,
  setPreviewDoorData,
  setShowChathead,
  showChathead,
  setShowDemo
}) => {
  // Active selected mysterious door (1 to 8) or null (showing all 8 doors)
  const [selectedMysteriousDoor, setSelectedMysteriousDoor] = useState<number | null>(null);
  
  // Internal tab state within the selected door or quick tool
  const [activeSubTab, setActiveSubTab] = useState<string>('default');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<'activity' | 'exam' | 'qr' | 'rute' | 'ddt'>('activity');

  const mysteriousDoors = [
    {
      id: 1,
      num: '1',
      title: 'TEACH & PLAN',
      subtitle: 'Lessons, ILAW, BOW, LAS & LRMDS',
      colorName: 'blue',
      bgColor: 'from-blue-900 via-blue-800 to-indigo-950',
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/50',
      doorBg: 'bg-gradient-to-b from-blue-700 via-blue-800 to-blue-950',
      spotlight: 'from-blue-400/30 to-transparent',
      icon: Calendar,
      badge: 'Curriculum & Instruction',
      subTabs: [
        { id: 'weekly_dll', label: '📝 Weekly DLL / ILAW Generator', icon: Sparkles },
        { id: 'bow_generator', label: '📚 Budget of Work (BOW)', icon: BookOpen },
        { id: 'las_generator', label: '📝 Learning Activity Sheets (LAS)', icon: FileCheck },
        { id: 'lrmds_resources', label: '🖼️ DepEd LRMDS Resource Hub', icon: FolderOpen },
        { id: 'curriculum_db', label: '🎓 MATATAG Curriculum Database', icon: Compass },
        { id: 'door_3d_poster_gen', label: '🎨 3D Enhanced Visual Poster Generator', icon: Sparkles }
      ]
    },
    {
      id: 2,
      num: '2',
      title: 'ASSESS & ANALYZE',
      subtitle: 'Test Bank, QR Grading & Item Analysis',
      colorName: 'orange',
      bgColor: 'from-amber-800 via-orange-900 to-amber-950',
      borderColor: 'border-amber-500',
      glowColor: 'shadow-amber-500/50',
      doorBg: 'bg-gradient-to-b from-amber-600 via-amber-800 to-amber-950',
      spotlight: 'from-amber-400/30 to-transparent',
      icon: BarChart3,
      badge: 'Assessment & Analytics',
      subTabs: [
        { id: 'chalk_toolkit', label: '📊 Chalk Quick Toolkit (Mobile Sync)', icon: FileSpreadsheet },
        { id: 'summative_item_analysis', label: '📊 Item Analysis & TOS Hub', icon: BarChart3 },
        { id: 'summative_hub', label: '🏆 Summative Tests Hub', icon: Award },
        { id: 'grading_summary', label: '📈 LIS Grade Tally & Lock', icon: Lock },
        { id: 'camera_hub', label: '📸 Smart Vision Camera Scanner', icon: Camera },
        { id: 'door_3d_poster_gen', label: '🎨 3D Enhanced Visual Poster Generator', icon: Sparkles }
      ]
    },
    {
      id: 3,
      num: '3',
      title: 'RECORDS & DOCUMENTS',
      subtitle: 'SF1-SF10, LIS 120 Directory & Blank Templates',
      colorName: 'cyan',
      bgColor: 'from-cyan-800 via-teal-900 to-cyan-950',
      borderColor: 'border-cyan-400',
      glowColor: 'shadow-cyan-400/50',
      doorBg: 'bg-gradient-to-b from-cyan-600 via-cyan-800 to-cyan-950',
      spotlight: 'from-cyan-300/30 to-transparent',
      icon: FolderOpen,
      badge: 'Official DepEd Records',
      subTabs: [
        { id: 'sf_records', label: '📋 Official SF1–SF10 Reports', icon: FileSpreadsheet },
        { id: 'lis_120_directory', label: '📖 LIS Master 120 Directory', icon: BookOpen },
        { id: 'blank_templates', label: '📄 Official LNNCHS Blank Templates', icon: FileText },
        { id: 'student_vault', label: '🗂️ Student Document Vault', icon: FolderOpen },
        { id: 'file_summary', label: '📂 Door File Summary', icon: FolderOpen },
        { id: 'door_3d_poster_gen', label: '🎨 3D Enhanced Visual Poster Generator', icon: Sparkles }
      ]
    },
    {
      id: 4,
      num: '4',
      title: 'CLASSROOM MANAGEMENT',
      subtitle: 'Biometric Gate, Seating & Behavior',
      colorName: 'purple',
      bgColor: 'from-purple-900 via-indigo-950 to-purple-950',
      borderColor: 'border-purple-500',
      glowColor: 'shadow-purple-500/50',
      doorBg: 'bg-gradient-to-b from-purple-700 via-purple-900 to-purple-950',
      spotlight: 'from-purple-400/30 to-transparent',
      icon: Users,
      badge: 'Classroom & Attendance',
      subTabs: [
        { id: 'seating_chart', label: '🪑 Seating Arrangement Manager', icon: Grid },
        { id: 'qr_attendance', label: '📱 Biometric & QR Gate Attendance', icon: QrCode },
        { id: 'door_3d_poster_gen', label: '🎨 3D Enhanced Visual Poster Generator', icon: Sparkles }
      ]
    },
    {
      id: 5,
      num: '5',
      title: 'ADMIN CONCERNS',
      subtitle: 'DepEd Orders, Memos & Substitutions',
      colorName: 'red',
      bgColor: 'from-red-900 via-rose-950 to-red-950',
      borderColor: 'border-red-500',
      glowColor: 'shadow-red-500/50',
      doorBg: 'bg-gradient-to-b from-red-700 via-red-900 to-red-950',
      spotlight: 'from-red-400/30 to-transparent',
      icon: ShieldAlert,
      badge: 'Administrative & Governance',
      subTabs: [
        { id: 'substitution', label: '🛡️ Substitution Plans & Alerts', icon: AlarmClock },
        { id: 'activity_log', label: '🔒 Secure Activity Audit Log', icon: Activity },
        { id: 'door_3d_poster_gen', label: '🎨 3D Enhanced Visual Poster Generator', icon: Sparkles }
      ]
    },
    {
      id: 6,
      num: '6',
      title: 'RESEARCH & CREATIVE TOOLS',
      subtitle: 'Action Research, Anti-Turnitin & AI',
      colorName: 'green',
      bgColor: 'from-emerald-900 via-green-950 to-emerald-950',
      borderColor: 'border-emerald-500',
      glowColor: 'shadow-emerald-500/50',
      doorBg: 'bg-gradient-to-b from-emerald-700 via-emerald-900 to-emerald-950',
      spotlight: 'from-emerald-400/30 to-transparent',
      icon: Lightbulb,
      badge: 'Research & AI Innovation',
      subTabs: [
        { id: 'action_research', label: '🔬 Action Research Proposals (Annex A-D)', icon: Lightbulb },
        { id: 'humanizer', label: '🛡️ 0% Anti-Turnitin AI Humanizer', icon: Sparkles },
        { id: 'door_3d_poster_gen', label: '🎨 3D Enhanced Visual Poster Generator', icon: Sparkles }
      ]
    },
    {
      id: 7,
      num: '7',
      title: 'SUPPORT FEATURES & MATERIALS',
      subtitle: 'Guidance Desk, MATATAG Materials & AI',
      colorName: 'royalblue',
      bgColor: 'from-blue-950 via-indigo-900 to-slate-950',
      borderColor: 'border-blue-400',
      glowColor: 'shadow-blue-400/50',
      doorBg: 'bg-gradient-to-b from-blue-800 via-indigo-900 to-blue-950',
      spotlight: 'from-blue-300/30 to-transparent',
      icon: Headphones,
      badge: 'Teacher Support & Materials',
      subTabs: [
        { id: 'boiser_ai_chat', label: '💬 Boiser AI Companion', icon: MessageSquare },
        { id: 'matatag_supplements', label: '📚 MATATAG Supplementary Materials', icon: BookOpen },
        { id: '4k_tv_guide', label: '📺 4K TV Tour Demo Guide', icon: Tv },
        { id: 'door_3d_poster_gen', label: '🎨 3D Enhanced Visual Poster Generator', icon: Sparkles }
      ]
    },
    {
      id: 8,
      num: '8',
      title: 'RPMS & COT TOOLS',
      subtitle: 'COT Lesson Plans & IPCRF Portfolios',
      colorName: 'pink',
      bgColor: 'from-pink-900 via-rose-950 to-fuchsia-950',
      borderColor: 'border-pink-500',
      glowColor: 'shadow-pink-500/50',
      doorBg: 'bg-gradient-to-b from-pink-700 via-pink-900 to-pink-950',
      spotlight: 'from-pink-400/30 to-transparent',
      icon: Award,
      badge: 'PPST & Faculty Evaluation',
      subTabs: [
        { id: 'cot_exemplar', label: '📑 COT Lesson Plan Exemplars', icon: Award },
        { id: 'ipcrf_portfolio', label: '🏅 IPCRF Portfolio & PPST Indicators', icon: CheckCircle2 },
        { id: 'door_3d_poster_gen', label: '🎨 3D Enhanced Visual Poster Generator', icon: Sparkles }
      ]
    }
  ];

  const quickAccessTools = [
    { id: 'calendar', label: 'Calendar & Deadlines', icon: '📅', doorTarget: 1, tabTarget: 'weekly_dll' },
    { id: 'attendance', label: 'Attendance & Time Record', icon: '👥', doorTarget: 4, tabTarget: 'qr_attendance' },
    { id: 'cert_gen', label: 'Certificate Generator', icon: '📜', doorTarget: 8, tabTarget: 'ipcrf_portfolio' },
    { id: 'ocr_scan', label: 'Document Scanner (OCR)', icon: '📷', doorTarget: 2, tabTarget: 'camera_hub' },
    { id: 'rubrics', label: 'Rubric & Checklist', icon: '📋', doorTarget: 6, tabTarget: 'action_research' },
    { id: 'progress', label: 'Student Progress Tracker', icon: '📊', doorTarget: 2, tabTarget: 'summative_item_analysis' },
    { id: 'automation', label: 'Automation & Workflow', icon: '⚙️', doorTarget: 5, tabTarget: 'substitution' }
  ];

  const selectedDoorData = mysteriousDoors.find(d => d.id === selectedMysteriousDoor);

  return (
    <div className="bg-stone-950 rounded-3xl p-4 sm:p-8 shadow-2xl border-4 border-amber-500/40 space-y-6 text-white relative overflow-hidden font-sans">
      
      {/* Background Spotlight Visuals */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER BANNER - MATCHING UPLOADED PHOTO */}
      <div className="relative z-10 bg-gradient-to-r from-[#031533] via-[#082252] to-[#031533] rounded-2xl p-6 border-2 border-amber-400/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left / Center Logo & Branding */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative group shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 p-1 shadow-2xl shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#001740] rounded-xl flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-black text-amber-300 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">B</span>
                <span className="absolute top-1 text-[10px] text-amber-400">🎓</span>
              </div>
            </div>
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-amber-400 text-blue-950 text-[9px] font-black rounded-full uppercase tracking-wider">
              v3.0
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 uppercase">
                BOISER POWER TOOLS
              </h1>
            </div>
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs sm:text-sm rounded-full tracking-widest uppercase shadow-md border border-cyan-300/50">
              FACULTY DOORS • GRADE {activeSection.gradeLevel} ({activeSection.sectionName})
            </div>
            <p className="text-xs text-stone-300 font-bold tracking-wide">
              v3.0 Modular Architecture • Adviser: <strong className="text-amber-300">{activeSection.adviserName}</strong>
            </p>
          </div>
        </div>

        {/* Right Tagline & Free Badge */}
        <div className="text-center lg:text-right space-y-2 max-w-md">
          <div className="text-amber-300 font-serif italic text-sm sm:text-base font-bold drop-shadow">
            "Your Complete Teaching &amp; Administrative Workspace"
          </div>
          <p className="text-[11px] text-stone-300 leading-snug font-medium">
            One Faculty Member, One Private Workspace, One Place for Teaching, Records, Assessment, and Documentation.
          </p>
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-blue-950 font-black text-xs rounded-full uppercase tracking-widest shadow-lg border border-amber-200 rotate-1 transform hover:rotate-0 transition">
            ⚡ FREE FOR TEACHERS!
          </div>
        </div>

        {/* Exit Door Button */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={onCloseDoor}
            className="px-5 py-2.5 bg-red-600/90 hover:bg-red-600 text-white rounded-xl text-xs font-black transition cursor-pointer shadow-lg border border-red-400 flex items-center gap-2 uppercase tracking-wider"
          >
            <span>🚪 Exit Section Door</span>
          </button>
        </div>
      </div>

      {/* DEPED LDN OLS LEAVE STATUS INDICATOR */}
      {(String(activeSection.gradeLevel).includes('11') || String(activeSection.gradeLevel).includes('12') || String(activeSection.gradeLevel).toLowerCase().includes('shs')) && (
        <DepEdLdnOlsStatusIndicator
          teacherName={activeSection.adviserName}
          isShsTeacher={true}
          position={`SHS Adviser • Grade ${activeSection.gradeLevel}`}
          advisoryClass={`Grade ${activeSection.gradeLevel} - ${activeSection.sectionName}`}
        />
      )}

      {/* MAIN VIEW: 8 MYSTERIOUS DOORS OR SELECTED DOOR WORKSPACE */}
      {selectedMysteriousDoor === null ? (
        <div className="space-y-8 py-4">
          
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-amber-300 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              <span>Select Mysterious Door To Open Tools</span>
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </h2>
            <p className="text-xs text-stone-400">Click any illuminated door below to access its specific modules for {activeSection.sectionName}.</p>
          </div>

          {/* THE 8 MYSTERIOUS DOORS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 relative z-10">
            {mysteriousDoors.map((door) => {
              const Icon = door.icon;
              return (
                <div
                  key={door.id}
                  onClick={() => {
                    setSelectedMysteriousDoor(door.id);
                    setActiveSubTab(door.subTabs[0].id);
                  }}
                  className={`group relative rounded-2xl ${door.doorBg} p-3.5 border-2 ${door.borderColor} shadow-xl hover:${door.glowColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between h-[280px] sm:h-[320px] overflow-hidden`}
                >
                  {/* Spotlight beam effect above each door */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 bg-gradient-to-b ${door.spotlight} pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Door Arch Header Spotlight Bulb */}
                  <div className="w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_12px_#f59e0b] mx-auto mb-2 border border-white shrink-0" />

                  {/* Circular Embossed Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-white/40 backdrop-blur-md mx-auto flex items-center justify-center text-xl sm:text-2xl font-black text-amber-300 shadow-inner group-hover:scale-110 transition-transform shrink-0">
                    {door.num}
                  </div>

                  {/* Center Icon */}
                  <div className="my-auto text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-white group-hover:rotate-6 transition-transform shadow">
                      <Icon className="w-6 h-6 text-amber-300" />
                    </div>
                  </div>

                  {/* Door Title & Bottom Knobs */}
                  <div className="text-center space-y-2 pt-2 border-t border-white/20">
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white leading-tight">
                      {door.title}
                    </h3>
                    <p className="text-[9px] text-stone-200 line-clamp-2 leading-tight opacity-90">
                      {door.subtitle}
                    </p>

                    {/* Door Handle Graphic */}
                    <div className="flex items-center justify-end px-1 pt-1">
                      <div className="w-2.5 h-6 rounded-full bg-amber-400 border border-amber-600 shadow-sm" />
                    </div>
                  </div>

                  {/* Hover Open Overlay */}
                  <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center space-y-2">
                    <span className="px-3 py-1 bg-amber-400 text-blue-950 font-black text-[10px] rounded-full uppercase tracking-wider">
                      OPEN DOOR {door.num}
                    </span>
                    <span className="text-[10px] text-white font-bold leading-tight">
                      {door.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* QUICK ACCESS TOOLS BAR - MATCHING UPLOADED PHOTO TOOLBAR */}
          <div className="bg-gradient-to-r from-[#021029] via-[#07214a] to-[#021029] rounded-2xl p-4 border-2 border-cyan-500/40 shadow-xl space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Quick Access Badge */}
              <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xs rounded-xl uppercase tracking-wider flex items-center gap-2 shadow border border-cyan-300 shrink-0">
                <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>QUICK ACCESS TOOLS</span>
              </div>

              {/* 7 Quick Access Items */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 flex-1 w-full">
                {quickAccessTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedMysteriousDoor(tool.doorTarget);
                      setActiveSubTab(tool.tabTarget);
                    }}
                    className="p-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl transition text-left flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="text-base group-hover:scale-125 transition-transform">{tool.icon}</span>
                    <span className="text-[10px] font-bold text-stone-200 leading-tight group-hover:text-amber-300 truncate">
                      {tool.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Footer Tagline */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 font-medium">
              <span className="font-bold text-amber-300">BOISER POWER TOOLS • FACULTY DOORS v3.0</span>
              <span className="font-serif italic text-amber-200">Smarter Tools. Brighter Teaching.</span>
            </div>
          </div>
        </div>
      ) : (
        /* OPENED MYSTERIOUS DOOR WORKSPACE */
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          
          {/* Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedMysteriousDoor(null)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All 8 Doors</span>
              </button>
              <div>
                <div className="text-[10px] uppercase font-black tracking-wider text-amber-300">
                  Door #{selectedDoorData?.num} • {selectedDoorData?.badge}
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <span>{selectedDoorData?.title}</span>
                </h2>
              </div>
            </div>

            {/* Sub-Tabs Selector inside this door */}
            <div className="flex flex-wrap items-center gap-2">
              {selectedDoorData?.subTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-blue-950 shadow-md'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC MODULE CONTENT ACCORDING TO SUB-TAB */}
          <div className="bg-white text-stone-900 rounded-3xl p-6 shadow-xl border border-stone-200 space-y-6">
            
            {/* 1. TEACH & PLAN SUB-TABS */}
            {activeSubTab === 'weekly_dll' && (
              <ILAWGenerator />
            )}

            {activeSubTab === 'bow_generator' && (
              <BOWGeneratorTool />
            )}

            {activeSubTab === 'las_generator' && (
              <LASGenerator />
            )}

            {activeSubTab === 'lrmds_resources' && (
              <LRMDSModule />
            )}

            {activeSubTab === 'curriculum_db' && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h3 className="text-sm font-black text-[#092B62] uppercase">MATATAG K–12 Curriculum Search Database</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Search and query competencies, content standards, and learning objectives across Grades 7 to 12.
                  </p>
                </div>
                <ILAWGenerator />
              </div>
            )}

            {/* 3D POSTER GENERATOR ACCESSIBLE IN ALL DOORS */}
            {activeSubTab === 'door_3d_poster_gen' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white rounded-2xl flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>3D-Enhanced Visual Classroom Poster &amp; Visuals Generator</span>
                    </h3>
                    <p className="text-xs text-blue-100 mt-0.5">
                      Generate actual high-resolution visual posters, infographics, and 3D pedagogical models for {activeSection.sectionName}.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-black uppercase rounded-full">
                    3D Visual Engine
                  </span>
                </div>
                <PosterMaker />
              </div>
            )}

            {/* 2. ASSESS & ANALYZE SUB-TABS */}
            {activeSubTab === 'chalk_toolkit' && (
              <ChalkScoringSheetToolkit sectionName={activeSection.sectionName} isEmbedded={true} />
            )}

            {activeSubTab === 'summative_item_analysis' && (
              <SummativeHub sectionName={activeSection.sectionName} gradeLevel={activeSection.gradeLevel} />
            )}

            {activeSubTab === 'summative_hub' && (
              <SummativeHub sectionName={activeSection.sectionName} gradeLevel={activeSection.gradeLevel} />
            )}

            {activeSubTab === 'grading_summary' && (
              <GradeTallyInputForm sectionId={activeSection.sectionId || activeSection.id} onPush={(tally, code) => showNotification('success', 'Grades pushed successfully!')} />
            )}

            {activeSubTab === 'camera_hub' && (
              <div className="space-y-6">
                <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <Camera className="w-3 h-3" /> Smart Vision Node
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Digital Inspection &amp; Grading Hub</h3>
                    <p className="text-slate-400 text-xs max-w-xl font-medium leading-relaxed">
                      Use the high-precision camera to scan student activities, exam answer sheets (RUTE), and official DepEd QR codes.
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                      {[
                        { id: 'activity', name: 'Check Activity', icon: FileCheck },
                        { id: 'exam', name: 'Grade Exam', icon: ListChecks },
                        { id: 'rute', name: 'RUTE Scanner', icon: Zap },
                        { id: 'qr', name: 'Verify QR', icon: QrCode }
                      ].map(mode => (
                        <button 
                          key={mode.id}
                          onClick={() => { setScannerMode(mode.id as any); setIsScannerOpen(true); }}
                          className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition flex flex-col items-center gap-2 text-center group"
                        >
                          <mode.icon className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-wider">{mode.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <DoorCameraScanner 
                  isOpen={isScannerOpen} 
                  onClose={() => setIsScannerOpen(false)} 
                  mode={scannerMode}
                  onResult={(res) => {
                    showNotification('success', `Scan complete! Result: ${res.score || res.status}`);
                  }}
                />
              </div>
            )}

            {/* 3. RECORDS & DOCUMENTS SUB-TABS */}
            {activeSubTab === 'sf_records' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-200">
                  <div>
                    <h3 className="text-sm font-black text-[#092B62]">
                      Official School Forms (SF1 to SF10) — {activeSection.sectionName}
                    </h3>
                    <p className="text-xs text-stone-600">
                      Strictly confidential LIS records accessible only by {activeSection.adviserName} and Authorized Officials.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { code: 'SF1', name: 'School Register (Masterlist)', desc: 'Complete student demographics, birthdates, LRN, and parents.' },
                    { code: 'SF2', name: 'Daily Attendance Report', desc: 'Monthly attendance tracking and absentism monitoring.' },
                    { code: 'SF3', name: 'Books Issued & Returned', desc: 'Textbook accountability per learner.' },
                    { code: 'SF4', name: 'Monthly Summary of Attendance', desc: 'Enrolment fluctuation and dropout tracking report.' },
                    { code: 'SF5', name: 'Report on Promotion & Level', desc: 'Summary of promoted, retained, and conditional learners.' },
                    { code: 'SF9', name: 'Learner Progress Report Card', desc: 'Trimester grading summaries and transmutation matrices.' },
                    { code: 'SF10', name: 'Permanent Academic Record', desc: 'Form 137 complete educational transcripts across grade levels.' }
                  ].map(form => (
                    <div key={form.code} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between hover:border-blue-300 transition">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-1 rounded-lg bg-[#092B62] text-white text-xs font-black">
                            {form.code}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Ready for Export
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-stone-900 mb-1">{form.name}</h4>
                        <p className="text-xs text-stone-500 mb-4">{form.desc}</p>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-stone-200">
                        <button
                          onClick={() => {
                            setPreviewDoorData({
                              doorName: `${form.name} — ${activeSection.sectionName}`,
                              doorRole: `Official School Form • ${activeSection.adviserName}`,
                              gradeLevel: `Grade ${activeSection.gradeLevel}`,
                              sectionName: activeSection.sectionName,
                              itemData: {
                                id: form.code,
                                title: form.name,
                                code: form.code,
                                category: 'Official School Form',
                                description: form.desc,
                                gradeLevel: `Grade ${activeSection.gradeLevel}`,
                                sectionName: activeSection.sectionName,
                                adviserName: activeSection.adviserName
                              }
                            });
                          }}
                          className="flex-1 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-stone-950" />
                          <span>Preview</span>
                        </button>
                        <button
                          onClick={() => showNotification('success', `Generated ${form.code} for ${activeSection.sectionName}`)}
                          className="flex-1 py-2 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-300" />
                          <span>Export</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSubTab === 'lis_120_directory' && (
              <LNNCHSMasterLISDirectorySearch />
            )}

            {activeSubTab === 'blank_templates' && (
              <LNNCHSBlankTemplatesModule />
            )}

            {activeSubTab === 'student_vault' && (
              <StudentDocumentVault sectionName={activeSection.sectionName} gradeLevel={activeSection.gradeLevel} teacherName={activeSection.adviserName} />
            )}

            {activeSubTab === 'file_summary' && (
              <DoorFileSummary sectionName={activeSection.sectionName} gradeLevel={`Grade ${activeSection.gradeLevel}`} />
            )}

            {/* 4. CLASSROOM MANAGEMENT SUB-TABS */}
            {activeSubTab === 'seating_chart' && (
              <SeatingChartManager sectionName={activeSection.sectionName} />
            )}

            {activeSubTab === 'qr_attendance' && (
              <QRScannerModule sectionName={activeSection.sectionName} />
            )}

            {/* 5. ADMIN CONCERNS SUB-TABS */}
            {activeSubTab === 'substitution' && (
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <h3 className="text-sm font-black text-amber-900 uppercase">My Substitution Plans &amp; Alerts</h3>
                  <p className="text-xs text-amber-800 mt-1">
                    Manage assigned substitute class loads, view coverage schedules, and respond to school alerts.
                  </p>
                </div>
              </div>
            )}

            {activeSubTab === 'activity_log' && (
              <div className="space-y-4">
                <div className="p-4 bg-stone-100 border border-stone-200 rounded-2xl">
                  <h3 className="text-sm font-black text-stone-900 uppercase">Secure Door Activity Audit Log</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    All document exports, grade locking, and LIS sync activities are timestamped and encrypted.
                  </p>
                </div>
              </div>
            )}

            {/* 6. RESEARCH & CREATIVE SUB-TABS */}
            {activeSubTab === 'action_research' && (
              <ActionResearchAnnexModule />
            )}

            {activeSubTab === 'humanizer' && (
              <TurnitinDetectorModule />
            )}

            {/* 7. SUPPORT FEATURES SUB-TABS */}
            {activeSubTab === 'boiser_ai_chat' && (
              <div className="h-[550px] border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <BoiserChatbot variant="embedded" />
              </div>
            )}

            {activeSubTab === 'matatag_supplements' && (
              <EducationalSourcesHub />
            )}

            {activeSubTab === '4k_tv_guide' && (
              <div className="p-6 bg-stone-900 text-white rounded-2xl space-y-4">
                <h3 className="text-base font-black uppercase text-amber-300">4K TV Tour Demo Guide</h3>
                <p className="text-xs text-stone-300">
                  Interactive multi-screen guidance for presenting class records, ILAW lesson exemplars, and school forms on classroom smart TVs.
                </p>
              </div>
            )}

            {/* 8. RPMS & COT TOOLS SUB-TABS */}
            {activeSubTab === 'cot_exemplar' && (
              <div className="p-6 bg-gradient-to-r from-pink-900 to-rose-900 text-white rounded-2xl space-y-2">
                <h3 className="text-base font-black uppercase">COT Lesson Plan Exemplars (DO 3 s. 2026)</h3>
                <p className="text-xs text-pink-100">
                  Pre-formatted COT-1 &amp; COT-2 lesson plans embedded with PPST indicators and 4As/5E instructional models.
                </p>
              </div>
            )}

            {activeSubTab === 'ipcrf_portfolio' && (
              <div className="p-6 bg-gradient-to-r from-fuchsia-900 to-purple-900 text-white rounded-2xl space-y-2">
                <h3 className="text-base font-black uppercase">IPCRF Portfolio &amp; PPST Indicators Hub</h3>
                <p className="text-xs text-fuchsia-100">
                  Organize MOV artifacts, automated rating computation sheets, and RPMS portfolio binders.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
