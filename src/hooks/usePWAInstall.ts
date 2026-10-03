import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export type DetectedPlatform = 'ios' | 'android' | 'desktop' | 'unknown' | 'windows' | 'mac' | 'linux';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [platform, setPlatform] = useState<DetectedPlatform>('unknown');
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed' | 'failed'>('idle');

  useEffect(() => {
    // Detect standalone mode (already installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);
    if (isStandalone) {
      setInstallStatus('installed');
    }

    // Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isAndroidDevice = /android/.test(userAgent);
    const isWindows = /win/.test(userAgent);
    const isMac = /mac/.test(userAgent) && !isIOSDevice;
    const isLinux = /linux/.test(userAgent) && !isAndroidDevice;
    const isMobileDevice = isIOSDevice || isAndroidDevice || /mobi|tablet|opera mini/.test(userAgent);

    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);
    setIsMobile(isMobileDevice);

    if (isIOSDevice) {
      setPlatform('ios');
    } else if (isAndroidDevice) {
      setPlatform('android');
    } else if (isWindows) {
      setPlatform('windows');
    } else if (isMac) {
      setPlatform('mac');
    } else if (isLinux) {
      setPlatform('linux');
    } else if (isMobileDevice) {
      setPlatform('android'); // default mobile to android-like if mobile
    } else {
      setPlatform('desktop');
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setInstallStatus('installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;
    setInstallStatus('installing');
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        setInstallStatus('installed');
        return true;
      } else {
        setInstallStatus('idle');
      }
    } catch (err) {
      console.error('PWA Installation failed:', err);
      setInstallStatus('failed');
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    installStatus,
    setInstallStatus,
    platform,
    isIOS,
    isAndroid,
    isMobile,
    install,
    hasDeferredPrompt: !!deferredPrompt
  };
}
