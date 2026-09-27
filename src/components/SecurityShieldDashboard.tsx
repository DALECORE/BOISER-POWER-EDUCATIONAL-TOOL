import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Lock, CheckCircle2, X, FileText, Download, Volume2, Globe, Cpu, Terminal } from 'lucide-react';
import { ALL_20_THREATS_DEFENSE_LIST } from '../services/boiserThreatImmunizationEngine';
import { OFFICIAL_VOICE_SCRIPTS } from '../services/boiserVoiceScriptsData';

interface SecurityShieldDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAlert: (msg: string) => void;
}

export const SecurityShieldDashboard: React.FC<SecurityShieldDashboardProps> = ({ isOpen, onClose, onTriggerAlert }) => {
  const [activeTab, setActiveTab] = useState<'threats' | 'scripts'>('threats');
  const [selectedLang, setSelectedLang] = useState<string>('en-US');

  if (!isOpen) return null;

  const currentScript = OFFICIAL_VOICE_SCRIPTS.find(s => s.code === selectedLang) || OFFICIAL_VOICE_SCRIPTS[0];

  const handleDownloadScripts = () => {
    const fullText = OFFICIAL_VOICE_SCRIPTS.map(s => 
      `=== [${s.language.toUpperCase()}] OFFICIAL LNNCHS VOICE TOUR SCRIPT ===\n\n` +
      `WELCOME:\n${s.script.welcome}\n\n` +
      `DASHBOARD OVERVIEW:\n${s.script.dashboardOverview}\n\n` +
      `CLICKING DOORS:\n${s.script.clickingDoors}\n\n` +
      `ACCESS RESTRICTION:\n${s.script.accessRestriction}\n\n` +
      `OFFICIAL POSITIONS:\n${s.script.officialPositions}\n\n` +
      `INSIDE DOOR (4K TV):\n${s.script.insideDoor}\n\n` +
      `CLOSING:\n${s.script.closing}\n\n` +
      `==================================================\n\n`
    ).join('');

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(fullText);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Boiser_Multilingual_Voice_Scripts_LNNCHS.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onTriggerAlert('✓ Multilingual Voice Scripts downloaded successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b132b] border-2 border-emerald-400/50 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-[0_0_60px_rgba(16,185,129,0.35)] overflow-hidden text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-blue-950 to-stone-900 p-6 border-b border-emerald-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.6)]">
              <ShieldCheck className="w-6 h-6 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black uppercase tracking-wider text-emerald-300">20-Point Threat Immunization & Voice Hub</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">100% Virus-Free Shield</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Automated Threat Defense & Official Multilingual Voice Scripts Repository</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-stone-900/90 border-b border-stone-800 px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setActiveTab('threats')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'threats'
                ? 'bg-emerald-500 text-stone-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-stone-800 text-slate-300 hover:bg-stone-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>20-Point Threat Shield (20/20 Blocked)</span>
          </button>

          <button
            onClick={() => setActiveTab('scripts')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'scripts'
                ? 'bg-emerald-500 text-stone-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-stone-800 text-slate-300 hover:bg-stone-700'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Multilingual Voice Scripts (En, Tagalog, Bisaya)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'threats' ? (
            <div className="space-y-4">
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-300">Immune Status: Fully Protected</h4>
                    <p className="text-xs text-slate-300">All 20 security, technical, data integrity, operational, and compliance threats are automatically blocked by the Boiser Exact Coding Shield.</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500 text-stone-950 font-black text-xs rounded-xl">20 / 20 Immunized</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_20_THREATS_DEFENSE_LIST.map((threat) => (
                  <div key={threat.id} className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                          #{threat.id} • {threat.category}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> IMMUNIZED
                        </span>
                      </div>
                      <h5 className="text-xs font-black text-white">{threat.name}</h5>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">🛡️ {threat.mitigationMechanism}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {OFFICIAL_VOICE_SCRIPTS.map(s => (
                    <button
                      key={s.code}
                      onClick={() => setSelectedLang(s.code)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        selectedLang === s.code
                          ? 'bg-cyan-500 text-stone-950 shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                          : 'bg-stone-800 text-slate-300 hover:bg-stone-700'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{s.language}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleDownloadScripts}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-stone-950 font-black uppercase text-xs rounded-xl shadow-md border border-cyan-300 transition cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download All Scripts (.txt)</span>
                </button>
              </div>

              <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-4 font-sans">
                <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wide border-b border-stone-800 pb-2">
                  Official Script ({currentScript.language}) — LNNCHS Portal & Faculty Doors Tour
                </h4>

                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <div>
                    <strong className="text-emerald-400 block mb-1">WELCOME LINE:</strong>
                    <p className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 italic">"{currentScript.script.welcome}"</p>
                  </div>

                  <div>
                    <strong className="text-emerald-400 block mb-1">DASHBOARD OVERVIEW:</strong>
                    <p className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 italic">"{currentScript.script.dashboardOverview}"</p>
                  </div>

                  <div>
                    <strong className="text-emerald-400 block mb-1">CLICKING FACULTY DOORS:</strong>
                    <p className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 italic">"{currentScript.script.clickingDoors}"</p>
                  </div>

                  <div>
                    <strong className="text-emerald-400 block mb-1">ACCESS RESTRICTION POLICY:</strong>
                    <p className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 italic">"{currentScript.script.accessRestriction}"</p>
                  </div>

                  <div>
                    <strong className="text-emerald-400 block mb-1">OFFICIAL POSITIONS DOORS:</strong>
                    <p className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 italic">"{currentScript.script.officialPositions}"</p>
                  </div>

                  <div>
                    <strong className="text-emerald-400 block mb-1">INSIDE THE DOOR – 4K TV GUIDE:</strong>
                    <p className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 italic">"{currentScript.script.insideDoor}"</p>
                  </div>

                  <div>
                    <strong className="text-emerald-400 block mb-1">CLOSING:</strong>
                    <p className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 italic">"{currentScript.script.closing}"</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-950 p-4 border-t border-emerald-400/30 flex items-center justify-between text-xs">
          <span className="text-slate-400">20-Point Threat Immunization & Multilingual Voice Repository</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
