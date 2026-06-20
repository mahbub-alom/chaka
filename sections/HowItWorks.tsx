import React from 'react';

interface HowItWorksProps {
  isDarkMode: boolean;
}

export default function HowItWorks({ isDarkMode }: HowItWorksProps) {
  const steps = [
    {
      number: "01",
      title: "Check Car & Bike Yourself",
      bengaliTitle: "নিজে গাড়ি/বাইক পরখ করুন",
      description: "Search from hundreds of certified local listings. Examine full detailed specs, browse ultra-clear high-res photos, analyze local BDT valuation scales, and check the vehicle's background on your own terms before contacting sellers.",
      icon: (
        <svg viewBox="0 0 240 180" className="w-full h-44 drop-shadow-sm select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          {/* Pants/Overalls */}
          <path d="M125 120 L135 155 h6 L145 125 L150 155 h6 L158 120 Z" fill="#2563eb" />
          {/* Face/Skin */}
          <circle cx="140" cy="102" r="8" fill="#fed7aa" />
          {/* Hair */}
          <path d="M132 100 C132 94 148 94 148 100 L144 96 H136" fill={isDarkMode ? "#475569" : "#1e293b"} />
          {/* Upper Body Shirt */}
          <path d="M128 112 C128 120 152 120 152 112 Z" fill="#cbd5e1" />
          {/* Arms reaching left */}
          <path d="M132 112 L105 118 L108 123 L130 118 Z" fill="#fed7aa" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M134 114 L110 120 L112 125 L132 120 Z" fill="#fed7aa" stroke="#2563eb" strokeWidth="1.5" />
          {/* Silver Wrench */}
          <path d="M102 114 L108 122 M101 113 a2.5 2.5 0 1 1 2 2" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

          {/* Sparkles of inspection */}
          <path d="M15 70 l4 4 M19 70 l-4 4" stroke="#fbbf24" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Document Verify & Test Ride",
      bengaliTitle: "কাগজপত্র যাচাই ও টেস্ট রাইড",
      description: "Instantly check the authentic Japanese auction sheet report using our verification portal. Cross-examine engine registration dockets and match physical status by scheduling a real-world test ride on open roads.",
      icon: (
        <svg viewBox="0 0 240 180" className="w-full h-44 drop-shadow-sm select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Road Ground and Speed lines */}
          <path d="M10 150 h180" stroke={isDarkMode ? "#334155" : "#cbd5e1"} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M15 158 h140" stroke={isDarkMode ? "#1e293b" : "#94a3b8"} strokeWidth="1.5" strokeDasharray="10 6" strokeOpacity="0.4" />
          
          {/* Blue Car facing right */}
          {/* Wheels */}
          <circle cx="50" cy="142" r="16" fill="#0f172a" />
          <circle cx="50" cy="142" r="7" fill={isDarkMode ? "#475569" : "#cbd5e1"} stroke="#334155" strokeWidth="2" />
          <circle cx="118" cy="142" r="16" fill="#0f172a" />
          <circle cx="118" cy="142" r="7" fill={isDarkMode ? "#475569" : "#cbd5e1"} stroke="#334155" strokeWidth="2" />
          
          {/* Car Body Structure */}
          <path d="M25 140 C25 140 25 125 35 120 C42 115 50 100 68 95 C85 90 120 95 132 105 L145 120 C152 124 152 135 150 140 H25 Z" fill="#3b82f6" />
          {/* Dark Shiny Car Trim / Bottom Protection */}
          <path d="M25 137 h125 v4 H25 Z" fill="#1e3a8a" />
          {/* Windshield and Cabin Windows */}
          <path d="M68 98 C72 98 83 95 95 98 C105 101 112 108 116 116 H62 Z" fill={isDarkMode ? "#0f172a" : "#1e293b"} />
          {/* Glass glossy reflections */}
          <path d="M72 103 L85 116 H75 L67 108 Z" fill="#94a3b8" fillOpacity="0.5" />
          {/* Driver inside car */}
          <circle cx="82" cy="108" r="5" fill="#fcd34d" />
          <rect x="79" y="113" width="7" height="4" rx="1.5" fill="#1e3a8a" />
          {/* Headlight yellow flare */}
          <path d="M145 124 L175 120 L170 135 L144 128 Z" fill="#fef08a" fillOpacity="0.25" />
          <path d="M142 121 C146 121 148 125 148 128 H140 Z" fill="#fbbf24" />

          {/* Verification Officer/Agent on Right */}
          {/* Trousers */}
          <path d="M192 125 L196 160 h8 L204 125 L208 160 h8 L212 125 Z" fill={isDarkMode ? "#475569" : "#1e293b"} />
          {/* Face & Hair */}
          <circle cx="202" cy="94" r="8" fill="#fed7aa" />
          <path d="M195 92 C195 86 209 86 209 92 L206 88 H198" fill={isDarkMode ? "#64748b" : "#334155"} />
          {/* Smart Shirt */}
          <path d="M190 104 C190 115 214 115 214 104 Z" fill={isDarkMode ? "#334155" : "#e2e8f0"} stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1" />
          {/* Arm holding clipboard */}
          <path d="M194 108 L175 115 L178 120 L195 113 Z" fill="#fed7aa" stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1" />
          
          {/* Clipboard with Verification Certificate */}
          <rect x="162" y="105" width="22" height="30" rx="2" fill={isDarkMode ? "#334155" : "#cbd5e1"} stroke={isDarkMode ? "#475569" : "#94a3b8"} strokeWidth="1.5" />
          <rect x="165" y="110" width="16" height="22" fill="#ffffff" />
          {/* Checklist Lines */}
          <line x1="168" y1="115" x2="178" y2="115" stroke="#94a3b8" strokeWidth="1" />
          <line x1="168" y1="120" x2="178" y2="120" stroke="#94a3b8" strokeWidth="1" />
          <line x1="168" y1="125" x2="175" y2="125" stroke="#94a3b8" strokeWidth="1" />
          {/* Green Checkmarks on documents */}
          <path d="M174 113 l1.5 1.5 l2.5-3" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M174 118 l1.5 1.5 l2.5-3" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />

          {/* Speed Wind curves */}
          <path d="M12 95 C25 90 40 92 50 90" stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 105 C20 102 35 105 45 102" stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Complete Purchase & Joyful Drive",
      bengaliTitle: "নিরাপদ ক্রয় ও আনন্দের পথচলা",
      description: "Pay securely, sign the verified legal ownership transfer documents alongside our partner showrooms, acquire the keys, and experience the unrivaled pleasure of driving home your dream car or motorcycle with ultimate joy!",
      icon: (
        <svg viewBox="0 0 240 180" className="w-full h-44 drop-shadow-sm select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simple House Background */}
          {/* Roof */}
          <path d="M30 90 L85 45 L140 90 Z" fill="#10b981" fillOpacity="0.85" stroke="#059659" strokeWidth="2" />
          {/* House Walls */}
          <rect 
            x="42" 
            y="90" 
            width="86" 
            height="55" 
            fill={isDarkMode ? "#1e293b" : "#f8fafc"} 
            stroke={isDarkMode ? "#334155" : "#e2e8f0"} 
            strokeWidth="1.5" 
          />
          {/* Door */}
          <rect x="75" y="105" width="20" height="40" fill="#78350f" rx="1" />
          <circle cx="91" cy="125" r="1.5" fill="#fbbf24" />
          {/* Window */}
          <rect x="50" y="100" width="18" height="18" fill={isDarkMode ? "#0f172a" : "#bae6fd"} rx="2" stroke={isDarkMode ? "#334155" : "#cbd5e1"} strokeWidth="1" />
          <line x1="59" y1="100" x2="59" y2="118" stroke={isDarkMode ? "#334155" : "#cbd5e1"} />
          <line x1="50" y1="109" x2="68" y2="109" stroke={isDarkMode ? "#334155" : "#cbd5e1"} />
          
          {/* Contract Document Floating in Right-Upper Corner */}
          <rect x="150" y="25" width="45" height="55" rx="3" fill="#fff" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="156" y="32" width="33" height="5" rx="1" fill="#fef3c7" />
          {/* "CONTRACT" placeholder text */}
          <text x="157" y="36" fill="#d97706" style={{ fill: '#d97706' }} fontSize="4.5" fontWeight="bold">CONTRACT</text>
          {/* Lines on contract */}
          <line x1="156" y1="44" x2="189" y2="44" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="156" y1="50" x2="189" y2="50" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="156" y1="56" x2="180" y2="56" stroke="#e2e8f0" strokeWidth="1.5" />
          {/* Gold medal / seal of authenticity */}
          <circle cx="180" cy="68" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <path d="M178 72 l2-4 l2 4 Z" fill="#fbbf24" />

          {/* Two People Shaking Hands */}
          {/* Person Left (Seller/Agent in Navy Suit) */}
          <path d="M50 135 C50 120 70 120 70 135 L68 165 h-16 Z" fill={isDarkMode ? "#3b82f6" : "#1e3a8a"} />
          <circle cx="60" cy="112" r="8" fill="#fed7aa" />
          <path d="M53 110 C53 104 67 104 67 110" fill={isDarkMode ? "#64748b" : "#334155"} />
          
          {/* Person Right (Buyer in Red Sweater) */}
          <path d="M102 135 C102 120 122 120 122 135 L120 165 h-16 Z" fill="#dc2626" />
          <circle cx="112" cy="112" r="8" fill="#fed7aa" />
          <path d="M105 110 C105 104 119 104 119 110" fill={isDarkMode ? "#b45309" : "#451a03"} />

          {/* Arms Shaking Hands in Center */}
          {/* Left person arm */}
          <path d="M68 128 L88 134 L88 140 L68 132 Z" fill="#fed7aa" stroke={isDarkMode ? "#3b82f6" : "#1e3a8a"} strokeWidth="1.5" />
          {/* Right person arm */}
          <path d="M104 128 L84 134 L84 140 L104 132 Z" fill="#fed7aa" stroke="#dc2626" strokeWidth="1.5" />
          
          {/* Handshake clasp detail */}
          <circle cx="86" cy="137" r="4.5" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          
          {/* Sparkles of celebration / success */}
          <path d="M15 40 l3 3 M18 40 l-3 3 M215 110 l4 4 M219 110 l-4 4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <circle cx="215" cy="125" r="3.5" fill="#22c55e" className="animate-pulse" />
        </svg>
      )
    }
  ];

  return (
    <section className={`space-y-8 select-none py-10 border-y border-dashed ${
      isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
    }`}>
      {/* Dynamic Visual Pitch section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className={`text-2xl md:text-3xl font-black tracking-tight matches-outfit ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          How Chaka Works
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-orange-500 mx-auto rounded-full animate-pulse" />
        <p className={`text-xs sm:text-sm md:text-base font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
          Bangladesh's trusted self-inspection portal. We empower buyers with transparency, verified documentation, and immediate test ride flexibility.
        </p>
      </div>

      {/* 3 Step Visual Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`relative p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-350 border overflow-hidden group ${
              isDarkMode
                ? 'bg-gradient-to-b from-slate-900/85 to-slate-950/50 border-slate-800 hover:border-orange-500/40 hover:shadow-2xl shadow-slate-950/70'
                : 'bg-white border-slate-100 hover:border-primary/30 hover:shadow-2xl shadow-slate-200/65'
            }`}
          >
            {/* Elegant large background digit identifier (watermark) */}
            <div className={`absolute right-6 top-1/2 -translate-y-1/2 text-[110px] sm:text-[130px] font-black tracking-tighter select-none font-sans pointer-events-none z-0 ${
              isDarkMode ? 'opacity-[0.03] text-slate-400' : 'opacity-[0.05] text-slate-300'
            }`}>
              {step.number}
            </div>

            <div className="space-y-6 relative z-10">
              {/* Large SVG illustration centered inside card */}
              <div className={`w-full flex items-center justify-center py-2 relative overflow-hidden rounded-2xl p-4 shadow-inner border ${
                isDarkMode 
                  ? 'bg-slate-950/30 border-slate-800/20' 
                  : 'bg-slate-50/50 border-slate-100/50'
              }`}>
                {step.icon}
              </div>

              <div className="space-y-3">
                <div>
                  <span className={`block text-[11px] sm:text-xs font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    STEP {step.number}
                  </span>
                  
                  <h3 className={`text-base sm:text-lg md:text-xl font-black tracking-tight leading-snug mt-1.5 transition-colors ${
                    isDarkMode ? 'text-slate-100 group-hover:text-orange-400' : 'text-slate-900 group-hover:text-primary'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <span className={`text-xs sm:text-sm font-bold block mt-1 ${
                    isDarkMode ? 'text-orange-400' : 'text-primary'
                  }`}>
                    {step.bengaliTitle}
                  </span>
                </div>
                
                <p className={`text-xs sm:text-[13px] leading-relaxed font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
