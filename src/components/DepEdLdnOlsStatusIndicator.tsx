import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Radio,
  FileText
} from 'lucide-react';
import { DepEdLdnOlsLeaveModal } from './DepEdLdnOlsLeaveModal';

interface DepEdLdnOlsStatusIndicatorProps {
  teacherName?: string;
  isShsTeacher?: boolean;
  isNonTeaching?: boolean;
  position?: string;
  advisoryClass?: string;
  isAbsent?: boolean;
  compact?: boolean;
}

export const DepEdLdnOlsStatusIndicator: React.FC<DepEdLdnOlsStatusIndicatorProps> = ({
  teacherName = 'STEAVEN KINTH D. BOISER',
  isShsTeacher = true,
  isNonTeaching = false,
  position = 'Teacher III (Senior High School)',
  advisoryClass = 'Grade 11 - Einstein',
  isAbsent = false,
  compact = false
}) => {
  const [showOlsModal, setShowOlsModal] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const totalMins = currentHour * 60 + currentMinute;

  // 1-Hour Warning (4:00 PM – 4:59 PM = 960 to 1019)
  const isOneHourWarning = totalMins >= 960 && totalMins < 1020;
  // Active OLS Window (5:00 PM – 7:00 PM = 1020 to 1140)
  const isActiveOpen = totalMins >= 1020 && totalMins <= 1140;
  const minutesToOpen = isOneHourWarning ? 1020 - totalMins : 0;
  const minutesToCutoff = isActiveOpen ? 1140 - totalMins : 0;

  if (compact) {
    return (
      <>
        <button
          onClick={() => setShowOlsModal(true)}
          className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition cursor-pointer flex items-center gap-1.5 shadow-xs ${
            isActiveOpen
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'
              : isOneHourWarning
              ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border border-amber-500'
              : 'bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/40'
          }`}
          title="DepEd LDN Online Leave System (5:00 PM – 7:00 PM)"
        >
          <Radio className="w-3 h-3" />
          <span>
            {isActiveOpen
              ? `OLS LIVE (${minutesToCutoff}m to 7PM)`
              : isOneHourWarning
              ? `OLS IN ${minutesToOpen}m (5PM)`
              : 'OLS 5-7PM'}
          </span>
        </button>

        {showOlsModal && (
          <DepEdLdnOlsLeaveModal
            isOpen={showOlsModal}
            onClose={() => setShowOlsModal(false)}
            teacherName={teacherName}
            isShsTeacher={isShsTeacher}
            isNonTeaching={isNonTeaching}
            position={position}
            advisoryClass={advisoryClass}
            autoTriggeredReason={isAbsent ? 'Automatically Triggered due to Absence' : 'Manual Leave Filing'}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={`p-3 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isActiveOpen
            ? 'bg-emerald-950/90 border-emerald-400 text-white shadow-md'
            : isOneHourWarning
            ? 'bg-amber-950/90 border-amber-400 text-amber-100 shadow-md animate-pulse'
            : 'bg-stone-900/90 border-red-500/50 text-stone-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl shrink-0 ${
              isActiveOpen
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                : isOneHourWarning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                : 'bg-red-500/20 text-red-300 border border-red-400/40'
            }`}
          >
            {isOneHourWarning ? (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            ) : isActiveOpen ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
            ) : (
              <Clock className="w-4 h-4 text-red-400" />
            )}
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black tracking-wide text-white">
                DepEd LDN Online Leave System (OLS) Bridge
              </span>
              <span
                className={`text-[9px] font-mono px-2 py-0.2 rounded-full font-bold uppercase ${
                  isActiveOpen
                    ? 'bg-emerald-500 text-stone-950'
                    : isOneHourWarning
                    ? 'bg-amber-400 text-stone-950'
                    : 'bg-red-900 text-red-200'
                }`}
              >
                {isActiveOpen
                  ? `● ONLINE (${minutesToCutoff}m left)`
                  : isOneHourWarning
                  ? `▲ OPENS IN ${minutesToOpen} MINS`
                  : '○ OPENS 5PM–7PM ONLY'}
              </span>
            </div>
            <p className="text-[10px] text-stone-300">
              Official portal: <b className="text-amber-300">https://ols.depedldn.com/</b> • Operating hours: <b>5:00 PM – 7:00 PM ONLY</b> (7:00 PM Cut-off for SHS Teachers &amp; Non-Teaching Staff).
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowOlsModal(true)}
          className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm ${
            isActiveOpen
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-stone-950'
              : isOneHourWarning
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950'
              : 'bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isAbsent ? '⚡ AUTO-FILE OLS LEAVE' : 'FILE OLS LEAVE'}</span>
        </button>
      </div>

      {showOlsModal && (
        <DepEdLdnOlsLeaveModal
          isOpen={showOlsModal}
          onClose={() => setShowOlsModal(false)}
          teacherName={teacherName}
          isShsTeacher={isShsTeacher}
          isNonTeaching={isNonTeaching}
          position={position}
          advisoryClass={advisoryClass}
          autoTriggeredReason={isAbsent ? 'Automatically Triggered due to Absence' : 'Manual Leave Filing'}
        />
      )}
    </>
  );
};
