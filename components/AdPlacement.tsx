import { useState, useEffect } from 'react';
import { AdvertisementSlot } from '@/types';
import { X, ExternalLink, Info, ShieldCheck, Phone, Clipboard, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdPlacementProps {
  slot: AdvertisementSlot;
  allSlots?: AdvertisementSlot[];
  isDarkMode: boolean;
  onAdClosed?: (id: string) => void;
}

export default function AdPlacement({ slot, allSlots = [], isDarkMode, onAdClosed }: AdPlacementProps) {
  // Filter active ad slots matching this exact placement category
  const activeMatchingSlots = allSlots.length > 0
    ? allSlots.filter((s) => s.placement === slot.placement && s.isActive)
    : [slot];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReported, setIsReported] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Sync index to slot if a specific slot is passed or changes
  useEffect(() => {
    const idx = activeMatchingSlots.findIndex((s) => s.id === slot.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
    } else {
      setCurrentIndex(0);
    }
  }, [slot.id, activeMatchingSlots.length]);

  // Timer-based rotation logic: Rotate advertisements every 30 seconds to support multiple sponsors
  useEffect(() => {
    if (activeMatchingSlots.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeMatchingSlots.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [activeMatchingSlots.length]);

  const activeSlot = activeMatchingSlots[currentIndex] || slot;

  if (isDismissed || !activeSlot.isActive) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onAdClosed) onAdClosed(activeSlot.id);
  };

  const handleReport = () => {
    setIsReported(true);
    setTimeout(() => {
      setIsDismissed(true);
    }, 2000);
  };

  if (isReported) {
    return (
      <div 
        id={`ad-reported-${activeSlot.id}`}
        className={`p-4 text-center rounded-xl border border-dashed text-xs ${
          isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}
      >
        <p className="font-semibold flex items-center justify-center gap-1.5 text-orange-500">
          <ShieldCheck className="w-4 h-4 text-orange-500" /> Ad has been closed. Thank you for helping keep our premium services free!
        </p>
      </div>
    );
  }

  // Large home-top banner custom implementation matching the requested banner layout
  if (activeSlot.placement === 'home-top') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlot.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          id={`ad-banner-premium-${activeSlot.id}`}
          className={`relative overflow-hidden rounded-2.5xl border transition-all duration-300 group ${
            isDarkMode 
              ? 'bg-[#019463] border-orange-800' 
              : 'bg-[#019463] border-orange-600/30 shadow-md shadow-orange-950/10'
          }`}
        >
          {/* Anti-irritation AdSense Control Bar */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-1 px-2.5 text-[9px] uppercase tracking-wider rounded-full bg-white/20 text-white hover:bg-white/35 font-extrabold backdrop-blur-xs transition-colors"
              title="Sponsorship Info"
            >
              Sponsor
            </button>
            <button 
              onClick={handleDismiss}
              className="p-1.5 rounded-full bg-white/20 text-white hover:bg-rose-600 hover:text-white transition-colors"
              title="Hide this Ad"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {showInfo && (
            <div className="absolute inset-0 z-30 p-6 flex flex-col justify-center bg-slate-950/95 text-slate-300 backdrop-blur-lg rounded-2.5xl">
              <h4 className="text-sm font-extrabold flex items-center gap-1.5 mb-1.5 text-orange-400">
                <ShieldCheck className="w-4 h-4" /> Chaka Bangladesh Sponsors
              </h4>
              <p className="text-xs leading-relaxed max-w-xl">
                This official native advertisement slots connect verified Bangladeshi auto portals/brands with local buyers. To list your banners or promote listings across Chaka, please contact support.
              </p>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={handleReport}
                  className="text-xs px-4 py-2 bg-rose-650 hover:bg-rose-700 text-white rounded-xl transition-colors font-bold cursor-pointer"
                >
                  Report Spot
                </button>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="text-xs px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-bold cursor-pointer"
                >
                  Go Back
                </button>
              </div>
            </div>
          )}

          {/* Elegant layout inspired by the uploaded ad banner */}
          <div className="relative flex flex-col md:flex-row items-center justify-between min-h-[140px] md:min-h-[160px] px-6 sm:px-10 py-5 md:py-6 overflow-hidden">
            
            {/* Top Yellow Bean Blob (matching the organic hanging shape in center-right of image) */}
            <div 
              className="absolute -top-12 left-[40%] md:left-[42%] w-44 md:w-52 h-28 md:h-36 bg-[#f4b830] opacity-90 pointer-events-none z-0"
              style={{ borderRadius: '0% 0% 70% 50% / 0% 0% 120% 100%' }}
            />

            {/* Bottom Right Yellow Blob (the car rests over this yellow deck on the right) */}
            <div 
              className="absolute -bottom-24 -right-16 w-72 md:w-96 h-48 md:h-64 bg-[#f4b830] pointer-events-none z-0 opacity-100"
              style={{ borderRadius: '100px 0 0 100px' }}
            />
            
            {/* Floating Gold Coin Element in Top-Left */}
            <div className="absolute top-2.5 left-[14%] sm:left-[16%] opacity-100 pointer-events-none z-10 animate-bounce-subtle">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-b from-[#ffe699] via-[#f4b830] to-[#b37a00] border border-[#fff2b2] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {/* Inner shiny highlight ring */}
                <div className="w-[85%] h-[85%] rounded-full border border-[#ffe699]/30 bg-gradient-to-tr from-[#e5a210] to-[#ffd166] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#f4b830]/10 border border-[#fff2b2]/45 shadow-inner" />
                </div>
              </div>
            </div>

            {/* Dark Wireframe Clipboard Outline in Top-Right */}
            <div className="absolute top-2.5 right-6 md:right-8 opacity-15 transform rotate-[22deg] pointer-events-none select-none z-0 hidden sm:block">
              <svg viewBox="0 0 44 54" fill="none" stroke="currentColor" className="text-black w-14 h-16" strokeWidth="1.6">
                {/* Clipboard outline */}
                <rect x="5" y="8" width="34" height="42" rx="4" />
                {/* Clip at top */}
                <path d="M16 8 V5 C16 3.5, 17.5 2.5, 19 2.5 H25 C26.5 2.5, 28 3.5, 28 5 V8" fill="currentColor" fillOpacity="0.3" />
                {/* Internal paper list lines */}
                <line x1="11" y1="18" x2="33" y2="18" strokeDasharray="1 1" />
                <line x1="11" y1="24" x2="28" y2="24" />
                <line x1="11" y1="30" x2="31" y2="30" />
                <line x1="11" y1="36" x2="24" y2="36" strokeDasharray="2 2" />
                {/* Bullet circular items */}
                <circle cx="31" cy="24" r="1.5" />
                <circle cx="31" cy="30" r="1.5" />
              </svg>
            </div>

            {/* Content Block */}
            <div className="flex-1 text-center md:text-left space-y-1.5 md:space-y-2 z-10 pr-0 md:pr-4">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="bg-[#f4b830] text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Partner Spotlight ({currentIndex + 1}/{activeMatchingSlots.length})
                </span>
              </div>
              
              {/* Dynamic Header */}
              <h2 className="text-xl sm:text-2xl lg:text-[25px] font-black text-white tracking-wide font-sans leading-tight">
                {activeSlot.title}
              </h2>
              
              {/* Dynamic Description */}
              <p className="text-[#e2f7ef] font-semibold text-[11px] sm:text-xs md:text-[13px] tracking-wide opacity-90">
                {activeSlot.description}
              </p>

              {/* Dial option or target link with button */}
              <div className="flex items-center justify-center md:justify-start pt-2 md:pt-3">
                {activeSlot.targetUrl.startsWith('tel:') ? (
                  <a 
                    href={activeSlot.targetUrl}
                    className="inline-flex items-center gap-3.5 group/call cursor-pointer"
                  >
                    {/* Yellow Call Badge */}
                    <div className="w-11 h-11 rounded-full bg-[#f4b830] text-[#019463] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/call:scale-105 active:scale-95 shrink-0">
                      <svg className="w-5.5 h-5.5 transform -rotate-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <span className="text-white font-[900] tracking-wide text-xl sm:text-2xl md:text-[28px] font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] leading-none">
                      {activeSlot.targetUrl.replace('tel:', '')}
                    </span>
                  </a>
                ) : (
                  <a 
                    href={activeSlot.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black bg-[#f4b830] hover:bg-yellow-500 text-slate-950 py-2.5 px-5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <span>Visit Sponsor Hub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Side: High-End White Sports Car Render Area or Ad Image */}
            <div className="w-full md:w-[260px] lg:w-[320px] relative h-24 sm:h-28 md:h-36 mt-4 md:mt-0 flex items-center justify-center z-10 select-none shrink-0">
              <div className="absolute bottom-2 md:bottom-2.5 left-1/2 -translate-x-1/2 w-[90%] h-3 bg-black/40 rounded-full blur-md" />
              
              <img 
                referrerPolicy="no-referrer"
                src={activeSlot.imageUrl || "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=480"} 
                alt={activeSlot.title}
                className="relative w-auto h-20 sm:h-24 md:h-[105px] lg:h-[115px] object-contain filter brightness-110 drop-shadow-[0_12px_12px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Large banner (generic/bottom ad placement)
  if (activeSlot.placement === 'listing-detail-bottom') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlot.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35 }}
          id={`ad-banner-${activeSlot.id}`}
          className={`relative overflow-hidden rounded-2xl border transition-all duration-300 group ${
            isDarkMode 
              ? 'bg-slate-900/40 border-slate-800/80 hover:border-orange-500/20' 
              : 'bg-gradient-to-r from-orange-50/20 via-white to-orange-50/10 border-slate-200/60 hover:border-[#ff6600]/30 shadow-xs'
          }`}
        >
          {/* Anti-irritation AdSense Control Bar */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isDarkMode ? 'bg-slate-950/80 hover:bg-slate-800 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
              title="Sponsorship Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={handleDismiss}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isDarkMode ? 'bg-slate-950/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-450' : 'bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600'
              }`}
              title="Hide this Ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {showInfo && (
            <div className={`absolute inset-0 z-20 p-6 flex flex-col justify-center backdrop-blur-lg ${
              isDarkMode ? 'bg-slate-950/95 text-slate-300' : 'bg-white/95 text-slate-700'
            }`}>
              <h4 className="text-sm font-extrabold flex items-center gap-1.5 mb-1.5 text-[#ff6600]">
                <ShieldCheck className="w-4 h-4" /> Sponsored Partner Policy
              </h4>
              <p className="text-xs leading-relaxed max-w-xl">
                This native advertisement is delivered via our certified advertising network. Browsing vehicle listings on Chaka.BD is completely free; these secure third-party sponsorships allow us to maintain our services and verification systems without cost to everyday buyers and sellers.
              </p>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={handleReport}
                  className="text-xs px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-colors font-bold cursor-pointer"
                >
                  Report Ad
                </button>
                <button 
                  onClick={() => setShowInfo(false)}
                  className={`text-xs px-2.5 py-1.5 rounded-xl transition-colors font-bold cursor-pointer ${
                    isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  Go Back
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-stretch">
            {/* Ad Creative Image Area */}
            <div className="md:w-1/3 relative h-36 md:h-auto overflow-hidden shrink-0">
              <img 
                referrerPolicy="no-referrer"
                src={activeSlot.imageUrl} 
                alt={activeSlot.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-black tracking-wider uppercase rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
                Featured Partner ({currentIndex + 1}/{activeMatchingSlots.length})
              </div>
            </div>

            {/* Ad Copy */}
            <div className="flex-1 p-5 md:p-6.5 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-1.5 font-sans">
                <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-orange-400' : 'text-[#ff6600]'}`}>
                  Official Sponsor Offer
                </span>
                <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                <span className={`text-[9px] font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>AdX Network Verified</span>
              </div>
              
              <h3 className={`text-sm md:text-base font-black mb-1.5 group-hover:text-[#ff6600] transition-colors ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {activeSlot.title}
              </h3>
              
              <p className={`text-xs leading-normal mb-4 max-w-xl ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {activeSlot.description}
              </p>

              <a 
                href={activeSlot.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 self-start text-xs font-bold py-2.5 px-4 rounded-xl bg-[#ff6600] hover:bg-[#eb5e00] text-white transition-all shadow-md shadow-orange-500/5 hover:-translate-y-0.5"
              >
                <span>Learn More</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Sidebar or Inline list placement (listing-detail-sidebar)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSlot.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
        id={`ad-sidebar-${activeSlot.id}`}
        className={`relative p-4 rounded-xl border group transition-all duration-300 overflow-hidden ${
          isDarkMode 
            ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' 
            : 'bg-white border-slate-200 hover:border-teal-200'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-wider">
            Sponsored Link ({currentIndex + 1}/{activeMatchingSlots.length})
          </span>
          <button 
            onClick={handleDismiss}
            className={`p-1 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-300' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
            }`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="block cursor-pointer">
          {activeSlot.imageUrl && (
            <div className="w-full h-24 rounded-lg overflow-hidden mb-2">
              <img 
                referrerPolicy="no-referrer"
                src={activeSlot.imageUrl} 
                alt={activeSlot.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <h4 className={`text-xs font-bold truncate group-hover:text-teal-400 transition-colors ${
            isDarkMode ? 'text-slate-200' : 'text-slate-800'
          }`}>
            {activeSlot.title}
          </h4>
          <p className={`text-[11px] leading-relaxed line-clamp-2 mt-1 mb-2 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {activeSlot.description}
          </p>
          <a 
            href={activeSlot.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
          >
            Partner Page <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
