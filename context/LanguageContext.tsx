"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Header
    certifiedPortal: "Certified Portal",
    supportLine: "Support Line",
    japaneseAuction: "🇯🇵 Japanese Auction Sheet Verification",
    roleLabel: "Role:",
    selectRole: "Guest",
    sellerRole: "Seller",
    showroomRole: "Showroom",
    adminRole: "Admin",
    searchPlaceholder: "Search cars, brands, parts, services...",
    searchBtn: "Search",
    allCategories: "All Categories",
    postAd: "Post Free Ad",
    home: "Home",
    browse: "Browse",
    howItWorks: "How It Works",
    verifyAuction: "Verify Auction",
    showroom: "Showroom",
    myDashboard: "My Dashboard",
    recentSearches: "Recent Searches",
    clearAll: "Clear All",
    noRecentSearches: "No recent searches found",

    // Hero Section
    heroBadge: "🚘 BANGLADESH'S PREMIUM AUTO PORTAL",
    heroTitle: "Find Your Perfect Wheels In One Click",
    heroSubtitle: "Verified Japanese imports, direct showroom listings, and zero-risk auction reports.",
    statsShowrooms: "Verified Showrooms",
    statsActiveAds: "Active Regional Ads",
    statsLiveAuctions: "Verified Live Sheets",
    
    // Categories
    catAll: "All Direct Products",
    catCar: "Reconditioned Cars",
    catBike: "Bikes & Scooters",
    catParts: "Genuine Parts",
    catService: "Auto Services",
    catEv: "Electric Vehicles",
    catThreewheeler: "3-Wheelers",
    catBicycle: "Bicycles & Commutes",

    // Browse Title
    browseTitle: "Browse Vehicles by Division / Territory",
    regionalNode: "REGIONAL NODES ONLINE",
    browseSub: "Source direct local listings, regional active sellers, and localized dealer prices across Bangladesh's major territories.",

    // Division metadata taglines
    DhakaTagline: "Metro Mega Capital",
    ChittagongTagline: "Marine Port City",
    SylhetTagline: "Green Tea Canopy",
    RajshahiTagline: "Silk & Mango Plains",
    KhulnaTagline: "Sundarbans Delta",
    BarisalTagline: "Queen of Rivers",
    RangpurTagline: "Agro-Heritage Soil",
    MymensinghTagline: "Nature's Ridge Valley",

    // Custom sections
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Transact beautifully without middlemen on Bangladesh's premium open trading framework",
    step1Title: "1. Select & Compare",
    step1Desc: "Browse verified direct imports or authentic local showroom stocks seamlessly.",
    step2Title: "2. Verify Auction Sheet",
    step2Desc: "Enter chassis number to retrieve original, untampered Japanese auction reports instantly.",
    step3Title: "3. Direct Safe Deal",
    step3Desc: "Arrange physically certified inspections and transfer titles under secure escrows directly.",

    // Filters
    filterTitle: "Premium Filters",
    resetFilters: "Reset",
    keywordTitle: "🔍 SEARCH KEYWORD",
    keywordPlaceholder: "Search brand, model...",
    categoryTitle: "🚗 VEHICLE CATEGORY",
    conditionTitle: "✨ CONDITION SCORE",
    allConditions: "All Conditions",
    reconditioned: "Reconditioned (Imported)",
    used: "Used (Direct Owner)",
    new: "Brand New (Authorized)",
    priceRange: "💰 BUDGET LIMIT (BDT)",
    unlimited: "Unlimited Budget",
    divisionTitle: "📍 REGISTERED REGION",
    brandTitle: "🏆 BRAND SELECTOR",
    showMore: "Show More",
    showLess: "Show Less",

    // Listing Grid & Cards
    resultsFound: "Results Found",
    featuredAds: "Featured Smart Listings",
    verifiedDealer: "VERIFIED DEALER",
    memberAd: "ESTABLISHED MEMBER",
    auctionGrade: "Auction Grade:",
    auctionNotVerified: "Verification Report Unavailable",
    negotiable: "Negotiable",
    fixed: "Fixed Price",
    viewDetails: "View Details",
    callSeller: "Call Seller",
    chatNow: "Chat Now",

    // App Download Footer
    chakaAppTitle: "Chaka Mobile App",
    chakaAppDesc: "Download the Chaka app to get instant auction sheet reports, vehicle valuations, and live price drop notifications in Bangladesh.",
    playStore: "Google Play",
    appStore: "App Store",
    getItOn: "GET IT ON",
    downloadOn: "Download on the",

    // Live Sponsor Ads
    sponsoredPartner: "Sponsored partner",
    sponsoredLink: "Sponsored Link",
    claimOffer: "Claim Offer",

    // Generic words
    bdt: "৳",
    backToHome: "Back to Home",
    adId: "Ad ID:",
    views: "views",
    postedBy: "Posted by",
    location: "Location",
    description: "Description",
    specifications: "Technical Specifications",
    mileage: "Mileage",
    engine: "Engine",
    fuelType: "Fuel Type",
    transmission: "Transmission",
    year: "Year",
    safetyScore: "Safety Score",
    unverifiedWarning: "Verify auction sheets before dispatching cash.",
    contactSellerTitle: "Contact Seller",
    contactBengaliSub: "যোগাযোগ করুন",
    safetyTipsTitle: "Safety Tips for Buyers",
    safetyTip1: "Never pay advance deposits before physical trial.",
    safetyTip2: "Check chassis match on original Japanese chassis tags.",
    safetyTip3: "Meet in public, bright crowded spots during daylight.",
    relatedListings: "Related Automotive Listings",
    writeMessage: "Write a secure message...",
    send: "Send",
    verifiedShowroomLabel: "VERIFIED SHOWROOM",
    activeSellers: "Active regional sellers",
    hotlineContact: "Hotline Support Contact Number",
    selectDistrict: "Select District",
    selectArea: "Select Area",
    verifyAuctionTitle: "Instant Auction Report Verification",
    enterChassisNum: "Enter Japanese Chassis / Frame Code...",
    verifyBtn: "Retrieve Verified Sheet",
    sampleChassis: "Sample Chassis Code to Try:",
    unverifiedDisclaimer: "Disclaimer: This validation is powered directly by global Japanese auction databases. Please verify visual checks.",
    howVerifyWorks: "Verification Process Flow",
    howVerifySub: "Ensure complete transparency before making a deposit.",
    enterChassis: "Enter Chassis",
    queryEngine: "Secure Queries",
    pullReport: "Pull Original Sheet",
    viewGrade: "Verify Original Grade",
    notFoundChassis: "We couldn't retrieve the record. Please make sure the chassis number matches standard Japanese codes.",
    genuineSheet: "VERIFIED ORIGINAL SHEET FOUND",
    auctionInfo: "Original Auction Information",
    originalGrade: "Original JDM Auction Grade",
    exteriorInterior: "Exterior/Interior Condition Score:",
    mileageKm: "Genuine Mileage (KM):"
  },
  bn: {
    // Top Bar & Header
    certifiedPortal: "সার্টিফাইড পোর্টাল",
    supportLine: "সহায়তা লাইন",
    japaneseAuction: "🇯🇵 জাপানি অকশন শিট যাচাইকরণ",
    roleLabel: "ভূমিকা:",
    selectRole: "অতিথি",
    sellerRole: "বিক্রেতা",
    showroomRole: "শোরুম",
    adminRole: "এডমিন",
    searchPlaceholder: "গাড়ি, ব্র্যান্ড, পার্টস বা সার্ভিস খুঁজুন...",
    searchBtn: "অনুসন্ধান",
    allCategories: "সকল ক্যাটাগরি",
    postAd: "বিজ্ঞাপন দিন (ফ্রি)",
    home: "মূল পাতা",
    browse: "ব্রাউজ",
    howItWorks: "কার্যপ্রণালী",
    verifyAuction: "অকশন শিট যাচাই",
    showroom: "শোরুম",
    myDashboard: "আমার ড্যাশবোর্ড",
    recentSearches: "সাম্প্রতিক অনুসন্ধান",
    clearAll: "সব মুছুন",
    noRecentSearches: "কোন সাম্প্রতিক অনুসন্ধান পাওয়া যায়নি",

    // Hero Section
    heroBadge: "🚘 বাংলাদেশের প্রিমিয়াম অটোমোবাইল প্ল্যাটফর্ম",
    heroTitle: "এক ক্লিকেই পেয়ে যান আপনার স্বপ্নের গাড়ি",
    heroSubtitle: "সার্টিফাইড রিcondিশন গাড়ি, সরাসরি শোরুমের নির্ভরযোগ্য লিস্টিং এবং আসল অকশন রিপোর্ট।",
    statsShowrooms: "ভেরিফাইড শোরুম",
    statsActiveAds: "সক্রিয় বিজ্ঞাপন",
    statsLiveAuctions: "লাইভ অকশন শিট",

    // Categories
    catAll: "সকল প্রোডাক্ট",
    catCar: "রিকন্ডিশন গাড়ি",
    catBike: "মোটরসাইকেল ও স্কুটার",
    catParts: "জেনুইন পার্টস",
    catService: "অটো সার্ভিসিং",
    catEv: "ইলেকট্রিক গাড়ি",
    catThreewheeler: "থ্রি-হুইলার",
    catBicycle: "বাইসাইকেল ও নিত্যব্যবহার্য",

    // Browse Title
    browseTitle: "বিভাগ এবং অঞ্চল অনুযায়ী গাড়ি ব্রাউজ করুন",
    regionalNode: "অঞ্চলের নোড সক্রিয় আছে",
    browseSub: "বাংলাদেশের প্রধান অঞ্চল এবং বিভাগগুলো থেকে সরাসরি সেলার, শোরুম ও একদম আসল মূল্যের গাড়ি খুঁজে নিন।",

    // Division metadata taglines
    DhakaTagline: "মেট্রো মেগা ক্যাপিটাল",
    ChittagongTagline: "সামুদ্রিক পোর্ট সিটি",
    SylhetTagline: "সবুজ চা বাগান অঞ্চল",
    RajshahiTagline: "রেশম ও আমের সমভূমি",
    KhulnaTagline: "সুন্দরবন উপকূলীয় এলাকা",
    BarisalTagline: "নদীমাতৃক অঞ্চল",
    RangpurTagline: "কৃষি-ঐতিহ্য সমৃদ্ধ অঞ্চল",
    MymensinghTagline: "পাহাড়ি প্রকৃতি ও উপত্যকা",

    // Custom sections
    howItWorksTitle: "এটি কিভাবে কাজ করে",
    howItWorksSubtitle: "কোনো দালালি ছাড়া সরাসরি এবং নিরাপদে গাড়ি কেনা-বেচার আধুনিক পদ্ধতি",
    step1Title: "১. বাছাই ও তুলনা",
    step1Desc: "আমাদের বিশাল কালেকশন থেকে আপনার পছন্দের ভেরিফাইড গাড়িটি সহজেই সিলেক্ট করুন।",
    step2Title: "২. অকশন শিট যাচাই করুন",
    step2Desc: "গাড়ির চ্যাসিস নাম্বার দিয়ে সরাসরি জাপান থেকে আসল ও পরিবর্তনহীন অকশন শিট রিপোর্ট দেখুন।",
    step3Title: "৩. নিরাপদ সরাসরি ডিল",
    step3Desc: "সরাসরি শোরুমে বা মালিকের সাথে যোগাযোগ করে গাড়ি দেখে নিরাপদ পেমেন্টে ডিল ফাইনাল করুন।",

    // Filters
    filterTitle: "প্রিমিয়াম ফিল্টার",
    resetFilters: "রিসেট",
    keywordTitle: "🔍 কী-ওয়ার্ড দিয়ে সার্চ",
    keywordPlaceholder: "ব্র্যান্ড, মডেল ইত্যাদি...",
    categoryTitle: "🚗 গাড়ির ধরন",
    conditionTitle: "✨ গাড়ির কন্ডিশন",
    allConditions: "সকল কন্ডিশন",
    reconditioned: "রিকন্ডিশন্ড (আমদানিকৃত)",
    used: "ব্যবহৃত (ইউজড গাড়ি)",
    new: "ব্র্যান্ড নিউ (নতুন)",
    priceRange: "💰 সর্বোচ্চ বাজেট (টাকা)",
    unlimited: "সীমাহীন বাজেট",
    divisionTitle: "📍 নিবন্ধিত বিভাগ",
    brandTitle: "🏆 ব্র্যান্ড নির্বাচন",
    showMore: "আরো দেখুন",
    showLess: "কম দেখুন",

    // Listing Grid & Cards
    resultsFound: "টি গাড়ি পাওয়া গেছে",
    featuredAds: "প্রিমিয়াম স্মার্ট লিস্টিংস",
    verifiedDealer: "ভেরিফাইড ডিলার",
    memberAd: "প্রিমিয়াম মেম্বার",
    auctionGrade: "অকশন গ্রেড:",
    auctionNotVerified: "অকশন শিট রিপোর্ট ভেরিফাই করা হয়নি",
    negotiable: "আলোচনা সাপেক্ষ",
    fixed: "নির্ধারিত মূল্য",
    viewDetails: "বিস্তারিত দেখুন",
    callSeller: "কল করুন",
    chatNow: "চ্যাট করুন",

    // App Download Footer
    chakaAppTitle: "চাকা মোবাইল অ্যাপ",
    chakaAppDesc: "চাকা অ্যাপ ডাউনলোড করে তাৎক্ষনিক অকশন শিট ভেরিফিকেশন, কার ইভালুয়েশন এবং রিয়েল-টাইম প্রাইজ ড্রপ এলার্ট পান।",
    playStore: "গুগল প্লে স্টোর",
    appStore: "অ্যাপ স্টোর",
    getItOn: "ডাউনলোড করুন",
    downloadOn: "অ্যাপল স্টোর থেকে",

    // Live Sponsor Ads
    sponsoredPartner: "স্পন্সরড পার্টনার",
    sponsoredLink: "বিজ্ঞাপন লিঙ্ক",
    claimOffer: "অফারটি নিন",

    // Generic words
    bdt: "৳",
    backToHome: "মূল পাতায় ফিরুন",
    adId: "বিজ্ঞাপন আইডি:",
    views: "বার দেখা হয়েছে",
    postedBy: "পোস্ট করেছেন",
    location: "অবস্থান",
    description: "বিবরণ ও বিবরণী",
    specifications: "টেকনিক্যাল স্পেসিফিকেশন",
    mileage: "মাইলেজ",
    engine: "ইঞ্জিন ক্ষমতা",
    fuelType: "জ্বালানির ধরন",
    transmission: "গিয়ার ট্রান্সমিশন",
    year: "ম্যানুফ্যাকচার বছর",
    safetyScore: "নিরাপত্তা স্কোর",
    unverifiedWarning: "অগ্রিম পেমেন্ট করার আগে অবশ্যই গাড়ির চ্যাসিস ও অকশন শিট যাচাই করে নিন।",
    contactSellerTitle: "বিক্রেতার তথ্য",
    contactBengaliSub: "যোগাযোগ করুন",
    safetyTipsTitle: "ক্রেতাদের জন্য নিরাপত্তা পরামর্শ",
    safetyTip1: "সরাসরি গাড়ি টেস্ট ড্রাইভ করার আগে কখনো অগ্রিম বুকিং মানি দেবেন না।",
    safetyTip2: "গাড়ির বডি বা ইঞ্জিনের চ্যাসিস ব্র্যান্ড মেটাল ট্যাগের সাথে মিলিয়ে নিন।",
    safetyTip3: "দিনের আলোতে জনাকীর্ণ বা নিরাপদ স্থানে দেখা করে ডিল সম্পন্ন করুন।",
    relatedListings: "সম্পর্কিত অন্যান্য দুর্দান্ত গাড়ি",
    writeMessage: "নিরাপদ বার্তা লিখুন...",
    send: "পাঠান",
    verifiedShowroomLabel: "ভেরিফাইড শোরুম",
    activeSellers: "আমাদের সক্রিয় আঞ্চলিক বিক্রেতাগণ",
    hotlineContact: "হটলাইন সাপোর্ট কন্টাক্ট নাম্বার",
    selectDistrict: "জেলা নির্বাচন করুন",
    selectArea: "থানা/এলাকা নির্বাচন করুন",
    verifyAuctionTitle: "তাৎক্ষণিক অকশন রিপোর্ট ভেরিফিকেশন",
    enterChassisNum: "জাপানি চ্যাসিস বা ফ্রেম কোড লিখুন...",
    verifyBtn: "অরিজিনাল শিট দেখুন",
    sampleChassis: "টেস্ট করার জন্য নমুনা চ্যাসিস কোড:",
    unverifiedDisclaimer: "সতর্কতা: এই অকশন ভ্যালিডেশনটি সরাসরি জাপানি অকশন সার্ভার থেকে ডেটা রিট্রিভ করে। বাস্তব গাড়ি ক্রয়ের ক্ষেত্রে নিজ দায়িত্বে সমস্ত নথি ও বডি চেক করুন।",
    howVerifyWorks: "ভেরিফিকেশন কিভাবে কাজ করে",
    howVerifySub: "কোনো বুকিং মানি দেয়ার আগে এক ক্লিকে গাড়ির সত্যতা জেনে নিন।",
    enterChassis: "চ্যাসিস কোড ইনপুট",
    queryEngine: "সার্ভার সিকিউর কোয়েরি",
    pullReport: "অরিজিনাল শিট রিসিভ",
    viewGrade: "সরাসরি অকশন শিট ভিউ",
    notFoundChassis: "আমরা এই চ্যাসিস কোডটি খুঁজে পাইনি। দয়া করে সঠিক জাপানি স্ট্যান্ডার্ড কোড ব্যবহার করে আবার চেষ্টা করুন।",
    genuineSheet: "অরিজিনাল অকশন ভেরিফাইড শিট পাওয়া গেছে",
    auctionInfo: "মূল অকশন বিবরণ",
    originalGrade: "মূল অকশন গ্রেড স্কোর",
    exteriorInterior: "এক্সটেরিয়র/ইন্টেরিয়র গ্রেড কন্ডিশন:",
    mileageKm: "আসল চলাচলের দূরত্ব (মাইলেজ কি.মি.):"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => ''
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chaka-language');
      if (saved === 'bn' || saved === 'en') {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('chaka-language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
