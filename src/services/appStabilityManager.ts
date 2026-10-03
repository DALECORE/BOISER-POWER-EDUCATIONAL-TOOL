import { useEffect, useRef } from 'react';
import { neuralSentinel } from './boiserNeuralSentinelService';

/**
 * BOISER STABILITY ENGINE (BSE) & GOOGLE AI STUDIO NEURAL SENTINEL
 * 24-Hour Hidden Cache Cleaning & AI-Supervised Error-Free Performance Monitoring
 * Designed to maintain zero-lag operation for the LNNCHS Educational Suite.
 */

const CLEAN_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 Hours
const STABILITY_KEY = 'lnnchs_stability_last_clean';
const LAST_TWO_HOUR_CLEAN_KEY = 'boiser_last_2hour_clean';

export const useAppStabilityManager = () => {
  const stabilityRef = useRef<{ cleaning: boolean }>({ cleaning: false });

  const performHiddenCleaning = async (type: 'nightly' | 'periodic') => {
    if (stabilityRef.current.cleaning) return;
    stabilityRef.current.cleaning = true;

    const timeLabel = type === 'nightly' ? 'NIGHTLY (2AM-5AM)' : 'PERIODIC (2-HOUR)';
    console.log(`--- [BSE & AI SENTINEL] STARTING SILENT ${timeLabel} CACHE PURGE & DIAGNOSTICS ---`);
    
    // Run AI Neural Sentinel diagnostics & auto-healing
    try {
      const report = await neuralSentinel.runSentinelDiagnostics();
      console.log('--- [AI SENTINEL REPORT] ---', report);
    } catch (e) {
      console.warn('[AI Sentinel] Diagnostics notice:', e);
    }

    // Keys that must NEVER be touched during silent cleaning to avoid disturbing user activity
    const protectedKeys = [
      'lnnchs_auth_token', 
      'lnnchs_user_profile', 
      'lnnchs_managed_sections',
      'boiser_draft_vault',
      'boiser_saved_projects',
      'lnnchs_adviser_doors_db',
      'boiser_school_templates',
      'boiser_savings_mode_vault'
    ];
    
    try {
      let purgedCount = 0;
      // 1. Purge transient non-essential render buffers and old logs
      const transientPatterns = [
        'temporary_preview_buffer',
        'lnnchs_temp_filter',
        'last_tts_voice_cache',
        'temp_search_history',
        'boiser_temp_export_cache',
        'boiser_temp_render_cache',
        'boiser_scratchpad_buffer',
        'boiser_session_logs',
        'tmp_',
        '_cache'
      ];

      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && !protectedKeys.some(pk => key.includes(pk))) {
          if (transientPatterns.some(pattern => key.includes(pattern))) {
            localStorage.removeItem(key);
            purgedCount++;
          }
        }
      }

      // 2. Also clean CacheStorage (IndexedDB based caches) silently
      if ('caches' in window) {
        caches.keys().then(keys => {
          keys.forEach(key => {
            if (key.includes('temp') || key.includes('preview-buffer') || key.includes('old-render')) {
              caches.delete(key);
            }
          });
        });
      }

      // Simulation of background optimization period
      setTimeout(() => {
        stabilityRef.current.cleaning = false;
        const now = Date.now();
        if (type === 'nightly') {
          localStorage.setItem(STABILITY_KEY, now.toString());
        } else {
          localStorage.setItem(LAST_TWO_HOUR_CLEAN_KEY, now.toString());
        }
        console.log(`--- [BSE & AI SENTINEL] SILENT ${timeLabel} CLEANING COMPLETE (${purgedCount} items) ---`);
      }, 5000); 

    } catch (e) {
      console.error('[BSE] Stability Engine Error:', e);
      stabilityRef.current.cleaning = false;
    }
  };

  useEffect(() => {
    const checkAndRunCleaning = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentTimeMs = now.getTime();

      // 1. NIGHTLY CLEANING CHECK (2 AM - 5 AM)
      const lastNightlyClean = localStorage.getItem(STABILITY_KEY);
      const isNightlyWindow = currentHour >= 2 && currentHour < 5;
      
      if (isNightlyWindow) {
        const lastCleanDate = lastNightlyClean ? new Date(parseInt(lastNightlyClean)) : null;
        const isAlreadyCleanedToday = lastCleanDate && 
          lastCleanDate.getDate() === now.getDate() && 
          lastCleanDate.getMonth() === now.getMonth();

        if (!isAlreadyCleanedToday) {
          performHiddenCleaning('nightly');
        }
      }

      // 2. PERIODIC 2-HOUR CLEANING CHECK
      const lastTwoHourClean = localStorage.getItem(LAST_TWO_HOUR_CLEAN_KEY);
      const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

      if (!lastTwoHourClean || (currentTimeMs - parseInt(lastTwoHourClean)) >= TWO_HOURS_MS) {
        performHiddenCleaning('periodic');
      }
    };

    // Run initial check
    checkAndRunCleaning();

    // Set up recurring check every 15 minutes (to catch windows accurately without heavy polling)
    const interval = setInterval(checkAndRunCleaning, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    triggerManualMaintenance: () => performHiddenCleaning('periodic')
  };
};
