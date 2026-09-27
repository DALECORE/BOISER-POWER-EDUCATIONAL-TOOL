import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileText,
  Building,
  User,
  ShieldAlert,
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  Info,
  Radio,
  Timer
} from 'lucide-react';
import { exportLnnchsSFToWord, exportLnnchsSFToPdf, LNNCHS_DEFAULT_CONFIG } from '../utils/lnnchsSchoolFormsExporter';

export interface DepEdLdnOlsLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  isShsTeacher?: boolean;
  isNonTeaching?: boolean;
  position?: string;
  advisoryClass?: string;
  autoTriggeredReason?: string;
}

export type OlsWindowStatus = 'ONE_HOUR_WARNING' | 'ACTIVE_OPEN' | 'CLOSED_AFTER_CUTOFF' | 'CLOSED_OFF_HOURS';

export const DepEdLdnOlsLeaveModal: React.FC<DepEdLdnOlsLeaveModalProps> = ({
  isOpen,
  onClose,
  teacherName,
  isShsTeacher = true,
  isNonTeaching = false,
  position = 'Teacher III (Senior High School)',
  advisoryClass = 'Grade 11 - Einstein',
  autoTriggeredReason = 'Marked Absent / On Official Leave'
}) => {
  // Current time state
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
  const [simulatedMinute, setSimulatedMinute] = useState<number | null>(null);

  // Form 6 Details
  const [leaveType, setLeaveType] = useState<string>('Sick Leave (Rule XVI, Omnibus Rules)');
  const [inclusiveDates, setInclusiveDates] = useState<string>('2026-09-25 to 2026-09-26');
  const [numberOfDays, setNumberOfDays] = useState<number>(2);
  const [reason, setReason] = useState<string>('Medical consultation / Flu recovery');
  const [medicalCertAttached, setMedicalCertAttached] = useState<boolean>(true);
  const [copiedData, setCopiedData] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const SHS_LEAVE_TYPES = ['Sick Leave (Rule XVI, Omnibus Rules)', 'Vacation Leave', 'Maternity Leave (RA 11210 - 105 Days)', 'Study Leave (SHS Specialized)'];
  const JHS_LEAVE_TYPES = ['Sick Leave (Rule XVI, Omnibus Rules)', 'Vacation Leave', 'Paternity Leave (RA 8187 - 7 Days)'];
  const availableLeaveTypes = isShsTeacher ? SHS_LEAVE_TYPES : JHS_LEAVE_TYPES;

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  // Determine current active hour and minute
  const activeDate = currentTime;
  const currentHour = simulatedHour !== null ? simulatedHour : activeDate.getHours();
  const currentMinute = simulatedMinute !== null ? simulatedMinute : activeDate.getMinutes();
  const totalMinutesInDay = currentHour * 60 + currentMinute;

  // OLS SCHEDULE DEFINITIONS:
  // 1-Hour Warning: 4:00 PM (16:00 = 960 mins) to 4:59 PM (16:59 = 1019 mins)
  // Active Window: 5:00 PM (17:00 = 1020 mins) to 7:00 PM (19:00 = 1140 mins)
  // Cut-off: 7:00 PM (19:00 sharp)
  let windowStatus: OlsWindowStatus = 'CLOSED_OFF_HOURS';
  let minutesUntilOpen = 0;
  let minutesUntilCutoff = 0;

  if (totalMinutesInDay >= 960 && totalMinutesInDay < 1020) {
    // 4:00 PM to 4:59 PM
    windowStatus = 'ONE_HOUR_WARNING';
    minutesUntilOpen = 1020 - totalMinutesInDay;
  } else if (totalMinutesInDay >= 1020 && totalMinutesInDay <= 1140) {
    // 5:00 PM to 7:00 PM
    windowStatus = 'ACTIVE_OPEN';
    minutesUntilCutoff = 1140 - totalMinutesInDay;
  } else if (totalMinutesInDay > 1140 && totalMinutesInDay <= 1260) {
    // 7:01 PM to 9:00 PM
    windowStatus = 'CLOSED_AFTER_CUTOFF';
  } else {
    windowStatus = 'CLOSED_OFF_HOURS';
  }

  const formattedTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}:${String(activeDate.getSeconds()).padStart(2, '0')}`;

  const copyOlsCredentials = () => {
    const dataString = `
[DEPED LDN OLS PORTAL LEAVE TRANSMITTAL]
Portal URL: https://ols.depedldn.com/
School: Lanao del Norte National Comprehensive High School (LNNCHS)
School ID: 304005
Division: Division of Lanao del Norte (Region X)
Employee Name: ${teacherName}
Position: ${position}
Classification: ${isShsTeacher ? 'Senior High School (SHS) Faculty' : isNonTeaching ? 'Non-Teaching Personnel' : 'Junior High School Faculty'}
Advisory: ${advisoryClass}
Leave Type: ${leaveType}
Inclusive Dates: ${inclusiveDates} (${numberOfDays} working days)
Reason: ${reason}
Medical Certificate: ${medicalCertAttached ? 'YES (Attached)' : 'N/A'}
Station Head / Approver: ANISAH A. SINAL, Principal III
Submission Window: 5:00 PM – 7:00 PM (Cut-off 7:00 PM)
Generated via: Boiser Power Tools OLS Bridge
    `.trim();

    navigator.clipboard.writeText(dataString);
    setCopiedData(true);
    setActionNotice('✓ Form 6 Leave Details copied to clipboard! Ready to paste into https://ols.depedldn.com/');
    setTimeout(() => {
      setCopiedData(false);
      setActionNotice(null);
    }, 4000);
  };

  const handleExportForm6Word = () => {
    exportLnnchsSFToWord('SF1', {
      ...LNNCHS_DEFAULT_CONFIG,
      title: `Civil Service Form No. 6 (Application for Leave) — ${teacherName}`,
      formName: `CS Form 6 (Leave Application): ${teacherName}`,
      adviser: teacherName,
      section: advisoryClass,
      schoolHead: 'ANISAH A. SINAL, Principal III'
    });
    setActionNotice('✓ CS Form 6 Application for Leave exported (.docx)!');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleExportForm6PDF = () => {
    exportLnnchsSFToPdf('SF1', {
      ...LNNCHS_DEFAULT_CONFIG,
      title: `Civil Service Form No. 6 (Application for Leave) — ${teacherName}`,
      formName: `CS Form 6 (Leave Application): ${teacherName}`,
      adviser: teacherName,
      section: advisoryClass,
      schoolHead: 'ANISAH A. SINAL, Principal III'
    });
    setActionNotice('✓ Official Sealed CS Form 6 PDF generated (.pdf)!');
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border-2 border-red-500 flex flex-col max-h-[92vh]">
        {/* TOP BANNER */}
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-stone-900 text-white p-5 sm:p-6 relative border-b-4 border-amber-400">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[11px] font-black uppercase tracking-wide shadow-sm">
                <Radio className="w-3.5 h-3.5 text-stone-950 animate-pulse" />
                <span>DepEd LDN Online Leave System (OLS) Portal Bridge</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Automatic Leave Filing &amp; Signal Dispatch
              </h2>
              <p className="text-xs text-red-100 flex items-center gap-2 flex-wrap">
                <span>Faculty: <b>{teacherName}</b></span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-red-800 text-white font-mono text-[10px]">
                  {isShsTeacher ? 'SHS Teacher' : isNonTeaching ? 'Non-Teaching Staff' : 'Faculty'}
                </span>
                <span>•</span>
                <span className="text-amber-300 font-mono">https://ols.depedldn.com/</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer shrink-0"
              title="Close Dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SIMULATED CLOCK / TIME CONTROLS */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-300" />
              <span className="text-stone-300">System Time:</span>
              <span className="font-mono font-black text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-lg border border-white/10">
                {formattedTime}
              </span>
            </div>

            {/* Time Simulation Presets for Testing */}
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="text-stone-400">Test Time:</span>
              <button
                onClick={() => { setSimulatedHour(16); setSimulatedMinute(30); }}
                className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                  simulatedHour === 16 ? 'bg-amber-400 text-stone-950' : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                4:30 PM (1h Warning)
              </button>
              <button
                onClick={() => { setSimulatedHour(17); setSimulatedMinute(30); }}
                className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                  simulatedHour === 17 ? 'bg-emerald-400 text-stone-950' : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                5:30 PM (OLS Active)
              </button>
              <button
                onClick={() => { setSimulatedHour(19); setSimulatedMinute(15); }}
                className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                  simulatedHour === 19 ? 'bg-red-500 text-white' : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                7:15 PM (Cut-off)
              </button>
              {simulatedHour !== null && (
                <button
                  onClick={() => { setSimulatedHour(null); setSimulatedMinute(null); }}
                  className="px-2 py-0.5 rounded-md bg-stone-700 text-stone-200 font-bold hover:bg-stone-600"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* 1. DYNAMIC OLS STATUS BANNER (1-HOUR WARNING / ACTIVE / CLOSED) */}
          {windowStatus === 'ONE_HOUR_WARNING' && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 space-y-2 text-amber-950 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-xs text-amber-900">
                  <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                  <span>⚠️ 1-HOUR WARNING SIGNAL: OLS OPENS AT 5:00 PM (IN {minutesUntilOpen} MINUTES)</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-200 px-2 py-0.5 rounded-md text-amber-900">
                  Cut-off: 7:00 PM
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                The official <b>DepEd Lanao del Norte Online Leave System (OLS)</b> opens promptly at <b>5:00 PM</b> and remains open until the <b>7:00 PM cut-off</b>. Please prepare your Form 6 leave details and supporting documents now so you can file immediately upon opening.
              </p>
            </div>
          )}

          {windowStatus === 'ACTIVE_OPEN' && (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 space-y-2 text-emerald-950 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-xs text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />
                  <span>🟢 OLS LIVE FILING WINDOW IS ACTIVE (5:00 PM – 7:00 PM ONLY)</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-400">
                  {minutesUntilCutoff} mins left before 7:00 PM Cut-off!
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                The portal at <a href="https://ols.depedldn.com/" target="_blank" rel="noreferrer" className="text-blue-700 underline font-bold">https://ols.depedldn.com/</a> is currently <b>ONLINE</b> for SHS Teachers and Non-Teaching Staff. File your leave application immediately before the <b>7:00 PM strict daily cut-off</b>.
              </p>
            </div>
          )}

          {(windowStatus === 'CLOSED_AFTER_CUTOFF' || windowStatus === 'CLOSED_OFF_HOURS') && (
            <div className="bg-stone-100 border-2 border-stone-300 rounded-2xl p-4 space-y-2 text-stone-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-xs text-red-800">
                  <Clock className="w-4.5 h-4.5 text-red-600" />
                  <span>🔴 OLS PORTAL CURRENTLY CLOSED (OPERATING HOURS: 5:00 PM – 7:00 PM ONLY)</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-stone-200 px-2 py-0.5 rounded-md text-stone-700">
                  Daily Cut-off: 7:00 PM Sharp
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                DepEd LDN OLS operates strictly from <b>5:00 PM to 7:00 PM daily</b>. A warning reminder signal will be triggered <b>1 hour before opening (4:00 PM)</b>. You can generate and save your CS Form 6 application now in preparation for the 5:00 PM window.
              </p>
            </div>
          )}

          {/* ACTION NOTIFICATION */}
          {actionNotice && (
            <div className="p-3 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md">
              <Check className="w-4 h-4 text-white" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* 2. AUTOMATIC LEAVE TRIGGER & SIGNAL DETAILS */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="text-xs font-black text-stone-900 uppercase">
                Faculty Attendance Status &amp; OLS Signal
              </span>
              <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-300 rounded-lg text-[10px] font-mono font-bold">
                ● {autoTriggeredReason}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[10px]">Faculty Member:</span>
                <span className="font-bold text-stone-900">{teacherName}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Position &amp; Station:</span>
                <span className="font-bold text-stone-900">{position} • LNNCHS (304005)</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Advisory / Handled Classes:</span>
                <span className="font-bold text-stone-900">{advisoryClass}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Station Head / Endorser:</span>
                <span className="font-bold text-blue-900">ANISAH A. SINAL, Principal III</span>
              </div>
            </div>
          </div>

          {/* 3. INTERACTIVE CS FORM 6 BUILDER */}
          <div className="space-y-3 text-xs">
            <h4 className="font-black text-stone-900 uppercase flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-red-700" />
              <span>Civil Service Form No. 6 (Application for Leave) Details:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Type of Leave:</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white font-semibold text-stone-900"
                >
                  {availableLeaveTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Inclusive Dates &amp; Working Days:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inclusiveDates}
                    onChange={(e) => setInclusiveDates(e.target.value)}
                    placeholder="e.g. 2026-09-25 to 2026-09-26"
                    className="flex-1 p-2 rounded-xl border border-stone-300 bg-white text-stone-900"
                  />
                  <input
                    type="number"
                    min="1"
                    max="105"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(parseInt(e.target.value) || 1)}
                    className="w-16 p-2 rounded-xl border border-stone-300 bg-white text-stone-900 font-mono text-center"
                    title="Number of Days"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Reason / Specification:</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Specify illness or reason for leave..."
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white text-stone-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="bg-stone-100 border-t border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Copy Form 6 Data */}
            <button
              onClick={copyOlsCredentials}
              className="px-3.5 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedData ? 'Copied!' : 'Copy Form 6 Data'}</span>
            </button>

            {/* Export Word */}
            <button
              onClick={handleExportForm6Word}
              className="px-3.5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Form 6 (.docx)</span>
            </button>

            {/* Export PDF */}
            <button
              onClick={handleExportForm6PDF}
              className="px-3.5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Form 6 (.pdf)</span>
            </button>
          </div>

          {/* PRIMARY OLS DIRECT ACCESS BUTTON */}
          <a
            href="https://ols.depedldn.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={copyOlsCredentials}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:brightness-110 text-white font-black text-xs shadow-xl transition flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-300"
          >
            <ExternalLink className="w-4 h-4 text-white" />
            <span>OPEN DEPED LDN OLS (5:00PM–7:00PM)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
