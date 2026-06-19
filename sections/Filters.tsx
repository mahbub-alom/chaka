import React, { useState } from 'react';
import { SearchFilters, VehicleCondition, VehicleType } from '@/types';
import { Search, SlidersHorizontal, RefreshCw, X } from 'lucide-react';
import { BANGLADESH_DIVISIONS } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

interface FiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  isDarkMode: boolean;
}

export default function Filters({ filters, onChange, isDarkMode }: FiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { language, t } = useLanguage();

  const getSubCategories = () => {
    if (filters.partsTarget === 'car') {
      return [
        { value: 'Engine & Performance', label: 'Engine & Performance' },
        { value: 'Brakes & Rotors', label: 'Brakes & Rotors' },
        { value: 'Suspension & Steering', label: 'Suspension & Steering' },
        { value: 'Tyres & Wheels', label: 'Tyres & Wheels' },
        { value: 'Electrical & Audio', label: 'Electrical & Audio' },
        { value: 'Fluids & Lubricants', label: 'Fluids & Lubricants' },
        { value: 'Body & Accessories', label: 'Body & Accessories' },
        { value: 'Car Accessories', label: 'Car Accessories' },
      ];
    } else if (filters.partsTarget === 'bike') {
      return [
        { value: 'Bike Engine & Exhaust', label: 'Bike Engine & Exhaust' },
        { value: 'Bike Brakes & Safety', label: 'Bike Brakes & Safety' },
        { value: 'Chains & Transmission', label: 'Chains & Transmission' },
        { value: 'Bike Tyres & Wheels', label: 'Bike Tyres & Wheels' },
        { value: 'Lights & Indicators', label: 'Lights & Indicators' },
        { value: 'Riding Accessories', label: 'Riding Accessories' },
        { value: 'Bike Accessories', label: 'Bike Accessories' },
      ];
    } else {
      return [
        { value: 'Engine & Performance', label: 'Car Engine & Performance' },
        { value: 'Brakes & Rotors', label: 'Car Brakes & Rotors' },
        { value: 'Suspension & Steering', label: 'Car Suspension & Steering' },
        { value: 'Tyres & Wheels', label: 'Car Tyres & Wheels' },
        { value: 'Electrical & Audio', label: 'Car Electrical & Audio' },
        { value: 'Fluids & Lubricants', label: 'Car Fluids & Lubricants' },
        { value: 'Body & Accessories', label: 'Car Body & Accessories' },
        { value: 'Car Accessories', label: 'Car Accessories' },
        { value: 'Bike Engine & Exhaust', label: 'Bike Engine & Exhaust' },
        { value: 'Bike Brakes & Safety', label: 'Bike Brakes & Safety' },
        { value: 'Chains & Transmission', label: 'Bike Chains & Transmission' },
        { value: 'Bike Tyres & Wheels', label: 'Bike Tyres & Wheels' },
        { value: 'Lights & Indicators', label: 'Bike Lights & Indicators' },
        { value: 'Riding Accessories', label: 'Bike Riding Accessories' },
        { value: 'Bike Accessories', label: 'Bike Accessories' },
        { value: 'Bicycle Accessories', label: 'Bicycle Accessories' },
      ];
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, searchQuery: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, type: e.target.value as VehicleType | 'all' });
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, condition: e.target.value as VehicleCondition | 'all' });
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, division: e.target.value });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, priceMax: Number(e.target.value) });
  };

  const handleReset = () => {
    onChange({
      searchQuery: '',
      type: 'all',
      condition: 'all',
      division: 'all',
      priceMin: 0,
      priceMax: 6000000,
      brand: 'all',
      modelYear: 'all',
      bodyType: 'all',
      fuelType: 'all',
      transmission: 'all',
      maxMileage: 'all',
      seats: 'all',
      partsTarget: 'all',
      subCategory: 'all'
    });
  };

  const PRESET_QUICK_SEARCH = [
    { label: 'Toyota Axio', query: 'Axio' },
    { label: 'Yamaha R15', query: 'R15' },
    { label: 'Toyota Aqua', query: 'Aqua' },
    { label: 'Royal Enfield', query: 'Royal Enfield' },
    { label: 'Honda Civic', query: 'Civic' }
  ];

  return (
    <div className="w-full space-y-3">
      {/* Search and Filters Primary Bar (Flexible Horizontal Layout for Large Screens) */}
      <div 
        className={`p-2.5 rounded-2xl border shadow-xs transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5">
          {/* 1. Text Search Input */}
          <div className="relative flex-[2] min-w-[200px]">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </span>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleTextChange}
              placeholder={t('searchPlaceholder')}
              className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-slate-950 border border-slate-800 text-slate-200 focus:border-orange-500/50' 
                  : 'bg-slate-50 border border-slate-200 focus:border-[#ff6600] focus:bg-white'
              }`}
            />
          </div>

          {/* 2. Category Select */}
          <div className="flex-1 min-w-[130px]">
            <select
              value={filters.type}
              onChange={handleTypeChange}
              className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'সব ক্যাটাগরি' : 'All Categories'}</option>
              <option value="car">{language === 'bn' ? 'গাড়ি' : 'Cars'}</option>
              <option value="bike">{language === 'bn' ? 'মোটরসাইকেল' : 'Motorbikes'}</option>
              <option value="commercial">{language === 'bn' ? 'কমার্শিয়াল গাড়ি' : 'Commercial Vehicles'}</option>
              <option value="ev">{language === 'bn' ? 'ইলেকট্রিক গাড়ি (EV)' : 'EVs (Electric Vehicles)'}</option>
              <option value="threewheeler">{language === 'bn' ? 'থ্রি হুইলার' : 'Three Wheelers'}</option>
              <option value="bicycle">{language === 'bn' ? 'বাইসাইকেল' : 'Bicycles'}</option>
              <option value="parts">{language === 'bn' ? 'পার্টস ও যন্ত্রাংশ' : 'Parts'}</option>
              <option value="service">{language === 'bn' ? 'অটোমোবাইল সার্ভিস' : 'Services'}</option>
            </select>
          </div>

          {/* 3. Location Select */}
          <div className="flex-1 min-w-[130px]">
            <select
              value={filters.division}
              onChange={handleDivisionChange}
              className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'সব বিভাগ/স্থান' : 'All Locations'}</option>
              {BANGLADESH_DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {language === 'bn' 
                    ? (div === 'Dhaka' ? 'ঢাকা' : div === 'Chittagong' ? 'চট্টগ্রাম' : div === 'Sylhet' ? 'সিলেট' : div === 'Rajshahi' ? 'রাজশাহী' : div === 'Khulna' ? 'খুলনা' : div === 'Barisal' ? 'বরিশাল' : div === 'Rangpur' ? 'রংপুর' : 'ময়মনসিংহ')
                    : div
                  }
                </option>
              ))}
            </select>
          </div>

          {/* 4. Condition Select */}
          <div className="flex-1 min-w-[130px]">
            <select
              value={filters.condition}
              onChange={handleConditionChange}
              className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'সব কন্ডিশন' : 'All Conditions'}</option>
              <option value="New">{language === 'bn' ? 'ব্র্যান্ড নিউ' : 'New'}</option>
              <option value="Used">{language === 'bn' ? 'ব্যবহৃত' : 'Used'}</option>
              <option value="Reconditioned">{language === 'bn' ? 'রিকন্ডিশন্ড' : 'Reconditioned'}</option>
            </select>
          </div>

          {/* 5. Filters/Hide Toggle Button */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              showAdvanced
                ? isDarkMode 
                  ? 'bg-orange-950/40 border-orange-500/30 text-orange-300 hover:bg-orange-900/40' 
                  : 'bg-[#e6f7f3] border-[#ff6600]/60 text-[#ff6600] hover:bg-[#d0f0e8]'
                : isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 border'
            }`}
          >
            {showAdvanced ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'লুকান' : 'Hide'}</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ফিল্টার' : 'Filters'}</span>
              </>
            )}
          </button>

          {/* 6. Green Search Action Button */}
          <button
            type="button"
            onClick={() => onChange({ ...filters })}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#ff6600] hover:bg-[#eb5e00] transition-all cursor-pointer shadow-xs shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('searchBtn') || 'Search'}</span>
          </button>
        </div>
      </div>

      {/* Parts Specific Filter Row (Auto-visible when Parts category is selected) */}
      {filters.type === 'parts' && (
        <div 
          className={`p-3.5 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center gap-3.5 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-orange-950/15 via-slate-900 to-slate-900 border-slate-800' 
              : 'bg-gradient-to-r from-orange-50/20 via-white to-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 shrink-0 md:border-r md:pr-4 border-slate-200 dark:border-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className={`text-[11px] font-black uppercase tracking-wider ${isDarkMode ? 'text-orange-500' : 'text-[#ff6600]'}`}>
              Parts Filter:
            </span>
          </div>

          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Target Select */}
            <div className="w-full">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                Vehicle Suitability
              </label>
              <select
                value={filters.partsTarget || 'all'}
                onChange={(e) => {
                  onChange({ 
                    ...filters, 
                    partsTarget: e.target.value as any,
                    subCategory: 'all' // reset sub-category on target change
                  });
                }}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                    : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
                }`}
              >
                <option value="all">All Vehicle Parts</option>
                <option value="car">For Cars Only</option>
                <option value="bike">For Bikes Only</option>
              </select>
            </div>

            {/* Sub-category Select */}
            <div className="w-full">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                Product Type
              </label>
              <select
                value={filters.subCategory || 'all'}
                onChange={(e) => onChange({ ...filters, subCategory: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                    : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
                }`}
              >
                <option value="all">All Types</option>
                {getSubCategories().map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Spec Sheet (Responsive 6-column Grid - ONLY visible when showAdvanced is true) */}
      {showAdvanced && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {/* 1. Model Year */}
            <select
              value={filters.modelYear || 'all'}
              onChange={(e) => onChange({ ...filters, modelYear: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'মডেল ইয়ার' : 'Model Year'}</option>
              {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((y) => (
                <option key={y} value={y.toString()}>{y}</option>
              ))}
            </select>

            {/* 2. Body Type */}
            <select
              value={filters.bodyType || 'all'}
              onChange={(e) => onChange({ ...filters, bodyType: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'বডি টাইপ' : 'Body Type'}</option>
              <option value="Sedan">{language === 'bn' ? 'সেডান' : 'Sedan'}</option>
              <option value="SUV">{language === 'bn' ? 'এসইউভি (SUV)' : 'SUV'}</option>
              <option value="Hatchback">{language === 'bn' ? 'হ্যাচব্যাক' : 'Hatchback'}</option>
              <option value="Sports Bike">{language === 'bn' ? 'স্পোর্টস বাইক' : 'Sports Bike'}</option>
              <option value="Cruiser">{language === 'bn' ? 'ক্রুজার' : 'Cruiser'}</option>
            </select>

            {/* 3. Fuel Type */}
            <select
              value={filters.fuelType || 'all'}
              onChange={(e) => onChange({ ...filters, fuelType: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'জ্বালানি' : 'Fuel Type'}</option>
              <option value="Hybrid">{language === 'bn' ? 'হাইব্রিড' : 'Hybrid'}</option>
              <option value="Octane">{language === 'bn' ? 'অক্টেন' : 'Octane'}</option>
              <option value="Petrol">{language === 'bn' ? 'পেট্রোল' : 'Petrol'}</option>
              <option value="Diesel">{language === 'bn' ? 'ডিজেল' : 'Diesel'}</option>
              <option value="Electric">{language === 'bn' ? 'ইলেকট্রিক' : 'Electric'}</option>
            </select>

            {/* 4. Transmission */}
            <select
              value={filters.transmission || 'all'}
              onChange={(e) => onChange({ ...filters, transmission: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'গিয়ার ট্রান্সমিশন' : 'Transmission'}</option>
              <option value="Automatic">{language === 'bn' ? 'অটোমেটিক' : 'Automatic'}</option>
              <option value="Manual">{language === 'bn' ? 'ম্যানুয়াল' : 'Manual'}</option>
            </select>

            {/* 5. Max Mileage */}
            <select
              value={filters.maxMileage || 'all'}
              onChange={(e) => onChange({ ...filters, maxMileage: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'সর্বোচ্চ মাইলেজ' : 'Max Mileage'}</option>
              <option value="30000">{language === 'bn' ? '৩০,০০০ কি.মি.' : '30,000 km'}</option>
              <option value="50000">{language === 'bn' ? '৫০,০০০ কি.মি.' : '50,000 km'}</option>
              <option value="100000">{language === 'bn' ? '১০০,০০০ কি.মি.' : '100,000 km'}</option>
            </select>

            {/* 6. Seats */}
            <select
              value={filters.seats || 'all'}
              onChange={(e) => onChange({ ...filters, seats: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 focus:border-orange-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-[#ff6600]'
              }`}
            >
              <option value="all">{language === 'bn' ? 'আসন সংখ্যা' : 'Seats'}</option>
              <option value="2">2 {language === 'bn' ? 'আসন' : 'Seats'}</option>
              <option value="5">5 {language === 'bn' ? 'আসন' : 'Seats'}</option>
              <option value="7">7 {language === 'bn' ? 'আসন' : 'Seats'}</option>
            </select>
          </div>

          {/* Budget Limit Slider Drawer */}
          <div 
            className={`p-4 rounded-2xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800' 
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Price max slider */}
              <div className="space-y-1.5 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {language === 'bn' ? 'সর্বোচ্চ বাজেট সীমা' : 'Max Budget Limit'}
                  </span>
                  <span className="text-xs font-black text-[#ff6600] dark:text-orange-400">
                    {filters.priceMax >= 6000000 
                      ? (language === 'bn' ? 'সীমাহীন বাজেট' : 'Unlimited BDT') 
                      : (language === 'bn' ? `৳ ${filters.priceMax.toLocaleString('en-IN')}` : `BDT ${filters.priceMax.toLocaleString('en-IN')}`)
                    }
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="6000000"
                  step="50000"
                  value={filters.priceMax}
                  onChange={handlePriceMaxChange}
                  className="w-full accent-[#ff6600] h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Presets and Reset Action Combo */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {language === 'bn' ? 'জনপ্রিয় অনুসন্ধান' : 'Popular Searches'}
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-bold text-rose-500 hover:text-rose-450 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3" />
                    <span>{language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {PRESET_QUICK_SEARCH.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onChange({ ...filters, searchQuery: preset.query })}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                        filters.searchQuery === preset.query
                          ? 'bg-[#ff6600] border-[#ff6600] text-white'
                          : isDarkMode
                            ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-[#ff6600]'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-[#ff6600]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold select-none">
                {language === 'bn' ? 'চাকা বাংলাদেশ • সার্টিফাইড যানবাহন কেনাবেচা' : 'Chaka Bangladesh • Certified Vehicles Exchange'}
              </span>
              <div className="text-slate-400 dark:text-slate-500 text-[10px] font-bold">
                {language === 'bn' ? 'বিশ্বস্ত কমিউনিটি প্ল্যাটফর্ম' : 'Trusted Community Platform'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export {};
