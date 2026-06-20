import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Shield, 
  HelpCircle, 
  ShieldCheck, 
  Search, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  AlertTriangle, 
  Clock, 
  HeartHandshake, 
  MapPin, 
  Mail, 
  PhoneCall, 
  Send,
  Eye,
  Check,
  Settings,
  Sliders
} from 'lucide-react';

interface InfoPagesProps {
  language: 'en' | 'bn';
  isDarkMode: boolean;
  activeSubView: 'terms' | 'privacy' | 'help' | 'safety';
  onChangeView: (view: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export default function InfoPages({ 
  language, 
  isDarkMode, 
  activeSubView, 
  onChangeView, 
  showToast 
}: InfoPagesProps) {
  // Common states
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'buying' | 'selling' | 'verifying' | 'security'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);

  // Help Center form states
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportSubject, setSupportSubject] = useState('general');
  const [supportMessage, setSupportMessage] = useState('');
  const [isSubmittingSupport, setIsSubmittingSupport] = useState(false);

  // Safety checklist state
  const [checkedSafetyItems, setCheckedSafetyItems] = useState<string[]>([]);

  // Cookie Simulator state
  const [isCookieTrackingEnabled, setIsCookieTrackingEnabled] = useState(true);
  const [isLocationTrackingEnabled, setIsLocationTrackingEnabled] = useState(true);

  // Helper translations lookup
  const trans = {
    backBtn: language === 'bn' ? 'হোম পেইজে ফিরুন' : 'Back to Home',
    lastUpdated: language === 'bn' ? 'সর্বশেষ আপডেট: জুন ২০২৬' : 'Last Updated: June 2026',
    searchPlaceholder: language === 'bn' ? 'কীভাবে সাহায্য করতে পারি? প্রশ্ন খুঁজুন...' : 'How can we help? Search for questions...',
    contactTitle: language === 'bn' ? 'আমাদের সাথে সরাসরি যোগাযোগ করুন' : 'Contact Support Directly',
    contactDesc: language === 'bn' ? 'কোনো জিজ্ঞাসা থাকলে বা অ্যাকাউন্ট সংক্রান্ত কোনো সমস্যা হলে নিচে ফর্মটি পূরণ করুন' : 'Fill out the form below and active support agents will respond in under 2 hours.',
    nameLabel: language === 'bn' ? 'আপনার নাম' : 'Your Name',
    emailLabel: language === 'bn' ? 'ইমেইল এড্রেস' : 'Email Address',
    subjectLabel: language === 'bn' ? 'বিষয়ের ধরন' : 'Subject Category',
    msgLabel: language === 'bn' ? 'বিস্তারিত বার্তা' : 'Detailed Message',
    sendBtn: language === 'bn' ? 'বার্তা পাঠান' : 'Send Inquiry Message',
    submitting: language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Submitting...',
    faqCategories: {
      all: language === 'bn' ? 'সব প্রশ্ন' : 'All FAQs',
      buying: language === 'bn' ? 'গাড়ি ক্রয়' : 'Buying Cars',
      selling: language === 'bn' ? 'বিক্রয় গাইডলাইন' : 'Selling Ads',
      verifying: language === 'bn' ? 'অকশন শিট যাচাই' : 'Auction Sheets',
      security: language === 'bn' ? 'নিরাপত্তা' : 'Security'
    }
  };

  // 1. FAQ Data Definitions
  const faqData = useMemo(() => [
    {
      id: 1,
      category: 'buying' as const,
      q_en: 'How do I contact a vehicle seller safely?',
      q_bn: 'আমি কীভাবে নিরাপদে একজন গাড়ি বিক্রেতার সাথে যোগাযোগ করতে পারি?',
      a_en: 'You can securely use our built-in instant Chat features in Chaka Bangladesh, or click the "Contact Seller" buttons to access their phone numbers directly. We suggest meeting only in secure public locations like nearby local markets, petrol pumps, or registered showrooms during bright daylight.',
      a_bn: 'আপনি নিরাপদে চাকা বাংলাদেশ-এর ইন-বিল্ট চ্যাট ফিচার ব্যবহার করতে পারেন, অথবা সরাসরি ফোন নাম্বার দেখতে "বিক্রেতার সাথে যোগাযোগ করুন" বোতামে ক্লিক করতে পারেন। আমরা দিনের আলোতে জনাকীর্ণ পাবলিক প্লেস যেমন শোরুম, শপিং মল বা ফিলিং স্টেশনগুলোতে গাড়ি সরাসরি দেখার জন্য পরামর্শ দিই।'
    },
    {
      id: 2,
      category: 'verifying' as const,
      q_en: 'How reliable is the Japanese Auction Sheet Verification tool?',
      q_bn: 'জাপানি অটোমোবাইল অকশন শিট যাচাইকরণ কতটা নির্ভরযোগ্য?',
      a_en: 'Our verification database connects directly with reliable automotive records registries from Japan. By entering the chassis number, Chaka instantly verifies the real grade, mileage, exterior/interior codes, and inspects the condition map of your car to identify fake sheet fraud.',
      a_bn: 'আমাদের যাচাইকরণ ডেটাবেস সরাসরি জাপানের নির্ভরযোগ্য অটোমোটিভ রেকর্ডস রেজিস্ট্রির সাথে সংযুক্ত। চ্যাসিস নাম্বার প্রদানের সাথে সাথে গাড়ির প্রকৃত গ্রেড, মাইলেজ, এক্সটেরিওরের অবস্থা এবং অকশন শিট নকল করা হয়েছে কিনা তা স্বয়ংক্রিয়ভাবে ধরা সম্ভব হবে।'
    },
    {
      id: 3,
      category: 'selling' as const,
      q_en: 'What is the limit of free ads posting for single users?',
      q_bn: 'একজন সাধারণ ব্যবহারকারী কতটি ফ্রি বিজ্ঞাপন পোস্ট করতে পারেন?',
      a_en: 'Single users have a spacious limit to post up to 3 active vehicle advertisements simultaneously for free. If you manage a showroom or write commercial deals, verify your account as a "Showroom Merchant" to list unlimited inventory.',
      a_bn: 'একজন সাধারণ সদস্য একসাথে সর্বোচ্চ ৩টি গাড়ির লাইভ বিজ্ঞাপন একদম বিনামূল্যে পোস্ট করতে পারেন। আপনি যদি কোনো শোরুমের মালিক হয়ে থাকেন তবে চাকা প্লাস মার্চেন্ট অ্যাকাউন্ট ভেরিফাই করে আনলিমিটেড গাড়ি বিক্রি চালু করতে পারবেন।'
    },
    {
      id: 4,
      category: 'security' as const,
      q_en: 'How do I protect my account from credentials theft?',
      q_bn: 'অ্যাকাউন্টের সিকিউরিটি রক্ষা করতে কী করা উচিত?',
      a_en: 'Always use a strong, unique alphanumeric password. Chaka representatives will NEVER call you on WhatsApp, Telegram, or Viber to ask for your secure OTP codes or security keys. Report suspicious links to abuse@chaka.bd instantly.',
      a_bn: 'সবসময় বর্ণ এবং সংখ্যার সমন্বয়ে একটি শক্তিশালী ইউনিক পাসওয়ার্ড ব্যবহার করুন। চাকা বাংলাদেশ-এর কোনো কর্মীবৃন্দ আপনার কাছে কখনোই ফোন কল, হোয়াটসঅ্যাপ কিংবা ভাইবারে ওটিপি পাসকোড জানতে চাইবেন না।'
    },
    {
      id: 5,
      category: 'buying' as const,
      q_en: 'Does Chaka negotiate the price of cars for me?',
      q_bn: 'চাকা বাংলাদেশ কি ডিলারদের সাথে গাড়ির দাম নির্ধারণ করে দেয়?',
      a_en: 'No, Chaka Bangladesh operates as a secure, neutral marketplace. The prices specified in list ads are set by individual owners and showrooms. We provide average BDT valuation ranges to help you evaluate if the price is fair.',
      a_bn: 'না, চাকা বাংলাদেশ একটি নিরপেক্ষ বিজ্ঞাপন ক্লাসিফায়েড পোর্টাল। গাড়ির দাম সম্পূর্ণভাবে বিক্রেতারা নির্ধারণ করেন। আমরা শুধু একটি নির্ভরযোগ্য "বিডিটি ভ্যালুয়েশন গাইড" প্রদান করি যা বাজারের সঠিক অবস্থান জানতে সাহায্য করে।'
    },
    {
      id: 6,
      category: 'verifying' as const,
      q_en: 'What are Chaka Verified Showrooms?',
      q_bn: 'চাকা ভেরিফাইড শোরুম কী?',
      a_en: 'Verified Showrooms are merchant partners who underwent strict physically location checks and provided legal business license credentials. Buying cars from Chaka Verified Showrooms provides higher document reliability.',
      a_bn: 'ভেরিফাইড শোরুম হলো আমাদের সেই মার্চেন্ট পার্টনার যাদের ট্রেড লাইসেন্স এবং শোরুমের শারীরিক অবস্থান আমাদের টিম গিয়ে সরাসরি ভেরিফাই করেছে। এখান থেকে গাড়ি কিনলে কাগজের সত্যতা ও নির্ভরযোগ্যতা অনেক বেশি থাকে।'
    }
  ], []);

  // Filtered FAQs based on category & search query
  const filteredFaqs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesCategory = activeFaqCategory === 'all' || faq.category === activeFaqCategory;
      const q = faqSearchQuery.toLowerCase();
      const textToSearch = `${faq.q_en} ${faq.q_bn} ${faq.a_en} ${faq.a_bn}`.toLowerCase();
      const matchesSearch = textToSearch.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [faqData, activeFaqCategory, faqSearchQuery]);

  // Support Form submission simulator
  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMessage) {
      showToast(
        language === 'bn' ? 'তথ্য পূরণ করুন: নাম, ইমেইল এবং বার্তা আবশ্যক' : 'Please provide name, email, and description message.',
        'error'
      );
      return;
    }
    setIsSubmittingSupport(true);
    setTimeout(() => {
      setIsSubmittingSupport(false);
      showToast(
        language === 'bn' 
          ? 'ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে। সাপোর্ট টিম দ্রুত যোগাযোগ করবে।' 
          : 'Support Ticket #SK3389 submitted! Our desk will contact you via email shortly.',
        'success'
      );
      setSupportName('');
      setSupportEmail('');
      setSupportMessage('');
    }, 1200);
  };

  // Toggle checklist for inspection
  const toggleSafetyItem = (id: string) => {
    setCheckedSafetyItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 md:py-12 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Dynamic Navigation Header with Back trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => onChangeView('home')}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer border ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-orange-400 hover:border-orange-500/30' 
              : 'bg-white border-slate-200 text-slate-700 hover:text-primary hover:border-orange-600 shadow-xs'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{trans.backBtn}</span>
        </button>

        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg">
            {trans.lastUpdated}
          </span>
        </div>
      </div>

      {/* Tabs list specifically to switch inside legal view pages */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10 h-11.5 sm:h-12 bg-slate-900/5 dark:bg-slate-900/30 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onChangeView('terms')}
          className={`h-full text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-2 rounded-xl cursor-pointer transition-all ${
            activeSubView === 'terms'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{language === 'bn' ? 'শর্তাবলী' : 'Terms'}</span>
        </button>

        <button
          onClick={() => onChangeView('privacy')}
          className={`h-full text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-2 rounded-xl cursor-pointer transition-all ${
            activeSubView === 'privacy'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{language === 'bn' ? 'গোপনীয়তা' : 'Privacy'}</span>
        </button>

        <button
          onClick={() => onChangeView('help')}
          className={`h-full text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-2 rounded-xl cursor-pointer transition-all ${
            activeSubView === 'help'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{language === 'bn' ? 'হেল্প ডেস্ক' : 'FAQ / Support'}</span>
        </button>

        <button
          onClick={() => onChangeView('safety')}
          className={`h-full text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-2 rounded-xl cursor-pointer transition-all ${
            activeSubView === 'safety'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'bn' ? 'নিরাপত্তা গাইড' : 'Safety Guide'}</span>
        </button>
      </div>

      {/**********************************************************
       * SECTION A: TERMS OF SERVICE VIEW (TABULAR SCANNABLE CONTENTS)
       **********************************************************/}
      {activeSubView === 'terms' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <FileText className="w-7 h-7 text-primary" />
              <span>{language === 'bn' ? 'সার্ভিস ব্যবহারের শর্তাবলী' : 'Automobile Marketplace Terms of Service'}</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {language === 'bn' 
                ? 'চাকা বাংলাদেশ পোর্টাল ব্যবহারের নিয়ম নীতিসমূহ। আমরা সততা ও স্বচ্ছতা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।'
                : 'Please read our terms of platform service before navigating listings or setting price fall alerts to buy cars in Bangladesh.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left quick index panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className={`p-5 rounded-2xl border ${
                isDarkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-orange-500 mb-3.5">
                  {language === 'bn' ? 'শর্তগুলোর তালিকা' : 'Key Index of Terms'}
                </h3>
                <ul className="space-y-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>১. {language === 'bn' ? 'ভূমিকা ও চুক্তি' : 'Acceptance & Agreements'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>২. {language === 'bn' ? 'বিজ্ঞাপন ও বিবরণ' : 'Posting Quality Rules'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>৩. {language === 'bn' ? 'অকশন শিট সততা' : 'Japanese Sheets Integrity'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>৪. {language === 'bn' ? 'নিবন্ধিত ব্যবসায়ী' : 'Merchant & Showroom License'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>৫. {language === 'bn' ? 'দায়বদ্ধতা সীমাবদ্ধতা' : 'Limitation of Liability'}</span>
                  </li>
                </ul>
              </div>

              {/* Status card */}
              <div className="p-5 rounded-2xl bg-primary/10 dark:bg-orange-950/20 border border-orange-500/10 text-xs space-y-3">
                <div className="flex items-center gap-2 text-primary dark:text-orange-400 font-extrabold">
                  <HeartHandshake className="w-5 h-5 shrink-0" />
                  <span>{language === 'bn' ? 'আমাদের অঙ্গীকার' : 'User Security Promise'}</span>
                </div>
                <p className="leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                  {language === 'bn'
                    ? 'নকল অকশন শিট ও ফেক মাইলেজ প্রদানকারী আইডিকে সরাসরি কালো তালিকাভুক্ত করে আইনি ব্যবস্থা নেওয়া হতে পারে।'
                    : 'To defend buyers, listings submitting counterfeit auction sheets or tampered mileage values are subject to ban.'}
                </p>
              </div>
            </div>

            {/* Right details content details */}
            <div className="lg:col-span-8 space-y-6 max-h-[700px] overflow-y-auto pr-2 no-scrollbar">
              <div className={`p-6 rounded-2xl border ${isDarkMode ? 'border-slate-800 bg-slate-900/10' : 'border-slate-200 bg-white'}`}>
                <h3 className="text-sm font-black mb-2.5 text-slate-900 dark:text-slate-200">
                  {language === 'bn' ? '১. চুক্তির শর্তাবলীর গ্রহণযোগ্যতা' : '1. Acceptance of terms of use'}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                  {language === 'bn' 
                    ? 'চাকা বাংলাদেশ-এ বিজ্ঞাপন পোস্ট করা, ব্রাউজ করা কিংবা ফেক ভেরিফিকেশন ইঞ্জিন ব্যবহার করা মানে আপনি আমাদের সব গাইডলাইন ও নিয়ম মেনে নিচ্ছেন। আপনি যদি কোনো শর্তের বিপক্ষে থাকেন, তবে অনুগ্রহ করে সেবাটি থেকে বিরত থাকুন।'
                    : 'By browsing listings, setting custom target prices, rating showrooms, or validating chassis worksheets, you agree unconditionally to abide by these operating statutes. If you decline, please discontinue navigation.'}
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${isDarkMode ? 'border-slate-800 bg-slate-900/10' : 'border-slate-200 bg-white'}`}>
                <h3 className="text-sm font-black mb-2.5 text-slate-900 dark:text-slate-200">
                  {language === 'bn' ? '২. বিজ্ঞাপন পোস্ট করার স্পষ্ট নিয়মাবলী' : '2. Quality & Authenticity Guidelines'}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                  {language === 'bn' 
                    ? 'বিক্রেতারা চাকা প্ল্যাটফর্মে কোনো ভুল কিংবা বিভ্রান্তিকর তথ্য দিতে পারবেন না। গাড়ির প্রকৃত ছবি, সচল মোবাইল নাম্বার এবং লাইভ বিডিটি মূল্য উল্লেখ করা বাধ্যতামূলক। স্টক ছাড়া কোনো ফেক বিজ্ঞাপন পোস্ট করা আইনত দণ্ডনীয়।'
                    : 'Sellers are strictly forbidden from placing dummy pricing (like "1 BDT"), mock mileage, stock photos of non-existent vehicles, or duplicating lists. Actual car images, real specs, and true location division indicators are mandatory.'}
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${isDarkMode ? 'border-slate-800 bg-slate-900/10' : 'border-slate-200 bg-white'}`}>
                <h3 className="text-sm font-black mb-2.5 text-slate-900 dark:text-slate-200">
                  {language === 'bn' ? '৩. জাপানি অকশন শিট ও মাইলেজ সততা' : '3. Japanese Import Papers Integrity'}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                  {language === 'bn' 
                    ? 'রিকন্ডিশন্ড গাড়ি বিক্রয়ের ক্ষেত্রে অকশন শিটের কপি আপলোড করা অত্যন্ত উৎসাহিত করা হয়। আমাদের সিস্টেমে যদি ধরা পড়ে যে অকশন রিপোর্ট এডিটেড কিংবা মাইলেজ কম দেখিয়ে ক্রেতাকে ঠকানোর চেষ্টা করা হচ্ছে, তবে অ্যাকাউন্ট স্থায়ী নিষিদ্ধ করা হবে।'
                    : 'When listing reconditioned vehicles, supplying true chassis records is crucial. Our automated verification processes flag templates with modified star ratings or falsified run mileage. Counterfeit papers trigger absolute termination.'}
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${isDarkMode ? 'border-slate-800 bg-slate-900/10' : 'border-slate-200 bg-white'}`}>
                <h3 className="text-sm font-black mb-2.5 text-slate-900 dark:text-slate-200">
                  {language === 'bn' ? '৪. দায় ও ক্রয়ের দায়বদ্ধতা' : '4. Neutrality & Liability Exclusions'}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                  {language === 'bn' 
                    ? 'চাকা ক্রেতা ও বিক্রেতার মাঝে কোনো লেনদেন পরিচালনা করে না। ক্রয়ের পূর্বে গাড়ির ইঞ্জিন, চেসিস, কাগজ এবং টেকনিক্যাল অবস্থা যাচাই করার সম্পূর্ণ দায়িত্ব ক্রেতার। চাকা কোনো আর্থিক ক্ষতি বা আইনি বিরোধের জন্য দায়ী নয়।'
                    : 'Chaka acts solely as classified communication medium. We are not brokers. The evaluation of paper validity, technical mechanical condition, physical road tests, and cash transfer safety rests solely under the users stewardship.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/**********************************************************
       * SECTION B: PRIVACY POLICY VIEW (WITH PRIVACY SIMULATION)
       **********************************************************/}
      {activeSubView === 'privacy' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Shield className="w-7 h-7 text-primary" />
              <span>{language === 'bn' ? 'ব্যক্তিগত গোপনীয়তা নীতিমালা' : 'Data Privacy Policy & Protection'}</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {language === 'bn' 
                ? 'আপনার দেওয়া তথ্য চাকা বাংলাদেশে শতভাগ কিভাবে সুরক্ষিত ও নিরাপদে রক্ষণাবেক্ষণ করা হয় তা জানুন।'
                : 'Learn the exact mechanisms we use to protect your personal information, search histories, and list telemetry at Chaka.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive settings dashboard block */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`p-6 rounded-3xl border text-slate-800 dark:text-slate-200 text-xs space-y-4 ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-primary dark:text-orange-500 font-black tracking-wider uppercase text-[10px]">
                  <Settings className="w-4 h-4" />
                  <span>{language === 'bn' ? 'গোপনীয়তা কন্ট্রোল সেন্টার' : 'Privacy Control Panel'}</span>
                </div>
                <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold mb-3">
                  {language === 'bn' 
                    ? 'নিচের টগল বাটনগুলোর মাধ্যমে আপনি কি ধরণের ডাটা অন বা অফ রাখবেন তা নিয়ন্ত্রণ করার পূর্ণ ক্ষমতা আপনার রয়েছে।'
                    : 'We value your privacy by default. Toggle variables to customize telemetry variables without losing operational listing accessibility:'}
                </p>

                {/* Preference 1 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                  <div className="space-y-1 pr-3">
                    <span className="font-extrabold text-[11px] block">{language === 'bn' ? 'ব্রাউজার কুকিজ ট্র্যাকিং' : 'Analytical Storage Cookies'}</span>
                    <span className="text-[9.5px] text-slate-400 dark:text-slate-500 font-bold block leading-normal">
                      {language === 'bn' ? 'পছন্দের ক্যাটাগরি ও ফিল্টার মনে রাখার জন্য।' : 'Remembers search preference and selected categories.'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCookieTrackingEnabled(!isCookieTrackingEnabled);
                      showToast(
                        language === 'bn' ? 'কুকি সেটিংস আপডেট করা হয়েছে!' : 'Storage settings saved locally!',
                        'success'
                      );
                    }}
                    className={`w-9.5 h-5.5 rounded-full p-0.5 flex items-center transition-colors duration-200 cursor-pointer ${
                      isCookieTrackingEnabled ? 'bg-primary' : 'bg-slate-350 dark:bg-slate-800'
                    }`}
                  >
                    <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-xs transform duration-200 ${
                      isCookieTrackingEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Preference 2 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                  <div className="space-y-1 pr-3">
                    <span className="font-extrabold text-[11px] block">{language === 'bn' ? 'লোকেশন বেসড ভ্যালুয়েশন' : 'Location Telemetry'}</span>
                    <span className="text-[9.5px] text-slate-400 dark:text-slate-500 font-bold block leading-normal">
                      {language === 'bn' ? 'আপনার বিভাগের নিকটবর্তী গাড়িগুলো আগে প্রদর্শনের জন্য।' : 'Matches listings with nearest district & regional divisions.'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocationTrackingEnabled(!isLocationTrackingEnabled);
                      showToast(
                        language === 'bn' ? 'লোকেশন ট্র্যাকিং সেটিংস আপডেট হয়েছে!' : 'Location filters updated!',
                        'success'
                      );
                    }}
                    className={`w-9.5 h-5.5 rounded-full p-0.5 flex items-center transition-colors duration-200 cursor-pointer ${
                      isLocationTrackingEnabled ? 'bg-primary' : 'bg-slate-350 dark:bg-slate-800'
                    }`}
                  >
                    <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-xs transform duration-200 ${
                      isLocationTrackingEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      showToast(
                        language === 'bn' ? 'আপনার প্রোফাইল সংশ্লিষ্ট সকল ডেটা সেফলি জিপ ফাইলে এক্সপোর্ট হওয়া শুরু হয়েছে।' : 'User data export process generated for download!',
                        'info'
                      );
                    }}
                    className="w-full py-2 flex items-center justify-center gap-1.5 bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 border border-slate-800 dark:border-slate-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'ব্যক্তিগত ডেটা ডাউনলোড করুন' : 'Export My Personal Data (JSON)'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy details block */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 text-primary dark:text-orange-500 flex items-center justify-center shrink-0 font-extrabold text-sm">
                    ১
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      {language === 'bn' ? 'আমরা কী ধরনের ডাটা সংগ্রহ করি?' : 'What Data We Monitor'}
                    </h3>
                    <p className="text-xs sm:text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                      {language === 'bn' 
                        ? 'অ্যাকাউন্ট খোলার সময় আপনার নাম, ইমেইল এড্রেস, ফোন নাম্বার সংগ্রহ করা হয়। এছাড়াও বিজ্ঞাপন পোস্টিং এর জন্য আপনার সম্মতি সাপেক্ষে ছবি গ্যালারি এবং শোরুমের অবস্থান বিবরণী রেকর্ড করা হয়।'
                        : 'Registration details (User email labels, verified contact phone numbers), listing properties, physical vehicle image grids, and geolocation markers when sorting cars by proximity divisions.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 text-primary dark:text-orange-500 flex items-center justify-center shrink-0 font-extrabold text-sm">
                    ২
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      {language === 'bn' ? 'ডাটা সুরক্ষার প্রাতিষ্ঠানিক ব্যবস্থা' : 'Security Measures'}
                    </h3>
                    <p className="text-xs sm:text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                      {language === 'bn' 
                        ? 'আপনার পাসওয়ার্ড ক্রিপ্টোগ্রাফিকভাবে হ্যাশ আকারে সংরক্ষিত। ডাটাবেজে আপনার ব্যক্তিগত চ্যাপ লগ ও ফাইলসমূহ উন্নত ক্লাউড এনক্রিপশনে সুরক্ষিত রাখা হয়, যা কোনো তৃতীয় পক্ষের নিকট বিক্রয় করা অসম্ভব।'
                        : 'Credentials variables are protected using advanced server hashes. Database channels are restricted using tight security rule blueprints to enforce absolute authorization for showroom and catalog edits.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 text-primary dark:text-orange-500 flex items-center justify-center shrink-0 font-extrabold text-sm">
                    ৩
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      {language === 'bn' ? 'তৃতীয় পক্ষের কোড এবং প্রক্সি' : 'Third Party Proxies'}
                    </h3>
                    <p className="text-xs sm:text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                      {language === 'bn' 
                        ? 'আমরা ম্যাপ গ্রাউন্ড জেনারেশন ও জাপানিজ চ্যাসিস শিট তথ্য লোড করতে নিরাপদ এপিআই প্রক্সি ব্যবহার করি। আপনার ব্যক্তিগত চ্যাট কনভারসেশন কখনো অন্য কোনো কোম্পানির অ্যাড ট্র্যাকিং নেটওয়ার্কে শেয়ার করা হয় না।'
                        : 'Integrations with Google Maps Platform and premium image generators execute securely through server-side proxies, preventing exposure of sensitive browser traces or API signatures to network clients.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/**********************************************************
       * SECTION C: HELP CENTER & FAQ VIEW (FULLY INTERACTIVE WITH ACCORDIONS)
       **********************************************************/}
      {activeSubView === 'help' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <HelpCircle className="w-7 h-7 text-primary" />
              <span>{language === 'bn' ? 'সহায়তা কেন্দ্র ও সাধারণ প্রশ্নোত্তর' : 'Help Center & Frequently Asked'}</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-450 font-medium leading-relaxed">
              {language === 'bn' 
                ? 'চাকা প্ল্যাটফর্ম নিয়ে যেকোনো জিজ্ঞাসা ও সমস্যার সহজ সমাধান। আপনার সমস্যাটি লিখে ক্যাটাগরি অনুযায়ী খুঁজুন।'
                : 'Need immediate answers regarding buyer procedures, seller ad visibility, or auction sheet grading? Check our quick guide:'}
            </p>
          </div>

          {/* Search bar inside FAQ */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
            <input 
              type="text"
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              placeholder={trans.searchPlaceholder}
              className={`w-full pl-11 pr-5 py-3 rounded-2xl border text-xs sm:text-sm font-semibold outline-none transition-all ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-orange-500' 
                  : 'bg-white border-slate-200 text-slate-800 focus:border-primary focus:bg-slate-50/50 shadow-xs'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Category selection and FAQ list */}
            <div className="lg:col-span-7 space-y-5">
              {/* Horizontal Category Pill selector */}
              <div className="flex flex-wrap gap-2 pb-1.5 border-b border-slate-100 dark:border-slate-900">
                {(Object.keys(trans.faqCategories) as Array<keyof typeof trans.faqCategories>).map((catKey) => {
                  const label = trans.faqCategories[catKey];
                  const isActive = activeFaqCategory === catKey;
                  return (
                    <button
                      key={catKey}
                      onClick={() => setActiveFaqCategory(catKey as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold leading-normal transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-900/60 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Accordion FAQ items */}
              <div className="space-y-3.5">
                {filteredFaqs.length === 0 ? (
                  <div className="p-8 text-center text-xs font-bold text-slate-500 dark:text-slate-500 border border-dashed rounded-2xl border-slate-200 dark:border-slate-800">
                    {language === 'bn' ? 'কোনো প্রশ্নোত্তর খুঁজে পাওয়া যায়নি। অনুসন্ধান শব্দ পরিবর্তন করে দেখুন।' : 'No FAQs matched your active search filters.'}
                  </div>
                ) : (
                  filteredFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id;
                    const question = language === 'bn' ? faq.q_bn : faq.q_en;
                    const answer = language === 'bn' ? faq.a_bn : faq.a_en;

                    return (
                      <div 
                        key={faq.id}
                        className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                          isExpanded 
                            ? 'border-orange-200 dark:border-orange-800/40 bg-slate-50/30 dark:bg-slate-900/20' 
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-800'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left text-xs sm:text-sm font-extrabold cursor-pointer text-slate-800 dark:text-slate-200"
                        >
                          <span>{question}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <div className="px-5 pb-4.5 pt-1 border-t border-dashed border-slate-100 dark:border-slate-900 text-xs sm:text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                                {answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Custom Support Form Container */}
            <div className="lg:col-span-5">
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50/65 border-slate-200 bg-white'
              }`}>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1.5">{trans.contactTitle}</h3>
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold mb-4">{trans.contactDesc}</p>

                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-450 dark:text-slate-500 mb-1.5 block">
                      {trans.nameLabel} *
                    </label>
                    <input 
                      type="text"
                      required
                      value={supportName}
                      onChange={(e) => setSupportName(e.target.value)}
                      placeholder={language === 'bn' ? 'মো: কায়সার চৌধুরী' : 'e.g. Kaisar Choudhury'}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-orange-500' 
                          : 'bg-white border-slate-200 text-slate-800 focus:border-primary shadow-xs'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-450 dark:text-slate-500 mb-1.5 block">
                      {trans.emailLabel} *
                    </label>
                    <input 
                      type="email"
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      placeholder="kaisar@gmail.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-orange-500' 
                          : 'bg-white border-slate-200 text-slate-800 focus:border-primary shadow-xs'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-450 dark:text-slate-500 mb-1.5 block">
                      {trans.subjectLabel}
                    </label>
                    <select
                      value={supportSubject}
                      onChange={(e) => setSupportSubject(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-orange-500' 
                          : 'bg-white border-slate-200 text-slate-800 focus:border-primary shadow-xs'
                      }`}
                    >
                      <option value="general">{language === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'General Inquiries'}</option>
                      <option value="showroom">{language === 'bn' ? 'শোরুম মার্চেন্ট ভেরিফিকেশন' : 'Showroom Registration'}</option>
                      <option value="abuse">{language === 'bn' ? 'ভুল বিজ্ঞাপনের বিরুদ্ধে অভিযোগ' : 'Report Abuse Listing'}</option>
                      <option value="billing">{language === 'bn' ? 'বিলিং ও চাকা বুস্টিং' : 'Boosting Sponsors & Billing'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-450 dark:text-slate-500 mb-1.5 block">
                      {trans.msgLabel} *
                    </label>
                    <textarea 
                      rows={3}
                      required
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder={language === 'bn' ? 'আপনার সমস্যার বিস্তারিত এখানে লিখুন...' : 'Write details of inquiry message here...'}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold outline-none transition-all resize-none ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-orange-500' 
                          : 'bg-white border-slate-200 text-slate-800 focus:border-primary shadow-xs'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingSupport}
                    className="w-full py-2.5 bg-primary hover:bg-orange-600 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    {isSubmittingSupport ? (
                      <span>{trans.submitting}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{trans.sendBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/**********************************************************
       * SECTION D: SAFETY GUIDE VIEW (WITH INTERACTIVE CAR CHECKLIST)
       **********************************************************/}
      {activeSubView === 'safety' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <span>{language === 'bn' ? 'নিরাপদ গাড়ি ক্রয় গাইডলাইন' : 'Interactive Automobile Purchase Safety Guide'}</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {language === 'bn' 
                ? 'চাকা বাংলাদেশের সাথে নিরাপদে এবং ঝামেলাহীনভাবে গাড়ি বা মোটরসাইকেল ক্রয়ের জন্য গাইড এবং ফিজিক্যাল চেকলিস্ট।'
                : 'Avoid transactions scams. Utilize Chaka safety metrics to verify reconditioned cars physically in Bangladesh.'}
            </p>
          </div>

          {/* Alert Callout for Red Flags */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start ${
            isDarkMode ? 'bg-amber-950/10 border-amber-900/30 text-amber-200' : 'bg-amber-50/65 border-amber-100 text-amber-850'
          }`}>
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
            <div className="space-y-1.5 text-xs">
              <div className="font-extrabold uppercase tracking-wider text-[10.5px]">
                ⚠️ {language === 'bn' ? 'রেড ফ্ল্যাগ (জরুরী সতর্কতা)' : 'Critical Warning Red Flags'}
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                <li>{language === 'bn' ? 'গাড়ি স্বশরীরে দেখার আগে কখনোই এডভান্স টাকা বা বুকিং মানি পাঠাবেন না।' : 'Never send advance booking fee deposits prior to physical vehicle evaluation.'}</li>
                <li>{language === 'bn' ? 'গাড়ির কাগজ ও চেসিস নাম্বার না মিলিয়ে শোরুম বা বিক্রেতার সাথে চূড়ান্ত লেনদেন করবেন না।' : 'Avoid sellers who refuse to coordinate authentic BRTA document registration checkups.'}</li>
                <li>{language === 'bn' ? 'বাজার মূল্যের চেয়ে অস্বাভাবিক কম মূল্যে গাড়ি বিক্রয়ের লোভনীয় অফার অবশ্যই এড়িয়ে চলুন।' : 'Ignore unrealistically discounted price points designed to bait quick mobile transfers.'}</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step-by-Step physical inspection checklist */}
            <div className="lg:col-span-7 space-y-5">
              <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50/45 border-slate-200 bg-white'}`}>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Sliders className="w-4.5 h-4.5 text-primary" />
                  <span>{language === 'bn' ? 'যাচাইকরণ চেকলিস্ট (গাড়ি কেনার দিন)' : 'Mandatory Auto Inspection Checklist'}</span>
                </h3>
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold mb-4">
                  {language === 'bn' 
                    ? 'শোরুমে গিয়ে গাড়ি পরীক্ষার সময় নিচের পয়েন্টগুলো দেখে চেকলিস্টের ঘরে টিক চিহ্ন দিন:'
                    : 'Check off each critical item on your phone when physical inspecting the automobile at the showroom:'}
                </p>

                {/* 5 checklist points */}
                <div className="space-y-2.5">
                  {[
                    {
                      id: 'inspect_chassis',
                      label_en: 'Match the Chassis Number on vehicles build plate with import sheet.',
                      label_bn: 'গাড়ির বডি প্লেটের চেসিস নাম্বারের সাথে অরিজিনাল জাপানি অকশন শিটের চেসিস মিলানো।'
                    },
                    {
                      id: 'inspect_oil',
                      label_en: 'Pull the engine dipstick - look for dark milky oil (indicates coolant leaks).',
                      label_bn: 'ইঞ্জিন ডিপস্টিক টেনে ওয়েল পরীক্ষা করা - কালচে বা সাদা দুধ রঙের তলানি থাকলে ত্রুটি নির্দেশ করে।'
                    },
                    {
                      id: 'inspect_trans',
                      label_en: 'Switch gears under idle running to test for hard transmission cluck sounds.',
                      label_bn: 'গাড়ি স্টার্ট অবস্থায় গিয়ার পরিবর্তন করে গিয়ারবক্সের স্মুথনেস ও শক্ত শব্দ পরীক্ষা করা।'
                    },
                    {
                      id: 'inspect_rust',
                      label_en: 'Examine under the wheel arches and trunk spare tire well for deep rust.',
                      label_bn: 'চাকার নিচে ও অতিরিক্ত টায়ারের ড্রামে মারাত্মক জং বা বডি ড্যামেজ মেরামত করা হয়নি তা নিশ্চিত করা।'
                    },
                    {
                      id: 'inspect_papers',
                      label_en: 'Verify BRTA tax token and fitness certificate deadlines physically.',
                      label_bn: 'বিআরটিএ ট্যাক্স টোকেন এবং গাড়ির ফিটনেস সনদের সর্বশেষ ডেট পরীক্ষা করা।'
                    }
                  ].map((item) => {
                    const isChecked = checkedSafetyItems.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleSafetyItem(item.id)}
                        className={`w-full px-4 py-3 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${
                          isChecked 
                            ? 'border-orange-500/15 bg-orange-500/5 text-slate-800 dark:text-slate-200' 
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-800'
                        }`}
                      >
                        <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-primary border-primary text-white' : 'border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-900'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="font-semibold leading-relaxed">
                          {language === 'bn' ? item.label_bn : item.label_en}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Checklist score state feedback */}
                {checkedSafetyItems.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-black text-primary">
                    <span>
                      {language === 'bn' 
                        ? `${checkedSafetyItems.length} টি আইটেম সম্পূর্ণভাবে ভেরিফাইড!` 
                        : `${checkedSafetyItems.length} of 5 items inspected successfully!`}
                    </span>
                    {checkedSafetyItems.length === 5 && (
                      <span className="flex items-center gap-1 text-[10px] bg-orange-500/10 px-2 py-1 rounded-md">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {language === 'bn' ? 'নিরাপদ লেনদেন প্রস্তুত' : 'Good to Negotiate'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Seller & Showroom safety rules lists */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`p-6 rounded-3xl border ${isDarkMode ? 'border-slate-800 bg-slate-900/10' : 'border-slate-200 bg-white'}`}>
                <h3 className="text-xs font-black uppercase tracking-widest text-primary dark:text-orange-500 mb-3 block">
                  🛡️ {language === 'bn' ? 'নিরাপদ লেনদেনের ৪টি সূত্র' : 'The Golden Code of buying'}
                </h3>
                <ol className="space-y-4 text-xs font-semibold text-slate-500 dark:text-slate-400 leading-normal">
                  <li className="flex gap-3">
                    <span className="text-sm font-black text-slate-900 dark:text-slate-200 text-left w-4">01</span>
                    <span>
                      {language === 'bn' 
                        ? 'গাড়ির কাগজপত্র সর্বদা কোনো নিকটবর্তী কম্পিউটার সার্ভিসে নিয়ে গিয়ে বিআরটিএ ডেটাবেজে ভেরিফাই করুন।' 
                        : 'Confirm BRTA registrations details matches the smart card registry before signing ownership transfer papers.'}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sm font-black text-slate-900 dark:text-slate-200 text-left w-4">02</span>
                    <span>
                      {language === 'bn' 
                        ? 'গাড়িটি দিনের বেলা কোনো একজন নির্ভরযোগ্য মেকানিক নিয়ে শোরুমে এসে ভালো করে টেস্ট ড্রাইভ দিয়ে নিন।' 
                        : 'Bring along a certified local mechanical inspector when driving is permitted in showroom premises.'}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sm font-black text-slate-900 dark:text-slate-200 text-left w-4">03</span>
                    <span>
                      {language === 'bn' 
                        ? 'চূড়ান্ত অর্থ পরিশোধের জন্য ব্যাংক পে-অর্ডার অথবা সরাসরি পেপার এগ্রিমেন্টের মাধ্যমে ব্যাংক ট্রান্সফার শ্রেয়।' 
                        : 'Prefer Bank wire transfers, registered pay-orders, or standard direct showroom sales receipts over physical cash bag transfers.'}
                    </span>
                  </li>
                </ol>
              </div>

              {/* Extra helpline support support info */}
              <div className="p-5 rounded-2xl bg-slate-900/5 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-extrabold text-slate-800 dark:text-slate-200 block">
                  {language === 'bn' ? 'সাহায্য প্রয়োজন?' : 'Report Suspicious Activity?'}
                </span>
                <p className="leading-relaxed font-medium">
                  {language === 'bn'
                    ? 'কোনো অনিয়ম বা ভুয়া বিক্রেতা নজরে পড়লে বিজ্ঞাপনের নিচে "রিপোর্ট" বাটন চাপুন অথবা মেইল করুন support@chaka.bd ঠিকানায়।'
                    : 'If an active advertisement requests booking deposits before inspection, raise an instant abuse flag or report to us.'}
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}
