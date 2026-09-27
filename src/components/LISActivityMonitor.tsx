import React from 'react';
import { Activity, ShieldCheck, UserCheck, Clock } from 'lucide-react';
import { useAuth, REGISTRAR_SHS, REGISTRAR_JHS } from '../context/AuthContext';

interface LISActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  targetSection: string;
  authorizedBy: string;
}

export const LISActivityMonitor: React.FC<{ role: 'SHS' | 'JHS' }> = ({ role }) => {
  const { currentUser, isOwner } = useAuth();
  
  const isAuthorized = isOwner || 
                       (role === 'SHS' && currentUser.email === REGISTRAR_SHS) || 
                       (role === 'JHS' && currentUser.email === REGISTRAR_JHS);

  // Mock logs for demonstration - in production these would come from Firestore
  const logs: LISActivityLog[] = [
    {
      id: 'log-1',
      timestamp: new Date().toLocaleString(),
      user: 'Mrs. Roselyn Rufino',
      action: 'Updated SF1 Student Registry',
      targetSection: 'G11 Academic 1',
      authorizedBy: 'Adviser (Self)'
    },
    {
      id: 'log-2',
      timestamp: new Date().toLocaleString(),
      user: 'Sir Fiel',
      action: 'Verified LIS Enrollment Sync',
      targetSection: 'G12 SMAW 2',
      authorizedBy: 'Registrar'
    }
  ];

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-100 rounded-3xl">
        <ShieldCheck className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <h3 className="text-sm font-black text-red-900 uppercase">Access Denied</h3>
        <p className="text-xs text-red-700 mt-1">This activity monitoring node is restricted to authorized Registrars and the Master Creator.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">LIS & SF1 Activity Telemetry</h3>
              <p className="text-[10px] text-slate-500">Real-time audit log of enrollment and document modifications.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-widest border border-emerald-200">
              System Secure
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {logs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-slate-50/50 transition flex items-start gap-4">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 uppercase">{log.action}</span>
                  <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-blue-500" />
                    <span>User: <strong className="text-slate-700">{log.user}</strong></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-500" />
                    <span>Authorized: <strong className="text-slate-700">{log.authorizedBy}</strong></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Section: <strong className="text-slate-700">{log.targetSection}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
