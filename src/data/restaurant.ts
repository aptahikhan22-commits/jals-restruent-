import { RestaurantInfo, ExperienceHighlight } from '../types';

export const restaurantData: RestaurantInfo = {
  name: "JAL'S Restaurant & Cafe",
  tagline: "GOOD FOOD. GOOD MOMENTS.",
  subTagline: "RAS AL KHAIMAH • UAE",
  locationCode: "PVPR+GX9",
  locationAddress: "Al Dhait - Al Dhait South",
  locationCity: "Ras Al Khaimah",
  locationCountry: "UAE",
  fullAddress: "PVPR+GX9 - Al Dhait, Al Dhait South - Ras Al Khaimah, UAE",
  phone: "07 243 4543",
  phoneRaw: "+97172434543",
  rating: 4.8,
  reviewsCount: 255,
  priceRange: "AED 50–100",
  description: "A locally loved restaurant & cafe serving comforting flavors, generous portions, and memorable moments in the heart of Ras Al Khaimah.",
  storyQuote: "JAL’S is a locally loved restaurant in Ras Al Khaimah, bringing together generous portions, comforting flavors and a relaxed atmosphere. Whether you're stopping by for a family meal or enjoying an evening with friends, the focus is simple — good food, warm service and a memorable experience.",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=PVPR%2BGX9+-+Al+Dhait+-+Al+Dhait+South+-+Ras+Al+Khaimah,+UAE"
};

export const experienceHighlights: ExperienceHighlight[] = [
  {
    id: "exp-1",
    title: "GENEROUS PORTIONS",
    description: "Food that leaves you satisfied.",
    iconName: "utensils"
  },
  {
    id: "exp-2",
    title: "WARM SERVICE",
    description: "Friendly and attentive hospitality.",
    iconName: "heart-handshake"
  },
  {
    id: "exp-3",
    title: "RELAXED ATMOSPHERE",
    description: "A comfortable place to slow down and enjoy the moment.",
    iconName: "sparkles"
  }
];
