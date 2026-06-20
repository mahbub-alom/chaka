import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Search, User, Plus, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BottomNavProps {
  isDarkMode: boolean;
  activeView: string;
  onChangeView: (view: string) => void;
  currentRole: 'guest' | 'user' | 'showroom' | 'admin';
  onChangeRole: (role: 'guest' | 'user' | 'showroom' | 'admin') => void;
  unreadChatsCount: number;
}

export default function BottomNav({
  isDarkMode,
  activeView,
  onChangeView,
  currentRole,
  onChangeRole,
  unreadChatsCount,
}: BottomNavProps) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(375); // Safe initial width fallback
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Monitor location hash changes reactively to sync tabs
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    const interval = setInterval(handleHashChange, 350); // Fallback poll
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(interval);
    };
  }, []);

  // Monitor container width to build coordinates fluidly
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute centers and curve control points
  const cx = width / 2;
  const notchWidth = 72;
  const notchLeft = cx - notchWidth / 2;
  const notchRight = cx + notchWidth / 2;
  const notchDepth = 13;

  // Tab state mappings
  const isHomeActive = activeView === 'home';
  const isBrowseActive = activeView === 'browse';
  const isChatsActive = activeView === 'dashboard' && currentHash.includes('tab=inbox');
  const isAccountActive = activeView === 'dashboard' && !currentHash.includes('tab=inbox') && !currentHash.includes('tab=post-ad');

  const handleHomeClick = () => {
    router.push('/#home');
    onChangeView('home');
  };

  const handleBrowseClick = () => {
    router.push('/#browse');
    onChangeView('browse');
  };

  const handlePostAdClick = () => {
    if (currentRole === 'guest') {
      onChangeRole('user');
    }
    router.push('/#dashboard/post-ad');
    onChangeView('dashboard');
  };

  const handleChatsClick = () => {
    if (currentRole === 'guest') {
      onChangeRole('user');
    }
    router.push('/#dashboard/inbox');
    onChangeView('dashboard');
  };

  const handleAccountClick = () => {
    if (currentRole === 'guest') {
      onChangeRole('user');
    }
    router.push('/#dashboard/my-ads');
    onChangeView('dashboard');
  };

  return (
    <div
      ref={containerRef}
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full h-[56px] flex items-center pb-safe select-none"
    >
      {/* 1. Curved Background SVG Container */}
      <div className="absolute inset-x-0 bottom-0 top-0 -z-10 filter drop-shadow-[0_-5px_12px_rgba(2,154,108,0.05)] dark:drop-shadow-[0_-6px_16px_rgba(0,0,0,0.6)] pointer-events-none">
        <svg
          width={width}
          height="56"
          viewBox={`0 0 ${width} 56`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-all duration-300"
        >
          {/* Base notched curve fill */}
          <path
            d={`M 0 12 
                A 12 12 0 0 1 12 0 
                L ${notchLeft - 3} 0 
                C ${cx - 20} 0, ${cx - 22} ${notchDepth}, ${cx} ${notchDepth} 
                C ${cx + 22} ${notchDepth}, ${cx + 20} 0, ${notchRight + 3} 0 
                L ${width - 12} 0 
                A 12 12 0 0 1 ${width} 12 
                L ${width} 56 
                L 0 56 
                Z`}
            fill={isDarkMode ? '#0a0f1d' : '#ffffff'}
            className="transition-colors duration-300"
          />
          {/* Accent top border stroke */}
          <path
            d={`M 0 12 
                A 12 12 0 0 1 12 0 
                L ${notchLeft - 3} 0 
                C ${cx - 20} 0, ${cx - 22} ${notchDepth}, ${cx} ${notchDepth} 
                C ${cx + 22} ${notchDepth}, ${cx + 20} 0, ${notchRight + 3} 0 
                L ${width - 12} 0 
                A 12 12 0 0 1 ${width} 12`}
            stroke={isDarkMode ? 'rgba(30,41,59,0.7)' : 'rgba(226,232,240,0.9)'}
            strokeWidth="1.2"
            fill="none"
            className="transition-colors duration-300"
          />
        </svg>
      </div>

      {/* 2. Floating overlapping central Post Ad button */}
      <div className="absolute left-1/2 -top-[15px] -translate-x-1/2 z-50 flex flex-col items-center">
        <button
          onClick={handlePostAdClick}
          className="w-10 h-10 bg-[#ff6600]/95 hover:bg-[#eb5e00] text-white flex items-center justify-center rounded-full shadow-md shadow-orange-500/25 ring-3 ring-white dark:ring-[#0a0f1d] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          title={language === 'bn' ? 'আপনার গাড়ির বিজ্ঞাপন দিন' : 'Post Your Vehicle Ad'}
        >
          <Plus className="w-5.5 h-5.5 stroke-[3px]" />
        </button>
        <span className="text-[8px] font-extrabold text-[#ff6600] dark:text-orange-400 mt-0.5 tracking-tight uppercase">
          {language === 'bn' ? 'বিক্রয়' : 'Sell'}
        </span>
      </div>

      {/* 3. Responsive physical interactive Tab items */}
      <div className="w-full h-13 flex items-center justify-between px-3 relative pb-1">
        
        {/* TAB 1: HOME */}
        <button
          onClick={handleHomeClick}
          className={`relative flex flex-col items-center justify-center flex-1 h-full pt-1.2 transition-all cursor-pointer ${
            isHomeActive 
              ? 'text-[#ff6600]' 
              : 'text-slate-450 dark:text-slate-500 hover:text-slate-500'
          }`}
        >
          {isHomeActive && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-[#ff6600] rounded-full shadow-3xs" />
          )}
          <Home className="w-4.5 h-4.5 shrink-0 transition-transform duration-200 active:scale-90" />
          <span className="text-[9.5px] font-bold mt-0.5 tracking-tight leading-none">
            {language === 'bn' ? 'হোম' : 'Home'}
          </span>
        </button>

        {/* TAB 2: BROWSE / SEARCH */}
        <button
          onClick={handleBrowseClick}
          className={`relative flex flex-col items-center justify-center flex-1 h-full pt-1.2 transition-all cursor-pointer ${
            isBrowseActive 
              ? 'text-[#ff6600]' 
              : 'text-slate-450 dark:text-slate-500 hover:text-slate-500'
          }`}
        >
          {isBrowseActive && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-[#ff6600] rounded-full shadow-3xs" />
          )}
          <Search className="w-4.5 h-4.5 shrink-0 transition-transform duration-200 active:scale-90" />
          <span className="text-[9.5px] font-bold mt-0.5 tracking-tight leading-none">
            {language === 'bn' ? 'অনুসন্ধান' : 'Explore'}
          </span>
        </button>

        {/* Placeholder spacer for floating central button */}
        <div className="w-14 h-full shrink-0 pointer-events-none" />

        {/* TAB 3: CHATS INBOX */}
        <button
          onClick={handleChatsClick}
          className={`relative flex flex-col items-center justify-center flex-1 h-full pt-1.2 transition-all cursor-pointer ${
            isChatsActive 
              ? 'text-[#ff6600]' 
              : 'text-slate-450 dark:text-slate-500 hover:text-slate-500'
          }`}
        >
          {isChatsActive && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-[#ff6600] rounded-full shadow-3xs" />
          )}
          <div className="relative">
            <svg 
              viewBox="0 0 100 100" 
              className="w-5 h-5 shrink-0 transition-transform duration-200 active:scale-90 stroke-current fill-current"
              style={{ strokeWidth: '5px' }}
            >
              {/* Rounded pill capsule */}
              <rect x="18" y="24" width="64" height="40" rx="20" fill={isChatsActive ? 'currentColor' : 'none'} />
              {/* Elegant hand-crafted Triangle Tail */}
              <path d="M 45 64 L 56 82 L 56 64 Z" fill={isChatsActive ? 'currentColor' : 'none'} />
              {/* Three dots inside, inversion colors */}
              <circle cx="37" cy="44" r="4.5" fill={isChatsActive ? (isDarkMode ? '#0a0f1d' : '#ffffff') : 'currentColor'} stroke="none" />
              <circle cx="50" cy="44" r="4.5" fill={isChatsActive ? (isDarkMode ? '#0a0f1d' : '#ffffff') : 'currentColor'} stroke="none" />
              <circle cx="63" cy="44" r="4.5" fill={isChatsActive ? (isDarkMode ? '#0a0f1d' : '#ffffff') : 'currentColor'} stroke="none" />
            </svg>
            {unreadChatsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#ff6600] text-white font-black text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center ring-1.5 ring-white dark:ring-[#0a0f1d] animate-pulse">
                {unreadChatsCount}
              </span>
            )}
          </div>
          <span className="text-[9.5px] font-bold mt-0.5 tracking-tight leading-none">
            {language === 'bn' ? 'ইনবক্স' : 'Inbox'}
          </span>
        </button>

        {/* TAB 4: MY ACCOUNT PROFILE */}
        <button
          onClick={handleAccountClick}
          className={`relative flex flex-col items-center justify-center flex-1 h-full pt-1.2 transition-all cursor-pointer ${
            isAccountActive 
              ? 'text-[#ff6600]' 
              : 'text-slate-450 dark:text-slate-500 hover:text-slate-500'
          }`}
        >
          {isAccountActive && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-[#ff6600] rounded-full shadow-3xs" />
          )}
          <User className="w-4.5 h-4.5 shrink-0 transition-transform duration-200 active:scale-90" />
          <span className="text-[9.5px] font-bold mt-0.5 tracking-tight leading-none">
            {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
          </span>
        </button>

      </div>
    </div>
  );
}
export {};
