import React, { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Home, 
  Car, 
  Bike, 
  Wrench, 
  ShieldCheck, 
  Package, 
  LayoutGrid, 
  PlusCircle,
  LayoutDashboard,
  UserCheck,
  User,
  MessageSquare,
  Clock,
  History,
  Menu
} from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  currentRole: 'guest' | 'user' | 'showroom' | 'admin';
  onChangeRole: (role: 'guest' | 'user' | 'showroom' | 'admin') => void;
  activeView: string;
  activeCategory?: string;
  onChangeView: (view: string, category?: string) => void;
  unreadChatsCount: number;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onOpenFeedback?: () => void;
  userProfile?: any;
  showroomProfile?: any;
  onMobileMenuToggle: () => void;
}

export default function Header({
  isDarkMode,
  onThemeToggle,
  currentRole,
  onChangeRole,
  activeView,
  activeCategory = 'all',
  onChangeView,
  searchQuery = '',
  onSearchQueryChange,
  onOpenFeedback,
  unreadChatsCount,
  userProfile,
  showroomProfile,
  onMobileMenuToggle
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('chaka-recent-searches');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, 5);
      } catch (e) {}
    }
    return [];
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const saveSearchQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      localStorage.setItem('chaka-recent-searches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearSearchItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter(q => q !== item);
    setRecentSearches(updated);
    localStorage.setItem('chaka-recent-searches', JSON.stringify(updated));
  };

  const handleClearAllSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.setItem('chaka-recent-searches', JSON.stringify([]));
  };

  // Synchronize external changes to local state (e.g. when reset button is pressed)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      <div className={`w-full py-1 border-b select-none transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-950 border-slate-900 text-slate-300' 
          : 'bg-slate-900 border-slate-800 text-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-4">

          <div className="flex items-center gap-3">
            {/* Language Switcher Button Group */}
            <div className="flex items-center gap-1 bg-slate-800 dark:bg-slate-950 p-0.5 rounded-md border border-slate-700/60 max-h-7 select-none">
              <button 
                onClick={() => setLanguage('en')}
                className={`text-[9px] font-black px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  language === 'en' 
                    ? 'bg-[#ff6600] text-white font-black shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('bn')}
                className={`text-[9px] font-black px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  language === 'bn' 
                    ? 'bg-[#ff6600] text-white font-black shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                বাং
              </button>
            </div>

            {/* Simulation Role Selector */}
            <div className="hidden xs:flex items-center gap-1.5 bg-slate-800 dark:bg-slate-950 p-1 px-2 rounded-md border border-slate-700/60 max-h-7">
              <span className="text-[8.5px] text-slate-400 uppercase tracking-wider font-extrabold">{t('roleLabel')}</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const role = e.target.value as any;
                  onChangeRole(role);
                  if (role !== 'guest') {
                    onChangeView('dashboard');
                  } else {
                    onChangeView('home');
                  }
                }}
                className="bg-transparent text-[10px] font-bold text-white focus:outline-none cursor-pointer border-none"
              >
                <option value="guest" className="text-slate-900 font-bold bg-white">{t('selectRole')}</option>
                <option value="user" className="text-slate-900 font-bold bg-white">{t('sellerRole')}</option>
                <option value="showroom" className="text-slate-900 font-bold bg-white">{t('showroomRole')}</option>
                <option value="admin" className="text-slate-900 font-bold bg-white">{t('adminRole')}</option>
              </select>
            </div>

            {/* Theme / Mode Toggle */}
            <div className="flex items-center">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <div className={`transition-all duration-300 py-0.5 ${
        isDarkMode 
          ? 'bg-slate-950 text-slate-100 border-b border-slate-900/40 shadow-lg shadow-black/20' 
          : 'bg-white text-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)]'
      }`}>
        <div className="max-w-7xl mx-auto px-1 xs:px-2.5 sm:px-6 lg:px-8">
          {/* Main top bar container */}
          <div className="h-14 flex items-center justify-between gap-1 sm:gap-3 md:gap-4 select-none">
            
            {/* Hamburger menu for Mobile */}
            <button
              onClick={onMobileMenuToggle}
              className={`lg:hidden flex items-center justify-center p-1 rounded-lg transition-all cursor-pointer -ml-2.5 mr-0 shrink-0 h-8.5 w-8.5 sm:h-9 sm:w-9 ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </button>

            {/* 1. BRAND Logo / Tagline */}
            <div 
              onClick={() => onChangeView('home')}
              className="flex items-center cursor-pointer group select-none min-w-fit pr-0.5 sm:pr-2 -ml-1"
            >
              {/* Dynamic Unified Combined Logo: Bubbly Chaka Text + Elegant Sleek Car Silhouette Wireframe Overlay */}
              <div className={`relative flex items-center h-10 sm:h-12 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-orange-400 group-hover:text-orange-300' 
                  : 'text-[#ff6600] group-hover:text-orange-600'
              }`}>
                <svg 
                  className="h-[25px] xs:h-[31px] sm:h-[36px] md:h-[42px] w-auto transition-transform duration-500 group-hover:scale-[1.02]" 
                  viewBox="0 0 172 54" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* The CAD drafting/grid highlight lines on top of the roof structure (opacity for premium look) */}
                  <path 
                    d="M48 6 L60 22 M75 3 L92 24 M110 5 L124 23 M130 9 L139 21 M58 20 L84 4 M88 18 L114 3 M118 19 L138 8" 
                    stroke="currentColor" 
                    strokeWidth="0.7" 
                    strokeOpacity="0.22" 
                  />
                  
                  {/* Main elegant wireframe/contour outline of the right-facing sportscar silhouette */}
                  <path 
                    d="M 5 35 
                       C 5 30, 4 20, 8 17 
                       C 11 14, 18 17, 20 15 
                       C 23 13.5, 27 10.5, 38 9 
                       C 52 7, 74 5.5, 100 6 
                       C 118 6.2, 130 9, 138 12.5
                       C 146 16, 149 18.5, 153 18.5
                       C 156 18.5, 159 19, 165 21.5
                       C 169 23, 170 25.5, 170.5 27.5
                       C 171 29, 170 30.2, 168.5 31
                       C 166.5 32, 164 32.5, 162 30
                       C 160.5 28.5, 159 27.5, 155 27.5
                       C 151 27.5, 142 28.5, 138 31
                       C 135.5 32.5, 135 35.5, 135 38
                       C 135 42.5, 134 44, 138 44.2
                       C 143 44.5, 149.5 43.5, 153 40.5
                       C 156 38, 155.5 36.5, 155 35
                       C 154.5 33.5, 156.5 32.5, 158 33
                       C 159.5 33.5, 159 35, 159 36.5
                       C 159 39, 155.5 44.5, 144 46.5
                       C 138 47.5, 129 46, 129 43
                       L 129 37
                       C 129 31, 104 30, 98 30
                       C 89 30, 74 31.5, 65 31.5
                       M 170.5 27.5
                       C 170.5 27.5, 168.5 29.2, 167.5 30
                       M 153 18.5
                       C 139 18.5, 118 19.2, 96 19.5" 
                    stroke="currentColor" 
                    strokeWidth="1.6" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />

                  {/* High accuracy styling details for front bumper / headlight layout */}
                  <path 
                    d="M139 20 C146 20.5, 152 22.5, 158 24 M156 27.5 C159 30, 161.5 30.5, 165 30" 
                    stroke="currentColor" 
                    strokeWidth="0.8" 
                    strokeOpacity="0.4"
                  />

                  {/* Bubbly 'Chaka' Text matching Fredoka font perfectly inside the vehicle outline wrapper */}
                  <text 
                    x="21" 
                    y="43" 
                    className="font-logo font-bold select-none text-[32px] tracking-tight" 
                    fill="currentColor"
                    style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}
                  >
                    Chaka
                  </text>
                </svg>
              </div>
            </div>



            {/* 2. CENTER NAVIGATION links with Icons */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              
              {/* All Ads Path */}
              <button
                onClick={() => onChangeView('browse', 'all')}
                className={`text-[12.5px] xl:text-[13.5px] font-bold py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 border border-transparent leading-none cursor-pointer transition-all duration-300 transform-gpu hover:scale-[1.05] active:scale-[0.95] ${
                  activeView === 'browse' && (activeCategory === 'all' || !activeCategory)
                    ? isDarkMode
                      ? 'bg-orange-950/40 border-orange-900/40 text-orange-400 font-extrabold shadow-md'
                      : 'bg-orange-50/60 border-orange-100/70 text-[#ff6600] font-extrabold shadow-xs'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-[#ff6600] hover:bg-slate-50'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> {language === 'bn' ? 'সকল বিজ্ঞাপন' : 'All Ads'}
              </button>
   
              {/* Cars Category Filter Path */}
              <button
                onClick={() => onChangeView('browse', 'car')}
                className={`text-[12.5px] xl:text-[13.5px] font-bold py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 border border-transparent leading-none cursor-pointer transition-all duration-300 transform-gpu hover:scale-[1.05] active:scale-[0.95] ${
                  activeView === 'browse' && activeCategory === 'car'
                    ? isDarkMode
                      ? 'bg-orange-950/40 border-orange-900/40 text-orange-400 font-extrabold shadow-md'
                      : 'bg-orange-50/60 border-orange-100/70 text-[#ff6600] font-extrabold shadow-xs'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-[#ff6600] hover:bg-slate-50'
                }`}
              >
                <Car className="w-3.5 h-3.5" /> {language === 'bn' ? 'গাড়ি' : 'Cars'}
              </button>
   
              {/* Bikes Category Filter Path */}
              <button
                onClick={() => onChangeView('browse', 'bike')}
                className={`text-[12.5px] xl:text-[13.5px] font-bold py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 border border-transparent leading-none cursor-pointer transition-all duration-300 transform-gpu hover:scale-[1.05] active:scale-[0.95] ${
                  activeView === 'browse' && activeCategory === 'bike'
                    ? isDarkMode
                      ? 'bg-orange-950/40 border-orange-900/40 text-orange-400 font-extrabold shadow-md'
                      : 'bg-orange-50/60 border-orange-100/70 text-[#ff6600] font-extrabold shadow-xs'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-[#ff6600] hover:bg-slate-50'
                }`}
              >
                <Bike className="w-3.5 h-3.5" /> {language === 'bn' ? 'বাইক' : 'Bikes'}
              </button>
   
              {/* Parts Category Filter Path */}
              <button
                onClick={() => onChangeView('browse', 'parts')}
                className={`text-[12.5px] xl:text-[13.5px] font-bold py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 border border-transparent leading-none cursor-pointer transition-all duration-300 transform-gpu hover:scale-[1.05] active:scale-[0.95] ${
                  activeView === 'browse' && activeCategory === 'parts'
                    ? isDarkMode
                      ? 'bg-orange-950/40 border-orange-900/40 text-orange-400 font-extrabold shadow-md'
                      : 'bg-orange-50/60 border-orange-100/70 text-[#ff6600] font-extrabold shadow-xs'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-[#ff6600] hover:bg-slate-50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" /> {language === 'bn' ? 'পার্টস' : 'Parts'}
              </button>
   
              {/* Services Category Filter Path */}
              <button
                onClick={() => onChangeView('browse', 'service')}
                className={`text-[12.5px] xl:text-[13.5px] font-bold py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 border border-transparent leading-none cursor-pointer transition-all duration-300 transform-gpu hover:scale-[1.05] active:scale-[0.95] ${
                  activeView === 'browse' && activeCategory === 'service'
                    ? isDarkMode
                      ? 'bg-orange-950/40 border-orange-900/40 text-orange-400 font-extrabold shadow-md'
                      : 'bg-orange-50/60 border-orange-100/70 text-[#ff6600] font-extrabold shadow-xs'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-[#ff6600] hover:bg-slate-50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" /> {language === 'bn' ? 'সার্ভিস' : 'Services'}
              </button>
   
              {/* Auction Verify Category Path */}
              <button
                onClick={() => handleAuctionVerifyClick()}
                className={`text-[12.5px] xl:text-[13.5px] font-bold py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 border border-transparent leading-none cursor-pointer transition-all duration-300 transform-gpu hover:scale-[1.05] active:scale-[0.95] ${
                  activeView === 'auction-verify'
                    ? isDarkMode
                      ? 'bg-orange-950/40 border-orange-900/40 text-orange-400 font-extrabold shadow-md'
                      : 'bg-orange-50/60 border-orange-100/70 text-[#ff6600] font-extrabold shadow-xs'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-[#ff6600] hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> {t('verifyAuction')}
              </button>
              
            </nav>
   
            {/* 3. RIGHT HAND PANEL and Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2.5 shrink-0">
              
              {/* Compact, High Visibility Search Pill */}
              <div className="relative w-[85px] xs:w-[115px] sm:w-[170px] md:w-[220px] shrink-0">
                <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={localSearch}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => {
                    saveSearchQuery(localSearch);
                    setTimeout(() => setShowSuggestions(false), 250);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveSearchQuery(localSearch);
                      (e.target as HTMLInputElement).blur();
                      setShowSuggestions(false);
                    }
                  }}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLocalSearch(val);
                    if (onSearchQueryChange) {
                      onSearchQueryChange(val);
                    }
                  }}
                  className={`w-full text-[10.5px] sm:text-xs font-bold py-1.5 sm:py-2 pl-7.5 sm:pl-9 pr-7 sm:pr-9 rounded-full transition-all outline-none border ${
                    isDarkMode
                      ? 'bg-slate-900 text-white placeholder-slate-500 border-slate-800 focus:bg-slate-950 focus:border-orange-500 shadow-inner'
                      : 'bg-slate-50 text-slate-800 placeholder-slate-400 border-slate-200/80 focus:bg-white focus:border-[#ff6600] shadow-inner'
                  }`}
                />
                {localSearch && (
                  <button 
                    onClick={() => {
                      setLocalSearch('');
                      if (onSearchQueryChange) {
                        onSearchQueryChange('');
                      }
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Clickable Suggestions Dropdown */}
                {showSuggestions && recentSearches.length > 0 && (
                  <div className={`absolute left-0 right-0 mt-2 p-2 rounded-2xl border shadow-2xl z-50 text-[11px] font-semibold animate-in fade-in slide-in-from-top-1 duration-150 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    <div className="flex items-center justify-between px-2 pb-1.5 mb-1.5 border-b border-solid border-slate-200/50 dark:border-slate-800/60">
                      <span className="text-[9px] font-black uppercase tracking-wider text-orange-500 flex items-center gap-1 whitespace-nowrap">
                        <History className="w-3 h-3 text-orange-500 shrink-0" /> {t('recentSearches')}
                      </span>
                      <button 
                        onClick={handleClearAllSearches}
                        onMouseDown={(e) => e.preventDefault()} // Keeps input focused
                        className="text-[9px] font-black text-rose-500 hover:underline cursor-pointer uppercase tracking-tighter"
                      >
                        {t('clearAll')}
                      </button>
                    </div>
                    <div className="space-y-0.5 max-h-[170px] overflow-y-auto">
                      {recentSearches.map((term, index) => (
                        <div
                           key={index}
                           onClick={() => {
                             setLocalSearch(term);
                             saveSearchQuery(term);
                             if (onSearchQueryChange) {
                               onSearchQueryChange(term);
                             }
                             setShowSuggestions(false);
                           }}
                           className={`flex items-center justify-between px-2 py-1 rounded-lg text-left cursor-pointer transition-colors ${
                             isDarkMode ? 'hover:bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-800'
                           }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{term}</span>
                          </span>
                          <button
                            onClick={(e) => handleClearSearchItem(e, term)}
                            onMouseDown={(e) => e.preventDefault()} // Keeps input focused
                            className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sleek Inbox/Chat access icon button with premium image-like design */}
              <button
                onClick={() => {
                  if (currentRole === 'guest') {
                    onChangeRole('user');
                  }
                  onChangeView('dashboard', 'inbox');
                }}
                className="relative rounded-full text-white bg-[#ff6600] hover:bg-[#eb5e00] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 shadow-[0_3px_10px_rgba(255,102,0,0.3)] border border-orange-500/10 shrink-0"
                title="Open Chat Inbox"
              >
                <div className="relative flex items-center justify-center w-full h-full p-2">
                  <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] text-white fill-current transition-transform">
                    {/* Rounded pill capsule */}
                    <rect x="20" y="26" width="60" height="34" rx="17" fill="currentColor" />
                    {/* Elegant hand-crafted Triangle Tail */}
                    <path d="M 48 58 L 57 74 L 57 58 Z" fill="currentColor" />
                    {/* Three dots inside, colored orange to match button background */}
                    <circle cx="37" cy="43" r="4.2" fill="#ff6600" />
                    <circle cx="50" cy="43" r="4.2" fill="#ff6600" />
                    <circle cx="63" cy="43" r="4.2" fill="#ff6600" />
                  </svg>
                </div>
                {unreadChatsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-[#ff6600] text-white font-black text-[9px] items-center justify-center shadow-md border border-white">
                      {unreadChatsCount}
                    </span>
                  </span>
                )}
              </button>
   
              {/* Post Ad Button (Always orange like the user mockup - Hidden on mobile of < 768px for clean responsive flow) */}
              <button
                id="header-post-ad-btn"
                onClick={() => {
                  if (currentRole === 'guest') {
                    onChangeRole('user');
                  }
                  window.location.hash = '#dashboard?tab=post-ad';
                }}
                className="hidden md:flex text-white hover:scale-[1.06] active:scale-[0.94] font-extrabold bg-[#ff6600] border-0 hover:bg-[#ff5500] px-4 py-2 text-xs rounded-xl transition-all duration-300 transform-gpu items-center gap-1.5 shadow-md hover:shadow-lg hover:shadow-orange-500/20 active:shadow-xs cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-3.5 h-3.5" /> {t('postAd')}
              </button>
   
              {/* Core Sign In / User Profile photo circle link */}
              {currentRole === 'guest' ? (
                <button
                  onClick={() => {
                    onChangeRole('user');
                    onChangeView('dashboard');
                  }}
                  className={`text-xs font-black px-3.5 py-2 select-none transition-all duration-300 transform-gpu hover:scale-[1.05] active:scale-[0.95] cursor-pointer rounded-xl ${
                    isDarkMode 
                      ? 'text-white bg-slate-900 hover:bg-slate-800 hover:shadow-md border border-slate-800' 
                      : 'text-slate-800 bg-slate-100 hover:bg-slate-200 hover:shadow-xs border border-transparent'
                  }`}
                >
                  {language === 'bn' ? 'সাইন ইন' : 'Sign In'}
                </button>
              ) : (
                <button
                  onClick={() => onChangeView('dashboard')}
                  title={currentRole === 'admin' ? 'Admin Dashboard' : currentRole === 'showroom' ? 'Showroom Dashboard' : 'My Account'}
                  className={`flex items-center p-0.5 rounded-full hover:scale-105 transition-all cursor-pointer group select-none shadow-sm ${
                    activeView === 'dashboard' 
                      ? 'bg-orange-500/10 ring-2 ring-orange-500/40' 
                      : isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {/* Round Profile Avatar */}
                  <div className="w-7.5 h-7.5 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm bg-orange-900 flex items-center justify-center shrink-0">
                    {currentRole === 'admin' ? (
                      <img 
                        referrerPolicy="no-referrer"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=64&h=64" 
                        alt="Admin" 
                        className="w-full h-full object-cover"
                      />
                    ) : currentRole === 'showroom' ? (
                      <img 
                        referrerPolicy="no-referrer"
                        src={showroomProfile?.avatarUrl || "https://images.unsplash.com/photo-1562575308-9e672757d475?auto=format&fit=crop&q=80&w=64&h=64"} 
                        alt="Showroom" 
                        className="w-full h-full object-cover"
                      />
                    ) : currentRole === 'user' ? (
                      <img 
                        referrerPolicy="no-referrer"
                        src={userProfile?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=64&h=64"} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
              )}
   
            </div>
   
          </div>
        </div>
      </div>
    </header>
  );

  // Helper routine to route/filter to specific elements
  function handleAuctionVerifyClick() {
    onChangeView('auction-verify');
  }
}
