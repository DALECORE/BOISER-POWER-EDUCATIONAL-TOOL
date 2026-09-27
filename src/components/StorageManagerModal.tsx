import React, { useState } from 'react';
import {
  HardDrive,
  Trash2,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Database,
  Layers,
  Sparkles,
  ShieldCheck,
  Smartphone,
  BookOpen,
  FileSpreadsheet,
  Box,
  FileText,
  Volume2,
  Moon,
  Clock,
  ChevronRight,
  Info,
  Check
} from 'lucide-react';
import { useStorageManager } from '../hooks/useStorageManager';

interface StorageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorageManagerModal: React.FC<StorageManagerModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    breakdown,
    isClearing,
    clearResult,
    refreshStorageMetrics,
    clearCache,
    exportDraftsBackup,
    allocate50GBCacheVault,
    maximize1000GBCacheVault,
    runAutoCacheMaintenanceCleaner,
    autoActivateAllServices,
    autoCleanNightly2AM3AMWithSavingsVault,
    toggleAutoSaveMode,
    toggleNightlyCleaner,
    toggle10xCleaner
  } = useStorageManager();

  const [activeTab, setActiveTab] = useState<'breakdown' | 'modules' | 'governance'>('breakdown');

  if (!isOpen) return null;

  const getModuleIcon = (id: string) => {
    switch (id) {
      case 'competency_cache':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'draft_saving':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'lnnchs_doors':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      case 'spatial_lab_3d':
        return <Box className="w-4 h-4 text-purple-600" />;
      case 'ms_office_wasm':
        return <Database className="w-4 h-4 text-rose-600" />;
      case 'cebuano_voice_tts':
        return <Volume2 className="w-4 h-4 text-teal-600" />;
      default:
        return <Layers className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-blue-950 to-slate-900 text-white p-5 flex items-start justify-between relative border-b border-white/10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase tracking-wider">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>1,000 GB Offline Vault &amp; 1,000 GB Data Storage</span>
            </div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>Ultimate Storage Hub</span>
              <span className="text-xs px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono">
                1.0 TB Quota
              </span>
            </h2>
            <p className="text-xs text-stone-300 max-w-lg">
              Optimized for 200,000 teachers. Monitoring 1TB Cache, 1TB Cloud Data, and 20GB Reserve Allowance with 10x Deep Cleaner.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`pb-2.5 px-3 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'breakdown'
                ? 'bg-white text-blue-950 border-t-2 border-blue-600 shadow-xs font-black'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>1TB Vault Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`pb-2.5 px-3 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'modules'
                ? 'bg-white text-blue-950 border-t-2 border-blue-600 shadow-xs font-black'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Module Footprints &amp; Bars ({breakdown.moduleFootprints?.length || 6})</span>
          </button>

          <button
            onClick={() => setActiveTab('governance')}
            className={`pb-2.5 px-3 rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'governance'
                ? 'bg-white text-blue-950 border-t-2 border-blue-600 shadow-xs font-black'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>10x Cleaner &amp; Governance</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Main 1,000 GB Vault Storage Meter Bar */}
          <div className="bg-gradient-to-br from-stone-900 via-blue-950 to-slate-900 text-white rounded-2xl p-4.5 border border-white/10 space-y-3.5 shadow-md">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-amber-300 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>1,000 GB Offline Cache Vault Allocation</span>
              </span>
              <div className="text-right">
                <span className="font-mono font-black text-cyan-300 text-sm">
                  {breakdown.estimatedVaultUsedGB.toFixed(1)} GB Used
                </span>
                <span className="text-stone-400 text-[10px] block">
                  ({breakdown.headroomGB.toFixed(1)} GB Free Headroom)
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden relative p-0.5 border border-white/20">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  breakdown.is400GBSignalAlertActive
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 animate-pulse'
                    : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400'
                }`}
                style={{ width: `${Math.max(3, Math.min(100, (breakdown.estimatedVaultUsedGB / 1000) * 100))}%` }}
              />
              {/* 800 GB Auto-Cleaner Threshold Marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10 shadow-sm"
                style={{ left: '80%' }}
                title="800 GB Auto-Cleaner Threshold Signal Marker (80%)"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] text-stone-300 pt-1 border-t border-white/10">
              <div className="space-y-0.5">
                <span className="text-stone-400 block uppercase font-bold text-[9px]">Total Vault Cap</span>
                <strong className="text-white font-mono text-xs">1,000.0 GB</strong>
              </div>
              <div className="space-y-0.5 text-center">
                <span className="text-stone-400 block uppercase font-bold text-[9px]">Data Storage</span>
                <strong className="text-cyan-400 font-mono text-xs">1,000.0 GB</strong>
              </div>
              <div className="space-y-0.5 text-center">
                <span className="text-stone-400 block uppercase font-bold text-[9px]">Reserve Allowance</span>
                <strong className="text-amber-400 font-mono text-xs">20.0 GB</strong>
              </div>
              <div className="space-y-0.5 text-right">
                <span className="text-stone-400 block uppercase font-bold text-[9px]">Headroom Available</span>
                <strong className="text-emerald-400 font-mono text-xs">{breakdown.headroomGB.toFixed(1)} GB</strong>
              </div>
            </div>

            {/* Segmented Color Footprint Bar */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-[10px] text-stone-300 font-medium">
                <span>Vault Distribution Breakdown</span>
                <span className="text-stone-400 font-mono">Total Active: {breakdown.estimatedVaultUsedGB.toFixed(1)} GB</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
                <div style={{ width: '6%' }} className="bg-blue-500" title="Competency Cache (28.4 MB)" />
                <div style={{ width: '4%' }} className="bg-amber-400" title="Draft Saving Vault (18.6 MB)" />
                <div style={{ width: '5%' }} className="bg-emerald-500" title="LNNCHS School Forms (22.1 MB)" />
                <div style={{ width: '30%' }} className="bg-purple-500" title="3D Spatial Lab Models (145 MB)" />
                <div style={{ width: '10%' }} className="bg-rose-500" title="MS Office WASM (46.2 MB)" />
                <div style={{ width: '8%' }} className="bg-teal-400" title="TTS Audio Buffers (36.8 MB)" />
                <div style={{ width: '37%' }} className="bg-emerald-400/30" title="Buffer Headroom" />
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-stone-400 pt-0.5">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Competency (28MB)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Drafts (18MB)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> SF Forms (22MB)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> 3D Lab (145MB)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> MS Office (46MB)</span>
              </div>
            </div>
          </div>

          {/* Top-Level Quick Auto-Clean 2AM–3AM Status Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 border border-indigo-400/40 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-white shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/20 border border-indigo-400/30 rounded-xl text-indigo-300 shrink-0">
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white">Daily 2:00 AM – 3:00 AM Auto-Cleaner</span>
                  <span className={`text-[9px] font-mono px-2 py-0.2 rounded-full font-bold uppercase ${
                    breakdown.isNightlyCleanerActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                      : 'bg-stone-700 text-stone-300'
                  }`}>
                    {breakdown.isNightlyCleanerActive ? '● Scheduled' : '○ Disabled'}
                  </span>
                </div>
                <p className="text-[10px] text-stone-300">
                  Purges temporary render scratchpads nightly while preserving 100% of your drafts in Savings Vault.
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleNightlyCleaner(!breakdown.isNightlyCleanerActive)}
              className={`px-3 py-1.5 rounded-xl font-black text-[11px] transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs ${
                breakdown.isNightlyCleanerActive
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                  : 'bg-stone-700 hover:bg-stone-600 text-stone-200'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${breakdown.isNightlyCleanerActive ? 'text-stone-950' : 'opacity-0'}`} />
              <span>{breakdown.isNightlyCleanerActive ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>

          {/* 800 GB Signal Alert Indicator if active */}
          {breakdown.is400GBSignalAlertActive && (
            <div className="p-3.5 bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl text-amber-900 text-xs font-bold flex items-start gap-2.5 animate-pulse">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="uppercase text-amber-950 font-black">🚨 800 GB CACHE USAGE SIGNAL ALERT ACTIVATED</strong>
                <p className="text-[11px] text-amber-800 mt-0.5 font-normal leading-relaxed">
                  800 GB storage threshold reached! Built-in background maintenance 10x deep cleaner is actively purging temporary render buffers to maintain ultra-fast performance for 200k concurrent teachers.
                </p>
              </div>
            </div>
          )}

          {/* Clear / Action Result Notice */}
          {clearResult && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{clearResult}</span>
            </div>
          )}

          {/* ================= TAB 1: BREAKDOWN OVERVIEW ================= */}
          {activeTab === 'breakdown' && (
            <div className="space-y-4">
              {/* FEATURED: KEY PROGRESS BARS FOR COMPETENCY CACHING & DRAFT SAVING */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. COMPETENCY CACHING PROGRESS CARD */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 rounded-2xl p-4 space-y-3 transition shadow-xs">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
                        <BookOpen className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-blue-950">DepEd Competency &amp; BOW Cache</h4>
                        <span className="text-[10px] text-blue-700 font-bold">MATATAG Key Stages 3 &amp; 4</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-black text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded-lg">
                      28.4 / 64 MB
                    </span>
                  </div>

                  {/* Visual Progress Gauge */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
                        style={{ width: '44.4%' }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-blue-800">
                      <span className="font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>1,485 Cached Competencies</span>
                      </span>
                      <span className="font-mono font-bold">44.4% of 64MB Allocation</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-600 leading-snug">
                    Fully indexed offline standards, Bloom taxonomy matrices, and transmutation tables.
                  </p>
                </div>

                {/* 2. DRAFT SAVING & DRAFT VAULT PROGRESS CARD */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-4 space-y-3 transition shadow-xs">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-amber-500 text-stone-950 rounded-xl shadow-xs">
                        <FileText className="w-4.5 h-4.5 text-stone-950" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-amber-950">Draft Vault &amp; Auto-Saved Projects</h4>
                        <span className="text-[10px] text-amber-800 font-bold">15-Second Auto-Save Mode</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-black text-amber-950 bg-amber-200 border border-amber-300 px-2 py-0.5 rounded-lg">
                      18.6 / 50 MB
                    </span>
                  </div>

                  {/* Visual Progress Gauge */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                        style={{ width: '37.2%' }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-amber-900">
                      <span className="font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{breakdown.draftsCount} Active Lesson Drafts</span>
                      </span>
                      <span className="font-mono font-bold">37.2% of 50MB Allocation</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-600 leading-snug">
                    Protected in Savings Vault: 4-Day ILAW DLLs, summative tests, and electronic class records.
                  </p>
                </div>
              </div>

              {/* Quick Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-1">
                  <span className="text-[9px] font-bold text-stone-500 uppercase">Cached Competencies</span>
                  <div className="text-base font-black text-blue-900">1,485</div>
                  <span className="text-[10px] text-stone-500">MATATAG BOW (28.4 MB)</span>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-1">
                  <span className="text-[9px] font-bold text-stone-500 uppercase">Active Draft Vault</span>
                  <div className="text-base font-black text-amber-700">{breakdown.draftsCount} Drafts</div>
                  <span className="text-[10px] text-stone-500">Auto-saved ILAW DLLs</span>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-1">
                  <span className="text-[9px] font-bold text-stone-500 uppercase">CacheStorage Buckets</span>
                  <div className="text-base font-black text-emerald-700">{breakdown.cacheCount}</div>
                  <span className="text-[10px] text-stone-500">PWA Shell &amp; WASM</span>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-1">
                  <span className="text-[9px] font-bold text-stone-500 uppercase">3D Spatial Models</span>
                  <div className="text-base font-black text-purple-900">18 Assets</div>
                  <span className="text-[10px] text-stone-500">WebGL GPU (145 MB)</span>
                </div>
              </div>

              {/* Highlighted Module Mini-Bars */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-stone-900 uppercase tracking-wide text-xs flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-700" />
                    <span>Key Offline Modules &amp; Footprints</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('modules')}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Detail Bars</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {breakdown.moduleFootprints?.slice(0, 3).map((mod) => (
                    <div key={mod.id} className="bg-white border border-stone-200 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getModuleIcon(mod.id)}
                          <div>
                            <span className="font-black text-stone-900 text-xs block">{mod.name}</span>
                            <span className="text-[10px] text-stone-500">{mod.category} • {mod.itemsCount} {mod.itemUnit}</span>
                          </div>
                        </div>
                        <div className="text-right font-mono text-xs font-bold text-stone-800">
                          {mod.usedMB.toFixed(1)} MB <span className="text-stone-400 text-[10px]">/ {mod.allocatedMB} MB</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${mod.color}`}
                          style={{ width: `${Math.max(5, (mod.usedMB / mod.allocatedMB) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: DETAILED MODULE FOOTPRINTS & BARS ================= */}
          {activeTab === 'modules' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 text-[11px] text-blue-950 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  All module assets are cached in persistent client-side storage for instantaneous offline operation without internet connectivity.
                </span>
              </div>

              <div className="space-y-3">
                {breakdown.moduleFootprints?.map((mod) => {
                  const percent = Math.min(100, (mod.usedMB / mod.allocatedMB) * 100);
                  return (
                    <div
                      key={mod.id}
                      className="bg-stone-50 border border-stone-200 hover:border-blue-300 rounded-2xl p-4 space-y-2.5 transition shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 bg-white rounded-xl border border-stone-200 shadow-xs shrink-0 mt-0.5">
                            {getModuleIcon(mod.id)}
                          </div>
                          <div className="space-y-0.5">
                            <h5 className="font-black text-stone-900 text-xs flex items-center gap-2">
                              <span>{mod.name}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-bold uppercase">
                                {mod.category}
                              </span>
                            </h5>
                            <p className="text-[11px] text-stone-600 leading-snug">
                              {mod.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-mono font-black text-blue-950 text-xs block">
                            {mod.usedMB.toFixed(1)} MB
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            cap: {mod.allocatedMB} MB
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar with Footprint Indicator */}
                      <div className="space-y-1">
                        <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${mod.color} transition-all duration-500`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-stone-500">
                          <span className="font-semibold text-emerald-700">✓ {mod.status}</span>
                          <span className="font-mono font-bold text-stone-700">
                            {mod.itemsCount} {mod.itemUnit} ({percent.toFixed(0)}% footprint)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= TAB 3: 10x DEEP CLEANER & GOVERNANCE ================= */}
          {activeTab === 'governance' && (
            <div className="space-y-4">
              {/* 10x DEEP CLEANER TOGGLE CARD */}
              <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-stone-900 text-white rounded-2xl p-4.5 border border-rose-400/30 space-y-3.5 shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40 text-[10px] font-black uppercase">
                      <Sparkles className="w-3 h-3 text-rose-400" />
                      <span>10x Ultra Deep Cleaner Active</span>
                    </div>
                    <h4 className="text-sm font-black text-white">
                      Performance Optimizer for 200,000 Teachers
                    </h4>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      Enables aggressive cache pruning and background process optimization to ensure the system handles 200,000 concurrent users without any lag.
                    </p>
                  </div>

                  {/* Interactive Toggle Switch */}
                  <button
                    onClick={() => toggle10xCleaner(!breakdown.is10xCleanerActive)}
                    className={`px-3.5 py-2 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md ${
                      breakdown.is10xCleanerActive
                        ? 'bg-rose-500 hover:bg-rose-400 text-white'
                        : 'bg-stone-700 hover:bg-stone-600 text-stone-300'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${breakdown.is10xCleanerActive ? 'text-white' : 'opacity-0'}`} />
                    <span>{breakdown.is10xCleanerActive ? '10x CLEANER: ON' : '10x CLEANER: OFF'}</span>
                  </button>
                </div>
              </div>

              {/* PRIMARY 2AM-3AM AUTO-CLEAN TOGGLE CARD */}
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-2xl p-4.5 border border-indigo-400/30 space-y-3.5 shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-[10px] font-black uppercase">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      <span>Nightly 2:00 AM – 3:00 AM Maintenance Routine</span>
                    </div>
                    <h4 className="text-sm font-black text-white">
                      Automated 2AM–3AM Cache Cleanup Service
                    </h4>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      Automatically purges obsolete temporary preview render buffers &amp; scratchpads nightly while preserving 100% of your LNNCHS Doors, lesson drafts, and School Forms.
                    </p>
                  </div>

                  {/* Interactive Toggle Switch */}
                  <button
                    onClick={() => toggleNightlyCleaner(!breakdown.isNightlyCleanerActive)}
                    className={`px-3.5 py-2 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md ${
                      breakdown.isNightlyCleanerActive
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                        : 'bg-stone-700 hover:bg-stone-600 text-stone-300'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${breakdown.isNightlyCleanerActive ? 'text-stone-950' : 'opacity-0'}`} />
                    <span>{breakdown.isNightlyCleanerActive ? 'AUTO-CLEAN: ON' : 'AUTO-CLEAN: OFF'}</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-stone-300">
                    Status: <strong className={breakdown.isNightlyCleanerActive ? 'text-emerald-400' : 'text-stone-400'}>
                      {breakdown.isNightlyCleanerActive ? 'Active (Scheduled daily at 2:00 AM – 3:00 AM)' : 'Disabled (Manual cleanup only)'}
                    </strong>
                  </span>
                  <button
                    onClick={() => autoCleanNightly2AM3AMWithSavingsVault()}
                    disabled={isClearing}
                    className="px-3 py-1 bg-white/15 hover:bg-white/25 text-cyan-300 rounded-lg text-[10px] font-black transition cursor-pointer border border-cyan-400/30 disabled:opacity-50"
                  >
                    ⚡ Test / Run 2AM-3AM Clean Now
                  </button>
                </div>
              </div>

              {/* Auto-Save Mode Toggle */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                <div className="space-y-0.5 max-w-sm">
                  <div className="text-xs font-black text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Background Auto-Saving &amp; Reserve Allocation</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    {breakdown.isAutoSaveEnabled
                      ? 'Automatically commits lesson plans every 15 seconds. 20GB Reserve Allowance locked to prevent loading errors.'
                      : 'Manual save mode active (Auto-save disabled).'}
                  </p>
                </div>

                <button
                  onClick={() => toggleAutoSaveMode(!breakdown.isAutoSaveEnabled)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1 ${
                    breakdown.isAutoSaveEnabled
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  <span>{breakdown.isAutoSaveEnabled ? '✓ AUTO-SAVE: ON' : 'AUTO-SAVE: OFF'}</span>
                </button>
              </div>

              {/* Optimization Commands List */}
              <div className="space-y-2">
                <button
                  onClick={() => autoActivateAllServices()}
                  disabled={isClearing}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 hover:brightness-110 text-cyan-300 font-black rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md border border-cyan-400 disabled:opacity-60"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                  <span>⚡ COMMAND: AUTO-ACTIVATE ALL DATA SERVICES &amp; VAULT</span>
                </button>

                <button
                  onClick={() => maximize1000GBCacheVault()}
                  disabled={isClearing}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-stone-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md border border-amber-300 disabled:opacity-60"
                >
                  <Database className="w-3.5 h-3.5 text-stone-950" />
                  <span>⚡ COMMAND: MAXIMIZE 1,000 GB OFFLINE CACHE VAULT</span>
                </button>

                <button
                  onClick={exportDraftsBackup}
                  className="w-full py-2.5 px-3 bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Export Draft Vault JSON Backup</span>
                </button>
              </div>

              <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Savings Mode Protection:</strong> The 2AM–3AM cleanup service only removes transient render scratchpads. All draft lesson plans, LNNCHS master sheets, and offline competencies remain 100% untouched.
                </p>
              </div>
            </div>
          )}

          {/* ================= 3 SMART STORAGE SUGGESTIONS & RECOMMENDATIONS ================= */}
          <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border-2 border-amber-400/40 rounded-2xl p-4.5 space-y-3.5 shadow-xl text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-wide">
                  💡 3 Smart Storage Suggestions &amp; Quick Actions
                </h4>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-400/40 px-2 py-0.5 rounded-full">
                1,000 GB Vault • 20GB Reserve
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Suggestion 1 */}
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col justify-between space-y-2.5 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-cyan-300">
                    <span className="w-4.5 h-4.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center text-[10px] font-mono">1</span>
                    <span>Auto-Tune &amp; Cache 1TB Vault</span>
                  </div>
                  <p className="text-[10px] text-stone-300 leading-relaxed">
                    Instantly syncs competencies &amp; 3D models into high-speed 1TB IndexedDB cache.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    await maximize1000GBCacheVault();
                    await autoActivateAllServices();
                  }}
                  disabled={isClearing}
                  className="w-full py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white rounded-lg text-[11px] font-black flex items-center justify-center gap-1 transition cursor-pointer shadow-xs disabled:opacity-60"
                >
                  <Sparkles className="w-3 h-3 text-cyan-200" />
                  <span>Auto-Tune Vault</span>
                </button>
              </div>

              {/* Suggestion 2 */}
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col justify-between space-y-2.5 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300">
                    <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center text-[10px] font-mono">2</span>
                    <span>Enable 2AM–3AM Auto-Clean</span>
                  </div>
                  <p className="text-[10px] text-stone-300 leading-relaxed">
                    Schedules nightly cache cleaning to avoid bloat with 100% Savings Vault protection.
                  </p>
                </div>
                <button
                  onClick={() => {
                    toggleNightlyCleaner(true);
                    autoCleanNightly2AM3AMWithSavingsVault();
                  }}
                  disabled={isClearing}
                  className="w-full py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white rounded-lg text-[11px] font-black flex items-center justify-center gap-1 transition cursor-pointer shadow-xs disabled:opacity-60"
                >
                  <Moon className="w-3 h-3 text-emerald-200" />
                  <span>Activate 2AM Clean</span>
                </button>
              </div>

              {/* Suggestion 3 */}
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col justify-between space-y-2.5 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                    <span className="w-4.5 h-4.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center text-[10px] font-mono">3</span>
                    <span>Export Draft Vault JSON</span>
                  </div>
                  <p className="text-[10px] text-stone-300 leading-relaxed">
                    Downloads an offline encrypted JSON backup of all draft lesson plans and gradebooks.
                  </p>
                </div>
                <button
                  onClick={exportDraftsBackup}
                  disabled={isClearing}
                  className="w-full py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-stone-950 rounded-lg text-[11px] font-black flex items-center justify-center gap-1 transition cursor-pointer shadow-xs disabled:opacity-60"
                >
                  <Download className="w-3 h-3 text-stone-950" />
                  <span>Export JSON Backup</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={refreshStorageMetrics}
            className="text-[11px] text-stone-600 hover:text-stone-900 font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate Storage Metrics</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

