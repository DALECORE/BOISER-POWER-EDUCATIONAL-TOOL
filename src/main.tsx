import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeStyleProvider } from './context/ThemeStyleContext.tsx';

import { executeApplyAllAppUpdatesCommand } from './services/appUpdateCommandService.ts';

// Expose global command executor
(window as any).applyAllAppUpdates = executeApplyAllAppUpdatesCommand;
(window as any).executeApplyAllAppUpdatesCommand = executeApplyAllAppUpdatesCommand;

import { FirebaseProvider } from './context/FirebaseContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        <ThemeStyleProvider>
          <App />
        </ThemeStyleProvider>
      </AuthProvider>
    </FirebaseProvider>
  </StrictMode>,
);

// Register PWA Service Worker unconditionally for PWA Installability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('PWA Service Worker registered with scope:', registration.scope);
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New PWA content available.');
            }
          };
        }
      };
    }).catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}
