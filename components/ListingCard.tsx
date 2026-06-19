import React from 'react';
import { motion } from 'motion/react';
import { VehicleListing } from '@/types';
import { MapPin, Calendar, Gauge, Fuel, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import BrandLogo from './BrandLogo';

const getBrandLogo = (brandName: string) => {
  return <BrandLogo brandName={brandName} />;
};

interface ListingCardProps {
  key?: string;
  listing: VehicleListing;
  isDarkMode: boolean;
  onSelect: (id: string) => void;
  onSelectProfile?: (userId: string) => void;
  viewMode?: 'grid' | 'list';
}

export default function ListingCard({ listing, isDarkMode, onSelect, onSelectProfile, viewMode = 'grid' }: ListingCardProps) {
  const { language } = useLanguage();

  const getConditionColor = (cond: string) => {
    switch (cond) {
      case 'New':
        return 'bg-orange-500 text-black font-extrabold';
      case 'Reconditioned':
        return 'bg-[#ff6600] text-white font-semibold';
      default:
        return 'bg-amber-600 text-white font-semibold';
    }
  };

  const getConditionLabel = (cond: string) => {
    if (language === 'bn') {
      switch (cond) {
        case 'New': return 'নতুন';
        case 'Reconditioned': return 'রিকন্ডিশন্ড';
        default: return 'ব্যবহৃত';
      }
    }
    return cond;
  };

  const getFuelLabel = (fuel: string) => {
    if (language === 'bn') {
      switch (fuel) {
        case 'Hybrid': return 'হাইব্রিড';
        case 'Octane': return 'অক্টেন';
        case 'Petrol': return 'পেট্রোল';
        case 'Diesel': return 'ডিজেল';
        case 'Electric': return 'ইলেকট্রিক';
        default: return fuel;
      }
    }
    return fuel;
  };

  const getLocationLabel = (loc: string) => {
    if (language === 'bn') {
      switch (loc) {
        case 'Dhaka': return 'ঢাকা';
        case 'Chittagong': return 'চট্টগ্রাম';
        case 'Sylhet': return 'সিলেট';
        case 'Rajshahi': return 'রাজশাহী';
        case 'Khulna': return 'খুলনা';
        case 'Barisal': return 'বরিশাল';
        case 'Rangpur': return 'রংপুর';
        case 'Mymensingh': return 'ময়মনসিংহ';
        default: return loc;
      }
    }
    return loc;
  };

  const isList = viewMode === 'list';

  return (
    <motion.a
      href={`#listing/${listing.id}`}
      id={`listing-card-${listing.id}`}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      onClick={(e) => {
        // Only prevent default on standard left-clicks without modifier keys
        if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          onSelect(listing.id);
        }
      }}
      className={`relative rounded-2xl overflow-hidden border cursor-pointer flex transition-all duration-300 ${
        isList 
          ? 'flex-row w-full p-1.5 sm:p-2 gap-2.5 sm:gap-3' 
          : 'flex-col h-full'
      } ${
        isDarkMode 
          ? 'bg-slate-900/40 border-slate-800 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-950/10' 
          : 'bg-white border-slate-200 hover:border-[#ff6600]/30 hover:shadow-lg hover:shadow-slate-300/10'
      }`}
    >
      {/* Featured / Popular badge */}
      {listing.isFeatured && (
        <span className="absolute top-2 left-2 z-10 px-1.5 py-0.5 text-[8px] font-black tracking-wider uppercase bg-amber-500 text-slate-950 rounded shadow-xs">
          ★ {language === 'bn' ? 'জনপ্রিয়' : 'POPULAR'}
        </span>
      )}

      {/* Condition Badge */}
      {!isList && (
        <span className={`absolute top-2 right-2 z-10 px-1.5 py-0.5 text-[8px] uppercase font-black tracking-wider rounded shadow-xs ${getConditionColor(listing.condition)}`}>
          {getConditionLabel(listing.condition)}
        </span>
      )}

      {/* Cover Image */}
      <div className={`overflow-hidden relative bg-slate-100 dark:bg-slate-950 rounded-xl shrink-0 ${
        isList 
          ? 'w-22 h-22 sm:w-44 sm:h-32' 
          : 'w-full h-28 sm:h-40'
      }`}>
        <img 
          referrerPolicy="no-referrer"
          src={listing.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400'} 
          alt={listing.title}
          className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-slate-950/40 to-transparent" />
        
        {/* Open in New Tab Shortcut Button */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open(`${window.location.origin}${window.location.pathname}#listing/${listing.id}`, '_blank');
          }}
          title={language === 'bn' ? 'নতুন ট্যাবে খুলুন' : 'Open in New Tab'}
          className="absolute bottom-2 right-2 z-20 p-1.5 rounded-lg bg-black/60 hover:bg-[#ff6600] text-slate-100 hover:text-white transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 min-w-0 ${
        isList ? 'justify-between py-1' : 'p-2 sm:p-2.5 sm:pb-2 justify-between'
      }`}>
        <div>
          {/* Brand & condition highlight row */}
          <div className="flex items-center justify-between gap-1 sm:gap-1.5 mb-1 flex-wrap w-full">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <span className={`inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-black px-1 sm:px-1.5 py-0.5 rounded tracking-wider uppercase border ${
                isDarkMode 
                  ? 'bg-slate-800/80 text-orange-500 border-slate-700/65' 
                  : 'bg-orange-50 text-[#ff6600] border-orange-100/40'
              }`}>
                {getBrandLogo(listing.brand)}
                <span>{listing.brand}</span>
              </span>
              {isList && (
                <span className={`px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[8.5px] uppercase font-black rounded ${getConditionColor(listing.condition)}`}>
                  {getConditionLabel(listing.condition)}
                </span>
              )}
              {listing.isShowroomVerified && (
                <span className="flex items-center gap-0.5 text-[8.5px] sm:text-[9px] font-bold text-sky-450 shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-400 shrink-0" /> {language === 'bn' ? 'ভেরিফাইড' : 'Verified'}
                </span>
              )}
            </div>

            {/* Post date in top row of text info */}
            <span className="text-slate-400 dark:text-slate-500 text-[8px] sm:text-[8.5px] font-bold shrink-0">
              {new Date(listing.createdAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'short' })}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-[11px] sm:text-[13px] font-bold line-clamp-1 sm:line-clamp-2 leading-tight mb-0.5 transition-colors ${
            isDarkMode ? 'text-slate-100 hover:text-[#ff6600]' : 'text-slate-900 hover:text-[#ff6600]'
          }`}>
            {listing.title}
          </h3>

          {/* Price */}
          <div className="mb-1 sm:mb-1.5">
            {listing.originalPrice && listing.originalPrice > listing.price ? (
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 min-h-6">
                {/* Original Price (Strike-through) */}
                <span className="text-[9.5px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 line-through leading-none">
                  BDT {listing.originalPrice.toLocaleString('en-IN')}
                </span>
                
                {/* Current Discounted Price with subtle breathing pulse animation */}
                <motion.span 
                  className="text-[11px] sm:text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 leading-none"
                  animate={{
                    scale: [1, 1.05, 1],
                    color: isDarkMode 
                      ? ["#34d399", "#059669", "#34d399"] 
                      : ["#047857", "#10b981", "#047857"],
                    textShadow: [
                      "0 0 0px rgba(16,185,129,0)",
                      "0 0 4px rgba(16,185,129,0.3)",
                      "0 0 0px rgba(16,185,129,0)"
                    ]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {listing.priceFormatted}
                </motion.span>

                {/* Percentage drop indicator badge */}
                <span className="text-[8.5px] sm:text-[9.5px] font-extrabold text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/20 px-1 py-0.5 rounded-md leading-none flex items-center gap-0.5 animate-pulse shrink-0">
                  ↓ {Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)}%
                </span>
              </div>
            ) : (
              <span className="text-[11px] sm:text-sm font-black text-slate-900 dark:text-white leading-none">
                {listing.priceFormatted}
              </span>
            )}
          </div>

          {/* Description snippet for list view */}
          {isList && listing.description && (
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-2 leading-relaxed mb-2">
              {listing.description}
            </p>
          )}
        </div>

        <div>
          {/* Specs Sheet row with tight paddings */}
          {listing.type === 'parts' ? (
            <div className={`grid grid-cols-2 ${
              isList ? 'sm:grid-cols-4' : 'grid-cols-2'
            } gap-x-1.5 gap-y-0.5 border-t pt-1.5 border-solid border-slate-100 dark:border-slate-800/50 mb-1.5 text-[9px] sm:text-[11px] text-slate-400 max-w-full`}>
              <span className="flex items-center gap-0.5 truncate font-medium text-amber-500 dark:text-amber-400">
                ⚙️ {language === 'bn' ? 'পার্টস' : (listing.subCategory || 'Parts')}
              </span>
              <span className="flex items-center gap-0.5 truncate font-medium text-sky-500 dark:text-sky-450">
                {listing.partsTarget === 'car' ? (language === 'bn' ? '🚗 গাড়ি' : '🚗 Car') : listing.partsTarget === 'bike' ? (language === 'bn' ? '🏍️ বাইক' : '🏍️ Bike') : (language === 'bn' ? '🛠️ কমন' : '🛠️ Univ')}
              </span>
              <span className="flex items-center gap-0.5 truncate font-medium">
                🏷️ {listing.brand || 'Generic'}
              </span>
              <span className="flex items-center gap-0.5 truncate font-medium text-slate-450">
                <MapPin className="w-2.5 h-2.5 shrink-0 text-slate-400" /> {getLocationLabel(listing.location)}
              </span>
            </div>
          ) : listing.type === 'service' ? (
            <div className={`grid grid-cols-2 ${
              isList ? 'sm:grid-cols-4' : 'grid-cols-2'
            } gap-x-1.5 gap-y-0.5 border-t pt-1.5 border-solid border-slate-100 dark:border-slate-800/50 mb-1.5 text-[9px] sm:text-[11px] text-slate-400 max-w-full`}>
              <span className="flex items-center gap-0.5 truncate font-medium text-orange-500 dark:text-orange-400">
                🔧 {language === 'bn' ? 'সার্ভিস' : 'Service'}
              </span>
              <span className="flex items-center gap-0.5 truncate font-medium text-slate-450">
                <MapPin className="w-2.5 h-2.5 shrink-0 text-slate-400" /> {getLocationLabel(listing.location)}
              </span>
              <span className="col-span-2 flex items-center gap-0.5 truncate font-semibold text-slate-400">
                📞 {listing.sellerPhone ? `${listing.sellerPhone.slice(0, 5)}XXXXXX` : ''}
              </span>
            </div>
          ) : (
            <div className={`grid grid-cols-2 ${
              isList ? 'sm:grid-cols-4' : 'grid-cols-2'
            } gap-x-1.5 gap-y-0.5 border-t pt-1.5 border-solid border-slate-100 dark:border-slate-800/50 mb-1.5 text-[9px] sm:text-[11px] text-slate-400 max-w-full`}>
              <span className="flex items-center gap-0.5 truncate font-medium">
                <Calendar className="w-2.5 h-2.5 shrink-0 text-slate-400" /> {listing.year}
              </span>
              <span className="flex items-center gap-0.5 truncate font-medium">
                <Gauge className="w-2.5 h-2.5 shrink-0 text-slate-400" /> {listing.mileage ? (listing.mileage >= 1000 ? `${Math.round(listing.mileage / 1000)}k` : listing.mileage) : '0'} {language === 'bn' ? 'কি.মি.' : 'km'}
              </span>
              <span className="flex items-center gap-0.5 truncate font-medium">
                <Fuel className="w-2.5 h-2.5 shrink-0 text-slate-400" /> {getFuelLabel(listing.fuelType)}
              </span>
              <span className="flex items-center gap-0.5 truncate font-medium text-slate-450">
                <MapPin className="w-2.5 h-2.5 shrink-0 text-slate-400" /> {getLocationLabel(listing.location)}
              </span>
            </div>
          )}


        </div>
      </div>
    </motion.a>
  );
}
export {};
