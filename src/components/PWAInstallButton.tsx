import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Info } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Download className="w-4 h-4 text-[#FCD116]" />
        <span>Install Boiser App</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-blue-600" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-900">Install on iPhone / iPad</h3>
                <button onClick={() => setShowIOSGuide(false)} className="p-1 hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">1</div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Tap the <strong className="text-slate-900">Share</strong> button in the Safari toolbar (usually at the bottom).
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">2</div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Scroll down and tap <strong className="text-slate-900">Add to Home Screen</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-3 bg-amber-50 border border-amber-100 rounded-2xl flex gap-2">
                <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-[11px] text-amber-800 font-medium">This allows the app to work offline and provides more screen space!</p>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-2xl bg-slate-900 py-3 text-sm font-black text-white hover:bg-slate-800 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
