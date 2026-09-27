import React, { createContext, useContext, useState, useEffect } from 'react';

export type UiStyleMode = 'auto' | 'android' | 'ios' | 'desktop';
export type EffectiveUiStyle = 'android' | 'ios' | 'desktop';

interface ThemeStyleContextType {
  uiStyle: UiStyleMode;
  effectiveStyle: EffectiveUiStyle;
  setUiStyle: (mode: UiStyleMode) => void;
  detectedOS: EffectiveUiStyle;
}

const ThemeStyleContext = createContext<ThemeStyleContextType | undefined>(undefined);

export const ThemeStyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uiStyle, setUiStyleState] = useState<UiStyleMode>(() => {
    const saved = localStorage.getItem('boiser_ui_style_mode');
    return (saved as UiStyleMode) || 'auto';
  });

  const [detectedOS, setDetectedOS] = useState<EffectiveUiStyle>('desktop');

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    const isAndroidDevice = /android/.test(ua);

    if (isAndroidDevice) {
      setDetectedOS('android');
    } else if (isIOSDevice) {
      setDetectedOS('ios');
    } else {
      setDetectedOS('desktop');
    }
  }, []);

  const setUiStyle = (mode: UiStyleMode) => {
    setUiStyleState(mode);
    localStorage.setItem('boiser_ui_style_mode', mode);
  };

  const effectiveStyle: EffectiveUiStyle = uiStyle === 'auto' ? detectedOS : uiStyle;

  return (
    <ThemeStyleContext.Provider value={{ uiStyle, effectiveStyle, setUiStyle, detectedOS }}>
      {children}
    </ThemeStyleContext.Provider>
  );
};

export const useThemeStyle = () => {
  const context = useContext(ThemeStyleContext);
  if (!context) {
    throw new Error('useThemeStyle must be used within a ThemeStyleProvider');
  }
  return context;
};
