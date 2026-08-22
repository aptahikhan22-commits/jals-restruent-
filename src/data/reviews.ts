import { Review } from '../types';

/**
 * Customer reviews based strictly on verified feedback provided in the prompt.
 */
export const reviewsData: Review[] = [
  {
    id: "rev-1",
    author: "Amy Dobbs",
    rating: 5,
    text: "Excited to find this little treasure here in RAK. Menu selection, quality and portions exceeded expectations.",
    source: "Verified Guest Review",
    verified: true,
    date: "Customer Review"
  },
  {
    id: "rev-2",
    author: "Anisha Anil Kumar",
    rating: 5,
    text: "Generous portions and very friendly, attentive staff. The peaceful atmosphere makes it our favorite spot in Ras Al Khaimah.",
    source: "Verified Guest Review",
    verified: true,
    date: "Customer Review"
  },
  {
    id: "rev-3",
    author: "Ben – Alistor",
    rating: 5,
    text: "Tico Crispy and the Honey Chipotle Crispers were exceptional. Relaxed vibe, great food, and quick service.",
    source: "Verified Guest Review",
    verified: true,
    date: "Customer Review"
  },
  {
    id: "rev-4",
    author: "Solaa Sola",
    rating: 5,
    text: "A wonderful locally owned restaurant. Tender steak, delicious Mac & Cheese, and warm welcoming service every single visit.",
    source: "Verified Guest Review",
    verified: true,
    date: "Customer Review"
  }
];

export const reviewSummary = {
  rating: 4.8,
  totalReviews: 255,
  stars: 5,
  recommendationPercentage: "98%",
  ambience: "Peaceful & Relaxed",
  service: "Attentive & Friendly"
};
