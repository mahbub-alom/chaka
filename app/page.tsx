"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  VehicleListing, 
  ChatConversation, 
  AdvertisementSlot, 
  SearchFilters 
} from '@/types';
import { 
  ALL_INITIAL_LISTINGS, 
  INITIAL_AD_SLOTS, 
  BANGLADESH_DIVISIONS, 
  formatBDT 
} from '@/lib/data';

import Header from '@/sections/Header';
import BottomNav from '@/sections/BottomNav';
import Filters from '@/sections/Filters';
import AuctionVerify from '@/sections/AuctionVerify';
import ListingCard from '@/components/ListingCard';
import AdPlacement from '@/components/AdPlacement';
import ChatWindow from '@/components/ChatWindow';
import Footer from '@/sections/Footer';
import UserProfile from '@/sections/UserProfile';
import FeedbackModal from '@/components/FeedbackModal';
import HowItWorks from '@/sections/HowItWorks';
import MobileDrawer from '@/sections/MobileDrawer';
import InfoPages from '@/sections/InfoPages';
import BrandLogo from '@/components/BrandLogo';

// Import dashboards
import DashboardUser from '@/sections/DashboardUser';
import DashboardShowroom from '@/sections/DashboardShowroom';
import DashboardAdmin from '@/sections/DashboardAdmin';

// Lucide Icons
import { 
  Car, 
  Bike, 
  Compass, 
  ShieldCheck, 
  Star, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  Heart, 
  Share2, 
  AlertTriangle, 
  Eye, 
  EyeOff,
  Calendar, 
  Gauge, 
  MessageSquare,
  Sparkles,
  List,
  LayoutGrid,
  Grid,
  Wrench,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  Truck,
  X,
  Copy,
  Bell,
  Trash2
} from 'lucide-react';

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

const DIVISION_META: Record<string, {
  tagline: string;
  badge: string;
  gradient: string;
  accentColor: string;
  icon: React.ReactNode;
}> = {
  Dhaka: {
    tagline: "Metro Mega Capital",
    badge: "🏢 METRO",
    gradient: "from-orange-500/10 to-teal-500/5",
    accentColor: "text-orange-500 border-orange-500/20",
    icon: (
      <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="10" width="10" height="12" rx="2" />
        <path d="M12 2h8a2 2 0 0 1 2 2v18h-10z" />
        <path d="M6 14h2" />
        <path d="M6 18h2" />
        <path d="M16 6h2" />
        <path d="M16 10h2" />
        <path d="M16 14h2" />
        <path d="M16 18h2" />
      </svg>
    )
  },
  Chittagong: {
    tagline: "Marine Port City",
    badge: "⚓ PORT",
    gradient: "from-sky-500/10 to-blue-500/5",
    accentColor: "text-sky-500 border-sky-500/20",
    icon: (
      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8" />
        <path d="M5 12H2 a10 10 0 0 0 20 0h-3" />
        <circle cx="12" cy="5" r="3" />
      </svg>
    )
  },
  Sylhet: {
    tagline: "Green Tea Canopy",
    badge: "🍃 SCENIC",
    gradient: "from-lime-500/10 to-green-500/5",
    accentColor: "text-green-500 border-green-500/20",
    icon: (
      <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c0-5.5-4.5-10-10-10" />
        <path d="M12 22c0-5.5 4.5-10 10-10" />
        <path d="M12 2v20" />
      </svg>
    )
  },
  Rajshahi: {
    tagline: "Silk & Mango Plains",
    badge: "🥭 FRUIT",
    gradient: "from-amber-500/10 to-orange-500/5",
    accentColor: "text-orange-500 border-orange-500/20",
    icon: (
      <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
      </svg>
    )
  },
  Khulna: {
    tagline: "Sundarbans Delta",
    badge: "🐅 WILD",
    gradient: "from-teal-600/10 to-orange-500/5",
    accentColor: "text-teal-500 border-teal-500/20",
    icon: (
      <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  Barisal: {
    tagline: "Queen of Rivers",
    badge: "🌊 DELTA",
    gradient: "from-cyan-500/10 to-sky-500/5",
    accentColor: "text-cyan-500 border-cyan-500/20",
    icon: (
      <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.5 1s2.5-.5 3.1-1c.6-.5 1.2-1 2.5-1s2.5.5 3.1 1" />
        <path d="M2 12c.6.5 1.2 1 2.5 1s2.5-.5 3.1-1c.6-.5 1.2-1 2.5-1s2.5.5 3.1 1" />
        <path d="M2 18c.6.5 1.2 1 2.5 1s2.5-.5 3.1-1c.6-.5 1.2-1 2.5-1s2.5.5 3.1 1" />
      </svg>
    )
  },
  Rangpur: {
    tagline: "Agro-Heritage Soil",
    badge: "🌾 AGRO",
    gradient: "from-rose-500/10 to-orange-500/5",
    accentColor: "text-rose-500 border-rose-500/20",
    icon: (
      <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 22 1-1" />
        <path d="M12 12c.6.5 1.2 1 2.5 1s2.5-.5 3.1-1" />
        <path d="M12 12a10 10 0 1 1-10-10" />
      </svg>
    )
  },
  Mymensingh: {
    tagline: "Nature's Ridge Valley",
    badge: "⛰️ VALLEY",
    gradient: "from-fuchsia-500/10 to-pink-500/5",
    accentColor: "text-fuchsia-500 border-fuchsia-500/20",
    icon: (
      <svg className="w-5 h-5 text-fuchsia-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
        <path d="m16 12-4-4-4 4" />
        <path d="M12 16V8" />
      </svg>
    )
  }
};

interface PriceAlert {
  id: string;
  listingId: string;
  brand: string;
  model: string;
  targetPrice: number;
  originalPrice: number;
  triggered: boolean;
  createdAt: string;
}

export default function Home() {
  const { language, setLanguage, t } = useLanguage();

  const [isLoaded, setIsLoaded] = useState(false);

  // Sorting Option
  const [sortBy, setSortBy] = useState<string>('newest');

  // Price Alerts Store in Local Storage
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);

  // Target alert price input
  const [customTargetPrice, setCustomTargetPrice] = useState<string>('');

  // Theme State (Defaulting to Light Mode for clean corporate aesthetics)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Role selection: guest, user (Sujan Ahmed), showroom (Haq Bay Motors), admin (Super Admin)
  const [currentRole, setCurrentRole] = useState<'guest' | 'user' | 'showroom' | 'admin'>('guest');

  // User Profile details
  const [userProfile, setUserProfile] = useState({
    name: 'Sujan Ahmed',
    email: 'thehrsujan@gmail.com',
    phone: '01712345678',
    location: 'Gulshan',
    division: 'Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
    coverUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1000',
    isSubscribed: false,
    memberSince: '2024',
    password: 'password123'
  });

  // Showroom Profile details 
  const [showroomProfile, setShowroomProfile] = useState({
    name: 'Haq Bay Motors',
    email: 'contact@haqbay.bd',
    phone: '01711223344',
    location: 'Tejgaon Industrial Area',
    division: 'Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1562575308-9e672757d475?auto=format&fit=crop&q=80&w=150&h=150',
    bannerUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    memberSince: '2024',
    password: 'password123'
  });

  // Page Routing State
  const [activeView, setActiveView] = useState<string>('home'); // home, browse, listing, dashboard, profile
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [homeViewMode, setHomeViewMode] = useState<'grid' | 'list'>('grid');
  const [userDashboardTab, setUserDashboardTab] = useState<'my-ads' | 'post-ad' | 'inbox' | 'pricing-tool' | 'profile'>('my-ads');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [activeDetailImage, setActiveDetailImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [is360Rotating, setIs360Rotating] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showMobileStickyActions, setShowMobileStickyActions] = useState<boolean>(true);

  // Report Abuse states
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>('Fake or mismatched specifications');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [reportedListingId, setReportedListingId] = useState<string | null>(null);

  // Followed sellers persistence
  const [followedSellers, setFollowedSellers] = useState<string[]>([]);

  // Core Data Lists with Local Storage Syncing
  const [listings, setListings] = useState<VehicleListing[]>([]);

  const [adSlots, setAdSlots] = useState<AdvertisementSlot[]>([]);

  // Simulated Chat Inbox (Preloaded threads so the chat isn't blank)
  const [chats, setChats] = useState<ChatConversation[]>([]);

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [revealDetailPhone, setRevealDetailPhone] = useState<boolean>(false);

  // Elite, lightweight Custom Toast state for non-blocking elegant popup notification feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => {
        if (prev?.message === message) return null;
        return prev;
      });
    }, 3900);
  };

  // Watchlisted vehicle ID list
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Live filter state
  const [filters, setFilters] = useState<SearchFilters>({
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

  // Client side mounting loader to sync all localStorage parameters safely
  useEffect(() => {
    const savedTheme = localStorage.getItem('chaka-theme');
    const prefersDark = savedTheme ? savedTheme === 'dark' : false;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const savedAlerts = localStorage.getItem('chaka-price-alerts');
    if (savedAlerts) {
      try { setPriceAlerts(JSON.parse(savedAlerts)); } catch (e) {}
    }

    const savedUser = localStorage.getItem('chaka-user-profile');
    if (savedUser) {
      try { setUserProfile(JSON.parse(savedUser)); } catch (e) {}
    }
    const savedShowroom = localStorage.getItem('chaka-showroom-profile');
    if (savedShowroom) {
      try { setShowroomProfile(JSON.parse(savedShowroom)); } catch (e) {}
    }

    const savedFollowed = localStorage.getItem('chaka-followed-sellers');
    if (savedFollowed) {
      try { setFollowedSellers(JSON.parse(savedFollowed)); } catch (e) {}
    }

    const savedWatchlist = localStorage.getItem('chaka-watchlist');
    if (savedWatchlist) {
      try { setWatchlist(JSON.parse(savedWatchlist)); } catch (e) {}
    } else {
      setWatchlist(['car_2', 'bike_4']);
    }

    const savedListings = localStorage.getItem('chaka-listings');
    let finalListings = ALL_INITIAL_LISTINGS;
    if (savedListings) {
      try {
        const parsed = JSON.parse(savedListings);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const categories = ['car', 'bike', 'commercial', 'ev', 'threewheeler', 'bicycle', 'parts', 'service'];
          const allCategoriesHaveThirtyFive = categories.every(
            (cat) => parsed.filter((l: any) => l.type === cat).length >= 35
          );
          if (allCategoriesHaveThirtyFive) {
            finalListings = parsed;
          }
        }
      } catch (e) {}
    }
    setListings(finalListings);

    const savedAds = localStorage.getItem('chaka-ads');
    if (savedAds) {
      try { setAdSlots(JSON.parse(savedAds)); } catch (e) {}
    } else {
      setAdSlots(INITIAL_AD_SLOTS);
    }

    const savedChats = localStorage.getItem('chaka-chats');
    if (savedChats) {
      try { setChats(JSON.parse(savedChats)); } catch (e) {}
    } else {
      setChats([
        {
          id: 'chat_sample_1',
          listingId: 'car_1',
          listingTitle: 'Toyota Corolla Axio Hybrid G 2018',
          listingImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=200',
          listingPrice: 'BDT 2,150,000',
          sellerId: 'sr_1',
          sellerName: 'Haq Bay Motors',
          buyerId: 'user_curr',
          buyerName: 'Sujan Ahmed',
          messages: [
            {
              id: 'm1',
              senderId: 'buyer',
              senderName: 'Sujan Ahmed',
              text: 'Hello, is this car available in the showroom now?',
              timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
              isRead: true
            },
            {
              id: 'm2',
              senderId: 'seller',
              senderName: 'Haq Bay Motors',
              text: 'Hello! Yes, the car is currently displayed in our Gulshan showroom. All papers are fully up-to-date, and it comes with a 4.5 grade auction sheet.',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              isRead: true
            }
          ],
          lastUpdated: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'chat_sample_2',
          listingId: 'bike_1',
          listingTitle: 'Yamaha R15 V4 Racing Blue 2023',
          listingImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=200',
          listingPrice: '5,20,000 BDT',
          sellerId: 'user_201',
          sellerName: 'Siam Chowdhury',
          buyerId: 'user_curr',
          buyerName: 'Sujan Ahmed',
          messages: [
            {
              id: 'm1_b',
              senderId: 'buyer',
              senderName: 'Sujan Ahmed',
              text: 'Hello, what is the best price for this bike?',
              timestamp: new Date().toISOString(),
              isRead: false
            }
          ],
          lastUpdated: new Date().toISOString()
        }
      ]);
    }

    setIsLoaded(true);
  }, []);

  // Save states to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chaka-price-alerts', JSON.stringify(priceAlerts));
    }
  }, [priceAlerts, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chaka-user-profile', JSON.stringify(userProfile));
    }
  }, [userProfile, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chaka-showroom-profile', JSON.stringify(showroomProfile));
    }
  }, [showroomProfile, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chaka-listings', JSON.stringify(listings));
    }
  }, [listings, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chaka-ads', JSON.stringify(adSlots));
    }
  }, [adSlots, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chaka-chats', JSON.stringify(chats));
    }
  }, [chats, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chaka-watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chaka-followed-sellers', JSON.stringify(followedSellers));
    }
  }, [followedSellers, isLoaded]);

  // Apply Dark Schema dynamically at document levels
  useEffect(() => {
    if (isLoaded) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        listViewHeaderTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        listViewHeaderTheme('light');
      }
      localStorage.setItem('chaka-theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, isLoaded]);

  // Reset detail view active image highlight on listing transition
  useEffect(() => {
    setActiveDetailImage(null);
    setShowMobileStickyActions(true);
  }, [selectedListingId]);

  // Reset phone number display to secure/hidden by default whenever a listing is changed
  useEffect(() => {
    setRevealDetailPhone(false);
  }, [selectedListingId]);

  // Monitor price drops against user alerts
  useEffect(() => {
    if (priceAlerts.length === 0) return;

    let triggeredAlertIds: string[] = [];

    priceAlerts.forEach((alert) => {
      if (alert.triggered) return;

      const listing = listings.find((l) => l.id === alert.listingId);
      if (listing && listing.price <= alert.targetPrice) {
        triggeredAlertIds.push(alert.id);

        const formattedNew = listing.price.toLocaleString();
        const formattedTarget = alert.targetPrice.toLocaleString();

        if (language === 'bn') {
          showToast(
            `🔔 মূল্যহ্রাস অ্যালার্ট: ${alert.brand} ${alert.model} এর দাম কমে ৳ ${formattedNew} হয়েছে (আপনার টার্গেট ছিল: ৳ ${formattedTarget})!`,
            'info'
          );
        } else {
          showToast(
            `🔔 Price Drop Alert: The ${alert.brand} ${alert.model} has dropped to BDT ${formattedNew} (Your Target was: BDT ${formattedTarget})!`,
            'info'
          );
        }
      }
    });

    if (triggeredAlertIds.length > 0) {
      setPriceAlerts(currentAlerts => currentAlerts.map((alert) =>
        triggeredAlertIds.includes(alert.id) ? { ...alert, triggered: true } : alert
      ));
    }
  }, [listings, language, priceAlerts]);

  const listViewHeaderTheme = (theme: 'dark' | 'light') => {
    const root = document.getElementById('root');
    if (root) {
      root.className = theme === 'dark' ? 'bg-slate-950 text-slate-100 min-h-screen' : 'bg-[#faf8f5] text-slate-900 min-h-screen';
    }
  };

  // Keep listing visual profiles synced with live userProfile and showroomProfile updates
  const listingsWithSyncedNames = useMemo(() => {
    const CAR_POOL = [
      "photo-1603584173870-7f23fdae1b7a",
      "photo-1611245801312-51340b307ebd",
      "photo-1590362891991-f776e747a588",
      "photo-1617788138017-80ad40651399",
      "photo-1503376780353-7e6692767b70",
      "photo-1555215695-3004980ad54e",
      "photo-1614162692292-7ac56d7f7f1e",
      "photo-1532581291347-9c39cf10a73c",
      "photo-1568605117036-5fe5e7bab0b7",
      "photo-1606016159991-dfe4f2746ad5",
      "photo-1617531653332-bd46c24f2068",
      "photo-1580273916550-e323be2ae537",
      "photo-1621007947382-bb3c3994e3fb",
      "photo-1619767886558-efdc259cde1a",
      "photo-1563720223185-11003d516935",
      "photo-1525609004556-c46c7d6cf0a3",
      "photo-1551524559-8af4e6624178",
      "photo-1559416523-140dd3772c3c",
      "photo-1549437129-967e6a3ccd48",
      "photo-1616422285623-13ff0162193c",
      "photo-1549399542-7e3f8b79c341"
    ];

    const BIKE_POOL = [
      "photo-1558981403-c5f9899a28bc",
      "photo-1599819811279-d5ad9cccf838",
      "photo-1615887023516-9b6bcd559e87",
      "photo-1609630875171-b1321377ee65",
      "photo-1611082260669-eeca1f6b86fb",
      "photo-1591637333184-19aa84b3e01f",
      "photo-1568772585407-9361f9bf3a87",
      "photo-1622185135505-2d795003994a",
      "photo-1609137144813-09019df77789",
      "photo-1508962914676-134849a727f0",
      "photo-1571407987258-001d72ddb088",
      "photo-1560604107-1607f2dedce2"
    ];

    const COMMERCIAL_POOL = [
      "photo-1586528116311-ad8dd3c8310d",
      "photo-1501700493784-fe1a1d7ec7f4",
      "photo-1592838064426-65141e901392",
      "photo-1608248597481-496100c8c836"
    ];

    const EV_POOL = [
      "photo-1619767886558-efdc259cde1a",
      "photo-1617788138017-80ad40651399",
      "photo-1563720223185-11003d516935",
      "photo-1568605117036-5fe5e7bab0b7",
      "photo-1621007947382-bb3c3994e3fb",
      "photo-1563725023035-2131653925a4"
    ];

    const THREE_WHEELER_POOL = [
      "photo-1566376918128-3e414c62cc99",
      "photo-1593789198777-f29bc259780e",
      "photo-1561542320-9a18cd340469"
    ];

    const BICYCLE_POOL = [
      "photo-1485965120184-e220f721d03e",
      "photo-1532298229144-0ec0c57515c7",
      "photo-1576435469650-3a5fc76dd565",
      "photo-1541614101331-1a5a3a194e92"
    ];

    const PARTS_POOL = [
      "photo-1486006920555-c77dce18193b",
      "photo-1617406181113-ac114090530b",
      "photo-1518770660439-4636190af475",
      "photo-1608248597481-496100c8c836",
      "photo-1611245801312-51340b307ebd"
    ];

    const SERVICE_POOL = [
      "photo-1617406181113-ac114090530b",
      "photo-1582845512747-d4200b7ea486"
    ];

    const MODEL_MAPPING: { [key: string]: string } = {
      'Axio': 'photo-1590362891991-f776e747a588',
      'Civic': 'photo-1617788138017-80ad40651399',
      'Premio': 'photo-1621007947382-bb3c3994e3fb',
      'Tucson': 'photo-1559416523-140dd3772c3c',
      'Outlander': 'photo-1503376780353-7e6692767b70',
      'X-Trail': 'photo-1631214548483-333e6f9d3baf',
      '3 Series': 'photo-1555215695-3004980ad54e',
      'Aqua': 'photo-1622330229197-39c85e4ac552',
      'Noah': 'photo-1562591176-a0b5dd13ec02',
      'A4': 'photo-1606016159991-dfe4f2746ad5',
      'Allion': 'photo-1621007947382-bb3c3994e3fb',
      'Vezel': 'photo-1549399542-7e3f8b79c341',
      'Prado': 'photo-1616422285623-13ff0162193c',
      'Swift': 'photo-1541348263662-e0c8de426148',
      'Mustang': 'photo-1532581291347-9c39cf10a73c',
      'BRZ': 'photo-1609521263047-f8f205293f24',
      'C-Class': 'photo-1532581291347-9c39cf10a73c',
      'Macan': 'photo-1568605117036-5fe5e7bab0b7',
      'Range Rover': 'photo-1568605117036-5fe5e7bab0b7',
      'R15': 'photo-1599819811279-d5ad9cccf838',
      'Gixxer': 'photo-1615887023516-9b6bcd559e87',
      'Hornet': 'photo-1615887023516-9b6bcd559e87',
      'FZ-S': 'photo-1609630875171-b1321377ee65',
      'Pulsar': 'photo-1558981403-c5f9899a28bc',
      'Apache': 'photo-1609630875171-b1321377ee65',
      'Duke': 'photo-1599819811279-d5ad9cccf838',
      'Classic 350': 'photo-1558981403-c5f9899a28bc',
      'Vespa': 'photo-1609137144813-09019df77789',
      'Atto 3': 'photo-1563720223185-11003d516935',
      'Model 3': 'photo-1619767886558-efdc259cde1a',
      'Neta V': 'photo-1568605117036-5fe5e7bab0b7',
      'Binggo': 'photo-1563720223185-11003d516935',
      'Ioniq 5': 'photo-1619767886558-efdc259cde1a'
    };

    return listings.map((l) => {
      let sellerDetails = {};
      if (l.userId === 'sr_1') {
        sellerDetails = {
          sellerName: showroomProfile?.name || 'Haq Bay Motors',
          showroomName: showroomProfile?.name || 'Haq Bay Motors'
        };
      } else if (l.userId === 'user_curr') {
        sellerDetails = {
          sellerName: userProfile?.name || 'Sujan Ahmed'
        };
      }

      let updatedImages = l.images;
      const firstImage = l.images && l.images[0];
      const isUnsplash = firstImage && firstImage.includes('unsplash.com');
      const isUserUploaded = firstImage && !isUnsplash && !firstImage.startsWith('/') && !firstImage.startsWith('http');
      const isCustomAd = l.id.includes('_ad_') || l.id.startsWith('custom_') || l.userId === 'user_curr' || (l as any).isUserAdded || (l as any).isCustom;

      if (!isUserUploaded && !isCustomAd) {
        let MatchedPhotoId = '';
        const searchPool = [l.model, l.brand, l.title];
        for (const query of searchPool) {
          if (!query) continue;
          const matchKey = Object.keys(MODEL_MAPPING).find(
            (key) => query.toLowerCase().includes(key.toLowerCase())
          );
          if (matchKey) {
            MatchedPhotoId = MODEL_MAPPING[matchKey];
            break;
          }
        }

        let hashValue = 0;
        const idString = l.id || '';
        for (let i = 0; i < idString.length; i++) {
          hashValue = (hashValue << 5) - hashValue + idString.charCodeAt(i);
          hashValue |= 0;
        }

        if (MatchedPhotoId) {
          updatedImages = [
            `https://images.unsplash.com/${MatchedPhotoId}?auto=format&fit=crop&q=80&w=650`
          ];
        } else {
          let pool = CAR_POOL;
          if (l.type === 'bike') pool = BIKE_POOL;
          else if (l.type === 'commercial') pool = COMMERCIAL_POOL;
          else if (l.type === 'ev') pool = EV_POOL;
          else if (l.type === 'threewheeler') pool = THREE_WHEELER_POOL;
          else if (l.type === 'bicycle') pool = BICYCLE_POOL;
          else if (l.type === 'parts') pool = PARTS_POOL;
          else if (l.type === 'service') pool = SERVICE_POOL;

          const finalIndex = Math.abs(hashValue) % pool.length;
          const secondaryIndex = (Math.abs(hashValue) + 3) % pool.length;

          updatedImages = [
            `https://images.unsplash.com/${pool[finalIndex]}?auto=format&fit=crop&q=80&w=650`,
            `https://images.unsplash.com/${pool[secondaryIndex]}?auto=format&fit=crop&q=80&w=650`
          ];
        }
      }

      return {
        ...l,
        ...sellerDetails,
        images: updatedImages,
        priceFormatted: l.price ? formatBDT(l.price) : l.priceFormatted
      };
    });
  }, [listings, showroomProfile, userProfile]);

  // ----------------------------------------------------
  // Dynamic URL / Routing Mechanism with Browser Hashes
  // ----------------------------------------------------
  useEffect(() => {
    if (!isLoaded) return;

    const parseHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#listing/')) {
        const id = hash.replace('#listing/', '');
        setSelectedListingId(id);
        setActiveView('listing');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#profile/')) {
        const pId = hash.replace('#profile/', '');
        setSelectedProfileId(pId);
        setActiveView('profile');
        window.scrollTo(0, 0);
      } else if (hash === '#browse' || hash.startsWith('#browse/')) {
        setActiveView('browse');
        if (hash.startsWith('#browse/')) {
          const cat = hash.replace('#browse/', '');
          const validCategories = ['car', 'bike', 'commercial', 'ev', 'threewheeler', 'bicycle', 'parts', 'service'];
          if (validCategories.includes(cat)) {
            setFilters((f) => ({ ...f, type: cat as any, brand: 'all' }));
          }
        }
      } else if (hash.startsWith('#dashboard')) {
        setActiveView('dashboard');
        if (hash.includes('inbox')) {
          setUserDashboardTab('inbox');
        } else if (hash.includes('post-ad')) {
          setUserDashboardTab('post-ad');
        } else {
          setUserDashboardTab('my-ads');
        }
      } else if (hash === '#auction-verify') {
        setActiveView('auction-verify');
      } else if (hash === '#terms') {
        setActiveView('terms');
        window.scrollTo(0, 0);
      } else if (hash === '#privacy') {
        setActiveView('privacy');
        window.scrollTo(0, 0);
      } else if (hash === '#help') {
        setActiveView('help');
        window.scrollTo(0, 0);
      } else if (hash === '#safety') {
        setActiveView('safety');
        window.scrollTo(0, 0);
      } else if (hash === '#home' || !hash) {
        setActiveView('home');
      }
    };

    parseHash();

    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [isLoaded]);

  const changeView = (view: string, categoryOrId: string | null = null) => {
    if (view === 'listing' && categoryOrId) {
      window.location.hash = `#listing/${categoryOrId}`;
    } else if (view === 'profile' && categoryOrId) {
      window.location.hash = `#profile/${categoryOrId}`;
    } else if (view === 'browse') {
      if (categoryOrId && ['car', 'bike', 'commercial', 'ev', 'threewheeler', 'bicycle', 'parts', 'service'].includes(categoryOrId)) {
        setFilters((f) => ({ ...f, type: categoryOrId as any, brand: 'all' }));
        window.location.hash = `#browse/${categoryOrId}`;
      } else if (categoryOrId === 'all') {
        setFilters((f) => ({ ...f, type: 'all', brand: 'all' }));
        window.location.hash = '#browse';
      } else {
        window.location.hash = '#browse';
      }
    } else if (view === 'dashboard') {
      if (categoryOrId === 'inbox') {
        window.location.hash = '#dashboard/inbox';
        setUserDashboardTab('inbox');
      } else {
        window.location.hash = '#dashboard';
      }
    } else if (view === 'auction-verify') {
      window.location.hash = '#auction-verify';
    } else if (view === 'terms') {
      window.location.hash = '#terms';
    } else if (view === 'privacy') {
      window.location.hash = '#privacy';
    } else if (view === 'help') {
      window.location.hash = '#help';
    } else if (view === 'safety') {
      window.location.hash = '#safety';
    } else {
      window.location.hash = '#home';
    }
  };

  // ----------------------------------------------------
  // Core Business Operations Functions
  // ----------------------------------------------------
  const handleAddNewAd = (newAdData: Partial<VehicleListing>) => {
    setListings((prev) => [newAdData as VehicleListing, ...prev]);
  };

  const handleDeleteAd = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    showToast('The listing has been deleted permanently.', 'info');
  };

  const handleToggleAdSlot = (id: string) => {
    setAdSlots((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, isActive: !ad.isActive } : ad))
    );
  };

  const handleToggleWatchlist = (id: string) => {
    if (watchlist.includes(id)) {
      setWatchlist((prev) => prev.filter((wId) => wId !== id));
    } else {
      setWatchlist((prev) => [...prev, id]);
    }
  };

  const handleSendMessage = (chatId: string, text: string, senderId: string, image?: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === chatId) {
          const newMsg = {
            id: `msg_${Date.now()}`,
            senderId,
            senderName: senderId === 'buyer' ? chat.buyerName : chat.sellerName,
            text,
            timestamp: new Date().toISOString(),
            isRead: senderId === 'buyer',
            image
          };
          return {
            ...chat,
            messages: [...chat.messages, newMsg],
            lastUpdated: new Date().toISOString()
          };
        }
        return chat;
      })
    );
  };

  const handleStartListingChat = (listing: VehicleListing) => {
    const existing = chats.find(
      (c) => c.listingId === listing.id && c.buyerId === 'user_curr'
    );

    if (existing) {
      setActiveChatId(existing.id);
      setCurrentRole('user');
      changeView('dashboard', 'inbox');
      setTimeout(() => {
        const btn = document.getElementById('user-dashboard');
        if (btn) btn.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }

    const newChatId = `chat_${Date.now()}`;
    const newChat: ChatConversation = {
      id: newChatId,
      listingId: listing.id,
      listingTitle: listing.title,
      listingImage: listing.images[0],
      listingPrice: listing.priceFormatted,
      sellerId: listing.userId,
      sellerName: listing.showroomName || listing.sellerName,
      buyerId: 'user_curr',
      buyerName: 'Sujan Ahmed',
      messages: [],
      lastUpdated: new Date().toISOString()
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);
    setCurrentRole('user');
    changeView('dashboard', 'inbox');
  };

  const filteredListings = useMemo(() => {
    const filtered = listingsWithSyncedNames.filter((item) => {
      if (currentRole !== 'admin' && item.status && item.status !== 'Approved') {
        return false;
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesModel = item.model.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesModel) return false;
      }

      if (filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }

      if (filters.condition !== 'all' && item.condition !== filters.condition) {
        return false;
      }

      if (filters.division !== 'all' && item.division !== filters.division) {
        return false;
      }

      if (item.price > filters.priceMax) {
        return false;
      }

      if (filters.modelYear && filters.modelYear !== 'all') {
        if (item.year !== Number(filters.modelYear)) {
          return false;
        }
      }

      if (filters.bodyType && filters.bodyType !== 'all') {
        if (!item.bodyType || item.bodyType.toLowerCase() !== filters.bodyType.toLowerCase()) {
          return false;
        }
      }

      if (filters.fuelType && filters.fuelType !== 'all') {
        if (!item.fuelType || item.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) {
          return false;
        }
      }

      if (filters.transmission && filters.transmission !== 'all') {
        if (!item.transmission || item.transmission.toLowerCase() !== filters.transmission.toLowerCase()) {
          return false;
        }
      }

      if (filters.maxMileage && filters.maxMileage !== 'all') {
        const limit = Number(filters.maxMileage);
        if (item.mileage > limit) {
          return false;
        }
      }

      if (filters.seats && filters.seats !== 'all') {
        const requiredSeats = Number(filters.seats);
        let assumedSeats = 5;
        if (item.type === 'bike') {
          assumedSeats = 2;
        } else if (item.bodyType && ['suv', 'microbus', 'mpv'].includes(item.bodyType.toLowerCase())) {
          assumedSeats = 7;
        }
        if (assumedSeats !== requiredSeats) {
          return false;
        }
      }

      if (item.type === 'parts') {
        if (filters.partsTarget && filters.partsTarget !== 'all') {
          if (item.partsTarget !== filters.partsTarget) {
            return false;
          }
        }
        if (filters.subCategory && filters.subCategory !== 'all') {
          if (item.subCategory !== filters.subCategory) {
            return false;
          }
        }
      }

      if (filters.brand && filters.brand !== 'all') {
        if (item.brand.toLowerCase() !== filters.brand.toLowerCase()) {
          return false;
        }
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (sortBy === 'price-desc') {
        return b.price - a.price;
      } else if (sortBy === 'mileage-desc') {
        return (b.mileage || 0) - (a.mileage || 0);
      } else if (sortBy === 'newest') {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }
      return 0;
    });
  }, [listingsWithSyncedNames, filters, currentRole, sortBy]);

  const mostViewedListingsForHome = useMemo(() => {
    return [...listingsWithSyncedNames]
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);
  }, [listingsWithSyncedNames]);

  const activeListingItem = useMemo(() => {
    if (!selectedListingId) return null;
    return listingsWithSyncedNames.find((idx) => idx.id === selectedListingId) || null;
  }, [listingsWithSyncedNames, selectedListingId]);

  useEffect(() => {
    if (activeListingItem) {
      setCustomTargetPrice(Math.round(activeListingItem.price * 0.95).toString());
    }
  }, [selectedListingId, activeListingItem]);

  // 360 Rotation Simulation
  useEffect(() => {
    if (!is360Rotating || !activeListingItem) return;
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
  }, [is360Rotating, activeListingItem]);

  const relatedListingsForDetail = useMemo(() => {
    if (!activeListingItem) return [];
    return listingsWithSyncedNames
      .filter((l) => l.type === activeListingItem.type && l.id !== activeListingItem.id)
      .slice(0, 3);
  }, [listingsWithSyncedNames, activeListingItem]);

  const TOP_BRANDS_SCROLL = useMemo(() => [
    { 
      name: 'Toyota', 
      logo: <BrandLogo brandName="Toyota" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-rose-500/40 hover:bg-rose-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-rose-500/30 hover:bg-rose-950/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
      gradient: 'from-rose-500/10 to-rose-600/5'
    },
    { 
      name: 'Honda', 
      logo: <BrandLogo brandName="Honda" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-red-500/40 hover:bg-red-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-red-500/30 hover:bg-red-950/10',
      iconColor: 'text-red-650 dark:text-red-400',
      gradient: 'from-red-500/10 to-red-600/5'
    },
    { 
      name: 'Yamaha', 
      logo: <BrandLogo brandName="Yamaha" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-blue-500/40 hover:bg-blue-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-blue-500/30 hover:bg-blue-950/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-500/10 to-indigo-600/5'
    },
    { 
      name: 'Suzuki', 
      logo: <BrandLogo brandName="Suzuki" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-red-600/40 hover:bg-red-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-red-600/30 hover:bg-red-950/10',
      iconColor: 'text-red-600 dark:text-red-400',
      gradient: 'from-red-600/10 to-orange-550/5'
    },
    { 
      name: 'Nissan', 
      logo: <BrandLogo brandName="Nissan" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-slate-500/40 hover:bg-slate-100/30 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-slate-400/30 hover:bg-slate-900/20',
      iconColor: 'text-slate-650 dark:text-slate-400',
      gradient: 'from-slate-500/10 to-slate-600/5'
    },
    { 
      name: 'Hyundai', 
      logo: <BrandLogo brandName="Hyundai" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-cyan-600/40 hover:bg-cyan-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-cyan-500/30 hover:bg-cyan-950/10',
      iconColor: 'text-cyan-700 dark:text-cyan-400',
      gradient: 'from-cyan-500/10 to-blue-600/5'
    },
    { 
      name: 'BMW', 
      logo: <BrandLogo brandName="BMW" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-sky-500/40 hover:bg-sky-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-sky-500/30 hover:bg-sky-950/10',
      iconColor: 'text-sky-650 dark:text-sky-400',
      gradient: 'from-sky-500/10 to-blue-650/5'
    },
    { 
      name: 'Audi', 
      logo: <BrandLogo brandName="Audi" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-slate-400/50 hover:bg-slate-5 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-zinc-400/30 hover:bg-zinc-900/10',
      iconColor: 'text-slate-800 dark:text-slate-300',
      gradient: 'from-slate-400/10 to-zinc-500/5'
    },
    { 
      name: 'Mercedes-Benz', 
      logo: <BrandLogo brandName="Mercedes-Benz" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-zinc-500/40 hover:bg-zinc-50 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-zinc-400/30 hover:bg-zinc-950/10',
      iconColor: 'text-zinc-600 dark:text-zinc-300',
      gradient: 'from-zinc-450/10 to-slate-500/5'
    },
    { 
      name: 'Royal Enfield', 
      logo: <BrandLogo brandName="Royal Enfield" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-amber-600/40 hover:bg-amber-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-amber-500/30 hover:bg-amber-950/10',
      iconColor: 'text-amber-600 dark:text-amber-500',
      gradient: 'from-amber-500/10 to-yellow-600/5'
    },
    { 
      name: 'Bajaj', 
      logo: <BrandLogo brandName="Bajaj" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-teal-500/40 hover:bg-teal-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-teal-500/30 hover:bg-teal-950/10',
      iconColor: 'text-teal-650 dark:text-teal-400',
      gradient: 'from-teal-500/10 to-blue-600/5'
    },
    { 
      name: 'TVS', 
      logo: <BrandLogo brandName="TVS" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />, 
      lightBorder: 'border-slate-200/55',
      lightHover: 'hover:border-rose-500/40 hover:bg-rose-50/10 hover:shadow-xs',
      darkBorder: 'border-slate-800/80',
      darkHover: 'hover:border-rose-500/30 hover:bg-rose-950/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
      gradient: 'from-rose-550/10 to-indigo-505/5'
    }
  ], []);

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

  const getReturnButtonLabel = () => {
    switch (activeListingItem?.type) {
      case 'car': return 'Cars & Vehicles';
      case 'bike': return 'Bikes & Scooters';
      case 'parts': return 'Parts & Accessories';
      case 'service': return 'Services';
      default: return 'Catalog';
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#ff6600] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Loading Chaka BD...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#faf8f5] text-slate-900'}`}>
      
      {/* Top Header Panel Navigation */}
      <Header 
        isDarkMode={isDarkMode} 
        onThemeToggle={() => setIsDarkMode(!isDarkMode)} 
        currentRole={currentRole}
        onChangeRole={(role) => setCurrentRole(role)}
        activeView={activeView}
        activeCategory={filters.type}
        onChangeView={(view, category) => changeView(view, category || null)}
        unreadChatsCount={chats.filter(c => c.messages.some(m => !m.isRead && m.senderId !== 'buyer')).length}
        searchQuery={filters.searchQuery}
        onSearchQueryChange={(query) => {
          setFilters(prev => ({ ...prev, searchQuery: query }));
          if (activeView !== 'browse') {
            changeView('browse');
          }
        }}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        userProfile={userProfile}
        showroomProfile={showroomProfile}
        onMobileMenuToggle={() => setIsMobileMenuOpen(prev => !prev)}
      />

      {/* Side Menu Drawer overlay panel for mobile devices */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        currentRole={currentRole}
        onChangeRole={(role) => setCurrentRole(role)}
        activeView={activeView}
        activeCategory={filters.type}
        onChangeView={(view, category) => changeView(view, category || null)}
        unreadChatsCount={chats.filter(c => c.messages.some(m => !m.isRead && m.senderId !== 'buyer')).length}
      />

      {/* Main Contents view ports */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 min-h-[60vh]">
        
        {/* VIEW 1: HOME VIEW */}
        {activeView === 'home' && (
          <div className="space-y-6 sm:space-y-8">
            {/* QUICK FLUID SEARCH BAR */}
            <div className="max-w-7xl mx-auto">
              <Filters filters={filters} onChange={(f) => setFilters(f)} isDarkMode={isDarkMode} />
            </div>

            {/* Dynamic Rotating Top Sponsor Banner Slot */}
            {adSlots.some(s => s.placement === 'home-top' && s.isActive) && (
              <div className="max-w-7xl mx-auto my-1">
                <AdPlacement 
                  slot={adSlots.find(s => s.placement === 'home-top' && s.isActive) || adSlots[0]} 
                  allSlots={adSlots}
                  isDarkMode={isDarkMode} 
                />
              </div>
            )}

            {/* BRAND NEW ELEGANT CATEGORIES GRID SECTION */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-wider text-[#ff6600] dark:text-orange-400 flex items-center gap-1.5 matches-outfit">
                  <Grid className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#ff6600]" /> {t('vehicleCategories')}
                </h3>
                <p className={`text-xs sm:text-[13px] md:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-medium mt-1`}>
                  {t('vehicleCategoriesSub')}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  { 
                    id: 'car', 
                    title: 'Car', 
                    subtitle: 'Sedan & SUV', 
                    svg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff6600] dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="10" y1="75" x2="90" y2="75" strokeWidth="1.5" className="text-slate-350 dark:text-slate-800" />
                        <path d="M15 65 h10 c2-12 18-12 20 0 h15 c2-12 18-12 20 0 h10 c4 0 5-2 5-6 v-4 c0-4-3-8-8-9 l-12-6 c-3-1.5-8-3-12-3 H38 c-4 0-9 1.5-12 3 L14 50 c-5 1-7 5-7 9 v6 z" fill="currentColor" fillOpacity="0.1" />
                        <path d="M38 41 h15 l8 11 M38 41 v11 M53 41 v11" />
                        <path d="M28 44 l7-3 v11" />
                        <circle cx="25" cy="65" r="7" fill="none" strokeWidth="3" />
                        <circle cx="25" cy="65" r="2.5" fill="currentColor" />
                        <circle cx="65" cy="65" r="7" fill="none" strokeWidth="3" />
                        <circle cx="65" cy="65" r="2.5" fill="currentColor" />
                        <path d="M88 56 h2" strokeWidth="3.5" className="text-amber-500" />
                        <path d="M10 55 h3" strokeWidth="3.5" className="text-[#dc2626]" />
                      </svg>
                    )
                  },
                  { 
                    id: 'bike', 
                    title: 'Bike', 
                    subtitle: 'Motorcycle & Scooter', 
                    svg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff6600] dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="10" y1="75" x2="90" y2="75" strokeWidth="1.5" className="text-slate-350 dark:text-slate-800" />
                        <circle cx="25" cy="62" r="11" fill="currentColor" fillOpacity="0.08" />
                        <circle cx="75" cy="62" r="11" fill="currentColor" fillOpacity="0.08" />
                        <circle cx="25" cy="62" r="4" fill="none" strokeWidth="3" />
                        <circle cx="75" cy="62" r="4" fill="none" strokeWidth="3" />
                        <path d="M25 51v22M14 62h22M75 51v22M64 62h22" strokeWidth="1" className="opacity-40" />
                        <path d="M25 62 L42 42 L65 42 L75 62" strokeWidth="3" />
                        <path d="M75 62 L70 30 L60 30" strokeWidth="3" />
                        <path d="M25 62 L48 62 L60 42" strokeWidth="2.5" />
                        <path d="M36 38 h12 L50 42 H34 z" fill="currentColor" />
                        <path d="M50 34 c4-6 12-6 15 0 v8 H50 z" fill="currentColor" />
                        <path d="M68 27 h-8" strokeWidth="3" />
                      </svg>
                    )
                  },
                  { 
                    id: 'commercial', 
                    title: 'Commercial Vehicle', 
                    subtitle: 'Truck & Pickup', 
                    svg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff6600] dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="10" y1="75" x2="90" y2="75" strokeWidth="1.5" className="text-slate-350 dark:text-slate-800" />
                        <rect x="15" y="28" width="50" height="34" rx="2" fill="currentColor" fillOpacity="0.1" strokeWidth="2.5" />
                        <path d="M28 28 v34 M45 28 v34" strokeWidth="1.5" className="opacity-45" />
                        <path d="M65 37 h12 c3 0 5 1.5 6 4 l5 9 c0.5 1.5 1 3 1 5 v7 c0 1.5-1 2.5-2.5 2.5 H65 z" fill="currentColor" fillOpacity="0.08" strokeWidth="2.5" />
                        <path d="M69 41 h8 l5 9 H69 z" />
                        <circle cx="28" cy="67" r="6" fill="none" strokeWidth="3" />
                        <circle cx="56" cy="67" r="6" fill="none" strokeWidth="3" />
                        <circle cx="78" cy="67" r="6" fill="none" strokeWidth="3" />
                        <path d="M89 61 h2" strokeWidth="3.5" className="text-amber-500" />
                      </svg>
                    )
                  },
                  { 
                    id: 'ev', 
                    title: 'EV', 
                    subtitle: 'Electric Vehicle', 
                    svg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff6600] dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="10" y1="75" x2="90" y2="75" strokeWidth="1.5" className="text-slate-350 dark:text-slate-800" />
                        <path d="M12 63 h12 c1-8 11-8 12 0 h28 c1-8 11-8 12 0 h12 c3 0 4-2 4-5 v-2 c0-5-3-7-7-8 L62 44 c-2-1-5-2-8-2 H34 c-3 0-6 1-8 2 L14 49 c-4 1-5 4-5 7 v2 c0 3 1 5 3 5 z" fill="currentColor" fillOpacity="0.1" />
                        <circle cx="22" cy="63" r="5" fill="none" strokeWidth="2.5" />
                        <circle cx="22" cy="63" r="1.5" fill="currentColor" />
                        <circle cx="62" cy="63" r="5" fill="none" strokeWidth="2.5" />
                        <circle cx="62" cy="63" r="1.5" fill="currentColor" />
                        <path d="M47 22 L41 34 h10 L45 46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 fill-amber-500" />
                        <circle cx="47" cy="34" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" className="opacity-40 text-[#ff6600]" />
                      </svg>
                    )
                  },
                  { 
                    id: 'threewheeler', 
                    title: 'Three Wheeler', 
                    subtitle: 'CNG & Auto', 
                    svg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff6600] dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="10" y1="75" x2="90" y2="75" strokeWidth="1.5" className="text-slate-350 dark:text-slate-800" />
                        <path d="M22 64 h48 c2 0 3-1.5 3-3.5 l-6-24 c-1.5-6-5-10.5-12-10.5 H34 c-5 0-9 4-11 9 L15 51 c-1.5 3-1 6.5 1 9.5 z" fill="currentColor" fillOpacity="0.1" />
                        <path d="M25 45 l4-15 h14 v15 z" />
                        <path d="M48 30 h18 l4 15 M48 30 v28 M70 45 v13 H48" />
                        <circle cx="60" cy="65" r="7" fill="none" strokeWidth="3" />
                        <circle cx="22" cy="65" r="7" fill="none" strokeWidth="3" />
                        <path d="M22 47 l3-3" strokeWidth="3" />
                      </svg>
                    )
                  },
                  { 
                    id: 'bicycle', 
                    title: 'Bicycle', 
                    subtitle: 'Cycle & Spares', 
                    svg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff6600] dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="10" y1="75" x2="90" y2="75" strokeWidth="1.5" className="text-slate-350 dark:text-slate-800" />
                        <circle cx="28" cy="60" r="11" fill="none" strokeWidth="2.5" />
                        <circle cx="72" cy="60" r="11" fill="none" strokeWidth="2.5" />
                        <circle cx="28" cy="60" r="2.5" fill="currentColor" />
                        <circle cx="72" cy="60" r="2.5" fill="currentColor" />
                        <path d="M28 49 v22 M17 60 h22 M72 49 v22 M61 60 h22" strokeWidth="0.8" className="opacity-40" />
                        <path d="M28 60 L48 60 L65 42 M28 60 L44 42 L68 42 L72 60" strokeWidth="2" />
                        <path d="M44 42 L42 32 M68 42 L66 28 L58 28" strokeWidth="2" />
                        <path d="M38 32 h8" strokeWidth="3" />
                      </svg>
                    )
                  },
                  { 
                    id: 'parts', 
                    title: 'Parts', 
                    subtitle: 'Components & Spares', 
                    svg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff6600] dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="50" cy="50" r="20" fill="currentColor" fillOpacity="0.1" strokeWidth="2.5" />
                        <circle cx="50" cy="50" r="9" fill="none" strokeWidth="2.5" />
                        <path d="M50 24v6M50 70v6M24 50h6M70 50h6M32 32l4.5 4.5M63.5 63.5l4.5 4.5M32 68l4.5-4.5M63.5 36.5l4.5-4.5" strokeWidth="3.5" strokeLinecap="round" />
                        <path d="M18 18 l22 22 M25 15 l10 10" strokeWidth="3" className="opacity-45" />
                        <circle cx="18" cy="18" r="3" fill="currentColor" />
                        <path d="M78 22 h4M80 20v4" strokeWidth="1.5" className="text-amber-500" />
                        <path d="M18 78 h4M20 76v4" strokeWidth="1.5" className="text-amber-500" />
                      </svg>
                    )
                  },
                  { 
                    id: 'service', 
                    title: 'Services', 
                    subtitle: 'Workshop & Support', 
                    svg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff6600] dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M25 25 h50 v45 c0 8-15 14-25 14 C35 84 20 78 20 70 V25 z" fill="currentColor" fillOpacity="0.1" strokeWidth="2.5" />
                        <path d="M38 48 l7 7 18-18" strokeWidth="3.5" className="text-orange-500" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="50" cy="18" r="4" fill="none" strokeWidth="2" />
                        <path d="M46 18 h8" strokeWidth="1.5" />
                        <path d="M22 35 h-3 M78 35 h3 M22 55 h-3 M78 55 h3" strokeWidth="2" />
                      </svg>
                    )
                  },
                ].map((cat) => {
                  const count = listings.filter(l => l.type === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setFilters({ ...filters, type: cat.id as any, subCategory: 'all', partsTarget: 'all', brand: 'all' });
                        changeView('browse');
                        showToast(`${cat.title} Category Selected!`, 'success');
                      }}
                      className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 transform-gpu hover:scale-[1.03] active:scale-[0.98] p-2.5 flex flex-col justify-between h-[165px] ${
                        isDarkMode
                          ? 'bg-slate-900/40 border-slate-900/80 hover:border-orange-500/30 shadow-md hover:shadow-orange-500/5'
                          : 'bg-white border-slate-100 hover:border-orange-500/30 shadow-xs hover:shadow-md hover:shadow-orange-100/40'
                      }`}
                    >
                      <div className="w-full h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950/75 flex items-center justify-center p-1.5 shrink-0 relative">
                        {cat.svg}
                        <span className="absolute top-1 right-1 text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-md font-black bg-[#ff6600]/10 text-[#ff6600] dark:bg-orange-500/10 dark:text-orange-400">
                          {count} ads
                        </span>
                      </div>

                      <div className="text-center pt-2 pb-1">
                        <h4 className="text-[12px] sm:text-xs font-black uppercase tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-[#ff6600] dark:group-hover:text-orange-400 transition-colors">
                          {language === 'bn' 
                            ? (cat.id === 'car' ? 'গাড়ি' : cat.id === 'bike' ? 'বাইক' : cat.id === 'commercial' ? 'কমার্শিয়াল গাড়ি' : cat.id === 'ev' ? 'ইভি (ইলেকট্রিক)' : cat.id === 'threewheeler' ? 'থ্রি হুইলার' : cat.id === 'bicycle' ? 'বাইসাইকেল' : cat.id === 'parts' ? 'পার্টস' : 'সার্ভিস')
                            : cat.title
                          }
                        </h4>
                        <span className={`text-[10px] sm:text-[10.5px] block font-semibold leading-none mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {language === 'bn'
                            ? (cat.id === 'car' ? 'সেডান ও এসইউভি' : cat.id === 'bike' ? 'মোটরসাইকেল ও স্কুটার' : cat.id === 'commercial' ? 'ট্রাক ও পিকআপ' : cat.id === 'ev' ? 'ব্যাটারি চালিত গাড়ি' : cat.id === 'threewheeler' ? 'সিএনজি ও অটো' : cat.id === 'bicycle' ? 'সাইকেল ও স্পেয়ার্স' : cat.id === 'parts' ? 'যন্ত্রাংশ ও এক্সেসরিজ' : 'ওয়ার্কশপ ও সাপোর্ট')
                            : cat.subtitle
                          }
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <HowItWorks isDarkMode={isDarkMode} />

            <div className="space-y-3 py-1 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#ff6600] animate-bounce-subtle" /> {language === 'bn' ? 'জনপ্রিয় ব্র্যান্ড সমূহ' : 'Popular Brands'}
                  </h2>
                  <p className={`text-[10px] sm:text-[11px] md:text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {language === 'bn' ? 'আপনার পছন্দের ব্র্যান্ডটি সিলেক্ট করে চমৎকার সব লিস্টিং ইনস্ট্যান্টলি খুঁজে নিন' : 'Select your preferred automobile manufacturer to filter listings instantly'}
                  </p>
                </div>
              </div>
              
              <div className={`overflow-hidden relative w-full py-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-900/10 border-slate-900' : 'bg-white border-slate-100 shadow-xs'
              }`}>
                <div className="animate-marquee gap-5 pr-4">
                  {[...TOP_BRANDS_SCROLL, ...TOP_BRANDS_SCROLL, ...TOP_BRANDS_SCROLL].map((brand, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setFilters({ ...filters, brand: brand.name, searchQuery: '', type: 'all' });
                        changeView('browse');
                      }}
                      className={`flex items-center gap-4 px-5 py-3 border rounded-2xl cursor-pointer select-none transition-all duration-300 whitespace-nowrap group shrink-0 ${
                        isDarkMode
                          ? `bg-slate-950/65 ${brand.darkBorder} ${brand.darkHover}`
                          : `bg-white/95 ${brand.lightBorder} ${brand.lightHover}`
                      }`}
                    >
                      <div className={`w-14 h-12 sm:w-16 sm:h-14 rounded-2xl bg-gradient-to-br ${brand.gradient} ${brand.iconColor} flex items-center justify-center shadow-md transition-transform group-hover:scale-105 [&>svg]:w-7 [&>svg]:h-7 [&>svg]:sm:w-8 [&>svg]:sm:h-8`}>
                        {brand.logo}
                      </div>
                      <div className="flex flex-col pr-1 justify-center">
                        <span className={`text-sm sm:text-base font-black tracking-tight transition-colors ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-800'
                        } group-hover:text-[#ff6600] dark:group-hover:text-orange-400`}>
                          {brand.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center sm:items-end">
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
                    <Eye className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#ff6600]" /> {language === 'bn' ? 'সবচেয়ে জনপ্রিয় বিজ্ঞাপন সমূহ' : 'Most Viewed Ads'}
                  </h2>
                  <p className={`text-[10px] sm:text-[11px] md:text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {language === 'bn' ? 'সারাদেশের ক্রেতাদের সর্বাধিক বার দেখা ৮টি আকর্ষণীয় বিজ্ঞাপন' : 'Explore the hottest vehicle deals based on active customer views across Bangladesh (8 featured deals)'}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 dark:bg-slate-900/40 p-0.5 rounded-lg border border-slate-300/30 dark:border-slate-800">
                    <button
                      onClick={() => setHomeViewMode('grid')}
                      className={`p-1 sm:p-1.5 rounded-md transition-all cursor-pointer ${
                        homeViewMode === 'grid'
                          ? 'bg-[#ff6600] text-white shadow-xs'
                          : 'text-slate-500 dark:text-slate-400 hover:text-[#ff6600]'
                      }`}
                      title="Grid space"
                    >
                      <LayoutGrid className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <button
                      onClick={() => setHomeViewMode('list')}
                      className={`p-1 sm:p-1.5 rounded-md transition-all cursor-pointer ${
                        homeViewMode === 'list'
                          ? 'bg-[#ff6600] text-white shadow-xs'
                          : 'text-slate-500 dark:text-slate-400 hover:text-[#ff6600]'
                      }`}
                      title="Detailed list"
                    >
                      <List className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => changeView('browse')}
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-black text-[#ff6600] hover:text-[#eb5e00] transition-colors cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                </div>
              </div>

              <div className={homeViewMode === 'list' ? 'grid grid-cols-1 gap-2.5 w-full' : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5'}>
                {mostViewedListingsForHome.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    isDarkMode={isDarkMode}
                    viewMode={homeViewMode}
                    onSelect={(id) => changeView('listing', id)}
                    onSelectProfile={(pId) => changeView('profile', pId)}
                  />
                ))}
              </div>

              <div className="text-center pt-1.5 sm:hidden">
                <button
                  onClick={() => changeView('browse')}
                  className="w-full bg-slate-900 border border-slate-800 text-[#ff6600] font-black py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Browse Complete Catalog ({listings.length} Active Ads)
                </button>
              </div>
            </div>

            <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-b from-slate-900/40 via-slate-900/10 to-slate-950/25 border-slate-900/80 shadow-xl' 
                : 'bg-white border-slate-200/60 shadow-lg shadow-slate-100/50'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className={`text-base sm:text-lg font-black tracking-tight flex items-center gap-2 mb-1 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <MapPin className="w-4 h-4 text-[#ff6600]" />
                    </span>
                    {t('browseTitle')}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>
                    {t('browseSub')}
                  </p>
                </div>
                <div className={`self-start sm:self-auto px-3 py-1.5 rounded-full border text-[10px] font-black tracking-wider flex items-center gap-1.5 shrink-0 ${
                  isDarkMode 
                    ? 'bg-slate-950/40 border-slate-800 text-slate-300' 
                    : 'bg-slate-100/60 border-slate-200 text-slate-600'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  {BANGLADESH_DIVISIONS.length} {t('regionalNode')}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
                {BANGLADESH_DIVISIONS.map((div) => {
                  const count = listings.filter(l => l.division === div).length;
                  const meta = DIVISION_META[div] || {
                    tagline: "Territory Node",
                    badge: "📍 LOCAL",
                    gradient: "from-slate-500/10 to-slate-600/5",
                    icon: <Compass className="w-5 h-5 text-slate-400" />
                  };
                  return (
                    <div
                      key={div}
                      onClick={() => {
                        setFilters({ ...filters, division: div });
                        changeView('browse');
                      }}
                      className={`relative p-4 rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 md:hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group h-36 ${
                        isDarkMode 
                          ? 'bg-slate-950/40 border-slate-900/60 hover:border-orange-500/30 hover:bg-slate-900/25' 
                          : 'bg-white border-slate-200/50 hover:border-[#ff6600]/25 hover:bg-slate-50/20'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${meta.gradient} rounded-bl-full opacity-20 group-hover:opacity-45 blur-md transition-opacity`} />
                      
                      <div className="flex items-start justify-between gap-2 relative z-10">
                        <div className={`p-2 rounded-xl border flex items-center justify-center transition-colors ${
                          isDarkMode 
                            ? 'bg-slate-900/60 border-slate-800' 
                            : 'bg-slate-50 border-slate-100'
                        }`}>
                          {meta.icon}
                        </div>
                        <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded ${
                          isDarkMode
                            ? 'bg-slate-900/55 text-slate-400 border border-slate-800'
                            : 'bg-slate-100 text-slate-500 border border-slate-200/60'
                        }`}>
                          {meta.badge}
                        </span>
                      </div>

                      <div className="relative z-10 mt-3">
                        <h4 className={`text-xs font-black tracking-tight transition-colors truncate ${
                          isDarkMode ? 'text-slate-100 group-hover:text-orange-400' : 'text-slate-900 group-hover:text-[#ff6600]'
                        }`}>
                          {language === 'bn' 
                            ? (div === 'Dhaka' ? 'ঢাকা' : div === 'Chittagong' ? 'চট্টগ্রাম' : div === 'Sylhet' ? 'সিলেট' : div === 'Rajshahi' ? 'রাজশাহী' : div === 'Khulna' ? 'খুলনা' : div === 'Barisal' ? 'বরিশাল' : div === 'Rangpur' ? 'রংপুর' : 'ময়মনসিংহ')
                            : div
                          }
                        </h4>
                        <p className={`text-[9px] ${isDarkMode ? 'text-slate-500 font-medium' : 'text-slate-400 font-semibold'} truncate mt-0.5`}>
                          {t(`${div}Tagline`) || meta.tagline}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-slate-200/10 dark:border-slate-800/40">
                          <span className="text-[10px] font-black text-orange-500 dark:text-orange-405">
                            {count} {language === 'bn' ? 'টি বিজ্ঞাপন' : (count === 1 ? 'Ad' : 'Ads')}
                          </span>
                          <span className="text-[10px] text-slate-400 font-extrabold group-hover:translate-x-0.5 transition-transform duration-200">
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
        )}

        {/* VIEW 2: BROWSE ALL VEHICLES CATALOG VIEW */}
        {activeView === 'browse' && (
          <div className="w-full space-y-5">
            <div className="lg:hidden w-full overflow-hidden">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 block">
                ⭐ {language === 'bn' ? 'ক্যাটাগরি ব্রাউজ করুন:' : 'Browse by Category:'}
              </span>
              <div className="-mx-4 px-4 overflow-x-auto no-scrollbar py-1">
                <div className="flex items-center gap-2.5 pb-2 min-w-max">
                  {[
                    { id: 'all', label: language === 'bn' ? 'সব' : 'All', rawLabel: language === 'bn' ? 'সকল লিস্টিং' : 'All Ads', count: listings.length, emoji: '🔥', icon: <Grid className="w-4 h-4 text-orange-500" /> },
                    { id: 'car', label: language === 'bn' ? 'গাড়ি' : 'Cars', rawLabel: language === 'bn' ? 'রিকন্ডিশন গাড়ি' : 'Cars', count: listings.filter(l => l.type === 'car').length, emoji: '🚗', icon: <Car className="w-4 h-4 text-sky-400" /> },
                    { id: 'bike', label: language === 'bn' ? 'বাইক' : 'Bikes', rawLabel: language === 'bn' ? 'মোটরসাইকেল ও স্কুটার' : 'Bikes', count: listings.filter(l => l.type === 'bike').length, emoji: '🏍️', icon: <Bike className="w-4 h-4 text-red-500" /> },
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
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 border-b border-dashed border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1">
                      <List className="w-3.5 h-3.5 text-[#ff6600]" /> Catalog Category
                    </h3>

                    <div className="flex flex-col gap-1 rounded-2xl overflow-hidden">
                      {[
                        { 
                          id: 'all', 
                          label: language === 'bn' ? 'সকল ডিরেক্টরি' : 'All Directories', 
                          count: listings.length, 
                          icon: <Grid className="w-5 h-5 text-orange-500" />,
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
                          icon: <ShieldCheck className="w-5 h-5 text-teal-500" />,
                          iconBg: 'bg-teal-500/10'
                        },
                      ].map((cat) => {
                        const isActive = filters.type === cat.id;
                        return (
                          <div key={cat.id} className="w-full">
                            <button
                              key={cat.id}
                              onClick={() => setFilters({ ...filters, type: cat.id as any, subCategory: 'all', partsTarget: 'all', brand: 'all' })}
                              className={`w-full text-left py-3 px-3 flex items-center justify-between transition-all cursor-pointer relative group ${
                                isActive 
                                  ? isDarkMode
                                    ? 'bg-[#ff6600]/10 text-orange-400 font-extrabold border-l-4 border-solid border-[#ff6600]'
                                    : 'bg-orange-50/70 text-orange-900 font-extrabold border-l-4 border-solid border-[#ff6600]'
                                  : isDarkMode 
                                    ? 'hover:bg-slate-800/40 text-slate-200 border-l-4 border-transparent' 
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
                                  isDarkMode ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50/50 border-slate-100'
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
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 border-b border-dashed border-slate-100 dark:border-slate-800 pb-2">
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
                            : 'text-slate-500 dark:text-slate-400 hover:text-[#ff6600]'
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
                            : 'text-slate-500 dark:text-slate-400 hover:text-[#ff6600]'
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
        )}

        {/* VIEW 3: DYNAMIC VEHICLE LISTING DETAIL VIEW */}
        {activeView === 'listing' && activeListingItem && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <button
                onClick={() => {
                  changeView('browse');
                }}
                className={`flex items-center gap-2 text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer border ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' 
                    : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50/80 shadow-xs'
                }`}
              >
                <ChevronLeft className="w-4 h-4 text-[#ff6600]" /> {getReturnButtonLabel()}
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
                ? 'bg-amber-950/15 border-amber-900/40 text-amber-300' 
                : 'bg-amber-50/60 border-amber-200 text-amber-900'
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
                    onClick={() => {
                      setIsShareOpen(true);
                    }}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-900 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title="Share this vehicle"
                  >
                    <Share2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400" />
                  </button>
                  <button
                    onClick={() => {
                      setReportedListingId(activeListingItem.id);
                      setReportDetails('');
                      setIsReportOpen(true);
                    }}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white border-slate-200 text-orange-500 hover:bg-orange-50 dark:bg-slate-950 dark:border-slate-800 dark:text-amber-500 dark:hover:bg-orange-955/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title="Report misleading specifications or fraud (Abuse)"
                  >
                    <AlertTriangle className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-900 font-semibold shadow-2xs">
                  <Calendar className="w-3.5 h-3.5 text-[#ff6600] shrink-0" />
                  {activeListingItem.year}
                </span>
                <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-900 font-semibold shadow-2xs">
                  <Gauge className="w-3.5 h-3.5 text-[#ff6600] shrink-0" />
                  {activeListingItem.mileage ? (activeListingItem.mileage >= 1000 ? `${Math.round(activeListingItem.mileage / 1000)}k` : activeListingItem.mileage) : '0'} km
                </span>
                <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-900 font-semibold shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-[#ff6600] shrink-0" />
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
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Body type</span>
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
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Year</span>
                        <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeListingItem.year}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Transmission</span>
                        <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeListingItem.transmission || 'Automatic'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Registration</span>
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
                              : 'bg-[#ff6600] hover:bg-[#eb5e00] text-white shadow-xs'
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
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#ff6600] dark:text-orange-400 block mb-1">AUCTION REPORT GRADE</span>
                            <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeListingItem.auctionGrade}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-semibold">Verified via Japanese Database</span>
                        </div>

                        <div className={`p-4 rounded-2xl border flex flex-col justify-between h-28 relative overflow-hidden ${
                          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#fcfbf9] border-slate-200/60 shadow-xs'
                        }`}>
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#ff6600] dark:text-orange-400 block mb-1">EXTERIOR / INTERIOR GRADE</span>
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
                                <span className="text-[10px] font-semibold text-slate-400">
                                  Checked: {activeListingItem.accidentHistory.reportDate}
                                </span>
                              )}
                            </div>
                            
                            <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-350">
                              {activeListingItem.accidentHistory.details}
                            </p>

                            <div className="mt-4 pt-3.5 border-t border-slate-200/40 dark:border-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-tight">
                                🔗 Share Verification Report:
                              </span>
                              
                              <div className="flex flex-wrap items-center gap-1.5 justify-end">
                                <button
                                  onClick={() => {
                                    const reportText = `Chaka Bangladesh Verified Status for ${activeListingItem.brand} ${activeListingItem.model} (${activeListingItem.year}):\nStatus: ${activeListingItem.accidentHistory?.hasAccidents ? 'Minor Claims Recorded' : 'Accident Free'}\nDetails: ${activeListingItem.accidentHistory?.details}\nLive link: ${window.location.href}`;
                                    navigator.clipboard.writeText(reportText);
                                    showToast('Report copied to clipboard!', 'success');
                                  }}
                                  className="h-7.5 px-2.5 rounded-lg bg-white hover:bg-slate-5 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-[10px] font-extrabold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
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
                  isDarkMode ? 'bg-amber-950/5 border-amber-950/20' : 'bg-amber-50/20 border-amber-200/50'
                }`}>
                  <div className="flex items-center gap-2 mb-2 text-amber-500 font-black text-xs uppercase tracking-wider">
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
                    <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center font-black text-[#ff6600] border border-orange-500/20 text-xs shrink-0 group-hover:scale-102 transition-transform">
                      {activeListingItem.showroomName ? 'SR' : 'PV'}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-xs font-black group-hover:text-[#ff6600] transition-colors truncate ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
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
                    className="shrink-0 h-7.5 px-3 rounded-lg text-[9px] bg-orange-500/10 hover:bg-orange-500/20 text-[#ff6600] dark:text-orange-400 border border-orange-500/22 font-black transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                  >
                    Visit
                  </button>
                </div>

                <div className={`p-5 rounded-3xl border space-y-4.5 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-500 block mb-1">Pricing & Negotiation</span>
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
                    <span className="text-[10.5px] text-slate-400 block mt-1 font-medium">Negotiable / Showroom price quote</span>
                  </div>

                  <div className="py-2.5 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-[#ff6600]" /> 
                        {activeListingItem.location}, {activeListingItem.division}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold"><Eye className="w-3.5 h-3.5 text-slate-400" /> {activeListingItem.views} views</span>
                    </div>
                    {activeListingItem.address && (
                      <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-[10.5px] text-slate-600 dark:text-slate-400 leading-normal font-semibold">
                        <span className="text-[#ff6600] dark:text-orange-500 font-black uppercase text-[9px] tracking-wider block mb-0.5">Custom Detailed Address:</span>
                        {activeListingItem.address}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartListingChat(activeListingItem)}
                        className="flex-1 h-11 text-center font-black py-2.5 px-4 bg-[#ff6600] hover:bg-[#eb5e00] text-white rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-xs"
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
                        className="w-full h-11 flex items-center justify-center gap-2 bg-[#ff6600] hover:bg-[#eb5e00] text-white font-extrabold text-[12.5px] rounded-xl cursor-pointer transition-all duration-150 shadow-xs"
                      >
                        <EyeOff className="w-4 h-4 text-white shrink-0" />
                        <span>Show Phone Number</span>
                      </button>
                    ) : (
                      <a 
                        href={`tel:${activeListingItem.sellerPhone}`}
                        className="w-full h-11 text-center font-bold py-2.5 px-4 bg-slate-950 dark:bg-slate-955/60 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#ff6600]" /> {activeListingItem.sellerPhone}
                      </a>
                    )}
                  </div>

                  <div className="mt-3.5 pt-3.5 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-[#ff6600] shrink-0 animate-bounce-subtle" />
                      <span className={`text-[11px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-805'}`}>
                        {language === 'bn' ? 'মূল্য অ্যালার্ট সেট করুন' : 'Set Price Alert'}
                      </span>
                    </div>

                    {(() => {
                      const activeAlert = priceAlerts.find(a => a.listingId === activeListingItem.id);
                      if (activeAlert) {
                        return (
                          <div className={`p-3 rounded-xl border text-xs space-y-2 ${
                            isDarkMode ? 'bg-orange-950/20 border-orange-800/40 text-slate-350' : 'bg-orange-50/40 border-orange-100 text-slate-705'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-[#ff6600] dark:text-orange-404 flex items-center gap-1 text-[10px]">
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
                                className="p-1 text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
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
                        );
                      }

                      return (
                        <div className="space-y-2">
                          <p className={`text-[10px] leading-relaxed font-semibold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
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
                                    : 'bg-slate-50 border-slate-200 focus:border-[#ff6600] focus:bg-white text-slate-800'
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
                      );
                    })()}
                  </div>
                  
                  <span className="text-[9px] text-[#ff6600] text-center block leading-relaxed pt-2 border-t border-solid border-slate-100 dark:border-slate-800/40">
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
          </div>
        )}

        {/* VIEW 4: SEPARATED ROLE DASHBOARDS VIEW */}
        {activeView === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg md:text-xl font-black tracking-tight capitalize">
                {currentRole === 'user' ? 'Seller Account Dashboard' : currentRole === 'showroom' ? 'Showroom Merchant Center' : 'Super Admin Gate'}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                {currentRole === 'user' 
                  ? 'Manage your active vehicle listings, upload ads, and reply to client inquiries.' 
                  : currentRole === 'showroom' 
                    ? 'Oversee your brand listings, view callback buyer leads, and configure storefront metrics.' 
                    : 'System mod queue, third party sponsored placements settings, and metrics performance.'}
              </p>
            </div>

            {currentRole === 'user' && (
              <DashboardUser 
                listings={listingsWithSyncedNames}
                chats={chats}
                activeChatId={activeChatId}
                onSelectChat={(id) => setActiveChatId(id)}
                onSendMessage={(chatId, text, senderId, image) => handleSendMessage(chatId, text, senderId, image)}
                onPostAd={(newAd) => handleAddNewAd(newAd)}
                onDeleteAd={(id) => handleDeleteAd(id)}
                onUpdateListing={(updated) => {
                  setListings((prev) => prev.map((l) => l.id === updated.id ? updated : l));
                  showToast('Listing updated successfully!', 'success');
                }}
                isDarkMode={isDarkMode}
                activeTab={userDashboardTab}
                onChangeTab={(tab) => {
                  setUserDashboardTab(tab);
                  window.location.hash = `#dashboard/${tab}`;
                }}
                userProfile={userProfile}
                onChangeUserProfile={(updated) => setUserProfile(updated)}
                onLogout={() => {
                  setCurrentRole('guest');
                  setActiveView('home');
                  showToast('Logged out of Seller account!', 'info');
                }}
                onViewPublicProfile={(profileId) => {
                  setSelectedProfileId(profileId);
                  changeView('profile', profileId);
                }}
              />
            )}

            {currentRole === 'showroom' && (
              <DashboardShowroom 
                listings={listingsWithSyncedNames}
                isDarkMode={isDarkMode}
                onPostAd={(newAd) => handleAddNewAd(newAd)}
                onDeleteAd={(id) => handleDeleteAd(id)}
                onUpdateListing={(updated) => {
                  setListings((prev) => prev.map((l) => l.id === updated.id ? updated : l));
                  showToast('Listing updated successfully!', 'success');
                }}
                showroomProfile={showroomProfile}
                onChangeShowroomProfile={(updated) => setShowroomProfile(updated)}
                activeTab={userDashboardTab}
                onChangeTab={(tab) => {
                  setUserDashboardTab(tab);
                  window.location.hash = `#dashboard/${tab}`;
                }}
                onLogout={() => {
                  setCurrentRole('guest');
                  setActiveView('home');
                  showToast('Logged out of Showroom merchant account!', 'info');
                }}
              />
            )}

            {currentRole === 'admin' && (
              <DashboardAdmin 
                listings={listingsWithSyncedNames}
                adSlots={adSlots}
                onToggleAdSlot={(id) => handleToggleAdSlot(id)}
                onUpdateAdSlot={(updatedAdSlot) => {
                  setAdSlots(prev => prev.map(ad => ad.id === updatedAdSlot.id ? updatedAdSlot : ad));
                  showToast('Sponsor Ad spot configured and updated!', 'success');
                }}
                onApproveAd={(id) => {
                  setListings((prev) => prev.map((l) => l.id === id ? { ...l, status: 'Approved' } : l));
                  showToast('Ad listing verified and approved!', 'success');
                }}
                onRejectAd={(id) => {
                  setListings((prev) => prev.map((l) => l.id === id ? { ...l, status: 'Rejected' } : l));
                  showToast('Ad listing has been removed from index.', 'error');
                }}
                onDeleteListing={(id) => handleDeleteAd(id)}
                onUpdateListing={(updated) => {
                  setListings((prev) => prev.map((l) => {
                    if (l.id === updated.id) {
                      const wasPriceLowered = updated.price < l.price;
                      return {
                        ...updated,
                        originalPrice: wasPriceLowered ? (l.originalPrice || l.price) : updated.originalPrice
                      };
                    }
                    return l;
                  }));
                  showToast('Listing updated successfully!', 'success');
                }}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        )}

        {/* VIEW 5: JP AUCTION VERIFICATION SEARCH ENGINE */}
        {activeView === 'auction-verify' && (
          <AuctionVerify 
            isDarkMode={isDarkMode} 
            showToast={(msg, type) => showToast(msg, type || 'success')}
          />
        )}

        {/* DYNAMIC LEGAL AND HELP PAGES */}
        {['terms', 'privacy', 'help', 'safety'].includes(activeView) && (
          <InfoPages
            language={language}
            isDarkMode={isDarkMode}
            activeSubView={activeView as 'terms' | 'privacy' | 'help' | 'safety'}
            onChangeView={(view) => changeView(view)}
            showToast={(msg, type) => showToast(msg, type || 'success')}
          />
        )}

        {/* VIEW 6: USER / SELLER DETAILED PROFILE VIEW */}
        {activeView === 'profile' && selectedProfileId && (
          <UserProfile
            userId={selectedProfileId}
            listings={listingsWithSyncedNames}
            isDarkMode={isDarkMode}
            isFollowed={Array.isArray(followedSellers) && followedSellers.includes(selectedProfileId)}
            userProfile={userProfile}
            showroomProfile={showroomProfile}
            onToggleFollow={(userId) => {
              setFollowedSellers((prev) => {
                const currentList = Array.isArray(prev) ? prev : [];
                const updated = currentList.includes(userId)
                  ? currentList.filter((id) => id !== userId)
                  : [...currentList, userId];
                showToast(
                  currentList.includes(userId)
                    ? 'Unfollowed this seller successfully.'
                    : 'You are now following this seller! Any updates will be notified.',
                  'success'
                );
                return updated;
              });
            }}
            onSelectListing={(id) => changeView('listing', id)}
            onBack={() => {
              if (selectedListingId) {
                changeView('listing', selectedListingId);
              } else {
                changeView('browse');
              }
            }}
          />
        )}

      </main>

      {/* GLOBAL FOOTER */}
      <Footer 
        isDarkMode={isDarkMode} 
        onChangeView={(view, category) => changeView(view, category || null)} 
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      {/* FEEDBACK & SUGGESTION REPORT MODAL OVERLAY */}
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        isDarkMode={isDarkMode} 
      />

      {/* INTERACTIVE REPORT AD & ABUSE MODAL OVERLAY */}
      {isReportOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs cursor-pointer transition-opacity" 
            onClick={() => setIsReportOpen(false)}
          />
          
          <div className={`relative max-w-md w-full rounded-3xl border p-6 shadow-2xl overflow-hidden transition-all duration-300 animate-slide-in z-10 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-slate-100' 
              : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="h-1 w-24 bg-orange-500 rounded-full mx-auto mb-4" />

            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-xl bg-orange-500/10 text-orange-500 shrink-0">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h3 className="font-extrabold text-sm md:text-base">Report Listing or Abuse</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-404">We investigate listings within 2 hours. Help keep Chaka Bangladesh authentic.</p>
              </div>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-[#ff6600] mb-1.5">Select Abuse Type / Reason</label>
                <div className="relative">
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border outline-none text-xs ${
                      isDarkMode 
                        ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-orange-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-orange-505'
                    }`}
                  >
                    <option value="Fake or mismatched specifications">Fake or mismatched specifications</option>
                    <option value="Fraudulent seller custom description">Fraudulent seller custom description</option>
                    <option value="Incorrect pricing details / bait-and-switch">Incorrect pricing details / bait-and-switch</option>
                    <option value="Stolen or invalid license / documentations">Stolen or invalid license / documentations</option>
                    <option value="Visual spam or duplicative listing text">Visual spam or duplicative listing text</option>
                    <option value="Seller unreachable or suspicious behavior">Seller unreachable or suspicious behavior</option>
                    <option value="Other abuse pattern">Other abuse pattern</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-[#ff6600] mb-1.5">Describe custom details / proof</label>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Please write relevant details describing correct specifications... (আমাদের আপনার অভিযোগের সঠিক বিবরণ দিন)"
                  rows={4}
                  required
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none resize-none ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-orange-505' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-orange-500'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!reportDetails.trim()) {
                    showToast('Please type custom description details to submit your report.', 'error');
                    return;
                  }
                  const reportId = `rep_${Date.now()}`;
                  try {
                    const savedReports = localStorage.getItem('chaka-reported-abuse-list');
                    const parsedReports = savedReports ? JSON.parse(savedReports) : [];
                    parsedReports.push({
                      id: reportId,
                      listingId: reportedListingId || 'general',
                      reason: reportReason,
                      details: reportDetails,
                      createdAt: new Date().toISOString()
                    });
                    localStorage.setItem('chaka-reported-abuse-list', JSON.stringify(parsedReports));
                  } catch (e) {
                    console.error("Local storage reporting error: ", e);
                  }

                  showToast('Your Abuse Report submitted successfully for quick audit.', 'success');
                  setIsReportOpen(false);
                  setReportDetails('');
                }}
                className="flex-1 py-2.5 bg-orange-650 hover:bg-orange-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-orange-650/15"
              >
                Send Abuse Report 🚨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARING DIALOG OVERLAY */}
      {isShareOpen && activeListingItem && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs cursor-pointer animate-fade-in"
            onClick={() => setIsShareOpen(false)}
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
                onClick={() => setIsShareOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <p className="text-[11px] text-slate-500 dark:text-slate-404 mb-5 leading-normal">
              Copy direct listing URL link or broadcast to social networks with friends.
            </p>

            <div className="grid grid-cols-3 gap-2.5 mb-5">
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                  showToast('Facebook sharing opened!', 'success');
                }}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-600/10 hover:bg-blue-600/15 border border-blue-600/10 text-blue-500 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5 mb-1.5 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-3H16.5v-2c0-.5.2-.7.8-.7H19V5h-2.5c-2 0-3 1-3 3v2.5H11v3h2.5V22h3v-8.5z"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-wider">Facebook</span>
              </button>

              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(`Check out this ${activeListingItem.brand} ${activeListingItem.model} on Chaka:`);
                  window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
                  showToast('WhatsApp sharing opened!', 'success');
                }}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-600/10 hover:bg-orange-600/15 border border-orange-600/10 text-orange-500 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5 mb-1.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.162 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.452 4.815 1.453 5.4 0 9.794-4.393 9.796-9.793.002-2.614-1.013-5.074-2.862-6.928C16.549 2.03 14.093.993 11.5 1.013c-5.4 0-9.794 4.393-9.796 9.794-.001 1.833.516 3.575 1.498 5.125L2.164 21.93l6.096-1.597h.387z"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-wider">WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  try {
                    const dummy = document.createElement('input');
                    document.body.appendChild(dummy);
                    dummy.value = window.location.href;
                    dummy.select();
                    document.execCommand('copy');
                    document.body.removeChild(dummy);
                    showToast('Direct Link Copied to Clipboard!', 'success');
                  } catch (err) {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Direct Link Copied!', 'success');
                  }
                }}
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
                value={window.location.href}
                className="flex-1 min-w-0 bg-transparent text-[10.5px] text-slate-400 outline-none pl-1"
              />
              <button
                onClick={() => {
                  try {
                    const dummy = document.createElement('input');
                    document.body.appendChild(dummy);
                    dummy.value = window.location.href;
                    dummy.select();
                    document.execCommand('copy');
                    document.body.removeChild(dummy);
                    showToast('Link Copied!', 'success');
                  } catch (err) {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Link Copied!', 'success');
                  }
                }}
                className="text-[10.5px] font-black text-[#ff6600] px-3 py-1.5 hover:bg-[#ff6600]/10 rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMMERSIVE MAGNIFYING GLASS LIGHTBOX OVERLAY */}
      {isLightboxOpen && activeListingItem && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-fade-in">
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
            <span className="text-xs font-black text-slate-300">
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
      {activeView === 'listing' && activeListingItem && showMobileStickyActions && (
        <div className="md:hidden fixed bottom-[82px] left-3 right-3 z-45 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-800 px-3 py-1.5 rounded-xl flex items-center justify-between gap-2 shadow-[0_4px_20px_rgba(2,154,108,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-2 duration-300 pr-safe pl-safe">
          <div className="flex-1 min-w-0">
            <h5 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none truncate">
              Contact Seller
            </h5>
            <span className="text-[9px] font-bold text-[#ff6600] dark:text-orange-400 block mt-0.5 leading-none">
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
                className="h-[32px] px-2 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-[#ff6600] dark:text-orange-400 flex items-center justify-center gap-1 rounded-lg font-bold text-[10px] transition-all active:scale-95 cursor-pointer shadow-sm text-center truncate max-w-[105px]"
              >
                <Phone className="w-3 h-3 fill-current text-[#ff6600] shrink-0" />
                <span className="truncate text-[9px]">{activeListingItem.sellerPhone}</span>
              </a>
            )}

            <button
              onClick={() => handleStartListingChat(activeListingItem)}
              className="h-[32px] px-3 bg-[#ff6600] hover:bg-[#eb5e00] text-white flex items-center justify-center gap-1 rounded-lg font-bold text-[11px] sm:text-xs transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-3 h-3 text-white/90 shrink-0" />
              <span>Chat</span>
            </button>
          </div>

          <button 
            onClick={() => setShowMobileStickyActions(false)}
            className="absolute -top-1 -right-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-750 dark:text-slate-500 dark:hover:text-white rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none cursor-pointer"
            title="Dismiss actions"
          >
            <X className="w-2.5 h-2.5 stroke-[2.5px]" />
          </button>
        </div>
      )}

      {/* MOBILE PERSISTENT BOTTOM NAVIGATION BAR */}
      <BottomNav 
        isDarkMode={isDarkMode} 
        activeView={activeView} 
        onChangeView={(view) => changeView(view)} 
        currentRole={currentRole}
        onChangeRole={(role) => setCurrentRole(role)}
        unreadChatsCount={chats.filter(c => c.messages.some(m => !m.isRead && m.senderId !== 'buyer')).length}
      />

      {toast && (
        <div className="fixed top-20 right-4 sm:right-6 z-[120] max-w-sm w-full animate-fade-in bg-slate-900/95 border border-slate-800 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            toast.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-400'
          }`}>
            {toast.type === 'error' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <span className="text-xs font-bold leading-normal text-slate-200">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
