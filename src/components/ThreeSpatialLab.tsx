import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Boxes,
  Play,
  Pause,
  RotateCcw,
  Camera,
  Layers,
  Sparkles,
  Sun,
  Globe,
  Atom,
  Dna,
  Maximize2,
  Download,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Eye,
  FileSpreadsheet,
  FileText,
  Presentation
} from 'lucide-react';
import { exportILAWToPptx } from '../utils/depedPptxExporter';
import { exportLnnchsSFToExcel, exportLnnchsSFToWord, exportLnnchsSFToPdf, LNNCHS_DEFAULT_CONFIG } from '../utils/lnnchsSchoolFormsExporter';
import { LnnchsDoorResultPreviewModal, PreviewItemData } from './LnnchsDoorResultPreviewModal';

export const ThreeSpatialLab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSimulation, setActiveSimulation] = useState<'dna' | 'quantum' | 'planet' | 'cell'>('dna');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [particleDensity, setParticleDensity] = useState<number>(300);
  const [fps, setFps] = useState<number>(60);
  const [renderMode, setRenderMode] = useState<'WebGPU Ready / WebGL2'>('WebGPU Ready / WebGL2');
  const [previewItemData, setPreviewItemData] = useState<PreviewItemData | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);

  // Mouse interaction state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060c18);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 25);

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clean old canvas
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00d2ff, 2.5);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff007f, 2.0);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffd700, 3, 50);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);
    objectsGroupRef.current = group;

    // Background cosmic particle grid
    const particlesGeo = new THREE.BufferGeometry();
    const particleCoords = [];
    for (let i = 0; i < 800; i++) {
      particleCoords.push((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80);
    }
    particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(particleCoords, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0x4da6ff, size: 0.25, transparent: true, opacity: 0.6 });
    const starField = new THREE.Points(particlesGeo, particlesMat);
    scene.add(starField);

    // Load Simulation Model
    buildSimulationScene(activeSimulation, group, isWireframe);

    // Mouse Controls
    const dom = renderer.domElement;
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !group) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      group.rotation.y += deltaX * 0.008;
      group.rotation.x += deltaY * 0.008;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDraggingRef.current = false; };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile APK view
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !group || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;
      group.rotation.y += deltaX * 0.008;
      group.rotation.x += deltaY * 0.008;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { isDraggingRef.current = false; };

    dom.addEventListener('touchstart', onTouchStart);
    dom.addEventListener('touchmove', onTouchMove);
    dom.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop & FPS calculation
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const now = performance.now();
      frameCount++;
      if (now - fpsTimer >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - fpsTimer)));
        frameCount = 0;
        fpsTimer = now;
      }

      if (isPlaying && group) {
        group.rotation.y += 0.008 * speed;
        starField.rotation.y -= 0.0005 * speed;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, [activeSimulation, speed, isWireframe]);

  const buildSimulationScene = (sim: 'dna' | 'quantum' | 'planet' | 'cell', group: THREE.Group, wireframe: boolean) => {
    // Clear existing children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }

    if (sim === 'dna') {
      // 🧬 DNA DOUBLE HELIX
      const strandCount = 40;
      const radius = 3.5;
      const heightStep = 0.45;
      const sphereGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const cylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, radius * 2, 8);

      const matA = new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.2, metalness: 0.8, wireframe });
      const matT = new THREE.MeshStandardMaterial({ color: 0xff0077, roughness: 0.2, metalness: 0.8, wireframe });
      const matC = new THREE.MeshStandardMaterial({ color: 0xffbb00, roughness: 0.2, metalness: 0.8, wireframe });
      const matG = new THREE.MeshStandardMaterial({ color: 0x00ff66, roughness: 0.2, metalness: 0.8, wireframe });
      const bondMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, wireframe });

      for (let i = 0; i < strandCount; i++) {
        const angle = i * 0.35;
        const y = (i - strandCount / 2) * heightStep;

        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;

        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        // Base pair spheres
        const s1 = new THREE.Mesh(sphereGeo, i % 2 === 0 ? matA : matC);
        s1.position.set(x1, y, z1);
        group.add(s1);

        const s2 = new THREE.Mesh(sphereGeo, i % 2 === 0 ? matT : matG);
        s2.position.set(x2, y, z2);
        group.add(s2);

        // Hydrogen Bond
        const bond = new THREE.Mesh(cylinderGeo, bondMat);
        bond.position.set(0, y, 0);
        bond.rotation.z = Math.PI / 2;
        bond.rotation.y = -angle;
        group.add(bond);
      }
    } else if (sim === 'quantum') {
      // ⚡ QUANTUM ATOMIC ORBITAL
      const nucleusGeo = new THREE.SphereGeometry(1.6, 32, 32);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0xff4400,
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.9,
        wireframe
      });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      group.add(nucleus);

      // Electron orbitals rings
      const ringColors = [0x00ffff, 0xff00bb, 0x00ff88, 0x38bdf8];
      for (let i = 0; i < 4; i++) {
        const ringGeo = new THREE.TorusGeometry(4 + i * 1.8, 0.08, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({ color: ringColors[i], emissive: ringColors[i], emissiveIntensity: 0.5, wireframe });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = (i * Math.PI) / 3;
        ring.rotation.y = (i * Math.PI) / 4;
        group.add(ring);

        // Electron particle on orbit
        const electronGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const electronMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: ringColors[i], emissiveIntensity: 1 });
        const electron = new THREE.Mesh(electronGeo, electronMat);
        electron.position.set(Math.cos(i) * (4 + i * 1.8), Math.sin(i) * 2, Math.sin(i) * (4 + i * 1.8));
        group.add(electron);
      }
    } else if (sim === 'planet') {
      // 🌍 PROCEDURAL TERRAIN & PLANET ECOSYSTEM
      const planetGeo = new THREE.SphereGeometry(4.5, 64, 64);
      const planetMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        roughness: 0.4,
        metalness: 0.1,
        wireframe
      });
      const planet = new THREE.Mesh(planetGeo, planetMat);
      group.add(planet);

      // Atmosphere glow ring
      const ringGeo = new THREE.RingGeometry(5.8, 7.8, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
        wireframe
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      group.add(ring);

      // Orbiting satellite / moon
      const moonGeo = new THREE.SphereGeometry(0.8, 24, 24);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.8, wireframe });
      const moon = new THREE.Mesh(moonGeo, moonMat);
      moon.position.set(8.5, 2, 0);
      group.add(moon);
    } else if (sim === 'cell') {
      // 🔬 CELLULAR MITOCHONDRION & ATP LAB
      const cellGeo = new THREE.CapsuleGeometry(2.5, 5.0, 32, 64);
      const cellMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.4,
        roughness: 0.2,
        metalness: 0.3,
        wireframe
      });
      const cell = new THREE.Mesh(cellGeo, cellMat);
      cell.rotation.z = Math.PI / 4;
      group.add(cell);

      // Inner Cristae Folds
      for (let i = 0; i < 5; i++) {
        const foldGeo = new THREE.TorusGeometry(1.5, 0.2, 16, 50);
        const foldMat = new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.3, wireframe });
        const fold = new THREE.Mesh(foldGeo, foldMat);
        fold.position.set((i - 2) * 0.9, (i - 2) * 0.9, 0);
        fold.rotation.x = Math.PI / 3;
        group.add(fold);
      }
    }
  };

  const handleCaptureSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `3D_${activeSimulation.toUpperCase()}_Model.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetRotation = () => {
    if (objectsGroupRef.current) {
      objectsGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#092B62] to-cyan-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-cyan-500/20">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-cyan-500/10 rounded-2xl backdrop-blur-sm border border-cyan-400/30">
              <Boxes className="w-6 h-6 text-cyan-300" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-300">Three.js WebGPU & WebGL Spatial Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            3D Spatial & Science Simulation Lab
          </h1>
          <p className="text-sm text-cyan-100 max-w-2xl leading-relaxed">
            Real-time GPU-accelerated spatial rendering for STEM education, molecular structures, quantum physics orbitals, and planetary models.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 text-xs">
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-emerald-300 font-bold">{fps} FPS</span>
            <span className="text-stone-400">|</span>
            <span className="text-cyan-200 font-bold">{renderMode}</span>
          </div>
          <span className="text-[11px] text-stone-300">Touch / Drag to Orbit 360°</span>
        </div>
      </div>

      {/* Control Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'dna', label: '🧬 DNA Double Helix', desc: 'Genetics & Base Pairs' },
          { id: 'quantum', label: '⚡ Quantum Atom Orbitals', desc: 'Electrons & Bohr Model' },
          { id: 'planet', label: '🌍 Planet & Atmosphere', desc: 'Earth Science & Rings' },
          { id: 'cell', label: '🔬 Cellular Mitochondrion', desc: 'ATP Synthase & Cristae' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSimulation(item.id as any)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeSimulation === item.id
                ? 'bg-[#092B62] text-white border-cyan-400 shadow-md ring-2 ring-cyan-400/50'
                : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <h4 className="text-xs font-black">{item.label}</h4>
            <p className={`text-[11px] mt-1 ${activeSimulation === item.id ? 'text-cyan-200' : 'text-stone-500'}`}>{item.desc}</p>
          </button>
        ))}
      </div>

      {/* Main 3D Viewport Frame */}
      <div className="bg-stone-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col">
        {/* Top Viewport Overlay Controls */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-xs font-mono flex items-center gap-2 pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-cyan-200 uppercase">{activeSimulation} Active Model</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-xl text-white border border-white/10 transition cursor-pointer"
              title={isPlaying ? 'Pause Rotation' : 'Resume Rotation'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={() => setIsWireframe(!isWireframe)}
              className={`p-2 backdrop-blur-md rounded-xl border transition cursor-pointer ${
                isWireframe ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-black/60 text-white border-white/10 hover:bg-black/80'
              }`}
              title="Toggle Wireframe Shaders"
            >
              <Layers className="w-4 h-4" />
            </button>

            <button
              onClick={resetRotation}
              className="p-2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-xl text-white border border-white/10 transition cursor-pointer"
              title="Reset View Angle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCaptureSnapshot}
              className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
              title="Download High-Res 3D Image"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Snapshot</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas Mount Point */}
        <div ref={mountRef} className="w-full h-[520px] cursor-grab active:cursor-grabbing" />

        {/* Bottom Floating Toolbar */}
        <div className="bg-slate-900/90 border-t border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-bold">Rotation Speed:</span>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24 accent-cyan-400"
              />
              <span className="font-mono text-cyan-300">{speed}x</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-stone-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive 3D Geometry • Exportable to Science PPTX & PDF</span>
          </div>
        </div>
      </div>

      {/* UNIFIED DOCUMENT PROCESSING SKILLS & DIRECT DOWNLOAD HUB */}
      <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border-2 border-cyan-400/40 rounded-3xl p-5 shadow-xl text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Unified Document Processing Engine</span>
            </div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>Direct Multi-Format Academic Output Exporter</span>
              <span className="text-xs px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded border border-amber-400/40 font-mono">
                {activeSimulation.toUpperCase()} SIMULATION
              </span>
            </h3>
            <p className="text-xs text-stone-300">
              Transform the current 3D spatial simulation into DepEd lesson plans, animated classroom presentation decks, lab datasheets, and printable PDF experiment guides.
            </p>
          </div>

          <button
            onClick={() => setPreviewItemData({
              title: `3D Spatial Lab: ${activeSimulation.toUpperCase()} Simulation`,
              code: `SPATIAL_${activeSimulation.toUpperCase()}`,
              category: '3D Interactive Laboratory',
              description: `Real-time WebGL interactive 3D model for ${activeSimulation} simulation with 60 FPS rendering.`,
              gradeLevel: 'Grade 11 & 12 STEM',
              adviserName: 'Steaven Kinth Boiser'
            })}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Eye className="w-4 h-4 text-stone-950" />
            <span>Preview in Unified Modal</span>
          </button>
        </div>

        {/* Status Notification if any */}
        {statusMsg && (
          <div className="p-3 bg-cyan-950/80 border border-cyan-400/50 rounded-xl text-cyan-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* 4 Direct Download Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* 1. PowerPoint .pptx */}
          <button
            onClick={async () => {
              setIsExporting('pptx');
              try {
                await exportILAWToPptx({
                  header: {
                    school: 'LNNCHS (Lanao del Norte National Comprehensive High School)',
                    teacher: 'Steaven Kinth Boiser',
                    lesson: `3D Spatial Lab: ${activeSimulation.toUpperCase()}`,
                    learningArea: 'Science & Physics Laboratory',
                    contentEvaluator: 'Master Teacher II',
                    languageEvaluator: 'Head Teacher III',
                    formatEvaluator: 'Principal IV',
                    division: 'Lanao del Norte',
                    region: 'Region X',
                    gradeLevelAndSection: 'Grade 11 - Einstein',
                    gradeBand: '11-12',
                    term: 1,
                    bowWeek: 'Week 3',
                    inclusiveTeachingDates: '2026-09-25',
                    numberOfSessions: 4,
                    references: ['DepEd MATATAG STEM CG', 'Interactive 3D WebGL Labs'],
                    declarationOfAIUse: 'Assisted by Boiser Power Tools Engine'
                  },
                  presentationSlides: [
                    {
                      title: `3D Spatial Lab — ${activeSimulation.toUpperCase()} Geometry`,
                      badge: 'SPATIAL SIMULATION DECK',
                      bodyPoints: [
                        `Interactive 3D structural analysis for ${activeSimulation} simulation`,
                        'Real-time 60 FPS WebGL 2.0 GPU acceleration model',
                        'Aligned with DepEd Order No. 3, s. 2026 Science Standards'
                      ]
                    },
                    {
                      title: 'Scientific Observations & Data Synthesis',
                      badge: 'CLASSROOM LAB',
                      bodyPoints: [
                        'Analyze rotation vector and molecular spatial arrangements',
                        'Record coordinate parameters and quantitative measurements',
                        'Synthesize observations into laboratory experiment outputs'
                      ]
                    }
                  ]
                } as any, `3D_Spatial_Lab_${activeSimulation.toUpperCase()}.pptx`);
                setStatusMsg(`✓ Successfully downloaded ${activeSimulation.toUpperCase()} PowerPoint Presentation (.pptx)!`);
              } catch (err) {
                console.error(err);
              } finally {
                setIsExporting(null);
              }
            }}
            disabled={isExporting === 'pptx'}
            className="p-3.5 bg-gradient-to-br from-amber-600 to-orange-700 hover:brightness-110 rounded-2xl border border-amber-400/40 text-left transition flex flex-col justify-between space-y-2 cursor-pointer shadow-md disabled:opacity-60"
          >
            <div className="flex items-center justify-between">
              <Presentation className="w-5 h-5 text-amber-200" />
              <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded text-amber-300 font-bold">.PPTX</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-white">PowerPoint Deck</h4>
              <p className="text-[10px] text-amber-100">16:9 Animated Classroom Slides</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-200 pt-1 border-t border-white/10">
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting === 'pptx' ? 'Exporting...' : 'Download (.pptx)'}</span>
            </div>
          </button>

          {/* 2. Word .docx */}
          <button
            onClick={() => {
              setIsExporting('docx');
              try {
                exportLnnchsSFToWord('SF1', {
                  ...LNNCHS_DEFAULT_CONFIG,
                  title: `3D Spatial Laboratory Guide — ${activeSimulation.toUpperCase()}`,
                  formName: `3D Spatial Lab: ${activeSimulation.toUpperCase()}`,
                  gradeLevel: 'Grade 11 STEM'
                });
                setStatusMsg(`✓ Successfully downloaded ${activeSimulation.toUpperCase()} Laboratory Lesson Plan (.docx)!`);
              } catch (err) {
                console.error(err);
              } finally {
                setIsExporting(null);
              }
            }}
            disabled={isExporting === 'docx'}
            className="p-3.5 bg-gradient-to-br from-blue-700 to-indigo-800 hover:brightness-110 rounded-2xl border border-blue-400/40 text-left transition flex flex-col justify-between space-y-2 cursor-pointer shadow-md disabled:opacity-60"
          >
            <div className="flex items-center justify-between">
              <FileText className="w-5 h-5 text-blue-200" />
              <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded text-blue-300 font-bold">.DOCX</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-white">Word Lesson Plan</h4>
              <p className="text-[10px] text-blue-100">DepEd ILAW Lab Activity Format</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-blue-200 pt-1 border-t border-white/10">
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting === 'docx' ? 'Exporting...' : 'Download (.docx)'}</span>
            </div>
          </button>

          {/* 3. Excel .xlsx */}
          <button
            onClick={() => {
              setIsExporting('xlsx');
              try {
                exportLnnchsSFToExcel('SF1', {
                  ...LNNCHS_DEFAULT_CONFIG,
                  title: `3D Spatial Lab Metrics — ${activeSimulation.toUpperCase()}`,
                  formName: `Spatial Coordinates: ${activeSimulation.toUpperCase()}`,
                  gradeLevel: 'Grade 11 STEM'
                });
                setStatusMsg(`✓ Successfully downloaded ${activeSimulation.toUpperCase()} Simulation Metrics Datasheet (.xlsx)!`);
              } catch (err) {
                console.error(err);
              } finally {
                setIsExporting(null);
              }
            }}
            disabled={isExporting === 'xlsx'}
            className="p-3.5 bg-gradient-to-br from-emerald-700 to-teal-800 hover:brightness-110 rounded-2xl border border-emerald-400/40 text-left transition flex flex-col justify-between space-y-2 cursor-pointer shadow-md disabled:opacity-60"
          >
            <div className="flex items-center justify-between">
              <FileSpreadsheet className="w-5 h-5 text-emerald-200" />
              <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded text-emerald-300 font-bold">.XLSX</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-white">Excel Datasheet</h4>
              <p className="text-[10px] text-emerald-100">Math/Physics Coordinate Data</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-200 pt-1 border-t border-white/10">
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting === 'xlsx' ? 'Exporting...' : 'Download (.xlsx)'}</span>
            </div>
          </button>

          {/* 4. Vector PDF .pdf */}
          <button
            onClick={() => {
              setIsExporting('pdf');
              try {
                exportLnnchsSFToPdf('SF1', {
                  ...LNNCHS_DEFAULT_CONFIG,
                  title: `3D Spatial Laboratory Guide — ${activeSimulation.toUpperCase()}`,
                  formName: `3D Spatial Lab Handout: ${activeSimulation.toUpperCase()}`,
                  gradeLevel: 'Grade 11 STEM'
                });
                setStatusMsg(`✓ Successfully generated ${activeSimulation.toUpperCase()} Laboratory Guide (.pdf)!`);
              } catch (err) {
                console.error(err);
              } finally {
                setIsExporting(null);
              }
            }}
            disabled={isExporting === 'pdf'}
            className="p-3.5 bg-gradient-to-br from-rose-700 to-red-800 hover:brightness-110 rounded-2xl border border-rose-400/40 text-left transition flex flex-col justify-between space-y-2 cursor-pointer shadow-md disabled:opacity-60"
          >
            <div className="flex items-center justify-between">
              <Download className="w-5 h-5 text-rose-200" />
              <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded text-rose-300 font-bold">.PDF</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-white">Printable Lab PDF</h4>
              <p className="text-[10px] text-rose-100">Sealed Official Lab Handout</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-200 pt-1 border-t border-white/10">
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting === 'pdf' ? 'Generating...' : 'Download (.pdf)'}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Unified Preview Modal */}
      {previewItemData && (
        <LnnchsDoorResultPreviewModal
          itemData={previewItemData}
          isOpen={true}
          onClose={() => setPreviewItemData(null)}
        />
      )}
    </div>
  );
};
