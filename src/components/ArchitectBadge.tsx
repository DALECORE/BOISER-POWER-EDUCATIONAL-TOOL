import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export const ArchitectBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-950 text-indigo-100 rounded-full border border-indigo-700/50 shadow-lg text-[10px] font-bold">
      <Brain className="w-3.5 h-3.5 text-indigo-400" />
      <span>BRAIN/ARCHITECT: STEAVEN KINTH D. BOISER</span>
      <Sparkles className="w-3 h-3 text-amber-400" />
    </div>
  );
};
