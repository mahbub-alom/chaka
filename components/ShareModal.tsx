"use client";

import React from 'react';
import { Share2 } from 'lucide-react';
import { VehicleListing } from '@/types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: VehicleListing;
  isDarkMode: boolean;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export default function ShareModal({
  isOpen,
  onClose,
  listing,
  isDarkMode,
  showToast
}: ShareModalProps) {
  if (!isOpen) return null;

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    showToast('Facebook sharing opened!', 'success');
  };

  const handleWhatsappShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${listing.brand} ${listing.model} on Chaka:`);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    showToast('WhatsApp sharing opened!', 'success');
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    try {
      const dummy = document.createElement('input');
      document.body.appendChild(dummy);
      dummy.value = currentUrl;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      showToast('Direct Link Copied to Clipboard!', 'success');
    } catch (err) {
      navigator.clipboard.writeText(currentUrl);
      showToast('Direct Link Copied!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs cursor-pointer animate-fade-in"
        onClick={onClose}
      />
      <div className={`relative max-w-sm w-full rounded-3xl border p-6 shadow-2xl overflow-hidden transition-all duration-300 animate-slide-in z-10 ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-extrabold text-sm md:text-base flex items-center gap-2">
            <span>📢</span> Share Advertisement
          </h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-404 cursor-pointer"
          >
            ✕
          </button>
        </div>
        
        <p className="text-[11px] text-slate-500 dark:text-slate-404 mb-5 leading-normal">
          Copy direct listing URL link or broadcast to social networks with friends.
        </p>

        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <button
            onClick={handleFacebookShare}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-600/10 hover:bg-blue-600/15 border border-blue-600/10 text-blue-500 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 mb-1.5 fill-current" viewBox="0 0 24 24">
              <path d="M14 13.5h2.5l1-3H16.5v-2c0-.5.2-.7.8-.7H19V5h-2.5c-2 0-3 1-3 3v2.5H11v3h2.5V22h3v-8.5z"/>
            </svg>
            <span className="text-[10px] font-black uppercase tracking-wider">Facebook</span>
          </button>

          <button
            onClick={handleWhatsappShare}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-600/10 hover:bg-orange-600/15 border border-orange-600/10 text-orange-500 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 mb-1.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.162 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.452 4.815 1.453 5.4 0 9.794-4.393 9.796-9.793.002-2.614-1.013-5.074-2.862-6.928C16.549 2.03 14.093.993 11.5 1.013c-5.4 0-9.794 4.393-9.796 9.794-.001 1.833.516 3.575 1.498 5.125L2.164 21.93l6.096-1.597h.387z"/>
            </svg>
            <span className="text-[10px] font-black uppercase tracking-wider">WhatsApp</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-rose-600/10 hover:bg-rose-600/15 border border-rose-600/10 text-rose-500 transition-colors cursor-pointer"
          >
            <Share2 className="w-5 h-5 mb-1.5 shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-wider">Copy Link</span>
          </button>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <input 
            type="text" 
            readOnly 
            value={typeof window !== 'undefined' ? window.location.href : ''}
            className="flex-1 min-w-0 bg-transparent text-[10.5px] text-slate-400 outline-none pl-1"
          />
          <button
            onClick={handleCopyLink}
            className="text-[10.5px] font-black text-[#ff6600] px-3 py-1.5 hover:bg-[#ff6600]/10 rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
