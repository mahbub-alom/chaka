import React, { useState, useRef } from 'react';
import { 
  Upload, CheckCircle, Loader2, Plus, X, Tag, Shield, Info, CheckSquare, Square, Check, GripVertical, Sparkles, AlertTriangle, Crown, User
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BANGLADESH_DIVISIONS, BANGLADESH_LOCATIONS, BANGLADESH_DISTRICTS_BY_DIVISION, BANGLADESH_AREAS_BY_DISTRICT, VEHICLE_BRANDS, formatBDT } from '@/lib/data';
import { convertToWebP } from '@/utils/imageUtils';
import { VehicleListing } from '@/types';

interface PostAdFormProps {
  isDarkMode: boolean;
  sellerType: 'private' | 'showroom';
  showroomProfile?: any;
  userProfile?: any;
  onPostAd: (newAd: Partial<VehicleListing>) => void;
  onSuccess: () => void;
}

const BODY_TYPES: Record<string, string[]> = {
  car: ['Sedan', 'SUV', 'Hatchback', 'Crossover', 'Coupe', 'Mini Van', 'MPV', 'Pickup Truck'],
  bike: ['Sports Bike', 'Commuter', 'Cruiser', 'Scooter', 'Dirt Bike', 'Cafe Racer', 'Naked Street'],
  parts: ['Engine Parts', 'Tyres & Rims', 'Suspension & Brakes', 'Interior Accessories', 'Exterior Body', 'Electrical & Lights', 'Oils & Lubricants'],
  service: ['Car Wash & Detailing', 'Engine Repair', 'Brake & AC Tuning', 'Painting & Denting', 'Emergency Roadside Assist', 'General Servicing'],
  commercial: ['Truck', 'Pickup', 'Bus', 'Microbus', 'Tractor', 'Other']
};

const FEATURES_LIST: Record<string, string[]> = {
  car: ['ABS Braking', 'Sunroof', 'Alloy Wheels', 'Back Camera', 'Leather Seats', 'Keyless Entry', 'Adaptive Cruise Control', 'Dual Zone AC', '360 Camera', 'Panoramic Roof', 'Push Start', 'Projection LED'],
  bike: ['ABS Braking', 'Dual Disc Brakes', 'Fuel Injection (FI)', 'LED Headlamp', 'Digital Instrument Cluster', 'Engine Kill Switch', 'Tubeless Tyres', 'Monoshock Suspension', 'Bluetooth Connectivity'],
  parts: ['Genuine OEM', 'Imported & Duty Paid', 'Manufacturer Warranty Included', 'Includes Free Fitment', 'Premium Build Quality'],
  service: ['Hassle-Free Direct Booking', 'Certified Technicians Only', 'Home/Office Service Offered', 'Genuine Spares Guaranteed', 'Post-Service Coverage Warranty'],
  commercial: ['Heavy Utility Payload Chassis', 'Eco-Friendly Low Emission', 'All Original Documents Up To Date', 'Spacious Cabin Design', 'Includes Spare Tyre & Tools']
};

export default function PostAdForm({
  isDarkMode,
  sellerType,
  showroomProfile,
  userProfile,
  onPostAd,
  onSuccess
}: PostAdFormProps) {
  const { language } = useLanguage();
  const [formSuccess, setFormSuccess] = useState(false);
  const [isPhotoConverting, setIsPhotoConverting] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStartThumb = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOverThumb = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    setFormData(prev => {
      const list = [...prev.images];
      const targetItem = list[draggedIndex];
      if (!targetItem) return prev;
      list.splice(draggedIndex, 1);
      list.splice(index, 0, targetItem);
      return { ...prev, images: list };
    });
    setDraggedIndex(index);
  };

  const handleDragEndThumb = () => {
    setDraggedIndex(null);
  };

  const [formData, setFormData] = useState({
    title: '',
    type: 'car' as any, // 'car' | 'bike' | 'parts' | 'service' | 'commercial'
    brand: 'Toyota',
    model: '',
    year: 2022,
    condition: 'Used' as const,
    price: '',
    engineCapacity: '',
    mileage: '',
    fuelType: 'Octane' as any,
    transmission: 'Automatic' as any,
    division: sellerType === 'showroom' ? (showroomProfile?.division || 'Dhaka') : 'Dhaka',
    location: (() => {
      if (sellerType === 'showroom' && showroomProfile) {
        const div = showroomProfile.division || 'Dhaka';
        const loc = showroomProfile.location;
        const divLocs = BANGLADESH_LOCATIONS[div] || BANGLADESH_LOCATIONS['Dhaka'];
        if (loc && Array.isArray(divLocs) && divLocs.includes(loc)) {
          return loc;
        }
        return (divLocs && divLocs[0]) || 'Gulshan 2';
      }
      return BANGLADESH_LOCATIONS['Dhaka']?.[0] || 'Gulshan 2';
    })(),
    address: '',
    description: '',
    sellerPhone: sellerType === 'showroom' ? (showroomProfile?.phone || '01711223344') : (userProfile?.phone || '01712345678'),
    images: [] as string[],
    bodyType: 'Sedan',
    exteriorColor: '',
    registrationYear: '',
    seatingCapacity: '',
    taxFitnessValidity: '',
    enginePower: '',
    fuelEfficiency: '',
    selectedFeatures: [] as string[]
  });

  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    const defaultDiv = sellerType === 'showroom' ? (showroomProfile?.division || 'Dhaka') : 'Dhaka';
    const defaultLoc = sellerType === 'showroom' ? (showroomProfile?.location || 'Gulshan 2') : 'Gulshan 2';
    
    for (const [dist, areas] of Object.entries(BANGLADESH_AREAS_BY_DISTRICT)) {
      if (Array.isArray(areas) && areas.includes(defaultLoc)) {
        return dist;
      }
    }
    return (BANGLADESH_DISTRICTS_BY_DIVISION[defaultDiv] && BANGLADESH_DISTRICTS_BY_DIVISION[defaultDiv][0]) || 'Dhaka';
  });

  const handleTypeChange = (type: string) => {
    // Determine default brand
    const brands = VEHICLE_BRANDS[type as keyof typeof VEHICLE_BRANDS] || ['Other'];
    const defaultBrand = brands[0];
    
    // Determine default bodyType
    const bTypes = BODY_TYPES[type] || ['Other'];
    const defaultBodyType = bTypes[0];

    // Reset properties depending on category
    setFormData(prev => ({
      ...prev,
      type,
      brand: defaultBrand,
      bodyType: defaultBodyType,
      selectedFeatures: [],
      // Sensible updates for capacity and mileage
      engineCapacity: type === 'parts' || type === 'service' ? 'N/A' : (type === 'bike' ? '150 cc' : '1500 cc'),
      mileage: type === 'parts' || type === 'service' ? '0' : '35000'
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => {
      const idx = prev.selectedFeatures.indexOf(feature);
      let updated = [...prev.selectedFeatures];
      if (idx > -1) {
        updated.splice(idx, 1);
      } else {
        updated.push(feature);
      }
      return { ...prev, selectedFeatures: updated };
    });
  };

  const handleAddImage = (url: string) => {
    if (!url) return;
    const isPremiumEligible = sellerType === 'showroom' || userProfile?.isSubscribed === true;
    const maxPhotosLimit = isPremiumEligible ? 10 : 5;

    if (formData.images.length >= maxPhotosLimit) {
      alert(`Upload Limit Reached: As a ${isPremiumEligible ? 'Registered/Showroom Member' : 'Single/Non-Subscribed Free User'}, you can upload a maximum of ${maxPhotosLimit} photos.`);
      return;
    }

    setFormData(prev => {
      if (prev.images.includes(url)) return prev;
      return { ...prev, images: [...prev.images, url] };
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => {
      const updated = [...prev.images];
      updated.splice(index, 1);
      return { ...prev, images: updated };
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
    e.target.value = '';
  };

  const processFiles = async (files: FileList) => {
    const isPremiumEligible = sellerType === 'showroom' || userProfile?.isSubscribed === true;
    const maxPhotosLimit = isPremiumEligible ? 10 : 5;

    if (formData.images.length >= maxPhotosLimit) {
      alert(`Upload Limit Reached: As a ${isPremiumEligible ? 'Registered/Showroom Member' : 'Single/Non-Subscribed Free User'}, you can upload a maximum of ${maxPhotosLimit} photos per ad.`);
      return;
    }

    setIsPhotoConverting(true);
    try {
      const list: string[] = [];
      const remainingSlots = maxPhotosLimit - formData.images.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);

      for (let i = 0; i < filesToProcess.length; i++) {
        const file = filesToProcess[i];
        if (file.type.match(/image.*/)) {
          const webpUrl = await convertToWebP(file, 1200, 0.82);
          list.push(webpUrl);
        }
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...list]
      }));

      if (files.length > remainingSlots) {
        alert(`Overage Ignored: You can only upload up to ${maxPhotosLimit} photos. We uploaded the first ${remainingSlots} photo(s) and ignored the rest. Upgrade to premium / login as Showroom to upload up to 10 photos!`);
      }
    } catch (err) {
      console.error("WebP conversions failed: ", err);
    } finally {
      setIsPhotoConverting(false);
    }
  };

  const handleSubmitAd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.model) {
      alert("Please fill out all mandatory inputs!");
      return;
    }

    const numericPrice = Number(formData.price) || 0;
    const formattedPrice = formatBDT(numericPrice);

    // Fallback pictures in case user did not upload any images of their own
    const placeholderMap: Record<string, string> = {
      car: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
      bike: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
      parts: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
      service: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600',
      commercial: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
      ev: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600',
      threewheeler: 'https://images.unsplash.com/photo-1593789198777-f29bc259780e?auto=format&fit=crop&q=80&w=600',
      bicycle: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600'
    };

    const finalImages = formData.images.length > 0 
      ? formData.images 
      : [placeholderMap[formData.type] || placeholderMap.car];

    const newAd: Partial<VehicleListing> = {
      id: `${formData.type}_ad_${Date.now()}`,
      title: formData.title,
      type: formData.type,
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year) || 2022,
      condition: formData.condition,
      price: numericPrice,
      priceFormatted: formattedPrice,
      engineCapacity: formData.engineCapacity || 'N/A',
      mileage: Number(formData.mileage) || 0,
      fuelType: formData.fuelType,
      transmission: formData.transmission,
      division: formData.division,
      location: formData.location,
      address: formData.address || '',
      bodyType: formData.bodyType,
      exteriorColor: formData.exteriorColor || 'Premium Shade',
      registrationYear: formData.registrationYear || 'Unregistered',
      seatingCapacity: formData.seatingCapacity,
      taxFitnessValidity: formData.taxFitnessValidity,
      enginePower: formData.enginePower,
      fuelEfficiency: formData.fuelEfficiency,
      features: formData.selectedFeatures,
      description: formData.description || `Excellent service matching all demands. Located at ${formData.location}, ${formData.division}. Contact seller on ${formData.sellerPhone}`,
      images: finalImages,
      // Handle Haq Bay Motors' specific showroom logic
      sellerName: sellerType === 'showroom' ? (showroomProfile?.name || 'Haq Bay Motors') : (userProfile?.name || 'Sujan Ahmed'),
      sellerPhone: formData.sellerPhone,
      sellerType: sellerType,
      showroomName: sellerType === 'showroom' ? (showroomProfile?.name || 'Haq Bay Motors') : undefined,
      isShowroomVerified: sellerType === 'showroom',
      createdAt: new Date().toISOString(),
      views: 0,
      userId: sellerType === 'showroom' ? 'sr_1' : 'user_curr'
    };

    onPostAd(newAd);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      onSuccess();
    }, 1500);
  };

  const brands = VEHICLE_BRANDS[formData.type as keyof typeof VEHICLE_BRANDS] || ['Other'];
  const curBodyTypes = BODY_TYPES[formData.type] || ['Other'];
  const curFeatures = FEATURES_LIST[formData.type] || [];

  return (
    <div id="unified-post-ad-form-wrapper" className="space-y-6">
      {formSuccess && (
        <div id="post-ad-success" className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center gap-2 text-xs font-bold animate-pulse">
          <CheckCircle className="w-5 h-5 text-orange-400" /> 
          {language === 'bn' 
            ? 'অভিনন্দন! চাকা বিডিতে আপনার বিজ্ঞাপনটি সফলভাবে প্রকাশ করা হয়েছে। রিডাইরেক্ট করা হচ্ছে...' 
            : 'Congratulations! Ad published successfully on Chaka BD. Redirecting to listings...'}
        </div>
      )}

      <form id="post-ad-main-form" onSubmit={handleSubmitAd} className="space-y-6">
        
        {/* Category selector */}
        <div className="space-y-2">
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'bn' ? 'ক্যাটাগরি নির্বাচন করুন *' : 'Choose Category *'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 'car', icon: '🚗', name: language === 'bn' ? 'গাড়ি' : 'Cars' },
              { id: 'bike', icon: '🏍️', name: language === 'bn' ? 'বাইক' : 'Bikes' },
              { id: 'parts', icon: '⚙️', name: language === 'bn' ? 'পার্টস ও যন্ত্রাংশ' : 'Parts & Spares' },
              { id: 'service', icon: '🛠️', name: language === 'bn' ? 'সেবাপ্রদান' : 'Services' },
              { id: 'commercial', icon: '🚛', name: language === 'bn' ? 'কমার্শিয়াল / অন্যান্য' : 'Commercial / Other' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                id={`cat-select-${cat.id}`}
                onClick={() => handleTypeChange(cat.id)}
                className={`p-3 rounded-xl border font-extrabold text-[11px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  formData.type === cat.id
                    ? 'bg-[#ff6600]/10 border-[#ff6600] text-[#ff6600]'
                    : isDarkMode 
                      ? 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700' 
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-neutral-100'
                }`}
              >
                <span className="text-xl leading-none">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title, Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
              {language === 'bn' ? 'বিজ্ঞাপনের শিরোনাম *' : 'Ad Listing Title *'}
            </label>
            <input
              type="text"
              required
              id="ad-title-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={
                formData.type === 'parts' 
                  ? (language === 'bn' ? 'যেমন: Michelin Pilot Sport 5 - সাইজ ২২৫/৪৫ আর১৭' : 'e.g. Michelin Pilot Sport 5 - Size 225/45 R17')
                  : formData.type === 'service'
                    ? (language === 'bn' ? 'যেমন: হাইব্রিড ব্যাটারি কন্ডিশন সার্ভিস প্যাকেজ' : 'e.g. Hybrid Battery Health Restoration Package')
                    : (language === 'bn' ? 'যেমন: টয়োটা প্রিমিও জি-সুপিরিয়র ২০১৮ কন্ডিশন' : 'e.g. Toyota Premio G-Superior 2018 Pristine')
              }
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#ff6600] focus:bg-white'
              }`}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
              {language === 'bn' ? 'ব্র্যান্ড / প্রস্তুতকারক *' : 'Brand / Manufacturer *'}
            </label>
            <select
              id="ad-brand-select"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
              <option value="Other">{language === 'bn' ? 'অন্যান্য / তালিকায় নেই' : 'Other / Non-listed'}</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
              {language === 'bn' ? 'মডেলের নাম / সাব-আইটেম *' : 'Model Name / Sub-item *'}
            </label>
            <input
              type="text"
              required
              id="ad-model-input"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              placeholder={language === 'bn' ? 'যেমন: Corolla, R15 V4, Brake Pad, Polish' : 'e.g. Corolla, R15 V4, Brake Pad, Polish'}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#ff6600] focus:bg-white'
              }`}
            />
          </div>
        </div>

        {/* Pricing, condition and metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
              {language === 'bn' ? 'কাঙ্ক্ষিত মূল্য (টাকায়) *' : 'Expected Price (in BDT) *'}
            </label>
            <div className="relative">
              <input
                type="number"
                required
                id="ad-price-input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 2650000"
                className={`w-full pl-3.5 pr-14 py-2.5 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#ff6600] focus:bg-white'
                }`}
              />
              <span className="absolute right-3.5 top-2.5 text-[10px] font-black text-slate-500">BDT</span>
            </div>
            {formData.price && (
              <span className="text-[10px] font-extrabold text-[#ff6600] mt-1 block">
                💵 {language === 'bn' ? 'সমপরিমাণ মূল্য:' : 'Equivalent to:'} {formatBDT(Number(formData.price))}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
              {language === 'bn' ? 'গাড়ির বর্তমান অবস্থা (Condition) *' : 'Condition *'}
            </label>
            <select
              id="ad-condition-select"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <option value="Used">{language === 'bn' ? 'ব্যবহৃত (Used)' : 'Used Item'}</option>
              {formData.type !== 'service' && <option value="New">{language === 'bn' ? 'একদম নতুন (Brand New)' : 'Brand New Item'}</option>}
              {['car', 'bike', 'commercial'].includes(formData.type) && <option value="Reconditioned">{language === 'bn' ? 'রিকন্ডিশন্ড (Reconditioned)' : 'Reconditioned Option'}</option>}
            </select>
          </div>

          {['car', 'bike', 'commercial'].includes(formData.type) ? (
            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Manufacturing Year *</label>
              <input
                type="number"
                min="1995"
                max="2026"
                required
                id="ad-year-input"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Product Status Note</label>
              <input
                type="text"
                placeholder="e.g. In Stock / Ready to Fit"
                value={formData.taxFitnessValidity}
                onChange={(e) => setFormData({ ...formData, taxFitnessValidity: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-850'
                }`}
              />
            </div>
          )}
        </div>

        {/* Engine Capacity, Mileage, Transmission, Fuel */}
        {['car', 'bike', 'commercial'].includes(formData.type) && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Engine Displacement (cc)</label>
              <input
                type="text"
                required
                id="ad-capacity-input"
                value={formData.engineCapacity}
                onChange={(e) => setFormData({ ...formData, engineCapacity: e.target.value })}
                placeholder="e.g. 1500 cc, 150 cc"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Total Mileage (km)</label>
              <input
                type="number"
                required
                id="ad-mileage-input"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                placeholder="e.g. 42000"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Fuel Type *</label>
              <select
                id="ad-fuel-select"
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as any })}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <option value="Octane">Octane</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric EV</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG / LPG</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Transmission *</label>
              <select
                id="ad-transmission-select"
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value as any })}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual Gear</option>
                <option value="Tiptronic">Dual Clutch/Tiptronic</option>
              </select>
            </div>
          </div>
        )}

        {/* SPECIFICATION EXTENSION SPECIFIC FIELDS */}
        <div className="border-t border-dashed border-slate-800/30 dark:border-slate-800/60 pt-5 space-y-4">
          <span className="text-[11px] font-extrabold text-[#ff6600] uppercase tracking-wider block">
            Specifications & Metadata ⚙️
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            {/* Body Type Select Dropdown (RESOLVES: Dropdown for Body Type) */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Body Type Category *</label>
              <select
                id="ad-bodytype-select"
                value={formData.bodyType}
                onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {curBodyTypes.map((bType) => (
                  <option key={bType} value={bType}>{bType}</option>
                ))}
                <option value="Other">Other / Spares</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Exterior / Finish Color</label>
              <input
                type="text"
                id="ad-color-input"
                value={formData.exteriorColor}
                onChange={(e) => setFormData({ ...formData, exteriorColor: e.target.value })}
                placeholder="e.g. Pearl White, Gloss Black"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            {['car', 'bike', 'commercial'].includes(formData.type) ? (
              <>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Registration Year</label>
                  <input
                    type="text"
                    id="ad-reg-year-input"
                    value={formData.registrationYear}
                    onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })}
                    placeholder="e.g. 2022 or Unregistered"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Seating Capacity</label>
                  <input
                    type="text"
                    id="ad-seating-input"
                    value={formData.seatingCapacity}
                    onChange={(e) => setFormData({ ...formData, seatingCapacity: e.target.value })}
                    placeholder="e.g. 5 Seats, 2 Seats"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Compatibility Details</label>
                  <input
                    type="text"
                    value={formData.registrationYear}
                    onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })}
                    placeholder="e.g. Fit Toyota / Universal"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                      isDarkMode ? 'bg-[#ff6600]/5 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Service Schedule / Time</label>
                  <input
                    type="text"
                    value={formData.seatingCapacity}
                    onChange={(e) => setFormData({ ...formData, seatingCapacity: e.target.value })}
                    placeholder="e.g. Takes 3-5 Hours"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                      isDarkMode ? 'bg-[#ff6600]/5 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </>
            )}
          </div>

          {['car', 'bike', 'commercial'].includes(formData.type) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Tax & Fitness Expiry</label>
                <input
                  type="text"
                  value={formData.taxFitnessValidity}
                  onChange={(e) => setFormData({ ...formData, taxFitnessValidity: e.target.value })}
                  placeholder="e.g. Oct 2027"
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Engine Max Power</label>
                <input
                  type="text"
                  value={formData.enginePower}
                  onChange={(e) => setFormData({ ...formData, enginePower: e.target.value })}
                  placeholder="e.g. 115 bhp @ 6000 RPM"
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Fuel Efficiency (km/L)</label>
                <input
                  type="text"
                  value={formData.fuelEfficiency}
                  onChange={(e) => setFormData({ ...formData, fuelEfficiency: e.target.value })}
                  placeholder="e.g. 12-15 km/L"
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>
          )}

          {['car', 'bike', 'commercial'].includes(formData.type) && (
            <div className="space-y-2 pt-1 col-span-full">
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400">Extra Vehicle Features (Select Multiple)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['AC: Back Camera', 'Power Steering', 'Keyless Entry', 'Panoramic Sunroof', 'Alloy Wheels', 'Leather Seats', 'LED Headlights', 'Abs Braking Support'].map((feat) => {
                  const isSelected = formData.selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => handleFeatureToggle(feat)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-[11px] font-bold transition-all ${
                        isSelected 
                          ? 'bg-[#ff6600]/10 border-[#ff6600] text-[#ff6600]' 
                          : isDarkMode 
                            ? 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700' 
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-4 h-4 shrink-0 text-[#ff6600]" />
                      ) : (
                        <div className="w-4 h-4 rounded border border-slate-400 dark:border-slate-600 shrink-0" />
                      )}
                      <span className="truncate">{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Division, District, Area & hotline contact number (RESOLVES: 3-tier Connected Location Logic) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-dashed border-slate-800/30 dark:border-slate-800/60 pt-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Division *</label>
            <select
              id="ad-division-select"
              value={formData.division}
              onChange={(e) => {
                const newDiv = e.target.value;
                const dists = BANGLADESH_DISTRICTS_BY_DIVISION[newDiv] || [];
                const firstDist = dists[0] || 'Dhaka';
                const areas = BANGLADESH_AREAS_BY_DISTRICT[firstDist] || [];
                const firstArea = areas[0] || 'Gulshan 2';
                
                setSelectedDistrict(firstDist);
                setFormData({ 
                  ...formData, 
                  division: newDiv, 
                  location: firstArea 
                });
              }}
              className={`w-full px-3 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {BANGLADESH_DIVISIONS.map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">District *</label>
            <select
              id="ad-district-select"
              value={selectedDistrict}
              onChange={(e) => {
                const newDist = e.target.value;
                const areas = BANGLADESH_AREAS_BY_DISTRICT[newDist] || [];
                const firstArea = areas[0] || 'Gulshan 2';
                
                setSelectedDistrict(newDist);
                setFormData({ 
                  ...formData, 
                  location: firstArea 
                });
              }}
              className={`w-full px-3 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {(BANGLADESH_DISTRICTS_BY_DIVISION[formData.division] || []).map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Deep Area Location *</label>
            <select
              id="ad-location-select"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full px-3 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {(BANGLADESH_AREAS_BY_DISTRICT[selectedDistrict] || []).map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Hotline Contact Number *</label>
            <input
              type="text"
              required
              id="ad-phone-input"
              value={formData.sellerPhone}
              onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
          </div>
        </div>

        {/* Custom Detailed Address (Resolves: Custom address box add listed demand) */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400">
            Custom Detailed Address / Landmark (Road #, House #, Block/Sector, Land Mark)
          </label>
          <input
            type="text"
            placeholder="e.g., House 12/B, Road 4, Sector 3, Near Jamuna Future Park / Haq Showroom"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none font-medium ${
              isDarkMode 
                ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-orange-500 placeholder:text-slate-500' 
                : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-orange-500'
            }`}
          />
        </div>

        {/* Premium Multi-photo Upload system (RESOLVES: Multiple photo upload system) */}
        <div className="space-y-5 border-t border-solid border-slate-100 dark:border-slate-800 pt-6">
          {/* Active Quota status bar */}
          <div className="p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all bg-gradient-to-r from-orange-500/[0.03] via-teal-500/[0.01] to-transparent dark:from-slate-900/35 dark:to-slate-950/20 border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {(sellerType === 'showroom' || userProfile?.isSubscribed === true) ? (
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-xs animate-pulse">
                    <Crown className="w-3 h-3 text-amber-500 shrink-0" />
                    Premium Upload Quota Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 border border-slate-500/10 shadow-xs">
                    <User className="w-3 h-3 text-slate-400 shrink-0" />
                    Standard Upload Tier
                  </span>
                )}
                <span className="text-[10px] text-slate-400 font-bold">• High-speed CDN Optimize</span>
              </div>
              <h4 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Photo Capacity Quota: <span className="text-[#ff6600]">{formData.images.length}</span> / <span className="font-extrabold">{(sellerType === 'showroom' || userProfile?.isSubscribed === true) ? 10 : 5} Loaded</span>
              </h4>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-normal font-medium">
                {(sellerType === 'showroom' || userProfile?.isSubscribed === true) 
                  ? "✓ Up to 10 photos activated for premium look and high-priority search indexing." 
                  : "⌛ Max 5 photos. Upgrade your account Profile to Subscribed Premium status to unlock up to 10 photos!"}
              </p>
            </div>
            {/* Visual Progress bar */}
            <div className="w-full md:w-56 space-y-2 shrink-0">
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200/40 dark:border-slate-800">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    formData.images.length === ((sellerType === 'showroom' || userProfile?.isSubscribed === true) ? 10 : 5) 
                      ? 'bg-gradient-to-r from-red-500 to-rose-600' 
                      : formData.images.length >= ((sellerType === 'showroom' || userProfile?.isSubscribed === true) ? 8 : 4) 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                        : 'bg-gradient-to-r from-orange-500 to-teal-500'
                  }`}
                  style={{ width: `${Math.min((formData.images.length / ((sellerType === 'showroom' || userProfile?.isSubscribed === true) ? 10 : 5)) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-extrabold text-slate-400 dark:text-slate-450 uppercase tracking-wider">
                <span>{formData.images.length} Used</span>
                <span>{Math.max(0, ((sellerType === 'showroom' || userProfile?.isSubscribed === true) ? 10 : 5) - formData.images.length)} Slots Left</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <label className="block text-[11px] font-black uppercase text-[#ff6600] tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              Upload & Drag-to-Arrange Gallery Panel
            </label>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md flex items-center gap-1">
              <span>💡</span> Order changes apply instantly in live listings
            </span>
          </div>

          <div 
            id="multi-photo-dropzone"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-250 flex flex-col items-center justify-center gap-3 relative overflow-hidden ${
              isDragActive 
                ? 'border-[#ff6600] bg-orange-500/[0.05] shadow-[0_0_15px_rgba(2,154,108,0.1)]' 
                : isDarkMode 
                  ? 'border-slate-800 bg-slate-950/40 hover:border-[#ff6600]/60 hover:bg-slate-900/20' 
                  : 'border-slate-200 bg-slate-50/40 hover:border-[#ff6600]/50 hover:bg-slate-50/90'
            }`}
          >
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            
            {isPhotoConverting ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <Loader2 className="w-9 h-9 text-[#ff6600] animate-spin" />
                <span className="text-[11px] text-[#ff6600] font-black uppercase tracking-widest animate-pulse">Processing & Optimizing Images to WebP Format...</span>
                <p className="text-[9px] text-slate-400 font-bold">Resizing & compressing locally in the browser</p>
              </div>
            ) : (
              <div className="space-y-2 py-2">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/5 text-[#ff6600] flex items-center justify-center mx-auto mb-1 group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5 text-[#ff6600]" />
                </div>
                <div className="space-y-1">
                  <p className={`text-xs font-black ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    Drag & Drop ONE OR MULTIPLE pictures here, or <span className="text-[#ff6600] hover:underline">Browse Files</span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold max-w-md mx-auto leading-normal">
                    Supports JPG, PNG, WEBP, and HEIC files. Images are auto-optimized instantly for fast client page loading speed.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Render thumbnails stream scroll list */}
          {formData.images.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-450 flex items-center gap-1.5 pl-1">
                <GripVertical className="w-3.5 h-3.5 text-orange-500" />
                Active Upload Sequence (Drag left/right to change sorting hierarchy)
              </span>
              <div 
                id="ad-thumbnails-tray" 
                className={`flex items-center gap-4 overflow-x-auto pb-4 pt-1.5 px-1.5 rounded-2xl transition-all ${
                  draggedIndex !== null ? 'bg-orange-500/[0.02] ring-1 ring-dashed ring-orange-500/20' : ''
                }`}
              >
                {formData.images.map((imgUrl, index) => {
                  const isBeingDragged = index === draggedIndex;
                  return (
                    <div 
                      key={index} 
                      draggable={true}
                      onDragStart={(e) => handleDragStartThumb(e, index)}
                      onDragOver={(e) => handleDragOverThumb(e, index)}
                      onDragEnd={handleDragEndThumb}
                      className={`relative group shrink-0 w-32 h-24 rounded-2xl overflow-hidden shadow-xs border cursor-grab active:cursor-grabbing transition-all duration-150 ${
                        isBeingDragged 
                          ? 'border-orange-500 ring-2 ring-orange-500 opacity-45 scale-95' 
                          : isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50 hover:border-orange-500/60'
                      }`}
                    >
                      <img 
                        referrerPolicy="no-referrer"
                        src={imgUrl} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-full object-cover select-none"
                      />
                      
                      {/* Drag cover overlay */}
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="p-1 px-2 bg-black/75 text-white backdrop-blur-xs flex items-center gap-1 scale-[0.8] rounded-lg">
                          <GripVertical className="w-3 h-3 text-orange-400" />
                          <span className="text-[8px] font-black uppercase whitespace-nowrap tracking-wide">Hold & Move</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-full transition-colors border border-white/10"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className={`absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-lg text-[8.5px] font-extrabold text-white uppercase tracking-wider ${
                        index === 0 ? 'bg-[#ff6600]' : 'bg-black/65'
                      }`}>
                        {index === 0 ? '📷 Primary Cover' : `Photo ${index + 1}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Description textarea */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Detailed Ad Description</label>
          <textarea
            rows={4}
            id="ad-description-textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={
              formData.type === 'parts' 
                ? 'Detail the condition of the spare part, usage history, compatibility, and why you are selling it...' 
                : formData.type === 'service'
                  ? 'Describe what specific procedures are included in this service package, warranty conditions, workshop address, or home service arrangements...'
                  : 'Detail interior specs, transmission quality, suspension, engine power, minor accidents, documents validity...'
            }
            className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#ff6600]/60' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#ff6600]'
            }`}
          />
        </div>

        {/* Marketplace disclaimer */}
        <div className={`p-4 rounded-xl border text-[11px] leading-relaxed font-semibold ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          ⚠️ <span className="font-black text-rose-500">{language === 'bn' ? 'মার্কেটপ্লেস ঘোষণা ও দায়মুক্তি:' : 'Marketplace Terms & Disclaimer:'}</span>{' '}
          {language === 'bn'
            ? 'বিজ্ঞাপন আপলোড করার মাধ্যমে আপনি সম্মত হচ্ছেন যে চাকা.বিডি শুধুমাত্র একটি ক্লাসিফাইড মার্কেটপ্লেস। চাকা.বিডি কোনো লেনদেন, ক্রয়-বিক্রয়, বা ক্রেতার তথ্যের গ্যারান্টি দেয় না। বিক্রেতা ও গ্রাহকের মধ্যকার চুক্তির কোনো দায় চাকা.বিডির থাকবে না। ক্রেতার সাথে সরাসরি নিজ দায়িত্বে লেনদেন করতে হবে।'
            : 'By publishing this listing, you acknowledge that Chaka.bd is solely an open classified marketplace. Chaka.bd has no control or liability over any transaction, buyer behavior, inspection, payment agreements, or deal safety. All interactions remain entirely your own hand-to-hand responsibility.'}
        </div>

        <button
          type="submit"
          id="post-ad-submit-button"
          className="w-full bg-[#ff6600] hover:bg-[#eb5e00] text-white font-extrabold py-3.5 rounded-xl transition-all text-xs cursor-pointer shadow-md shadow-orange-950/20 text-center flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4" /> Upload & Publish Ad Online
        </button>
      </form>
    </div>
  );
}
