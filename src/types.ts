export type UserRole = 'seeker' | 'provider' | 'admin';

export type ScreenName =
  | 'splash'
  | 'role_select'
  | 'auth'
  | 'home_seeker'
  | 'service_listing'
  | 'provider_profile'
  | 'booking'
  | 'tracking'
  | 'home_provider'
  | 'my_bookings'
  | 'saved_professionals'
  | 'wallet'
  | 'admin_access'
  | 'admin_dashboard'
  | 'ai_evaluations';

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  popular: boolean;
  startingPrice: number;
  bannerImage?: string;
}

export interface VerificationDetails {
  isVerified: boolean;
  govtIdChecked: boolean;
  skillCertified: boolean;
  backgroundChecked: boolean;
  policeVerification: boolean;
  insuranceCovered: boolean;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  serviceCategory: string;
}

export interface Professional {
  id: string;
  name: string;
  businessName?: string;
  categoryId: string;
  categoryName: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  visitCharge: number;
  isAvailableToday: boolean;
  distanceKm: number;
  locationCity: string;
  locationArea: string;
  languages: string[];
  about: string;
  verification: VerificationDetails;
  specialities: string[];
  pricingDetails: {
    serviceName: string;
    price: number;
    unit: string;
  }[];
  portfolioImages: string[];
  reviews: ReviewItem[];
  completedJobsCount: number;
  phone: string;
}

export type BookingStatus =
  | 'requested'
  | 'assigned'
  | 'on_the_way'
  | 'arriving'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  serviceCategory: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  professionalPhone: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  timeSlot: string;
  problemDescription: string;
  problemPhotos: string[];
  status: BookingStatus;
  statusTimestamps: {
    confirmedTime: string;
    onTheWayTime?: string;
    arrivingTime?: string;
    completedTime?: string;
  };
  etaMinutes: number;
  pricing: {
    visitCharge: number;
    serviceFee: number;
    taxes: number;
    discount: number;
    totalAmount: number;
  };
  rating?: number;
  reviewComment?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  selectedCity: string;
  selectedAddress: string;
  isOnline?: boolean;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  language?: 'en' | 'te';
  suggestedAction?: {
    label: string;
    categoryId?: string;
    actionType: 'view_service' | 'book_provider' | 'rag_policy';
  };
  classificationData?: {
    category: string;
    intent: string;
    priority: 'low' | 'normal' | 'urgent';
    confidence: number;
    estimatedCost: string;
  };
}
