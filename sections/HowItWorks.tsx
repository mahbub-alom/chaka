import React, { useState } from 'react';
import { motion } from 'motion/react';

interface HowItWorksProps {
  isDarkMode: boolean;
}

export default function HowItWorks({ isDarkMode }: HowItWorksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const steps = [
    {
      number: "01",
      title: "Check Car & Bike Yourself",
      bengaliTitle: "নিজে গাড়ি/বাইক পরীক্ষা করুন",
      description: "Search from hundreds of certified local listings. Examine full detailed specs, browse ultra-clear high-res photos, analyze local BDT valuation scales, and check the vehicle's background on your own terms before contacting sellers.",
      color: "orange",
      themeClass: {
        glow: "from-orange-500/10 to-amber-500/5 dark:from-orange-500/[0.04] dark:to-transparent",
        border: "border-orange-500/20 group-hover:border-orange-500/70",
        activeBorder: "border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]",
        text: "text-orange-500 dark:text-orange-400",
        badge: "bg-orange-500/10 text-orange-500 border-orange-500/20"
      },
      diagnostics: {
        caliper: "LOCKED",
        psi: "32 PSI",
        temp: "82°C",
        signal: "OK"
      }
    },
    {
      number: "02",
      title: "Document Verify & Test Ride",
      bengaliTitle: "কাগজপত্র যাচাই ও টেস্ট রাইড",
      description: "Instantly check the authentic Japanese auction sheet report using our verification portal. Cross-examine engine registration dockets and match physical status by scheduling a real-world test ride on open roads.",
      color: "blue",
      themeClass: {
        glow: "from-blue-500/10 to-cyan-500/5 dark:from-blue-500/[0.04] dark:to-transparent",
        border: "border-blue-500/20 group-hover:border-blue-500/70",
        activeBorder: "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        text: "text-blue-500 dark:text-blue-400",
        badge: "bg-blue-500/10 text-blue-500 border-blue-500/20"
      },
      diagnostics: {
        caliper: "CLAMPED",
        psi: "33 PSI",
        temp: "88°C",
        signal: "VERIFIED"
      }
    },
    {
      number: "03",
      title: "Complete Purchase & Joyful Drive",
      bengaliTitle: "নিরাপদ ক্রয় ও আনন্দের পথচলা",
      description: "Pay securely, sign the verified legal ownership transfer documents alongside our partner showrooms, acquire the keys, and experience the unrivaled pleasure of driving home your dream car or motorcycle with ultimate joy!",
      color: "green",
      themeClass: {
        glow: "from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/[0.04] dark:to-transparent",
        border: "border-emerald-500/20 group-hover:border-emerald-500/70",
        activeBorder: "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        text: "text-emerald-500 dark:text-emerald-400",
        badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      },
      diagnostics: {
        caliper: "RELEASED",
        psi: "35 PSI",
        temp: "95°C",
        signal: "LAUNCH OK"
      }
    }
  ];

  const getStepIcon = (number: string, className: string) => {
    if (number === "01") {
      return (
        <svg viewBox="0 0 240 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Garage Structure */}
          <rect 
            x="25" 
            y="45" 
            width="130" 
            height="110" 
            rx="4" 
            fill="#3b82f6" 
            fillOpacity={isDarkMode ? "0.15" : "0.1"} 
            stroke="#3b82f6" 
            strokeWidth="2" 
            strokeOpacity={isDarkMode ? "0.6" : "0.4"} 
          />
          <path d="M20 45 L90 20 L160 45 Z" fill="#ef4444" fillOpacity="0.85" stroke="#dc2626" strokeWidth="2" />
          <rect x="35" y="55" width="110" height="100" fill={isDarkMode ? "#ffffff" : "#1e293b"} fillOpacity={isDarkMode ? "0.02" : "0.05"} />
          
          {/* Horizontal Rolled-up door lines */}
          <line x1="35" y1="70" x2="145" y2="70" stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="35" y1="85" x2="145" y2="85" stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="35" y1="100" x2="145" y2="100" stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="4 2" />
          
          {/* Lamps on columns */}
          <circle cx="25" cy="80" r="5" fill="#f97316" className="animate-pulse" />
          <path d="M25 80 L20 85 h10 Z" fill="#ea580c" />
          <circle cx="155" cy="80" r="5" fill="#f97316" className="animate-pulse" />
          <path d="M155 80 L150 85 h10 Z" fill="#ea580c" />

          {/* Red Car facing forward with open hood */}
          {/* Car Body */}
          <path d="M35 125 C35 115 45 110 50 110 H110 C115 110 125 115 125 125 L129 140 H31 Z" fill="#ef4444" />
          {/* Car Windows / Cabin */}
          <path d="M50 110 L58 92 H102 L110 110 Z" fill={isDarkMode ? "#0f172a" : "#1e293b"} />
          {/* Windshield divider */}
          <line x1="80" y1="92" x2="80" y2="110" stroke="#475569" strokeWidth="1.5" />
          {/* Open Hood (hinged left/upwards) */}
          <path d="M35 110 L5 85 L20 80 Z" fill="#b91c1c" stroke="#dc2626" strokeWidth="1.5" />
          {/* Engine parts showing inside */}
          <rect x="35" y="110" width="25" height="12" fill={isDarkMode ? "#334155" : "#475569"} rx="1" />
          <circle cx="42" cy="116" r="3" fill="#fbbf24" />
          <line x1="48" y1="113" x2="55" y2="118" stroke="#94a3b8" strokeWidth="2" />

          {/* Car Wheels */}
          <rect x="42" y="140" width="16" height="8" rx="2" fill="#0f172a" />
          <rect x="102" y="140" width="16" height="8" rx="2" fill="#0f172a" />
          {/* Car Lights */}
          <circle cx="45" cy="128" r="4" fill="#fef08a" />
          <circle cx="115" cy="128" r="4" fill="#fef08a" />
          <rect x="58" y="126" width="44" height="6" rx="1" fill={isDarkMode ? "#475569" : "#cbd5e1"} />
          
          {/* Mechanic Person */}
          <path d="M125 120 L135 155 h6 L145 125 L150 155 h6 L158 120 Z" fill="#2563eb" />
          <circle cx="140" cy="102" r="8" fill="#fed7aa" />
          <path d="M132 100 C132 94 148 94 148 100 L144 96 H136" fill={isDarkMode ? "#475569" : "#1e293b"} />
          <path d="M128 112 C128 120 152 120 152 112 Z" fill="#cbd5e1" />
          <path d="M132 112 L105 118 L108 123 L130 118 Z" fill="#fed7aa" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M134 114 L110 120 L112 125 L132 120 Z" fill="#fed7aa" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M102 114 L108 122 M101 113 a2.5 2.5 0 1 1 2 2" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

          {/* Sparkles of inspection */}
          <path d="M15 70 l4 4 M19 70 l-4 4" stroke="#fbbf24" strokeWidth="1.5" />
        </svg>
      );
    } else if (number === "02") {
      return (
        <svg viewBox="0 0 240 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Road Ground and Speed lines */}
          <path d="M10 150 h180" stroke={isDarkMode ? "#334155" : "#cbd5e1"} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M15 158 h140" stroke={isDarkMode ? "#1e293b" : "#94a3b8"} strokeWidth="1.5" strokeDasharray="10 6" strokeOpacity="0.4" />
          
          {/* Blue Car facing right */}
          <circle cx="50" cy="142" r="16" fill="#0f172a" />
          <circle cx="50" cy="142" r="7" fill={isDarkMode ? "#475569" : "#cbd5e1"} stroke="#334155" strokeWidth="2" />
          <circle cx="118" cy="142" r="16" fill="#0f172a" />
          <circle cx="118" cy="142" r="7" fill={isDarkMode ? "#475569" : "#cbd5e1"} stroke="#334155" strokeWidth="2" />
          
          <path d="M25 140 C25 140 25 125 35 120 C42 115 50 100 68 95 C85 90 120 95 132 105 L145 120 C152 124 152 135 150 140 H25 Z" fill="#3b82f6" />
          <path d="M25 137 h125 v4 H25 Z" fill="#1e3a8a" />
          <path d="M68 98 C72 98 83 95 95 98 C105 101 112 108 116 116 H62 Z" fill={isDarkMode ? "#0f172a" : "#1e293b"} />
          <path d="M72 103 L85 116 H75 L67 108 Z" fill="#94a3b8" fillOpacity="0.5" />
          <circle cx="82" cy="108" r="5" fill="#fcd34d" />
          <rect x="79" y="113" width="7" height="4" rx="1.5" fill="#1e3a8a" />
          <path d="M145 124 L175 120 L170 135 L144 128 Z" fill="#fef08a" fillOpacity="0.25" />
          <path d="M142 121 C146 121 148 125 148 128 H140 Z" fill="#fbbf24" />

          {/* Verification Officer/Agent on Right */}
          <path d="M192 125 L196 160 h8 L204 125 L208 160 h8 L212 125 Z" fill={isDarkMode ? "#475569" : "#1e293b"} />
          <circle cx="202" cy="94" r="8" fill="#fed7aa" />
          <path d="M195 92 C195 86 209 86 209 92 L206 88 H198" fill={isDarkMode ? "#64748b" : "#334155"} />
          <path d="M190 104 C190 115 214 115 214 104 Z" fill={isDarkMode ? "#334155" : "#e2e8f0"} stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1" />
          <path d="M194 108 L175 115 L178 120 L195 113 Z" fill="#fed7aa" stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1" />
          
          {/* Clipboard with Verification Certificate */}
          <rect x="162" y="105" width="22" height="30" rx="2" fill={isDarkMode ? "#334155" : "#cbd5e1"} stroke={isDarkMode ? "#475569" : "#94a3b8"} strokeWidth="1.5" />
          <rect x="165" y="110" width="16" height="22" fill="#ffffff" />
          <line x1="168" y1="115" x2="178" y2="115" stroke="#94a3b8" strokeWidth="1" />
          <line x1="168" y1="120" x2="178" y2="120" stroke="#94a3b8" strokeWidth="1" />
          <line x1="168" y1="125" x2="175" y2="125" stroke="#94a3b8" strokeWidth="1" />
          <path d="M174 113 l1.5 1.5 l2.5-3" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M174 118 l1.5 1.5 l2.5-3" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />

          {/* Speed Wind curves */}
          <path d="M12 95 C25 90 40 92 50 90" stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 105 C20 102 35 105 45 102" stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 240 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simple House Background */}
          <path d="M30 90 L85 45 L140 90 Z" fill="#10b981" fillOpacity="0.85" stroke="#059659" strokeWidth="2" />
          <rect 
            x="42" 
            y="90" 
            width="86" 
            height="55" 
            fill={isDarkMode ? "#1e293b" : "#f8fafc"} 
            stroke={isDarkMode ? "#334155" : "#e2e8f0"} 
            strokeWidth="1.5" 
          />
          <rect x="75" y="105" width="20" height="40" fill="#78350f" rx="1" />
          <circle cx="91" cy="125" r="1.5" fill="#fbbf24" />
          <rect x="50" y="100" width="18" height="18" fill={isDarkMode ? "#0f172a" : "#bae6fd"} rx="2" stroke={isDarkMode ? "#334155" : "#cbd5e1"} strokeWidth="1" />
          <line x1="59" y1="100" x2="59" y2="118" stroke={isDarkMode ? "#334155" : "#cbd5e1"} />
          <line x1="50" y1="109" x2="68" y2="109" stroke={isDarkMode ? "#334155" : "#cbd5e1"} />
          
          {/* Contract Document Floating */}
          <rect x="150" y="25" width="45" height="55" rx="3" fill="#fff" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="156" y="32" width="33" height="5" rx="1" fill="#fef3c7" />
          <text x="157" y="36" fill="#d97706" style={{ fill: '#d97706' }} fontSize="4.5" fontWeight="bold">CONTRACT</text>
          <line x1="156" y1="44" x2="189" y2="44" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="156" y1="50" x2="189" y2="50" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="156" y1="56" x2="180" y2="56" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="180" cy="68" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <path d="M178 72 l2-4 l2 4 Z" fill="#fbbf24" />

          {/* Two People Shaking Hands */}
          <path d="M50 135 C50 120 70 120 70 135 L68 165 h-16 Z" fill={isDarkMode ? "#3b82f6" : "#1e3a8a"} />
          <circle cx="60" cy="112" r="8" fill="#fed7aa" />
          <path d="M53 110 C53 104 67 104 67 110" fill={isDarkMode ? "#64748b" : "#334155"} />
          
          <path d="M102 135 C102 120 122 120 122 135 L120 165 h-16 Z" fill="#dc2626" />
          <circle cx="112" cy="112" r="8" fill="#fed7aa" />
          <path d="M105 110 C105 104 119 104 119 110" fill={isDarkMode ? "#b45309" : "#451a03"} />

          {/* Arms Shaking Hands */}
          <path d="M68 128 L88 134 L88 140 L68 132 Z" fill="#fed7aa" stroke={isDarkMode ? "#3b82f6" : "#1e3a8a"} strokeWidth="1.5" />
          <path d="M104 128 L84 134 L84 140 L104 132 Z" fill="#fed7aa" stroke="#dc2626" strokeWidth="1.5" />
          <circle cx="86" cy="137" r="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          
          <path d="M15 40 l3 3 M18 40 l-3 3 M215 110 l4 4 M219 110 l-4 4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <circle cx="215" cy="125" r="3.5" fill="#22c55e" className="animate-pulse" />
        </svg>
      );
    }
  };

  const activeStep = steps[hoveredIndex];

  return (
    <section className={`relative select-none py-12 border-y border-dashed overflow-hidden ${
      isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
    }`}>
      {/* Background High-Tech Grid & Radial Ambient Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-20" />
      
      {/* Blurry Glow Orbs */}
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-orange-500/5 dark:bg-orange-500/[0.03] rounded-full filter blur-[120px] pointer-events-none -z-20" />
      <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/[0.03] rounded-full filter blur-[120px] pointer-events-none -z-20" />

      {/* Visual Pitch section */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
          isDarkMode 
            ? 'bg-slate-900/60 border-slate-800 text-orange-400' 
            : 'bg-orange-500/5 border-orange-500/10 text-primary'
        }`}>
          Interactive Chaka Rim Console
        </span>
        
        <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none mt-2">
          How <span className="bg-gradient-to-r from-primary via-orange-500 to-rose-500 bg-clip-text text-transparent">Chaka</span> Works
        </h2>
        
        <p className={`text-xs sm:text-sm md:text-base font-semibold max-w-xl mx-auto ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        } leading-relaxed`}>
          Bangladesh's trusted self-inspection portal. Tap gears below or spin the wheel to preview checkup, verification, and key delivery stages!
        </p>
      </div>

      {/* MOBILE INTERACTIVE spinning "CHAKA" RIM VIEW */}
      <div className="block md:hidden px-3 pt-6 relative">
        <div className={`p-4 rounded-3xl border relative overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-slate-950/70 border-slate-900 shadow-2xl'
            : 'bg-white/80 border-slate-100 shadow-xl shadow-slate-200/50'
        }`}>
          {/* Wheel Stage Area */}
          <div className="relative w-full h-[155px] flex items-center justify-center overflow-visible">
            
            {/* Ambient Backlight radial glow */}
            <div className={`absolute w-36 h-36 rounded-full blur-[20px] opacity-10 pointer-events-none transition-colors duration-500 ${
              activeStep.color === 'orange' ? 'bg-orange-500' : activeStep.color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
            }`} />

            {/* Centered wheel rim container */}
            <div className="relative w-[150px] h-[150px] flex items-center justify-center overflow-visible">
              
              {/* Static Brembo Red Brake Caliper clamp at top-left quadrant */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 160 160">
                <path 
                  d="M 24,52 A 60,60 0 0,1 62,18" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="11" 
                  strokeLinecap="round" 
                  filter="drop-shadow(0 0 4px rgba(239,68,68,0.4))"
                />
                <text x="33" y="32" fill="#ffffff" fontSize="6.5" fontWeight="black" fontFamily="monospace" transform="rotate(-30 33 32)">BREMBO</text>
              </svg>

              {/* Rotating Alloy Rim & Disc */}
              <motion.div
                className="w-[145px] h-[145px] relative z-10"
                animate={{ rotate: hoveredIndex === 0 ? 0 : hoveredIndex === 1 ? -120 : -240 }}
                transition={{ type: "spring", stiffness: 60, damping: 13 }}
              >
                <svg className="w-full h-full overflow-visible" viewBox="0 0 160 160">
                  <defs>
                    <linearGradient id="rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="50%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                  </defs>

                  {/* Brake Disc surface */}
                  <circle cx="80" cy="80" r="54" fill="#334155" stroke="#475569" strokeWidth="2.5" />
                  <circle cx="80" cy="80" r="54" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Rim Outer Lip */}
                  <circle cx="80" cy="80" r="66" fill="none" stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="5.5" />
                  <circle cx="80" cy="80" r="69" fill="none" stroke={isDarkMode ? "#1e293b" : "#94a3b8"} strokeWidth="2.2" />

                  {/* Tire Tread (Outer black boundary) */}
                  <circle cx="80" cy="80" r="76" fill="none" stroke="#090d16" strokeWidth="10" />
                  <circle cx="80" cy="80" r="76" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="5 7" strokeOpacity="0.15" />

                  {/* 3 spokes going out to step nodes */}
                  {/* Spoke 1 (Check): pointing straight up (0 degrees / 12 o'clock) */}
                  <line x1="80" y1="80" x2="80" y2="20" stroke="url(#rim-grad)" strokeWidth="6" strokeLinecap="round" />
                  {/* Spoke 2 (Verify): pointing at 120 degrees clockwise / 4 o'clock */}
                  <line x1="80" y1="80" x2="132" y2="110" stroke="url(#rim-grad)" strokeWidth="6" strokeLinecap="round" />
                  {/* Spoke 3 (Drive): pointing at 240 degrees clockwise / 8 o'clock */}
                  <line x1="80" y1="80" x2="28" y2="110" stroke="url(#rim-grad)" strokeWidth="6" strokeLinecap="round" />

                  {/* Spoke node indicators */}
                  {/* Node 1 Button */}
                  <g className="cursor-pointer" onClick={() => setHoveredIndex(0)}>
                    <circle cx="80" cy="20" r="12" fill="#ff6600" stroke="#ffffff" strokeWidth="2" />
                    <text x="80" y="24.2" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900" fontFamily="Outfit">1</text>
                  </g>

                  {/* Node 2 Button */}
                  <g className="cursor-pointer" onClick={() => setHoveredIndex(1)}>
                    <circle cx="132" cy="110" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                    <text x="132" y="114.2" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900" fontFamily="Outfit">2</text>
                  </g>

                  {/* Node 3 Button */}
                  <g className="cursor-pointer" onClick={() => setHoveredIndex(2)}>
                    <circle cx="28" cy="110" r="12" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                    <text x="28" y="114.2" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900" fontFamily="Outfit">3</text>
                  </g>
                  
                  {/* Center Hub Cap */}
                  <circle cx="80" cy="80" r="15" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
                  <circle cx="80" cy="80" r="5.5" fill="#ef4444" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Cockpit HUD Screen Panel below the wheel */}
          <div className={`p-3.5 rounded-2xl border transition-all duration-500 relative overflow-hidden mt-3 ${
            activeStep.color === 'orange' ? 'border-orange-500/25' : activeStep.color === 'blue' ? 'border-blue-500/25' : 'border-emerald-500/25'
          } ${
            isDarkMode 
              ? 'bg-slate-950/80 shadow-[inset_0_0_12px_rgba(255,255,255,0.01)]' 
              : 'bg-slate-50/90 shadow-md shadow-slate-100/40'
          }`}>
            
            {/* selector bar headers */}
            {/* <div className="flex items-center justify-between border-b border-dashed border-slate-800/80 dark:border-slate-800/40 pb-2"> */}
              {/* <div className="flex items-center gap-1.5">
                <span className={`text-[7px] font-black font-mono tracking-widest px-1.5 py-0.5 rounded border transition-colors ${
                  activeStep.color === 'orange' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : activeStep.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  RPM: {activeStep.diagnostics.temp === '82°C' ? '1200' : activeStep.diagnostics.temp === '88°C' ? '3400' : '6200'}
                </span>
                <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest font-black">
                  CHAKA_TELEMETRY
                </span>
              </div> */}

              {/* Status indicators */}
              {/* <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors animate-pulse ${
                  activeStep.color === 'orange' ? 'bg-orange-500' : activeStep.color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
                }`} />
                <span className="text-[7px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                  SYS_OK
                </span>
              </div> */}
            {/* </div> */}

            {/* Infotainment body */}
            <div className="flex items-start gap-3 pt-2 text-left">
              {/* Custom SVG badge */}
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center p-1.5 shrink-0 transition-all duration-300 ${
                isDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                {getStepIcon(activeStep.number, "w-full h-full object-contain")}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between w-full">
                  <span className={`block text-[7.5px] font-black uppercase tracking-widest leading-none ${
                    activeStep.color === 'orange' ? 'text-orange-400' : activeStep.color === 'blue' ? 'text-blue-400' : 'text-emerald-400'
                  }`}>
                    Step {activeStep.number}
                  </span>
                  <span className={`text-[8px] font-bold block leading-none ${
                    activeStep.color === 'orange' ? 'text-orange-400' : activeStep.color === 'blue' ? 'text-blue-400' : 'text-emerald-400'
                  }`}>
                    {activeStep.bengaliTitle}
                  </span>
                </div>
                
                <h3 className={`text-[11px] font-black tracking-tight leading-snug mt-1 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900 font-black'
                }`}>
                  {activeStep.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className={`text-[9.5px] leading-relaxed font-semibold text-left transition-colors mt-2 ${
              isDarkMode ? 'text-slate-350' : 'text-slate-600'
            }`}>
              {activeStep.description}
            </p>

            {/* Diagnostics checklist */}
            {/* <div className="grid grid-cols-2 gap-1.5 text-[7.5px] font-mono border-t border-dashed py-2 border-slate-800/80 dark:border-slate-850/40 text-slate-500 text-left mt-3">
              <div className="flex items-center gap-1">
                <span>CALIPER:</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">{activeStep.diagnostics.caliper}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>TIRE_P:</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">{activeStep.diagnostics.psi}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>HEAT:</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">{activeStep.diagnostics.temp}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>INDICATOR:</span>
                <span className={`font-bold transition-colors ${
                  activeStep.color === 'orange' ? 'text-orange-500' : activeStep.color === 'blue' ? 'text-blue-500' : 'text-emerald-500'
                }`}>{activeStep.diagnostics.signal}</span>
              </div>
            </div> */}

          </div>

          {/* Quick HUD Navigation button selector bar */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {steps.map((step, idx) => {
              const isActive = hoveredIndex === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => setHoveredIndex(idx)}
                  className={`py-1.5 rounded-xl border text-[8px] font-black font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? step.color === 'orange' ? 'bg-orange-500 border-orange-400 text-white shadow-orange-500/20'
                        : step.color === 'blue' ? 'bg-blue-600 border-blue-400 text-white shadow-blue-500/20'
                        : 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/20'
                      : isDarkMode
                        ? 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-150 shadow-sm'
                  }`}
                >
                  {step.number === "01" ? "CHECK" : step.number === "02" ? "VERIFY" : "DRIVE"} 0{idx + 1}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* DESKTOP CONNECTED ASYMMETRICAL WAVE TIMELINE */}
      <div className="hidden md:block pt-6 max-w-6xl mx-auto px-6">
        <div className="relative pt-8 pb-12">
          {/* Glowing Winding Highway SVG curves connecting the grid */}
          <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="highway-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6600" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <filter id="neon-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Highway Base Line */}
              <path 
                d="M 16.6,26 Q 50,65 83.3,26" 
                stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} 
                strokeWidth="6" 
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* Glowing Highway Route */}
              <motion.path 
                d="M 16.6,26 Q 50,65 83.3,26" 
                stroke="url(#highway-grad)" 
                strokeWidth="6" 
                strokeLinecap="round"
                filter="url(#neon-glow-filter)"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: hoveredIndex === 0 ? 0.05 : hoveredIndex === 1 ? 0.5 : 1.0 }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                className="opacity-95"
              />

              {/* Animated Laser Comet riding the Highway */}
              <motion.path 
                d="M 16.6,26 Q 50,65 83.3,26" 
                stroke="#ffffff" 
                strokeWidth="6" 
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="25, 150"
                animate={{ strokeDashoffset: [0, -175] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </svg>
          </div>

          {/* Asymmetrical 3-Card Deck Grid */}
          <div className="grid grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const isCenter = idx === 1;
              const isActive = hoveredIndex === idx;
              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative p-8 rounded-[36px] flex flex-col justify-between transition-all duration-500 border overflow-hidden group cursor-pointer ${
                    isCenter ? 'translate-y-12' : 'translate-y-0'
                  } ${
                    isActive
                      ? isDarkMode
                        ? `bg-slate-950/95 ${step.themeClass.activeBorder} shadow-2xl scale-[1.03]`
                        : `bg-white ${step.themeClass.activeBorder} shadow-2xl scale-[1.03]`
                      : isDarkMode
                        ? 'bg-gradient-to-b from-slate-900/40 to-slate-950/20 border-slate-800/80 hover:border-slate-700/60 hover:scale-[1.01] opacity-70'
                        : 'bg-white border-slate-100 hover:border-slate-200/80 hover:scale-[1.01] shadow-md shadow-slate-100/40 opacity-75'
                  }`}
                >
                  {/* Glowing background blur on active */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-b ${step.themeClass.glow} pointer-events-none -z-10`} />
                  )}

                  {/* Elegant large watermark identifier */}
                  <div className={`absolute right-8 top-1/2 -translate-y-1/2 text-[140px] font-black tracking-tighter select-none font-sans pointer-events-none z-0 transition-all duration-500 ${
                    isActive
                      ? step.color === 'orange' ? 'opacity-[0.06] text-orange-400 scale-105'
                        : step.color === 'blue' ? 'opacity-[0.06] text-blue-400 scale-105'
                        : 'opacity-[0.06] text-emerald-400 scale-105'
                      : isDarkMode ? 'opacity-[0.02] text-slate-400' : 'opacity-[0.05] text-slate-300'
                  }`}>
                    {step.number}
                  </div>

                  <div className="space-y-6 relative z-10">
                    {/* SVG Illustration Container */}
                    <div className={`w-full flex items-center justify-center py-4 relative overflow-hidden rounded-3xl p-6 shadow-inner border transition-all duration-500 ${
                      isActive
                        ? step.color === 'orange' ? 'bg-orange-500/5 border-orange-500/10'
                          : step.color === 'blue' ? 'bg-blue-500/5 border-blue-500/10'
                          : 'bg-emerald-500/5 border-emerald-500/10'
                        : isDarkMode 
                          ? 'bg-slate-950/30 border-slate-850/40' 
                          : 'bg-slate-50/50 border-slate-100/50'
                    }`}>
                      {getStepIcon(step.number, "w-full h-36 drop-shadow-sm select-none transition-transform duration-500 group-hover:scale-[1.03]")}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors ${
                          isActive ? step.themeClass.badge : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                        }`}>
                          STEP {step.number}
                        </span>
                        
                        <h3 className={`text-lg lg:text-xl font-black tracking-tight leading-snug mt-3 transition-colors ${
                          isActive 
                            ? isDarkMode ? 'text-white' : 'text-slate-900 font-extrabold'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {step.title}
                        </h3>
                        
                        <span className={`text-xs lg:text-sm font-bold block mt-1 transition-colors ${
                          isActive ? step.themeClass.text : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {step.bengaliTitle}
                        </span>
                      </div>
                      
                      <p className={`text-[12px] lg:text-[13px] leading-relaxed font-semibold transition-colors ${
                        isActive 
                          ? isDarkMode ? 'text-slate-300' : 'text-slate-600'
                          : 'text-slate-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
