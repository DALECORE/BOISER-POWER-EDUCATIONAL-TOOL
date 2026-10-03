import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Cpu, ShieldCheck, Zap, X, Globe, Database, Award, Activity } from 'lucide-react';
import { MASTER_HIGH_TECH_SKILLS, masterSkillsService } from '../services/boiserMasterSkillsEngine';

interface MasterSkillsHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAlert: (msg: string) => void;
}

export const MasterSkillsHubModal: React.FC<MasterSkillsHubModalProps> = ({ isOpen, onClose, onTriggerAlert }) => {
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [resultLog, setResultLog] = useState<string>('Ready to execute elite 15-in-1 Google AI Studio master skills.');

  if (!isOpen) return null;

  const handleRunSkill = (id: string, name: string) => {
    setExecutingId(id);
    setTimeout(() => {
      const res = masterSkillsService.executeSkillAction(id);
      setResultLog(`[${new Date().toLocaleTimeString()}] ${res}`);
      onTriggerAlert(`✓ Skill #${id.replace('skill-', '')} (${name}) Executed Successfully!`);
      setExecutingId(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b132b] border-2 border-cyan-400/50 rounded-3xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-[0_0_60px_rgba(0,210,255,0.35)] overflow-hidden text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-stone-900 p-6 border-b border-cyan-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.6)]">
              <Sparkles className="w-6 h-6 text-stone-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black uppercase tracking-wider text-cyan-300">15-in-1 Master High-Tech Skills Hub</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">AI Studio Pro</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">PPT, Excel, Research Scholar & Stability Suite by Master Creator Steaven Kinth D. Boiser</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="bg-cyan-950/40 border-b border-cyan-400/20 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="font-mono">{resultLog}</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">15 / 15 Advanced Skills Deployed</span>
        </div>

        {/* Skills Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MASTER_HIGH_TECH_SKILLS.map((skill) => (
            <div
              key={skill.id}
              className="bg-stone-900/80 border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-black text-xs flex items-center justify-center border border-cyan-500/40 font-mono">
                    #{skill.number}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-md bg-blue-950 text-cyan-300 border border-cyan-400/30">
                    {skill.category}
                  </span>
                </div>
                <h3 className="text-sm font-black text-white group-hover:text-cyan-300 transition">{skill.name}</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{skill.description}</p>
                <div className="mt-3 text-[11px] text-cyan-400/80 font-mono bg-stone-950/60 px-3 py-1.5 rounded-xl border border-stone-800">
                  🛠️ {skill.techStack}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {skill.status}
                </span>
                <button
                  onClick={() => handleRunSkill(skill.id, skill.name)}
                  disabled={executingId === skill.id}
                  className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-stone-950 font-black text-xs uppercase rounded-xl shadow-md border border-cyan-300 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  {executingId === skill.id ? (
                    <>
                      <Cpu className="w-3.5 h-3.5 animate-spin" />
                      <span>Running</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>{skill.actionLabel}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-stone-950 p-4 border-t border-cyan-400/30 flex items-center justify-between text-xs">
          <span className="text-slate-400">Master Creator Architecture • Google AI Studio • LNNCHS Portal</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-black uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg"
          >
            Close Hub
          </button>
        </div>

      </div>
    </div>
  );
};
