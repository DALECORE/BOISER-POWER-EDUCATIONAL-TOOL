/**
 * BOISER Educational Voice Engine
 * Calm, clear, professional, and humble male voice synthesizer with clear pronunciation
 * and mandatory educational resource tagline appended to all voice messages.
 */

export const BOISER_MANDATORY_TAGLINE = 
  "ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES";

export interface VoiceOptions {
  appendTagline?: boolean;
  rate?: number; // 0.9: calm, steady, humble, and professional
  pitch?: number; // 0.9: warm, grounded adult male timbre
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Global active voice configuration settings
export interface VoiceProfileConfig {
  accent: 'Professional Male' | 'English Male';
  pitch: number;
  rate: number;
  volume: number;
  clearPronunciation: boolean;
}

export let currentVoiceConfig: VoiceProfileConfig = {
  accent: 'Professional Male',
  pitch: 1.0, // Humanoid standard natural timbre
  rate: 0.95,  // Humanoid standard natural pacing
  volume: 1.0,
  clearPronunciation: true
};

/**
 * Command function to immediately switch and tune the active tour guide voice profile
 */
export const executeSwitchToProfessionalMaleVoiceCommand = (
  customAnnouncement?: string,
  onComplete?: () => void
): void => {
  currentVoiceConfig = {
    accent: 'Professional Male',
    pitch: 0.9,
    rate: 0.9,
    volume: 1.0,
    clearPronunciation: true
  };

  const commandConfirmationText = customAnnouncement || 
    "Voice command activated! Tour guide is now set to a calm, clear, and professional male voice with clear pronunciation.";

  speakWithProfessionalMaleVoice(commandConfirmationText, {
    appendTagline: true,
    rate: currentVoiceConfig.rate,
    pitch: currentVoiceConfig.pitch,
    onEnd: onComplete,
    onError: onComplete
  });
};

export const executeSwitchToCebuanoMaleVoiceCommand = executeSwitchToProfessionalMaleVoiceCommand;

/**
 * Cleans text from raw markdown, asterisks, hash tags, and emojis so
 * speech pronunciation is natural, respectful, and smooth.
 */
export const cleanTextForVoice = (rawText: string): string => {
  if (!rawText) return '';
  
  // Clean dots, spaces and convert Steaven Kinth D. Boiser into "Steaven Kent D Boiser"
  let cleaned = rawText
    .replace(/Steaven\s+Kinth\s+D\.\s+Boiser/gi, 'Steaven Kent D Boiser')
    .replace(/Steaven\s+Kinth\s+D\s+Boiser/gi, 'Steaven Kent D Boiser')
    .replace(/Steaven\s+Kint\s+D\.\s+Boiser/gi, 'Steaven Kent D Boiser')
    .replace(/Steaven\s+Kint\s+D\s+Boiser/gi, 'Steaven Kent D Boiser')
    .replace(/Steaven\s+Kinth/gi, 'Steaven Kent')
    .replace(/Steaven\s+Kint/gi, 'Steaven Kent')
    .replace(/STEAVEN\s+KINTH\s+D\.\s+BOISER/gi, 'Steaven Kent D Boiser')
    .replace(/D\.\s+Boiser/gi, 'D Boiser')
    .replace(/D\.\s+BOISER/gi, 'D Boiser')
    .replace(/KINTH/g, 'Kent')
    .replace(/Kinth/g, 'Kent')
    .replace(/kinth/g, 'kent')
    .replace(/Kint/g, 'Kent')
    .replace(/kint/g, 'kent')
    .replace(/K\.I\.N\.T\.H\.?/gi, 'Kent');

  // Convert ILAW into "ee-law"
  cleaned = cleaned
    .replace(/I\.L\.A\.W\.?/g, 'ee-law')
    .replace(/\bILAW\b/g, 'ee-law')
    .replace(/\bilaw\b/g, 'ee-law')
    .replace(/\bIlaw\b/g, 'ee-law');

  return cleaned
    .replace(/[*_~`#\-]/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/🛡️|⛔|🔒|🚨|🔍|👋|🌐|🎤|✨|📘|📊|📝|🚀|•|⚡|💖|📁|👥|🏢|🏆|📖|🚪|👑|👤/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Selects the optimal calm, clear, professional male voice.
 */
export const findProfessionalMaleVoice = (): SpeechSynthesisVoice | null => {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Prioritize ultra high-quality natural/neural humanoid voices
    const humanNeuralKeywords = ['natural', 'neural', 'google us english', 'google uk english male', 'siri', 'samantha', 'daniel', 'david', 'microsoft'];
    const premiumVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      return humanNeuralKeywords.some(kw => name.includes(kw)) && v.lang.startsWith('en');
    });
    if (premiumVoice) return premiumVoice;

    // 2. Look for standard male English voices
    const maleKeywords = ['male', 'george', 'mark', 'guy', 'james', 'richard'];
    const maleVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      return maleKeywords.some(kw => name.includes(kw)) && v.lang.startsWith('en');
    });
    if (maleVoice) return maleVoice;

    // 3. Fallback to standard English voice
    return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  } catch (err) {
    return null;
  }
};

/**
 * Authoritative global voice function.
 * Speaks text using a calm, clear, professional and humble male voice.
 * Automatically appends the required BOISER tagline.
 */
export const speakWithProfessionalMaleVoice = (
  text: string,
  options: VoiceOptions = {}
): void => {
  try {
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech safely
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancel error
    }

    const cleaned = cleanTextForVoice(text);
    const appendTag = options.appendTagline !== false;
    
    // Format with respectful pause before the mandatory tagline
    let fullText = cleaned;
    if (appendTag && !cleaned.toLowerCase().includes('enjoy learning with boiser')) {
      fullText = `${cleaned}. ${BOISER_MANDATORY_TAGLINE}`;
    }

    let utterance: SpeechSynthesisUtterance;
    try {
      if (typeof SpeechSynthesisUtterance === 'undefined') return;
      utterance = new SpeechSynthesisUtterance(fullText);
    } catch (err) {
      console.warn('SpeechSynthesisUtterance instantiation skipped:', err);
      options.onError?.(err);
      return;
    }

    const voice = findProfessionalMaleVoice();
    if (voice) {
      try {
        utterance.voice = voice;
      } catch {
        // Ignore voice assignment error
      }
    }

    utterance.rate = options.rate || currentVoiceConfig.rate;
    utterance.volume = currentVoiceConfig.volume;
    utterance.pitch = options.pitch || currentVoiceConfig.pitch;

    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Voice synthesis error safely caught:', err);
    options.onError?.(err);
  }
};

export const speakWithCebuanoMaleVoice = (
  text: string,
  options: VoiceOptions = {}
): void => {
  // Alias for backward compatibility and semantic clarity in Cebuano contexts
  speakWithProfessionalMaleVoice(text, options);
};

export const stopCebuanoMaleVoice = (): void => {
  stopProfessionalMaleVoice();
};

export const stopProfessionalMaleVoice = (): void => {
  try {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // Ignore cancel error
  }
};

/**
 * Rich Pre-scripted voice navigation walkthroughs for all app activities
 */
export type VoiceStyleKey = 'sweet_girl' | 'male' | 'baby' | 'grandma' | 'grandpa' | 'smart' | 'robi_domingo' | 'master_creator';
export type VoiceLanguageKey = 'en' | 'bis' | 'tl' | 'all';

export interface VoiceStyleDefinition {
  id: VoiceStyleKey;
  name: string;
  description: string;
  pitch: number;
  rate: number;
}

export const VOICE_STYLES: Record<VoiceStyleKey, VoiceStyleDefinition> = {
  sweet_girl: { id: 'sweet_girl', name: 'Toni Gonzaga Voice (Elegant & Articulate)', description: 'Warm, confident, inspiring, articulate female tone with gracious cadence', pitch: 1.3, rate: 0.98 },
  male: { id: 'male', name: 'Robi Domingo Voice (Smart & Articulate PBB Host)', description: 'Sharp, confident, crystal-clear, smart male tone with precise pronunciation', pitch: 0.88, rate: 0.92 },
  robi_domingo: { id: 'robi_domingo', name: 'Robi Domingo Voice (Smart PBB Host)', description: 'Crisp, professional, highly articulate, smart broadcast male tone', pitch: 0.88, rate: 0.92 },
  master_creator: { id: 'master_creator', name: 'Steaven Kent Boiser (Calm Cloned Voice)', description: 'Calm, steady, filtered Cebuano-accented voice cloned and tuned with custom audio characteristics', pitch: 0.85, rate: 0.84 },
  baby: { id: 'baby', name: 'Baby Voice', description: 'Playful, high-pitched, soft and simple phrasing', pitch: 1.8, rate: 1.1 },
  grandma: { id: 'grandma', name: 'Grandma Voice', description: 'Warm, slow, nurturing, slightly raspy elderly female tone', pitch: 0.7, rate: 0.75 },
  grandpa: { id: 'grandpa', name: 'Grandpa Voice', description: 'Warm, slow, wise, gravelly elderly male tone', pitch: 0.5, rate: 0.7 },
  smart: { id: 'smart', name: 'Smart Voice (Robi Domingo Pro Style)', description: 'Crisp, professional, articulate, smart broadcast tone', pitch: 0.9, rate: 0.95 }
};

export const TTS_PROMPT_TEMPLATE = `
---
Generate clear, calm, and naturally-paced narration for this user guide. Follow these settings:

**Language** choose to generate all:
- English
- Bisaya (Cebuano)
- Tagalog (Filipino)

**Pronunciation & Delivery (applies to all voices):**
- Speak clearly and at a moderate, easy-to-follow pace
- Calm, steady tone — no rushing
- Correct pronunciation of technical/product terms
- Natural pauses between steps or sections

**Voice Style (Interactive Choice):**
1. Sweet Girl Voice — warm, friendly, gentle, youthful female tone
2. Male Voice — confident, clear, neutral-to-warm male tone
3. Baby Voice — playful, high-pitched, soft and simple phrasing
4. Grandma Voice — warm, slow, nurturing, slightly raspy elderly female tone
5. Grandpa Voice — warm, slow, wise, gravelly elderly male tone
6. Smart Voice — crisp, professional, articulate, slightly formal tone

**Output instructions:**
- Read the user guide content exactly as written, adapting only tone/pacing to match the selected voice style
- Keep pronunciation clear regardless of style — playful tones (baby/grandma/grandpa) should not sacrifice clarity
- If Bisaya or Tagalog is selected, use natural regional pronunciation and intonation, not a direct word-for-word transliteration
---
`;

export const speakWithVoiceStyle = (
  text: string,
  styleKey: VoiceStyleKey = 'male',
  languageKey: VoiceLanguageKey = 'en',
  options: VoiceOptions = {}
): void => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const style = VOICE_STYLES[styleKey] || VOICE_STYLES.male;
  
  let narrationText = text;
  if (languageKey === 'bis' && !(text as any).bis) {
    narrationText = `[Cebuano Version] ${text}`;
  } else if (languageKey === 'tl' && !(text as any).tl) {
    narrationText = `[Tagalog Version] ${text}`;
  }

  speakWithCebuanoMaleVoice(narrationText, {
    ...options,
    pitch: style.pitch,
    rate: style.rate
  });
};
export const PRESET_VOICE_GUIDES = {
  welcome: "Maayong adlaw! With utmost respect and humility, welcome to Lanao del Norte National Comprehensive High School Power Education App. All institutional systems, Three-Term SF1 to SF10 records, and official DepEd Order Number 9, series of 2026 calendars are fully operational to serve your instructional and administrative duties.",

  userGuide: "Online User Guide and Standard Operating Procedures. To generate automated School Forms SF1 to SF10, navigate to the School Forms Hub, select your grade level, term, and section, then click Generate. To calculate Three-Term grades with automatic transmutation, open the Grading Engine. For Daily Lesson Plans aligned with DepEd Order Number 9, use the ILAW Exemplar Generator.",

  principals: "Executive School Leadership Doors. First is the Executive Door of Ma'am Anisah, Principal III, overseeing Senior High School institutional management and the School Improvement Plan. Second is the Office of Ma'am Joan J. Andot, Asst. Principal II for Senior High School Academic Affairs and teacher loading schedules. Third is the Office of Ma'am Alma Almazing L. Calibo, Head Teacher for Curriculum Quality Assurance, ILAW approvals, and instructional mentoring.",

  registrar: "Registrar Office Door. Official LIS student enrollment, electronic class records, transmutations, and permanent Form 137 records are verified and secured here.",

  teachers: "Resident Faculty Doors. Grade 11 and Grade 12 advisers have private, dedicated rooms for automated SF forms, Budget of Work generator, and confidential Student Document Vaults.",

  activities: "Classroom Activities and Instructional Tools. The app features the ILAW 4-Day Daily Lesson Log Exemplar Generator, TechPro TVL Directory, Science and Mathematics Interactive Lab, Review of Related Literature RRL Builder, and Canva Bridge for visual slide presentation exports.",

  googleWorkspace: "Google Workspace Integration. You can synchronize lesson plans and student portfolios directly to Google Drive, collaborate in real time with fellow teachers in Google Chat, and receive administrative memorandums securely via Gmail Manager.",

  security: "Institutional Real-Time Security Shield. Any suspicious attempt to alter data, inspect private databases, or perform unauthorized actions will automatically result in an immediate respectful logout and a 5-hour restriction. Re-activation is strictly upon the Official System Administrator's decision."
};
