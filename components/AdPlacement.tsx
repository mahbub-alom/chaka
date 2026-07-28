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
              ? 'bg-slate-950 border-slate-900' 
              : 'bg-white border-slate-200/80 shadow-md shadow-slate-200/50'
          }`}
        >
          {/* Anti-irritation AdSense Control Bar */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-1 px-2.5 text-[9px] uppercase tracking-wider rounded-full bg-black/40 text-white hover:bg-black/60 font-extrabold backdrop-blur-xs transition-colors cursor-pointer"
              title="Sponsorship Info"
            >
              Sponsor
            </button>
            <button 
              onClick={handleDismiss}
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
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

          {/* Full-width ads.gif banner preserving same container height */}
          <a
  href="/"
  className="block w-full overflow-hidden"
>
    <img
        src="/advertisement/ads.gif"
        alt="Advertisement"
        className="block w-full h-auto"
    />
</a>
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
              ? 'bg-slate-900 border-slate-800' 
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          {/* Anti-irritation Control Bar */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
              title="Sponsorship Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={handleDismiss}
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
              title="Hide this Ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {showInfo && (
            <div className={`absolute inset-0 z-20 p-6 flex flex-col justify-center backdrop-blur-lg ${
              isDarkMode ? 'bg-slate-950/95 text-slate-300' : 'bg-white/95 text-slate-700'
            }`}>
              <h4 className="text-sm font-extrabold flex items-center gap-1.5 mb-1.5 text-primary">
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

          {/* Full-width ads.gif banner preserving same container height */}
          <a 
            href="/"
            className="block w-full min-h-[80px] sm:min-h-[120px] md:min-h-[160px] relative"
          >
            <img 
              src="/advertisement/ads.gif" 
              alt="Advertisement"
              className="absolute inset-0 w-full h-full object-cover md:object-contain"
            />
          </a>
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
        className={`relative rounded-xl border group transition-all duration-300 overflow-hidden ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        {/* Anti-irritation Control Bar */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleDismiss}
            className="p-1 rounded-full bg-black/40 text-white hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Full-width ads.gif sidebar ad preserving same container height */}
        <a 
          href="/"
          className="block w-full h-[200px] relative"
        >
          <img 
            src="/advertisement/ads.gif" 
            alt="Advertisement"
            className="absolute inset-0 w-full h-full object-cover md:object-contain"
          />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}
