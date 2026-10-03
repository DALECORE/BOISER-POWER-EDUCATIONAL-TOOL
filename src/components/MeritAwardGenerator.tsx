import React, { useState } from 'react';
import { Trophy, Printer, Layers, Sliders, Sparkles, RefreshCw } from 'lucide-react';

// User provided JSON Schema
const CERTIFICATE_CONFIG = {
  "certificate": {
    "template": "tpl-luminary",
    "accentColor": "#C9A94D",
    "secondaryAccentColor": "#E2C875",
    "logo": "https://assets.orbit.edu/brand/orbit-seal-gold.svg",
    "layout": "landscape-modern",
    "content": {
      "kicker": "Honorary Recognition",
      "title": "Certificate of Excellence",
      "subtitle": "Presented with Golden Distinction",
      "recipientName": "Alex Rivera",
      "description": "for exceptional mastery, visionary problem-solving, and outstanding leadership in",
      "course": "Advanced Systems Engineering",
      "issuer": "Orbit Academy",
      "date": "October 24, 2026",
      "signatoryName": "Dr. Dana Whitfield",
      "signatoryTitle": "Dean of Engineering",
      "signatorySignatureUrl": "https://assets.orbit.edu/signatures/whitfield.svg",
      "certificateId": "CERT-884092-ORB",
      "verificationUrl": "https://orbit.edu/verify/CERT-884092-ORB"
    }
  },
  "templates": [
    { "id": "tpl-tech", "label": "Tech Cyber", "background": "#0B0F18", "style": "dark, neon accent, circuit board geometry" },
    { "id": "tpl-elegant", "label": "Elegant Gold", "background": "#FAF6EC", "style": "cream texture, classic serif typography, gold leaf border" },
    { "id": "tpl-minimal", "label": "Minimal Mono", "background": "#FFFFFF", "style": "clean whitespace, crisp typography, subtle grid pattern" },
    { "id": "tpl-corp", "label": "Corporate Slate", "background": "#E7EEF6", "style": "soft blue ambient gradient, side bar accent, formal seals" },
    { "id": "tpl-luminary", "label": "Luminary Gold", "background": "radial-gradient(ellipse at center, #131927 0%, #080B12 100%)", "style": "luxury dark, metallic gold foil typography, geometric guilloche pattern" },
    { "id": "tpl-botanical", "label": "Botanical Crest", "background": "#F4F7F4", "style": "hand-drawn laurel wreath, sage accents, crest header" }
  ],
  "accentColors": [
    { "hex": "#33E6FF", "name": "Electric Cyan" },
    { "hex": "#8B7CFF", "name": "Cosmic Violet" },
    { "hex": "#C9A94D", "name": "Imperial Gold" },
    { "hex": "#4CE0A0", "name": "Emerald Mint" },
    { "hex": "#2E6BE6", "name": "Royal Sapphire" },
    { "hex": "#FF5C5C", "name": "Coral Spark" }
  ],
  "typography": {
    "fontFamilyPrimary": "Cinzel, serif",
    "fontFamilySecondary": "Plus Jakarta Sans, sans-serif",
    "fontFamilySignature": "Great Vibes, cursive"
  },
  "watermark": {
    "enabled": true,
    "icon": "shield-star",
    "opacity": 0.04
  },
  "badge": {
    "enabled": true,
    "type": "gold-embossed-seal",
    "text": "OFFICIAL CERTIFIED"
  },
  "exportFormats": ["png", "pdf", "svg"]
};

export const MeritAwardGenerator: React.FC = () => {
  const [config, setConfig] = useState(CERTIFICATE_CONFIG);

  return (
    <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8 text-amber-600" />
        <h2 className="text-2xl font-black text-stone-900">Luminary Certificate Forge</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-stone-700 uppercase">Configuration</h3>
          <select 
            value={config.certificate.template}
            onChange={(e) => setConfig(prev => ({...prev, certificate: {...prev.certificate, template: e.target.value}}))}
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
          >
            {config.templates.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
          <input 
            type="text" 
            value={config.certificate.content.recipientName}
            onChange={(e) => setConfig(prev => ({...prev, certificate: {...prev.certificate, content: {...prev.certificate.content, recipientName: e.target.value}}}))}
            placeholder="Recipient Name"
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
          />
        </div>
        
        <div className="bg-stone-100 rounded-3xl p-10 flex flex-col items-center justify-center font-bold text-center border-2 border-dashed border-stone-300">
           <span className="text-stone-500 mb-2">Certificate Preview</span>
           <span className="text-xl text-stone-800">{config.certificate.content.title}</span>
           <span className="text-sm text-stone-600">{config.certificate.content.recipientName}</span>
        </div>
      </div>
    </div>
  );
};
