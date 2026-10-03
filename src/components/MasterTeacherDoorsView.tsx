import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  FileText,
  Users,
  Sparkles,
  ShieldCheck,
  Download,
  Printer,
  ChevronRight,
  Eye,
  FileSpreadsheet,
  AlertCircle,
  Building,
  GraduationCap,
  Lightbulb,
  BarChart3,
  Calendar,
  Lock,
  Unlock,
  Key,
  KeyRound,
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
  Edit3,
  Save,
  RotateCcw,
  Table,
  UserCheck,
  ShieldAlert,
  UserPlus
} from 'lucide-react';
import { logSecurityBreach } from '../services/securityAlertService';
import { ILAWGenerator } from './ILAWGenerator';
import { ChalkScoringSheetToolkit } from './ChalkScoringSheetToolkit';
import { ImproveMyDocumentSuite } from './ImproveMyDocumentSuite';
import { SummativeHub } from './SummativeHub';
import { ActionResearchAnnexModule } from './ActionResearchAnnexModule';
import { TurnitinDetectorModule } from './TurnitinDetectorModule';
import { SingleSFInspector } from './SingleSFInspector';
import { PosterMaker } from './PosterMaker';
import { useAuth } from '../context/AuthContext';

export interface MasterTeacherDoorDef {
  id: string;
  code: string;
  name: string;
  department: string;
  gradeBand: 'JHS' | 'SHS';
  role: string;
  description: string;
  colorScheme: string;
  badge: string;
  mentorName: string;
  focusArea: string;
  advisoryStatus: 'With Advisory' | 'Without Advisory' | 'Subject Teacher';
  advisorySection?: string;
  isLocked?: boolean;
  lockPin?: string;
  lockedBy?: string;
}

const DEFAULT_MASTER_TEACHER_DOORS: MasterTeacherDoorDef[] = [
  // === EXACTLY 1 EXCLUSIVE SHS MASTER TEACHER DOOR ===
  {
    id: 'mt-shs-stephen',
    code: 'MT-SHS-01',
    name: 'Master Teacher SHS — Sir Stephen Tabal',
    department: 'Senior High School Command Center',
    gradeBand: 'SHS',
    role: 'Master Teacher (Exclusive SHS)',
    description: 'Exclusive Senior High School Master Teacher Door for Sir Stephen Tabal. 6-Command ILAW Lesson Plan Generator, BERF Action Research, COT-RPMS Coaching, and Chalk Mobile Sync.',
    colorScheme: 'from-[#092B62] via-[#0038A8] to-[#04122b]',
    badge: '👑 EXCLUSIVE SHS MASTER TEACHER',
    mentorName: 'Sir Stephen Tabal, MT',
    focusArea: 'Senior High School Instructional Leadership & Academic Supervision',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  },

  // === 8 MASTER TEACHER I DOORS (Names fully editable, some with advisory) ===
  {
    id: 'mt-jhs-1',
    code: 'MT-I-01',
    name: 'Master Teacher I - Door 1',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher I',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-emerald-950 via-teal-900 to-slate-950',
    badge: 'Master Teacher I',
    mentorName: 'Master Teacher I (Editable Name #1)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'With Advisory',
    advisorySection: 'Grade 10 - Einstein'
  },
  {
    id: 'mt-jhs-2',
    code: 'MT-I-02',
    name: 'Master Teacher I - Door 2',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher I',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-blue-950 via-indigo-900 to-slate-950',
    badge: 'Master Teacher I',
    mentorName: 'Master Teacher I (Editable Name #2)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  },
  {
    id: 'mt-jhs-3',
    code: 'MT-I-03',
    name: 'Master Teacher I - Door 3',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher I',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-violet-950 via-purple-900 to-slate-950',
    badge: 'Master Teacher I',
    mentorName: 'Master Teacher I (Editable Name #3)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'With Advisory',
    advisorySection: 'Grade 9 - Newton'
  },
  {
    id: 'mt-jhs-4',
    code: 'MT-I-04',
    name: 'Master Teacher I - Door 4',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher I',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-amber-950 via-yellow-900 to-slate-950',
    badge: 'Master Teacher I',
    mentorName: 'Master Teacher I (Editable Name #4)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  },
  {
    id: 'mt-jhs-5',
    code: 'MT-I-05',
    name: 'Master Teacher I - Door 5',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher I',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-red-950 via-rose-900 to-slate-950',
    badge: 'Master Teacher I',
    mentorName: 'Master Teacher I (Editable Name #5)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'With Advisory',
    advisorySection: 'Grade 8 - Archimedes'
  },
  {
    id: 'mt-jhs-6',
    code: 'MT-I-06',
    name: 'Master Teacher I - Door 6',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher I',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-cyan-950 via-teal-900 to-slate-950',
    badge: 'Master Teacher I',
    mentorName: 'Master Teacher I (Editable Name #6)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  },
  {
    id: 'mt-jhs-7',
    code: 'MT-I-07',
    name: 'Master Teacher I - Door 7',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher I',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-orange-950 via-amber-900 to-slate-950',
    badge: 'Master Teacher I',
    mentorName: 'Master Teacher I (Editable Name #7)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  },
  {
    id: 'mt-jhs-8',
    code: 'MT-I-08',
    name: 'Master Teacher I - Door 8',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher I',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-pink-950 via-rose-900 to-slate-950',
    badge: 'Master Teacher I',
    mentorName: 'Master Teacher I (Editable Name #8)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'With Advisory',
    advisorySection: 'Grade 7 - Diamond'
  },

  // === 7 MASTER TEACHER II DOORS (Names fully editable, Door 7 is OSHP Coordinator) ===
  {
    id: 'mt-jhs-9',
    code: 'MT-II-01',
    name: 'Master Teacher II - Door 1',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher II',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-emerald-950 via-green-900 to-slate-950',
    badge: 'Master Teacher II',
    mentorName: 'Master Teacher II (Editable Name #1)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'With Advisory',
    advisorySection: 'Grade 10 - Curie'
  },
  {
    id: 'mt-jhs-10',
    code: 'MT-II-02',
    name: 'Master Teacher II - Door 2',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher II',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-blue-950 via-sky-900 to-slate-950',
    badge: 'Master Teacher II',
    mentorName: 'Master Teacher II (Editable Name #2)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  },
  {
    id: 'mt-jhs-11',
    code: 'MT-II-03',
    name: 'Master Teacher II - Door 3',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher II',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-indigo-950 via-blue-900 to-slate-950',
    badge: 'Master Teacher II',
    mentorName: 'Master Teacher II (Editable Name #3)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'With Advisory',
    advisorySection: 'Grade 9 - Galileo'
  },
  {
    id: 'mt-jhs-12',
    code: 'MT-II-04',
    name: 'Master Teacher II - Door 4',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher II',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-purple-950 via-violet-900 to-slate-950',
    badge: 'Master Teacher II',
    mentorName: 'Master Teacher II (Editable Name #4)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  },
  {
    id: 'mt-jhs-13',
    code: 'MT-II-05',
    name: 'Master Teacher II - Door 5',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher II',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-amber-950 via-yellow-950 to-slate-950',
    badge: 'Master Teacher II',
    mentorName: 'Master Teacher II (Editable Name #5)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  },
  {
    id: 'mt-jhs-14',
    code: 'MT-II-06',
    name: 'Master Teacher II - Door 6',
    department: 'Junior High School Department',
    gradeBand: 'JHS',
    role: 'Master Teacher II',
    description: 'Instructional supervision, 6-Command ILAW lesson plan generation, and teacher coaching.',
    colorScheme: 'from-teal-950 via-cyan-900 to-slate-950',
    badge: 'Master Teacher II',
    mentorName: 'Master Teacher II (Editable Name #6)',
    focusArea: 'Curriculum & Pedagogy',
    advisoryStatus: 'With Advisory',
    advisorySection: 'Grade 8 - Pascal'
  },
  {
    id: 'mt-jhs-15',
    code: 'MT-II-07',
    name: 'Master Teacher II - Door 7 (OSHP Coordinator)',
    department: 'Junior High School & OSHP Operations',
    gradeBand: 'JHS',
    role: 'Master Teacher II / OSHP Coordinator',
    description: 'OSHP (Off-Site School Program) coordination, instructional supervision, and mobile learner score synchronization.',
    colorScheme: 'from-slate-900 via-stone-900 to-black',
    badge: 'Master Teacher II',
    mentorName: 'OSHP Coordinator Name (Editable)',
    focusArea: 'OSHP Operations & Learner Tracking',
    advisoryStatus: 'Without Advisory',
    advisorySection: ''
  }
];

export const MasterTeacherDoorsView: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [selectedDoorId, setSelectedDoorId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'JHS' | 'SHS'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeInternalTab, setActiveInternalTab] = useState<
    'ilaw_6command' | 'chalk_scoring' | 'doc_intelligence' | 'cot_rpms' | 'berf_research' | 'lac_supervision' | '3d_visuals'
  >('ilaw_6command');

  // Doors State with persistent localStorage
  const [doors, setDoors] = useState<MasterTeacherDoorDef[]>(() => {
    try {
      const saved = localStorage.getItem('lnnchs_mt_doors_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved MT doors:', e);
    }
    return DEFAULT_MASTER_TEACHER_DOORS;
  });

  // MASTER CREATOR & ADVISER IDENTITY ENGINE
  const isMasterCreator = 
    currentUser?.email === 'boisersteavenkinth@gmail.com' ||
    currentUser?.email === 'boisersteavenkinth@deped.gov.ph' ||
    (currentUser?.role as any) === 'master_creator' ||
    (currentUser?.role as any) === 'owner' ||
    currentUser?.name?.toLowerCase().includes('steaven kinth');

  // Check if current user is the verified adviser / mentor of this door
  const isDoorAdviser = (door: MasterTeacherDoorDef) => {
    if (isMasterCreator) return true;
    const mentorName = (door.mentorName || '').toLowerCase().trim();
    const curName = (currentUser?.name || myTeacherName || '').toLowerCase().trim();
    const isNameMatch = mentorName && curName && (mentorName.includes(curName) || curName.includes(mentorName));
    return isNameMatch || isAuthorized;
  };

  // TEACHER ROLE PROTECTION STATE
  // Rule: Master Teachers (with or without advisory) AND Subject Teachers can take doors and configure assignments
  const [teacherRole, setTeacherRole] = useState<'mt_with_advisory' | 'mt_without_advisory' | 'subject_teacher' | 'general_user'>(() => {
    const saved = localStorage.getItem('lnnchs_mt_door_role');
    return (saved as any) || 'mt_with_advisory';
  });

  const [activeView, setActiveView] = useState<'doors' | 'setup_table'>('doors');
  const [myTeacherName, setMyTeacherName] = useState<string>(() => {
    return currentUser?.name || 'Master Teacher';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ==================== DOOR & ADVISER NAME EDITING ENGINE ====================
  const [editingDoorId, setEditingDoorId] = useState<string | null>(null);
  const [editDoorTitle, setEditDoorTitle] = useState<string>('');
  const [editMentorName, setEditMentorName] = useState<string>('');
  const [editAdvisorySection, setEditAdvisorySection] = useState<string>('');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [inlineName, setInlineName] = useState<string>('');

  const handleStartEditDoor = (door: MasterTeacherDoorDef) => {
    if (!isMasterCreator && !isDoorAdviser(door)) {
      alert(`🔒 ACCESS DENIED: Only the assigned Resident Adviser / Master Teacher (${door.mentorName}) or the Security Management Center (Sir Steaven Kinth D. Boiser) is authorized to edit this door and adviser names.`);
      return;
    }
    if (door.isLocked && !isMasterCreator) {
      alert(`🔒 DOOR & NAMES LOCKED: This door has been locked by the Adviser (${door.mentorName}). Unlock the door first to edit.`);
      return;
    }
    setEditingDoorId(door.id);
    setEditDoorTitle(door.name);
    setEditMentorName(door.mentorName);
    setEditAdvisorySection(door.advisorySection || '');
  };

  const handleSaveEditDoor = (doorId: string) => {
    const target = doors.find(d => d.id === doorId);
    if (!target) return;
    if (!isMasterCreator && !isDoorAdviser(target)) {
      alert('🔒 Access Denied: Unauthorized editor.');
      return;
    }
    const newTitle = editDoorTitle.trim() || target.name;
    const newMentor = editMentorName.trim() || target.mentorName;
    const newAdvisory = editAdvisorySection.trim();

    const next = doors.map(d => {
      if (d.id === doorId) {
        return {
          ...d,
          name: newTitle,
          mentorName: newMentor,
          advisorySection: newAdvisory
        };
      }
      return d;
    });
    setDoors(next);
    localStorage.setItem('lnnchs_mt_doors_data_v2', JSON.stringify(next));
    setEditingDoorId(null);
    showToast(`✅ Door updated: "${newTitle}" (Mentor: ${newMentor})`);
  };

  const handleCancelEditDoor = () => {
    setEditingDoorId(null);
  };

  // ==================== DOOR LOCK & INTRUDER SHIELD ENGINE ====================
  const [lockingDoor, setLockingDoor] = useState<MasterTeacherDoorDef | null>(null);
  const [lockPinInput, setLockPinInput] = useState<string>('1234');

  // Security Gate / Unlock modal for intruders trying to enter a locked door
  const [gateLockedDoor, setGateLockedDoor] = useState<MasterTeacherDoorDef | null>(null);
  const [gatePinInput, setGatePinInput] = useState<string>('');
  const [gateError, setGateError] = useState<string | null>(null);

  const handleToggleLock = (door: MasterTeacherDoorDef) => {
    if (!isMasterCreator && !isDoorAdviser(door)) {
      alert(`🔒 PERMISSION DENIED: Only the assigned Resident Adviser (${door.mentorName}) or the Security Management Center (Sir Steaven Kinth D. Boiser) can lock or unlock this door.`);
      return;
    }

    if (door.isLocked) {
      if (confirm(`Unlock door "${door.name}" and re-enable name editing?`)) {
        const next = doors.map(d => {
          if (d.id === door.id) {
            return {
              ...d,
              isLocked: false,
              lockedBy: undefined
            };
          }
          return d;
        });
        setDoors(next);
        localStorage.setItem('lnnchs_mt_doors_data_v2', JSON.stringify(next));
        showToast(`🔓 Door & names UNLOCKED for ${door.name}.`);
      }
    } else {
      setLockingDoor(door);
      setLockPinInput('1234');
    }
  };

  const handleConfirmLock = () => {
    if (!lockingDoor) return;
    const pin = lockPinInput.trim() || '1234';
    const next = doors.map(d => {
      if (d.id === lockingDoor.id) {
        return {
          ...d,
          isLocked: true,
          lockPin: pin,
          lockedBy: isMasterCreator ? 'Security Management Center (Steaven Kinth D. Boiser)' : lockingDoor.mentorName
        };
      }
      return d;
    });
    setDoors(next);
    localStorage.setItem('lnnchs_mt_doors_data_v2', JSON.stringify(next));
    showToast(`🔒 LOCKED: Door "${lockingDoor.name}" and Names are now LOCKED against intruder edits and entry!`);
    setLockingDoor(null);
  };

  // ==================== DOOR ENTRY INTERCEPTION ENGINE ====================
  const handleOpenDoor = (door: MasterTeacherDoorDef) => {
    // IF NOT LOCKED -> open directly
    if (!door.isLocked) {
      setSelectedDoorId(door.id);
      return;
    }

    // IF LOCKED:
    // 1. MASTER OVERRIDE: Security Management Center (Sir Steaven Kinth D. Boiser)
    if (isMasterCreator) {
      showToast(`🛡️ SECURITY MANAGEMENT CENTER (STEAVEN KINTH D. BOISER) MASTER OVERRIDE: Access granted to locked door "${door.name}".`);
      setSelectedDoorId(door.id);
      return;
    }

    // 2. Verified Adviser of this door
    if (isDoorAdviser(door)) {
      setSelectedDoorId(door.id);
      return;
    }

    // 3. Intruders / standard users are intercepted by Security Gate!
    setGateLockedDoor(door);
    setGatePinInput('');
    setGateError(null);
  };

  const handleVerifyGatePin = () => {
    if (!gateLockedDoor) return;
    const requiredPin = gateLockedDoor.lockPin || '1234';
    if (gatePinInput === requiredPin) {
      showToast(`🔓 Passcode Accepted: Entering ${gateLockedDoor.name} Door.`);
      setSelectedDoorId(gateLockedDoor.id);
      setGateLockedDoor(null);
    } else {
      setGateError('❌ INCORRECT SECURITY PIN: Intruder access blocked! Activity logged.');
      logSecurityBreach(
        currentUser?.name || myTeacherName || 'Intruder',
        currentUser?.email || 'guest@intruder.node',
        `Attempted unauthorized entry into locked Master Teacher door "${gateLockedDoor.name}" (Mentor: ${gateLockedDoor.mentorName})`,
        'MASTER_DOOR_BREACH',
        `Entered PIN: ${gatePinInput}`
      );
    }
  };

  const isAuthorized = teacherRole === 'mt_with_advisory' || teacherRole === 'mt_without_advisory' || teacherRole === 'subject_teacher';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRoleChange = (role: 'mt_with_advisory' | 'mt_without_advisory' | 'subject_teacher' | 'general_user') => {
    setTeacherRole(role);
    localStorage.setItem('lnnchs_mt_door_role', role);
    if (role === 'mt_with_advisory') {
      showToast('👑 Role Verified: Master Teacher (With Advisory) — Authorized to take doors and manage advisory sections.');
    } else if (role === 'mt_without_advisory') {
      showToast('👑 Role Verified: Master Teacher (Without Advisory) — Authorized to take doors and edit assignments.');
    } else if (role === 'subject_teacher') {
      showToast('📚 Role Verified: Subject Teacher — Authorized to take doors and edit assignments.');
    } else {
      showToast('🔒 General User / Protected Mode: View-only access active.');
    }
  };

  const handleUpdateDoorField = (id: string, field: keyof MasterTeacherDoorDef, val: any) => {
    const target = doors.find(d => d.id === id);
    if (target?.isLocked && !isMasterCreator) {
      alert(`🔒 DOOR & NAMES LOCKED: This door has been locked by the Adviser (${target.mentorName}). Unlock the door first to edit.`);
      return;
    }
    if (!isAuthorized && !isMasterCreator) {
      alert('🔒 TEACHER ROLE PROTECTION: Only Master Teachers or Subject Teachers are permitted to edit doors.');
      return;
    }
    setDoors(prev => {
      const next = prev.map(d => d.id === id ? { ...d, [field]: val } : d);
      localStorage.setItem('lnnchs_mt_doors_data_v2', JSON.stringify(next));
      return next;
    });
  };

  const handleTakeDoor = (door: MasterTeacherDoorDef) => {
    if (door.isLocked && !isMasterCreator) {
      alert(`🔒 DOOR & NAMES LOCKED: This door has been locked by the Adviser (${door.mentorName}). Intruders cannot take or edit locked doors.`);
      return;
    }
    if (!isAuthorized && !isMasterCreator) {
      alert('🔒 TEACHER ROLE PROTECTION: Only Master Teachers or Subject Teachers can take this door.');
      return;
    }
    const assigned = myTeacherName.trim() || 'Assigned Master Teacher';
    const nextAdvisory = teacherRole === 'mt_with_advisory' ? 'With Advisory' : teacherRole === 'mt_without_advisory' ? 'Without Advisory' : door.advisoryStatus;
    setDoors(prev => {
      const next = prev.map(d => d.id === door.id ? { ...d, mentorName: assigned, advisoryStatus: nextAdvisory } : d);
      localStorage.setItem('lnnchs_mt_doors_data_v2', JSON.stringify(next));
      return next;
    });
    showToast(`✅ You claimed ${door.code} (${door.name}) as "${assigned}" (${nextAdvisory})!`);
  };

  const handleResetDefaults = () => {
    if (!isAuthorized) {
      alert('🔒 TEACHER ROLE PROTECTION: Unauthorized to reset Master Teacher door roster.');
      return;
    }
    if (confirm('Reset all 16 Master Teacher doors to DepEd LNNCHS standard template?')) {
      setDoors(DEFAULT_MASTER_TEACHER_DOORS);
      localStorage.removeItem('lnnchs_mt_doors_data_v2');
      showToast('All 16 Master Teacher doors reset to defaults.');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Door Code', 'Door Title', 'Assigned Teacher Name', 'Designation / Rank', 'Advisory Status', 'Advisory Section', 'Department', 'Specialization Focus'];
    const rows = doors.map(d => [
      `"${d.code}"`,
      `"${d.name}"`,
      `"${d.mentorName}"`,
      `"${d.role}"`,
      `"${d.advisoryStatus}"`,
      `"${d.advisorySection || 'N/A'}"`,
      `"${d.department}"`,
      `"${d.focusArea}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LNNCHS_Master_Teacher_Doors_Directory.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Master Teacher Doors table to CSV.');
  };

  const filteredDoors = doors.filter((door) => {
    const matchesCategory = selectedCategory === 'all' || door.gradeBand === selectedCategory;
    const matchesSearch =
      door.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      door.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      door.focusArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      door.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      door.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeDoor = doors.find((d) => d.id === selectedDoorId);

  return (
    <div className="w-full bg-[#050c1a] text-stone-100 rounded-3xl border-2 border-amber-400/40 shadow-2xl overflow-hidden animate-in fade-in duration-300">
      
      {/* =========================================================================
          TOP BANNER: MASTER TEACHER DOORS (15 JHS DOORS + 1 SHS DOOR)
      ========================================================================== */}
      <div className="p-5 sm:p-7 bg-gradient-to-r from-[#031533] via-[#092b62] to-[#04122b] border-b border-amber-400/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black shadow-xl shrink-0 border-2 border-white/30">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  MASTER TEACHER COMMAND DOORS
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  8 MT-I + 7 MT-II (JHS) + 1 MT (SHS)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-black uppercase">
                  Editable Names &amp; Role Protected
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-1">
                Lanao del Norte National Comprehensive High School (LNNCHS) • DepEd Region X
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto justify-end flex-wrap">
            {/* View Mode Toggle: Grid vs Editable Setup Table */}
            <div className="flex items-center rounded-xl bg-white/10 p-1 border border-white/10">
              <button
                onClick={() => { setActiveView('doors'); setSelectedDoorId(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'doors' && !selectedDoorId
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Doors Grid</span>
              </button>
              <button
                onClick={() => { setActiveView('setup_table'); setSelectedDoorId(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'setup_table'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Editable Table Setup</span>
              </button>
            </div>

            {selectedDoorId && (
              <button
                onClick={() => setSelectedDoorId(null)}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All 16 MT Doors</span>
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition cursor-pointer"
                title="Close Master Teacher Doors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>

        {/* =========================================================================
            TEACHER ROLE PROTECTION CONTROL BAR
        ========================================================================== */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#030e24] border border-cyan-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isAuthorized ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30' : 'bg-red-500/20 text-red-400 border border-red-400/30'}`}>
              {isAuthorized ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black uppercase tracking-wider text-amber-300">
                  TEACHER ROLE PROTECTION
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  isAuthorized ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {isAuthorized ? 'Authorized Access' : 'Read-Only Mode'}
                </span>
              </div>
              <p className="text-[11px] text-blue-200 mt-0.5">
                <strong>Governance Rule:</strong> Master Teachers (<strong>With or Without Advisory</strong>) and <strong>Subject Teachers</strong> are authorized to take doors, configure advisories, and manage the assignment roster.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
            <span className="text-[11px] text-slate-300 font-medium">Verify Role:</span>
            
            <button
              onClick={() => handleRoleChange('mt_with_advisory')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center gap-1.5 ${
                teacherRole === 'mt_with_advisory'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow font-black'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span>👑 MT (With Advisory)</span>
            </button>

            <button
              onClick={() => handleRoleChange('mt_without_advisory')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center gap-1.5 ${
                teacherRole === 'mt_without_advisory'
                  ? 'bg-amber-500/30 text-amber-300 border-amber-400/50 shadow font-black'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span>👑 MT (No Advisory)</span>
            </button>

            <button
              onClick={() => handleRoleChange('subject_teacher')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center gap-1.5 ${
                teacherRole === 'subject_teacher'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow font-black'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span>📚 Subject Teacher</span>
            </button>

            <button
              onClick={() => handleRoleChange('general_user')}
              className={`px-2.5 py-1.5 rounded-xl text-xs transition cursor-pointer border flex items-center gap-1 ${
                teacherRole === 'general_user'
                  ? 'bg-slate-700 text-slate-200 border-slate-600'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
              title="Lock as guest/learner"
            >
              <Lock className="w-3 h-3" />
              <span>Guest / Protected</span>
            </button>
          </div>

        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center justify-between animate-in fade-in">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)}><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

      </div>

      {/* =========================================================================
          VIEW 1: SELECTED MASTER TEACHER DOOR WORKSPACE
      ========================================================================== */}
      {activeDoor ? (
        <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-200">
          
          {/* Active Door Header Info */}
          <div className={`p-6 rounded-3xl bg-gradient-to-r ${activeDoor.colorScheme} border-2 border-amber-400/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left`}>
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  {activeDoor.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono font-bold">
                  {activeDoor.code}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${activeDoor.advisoryStatus === 'With Advisory' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  {activeDoor.advisoryStatus} {activeDoor.advisoryStatus === 'With Advisory' && activeDoor.advisorySection ? `• ${activeDoor.advisorySection}` : ''}
                </span>
              </div>

              {isAuthorized && !activeDoor.isLocked ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeDoor.name}
                    onChange={(e) => handleUpdateDoorField(activeDoor.id, 'name', e.target.value)}
                    className="px-3 py-1 rounded-xl bg-black/60 border border-amber-400 text-white font-black text-xl sm:text-2xl focus:outline-none focus:ring-1 focus:ring-amber-300 w-full max-w-lg"
                    placeholder="Enter Master Door Title..."
                  />
                  <span className="text-[10px] text-amber-300 font-mono">✏️ Editable Door Name</span>
                </div>
              ) : (
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  {activeDoor.isLocked && <Lock className="w-5 h-5 text-red-400 inline shrink-0" />}
                  <span>{activeDoor.name}</span>
                  {activeDoor.isLocked && (
                    <span className="px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 text-[10px] font-mono">LOCKED</span>
                  )}
                </h2>
              )}

              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-xs text-blue-200">Assigned Mentor:</span>
                {isAuthorized ? (
                  <input
                    type="text"
                    value={activeDoor.mentorName}
                    onChange={(e) => handleUpdateDoorField(activeDoor.id, 'mentorName', e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-black/60 border border-amber-400/60 text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-300"
                    placeholder="Type Master Teacher Name..."
                  />
                ) : (
                  <strong className="text-amber-300 text-xs">{activeDoor.mentorName}</strong>
                )}
                
                <span className="text-xs text-blue-200 ml-2">Advisory:</span>
                {isAuthorized ? (
                  <div className="flex items-center gap-1.5">
                    <select
                      value={activeDoor.advisoryStatus}
                      onChange={(e) => handleUpdateDoorField(activeDoor.id, 'advisoryStatus', e.target.value as any)}
                      className="px-2 py-1 rounded-lg bg-black/60 border border-cyan-400/60 text-cyan-200 font-bold text-xs focus:outline-none"
                    >
                      <option value="With Advisory">With Advisory</option>
                      <option value="Without Advisory">Without Advisory</option>
                      <option value="Subject Teacher">Subject Teacher</option>
                    </select>
                    {activeDoor.advisoryStatus === 'With Advisory' && (
                      <input
                        type="text"
                        value={activeDoor.advisorySection || ''}
                        onChange={(e) => handleUpdateDoorField(activeDoor.id, 'advisorySection', e.target.value)}
                        placeholder="Section (e.g. 10 - Einstein)"
                        className="px-2 py-1 rounded-lg bg-black/60 border border-amber-400/60 text-amber-300 font-bold text-xs w-36 focus:outline-none"
                      />
                    )}
                  </div>
                ) : (
                  <span className="text-cyan-300 text-xs font-bold">
                    {activeDoor.advisoryStatus} {activeDoor.advisorySection ? `(${activeDoor.advisorySection})` : ''}
                  </span>
                )}

                <span className="text-xs text-blue-300">• {activeDoor.department}</span>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <div>
                <span className="text-[10px] text-slate-300 uppercase block font-mono">Specialized Focus</span>
                <span className="text-xs font-bold text-amber-300 max-w-xs block">{activeDoor.focusArea}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-end">
                {/* Lock Status Pill */}
                {activeDoor.isLocked ? (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/30 border border-red-500 text-red-300 text-[10px] font-black uppercase">
                    <Lock className="w-3.5 h-3.5 text-red-400" />
                    <span>LOCKED BY ADVISER</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 border border-emerald-500 text-emerald-400 text-[10px] font-black uppercase">
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>UNLOCKED</span>
                  </div>
                )}

                {/* Adviser Lock Toggle Button */}
                {(isDoorAdviser(activeDoor) || isMasterCreator) && (
                  <button
                    onClick={() => handleToggleLock(activeDoor)}
                    className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer shadow border ${
                      activeDoor.isLocked
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-300'
                        : 'bg-red-600 hover:bg-red-500 text-white border-red-500'
                    }`}
                    title={activeDoor.isLocked ? "Unlock Door and enable editing" : "Lock Door and Names against Intruders"}
                  >
                    {activeDoor.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{activeDoor.isLocked ? 'Unlock Door' : 'Lock Door'}</span>
                  </button>
                )}

                {isAuthorized && !activeDoor.isLocked && (
                  <button
                    onClick={() => handleTakeDoor(activeDoor)}
                    className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Take Door</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Master Teacher Navigation Subtabs */}
          <div className="bg-[#020917] p-2 rounded-2xl border border-cyan-400/20 overflow-x-auto">
            <div className="flex items-center gap-1.5 min-w-max">
              {[
                { id: 'ilaw_6command', label: '📝 6-Command ILAW Generator', icon: '⚡' },
                { id: 'chalk_scoring', label: '📊 Chalk Scoring (Mobile Sync)', icon: '📱' },
                { id: 'doc_intelligence', label: '✨ Document Intelligence & Audit', icon: '🔍' },
                { id: 'cot_rpms', label: '📋 COT-RPMS Observation Hub', icon: '🏆' },
                { id: 'berf_research', label: '🔬 BERF Action Research (DO 16)', icon: '📚' },
                { id: 'lac_supervision', label: '👥 LAC Session & Inset Studio', icon: '🎓' },
                { id: '3d_visuals', label: '🎨 3D Visual Poster Engine', icon: '🎨' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInternalTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                    activeInternalTab === tab.id
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg border border-amber-300'
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
            
            {/* 1. 6-COMMAND ILAW LESSON PLAN GENERATOR */}
            {activeInternalTab === 'ilaw_6command' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#092B62] to-[#04122b] border border-cyan-400/30 text-xs text-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span>
                      <strong>6-Command ILAW Generator:</strong> DepEd DO 009, s. 2026 and DO 3, s. 2026 constructivist exemplars for {activeDoor.name}.
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    Official 6-Command Active
                  </span>
                </div>
                <ILAWGenerator />
              </div>
            )}

            {/* 2. CHALK SCORING & STUDENT CELLPHONE SYNC */}
            {activeInternalTab === 'chalk_scoring' && (
              <ChalkScoringSheetToolkit sectionName={activeDoor.name} />
            )}

            {/* 3. DOCUMENT INTELLIGENCE & AUDIT */}
            {activeInternalTab === 'doc_intelligence' && (
              <ImproveMyDocumentSuite
                initialDocTitle={`${activeDoor.department} — Instructional Standards Document`}
                initialCategory="general"
              />
            )}

            {/* 4. COT-RPMS CLASSROOM OBSERVATION TOOL */}
            {activeInternalTab === 'cot_rpms' && (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      <span>Classroom Observation Tool (COT-RPMS) Observer Rating Sheet</span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Standardized Philippine Professional Standards for Teachers (PPST) Indicators 1 to 9.
                    </p>
                  </div>
                  <button
                    onClick={() => alert('COT Rating Sheet exported as printable DepEd PDF!')}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Export COT Form
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {[
                    { id: 1, title: 'Content Knowledge & Pedagogy', desc: 'Applies knowledge of content within and across curriculum teaching areas.' },
                    { id: 2, title: 'Learning Environment', desc: 'Establishes safe and secure learning environments to enhance learning.' },
                    { id: 3, title: 'Diversity of Learners', desc: 'Designs, adapts and implements teaching strategies responsive to learners with varied needs.' },
                    { id: 4, title: 'Curriculum & Planning', desc: 'Develops and applies effective teaching strategies to promote critical and creative thinking (HOTS).' },
                    { id: 5, title: 'Assessment & Reporting', desc: 'Designs, selects, organizes and uses diagnostic, formative and summative assessment strategies.' },
                    { id: 6, title: 'ICT & 3D Spatial Integration', desc: 'Employs creative multimedia and interactive spatial learning modalities.' }
                  ].map((ind) => (
                    <div key={ind.id} className="p-4 rounded-2xl bg-black/40 border border-slate-700 space-y-2">
                      <span className="text-[10px] font-mono text-amber-300 font-bold uppercase">Indicator #{ind.id}</span>
                      <h4 className="font-bold text-white text-xs">{ind.title}</h4>
                      <p className="text-[11px] text-slate-300">{ind.desc}</p>
                      <div className="flex items-center gap-1 pt-2">
                        <span className="text-[10px] text-slate-400">Rating:</span>
                        <select className="bg-slate-900 text-amber-300 text-xs font-bold px-2 py-1 rounded border border-slate-700">
                          <option>7 - Exemplary</option>
                          <option>6 - Very Satisfactory</option>
                          <option>5 - Satisfactory</option>
                          <option>4 - Minimum</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. BERF ACTION RESEARCH */}
            {activeInternalTab === 'berf_research' && (
              <ActionResearchAnnexModule />
            )}

            {/* 6. LAC SUPERVISION */}
            {activeInternalTab === 'lac_supervision' && (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4 text-left">
                <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  <span>School-Based Learning Action Cell (LAC) Session Blueprint</span>
                </h3>
                <div className="p-4 rounded-2xl bg-black/50 border border-slate-700 font-mono text-xs text-blue-200 whitespace-pre-wrap leading-relaxed">
                  {`DEPARTMENTAL LAC SESSION BLUEPRINT:
1. Topic: Enhancing Bloom Taxonomy HOTS Questioning via 6-Command ILAW Lesson Plans
2. Target Participants: All Department Teachers (${activeDoor.department})
3. Assigned Mentor: ${activeDoor.mentorName} (${activeDoor.role})
4. Phase 1: Diagnostic Assessment of Teacher DLP/DLL Formats
5. Phase 2: Hands-on Constructivist 7E Scaffolding Workshop
6. Phase 3: Peer Micro-teaching & COT Simulation`}
                </div>
              </div>
            )}

            {/* 7. 3D VISUALS */}
            {activeInternalTab === '3d_visuals' && (
              <PosterMaker />
            )}

          </div>

        </div>
      ) : activeView === 'setup_table' ? (
        /* =========================================================================
            VIEW 2: EDITABLE MASTER TEACHER DOORS SETUP TABLE (USER REQUESTED)
        ========================================================================== */
        <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-left">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Table className="w-6 h-6 text-amber-400" />
                <span>Master Teacher Doors Setup &amp; Editable Assignment Table</span>
              </h2>
              <p className="text-xs text-blue-200 mt-1">
                Official Roster: 8 Master Teacher I doors, 7 Master Teacher II doors (including OSHP Coordinator), and 1 Exclusive SHS Master Teacher door.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-white/20"
              >
                <Download className="w-4 h-4 text-cyan-300" />
                <span>Export CSV Roster</span>
              </button>
              
              {isAuthorized && (
                <button
                  onClick={handleResetDefaults}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-red-950/40 text-slate-300 hover:text-red-400 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-white/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Defaults</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Teacher Identification Input */}
          <div className="p-4 rounded-2xl bg-black/40 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-300 font-bold whitespace-nowrap">Your Teacher Name:</span>
              <input
                type="text"
                value={myTeacherName}
                onChange={(e) => setMyTeacherName(e.target.value)}
                placeholder="e.g. Sir Stephen Tabal / MT-I"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-400 w-full sm:w-64"
              />
            </div>
            <div className="text-[11px] text-slate-400">
              💡 Click <strong>"Take This Door"</strong> on any row below to instantly assign your name.
            </div>
          </div>

          {/* Responsive Editable Table */}
          <div className="rounded-2xl border border-slate-700 overflow-hidden bg-[#020917]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#091b3e] text-slate-300 uppercase text-[10px] font-mono tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Lock Security</th>
                    <th className="p-3.5">Door Title (Editable)</th>
                    <th className="p-3.5">Assigned Master Teacher Name (Editable)</th>
                    <th className="p-3.5">Rank / Designation</th>
                    <th className="p-3.5">Advisory Status</th>
                    <th className="p-3.5">Department / Focus</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {doors.map((door) => (
                    <tr key={door.id} className="hover:bg-white/5 transition">
                      
                      {/* Code */}
                      <td className="p-3.5 font-mono font-bold text-cyan-300 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${door.gradeBand === 'SHS' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-cyan-500/20 text-cyan-300'}`}>
                          {door.code}
                        </span>
                      </td>

                      {/* Lock Status */}
                      <td className="p-3.5 whitespace-nowrap">
                        {door.isLocked ? (
                          <span className="px-2 py-0.5 rounded bg-red-600/30 border border-red-500 text-red-300 font-black text-[10px] uppercase flex items-center gap-1 w-max">
                            <Lock className="w-3 h-3 text-red-400" />
                            <span>LOCKED</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-600/20 border border-emerald-500 text-emerald-400 font-black text-[10px] uppercase flex items-center gap-1 w-max">
                            <Unlock className="w-3 h-3 text-emerald-400" />
                            <span>UNLOCKED</span>
                          </span>
                        )}
                      </td>

                      {/* Name */}
                      <td className="p-3.5 font-bold text-white whitespace-nowrap">
                        {isAuthorized && !door.isLocked ? (
                          <input
                            type="text"
                            value={door.name}
                            onChange={(e) => handleUpdateDoorField(door.id, 'name', e.target.value)}
                            className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-amber-400 w-full max-w-[200px]"
                          />
                        ) : (
                          <span className="flex items-center gap-1.5 text-slate-200">
                            {door.isLocked && <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                            <span>{door.name}</span>
                          </span>
                        )}
                      </td>

                      {/* Mentor Name (Editable text input) */}
                      <td className="p-3.5">
                        {isAuthorized && !door.isLocked ? (
                          <div className="relative">
                            <input
                              type="text"
                              value={door.mentorName}
                              onChange={(e) => handleUpdateDoorField(door.id, 'mentorName', e.target.value)}
                              className="w-full min-w-[220px] px-3 py-1.5 rounded-lg bg-black/60 border border-amber-400/50 text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-300 focus:bg-slate-900 transition"
                              placeholder="Type Master Teacher Name..."
                            />
                            <Edit3 className="w-3.5 h-3.5 text-amber-400/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        ) : (
                          <span className="font-bold text-amber-300 flex items-center gap-1.5">
                            {door.isLocked && <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                            <span>{door.mentorName}</span>
                          </span>
                        )}
                      </td>

                      {/* Rank / Designation */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          door.badge.includes('SHS')
                            ? 'bg-amber-400 text-slate-950'
                            : door.badge.includes('Master Teacher I')
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-indigo-500/20 text-indigo-300'
                        }`}>
                          {door.badge}
                        </span>
                      </td>

                      {/* Advisory Status */}
                      <td className="p-3.5 whitespace-nowrap">
                        {isAuthorized && !door.isLocked ? (
                          <div className="flex flex-col gap-1.5 min-w-[170px]">
                            <select
                              value={door.advisoryStatus}
                              onChange={(e) => handleUpdateDoorField(door.id, 'advisoryStatus', e.target.value as any)}
                              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs px-2 py-1 rounded focus:outline-none focus:border-cyan-400 font-bold"
                            >
                              <option value="With Advisory">With Advisory</option>
                              <option value="Without Advisory">Without Advisory</option>
                              <option value="Subject Teacher">Subject Teacher</option>
                            </select>
                            {door.advisoryStatus === 'With Advisory' && (
                              <input
                                type="text"
                                value={door.advisorySection || ''}
                                onChange={(e) => handleUpdateDoorField(door.id, 'advisorySection', e.target.value)}
                                placeholder="Section (e.g. 10 - Einstein)"
                                className="px-2 py-1 rounded bg-black/60 border border-amber-400/50 text-amber-300 text-[11px] font-bold focus:outline-none focus:border-amber-300 w-full"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className={`font-bold ${door.advisoryStatus === 'With Advisory' ? 'text-amber-300' : 'text-slate-300'}`}>
                              {door.advisoryStatus}
                            </span>
                            {door.advisoryStatus === 'With Advisory' && door.advisorySection && (
                              <span className="text-[11px] text-cyan-300 font-mono font-bold">({door.advisorySection})</span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Department / Focus */}
                      <td className="p-3.5 text-slate-300">
                        {isAuthorized && !door.isLocked ? (
                          <input
                            type="text"
                            value={door.focusArea}
                            onChange={(e) => handleUpdateDoorField(door.id, 'focusArea', e.target.value)}
                            className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400 w-full min-w-[180px]"
                          />
                        ) : (
                          <span className="truncate max-w-[200px] block">{door.focusArea}</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {isAuthorized && !door.isLocked && (
                            <button
                              onClick={() => handleTakeDoor(door)}
                              className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] uppercase transition cursor-pointer shadow"
                              title="Assign my name to this door"
                            >
                              Take Door
                            </button>
                          )}
                          <button
                            onClick={() => handleToggleLock(door)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase transition border flex items-center gap-1 cursor-pointer ${
                              door.isLocked
                                ? 'bg-amber-400/20 text-amber-300 border-amber-400/60 hover:bg-amber-400/30'
                                : 'bg-red-600/20 text-red-300 border-red-500/60 hover:bg-red-600/30'
                            }`}
                            title={door.isLocked ? "Unlock Door and Names" : "Lock Door and Names against Intruders"}
                          >
                            {door.isLocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                            <span>{door.isLocked ? 'Unlock' : 'Lock'}</span>
                          </button>
                          <button
                            onClick={() => handleOpenDoor(door)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 font-bold text-[11px] transition cursor-pointer flex items-center gap-1"
                            title="Open Master Teacher Workspace"
                          >
                            <span>Open</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* =========================================================================
            VIEW 3: GRID OF ALL 16 MASTER TEACHER DOORS (15 JHS + 1 SHS)
        ========================================================================== */
        <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-200">
          
          {/* Controls: Search and Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                All 16 Master Doors
              </button>
              <button
                onClick={() => setSelectedCategory('SHS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'SHS'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-cyan-300'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                <span>👑 SHS Master Teacher (1 Door)</span>
              </button>
              <button
                onClick={() => setSelectedCategory('JHS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedCategory === 'JHS'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                JHS Master Teachers (8 MT-I + 7 MT-II)
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teacher, rank, or door..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

          </div>

          {/* Grid of Master Teacher Doors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDoors.map((door) => (
              <div
                key={door.id}
                className={`p-5 rounded-3xl border-2 transition-all text-left flex flex-col justify-between gap-4 group hover:scale-[1.02] shadow-xl ${
                  door.isLocked
                    ? 'bg-gradient-to-br from-stone-950 via-[#0d162a] to-slate-950 border-red-500/70 shadow-red-500/10'
                    : door.gradeBand === 'SHS'
                    ? 'bg-gradient-to-br from-[#092B62] via-[#0038A8] to-[#04122b] border-amber-400 shadow-amber-400/20'
                    : 'bg-gradient-to-br from-slate-900 to-[#0c162b] border-slate-700 hover:border-cyan-400'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      door.gradeBand === 'SHS'
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    }`}>
                      {door.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {door.code}
                    </span>
                  </div>

                  {/* Lock & Edit Controls Bar */}
                  <div className="flex items-center justify-between p-1.5 rounded-xl bg-black/50 border border-white/10 text-xs">
                    {door.isLocked ? (
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

                    <div className="flex items-center gap-1">
                      {!door.isLocked && isAuthorized && (
                        <button
                          onClick={() => handleStartEditDoor(door)}
                          className="px-2 py-0.5 rounded-md bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-400/40 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition"
                          title="Edit Door Name and Adviser/Mentor Name"
                        >
                          <Edit3 className="w-2.5 h-2.5" />
                          <span>Edit</span>
                        </button>
                      )}

                      {isAuthorized && (
                        <button
                          onClick={() => handleToggleLock(door)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 cursor-pointer transition ${
                            door.isLocked
                              ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-400/50 font-black'
                              : 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/40'
                          }`}
                          title={door.isLocked ? "Unlock Door & Enable Editing" : "Lock Door & Names against Intruders"}
                        >
                          {door.isLocked ? <Unlock className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                          <span>{door.isLocked ? 'Unlock' : 'Lock'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-sm font-black transition leading-snug flex items-center gap-1.5 ${
                      door.isLocked ? 'text-white' : 'text-white group-hover:text-amber-300'
                    }`}>
                      {door.isLocked && <Lock className="w-4 h-4 text-red-400 shrink-0" />}
                      <span>{door.name}</span>
                    </h3>
                    <p className="text-[11px] text-blue-200 mt-1 line-clamp-2">
                      {door.description}
                    </p>
                  </div>

                  {/* Mentor Info / Inline Name Edit */}
                  <div className={`p-2.5 rounded-xl border space-y-1.5 text-[10px] ${
                    door.isLocked ? 'bg-black/60 border-red-500/30' : 'bg-black/40 border-white/5'
                  }`}>
                    <div className="text-slate-300 flex items-center justify-between gap-1">
                      <span><strong>Mentor:</strong></span>
                      {editingCardId === door.id && !door.isLocked ? (
                        <div className="flex items-center gap-1 w-full pl-2">
                          <input
                            type="text"
                            value={inlineName}
                            onChange={(e) => setInlineName(e.target.value)}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-amber-400 text-amber-300 text-[10px] font-bold w-full"
                            placeholder="Teacher name..."
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              handleUpdateDoorField(door.id, 'mentorName', inlineName.trim() || door.mentorName);
                              setEditingCardId(null);
                            }}
                            className="p-1 rounded bg-amber-400 text-slate-950 font-bold"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 truncate">
                          <span className="text-amber-300 font-bold truncate">{door.mentorName}</span>
                          {isAuthorized && !door.isLocked && (
                            <button
                              onClick={() => {
                                setEditingCardId(door.id);
                                setInlineName(door.mentorName);
                              }}
                              className="text-slate-400 hover:text-amber-300 p-0.5"
                              title="Edit teacher name"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          )}
                          {door.isLocked && (
                            <span className="text-[9px] text-red-400 font-mono font-bold">🔒 LOCKED</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-cyan-300 font-mono text-[9px] flex items-center justify-between gap-1">
                      <span className="flex items-center gap-1 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${door.advisoryStatus === 'With Advisory' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                        <span className={`font-bold ${door.advisoryStatus === 'With Advisory' ? 'text-amber-300' : 'text-cyan-300'}`}>{door.advisoryStatus}</span>
                        {door.advisoryStatus === 'With Advisory' && door.advisorySection && (
                          <span className="text-amber-200/90 font-sans font-medium truncate">({door.advisorySection})</span>
                        )}
                      </span>
                      <span className="text-slate-400 shrink-0">{door.department}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  {isAuthorized && !door.isLocked && (
                    <button
                      onClick={() => handleTakeDoor(door)}
                      className="w-full py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-[11px] uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1 border border-white/10"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                      <span>Take This Door</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenDoor(door)}
                    className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md flex items-center justify-center gap-1.5 active:scale-95 ${
                      door.isLocked
                        ? 'bg-gradient-to-r from-red-900 via-rose-950 to-black text-white hover:from-red-800 hover:to-rose-900 border border-red-500/50'
                        : door.gradeBand === 'SHS'
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950'
                        : 'bg-[#0038A8] hover:bg-cyan-600 text-white'
                    }`}
                  >
                    {door.isLocked ? (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>
                          {isMasterCreator 
                            ? 'Open Locked Door (Master Override)' 
                            : 'Open Locked Door (Passcode Protected)'}
                        </span>
                      </>
                    ) : (
                      <>
                        <DoorOpen className="w-4 h-4" />
                        <span>Enter Master Door →</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
          MODAL 1: SET MASTER TEACHER DOOR LOCK & PIN MODAL
      ========================================================================== */}
      {lockingDoor && (
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
                  <p className="text-xs text-slate-300">{lockingDoor.name}</p>
                </div>
              </div>
              <button onClick={() => setLockingDoor(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                Locking this door prevents intruders and unauthorized users from altering the <strong>Door Title</strong>, changing the <strong>Adviser/Mentor Name</strong>, or entering without credentials.
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
                onClick={() => setLockingDoor(null)}
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
      {gateLockedDoor && (
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
                  <p className="text-xs text-slate-300">{gateLockedDoor.name}</p>
                </div>
              </div>
              <button onClick={() => setGateLockedDoor(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200">
                This door is <strong>LOCKED</strong> by Resident Adviser / Mentor <strong>{gateLockedDoor.mentorName}</strong> to prevent unauthorized intruder entry and tampering.
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
                      showToast(`🛡️ MASTER OVERRIDE: Entering ${gateLockedDoor.name}.`);
                      setSelectedDoorId(gateLockedDoor.id);
                      setGateLockedDoor(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow cursor-pointer"
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
                onClick={() => setGateLockedDoor(null)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: ADVISER DOOR & NAMES CUSTOMIZER MODAL
      ========================================================================== */}
      {(() => {
        const editingDoor = doors.find(d => d.id === editingDoorId);
        if (!editingDoor) return null;
        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-gradient-to-b from-[#091b3e] to-[#040c1c] border-2 border-amber-400 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase text-amber-300">
                      Adviser Door Customizer
                    </h3>
                    <p className="text-xs text-slate-300">{editingDoor.code}</p>
                  </div>
                </div>
                <button onClick={() => setEditingDoorId(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-slate-300 block mb-0.5 font-bold uppercase">
                    Door Title / Name:
                  </label>
                  <input
                    type="text"
                    value={editDoorTitle}
                    onChange={(e) => setEditDoorTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-400/80 text-white font-bold text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"
                    placeholder="e.g. Master Teacher I - Door 1"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-300 block mb-0.5 font-bold uppercase">
                    Assigned Adviser / Master Teacher Name:
                  </label>
                  <input
                    type="text"
                    value={editMentorName}
                    onChange={(e) => setEditMentorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-400/80 text-amber-300 font-bold text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"
                    placeholder="e.g. Sir Stephen Tabal"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-300 block mb-0.5 font-bold uppercase">
                    Advisory Section (Optional):
                  </label>
                  <input
                    type="text"
                    value={editAdvisorySection}
                    onChange={(e) => setEditAdvisorySection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-400/80 text-cyan-200 font-bold text-xs focus:outline-none focus:ring-1 focus:ring-cyan-300"
                    placeholder="e.g. Grade 10 - Einstein"
                  />
                </div>

                <p className="text-[10px] text-slate-400 pt-1">
                  🔒 Once saved, you can lock this door so other users and intruders cannot alter your nameplate.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleSaveEditDoor(editingDoor.id)}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setEditingDoorId(null)}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};

// Helper component for lucide door icon
function DoorOpen(props: any) {
  return <Building {...props} />;
}
