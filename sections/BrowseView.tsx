"use client";

import React from 'react';
import { motion } from 'motion/react';
import { 
  Car, 
  Bike, 
  Compass, 
  ShieldCheck, 
  MapPin, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  ChevronRight, 
  Wrench, 
  Zap, 
  Truck 
} from 'lucide-react';
import { VehicleListing, SearchFilters } from '@/types';
import ListingCard from '@/components/ListingCard';
import Filters from '@/sections/Filters';

const browseContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
} as const;

const browseItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.35,
      ease: "easeOut"
    } 
  }
} as const;

interface BrowseViewProps {
  listings: VehicleListing[];
  filteredListings: VehicleListing[];
  isDarkMode: boolean;
  viewMode: 'grid' | 'list';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  changeView: (view: string, categoryOrId?: string | null) => void;
  language: 'en' | 'bn';
  t: (key: string) => string;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  BANGLADESH_DIVISIONS: string[];
}

export default function BrowseView({
  listings,
  filteredListings,
  isDarkMode,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  filters,
  setFilters,
  changeView,
  language,
  t,
  showToast,
  BANGLADESH_DIVISIONS
}: BrowseViewProps) {
  const getCategoryHeaderTitle = () => {
    if (filters.searchQuery) {
      return `Search Results for "${filters.searchQuery}"`;
    }
    if (filters.brand && filters.brand !== 'all') {
      return `${filters.brand} Showcase`;
    }
    switch (filters.type) {
      case 'car':
        return 'Cars & Vehicles';
      case 'bike':
        return 'Bikes & Scooters';
      case 'parts':
        return 'Genuine Parts & Accessories';
      case 'service':
        return 'Automotive Services';
      default:
        return 'All Ads & Directories';
    }
  };

  return (
    <div className="w-full space-y-5">
      <div className="lg:hidden w-full overflow-hidden">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 block">
          ⭐ {language === 'bn' ? 'ক্যাটাগরি ব্রাউজ করুন:' : 'Browse by Category:'}
        </span>
        <div className="-mx-4 px-4 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2.5 pb-2 min-w-max">
            {[
              { id: 'all', label: language === 'bn' ? 'সব' : 'All', rawLabel: language === 'bn' ? 'সকল লিস্টিং' : 'All Ads', count: listings.length, emoji: '🔥', icon: <GridIcon className="w-4 h-4 text-orange-500" /> },
              { id: 'car', label: language === 'bn' ? 'গাড়ি' : 'Cars', rawLabel: language === 'bn' ? 'রিকন্ডিশন গাড়ি' : 'Cars', count: listings.filter(l => l.type === 'car').length, emoji: '🚗', icon: <Car className="w-4 h-4 text-sky-400" /> },
              { id: 'bike', label: language === 'bn' ? 'বাইক' : 'Bikes', rawLabel: language === 'bn' ? 'মোটরসাইকেল ও স্কুটার' : 'Bikes', count: listings.filter(l => l.type === 'bike').length, emoji: '🏍️', icon: <Bike className="w-4 h-4 text-red-505" /> },
              { id: 'commercial', label: language === 'bn' ? 'কমার্শিয়াল' : 'Commercial', rawLabel: language === 'bn' ? 'ভারী ও কমার্শিয়াল গাড়ি' : 'Commercial', count: listings.filter(l => l.type === 'commercial').length, emoji: '🚛', icon: <Truck className="w-4 h-4 text-amber-500" /> },
              { id: 'ev', label: language === 'bn' ? 'ইলেকট্রিক' : 'EVs', rawLabel: language === 'bn' ? 'ইলেকট্রিক গাড়ি (EVs)' : 'Electric Vehicles', count: listings.filter(l => l.type === 'ev').length, emoji: '⚡', icon: <Zap className="w-4 h-4 text-amber-400" /> },
              { id: 'threewheeler', label: language === 'bn' ? '৩-হুইলার' : '3-Wheelers', rawLabel: language === 'bn' ? 'সিএনজি ও ৩-হুইলার' : 'Three Wheelers', count: listings.filter(l => l.type === 'threewheeler').length, emoji: '🛺', icon: <Compass className="w-4 h-4 text-orange-500" /> },
              { id: 'bicycle', label: language === 'bn' ? 'সাইকেল' : 'Bicycles', rawLabel: language === 'bn' ? 'বাইসাইকেল' : 'Bicycles', count: listings.filter(l => l.type === 'bicycle').length, emoji: '🚲', icon: <Bike className="w-4 h-4 text-indigo-500" /> },
              { id: 'parts', label: language === 'bn' ? 'পার্টস' : 'Parts Spares', rawLabel: language === 'bn' ? 'যন্ত্রাংশ ও পার্টস' : 'Parts Spares', count: listings.filter(l => l.type === 'parts').length, emoji: '⚙️', icon: <Wrench className="w-4 h-4 text-[#ff6600]" /> },
              { id: 'service', label: language === 'bn' ? 'সার্ভিস' : 'Workshop', rawLabel: language === 'bn' ? 'অটোমোবাইল সার্ভিসিং' : 'Services', count: listings.filter(l => l.type === 'service').length, emoji: '🛠️', icon: <ShieldCheck className="w-4 h-4 text-orange-400" /> },
            ].map((cat) => {
              const isSelected = filters.type === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilters({ ...filters, type: cat.id as any, brand: 'all' });
                    showToast(`Filtered category: ${cat.label}`);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-xs cursor-pointer ${
                    isSelected
                      ? 'bg-[#ff6600] border-[#ff6600] text-white shadow-md shadow-orange-500/10'
                      : isDarkMode
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
                  }`}
                >
                  <span className="text-sm select-none">{cat.emoji}</span>
                  <div className="text-left flex flex-col justify-center min-w-[50px]">
                    <span className="leading-tight text-[11px] font-bold">{cat.label}</span>
                    <span className="text-[8.5px] font-medium opacity-70 leading-none">{cat.rawLabel} • {cat.count}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        <aside 
          id="browse-sidebar-viewport" 
          className="w-full lg:w-64 xl:w-72 shrink-0 hidden lg:block space-y-5"
        >
          <div className={`p-5 rounded-3xl border space-y-5 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/60 shadow-xs'
          }`}>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-505 mb-3 border-b border-dashed border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1">
                <List className="w-3.5 h-3.5 text-[#ff6600]" /> Catalog Category
              </h3>

              <div className="flex flex-col gap-1 rounded-2xl overflow-hidden">
                {[
                  { 
                    id: 'all', 
                    label: language === 'bn' ? 'সকল ডিরেক্টরি' : 'All Directories', 
                    count: listings.length, 
                    icon: <GridIcon className="w-5 h-5 text-orange-500" />,
                    iconBg: 'bg-orange-500/10'
                  },
                  { 
                    id: 'car', 
                    label: language === 'bn' ? 'গাড়ি ও এসইউভি' : 'Cars & Vehicles', 
                    count: listings.filter(l => l.type === 'car').length, 
                    icon: <Car className="w-5 h-5 text-sky-400" />,
                    iconBg: 'bg-sky-500/10'
                  },
                  { 
                    id: 'bike', 
                    label: language === 'bn' ? 'বাইক ও স্কুটার' : 'Bikes & Scooters', 
                    count: listings.filter(l => l.type === 'bike').length, 
                    icon: <Bike className="w-5 h-5 text-red-500" />,
                    iconBg: 'bg-red-500/10'
                  },
                  { 
                    id: 'commercial', 
                    label: language === 'bn' ? 'কমার্শিয়াল গাড়ি' : 'Commercial Fleet', 
                    count: listings.filter(l => l.type === 'commercial').length, 
                    icon: <Truck className="w-5 h-5 text-amber-500" />,
                    iconBg: 'bg-amber-555/10'
                  },
                  { 
                    id: 'ev', 
                    label: language === 'bn' ? 'ইলেকট্রিক কার (ইভি)' : 'Electric Cars (EVs)', 
                    count: listings.filter(l => l.type === 'ev').length, 
                    icon: <Zap className="w-5 h-5 text-amber-400" />,
                    iconBg: 'bg-orange-500/10'
                  },
                  { 
                    id: 'threewheeler', 
                    label: language === 'bn' ? 'থ্রি হুইলার ও অটো' : 'Three Wheelers', 
                    count: listings.filter(l => l.type === 'threewheeler').length, 
                    icon: <Compass className="w-5 h-5 text-orange-500" />,
                    iconBg: 'bg-orange-500/10'
                  },
                  { 
                    id: 'bicycle', 
                    label: language === 'bn' ? 'বাইসাইকেল ও কমিউট' : 'Bicycles', 
                    count: listings.filter(l => l.type === 'bicycle').length, 
                    icon: <Bike className="w-5 h-5 text-indigo-500" />,
                    iconBg: 'bg-indigo-500/10'
                  },
                  { 
                    id: 'parts', 
                    label: language === 'bn' ? 'পার্টস ও লুব্রিকেন্টস' : 'Parts & Accessories', 
                    count: listings.filter(l => l.type === 'parts').length, 
                    icon: <Wrench className="w-5 h-5 text-[#ff6600]" />,
                    iconBg: 'bg-[#a3e635]/15'
                  },
                  { 
                    id: 'service', 
                    label: language === 'bn' ? 'অটোমোবাইল সার্ভিসিং' : 'Car & Bike Services', 
                    count: listings.filter(l => l.type === 'service').length, 
                    icon: <ShieldCheck className="w-5 h-5 text-teal-505" />,
                    iconBg: 'bg-teal-500/10'
                  },
                ].map((cat) => {
                  const isActive = filters.type === cat.id;
                  return (
                    <div key={cat.id} className="w-full">
                      <button
                        onClick={() => setFilters({ ...filters, type: cat.id as any, subCategory: 'all', partsTarget: 'all', brand: 'all' })}
                        className={`w-full text-left py-3 px-3 flex items-center justify-between transition-all cursor-pointer relative group ${
                          isActive 
                            ? isDarkMode
                              ? 'bg-[#ff6600]/10 text-orange-400 font-extrabold border-l-4 border-solid border-[#ff6600]'
                              : 'bg-orange-50/70 text-orange-900 font-extrabold border-l-4 border-solid border-[#ff6600]'
                            : isDarkMode 
                              ? 'hover:bg-slate-805/40 text-slate-200 border-l-4 border-transparent' 
                              : 'hover:bg-slate-50 text-slate-800 border-l-4 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-200 ${
                            isActive 
                              ? 'bg-[#ff6600]/20' 
                              : isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                          }`}>
                            {cat.icon}
                          </div>
                          
                          <div>
                            <h4 className={`text-xs font-black tracking-tight ${
                              isActive 
                                ? 'text-[#ff6600] dark:text-orange-400' 
                                : isDarkMode ? 'text-slate-100' : 'text-slate-800'
                            }`}>
                              {cat.label}
                            </h4>
                            <span className={`text-[10px] block font-medium ${
                              isActive ? 'text-[#ff6600]/85 dark:text-orange-400/85' : 'text-slate-400 dark:text-slate-500'
                            }`}>
                              {cat.count.toLocaleString()} ads
                            </span>
                          </div>
                        </div>
            
                        <div className="flex items-center gap-1">
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                            isActive 
                              ? 'translate-x-0.5 text-[#ff6600] dark:text-orange-400 rotate-90' 
                              : 'text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5'
                          }`} />
                        </div>
                      </button>

                      {cat.id === 'parts' && isActive && (
                        <div className={`p-2.5 space-y-1.5 border-t border-b ${
                            isDarkMode ? 'bg-slate-955/40 border-slate-800/60' : 'bg-slate-50/50 border-slate-100'
                          }`}
                        >
                          <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                            Product Type:
                          </div>
                          <div className="grid grid-cols-1 gap-1 max-h-56 overflow-y-auto no-scrollbar">
                            <button
                              onClick={() => setFilters({ ...filters, subCategory: 'all' })}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                !filters.subCategory || filters.subCategory === 'all'
                                  ? 'bg-[#ff6600] text-white font-black'
                                  : isDarkMode
                                    ? 'text-slate-350 hover:bg-slate-800 hover:text-slate-100'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                            >
                              All Types
                            </button>
                            {[
                              { value: 'Engine & Performance', label: 'Engine & Performance' },
                              { value: 'Brakes & Rotors', label: 'Brakes & Rotors' },
                              { value: 'Suspension & Steering', label: 'Suspension & Steering' },
                              { value: 'Tyres & Wheels', label: 'Tyres & Wheels' },
                              { value: 'Electrical & Audio', label: 'Electrical & Audio' },
                              { value: 'Fluids & Lubricants', label: 'Fluids & Lubricants' },
                              { value: 'Body & Accessories', label: 'Body & Accessories' },
                              { value: 'Car Accessories', label: 'Car Accessories' },
                              { value: 'Bike Engine & Exhaust', label: 'Engine & Exhaust' },
                              { value: 'Bike Brakes & Safety', label: 'Brakes & Safety' },
                              { value: 'Chains & Transmission', label: 'Chains & Gears' },
                              { value: 'Bike Tyres & Wheels', label: 'Tyres & Wheels' },
                              { value: 'Lights & Indicators', label: 'Lights & Indicators' },
                              { value: 'Riding Accessories', label: 'Riding Accessories' },
                              { value: 'Bike Accessories', label: 'Bike Accessories' },
                              { value: 'Bicycle Accessories', label: 'Bicycle Accessories' },
                            ].map((pSub) => (
                              <button
                                key={pSub.value}
                                onClick={() => setFilters({ ...filters, subCategory: pSub.value })}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center gap-2 ${
                                  filters.subCategory === pSub.value
                                    ? 'bg-[#ff6600]/15 text-[#ff6600] dark:text-orange-400 font-black border-l-2 border-[#ff6600]'
                                    : isDarkMode
                                      ? 'text-slate-400 hover:bg-slate-800/65 hover:text-slate-200'
                                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span className="truncate">{pSub.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-555 mb-2 border-b border-dashed border-slate-100 dark:border-slate-800 pb-2">
                🏷️ Brand
              </h3>
              <select
                value={filters.brand || 'all'}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className={`w-full px-2 py-2 rounded-lg text-xs font-bold border outline-none transition-all cursor-pointer ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-[#ff6600]' : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
                }`}
              >
                <option value="all">All Brands</option>
                {filters.type === 'car' && ['Toyota', 'Honda', 'Nissan', 'Hyundai', 'Mitsubishi'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {filters.type === 'bike' && ['Yamaha', 'Suzuki', 'Honda', 'Royal Enfield', 'Bajaj', 'TVS'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {filters.type === 'commercial' && ['TATA', 'Hyundai', 'Isuzu', 'Mahindra', 'Mitsubishi'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {filters.type === 'ev' && ['BYD', 'Tesla', 'Neta', 'Wuling', 'Hyundai'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {filters.type === 'threewheeler' && ['Bajaj', 'Mishuk', 'Piaggio', 'Runner'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {filters.type === 'bicycle' && ['Veloce', 'Core Project', 'Duranta'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {filters.type === 'parts' && ['Bosch', 'Denso', 'EBC', 'Brembo', 'Yokohama', 'Michelin', 'NGK', 'Mobil', 'Castrol', 'Osram'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {filters.type === 'service' && ['Chaka Center', 'Apex Auto', 'Dhaka Tuning', 'Gearbox Pro'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {filters.type === 'all' && ['Toyota', 'Honda', 'Nissan', 'Yamaha', 'Suzuki', 'BYD', 'Tesla', 'Bosch', 'Brembo', 'Michelin'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-dashed border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  💰 Budget
                </span>
                <span className="text-[11px] font-black text-[#ff6600]">
                  {filters.priceMax >= 6000000 
                    ? 'No Limit' 
                    : `BDT ${filters.priceMax.toLocaleString()}`
                  }
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="6000000"
                step="5000"
                value={filters.priceMax || 6000000}
                onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                className="w-full accent-[#ff6600] cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1 select-none">
                <span>2,000 BDT</span>
                <span>6,000,000 BDT</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 border-b border-dashed border-slate-100 dark:border-slate-800 pb-2">
                ✨ Condition
              </h3>
              <div className="flex flex-col gap-1">
                {[
                  { id: 'all', label: 'Any Condition' },
                  { id: 'New', label: 'Brand New' },
                  { id: 'Used', label: 'Used' },
                  { id: 'Reconditioned', label: 'Reconditioned' },
                ].map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => setFilters({ ...filters, condition: cond.id as any })}
                    className={`text-left py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      filters.condition === cond.id
                        ? 'text-[#ff6600] bg-orange-500/10 font-black'
                        : isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • {cond.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 border-b border-dashed border-slate-100 dark:border-slate-800 pb-2">
                📍 Division
              </h3>
              <select
                value={filters.division}
                onChange={(e) => setFilters({ ...filters, division: e.target.value })}
                className={`w-full px-2 py-2 rounded-lg text-xs font-bold border outline-none transition-all cursor-pointer ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <option value="all">Everywhere in BD</option>
                {BANGLADESH_DIVISIONS.map(div => (
                  <option key={div} value={div}>{div}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <div className="flex-1 w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-black tracking-tight">{getCategoryHeaderTitle()}</h2>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {filteredListings.length} listings available
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
              <div className="flex items-center gap-1.5 bg-slate-900/10 dark:bg-slate-900/40 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 px-1.5 flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-[#ff6600] dark:text-orange-505" />
                  <span>{language === 'bn' ? 'বাছাই:' : 'Sort By:'}</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`text-[11px] font-extrabold bg-transparent pr-4 py-1.5 border-0 focus:ring-0 outline-none transition-all cursor-pointer ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  <option value="newest" className={isDarkMode ? 'bg-slate-900 text-slate-200 font-bold' : 'bg-white text-slate-700 font-bold'}>
                    {language === 'bn' ? 'নতুনগুলো আগে' : 'Newest First'}
                  </option>
                  <option value="price-asc" className={isDarkMode ? 'bg-slate-900 text-slate-200 font-bold' : 'bg-white text-slate-700 font-bold'}>
                    {language === 'bn' ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}
                  </option>
                  <option value="price-desc" className={isDarkMode ? 'bg-slate-900 text-slate-200 font-bold' : 'bg-white text-slate-700 font-bold'}>
                    {language === 'bn' ? 'দাম: বেশি থেকে কম' : 'Price: High to Low'}
                  </option>
                  <option value="mileage-desc" className={isDarkMode ? 'bg-slate-900 text-slate-200 font-bold' : 'bg-white text-slate-700 font-bold'}>
                    {language === 'bn' ? 'সর্বোচ্চ মাইলেজ' : 'Highest Mileage'}
                  </option>
                </select>
              </div>

              <div id="grid-list-view-switcher" className="flex items-center gap-1.5 bg-slate-900/10 dark:bg-slate-900/40 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500 px-1.5">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#ff6600] text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-404 hover:text-[#ff6600]'
                  }`}
                  title="Grid layout"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#ff6600] text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-404 hover:text-[#ff6600]'
                  }`}
                  title="List layout"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <Filters filters={filters} onChange={(f) => setFilters(f)} isDarkMode={isDarkMode} />

          {filteredListings.length === 0 ? (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-center py-20 text-slate-500"
            >
              <Compass className="w-12 h-12 text-[#ff6600] opacity-45 mx-auto mb-3" />
              <p className="text-xs font-bold leading-normal text-slate-400">No matching vehicles found!</p>
              <p className="text-[11px] text-slate-500 mt-1">Please expand your search budget or clear some filter values to review alternative listings.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={`${filters.searchQuery}-${filters.type}-${filters.condition}-${filters.priceMax}-${filters.division}-${filters.brand}-${viewMode}`}
              initial="hidden"
              animate="show"
              variants={browseContainerVariants}
              className={
                viewMode === 'list' 
                  ? 'flex flex-col gap-3' 
                  : 'grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-6'
              }
            >
              {filteredListings.map((listing, index) => {
                const isFourth = (index + 1) % 4 === 0;
                
                const inlineSponsorAds = [
                  {
                    title: "Brembo Premium Italian Ceramics",
                    desc: "High-spec braking systems suited for Toyota Axio/Premio imports. 100% dust-free compound and reliable heat dissipation.",
                    badge: "NATIVE PARTNER",
                    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400",
                    link: "#promo",
                    cta: "Get Offer"
                  },
                  {
                    title: "Liqui Moly High-Tech Engine Oil",
                    desc: "Superior extreme-heat engine protection designed in Germany. Improves fuel mileage and torque output under severe city heat.",
                    badge: "CERTIFIED LUBRICANTS",
                    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=400",
                    link: "#promo",
                    cta: "Shop Now"
                  },
                  {
                    title: "Apex Auto Glass Detailing",
                    desc: "Eliminate micro-scratches and restore a mirror gloss finish in Bangladesh. Includes a 3-Year warranty check.",
                    badge: "VERIFIED SERVICE",
                    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=400",
                    link: "#promo",
                    cta: "Book Slot"
                  }
                ];
                
                const adSelected = inlineSponsorAds[Math.floor(index / 4) % inlineSponsorAds.length];

                return (
                  <React.Fragment key={listing.id}>
                    <motion.div 
                      variants={browseItemVariants} 
                      className={viewMode === 'list' ? 'w-full' : 'col-span-1'}
                    >
                      <ListingCard
                        listing={listing}
                        isDarkMode={isDarkMode}
                        viewMode={viewMode}
                        onSelect={(id) => changeView('listing', id)}
                        onSelectProfile={(pId) => changeView('profile', pId)}
                      />
                    </motion.div>

                    {isFourth && (
                      <motion.div
                        variants={browseItemVariants}
                        className={viewMode === 'list' ? 'w-full' : 'col-span-full xl:col-span-1'}
                      >
                        <div className={`p-4 rounded-3xl border h-full flex flex-col justify-between overflow-hidden relative group transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-gradient-to-b from-slate-900/40 to-slate-950/20 border-slate-900 shadow-lg' 
                            : 'bg-gradient-to-b from-amber-500/5 to-orange-500/5 border-amber-200/40 shadow-md shadow-slate-100/40'
                        }`}>
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/15 to-orange-500/5 rounded-bl-full opacity-60 blur-md pointer-events-none" />
                          
                          <div>
                            <div className="flex items-center justify-between mb-2.5 relative z-10">
                              <span className={`text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full ${
                                isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-500/10 text-amber-700 border border-amber-200/65'
                              }`}>
                                {adSelected.badge}
                              </span>
                              <span className="text-[9px] font-extrabold text-slate-400">AdX Verified</span>
                            </div>
                            
                            {adSelected.image && (
                              <div className="w-full h-28 rounded-2xl overflow-hidden mb-3 relative group">
                                <img 
                                  referrerPolicy="no-referrer"
                                  src={adSelected.image} 
                                  alt={adSelected.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                              </div>
                            )}
                            
                            <h4 className={`text-xs font-black tracking-tight mb-1 truncate transition-colors ${
                              isDarkMode ? 'text-slate-100 group-hover:text-orange-400' : 'text-slate-900 group-hover:text-[#ff6600]'
                            }`}>
                              {adSelected.title}
                            </h4>
                            <p className={`text-[10px] leading-relaxed line-clamp-3 ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              {adSelected.desc}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-dashed border-slate-200/10 dark:border-slate-800/40 flex items-center justify-between relative z-10">
                            <span className="text-[10px] font-black text-orange-500 dark:text-orange-500">Sponsored partner</span>
                            <a 
                              href={adSelected.link}
                              className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                            >
                              {adSelected.cta} <span className="font-extrabold">→</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple Grid helper icon component since lucide Grid may be imported as layout icon
function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
