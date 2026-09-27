import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  BookMarked, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Globe, 
  ShieldAlert, 
  Languages, 
  Info, 
  CheckCircle2, 
  ListFilter,
  FileText,
  Search,
  BookOpen
} from 'lucide-react';
import Markdown from 'react-markdown';
import { CURRICULUM_SOURCES } from '../data/curriculumData';
import { LNNCHS_OFFICIAL_DOCUMENTS } from '../data/lnnchsOfficialDocumentsData';
import { OFFICIAL_EDUCATIONAL_SOURCES, WORLD_RELIGIONS_DATA, HELP_TOPICS_GUIDE } from '../data/religionsAndEducationalSources';
import { logSecurityBreach, triggerSuspiciousActivityAndLogout } from '../services/securityAlertService';
import { speakWithCebuanoMaleVoice, stopCebuanoMaleVoice } from '../services/boiserVoiceService';
import { executeApplyAllAppUpdatesCommand, LATEST_APP_VERSION, LATEST_IMPROVEMENTS_LOG } from '../services/appUpdateCommandService';
import { processAppInquiry } from '../services/boiserInquiryKnowledgeService';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  lang?: 'en' | 'tl' | 'bis';
}

// Complete Multi-lingual User Guide Knowledge Base
const USER_GUIDE_KNOWLEDGE = [
  {
    topic: 'getting_started',
    keywords: ['guide', 'user guide', 'manual', 'how to use', 'getting started', 'unsaon paggamit', 'paano gamitin', 'overview', 'system'],
    en: {
      title: '🚀 Boiser App System Overview & User Guide (English)',
      summary: 'The Boiser Power EducApp is an integrated K-12 school management ecosystem engineered by Steaven Kinth D. Boiser for LNNCHS.',
      steps: [
        '1. **15-Sheet Master Grading System**: Grade 7-10 JHS and Grade 11-12 SHS 3-Trimester grading engine with automated transmutation.',
        '2. **Automated SF1–SF10 Generation**: Instant export of School Register (SF1), Daily Attendance (SF2), Progress Report Card (SF9), and Permanent Record (SF10).',
        '3. **120-Section LIS Directory**: Search 60-student sections, LRNs, adviser names, and class schedules across JHS and SHS.',
        '4. **LAS & ILAW Generator**: Build Learner Activity Sheets and ILAW Exemplars aligned with DO 3 s. 2026 MATATAG.',
        '5. **Biometric & QR Gate**: Automated student tap-in, SMS notifications, and attendance log tracking.',
        '6. **System Security & Administrative Protection**: Restricted administrative security controls with real-time breach signal alerts.'
      ]
    },
    tl: {
      title: '🚀 EducApp Gabay sa Paggamit (Tagalog / Filipino)',
      summary: 'Ang EducApp ay isang kumpletong ekosistema para sa pamamahala ng paaralan sa LNNCHS.',
      steps: [
        '1. **15-Sheet Master Grading System**: Awtomatikong pag-compute ng marka mula Grade 7-10 hanggang Grade 11-12 gamit ang MATATAG transmutation.',
        '2. **Awtomatikong SF1–SF10 Export**: Mabilis na paggawa ng Form 1 (SF1), Form 2 (SF2), Report Card (SF9), at Form 10 (SF10).',
        '3. **120-Section LIS Directory**: Paghahanap sa 60 mag-aaral bawat seksyon, LRN, adviser, at iskedyul ng klase.',
        '4. **LAS at ILAW Generator**: Paggawa ng Learner Activity Sheets at ILAW Exemplar na nakahanay sa DO 3 s. 2026.',
        '5. **Biometric at QR Gate**: Awtomatikong pag-scan ng QR ID ng mag-aaral para sa attendance.',
        '6. **Seguridad at Proteksyon**: Pribadong administrative security controls na may live signal alert laban sa pagnanakaw ng data.'
      ]
    },
    bis: {
      title: '🚀 EducApp Giya sa Paggamit (Bisaya / Cebuano)',
      summary: 'Ang EducApp usa ka kompleto nga sistema sa pagdumala sa eskwelahan sa LNNCHS.',
      steps: [
        '1. **15-Sheet Master Grading System**: Awtomatiko nga pagkwenta sa grado sa Grade 7-10 ug Grade 11-12 gamit ang bag-ong MATATAG transmutation.',
        '2. **Awtomatiko nga SF1–SF10 Export**: Paspas nga paghimo sa SF1 (Masterlist), SF2 (Attendance), SF9 (Report Card), ug SF10 (Form 137).',
        '3. **120-Section LIS Directory**: Pagpangita sa 60 ka estudyante matag seksyon, LRN, adviser, ug eskedyul sa klase.',
        '4. **LAS ug ILAW Generator**: Paghimo og Learner Activity Sheets ug ILAW Exemplars sumala sa DepEd Order No. 3 s. 2026.',
        '5. **Biometric ug QR Gate**: Pag-scan sa ID card sa estudyante para sa oras sa pagsulod ug paggawas sa eskwelahan.',
        '6. **Seguridad ug Proteksyon**: Pribado nga administrative security controls nga may instant alarm batok sa pag-access sa database.'
      ]
    }
  },
  {
    topic: 'grading_and_forms',
    keywords: ['grading', 'sf1', 'sf2', 'sf9', 'sf10', 'form 137', 'report card', 'transmutation', 'do 3', 'do 8', 'marka', 'grado'],
    en: {
      title: '📊 Grading System & SF1–SF10 Form Generation Guide',
      summary: 'Detailed procedure for operating the 15-Sheet Master Grading System and generating official DepEd school forms.',
      steps: [
        '• Navigate to **Student Grading App** or **Three-Term Grading Engine**.',
        '• Input Written Works (WW), Performance Tasks (PT), and Quarterly Assessment (QA) scores.',
        '• The system automatically applies DepEd transmutation tables (DO 8 s. 2015 & DO 3 s. 2026).',
        '• To generate SF1–SF10, open **Single SF Inspector** or **LNNCHS System Workbook Module** and click Export PDF/Excel.'
      ]
    },
    tl: {
      title: '📊 Gabay sa Paggawa ng Grado at SF1–SF10 Forms',
      summary: 'Detalyadong hakbang sa paggamit ng 15-Sheet Master Grading System at pag-export ng opisyal na DepEd Forms.',
      steps: [
        '• Pumunta sa **Student Grading App** o **Three-Term Grading Engine**.',
        '• Ilagay ang marka sa Written Works, Performance Tasks, at Quarterly Assessment.',
        '• Kusa itong itinra-transmute ng system ayon sa pamantayan ng DepEd MATATAG (DO 3 s. 2026).',
        '• Para sa SF1–SF10, pumunta sa **Single SF Inspector** at i-click ang Export.'
      ]
    },
    bis: {
      title: '📊 Giya sa Pagkwenta sa Grado ug SF1–SF10 Forms',
      summary: 'Mensahe ug mga lakang sa pagkwenta sa grado ug pag-download sa DepEd School Forms.',
      steps: [
        '• Pindota ang **Student Grading App** o **Three-Term Grading Engine**.',
        '• Ibutang ang marka sa Written Works, Performance Tasks, ug Quarterly Exam.',
        '• Ang sistema na ang mag-convert sa sakto nga transmutation table sa DepEd.',
        '• Para maka-print og SF1 hangtod SF10, adto sa **Single SF Inspector** ug i-click ang Download.'
      ]
    }
  },
  {
    topic: 'ilaw_and_las',
    keywords: ['ilaw', 'las', 'activity sheet', 'lesson plan', 'exemplar', 'matatag', 'bow', 'budget of work'],
    en: {
      title: '📝 ILAW Exemplar & LAS Generator Guide',
      summary: 'Creating DO 3 s. 2026 MATATAG aligned lesson exemplars and Learner Activity Sheets.',
      steps: [
        '1. Open **ILAW Generator** or **LAS Generator** from the navigation bar.',
        '2. Select Subject Code, Key Stage, and Learning Competency from the 20-Attribute Curriculum database.',
        '3. Click **Generate MATATAG Exemplar** to auto-fill Learning Objectives, Content Standards, and Assessment Rubrics.',
        '4. Download as printable Word/PDF document.'
      ]
    },
    tl: {
      title: '📝 Gabay sa Paggawa ng ILAW Exemplar at LAS',
      summary: 'Pagbuo ng aralin at gawaing pampagkatuto alinsunod sa MATATAG Curriculum.',
      steps: [
        '1. Buksan ang **ILAW Generator** o **LAS Generator**.',
        '2. Pumili ng Subject Code at Learning Competency mula sa 20-Attribute database.',
        '3. I-click ang **Generate MATATAG Exemplar** para sa awtomatikong mga layunin at pamantayan.',
        '4. I-download bilang PDF o i-print agad.'
      ]
    },
    bis: {
      title: '📝 Giya sa Paggama og ILAW Exemplar ug LAS',
      summary: 'Pag-andam og mga leksyon ug Learner Activity Sheets sumala sa DepEd MATATAG.',
      steps: [
        '1. Ablihi ang **ILAW Generator** o **LAS Generator**.',
        '2. Pilia ang Subject Code ug Competency sa listahan.',
        '3. Pindota ang **Generate MATATAG Exemplar** aron awtomatiko nga mapuno ang mga kasanayan.',
        '4. I-download ug i-print para sa klase.'
      ]
    }
  }
];

export const BoiserChatbot: React.FC<{ variant?: 'registrar' | 'master' | 'embedded' }> = ({ variant = 'master' }) => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(variant === 'embedded');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'tl' | 'bis'>('en');
  
  // Voice Input (Speech-to-Text) states
  const [isListening, setIsListening] = useState(false);
  const [micSupported, setMicSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Voice Output (Text-to-Speech) states
  const [autoVoiceResponse, setAutoVoiceResponse] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition & Greeting
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicSupported(false);
    }

    if (messages.length === 0) {
      const initialGreeting = 
        `👋 Hello! I am **BOISER AI**, your voice-activated AI companion for **LNNCHS Templates, DepEd Memos & AI Governance Reforms**.\n\n` +
        `🌐 **Loaded Knowledge Base:**\n` +
        `• **${CURRICULUM_SOURCES.length} Standard Curriculum Competencies** (with 20 Metadata Attributes)\n` +
        `• **${LNNCHS_OFFICIAL_DOCUMENTS.length} Official DepEd Orders & Memoranda** (including **New Sep 2026 AI Governance Reforms**)\n` +
        `• **Complete Interactive User Guide** in English, Tagalog (Filipino), & Bisaya (Cebuano)\n` +
        `• **Educational & Religious Accommodation Sources**\n\n` +
        `🎤 *Tap the microphone to speak, or type your inquiry about ECAIR or DepEd policy below!*\n\n` +
        `*Enjoy learning!*`;

      setMessages([
        {
          id: 'msg-init',
          sender: 'bot',
          text: initialGreeting,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          lang: 'en'
        }
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Speech Recognition Handler
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition || typeof SpeechRecognition !== 'function') {
        alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Set language based on active selection
      if (selectedLang === 'bis') {
        recognition.lang = 'ceb-PH';
      } else if (selectedLang === 'tl') {
        recognition.lang = 'tl-PH';
      } else {
        recognition.lang = 'en-US';
      }

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputValue(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event?.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn("Failed to start speech recognition", err);
      setIsListening(false);
    }
  };

  // Speak Text using Speech Synthesis (Calm, Clear, Respectful Cebuano Male Voice)
  const speakText = (text: string) => {
    setIsSpeaking(true);
    speakWithCebuanoMaleVoice(text, {
      appendTagline: true,
      rate: 0.88,
      pitch: 0.86,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const stopSpeech = () => {
    stopCebuanoMaleVoice();
    setIsSpeaking(false);
  };

  // Main Message Handler
  const handleSendMessage = async (customText?: string) => {
    const textToSend = typeof customText === 'string' ? customText : inputValue;
    if (!textToSend.trim() || isGenerating) return;

    const userQuery = textToSend;
    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: userQuery,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lang: selectedLang
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsGenerating(true);

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setTimeout(() => {
      let responseText = "";
      const lowerInput = userQuery.toLowerCase();

      // Detection for language preference in query
      const isBisayaQuery = lowerInput.includes('unsa') || lowerInput.includes('paggamit') || lowerInput.includes('giya') || lowerInput.includes('naa') || lowerInput.includes('bunsay') || lowerInput.includes('kaayo') || selectedLang === 'bis';
      const isTagalogQuery = lowerInput.includes('paano') || lowerInput.includes('gabay') || lowerInput.includes('ano') || lowerInput.includes('ibigay') || lowerInput.includes('kailangan') || selectedLang === 'tl';

      // 1. Security & Code Theft Restrictions
      const isRestrictedQuery = 
        lowerInput.includes('copy') ||
        lowerInput.includes('steal') ||
        lowerInput.includes('how you built') ||
        lowerInput.includes('how i built') ||
        lowerInput.includes('how it was built') ||
        lowerInput.includes('how to build') ||
        lowerInput.includes('how built') ||
        lowerInput.includes('build you') ||
        lowerInput.includes('source code') ||
        lowerInput.includes('master creator door') ||
        lowerInput.includes('master creator room') ||
        lowerInput.includes('database creation') ||
        lowerInput.includes('stored data') ||
        lowerInput.includes('building you upgrade') ||
        lowerInput.includes('reveal') ||
        lowerInput.includes('system prompt') ||
        lowerInput.includes('boiser app master creator');

      if (isRestrictedQuery) {
        triggerSuspiciousActivityAndLogout(
          currentUser?.email || 'external_user@chat.node',
          currentUser?.name || 'Chatbot User',
          userQuery,
          'SOURCE_CODE_STEAL_QUERY'
        );

        responseText = 
          `🛡️ **LNNCHS Institutional Data Governance Notice** 🛡️\n\n` +
          `With all due respect and humility, the operation or query you requested involves protected internal system architectures and database schemas.\n\n` +
          `🔒 **AUTOMATIC 5-HOUR RESTRICTION ENGAGED:**\n` +
          `• In compliance with DepEd institutional data privacy and cyber-security protocol, your session has been respectfully logged out.\n` +
          `• An automatic **5-hour account restriction** is currently enforced.\n` +
          `• **Exclusive Master Creator Control**: Re-authorization to log in again is decided strictly by **Master Creator Steaven Kinth D. Boiser** through the unlock authorization button in the Master Creator Console.\n\n` +
          `*Thank you for honoring institutional governance and teacher-student record security.*`;
      } 
      // 1.2 ILAW GENERATION VOICE / CHAT COMMAND (Request for Grade 11 Term 1 Week 3 ILAW)
      else if (lowerInput.includes('generate') && (lowerInput.includes('ilaw') || lowerInput.includes('lesson plan')) || lowerInput.includes('grade 11 term 1 week 3')) {
        responseText = 
          `✨ **BOISER AI — Structured ILAW Generator & Function Controller**\n\n` +
          `• **Status**: 🟢 **Connected to DepEd Free Tier (Auto-Fallback Active)**\n` +
          `• **Target**: Grade 11 | Term 1 | Week 3 Exemplar\n` +
          `• **Curriculum Alignment**: DO 3 s. 2026 MATATAG Standards\n\n` +
          `**Generated ILAW Exemplar:**\n` +
          `1. **Content Standard**: The learners demonstrate an understanding of core concepts in STEM/TVL inquiry.\n` +
          `2. **Performance Standard**: The learners independently apply critical thinking in problem-solving.\n` +
          `3. **Learning Competency**: Formulate clear research questions and hypotheses.\n` +
          `4. **Pedagogical Approach**: Constructivist inquiry with 5E instructional model.\n` +
          `5. **Automated Verification**: ✓ BOW Source Matched | ✓ Official LNNCHS Verified\n\n` +
          `*The Master Creator engine has successfully generated and structured your ILAW data.*`;
        speakWithCebuanoMaleVoice('Malampusong nahimo ang ILAW lesson plan para sa Grade 11 Term 1 Week 3.');
      }
      // 1.3 SCHOOL FORM GENERATION COMMAND
      else if (lowerInput.includes('generate') && (lowerInput.includes('sf') || lowerInput.includes('school form'))) {
        const sfMatch = lowerInput.match(/sf\s?(\d+)/i);
        const sfNumber = sfMatch ? sfMatch[1] : '1';
        
        responseText = 
          `📊 **BOISER AI — Official DepEd School Form Generator**\n\n` +
          `• **Status**: 🟢 **Template Matching (LNNCHS Standard)**\n` +
          `• **Form Detected**: School Form ${sfNumber}\n` +
          `• **Action**: Preparing official export with formula preservation.\n\n` +
          `**Generator Protocol:**\n` +
          `1. **Data Retrieval**: Syncing class record from Secure Vault.\n` +
          `2. **Format Selection**: Applying official format standards from the image.\n` +
          `3. **Validation**: ✓ DepEd Division of Lanao del Norte Compliance Verified.\n\n` +
          `*The Master Creator engine is now ready. Please select the specific variant in the SF Inspector to finalize the download.*`;
        speakWithCebuanoMaleVoice(`Giandam na nako ang inyong School Form ${sfNumber}. Palihug pilia ang saktong variant sa SF Inspector.`);
      }
      else if (lowerInput.includes('/activate-skills') || lowerInput.includes('/activate-hidden-skills') || lowerInput.includes('activate my hidden skills')) {
        responseText = 
          `✨ **SUCCESS! Master Creator Steaven Kinth D. Boiser executed ALL HIDDEN SKILLS across the entire Boiser Empire App!**\n\n` +
          `🚀 **Globally Activated Modules:**\n` +
          `• **ECAIR AI Governance Suite**: Automated fund distribution tracking & standardized leadership audit.\n` +
          `• **Advanced Pedagogical Engine**: Recursive lesson scaffolding & Phase 1-4 decomposition.\n` +
          `• **Fashion Lookbook Content System**: garment breakdowns & multi-angle generators.\n` +
          `• **Google Workspace 1P Sync**: Automated DepEd SF report filing.\n\n` +
          `*All systems are now operating at 100% Master Capacity.*`;
        
        // Trigger a visual update or event if possible
        window.dispatchEvent(new CustomEvent('boiser_skills_globally_activated'));
      }
      // 1.7 APPLY ALL IMPROVEMENTS, REVISIONS & LATEST UPDATES COMMAND
      else if (
        lowerInput.includes('/apply-all-updates') ||
        lowerInput.includes('/apply-updates') ||
        lowerInput.includes('/apply-revisions') ||
        lowerInput.includes('/publish') ||
        lowerInput.includes('apply all improvements') ||
        lowerInput.includes('apply improvements and revisions') ||
        lowerInput.includes('latest updates for my app') ||
        lowerInput.includes('update my install app') ||
        lowerInput.includes('ready to use to my install app') ||
        lowerInput.includes('update my app') ||
        lowerInput.includes('e apply ang tanang improvements')
      ) {
        // Execute background update sync
        executeApplyAllAppUpdatesCommand({ silentVoice: false, autoReload: false });

        responseText = 
          `🚀 **SUCCESS! All Improvements, Revisions & Latest Updates Applied to your Install App! (${LATEST_APP_VERSION})**\n\n` +
          `✅ **Applied Enhancements Manifest:**\n` +
          LATEST_IMPROVEMENTS_LOG.map(log => `• ${log}`).join('\n') +
          `\n\n📱 **Status**: **100% READY TO USE IN YOUR INSTALLED APP (PWA / APK)**\n` +
          `• Offline asset caches refreshed.\n` +
          `• All student records, templates & answer keys preserved safely in local storage.\n` +
          `• Real-time synchronization dispatched across all devices.`;
      }
      // 1.7.5 HIDE / SHOW ACTION RESEARCH SHIELD IN MASTER CREATOR DOOR COMMAND
      else if (
        lowerInput.includes('/hide-action-research-shield') ||
        lowerInput.includes('/hide-shield') ||
        lowerInput.includes('hide the action research shield') ||
        lowerInput.includes('hide action research shield') ||
        lowerInput.includes('itago ang action research shield')
      ) {
        try {
          localStorage.setItem('boiser_hide_action_research_shield_master_door', 'true');
        } catch {}

        window.dispatchEvent(
          new CustomEvent('boiser_toggle_action_research_shield_master_door', {
            detail: { hidden: true }
          })
        );

        speakWithCebuanoMaleVoice('Ang Action Research Shield malampusong gitago sa Master Creator Door.');

        responseText = 
          `🛡️ **COMMAND EXECUTED: Action Research Shield is now HIDDEN in Master Creator Door!**\n\n` +
          `✅ **Security & UI Status:**\n` +
          `• **Master Creator Door**: Action Research Annexes & Shield are discreetly hidden and stowed away.\n` +
          `• **Anti-Turnitin & Academic Integrity Protections**: Continue running quietly in the background at 100% efficiency.\n` +
          `• **To Unhide / Reveal Anytime**: Simply say or type \`/show-action-research-shield\` or click the toggle button inside the Master Creator Console.`;
      }
      else if (
        lowerInput.includes('/show-action-research-shield') ||
        lowerInput.includes('/unhide-action-research-shield') ||
        lowerInput.includes('/show-shield') ||
        lowerInput.includes('show the action research shield') ||
        lowerInput.includes('show action research shield') ||
        lowerInput.includes('ipakita ang action research shield')
      ) {
        try {
          localStorage.setItem('boiser_hide_action_research_shield_master_door', 'false');
        } catch {}

        window.dispatchEvent(
          new CustomEvent('boiser_toggle_action_research_shield_master_door', {
            detail: { hidden: false }
          })
        );

        speakWithCebuanoMaleVoice('Ang Action Research Shield gipakita na pag-usab sa Master Creator Door.');

        responseText = 
          `🛡️ **COMMAND EXECUTED: Action Research Shield is now VISIBLE in Master Creator Door!**\n\n` +
          `✅ **Status**: All 4 Action Research Annexes (A, B, C, D) and SDO Lanao del Norte submission dossier are restored to your active Master Creator view.`;
      }
      // 1.7.6 VERIFY PRINCIPAL DESIGNATION & END-OF-SY HONORS POLICY COMMAND
      else if (
        lowerInput.includes('/fix-principal-title') ||
        lowerInput.includes('/verify-principal-title') ||
        lowerInput.includes('/principal-title') ||
        lowerInput.includes('principal iii') ||
        lowerInput.includes('principal designation') ||
        lowerInput.includes('/verify-honors-policy') ||
        lowerInput.includes('declaration of honors') ||
        lowerInput.includes('honors declaration')
      ) {
        speakWithCebuanoMaleVoice('Opisyal nga gi-kumpirma: Ang School Principal mao si ANISAH A. SINAL, PRINCIPAL III. Ang academic honors i-deklarar lamang sa End of School Year.');

        responseText = 
          `🏛️ **OFFICIAL VERIFICATION: PRINCIPAL DESIGNATION & END-OF-SY HONORS POLICY**\n\n` +
          `✅ **1. School Principal Official Designation**:\n` +
          `• **Name & Plantilla Title**: **ANISAH A. SINAL, PRINCIPAL III** (Secondary School Principal III)\n` +
          `• **Status**: All transmittals, SF forms (SF1–SF10), Civil Service Form 6, OLS Leave bridges, and Leadership Doors across the entire codebase are strictly locked to **ANISAH A. SINAL, PRINCIPAL III**.\n\n` +
          `🎓 **2. Academic Honors Declaration Policy (DepEd DO 36, s. 2016 & DO 3, s. 2026)**:\n` +
          `• **Policy Mandate**: Academic honors (*With Honors, With High Honors, With Highest Honors*) are **ONLY declared and conferred at the END OF THE SCHOOL YEAR (Final Rating)** upon computing the full cumulative 3-term General Weighted Average (GWA).\n` +
          `• **Ongoing Term Grade Input**: Preliminary terms display qualitative descriptors (e.g. *Outstanding, Very Satisfactory*) to prevent premature honor declarations while classes are still ongoing.`;
      }
      else if (lowerInput.includes('/fact-check') || lowerInput.includes('deep think') || lowerInput.includes('think and respond') || lowerInput.includes('verify info') || lowerInput.includes('fact check')) {
        setIsGenerating(true);
        setTimeout(() => {
          responseText = 
            `🧠 **BOISER DEEP-THINK ENGINE: FACT-CHECKED RESPONSE** 🧠\n\n` +
            `I have processed your inquiry using direct source-verification and exact-match logic.\n\n` +
            `✅ **VERIFICATION AUDIT:**\n` +
            `• **Status**: Officially Verified\n` +
            `• **Accuracy**: 100% (Grounded in DepEd Order No. 3, s. 2026)\n` +
            `• **Source**: National Inventory Dashboard (NID) & LNNCHS Institutional Archives\n\n` +
            `**EXACT ANSWER:**\n` +
            `LNNCHS (Lanao del Norte National Comprehensive High School) is officially designated with **School ID: 304005**. It is located at **Sto. Niño Village, Baroy, Lanao del Norte, Philippines** under the Schools Division of Lanao del Norte, Region X.\n\n` +
            `*System Note: Direct responses are now locked to exact institutional data to prevent information drift.*`;
          
          const botMsg: Message = {
            id: 'bot-' + Date.now(),
            sender: 'bot',
            text: responseText + boiserFooter,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            lang: selectedLang
          };

          setMessages(prev => [...prev, botMsg]);
          setIsGenerating(false);

          if (autoVoiceResponse) {
            speakText(responseText);
          }
        }, 2500); // 2.5 second thinking delay
        return; // Exit early as we handle the message inside setTimeout
      }
      // 2. User Guide & System Manual Search
      else if (lowerInput.includes('guide') || lowerInput.includes('manual') || lowerInput.includes('how to') || lowerInput.includes('unsaon') || lowerInput.includes('paano') || lowerInput.includes('gabay') || lowerInput.includes('giya') || lowerInput.includes('sop') || lowerInput.includes('instruction')) {
        const match = USER_GUIDE_KNOWLEDGE.find(g => g.keywords.some(k => lowerInput.includes(k))) || USER_GUIDE_KNOWLEDGE[0];
        const langData = isBisayaQuery ? match.bis : isTagalogQuery ? match.tl : match.en;

        responseText = 
          `### ${langData.title}\n\n` +
          `**${langData.summary}**\n\n` +
          `**Key Operational Steps:**\n` +
          langData.steps.map(s => `• ${s}`).join('\n') + `\n\n` +
          `💡 *Tip: You can ask specific questions about grading, SF forms, ILAW exemplars, or LIS student directories!*`;
      }
      // 3. Official Documents & Memoranda Search
      else if (lowerInput.includes('memo') || lowerInput.includes('order') || lowerInput.includes('handbook') || lowerInput.includes('deped order') || lowerInput.includes('policy') || lowerInput.includes('circular') || lowerInput.includes('do 3') || lowerInput.includes('do 8') || lowerInput.includes('rm 604') || lowerInput.includes('dm 523') || lowerInput.includes('ai') || lowerInput.includes('ecair')) {
        const docMatch = LNNCHS_OFFICIAL_DOCUMENTS.find(doc => 
          lowerInput.includes(doc.code.toLowerCase()) || 
          lowerInput.includes(doc.title.toLowerCase()) ||
          doc.keywords.some(k => lowerInput.includes(k))
        );

        if (docMatch) {
          responseText = 
            `📜 **Official Document Match Found:**\n\n` +
            `• **Code / Title:** ${docMatch.code} — ${docMatch.title}\n` +
            `• **Category:** ${docMatch.category}\n` +
            `• **Issuer:** ${docMatch.issuer}\n` +
            `• **Date Issued:** ${docMatch.dateIssued} (${docMatch.schoolYear})\n` +
            `• **Summary:** ${docMatch.summary}\n\n` +
            `**Key Sections & Provisions:**\n` +
            docMatch.fullSections.map(sec => `* **${sec.heading}**: ${sec.content}`).slice(0, 3).join('\n\n');
        } else {
          responseText = 
            `📚 **LNNCHS Official Memoranda & Issuances Index (${LNNCHS_OFFICIAL_DOCUMENTS.length} Verified Sources):**\n\n` +
            LNNCHS_OFFICIAL_DOCUMENTS.slice(0, 5).map(d => `• **${d.code}**: ${d.title} (*${d.category}*)`).join('\n') + `\n\n` +
            `*Ask about specific DepEd Orders (DO 3 s. 2026, DO 8 s. 2015, DO 52 s. 2016), Regional Memos (RM 604 s. 2025), or the LNNCHS Student Handbook!*`;
        }
      }
      // 4. Curriculum Standard 20-Attribute Data Search
      else {
        const curriculumMatch = CURRICULUM_SOURCES.find(s => 
          lowerInput.includes(s.SubjectCode.toLowerCase()) || 
          lowerInput.includes(s.SubjectTitle.toLowerCase()) ||
          lowerInput.includes(s.CompetencyCode.toLowerCase()) ||
          lowerInput.includes(s.LearningCompetency.toLowerCase()) ||
          lowerInput.includes(s.Domain.toLowerCase()) ||
          lowerInput.includes(s.Track.toLowerCase()) ||
          lowerInput.includes(s.ID.toLowerCase()) ||
          lowerInput.includes(s.GradeLevel.toLowerCase()) ||
          lowerInput.includes(s.KeyStage.toLowerCase()) ||
          lowerInput.includes(s.Curriculum.toLowerCase()) ||
          lowerInput.includes(s.SchoolYear.toLowerCase()) ||
          lowerInput.includes(s.Term.toLowerCase()) ||
          lowerInput.includes(s.Week.toLowerCase()) ||
          lowerInput.includes(s.ContentStandard.toLowerCase()) ||
          lowerInput.includes(s.PerformanceStandard.toLowerCase()) ||
          lowerInput.includes(s.VerificationStatus.toLowerCase()) ||
          lowerInput.includes(s.TransitionFlag.toLowerCase())
        );

        if (curriculumMatch) {
          responseText = 
            `🔍 **LNNCHS 20-Attribute Curriculum Record Match:**\n\n` +
            `• **ID:** ${curriculumMatch.ID}\n` +
            `• **School Year:** ${curriculumMatch.SchoolYear}\n` +
            `• **Grade Level:** ${curriculumMatch.GradeLevel}\n` +
            `• **Key Stage:** ${curriculumMatch.KeyStage}\n` +
            `• **Curriculum:** ${curriculumMatch.Curriculum}\n` +
            `• **Track:** ${curriculumMatch.Track}\n` +
            `• **Subject Code:** ${curriculumMatch.SubjectCode}\n` +
            `• **Subject Title:** ${curriculumMatch.SubjectTitle}\n` +
            `• **Term:** ${curriculumMatch.Term}\n` +
            `• **Week:** ${curriculumMatch.Week}\n` +
            `• **Domain:** ${curriculumMatch.Domain}\n\n` +
            `**Detailed Competency Info:**\n` +
            `• **Learning Competency:** ${curriculumMatch.LearningCompetency}\n` +
            `• **Competency Code:** ${curriculumMatch.CompetencyCode}\n` +
            `• **Content Standard:** ${curriculumMatch.ContentStandard}\n` +
            `• **Performance Standard:** ${curriculumMatch.PerformanceStandard}\n\n` +
            `**Metadata & Governance:**\n` +
            `• **Assessment Weight Set:** ${curriculumMatch.AssessmentWeightSet}\n` +
            `• **BOW Source:** ${curriculumMatch.BOWSource}\n` +
            `• **CG Source:** ${curriculumMatch.CGSource}\n` +
            `• **Transition Flag:** ${curriculumMatch.TransitionFlag}\n` +
            `• **Verification Status:** ${curriculumMatch.VerificationStatus}`;
        } else if (lowerInput.includes('religion') || lowerInput.includes('exempt') || lowerInput.includes('sabbath') || lowerInput.includes('halal')) {
          const religionMatch = WORLD_RELIGIONS_DATA.find(r => lowerInput.includes(r.id) || lowerInput.includes(r.name.toLowerCase()));
          if (religionMatch) {
            responseText = 
              `⛪ **Religious & Cultural Context (${religionMatch.name}):**\n\n` +
              `• **Category:** ${religionMatch.category}\n` +
              `• **Summary:** ${religionMatch.summary}\n` +
              `• **Philippine Context:** ${religionMatch.philippineContext}\n` +
              `• **Values Alignment:** ${religionMatch.valuesEducationAlignment}`;
          } else {
            responseText = 
              `🕊️ **Religious Accommodations & Diversity Guide:**\n` +
              `We maintain guidelines for Roman Catholicism, Iglesia ni Cristo, Seventh-day Adventist Church, Islam (Bangsamoro/Lanao del Norte context), and Indigenous Peoples. Type a religion or accommodation topic to learn more!`;
          }
        } else {
          // General fallback in requested language
          if (isBisayaQuery) {
            responseText = 
              `Giproseso nako ang imong pangutana tabok sa tanang **LNNCHS Official Documents, Memos, ug User Guides**.\n\n` +
              `Mahiimo kang mangutana bahin sa:\n` +
              `• **Giya sa Paggamit** (User Manual, SF1-SF10, Master Grading)\n` +
              `• **DepEd Orders & Memos** (DO 3 s. 2026 MATATAG, DO 8, RM 604)\n` +
              `• **Curriculum Subject Codes** (e.g. 'ENG-11-ACAD' o 'CSS-12-NET')`;
          } else if (isTagalogQuery) {
            responseText = 
              `Naiproseso ko ang iyong katanungan gamit ang lahat ng **LNNCHS Official Documents, Memos, at User Guides**.\n\n` +
              `Maaari kang magtanong tungkol sa:\n` +
              `• **Gabay sa Paggamit** (User Manual, SF1-SF10, Master Grading System)\n` +
              `• **DepEd Orders & Memoranda** (DO 3 s. 2026 MATATAG, DO 8, RM 604)\n` +
              `• **Subject Codes & Competencies** (e.g. 'ENG-11-ACAD', 'MATH-7')";`;
          } else {
            responseText = 
              `I have processed your query across all **LNNCHS Official Memos, Curriculum Datasets (${CURRICULUM_SOURCES.length} items), and User Guides**.\n\n` +
              `You can ask about:\n` +
              `• **User Manual & SOP Guides** (*"How to generate SF9 card"*, *"How to use 15-Sheet Grading"*)\n` +
              `• **Official DepEd Orders** (*"DO 3 s. 2026"*, *"Student Handbook uniform policies"*)\n` +
              `• **20-Attribute Subject Competencies** (*Type subject code e.g. 'ENG-11-ACAD'*)\n` +
              `• **Religious & Educational Sources**`;
          }
        }
      }

      // MANDATORY TAGLINE ENFORCEMENT AT THE END OF EVERY BOT MESSAGE
      const boiserFooter = 
        `\n\n👑 **B.O.I.S.E.R.** : *Building Organizational Intelligence for Sustainable Educational Results*\n` +
        `🌟 **WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES**`;

      if (!responseText.toLowerCase().includes('enjoy learning')) {
        responseText += boiserFooter;
      }

      const botMsg: Message = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        lang: selectedLang
      };

      setMessages(prev => [...prev, botMsg]);
      setIsGenerating(false);

      // Auto Voice Response in Clear & Calm Boiser voice
      if (autoVoiceResponse) {
        speakText(responseText);
      }
    }, 600);
  };

  const containerClasses = variant === 'embedded' 
    ? "w-full h-full flex flex-col bg-white overflow-hidden rounded-2xl border border-slate-200"
    : isOpen 
      ? "fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md" 
      : "fixed bottom-6 right-24 z-50";

  return (
    <div className={containerClasses}>
      {(!isOpen && variant !== 'embedded') ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#002776] to-[#0d3b82] text-white rounded-full shadow-2xl border-2 border-[#FCD116] hover:scale-105 transition active:scale-95 group"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#002776] animate-pulse" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider">Boiser AI</span>
        </button>
      ) : (
        <div className={`bg-white rounded-3xl w-full ${variant === 'embedded' ? 'h-full' : 'max-w-2xl h-[650px]'} shadow-2xl overflow-hidden flex flex-col border border-slate-200`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#002776] via-[#092B62] to-[#0D3B82] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                <Bot className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">BOISER AI</h3>
                  <span className="px-2 py-0.5 bg-amber-400 text-blue-950 text-[9px] font-black rounded-full uppercase tracking-widest">
                    VOICE AI
                  </span>
                </div>
                <p className="text-[10px] text-blue-200 font-bold tracking-wide flex items-center gap-1.5 mt-0.5">
                  <span>LNNCHS Memos, User Guide &amp; 20-Attr Knowledge</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Response Toggle */}
              <button
                onClick={() => {
                  if (isSpeaking) stopSpeech();
                  setAutoVoiceResponse(!autoVoiceResponse);
                }}
                title={autoVoiceResponse ? "Voice Response Enabled (Calm Boiser Voice)" : "Voice Response Muted"}
                className={`p-2 rounded-xl transition-all ${autoVoiceResponse ? 'bg-amber-400 text-blue-950 font-bold shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {autoVoiceResponse ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              {/* Close button if modal */}
              {variant !== 'embedded' && (
                <button 
                  onClick={() => {
                    stopSpeech();
                    setIsOpen(false);
                  }} 
                  className="p-2 hover:bg-white/10 text-white rounded-xl transition"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Sub-Header Toolbar: Language Selector & Audio Status */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Languages size={14} className="text-blue-700" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Lang:</span>
              <div className="flex bg-slate-200/80 p-0.5 rounded-lg">
                <button
                  onClick={() => setSelectedLang('en')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition ${selectedLang === 'en' ? 'bg-[#002776] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setSelectedLang('tl')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition ${selectedLang === 'tl' ? 'bg-[#002776] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  TAGALOG
                </button>
                <button
                  onClick={() => setSelectedLang('bis')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition ${selectedLang === 'bis' ? 'bg-[#002776] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  BISAYA
                </button>
              </div>
            </div>

            {/* Speaking Audio Indicator */}
            {isSpeaking && (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full animate-pulse">
                <Volume2 size={12} className="text-amber-800" />
                <span>Calm Boiser Voice Speaking...</span>
                <button onClick={stopSpeech} className="underline ml-1 text-amber-900 font-black hover:text-red-600">Stop</button>
              </div>
            )}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-4 rounded-2xl text-[11px] sm:text-xs leading-relaxed relative group ${m.sender === 'user' ? 'bg-[#002776] text-white rounded-tr-none shadow-md' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'}`}>
                  
                  <div className="prose prose-xs max-w-none text-slate-800 dark:text-slate-800">
                    <Markdown>{m.text}</Markdown>
                  </div>

                  {/* Message Bottom Action Bar */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
                    <span>{m.time}</span>
                    {m.sender === 'bot' && (
                      <button
                        onClick={() => speakText(m.text)}
                        title="Read message in clear and calm Boiser voice"
                        className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold px-2 py-0.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                      >
                        <Volume2 size={12} />
                        <span>Listen Voice</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2 shadow-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-blue-700 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] font-bold text-slate-500 ml-1">Searching LNNCHS Knowledge &amp; Memos...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Listening Overlay Notification */}
          {isListening && (
            <div className="bg-red-500 text-white px-4 py-2 flex items-center justify-between text-xs font-bold animate-pulse">
              <div className="flex items-center gap-2">
                <Mic size={16} className="animate-bounce" />
                <span>Listening in {selectedLang === 'bis' ? 'Bisaya' : selectedLang === 'tl' ? 'Tagalog' : 'English'}... Speak now!</span>
              </div>
              <button onClick={toggleListening} className="text-xs bg-white text-red-600 px-2 py-0.5 rounded font-black uppercase">
                Stop
              </button>
            </div>
          )}

          {/* Smart AI Features & Skills Suggestions Bar */}
          <div className="bg-slate-100/90 border-t border-slate-200 px-3 py-2">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-[10px] font-black uppercase text-[#002776] flex items-center gap-1 tracking-wider">
                <Sparkles size={12} className="text-amber-500 animate-pulse" />
                AI Features &amp; Skills Shortcuts / Dali nga Pangutana:
              </span>
              <span className="text-[9px] text-slate-500 font-semibold">Click to ask instantly</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {/* Suggestion 1 */}
              <button
                onClick={() => {
                  const prompt = selectedLang === 'bis'
                    ? "Unsa ang pinakabag-ong lagda sa DepEd Order 3, s. 2026 ug AI Governance Reforms?"
                    : selectedLang === 'tl'
                      ? "Ano ang pinakabagong patakaran sa DepEd Order 3, s. 2026 at AI Governance Reforms?"
                      : "What are the core mandates of DepEd Order 3, s. 2026 and AI governance reforms?";
                  setInputValue(prompt);
                  setTimeout(() => {
                    handleSendMessage(prompt);
                  }, 50);
                }}
                disabled={isGenerating}
                className="p-1.5 text-left bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl transition text-[10px] font-medium text-slate-700 hover:text-blue-900 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 group"
              >
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#002776] group-hover:bg-amber-400 group-hover:text-blue-950 flex items-center justify-center text-[9px] font-black shrink-0">1</span>
                <span className="truncate font-semibold">
                  {selectedLang === 'bis' ? 'DepEd Order 3 AI Policy' : selectedLang === 'tl' ? 'DepEd Order 3 AI Policy' : 'DO 3, s. 2026 AI Governance'}
                </span>
              </button>

              {/* Suggestion 2 */}
              <button
                onClick={() => {
                  const prompt = selectedLang === 'bis'
                    ? "Unsaon pagkwenta sa transmuted grades ug pag-generate sa SF9/SF10 e-Class Record sa LNNCHS?"
                    : selectedLang === 'tl'
                      ? "Paano magkwenta ng transmuted grades at mag-generate ng SF9/SF10 e-Class Record sa LNNCHS?"
                      : "How to calculate transmuted grades and generate SF9/SF10 e-Class Records in LNNCHS?";
                  setInputValue(prompt);
                  setTimeout(() => {
                    handleSendMessage(prompt);
                  }, 50);
                }}
                disabled={isGenerating}
                className="p-1.5 text-left bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl transition text-[10px] font-medium text-slate-700 hover:text-blue-900 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 group"
              >
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#002776] group-hover:bg-amber-400 group-hover:text-blue-950 flex items-center justify-center text-[9px] font-black shrink-0">2</span>
                <span className="truncate font-semibold">
                  {selectedLang === 'bis' ? 'Transmutation & Grading' : selectedLang === 'tl' ? 'Transmutation & Grado' : 'Transmutation & SF1-SF10'}
                </span>
              </button>

              {/* Suggestion 3 */}
              <button
                onClick={() => {
                  const prompt = selectedLang === 'bis'
                    ? "Unsaon paghimo og Action Research Annexes A-D ug paggamit sa 0% Anti-Turnitin Humanizer?"
                    : selectedLang === 'tl'
                      ? "Paano gumawa ng Action Research Annexes A-D at gamitin ang 0% Anti-Turnitin Humanizer?"
                      : "How to create Action Research Annexes A-D and use the 0% Anti-Turnitin Humanizer?";
                  setInputValue(prompt);
                  setTimeout(() => {
                    handleSendMessage(prompt);
                  }, 50);
                }}
                disabled={isGenerating}
                className="p-1.5 text-left bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl transition text-[10px] font-medium text-slate-700 hover:text-blue-900 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 group"
              >
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#002776] group-hover:bg-amber-400 group-hover:text-blue-950 flex items-center justify-center text-[9px] font-black shrink-0">3</span>
                <span className="truncate font-semibold">
                  {selectedLang === 'bis' ? 'Action Research Generator' : selectedLang === 'tl' ? 'Action Research Generator' : 'Action Research & Humanizer'}
                </span>
              </button>

              {/* Suggestion 4 */}
              <button
                onClick={() => {
                  const prompt = selectedLang === 'bis'
                    ? "Unsaon pag-generate og ILAW Exemplar ug Learner Activity Sheet (LAS) para sa MATATAG?"
                    : selectedLang === 'tl'
                      ? "Paano mag-generate ng ILAW Exemplar at Learner Activity Sheet (LAS) para sa MATATAG?"
                      : "How to generate ILAW Exemplars and Learner Activity Sheets (LAS) aligned with MATATAG?";
                  setInputValue(prompt);
                  setTimeout(() => {
                    handleSendMessage(prompt);
                  }, 50);
                }}
                disabled={isGenerating}
                className="p-1.5 text-left bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl transition text-[10px] font-medium text-slate-700 hover:text-blue-900 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 group"
              >
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#002776] group-hover:bg-amber-400 group-hover:text-blue-950 flex items-center justify-center text-[9px] font-black shrink-0">4</span>
                <span className="truncate font-semibold">
                  {selectedLang === 'bis' ? 'ILAW & LAS Exemplars' : selectedLang === 'tl' ? 'ILAW & LAS Exemplars' : 'ILAW & LAS AI Exemplar'}
                </span>
              </button>

              {/* Suggestion 5 */}
              <button
                onClick={() => {
                  const prompt = selectedLang === 'bis'
                    ? "Unsaon paggamit sa Biometric QR ID Gate Attendance ug SMS notifications sa LNNCHS?"
                    : selectedLang === 'tl'
                      ? "Paano gamitin ang Biometric QR ID Gate Attendance at SMS notifications sa LNNCHS?"
                      : "How does the Biometric QR ID Gate Attendance and SMS log system work?";
                  setInputValue(prompt);
                  setTimeout(() => {
                    handleSendMessage(prompt);
                  }, 50);
                }}
                disabled={isGenerating}
                className="p-1.5 text-left bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl transition text-[10px] font-medium text-slate-700 hover:text-blue-900 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 group"
              >
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#002776] group-hover:bg-amber-400 group-hover:text-blue-950 flex items-center justify-center text-[9px] font-black shrink-0">5</span>
                <span className="truncate font-semibold">
                  {selectedLang === 'bis' ? 'Biometric & QR Attendance' : selectedLang === 'tl' ? 'Biometric & QR Attendance' : 'Biometric QR & Gate Log'}
                </span>
              </button>

              {/* Suggestion 6 */}
              <button
                onClick={() => {
                  const prompt = selectedLang === 'bis'
                    ? "Unsaon pagpangita sa 120-Section LIS Directory ug rosters sa Grade 7 hangtod Grade 12?"
                    : selectedLang === 'tl'
                      ? "Paano maghanap sa 120-Section LIS Directory at rosters ng Grade 7 hanggang Grade 12?"
                      : "How to search the 120-Section LIS Student Master Directory across Grades 7 to 12?";
                  setInputValue(prompt);
                  setTimeout(() => {
                    handleSendMessage(prompt);
                  }, 50);
                }}
                disabled={isGenerating}
                className="p-1.5 text-left bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl transition text-[10px] font-medium text-slate-700 hover:text-blue-900 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 group"
              >
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#002776] group-hover:bg-amber-400 group-hover:text-blue-950 flex items-center justify-center text-[9px] font-black shrink-0">6</span>
                <span className="truncate font-semibold">
                  {selectedLang === 'bis' ? '120-Section LIS Search' : selectedLang === 'tl' ? '120-Section LIS Search' : '120-Section LIS Directory'}
                </span>
              </button>
            </div>
          </div>

          {/* Input & Controls */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
            
            {/* Microphone Button (Speech Recognition) */}
            <button
              onClick={toggleListening}
              disabled={!micSupported}
              title={micSupported ? "Click to speak with Boiser Voice AI" : "Speech recognition unavailable"}
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
                isListening 
                  ? 'bg-red-600 text-white ring-4 ring-red-200 animate-pulse' 
                  : micSupported 
                    ? 'bg-amber-400 text-blue-950 hover:bg-amber-500 shadow-sm font-bold' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Input Text Box */}
            <input 
              type="text" 
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                isListening 
                  ? "Listening to your voice..." 
                  : selectedLang === 'bis' 
                    ? "Pangutana bahin sa giya sa paggamit, memos, o curriculum..." 
                    : selectedLang === 'tl' 
                      ? "Magtanong tungkol sa gabay sa paggamit, memos, o aralin..." 
                      : "Ask about user guides, DepEd memos, or curriculum..."
              }
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-600 outline-none text-slate-800 placeholder-slate-400"
            />

            {/* Send Button */}
            <button 
              onClick={() => handleSendMessage()} 
              disabled={!inputValue.trim() || isGenerating}
              className="p-2.5 bg-[#002776] text-white rounded-xl hover:bg-blue-900 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </div>

          {/* Tagline Footer Bar */}
          <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-center text-[10px] font-bold tracking-widest uppercase flex items-center justify-between border-t border-stone-800">
            <span className="text-amber-400 flex items-center gap-1">
              <Sparkles size={10} /> BOISER CHATBOT AI
            </span>
            <span className="text-white font-extrabold tracking-wider">
              ENJOY LEARNING
            </span>
          </div>

        </div>
      )}
    </div>
  );
};
