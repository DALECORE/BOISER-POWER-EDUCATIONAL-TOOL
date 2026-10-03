import React, { useState, useEffect, useRef } from 'react';
import {
  Tv,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Languages,
  Sparkles,
  X,
  Radio,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Bot,
  BookOpen,
  Calculator,
  FileSpreadsheet,
  Award,
  Zap,
  Power
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { speakWithProfessionalMaleVoice, stopProfessionalMaleVoice, executeSwitchToProfessionalMaleVoiceCommand } from '../services/boiserVoiceService';

interface HugeTVTourGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoPlayVoice?: boolean;
}

// 5 Step Lecturing Tour Data across 3 Languages
const TV_TOUR_STEPS = [
  {
    id: 1,
    title: {
      en: "📺 WELCOME TO BOISER EDUCATIONAL RESOURCES",
      tl: "📺 MALIGAYANG PAGDATING SA BOISER EDUCATIONAL RESOURCES",
      bis: "📺 MAAYONG PAG-ABOT SA BOISER EDUCATIONAL RESOURCES"
    },
    subtitle: {
      en: "Channel 01: System Overview & Master Creator Welcome",
      tl: "Channel 01: Pangkalahatang Sulyap at Pagbati",
      bis: "Channel 01: Pagpaila sa Sistema ug Pag-abi-abi"
    },
    icon: GraduationCap,
    badgeColor: "from-blue-600 to-indigo-700",
    lectureText: {
      en: "Welcome to the EDUCATIONAL RESOURCES of STEAVEN KINTH D BOISER MASTER CREATOR! Engineered for excellence, this lifetime suite is built for LNNCHS and DepEd educators, bringing automated grading, SF forms, and ILAW lesson plans into one powerful platform. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      tl: "Welcome to the EDUCATIONAL RESOURCES of STEAVEN KINTH D BOISER MASTER CREATOR! Idinisenyo para sa kagalingan, ang lifetime suite na ito ay gawa para sa mga guro ng LNNCHS at DepEd, pinagsasama ang grading, SF forms, at ILAW lesson plans. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      bis: "Welcome to the EDUCATIONAL RESOURCES of STEAVEN KINTH D BOISER MASTER CREATOR! Gihimo alang sa excellence, kining lifetime suite ay para sa mga magtutudlo sa LNNCHS ug DepEd, diin gi-usa ang grading, SF forms, ug ILAW lesson plans. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES"
    },
    keyPoints: [
      { en: "1.0 TB Infrastructure for 200k Teachers", tl: "1.0 TB Infrastructure para sa 200k na Guro", bis: "1.0 TB Infrastructure para sa 200k ka Magtutudlo" },
      { en: "Offline-First PWA Technology", tl: "Gumagana Kahit Walang Internet", bis: "Mo-gana Bisan Walay Internet" },
      { en: "Aligned with DepEd MATATAG 2026", tl: "Nakatugon sa DepEd MATATAG 2026", bis: "Subay sa DepEd MATATAG 2026" }
    ]
  },
  {
    id: 2,
    title: {
      en: "📊 MASTER GRADING & OFFICIAL SF FORMS",
      tl: "📊 MASTER GRADING AT OPISYAL NA SF FORMS",
      bis: "📊 MASTER GRADING UG OPISYAL NGA SF FORMS"
    },
    subtitle: {
      en: "Channel 02: Automated Transmutation & Exports",
      tl: "Channel 02: Awtomatikong Pag-compute at Export",
      bis: "Channel 02: Awtomatiko nga Pagkwenta ug Export"
    },
    icon: Calculator,
    badgeColor: "from-emerald-600 to-teal-700",
    lectureText: {
      en: "The Master Grading System automates transmutation and exports SF1 to SF10 forms instantly. Enter scores, and the system handles the rest with official DepEd precision. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      tl: "Ang Master Grading System ay awtomatikong nag-compute ng transmutation at nag-e-export ng SF1 hanggang SF10 forms. Ipasok lamang ang marka at ang system na ang bahala. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      bis: "Ang Master Grading System awtomatiko nga mo-compute sa transmutation ug mo-export sa SF1 hangtod SF10 forms. Ibutang lang ang scores ug ang sistema na ang mag-atiman. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES"
    },
    keyPoints: [
      { en: "Automated Trimester Transmutation", tl: "Awtomatikong Transmutation", bis: "Awtomatiko nga Transmutation" },
      { en: "Instant PDF/Excel SF1-SF10 Export", tl: "Mabilis na Export ng SF1-SF10", bis: "Paspas nga Export sa SF1-SF10" },
      { en: "Verified Batch SF Inspector", tl: "Batch SF Inspector na may Verification", bis: "Batch SF Inspector nga may Verification" }
    ]
  },
  {
    id: 3,
    title: {
      en: "📝 ILAW EXEMPLAR & ACTIVITY SHEETS",
      tl: "📝 ILAW EXEMPLAR AT ACTIVITY SHEETS",
      bis: "📝 ILAW EXEMPLAR UG ACTIVITY SHEETS"
    },
    subtitle: {
      en: "Channel 03: MATATAG Lesson Plan Generator",
      tl: "Channel 03: Paggawa ng Aralin sa MATATAG",
      bis: "Channel 03: Paggama og Leksyon sa MATATAG"
    },
    icon: BookOpen,
    badgeColor: "from-amber-600 to-orange-700",
    lectureText: {
      en: "Draft complete 4-session lesson plans and Learner Activity Sheets in seconds. Powered by our 20-attribute database, the AI fills in standards and rubrics automatically. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      tl: "Bumuo ng 4-session lesson plan at Activity Sheets sa loob ng ilang segundo. Gamit ang aming database, awtomatikong pupunan ng AI ang mga standards at rubrics. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      bis: "Paspas nga paghimo og 4-session nga leksyon ug Activity Sheets. Gamit ang among database, ang AI na ang mopuno sa mga standards ug rubrics. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES"
    },
    keyPoints: [
      { en: "20-Attribute Verified Database", tl: "Kumpirmadong 20-Attribute Database", bis: "Kumpirmado nga 20-Attribute Database" },
      { en: "4-Session Structured Lesson Log", tl: "4-Session na Lesson Log", bis: "4-Session nga Lesson Log" },
      { en: "One-Click Word & PDF Generation", tl: "Isang Click na Word at PDF", bis: "Usa ka Click nga Word ug PDF" }
    ]
  },
  {
    id: 4,
    title: {
      en: "🎙️ VOICE-ACTIVATED BOISER CHATBOT",
      tl: "🎙️ Boses-Na-BOISER CHATBOT",
      bis: "🎙️ TINGOG-NA-BOISER CHATBOT"
    },
    subtitle: {
      en: "Channel 04: Interactive Multilingual AI Assistant",
      tl: "Channel 04: AI Assistant sa Tatlong Wika",
      bis: "Channel 04: AI Assistant sa Tulo ka Pinulongan"
    },
    icon: Bot,
    badgeColor: "from-purple-600 to-pink-700",
    lectureText: {
      en: "Talk to the voice-activated Boiser Chatbot for instant answers on DepEd orders, LNNCHS memos, and the LIS directory. It understands Bisaya, Tagalog, and English perfectly. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      tl: "Maaari mong kausapin ang voice-activated Boiser Chatbot para sa mabilis na sagot sa DepEd orders at LNNCHS memos. Nakakaintindi ito ng Bisaya, Tagalog, at English. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      bis: "Storya sa voice-activated Boiser Chatbot para sa paspas nga tubag sa DepEd orders ug LNNCHS memos. Makasabot kini sa Bisaya, Tagalog, ug English. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES"
    },
    keyPoints: [
      { en: "Live Speech-to-Text Input", tl: "Magsalita Gamit ang Mikropono", bis: "Magsulti Gamit ang Mikropono" },
      { en: "Searches 120 LIS Sections", tl: "Naghahanap sa 120 LIS Sections", bis: "Mo-search sa 120 LIS Sections" },
      { en: "Calm & Clear Voice Output", tl: "Malinaw na Boses na Tugon", bis: "Klaro nga Tingog nga Tubag" }
    ]
  },
  {
    id: 5,
    title: {
      en: "📝 GOOGLE SUITE & CLOUD SYNC",
      tl: "📝 GOOGLE SUITE AT CLOUD SYNC",
      bis: "📝 GOOGLE SUITE UG CLOUD SYNC"
    },
    subtitle: {
      en: "Channel 05: Automated Forms & Drive Sync",
      tl: "Channel 05: Awtomatikong Forms at Drive Sync",
      bis: "Channel 05: Awtomatiko nga Forms ug Drive Sync"
    },
    icon: Zap,
    badgeColor: "from-purple-600 to-indigo-700",
    lectureText: {
      en: "Create quizzes automatically with the Google Forms Creator and deploy them directly to your Drive. Secure cloud synchronization ensures your data is always backed up. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      tl: "Gumawa ng mga quiz gamit ang Google Forms Creator at i-deploy ito diretso sa iyong Drive. Sigurado ang backup ng iyong data gamit ang cloud synchronization. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      bis: "Paghimo og mga quiz gamit ang Google Forms Creator ug i-deploy kini diretso sa imong Drive. Sigurado ang backup sa inyong data gamit ang cloud synchronization. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES"
    },
    keyPoints: [
      { en: "Automated Google Forms Creation", tl: "Awtomatikong Paggawa ng Forms", bis: "Awtomatiko nga Paggama og Forms" },
      { en: "Direct Google Drive Deployment", tl: "Direktang I-deploy sa Drive", bis: "Diretso nga I-deploy sa Drive" },
      { en: "Secure 1.0 TB Cloud Storage", tl: "Ligtas na 1.0 TB Cloud Storage", bis: "Safe nga 1.0 TB Cloud Storage" }
    ]
  },
  {
    id: 6,
    title: {
      en: "🌟 10X PERFORMANCE & INFRASTRUCTURE",
      tl: "🌟 10X PERFORMANCE AT INFRASTRUKTURA",
      bis: "🌟 10X PERFORMANCE UG INFRASTRUKTURA"
    },
    subtitle: {
      en: "Channel 06: Ultimate Speed & Stability",
      tl: "Channel 06: Bilis at Katatagan",
      bis: "Channel 06: Kapaspas ug Kalig-on"
    },
    icon: ShieldCheck,
    badgeColor: "from-rose-600 to-red-700",
    lectureText: {
      en: "To conclude, our 1.0 TB infrastructure and 10x Deep Cleaner ensure zero lag for 200,000 concurrent teachers. The system is fully optimized for your daily teaching journey. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      tl: "Sa pagtatapos, ang aming 1.0 TB infrastructure at 10x Deep Cleaner ay nagsisiguro ng bilis para sa 200,000 na guro. Ang system ay handa na para sa inyong pagtuturo. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES",
      bis: "Sa pagtapos, ang among 1.0 TB infrastructure ug 10x Deep Cleaner nagsiguro sa kapaspas para sa 200,000 ka magtutudlo. Ang sistema andam na alang sa inyong pagpanudlo. ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES"
    },
    keyPoints: [
      { en: "10x Deep Cleaner Logic", tl: "10x Deep Cleaner Logic", bis: "10x Deep Cleaner Logic" },
      { en: "Zero Lag Architecture", tl: "Walang Lag na Arkitektura", bis: "Walay Lag nga Arkitektura" },
      { en: "20GB Safety Reserve Locked", tl: "20GB Safety Reserve Locked", bis: "20GB Safety Reserve Locked" }
    ]
  }
];

export const HugeTVTourGuideModal: React.FC<HugeTVTourGuideModalProps> = ({
  isOpen,
  onClose,
  autoPlayVoice = true
}) => {
  const { currentUser, isOwner, activeLogoUrl } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState<'en' | 'tl' | 'bis'>('en');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isTvPowerOn, setIsTvPowerOn] = useState(true);
  const [tvVolume, setTvVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number>(25); // 25s per step for 2.5 min total

  const activeStep = TV_TOUR_STEPS[currentStepIndex] || TV_TOUR_STEPS[0];
  const StepIcon = activeStep?.icon || GraduationCap;

  const getDynamicUpgradeText = (lang: 'en' | 'tl' | 'bis') => {
    const isOwnerUser = isOwner || currentUser?.email === 'boisersteavenkinth@gmail.com';
    
    if (lang === 'bis') {
      let text = "Dugang pa niana, nakit-an sa among sistema ang pinakabag-o nga mga upgrade para sa bersyon 3.3.0. Gi-integrate na nato ang state-locked confirmation dialogs aron malikayan ang aksidente nga pagkapapas sa datos sa master database. Naa na pud kitay automated Google PlayStore deployment wrapper nga sayon ra i-install sa tanan.";
      if (isOwnerUser) {
        text += " Alang kanimo isip Master Creator: andam na usab ang mga administrative keys ug live firestore system signaling.";
      }
      return text;
    } else if (lang === 'tl') {
      let text = "Bukod dito, nakita ng aming system ang pinakabagong mga upgrade para sa bersyon 3.3.0. Idinagdag po natin ang state-locked confirmation dialogs para maiwasan ang aksidenteng pagbura ng data sa master database. Mayroon na ring automated Google PlayStore deployment wrapper para sa mabilis na installation.";
      if (isOwnerUser) {
        text += " At para sa iyo bilang Master Creator: aktibo na rin ang mga administrative keys at real-time firestore system signaling.";
      }
      return text;
    } else {
      let text = "Additionally, our system has detected the latest core upgrades for version 3.3.0. We have successfully integrated state-locked deletion confirmation dialogs to prevent accidental data loss in the master database. We have also introduced the automated Google PlayStore deployment compiler, making direct mobile installations effortless.";
      if (isOwnerUser) {
        text += " For you as the Master Creator: the private system configurations, administrative keys, and real-time firestore signaling pipelines are fully operational.";
      }
      return text;
    }
  };

  // Speak Lecture Text using Speech Synthesis with Calm, Clear, Professional Male Voice
  const speakLecture = (stepIdx: number, lang: 'en' | 'tl' | 'bis') => {
    if (!('speechSynthesis' in window) || isMuted) return;

    stopVoice();

    const step = TV_TOUR_STEPS[stepIdx] || TV_TOUR_STEPS[0];
    if (!step) return;

    let baseText = step.lectureText[lang];
    if (stepIdx === 0 || stepIdx === 4) {
      baseText += " " + getDynamicUpgradeText(lang);
    }

    setIsPlayingVoice(true);
    speakWithProfessionalMaleVoice(baseText, {
      appendTagline: true,
      rate: 0.9,
      pitch: 0.9,
      onStart: () => setIsPlayingVoice(true),
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false)
    });
  };

  const stopVoice = () => {
    stopProfessionalMaleVoice();
    setIsPlayingVoice(false);
  };

  // Trigger speech on step or language change if TV is powered on
  useEffect(() => {
    if (isOpen && isTvPowerOn && autoPlayVoice && !isMuted) {
      speakLecture(currentStepIndex, selectedLang);
    } else {
      stopVoice();
    }

    return () => stopVoice();
  }, [isOpen, currentStepIndex, selectedLang, isTvPowerOn, isMuted]);

  // Auto step timer (2-3 min total experience)
  useEffect(() => {
    if (!isOpen || !isTvPowerOn) return;

    const timer = setInterval(() => {
      setAutoAdvanceTimer((prev) => {
        if (prev <= 1) {
          if (currentStepIndex < TV_TOUR_STEPS.length - 1) {
            setCurrentStepIndex((s) => s + 1);
            return 25;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isTvPowerOn, currentStepIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-300">
      
      {/* CREATIVE HUGE 75-INCH CURVED 4K TELEVISION CONTAINER */}
      <div className="relative w-full max-w-5xl bg-stone-900 rounded-[3rem] p-3 sm:p-6 md:p-8 border-4 border-stone-800 shadow-[0_0_80px_rgba(0,50,150,0.4)] flex flex-col items-center">
        
        {/* Ambient Backlight Glow Effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-amber-500/20 to-indigo-600/30 rounded-[3.5rem] blur-2xl pointer-events-none -z-10" />

        {/* TV Top Bezel Indicator & Speaker Grill */}
        <div className="w-full flex items-center justify-between px-4 pb-3 text-stone-400 text-[10px] font-mono tracking-widest border-b border-stone-800/80">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-amber-400 font-bold uppercase">BOISER 4K EDU-TV BROADCAST STUDIO</span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="hidden sm:inline text-stone-300">CH 0{activeStep.id}: {activeStep.subtitle[selectedLang]}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[9px]">
              LIVE 4K HDR 60FPS
            </span>
            <button
              onClick={() => {
                stopVoice();
                onClose();
              }}
              className="p-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
              title="Close TV Screen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HUGE TELEVISION SCREEN AREA */}
        <div className={`relative w-full rounded-3xl overflow-hidden border-2 transition-all duration-500 my-3 ${
          isTvPowerOn 
            ? 'bg-slate-950 border-stone-700 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]' 
            : 'bg-black border-stone-900 flex items-center justify-center min-h-[420px]'
        }`}>

          {!isTvPowerOn ? (
            /* TV Off Screen */
            <div className="text-center space-y-4 p-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-600">
                <Power className="w-8 h-8" />
              </div>
              <h3 className="text-stone-500 font-bold text-sm uppercase tracking-widest">BOISER EDU-TV SCREEN POWERED OFF</h3>
              <button
                onClick={() => {
                  setIsTvPowerOn(true);
                  setAutoAdvanceTimer(25);
                }}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition"
              >
                Press Power Button To Turn On TV
              </button>
            </div>
          ) : (
            /* TV On Screen - Full Studio Broadcast */
            <div className="p-4 sm:p-6 md:p-8 space-y-6 relative min-h-[440px] flex flex-col justify-between">
              
              {/* Screen Scanlines Texture */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-10" />

              {/* Top Studio Broadcast Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-20 border-b border-slate-800/80 pb-4">
                
                {/* Animated Logo Broadcast Anchor */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0047ff] via-[#0038A8] to-[#001f5c] p-1 shadow-2xl border-2 border-amber-400 overflow-hidden shrink-0 animate-pulse">
                      <img
                        src={activeLogoUrl}
                        alt="Boiser Animated Logo Anchor"
                        className="w-full h-full object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 border-2 border-slate-950 rounded-full animate-ping" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight">
                        MASTER CREATOR TUTOR STUDIO
                      </h2>
                      <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                        ON AIR
                      </span>
                    </div>
                    <p className="text-xs text-blue-300 font-bold">
                      Lecturing: {currentUser.name || 'DepEd Educator'} • {currentUser.email}
                    </p>
                  </div>
                </div>

                {/* Multilingual Selector & Voice Accent Command Bar */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => {
                      executeSwitchToProfessionalMaleVoiceCommand("Voice command executed! Tour guide set to calm, clear professional male voice.");
                    }}
                    className="px-3 py-1 rounded-xl text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center gap-1 shadow-md hover:brightness-110 cursor-pointer border border-amber-300"
                    title="Command: Set voice to calm, clear professional male voice with clear pronunciation"
                  >
                    <span>🎙️ COMMAND: SET PROFESSIONAL MALE VOICE</span>
                  </button>

                  <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />

                  <Languages className="w-4 h-4 text-amber-400 ml-1" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lang:</span>
                  <button
                    onClick={() => setSelectedLang('en')}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                      selectedLang === 'en' ? 'bg-[#0038A8] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setSelectedLang('tl')}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                      selectedLang === 'tl' ? 'bg-[#0038A8] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tagalog
                  </button>
                  <button
                    onClick={() => setSelectedLang('bis')}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                      selectedLang === 'bis' ? 'bg-[#0038A8] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Bisaya
                  </button>
                </div>
              </div>

              {/* Main TV Screen Content Body */}
              <div className="relative z-20 space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${activeStep.badgeColor} text-white shadow-lg`}>
                    <StepIcon className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-amber-300 tracking-tight">
                      {activeStep.title[selectedLang]}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {activeStep.subtitle[selectedLang]}
                    </p>
                  </div>
                </div>

                {/* Main Speech Subtitle Banner (Lecturing Text) */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900/90 via-blue-950/80 to-slate-900/90 border-2 border-blue-500/40 rounded-2xl shadow-inner relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-400 text-slate-950 rounded-xl shrink-0 font-bold text-xs mt-0.5">
                      🎙️ LECTURE:
                    </div>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-stone-100 leading-relaxed italic">
                      "{activeStep.lectureText[selectedLang]}"
                    </p>
                  </div>
                  {isPlayingVoice && (
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-amber-400 animate-pulse">
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Calm &amp; Clear Boiser Voice Lecturing...</span>
                    </div>
                  )}
                </div>

                {/* Key Points Bullet List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {activeStep.keyPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 font-bold flex items-center gap-2 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pt[selectedLang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom TV Studio Status Bar */}
              <div className="relative z-20 border-t border-slate-800/80 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                
                {/* Step Progress Pills */}
                <div className="flex items-center gap-1.5">
                  {TV_TOUR_STEPS.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        setCurrentStepIndex(idx);
                        setAutoAdvanceTimer(25);
                      }}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === currentStepIndex
                          ? 'w-8 bg-amber-400 shadow-md'
                          : idx < currentStepIndex
                          ? 'w-3 bg-emerald-500'
                          : 'w-3 bg-slate-700 hover:bg-slate-600'
                      }`}
                      title={`Jump to Step ${st.id}`}
                    />
                  ))}
                  <span className="text-[10px] text-slate-400 font-mono font-bold ml-2">
                    Step {currentStepIndex + 1} of {TV_TOUR_STEPS.length} ({autoAdvanceTimer}s)
                  </span>
                </div>

                {/* Voice & Channel Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      isMuted
                        ? 'bg-red-500/20 text-red-400 border-red-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                    <span className="hidden sm:inline">{isMuted ? "Muted" : "Voice On"}</span>
                  </button>

                  <button
                    disabled={currentStepIndex === 0}
                    onClick={() => {
                      setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                      setAutoAdvanceTimer(25);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <SkipBack className="w-4 h-4" />
                    <span>Prev Channel</span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentStepIndex < TV_TOUR_STEPS.length - 1) {
                        setCurrentStepIndex((prev) => prev + 1);
                        setAutoAdvanceTimer(25);
                      } else {
                        stopVoice();
                        onClose();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                  >
                    <span>{currentStepIndex === TV_TOUR_STEPS.length - 1 ? "Finish Tour" : "Next Channel"}</span>
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* PHYSICAL TV FRAME BOTTOM BEZEL & POWER BUTTON CONTROLS */}
        <div className="w-full flex items-center justify-between px-6 pt-2 text-stone-400 text-xs font-bold">
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-stone-300 font-extrabold uppercase tracking-widest text-[10px]">
              BOISER VISION 4K HDR • SY 2026-2027 CURRICULUM TV
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTvPowerOn(!isTvPowerOn)}
              className={`p-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                isTvPowerOn
                  ? 'bg-red-600/20 text-red-400 border border-red-500/40 hover:bg-red-600/40'
                  : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/40'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isTvPowerOn ? "Power OFF" : "Power ON"}</span>
            </button>

            <button
              onClick={() => {
                stopVoice();
                onClose();
              }}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-extrabold transition cursor-pointer"
            >
              Skip Tour &amp; Open App
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
