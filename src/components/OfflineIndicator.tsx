import React, { useEffect, useState } from 'react';
import { WifiOff, AlertCircle } from 'lucide-react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 backdrop-blur-md bg-opacity-90">
        <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center animate-pulse">
          <WifiOff size={16} />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-tight">Offline Mode Active</h4>
          <p className="text-[10px] text-slate-400 font-medium">Using cached data. Some features like lesson generation may be limited.</p>
        </div>
      </div>
    </div>
  );
};
