export type VehicleType = 'car' | 'bike' | 'commercial' | 'ev' | 'threewheeler' | 'bicycle' | 'parts' | 'service';
export type VehicleCondition = 'New' | 'Used' | 'Reconditioned';
export type FuelType = 'Octane' | 'Petrol' | 'Diesel' | 'CNG' | 'LPG' | 'Hybrid' | 'Electric';
export type TransmissionType = 'Automatic' | 'Manual';

export interface VehicleListing {
  id: string;
  title: string;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  condition: VehicleCondition;
  price: number; // in BDT (e.g. 2600000 for a car, 185000 for a bike)
  originalPrice?: number; // original price in BDT before a price drop
  priceFormatted: string; // e.g. "26.5 Lakh BDT" or "1.85 Lakh BDT" or "1,85,000 BDT"
  engineCapacity: string; // e.g. "1500 cc" or "150 cc"
  mileage: number; // in km
  fuelType: FuelType;
  transmission?: TransmissionType;
  bodyType?: string; // e.g. "Sedan", "SUV", "Hatchback", "Sports Bike", "Scooter"
  subCategory?: string; // e.g. "Engine", "Electrical", "Suspension", "Tires", "Body", "Lights"
  partsTarget?: 'car' | 'bike'; // For parts category to target car or bike
  exteriorColor?: string; // e.g. "White", "Black", "Blue", "Red"
  registrationYear?: string; // e.g. "2022", "Unregistered"
  seatingCapacity?: string; // e.g. "5 Seats" or "2 Seats"
  taxFitnessValidity?: string; // e.g. "Valid up to 2027"
  enginePower?: string; // e.g. "115 bhp @ 6000 RPM"
  fuelEfficiency?: string; // e.g. "12-15 km/L"
  features?: string[]; // e.g. ["ABS", "Sunroof", "Alloy Wheels", "Back Camera", "Leather Seats"]
  location: string; // e.g. "Banani, Dhaka"
  division: string; // Dhaka, Chittagong, Sylhet, etc.
  address?: string; // custom address/street address
  description: string;
  images: string[]; // URLs or placeholders
  sellerName: string;
  sellerPhone: string;
  sellerType: 'private' | 'showroom';
  showroomName?: string;
  isShowroomVerified?: boolean;
  verified?: boolean;
  isFeatured: boolean;
  status: 'Approved' | 'Pending' | 'Rejected';
  views: number;
  createdAt: string;
  userId: string; // Owner of the listing
  auctionGrade?: string;
  auctionExteriorInterior?: string;
  accidentHistory?: {
    hasAccidents: boolean;
    details: string;
    reportDate?: string;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string; // "user" or seller's user ID or "buyer"
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  image?: string;
}

export interface ChatConversation {
  id: string; // listingId + buyerId or similar unique identifier
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  messages: ChatMessage[];
  lastUpdated: string;
}

export interface AdvertisementSlot {
  id: string;
  placement: 'home-top' | 'listing-detail-sidebar' | 'listing-detail-bottom' | 'browse-inline';
  title: string;
  description: string;
  imageUrl: string;
  targetUrl: string;
  adType: 'banner' | 'native' | 'text';
  isActive: boolean;
  impressions: number;
  clicks: number;
}

export interface ShowroomProfile {
  id: string;
  name: string;
  bannerUrl: string;
  logoUrl: string;
  location: string;
  contactNumber: string;
  email: string;
  operatingHours: string;
  isVerified: boolean;
  listingsCount: number;
  featuredCount: number;
}

export interface SearchFilters {
  searchQuery: string;
  type: VehicleType | 'all';
  condition: VehicleCondition | 'all';
  division: string | 'all';
  priceMin: number;
  priceMax: number;
  brand: string | 'all';
  modelYear?: string | 'all';
  bodyType?: string | 'all';
  fuelType?: string | 'all';
  transmission?: string | 'all';
  maxMileage?: string | 'all';
  seats?: string | 'all';
  partsTarget?: 'all' | 'car' | 'bike';
  subCategory?: string | 'all';
}

export interface PriceAlert {
  id: string;
  listingId: string;
  brand: string;
  model: string;
  targetPrice: number;
  originalPrice: number;
  triggered: boolean;
  createdAt: string;
}

