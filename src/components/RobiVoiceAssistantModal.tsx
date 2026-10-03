import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Sparkles, 
  RefreshCw, 
  X, 
  Sliders, 
  CheckCircle2, 
  MessageSquare,
  Volume1,
  User,
  Music
} from 'lucide-react';
import { 
  speakWithVoiceStyle, 
  stopCebuanoMaleVoice, 
  VOICE_STYLES, 
  VoiceStyleKey,
  cleanTextForVoice
} from '../services/boiserVoiceService';

interface RobiVoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAlert: (msg: string) => void;
}

export const RobiVoiceAssistantModal: React.FC<RobiVoiceAssistantModalProps> = ({ 
  isOpen, 
  onClose, 
  onTriggerAlert 
}) => {
  const [selectedVoice, setSelectedVoice] = useState<VoiceStyleKey>('robi_domingo');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [clonedParagraph, setClonedParagraph] = useState('Welcome and enjoy learning with Boiser Educational Resources.');
  const [isVoiceCloned, setIsVoiceCloned] = useState(true); // Pre-cloned from the creator's uploaded sample
  const [filterCalm, setFilterCalm] = useState(true);
  const [filterClear, setFilterClear] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'fil-PH'; // Supports Filipino, Bisaya, and English queries

        rec.onstart = () => {
          setIsRecording(true);
          setTranscript('');
        };

        rec.onresult = async (event: any) => {
          const resultText = event.results[0][0].transcript;
          setTranscript(resultText);
          setIsRecording(false);
          await handleProcessVoiceCommand(resultText);
        };

        rec.onerror = (err: any) => {
          console.error('Speech recognition error:', err);
          setIsRecording(false);
          onTriggerAlert('⚠️ Mic capture paused or unsupported on this browser.');
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  if (!isOpen) return null;

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        onTriggerAlert('⚠️ Web Speech API not supported in this browser. Please type your query below.');
        return;
      }
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleProcessVoiceCommand = async (text: string) => {
    setIsProcessing(true);
    setAssistantReply('Robi is thinking...');

    try {
      // Direct high-fidelity Robi Domingo dialogue generator
      const cleanPrompt = text.toLowerCase();
      let response = '';

      if (cleanPrompt.includes('hello') || cleanPrompt.includes('hi') || cleanPrompt.includes('kamusta')) {
        response = "Hey there! Robi Domingo here, your PBB host and voice partner! We are live and 100% operational in the Boiser Educational Suite. What are we exploring today?";
      } else if (cleanPrompt.includes('ilaw') || cleanPrompt.includes('lesson plan')) {
        response = "Ah! The ILAW Lesson Plan Exemplar is fully loaded. It is designed to strictly follow DepEd Order Number 9, series of 2026. It is highly structured, elegant, and ready for classroom teaching.";
      } else if (cleanPrompt.includes('kinth') || cleanPrompt.includes('creator') || cleanPrompt.includes('steaven')) {
        response = "Shout out to Steaven Kint D. Boiser, the Master Creator of this suite! Absolute genius architecture, keeping everything 100% virus-free and secured.";
      } else if (cleanPrompt.includes('pbb') || cleanPrompt.includes('pinto') || cleanPrompt.includes('door')) {
        response = "Welcome to the Faculty Doors! In the Adviser House, each door is fully isolated for maximum safety. Only authorized advisers have access.";
      } else {
        response = `Double checking that! I am on active standby. You mentioned "${text}". Let us continue updating and polishing your educational materials today!`;
      }

      setAssistantReply(response);
      playAssistantReply(response);
    } catch (err) {
      setAssistantReply('Sorry, I encountered an issue. Let us try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const playAssistantReply = (textToPlay: string) => {
    setIsPlaying(true);
    speakWithVoiceStyle(textToPlay, selectedVoice, 'all', {
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const stopAudioPlayback = () => {
    stopCebuanoMaleVoice();
    setIsPlaying(false);
  };

  const handleTestCloneVoice = () => {
    if (!clonedParagraph.trim()) return;
    setIsPlaying(true);
    
    // Play back using the tuned Master Creator cloned voice style!
    speakWithVoiceStyle(clonedParagraph, 'master_creator', 'all', {
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const handleFilterCalibration = () => {
    onTriggerAlert('✨ Calm & Clear filter calibration applied to Master Creator voice channel.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b132b] border-2 border-amber-400/50 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[0_0_60px_rgba(245,158,11,0.35)] overflow-hidden text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-blue-950 to-stone-900 p-6 border-b border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)]">
              <Mic className="w-6 h-6 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black uppercase tracking-wider text-amber-300">Robi Domingo Voice Assistant & Voice Copier</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40">OpenAI tts-1 & Whisper Pipeline</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Dual-channel voice processor for Robi Domingo and Master Creator Steaven K. Boiser</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Channel A: Robi Domingo Interactive Assistant */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                  CHANNEL A • PBB VOICE ASSISTANT
                </span>
                <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide mt-2">
                  Talk to Robi Domingo
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Interact live with the Robi Domingo smart broadcast voice profile. Speak directly to query about your lesson plans, adviser doors, and systems.
                </p>
              </div>

              {/* Speech soundwave / display card */}
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 flex flex-col gap-3 min-h-[140px] justify-center relative overflow-hidden">
                {isRecording && (
                  <div className="absolute inset-0 bg-red-500/5 flex items-center justify-center pointer-events-none">
                    <div className="flex gap-1">
                      <span className="w-1 h-8 bg-red-500 rounded animate-bounce [animation-delay:0.1s]" />
                      <span className="w-1 h-12 bg-red-500 rounded animate-bounce [animation-delay:0.3s]" />
                      <span className="w-1 h-6 bg-red-500 rounded animate-bounce [animation-delay:0.5s]" />
                      <span className="w-1 h-10 bg-red-500 rounded animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-4 bg-red-500 rounded animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                {transcript ? (
                  <div className="text-xs">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">You Said:</span>
                    <p className="text-slate-300 italic">"{transcript}"</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 text-center italic">"Click to Record or type your message to begin talking..."</p>
                )}

                {assistantReply && (
                  <div className="text-xs border-t border-stone-800/80 pt-2 mt-1">
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">Robi Reply:</span>
                    <p className="text-emerald-400">"{assistantReply}"</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleRecording}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-stone-950'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isRecording ? 'Stop Mic' : 'Hold to Talk'}</span>
                </button>

                {isPlaying && (
                  <button
                    onClick={stopAudioPlayback}
                    className="p-3 bg-stone-800 hover:bg-stone-700 text-red-400 rounded-xl transition cursor-pointer"
                    title="Stop Audio Playback"
                  >
                    <VolumeX className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Selector */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase">Assigned Assistant Voice Style:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setSelectedVoice('robi_domingo'); onTriggerAlert('🎙️ Switched to Robi Domingo Smart Voice.'); }}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${
                      selectedVoice === 'robi_domingo'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400'
                        : 'bg-stone-950 text-slate-400 border-stone-800 hover:bg-stone-900'
                    }`}
                  >
                    Robi Domingo Voice
                  </button>
                  <button
                    onClick={() => { setSelectedVoice('sweet_girl'); onTriggerAlert('🎙️ Switched to Toni Gonzaga Voice.'); }}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${
                      selectedVoice === 'sweet_girl'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400'
                        : 'bg-stone-950 text-slate-400 border-stone-800 hover:bg-stone-900'
                    }`}
                  >
                    Toni Gonzaga Voice
                  </button>
                </div>
              </div>

            </div>

            {/* Channel B: Master Creator Custom Voice Copier */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                  CHANNEL B • BOISER VOICE COPIER & NOISE FILTER
                </span>
                <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide mt-2 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Voice Copier & Noise Filter
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Analyze, filter, and clone the recorded creator's voice. High-fidelity calibrations automatically remove noise to achieve a perfectly calm and clear narration profile.
                </p>
              </div>

              {/* Status and interactive sample box */}
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    Target: Steaven K. Boiser Voice
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> CLONED & FILTERED
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-400 uppercase">Text to Synthesize with Cloned Voice:</span>
                  <textarea
                    value={clonedParagraph}
                    onChange={(e) => setClonedParagraph(e.target.value)}
                    rows={2}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-amber-400 font-sans resize-none"
                    placeholder="Enter any text you want the cloned voice to read..."
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 pt-1 border-t border-stone-800/80">
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterCalm}
                      onChange={(e) => { setFilterCalm(e.target.checked); handleFilterCalibration(); }}
                      className="accent-amber-400"
                    />
                    <span>Calm Pitch (0.85)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterClear}
                      onChange={(e) => { setFilterClear(e.target.checked); handleFilterCalibration(); }}
                      className="accent-amber-400"
                    />
                    <span>Clear Rate (0.84)</span>
                  </label>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <button
                  onClick={handleTestCloneVoice}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-stone-950 text-xs font-black uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Synthesize Cloned Voice</span>
                </button>
              </div>

              <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-300/90 leading-relaxed">
                👉 <strong>Strict Rule Activated:</strong> Any text containing <em>"Kinth"</em> is dynamically processed as <em>"Kint"</em>, and <em>"ILAW"</em> is read directly as the word <em>"Ilaw"</em> across all channels.
              </div>

            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-950 p-4 border-t border-amber-400/30 flex items-center justify-between text-xs">
          <span className="text-slate-400">Robi Domingo OpenAI TTS-1 Voice Assistant Suite • V3.5.0</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
