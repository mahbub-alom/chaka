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
      <div className="space-y-6 mt-12">
        {/* Modern premium header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-100 dark:border-slate-800/40 pb-5 mb-5 gap-3">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-primary dark:text-orange-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Explore Marketplace
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 matches-outfit">
              {/* <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2 matches-outfit"> */}
              <Grid className="w-5 h-5 text-primary dark:text-orange-400" />
              {t("Categories")}
            </h2>
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
                staggerChildren: 0.03,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 pt-2"
        >
          {[
            {
              id: "car",
              title: "Car",
              subtitle: "Sedan & SUV",
              svg: (
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 transition-colors duration-300 text-slate-555 dark:text-slate-400 group-hover:text-primary group-hover:dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="10"
                    y1="75"
                    x2="90"
                    y2="75"
                    strokeWidth="1.5"
                    className="text-slate-300 dark:text-slate-800"
                  />
                  <path
                    d="M15 65 h10 c2-12 18-12 20 0 h15 c2-12 18-12 20 0 h10 c4 0 5-2 5-6 v-4 c0-4-3-8-8-9 l-12-6 c-3-1.5-8-3-12-3 H38 c-4 0-9 1.5-12 3 L14 50 c-5 1-7 5-7 9 v6 z"
                    fill="currentColor"
                    fillOpacity="0.05"
                  />
                  <path d="M38 41 h15 l8 11 M38 41 v11 M53 41 v11" />
                  <path d="M28 44 l7-3 v11" />
                  <circle cx="25" cy="65" r="7" fill="none" strokeWidth="3" />
                  <circle cx="25" cy="65" r="2.5" fill="currentColor" />
                  <circle cx="65" cy="65" r="7" fill="none" strokeWidth="3" />
                  <circle cx="65" cy="65" r="2.5" fill="currentColor" />
                  <path
                    d="M88 56 h2"
                    strokeWidth="3.5"
                    className="text-amber-500"
                  />
                  <path
                    d="M10 55 h3"
                    strokeWidth="3.5"
                    className="text-[#dc2626]"
                  />
                </svg>
              ),
            },
            {
              id: "bike",
              title: "Bike",
              subtitle: "Motorcycle & Scooter",
              svg: (
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 transition-colors duration-300 text-slate-555 dark:text-slate-400 group-hover:text-primary group-hover:dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="10"
                    y1="75"
                    x2="90"
                    y2="75"
                    strokeWidth="1.5"
                    className="text-slate-300 dark:text-slate-800"
                  />
                  <circle
                    cx="25"
                    cy="62"
                    r="11"
                    fill="currentColor"
                    fillOpacity="0.05"
                  />
                  <circle
                    cx="75"
                    cy="62"
                    r="11"
                    fill="currentColor"
                    fillOpacity="0.05"
                  />
                  <circle cx="25" cy="62" r="4" fill="none" strokeWidth="3" />
                  <circle cx="75" cy="62" r="4" fill="none" strokeWidth="3" />
                  <path
                    d="M25 51v22M14 62h22M75 51v22M64 62h22"
                    strokeWidth="1"
                    className="opacity-30"
                  />
                  <path d="M25 62 L42 42 L65 42 L75 62" strokeWidth="3" />
                  <path d="M75 62 L70 30 L60 30" strokeWidth="3" />
                  <path d="M25 62 L48 62 L60 42" strokeWidth="2.5" />
                  <path d="M36 38 h12 L50 42 H34 z" fill="currentColor" />
                  <path
                    d="M50 34 c4-6 12-6 15 0 v8 H50 z"
                    fill="currentColor"
                  />
                  <path d="M68 27 h-8" strokeWidth="3" />
                </svg>
              ),
            },
            {
              id: "commercial",
              title: "Commercial",
              subtitle: "Truck & Pickup",
              svg: (
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 transition-colors duration-300 text-slate-555 dark:text-slate-400 group-hover:text-primary group-hover:dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="10"
                    y1="75"
                    x2="90"
                    y2="75"
                    strokeWidth="1.5"
                    className="text-slate-300 dark:text-slate-800"
                  />
                  <rect
                    x="15"
                    y="28"
                    width="50"
                    height="34"
                    rx="2"
                    fill="currentColor"
                    fillOpacity="0.05"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M28 28 v34 M45 28 v34"
                    strokeWidth="1.5"
                    className="opacity-30"
                  />
                  <path
                    d="M65 37 h12 c3 0 5 1.5 6 4 l5 9 c0.5 1.5 1 3 1 5 v7 c0 1.5-1 2.5-2.5 2.5 H65 z"
                    fill="currentColor"
                    fillOpacity="0.05"
                    strokeWidth="2.5"
                  />
                  <path d="M69 41 h8 l5 9 H69 z" />
                  <circle cx="28" cy="67" r="6" fill="none" strokeWidth="3" />
                  <circle cx="56" cy="67" r="6" fill="none" strokeWidth="3" />
                  <circle cx="78" cy="67" r="6" fill="none" strokeWidth="3" />
                  <path
                    d="M89 61 h2"
                    strokeWidth="3.5"
                    className="text-amber-500"
                  />
                </svg>
              ),
            },
            {
              id: "ev",
              title: "EV",
              subtitle: "Electric Vehicle",
              svg: (
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 transition-colors duration-300 text-slate-555 dark:text-slate-400 group-hover:text-primary group-hover:dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="10"
                    y1="75"
                    x2="90"
                    y2="75"
                    strokeWidth="1.5"
                    className="text-slate-300 dark:text-slate-800"
                  />
                  <path
                    d="M12 63 h12 c1-8 11-8 12 0 h28 c1-8 11-8 12 0 h12 c3 0 4-2 4-5 v-2 c0-5-3-7-7-8 L62 44 c-2-1-5-2-8-2 H34 c-3 0-6 1-8 2 L14 49 c-4 1-5 4-5 7 v2 c0 3 1 5 3 5 z"
                    fill="currentColor"
                    fillOpacity="0.05"
                  />
                  <circle cx="22" cy="63" r="5" fill="none" strokeWidth="2.5" />
                  <circle cx="22" cy="63" r="1.5" fill="currentColor" />
                  <circle cx="62" cy="63" r="5" fill="none" strokeWidth="2.5" />
                  <circle cx="62" cy="63" r="1.5" fill="currentColor" />
                  <path
                    d="M47 22 L41 34 h10 L45 46"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500 fill-amber-500"
                  />
                  <circle
                    cx="47"
                    cy="34"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    className="opacity-30"
                  />
                </svg>
              ),
            },
            {
              id: "threewheeler",
              title: "Three Wheeler",
              subtitle: "CNG & Auto",
              svg: (
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 transition-colors duration-300 text-slate-555 dark:text-slate-400 group-hover:text-primary group-hover:dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="10"
                    y1="75"
                    x2="90"
                    y2="75"
                    strokeWidth="1.5"
                    className="text-slate-300 dark:text-slate-800"
                  />
                  <path
                    d="M22 64 h48 c2 0 3-1.5 3-3.5 l-6-24 c-1.5-6-5-10.5-12-10.5 H34 c-5 0-9 4-11 9 L15 51 c-1.5 3-1 6.5 1 9.5 z"
                    fill="currentColor"
                    fillOpacity="0.05"
                  />
                  <path d="M25 45 l4-15 h14 v15 z" />
                  <path d="M48 30 h18 l4 15 M48 30 v28 M70 45 v13 H48" />
                  <circle cx="60" cy="65" r="7" fill="none" strokeWidth="3" />
                  <circle cx="22" cy="65" r="7" fill="none" strokeWidth="3" />
                  <path d="M22 47 l3-3" strokeWidth="3" />
                </svg>
              ),
            },
            {
              id: "bicycle",
              title: "Bicycle",
              subtitle: "Cycle & Spares",
              svg: (
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 transition-colors duration-300 text-slate-555 dark:text-slate-400 group-hover:text-primary group-hover:dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="10"
                    y1="75"
                    x2="90"
                    y2="75"
                    strokeWidth="1.5"
                    className="text-slate-300 dark:text-slate-800"
                  />
                  <circle
                    cx="28"
                    cy="60"
                    r="11"
                    fill="none"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="72"
                    cy="60"
                    r="11"
                    fill="none"
                    strokeWidth="2.5"
                  />
                  <circle cx="28" cy="60" r="2.5" fill="currentColor" />
                  <circle cx="72" cy="60" r="2.5" fill="currentColor" />
                  <path
                    d="M28 49 v22 M17 60 h22 M72 49 v22 M61 60 h22"
                    strokeWidth="0.8"
                    className="opacity-30"
                  />
                  <path
                    d="M28 60 L48 60 L65 42 M28 60 L44 42 L68 42 L72 60"
                    strokeWidth="2"
                  />
                  <path
                    d="M44 42 L42 32 M68 42 L66 28 L58 28"
                    strokeWidth="2"
                  />
                  <path d="M38 32 h8" strokeWidth="3" />
                </svg>
              ),
            },
            {
              id: "parts",
              title: "Parts",
              subtitle: "Components & Spares",
              svg: (
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 transition-colors duration-300 text-slate-555 dark:text-slate-400 group-hover:text-primary group-hover:dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="currentColor"
                    fillOpacity="0.05"
                    strokeWidth="2.5"
                  />
                  <circle cx="50" cy="50" r="9" fill="none" strokeWidth="2.5" />
                  <path
                    d="M50 24v6M50 70v6M24 50h6M70 50h6M32 32l4.5 4.5M63.5 63.5l4.5 4.5M32 68l4.5-4.5M63.5 36.5l4.5-4.5"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 18 l22 22 M25 15 l10 10"
                    strokeWidth="3"
                    className="opacity-30"
                  />
                  <circle cx="18" cy="18" r="3" fill="currentColor" />
                  <path
                    d="M78 22 h4M80 20v4"
                    strokeWidth="1.5"
                    className="text-amber-500"
                  />
                  <path
                    d="M18 78 h4M20 76v4"
                    strokeWidth="1.5"
                    className="text-amber-555"
                  />
                </svg>
              ),
            },
            {
              id: "service",
              title: "Services",
              subtitle: "Workshop & Support",
              svg: (
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 transition-colors duration-300 text-slate-555 dark:text-slate-400 group-hover:text-primary group-hover:dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M25 25 h50 v45 c0 8-15 14-25 14 C35 84 20 78 20 70 V25 z"
                    fill="currentColor"
                    fillOpacity="0.05"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M38 48 l7 7 18-18"
                    strokeWidth="3.5"
                    className="text-orange-555"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="50" cy="18" r="4" fill="none" strokeWidth="2" />
                  <path d="M46 18 h8" strokeWidth="1.5" />
                  <path
                    d="M22 35 h-3 M78 35 h3 M22 55 h-3 M78 55 h3"
                    strokeWidth="2"
                  />
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
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
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
                className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 p-3.5 flex flex-col justify-between h-[165px] z-10 ${
                  isDarkMode
                    ? "bg-slate-900/20 border-slate-850/60 hover:border-orange-500/30 hover:shadow-[0_8px_24px_-4px_rgba(249,115,22,0.06)]"
                    : "bg-slate-50/20 border-slate-150/70 hover:border-primary/25 hover:shadow-[0_8px_24px_-4px_rgba(249,115,22,0.03)] shadow-[0_4px_12px_rgba(0,0,0,0.015)]"
                }`}
              >
                {/* Colored Top Accent Stripe */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary/20 dark:bg-orange-500/20 group-hover:bg-primary group-hover:dark:bg-orange-400 transition-colors duration-300 pointer-events-none" />

                {/* Decorative Concentric Radar Rings (Always visible, expands/glows on hover) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 -mt-4.5">
                  <div className="w-15 h-15 rounded-full border border-primary/6 dark:border-orange-500/6 group-hover:border-primary/15 group-hover:dark:border-orange-500/15 group-hover:scale-115 transition-all duration-500 ease-out" />
                  <div className="w-23 h-23 rounded-full border border-primary/3 dark:border-orange-500/3 group-hover:border-primary/10 group-hover:dark:border-orange-500/10 group-hover:scale-125 absolute transition-all duration-500 ease-out" />
                </div>

                {/* Dotted Mesh Grid Background (visible & textured by default, glowing on hover) */}
                {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.25] group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-20" /> */}

                {/* Subtle soft primary spotlight radial glow (visible on hover) */}
                {/* <div className="absolute inset-0 bg-radial from-primary/3 to-transparent dark:from-orange-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-20" /> */}

                {/* Inner container */}
                <div className="flex flex-col justify-between h-full w-full relative">
                  {/* Top Row: Floating count badge (tinted by default, solid brand color on hover) */}
                  <div className="flex justify-end w-full relative">
                    <span className="text-[9px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-md border transition-all duration-300 shadow-3xs bg-primary/5 text-primary border-primary/10 dark:bg-orange-500/5 dark:text-orange-400 dark:border-orange-500/10 group-hover:bg-primary group-hover:text-white group-hover:dark:bg-orange-500 group-hover:border-transparent">
                      {count} {language === "bn" ? "টি" : "ads"}
                    </span>
                  </div>

                  {/* Middle Row: Floating Centered Icon container */}
                  <div className="w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 dark:bg-[#021A40] border border-slate-200/60 dark:border-slate-800/80 group-hover:bg-primary/5 group-hover:dark:bg-orange-500/5 group-hover:scale-110 group-hover:border-primary/20 dark:group-hover:border-orange-500/20 shadow-[0_2px_8px_rgba(0,0,0,0.02)] mx-auto -mt-1 relative shrink-0">
                    {cat.svg}
                  </div>

                  {/* Bottom Row: Centered Typography */}
                  <div className="text-center w-full pb-0.5">
                    <h4 className="text-[12px] sm:text-xs font-bold tracking-tight  group-hover:text-primary dark:group-hover:text-orange-400 transition-colors uppercase">
                      {titleText}
                    </h4>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-0.5 line-clamp-1">
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
      {/* popular brands section start */}
      <div className="space-y-6 py-4">
        <h2 className="text-base sm:text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
          {language === "bn" ? "প্রচলিত ব্র্যান্ড" : "Popular Brands"}
        </h2>
        <div className={`relative overflow-hidden w-full rounded-2xl border ${isDarkMode ? "bg-slate-900/30 border-slate-800 backdrop-blur-xl" : "bg-white/80 border-slate-200 backdrop-blur-lg"} p-4`}
        >
          <div className="flex gap-8 px-8 animate-marquee">
            {[...TOP_BRANDS_SCROLL, ...TOP_BRANDS_SCROLL].map((brand, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFilters({ ...filters, brand: brand.name, searchQuery: "", type: "all" });
                  changeView("browse");
                }}
                className={`group flex items-center justify-center w-20 h-20 rounded-full border ${isDarkMode ? brand.darkBorder : brand.lightBorder} hover:${isDarkMode ? brand.darkHover : brand.lightHover} bg-gradient-to-br ${brand.gradient} ${brand.iconColor} transition-all duration-300 cursor-pointer`}
              >
                {brand.logo}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-primary/10 transition-opacity" />
              </button>
            ))}
          </div>
          <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
        </div>
      </div>


  
      {/* popular brands section ends  */}
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
