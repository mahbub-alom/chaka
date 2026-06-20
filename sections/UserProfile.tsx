import React, { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { VehicleListing } from '@/types';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Users, 
  Phone, 
  Mail, 
  Clock, 
  ShieldAlert, 
  Eye, 
  EyeOff,
  Grid,
  Star,
  Send,
  Sparkles
} from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { MOCK_SHOWROOMS } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

interface UserProfileProps {
  userId: string;
  listings: VehicleListing[];
  isDarkMode: boolean;
  isFollowed: boolean;
  onToggleFollow: (userId: string) => void;
  onSelectListing: (id: string) => void;
  onBack: () => void;
  userProfile?: any;
  showroomProfile?: any;
}

export default function UserProfile({
  userId,
  listings,
  isDarkMode,
  isFollowed,
  onToggleFollow,
  onSelectListing,
  onBack,
  userProfile,
  showroomProfile
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'about'>('listings');
  const [revealPhone, setRevealPhone] = useState(false);
  const { language } = useLanguage();

  const getJoinedDate = () => {
    if (userId === 'user_curr' || (userId && typeof userId === 'string' && userId.includes('curr')) || userId === 'user_1') {
      return 'Feb 15, 2022';
    }
    if (userId === 'sr_1' || userId === 'showroom_curr') {
      return 'Oct 08, 2019';
    }
    const sum = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 120);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[sum % 12];
    const day = (sum % 28) + 1;
    const year = 2021 + (sum % 4);
    return `${month} ${day}, ${year}`;
  };

  // Filter listings by this user
  const userListings = listings.filter((l) => l.userId === userId && l.status === 'Approved');
  
  // Extract user details from their listings, fallback, or query MOCK_SHOWROOMS registry
  const firstListing = userListings[0];
  const matchedShowroom = MOCK_SHOWROOMS.find((s) => s.id === userId);
  const isShowroom = !!matchedShowroom || userId.startsWith('sr_') || (firstListing?.sellerType === 'showroom');

  const isCurrentUser = userId === 'user_curr' || (userId && typeof userId === 'string' && userId.includes('curr')); 
  const isCurrentShowroom = userId === 'sr_1' || userId === 'showroom_curr';

  interface Review {
    id: string;
    reviewerName: string;
    rating: number;
    text: string;
    date: string;
  }

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(`chaka-seller-reviews-${userId}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const defaultReviews: Review[] = isShowroom 
      ? [
          {
            id: 'rev_1',
            reviewerName: 'Tamim Iqbal',
            rating: 5,
            text: 'Brought a reconditioned fuel-efficient hybrid from this dealer. Extremely smooth document transaction. Strongly recommend Haq Bay!',
            date: '2026-05-18'
          },
          {
            id: 'rev_2',
            reviewerName: 'Nashra Khan',
            rating: 5,
            text: 'We validated the genuine JP Auction Sheet directly from their verified desk. Fast and trustworthy.',
            date: '2026-06-02'
          },
          {
            id: 'rev_3',
            reviewerName: 'Siam Chowdhury',
            rating: 4,
            text: 'Friendly customer service. Showroom has a premium selection of SUVs and private sedans.',
            date: '2026-06-08'
          }
        ]
      : [
          {
            id: 'rev_1',
            reviewerName: 'Anik Rahman',
            rating: 5,
            text: 'Fantastic private seller! The car is beautifully polished and exactly as stated in specifications. Smooth register processing.',
            date: '2026-04-20'
          }
        ];
    return defaultReviews;
  });

  const [newReviewForm, setNewReviewForm] = useState({
    name: 'Anika Sultana',
    rating: 5,
    text: ''
  });
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.text.trim()) return;

    const newRev: Review = {
      id: `rev_${Date.now()}`,
      reviewerName: newReviewForm.name || 'Anonymous Buyer',
      rating: newReviewForm.rating,
      text: newReviewForm.text,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(`chaka-seller-reviews-${userId}`, JSON.stringify(updated));
    setNewReviewForm({ name: 'Anika Sultana', rating: 5, text: '' });
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const displayName = isCurrentUser 
    ? (userProfile?.name || 'Towsif Mahbub')
    : isCurrentShowroom
      ? (showroomProfile?.name || 'Haq Bay Motors')
      : isShowroom 
        ? (language === 'bn' ? 'ভেরিফাইড শোরুম' : 'Verified Showroom') 
        : (language === 'bn' ? 'ব্যক্তিগত বিক্রেতা' : 'Individual Seller');
  
  const sellerPhone = isCurrentUser
    ? (userProfile?.phone || '01712345678')
    : isCurrentShowroom
      ? (showroomProfile?.phone || '01711223344')
      : matchedShowroom 
        ? matchedShowroom.contactNumber 
        : (firstListing?.sellerPhone || '017XXXXXXXX');

  const location = isCurrentUser
    ? (userProfile?.location || 'Gulshan')
    : isCurrentShowroom
      ? (showroomProfile?.location || 'Tejgaon Industrial Area')
      : matchedShowroom 
        ? matchedShowroom.location 
        : (firstListing?.location || 'Dhaka');

  const division = isCurrentUser
    ? (userProfile?.division || 'Dhaka')
    : isCurrentShowroom
      ? (showroomProfile?.division || 'Dhaka')
      : (firstListing?.division || 'Dhaka');

  // Generate dynamic, realistic avatar image
  const avatarUrl = isCurrentUser
    ? (userProfile?.avatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150`)
    : isCurrentShowroom
      ? (showroomProfile?.avatarUrl || `https://images.unsplash.com/photo-1562575308-9e672757d475?auto=format&fit=crop&q=80&w=150&h=150`)
      : matchedShowroom
        ? matchedShowroom.logoUrl
        : isShowroom
          ? `https://images.unsplash.com/photo-1562575308-9e672757d475?auto=format&fit=crop&q=80&w=150&h=150`
          : `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150`;

  // Calculate stats
  const totalViews = userListings.reduce((sum, l) => sum + (l.views || 0), 0);
  const baseFollowers = matchedShowroom ? matchedShowroom.listingsCount * 12 + 15 : (isShowroom ? 248 : 23);
  const followersCount = baseFollowers + (isFollowed ? 1 : 0);

  // Custom Banner from Showroom if custom configured
  const hoverBannerBackground = matchedShowroom ? matchedShowroom.bannerUrl : null;

  return (
    <div id={`user-profile-container-${userId}`} className="space-y-6">
      {/* Back to previous view header button row */}
      <button
        onClick={onBack}
        className={`flex items-center gap-1.5 text-xs font-black py-2 md:py-2.5 px-4 rounded-xl transition-colors cursor-pointer ${
          isDarkMode ? 'bg-slate-900 text-slate-300 hover:text-white' : 'bg-slate-200/40 text-slate-700 hover:bg-slate-200'
        }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Return to Listings
      </button>

      {/* Main profile layout card setup */}
      <div className={`rounded-3xl border overflow-hidden relative shadow-lg ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Profile background cover */}
        <div 
          className="h-32 md:h-44 bg-gradient-to-r from-orange-950 via-[#ff6600]/80 to-teal-900 relative bg-cover bg-center"
          style={hoverBannerBackground ? { backgroundImage: `url(${hoverBannerBackground})` } : undefined}
        >
          <div className="absolute inset-0 bg-slate-950/20 backdrop-brightness-75" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-neutral-900 to-slate-950"></div>
          {/* Subtle decoration labels in margins to look ultra clean */}
          <span className="absolute bottom-3 right-5 text-[10px] uppercase font-black tracking-widest text-orange-300/30 select-none">
            Chaka Verified Network
          </span>
        </div>

        {/* Profile header content row */}
        <div className="px-6 pb-6 relative pt-12 md:pt-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
          
          {/* Photo and general name columns */}
          <div className="absolute -top-12 md:-top-16 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0">
            <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full border-4 overflow-hidden relative shadow-md bg-slate-950 ${
              isDarkMode ? 'border-slate-800' : 'border-white'
            }`}>
              <img 
                referrerPolicy="no-referrer"
                src={avatarUrl} 
                alt={displayName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left md:pl-32 mt-2 md:mt-0 flex-1 space-y-1.5">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h2 className="text-lg md:text-xl font-black tracking-tight flex items-center justify-center md:justify-start gap-1.5">
                {displayName}
                {isShowroom ? (
                  <span className="text-[10px] bg-sky-500/15 text-sky-400 font-extrabold px-2 py-0.5 rounded-full border border-sky-500/25 inline-flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 fill-sky-950/20" /> Verified Partner
                  </span>
                ) : (
                  <span className="text-[10px] bg-orange-500/15 text-orange-400 font-extrabold px-2 py-0.5 rounded-full border border-orange-500/25 inline-flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 fill-orange-950/20" /> Verified Seller
                  </span>
                )}
              </h2>
            </div>

            <p className="text-xs text-slate-400 font-semibold flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {location}, {division}</span>
              <span className="text-slate-500">&bull;</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Member since {getJoinedDate()}</span>
            </p>
          </div>

          {/* Followers count and Follow action button */}
          <div className="flex items-center gap-3.5 self-center md:self-end mt-4 md:mt-0">
            <div className="text-center border-r pr-4 dark:border-slate-800 border-slate-100">
              <span className="text-xs text-slate-450 block uppercase tracking-wider font-extrabold">Followers</span>
              <span className="text-sm md:text-base font-black text-orange-500 flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5" /> {followersCount}
              </span>
            </div>

            {isCurrentUser || isCurrentShowroom ? (
              <Link
                id="profile-post-ad-direct-btn"
                href="/#dashboard/post-ad"
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-orange-500 hover:bg-orange-400 text-white shadow-md hover:shadow-orange-500/20 transition-all transform hover:scale-102 flex items-center gap-1.5 cursor-pointer"
              >
                📢 Post an Ad
              </Link>
            ) : (
              <button
                id={`follow-profile-btn-${userId}`}
                onClick={() => onToggleFollow(userId)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all transform hover:scale-102 flex items-center gap-1 cursor-pointer select-none ${
                  isFollowed
                    ? 'bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500/20'
                    : 'bg-orange-500 hover:bg-orange-400 text-neutral-950 shadow-md font-black hover:shadow-orange-500/20'
                }`}
              >
                {isFollowed ? 'Unfollow' : 'Follow Seller'}
              </button>
            )}
          </div>
        </div>

        {/* Informative Stats Columns line */}
        <div className={`mx-6 py-4 border-t grid grid-cols-2 gap-2 text-center text-xs ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div>
            <span className="text-slate-500 block font-bold text-[10px] uppercase">Registered Ads</span>
            <span className="font-extrabold text-[#ff6600] dark:text-orange-400">{userListings.length} Active</span>
          </div>
          <div>
            <span className="text-slate-500 block font-bold text-[10px] uppercase">Total Views</span>
            <span className="font-extrabold text-[#ff6600] dark:text-orange-400 flex items-center justify-center gap-0.5">
              <Eye className="w-3.5 h-3.5" /> {totalViews.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Sections and main view grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left pane: Profile details, Quick call and strict Security notice */}
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-500">
              📞 Contact Information
            </h3>
            
            <div className="space-y-3 text-xs font-semibold">
              {!revealPhone ? (
                <button
                  type="button"
                  onClick={() => setRevealPhone(true)}
                  className="w-full h-11 flex items-center justify-center gap-2 bg-[#ff6600] hover:bg-[#eb5e00] text-white font-extrabold text-[13px] rounded-xl cursor-pointer transition-all duration-150 font-sans shadow-sm"
                >
                  <EyeOff className="w-4.5 h-4.5 text-white shrink-0" />
                  <span>Show Phone Number</span>
                </button>
              ) : (
                <a 
                  href={`tel:${sellerPhone}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl border dark:border-slate-800 border-slate-200 hover:bg-[#ff6600]/10 hover:border-orange-500/20 transition-all cursor-pointer w-full"
                >
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Phone call Support</span>
                    <span className="font-extrabold text-xs">{sellerPhone}</span>
                  </div>
                  </a>
              )}

              <div className="flex items-center gap-2 p-2.5 rounded-xl border dark:border-slate-800 border-slate-200">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Email Address</span>
                  <span className="font-extrabold break-all">{displayName.toLowerCase().replace(/[^a-z0-9]/g, '')}@chaka.bd</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border dark:border-slate-800 border-slate-200">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Availability</span>
                  <span className="font-extrabold">{isShowroom ? '10:00 AM - 08:30 PM (Sat-Thu)' : 'Everyday: 09:00 AM - 10:00 PM'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* MANDATORY: Link sharing restriction module */}
          <div className="p-4 rounded-2xl border border-rose-500/10 bg-rose-500/5 space-y-3">
            <h4 className="text-xs font-black uppercase text-rose-500 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" /> Security Protocol
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              <strong>🔒 External Links Forbidden:</strong> For safety and security of all users, sharing external third-party links (like Facebook, YouTube, or private websites) is strictly forbidden. Complete your deals 100% securely directly on Chaka.
            </p>
            <div className="px-2.5 py-1 rounded bg-slate-950/40 border border-slate-800 text-[9px] uppercase tracking-wider text-rose-300 font-extrabold select-none">
              🔒 No External Links Policy Active
            </div>
          </div>
        </div>

        {/* Right pane: Core listing list catalog and tabs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4">
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-2.5 text-xs font-black uppercase tracking-wider relative transition-all cursor-pointer ${
                activeTab === 'listings'
                  ? 'text-[#ff6600] border-b-2 border-[#ff6600]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Active Listings ({userListings.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-2.5 text-xs font-black uppercase tracking-wider relative transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'text-[#ff6600] border-b-2 border-[#ff6600]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Seller Overview
            </button>
          </div>

          {activeTab === 'listings' ? (
            userListings.length === 0 ? (
              <div className="text-center py-16 dark:bg-slate-900 bg-slate-50 rounded-2xl border border-dashed dark:border-slate-800">
                <Grid className="w-8 h-8 text-slate-500 mx-auto opacity-45 mb-2" />
                <p className="text-xs font-extrabold text-slate-400">No active listings listed right now!</p>
                <p className="text-[10px] text-slate-500 mt-1">This user currently has no approved or active public advertisements.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {userListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    isDarkMode={isDarkMode}
                    onSelect={onSelectListing}
                  />
                ))}
              </div>
            )
          ) : activeTab === 'about' ? (
            <div className={`p-5 rounded-2xl border leading-relaxed space-y-4 text-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <div>
                <h4 className="text-sm font-black text-orange-500 mb-1.5">Who is {displayName}?</h4>
                <p>
                  {isShowroom 
                    ? `Premium reconditioned Japanese and fresh-condition used cars are offered at competitive prices with certified auction sheets from our showroom ${displayName}. Call us today to lock in a secure deal via Chaka.`
                    : `${displayName} is a certified private member of the Chaka platform. Our goal is to ensure a premium buying experience with highly verified documents, authentic papers, and fair pricing.`}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-400 mb-1">Safety Trading Manual:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Physical inspection is mandatory before exchanging funds.</li>
                  <li>Check all vehicle registration chassis values in person at our Dhaka workshop.</li>
                  <li>In-app Chat enables immediate official records in case of dynamic complaints.</li>
                </ul>
              </div>
            </div>
          ) : (
            null
          )}

          {false && (
            <div className={`p-5 rounded-2xl border space-y-6 ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              {/* Header inside reviews tab */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-dashed border-slate-800/40">
                <div>
                  <h4 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Seller Trust & Verification Reviews
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Read feedback from certified car buyers or leave a fresh rating review.
                  </p>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded-xl border ${
                  isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-center">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-tight">Average</span>
                    <span className="text-lg font-black text-amber-500 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {averageRating}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-800/80 mx-1"></div>
                  <div className="text-center px-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-tight">Feedback</span>
                    <span className="text-xs font-extrabold text-slate-300 dark:text-slate-200">{reviews.length} Verified</span>
                  </div>
                </div>
              </div>

              {/* Form to submit review / rating */}
              <form onSubmit={handleAddReview} className={`p-4 rounded-xl border space-y-3.5 ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-orange-400">
                  <Sparkles className="w-3.5 h-3.5" /> Submit Guest Review for Seller
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Reviewer Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anika Sultana"
                      value={newReviewForm.name}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                      className={`w-full text-xs font-bold py-2 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Select Rating Points
                    </label>
                    <div className="flex gap-1.5 items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                          className="focus:outline-none transform hover:scale-110 active:scale-95 transition-all text-amber-450 cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${
                            star <= newReviewForm.rating ? 'fill-amber-405 text-amber-400' : 'text-slate-450'
                          }`} />
                        </button>
                      ))}
                      <span className="text-[11px] text-slate-400 font-extrabold ml-1.5">
                        ({newReviewForm.rating} / 5 Stars)
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Your Honest feedback *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Describe your purchasing experience, vehicle condition validation, paper processing, or behavior..."
                    value={newReviewForm.text}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, text: e.target.value })}
                    className={`w-full text-xs font-medium py-2 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {reviewSuccess && (
                  <div className="p-2 text-[10.5px] font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    👍 Thank you! Review submitted and added to this verified merchant rating center!
                  </div>
                )}

                <div className="text-right">
                  <button
                    type="submit"
                    className="text-xs bg-[#ff6600] hover:bg-[#eb5e00] text-white font-black py-2 px-4 rounded-xl cursor-pointer hover:shadow-lg transition-all inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Post Verified Review
                  </button>
                </div>
              </form>

              {/* Reviews lists */}
              <div className="space-y-4 pt-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">
                  Reviews Ledger ({reviews.length})
                </span>

                {reviews.length === 0 ? (
                  <div className="text-center py-6 text-slate-500">
                    <p className="text-xs font-bold text-slate-450">No ratings yet for this seller.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className={`p-4 rounded-xl border space-y-2 relative transition-all hover:translate-x-0.5 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 hover:bg-slate-950/80' : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex gap-2.5 items-center">
                            <div className="w-8 h-8 rounded-full bg-orange-500/10 text-[#ff6600] flex items-center justify-center font-black text-xs">
                              {rev.reviewerName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className={`text-xs font-black block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {rev.reviewerName}
                              </span>
                              <span className="text-[9px] text-slate-500 font-extrabold">{rev.date}</span>
                            </div>
                          </div>
                          
                          {/* Stars and verify tag */}
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex gap-0.5 text-amber-450">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-450'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[8px] bg-orange-500/15 text-orange-400 px-1.5 py-0.5 rounded uppercase font-black tracking-tight flex items-center gap-0.5">
                              ✓ Certified Deal
                            </span>
                          </div>
                        </div>

                        <p className={`text-xs font-medium leading-relaxed ${isDarkMode ? 'text-slate-350' : 'text-slate-650'}`}>
                          {rev.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export {};
