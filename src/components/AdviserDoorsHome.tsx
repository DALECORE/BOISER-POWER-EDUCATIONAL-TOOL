import React, { useState, useEffect } from 'react';
import { 
  DoorClosed, 
  DoorOpen, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Users, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Building, 
  Award, 
  BarChart3, 
  Activity, 
  Key, 
  FileSpreadsheet, 
  Calendar,
  Home,
  ChevronRight,
  Eye,
  ShieldAlert,
  HelpCircle,
  Volume2,
  VolumeX,
  BookOpen,
  ArrowRight,
  Compass,
  FolderOpen,
  HeartPulse,
  Bell,
  AlarmClock,
  Download,
  MessageSquare,
  Camera,
  FileCheck,
  ListChecks,
  Zap,
  QrCode,
  Tv,
  Grid,
  Edit3,
  Save,
  X,
  KeyRound
} from 'lucide-react';
import { logSecurityBreach } from '../services/securityAlertService';
import { GradeTallyInputForm } from './GradeTallyInputForm';
import { LNNCHS_20_SECTIONS_PER_GRADE, ALL_LNNCHS_SECTIONS, CONSOLIDATED_LIS_STUDENTS, SectionDefinition } from '../data/lnnchsCompleteSectionsDirectory';
import { DocumentManager } from './DocumentManager';
import { useAuth, isAuthorizedForLIS } from '../context/AuthContext';
import { SingleSFInspector } from './SingleSFInspector';
import { BoiserChatbot } from './BoiserChatbot';
import { DoorFileSummary } from './DoorFileSummary';
import { LISActivityMonitor } from './LISActivityMonitor';
import { DoorCameraScanner } from './DoorCameraScanner';
import { ILAWGenerator } from './ILAWGenerator';
import { SummativeHub } from './SummativeHub';
import { DoorChathead } from './DoorChathead';
import { BOWGeneratorTool } from './BOWGeneratorTool';
import { StudentDocumentVault } from './StudentDocumentVault';
import { PrincipalDoorsView } from './PrincipalDoorsView';
import { speakWithCebuanoMaleVoice } from '../services/boiserVoiceService';
import { LnnchsDoorResultPreviewModal, PreviewItemData } from './LnnchsDoorResultPreviewModal';
import { DepEdLdnOlsStatusIndicator } from './DepEdLdnOlsStatusIndicator';
import { DepEdLdnOlsLeaveModal } from './DepEdLdnOlsLeaveModal';

import { DoorDemoGuide } from './DoorDemoGuide';
import { LISConnectivityManager } from './LISConnectivityManager';

import { SeatingChartManager } from './SeatingChartManager';
import { QRScannerModule } from './QRScannerModule';
import { MysteriousDoorsWorkspace } from './MysteriousDoorsWorkspace';
import { MasterTeacherDoorsView } from './MasterTeacherDoorsView';
import { SubjectTeachersDoorsView } from './SubjectTeachersDoorsView';
import { MasterCreatorSkillsVault } from './MasterCreatorSkillsVault';

interface AdviserDoorsHomeProps {
  currentUser: {
    name: string;
    email: string;
    role: 'master_creator' | 'adviser' | 'non_adviser' | 'user' | 'owner';
    section?: string;
  };
  schoolYear?: string;
  setSchoolYear?: (sy: string) => void;
}

export const AdviserDoorsHome: React.FC<AdviserDoorsHomeProps> = ({ currentUser, schoolYear = '2026-2027', setSchoolYear }) => {
  const { isOwner, substitutionPlans, notifications, markNotificationRead } = useAuth();
  const isMasterCreator = isOwner || currentUser.email === 'boisersteavenkinth@gmail.com' || currentUser.email === 'boisersteavenkinth@deped.gov.ph' || currentUser.email === 'steavenkinth.boiser@deped.gov.ph';
  const isOfficialAuthorized = isAuthorizedForLIS(currentUser.email) || currentUser.email === 'fiel.official@deped.gov.ph' || currentUser.email === 'edalyn.olis@deped.gov.ph';
  const isAdviserOfThisSection = (sectionId: string) => {
    // Basic check: if it's the master creator, they can see everything.
    if (isMasterCreator || isOfficialAuthorized) return true;
    
    // Check if current user email matches the section's adviser email (if we had it)
    // For now, we allow the adviser if their name matches (fragile) or if they are logged in as 'adviser'
    return currentUser.role === 'adviser';
  };
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [activeAdminDoorId, setActiveAdminDoorId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sf_records' | 'summative' | 'activity_log' | 'document_manager' | 'substitution' | 'file_summary' | 'camera_hub' | 'weekly_dll' | 'summative_hub' | 'bow_generator' | 'summative_item_analysis' | 'student_vault' | 'grading_summary' | 'seating_chart' | 'qr_attendance'>('sf_records');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<'activity' | 'exam' | 'qr' | 'rute' | 'ddt'>('activity');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showChathead, setShowChathead] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [previewDoorData, setPreviewDoorData] = useState<{ doorName: string; doorRole: string; gradeLevel?: string; sectionName?: string; itemData?: PreviewItemData } | null>(null);

  // Door-to-Door Tutorial Modal State
  const [tutorialSection, setTutorialSection] = useState<SectionDefinition | null>(null);
  const [tutorialLang, setTutorialLang] = useState<'en' | 'tl' | 'ceb'>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter plans for this user
  const myPlans = substitutionPlans.filter(p => p.substituteTeacherEmail === currentUser.email);
  const unreadAlarms = notifications.filter(n => !n.read && n.type === 'alarm');

  // Load sections from localStorage if managed or default array
  const getSections = (): SectionDefinition[] => {
    const saved = localStorage.getItem('lnnchs_managed_sections');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: any) => ({
            ...s,
            id: s.id || s.sectionId,
            sectionId: s.sectionId || s.id,
            adviserEmail: s.adviserEmail || `${(s.adviserName || '').toLowerCase().replace(/[^a-z]/g, '')}@deped.gov.ph`,
            roomAssignment: s.roomAssignment || s.roomNumber || 'Main Campus',
            trackOrStrand: s.trackOrStrand || s.trackStrand || 'Regular High School',
            totalLearners: s.totalLearners || s.studentCount || 45
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return ALL_LNNCHS_SECTIONS;
  };

  const [sectionsList, setSectionsList] = useState<SectionDefinition[]>(() => {
    return getSections();
  });

  const safeSections = Array.isArray(sectionsList) ? sectionsList : ALL_LNNCHS_SECTIONS;

  // Filter sections visible to user
  const visibleSections = safeSections.filter(sec => {
    // Open ALL doors if master creator OR any authenticated DepEd user
    if (isMasterCreator || currentUser.role === 'adviser' || currentUser.role === 'non_adviser') return true;
    return false;
  });

  const activeSection = safeSections.find(s => (s.sectionId || s.id) === selectedSectionId);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Check if current user is the verified adviser of this section
  const isAdviserOfSection = (sec: SectionDefinition) => {
    if (isMasterCreator) return true;
    const advName = (sec.adviserName || '').toLowerCase().trim();
    const curName = (currentUser.name || '').toLowerCase().trim();
    const advEmail = (sec.adviserEmail || '').toLowerCase().trim();
    const curEmail = (currentUser.email || '').toLowerCase().trim();
    return (
      (advName && curName && (curName.includes(advName) || advName.includes(curName))) || 
      (advEmail && curEmail && advEmail === curEmail) || 
      currentUser.role === 'adviser'
    );
  };

  const canAccessSection = (sec: SectionDefinition) => {
    return isAdviserOfSection(sec);
  };

  // ==================== DOOR & ADVISER NAME EDITING ENGINE ====================
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editSectionName, setEditSectionName] = useState<string>('');
  const [editAdviserName, setEditAdviserName] = useState<string>('');

  const handleStartEdit = (sec: SectionDefinition) => {
    const secId = sec.sectionId || sec.id;
    if (!isMasterCreator && !isAdviserOfSection(sec)) {
      alert(`🔒 ACCESS DENIED: Only the assigned Resident Adviser (${sec.adviserName}) or the Security Management Center (Sir Steaven Kinth D. Boiser) is authorized to edit this door and adviser name.`);
      return;
    }
    if (sec.isLocked && !isMasterCreator) {
      alert(`🔒 DOOR & NAMES LOCKED: This door has been locked by the Adviser (${sec.adviserName}). Unlock the door first to edit.`);
      return;
    }
    setEditingSectionId(secId);
    setEditSectionName(sec.sectionName);
    setEditAdviserName(sec.adviserName);
  };

  const handleSaveEdit = (secId: string) => {
    const target = sectionsList.find(s => (s.sectionId || s.id) === secId);
    if (!target) return;
    if (!isMasterCreator && !isAdviserOfSection(target)) {
      alert('🔒 Access Denied: Unauthorized editor.');
      return;
    }
    const newSecName = editSectionName.trim() || target.sectionName;
    const newAdvName = editAdviserName.trim() || target.adviserName;

    const updated = sectionsList.map(s => {
      if ((s.sectionId || s.id) === secId) {
        return {
          ...s,
          sectionName: newSecName,
          adviserName: newAdvName
        };
      }
      return s;
    });
    setSectionsList(updated);
    localStorage.setItem('lnnchs_managed_sections', JSON.stringify(updated));
    setEditingSectionId(null);
    showNotification('success', `✅ Door updated: "${newSecName}" (Adviser: ${newAdvName})`);
  };

  const handleCancelEdit = () => {
    setEditingSectionId(null);
  };

  // ==================== DOOR LOCK & INTRUDER SHIELD ENGINE ====================
  const [lockingSection, setLockingSection] = useState<SectionDefinition | null>(null);
  const [lockPinInput, setLockPinInput] = useState<string>('1234');

  // Security Gate / Unlock modal for intruders trying to enter a locked door
  const [gateLockedSection, setGateLockedSection] = useState<SectionDefinition | null>(null);
  const [gatePinInput, setGatePinInput] = useState<string>('');
  const [gateError, setGateError] = useState<string | null>(null);

  const handleToggleLock = (sec: SectionDefinition) => {
    const secId = sec.sectionId || sec.id;
    if (!isMasterCreator && !isAdviserOfSection(sec)) {
      alert(`🔒 PERMISSION DENIED: Only the assigned Resident Adviser (${sec.adviserName}) or the Security Management Center (Sir Steaven Kinth D. Boiser) can lock or unlock this door.`);
      return;
    }

    if (sec.isLocked) {
      if (confirm(`Unlock door "${sec.sectionName}" and re-enable name editing?`)) {
        const updated = sectionsList.map(s => {
          if ((s.sectionId || s.id) === secId) {
            return {
              ...s,
              isLocked: false,
              lockedBy: undefined
            };
          }
          return s;
        });
        setSectionsList(updated);
        localStorage.setItem('lnnchs_managed_sections', JSON.stringify(updated));
        showNotification('success', `🔓 Door & names UNLOCKED for ${sec.sectionName}.`);
      }
    } else {
      setLockingSection(sec);
      setLockPinInput('1234');
    }
  };

  const handleConfirmLock = () => {
    if (!lockingSection) return;
    const secId = lockingSection.sectionId || lockingSection.id;
    const pin = lockPinInput.trim() || '1234';
    const updated = sectionsList.map(s => {
      if ((s.sectionId || s.id) === secId) {
        return {
          ...s,
          isLocked: true,
          lockPin: pin,
          lockedBy: isMasterCreator ? 'Security Management Center (Steaven Kinth D. Boiser)' : lockingSection.adviserName
        };
      }
      return s;
    });
    setSectionsList(updated);
    localStorage.setItem('lnnchs_managed_sections', JSON.stringify(updated));
    showNotification('success', `🔒 LOCKED: Door "${lockingSection.sectionName}" and Adviser "${lockingSection.adviserName}" are now LOCKED against intruder edits and entry!`);
    setLockingSection(null);
  };

  // ==================== DOOR ENTRY INTERCEPTION ENGINE ====================
  const handleOpenDoor = (sec: SectionDefinition) => {
    const secId = sec.sectionId || sec.id;
    // IF NOT LOCKED -> open directly
    if (!sec.isLocked) {
      setSelectedSectionId(secId);
      return;
    }

    // IF LOCKED:
    // 1. MASTER OVERRIDE: Security Management Center (Sir Steaven Kinth D. Boiser)
    if (isMasterCreator) {
      showNotification('success', `🛡️ SECURITY MANAGEMENT CENTER (STEAVEN KINTH D. BOISER) MASTER OVERRIDE: Access granted to locked door "${sec.sectionName}".`);
      setSelectedSectionId(secId);
      return;
    }

    // 2. Verified Adviser of this section
    if (isAdviserOfSection(sec)) {
      setSelectedSectionId(secId);
      return;
    }

    // 3. Intruders / standard users are intercepted by Security Gate!
    setGateLockedSection(sec);
    setGatePinInput('');
    setGateError(null);
  };

  const handleVerifyGatePin = () => {
    if (!gateLockedSection) return;
    const requiredPin = gateLockedSection.lockPin || '1234';
    if (gatePinInput === requiredPin) {
      showNotification('success', `🔓 Passcode Accepted: Entering ${gateLockedSection.sectionName} Door.`);
      setSelectedSectionId(gateLockedSection.sectionId || gateLockedSection.id);
      setGateLockedSection(null);
    } else {
      setGateError('❌ INCORRECT SECURITY PIN: Intruder access blocked! Activity logged.');
      logSecurityBreach(
        currentUser.name || 'Intruder',
        currentUser.email || 'guest@intruder.node',
        `Attempted unauthorized entry into locked door "${gateLockedSection.sectionName}" (Adviser: ${gateLockedSection.adviserName})`,
        'MASTER_DOOR_BREACH',
        `Entered PIN: ${gatePinInput}`
      );
    }
  };

  const speakTutorial = (text: string, _lang: 'en' | 'tl' | 'ceb') => {
    setIsSpeaking(true);
    speakWithCebuanoMaleVoice(text, {
      appendTagline: true,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const stopTutorialSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getTutorialContent = (sec: SectionDefinition, lang: 'en' | 'tl' | 'ceb') => {
    if (lang === 'tl') {
      return {
        title: `Gabay sa Pintuan para sa ${sec.sectionName}`,
        intro: `Maligayang pagdating sa pinto ng seksyon ni Adviser ${sec.adviserName}. Ang pinto na ito ay nagbibigay ng eksklusibong pribilehiyo sa SF1 hanggang SF10 reports at LIS records.`,
        steps: [
          'Hakbang 1: I-verify ang iyong DepEd email at tiyaking ikaw ang nakatalagang tagapayo (adviser) o System Administrator.',
          'Hakbang 2: I-click ang "Open Door" upang makapasok sa pribadong silid ng iyong seksyon.',
          'Hakbang 3: Piliin ang SF1–SF10 tab upang i-download o tingnan ang mga opisyal na ulat.',
          'Hakbang 4: Kung nagkamali ka ng pindot o napunta sa ibang pinto, sundin ang Smart Suggestion Arrow pabalik sa iyong nakatalagang pinto.'
        ]
      };
    } else if (lang === 'ceb') {
      return {
        title: `Giya sa Pultahan para sa ${sec.sectionName}`,
        intro: `Maayong pagabot sa pultahan sa seksyon ni Adviser ${sec.adviserName}. Kini nga pultahan naghatag og eksklusibong katungod sa SF1 hangtod SF10 reports ug LIS records.`,
        steps: [
          'Lakang 1: I-verify ang imong DepEd email ug siguruha nga ikaw ang opisyal nga adviser o System Administrator.',
          'Lakang 2: I-click ang "Open Door" aron makasulod sa pribadong lawak sa imong seksyon.',
          'Lakang 3: Pilia ang SF1–SF10 tab aron tan-awon o i-download ang mga opisyal nga rekord.',
          'Lakang 4: Kung nasayop ka og pili sa pultahan, sunda ang Smart Suggestion Arrow padulong sa sakto mong pultahan.'
        ]
      };
    } else {
      return {
        title: `Door-to-Door Guidance Handbook for ${sec.sectionName}`,
        intro: `Welcome to the adviser residence door of ${sec.adviserName}. This private door unlocks exclusive access to official SF1–SF10 school reports and LIS records.`,
        steps: [
          'Step 1: Verify your DepEd credentials and ensure you are the assigned adviser or System Administrator.',
          'Step 2: Click "Open Door" to enter your secure section room.',
          'Step 3: Navigate the SF1–SF10 tab to view or export confidential DepEd student documents.',
          'Step 4: If you mistakenly opened the wrong door, follow the Smart Suggestion Arrow to navigate directly to your assigned section.'
        ]
      };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <LISConnectivityManager />
      {/* ALARM SIGNAL FOR CHOSEN TEACHERS */}
      {unreadAlarms.length > 0 && (
        <div className="bg-red-600 text-white p-4 rounded-2xl shadow-2xl border-4 border-red-400 animate-bounce flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white text-red-600 rounded-full">
              <AlarmClock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tighter">🚨 WARNING: SUBSTITUTION ALERT! 🚨</h2>
              <p className="text-sm font-bold opacity-90">{unreadAlarms[0].message}</p>
            </div>
          </div>
          <button 
            onClick={() => markNotificationRead(unreadAlarms[0].id)}
            className="px-6 py-2 bg-white text-red-600 font-black rounded-xl hover:bg-stone-100 transition shadow-lg"
          >
            I UNDERSTAND / DISMISS
          </button>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#092B62] via-[#0d3b82] to-[#1254b8] p-6 sm:p-8 text-white shadow-xl border border-blue-400/30">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-black tracking-wide">
              <Home className="w-4 h-4 text-amber-300" />
              <span>WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              🏡 Faculty Residence Doors &amp; Multi-Lingual Guidance
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Orderly home arrangement with integrated video/audio tutorials in Bisaya, Tagalog, and English. Smart suggestion arrows guide you instantly if you navigate to an unauthorized door.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-2xl border border-white/20 shrink-0">
            <UserCheck className="w-5 h-5 text-amber-300" />
            <div>
              <div className="text-[10px] text-blue-200 uppercase font-black">Logged-In Resident</div>
              <div className="text-xs font-black text-white">{currentUser.name} ({currentUser.role})</div>
            </div>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${
          statusMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border border-red-500/30 text-red-300'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Door-to-Door Tutorial Modal */}
      {tutorialSection && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-400 animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-800">
                  <Compass className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#092B62]">
                    {getTutorialContent(tutorialSection, tutorialLang).title}
                  </h3>
                  <p className="text-xs text-stone-500">Step-by-step guidance for {tutorialSection.sectionName}</p>
                </div>
              </div>
              <button
                onClick={() => { stopTutorialSpeech(); setTutorialSection(null); }}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl">
              {[
                { id: 'en', label: '🇬🇧 English' },
                { id: 'tl', label: '🇵🇭 Tagalog' },
                { id: 'ceb', label: '🌾 Bisaya' }
              ].map(l => (
                <button
                  key={l.id}
                  onClick={() => setTutorialLang(l.id as any)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    tutorialLang === l.id ? 'bg-[#092B62] text-white shadow' : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Audio Playback Button */}
            <div className="flex items-center justify-between bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Listen to Voice Tutorial ({tutorialLang.toUpperCase()})</span>
              </div>
              <button
                onClick={() => {
                  const content = getTutorialContent(tutorialSection, tutorialLang);
                  const fullText = `${content.title}. ${content.intro}. ${content.steps.join('. ')}`;
                  if (isSpeaking) stopTutorialSpeech();
                  else speakTutorial(fullText, tutorialLang);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow transition cursor-pointer flex items-center gap-1.5"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Stop Voice' : 'Play Audio Guide'}</span>
              </button>
            </div>

            {/* Tutorial Steps */}
            <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
              <p className="text-xs font-medium text-stone-700 leading-relaxed mb-4">
                {getTutorialContent(tutorialSection, tutorialLang).intro}
              </p>
              {getTutorialContent(tutorialSection, tutorialLang).steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs font-medium text-stone-800">
                  <span className="w-5 h-5 rounded-full bg-[#092B62] text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Smart Suggestion Box / Arrow */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ArrowRight className="w-5 h-5 text-blue-600 animate-bounce shrink-0" />
                <div className="text-xs font-bold text-blue-900">
                  <span>Suggestion: Need to access your own room? Click below to instantly jump to your assigned door.</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setTutorialSection(null);
                  setSelectedSectionId(tutorialSection.sectionId || tutorialSection.id || null);
                }}
                className="px-4 py-2 bg-[#092B62] text-white rounded-xl text-xs font-black shadow hover:bg-blue-900 shrink-0 cursor-pointer"
              >
                Open This Door Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If an admin door is currently opened */}
      {activeAdminDoorId === 'head-anisah' || activeAdminDoorId === 'head-andot' || activeAdminDoorId === 'head-calibo' ? (
        <PrincipalDoorsView doorId={activeAdminDoorId} onClose={() => setActiveAdminDoorId(null)} />
      ) : activeAdminDoorId === 'admin-guidance' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-300 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-rose-700 via-pink-800 to-rose-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/30 border-2 border-rose-300 flex items-center justify-center text-rose-200 shadow-inner shrink-0">
                <HeartPulse className="w-8 h-8 text-rose-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-rose-300">
                  💖 Guidance &amp; Counseling Office
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Learner Guidance &amp; Welfare Center</h2>
                <p className="text-xs text-rose-100 font-medium">Confidential counseling records, behavioral support, and career advocacy.</p>
              </div>
            </div>
            <button onClick={() => setActiveAdminDoorId(null)} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white transition cursor-pointer">
              🚪 Close Door
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
              <div className="font-bold text-rose-900 mb-1">Student Welfare Cases</div>
              <div className="text-2xl font-black text-rose-950">0 Active Alerts</div>
              <p className="text-[11px] text-rose-700 mt-1">Safe and nurturing campus climate.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="font-bold text-emerald-900 mb-1">Career Guidance Track</div>
              <div className="text-2xl font-black text-emerald-950">100% Oriented</div>
              <p className="text-[11px] text-emerald-700 mt-1">College, Tech-Voc, &amp; Job readiness.</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="font-bold text-amber-900 mb-1">Guidance Counselor</div>
              <div className="text-base font-black text-amber-950">Official LNNCHS Staff</div>
              <p className="text-[11px] text-amber-800 mt-1">Protected records under Data Privacy.</p>
            </div>
          </div>
        </div>
      ) : activeAdminDoorId === 'admin-non-teaching' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-purple-300 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/30 border-2 border-purple-300 flex items-center justify-center text-purple-200 shadow-inner shrink-0">
                <UserCheck className="w-8 h-8 text-purple-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-purple-300">
                  📁 Administrative Operations
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Non-Teaching Staff &amp; A.O. Hub (Ma'am Dayan)</h2>
                <p className="text-xs text-purple-100 font-medium">School inventory, property management, document routing, and HR support.</p>
              </div>
            </div>
            <button onClick={() => setActiveAdminDoorId(null)} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white transition cursor-pointer">
              🚪 Close Door
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
              <div className="font-bold text-purple-900 mb-1">Administrative Officer (A.O.)</div>
              <div className="text-base font-black text-purple-950">Ma'am Dayan &amp; A.O. Staff</div>
              <p className="text-[11px] text-purple-700 mt-1">Official LNNCHS Administrative Desk.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="font-bold text-blue-900 mb-1">School Property Inventory</div>
              <div className="text-2xl font-black text-blue-950">Synchronized</div>
              <p className="text-[11px] text-blue-700 mt-1">Textbooks, equipment, &amp; lab supplies.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="font-bold text-emerald-900 mb-1">Official Document Tracker</div>
              <div className="text-2xl font-black text-emerald-950">0 Backlogs</div>
              <p className="text-[11px] text-emerald-700 mt-1">All communications logged &amp; filed.</p>
            </div>
          </div>
        </div>
      ) : activeAdminDoorId === 'admin-co-adviser' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-cyan-300 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-cyan-800 via-blue-900 to-cyan-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/30 border-2 border-cyan-300 flex items-center justify-center text-cyan-200 shadow-inner shrink-0">
                <Users className="w-8 h-8 text-cyan-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-cyan-300">
                  👥 Subject Faculty Resource Center
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Co-Advisers &amp; Subject Teachers Door</h2>
                <p className="text-xs text-cyan-100 font-medium">Teaching load scheduling, curriculum alignment, and test item generation without co-adviser overhead.</p>
              </div>
            </div>
            <button onClick={() => setActiveAdminDoorId(null)} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white transition cursor-pointer">
              🚪 Close Door
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-2xl">
              <div className="font-bold text-cyan-900 mb-1">Subject Faculty Loading</div>
              <div className="text-2xl font-black text-cyan-950">Direct Access</div>
              <p className="text-[11px] text-cyan-700 mt-1">Individual teaching schedules ready.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="font-bold text-blue-900 mb-1">Test Question Bank</div>
              <div className="text-2xl font-black text-blue-950">TOS Aligned</div>
              <p className="text-[11px] text-blue-700 mt-1">Summative &amp; RUTE exam generator.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="font-bold text-emerald-900 mb-1">ILAW Exemplar Drafting</div>
              <div className="text-2xl font-black text-emerald-950">Ready to Edit</div>
              <p className="text-[11px] text-emerald-700 mt-1">Direct submission to Ma'am Calibo.</p>
            </div>
          </div>
        </div>
      ) : activeAdminDoorId === 'admin-registrar' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-blue-400 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/30 border-2 border-blue-300 flex items-center justify-center text-blue-200 shadow-inner shrink-0">
                <FileSpreadsheet className="w-8 h-8 text-blue-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-blue-300">
                  🏢 Registrar Office • Official LIS Gateway
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Registrar Command Center
                </h2>
                <p className="text-xs text-blue-100 font-medium">
                  Official enrollment, record inspection, and SF synchronization hub.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveAdminDoorId(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white flex items-center gap-2 transition cursor-pointer"
            >
              <span>🚪 Close Registrar Door</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <div>
                    <span className="text-xs font-black text-emerald-900 uppercase">Registrar Access Verified</span>
                    <p className="text-[10px] text-emerald-700">You are currently inspecting official LNNCHS records with full read/write LIS permissions.</p>
                  </div>
                </div>

                <div className="h-[500px] border border-blue-200 rounded-3xl overflow-hidden shadow-sm">
                  <BoiserChatbot variant="embedded" />
                </div>
              </div>

              <SingleSFInspector />
            </div>

            {/* LIS & SF1 Activity Monitoring Node */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Authorized LIS/SF1 Activity Logs</h3>
                {isMasterCreator && (
                  <button 
                    onClick={() => {
                      if(window.confirm('STRICT WARNING: This will clear all temporary data (excluding SF1/LIS master records). Proceed with System Purge?')) {
                        localStorage.removeItem('lnnchs_managed_sections');
                        localStorage.removeItem('substitution_plans');
                        showNotification('success', 'System Purge Successful: Unexpected data cleared.');
                      }
                    }}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-red-700 shadow-sm"
                  >
                    System Purge
                  </button>
                )}
              </div>
              <LISActivityMonitor role={currentUser.email.includes('edalyn') ? 'JHS' : 'SHS'} />
            </div>
          </div>
        </div>
      ) : activeAdminDoorId === 'admin-master-teachers' ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          <MasterTeacherDoorsView onClose={() => setActiveAdminDoorId(null)} />
        </div>
      ) : activeAdminDoorId === 'admin-master-creator' ? (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-red-950 via-stone-900 to-black p-6 rounded-t-3xl border-b-4 border-amber-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 -mx-1 sm:mx-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center text-2xl font-black shrink-0 shadow-lg shadow-amber-500/10">
                👑
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-400">
                  🛡️ Secure Command Office
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Master Creator Command Center
                </h2>
                <p className="text-xs text-stone-300 font-medium">
                  Welcome back, Sir Steaven Kinth D. Boiser. Global app configuration, security analytics, and Master Skills execution.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActiveAdminDoorId(null)} 
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-xs font-black text-white transition cursor-pointer"
            >
              🚪 Exit Command Center
            </button>
          </div>
          <MasterCreatorSkillsVault />
        </div>
      ) : activeAdminDoorId === 'admin-co-adviser' || activeAdminDoorId === 'admin-subject-teachers' ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          <SubjectTeachersDoorsView onClose={() => setActiveAdminDoorId(null)} />
        </div>
      ) : activeSection ? (
        <MysteriousDoorsWorkspace
          activeSection={activeSection}
          onCloseDoor={() => setSelectedSectionId(null)}
          isOfficialAuthorized={isOfficialAuthorized}
          currentUser={currentUser}
          showNotification={showNotification}
          setPreviewDoorData={setPreviewDoorData}
          setShowChathead={setShowChathead}
          showChathead={showChathead}
          setShowDemo={setShowDemo}
        />
      ) : (
        /* Home Street View / Orderly Neighborhood House Doors */
        <div className="space-y-6">
          {/* Security Management Center & Door Protection Policy Banner */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-[#030e24] via-[#091b3e] to-[#04122b] border-2 border-amber-400/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black shadow-lg shrink-0 border border-white/20">
                <ShieldCheck className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black uppercase tracking-wider text-amber-300 text-sm">
                    DOOR &amp; ADVISER NAME PROTECTION SYSTEM
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    Adviser Lock &amp; Name Control
                  </span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1 leading-relaxed">
                  <strong>Governance Policy:</strong> All door names and adviser names are editable <strong>ONLY by the assigned Adviser</strong>. Advisers have the option to <strong>LOCK their door and names</strong> to prevent intruder edits and unauthorized entry. <strong>Security Management System (Sir Steaven Kinth D. Boiser)</strong> has Master Override across all doors.
                </p>
              </div>
            </div>
            {isMasterCreator && (
              <div className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shrink-0 border border-amber-300">
                <span>👑 Security Management Override Active</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-[#092B62] uppercase tracking-wider flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-600" />
                <span>LNNCHS Faculty Neighborhood &amp; Administration Doors ({visibleSections.length + 7} Total Doors)</span>
              </h3>
              <p className="text-xs text-stone-500 font-medium">Three School Head Executive Doors, Registrar, Guidance, Non-Teaching, and Resident Advisers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              // 1. THREE SCHOOL HEAD DOORS (SWAPPED TO FIRST LOCATION)
              {
                id: 'head-anisah',
                name: "Ma'am Anisah (Principal III) Door",
                role: 'Secondary School Principal III • SHS Institutional Leadership',
                icon: Building,
                badge: 'School Head',
                bannerColor: 'from-blue-700 via-indigo-800 to-blue-900',
                btnColor: 'bg-blue-900 hover:bg-blue-950'
              },
              {
                id: 'head-andot',
                name: "Ma'am Joan J. Andot (Asst. Principal II) Door",
                role: 'Asst. Principal II • Academic Programs & Scheduling',
                icon: Award,
                badge: 'Asst. Principal II',
                bannerColor: 'from-emerald-700 via-teal-800 to-emerald-900',
                btnColor: 'bg-emerald-900 hover:bg-emerald-950'
              },
              {
                id: 'head-calibo',
                name: 'Ma\'am Alma "Almazing" L. Calibo (Head Teacher) Door',
                role: 'Head Teacher • Curriculum & ILAW Approval',
                icon: BookOpen,
                badge: 'Head Teacher',
                bannerColor: 'from-amber-600 via-stone-800 to-amber-700',
                btnColor: 'bg-amber-900 hover:bg-amber-950'
              },
              // 2. REGISTRAR OFFICE (COMES AFTER HEAD)
              {
                id: 'admin-registrar',
                name: 'Registrar Office Door',
                role: 'Registrar • LIS Enrollment & Official Records',
                icon: FileSpreadsheet,
                badge: 'Registrar',
                bannerColor: 'from-slate-700 via-slate-800 to-slate-900',
                btnColor: 'bg-slate-800 hover:bg-slate-950'
              },
              // 3. GUIDANCE COUNSELING
              {
                id: 'admin-guidance',
                name: 'Guidance Counseling Office Door',
                role: 'Guidance Counselor • Learner Well-Being',
                icon: HeartPulse,
                badge: 'Guidance',
                bannerColor: 'from-rose-700 via-pink-800 to-rose-900',
                btnColor: 'bg-rose-900 hover:bg-rose-950'
              },
              // 4. NON-TEACHING STAFF & A.O.
              {
                id: 'admin-non-teaching',
                name: 'Non-Teaching Staff & A.O. (Ma\'am Dayan) Door',
                role: 'Staff Support • Property, Inventory & HR Desk',
                icon: UserCheck,
                badge: 'Administrative Officer',
                bannerColor: 'from-purple-700 via-indigo-800 to-purple-900',
                btnColor: 'bg-purple-900 hover:bg-purple-950'
              },
               // 5. CO-ADVISER & SUBJECT TEACHERS
              {
                id: 'admin-co-adviser',
                name: 'Co-Advisers & Subject Teachers Door',
                role: 'Subject Faculty • Lesson Plans, Chalk Scoring & LAS',
                icon: Users,
                badge: 'Subject Teachers',
                bannerColor: 'from-cyan-700 via-blue-800 to-cyan-900',
                btnColor: 'bg-cyan-900 hover:bg-cyan-950'
              },
              // 6. MASTER TEACHER COMMAND DOORS (15 JHS + 1 SHS EXCLUSIVE)
              {
                id: 'admin-master-teachers',
                name: 'Master Teacher Command Doors (16 Doors)',
                role: '15 JHS Exclusive Doors + 1 Exclusive SHS Master Door',
                icon: Award,
                badge: 'Master Teachers',
                bannerColor: 'from-amber-500 via-yellow-600 to-amber-700',
                btnColor: 'bg-amber-900 hover:bg-amber-950'
              },
              // 7. MASTER CREATOR EXCLUSIVE DOOR (ONLY STEAVEN KINTH D. BOISER)
              {
                id: 'admin-master-creator',
                name: 'Master Creator Exclusive Door',
                role: 'Steaven Kinth D. Boiser Exclusive Command Control Office',
                icon: ShieldCheck,
                badge: '👑 Master Creator',
                bannerColor: 'from-red-600 via-amber-600 to-red-800',
                btnColor: 'bg-red-700 hover:bg-red-950 shadow-red-500/20'
              }
            ].map(adminDoor => (
              <div key={adminDoor.id} className="group relative bg-gradient-to-b from-stone-50 via-white to-stone-100 rounded-3xl p-6 border-2 border-stone-300 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${adminDoor.bannerColor}`} />
                <div>
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[10px] font-black uppercase tracking-wider">
                      {adminDoor.badge}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      adminDoor.id === 'admin-master-creator'
                        ? 'text-red-600 bg-red-50 border-red-200'
                        : 'text-emerald-600 bg-emerald-50 border-emerald-200'
                    }`}>
                      {adminDoor.id === 'admin-master-creator' ? 'Secure Encryption Active' : 'Door Active'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shadow-xs">
                      <adminDoor.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-stone-900 leading-snug">{adminDoor.name}</h4>
                      <p className="text-[11px] text-stone-500 font-medium">{adminDoor.role}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (adminDoor.id === 'admin-master-creator' && !isMasterCreator) {
                        alert("🔒 ACCESS DENIED: Only the Master Creator, Steaven Kinth D. Boiser, can access this control panel. Your email is not authorized!");
                        return;
                      }
                      setPreviewDoorData({
                        doorName: adminDoor.name,
                        doorRole: adminDoor.role,
                        gradeLevel: 'Executive Level',
                        sectionName: adminDoor.badge
                      });
                    }}
                    className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-700" />
                    <span>👁️ Preview &amp; Download Results</span>
                  </button>

                  <button 
                    onClick={() => {
                      if (adminDoor.id === 'admin-master-creator' && !isMasterCreator) {
                        alert("🔒 ACCESS DENIED: This door is highly encrypted. Only Steaven Kinth D. Boiser is authorized to open the Master Creator Command Office!");
                        return;
                      }
                      setActiveAdminDoorId(adminDoor.id);
                    }}
                    className={`w-full py-3 ${adminDoor.btnColor} text-white rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer group-hover:scale-[1.02]`}
                  >
                    <DoorClosed className="w-4 h-4 text-amber-300" />
                    <span>Open {adminDoor.name}</span>
                  </button>
                </div>
              </div>
            ))}
            
            {visibleSections.map(sec => {
              const secId = sec.sectionId || sec.id;
              const isAdviser = isAdviserOfSection(sec);
              const canEditThis = isMasterCreator || isAdviser;
              const isEditing = editingSectionId === secId;

              return (
                <div
                  key={secId}
                  className={`group relative rounded-3xl p-6 border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl ${
                    sec.isLocked
                      ? 'bg-gradient-to-b from-stone-900 via-[#0d162a] to-slate-950 border-red-500/60 shadow-red-500/10'
                      : 'bg-gradient-to-b from-amber-50 via-white to-amber-100/40 border-amber-300'
                  }`}
                >
                  {/* House Roof Illustration Banner */}
                  <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${
                    sec.isLocked
                      ? 'from-red-600 via-rose-700 to-red-800'
                      : 'from-amber-600 via-amber-700 to-amber-800'
                  }`} />

                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                        sec.isLocked
                          ? 'bg-red-500/20 text-red-300 border border-red-400/40'
                          : 'bg-amber-200/80 border border-amber-400 text-amber-900'
                      }`}>
                        🏡 Grade {sec.gradeLevel} • {secId}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        {/* OLS LEAVE PORTAL BRIDGE (5:00PM–7:00PM) — EXCLUSIVELY SHS FACULTY (GRADES 11 & 12) */}
                        {(String(sec.gradeLevel).includes('11') || String(sec.gradeLevel).includes('12') || String(sec.gradeLevel).toLowerCase().includes('shs')) && (
                          <DepEdLdnOlsStatusIndicator
                            teacherName={sec.adviserName}
                            isShsTeacher={true}
                            position={`SHS Adviser • Grade ${sec.gradeLevel}`}
                            advisoryClass={`Grade ${sec.gradeLevel} - ${sec.sectionName}`}
                            compact={true}
                          />
                        )}

                        <button
                          onClick={() => setTutorialSection(sec)}
                          className="px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-900 text-[10px] font-black flex items-center gap-1 transition cursor-pointer"
                          title="Open Door Guide & Audio Tutorial"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                          <span>Guide</span>
                        </button>
                      </div>
                    </div>

                    {/* =========================================================================
                        ADVISER DOOR LOCK & EDIT CONTROLS BAR
                    ========================================================================== */}
                    <div className="flex items-center justify-between mb-3 p-1.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                      {/* Lock Status Pill */}
                      {sec.isLocked ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600/30 border border-red-500 text-red-300 text-[10px] font-black uppercase">
                          <Lock className="w-3 h-3 text-red-400" />
                          <span>LOCKED BY ADVISER</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600/20 border border-emerald-500 text-emerald-400 text-[10px] font-black uppercase">
                          <Unlock className="w-3 h-3 text-emerald-400" />
                          <span>UNLOCKED</span>
                        </div>
                      )}

                      {/* Action buttons (Only for Assigned Adviser or Steaven Kinth D. Boiser) */}
                      {canEditThis ? (
                        <div className="flex items-center gap-1">
                          {!sec.isLocked && !isEditing && (
                            <button
                              onClick={() => handleStartEdit(sec)}
                              className="px-2 py-0.5 rounded-md bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-400/40 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition"
                              title="Edit Door Name and Adviser Name (Adviser Only)"
                            >
                              <Edit3 className="w-2.5 h-2.5 text-blue-300" />
                              <span>Edit Names</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleToggleLock(sec)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 cursor-pointer transition ${
                              sec.isLocked
                                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-400/50 font-black'
                                : 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/40'
                            }`}
                            title={sec.isLocked ? "Unlock Door & Enable Editing" : "Lock Door & Names against Intruders"}
                          >
                            {sec.isLocked ? <Unlock className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                            <span>{sec.isLocked ? 'Unlock' : 'Lock Door'}</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {sec.isLocked ? '🔒 Protected' : '👤 Adviser Controlled'}
                        </span>
                      )}
                    </div>

                    {/* =========================================================================
                        DOOR NAME & ADVISER NAMEPLATE (EDITABLE MODE OR DISPLAY MODE)
                    ========================================================================== */}
                    {isEditing ? (
                      <div className="space-y-2 mb-4 bg-amber-500/10 p-3 rounded-2xl border-2 border-amber-400 text-xs animate-in zoom-in-95">
                        <div className="font-bold text-amber-300 text-[11px] uppercase flex items-center gap-1">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Adviser Door Name Customizer</span>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-300 block mb-0.5 font-bold">Door / Section Name:</label>
                          <input
                            type="text"
                            value={editSectionName}
                            onChange={(e) => setEditSectionName(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-amber-400/80 text-white font-bold text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"
                            placeholder="e.g. Grade 10 - Einstein"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-300 block mb-0.5 font-bold">Resident Adviser Name:</label>
                          <input
                            type="text"
                            value={editAdviserName}
                            onChange={(e) => setEditAdviserName(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-amber-400/80 text-amber-300 font-bold text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"
                            placeholder="e.g. Sir Stephen Tabal"
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleSaveEdit(secId)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] flex items-center gap-1 transition cursor-pointer shadow"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save Names</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-[11px] font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4 className={`text-base font-black mb-1 transition flex items-center gap-2 ${
                          sec.isLocked ? 'text-white' : 'text-stone-900 group-hover:text-blue-900'
                        }`}>
                          {sec.isLocked && <Lock className="w-4 h-4 text-red-500 inline shrink-0" />}
                          <span>{sec.sectionName}</span>
                        </h4>
                        
                        <p className={`text-xs font-medium mb-4 flex items-center gap-1.5 ${
                          sec.isLocked ? 'text-slate-400' : 'text-stone-500'
                        }`}>
                          <Building className="w-3.5 h-3.5 opacity-60" />
                          <span>{sec.roomAssignment || sec.roomNumber || 'Main Campus'} • {sec.trackOrStrand || sec.trackStrand || 'Regular High School'}</span>
                        </p>

                        {/* Adviser Nameplate Card */}
                        <div className={`rounded-2xl p-3.5 border shadow-sm space-y-1 mb-6 ${
                          sec.isLocked 
                            ? 'bg-black/60 border-red-500/30 text-white' 
                            : 'bg-white/90 border-amber-200'
                        }`}>
                          <div className="text-[10px] uppercase font-black tracking-wider flex items-center justify-between">
                            <span className={sec.isLocked ? 'text-red-300' : 'text-amber-800'}>
                              Resident Adviser Nameplate
                            </span>
                            {sec.isLocked ? (
                              <span className="text-[9px] text-red-400 font-mono font-bold">🔒 LOCKED</span>
                            ) : (
                              <span className="text-[9px] text-emerald-600 font-mono">Editable by Adviser</span>
                            )}
                          </div>
                          
                          <div className={`text-sm font-black flex items-center gap-2 ${
                            sec.isLocked ? 'text-amber-300' : 'text-[#092B62]'
                          }`}>
                            <UserCheck className={`w-4 h-4 ${sec.isLocked ? 'text-amber-400' : 'text-amber-600'}`} />
                            <span>{sec.adviserName}</span>
                          </div>
                          
                          <div className={`text-[11px] font-mono ${
                            sec.isLocked ? 'text-slate-400' : 'text-stone-500'
                          }`}>
                            {sec.adviserEmail || 'adviser@deped.gov.ph'}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Creative Door Opener & Preview Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setPreviewDoorData({
                        doorName: sec.adviserName,
                        doorRole: `Resident Adviser • Grade ${sec.gradeLevel} ${sec.sectionName}`,
                        gradeLevel: `Grade ${sec.gradeLevel}`,
                        sectionName: sec.sectionName
                      })}
                      className={`w-full py-2 border rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        sec.isLocked
                          ? 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                          : 'bg-[#092B62]/10 hover:bg-[#092B62]/20 text-[#092B62] border-[#092B62]/30'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>👁️ Preview &amp; Download Results</span>
                    </button>

                    <button
                      onClick={() => handleOpenDoor(sec)}
                      className={`w-full py-3 rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer group-hover:scale-[1.02] ${
                        sec.isLocked
                          ? 'bg-gradient-to-r from-red-900 via-rose-950 to-black text-white hover:from-red-800 hover:to-rose-900 border border-red-500/50'
                          : 'bg-gradient-to-r from-[#092B62] via-blue-800 to-[#092B62] hover:from-blue-900 hover:to-stone-900 text-white'
                      }`}
                    >
                      {sec.isLocked ? (
                        <>
                          <Lock className="w-4 h-4 text-amber-400" />
                          <span>
                            {isMasterCreator 
                              ? `Open Locked Door (Master Override)` 
                              : `Open ${sec.sectionName} (Passcode Protected)`}
                          </span>
                        </>
                      ) : (
                        <>
                          <DoorClosed className="w-4 h-4 text-amber-300 group-hover:hidden" />
                          <DoorOpen className="w-4 h-4 text-amber-300 hidden group-hover:block" />
                          <span>Open {sec.sectionName} Door</span>
                        </>
                      )}
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: SET ADVISER LOCK & PIN MODAL
      ========================================================================== */}
      {lockingSection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-gradient-to-b from-stone-900 to-slate-950 border-2 border-amber-400 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500 flex items-center justify-center text-red-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-amber-300">
                    Lock Door &amp; Adviser Names
                  </h3>
                  <p className="text-xs text-slate-300">{lockingSection.sectionName}</p>
                </div>
              </div>
              <button onClick={() => setLockingSection(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                Locking this door prevents intruders and unauthorized users from altering the <strong>Door Name</strong>, changing the <strong>Adviser Name</strong>, or entering without credentials.
              </p>
              
              <div className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                <label className="text-[11px] font-bold text-amber-300 block">
                  Set Security Unlock PIN (for guests/intruder pass):
                </label>
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <input
                    type="text"
                    value={lockPinInput}
                    onChange={(e) => setLockPinInput(e.target.value)}
                    placeholder="e.g. 1234"
                    maxLength={10}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-400 text-amber-300 font-mono font-bold text-sm focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-400">
                  Default PIN is <strong>1234</strong>.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-400/30 text-[11px] text-blue-200">
                🛡️ <strong>Security Management System Notice:</strong> Sir Steaven Kinth D. Boiser has permanent Master Override access to enter and unlock any door at all times.
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleConfirmLock}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm &amp; Lock Door</span>
              </button>
              <button
                onClick={() => setLockingSection(null)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: INTRUDER SECURITY GATE / PASSCODE UNLOCK MODAL
      ========================================================================== */}
      {gateLockedSection && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-gradient-to-b from-[#091b3e] to-[#040c1c] border-2 border-red-500 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-600/30 border-2 border-red-500 flex items-center justify-center text-red-400 shadow-md">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-red-400 tracking-tight">
                    LOCKED DOOR SECURITY GATE
                  </h3>
                  <p className="text-xs text-slate-300">{gateLockedSection.sectionName}</p>
                </div>
              </div>
              <button onClick={() => setGateLockedSection(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200">
                This door is <strong>LOCKED</strong> by Resident Adviser <strong>{gateLockedSection.adviserName}</strong> to prevent unauthorized intruder entry and tampering.
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold text-amber-300 block">
                  Enter Adviser Security PIN:
                </label>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <input
                    type="password"
                    value={gatePinInput}
                    onChange={(e) => setGatePinInput(e.target.value)}
                    placeholder="Enter 4-digit PIN..."
                    autoFocus
                    className="w-full px-3 py-2 rounded-xl bg-black/80 border border-amber-400 text-white font-mono text-center tracking-widest text-lg focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleVerifyGatePin()}
                  />
                </div>
              </div>

              {gateError && (
                <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500 text-red-300 text-[11px] font-bold">
                  {gateError}
                </div>
              )}

              {/* Master System Override Button (Steaven Kinth D. Boiser only) */}
              {isMasterCreator && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      showNotification('success', `🛡️ MASTER OVERRIDE: Entering ${gateLockedSection.sectionName}.`);
                      setSelectedSectionId(gateLockedSection.sectionId || gateLockedSection.id);
                      setGateLockedSection(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>👑 Steaven Kinth D. Boiser Master Override Unlock</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleVerifyGatePin}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow"
              >
                <Unlock className="w-4 h-4" />
                <span>Submit &amp; Enter Door</span>
              </button>
              <button
                onClick={() => setGateLockedSection(null)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LNNCHS Door Result Preview & Download Modal */}
      {previewDoorData && (
        <LnnchsDoorResultPreviewModal
          doorName={previewDoorData.doorName}
          doorRole={previewDoorData.doorRole}
          gradeLevel={previewDoorData.gradeLevel}
          sectionName={previewDoorData.sectionName}
          itemData={previewDoorData.itemData}
          isOpen={true}
          onClose={() => setPreviewDoorData(null)}
        />
      )}
    </div>
  );
};
