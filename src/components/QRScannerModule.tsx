import React, { useState } from 'react';
import { QrCode, Camera, CheckCircle2, History, UserCheck, ShieldCheck, Download, Printer } from 'lucide-react';

interface AttendanceLog {
  id: string;
  name: string;
  time: string;
  status: 'In' | 'Out';
}

export const QRScannerModule: React.FC<{ sectionName: string }> = ({ sectionName }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<AttendanceLog[]>([
    { id: '1', name: 'Abad, Juan Carlos M.', time: '07:15 AM', status: 'In' },
    { id: '2', name: 'Alcantara, Sophia Grace D.', time: '07:22 AM', status: 'In' },
    { id: '3', name: 'Aquino, Mark Anthony S.', time: '07:30 AM', status: 'In' },
  ]);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newLog: AttendanceLog = {
        id: Math.random().toString(),
        name: 'Bautista, Maria Princess L.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'In'
      };
      setLogs([newLog, ...logs]);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-stone-900">QR Attendance & ID Scanner</h3>
            <p className="text-xs text-stone-500 uppercase font-black">Section: {sectionName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-black transition flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print All IDs
          </button>
          <button className="px-4 py-2 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-black shadow-lg transition flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-300" /> Export SF2 Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scanner Viewfinder */}
        <div className="lg:col-span-7 space-y-4">
          {/* BOISER Scanner Header Status Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#092B62] text-white rounded-2xl border border-[#0b4ea2] shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                BOISER AI SCANNER HUB
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black uppercase tracking-widest animate-pulse">
              <span>● Scanning</span>
            </div>
          </div>

          <div className="relative aspect-square sm:aspect-video rounded-3xl bg-slate-950 overflow-hidden border-4 border-[#0b4ea2] shadow-2xl flex flex-col items-center justify-center group">
            {/* Viewfinder Target Frame with #reader */}
            <div id="reader" className="w-full h-full absolute inset-0 overflow-hidden flex items-center justify-center">
              {isScanning ? (
                <div className="text-center space-y-4 animate-pulse z-10">
                  <div className="w-48 h-48 border-2 border-emerald-400 rounded-3xl flex items-center justify-center relative">
                    <div className="w-40 h-1 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent shadow-[0_0_15px_rgba(0,210,255,0.9)] animate-[scan_2s_ease-in-out_infinite]" />
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 z-10">
                  <div className="w-48 h-48 border-2 border-dashed border-slate-700 rounded-3xl flex items-center justify-center">
                    <Camera className="w-12 h-12 text-slate-700" />
                  </div>
                  <button 
                    onClick={simulateScan}
                    className="px-8 py-3 bg-gradient-to-r from-[#0038A8] to-[#0b4ea2] hover:from-blue-700 hover:to-blue-600 text-white font-black rounded-2xl text-xs shadow-xl transition transform hover:scale-105 active:scale-95 cursor-pointer border border-cyan-400/40"
                  >
                    START SCANNER
                  </button>
                </div>
              )}
            </div>
            
            {/* BOISER Viewfinder Corner Accents */}
            <div className="pointer-events-none absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#ffb700] rounded-tl-xl shadow-sm z-20" />
            <div className="pointer-events-none absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#ffb700] rounded-tr-xl shadow-sm z-20" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#ffb700] rounded-bl-xl shadow-sm z-20" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#ffb700] rounded-br-xl shadow-sm z-20" />

            {/* 🔴/🟢 CLEANLY POSITIONED 'Scanning...' STATUS LABEL ALIGNED WITH BOISER BRANDING */}
            <div className="absolute top-4 left-4 z-30 ml-8 mt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#092B62]/90 hover:bg-[#092B62] border border-[#0b4ea2] shadow-lg backdrop-blur-md transition">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                  {isScanning ? 'Scanning...' : 'Camera Standby'}
                </span>
              </div>
            </div>

            {/* Laser Line Overlay */}
            {isScanning && (
              <div className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent shadow-[0_0_15px_#00d2ff] animate-pulse z-20" />
            )}

            {/* Bottom HUD Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#092B62]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-400/30 shadow-lg z-20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-300 uppercase tracking-[0.15em]">BOISER AI VISION • OPTICAL HUD ACTIVE</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl border border-emerald-200 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-black text-emerald-900">Secure Entry Verification</h4>
              <p className="text-xs text-emerald-700">All scans are time-stamped and verified against the official LIS masterlist for LNNCHS.</p>
            </div>
          </div>
        </div>

        {/* Attendance Log */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex-1 bg-stone-50 rounded-3xl border border-stone-200 overflow-hidden flex flex-col shadow-inner">
            <div className="p-4 bg-white border-b border-stone-200 flex items-center justify-between">
              <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <History className="w-4 h-4 text-blue-600" />
                <span>Today's Attendance Log</span>
              </h4>
              <span className="text-[10px] font-bold text-stone-500">{logs.length} Learners Logged</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {logs.map((log, idx) => (
                <div key={log.id} className="p-3 bg-white border border-stone-100 rounded-2xl flex items-center justify-between shadow-xs transition hover:border-emerald-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-[10px]">
                      {idx === 0 ? <UserCheck className="w-4 h-4" /> : log.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-black text-stone-900 uppercase">{log.name}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{log.time} • {log.status}</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-white border-t border-stone-200 text-center">
              <button className="text-xs font-black text-blue-600 hover:text-blue-800 transition">View Full History</button>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#092B62] to-blue-900 text-white space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <QrCode className="w-4 h-4 text-amber-300" />
              <span>Generate Student QR IDs</span>
            </h5>
            <p className="text-[11px] text-blue-100 font-medium">Create printable identification cards for all students in {sectionName} with encrypted LRN barcodes.</p>
            <button className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl text-xs transition shadow-lg">
              GENERATE ALL IDS
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};
