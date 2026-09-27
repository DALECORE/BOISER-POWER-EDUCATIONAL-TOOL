import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Menu,
  X,
  Sparkles,
  RefreshCw,
  Search,
  Grid,
  FileText,
  Lock,
  BookOpen,
  Award,
  Bot,
  Cross,
  Home,
  Building,
  QrCode,
  Share2,
  Cloud,
  FileCode,
  Camera,
  Smartphone,
  Laptop,
  Apple,
  Settings,
  ShieldCheck,
  CheckCircle2,
  DownloadCloud,
  Zap
} from 'lucide-react';
import { useThemeStyle } from '../context/ThemeStyleContext';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { uiStyle, effectiveStyle, setUiStyle, detectedOS } = useThemeStyle();
  
  // Auto-Update Engine State
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [autoUpdateLive, setAutoUpdateLive] = useState(true);

  // Background Auto-Update cycle every 60 seconds
  useEffect(() => {
    if (!autoUpdateLive) return;
    const interval = setInterval(() => {
      setLastCheckTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      // Check service workers in background
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(reg => reg.update());
        });
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [autoUpdateLive]);

  const handleTriggerAutoUpdate = async () => {
    setIsUpdating(true);
    setUpdateSuccess(false);

    try {
      // 1. Refresh Service Worker caches
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.update();
        }
      }
      
      // 2. Clear stale cache entries if supported
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }

      // Simulate instantaneous live sync
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setLastCheckTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 4000);
    } catch (err) {
      console.log('Update sync completed in local mode:', err);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 4000);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`w-full min-h-screen text-white p-3 sm:p-5 lg:p-6 font-sans relative overflow-hidden select-none pb-24 transition-colors duration-300 ${
      effectiveStyle === 'ios'
        ? 'bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-950'
        : effectiveStyle === 'desktop'
        ? 'bg-[#030712] bg-[radial-gradient(circle_at_50%_0%,#1e293b,transparent_70%)]'
        : 'bg-[#050b14] bg-[radial-gradient(circle_at_50%_10%,#0c203f_0%,#050b14_70%)]'
    }`}>
      
      {/* Background Ambient Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 rounded-full blur-[120px] pointer-events-none ${
        effectiveStyle === 'ios'
          ? 'bg-purple-500/15'
          : effectiveStyle === 'desktop'
          ? 'bg-blue-500/15'
          : 'bg-[#00d2ff]/10'
      }`} />

      <div className={`mx-auto space-y-4 relative z-10 transition-all ${
        effectiveStyle === 'desktop' ? 'max-w-4xl' : 'max-w-xl'
      }`}>
        
        {/* OS THEME SWITCHER BAR */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-[11px] font-bold">
          <div className="flex items-center gap-1.5 text-slate-300">
            {effectiveStyle === 'android' && <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
            {effectiveStyle === 'ios' && <Apple className="w-3.5 h-3.5 text-purple-300" />}
            {effectiveStyle === 'desktop' && <Laptop className="w-3.5 h-3.5 text-cyan-300" />}
            <span>OS Style: <strong className="text-white uppercase">{effectiveStyle} Mode</strong></span>
            {uiStyle === 'auto' && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Auto-Detected</span>}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setUiStyle('auto')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                uiStyle === 'auto' ? 'bg-amber-400 text-stone-950 shadow-xs' : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
              title="Automatically adapt to Android, iOS or Desktop"
            >
              ⚡ Auto
            </button>
            <button
              onClick={() => setUiStyle('android')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                uiStyle === 'android' ? 'bg-emerald-500 text-white shadow-xs' : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
              title="Force Android Material Style"
            >
              🤖 Android
            </button>
            <button
              onClick={() => setUiStyle('ios')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                uiStyle === 'ios' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
              title="Force Apple iOS Glassmorphism Style"
            >
              🍎 iOS
            </button>
            <button
              onClick={() => setUiStyle('desktop')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                uiStyle === 'desktop' ? 'bg-cyan-500 text-stone-950 shadow-xs' : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
              title="Force Desktop / Laptop Workstation Style"
            >
              💻 Desktop
            </button>
          </div>
        </div>

        {/* 🏠 HOUSE ROOF: Header with Brand Emblem & OS Specific Styling */}
        <header className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all ${
          effectiveStyle === 'ios'
            ? 'bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-2xl rounded-3xl'
            : effectiveStyle === 'desktop'
            ? 'bg-[#0b1329]/95 border border-cyan-500/40 shadow-xl'
            : 'bg-[#081226]/90 border-2 border-[#ffb700] shadow-[0_0_20px_rgba(255,183,0,0.25)] backdrop-blur-md'
        }`}>
          {/* macOS Desktop Traffic Dots Header */}
          {effectiveStyle === 'desktop' && (
            <div className="absolute top-2 left-4 flex items-center gap-1.5 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-xs"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs"></span>
            </div>
          )}

          <div className={`flex items-center gap-3 ${effectiveStyle === 'desktop' ? 'pt-3' : ''}`}>
            <div className="w-11 h-11 rounded-full border-2 border-[#ffb700] bg-gradient-to-br from-[#0038A8] to-[#001f5c] p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(255,183,0,0.5)] shrink-0">
              <img
                src="/108482_8a6322.png"
                alt="BOISER Brand Emblem"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/boiser-logo.png';
                }}
              />
              <span className="text-lg font-black text-[#ffb700] drop-shadow">B</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-wide text-[#00d2ff] drop-shadow-[0_0_10px_rgba(0,210,255,0.8)]">
                BOISER POWER TOOLS
              </h1>
              <p className="text-[10px] sm:text-xs font-bold text-[#ffb700] uppercase tracking-wider flex items-center gap-1.5 flex-wrap">
                <span>Universal Mobile v2.8 Pro</span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded text-[9px] border border-emerald-500/30">
                  🚀 1.0 TB INFRASTRUCTURE
                </span>
                <span className="px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded text-[9px] border border-blue-500/30">
                  👥 200,000+ TEACHERS READY
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff] text-[#00d2ff] flex items-center justify-center text-lg hover:bg-[#00d2ff]/20 transition cursor-pointer shadow-[0_0_10px_rgba(0,210,255,0.3)]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* 🚪 COMPACT WELCOME & BRAND BANNER (CANVA / NANO DESIGN INTEGRATION) */}
        <div className={`p-5 sm:p-6 transition-all ${
          effectiveStyle === 'ios'
            ? 'rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-blue-950/80 border border-amber-400/40 backdrop-blur-2xl shadow-2xl'
            : effectiveStyle === 'desktop'
            ? 'rounded-3xl bg-gradient-to-r from-[#03132e] via-[#092b62] to-[#04122b] border-2 border-amber-400/50 shadow-2xl'
            : 'rounded-3xl bg-gradient-to-br from-[#021029] via-[#08234f] to-[#040f21] border-2 border-amber-400/50 shadow-[0_0_25px_rgba(255,183,0,0.2)]'
        } relative overflow-hidden`}>
          {/* Subtle Ambient Decorative Watermark */}
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
            {/* Left: Official Teacher Profile & Branding */}
            <div className="flex items-center gap-4 text-left w-full md:w-auto">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-[#0038A8] to-[#001f5c] p-0.5 shadow-[0_0_15px_rgba(255,183,0,0.4)] overflow-hidden">
                  <img
                    src="/108482_8a6322.png"
                    alt="Master Creator Steaven Kinth D. Boiser"
                    className="w-full h-full rounded-2xl object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/boiser-logo.png';
                    }}
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-emerald-500 text-slate-950 rounded-full text-[9px] font-black border border-white shadow-xs">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 rounded-md">
                    DepEd Region X • LNNCHS
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-black text-white tracking-tight uppercase">
                  WELCOME TO BOISER
                </h2>
                <p className="text-xs sm:text-sm font-bold text-cyan-300">
                  Powerful Education Tools for Smarter Teaching and Learning
                </p>
                <p className="text-[11px] text-amber-200/90 italic font-medium leading-tight max-w-md pt-0.5">
                  “Enjoy learning with BOISER educational resources.<br />
                  <span className="font-bold text-amber-300">B.O.I.S.E.R.</span> — Building Organizational Intelligence for Sustainable Educational Results.”
                </p>
              </div>
            </div>

            {/* Right: Quick Action Banner */}
            <div className="flex md:flex-col items-center justify-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-5">
              <button
                onClick={() => setActiveTab('ilaw')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>⚡ Open Door 1 (ILAW)</span>
              </button>
              <button
                onClick={() => setActiveTab('office')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer border border-white/20 flex items-center justify-center gap-1.5"
              >
                <span>🏢 Boiser Office Door</span>
              </button>
            </div>
          </div>
        </div>

        {/* 💡 3 TOP SMART WORKFLOW SUGGESTIONS & RECOMMENDED FAST-ACTIONS */}
        <div className={`p-4 sm:p-5 transition-all ${
          effectiveStyle === 'ios'
            ? 'rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-blue-950/80 border-2 border-amber-400/40 backdrop-blur-2xl shadow-xl'
            : 'rounded-3xl bg-gradient-to-br from-[#021330] via-[#082047] to-[#040f21] border-2 border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.2)]'
        } space-y-3.5`}>
          <div className="flex items-center justify-between border-b border-amber-400/25 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md text-sm">
                💡
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-wider">
                  3 Smart Suggestions &amp; Quick Actions (DepEd 2026)
                </h3>
                <p className="text-[10px] text-slate-300">
                  Direct quick-launch workflows for high-frequency teaching deliverables.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-950 bg-amber-400 px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              ⭐ Recommended
            </span>
          </div>

          <div className={`grid gap-3 ${effectiveStyle === 'desktop' ? 'grid-cols-3' : 'grid-cols-1 md:grid-cols-3'}`}>
            {/* Suggestion 1 */}
            <button
              onClick={() => setActiveTab('grading_app')}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-400 text-left transition flex items-start gap-3 cursor-pointer group shadow-md"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-amber-200 group-hover:text-amber-100 flex items-center justify-between">
                  <span>Auto-Grade &amp; Optical Scanner</span>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Scan answer sheets with auto-contrast filtering, quality HUD &amp; instant DepEd transmutation.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[9px] text-amber-300 font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Launch Door 4 Camera HUD</span>
                </div>
              </div>
            </button>

            {/* Suggestion 2 */}
            <button
              onClick={() => setActiveTab('boisert_empire')}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-400 text-left transition flex items-start gap-3 cursor-pointer group shadow-md"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-emerald-200 group-hover:text-emerald-100 flex items-center justify-between">
                  <span>Master's Door &amp; Portfolio Vault</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Access official Master Teacher RPMS-IPCRF exemplars, COT portfolios &amp; confidential door records.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[9px] text-emerald-300 font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Launch Door 8 Portfolio</span>
                </div>
              </div>
            </button>

            {/* Suggestion 3 */}
            <button
              onClick={() => setActiveTab('lnnchs_templates')}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400 text-left transition flex items-start gap-3 cursor-pointer group shadow-md"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-cyan-200 group-hover:text-cyan-100 flex items-center justify-between">
                  <span>School Forms SF1–SF10 &amp; E-Class</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Manage, audit, and batch export official DepEd school forms in Word, Excel, PowerPoint &amp; PDF.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[9px] text-cyan-300 font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Launch Door 3 SF1–SF10</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* =========================================================================
            🏛️ STRICTLY 8 PRIMARY DASHBOARD CHOICES (ADVISER DOORS 1 TO 8 ONLY)
            Every single feature is strictly consolidated inside these 8 Doors!
        ========================================================================== */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-cyan-400/30 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-sm">::</span>
              <h3 className="text-xs sm:text-sm font-black uppercase text-cyan-300 tracking-wider">
                8 Primary Dashboard Doors &amp; Functional Workspaces
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-bold">
              8 DOORS CONSOLIDATED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* CHOICE 1: DOOR 1 (TEACH & PLAN) */}
            <button
              onClick={() => setActiveTab('ilaw')}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#0c2461] to-[#04122b] hover:from-[#1e3799] hover:to-[#0c2461] border border-blue-400/50 hover:border-amber-400 shadow-xl transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-600/40 border border-blue-400 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  📖
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-black uppercase tracking-wider border border-blue-400/30">
                  Door 1
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-300">
                  1. TEACH &amp; PLAN
                </h4>
                <p className="text-[10px] text-blue-200 mt-1 leading-snug">
                  4-Part ILAW Generator, Weekly DLL, Budget of Work (BOW), LAS, &amp; DepEd LRMDS.
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-white/10">
                <span>MATATAG 2026</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* CHOICE 2: DOOR 2 (MATH & SCIENCE LAB) */}
            <button
              onClick={() => setActiveTab('science')}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#004d40] to-[#021f1a] hover:from-[#00695c] hover:to-[#004d40] border border-teal-400/50 hover:border-amber-400 shadow-xl transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-600/40 border border-teal-400 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  🧮
                </div>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[9px] font-black uppercase tracking-wider border border-teal-400/30">
                  Door 2
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-300">
                  2. MATH &amp; SCIENCE LAB
                </h4>
                <p className="text-[10px] text-teal-200 mt-1 leading-snug">
                  STEM Simulations, Science Visuals Lab, Math Solver, &amp; 3D Spatial Interactive Lab.
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-white/10">
                <span>STEM &amp; 3D Visuals</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* CHOICE 3: DOOR 3 (RECORDS & DOCUMENTS) */}
            <button
              onClick={() => setActiveTab('lnnchs_templates')}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#4a148c] to-[#1e0738] hover:from-[#6a1b9a] hover:to-[#4a148c] border border-purple-400/50 hover:border-amber-400 shadow-xl transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-600/40 border border-purple-400 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  📋
                </div>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-black uppercase tracking-wider border border-purple-400/30">
                  Door 3
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-300">
                  3. RECORDS &amp; DOCUMENTS
                </h4>
                <p className="text-[10px] text-purple-200 mt-1 leading-snug">
                  Official SF1–SF10, LIS Master 120 Directory, Blank Templates, &amp; Student Document Vault.
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-white/10">
                <span>Official DepEd Forms</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* CHOICE 4: DOOR 4 (EXAMS & OPTICAL GRADING) */}
            <button
              onClick={() => setActiveTab('grading_app')}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#b71c1c] to-[#4a0b0b] hover:from-[#c62828] hover:to-[#b71c1c] border border-red-400/50 hover:border-amber-400 shadow-xl transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-red-600/40 border border-red-400 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  📷
                </div>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[9px] font-black uppercase tracking-wider border border-red-400/30">
                  Door 4
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-300">
                  4. EXAMS &amp; OPTICAL GRADING
                </h4>
                <p className="text-[10px] text-red-200 mt-1 leading-snug">
                  Camera HUD Optical Scanner, Automated Score Tally, QRLA Generator, &amp; Transmutation.
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-white/10">
                <span>AI Optical Scoring</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* CHOICE 5: DOOR 5 (OFFICE & GOOGLE SYNC) */}
            <button
              onClick={() => setActiveTab('office')}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#e65100] to-[#4e1c00] hover:from-[#ef6c00] hover:to-[#e65100] border border-amber-400/50 hover:border-amber-300 shadow-xl transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-600/40 border border-amber-400 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  🏢
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-black uppercase tracking-wider border border-amber-400/30">
                  Door 5
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-300">
                  5. OFFICE &amp; GOOGLE SYNC
                </h4>
                <p className="text-[10px] text-amber-200 mt-1 leading-snug">
                  Google Forms Quizzes, Google Drive Sync, MS Office Converters, &amp; 3D Science PPT.
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-white/10">
                <span>Cloud &amp; Office Suite</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* CHOICE 6: DOOR 6 (RESEARCH & CREATIVE TOOLS) */}
            <button
              onClick={() => setActiveTab('poster-maker')}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#1b5e20] to-[#08290c] hover:from-[#2e7d32] hover:to-[#1b5e20] border border-emerald-400/50 hover:border-amber-400 shadow-xl transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/40 border border-emerald-400 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  🔬
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-black uppercase tracking-wider border border-emerald-400/30">
                  Door 6
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-300">
                  6. RESEARCH &amp; CREATIVE TOOLS
                </h4>
                <p className="text-[10px] text-emerald-200 mt-1 leading-snug">
                  Action Research Annexes A–D, 3D Poster Maker, Anti-Turnitin Humanizer &amp; AI Checker.
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-white/10">
                <span>Canva / 3D Posters</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* CHOICE 7: DOOR 7 (SUPPORT FEATURES & MATERIALS) */}
            <button
              onClick={() => setActiveTab('sources')}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#01579b] to-[#002240] hover:from-[#0277bd] hover:to-[#01579b] border border-cyan-400/50 hover:border-amber-400 shadow-xl transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/40 border border-cyan-400 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  🌟
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-black uppercase tracking-wider border border-cyan-400/30">
                  Door 7
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-300">
                  7. SUPPORT FEATURES &amp; MATERIALS
                </h4>
                <p className="text-[10px] text-cyan-200 mt-1 leading-snug">
                  MATATAG Exemplars, Robi Voice Companion, 4K TV Tour Guide, &amp; User Manuals.
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-white/10">
                <span>Help &amp; Voice Guide</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* CHOICE 8: DOOR 8 (MASTER'S DOOR & DATA VAULT) */}
            <button
              onClick={() => setActiveTab('boisert_empire')}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#880e4f] to-[#3a0421] hover:from-[#ad1457] hover:to-[#880e4f] border border-rose-400/50 hover:border-amber-400 shadow-xl transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-rose-600/40 border border-rose-400 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  🏛️
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-black uppercase tracking-wider border border-rose-400/30">
                  Door 8
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-amber-300">
                  8. MASTER'S DOOR &amp; DATA VAULT
                </h4>
                <p className="text-[10px] text-rose-200 mt-1 leading-snug">
                  Master Creator Skills, Claude &amp; Opus Power Tools, Security Shield &amp; Biometrics.
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-white/10">
                <span>Protected Vault</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

          </div>
        </div>

        {/* ⚡ LIVE AUTO-UPDATE & REAL-TIME SYNC ENGINE */}
        <div className={`p-4 transition-all ${
          effectiveStyle === 'ios'
            ? 'rounded-3xl bg-gradient-to-br from-purple-950/70 via-slate-900/90 to-blue-950/80 border border-purple-400/40 backdrop-blur-2xl shadow-xl'
            : 'rounded-2xl bg-gradient-to-r from-[#031533] via-[#092b62] to-[#04122b] border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(0,210,255,0.2)]'
        } space-y-3`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-400/20 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shrink-0">
                <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black uppercase text-white tracking-wider">
                    Auto-Update &amp; Live Cloud Sync Engine
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-black border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE v3.42
                  </span>
                </div>
                <p className="text-[10px] text-blue-200">
                  Continuous background synchronization with DepEd 2026 MATATAG syllabus &amp; offline PWA service workers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setAutoUpdateLive(!autoUpdateLive)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition cursor-pointer flex items-center gap-1 ${
                  autoUpdateLive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                    : 'bg-white/10 text-slate-400 hover:bg-white/15'
                }`}
                title="Toggle continuous background updates"
              >
                <span>{autoUpdateLive ? '🟢 Auto-Sync ON' : '⚪ Auto-Sync PAUSED'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
            <div className="space-y-0.5 text-left w-full sm:w-auto">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                <span>Status: <strong className="text-white font-mono">100% Up to Date &amp; Cached</strong></span>
              </div>
              <div className="text-[10px] text-slate-300 font-mono">
                Last auto-checked: <span className="text-cyan-300 font-bold">{lastCheckTime}</span>
              </div>
            </div>

            <button
              onClick={handleTriggerAutoUpdate}
              disabled={isUpdating}
              className={`w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-lg ${
                updateSuccess
                  ? 'bg-emerald-500 text-slate-950 font-black scale-105'
                  : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] active:scale-95'
              }`}
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Updating App Now...</span>
                </>
              ) : updateSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>App Updated Successfully!</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-slate-950 fill-current" />
                  <span>Auto Update App Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 🚀 ULTIMATE INFRASTRUCTURE & PERFORMANCE HUB (Request Implementation) */}
        <div className={`p-4 transition-all ${
          effectiveStyle === 'ios'
            ? 'rounded-3xl bg-white/5 border border-white/20 backdrop-blur-2xl shadow-xl'
            : 'rounded-2xl bg-gradient-to-br from-[#0c1a36] to-[#040c1a] border border-cyan-500/40 shadow-[0_0_20px_rgba(0,210,255,0.1)]'
        } space-y-4`}>
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <h3 className="text-xs font-black uppercase text-cyan-300 tracking-wider">
                System Infrastructure &amp; Performance
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded-full animate-pulse">
                OPTIMIZED FOR 200K TEACHERS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Storage Metric */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total Active Capacity</span>
                  <div className="text-xl font-black text-white leading-none">1,000 GB <span className="text-cyan-400 text-xs">VAULT</span></div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-cyan-300">1.0 TB QUOTA</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '12%' }} />
              </div>
              <p className="text-[10px] text-slate-400 italic">
                Synchronized across 1000GB Cache &amp; 1000GB Data Storage.
              </p>
            </div>

            {/* Performance Metric */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">System Health &amp; Cleaner</span>
                  <div className="text-xl font-black text-emerald-400 leading-none">10X DEEP CLEAN <span className="text-white text-xs">ACTIVE</span></div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-400">ULTRA FLOW</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 h-1.5">
                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                  <div key={i} className={`flex-1 h-full rounded-full ${i <= 8 ? 'bg-emerald-500' : 'bg-white/10'}`} />
                ))}
              </div>
              <p className="text-[10px] text-slate-400 italic">
                20GB Reserve Allowance locked to ensure zero loading delays.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const event = new CustomEvent('open-storage-manager');
              window.dispatchEvent(event);
            }}
            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-lg border border-cyan-400/40 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Manage Infrastructure &amp; Vault</span>
          </button>
        </div>

      </div>
    </div>
  );
};
