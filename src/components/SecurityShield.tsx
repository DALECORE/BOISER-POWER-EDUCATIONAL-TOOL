import React, { useEffect, useState, useRef } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  EyeOff, 
  VideoOff, 
  CameraOff, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  XCircle,
  FileLock2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { logSecurityBreach, MASTER_CREATOR_EMAIL } from '../services/securityAlertService';

interface SecurityShieldProps {
  children: React.ReactNode;
  isOwner: boolean;
  ownerName: string;
  userEmail?: string;
}

export const SecurityShield: React.FC<SecurityShieldProps> = ({ 
  children, 
  isOwner, 
  ownerName = 'Sir Steaven Kinth D. Boiser',
  userEmail = ''
}) => {
  // Check if current user is the verified owner (Steaven Kinth D. Boiser)
  const isVerifiedOwner = 
    isOwner || 
    userEmail?.toLowerCase() === MASTER_CREATOR_EMAIL.toLowerCase() ||
    userEmail?.toLowerCase() === 'steavenkinth.boiser@deped.gov.ph' ||
    ownerName?.toLowerCase().includes('steaven kinth');

  const [isTampered, setIsTampered] = useState(false);
  const [tamperTitle, setTamperTitle] = useState<string>('SECURITY BREACH');
  const [tamperMessage, setTamperMessage] = useState<string | null>(null);
  const [isWindowObfuscated, setIsWindowObfuscated] = useState(false);
  const [ownerBadgeDismissed, setOwnerBadgeDismissed] = useState(false);

  const blurTimeoutRef = useRef<any>(null);
  const isPrintingRef = useRef<boolean>(false);

  useEffect(() => {
    // IF OWNER: No restrictions! Sir Steaven Kinth D. Boiser has 100% full rights to screenshot, record, share, and build.
    if (isVerifiedOwner) {
      return;
    }

    // =========================================================================
    // 0. PRINT PERMISSION ENGINE: Any user can print and export documents
    // =========================================================================
    const handleBeforePrint = () => {
      isPrintingRef.current = true;
      setIsWindowObfuscated(false);
      setIsTampered(false);
    };

    const handleAfterPrint = () => {
      isPrintingRef.current = false;
      setIsWindowObfuscated(false);
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // =========================================================================
    // 1. SCREENSHOT & RECORDING INTERCEPT ENGINE
    // =========================================================================

    const triggerBreach = (
      title: string, 
      msg: string, 
      type: 'SCREENSHOT_PROHIBITED_ATTEMPT' | 'VIDEO_RECORDING_ATTEMPT' | 'UNAUTHORIZED_SHARE_ATTEMPT' | 'DEVTOOLS_INSPECT_ATTEMPT' | 'UNAUTHORIZED_COPY_ATTEMPT'
    ) => {
      // Never trigger breach during authorized document printing
      if (isPrintingRef.current) return;

      setTamperTitle(title);
      setTamperMessage(msg);
      setIsTampered(true);

      // Scrub clipboard immediately if screenshot or copy was attempted
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          navigator.clipboard.writeText('⚠️ [CONFIDENTIAL & PROTECTED] Screenshots, recording, and sharing are strictly prohibited by Sir Steaven Kinth D. Boiser.');
        } catch (e) {
          // ignore
        }
      }

      logSecurityBreach(
        'Unauthorized User / Guest',
        userEmail || 'anonymous_user@node.local',
        `${title}: ${msg}`,
        type,
        `Prohibited Action: ${type} by non-owner user`
      );

      // Flash blur screen
      setIsWindowObfuscated(true);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = setTimeout(() => {
        setIsWindowObfuscated(false);
      }, 4000);

      setTimeout(() => setIsTampered(false), 5500);
    };

    // 1.1 Keyboard Interception for Screenshot / Recording / DevTools Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const code = e.code;
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;

      // RULE: Any user CAN freely PRINT documents (Ctrl+P / Cmd+P)
      if (isCtrlOrMeta && (key === 'p' || key === 'P')) {
        isPrintingRef.current = true;
        setIsWindowObfuscated(false);
        // Allow native browser print dialog to open cleanly
        return;
      }

      // PrintScreen Key (PrtScn)
      if (key === 'PrintScreen' || code === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        e.stopPropagation();
        triggerBreach(
          '📸 SCREENSHOT PROHIBITED',
          'Screenshots of this interface app are strictly prohibited! Only Sir Steaven Kinth D. Boiser is authorized to take screenshots or share features.',
          'SCREENSHOT_PROHIBITED_ATTEMPT'
        );
        return false;
      }

      // Windows Snipping Tool (Win + Shift + S) or Mac Screenshot (Cmd + Shift + 3 / 4 / 5)
      if (e.shiftKey && (isCtrlOrMeta || e.key === 'Meta') && (key === 'S' || key === 's' || key === '3' || key === '4' || key === '5')) {
        e.preventDefault();
        e.stopPropagation();
        triggerBreach(
          '📸 SNIPPING & SCREENSHOT PROHIBITED',
          'Screen clipping and screenshot utilities are blocked by Boiser Security Protocol. Only Sir Steaven Kinth D. Boiser is permitted.',
          'SCREENSHOT_PROHIBITED_ATTEMPT'
        );
        return false;
      }

      // Save Webpage (Ctrl+S / Cmd+S)
      if (isCtrlOrMeta && (key === 's' || key === 'S')) {
        e.preventDefault();
        e.stopPropagation();
        triggerBreach(
          '💾 SOURCE SAVE BLOCKED',
          'Saving this application file and interface architecture is prohibited. Only Sir Steaven Kinth D. Boiser can share or export.',
          'UNAUTHORIZED_COPY_ATTEMPT'
        );
        return false;
      }

      // DevTools Inspection (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
      if (
        key === 'F12' || 
        (isCtrlOrMeta && e.shiftKey && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        triggerBreach(
          '🛡️ INSPECTOR BLOCKED',
          'Reverse engineering and developer tool inspection are prohibited. Architecture belongs exclusively to Sir Steaven Kinth D. Boiser.',
          'DEVTOOLS_INSPECT_ATTEMPT'
        );
        return false;
      }

      // View Source (Ctrl+U)
      if (isCtrlOrMeta && (key === 'u' || key === 'U')) {
        e.preventDefault();
        e.stopPropagation();
        triggerBreach(
          '📄 SOURCE CODE BLOCKED',
          'Viewing application source code is prohibited. Only Sir Steaven Kinth D. Boiser is authorized to view and build.',
          'DEVTOOLS_INSPECT_ATTEMPT'
        );
        return false;
      }
    };

    // 1.2 Disable Right-Click Context Menu for Non-Owners (except inside editable form fields)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return; // Allow typing & editing inside inputs
      }
      e.preventDefault();
      triggerBreach(
        '🚫 CONTEXT MENU DISABLED',
        'Right-click actions (Copy image, Inspect element, Save as) are disabled by Boiser Security Protocol.',
        'UNAUTHORIZED_COPY_ATTEMPT'
      );
    };

    // 1.3 Anti-Video Recording & Window Defocus Obfuscation
    // When screen recorders or snip tools pop up over the window, blur content
    const handleWindowBlur = () => {
      // RULE: Do NOT obfuscate if the user is currently printing or exporting documents!
      if (isPrintingRef.current) {
        return;
      }
      // Obfuscate the display temporarily so screen recording tools capture a black screen
      setIsWindowObfuscated(true);
    };

    const handleWindowFocus = () => {
      // Restore view when user focuses back onto the applet
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = setTimeout(() => {
        setIsWindowObfuscated(false);
      }, 500);
    };

    // 1.4 Guard Screen Capture API (navigator.mediaDevices.getDisplayMedia)
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getDisplayMedia = async (constraints) => {
        triggerBreach(
          '📹 SCREEN RECORDING INTERCEPTED',
          'Live screen capture and video recording of this app are strictly prohibited by Sir Steaven Kinth D. Boiser!',
          'VIDEO_RECORDING_ATTEMPT'
        );
        throw new Error('Screen recording of this interface app is prohibited by Sir Steaven Kinth D. Boiser.');
      };
    }

    // 1.5 Guard Native Web Share API
    if (navigator.share) {
      const originalShare = navigator.share.bind(navigator);
      navigator.share = async (data) => {
        triggerBreach(
          '🔒 LINK SHARING RESTRICTED',
          'Strictly no users can share the link, the files, or the data of this app. Only Sir Steaven Kinth D. Boiser is authorized to share.',
          'UNAUTHORIZED_SHARE_ATTEMPT'
        );
        throw new Error('Link sharing restricted to Sir Steaven Kinth D. Boiser.');
      };
    }

    // Attach listeners
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, [isVerifiedOwner, userEmail]);

  return (
    <div className={`relative min-h-screen ${isVerifiedOwner ? '' : 'select-none'}`}>
      
      {/* =========================================================================
          OWNER UNLOCKED BANNER (Sir Steaven Kinth D. Boiser only)
      ========================================================================== */}
      {isVerifiedOwner && !ownerBadgeDismissed && (
        <div className="no-print fixed top-2 right-2 z-[9999] max-w-sm p-2.5 rounded-2xl bg-[#092B62]/95 border-2 border-amber-400 text-white shadow-2xl backdrop-blur-md animate-in fade-in flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">👑</span>
            <div>
              <div className="font-black text-amber-300 uppercase tracking-tight flex items-center gap-1">
                <span>OWNER UNLOCKED: Sir Steaven Kinth D. Boiser</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
              </div>
              <p className="text-[10px] text-blue-200">
                Full Media, Recording, File &amp; Link Sharing Privileges Active.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setOwnerBadgeDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            title="Dismiss badge"
          >
            ✕
          </button>
        </div>
      )}

      {/* =========================================================================
          NON-OWNER WATERMARK LAYER (Anti-AI / Anti-Screenshot Overlay)
          Hidden completely during print so documents print cleanly!
      ========================================================================== */}
      {!isVerifiedOwner && (
        <div className="no-print fixed inset-0 pointer-events-none z-[9990] overflow-hidden opacity-[0.025] select-none">
          <div className="absolute inset-0 flex flex-wrap gap-24 p-10 rotate-[-25deg] scale-150">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="text-xl font-black whitespace-nowrap tracking-[0.4em] text-slate-900">
                STRICTLY PROPRIETARY • PROPERTY OF SIR STEAVEN KINTH D. BOISER • NO SCREENSHOTS • NO RECORDING
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          WINDOW OBFUSCATION SHIELD (Active during screen snip or window defocus)
          Hidden completely during print so documents print cleanly!
      ========================================================================== */}
      {!isVerifiedOwner && isWindowObfuscated && (
        <div className="no-print fixed inset-0 z-[9995] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
          <div className="w-20 h-20 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center mb-4 text-red-400 shadow-[0_0_40px_rgba(239,68,68,0.4)]">
            <VideoOff className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
            INTERFACE RECORDING &amp; CAPTURE PROHIBITED
          </h2>
          <p className="text-red-300 font-bold max-w-lg text-sm mb-4 leading-relaxed">
            Screenshots, screen recording, and external capture of the Boiser App are strictly prohibited.
          </p>
          <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-xs text-blue-200 font-mono max-w-md">
            Only <strong>Sir Steaven Kinth D. Boiser</strong> is authorized to record, take screenshots, or share this application link and files.
          </div>
          <p className="text-[11px] text-emerald-400 font-bold mt-4">
            📄 Printing &amp; Exporting official documents is 100% permitted for all DepEd users.
          </p>
        </div>
      )}

      {/* =========================================================================
          APPLICATION MAIN CONTENT
      ========================================================================== */}
      <div className={isVerifiedOwner ? '' : 'select-none pointer-events-auto'}>
        {children}
      </div>

      {/* =========================================================================
          SECURITY BREACH MODAL (Appears when screenshot, recording, or link share attempted)
      ========================================================================== */}
      <AnimatePresence>
        {isTampered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-print fixed inset-0 z-[10000] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-gradient-to-b from-red-900 to-slate-950 rounded-3xl p-8 text-center shadow-[0_0_60px_rgba(220,38,38,0.6)] border-2 border-red-500/80"
            >
              <div className="w-20 h-20 bg-red-600/30 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-5 text-white">
                <CameraOff className="w-10 h-10 text-red-300 animate-pulse" />
              </div>

              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                {tamperTitle}
              </h2>

              <p className="text-red-200 text-xs font-bold mb-4 uppercase tracking-wider leading-relaxed">
                {tamperMessage}
              </p>

              <div className="bg-black/60 p-4 rounded-2xl mb-6 text-xs text-red-100 text-left border border-red-500/30 space-y-2 leading-relaxed">
                <div className="flex items-center gap-2 text-amber-300 font-bold uppercase text-[11px]">
                  <FileLock2 className="w-4 h-4 shrink-0" />
                  <span>DepEd Intellectual Property Policy</span>
                </div>
                <p>
                  All features, curriculum engines, database connections, and build architecture are the exclusive intellectual property of <strong>Sir Steaven Kinth D. Boiser</strong>.
                </p>
                <p className="text-red-300 font-semibold pt-1">
                  • Taking screenshots or video recording is strictly prohibited.<br />
                  • Sharing this link or exporting build files is strictly prohibited.<br />
                  • Only Sir Steaven Kinth D. Boiser has permission.
                </p>
                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                  🖨️ Document Printing &amp; Official Reports Export is permitted for all DepEd teachers.
                </div>
              </div>

              <button
                onClick={() => setIsTampered(false)}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition shadow-lg cursor-pointer"
              >
                I Understand &amp; Acknowledge Protocol
              </button>

              <p className="text-white/40 text-[9px] font-mono uppercase tracking-[0.2em] mt-4">
                Boiser Cyber-Security Shield v3.5 • Region X LNNCHS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .select-none {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        .select-none * {
          user-select: none !important;
          -webkit-user-drag: none !important;
        }
        /* All users can freely print and export documents without security overlays */
        @media print {
          .no-print,
          .security-shield-overlay,
          .select-none:before,
          .select-none:after {
            display: none !important;
            visibility: hidden !important;
          }
          body, #root, .min-h-screen {
            -webkit-user-select: auto !important;
            user-select: auto !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
};
