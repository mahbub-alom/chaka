import React, { useState } from 'react';
import { VehicleListing } from '@/types';
import { ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle, BarChart3, Star, User, Lock, LogOut, Settings, Check, TrendingUp, Zap, Camera, X, Edit, Trash2 } from 'lucide-react';
import { BANGLADESH_DIVISIONS, BANGLADESH_LOCATIONS, BANGLADESH_DISTRICTS_BY_DIVISION, BANGLADESH_AREAS_BY_DISTRICT } from '@/lib/data';
import PostAdForm from '@/sections/PostAdForm';
import { convertToWebP } from '@/utils/imageUtils';

interface DashboardShowroomProps {
  listings: VehicleListing[];
  isDarkMode: boolean;
  onPostAd: (newAd: Partial<VehicleListing>) => void;
  onDeleteAd?: (id: string) => void;
  onUpdateListing?: (updated: VehicleListing) => void;
  showroomProfile?: any;
  onChangeShowroomProfile?: (updated: any) => void;
  onLogout?: () => void;
  activeTab?: 'my-ads' | 'post-ad' | 'inbox' | 'pricing-tool' | 'profile';
  onChangeTab?: (tab: 'my-ads' | 'post-ad' | 'inbox' | 'pricing-tool' | 'profile') => void;
}

export default function DashboardShowroom({ 
  listings, 
  isDarkMode, 
  onPostAd,
  onDeleteAd,
  onUpdateListing,
  showroomProfile, 
  onChangeShowroomProfile, 
  onLogout,
  activeTab = 'my-ads',
  onChangeTab
}: DashboardShowroomProps) {
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const [localTab, setLocalTab] = useState<'my-ads' | 'post-ad' | 'inbox' | 'pricing-tool' | 'profile'>('my-ads');
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState('');
  
  const [editingListing, setEditingListing] = useState<VehicleListing | null>(null);
  const [inventoryEditForm, setInventoryEditForm] = useState({
    title: '',
    price: '',
    condition: 'Used' as any,
    mileage: '',
    engineCapacity: '',
    description: '',
    location: '',
  });

  const handleStartEdit = (listing: VehicleListing) => {
    setEditingListing(listing);
    setInventoryEditForm({
      title: listing.title.replace('[SOLD] ', ''),
      price: listing.price.toString(),
      condition: listing.condition,
      mileage: listing.mileage.toString(),
      engineCapacity: listing.engineCapacity,
      description: listing.description,
      location: listing.location,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingListing) return;

    const priceNum = Number(inventoryEditForm.price) || 0;
    const formatPriceBDT = (num: number) => {
      return `BDT ${num.toLocaleString('en-IN')}`;
    };

    const isCurrentlySold = editingListing.title.startsWith('[SOLD]') || (editingListing as any).isSold;

    const updated: VehicleListing = {
      ...editingListing,
      title: isCurrentlySold ? `[SOLD] ${inventoryEditForm.title}` : inventoryEditForm.title,
      price: priceNum,
      priceFormatted: formatPriceBDT(priceNum),
      condition: inventoryEditForm.condition,
      mileage: Number(inventoryEditForm.mileage) || 0,
      engineCapacity: inventoryEditForm.engineCapacity,
      description: inventoryEditForm.description,
      location: inventoryEditForm.location,
    };

    if (onUpdateListing) {
      onUpdateListing(updated);
    }
    setEditingListing(null);
  };

  const toggleSoldStatusLocal = (listing: VehicleListing) => {
    const isCurrentlySold = listing.title.startsWith('[SOLD]') || (listing as any).isSold;
    let newTitle = listing.title;
    if (isCurrentlySold) {
      newTitle = listing.title.replace('[SOLD] ', '');
    } else {
      newTitle = `[SOLD] ${listing.title}`;
    }

    const updated: VehicleListing = {
      ...listing,
      title: newTitle,
      isSold: !isCurrentlySold
    } as any;

    if (onUpdateListing) {
      onUpdateListing(updated);
    }
  };

  const [leadsList, setLeadsList] = useState([
    { id: 1, name: 'Sabbir Rahman', phone: '01711223344', car: 'Toyota Premio G 2018', text: 'I am interested in buying this car in cash. Please call me back with the final price.', date: 'Today, 11:30 AM' },
    { id: 2, name: 'Imran Hashmi', phone: '01822334455', car: 'Honda Civic Turbo 2020', text: 'Does it have a clean JP Auction Sheet? I would like to arrange an inspection in Tejgaon.', date: 'Yesterday, 4:15 PM' },
    { id: 3, name: 'Nabila Islam', phone: '01933445566', car: 'Mitsubishi Outlander 2019', text: 'Is registration paperwork support included in the listed price? Let me know the timeline.', date: '2 days ago' }
  ]);

  const resolvedTab = onChangeTab ? activeTab : localTab;

  const handleTabChange = (tab: 'my-ads' | 'post-ad' | 'inbox' | 'pricing-tool' | 'profile') => {
    if (onChangeTab) {
      onChangeTab(tab);
    } else {
      setLocalTab(tab);
    }
  };

  // Dynamic Seller Reviews Integration from Local Storage for Haq Bay Motors (id: "sr_1")
  const [reviews, setReviews] = useState<any[]>(() => {
    const saved = localStorage.getItem('chaka-seller-reviews-sr_1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [
      { id: 'rev_1', reviewerName: 'Tamim Iqbal', rating: 5, text: 'Brought a reconditioned fuel-efficient hybrid from this dealer. Extremely smooth document transaction. Strongly recommend Haq Bay!', date: '2 days ago' },
      { id: 'rev_2', reviewerName: 'Nashra Khan', rating: 5, text: 'We validated the genuine JP Auction Sheet directly from their verified desk. Fast and trustworthy.', date: '1 week ago' },
      { id: 'rev_3', reviewerName: 'Dr. Faisal Rahman', rating: 4, text: 'Polite personnel, clean negotiation room. Cars are well washed and ready for test drive.', date: '3 weeks ago' }
    ];
  });

  // Fallback defaults for profile
  const showroom = showroomProfile || {
    name: 'Haq Bay Motors',
    email: 'contact@haqbay.bd',
    phone: '01711223344',
    location: 'Tejgaon Industrial Area',
    division: 'Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1562575308-9e672757d475?auto=format&fit=crop&q=80&w=150&h=150',
    bannerUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    password: 'password123'
  };

  // Local states for editing showroom
  const [editForm, setEditForm] = useState({
    name: showroom.name,
    email: showroom.email,
    phone: showroom.phone || showroom.contactNumber || '',
    location: showroom.location,
    division: showroom.division || 'Dhaka',
    avatarUrl: showroom.avatarUrl || showroom.logoUrl || '',
    bannerUrl: showroom.bannerUrl
  });

  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    const defaultDiv = showroom.division || 'Dhaka';
    const defaultLoc = showroom.location || 'Gulshan 2';
    for (const [dist, areas] of Object.entries(BANGLADESH_AREAS_BY_DISTRICT)) {
      if (areas.includes(defaultLoc)) {
        return dist;
      }
    }
    return BANGLADESH_DISTRICTS_BY_DIVISION[defaultDiv]?.[0] || 'Dhaka';
  });

  React.useEffect(() => {
    if (showroomProfile) {
      setEditForm({
        name: showroomProfile.name || '',
        email: showroomProfile.email || '',
        phone: showroomProfile.phone || showroomProfile.contactNumber || '',
        location: showroomProfile.location || '',
        division: showroomProfile.division || 'Dhaka',
        avatarUrl: showroomProfile.avatarUrl || showroomProfile.logoUrl || '',
        bannerUrl: showroomProfile.bannerUrl || ''
      });
      const defaultDiv = showroomProfile.division || 'Dhaka';
      const defaultLoc = showroomProfile.location || '';
      let foundDist = BANGLADESH_DISTRICTS_BY_DIVISION[defaultDiv]?.[0] || 'Dhaka';
      for (const [dist, areas] of Object.entries(BANGLADESH_AREAS_BY_DISTRICT)) {
        if (areas.includes(defaultLoc)) {
          foundDist = dist;
          break;
        }
      }
      setSelectedDistrict(foundDist);
    }
  }, [showroomProfile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'bannerUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const maxDim = field === 'bannerUrl' ? 1200 : 400;
      const webpBase64 = await convertToWebP(file, maxDim, 0.85);
      
      setEditForm(prev => {
        const updated = {
          ...prev,
          [field]: webpBase64
        };
        if (onChangeShowroomProfile) {
          onChangeShowroomProfile({
            ...showroom,
            ...updated
          });
        }
        return updated;
      });
    } catch (err) {
      console.error('Failed to convert to WebP: ', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditForm(prev => {
          const updated = {
            ...prev,
            [field]: result
          };
          if (onChangeShowroomProfile) {
            onChangeShowroomProfile({
              ...showroom,
              ...updated
            });
          }
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState('');
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const handleSaveShowroomProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name || !editForm.email || !editForm.phone) {
      alert('Required data fields cannot be blank');
      return;
    }
    if (onChangeShowroomProfile) {
      onChangeShowroomProfile({
        ...showroom,
        ...editForm
      });
    }
    setSettingsSuccessMsg('Merchant showroom storefront details updated and synced!');
    setShowVerificationAlert(true);
    setTimeout(() => {
      setSettingsSuccessMsg('');
      setShowVerificationAlert(false);
    }, 4000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrorMsg('');
    setPasswordSuccessMsg('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordErrorMsg('Please fill out all credential verification fields.');
      return;
    }

    const currentProfilePassword = showroom?.password || 'password123';
    if (passwordForm.currentPassword !== currentProfilePassword) {
      setPasswordErrorMsg('Current password does not match our system records.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordErrorMsg('Your new secure password must contain at least 6 characters.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordErrorMsg('New password credentials and confirmation field do not match.');
      return;
    }

    if (onChangeShowroomProfile) {
      onChangeShowroomProfile({
        ...showroom,
        password: passwordForm.newPassword
      });
    }

    setPasswordSuccessMsg('Super admin credentials changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccessMsg(''), 4000);
  };

  // Filter listings made by this Showroom owner (userId: "sr_1")
  const showroomListings = listings.filter((l) => l.userId === 'sr_1');
  const featuredCount = showroomListings.filter((l) => l.isFeatured).length;

  const handleSimulateSaleResult = () => {
    setShowLeadsModal(true);
  };

  const promoteRandomAd = () => {
    setNotifyMsg("Inquiry boosted! Your showroom's most trending listing has successfully been highlighted on Chaka.");
    setIsUpgraded(true);
    setTimeout(() => {
      setNotifyMsg('');
    }, 5000);
  };

  return (
    <div id="showroom-dashboard" className="space-y-6">
      {notifyMsg && (
        <div className="p-4 rounded-2xl bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs flex justify-between items-center font-bold shadow-lg animate-fadeIn tracking-wide">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" /> {notifyMsg}
          </span>
          <button 
            onClick={() => setNotifyMsg('')}
            className="text-slate-400 hover:text-white underline text-[10px] cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {showLeadsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl border p-6 relative shadow-2xl transition-all ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex justify-between items-center pb-4 border-b border-slate-800/20 dark:border-slate-800/40 mb-4">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-orange-400" /> Active Buyer Leads Inquiry Tracker
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Real-time phone and callback logs registered by buyers browsing your showroom cars.</p>
              </div>
              <button 
                onClick={() => setShowLeadsModal(false)}
                className="p-1 rounded-xl bg-slate-800/10 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {leadsList.map((lead) => (
                <div 
                  key={lead.id} 
                  className={`p-4 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-slate-950 border-slate-800/80 hover:border-slate-800' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <span className={`text-xs font-black block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {lead.name}
                      </span>
                      <span className="text-[10px] font-extrabold text-primary">Listing: {lead.car}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-extrabold">{lead.date}</span>
                  </div>

                  <p className={`text-xs font-medium italic leading-relaxed mb-3 ${isDarkMode ? 'text-slate-350' : 'text-slate-600'}`}>
                    "{lead.text}"
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/10 dark:border-slate-800/40">
                    <a 
                      href={`tel:${lead.phone}`}
                      className="text-[10px] px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-primary text-[#05cd93] hover:text-white font-bold inline-flex items-center gap-1.5 transition-all outline-none"
                    >
                      <Phone className="w-3 h-3" /> Call {lead.phone}
                    </a>
                    <a 
                      href={`https://wa.me/88${lead.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-505 text-sky-450 hover:text-white font-bold inline-flex items-center gap-1.5 transition-all outline-none"
                    >
                      <Mail className="w-3 h-3" /> WhatsApp Chat
                    </a>
                    <button
                      onClick={() => {
                        setNotifyMsg(`Response for ${lead.name} recorded! Lead successfully marked as contacted.`);
                        setShowLeadsModal(false);
                        setTimeout(() => setNotifyMsg(''), 4000);
                      }}
                      className="text-[10px] px-3 py-1.5 rounded-lg bg-slate-800/25 hover:bg-slate-800 text-slate-350 font-extrabold ml-auto transition-all cursor-pointer border-none outline-none"
                    >
                      Mark Done
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-800/10 dark:border-slate-800/40 text-center text-[10px] text-slate-500 font-semibold leading-relaxed">
              * Verification keys are auto-matched on buyer dialout. Keep active and alert.
            </div>
          </div>
        </div>
      )}

      {/* Showroom Header Board */}
      <div className={`relative rounded-3xl overflow-hidden border transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="h-32 md:h-48 w-full bg-slate-950 relative overflow-hidden">
          <img 
            referrerPolicy="no-referrer"
            src={showroom.bannerUrl} 
            alt={showroom.name} 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {/* Direct Cover Edit overlay Button (Facebook-style) */}
          <div className="absolute bottom-3 right-3 z-20">
            <input 
              type="file" 
              accept="image/*"
              id="showroom-cover-upload-direct"
              onChange={(e) => handleFileChange(e, 'bannerUrl')}
              className="hidden"
            />
            <label 
              htmlFor="showroom-cover-upload-direct"
              className="cursor-pointer text-[10px] font-black uppercase tracking-wider bg-slate-900/80 hover:bg-slate-950 text-white backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/20 hover:scale-103 transition-all inline-flex items-center gap-1.5 shadow-lg"
            >
              <Camera className="w-3.5 h-3.5 text-orange-400" />
              Change Cover
            </label>
          </div>
        </div>

        <div className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-end gap-5 -mt-10 md:-mt-16 relative z-10">
          {/* Static Profile Avatar Box with direct Edit trigger */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
              <img 
                referrerPolicy="no-referrer"
                src={showroom.avatarUrl || showroom.logoUrl} 
                alt={`${showroom.name} Logo`} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Direct Logo/Avatar Edit camera trigger button */}
            <input 
              type="file" 
              accept="image/*"
              id="showroom-logo-upload-direct"
              onChange={(e) => handleFileChange(e, 'avatarUrl')}
              className="hidden"
            />
            <label 
              htmlFor="showroom-logo-upload-direct"
              className="absolute -bottom-1.5 -right-1.5 bg-orange-500 hover:bg-orange-400 text-slate-950 p-2 rounded-full border border-white dark:border-slate-900 shadow-lg hover:scale-110 transition-all inline-flex items-center justify-center shrink-0 cursor-pointer"
              title="Update Showroom Logo"
            >
              <Camera className="w-4 h-4 text-slate-950" />
            </label>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className={`text-lg md:text-2xl font-black tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {showroom.name}
              </h2>
              {showroom.isVerified && (
                <span className="bg-primary text-white px-2.5 py-0.5 rounded-lg text-[9px] font-black flex items-center gap-1 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Showroom
                </span>
              )}
            </div>
            
            {/* Showroom Rating Stars hidden as requested */}
            
            <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs mt-2 font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {showroom.location}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-primary" /> {showroom.phone || showroom.contactNumber}</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-primary" /> {showroom.email}</span>
            </div>
          </div>

          <div className="self-stretch md:self-end flex flex-col sm:flex-row items-center gap-2 mt-4 md:mt-0">
            <button
              id="showroom-modify-storefront-btn"
              onClick={() => handleTabChange(resolvedTab === 'profile' ? 'my-ads' : 'profile')}
              className={`text-xs font-black py-2.5 px-4 transition-colors rounded-xl shrink-0 w-full sm:w-auto cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5 ${
                resolvedTab === 'profile' 
                  ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                  : 'bg-primary hover:bg-primary-hover text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5 shrink-0" /> {resolvedTab === 'profile' ? 'Close Settings' : 'Modify Storefront'}
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-xs font-black py-2.5 px-4 bg-rose-600/10 hover:bg-rose-605/20 text-rose-500 border border-rose-500/20 transition-colors rounded-xl shrink-0 w-full sm:w-auto cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" /> Log Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Tab Switcher for unified dealer navigation */}
      <div id="showroom-dashboard-tabs" className={`p-1.5 rounded-2xl border flex flex-wrap gap-2 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-neutral-100/50 border-neutral-200'
      }`}>
        <button
          type="button"
          id="showroom-tab-my-ads"
          onClick={() => handleTabChange('my-ads')}
          className={`flex-1 min-w-[124px] py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
            resolvedTab === 'my-ads'
              ? 'bg-primary text-white shadow-md'
              : isDarkMode
                ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                : 'hover:bg-white text-slate-600 hover:text-slate-900'
          }`}
        >
          📊 Stats & Active Inventory ({showroomListings.length})
        </button>
        <button
          type="button"
          id="showroom-tab-post-ad"
          onClick={() => handleTabChange('post-ad')}
          className={`flex-1 min-w-[124px] py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
            resolvedTab === 'post-ad'
              ? 'bg-primary text-white shadow-md'
              : isDarkMode
                ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                : 'hover:bg-white text-slate-600 hover:text-slate-900'
          }`}
        >
          📢 Post a New Ad
        </button>
        <button
          type="button"
          id="showroom-tab-profile"
          onClick={() => handleTabChange('profile')}
          className={`flex-1 min-w-[124px] py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
            resolvedTab === 'profile'
              ? 'bg-primary text-white shadow-md'
              : isDarkMode
                ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                : 'hover:bg-white text-slate-600 hover:text-slate-900'
          }`}
        >
          ⚙️ Storefront Profile Settings
        </button>
      </div>

      {showVerificationAlert && (
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs flex justify-between items-center font-bold">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-orange-400" /> Storefront detail records modified successfully! Live updates active.
          </span>
          <button 
            onClick={() => setShowVerificationAlert(false)}
            className="text-slate-400 hover:text-white underline text-[10px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {resolvedTab === 'post-ad' && (
        <div id="showroom-post-ad-tab" className={`p-6 md:p-8 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="border-b border-solid border-slate-200/50 dark:border-slate-800/60 pb-4 mb-6">
            <span className="text-[10px] bg-orange-500/10 text-orange-400 font-extrabold px-2.5 py-0.5 rounded tracking-widest uppercase mb-1 inline-block">
              Premium Dealer Console
            </span>
            <h3 className={`text-base md:text-lg font-black uppercase tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Post a New Listing (Verified Showroom)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Fill in the specialized technical parameters down below to publish your dealer stock.
            </p>
          </div>
          <PostAdForm 
            isDarkMode={isDarkMode}
            sellerType="showroom"
            showroomProfile={showroom}
            onPostAd={onPostAd}
            onSuccess={() => {
              handleTabChange('my-ads');
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}

      {resolvedTab === 'profile' && (
        <div className={`p-5 md:p-6 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="border-b border-solid border-slate-200/50 dark:border-slate-800/60 pb-4 mb-6">
            <span className="text-[10px] bg-orange-500/10 text-orange-400 font-extrabold px-2 py-0.5 rounded tracking-widest uppercase mb-1 inline-block">
              Merchant control portal
            </span>
            <h3 className={`text-base md:text-lg font-black uppercase tracking-tight flex items-center gap-1.5 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              <Settings className="w-5 h-5 text-primary" /> Storefront Guidelines & Security Settings
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Refine your brand logo, cover aesthetics, division queries, and secure API/login passwords.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Storefront Edit Form */}
            <form onSubmit={handleSaveShowroomProfile} className="lg:col-span-3 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Showroom Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Dealer Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Dealer Contact Hotline *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              {/* Connected 3-Tier Regional Geolocation Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Division *
                  </label>
                  <select
                    value={editForm.division}
                    onChange={(e) => {
                      const div = e.target.value;
                      const dists = BANGLADESH_DISTRICTS_BY_DIVISION[div] || [];
                      const firstDist = dists[0] || 'Dhaka';
                      const areas = BANGLADESH_AREAS_BY_DISTRICT[firstDist] || [];
                      const firstArea = areas[0] || 'Gulshan 2';
                      
                      setSelectedDistrict(firstDist);
                      setEditForm({ 
                        ...editForm, 
                        division: div, 
                        location: firstArea 
                      });
                      
                      // Push changes to main dealer state immediately
                      if (onChangeShowroomProfile) {
                        onChangeShowroomProfile({
                          ...showroom,
                          division: div,
                          location: firstArea
                        });
                      }
                    }}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    {BANGLADESH_DIVISIONS.map((div) => (
                      <option key={div} value={div}>{div}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    District *
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      const dist = e.target.value;
                      const areas = BANGLADESH_AREAS_BY_DISTRICT[dist] || [];
                      const firstArea = areas[0] || 'Gulshan 2';
                      
                      setSelectedDistrict(dist);
                      setEditForm({ 
                        ...editForm, 
                        location: firstArea 
                      });

                      if (onChangeShowroomProfile) {
                        onChangeShowroomProfile({
                          ...showroom,
                          location: firstArea
                        });
                      }
                    }}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    {(BANGLADESH_DISTRICTS_BY_DIVISION[editForm.division] || []).map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Location Area *
                  </label>
                  <select
                    value={editForm.location}
                    onChange={(e) => {
                      const locationArea = e.target.value;
                      setEditForm({ ...editForm, location: locationArea });
                      if (onChangeShowroomProfile) {
                        onChangeShowroomProfile({
                          ...showroom,
                          location: locationArea
                        });
                      }
                    }}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    {(BANGLADESH_AREAS_BY_DISTRICT[selectedDistrict] || []).map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {settingsSuccessMsg && (
                <div className="p-3 text-[11px] font-bold rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  👍 {settingsSuccessMsg}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="text-xs font-black py-2.5 px-5 bg-primary/90 hover:bg-primary text-white transition-all rounded-xl cursor-pointer shadow-md inline-flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Storefront Info
                </button>
              </div>
            </form>

            {/* Right side password details */}
            <div className="lg:col-span-2 space-y-6 lg:border-l lg:border-solid lg:border-slate-800/40 lg:pl-6">
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-primary" /> Super Admin Credentials
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[9.5px] font-bold uppercase text-slate-400 mb-1">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className={`w-full text-xs font-bold py-2 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-bold uppercase text-slate-400 mb-1">
                      New Secure Password *
                    </label>
                    <input
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className={`w-full text-xs font-bold py-2 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-bold uppercase text-slate-400 mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className={`w-full text-xs font-bold py-2 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                {passwordErrorMsg && (
                  <div className="p-2.5 text-[10.5px] font-bold rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                    ⚠️ {passwordErrorMsg}
                  </div>
                )}

                {passwordSuccessMsg && (
                  <div className="p-2.5 text-[10.5px] font-bold rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    🎉 {passwordSuccessMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full text-primary dark:text-orange-400 bg-slate-950 hover:bg-slate-900 border border-slate-800 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Change Admin Password
                </button>
              </form>

              {/* Showroom metadata and info */}
              <div className={`p-3.5 rounded-xl border space-y-1 ${
                isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[8.5px] uppercase font-black px-1.5 py-0.5 rounded bg-primary/10 text-orange-400 border border-orange-500/15">
                  Verified Merchant Status Active
                </span>
                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                  Any details saved here are instantly accessible online. Buyers looking for your listings will see your updated showroom location <strong className="text-primary">{editForm.location}</strong> on the site details panels.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {resolvedTab === 'my-ads' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] duration-300 ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Active Inventory</span>
            <p className="text-xl md:text-2xl font-black text-primary mt-1">{showroomListings.length} Vehicles</p>
          </div>
          <BarChart3 className="w-8 h-8 text-orange-500/20 animate-pulse" />
        </div>

        <div className={`p-5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] duration-300 ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Sponsored Listings</span>
            <p className="text-xl md:text-2xl font-black text-amber-500 mt-1">{featuredCount} Ads</p>
          </div>
          <Star className="w-8 h-8 text-amber-500/20" />
        </div>

        <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] duration-300 ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Showroom Leads Tracker</span>
          <button 
            onClick={handleSimulateSaleResult}
            className="w-full text-center mt-2.5 bg-slate-950 hover:bg-slate-900 hover:border-orange-500/30 border border-slate-800 py-2.5 rounded-xl text-[11px] font-bold text-orange-400 transition-all cursor-pointer shadow-sm animate-bounce"
          >
            Review Buyer Leads (3 Active)
          </button>
        </div>
      </div>

      {/* Dynamic Storefront Performance Analytics Graphics */}
      <div className={`p-5 rounded-2xl border leading-relaxed space-y-4 transition-all duration-500 hover:border-orange-500/20 ${
        isDarkMode ? 'bg-slate-900/30 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-dashed border-slate-800/20 dark:border-slate-800/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 px-2 rounded-lg bg-orange-500/10 text-orange-400 font-bold text-[10px] flex items-center gap-1">
              <Zap className="w-3 h-3 fill-orange-400 text-orange-400" /> LIVE STREAM
            </div>
            <div>
              <h4 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Merchant Growth & Buyer Impression Analytics
              </h4>
              <p className="text-[10px] text-slate-500">Weekly breakdown of direct phone hotline leads, chats, and car model search page hits.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
              <span>Buyer Hits (+24%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-sky-500 rounded-full"></span>
              <span>Calls/Leads</span>
            </div>
          </div>
        </div>

        {/* Weekly visual columns bars */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-1">
          {/* SVG Bar Chart element */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">Weekly Impression Load (Chaka Platform Stream)</span>
            
            <div className="relative h-28 flex items-end justify-between pt-4 px-2">
              {/* Y Axis helper lines */}
              <div className="absolute inset-x-0 bottom-0 top-4 border-b border-dashed border-slate-800/20 dark:border-slate-800/40 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-9 top-4 border-b border-dashed border-slate-800/20 dark:border-slate-800/40 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-18 top-4 border-b border-dashed border-slate-800/20 dark:border-slate-800/40 pointer-events-none"></div>

              {[
                { day: 'Mon', hits: 320, leads: 50, percent: '35%' },
                { day: 'Tue', hits: 480, leads: 82, percent: '55%' },
                { day: 'Wed', hits: 590, leads: 110, percent: '70%' },
                { day: 'Thu', hits: 780, leads: 145, percent: '90%' },
                { day: 'Fri', hits: 690, leads: 120, percent: '80%' },
                { day: 'Sat', hits: 850, leads: 195, percent: '100%' },
                { day: 'Sun', hits: 920, leads: 220, percent: '105%' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center group relative z-10 w-9 sm:w-12">
                  {/* Hover tooltip */}
                  <div className="absolute bottom-full mb-1.5 hidden group-hover:block bg-slate-950 text-white rounded px-2 py-1 text-[9px] font-bold text-center border border-slate-800 shadow-xl pointer-events-none z-30 w-24">
                    <p className="text-orange-400">{item.hits} Inquiries</p>
                    <p className="text-sky-400">{item.leads} Dial Calls</p>
                  </div>
                  
                  {/* Twin bars */}
                  <div className="flex items-end justify-center gap-1 w-full h-18">
                    {/* Hits bar */}
                    <div 
                      style={{ height: item.percent }} 
                      className="w-2.5 sm:w-3.5 bg-gradient-to-t from-primary-hover to-primary rounded-t-sm transition-all duration-500 group-hover:brightness-110 group-hover:scale-y-105"
                    ></div>
                    {/* Leads bar */}
                    <div 
                      style={{ height: `calc(${item.percent} * 0.4)` }} 
                      className="w-1.5 sm:w-2 bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-sm transition-all duration-500 group-hover:brightness-110 group-hover:scale-y-105"
                    ></div>
                  </div>
                  <span className="text-[9px] font-black tracking-tighter text-slate-500 mt-1.5 uppercase">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats on the right side of graph */}
          <div className="space-y-3.5 flex flex-col justify-center bg-slate-950/40 dark:bg-slate-905/30 p-4 rounded-xl border border-dashed border-slate-800/30">
            <div>
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-wider block">Estimated Conversion Ratio</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-black text-white">4.89%</span>
                <span className="text-[9px] font-extrabold text-orange-400">▲ +1.2%</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-wider block">Hotline Click CTR</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-black text-white">12.4%</span>
                <span className="text-[9px] font-extrabold text-orange-400">▲ +3.4%</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-800/40 flex items-center gap-1.5 text-[9.5px] font-bold text-slate-400">
              <TrendingUp className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Highest buyer outreach is recorded at Tejgaon on Friday.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main dashboard body section split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: inventories lists */}
        <div className={`md:col-span-2 p-5 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              Showroom Active Inventory
            </h3>
            <span className="text-[9px] bg-orange-500/10 text-orange-500 font-extrabold px-2 py-0.5 rounded tracking-widest uppercase">
              Limit: Unlimited
            </span>
          </div>

          <div className="space-y-3.5">
            {showroomListings.map((listing) => {
              const isSold = listing.title.startsWith('[SOLD]') || (listing as any).isSold;
              const displayTitle = listing.title.replace('[SOLD] ', '');
              return (
                <div 
                  key={listing.id}
                  className={`p-3 rounded-xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 ${
                    isSold 
                      ? 'opacity-70 bg-slate-100/50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-900'
                      : isDarkMode ? 'bg-slate-950 border-slate-900 hover:border-slate-800' : 'bg-slate-50 border-slate-100 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0 select-none">
                      <img 
                        referrerPolicy="no-referrer"
                        src={listing.images[0]} 
                        alt={listing.title} 
                        className={`w-12 h-12 object-cover rounded-lg border border-slate-500/10 ${isSold ? 'grayscale contrast-75' : ''}`} 
                      />
                      {isSold && (
                        <span className="absolute inset-x-0 bottom-0 bg-red-600/90 py-0.5 text-center text-[7px] font-black text-white uppercase tracking-wider rounded-b-lg">
                          Sold
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-1 items-center">
                        <span className={`text-[8px] font-black px-1 py-0.5 rounded tracking-wider uppercase ${
                          isSold
                            ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                            : isDarkMode ? 'bg-slate-800 text-primary' : 'bg-orange-50 text-primary'
                        }`}>
                          {listing.condition || 'Used'}
                        </span>
                        {isSold && (
                          <span className="text-[7.5px] bg-red-500 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-sans">
                            Sold
                          </span>
                        )}
                        {listing.isFeatured && (
                          <span className="text-[7.5px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-sans">
                            Featured
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-bold truncate max-w-[200px] sm:max-w-xs ${
                        isSold ? 'line-through text-slate-400 dark:text-slate-500 font-sans' : isDarkMode ? 'text-slate-200' : 'text-slate-800 font-sans'
                      }`}>
                        {displayTitle}
                      </h4>
                      <p className="text-[10px] text-slate-900 dark:text-white font-black mt-0.5">{listing.priceFormatted}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {/* Toggle Sold Status Button */}
                    <button
                      onClick={() => toggleSoldStatusLocal(listing)}
                      className={`text-[9.5px] px-2 py-1 rounded border font-black transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                        isSold 
                          ? 'bg-slate-200 dark:bg-slate-900 border-transparent text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white'
                          : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-red-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-500'
                      }`}
                      title={isSold ? "Mark as Available" : "Mark as Sold"}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isSold ? "Relist" : "Sold"}</span>
                    </button>

                    {/* Edit Details Ad Button */}
                    <button
                      onClick={() => handleStartEdit(listing)}
                      className={`p-1.5 rounded border transition-all shrink-0 cursor-pointer ${
                        isDarkMode 
                          ? 'border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white' 
                          : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                      title="Edit Ad Details"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Ad Button */}
                    {onDeleteAd && (
                      <button
                        onClick={() => onDeleteAd(listing.id)}
                        className={`p-1.5 rounded border transition-all shrink-0 cursor-pointer ${
                          isDarkMode 
                            ? 'border-slate-800 hover:bg-rose-950 text-rose-400 hover:text-rose-400 hover:border-rose-900' 
                            : 'border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 hover:border-rose-200'
                        }`}
                        title="Delete Ad"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Boost Promo Button */}
                    {!listing.isFeatured && (
                      <button 
                        onClick={promoteRandomAd}
                        className={`text-[9.5px] px-2.5 py-1.5 rounded font-extrabold transition-all cursor-pointer border ${
                          isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-primary hover:border-orange-500 hover:text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-primary hover:border-primary hover:text-white'
                        }`}
                        title="Sponsor/Boost Car"
                      >
                        Boost
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Premium application tools */}
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-orange-950/5 border-slate-800' : 'bg-orange-50/15 border-slate-200'
          }`}>
            <h4 className="text-xs font-black uppercase tracking-wider mb-2 text-amber-500 flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" /> Premium Showroom Benefits
            </h4>
            <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Verified Showrooms unlock higher buyer interaction indices with verified checkmarks and strategic inventory highlights.
            </p>

            <ul className="space-y-2 text-[11px] text-slate-400 mb-4 list-disc pl-4 font-medium">
              <li>Verified trust badges on all listings.</li>
              <li>Unlimited premium inventory slots with high-res thumbnails.</li>
              <li>Weekly callback lead reports direct capture.</li>
            </ul>

            <button 
              onClick={promoteRandomAd}
              disabled={isUpgraded}
              className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                isUpgraded 
                  ? 'bg-orange-600/20 text-orange-400 border border-orange-500/10 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-900/10'
              }`}
            >
              {isUpgraded ? '★ Ultra Premium Activated' : 'Feature 1 Ad Spot (Free)'}
            </button>
          </div>

          {/* Real-time Customer Reviews Block hidden as requested */}
        </div>
      </div>
      </>
      )}
      {/* Edit Listing Modal Overlay */}
      {editingListing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fadeIn select-none">
          <div className={`w-full max-w-lg rounded-2.5xl border p-6 shadow-2xl relative ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button 
              type="button"
              onClick={() => setEditingListing(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-400 hover:text-primary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-sm font-black uppercase tracking-wider text-primary mb-1 font-sans">
              ✏️ Edit Showroom Car Listing
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4 font-semibold font-sans">
              Update details of this inventory vehicle.
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Listing Title *
                </label>
                <input 
                  type="text" 
                  required
                  value={inventoryEditForm.title}
                  onChange={(e) => setInventoryEditForm({ ...inventoryEditForm, title: e.target.value })}
                  className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Asking Price (BDT) *
                  </label>
                  <input 
                    type="number" 
                    required
                    value={inventoryEditForm.price}
                    onChange={(e) => setInventoryEditForm({...inventoryEditForm, price: e.target.value})}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  {Number(inventoryEditForm.price) > 0 && (
                    <span className="block text-[9.5px] font-bold text-orange-500 mt-1">
                      💡 BDT {Number(inventoryEditForm.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Vehicle Condition *
                  </label>
                  <select 
                    value={inventoryEditForm.condition}
                    onChange={(e) => setInventoryEditForm({...inventoryEditForm, condition: e.target.value as any})}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-primary cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Reconditioned">Reconditioned</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Mileage (km)
                  </label>
                  <input 
                    type="number" 
                    value={inventoryEditForm.mileage}
                    onChange={(e) => setInventoryEditForm({...inventoryEditForm, mileage: e.target.value})}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Engine Capacity (e.g. cc)
                  </label>
                  <input 
                    type="text" 
                    value={inventoryEditForm.engineCapacity}
                    onChange={(e) => setInventoryEditForm({...inventoryEditForm, engineCapacity: e.target.value})}
                    placeholder="e.g. 1500 cc"
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Location Area *
                </label>
                <input 
                  type="text" 
                  required
                  value={inventoryEditForm.location}
                  onChange={(e) => setInventoryEditForm({...inventoryEditForm, location: e.target.value})}
                  className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Description *
                </label>
                <textarea 
                  required
                  rows={3}
                  value={inventoryEditForm.description}
                  onChange={(e) => setInventoryEditForm({...inventoryEditForm, description: e.target.value})}
                  className={`w-full text-xs font-semibold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all whitespace-pre-wrap ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex gap-2.5 pt-2 select-none">
                <button 
                  type="button"
                  onClick={() => setEditingListing(null)}
                  className="flex-1 bg-slate-500/10 hover:bg-slate-500/15 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer text-slate-400 border-none outline-none"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer border-none outline-none"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export {};
