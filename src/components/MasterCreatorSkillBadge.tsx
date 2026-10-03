import React from 'react';
import { Award } from 'lucide-react';

interface Props {
  skillName: string;
}

export const MasterCreatorSkillBadge: React.FC<Props> = ({ skillName }) => (
  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
    <Award className="w-3 h-3 text-amber-400" />
    <span className="text-[9px] font-black text-amber-100 uppercase tracking-wider">{skillName}</span>
  </div>
);
