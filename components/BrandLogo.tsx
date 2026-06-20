import React, { useState } from 'react';

interface BrandLogoProps {
  brandName: string;
  className?: string;
  sizeClassName?: string;
}

export default function BrandLogo({ brandName, className = '', sizeClassName = 'w-3.5 h-3.5' }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  const norm = brandName.trim().toLowerCase();

  const logoDomains: { [key: string]: string } = {
    'toyota': 'toyota.com',
    'toyota oem': 'toyota.com',
    'honda': 'honda.com',
    'nissan': 'nissan-global.com',
    'bmw': 'bmw.com',
    'bmw i': 'bmw.com',
    'suzuki': 'suzuki.com',
    'yamaha': 'yamaha-motor.com',
    'yamaha genuine': 'yamaha-motor.com',
    'tesla': 'tesla.com',
    'mitsubishi': 'mitsubishi-motors.com',
    'hyundai': 'hyundai.com',
    'hyundai ioniq': 'hyundai.com',
    'byd': 'byd.com',
    'bajaj': 'bajajauto.com',
    'hero': 'heromotocorp.com',
    'royal enfield': 'royalenfield.com',
    'tata': 'tatamotors.com',
    'isuzu': 'isuzu.com',
    'mahindra': 'mahindra.com',
    'neta': 'hozonauto.com',
    'wuling': 'wuling.com',
    'audi': 'audi.com',
    'mercedes-benz': 'mercedes-benz.com',
    'tvs': 'tvsmotor.com',
    'brembo': 'brembo.com',
    'michelin': 'michelin.com'
  };

  const domain = logoDomains[norm];

  const renderFallbackSvg = () => {
    switch (norm) {
      case 'toyota':
      case 'toyota oem':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} text-rose-600 shrink-0 ${className}`} fill="currentColor">
            <ellipse cx="12" cy="12" rx="10" ry="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <ellipse cx="12" cy="12" rx="6" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="12" cy="9" rx="3.5" ry="3" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        );
      case 'honda':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} text-red-650 shrink-0 ${className}`} fill="currentColor">
            <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 3v12h2v-5h6v5h2V6h-2v5H9V6H7z" />
          </svg>
        );
      case 'nissan':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} text-slate-500 shrink-0 ${className}`} fill="currentColor">
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M3 10h18v4H3v-4z" />
          </svg>
        );
      case 'bmw':
      case 'bmw i':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} shrink-0 ${className}`} fill="currentColor">
            <circle cx="12" cy="12" r="9" className="text-slate-800" fill="currentColor" />
            <circle cx="12" cy="12" r="8" className="text-white" fill="currentColor" />
            <path d="M12 12V4a8 8 0 0 0-8 8h8z" className="text-sky-500" fill="currentColor" />
            <path d="M12 12V20a8 8 0 0 0 8-8h-8z" className="text-sky-500" fill="currentColor" />
          </svg>
        );
      case 'suzuki':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} text-red-600 shrink-0 ${className}`} fill="currentColor">
            <path d="M7 3h10s-3.5 4-3.5 5 2.5 2.5 3.5 3-5 10-5 10H7s3.5-4 3.5-5.5-3.5-2.5-3.5-3.5 5-9 5-9z" />
          </svg>
        );
      case 'yamaha':
      case 'yamaha genuine':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} text-[#ff0000] shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
          </svg>
        );
      case 'tesla':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} text-[#cc0000] shrink-0 ${className}`} fill="currentColor">
            <path d="M12 2C8.5 2 4.5 3.5 3 5c2 1 4.5.5 7 0v17h4V5c2.5.5 5 1 7 0-1.5-1.5-5.5-3-9-3z" />
          </svg>
        );
      case 'mitsubishi':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} text-red-600 shrink-0 ${className}`} fill="currentColor">
            <polygon points="12,2 9,7 12,12 15,7" />
            <polygon points="12,12 6,12 3,17 9,17" />
            <polygon points="12,12 18,12 21,17 15,17" />
          </svg>
        );
      case 'hyundai':
      case 'hyundai ioniq':
        return (
          <svg viewBox="0 0 24 24" className={`${sizeClassName} text-[#002c5f] shrink-0 ${className}`} fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 12h-2v3h-2v-3H9.5v3h-2V7h2v4h3V7h2v4h2v3z" transform="skewX(-10) translate(1)" />
          </svg>
        );
      case 'byd':
        return (
          <div className="text-[7.5px] font-black border border-solid border-slate-300 dark:border-slate-800 px-1 rounded bg-slate-50 dark:bg-slate-900 text-blue-600 tracking-tighter leading-none select-none">BYD</div>
        );
      default:
        return (
          <div className={`${sizeClassName} flex items-center justify-center text-[8px] font-black text-primary bg-orange-50 dark:bg-orange-950/20 border border-solid border-orange-200/40 rounded scale-95`}>
            {brandName.trim().slice(0, 1).toUpperCase()}
          </div>
        );
    }
  };

  if (!domain || hasError) {
    return renderFallbackSvg();
  }

  const clearbitUrl = `https://logo.clearbit.com/${domain}`;

  return (
    <img
      src={clearbitUrl}
      alt={brandName}
      className={`${sizeClassName} object-contain shrink-0 ${className}`}
      referrerPolicy="no-referrer"
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
