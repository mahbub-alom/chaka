"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Heart, 
  Share2, 
  AlertTriangle, 
  Calendar, 
  Gauge, 
  MapPin, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Bell, 
  Trash2, 
  X,
  Copy,
  Star
} from 'lucide-react';
import { VehicleListing, PriceAlert, AdvertisementSlot } from '@/types';
import ListingCard from '@/components/ListingCard';
import AdPlacement from '@/components/AdPlacement';

interface ListingDetailViewProps {
  activeListingItem: VehicleListing;
  listings: VehicleListing[];
  isDarkMode: boolean;
  watchlist: string[];
  handleToggleWatchlist: (id: string) => void;
  language: 'en' | 'bn';
  t: (key: string) => string;
  changeView: (view: string, categoryOrId?: string | null) => void;
  priceAlerts: PriceAlert[];
  setPriceAlerts: React.Dispatch<React.SetStateAction<PriceAlert[]>>;
  setListings: React.Dispatch<React.SetStateAction<VehicleListing[]>>;
  adSlots: AdvertisementSlot[];
  handleStartListingChat: (listing: VehicleListing) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  onOpenReport: (listingId: string) => void;
  onOpenShare: () => void;
}

export default function ListingDetailView({
  activeListingItem,
  listings,
  isDarkMode,
  watchlist,
  handleToggleWatchlist,
  language,
  t,
  changeView,
  priceAlerts,
  setPriceAlerts,
  setListings,
  adSlots,
  handleStartListingChat,
  showToast,
  onOpenReport,
  onOpenShare
}: ListingDetailViewProps) {
  // Local Detail states
  const [revealDetailPhone, setRevealDetailPhone] = useState<boolean>(false);
  const [activeDetailImage, setActiveDetailImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [is360Rotating, setIs360Rotating] = useState<boolean>(false);
  const [showMobileStickyActions, setShowMobileStickyActions] = useState<boolean>(true);
  const [customTargetPrice, setCustomTargetPrice] = useState<string>('');

  // Reset detail view state on listing transition
  useEffect(() => {
    setActiveDetailImage(null);
    setShowMobileStickyActions(true);
    setRevealDetailPhone(false);
    setCustomTargetPrice(Math.round(activeListingItem.price * 0.95).toString());
  }, [activeListingItem.id, activeListingItem.price]);

  // 360 Rotation Simulation
  useEffect(() => {
    if (!is360Rotating) return;
    let index = 0;
    const interval = setInterval(() => {
      if (activeListingItem.images && activeListingItem.images.length > 0) {
        setActiveDetailImage(activeListingItem.images[index]);
        index = (index + 1) % activeListingItem.images.length;
      }
    }, 450);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIs360Rotating(false);
      showToast('360° virtual tour complete!', 'success');
    }, 3600);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [is360Rotating, activeListingItem.images, showToast]);

  const relatedListingsForDetail = useMemo(() => {
    return listings
      .filter((l) => l.type === activeListingItem.type && l.id !== activeListingItem.id && l.status === 'Approved')
      .slice(0, 3);
  }, [listings, activeListingItem.type, activeListingItem.id]);

  const getReturnButtonLabel = () => {
    switch (activeListingItem.type) {
      case 'car': return 'Cars & Vehicles';
      case 'bike': return 'Bikes & Scooters';
      case 'parts': return 'Parts & Accessories';
      case 'service': return 'Services';
      default: return 'Catalog';
    }
  };

  const activeAlert = priceAlerts.find(a => a.listingId === activeListingItem.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <button
          onClick={() => {
            changeView('browse');
          }}
          className={`flex items-center gap-2 text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer border ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' 
              : 'bg-white border-slate-100 text-slate-770 hover:bg-slate-50/80 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4 text-primary" /> {getReturnButtonLabel()}
        </button>

        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
          <span>Catalog</span>
          <span>/</span>
          <span className="capitalize text-orange-500 font-extrabold">{activeListingItem.type}s</span>
          <span>/</span>
          <span className="truncate max-w-[150px]">{activeListingItem.brand} {activeListingItem.model}</span>
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDarkMode 
          ? 'bg-amber-955/15 border-amber-900/40 text-amber-300' 
          : 'bg-amber-50/60 border-amber-205 text-amber-900'
      }`}>
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {language === 'bn' ? 'মার্কেটপ্লেস সতর্কতা ও নীতিমালা / Marketplace Disclaimer' : 'Marketplace Disclaimer & Safety Guidelines'}
            </p>
            <p className="text-xs font-medium leading-relaxed">
              {language === 'bn' 
                ? 'চাকা.বিডি কোনো পণ্য বিক্রয় বা ডেলিভারি করে না এবং কোনোরূপ টাকা লেনদেনের সাথে জড়িত নয়। আমরা শুধুমাত্র বিজ্ঞাপনদাতা ও ক্রেতাদের সংযোগ করার একটি প্ল্যাটফর্ম। যেকোনো চুক্তি বা কেনাকাটা ক্রেতা ও বিক্রেতার সম্পূর্ণ নিজস্ব দায়িত্ব ও ঝুঁকিতে সম্পন্ন হবে। দয়া করে নিজে সশরীরে উপস্থিত হয়ে গাড়ি ও কাগজপত্র ভালোভাবে চেইক করার পর চুক্তি চূড়ান্ত করুন।'
                : 'Chaka.bd does not sell or deliver any products and is never involved in any money transactions. We are purely a listing-only marketplace platform. All deals, payments, and handovers must be conducted directly on your own individual responsibility and risk. Always inspect vehicles and verify paperwork physically in-person before making payments.'}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200/60 dark:border-slate-800/50 pb-5">
        <div className="flex gap-4 items-start justify-between">
          <div className="flex-1 min-w-0">
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} leading-tight`}>
              {activeListingItem.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => {
                handleToggleWatchlist(activeListingItem.id);
              }}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                watchlist.includes(activeListingItem.id)
                  ? 'bg-rose-50/80 border-rose-100 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/30'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-900'
              }`}
              title={watchlist.includes(activeListingItem.id) ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              <Heart className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${watchlist.includes(activeListingItem.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onOpenShare}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-900 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Share this vehicle"
            >
              <Share2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400" />
            </button>
            <button
              onClick={() => onOpenReport(activeListingItem.id)}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white border-slate-200 text-orange-500 hover:bg-orange-50 dark:bg-slate-955 dark:border-slate-800 dark:text-amber-500 dark:hover:bg-orange-955/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Report misleading specifications or fraud (Abuse)"
            >
              <AlertTriangle className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-404">
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-900 font-semibold shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            {activeListingItem.year}
          </span>
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-900 font-semibold shadow-2xs">
            <Gauge className="w-3.5 h-3.5 text-primary shrink-0" />
            {activeListingItem.mileage ? (activeListingItem.mileage >= 1000 ? `${Math.round(activeListingItem.mileage / 1000)}k` : activeListingItem.mileage) : '0'} km
          </span>
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-900 font-semibold shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            {activeListingItem.location}, {activeListingItem.division}
          </span>
          <span className={`inline-flex items-center gap-1 text-[10px] uppercase px-2 py-0.5 rounded-lg font-black border ${
            activeListingItem.condition === 'New' 
              ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' 
              : activeListingItem.condition === 'Reconditioned'
                ? 'bg-sky-500/10 border-sky-505/20 text-sky-500'
                : 'bg-amber-500/10 border-amber-505/20 text-amber-500'
          }`}>
            {activeListingItem.condition}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className={`rounded-3xl p-3 border transition-all ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center group cursor-zoom-in"
              title="Click cover photo to zoom"
            >
              <img 
                referrerPolicy="no-referrer"
                src={activeDetailImage || activeListingItem.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800'} 
                alt={activeListingItem.title} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-102"
              />

              <div className="absolute bottom-4 left-4 px-2.5 py-1 text-[10.5px] font-black bg-slate-950/80 backdrop-blur-md rounded-lg text-white border border-white/10 shadow-md">
                {activeListingItem.images.indexOf(activeDetailImage || activeListingItem.images[0]) + 1} / {activeListingItem.images.length} Photos
              </div>
            </div>

            {activeListingItem.images.length > 1 && (
              <div className="mt-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2 px-1">
                  📷 Select photo to replace cover:
                </span>
                <div className="flex gap-2.5 px-0.5 pb-1 overflow-x-auto no-scrollbar scroll-smooth">
                  {activeListingItem.images.map((img, idx) => {
                    const isShowing = (activeDetailImage || activeListingItem.images[0]) === img;
                    return (
                      <button 
                        key={idx} 
                        onClick={() => {
                          setActiveDetailImage(img);
                          showToast(`Loaded Photo ${idx + 1} successfully!`);
                        }}
                        className={`w-20 h-14 rounded-xl overflow-hidden border shrink-0 transition-all cursor-pointer relative ${
                          isShowing 
                            ? 'border-red-500 ring-2 ring-red-500/20 scale-102 hover:opacity-100' 
                            : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-95'
                        }`}
                      >
                        <img referrerPolicy="no-referrer" src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
                        {isShowing && (
                          <div className="absolute right-1 bottom-1 bg-red-500 rounded-full p-0.5 shadow-sm">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            isDarkMode 
              ? 'bg-slate-950/40 border-slate-800' 
              : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h3 className={`text-base sm:text-lg font-extrabold tracking-tight mb-5 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Specifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-3 pb-3">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Brand</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeListingItem.brand}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Mileage</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {activeListingItem.mileage ? (activeListingItem.mileage >= 1000 ? `${Math.round(activeListingItem.mileage / 1000)}k` : activeListingItem.mileage) : '0'} km
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-404 font-medium">Body type</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {activeListingItem.bodyType || (activeListingItem.type === 'car' ? 'Sedan' : 'Commuter')}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Model</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeListingItem.model}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Engine</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {activeListingItem.engineCapacity ? activeListingItem.engineCapacity : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Fuel type</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeListingItem.fuelType || 'Petrol'}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-404 font-medium">Year</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeListingItem.year}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-404 font-medium">Transmission</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeListingItem.transmission || 'Automatic'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-505 dark:text-slate-404 font-medium">Registration</span>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeListingItem.registrationYear || 'Unregistered'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200/40 dark:border-slate-800/40">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Description</h4>
              <p className={`text-[12.5px] leading-relaxed font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {activeListingItem.description || 'No additional custom details are supplied by the owner for this listing.'}
              </p>
            </div>

            {activeListingItem.images && activeListingItem.images.length > 2 && (
              <div className="mt-6 pt-5 border-t border-slate-200/40 dark:border-slate-800/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-0.5">360° Virtual Tour</h4>
                    <p className="text-[10px] text-slate-500">Rotate all images in sequence to inspect details.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIs360Rotating(true)}
                    disabled={is360Rotating}
                    className={`h-9 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      is360Rotating 
                        ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20 cursor-wait' 
                        : 'bg-primary hover:bg-primary-hover text-white shadow-xs'
                    }`}
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-white/90 ${is360Rotating ? 'animate-spin' : 'animate-bounce-subtle'}`} />
                    <span>{is360Rotating ? 'Rotating Virtual Tour...' : 'Launch 360° Tour'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeListingItem.auctionGrade && (
              <div className="mt-6 pt-5 border-t border-slate-200/40 dark:border-slate-800/40">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3.5">Verified JP Auction Sheet</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border flex flex-col justify-between h-28 relative overflow-hidden ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#fcfbf9] border-slate-200/60 shadow-xs'
                  }`}>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary dark:text-orange-400 block mb-1">AUCTION REPORT GRADE</span>
                      <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeListingItem.auctionGrade}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">Verified via Japanese Database</span>
                  </div>

                  <div className={`p-4 rounded-2xl border flex flex-col justify-between h-28 relative overflow-hidden ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#fcfbf9] border-slate-200/60 shadow-xs'
                  }`}>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary dark:text-orange-400 block mb-1">EXTERIOR / INTERIOR GRADE</span>
                      <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeListingItem.auctionExteriorInterior || 'A / B'}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">Mint Japanese Condition Rating</span>
                  </div>
                </div>
              </div>
            )}

            {activeListingItem.accidentHistory && (
              <div className="mt-6 pt-5 border-t border-slate-200/40 dark:border-slate-800/40">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3.5">Accident History & Claim Verification</h4>
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50/50 border-slate-200/60'
                  }`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded border ${
                          activeListingItem.accidentHistory.hasAccidents 
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400' 
                            : 'bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400'
                        }`}>
                          {activeListingItem.accidentHistory.hasAccidents ? '⚠️ Minor Incident History' : '✅ No Accident Record'}
                        </span>
                        {activeListingItem.accidentHistory.reportDate && (
                          <span className="text-[10px] font-semibold text-slate-404">
                            Checked: {activeListingItem.accidentHistory.reportDate}
                          </span>
                        )}
                      </div>
                      
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-650 dark:text-slate-350">
                        {activeListingItem.accidentHistory.details}
                      </p>

                      <div className="mt-4 pt-3.5 border-t border-slate-200/40 dark:border-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-[10px] font-extrabold text-slate-404 dark:text-slate-500 uppercase tracking-tight">
                          🔗 Share Verification Report:
                        </span>
                        
                        <div className="flex flex-wrap items-center gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              const reportText = `Chaka Bangladesh Verified Status for ${activeListingItem.brand} ${activeListingItem.model} (${activeListingItem.year}):\nStatus: ${activeListingItem.accidentHistory?.hasAccidents ? 'Minor Claims Recorded' : 'Accident Free'}\nDetails: ${activeListingItem.accidentHistory?.details}\nLive link: ${window.location.href}`;
                              navigator.clipboard.writeText(reportText);
                              showToast('Report copied to clipboard!', 'success');
                            }}
                            className="h-7.5 px-2.5 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-[10px] font-extrabold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
                            title="Copy Incident details to clipboard"
                          >
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copy Status Report</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              const reportUrl = encodeURIComponent(window.location.href);
                              const statusLabel = activeListingItem.accidentHistory?.hasAccidents ? '⚠️ Minor incident claims.' : '✅ 100% Accident-free.';
                              const text = encodeURIComponent(`Chaka Bangladesh Verifed Damage Check for ${activeListingItem.brand} ${activeListingItem.model} (${activeListingItem.year}): ${statusLabel}\n\nDetails: ${activeListingItem.accidentHistory?.details}\nCheck here: `);
                              window.open(`https://api.whatsapp.com/send?text=${text}${reportUrl}`, '_blank');
                              showToast('WhatsApp sharing prompted!', 'success');
                            }}
                            className="h-7.5 px-2.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/10 text-[10px] font-extrabold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                            title="Share report to WhatsApp"
                          >
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.162 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.452 4.815 1.453 5.4 0 9.794-4.393 9.796-9.793.002-2.614-1.013-5.074-2.862-6.928C16.549 2.03 14.093.993 11.5 1.013c-5.4 0-9.794 4.393-9.796 9.794-.001 1.833.516 3.575 1.498 5.125L2.164 21.93l6.096-1.597h.387z"/></svg>
                            <span>WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`p-5 rounded-3xl border ${
            isDarkMode ? 'bg-amber-955/5 border-amber-955/20' : 'bg-amber-50/20 border-amber-200/50'
          }`}>
            <div className="flex items-center gap-2 mb-2 text-amber-555 font-black text-xs uppercase tracking-wider">
              <span>🛡️ Buyer Safety verification guide</span>
            </div>
            <ul className="text-[11px] space-y-1.5 text-slate-500 leading-normal pl-4 list-disc">
              <li>Always verify all physical registration certificates, engine codes, and chassis tags on the ground in person.</li>
              <li>We strongly prefer meetup points in public spots or certified auto repair shops/authorized service stations.</li>
              <li>Never issue digital advances, token bookings, or cash advances to unseen sellers before proper test drives are carried out.</li>
              <li>Ask the seller to provide historic maintenance records or scans.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-5 rounded-3xl border space-y-4.5 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div 
              onClick={() => changeView('profile', activeListingItem.userId)}
              className="flex items-center gap-2.5 cursor-pointer group hover:bg-orange-500/5 p-1.5 -m-1.5 rounded-2xl transition-all flex-1 min-w-0"
              title={language === 'bn' ? 'বিক্রেতার প্রোফাইল' : 'Visit Seller Profile'}
            >
              <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center font-black text-primary border border-orange-500/20 text-xs shrink-0 group-hover:scale-102 transition-transform">
                {activeListingItem.showroomName ? 'SR' : 'PV'}
              </div>
              <div className="min-w-0">
                <h4 className={`text-xs font-black group-hover:text-primary transition-colors truncate ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {activeListingItem.showroomName || activeListingItem.sellerName}
                </h4>
                <span className="text-[9px] text-slate-500 dark:text-slate-500 block uppercase tracking-wider font-extrabold mt-0.5 truncate">
                  {activeListingItem.sellerType === 'showroom' 
                    ? (language === 'bn' ? 'ভেরিফাইড শোরুম' : 'Verified Showroom') 
                    : (language === 'bn' ? 'ব্যক্তিগত বিক্রেতা' : 'Individual Seller')}
                </span>
              </div>
            </div>

            <button
              onClick={() => changeView('profile', activeListingItem.userId)}
              className="shrink-0 h-7.5 px-3 rounded-lg text-[9px] bg-orange-500/10 hover:bg-orange-500/20 text-primary dark:text-orange-404 border border-orange-500/22 font-black transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              Visit
            </button>
          </div>

          <div className={`p-5 rounded-3xl border space-y-4.5 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-555 dark:text-slate-500 block mb-1">Pricing & Negotiation</span>
              {activeListingItem.originalPrice && activeListingItem.originalPrice > activeListingItem.price ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 line-through leading-none">
                      BDT {activeListingItem.originalPrice.toLocaleString('en-IN')}
                    </span>

                    <span className="text-[9px] sm:text-[10px] font-extrabold text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/20 px-1.5 py-0.5 rounded-md leading-none flex items-center gap-0.5 animate-pulse">
                      ↓ {Math.round(((activeListingItem.originalPrice - activeListingItem.price) / activeListingItem.originalPrice) * 100)}% {language === 'bn' ? 'ছাড়' : 'OFF'}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <motion.span 
                      className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                      animate={{
                        scale: [1, 1.05, 1],
                        color: isDarkMode 
                          ? ["#34d399", "#059669", "#34d399"] 
                          : ["#047857", "#10b981", "#047857"],
                        textShadow: [
                          "0 0 0px rgba(16,185,129,0)",
                          "0 0 6px rgba(16,185,129,0.35)",
                          "0 0 0px rgba(16,185,129,0)"
                        ]
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {activeListingItem.priceFormatted}
                    </motion.span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">BDT</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{activeListingItem.priceFormatted}</span>
                  <span className="text-[10px] text-slate-400 font-extrabold">BDT</span>
                </div>
              )}
              <span className="text-[10.5px] text-slate-404 block mt-1 font-medium">Negotiable / Showroom price quote</span>
            </div>

            <div className="py-2.5 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> 
                  {activeListingItem.location}, {activeListingItem.division}
                </span>
                <span className="flex items-center gap-1.5 font-bold"><Eye className="w-3.5 h-3.5 text-slate-400" /> {activeListingItem.views} views</span>
              </div>
              {activeListingItem.address && (
                <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-[10.5px] text-slate-600 dark:text-slate-404 leading-normal font-semibold">
                  <span className="text-primary dark:text-orange-500 font-black uppercase text-[9px] tracking-wider block mb-0.5">Custom Detailed Address:</span>
                  {activeListingItem.address}
                </div>
              )}
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="flex gap-2">
                <button
                  onClick={() => handleStartListingChat(activeListingItem)}
                  className="flex-1 h-11 text-center font-black py-2.5 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white/90 shrink-0" />
                  <span>Chat</span>
                </button>

                <a
                  href={`https://wa.me/88${activeListingItem.sellerPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 text-center font-bold py-2.5 px-4 bg-[#e8f7f2] dark:bg-[#029a6c]/10 hover:bg-[#ebf8f4] dark:hover:bg-[#029a6c]/20 border border-[#02a96c] dark:border-[#02a96c]/40 text-[#029a6c] dark:text-[#a6ffd4] rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#029a6c] dark:text-[#a6ffd4] shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.162 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.452 4.815 1.453 5.4 0 9.794-4.393 9.796-9.793.002-2.614-1.013-5.074-2.862-6.928C16.549 2.03 14.093.993 11.5 1.013c-5.4 0-9.794 4.393-9.796 9.794-.001 1.833.516 3.575 1.498 5.125L2.164 21.93l6.096-1.597h.387z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              {!revealDetailPhone ? (
                <button
                  type="button"
                  onClick={() => setRevealDetailPhone(true)}
                  className="w-full h-11 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-extrabold text-[12.5px] rounded-xl cursor-pointer transition-all duration-150 shadow-xs"
                >
                  <EyeOff className="w-4 h-4 text-white shrink-0" />
                  <span>Show Phone Number</span>
                </button>
              ) : (
                <a 
                  href={`tel:${activeListingItem.sellerPhone}`}
                  className="w-full h-11 text-center font-bold py-2.5 px-4 bg-slate-950 dark:bg-slate-955/60 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" /> {activeListingItem.sellerPhone}
                </a>
              )}
            </div>

            <div className="mt-3.5 pt-3.5 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-primary shrink-0 animate-bounce-subtle" />
                <span className={`text-[11px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {language === 'bn' ? 'মূল্য অ্যালার্ট সেট করুন' : 'Set Price Alert'}
                </span>
              </div>

              {activeAlert ? (
                <div className={`p-3 rounded-xl border text-xs space-y-2 ${
                  isDarkMode ? 'bg-orange-955/20 border-orange-800/40 text-slate-350' : 'bg-orange-50/40 border-orange-100 text-slate-705'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-primary dark:text-orange-404 flex items-center gap-1 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      {language === 'bn' ? 'অ্যালার্টটি সচল রয়েছে' : 'Price Alert Active'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPriceAlerts(prev => prev.filter(a => a.id !== activeAlert.id));
                        showToast(
                          language === 'bn' ? 'অ্যালার্ট সফলভাবে মুছে ফেলা হয়েছে' : 'Price alert deleted successfully',
                          'info'
                        );
                      }}
                      className="p-1 text-rose-500 hover:text-rose-600 dark:hover:text-rose-404 transition-colors cursor-pointer"
                      title="Remove price alert"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] sm:text-[10.5px] leading-relaxed text-slate-500 dark:text-slate-404 font-semibold">
                    {language === 'bn' 
                      ? `টার্গেট মূল্য: ৳ ${activeAlert.targetPrice.toLocaleString('en-IN')} (দাম কমলে নোটিফিকেশনে জানাবো)`
                      : `Target BDT: ${activeAlert.targetPrice.toLocaleString()} (Get notified when the seller drops the price)`}
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const newPrice = Math.max(50000, activeAlert.targetPrice - 10000);
                      setListings(prev => prev.map(l => {
                        if (l.id === activeListingItem.id) {
                          return {
                            ...l,
                            originalPrice: l.originalPrice || l.price,
                            price: newPrice,
                            priceFormatted: `BDT ${newPrice.toLocaleString('en-IN')}`
                          };
                        }
                        return l;
                      }));
                    }}
                    className="w-full h-8 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[9px] rounded-lg cursor-pointer transition-all uppercase tracking-wider shadow-xs"
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>{language === 'bn' ? 'মূল্য কমিয়ে টেস্ট করুন' : 'Test Price Drop'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className={`text-[10px] leading-relaxed font-semibold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-505'}`}>
                    {language === 'bn' 
                      ? 'বিক্রেতা মূল্য কমালে স্ক্রিনে সাথে সাথে নোটিফিকেশন পান। আপনার লক্ষ্য মূল্য নির্ধারণ করুন:'
                      : 'Set a custom alert to be notified instantly via in-app toast alerts if this seller drops the price:'}
                  </p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={customTargetPrice}
                        onChange={(e) => setCustomTargetPrice(e.target.value)}
                        placeholder="Target Price"
                        className={`w-full pl-3 pr-12 py-2 text-xs font-bold rounded-xl outline-none border transition-all ${
                          isDarkMode 
                            ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-orange-500' 
                            : 'bg-slate-50 border-slate-205 focus:border-primary focus:bg-white text-slate-800'
                        }`}
                      />
                      <span className="absolute right-3.5 top-2 py-0.5 text-[8.5px] font-black text-slate-500 dark:text-slate-500 select-none">BDT</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const targetNum = Number(customTargetPrice);
                        if (!targetNum || targetNum <= 0) {
                          showToast(
                            language === 'bn' ? 'দয়া করে একটি সঠিক লক্ষ্য মূল্য লিখুন!' : 'Please enter a valid target price!',
                            'error'
                          );
                          return;
                        }
                        if (targetNum >= activeListingItem.price) {
                          showToast(
                            language === 'bn' 
                              ? ' লক্ষ্য মূল্য বর্তমান মূল্যের চেয়ে কম হতে হবে!' 
                              : 'Target price must be less than current price!',
                            'error'
                          );
                          return;
                        }

                        const newAlert: PriceAlert = {
                          id: 'alert_' + Date.now(),
                          listingId: activeListingItem.id,
                          brand: activeListingItem.brand,
                          model: activeListingItem.model,
                          targetPrice: targetNum,
                          originalPrice: activeListingItem.price,
                          triggered: false,
                          createdAt: new Date().toISOString()
                        };

                        setPriceAlerts(prev => [...prev, newAlert]);
                        showToast(
                          language === 'bn' 
                            ? `অ্যালার্ট সেট করা হয়েছে লক্ষ্য ৳ ${targetNum.toLocaleString('en-IN')}`
                            : `Price alert configured for BDT ${targetNum.toLocaleString()}`,
                          'success'
                        );
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-700 dark:border-slate-800 text-white font-extrabold text-[10px] flex items-center gap-1 cursor-pointer transition-all duration-150 shadow-xs"
                    >
                      <span>{language === 'bn' ? 'চালু করুন' : 'Enable'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <span className="text-[9px] text-primary text-center block leading-relaxed pt-2 border-t border-solid border-slate-100 dark:border-slate-800/40">
              Safety Warning: Always inspect papers and verify the physical vehicle before initiating any secure monetary payments.
            </span>
          </div>

          {adSlots.some(s => s.placement === 'listing-detail-sidebar' && s.isActive) && (
            <AdPlacement 
              slot={adSlots.find(s => s.placement === 'listing-detail-sidebar' && s.isActive) || adSlots[0]} 
              allSlots={adSlots}
              isDarkMode={isDarkMode} 
            />
          )}

        </div>

      </div>

      {relatedListingsForDetail.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-dashed border-slate-800/20">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500" /> Similar Vehicles You Might Like
            </h3>
            <span className="text-[8.5px] sm:text-[10.5px] font-black uppercase tracking-wider text-slate-400/70 flex items-center gap-1">
              Swipe to View &rarr;
            </span>
          </div>

          <div 
            className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory touch-pan-x pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {relatedListingsForDetail.map((listing) => (
              <div 
                key={listing.id} 
                className="w-[185px] sm:w-[260px] shrink-0 snap-start"
              >
                <ListingCard
                  listing={listing}
                  isDarkMode={isDarkMode}
                  onSelect={(id) => {
                    changeView('listing', id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSelectProfile={(pId) => changeView('profile', pId)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {adSlots.some(s => s.placement === 'listing-detail-bottom' && s.isActive) && (
        <div className="mt-8 pt-8 border-t border-solid border-slate-200/50 dark:border-slate-800/50">
          <AdPlacement 
            slot={adSlots.find(s => s.placement === 'listing-detail-bottom' && s.isActive) || adSlots[0]} 
            allSlots={adSlots}
            isDarkMode={isDarkMode} 
          />
        </div>
      )}

      {/* IMMERSIVE MAGNIFYING GLASS LIGHTBOX OVERLAY */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-955/95 backdrop-blur-md p-4 animate-fade-in">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10 transition-all cursor-pointer shadow-lg hover:scale-105"
            title="Close Lightbox Zoom Panel"
          >
            ✕
          </button>

          <div className="relative max-w-5xl w-full aspect-video flex items-center justify-center p-2">
            <img 
              referrerPolicy="no-referrer"
              src={activeDetailImage || activeListingItem.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800'} 
              alt={activeListingItem.title} 
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <span className="text-xs font-black text-slate-350">
              Photo {activeListingItem.images.indexOf(activeDetailImage || activeListingItem.images[0]) + 1} of {activeListingItem.images.length}
            </span>
            
            <div className="flex gap-2.5 max-w-xl overflow-x-auto no-scrollbar py-2">
              {activeListingItem.images.map((img, idx) => {
                const isShowing = (activeDetailImage || activeListingItem.images[0]) === img;
                return (
                  <button 
                    key={idx} 
                    onClick={() => setActiveDetailImage(img)}
                    className={`w-16 h-11 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      isShowing 
                        ? 'border-red-500 scale-102 ring-4 ring-red-500/20' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img referrerPolicy="no-referrer" src={img} alt={`lightbox-thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Call & Chat Control Bar */}
      {showMobileStickyActions && (
        <div className="md:hidden fixed bottom-[82px] left-3 right-3 z-45 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-800 px-3 py-1.5 rounded-xl flex items-center justify-between gap-2 shadow-[0_4px_20px_rgba(2,154,108,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-2 duration-300 pr-safe pl-safe">
          <div className="flex-1 min-w-0">
            <h5 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none truncate">
              Contact Seller
            </h5>
            <span className="text-[9px] font-bold text-primary dark:text-orange-404 block mt-0.5 leading-none">
              যোগাযোগ করুন
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {!revealDetailPhone ? (
              <button
                onClick={() => {
                  setRevealDetailPhone(true);
                  window.location.href = `tel:${activeListingItem.sellerPhone}`;
                }}
                className="h-[32px] px-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white flex items-center justify-center gap-1 rounded-lg font-bold text-[10px] sm:text-xs transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <Phone className="w-3 h-3 fill-current text-white shrink-0" />
                <span>Call</span>
              </button>
            ) : (
              <a
                href={`tel:${activeListingItem.sellerPhone}`}
                className="h-[32px] px-2 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-primary dark:text-orange-400 flex items-center justify-center gap-1 rounded-lg font-bold text-[10px] transition-all active:scale-95 cursor-pointer shadow-sm text-center truncate max-w-[105px]"
              >
                <Phone className="w-3 h-3 fill-current text-primary shrink-0" />
                <span className="truncate text-[9px]">{activeListingItem.sellerPhone}</span>
              </a>
            )}

            <button
              onClick={() => handleStartListingChat(activeListingItem)}
              className="h-[32px] px-3 bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-1 rounded-lg font-bold text-[11px] sm:text-xs transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-3 h-3 text-white/90 shrink-0" />
              <span>Chat</span>
            </button>
          </div>

          <button 
            onClick={() => setShowMobileStickyActions(false)}
            className="absolute -top-1 -right-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-550 hover:text-slate-750 dark:text-slate-500 dark:hover:text-white rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none cursor-pointer"
            title="Dismiss actions"
          >
            <X className="w-2.5 h-2.5 stroke-[2.5px]" />
          </button>
        </div>
      )}
    </div>
  );
}
