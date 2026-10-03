import React, { useState } from 'react';
import { Award, Trophy, Lock, Unlock, FileCheck, BarChart3 } from 'lucide-react';
import { useAuth, REGISTRAR_SHS, REGISTRAR_JHS } from '../context/AuthContext';
import { GradeDistributionChart } from './GradeDistributionChart';

interface StudentSummary {
  id: string;
  name: string;
  grade: string;
  section: string;
  finalAverage: number;
}

export const AdminHonorsDashboard = ({ role }: { role: 'SHS' | 'JHS' }) => {
  const { currentUser, isOwner } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string>(role === 'SHS' ? '11' : '7');
  
  const isAuthorized = isOwner || 
                       (role === 'SHS' && currentUser.email === REGISTRAR_SHS) || 
                       (role === 'JHS' && currentUser.email === REGISTRAR_JHS) ||
                       currentUser.email === 'boisersteavenkinth@gmail.com' ||
                       currentUser.email === 'boisersteavenkinth@deped.gov.ph';

  // Realistic mock data for visualization
  const students: StudentSummary[] = [
    { id: '1', name: 'Abad, Juan Carlos M.', grade: '11', section: 'Academic 1', finalAverage: 98.2 },
    { id: '2', name: 'Alcantara, Sophia Grace D.', grade: '11', section: 'Academic 1', finalAverage: 96.5 },
    { id: '3', name: 'Aquino, Mark Anthony S.', grade: '11', section: 'Academic 2', finalAverage: 94.8 },
    { id: '4', name: 'Bautista, Maria Princess L.', grade: '11', section: 'TechPro 1', finalAverage: 91.2 },
    { id: '5', name: 'Castillo, John Lloyd R.', grade: '11', section: 'TechPro 2', finalAverage: 88.5 },
    { id: '6', name: 'Cruz, Princess Mae T.', grade: '11', section: 'Academic 3', finalAverage: 85.3 },
    { id: '7', name: 'Del Rosario, Angelo B.', grade: '11', section: 'Academic 4', finalAverage: 82.1 },
    { id: '8', name: 'Garcia, Mary Grace P.', grade: '11', section: 'TechPro 3', finalAverage: 79.4 },
    { id: '9', name: 'Mendoza, Christian Dave F.', grade: '11', section: 'TechPro 4', finalAverage: 76.8 },
    { id: '10', name: 'Ramos, Sittie Ayna G.', grade: '11', section: 'Academic 5', finalAverage: 74.2 },
    { id: '11', name: 'Reyes, Joshua K.', grade: '11', section: 'Academic 6', finalAverage: 71.5 },
    { id: '12', name: 'Santos, Gabriel H.', grade: '11', section: 'TechPro 5', finalAverage: 68.9 },
    { id: '13', name: 'Torres, Kimberly Joy J.', grade: '11', section: 'TechPro 6', finalAverage: 62.4 },
    { id: '14', name: 'Villanueva, Daniel L.', grade: '12', section: 'STEM 1', finalAverage: 99.1 },
    { id: '15', name: 'Navarro, Stephanie Nicole M.', grade: '12', section: 'STEM 2', finalAverage: 95.7 },
    { id: '16', name: 'Salazar, Vince Nicole O.', grade: '12', section: 'HUMSS 1', finalAverage: 89.9 },
    { id: '17', name: 'Mercado, Rhea Mae Q.', grade: '7', section: 'STE 7-A', finalAverage: 94.5 },
    { id: '18', name: 'Tan, Kenneth W.', grade: '7', section: 'STE 7-B', finalAverage: 92.3 },
    { id: '19', name: 'Lim, Christine Joy X.', grade: '8', section: 'STE 8-A', finalAverage: 91.1 },
  ];

  const filteredStudents = students.filter(s => s.grade === selectedLevel);
  const ranked = filteredStudents.sort((a, b) => b.finalAverage - a.finalAverage);
  const batchGrades = ranked.map(s => s.finalAverage);

  const getHonorTitle = (avg: number) => {
    if (avg >= 98) return 'With Highest Honors';
    if (avg >= 95) return 'With High Honors';
    if (avg >= 90) return 'With Honors';
    if (avg >= 75) return 'Passed';
    return 'Failed';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {['7', '8', '9', '10', '11', '12'].filter(l => role === 'SHS' ? Number(l) >= 11 : Number(l) < 11).map(l => (
                <button
                  key={l}
                  onClick={() => setSelectedLevel(l)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition ${selectedLevel === l ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
                >
                  Grade {l}
                </button>
              ))}
            </div>

            {isAuthorized && (
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg transition uppercase tracking-wider">
                <FileCheck size={14} /> Finalize Grade {selectedLevel} Honors
              </button>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Learner Name</th>
                  <th className="p-4">Section</th>
                  <th className="p-4">Final Average</th>
                  <th className="p-4">Category / Level of Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ranked.length > 0 ? ranked.map((s, i) => {
                  const honor = getHonorTitle(s.finalAverage);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${i < 3 ? 'bg-amber-100 text-amber-900' : 'text-slate-400'}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="p-4 font-black text-slate-900 uppercase">{s.name}</td>
                      <td className="p-4 font-bold text-slate-600">{s.section}</td>
                      <td className="p-4 font-mono font-black text-blue-900 text-sm">
                        {s.finalAverage.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg font-black uppercase text-[9px] ${
                          honor.includes('Highest') ? 'bg-amber-500 text-white shadow-sm' :
                          honor.includes('High') ? 'bg-blue-600 text-white shadow-sm' :
                          honor.includes('Honors') ? 'bg-emerald-600 text-white shadow-sm' :
                          honor === 'Passed' ? 'bg-blue-50 text-blue-600' :
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {honor}
                        </span>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                      No student records found for Grade {selectedLevel}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:w-[350px]">
          <GradeDistributionChart grades={batchGrades} />
        </div>
      </div>
    </div>
  );
};
