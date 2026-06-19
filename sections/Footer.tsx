import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Shield, 
  Sparkles, 
  MapPin, 
  Mail, 
  PhoneCall, 
  HelpCircle, 
  FileText, 
  MessageSquare, 
  Bug, 
  Lightbulb, 
  X, 
  Send, 
  CheckCircle2,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Twitter
} from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
  onChangeView: (view: string, category?: string) => void;
  onOpenFeedback: () => void;
}

export default function Footer({ isDarkMode, onChangeView, onOpenFeedback }: FooterProps) {
  const { language, t } = useLanguage();
  return (
    <footer id="chaka-global-footer" className={`border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-900 text-slate-400' 
        : 'bg-white border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Profile section */}
          <div className="space-y-4">
            <div className="flex items-center animate-fade-in">
              <div className="relative flex items-center h-10 text-[#ff6600] dark:text-orange-400">
                <svg 
                  className="h-8.5 w-auto" 
                  viewBox="0 0 172 54" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* The CAD drafting/grid highlight lines on top of the roof structure */}
                  <path 
                    d="M48 6 L60 22 M75 3 L92 24 M110 5 L124 23 M130 9 L139 21 M58 20 L84 4 M88 18 L114 3 M118 19 L138 8" 
                    stroke="currentColor" 
                    strokeWidth="0.7" 
                    strokeOpacity="0.22" 
                  />
                  
                  {/* Main elegant wireframe/contour outline of the right-facing sportscar silhouette */}
                  <path 
                    d="M 5 35 
                       C 5 30, 4 20, 8 17 
                       C 11 14, 18 17, 20 15 
                       C 23 13.5, 27 10.5, 38 9 
                       C 52 7, 74 5.5, 100 6 
                       C 118 6.2, 130 9, 138 12.5
                       C 146 16, 149 18.5, 153 18.5
                       C 156 18.5, 159 19, 165 21.5
                       C 169 23, 170 25.5, 170.5 27.5
                       C 171 29, 170 30.2, 168.5 31
                       C 166.5 32, 164 32.5, 162 30
                       C 160.5 28.5, 159 27.5, 155 27.5
                       C 151 27.5, 142 28.5, 138 31
                       C 135.5 32.5, 135 35.5, 135 38
                       C 135 42.5, 134 44, 138 44.2
                       C 143 44.5, 149.5 43.5, 153 40.5
                       C 156 38, 155.5 36.5, 155 35
                       C 154.5 33.5, 156.5 32.5, 158 33
                       C 159.5 33.5, 159 35, 159 36.5
                       C 159 39, 155.5 44.5, 144 46.5
                       C 138 47.5, 129 46, 129 43
                       L 129 37
                       C 129 31, 104 30, 98 30
                       C 89 30, 74 31.5, 65 31.5
                       M 170.5 27.5
                       C 170.5 27.5, 168.5 29.2, 167.5 30
                       M 153 18.5
                       C 139 18.5, 118 19.2, 96 19.5" 
                    stroke="currentColor" 
                    strokeWidth="1.6" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />

                  {/* High accuracy styling details for front bumper / headlight layout */}
                  <path 
                    d="M139 20 C146 20.5, 152 22.5, 158 24 M156 27.5 C159 30, 161.5 30.5, 165 30" 
                    stroke="currentColor" 
                    strokeWidth="0.8" 
                    strokeOpacity="0.4"
                  />

                  {/* Bubbly 'Chaka' Text matching Fredoka font inside the vehicle outline wrapper */}
                  <text 
                    x="21" 
                    y="43" 
                    className="font-logo font-bold select-none text-[32px] tracking-tight" 
                    fill="currentColor"
                    style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}
                  >
                    Chaka
                  </text>
                </svg>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-slate-500 dark:text-slate-400">
              {language === 'bn' 
                ? 'বাংলাদেশের প্রিমিয়াম অটোমোবাইল মার্কেটপ্লেস এবং সার্টিফাইড জাপান অকশন শিট যাচাই করার বিশ্বস্ত নির্ভরযোগ্য প্ল্যাটফর্ম।' 
                : "Bangladesh's premium automobile marketplace and certified Japanese auction sheet verification platform. Get real pricing structures, detailed inspections, and trusted sellers."
              }
            </p>
            {/* Social media connections */}
            <div className="flex items-center gap-2.5 pt-2 animate-fade-in">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'border-slate-800 bg-slate-900/35 hover:border-orange-500 hover:text-orange-500' 
                    : 'border-slate-200 bg-slate-50 hover:border-orange-600 hover:text-[#ff6600] shadow-xs'
                }`}
                title="Connect on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'border-slate-800 bg-slate-900/35 hover:border-orange-500 hover:text-orange-500' 
                    : 'border-slate-200 bg-slate-50 hover:border-orange-600 hover:text-[#ff6600] shadow-xs'
                }`}
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'border-slate-800 bg-slate-900/35 hover:border-orange-500 hover:text-orange-500' 
                    : 'border-slate-200 bg-slate-50 hover:border-orange-600 hover:text-[#ff6600] shadow-xs'
                }`}
                title="Watch on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'border-slate-800 bg-slate-900/35 hover:border-orange-500 hover:text-orange-500' 
                    : 'border-slate-200 bg-slate-50 hover:border-orange-600 hover:text-[#ff6600] shadow-xs'
                }`}
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'border-slate-800 bg-slate-900/35 hover:border-orange-500 hover:text-orange-500' 
                    : 'border-slate-200 bg-slate-50 hover:border-orange-600 hover:text-[#ff6600] shadow-xs'
                }`}
                title="Follow on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Legal guidelines links - Privacy, Terms */}
          <div>
            <h4 id="footer-policies-title" className={`text-xs font-bold uppercase tracking-wider mb-4 ${
              isDarkMode ? 'text-slate-250' : 'text-slate-900'
            }`}>
              {language === 'bn' ? 'কোম্পানি এবং গাইড' : 'Company & Guides'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onChangeView('terms')}
                  className="hover:text-[#ff6600] dark:hover:text-orange-500 transition-colors flex items-center gap-1.5 text-left font-medium cursor-pointer bg-transparent border-0 p-0"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> {language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onChangeView('privacy')}
                  className="hover:text-[#ff6600] dark:hover:text-orange-500 transition-colors flex items-center gap-1.5 text-left font-medium cursor-pointer bg-transparent border-0 p-0"
                >
                  <Shield id="footer-privacy-icon" className="w-3.5 h-3.5 text-slate-400" /> {language === 'bn' ? 'গোপনীয়তা নীতিমালা' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onChangeView('help')}
                  className="hover:text-[#ff6600] dark:hover:text-orange-500 transition-colors flex items-center gap-1.5 text-left font-medium cursor-pointer bg-transparent border-0 p-0"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> {language === 'bn' ? 'সহায়তা কেন্দ্র ও প্রশ্নোত্তর' : 'Help Center & FAQ'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onChangeView('safety')}
                  className="hover:text-[#ff6600] dark:hover:text-orange-500 transition-colors flex items-center gap-1.5 text-left font-medium cursor-pointer bg-transparent border-0 p-0"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" /> {language === 'bn' ? 'নিরাপত্তা গাইড' : 'Safety Guide'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onChangeView('auction-verify')}
                  className="hover:text-orange-500 text-[#ff6600] font-black transition-all text-left flex items-center gap-1.5 cursor-pointer uppercase tracking-tight text-[11px] bg-transparent border-0 p-0"
                >
                  🇯🇵 {language === 'bn' ? 'জাপানিজ অকশন শিট ভেরিফাই' : 'Verify Japanese Auction Sheet'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts / Office Location details */}
          <div className="space-y-3">
            <h4 id="footer-contact-title" className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              isDarkMode ? 'text-slate-250' : 'text-slate-900'
            }`}>
              {language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-450">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff6600] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {language === 'bn' 
                    ? 'গুলশান এভিনিউ, রোড ৫৪, চাকা টাওয়ার, ঢাকা, বাংলাদেশ' 
                    : 'Gulshan Avenue, Road 54, Chaka Tower, Dhaka, Bangladesh'
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff6600] shrink-0" />
                <span>support@chaka.bd</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#ff6600] shrink-0" />
                <span className="font-bold">01886666018</span>
              </div>
            </div>
          </div>

          {/* App Download block - replaces Vehicles & Marketplace - now positioned on the far right */}
          <div className="md:justify-self-end w-full max-w-xs text-left">
            <h4 id="footer-categories-title" className={`text-xs font-black uppercase tracking-wider mb-4 ${
              isDarkMode ? 'text-slate-250' : 'text-slate-900'
            }`}>
              {language === 'bn' ? 'চাকা মোবাইল অ্যাপ' : 'Chaka Mobile App'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-semibold">
              {language === 'bn'
                ? 'অনলাইনে নির্ভরযোগ্য অকশন শিট রিপোর্ট, গাড়ির সঠিক বাজার মূল্যায়ন এবং লাইভ প্রাইস ড্র নোটিফিকেশন পেতে এক্ষুনি চাকা অ্যাপ ডাউনলোড করুন।'
                : 'Download the Chaka app to get instant auction sheet reports, vehicle valuations, and live price drop notifications in Bangladesh.'
              }
            </p>
            <div className="space-y-3">
              {/* Google Play Button */}
              <a 
                href="#download-play" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all border duration-250 ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500 text-slate-200 hover:shadow-lg' 
                    : 'bg-slate-50 border-slate-200 hover:border-[#ff6600] text-slate-800 hover:shadow-lg'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20.25a2.22 2.22 0 0 0 .15.8c.17.43.51.77.93.94a2.22 2.22 0 0 0 .8.15h14.24a2.22 2.22 0 0 0 .8-.15c.42-.17.76-.51.93-.94a2.22 2.22 0 0 0 .15-.8V3.75a2.22 2.22 0 0 0-.15-.8 2.37 2.37 0 0 0-.93-.94A2.22 2.22 0 0 0 19.12 1.86H4.88a2.22 2.22 0 0 0-.8.15c-.42.17-.76.51-.93.94a2.21 2.21 0 0 0-.15.8 Z" fill="#1E293B" className="dark:fill-slate-800" />
                  <path d="m5.25 3.86 6.84 6.84-6.84 6.84v-13.68z" fill="#0A5A53" />
                  <path d="m15.63 12-3.54-3.3-6.84-6.84h8.31a3 3 0 0 1 3 3v4.14L15.63 12z" fill="#0EA5E9" />
                  <path d="m11.19 12-5.94 5.94v.1a3 3 0 0 0 3 3h8.31a3 3 0 0 0 3-3V14.1L15.63 12H11.19z" fill="#10B981" />
                  <path d="M15.63 12h5.61c.42-.17.76-.51.93-.94.12-.3.15-.65.15-1.02V9.94a3 3 0 0 0-3-3l-2.73 2.52L15.63 12z" fill="#F59E0B" />
                </svg>
                <div className="text-left leading-tight">
                  <span className="text-[9px] block text-slate-400 font-bold uppercase tracking-wider">{language === 'bn' ? 'ডাউনলোড করুন' : 'GET IT ON'}</span>
                  <span className="text-xs font-black tracking-tight">{language === 'bn' ? 'গুগল প্লে স্টোর' : 'Google Play'}</span>
                </div>
              </a>

              {/* App Store Button */}
              <a 
                href="#download-appstore" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all border duration-250 ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500 text-slate-200 hover:shadow-lg' 
                    : 'bg-slate-50 border-slate-200 hover:border-[#ff6600] text-slate-800 hover:shadow-lg'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-1.95.84-2.65 1.65-.59.69-1.11 1.83-.97 2.95 1.05.08 2.1-.64 2.63-1.54Z" />
                </svg>
                <div className="text-left leading-tight">
                  <span className="text-[9px] block text-slate-400 font-bold uppercase tracking-wider">{language === 'bn' ? 'অ্যাপল স্টোর থেকে' : 'Download on the'}</span>
                  <span className="text-xs font-black tracking-tight">{language === 'bn' ? 'অ্যাপ স্টোর' : 'App Store'}</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom bar with signature block */}
        <div className={`mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
          isDarkMode ? 'border-slate-900' : 'border-slate-105'
        }`}>
          <div>
            {language === 'bn' 
              ? '© ২০২৬ চাকা বাংলাদেশ (Chaka.BD)। সর্বস্বত্ব সংরক্ষিত।' 
              : '© 2026 Chaka Bangladesh (Chaka.BD). All rights reserved.'
            }
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={onOpenFeedback}
              className={`flex items-center gap-1.5 py-1 px-2.5 rounded-md text-[11px] font-extrabold tracking-wide transition-all duration-200 cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-[#ff6600]/20 hover:text-orange-400' 
                  : 'bg-slate-50 border border-slate-100 text-slate-600 hover:bg-[#ff6600]/10 hover:text-[#ff6600]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> {language === 'bn' ? 'মতামত জানান' : 'Give Feedback'}
            </button>
            <span className="flex items-center gap-1 py-1 px-2.5 rounded-md bg-orange-500/10 text-[#ff6600] font-black tracking-wide">
              {language === 'bn' ? '🔒 এসএসএল সুরক্ষিত পেমেন্ট ভেরিফাইড' : '🔒 SSL Secured Payment Verified'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

