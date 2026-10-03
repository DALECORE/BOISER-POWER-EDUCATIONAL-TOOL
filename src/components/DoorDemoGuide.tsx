import React, { useState } from 'react';
import { 
  Tv, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  Maximize, 
  Sparkles, 
  FileText, 
  Presentation, 
  Calculator, 
  Camera, 
  Box, 
  Layers, 
  CheckCircle2,
  X,
  QrCode,
  Grid,
  Award,
  Trophy
} from 'lucide-react';

interface FeatureDemo {
  id: string;
  title: string;
  icon: any;
  description: string;
  script: string;
  visualMockup: React.ReactNode;
}

const DEMO_FEATURES: FeatureDemo[] = [
  {
    id: 'intro',
    title: 'Welcome & System Overview',
    icon: Sparkles,
    description: 'Overview of the Boiser Power Tools LIS Integrated System.',
    script: 'WELCOME! WELCOME to Boiser Power Tools! I am your guide, inspired by the energy of Toni Gonzaga. Today, we are exploring the ultimate classroom companion. From ILAW to automated SF records, everything is here to make your teaching life seamless. Let’s get started! WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES',
    visualMockup: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-blue-900 text-white p-8 space-y-4">
        <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
        <h3 className="text-2xl font-black text-center">BOISER POWER TOOLS SY 2026-2027</h3>
        <p className="text-sm text-blue-200">Unified LIS & Curriculum Management</p>
      </div>
    )
  },
  {
    id: 'ilaw_ppt',
    title: 'ILAW, DLL & PPT Generation',
    icon: Presentation,
    description: 'Instant week-long lesson plans and presentation decks.',
    script: 'WELCOME! Need a week of lessons in seconds? Our ILAW and DLL generator creates strictly compliant 12-to-15 page exemplars. Plus, look at this! A 30-slide Canva-ready PPT with pictures and icons. It’s professional, it’s fast, and it’s aligned with MATATAG! WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES',
    visualMockup: (
      <div className="w-full h-full bg-stone-50 p-4 space-y-3">
        <div className="border-b-2 border-blue-800 pb-2 mb-2">
          <div className="text-[10px] font-bold text-blue-800 uppercase">DEPED ORDER NO. 3, S. 2026</div>
          <div className="text-lg font-black text-stone-900 leading-tight">LESSON EXEMPLAR: WEEK 1</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-blue-600 rounded-xl text-white">
            <Presentation size={20} className="mb-1" />
            <div className="text-[10px] font-bold">30-Slide Deck</div>
          </div>
          <div className="p-3 bg-emerald-600 rounded-xl text-white">
            <FileText size={20} className="mb-1" />
            <div className="text-[10px] font-bold">15-Page ILAW</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'grades',
    title: 'Automated Grade Computation',
    icon: Calculator,
    description: 'Error-free trimester average and honor roll calculation.',
    script: 'WELCOME! Goodbye calculator, hello accuracy! Input your Term 1 grades, and the system handles the rest. It automatically ignores zeroed terms for Terms 2 and 3 to give you an accurate running average. No more "pataka" honors – every ranking is triple-checked against DepEd criteria. Precision is key! WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES',
    visualMockup: (
      <div className="w-full h-full bg-white p-4">
        <table className="w-full text-[10px] border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-1 border">Subject</th>
              <th className="p-1 border text-center">T1</th>
              <th className="p-1 border text-center">Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1 border font-bold">Oral Comm</td>
              <td className="p-1 border text-center bg-yellow-100 font-bold">92.5</td>
              <td className="p-1 border text-center font-black">92.5</td>
            </tr>
            <tr>
              <td className="p-1 border font-bold">Gen Math</td>
              <td className="p-1 border text-center bg-yellow-100 font-bold">89.0</td>
              <td className="p-1 border text-center font-black">89.0</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-2 p-2 bg-emerald-100 border border-emerald-300 rounded text-center font-black text-emerald-800 uppercase">
          Status: Promoted (With Honors)
        </div>
      </div>
    )
  },
  {
    id: 'scanner',
    title: 'QR Attendance & LAS Scanner',
    icon: QrCode,
    description: 'Instant student check-in and paper-to-digital grading.',
    script: 'WELCOME! Watch this magic! Just point your phone camera at a student’s QR ID or Learning Activity Sheet. The AI scanner checks the answers, tallies the score, and logs attendance directly into your LIS records. It’s the ultimate time-saver for busy advisers. WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES',
    visualMockup: (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
        <div className="w-48 h-32 border-2 border-dashed border-emerald-400 rounded-lg flex items-center justify-center overflow-hidden">
           <QrCode className="text-emerald-400 w-16 h-16 opacity-50 animate-pulse" />
           <div className="absolute inset-0 bg-emerald-400/10 animate-pulse" />
        </div>
        <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-black">
          LOGGED: ABAD, JUAN (07:15 AM)
        </div>
      </div>
    )
  },
  {
    id: 'seating',
    title: 'Interactive Seating Chart',
    icon: Grid,
    description: 'Visual classroom management and student placement.',
    script: 'WELCOME! Classroom management has never been this easy. Drag and drop students into their designated seats with our interactive seating chart. It syncs with your SF records and helps you monitor performance by location. Organization at its finest! WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES',
    visualMockup: (
      <div className="w-full h-full bg-stone-100 p-4 flex flex-col items-center">
        <div className="w-full h-4 bg-stone-300 rounded mb-4 text-[8px] font-black text-center text-stone-500">TEACHER TABLE</div>
        <div className="grid grid-cols-4 gap-2 w-full">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="aspect-square bg-white border-2 border-blue-200 rounded-lg flex items-center justify-center text-[8px] font-bold text-blue-800">
              Seat {i}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'awards',
    title: 'Merit Awards & Certificates',
    icon: Award,
    description: 'Automated certificate generation for honor students.',
    script: 'WELCOME! Celebrating success is important! Our Merit Award Hub automatically identifies top performers and generates beautiful, DepEd-compliant certificates in one click. From Highest Honors to consistent achievers, everyone’s hard work is recognized instantly. WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES',
    visualMockup: (
      <div className="w-full h-full bg-amber-50 p-4 border-4 border-blue-900 flex flex-col items-center justify-center text-center">
        <Trophy className="text-amber-500 w-12 h-12 mb-2" />
        <div className="text-[10px] font-black text-blue-900 uppercase">Certificate of Recognition</div>
        <div className="text-[14px] font-serif font-black text-stone-900 border-b border-stone-900 px-4 mt-2">ALVAREZ, MARIA</div>
        <div className="text-[8px] text-stone-600 mt-2 italic">With Highest Honors</div>
      </div>
    )
  },
  {
    id: 'projects',
    title: 'Science & 3D Projects',
    icon: Box,
    description: 'Visualization and management of technical projects.',
    script: 'WELCOME! Innovation is at our core. Explore 3D visualizations for Science and TechPro projects. Whether it’s an engineering model or a chemical structure, the 3D viewer brings concepts to life. High-fidelity results, every single time! WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES',
    visualMockup: (
      <div className="w-full h-full bg-indigo-950 flex flex-col items-center justify-center">
        <Box className="w-16 h-16 text-cyan-400 animate-bounce" />
        <div className="text-[10px] text-cyan-200 mt-2 font-black">3D PROJECT VIEWER: ACTIVE</div>
        <div className="flex gap-1 mt-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 opacity-50" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 opacity-20" />
        </div>
      </div>
    )
  }
];

export const DoorDemoGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeStep, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = DEMO_FEATURES[activeStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-5xl bg-stone-950 border-4 border-stone-800 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
        
        {/* 4K TV Frame Header */}
        <div className="bg-stone-900 p-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Tv className="text-amber-400" size={20} />
            <span className="text-[10px] font-black text-stone-400 tracking-[0.2em] uppercase">BOISER OLED 4K PRO • MASTER GUIDE</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main "Screen" Area (7 cols) */}
          <div className="lg:col-span-8 p-6 bg-black relative min-h-[400px] flex items-center justify-center">
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-stone-900 flex flex-col">
              
              {/* Feature Visualization */}
              <div className="flex-1 relative">
                {current.visualMockup}
                
                {/* Toni Gonzaga Style "Talking Head" Overlay Placeholder */}
                <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-2 border-yellow-400 bg-stone-800 flex items-center justify-center shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 animate-pulse flex items-center justify-center">
                    <Volume2 className="text-white" size={24} />
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest animate-pulse">4K HDR LIVE</span>
                </div>
              </div>

              {/* Subtitles / Script Area */}
              <div className="h-20 bg-stone-950/80 p-4 flex items-center justify-center text-center">
                <p className="text-sm font-bold text-white leading-tight italic">
                  "{current.script}"
                </p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-stone-900/50 backdrop-blur-lg px-6 py-2.5 rounded-full border border-white/5">
              <button 
                onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
                className="text-white/60 hover:text-white transition"
              >
                <SkipForward className="rotate-180" size={20} />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white text-stone-950 flex items-center justify-center hover:scale-105 transition shadow-lg"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>
              <button 
                onClick={() => setActiveTab(prev => Math.min(DEMO_FEATURES.length - 1, prev + 1))}
                className="text-white/60 hover:text-white transition"
              >
                <SkipForward size={20} />
              </button>
              <div className="h-6 w-px bg-white/10" />
              <Volume2 className="text-white/60" size={20} />
              <Maximize className="text-white/60" size={20} />
            </div>
          </div>

          {/* Sidebar Navigation (4 cols) */}
          <div className="lg:col-span-4 p-6 bg-stone-900 border-l border-stone-800 space-y-4 max-h-[600px] overflow-y-auto">
            <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-[0.2em] mb-2">Playlist • Features Overview</h4>
            
            <div className="space-y-2">
              {DEMO_FEATURES.map((feature, idx) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 border-2 ${
                    activeStep === idx 
                      ? 'bg-blue-600 border-blue-400 shadow-lg scale-[1.02]' 
                      : 'bg-white/5 border-transparent hover:bg-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activeStep === idx ? 'bg-white/20' : 'bg-white/5'}`}>
                    <feature.icon className={activeStep === idx ? 'text-white' : 'text-stone-400'} size={20} />
                  </div>
                  <div>
                    <div className={`text-xs font-black uppercase ${activeStep === idx ? 'text-white' : 'text-stone-200'}`}>
                      {feature.title}
                    </div>
                    <div className={`text-[10px] leading-tight line-clamp-1 ${activeStep === idx ? 'text-blue-100' : 'text-stone-500'}`}>
                      {feature.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800">
               <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400/10 to-transparent border border-amber-400/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="text-amber-400" size={14} />
                    <span className="text-[10px] font-black text-amber-300 uppercase">Pro Tip</span>
                  </div>
                  <p className="text-[10px] text-stone-400 leading-relaxed">
                    WELCOME AND ENJOY LEARNING WITH BOISER EDUCATIONAL RESOURCES
                  </p>
               </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-white text-stone-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[0.98] active:scale-95 transition"
            >
              Close & Start Exploring
            </button>
          </div>

        </div>

        {/* Brand Tagline Footer */}
        <div className="bg-stone-900 p-2 text-center border-t border-stone-800">
           <span className="text-[9px] font-black text-stone-600 uppercase tracking-[0.3em]">
             POWERED BY BOISER EMPIRE EDUCATIONAL SUITE • SY 2026-2027
           </span>
        </div>

      </div>
    </div>
  );
};
