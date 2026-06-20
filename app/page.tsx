"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  VehicleListing, 
  ChatConversation, 
  AdvertisementSlot, 
  SearchFilters,
  PriceAlert
} from '@/types';
import { 
  ALL_INITIAL_LISTINGS, 
  INITIAL_AD_SLOTS, 
  formatBDT 
} from '@/lib/data';

import Header from '@/sections/Header';
import BottomNav from '@/sections/BottomNav';
import AuctionVerify from '@/sections/AuctionVerify';
import Footer from '@/sections/Footer';
import UserProfile from '@/sections/UserProfile';
import FeedbackModal from '@/components/FeedbackModal';
import MobileDrawer from '@/sections/MobileDrawer';
import InfoPages from '@/sections/InfoPages';

// Import dashboards
import DashboardUser from '@/sections/DashboardUser';
import DashboardShowroom from '@/sections/DashboardShowroom';
import DashboardAdmin from '@/sections/DashboardAdmin';

// Import new views/modals
import HomeView from '@/sections/HomeView';
import BrowseView from '@/sections/BrowseView';
import ListingDetailView from '@/sections/ListingDetailView';
import ShareModal from '@/components/ShareModal';
import ReportModal from '@/components/ReportModal';
import Container from '@/components/Container';

// Bangladesh divisions list
const BANGLADESH_DIVISIONS = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

export default function Home() {
  const { language, t } = useLanguage();
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);

  // Sorting Option
  const [sortBy, setSortBy] = useState<string>('newest');

  // Price Alerts Store in Local Storage
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Role selection: guest, user (Towsif Mahbub), showroom (Haq Bay Motors), admin (Super Admin)
  const [currentRole, setCurrentRole] = useState<'guest' | 'user' | 'showroom' | 'admin'>('guest');

  // User Profile details
  const [userProfile, setUserProfile] = useState({
    name: 'towsif mahbub',
    email: 'towsifmahbub@gmail.com',
    phone: '01712345678',
    location: 'Badda',
    division: 'Dhaka',
    avatarUrl: 'https://i.ibb.co.com/hf583h7/towsif.jpg',
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
  
  // Modal visibility states (managed at page level to pass props)
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [reportedListingId, setReportedListingId] = useState<string | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Followed sellers persistence
  const [followedSellers, setFollowedSellers] = useState<string[]>([]);

  // Core Data Lists with Local Storage Syncing
  const [listings, setListings] = useState<VehicleListing[]>([]);
  const [adSlots, setAdSlots] = useState<AdvertisementSlot[]>([]);

  // Simulated Chat Inbox
  const [chats, setChats] = useState<ChatConversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

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

  // Elegant Toast popup
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
          buyerName: 'Towsif Mahbub',
          messages: [
            {
              id: 'm1',
              senderId: 'buyer',
              senderName: 'Towsif Mahbub',
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
          buyerName: 'Towsif Mahbub',
          messages: [
            {
              id: 'm1_b',
              senderId: 'buyer',
              senderName: 'Towsif Mahbub',
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
          sellerName: userProfile?.name || 'Towsif Mahbub'
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

  // Dynamic URL / Routing Mechanism with Browser Hashes
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
    if (view === '/') {
      router.push('/');
      setActiveView('home');
    } else if (view === 'listing' && categoryOrId) {
      router.push(`/#listing/${categoryOrId}`);
      setSelectedListingId(categoryOrId);
      setActiveView('listing');
    } else if (view === 'profile' && categoryOrId) {
      router.push(`/#profile/${categoryOrId}`);
      setSelectedProfileId(categoryOrId);
      setActiveView('profile');
    } else if (view === 'browse') {
      if (categoryOrId && ['car', 'bike', 'commercial', 'ev', 'threewheeler', 'bicycle', 'parts', 'service'].includes(categoryOrId)) {
        setFilters((f) => ({ ...f, type: categoryOrId as any, brand: 'all' }));
        router.push(`/#browse/${categoryOrId}`);
      } else if (categoryOrId === 'all') {
        setFilters((f) => ({ ...f, type: 'all', brand: 'all' }));
        router.push('/#browse');
      } else {
        router.push('/#browse');
      }
      setActiveView('browse');
    } else if (view === 'dashboard') {
      if (categoryOrId === 'inbox') {
        router.push('/#dashboard/inbox');
        setUserDashboardTab('inbox');
      } else if (categoryOrId === 'post-ad') {
        router.push('/#dashboard/post-ad');
        setUserDashboardTab('post-ad');
      } else {
        router.push('/#dashboard');
        setUserDashboardTab('my-ads');
      }
      setActiveView('dashboard');
    } else if (view === 'auction-verify') {
      router.push('/#auction-verify');
      setActiveView('auction-verify');
    } else if (view === 'terms') {
      router.push('/#terms');
      setActiveView('terms');
    } else if (view === 'privacy') {
      router.push('/#privacy');
      setActiveView('privacy');
    } else if (view === 'help') {
      router.push('/#help');
      setActiveView('help');
    } else if (view === 'safety') {
      router.push('/#safety');
      setActiveView('safety');
    } else {
      router.push('/#home');
      setActiveView('home');
    }
  };

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
      buyerName: 'Towsif Mahbub',
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

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-955 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
      <main>
        <Container className="py-6 pb-24 md:pb-12 min-h-[60vh]">
        
        {/* VIEW 1: HOME VIEW */}
        {activeView === 'home' && (
          <HomeView
            listings={listings}
            adSlots={adSlots}
            isDarkMode={isDarkMode}
            homeViewMode={homeViewMode}
            setHomeViewMode={setHomeViewMode}
            filters={filters}
            setFilters={setFilters}
            changeView={changeView}
            language={language}
            t={t}
            showToast={showToast}
            mostViewedListingsForHome={mostViewedListingsForHome}
            BANGLADESH_DIVISIONS={BANGLADESH_DIVISIONS}
          />
        )}

        {/* VIEW 2: BROWSE ALL VEHICLES CATALOG VIEW */}
        {activeView === 'browse' && (
          <BrowseView
            listings={listings}
            filteredListings={filteredListings}
            isDarkMode={isDarkMode}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filters={filters}
            setFilters={setFilters}
            changeView={changeView}
            language={language}
            t={t}
            showToast={showToast}
            BANGLADESH_DIVISIONS={BANGLADESH_DIVISIONS}
          />
        )}

        {/* VIEW 3: DYNAMIC VEHICLE LISTING DETAIL VIEW */}
        {activeView === 'listing' && activeListingItem && (
          <ListingDetailView
            activeListingItem={activeListingItem}
            listings={listingsWithSyncedNames}
            isDarkMode={isDarkMode}
            watchlist={watchlist}
            handleToggleWatchlist={handleToggleWatchlist}
            language={language}
            t={t}
            changeView={changeView}
            priceAlerts={priceAlerts}
            setPriceAlerts={setPriceAlerts}
            setListings={setListings}
            adSlots={adSlots}
            handleStartListingChat={handleStartListingChat}
            showToast={showToast}
            onOpenReport={(listingId) => {
              setReportedListingId(listingId);
              setIsReportOpen(true);
            }}
            onOpenShare={() => setIsShareOpen(true)}
          />
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
                  router.push(`/#dashboard/${tab}`);
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
                  router.push(`/#dashboard/${tab}`);
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

        </Container>
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

      {/* REPORT AD & ABUSE MODAL OVERLAY */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        listingId={reportedListingId || ''}
        isDarkMode={isDarkMode}
        showToast={showToast}
      />

      {/* SHARING DIALOG OVERLAY */}
      {activeListingItem && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          listing={activeListingItem}
          isDarkMode={isDarkMode}
          showToast={showToast}
        />
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
