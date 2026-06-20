import React, { useState, useRef } from 'react';
import { VehicleListing, ChatConversation } from '@/types';
import { PlusCircle, ListFilter, MessageSquare, Shield, Eye, Trash2, CheckCircle, Tag, AlertCircle, Upload, Loader2, Image as ImageIcon, User, Lock, LogOut, Camera, Edit, Check, X } from 'lucide-react';
import { BANGLADESH_DIVISIONS, BANGLADESH_LOCATIONS, BANGLADESH_DISTRICTS_BY_DIVISION, BANGLADESH_AREAS_BY_DISTRICT, VEHICLE_BRANDS, formatBDT } from '@/lib/data';
import ChatWindow from '@/components/ChatWindow';
import { convertToWebP } from '@/utils/imageUtils';
import PostAdForm from '@/sections/PostAdForm';

interface DashboardUserProps {
  listings: VehicleListing[];
  chats: ChatConversation[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onSendMessage: (chatId: string, text: string, senderId: string, image?: string) => void;
  onPostAd: (newAd: Partial<VehicleListing>) => void;
  onDeleteAd: (id: string) => void;
  onUpdateListing?: (updated: VehicleListing) => void;
  isDarkMode: boolean;
  activeTab?: 'my-ads' | 'post-ad' | 'inbox' | 'pricing-tool' | 'profile';
  onChangeTab?: (tab: 'my-ads' | 'post-ad' | 'inbox' | 'pricing-tool' | 'profile') => void;
  userProfile?: any;
  onChangeUserProfile?: (updated: any) => void;
  onLogout?: () => void;
  onViewPublicProfile?: (profileId: string) => void;
}

export default function DashboardUser({
  listings,
  chats,
  activeChatId,
  onSelectChat,
  onSendMessage,
  onPostAd,
  onDeleteAd,
  onUpdateListing,
  isDarkMode,
  activeTab,
  onChangeTab,
  userProfile,
  onChangeUserProfile,
  onLogout,
  onViewPublicProfile
}: DashboardUserProps) {
  const [localTab, setLocalTab] = useState<'my-ads' | 'post-ad' | 'inbox' | 'pricing-tool' | 'profile'>('my-ads');
  
  const [editingListing, setEditingListing] = useState<VehicleListing | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    price: '',
    condition: 'Used' as any,
    mileage: '',
    engineCapacity: '',
    description: '',
    location: '',
  });
  
  const currentTab = activeTab !== undefined ? activeTab : localTab;
  const changeTab = onChangeTab !== undefined ? onChangeTab : setLocalTab;

  // Local states for editing our member profiles
  const [profileForm, setProfileForm] = useState({
    name: userProfile?.name || 'Towsif Mahbub',
    email: userProfile?.email || 'towsifmahbub@gmail.com',
    phone: userProfile?.phone || '01712345678',
    location: userProfile?.location || 'Gulshan',
    division: userProfile?.division || 'Dhaka',
    avatarUrl: userProfile?.avatarUrl || 'https://i.ibb.co.com/hf583h7/towsif.jpg',
    coverUrl: userProfile?.coverUrl || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1000',
    isSubscribed: userProfile?.isSubscribed || false,
  });

  const [selectedUserDistrict, setSelectedUserDistrict] = useState(() => {
    const defaultDiv = userProfile?.division || 'Dhaka';
    const defaultLoc = userProfile?.location || 'Gulshan 2';
    for (const [dist, areas] of Object.entries(BANGLADESH_AREAS_BY_DISTRICT)) {
      if (areas.includes(defaultLoc)) {
        return dist;
      }
    }
    return BANGLADESH_DISTRICTS_BY_DIVISION[defaultDiv]?.[0] || 'Dhaka';
  });

  React.useEffect(() => {
    if (userProfile) {
      setProfileForm({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        division: userProfile.division || 'Dhaka',
        avatarUrl: userProfile.avatarUrl || 'https://i.ibb.co.com/hf583h7/towsif.jpg',
        coverUrl: userProfile.coverUrl || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1000',
        isSubscribed: userProfile.isSubscribed || false,
      });
      const defaultDiv = userProfile.division || 'Dhaka';
      const defaultLoc = userProfile.location || '';
      let foundDist = BANGLADESH_DISTRICTS_BY_DIVISION[defaultDiv]?.[0] || 'Dhaka';
      for (const [dist, areas] of Object.entries(BANGLADESH_AREAS_BY_DISTRICT)) {
        if (areas.includes(defaultLoc)) {
          foundDist = dist;
          break;
        }
      }
      setSelectedUserDistrict(foundDist);
    }
  }, [userProfile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'coverUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const webpBase64 = await convertToWebP(file, field === 'coverUrl' ? 1200 : 300, 0.8);
      setProfileForm(prev => ({
        ...prev,
        [field]: webpBase64
      }));
    } catch (err) {
      console.error('Failed to convert to WebP: ', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.name || !profileForm.email || !profileForm.phone) {
      alert('Required data fields cannot be blank');
      return;
    }
    if (onChangeUserProfile) {
      onChangeUserProfile({
        ...userProfile,
        ...profileForm
      });
    }
    setProfileSuccessMsg('Profile details successfully customized and synchronized!');
    setTimeout(() => setProfileSuccessMsg(''), 4000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrorMsg('');
    setPasswordSuccessMsg('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordErrorMsg('Please fill out all credential verification fields.');
      return;
    }

    const currentProfilePassword = userProfile?.password || 'password123';
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

    if (onChangeUserProfile) {
      onChangeUserProfile({
        ...userProfile,
        password: passwordForm.newPassword
      });
    }

    setPasswordSuccessMsg('Password changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccessMsg(''), 4000);
  };

  // New Ad Form Fields
  const [formData, setFormData] = useState({
    title: '',
    type: 'car' as 'car' | 'bike',
    brand: 'Toyota',
    model: '',
    year: 2020,
    condition: 'Used' as 'New' | 'Used' | 'Reconditioned',
    price: '',
    engineCapacity: '1500 cc',
    mileage: '',
    fuelType: 'Octane' as any,
    transmission: 'Automatic' as any,
    division: 'Dhaka',
    location: 'Gulshan',
    description: '',
    sellerPhone: '01712345678',
    imageUrl: '',
    bodyType: '',
    exteriorColor: '',
    registrationYear: '',
    seatingCapacity: '',
    taxFitnessValidity: '',
    enginePower: '',
    fuelEfficiency: '',
    featuresText: '' // Comma separated features
  });

  const [formSuccess, setFormSuccess] = useState(false);

  // Pricing Estimator state
  const [pricingForm, setPricingForm] = useState({
    type: 'car' as 'car' | 'bike',
    brand: 'Toyota',
    model: '',
    year: 2018,
    mileage: 45000,
    condition: 'Reconditioned' as 'New' | 'Used' | 'Reconditioned',
    fuelType: 'Octane' as any,
  });
  const [estimatedValue, setEstimatedValue] = useState<{
    low: string;
    high: string;
    midNumeric: number;
    demand: string;
    resaleValue: string;
    liquidityTime: string;
    depreciationFactor: string;
  } | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);

  const calculateEstimate = () => {
    setIsEstimating(true);
    setTimeout(() => {
      // Intelligent base pricing logic for Bangladesh
      let basePrice = 2400000; // default Toyota Premio 2018
      if (pricingForm.type === 'bike') {
        basePrice = 220000; // Gixxer / Yamaha r15 base
      }

      // Brand coefficients
      const brandCoeffs: Record<string, number> = {
        'Toyota': 1.15,
        'Honda': 1.05,
        'Nissan': 0.95,
        'Suzuki': 0.85,
        'Yamaha': 1.1,
        'Bajaj': 0.75,
        'Hero': 0.7
      };
      if (brandCoeffs[pricingForm.brand]) {
        basePrice *= brandCoeffs[pricingForm.brand];
      }

      // Year multiplier (depreciation of 5% per year old from 2025)
      const age = Math.max(0, 2025 - pricingForm.year);
      basePrice *= Math.pow(0.94, age);

      // Mileage penalty (depreciation of 1.5% per 10k km driven)
      const mileagePenaltyIndex = Math.min(12, pricingForm.mileage / 10000);
      basePrice *= (1 - (mileagePenaltyIndex * 0.015));

      // Condition multipliers
      if (pricingForm.condition === 'New') basePrice *= 1.35;
      else if (pricingForm.condition === 'Used') basePrice *= 0.8;

      // Fuel factors
      if (pricingForm.fuelType === 'Hybrid') basePrice *= 1.08;
      else if (pricingForm.fuelType === 'Electric') basePrice *= 1.12;

      // Ensure sanity lower bounds
      basePrice = Math.max(pricingForm.type === 'car' ? 650000 : 45000, basePrice);

      const lowValue = Math.round(basePrice * 0.93);
      const highValue = Math.round(basePrice * 1.06);

      const formatPriceBDT = (num: number) => {
        return `BDT ${num.toLocaleString('en-IN')}`;
      };

      setEstimatedValue({
        low: formatPriceBDT(lowValue),
        high: formatPriceBDT(highValue),
        midNumeric: Math.round((lowValue + highValue) / 2),
        demand: pricingForm.brand === 'Toyota' || pricingForm.brand === 'Yamaha' || pricingForm.brand === 'Honda' ? 'Very High' : 'Moderate',
        resaleValue: pricingForm.brand === 'Toyota' || pricingForm.brand === 'Honda' ? 'Excellent (88%)' : 'Strong (75%)',
        liquidityTime: pricingForm.type === 'car' ? '12 - 18 Days' : '5 - 9 Days',
        depreciationFactor: `${Math.max(12, Math.round(age * 6.5 + (pricingForm.mileage / 4000)))}%`
      });
      setIsEstimating(false);
    }, 750);
  };

  // Drag and Drop & WebP File upload handlers
  const [isDragActive, setIsDragActive] = useState(false);
  const [isAdPhotoConverting, setIsAdPhotoConverting] = useState(false);
  const adFileInputRef = useRef<HTMLInputElement>(null);

  const handleAdDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleAdDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processAdImage(e.dataTransfer.files[0]);
    }
  };

  const handleAdFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processAdImage(e.target.files[0]);
    }
  };

  const processAdImage = async (file: File) => {
    try {
      setIsAdPhotoConverting(true);
      // Modern WebP scaling & optimization with 0.8 quality on client-side
      const webpUrl = await convertToWebP(file, 1200, 0.8);
      setFormData(prev => ({ ...prev, imageUrl: webpUrl }));
    } catch (err) {
      console.error("Ad WebP conversion failed: ", err);
    } finally {
      setIsAdPhotoConverting(false);
    }
  };

  // Filter listings made by this simulated User (using userId "user_curr")
  const myListings = listings.filter((l) => l.userId === 'user_curr');

  // Filter chats belonging to this user
  const myChats = chats.filter((c) => c.buyerId === 'user_curr' || c.sellerId === 'user_curr');

  const totalAdValue = myListings.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const totalAdViews = myListings.reduce((sum, item) => sum + (Number(item.views) || 0), 0);
  const formattedTotalValue = `BDT ${totalAdValue.toLocaleString('en-IN')}`;

  const handleStartEdit = (listing: VehicleListing) => {
    setEditingListing(listing);
    setEditForm({
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

    const priceNum = Number(editForm.price) || 0;
    const formatPriceBDT = (num: number) => {
      return `BDT ${num.toLocaleString('en-IN')}`;
    };

    const isCurrentlySold = editingListing.title.startsWith('[SOLD]') || (editingListing as any).isSold;

    const updated: VehicleListing = {
      ...editingListing,
      title: isCurrentlySold ? `[SOLD] ${editForm.title}` : editForm.title,
      price: priceNum,
      priceFormatted: formatPriceBDT(priceNum),
      condition: editForm.condition,
      mileage: Number(editForm.mileage) || 0,
      engineCapacity: editForm.engineCapacity,
      description: editForm.description,
      location: editForm.location,
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.model) {
      alert('Please fill out all required fields!');
      return;
    }

    const priceNum = Number(formData.price);
    const formattedPrice = formatBDT(priceNum);

    // Process comma separated features
    const computedFeatures = formData.featuresText
      ? formData.featuresText.split(',').map(f => f.trim()).filter(f => f.length > 0)
      : (formData.type === 'car' 
        ? ['Alloy Wheels', 'ABS Braking', 'Back Camera', 'SRS Airbags'] 
        : ['ABS', 'Disc Brakes', 'LED Headlamp']);

    const newAd: Partial<VehicleListing> = {
      id: `car_usr_${Date.now()}`,
      title: formData.title,
      type: formData.type,
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      condition: formData.condition,
      price: priceNum,
      priceFormatted: formattedPrice,
      engineCapacity: formData.engineCapacity,
      mileage: Number(formData.mileage) || 0,
      fuelType: formData.fuelType,
      transmission: formData.transmission,
      division: formData.division,
      location: formData.location,
      bodyType: formData.bodyType || (formData.type === 'car' ? 'Sedan' : 'Commuter'),
      exteriorColor: formData.exteriorColor || 'Premium Silver',
      registrationYear: formData.registrationYear || 'Unregistered',
      seatingCapacity: formData.seatingCapacity,
      taxFitnessValidity: formData.taxFitnessValidity,
      enginePower: formData.enginePower,
      fuelEfficiency: formData.fuelEfficiency,
      features: computedFeatures,
      description: formData.description || 'Pristine vehicle condition. All papers are legally fully up to date.',
      images: [formData.imageUrl || (formData.type === 'car' ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600' : 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600')],
      sellerName: 'Towsif Mahbub',
      sellerPhone: formData.sellerPhone,
      sellerType: 'private',
      isFeatured: false,
      verified: false,
      status: 'Approved', // Autoapproved for dynamic previews
      views: 1,
      createdAt: new Date().toISOString(),
      userId: 'user_curr'
    };

    onPostAd(newAd);
    setFormSuccess(true);
    setFormData({
      title: '',
      type: 'car',
      brand: 'Toyota',
      model: '',
      year: 2020,
      condition: 'Used',
      price: '',
      engineCapacity: '1500 cc',
      mileage: '',
      fuelType: 'Octane',
      transmission: 'Automatic',
      division: 'Dhaka',
      location: 'Gulshan',
      description: '',
      sellerPhone: '01712345678',
      imageUrl: '',
      bodyType: '',
      exteriorColor: '',
      registrationYear: '',
      seatingCapacity: '',
      taxFitnessValidity: '',
      enginePower: '',
      fuelEfficiency: '',
      featuresText: ''
    });

    setTimeout(() => {
      setFormSuccess(false);
      changeTab('my-ads');
    }, 1800);
  };

  const updateType = (type: 'car' | 'bike') => {
    setFormData({
      ...formData,
      type,
      brand: VEHICLE_BRANDS[type][0],
      engineCapacity: type === 'car' ? '1500 cc' : '1500 cc', // Standardize engine default safely
      transmission: type === 'car' ? 'Automatic' : 'Manual'
    });
  };

  return (
    <div id="user-dashboard" className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left rail navigation */}
      <div className={`md:col-span-1 p-4 rounded-2xl border flex flex-col gap-1.5 h-fit ${
        isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 pb-4 mb-2 border-b border-dashed border-slate-800/60">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ff6600]/30">
            {userProfile?.avatarUrl ? (
              <img referrerPolicy="no-referrer" src={userProfile.avatarUrl} alt={userProfile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#ff6600]/10 flex items-center justify-center text-[#ff6600] font-black text-sm">
                {(userProfile?.name || 'Towsif Mahbub').slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h4 className={`text-xs font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{userProfile?.name || 'Towsif Mahbub'}</h4>
            <span className="text-[10px] text-orange-400 font-extrabold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Registered Member
            </span>
          </div>
        </div>

        <button
          onClick={() => changeTab('my-ads')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
            currentTab === 'my-ads'
              ? 'bg-[#ff6600] text-white'
              : isDarkMode
                ? 'hover:bg-slate-800 text-slate-300'
                : 'hover:bg-slate-50 text-slate-700'
          }`}
        >
          <ListFilter className="w-4 h-4" /> My Car & Bike Ads ({myListings.length})
        </button>

        <button
          onClick={() => changeTab('post-ad')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
            currentTab === 'post-ad'
              ? 'bg-[#ff6600] text-white'
              : isDarkMode
                ? 'hover:bg-slate-800 text-slate-300'
                : 'hover:bg-slate-50 text-slate-700'
          }`}
        >
          <PlusCircle className="w-4 h-4" /> Post a New Ad
        </button>

        <button
          onClick={() => changeTab('inbox')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
            currentTab === 'inbox'
              ? 'bg-[#ff6600] text-white'
              : isDarkMode
                ? 'hover:bg-slate-800 text-slate-300'
                : 'hover:bg-slate-50 text-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Live Chats Inbox ({myChats.length})
        </button>

        <button
          onClick={() => changeTab('pricing-tool')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
            currentTab === 'pricing-tool'
              ? 'bg-[#ff6600] text-white'
              : isDarkMode
                ? 'hover:bg-slate-800 text-slate-300'
                : 'hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Tag className="w-4 h-4" /> Market Valuation Estimator
        </button>

        <button
          onClick={() => changeTab('profile')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
            currentTab === 'profile'
              ? 'bg-[#ff6600] text-white'
              : isDarkMode
                ? 'hover:bg-slate-800 text-slate-300'
                : 'hover:bg-slate-50 text-slate-700'
          }`}
        >
          <User className="w-4 h-4" /> My Profile settings
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black transition-all text-left cursor-pointer mt-4 border border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500/10"
          >
            <LogOut className="w-4 h-4" /> Log out Account
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="md:col-span-3">
        {currentTab === 'my-ads' && (
          <div className={`p-5 rounded-2xl border h-full ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-sm font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                My Published Vehicle Ads
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff6600]/10 text-[#ff6600] font-black uppercase">
                Active Session
              </span>
            </div>

            {/* Smart Statistics Boxes & Performance Widget */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5 select-none">
              <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.01] hover:border-[#ff6600]/20 duration-300 ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Total Active Inventory</span>
                <span className="text-sm font-black mt-1 text-[#ff6600] dark:text-orange-400">{myListings.length} Ads Posted</span>
              </div>
              <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.01] hover:border-amber-500/20 duration-300 ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Estimated Portfolio Value</span>
                <span className="text-sm font-black mt-1 text-amber-500">{formattedTotalValue}</span>
              </div>
              <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.01] hover:border-sky-500/20 duration-300 ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Buyer Engagements (Views)</span>
                <span className="text-sm font-black mt-1 text-sky-400">{totalAdViews.toLocaleString()} Views</span>
              </div>
            </div>

            {/* Store Performance Analytics Tracker */}
            <div className={`p-4 rounded-xl border mb-5 space-y-3 transition-all duration-300 hover:border-[#ff6600]/20 ${
              isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/50 border-slate-200'
            }`}>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500 animate-ping font-sans"></span> Brand Impressions Tracker (7 Days)</span>
                <span className="text-orange-500 font-bold uppercase font-sans">Status: Optimised</span>
              </div>

              <div className="h-10 flex items-end justify-between px-2 gap-1.5 pt-1">
                {[
                  { day: 'M', h: '30%', count: 12 },
                  { day: 'T', h: '50%', count: 24 },
                  { day: 'W', h: '75%', count: 42 },
                  { day: 'T', h: '95%', count: 56 },
                  { day: 'F', h: '60%', count: 32 },
                  { day: 'S', h: '80%', count: 48 },
                  { day: 'S', h: '90%', count: 52 }
                ].map((pt, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                    {/* Tiny tooltip */}
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-slate-900 border border-slate-850 text-white font-bold text-[8px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                      {pt.count} Viewers
                    </span>
                    <div className="w-full bg-slate-800 dark:bg-slate-900 rounded-t h-6 flex items-end">
                      <div 
                        style={{ height: pt.h }} 
                        className="w-full bg-gradient-to-t from-[#eb5e00] to-[#ff6600] rounded-t transition-all duration-300 group-hover:brightness-110"
                      ></div>
                    </div>
                    <span className="text-[8px] font-bold text-slate-500 mt-1">{pt.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seller tips banner */}
            <div className={`p-3.5 rounded-xl border mb-5 flex items-start gap-2.5 ${
              isDarkMode ? 'bg-orange-950/10 border-orange-900/30' : 'bg-orange-50/40 border-orange-100'
            }`}>
              <span className="text-base select-none">💡</span>
              <div className="text-[10.5px] leading-normal text-slate-500 dark:text-slate-400">
                <span className="font-extrabold text-[#ff6600] block mb-0.5">Pro Tip to Sell 3x Faster:</span>
                Keep your pricing competitive matching Bangladesh market standards. Share the ad to Facebook or WhatsApp (using our 1-click share utilities on detail pages) to get immediate inquiries!
              </div>
            </div>

            {myListings.length === 0 ? (
              <div className="text-center py-16 text-slate-500 flex flex-col items-center justify-center">
                <Tag className="w-12 h-12 text-[#ff6600] opacity-40 mb-3" />
                <p className="text-xs font-bold mb-3 text-slate-400">You haven't posted any vehicle ads yet!</p>
                <button
                  onClick={() => changeTab('post-ad')}
                  className="text-xs bg-[#ff6600] hover:bg-[#eb5e00] text-white font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  Upload Ad Now
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {myListings.map((listing) => {
                  const isSold = listing.title.startsWith('[SOLD]') || (listing as any).isSold;
                  const displayTitle = listing.title.replace('[SOLD] ', '');
                  return (
                    <div
                       key={listing.id}
                       className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-4 justify-between sm:items-center transition-all ${
                        isSold 
                          ? 'opacity-70 bg-slate-100/50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-900'
                          : isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-800' : 'bg-slate-50 border-slate-200 hover:border-[#ff6600]/30'
                      }`}
                    >
                      <div className="flex gap-3 items-center min-w-0">
                        <div className="relative shrink-0">
                          <img 
                            referrerPolicy="no-referrer"
                            src={listing.images[0]} 
                            alt={listing.title} 
                            className={`w-14 h-14 object-cover rounded-lg border border-slate-500/10 ${isSold ? 'grayscale contrast-75' : ''}`}
                          />
                          {isSold && (
                            <span className="absolute inset-x-0 bottom-0 bg-red-600/90 py-0.5 text-center text-[7px] font-black text-white uppercase tracking-wider rounded-b-lg">
                              Sold
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase ${
                              isSold
                                ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                : isDarkMode ? 'bg-slate-800 text-[#ff6600]' : 'bg-orange-50 text-[#ff6600]'
                            }`}>
                              {listing.condition}
                            </span>
                            {isSold && (
                              <span className="text-[8px] bg-red-500 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-sans">
                                Sold Out
                              </span>
                            )}
                          </div>
                          <h4 className={`text-xs font-bold truncate max-w-[200px] md:max-w-md ${
                            isSold ? 'line-through text-slate-400 dark:text-slate-500 font-sans' : isDarkMode ? 'text-slate-200' : 'text-slate-800 font-sans'
                          }`}>
                            {displayTitle}
                          </h4>
                          <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                            <span className="font-extrabold text-slate-900 dark:text-white">{listing.priceFormatted}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 font-medium"><Eye className="w-3.5 h-3.5" /> {listing.views} views</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {/* Toggle Sold Button */}
                        <button
                          onClick={() => toggleSoldStatusLocal(listing)}
                          className={`text-[10px] px-2.5 py-1.5 rounded-lg border font-black transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                            isSold 
                              ? 'bg-slate-200 dark:bg-slate-900 border-transparent text-slate-600 dark:text-slate-400 hover:bg-[#ff6600] hover:text-white'
                              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-red-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-500'
                          }`}
                          title={isSold ? "Mark as Available" : "Mark as Sold"}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isSold ? "Relist Ad" : "Mark Sold"}</span>
                        </button>

                        {/* Edit Details Ad Button */}
                        <button
                          onClick={() => handleStartEdit(listing)}
                          className={`p-2 rounded-lg border transition-all shrink-0 cursor-pointer ${
                            isDarkMode 
                              ? 'border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white' 
                              : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                          }`}
                          title="Edit Ad Details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Ad Button */}
                        <button
                          onClick={() => onDeleteAd(listing.id)}
                          className={`p-2 rounded-lg border transition-all shrink-0 cursor-pointer ${
                            isDarkMode 
                              ? 'border-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-450 hover:border-rose-900' 
                              : 'border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 hover:border-rose-200'
                          }`}
                          title="Delete Ad"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {currentTab === 'post-ad' && (
          <div className={`p-6 md:p-8 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="border-b border-solid border-slate-200/50 dark:border-slate-800/60 pb-4 mb-6">
              <span className="text-[10px] bg-orange-500/10 text-orange-500 font-extrabold px-2.5 py-0.5 rounded tracking-widest uppercase mb-1 inline-block">
                Standard Member Console
              </span>
              <h3 className={`text-base md:text-lg font-black uppercase tracking-tight ${isDarkMode ? 'text-slate-105' : 'text-slate-900'}`}>
                Post a New Classified Ad
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Increase your response rate by supplying full details about your product or vehicle.
              </p>
            </div>

            <PostAdForm 
              isDarkMode={isDarkMode}
              sellerType="private"
              userProfile={userProfile}
              onPostAd={onPostAd}
              onSuccess={() => {
                changeTab('my-ads');
              }}
            />
          </div>
        )}

        {currentTab === 'inbox' && (
          <div className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h3 className={`text-sm font-extrabold mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Messaging Inbox
            </h3>

            {myChats.length === 0 ? (
              <div className="text-center py-16 text-slate-500 flex flex-col items-center justify-center">
                <MessageSquare className="w-10 h-10 text-[#ff6600] opacity-40 mb-2" />
                <p className="text-xs font-bold text-slate-400">You don't have any active chats at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Conversations list */}
                <div className="md:col-span-1 space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {myChats.map((chat) => {
                    const lastMsg = chat.messages && chat.messages.length > 0 
                      ? chat.messages[chat.messages.length - 1] 
                      : null;
                    const lastMsgText = lastMsg ? lastMsg.text : 'No messages yet';
                    const contactName = lastMsg ? lastMsg.senderName : (chat.buyerId === 'user_curr' ? chat.sellerName : chat.buyerName);
                    
                    // Simple avatar helper based on contactName
                    const getSenderAvatar = (name: string) => {
                      if (!name) return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=60&h=60';
                      const lower = name.toLowerCase();
                      if (lower.includes('sujan')) {
                        return 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60&h=60';
                      }
                      if (lower.includes('haq') || lower.includes('showroom') || lower.includes('motors')) {
                        return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60&h=60';
                      }
                      if (lower.includes('siam')) {
                        return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60&h=60';
                      }
                      return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=60&h=60';
                    };

                    const avatarUrl = getSenderAvatar(contactName);

                    return (
                      <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] duration-200 ${
                          activeChatId === chat.id
                            ? 'bg-[#ff6600]/10 border-[#ff6600]/40 text-[#ff6600] dark:text-orange-400'
                            : isDarkMode 
                              ? 'bg-slate-950 border-slate-800 hover:border-slate-705' 
                              : 'bg-slate-50 border-slate-100 hover:border-orange-200'
                        }`}
                      >
                        {/* Title with Listing Image */}
                        <div className="flex gap-2.5 items-center">
                          {chat.listingImage && (
                            <img 
                              src={chat.listingImage} 
                              alt={chat.listingTitle} 
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800 flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <h4 className={`text-[11px] font-bold truncate leading-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                              {chat.listingTitle}
                            </h4>
                            <p className="text-[9.5px] font-bold text-slate-500 mt-0.5">{chat.listingPrice}</p>
                          </div>
                        </div>

                        {/* Middle: message text */}
                        <div className="mt-2 text-[10px] text-slate-600 dark:text-slate-400 line-clamp-2 bg-slate-100/40 dark:bg-slate-900/40 px-2 py-1.5 rounded-md border border-slate-200/30 dark:border-slate-800/20 italic">
                          "{lastMsgText}"
                        </div>

                        {/* Bottom: User profile photo + user name */}
                        <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-200/40 dark:border-slate-800/40">
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">User:</span>
                          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 py-0.5 px-2 rounded-full border border-slate-200 dark:border-slate-800">
                            <img 
                              src={avatarUrl} 
                              alt={contactName} 
                              className="w-3.5 h-3.5 rounded-full object-cover border border-[#ff6600]/10" 
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-[9.5px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-[90px]">{contactName}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Conversations Chat Area */}
                <div className="md:col-span-2">
                  {activeChatId && myChats.find(c => c.id === activeChatId) ? (
                    <ChatWindow
                      chat={myChats.find(c => c.id === activeChatId)!}
                      isDarkMode={isDarkMode}
                      onSendMessage={onSendMessage}
                      currentUserRole={
                        myChats.find(c => c.id === activeChatId)?.buyerId === 'user_curr' ? 'buyer' : 'seller'
                      }
                    />
                  ) : (
                    <div className={`p-8 py-20 rounded-xl border flex flex-col justify-center items-center text-center h-full ${
                      isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50/50 border-slate-200'
                    }`}>
                      <AlertCircle className="w-8 h-8 text-[#ff6600] mb-2 opacity-60 flex-shrink-0" />
                      <p className="text-xs text-slate-400 font-bold mb-1">Select a Conversation from list</p>
                      <p className="text-[10px] text-slate-500 max-w-xs leading-relaxed">
                        Always converse inside in-app messaging logs to guarantee safe local negotiations.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {currentTab === 'pricing-tool' && (
          <div className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 px-1.5 text-[9px] font-black bg-[#ff6600]/10 text-[#ff6600] dark:bg-orange-500/10 dark:text-orange-400 rounded-md">Live Beta</span>
              <h3 className={`text-sm md:text-base font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Automobile Market Valuation Tool
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-6 max-w-2xl leading-relaxed">
              Predict the accurate fair market value range of any vehicle in Bangladesh instantly. Our calculator analyzes manufacturer demand, year of manufacture depreciation, and average mileage thresholds in real-time.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Input fields */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Vehicle Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPricingForm({ ...pricingForm, type: 'car', brand: 'Toyota' })}
                      className={`py-2 rounded-xl text-[11px] font-bold transition-all ${
                        pricingForm.type === 'car'
                          ? 'bg-[#ff6600] text-white font-black'
                          : isDarkMode ? 'bg-slate-950 text-slate-400 border border-slate-800' : 'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}
                    >
                      🚗 Car / SUV
                    </button>
                    <button
                      type="button"
                      onClick={() => setPricingForm({ ...pricingForm, type: 'bike', brand: 'Yamaha' })}
                      className={`py-2 rounded-xl text-[11px] font-bold transition-all ${
                        pricingForm.type === 'bike'
                          ? 'bg-[#ff6600] text-white font-black'
                          : isDarkMode ? 'bg-slate-950 text-slate-400 border border-slate-800' : 'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}
                    >
                      🏍️ Motorcycle
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Manufacturer</label>
                    <select
                      value={pricingForm.brand}
                      onChange={(e) => setPricingForm({ ...pricingForm, brand: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      {pricingForm.type === 'car' ? (
                        <>
                          <option value="Toyota">Toyota</option>
                          <option value="Honda">Honda</option>
                          <option value="Nissan">Nissan</option>
                          <option value="Suzuki">Suzuki</option>
                        </>
                      ) : (
                        <>
                          <option value="Yamaha">Yamaha</option>
                          <option value="Suzuki">Suzuki</option>
                          <option value="Bajaj">Bajaj</option>
                          <option value="Hero">Hero</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Model / Trim</label>
                    <input
                      type="text"
                      placeholder="e.g. Premio / R15"
                      value={pricingForm.model}
                      onChange={(e) => setPricingForm({ ...pricingForm, model: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Year of Build</label>
                    <select
                      value={pricingForm.year}
                      onChange={(e) => setPricingForm({ ...pricingForm, year: parseInt(e.target.value) })}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Total Driven (KM)</label>
                    <input
                      type="number"
                      value={pricingForm.mileage}
                      onChange={(e) => setPricingForm({ ...pricingForm, mileage: Math.max(0, parseInt(e.target.value) || 0) })}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Condition</label>
                    <select
                      value={pricingForm.condition}
                      onChange={(e) => setPricingForm({ ...pricingForm, condition: e.target.value as any })}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="New">Brand New</option>
                      <option value="Reconditioned">Reconditioned (Import)</option>
                      <option value="Used">Local Used</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Fuel Type</label>
                    <select
                      value={pricingForm.fuelType}
                      onChange={(e) => setPricingForm({ ...pricingForm, fuelType: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="Octane">Octane / Petrol</option>
                      <option value="Hybrid">Hybrid Tech</option>
                      <option value="Electric">EV / Electric</option>
                      <option value="CNG">CNG / LPG Conversion</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calculateEstimate}
                  disabled={isEstimating}
                  className="w-full py-3 bg-[#ff6600] hover:bg-[#028d63] disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-orange-950/15 cursor-pointer"
                >
                  {isEstimating ? 'Analyzing Market Trends...' : 'Estimate Fair Value'}
                </button>
              </div>

              {/* Prediction Results Visual feedback */}
              <div className="lg:col-span-7">
                {estimatedValue ? (
                  <div className={`p-6 rounded-2xl border flex flex-col justify-between h-full relative overflow-hidden ${
                    isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-orange-50/20 border-orange-100/55'
                  }`}>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#ff6600] bg-[#ff6600]/10 px-2.5 py-1 rounded-full">
                        Market Evaluation Result
                      </span>

                      <div className="mt-4 space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          Fair Price Estimation Band (BDT)
                        </label>
                        <h2 className="text-xl md:text-2xl font-black text-[#ff6600] dark:text-orange-400 tracking-tight">
                          {estimatedValue.low} – {estimatedValue.high}
                        </h2>
                        <p className={`text-[10px] font-semibold leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                          Calculated based on standard dealer quotes, current active matching listings on <strong className="text-orange-600 dark:text-orange-400 font-extrabold">Chaka.bd</strong>, and historic depreciation scales.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-100'}`}>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Dhaka Demand Rating</span>
                          <span className={`text-[11px] font-black uppercase text-amber-500`}>
                            {estimatedValue.demand}
                          </span>
                        </div>
                        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-100'}`}>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Resale Value Index</span>
                          <span className="text-[11px] font-black text-orange-500">
                            {estimatedValue.resaleValue}
                          </span>
                        </div>
                        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-100'}`}>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Liquidity Duration</span>
                          <span className={`text-[11px] font-black uppercase text-sky-400`}>
                            {estimatedValue.liquidityTime}
                          </span>
                        </div>
                        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-100'}`}>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Depreciation Matrix</span>
                          <span className="text-[11px] font-black text-[#dc2626] dark:text-[#f87171]">
                            {estimatedValue.depreciationFactor} Depreciated
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[9.5px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                          Source status: Connected, synced with BD active portals
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`p-8 py-24 rounded-2xl border border-dashed flex flex-col justify-center items-center text-center h-full ${
                    isDarkMode ? 'bg-slate-950/20 border-slate-800' : 'bg-slate-50/40 border-slate-200'
                  }`}>
                    <Tag className="w-10 h-10 text-[#ff6600]/40 mb-3 animate-bounce" />
                    <p className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Select Fields and Estimate Price Range
                    </p>
                    <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                      Our intelligence tool will instantly render statistical estimates based on current BD vehicle directories.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {currentTab === 'profile' && (
          <div id="seller-profile-settings-container" className="space-y-6">
            <div className={`p-5 md:p-6 rounded-2xl border ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-solid border-slate-200/50 dark:border-slate-800/60 pb-4 mb-6">
                <div>
                  <span className="text-[10px] bg-orange-500/10 text-orange-500 font-extrabold px-2 py-0.5 rounded tracking-widest uppercase mb-1 inline-block">
                    User Account Center
                  </span>
                  <h3 className={`text-base md:text-lg font-black uppercase tracking-tight flex items-center gap-1.5 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    <User className="w-5 h-5 text-[#ff6600]" /> Customize Account Profile
                  </h3>
                  <p className="text-[11.5px] text-slate-450 mt-0.5">
                    Update your contact email address, personal phone specs, and reset your secure account password.
                  </p>
                </div>
                {onViewPublicProfile && (
                  <button
                    type="button"
                    onClick={() => onViewPublicProfile('user_curr')}
                    className="w-full sm:w-auto px-4.5 py-2.5 bg-gradient-to-r from-orange-600 to-teal-600 hover:from-orange-500 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-orange-500/10 transition-all transform hover:scale-102 flex items-center justify-center gap-2 cursor-pointer border border-[#ff6600]/20"
                  >
                    👁️ Visit My Public Profile
                  </button>
                )}
              </div>

              {/* Flex grids split layout */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* 1. Left side form inputs - Colspan 3 */}
                <form onSubmit={handleSaveProfile} className="lg:col-span-3 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Seller Display Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Seller Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex justify-between items-center">
                        <span>Membership / Quota Type</span>
                        <span className="text-[8px] bg-orange-500/10 text-[#ff6600] px-1 py-0.2 rounded font-extrabold uppercase">Dynamic limits</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedSub = !profileForm.isSubscribed;
                          setProfileForm({ ...profileForm, isSubscribed: updatedSub });
                        }}
                        className={`w-full flex items-center justify-between text-xs font-black py-2.5 px-3.5 rounded-xl border transition-all ${
                          profileForm.isSubscribed
                            ? 'bg-orange-500/10 border-orange-500/40 text-orange-400 shadow-sm'
                            : isDarkMode 
                              ? 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${profileForm.isSubscribed ? 'bg-orange-500 animate-pulse' : 'bg-slate-400'}`} />
                          {profileForm.isSubscribed ? 'Premium Subscribed Member' : 'Single / Free (Non-Subscribed)'}
                        </span>
                        <span className="text-[9px] uppercase font-bold underline text-[#ff6600] hover:text-orange-300">
                          {profileForm.isSubscribed ? 'Downgrade' : 'Upgrade Club'}
                        </span>
                      </button>
                    </div>

                    <div className="sm:col-span-2 space-y-4 pt-4 border-t border-solid border-slate-200/20 dark:border-slate-800/50 mt-2">
                      <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-400">
                        Profile Visual Preview
                      </label>
                      
                      {/* Banner / Cover Photo Container */}
                      <div 
                        className="w-full h-40 md:h-52 bg-cover bg-center rounded-2xl relative border-2 border-dashed border-slate-300 dark:border-slate-800 overflow-hidden shadow-inner flex items-end"
                        style={{ backgroundImage: `url(${profileForm.coverUrl || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1000'})` }}
                      >
                        {/* Dimmer overlay for text & button readability */}
                        <div className="absolute inset-0 bg-slate-950/25" />

                        {/* Direct Cover Edit overlay Button (Facebook-style) */}
                        <div className="absolute top-3 right-3 z-20">
                          <input 
                            type="file" 
                            accept="image/*"
                            id="user-cover-upload-direct"
                            onChange={(e) => handleFileChange(e, 'coverUrl')}
                            className="hidden"
                          />
                          <label 
                            htmlFor="user-cover-upload-direct"
                            className="cursor-pointer text-[10px] font-black uppercase bg-slate-900/80 hover:bg-slate-950 text-white backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/20 transition-all inline-flex items-center gap-1 shadow-md hover:scale-105"
                          >
                            <Camera className="w-3.5 h-3.5 text-orange-400" />
                            Change Cover Photo
                          </label>
                        </div>

                        {/* Overlapping Profile Avatar Badge */}
                        <div className="absolute -bottom-1 md:bottom-2 left-4 md:left-6 z-10 flex items-end gap-3.5 translate-y-3 md:translate-y-0">
                          <div className="relative shrink-0">
                            {/* Round avatar container - NO thick black/white border, just shadow */}
                            <div className="w-20 h-20 md:w-26 md:h-26 rounded-full shadow-lg overflow-hidden bg-slate-950">
                              <img 
                                referrerPolicy="no-referrer"
                                src={profileForm.avatarUrl || "https://i.ibb.co.com/hf583h7/towsif.jpg"} 
                                alt="Avatar preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Direct Avatar Edit Overlay Trigger */}
                            <input 
                              type="file" 
                              accept="image/*"
                              id="user-avatar-upload-direct"
                              onChange={(e) => handleFileChange(e, 'avatarUrl')}
                              className="hidden"
                            />
                            <label 
                              htmlFor="user-avatar-upload-direct"
                              className="absolute bottom-0 right-0 bg-[#ff6600] hover:bg-[#eb5e00] text-white p-1.5 rounded-full border border-white dark:border-slate-900 shadow-md hover:scale-110 transition-all inline-flex items-center justify-center cursor-pointer shrink-0"
                              title="Change Photo"
                            >
                              <Camera className="w-3.5 h-3.5 text-white" />
                            </label>
                          </div>

                          <div className="mb-2 hidden md:block">
                            <h4 className="text-sm font-black text-white drop-shadow-md flex items-center gap-1">
                              {profileForm.name || 'Towsif Mahbub'}
                              <span className="text-[9px] bg-orange-500 text-neutral-900 px-1.5 py-0.5 rounded font-black uppercase">Live Preview</span>
                            </h4>
                            <p className="text-[10px] text-slate-200 drop-shadow-xs">{profileForm.location}, {profileForm.division}</p>
                          </div>
                        </div>
                      </div>

                      {/* Display live preview info block on mobile below top-aligned visual elements */}
                      <div className="pt-2 md:hidden">
                        <h4 className={`text-xs font-black flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          {profileForm.name || 'Towsif Mahbub'}
                          <span className="text-[8px] bg-orange-500 text-neutral-900 px-1 py-0.5 rounded font-black uppercase inline-block">Preview</span>
                        </h4>
                        <p className="text-[9px] text-slate-400">{profileForm.location}, {profileForm.division}</p>
                      </div>
                    </div>
                  </div>

                  {/* Connected 3-Tier Regional Geolocation Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Division *
                      </label>
                      <select
                        value={profileForm.division}
                        onChange={(e) => {
                          const div = e.target.value;
                          const dists = BANGLADESH_DISTRICTS_BY_DIVISION[div] || [];
                          const firstDist = dists[0] || 'Dhaka';
                          const areas = BANGLADESH_AREAS_BY_DISTRICT[firstDist] || [];
                          const firstArea = areas[0] || 'Gulshan 2';
                          
                          setSelectedUserDistrict(firstDist);
                          setProfileForm({ 
                            ...profileForm, 
                            division: div, 
                            location: firstArea 
                          });
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
                        value={selectedUserDistrict}
                        onChange={(e) => {
                          const dist = e.target.value;
                          const areas = BANGLADESH_AREAS_BY_DISTRICT[dist] || [];
                          const firstArea = areas[0] || 'Gulshan 2';
                          
                          setSelectedUserDistrict(dist);
                          setProfileForm({ 
                            ...profileForm, 
                            location: firstArea 
                          });
                        }}
                        className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all cursor-pointer ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      >
                        {(BANGLADESH_DISTRICTS_BY_DIVISION[profileForm.division] || []).map((dist) => (
                          <option key={dist} value={dist}>{dist}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Location Area *
                      </label>
                      <select
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all cursor-pointer ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      >
                        {(BANGLADESH_AREAS_BY_DISTRICT[selectedUserDistrict] || []).map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {profileSuccessMsg && (
                    <div className="p-3 text-[11px] font-bold rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                      👍 {profileSuccessMsg}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="text-xs font-black py-2.5 px-5 bg-[#ff6600] hover:bg-[#eb5e00] text-white transition-all rounded-xl cursor-pointer shadow-md inline-flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" /> Save Profile Details
                    </button>
                  </div>
                </form>

                {/* 2. Right side password updater & live visual preview - Colspan 2 */}
                <div className="lg:col-span-2 space-y-6 lg:border-l lg:border-solid lg:border-slate-800/40 lg:pl-6">
                  
                  {/* Password reset form card block */}
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-orange-500" /> Account Security Credentials
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
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
                        <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
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
                        <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
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
                      className="w-full text-[#ff6600] dark:text-orange-400 bg-slate-950 hover:bg-slate-900 border border-slate-800 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Update Password Credentials
                    </button>
                  </form>

                  {/* Profile badge status illustration */}
                  <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                    isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-[8.5px] uppercase font-black px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500 border border-orange-500/15">
                      Live Store ID
                    </span>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      Your registered email is synchronized. Potential buyers can see your listings under name <strong className="text-orange-500">{profileForm.name}</strong> at <strong className="text-orange-500">{profileForm.location}, {profileForm.division}</strong>.
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}
      </div>

      {/* Edit Listing Modal Overlay */}
      {editingListing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fadeIn select-none">
          <div className={`w-full max-w-lg rounded-2.5xl border p-6 shadow-2xl relative ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button 
              type="button"
              onClick={() => setEditingListing(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-450 hover:text-[#ff6600] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-sm font-black uppercase tracking-wider text-[#ff6600] mb-1 font-sans">
              ✏️ Edit Listing Details
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4 font-semibold font-sans">
              Modify your advertisement details and update instantly.
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Listing Title *
                </label>
                <input 
                  type="text" 
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
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
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  {Number(editForm.price) > 0 && (
                    <span className="block text-[9.5px] font-bold text-orange-500 mt-1">
                      💡 BDT {Number(editForm.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Vehicle Condition *
                  </label>
                  <select 
                    value={editForm.condition}
                    onChange={(e) => setEditForm({...editForm, condition: e.target.value as any})}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-[#ff6600] cursor-pointer ${
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
                    value={editForm.mileage}
                    onChange={(e) => setEditForm({...editForm, mileage: e.target.value})}
                    className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border focus:outline-none focus:border-orange-500 transition-all ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 font-sans'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Engine Capacity (e.g. cc)
                  </label>
                  <input 
                    type="text" 
                    value={editForm.engineCapacity}
                    onChange={(e) => setEditForm({...editForm, engineCapacity: e.target.value})}
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
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
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
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
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
                  className="flex-1 bg-[#ff6600] hover:bg-[#eb5e00] text-white py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer border-none outline-none"
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
