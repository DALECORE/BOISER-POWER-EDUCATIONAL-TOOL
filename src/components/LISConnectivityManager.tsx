import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CloudUpload, AlertCircle } from 'lucide-react';

export const LISConnectivityManager: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Firebase automatically syncs pending writes here
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`fixed top-4 right-4 z-[100] flex items-center gap-3 px-4 py-2 rounded-2xl shadow-lg border ${isOnline ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-amber-500 text-stone-950 border-amber-300'}`}>
      {isOnline ? (
        <>
          <Wifi size={18} />
          <span className="text-xs font-black uppercase">LIS ONLINE — SYNC ACTIVE</span>
        </>
      ) : (
        <>
          <WifiOff size={18} />
          <span className="text-xs font-black uppercase">LIS OFFLINE — CHANGES QUEUED</span>
        </>
      )}
    </div>
  );
};
