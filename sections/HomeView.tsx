"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import {
  Compass,
  MapPin,
  LayoutGrid,
  Grid,
  Sparkles,
  List,
  Eye,
} from "lucide-react";
import { VehicleListing, SearchFilters, AdvertisementSlot } from "@/types";
import ListingCard from "@/components/ListingCard";
import AdPlacement from "@/components/AdPlacement";
import HowItWorks from "@/sections/HowItWorks";
import BrandLogo from "@/components/BrandLogo";

const DIVISION_META: Record<
  string,
  {
    tagline: string;
    badge: string;
    gradient: string;
    accentColor: string;
    icon: React.ReactNode;
  }
> = {
  Dhaka: {
    tagline: "Metro Mega Capital",
    badge: "🏢 METRO",
    gradient: "from-orange-500/10 to-teal-500/5",
    accentColor: "text-orange-500 border-orange-500/20",
    icon: (
      <svg
        className="w-5 h-5 text-orange-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="10" width="10" height="12" rx="2" />
        <path d="M12 2h8a2 2 0 0 1 2 2v18h-10z" />
        <path d="M6 14h2" />
        <path d="M6 18h2" />
        <path d="M16 6h2" />
        <path d="M16 10h2" />
        <path d="M16 14h2" />
        <path d="M16 18h2" />
      </svg>
    ),
  },
  Chittagong: {
    tagline: "Marine Port City",
    badge: "⚓ PORT",
    gradient: "from-sky-500/10 to-blue-500/5",
    accentColor: "text-sky-500 border-sky-500/20",
    icon: (
      <svg
        className="w-5 h-5 text-sky-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22V8" />
        <path d="M5 12H2 a10 10 0 0 0 20 0h-3" />
        <circle cx="12" cy="5" r="3" />
      </svg>
    ),
  },
  Sylhet: {
    tagline: "Green Tea Canopy",
    badge: "🍃 SCENIC",
    gradient: "from-lime-500/10 to-green-500/5",
    accentColor: "text-green-500 border-green-500/20",
    icon: (
      <svg
        className="w-5 h-5 text-green-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c0-5.5-4.5-10-10-10" />
        <path d="M12 22c0-5.5 4.5-10 10-10" />
        <path d="M12 2v20" />
      </svg>
    ),
  },
  Rajshahi: {
    tagline: "Silk & Mango Plains",
    badge: "🥭 FRUIT",
    gradient: "from-amber-500/10 to-orange-500/5",
    accentColor: "text-orange-500 border-orange-500/20",
    icon: (
      <svg
        className="w-5 h-5 text-orange-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
      </svg>
    ),
  },
  Khulna: {
    tagline: "Sundarbans Delta",
    badge: "🐅 WILD",
    gradient: "from-teal-600/10 to-orange-500/5",
    accentColor: "text-teal-500 border-teal-500/20",
    icon: (
      <svg
        className="w-5 h-5 text-teal-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  Barisal: {
    tagline: "Queen of Rivers",
    badge: "🌊 DELTA",
    gradient: "from-cyan-500/10 to-sky-500/5",
    accentColor: "text-cyan-500 border-cyan-500/20",
    icon: (
      <svg
        className="w-5 h-5 text-cyan-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 6c.6.5 1.2 1 2.5 1s2.5-.5 3.1-1c.6-.5 1.2-1 2.5-1s2.5.5 3.1 1" />
        <path d="M2 12c.6.5 1.2 1 2.5 1s2.5-.5 3.1-1c.6-.5 1.2-1 2.5-1s2.5.5 3.1 1" />
        <path d="M2 18c.6.5 1.2 1 2.5 1s2.5-.5 3.1-1c.6-.5 1.2-1 2.5-1s2.5.5 3.1 1" />
      </svg>
    ),
  },
  Rangpur: {
    tagline: "Agro-Heritage Soil",
    badge: "🌾 AGRO",
    gradient: "from-rose-500/10 to-orange-500/5",
    accentColor: "text-rose-500 border-rose-500/20",
    icon: (
      <svg
        className="w-5 h-5 text-rose-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m2 22 1-1" />
        <path d="M12 12c.6.5 1.2 1 2.5 1s2.5-.5 3.1-1" />
        <path d="M12 12a10 10 0 1 1-10-10" />
      </svg>
    ),
  },
  Mymensingh: {
    tagline: "Nature's Ridge Valley",
    badge: "⛰️ VALLEY",
    gradient: "from-fuchsia-500/10 to-pink-500/5",
    accentColor: "text-fuchsia-500 border-fuchsia-500/20",
    icon: (
      <svg
        className="w-5 h-5 text-fuchsia-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
        <path d="m16 12-4-4-4 4" />
        <path d="M12 16V8" />
      </svg>
    ),
  },
};

interface HomeViewProps {
  listings: VehicleListing[];
  adSlots: AdvertisementSlot[];
  isDarkMode: boolean;
  homeViewMode: "grid" | "list";
  setHomeViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  changeView: (view: string, categoryOrId?: string | null) => void;
  language: "en" | "bn";
  t: (key: string) => string;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  mostViewedListingsForHome: VehicleListing[];
  BANGLADESH_DIVISIONS: string[];
}

export default function HomeView({
  listings,
  adSlots,
  isDarkMode,
  homeViewMode,
  setHomeViewMode,
  filters,
  setFilters,
  changeView,
  language,
  t,
  showToast,
  mostViewedListingsForHome,
  BANGLADESH_DIVISIONS,
}: HomeViewProps) {
  const TOP_BRANDS_SCROLL = useMemo(
    () => [
      {
        name: "Toyota",
        logo: (
          <BrandLogo
            brandName="Toyota"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-rose-500/40 hover:bg-rose-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-rose-500/30 hover:bg-rose-950/10",
        iconColor: "text-rose-600 dark:text-rose-400",
        gradient: "from-rose-500/10 to-rose-600/5",
      },
      {
        name: "Honda",
        logo: (
          <BrandLogo
            brandName="Honda"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-red-500/40 hover:bg-red-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-red-500/30 hover:bg-red-950/10",
        iconColor: "text-red-650 dark:text-red-400",
        gradient: "from-red-500/10 to-red-600/5",
      },
      {
        name: "Yamaha",
        logo: (
          <BrandLogo
            brandName="Yamaha"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-blue-500/40 hover:bg-blue-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-blue-500/30 hover:bg-blue-950/10",
        iconColor: "text-blue-600 dark:text-blue-400",
        gradient: "from-blue-500/10 to-indigo-600/5",
      },
      {
        name: "Suzuki",
        logo: (
          <BrandLogo
            brandName="Suzuki"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-red-600/40 hover:bg-red-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-red-600/30 hover:bg-red-950/10",
        iconColor: "text-red-600 dark:text-red-400",
        gradient: "from-red-600/10 to-orange-550/5",
      },
      {
        name: "Nissan",
        logo: (
          <BrandLogo
            brandName="Nissan"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-slate-500/40 hover:bg-slate-100/30 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-slate-400/30 hover:bg-slate-900/20",
        iconColor: "text-slate-655 dark:text-slate-400",
        gradient: "from-slate-500/10 to-slate-600/5",
      },
      {
        name: "Hyundai",
        logo: (
          <BrandLogo
            brandName="Hyundai"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-cyan-600/40 hover:bg-cyan-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-cyan-500/30 hover:bg-cyan-950/10",
        iconColor: "text-cyan-700 dark:text-cyan-400",
        gradient: "from-cyan-500/10 to-blue-600/5",
      },
      {
        name: "BMW",
        logo: (
          <BrandLogo brandName="BMW" sizeClassName="w-12 h-12 sm:w-14 sm:h-14" />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-sky-500/40 hover:bg-sky-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-sky-500/30 hover:bg-sky-950/10",
        iconColor: "text-sky-655 dark:text-sky-400",
        gradient: "from-sky-500/10 to-blue-655/5",
      },
      {
        name: "Audi",
        logo: (
          <BrandLogo brandName="Audi" sizeClassName="w-12 h-12 sm:w-14 sm:h-14" />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-slate-400/50 hover:bg-slate-50 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-zinc-400/30 hover:bg-zinc-900/10",
        iconColor: "text-slate-800 dark:text-slate-300",
        gradient: "from-slate-400/10 to-zinc-500/5",
      },
      {
        name: "Mercedes-Benz",
        logo: (
          <BrandLogo
            brandName="Mercedes-Benz"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover: "hover:border-zinc-500/40 hover:bg-zinc-50 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-zinc-400/30 hover:bg-zinc-955/10",
        iconColor: "text-zinc-600 dark:text-zinc-300",
        gradient: "from-zinc-450/10 to-slate-500/5",
      },
      {
        name: "Royal Enfield",
        logo: (
          <BrandLogo
            brandName="Royal Enfield"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-amber-600/40 hover:bg-amber-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-amber-500/30 hover:bg-amber-950/10",
        iconColor: "text-amber-600 dark:text-amber-555",
        gradient: "from-amber-500/10 to-yellow-600/5",
      },
      {
        name: "Bajaj",
        logo: (
          <BrandLogo
            brandName="Bajaj"
            sizeClassName="w-12 h-12 sm:w-14 sm:h-14"
          />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-teal-500/40 hover:bg-teal-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-teal-500/30 hover:bg-teal-950/10",
        iconColor: "text-teal-650 dark:text-teal-400",
        gradient: "from-teal-500/10 to-blue-600/5",
      },
      {
        name: "TVS",
        logo: (
          <BrandLogo brandName="TVS" sizeClassName="w-12 h-12 sm:w-14 sm:h-14" />
        ),
        lightBorder: "border-slate-200/55",
        lightHover:
          "hover:border-rose-500/40 hover:bg-rose-50/10 hover:shadow-xs",
        darkBorder: "border-slate-800/80",
        darkHover: "hover:border-rose-500/30 hover:bg-rose-950/10",
        iconColor: "text-rose-600 dark:text-rose-400",
        gradient: "from-rose-555/10 to-indigo-505/5",
      },
    ],
    [],
  );
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Dynamic Rotating Top Sponsor Banner Slot */}
      {adSlots.some((s) => s.placement === "home-top" && s.isActive) && (
        <div className="max-w-7xl mx-auto my-0">
          <AdPlacement
            slot={
              adSlots.find((s) => s.placement === "home-top" && s.isActive) ||
              adSlots[0]
            }
            allSlots={adSlots}
            isDarkMode={isDarkMode}
          />
        </div>
      )}
      {/* categories section start here  */}
      <div className="space-y-6 mt-12 relative">
        <style>{`
          @keyframes wheel-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes cng-rumble {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            20% { transform: translate(-0.5px, 0.5px) rotate(-0.5deg); }
            40% { transform: translate(0.5px, -0.5px) rotate(0.5deg); }
            60% { transform: translate(-0.5px, -0.5px) rotate(-0.5deg); }
            80% { transform: translate(0.5px, 0.5px) rotate(0.5deg); }
          }
          @keyframes ev-pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(16,185,129,0.5)); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 10px rgba(16,185,129,1)); }
          }
          @keyframes wrench-wave {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-15deg); }
          }
          .animate-wheel {
            transform-box: fill-box;
            transform-origin: center;
          }
          .group:hover .animate-wheel {
            animation: wheel-spin 1.5s linear infinite;
          }
          .animate-cng {
            transform-box: fill-box;
            transform-origin: bottom center;
          }
          .group:hover .animate-cng {
            animation: cng-rumble 0.1s linear infinite;
          }
          .animate-ev {
            transform-box: fill-box;
            transform-origin: center;
          }
          .group:hover .animate-ev {
            animation: ev-pulse 1.2s ease-in-out infinite;
          }
          .animate-wrench {
            transform-box: fill-box;
            transform-origin: bottom left;
          }
          .group:hover .animate-wrench {
            animation: wrench-wave 0.6s ease-in-out infinite;
          }
        `}</style>

        {/* Modern premium header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-100 dark:border-slate-800/40 pb-5 mb-5 gap-3">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-primary dark:text-orange-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Explore Marketplace
            </div>
            {/* <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 matches-outfit">
              <Grid className="w-5 h-5 text-primary dark:text-orange-400" />
              {t("Categories")}
            </h2> */}
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {language === "bn"
                ? "আপনার পছন্দের যানবাহনের ক্যাটাগরি সিলেক্ট করুন"
                : "Select a category to filter listings instantly"}
            </p>
          </div>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.02,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10px" }}
          className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-5 pt-2"
        >
          {[
            {
              id: "car",
              title: "Car",
              subtitle: "Sedan & SUV",
              glowStyle: { backgroundImage: "radial-gradient(circle, rgba(244,63,94,0.15) 0%, rgba(244,63,94,0) 70%)" },
              hoverBorder: "hover:border-rose-500/40 dark:hover:border-rose-500/30",
              glowText: "group-hover:text-rose-500 dark:group-hover:text-rose-455",
              svg: (
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                  <defs>
                    <linearGradient id="car-body" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#be123c" />
                    </linearGradient>
                    <linearGradient id="car-glass" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                    </linearGradient>
                    <radialGradient id="car-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="76" rx="34" ry="7" fill="#000" opacity="0.2" />
                  <ellipse cx="50" cy="76" rx="42" ry="12" fill="url(#car-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <path d="M15 62 L18 50 C20 46 25 44 30 44 L70 44 C75 44 80 46 82 50 L85 62 C87 66 85 72 80 72 L20 72 C15 72 13 66 15 62 Z" fill="url(#car-body)" />
                  <path d="M30 46 L36 34 C38 30 42 29 46 29 L54 29 C58 29 62 30 64 34 L70 46 Z" fill="url(#car-glass)" />
                  <path d="M48 29 L48 46" stroke="#fff" strokeWidth="1" opacity="0.3" />
                  <rect x="36" y="60" width="28" height="8" rx="2" fill="#1e293b" />
                  <line x1="40" y1="64" x2="60" y2="64" stroke="#475569" strokeWidth="1" />
                  <circle cx="24" cy="56" r="3.5" fill="#fff" filter="drop-shadow(0 0 4px #fff)" />
                  <circle cx="76" cy="56" r="3.5" fill="#fff" filter="drop-shadow(0 0 4px #fff)" />
                  <rect x="18" y="68" width="8" height="6" rx="1.5" fill="#0f172a" />
                  <rect x="74" y="68" width="8" height="6" rx="1.5" fill="#0f172a" />
                  <path d="M34 50 L42 60 M66 50 L58 60" stroke="#9f1239" strokeWidth="1.5" opacity="0.5" />
                </svg>
              ),
            },
            {
              id: "bike",
              title: "Bike",
              subtitle: "Motorcycle & Scooter",
              glowStyle: { backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)" },
              hoverBorder: "hover:border-blue-500/40 dark:hover:border-blue-500/30",
              glowText: "group-hover:text-blue-500 dark:group-hover:text-blue-455",
              svg: (
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                  <defs>
                    <linearGradient id="bike-body" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <radialGradient id="bike-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="78" rx="36" ry="6" fill="#000" opacity="0.2" />
                  <ellipse cx="50" cy="78" rx="42" ry="10" fill="url(#bike-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <path d="M30 64 L42 46 L60 46 L70 64 Z" stroke="#334155" strokeWidth="4" fill="none" strokeLinejoin="round" />
                  <circle cx="48" cy="58" r="6" fill="#475569" />
                  <path d="M38 46 C38 40 46 36 54 36 L64 42 L72 42 C76 42 78 45 76 48 L70 54 Z" fill="url(#bike-body)" />
                  <line x1="30" y1="64" x2="22" y2="34" stroke="#64748b" strokeWidth="3" />
                  <line x1="22" y1="34" x2="18" y2="34" stroke="#334155" strokeWidth="3" />
                  <line x1="48" y1="58" x2="70" y2="64" stroke="#475569" strokeWidth="3.5" />
                  <g className="animate-wheel">
                    <circle cx="30" cy="64" r="12" fill="none" stroke="#1e293b" strokeWidth="4" />
                    <circle cx="30" cy="64" r="9" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="30" y1="52" x2="30" y2="76" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="18" y1="64" x2="42" y2="64" stroke="#60a5fa" strokeWidth="1.5" />
                  </g>
                  <g className="animate-wheel">
                    <circle cx="70" cy="64" r="12" fill="none" stroke="#1e293b" strokeWidth="4" />
                    <circle cx="70" cy="64" r="9" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="70" y1="52" x2="70" y2="76" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="58" y1="64" x2="82" y2="64" stroke="#60a5fa" strokeWidth="1.5" />
                  </g>
                </svg>
              ),
            },
            {
              id: "commercial",
              title: "Commercial",
              subtitle: "Truck & Pickup",
              glowStyle: { backgroundImage: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0) 70%)" },
              hoverBorder: "hover:border-amber-500/40 dark:hover:border-amber-500/30",
              glowText: "group-hover:text-amber-500 dark:group-hover:text-amber-455",
              svg: (
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                  <defs>
                    <linearGradient id="cab-body" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="cargo-body" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                    <radialGradient id="comm-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="78" rx="36" ry="6" fill="#000" opacity="0.2" />
                  <ellipse cx="50" cy="78" rx="42" ry="10" fill="url(#comm-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <rect x="36" y="32" width="46" height="34" rx="2" fill="url(#cargo-body)" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="46" y1="32" x2="46" y2="66" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />
                  <line x1="58" y1="32" x2="58" y2="66" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />
                  <line x1="70" y1="32" x2="70" y2="66" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />
                  <path d="M16 50 L20 40 C21 38 23 37 25 37 L36 37 L36 66 L16 66 Z" fill="url(#cab-body)" />
                  <path d="M25 40 L32 40 L32 50 L20 50 Z" fill="#1e293b" opacity="0.8" />
                  <rect x="12" y="60" width="5" height="6" rx="1" fill="#475569" />
                  <circle cx="16" cy="56" r="2.5" fill="#fef08a" />
                  <g className="animate-wheel">
                    <circle cx="28" cy="68" r="8" fill="#1e293b" />
                    <circle cx="28" cy="68" r="3" fill="#94a3b8" />
                  </g>
                  <g className="animate-wheel">
                    <circle cx="50" cy="68" r="8" fill="#1e293b" />
                    <circle cx="50" cy="68" r="3" fill="#94a3b8" />
                  </g>
                  <g className="animate-wheel">
                    <circle cx="70" cy="68" r="8" fill="#1e293b" />
                    <circle cx="70" cy="68" r="3" fill="#94a3b8" />
                  </g>
                </svg>
              ),
            },
            {
              id: "ev",
              title: "EV",
              subtitle: "Electric Vehicle",
              glowStyle: { backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)" },
              hoverBorder: "hover:border-emerald-500/40 dark:hover:border-emerald-500/30",
              glowText: "group-hover:text-emerald-500 dark:group-hover:text-emerald-455",
              svg: (
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                  <defs>
                    <linearGradient id="ev-body" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <radialGradient id="ev-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="76" rx="34" ry="7" fill="#000" opacity="0.2" />
                  <ellipse cx="50" cy="76" rx="42" ry="12" fill="url(#ev-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <path d="M15 62 L18 50 C20 46 25 44 30 44 L70 44 C75 44 80 46 82 50 L85 62 C87 66 85 72 80 72 L20 72 C15 72 13 66 15 62 Z" fill="url(#ev-body)" opacity="0.85" />
                  <path d="M30 46 L36 34 C38 30 42 29 46 29 L54 29 C58 29 62 30 64 34 L70 46 Z" fill="#1e293b" opacity="0.6" />
                  <circle cx="26" cy="70" r="7" fill="#1e293b" />
                  <circle cx="26" cy="70" r="3" fill="#a7f3d0" />
                  <circle cx="74" cy="70" r="7" fill="#1e293b" />
                  <circle cx="74" cy="70" r="3" fill="#a7f3d0" />
                  <g className="animate-ev" transform="translate(50, 52)">
                    <circle cx="0" cy="0" r="10" fill="#047857" stroke="#10b981" strokeWidth="2" />
                    <path d="M-2 -5 L3 -1 L-2 1 L2 6" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              ),
            },
            {
              id: "threewheeler",
              title: "Three Wheeler",
              subtitle: "CNG & Auto",
              glowStyle: { backgroundImage: "radial-gradient(circle, rgba(132,204,22,0.15) 0%, rgba(132,204,22,0) 70%)" },
              hoverBorder: "hover:border-lime-500/40 dark:hover:border-lime-500/30",
              glowText: "group-hover:text-lime-600 dark:group-hover:text-lime-455",
              svg: (
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-105">
                  <defs>
                    <linearGradient id="cng-green" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="cng-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <radialGradient id="cng-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#84cc16" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="78" rx="32" ry="6" fill="#000" opacity="0.2" />
                  <ellipse cx="50" cy="78" rx="38" ry="10" fill="url(#cng-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <g className="animate-cng">
                    <path d="M26 68 L24 48 C24 38 32 30 42 30 L58 30 C66 30 72 36 74 44 L76 68 Z" fill="url(#cng-green)" />
                    <path d="M22 60 L78 60 C80 60 81 62 80 64 L78 68 C77 69 75 70 73 70 L27 70 C25 70 23 69 22 68 L20 64 C19 62 20 60 22 60 Z" fill="url(#cng-yellow)" />
                    <path d="M28 46 L38 46 L38 34 L32 34 C29 34 28 38 28 41 Z" fill="#1e293b" opacity="0.75" />
                    <path d="M42 46 L58 46 L58 34 L42 34 Z" fill="#1e293b" opacity="0.75" />
                    <path d="M62 46 L72 46 C72 41 71 34 68 34 L62 34 Z" fill="#1e293b" opacity="0.75" />
                    <line x1="26" y1="68" x2="20" y2="76" stroke="#475569" strokeWidth="3" />
                    <circle cx="20" cy="74" r="6" fill="#1e293b" />
                    <circle cx="68" cy="74" r="7.5" fill="#1e293b" />
                    <circle cx="68" cy="74" r="2.5" fill="#94a3b8" />
                    <circle cx="24" cy="54" r="3" fill="#fef08a" />
                  </g>
                </svg>
              ),
            },
            {
              id: "bicycle",
              title: "Bicycle",
              subtitle: "Cycle & Spares",
              glowStyle: { backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)" },
              hoverBorder: "hover:border-violet-500/40 dark:hover:border-violet-500/30",
              glowText: "group-hover:text-violet-600 dark:group-hover:text-violet-455",
              svg: (
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                  <defs>
                    <linearGradient id="bike-violet" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <radialGradient id="bi-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="78" rx="36" ry="5" fill="#000" opacity="0.2" />
                  <ellipse cx="50" cy="78" rx="42" ry="9" fill="url(#bi-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <path d="M28 64 L48 64 L64 45 M28 60 L44 42 L66 42 L72 64 M44 42 L42 32 M66 42 L64 28 L56 28" stroke="url(#bike-violet)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="38" y1="32" x2="46" y2="32" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                  <g className="animate-wheel">
                    <circle cx="28" cy="64" r="12" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                    <circle cx="28" cy="64" r="10" fill="none" stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="2 3" />
                    <circle cx="28" cy="64" r="2.5" fill="#475569" />
                  </g>
                  <g className="animate-wheel">
                    <circle cx="72" cy="64" r="12" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                    <circle cx="72" cy="64" r="10" fill="none" stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="2 3" />
                    <circle cx="72" cy="64" r="2.5" fill="#475569" />
                  </g>
                  <circle cx="48" cy="64" r="4.5" fill="none" stroke="#334155" strokeWidth="1.5" />
                </svg>
              ),
            },
            {
              id: "parts",
              title: "Parts",
              subtitle: "Components & Spares",
              glowStyle: { backgroundImage: "radial-gradient(circle, rgba(244,63,94,0.15) 0%, rgba(244,63,94,0) 70%)" },
              hoverBorder: "hover:border-rose-500/40 dark:hover:border-rose-500/30",
              glowText: "group-hover:text-rose-600 dark:group-hover:text-rose-455",
              svg: (
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                  <defs>
                    <linearGradient id="parts-steel" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#9f1239" />
                    </linearGradient>
                    <radialGradient id="parts-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="80" rx="26" ry="5" fill="#000" opacity="0.25" />
                  <ellipse cx="50" cy="80" rx="34" ry="8" fill="url(#parts-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <path d="M28 28 C22 36 22 48 28 58 L20 62 C12 48 12 32 20 20 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
                  <circle cx="24" cy="34" r="2.5" fill="#fff" />
                  <circle cx="24" cy="46" r="2.5" fill="#fff" />
                  <g className="animate-wheel">
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#64748b" strokeWidth="7" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#cbd5e1" strokeWidth="6" />
                    <circle cx="50" cy="26" r="1.2" fill="#1e293b" />
                    <circle cx="68" cy="36" r="1.2" fill="#1e293b" />
                    <circle cx="74" cy="50" r="1.2" fill="#1e293b" />
                    <circle cx="68" cy="64" r="1.2" fill="#1e293b" />
                    <circle cx="50" cy="74" r="1.2" fill="#1e293b" />
                    <circle cx="32" cy="64" r="1.2" fill="#1e293b" />
                    <circle cx="26" cy="50" r="1.2" fill="#1e293b" />
                    <circle cx="32" cy="36" r="1.2" fill="#1e293b" />
                    <circle cx="50" cy="50" r="14" fill="none" stroke="url(#parts-steel)" strokeWidth="3" />
                    <circle cx="50" cy="50" r="8" fill="#1e293b" />
                    <circle cx="50" cy="50" r="3" fill="#cbd5e1" />
                  </g>
                </svg>
              ),
            },
            {
              id: "service",
              title: "Services",
              subtitle: "Workshop & Support",
              glowStyle: { backgroundImage: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(14,165,233,0) 70%)" },
              hoverBorder: "hover:border-sky-500/40 dark:hover:border-sky-500/30",
              glowText: "group-hover:text-sky-600 dark:group-hover:text-sky-455",
              svg: (
                <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                  <defs>
                    <linearGradient id="service-sky" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                    <radialGradient id="serv-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="80" rx="30" ry="5" fill="#000" opacity="0.2" />
                  <ellipse cx="50" cy="80" rx="36" ry="8" fill="url(#serv-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <g className="animate-wheel">
                    <circle cx="50" cy="46" r="18" fill="none" stroke="#64748b" strokeWidth="4" strokeDasharray="6 4" />
                    <circle cx="50" cy="46" r="12" fill="#e2e8f0" />
                    <circle cx="50" cy="46" r="7" fill="#f8fafc" />
                  </g>
                  <g className="animate-wrench">
                    <path d="M26 66 L56 36" stroke="url(#service-sky)" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="26" cy="66" r="8" fill="url(#service-sky)" />
                    <path d="M21 64 L26 69" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                    <rect x="23" y="63" width="6" height="6" fill="#1e293b" transform="rotate(45, 26, 66)" />
                    <circle cx="56" cy="36" r="8" fill="url(#service-sky)" />
                    <rect x="53" y="33" width="6" height="6" fill="#1e293b" transform="rotate(45, 56, 36)" />
                  </g>
                </svg>
              ),
            },
          ].map((cat) => {
            const count = listings.filter((l) => l.type === cat.id).length;
            const titleText =
              language === "bn"
                ? cat.id === "car"
                  ? "গাড়ি"
                  : cat.id === "bike"
                    ? "বাইক"
                    : cat.id === "commercial"
                      ? "কমার্শিয়াল গাড়ি"
                      : cat.id === "ev"
                        ? "ইভি (ইলেকট্রিক)"
                        : cat.id === "threewheeler"
                          ? "থ্রি হুইলার"
                          : cat.id === "bicycle"
                            ? "বাইসাইকেল"
                            : cat.id === "parts"
                              ? "পার্টস"
                              : "সার্ভিস"
                : cat.title;

            const subtitleText =
              language === "bn"
                ? cat.id === "car"
                  ? "সেডান ও এসইউভি"
                  : cat.id === "bike"
                    ? "মোটরসাইকেল ও স্কুটার"
                    : cat.id === "commercial"
                      ? "ট্রাক ও পিকআপ"
                      : cat.id === "ev"
                        ? "ব্যাটারি চালিত গাড়ি"
                        : cat.id === "threewheeler"
                          ? "সিএনজি ও অটো"
                          : cat.id === "bicycle"
                            ? "সাইকেল ও স্পেয়ার্স"
                            : cat.id === "parts"
                              ? "যন্ত্রাংশ ও এক্সেসরিজ"
                              : "ওয়ার্কশপ ও সাপোর্ট"
                : cat.subtitle;

            return (
              <motion.div
                key={cat.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 16 },
                  },
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setFilters({
                    ...filters,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    type: cat.id as any,
                    subCategory: "all",
                    partsTarget: "all",
                    brand: "all",
                  });
                  changeView("browse");
                  showToast(`${cat.title} Category Selected!`, "success");
                }}
                className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 p-4 flex flex-col justify-between h-[180px] z-10 ${
                  isDarkMode
                    ? `bg-slate-900/40 border-slate-800/80 hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.5)] ${cat.hoverBorder}`
                    : `bg-white/70 backdrop-blur-md border-slate-200/50 hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.08)] shadow-[0_4px_12px_rgba(0,0,0,0.01)] ${cat.hoverBorder}`
                }`}
              >
                {/* Spotlight glowing aura */}
                <div 
                  className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" 
                  style={cat.glowStyle}
                />

                {/* Glassmorphic border glow overlay */}
                <div className="absolute inset-0 border border-white/5 dark:border-white/2 rounded-2xl pointer-events-none -z-10" />

                {/* Inner layout container */}
                <div className="flex flex-col justify-between h-full w-full relative">
                  {/* Top Row: Title & Floating Pill Count Badge */}
                  <div className="flex items-start justify-between w-full">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-slate-850 dark:group-hover:text-slate-250 uppercase transition-colors duration-300">
                      {/* {cat.id} */}
                    </span>
                    <span className={`text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-full border transition-all duration-300 shadow-3xs flex items-center gap-1 ${
                      isDarkMode
                        ? "bg-slate-850/80 text-slate-300 border-slate-800/80 group-hover:bg-orange-500 group-hover:text-slate-950 group-hover:border-transparent"
                        : "bg-slate-50 text-slate-600 border-slate-100 group-hover:bg-primary group-hover:text-white group-hover:border-transparent"
                    }`}>
                      <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                      {count} {language === "bn" ? "টি" : "ads"}
                    </span>
                  </div>

                  {/* Middle Row: Hover-Animated Mini Graphic Illustration */}
                  <div className="flex items-center justify-center h-16 w-full relative shrink-0">
                    {cat.svg}
                  </div>

                  {/* Bottom Row: Typography Info */}
                  <div className="text-center w-full">
                    <h4 className={`text-[12px] sm:text-xs font-black tracking-widest uppercase transition-colors duration-300 ${cat.glowText} matches-outfit`}>
                      {titleText}
                    </h4>
                    <span className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5 line-clamp-1 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors duration-300">
                      {subtitleText}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {/* categories section end here  */}

<HowItWorks isDarkMode={isDarkMode} />
  
  {/* popular brands start here  */}
      <div className="space-y-6 py-4">
        <h2 className="text-base sm:text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
          {/* <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-primary animate-pulse" /> */}
          {language === "bn" ? "প্রচলিত ব্র্যান্ড" : "Popular Brands"}
        </h2>
        <div className={`relative overflow-hidden w-full rounded-2xl border ${
          isDarkMode 
            ? "bg-slate-900/30 border-slate-800 backdrop-blur-xl" 
            : "bg-white/80 border-slate-200 backdrop-blur-lg"
        } py-6 px-4`}
        >
          {/* Edge fading gradients for premium transition */}
          <div className={`absolute inset-y-0 left-0 w-16 pointer-events-none z-10 bg-gradient-to-r ${
            isDarkMode ? "from-slate-950/80 to-transparent" : "from-[#faf8f5]/80 to-transparent"
          }`} />
          <div className={`absolute inset-y-0 right-0 w-16 pointer-events-none z-10 bg-gradient-to-l ${
            isDarkMode ? "from-slate-950/80 to-transparent" : "from-[#faf8f5]/80 to-transparent"
          }`} />

          <div className="flex gap-6 px-8 animate-marquee">
            {[...TOP_BRANDS_SCROLL, ...TOP_BRANDS_SCROLL].map((brand, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFilters({ ...filters, brand: brand.name, searchQuery: "", type: "all" });
                  changeView("browse");
                }}
                className={`group relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border transition-all duration-500 cursor-pointer p-4 shrink-0 hover:-translate-y-1.5 ${
                  isDarkMode
                    ? "bg-slate-900/40 border-slate-800/80 hover:border-orange-500/30 hover:shadow-[0_12px_24px_rgba(249,115,22,0.08)]"
                    : "bg-[#FAF8F5] backdrop-blur-md border-slate-200/50 hover:border-primary/30 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]"
                }`}
              >
                {/* Brand-specific gradient overlay that fades in on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${brand.gradient} transition-opacity duration-500 rounded-2xl`} />

                {/* Glassmorphic border glow overlay */}
                <div className="absolute inset-0 border border-white/5 dark:border-white/2 rounded-2xl pointer-events-none" />

                {/* Inner Logo wrapper with scaling effect */}
                <div className="relative z-10 flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 transition-transform duration-500 group-hover:scale-110 ">
                  {React.cloneElement(brand.logo as React.ReactElement<any>, {
                    sizeClassName: "w-20 h-20 sm:w-24 sm:h-24"
                  })}
                </div>

                {/* Dynamic mini corner accents that light up on hover */}
                <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-transparent group-hover:border-primary/30 dark:group-hover:border-orange-500/30 transition-all duration-300" />
                <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-transparent group-hover:border-primary/30 dark:group-hover:border-orange-500/30 transition-all duration-300" />
              </button>
            ))}
          </div>
          <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
        </div>
      </div>
  {/* popular brands ends here  */}


  
   
      <div className="space-y-4">
        <div className="flex justify-between items-center sm:items-end">
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
              <Eye className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-primary" />{" "}
              {language === "bn"
                ? "সবচেয়ে জনপ্রিয় বিজ্ঞাপন সমূহ"
                : "Most Viewed Ads"}
            </h2>
            <p
              className={`text-[10px] sm:text-[11px] md:text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              {language === "bn"
                ? "সারাদেশের ক্রেতাদের সর্বাধিক বার দেখা ৮টি আকর্ষণীয় বিজ্ঞাপন"
                : "Explore the hottest vehicle deals based on active customer views across Bangladesh (8 featured deals)"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 dark:bg-slate-900/40 p-0.5 rounded-lg border border-slate-300/30 dark:border-slate-800">
              <button
                onClick={() => setHomeViewMode("grid")}
                className={`p-1 sm:p-1.5 rounded-md transition-all cursor-pointer ${
                  homeViewMode === "grid"
                    ? "bg-primary text-white shadow-xs"
                    : "text-slate-500 dark:text-slate-404 hover:text-primary"
                }`}
                title="Grid space"
              >
                <LayoutGrid className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button
                onClick={() => setHomeViewMode("list")}
                className={`p-1 sm:p-1.5 rounded-md transition-all cursor-pointer ${
                  homeViewMode === "list"
                    ? "bg-primary text-white shadow-xs"
                    : "text-slate-500 dark:text-slate-404 hover:text-primary"
                }`}
                title="Detailed list"
              >
                <List className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>

            <button
              onClick={() => changeView("browse")}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-black text-primary hover:text-primary-hover transition-colors cursor-pointer"
            >
              View All &rarr;
            </button>
          </div>
        </div>

        <div
          className={
            homeViewMode === "list"
              ? "grid grid-cols-1 gap-2.5 w-full"
              : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5"
          }
        >
          {mostViewedListingsForHome.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isDarkMode={isDarkMode}
              viewMode={homeViewMode}
              onSelect={(id) => changeView("listing", id)}
              onSelectProfile={(pId) => changeView("profile", pId)}
            />
          ))}
        </div>

        <div className="text-center pt-1.5 sm:hidden">
          <button
            onClick={() => changeView("browse")}
            className="w-full bg-slate-900 border border-slate-800 text-primary font-black py-3 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Browse Complete Catalog ({listings.length} Active Ads)
          </button>
        </div>
      </div>

      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
          isDarkMode
            ? "bg-gradient-to-b from-slate-900/40 via-slate-900/10 to-slate-950/25 border-slate-900/80 shadow-xl"
            : "bg-white border-slate-200/60 shadow-lg shadow-slate-100/50"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3
              className={`text-base sm:text-lg font-black tracking-tight flex items-center gap-2 mb-1 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <MapPin className="w-4 h-4 text-primary" />
              </span>
              {t("browseTitle")}
            </h3>
            <p
              className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"} font-semibold`}
            >
              {t("browseSub")}
            </p>
          </div>
          <div
            className={`self-start sm:self-auto px-3 py-1.5 rounded-full border text-[10px] font-black tracking-wider flex items-center gap-1.5 shrink-0 ${
              isDarkMode
                ? "bg-slate-950/40 border-slate-800 text-slate-300"
                : "bg-slate-100/60 border-slate-200 text-slate-650"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            {BANGLADESH_DIVISIONS.length} {t("regionalNode")}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {BANGLADESH_DIVISIONS.map((div) => {
            const count = listings.filter((l) => l.division === div).length;
            const meta = DIVISION_META[div] || {
              tagline: "Territory Node",
              badge: "📍 LOCAL",
              gradient: "from-slate-500/10 to-slate-600/5",
              icon: <Compass className="w-5 h-5 text-slate-404" />,
            };
            return (
              <div
                key={div}
                onClick={() => {
                  setFilters({ ...filters, division: div });
                  changeView("browse");
                }}
                className={`relative p-4 rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 md:hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group h-36 ${
                  isDarkMode
                    ? "bg-slate-955/40 border-slate-900/60 hover:border-orange-500/30 hover:bg-slate-900/25"
                    : "bg-white border-slate-200/50 hover:border-primary/25 hover:bg-slate-50/20"
                }`}
              >
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${meta.gradient} rounded-bl-full opacity-20 group-hover:opacity-45 blur-md transition-opacity`}
                />

                <div className="flex items-start justify-between gap-2 relative z-10">
                  <div
                    className={`p-2 rounded-xl border flex items-center justify-center transition-colors ${
                      isDarkMode
                        ? "bg-slate-900/60 border-slate-800"
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    {meta.icon}
                  </div>
                  <span
                    className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded ${
                      isDarkMode
                        ? "bg-slate-900/55 text-slate-455 border border-slate-800"
                        : "bg-slate-100 text-slate-500 border border-slate-200/60"
                    }`}
                  >
                    {meta.badge}
                  </span>
                </div>

                <div className="relative z-10 mt-3">
                  <h4
                    className={`text-xs font-black tracking-tight transition-colors truncate ${
                      isDarkMode
                        ? "text-slate-100 group-hover:text-orange-400"
                        : "text-slate-900 group-hover:text-primary"
                    }`}
                  >
                    {language === "bn"
                      ? div === "Dhaka"
                        ? "ঢাকা"
                        : div === "Chittagong"
                          ? "চট্টগ্রাম"
                          : div === "Sylhet"
                            ? "সিলেট"
                            : div === "Rajshahi"
                              ? "রাজশাহী"
                              : div === "Khulna"
                                ? "খুলনা"
                                : div === "Barisal"
                                  ? "বরিশাল"
                                  : div === "Rangpur"
                                    ? "রংপুর"
                                    : "ময়মনসিংহ"
                      : div}
                  </h4>
                  <p
                    className={`text-[9px] ${isDarkMode ? "text-slate-500 font-medium" : "text-slate-404 font-semibold"} truncate mt-0.5`}
                  >
                    {t(`${div}Tagline`) || meta.tagline}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-slate-200/10 dark:border-slate-800/40">
                    <span className="text-[10px] font-black text-orange-500 dark:text-orange-405">
                      {count}{" "}
                      {language === "bn"
                        ? "টি বিজ্ঞাপন"
                        : count === 1
                          ? "Ad"
                          : "Ads"}
                    </span>
                    <span className="text-[10px] text-slate-404 font-extrabold group-hover:translate-x-0.5 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
