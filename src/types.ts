export interface RestaurantInfo {
  name: string;
  tagline: string;
  subTagline: string;
  locationCode: string;
  locationAddress: string;
  locationCity: string;
  locationCountry: string;
  fullAddress: string;
  phone: string;
  phoneRaw: string;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  description: string;
  storyQuote: string;
  googleMapsUrl: string;
}

export interface SignatureDish {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  badge?: string;
  notes?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'burgers' | 'sides' | 'drinks' | 'desserts';
  description: string;
  image?: string;
  tags?: string[];
  isCustomerFavorite?: boolean;
  isVegetarian?: boolean;
}

export interface ReviewResponse {
  respondedAt: string;
  respondedBy: string;
  message: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: string;
  verified: boolean;
  date?: string;
  favoriteDish?: string;
  visitType?: string;
  isUserSubmitted?: boolean;
  likes?: number;
  status?: 'published' | 'hidden';
  managementResponse?: ReviewResponse;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
export type SeatingPreference = 'indoor' | 'terrace' | 'family-booth' | 'any';

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  guestsCount: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  seatingPreference: SeatingPreference;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
  tableNumber?: string;
  staffNotes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall';
}

export interface ExperienceHighlight {
  id: string;
  title: string;
  description: string;
  iconName: 'utensils' | 'heart-handshake' | 'sparkles' | 'coffee' | 'clock' | 'smile';
}
