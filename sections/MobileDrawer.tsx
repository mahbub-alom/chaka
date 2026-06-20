import React, { useEffect } from 'react';
import { 
  Home, 
  Car, 
  Bike, 
  Wrench, 
  ShieldCheck, 
  LayoutGrid, 
  User, 
  Phone, 
  Moon, 
  Sun, 
  X, 
  MessageSquare, 
  HelpCircle,
  FileText,
  Shield,
  Briefcase,
  Toolbox
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  currentRole: 'guest' | 'user' | 'showroom' | 'admin';
  onChangeRole: (role: 'guest' | 'user' | 'showroom' | 'admin') => void;
  activeView: string;
  activeCategory?: string;
  onChangeView: (view: string, category?: string) => void;
  unreadChatsCount: number;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  isDarkMode,
  onThemeToggle,
  currentRole,
  onChangeRole,
  activeView,
  activeCategory = 'all',
  onChangeView,
  unreadChatsCount
}: MobileDrawerProps) {
  const { language, t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const menuItems = [
    { id: 'all', label: language === 'bn' ? 'সকল লিস্টিং' : 'All Listings', icon: LayoutGrid, iconColor: 'text-orange-500', view: 'browse', cat: 'all' },
    { id: 'car', label: language === 'bn' ? 'রিকন্ডিশন গাড়ি' : 'Cars / Vehicles', icon: Car, iconColor: 'text-blue-500', view: 'browse', cat: 'car' },
    { id: 'bike', label: language === 'bn' ? 'মোটরসাইকেল' : 'Bikes / Scooters', icon: Bike, iconColor: 'text-orange-500', view: 'browse', cat: 'bike' },
    { id: 'parts', label: language === 'bn' ? 'পার্টস ও এক্সেসরিজ' : 'Parts & Spares', icon: Wrench, iconColor: 'text-amber-500', view: 'browse', cat: 'parts' },
    { id: 'service', label: language === 'bn' ? 'অটোমোবাইল সেবা' : 'Services', icon: Toolbox, iconColor: 'text-indigo-500', view: 'browse', cat: 'service' },
    { id: 'auction-verify', label: language === 'bn' ? 'জাপানি অকশন ভেরিফাই' : 'Auction Verify', icon: ShieldCheck, iconColor: 'text-teal-500', view: 'auction-verify' },
  ];

  const handleItemClick = (view: string, cat?: string) => {
    onChangeView(view, cat);
    onClose();
  };

  const roles = [
    { id: 'guest', label: 'Guest' },
    { id: 'user', label: 'User' },
    { id: 'showroom', label: 'Showroom' },
    { id: 'admin', label: 'Admin' }
  ] as const;

  return (
    <div className="fixed inset-0 z-[190] lg:hidden">
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modern thin slide-out drawer panel */}
      <div 
        className={`fixed inset-y-0 left-0 max-w-[275px] w-full flex flex-col shadow-2xl transition-transform duration-300 ease-out z-10 animate-slide-in-left ${
          isDarkMode 
            ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 text-slate-100' 
            : 'bg-white border-r border-slate-200 text-slate-900'
        }`}
      >
        {/* Clean, high-density Header */}
        <div className="p-4.5 border-b border-solid border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="font-black text-sm select-none">C</span>
            </div>
            <div>
              <h2 className="font-extrabold text-xs tracking-tight text-slate-800 dark:text-slate-200">Chaka Navigation</h2>
              <p className="text-[9px] text-primary dark:text-orange-400 font-bold leading-none mt-0.5">
                {language === 'bn' ? 'অকশন ও কার পোর্টাল' : 'Verified Auction Portal'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-solid border-slate-100 dark:border-slate-800/60 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dense Professional lists */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 no-scrollbar">
          
          {/* Main Navigation */}
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1">
              {language === 'bn' ? 'মেনু ব্রাউজ' : 'Explore Platform'}
            </span>
            
            {/* Landing Home */}
            <button
              onClick={() => handleItemClick('home')}
              className={`w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'home'
                  ? 'bg-primary/10 text-primary dark:text-orange-400 font-extrabold shadow-3xs'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-350'
              }`}
            >
              <Home className="w-4 h-4 text-primary shrink-0" />
              <span>{language === 'bn' ? 'মূল পাতা' : 'Home Main'}</span>
            </button>

            {/* Render Category List */}
            {menuItems.map((item) => {
              const isSelected = activeView === item.view && (item.cat === undefined || activeCategory === item.cat);
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.view, item.cat)}
                  className={`w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary/10 text-primary dark:text-orange-400 font-extrabold shadow-3xs'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-350'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${item.iconColor}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Info & Guidelines - Side-by-Side Grid (Incredibly space efficient!) */}
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1">
              {language === 'bn' ? 'গুরুত্বপূর্ণ লিংক' : 'Information Links'}
            </span>
            
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <button
                onClick={() => handleItemClick('terms')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                  activeView === 'terms'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200/40 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{language === 'bn' ? 'শর্তাবলী' : 'Terms'}</span>
              </button>

              <button
                onClick={() => handleItemClick('privacy')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                  activeView === 'privacy'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200/40 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">{language === 'bn' ? 'প্রাইভেসি' : 'Privacy'}</span>
              </button>

              <button
                onClick={() => handleItemClick('help')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                  activeView === 'help'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200/40 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">{language === 'bn' ? 'সাহায়তা' : 'FAQ Help'}</span>
              </button>

              <button
                onClick={() => handleItemClick('safety')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                  activeView === 'safety'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200/40 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="truncate">{language === 'bn' ? 'নিরাপত্তা' : 'Safety'}</span>
              </button>
            </div>
          </div>

          {/* Clean Role Emulator Tab */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1 block">
              {language === 'bn' ? 'রোল সিমুলেটর' : 'Platform Mock Role'}
            </span>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="grid grid-cols-2 gap-1">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onChangeRole(r.id);
                      if (r.id !== 'guest') {
                        onChangeView('dashboard');
                      } else {
                        onChangeView('home');
                      }
                      onClose();
                    }}
                    className={`py-1 px-1.5 rounded-md text-[9px] font-extrabold transition-all border text-center ${
                      currentRole === r.id
                        ? 'bg-primary border-primary text-white shadow-3xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Theme integration toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-solid border-slate-200/50 dark:border-slate-800/40">
                <span className="text-[9.5px] font-bold text-slate-500">{language === 'bn' ? 'ডার্ক মোড:' : 'Theme Mode:'}</span>
                <button
                  onClick={onThemeToggle}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-black bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {isDarkMode ? <Sun className="w-3 h-3 text-amber-500" /> : <Moon className="w-3 h-3 text-slate-500" />}
                  <span>{isDarkMode ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Clean hotline */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-primary/10 to-orange-500/5 border border-primary/20 text-center space-y-2">
            <span className="text-[10px] font-extrabold text-primary dark:text-orange-400 block">
              {language === 'bn' ? '📞 চাকা সাপোর্ট হটলাইন' : `📞 Chaka Live Support`}
            </span>
            
            <a 
              href="tel:01886666018"
              className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-primary text-white hover:bg-primary-hover text-[11px] font-black transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>01886666018</span>
            </a>
          </div>

        </div>

        {/* Mini bottom brand identifier */}
        <div className="p-3 border-t border-solid border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center">
          <span className="text-[8px] font-mono text-slate-400 dark:text-slate-600 block tracking-widest uppercase">
            Chaka BD Multi-Hub Platform
          </span>
        </div>
      </div>
    </div>
  );
}
