import { SignatureDish } from '../types';

/**
 * Signature dishes explicitly highlighted from customer feedback.
 * Note: Prices are intentionally not invented as per the prompt specification.
 */
export const signatureDishes: SignatureDish[] = [
  {
    id: "sig-mac-cheese",
    name: "JALS Mac & Cheese",
    description: "Comforting, creamy and family-friendly.",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000&auto=format&fit=crop",
    alt: "Creamy oven-baked JALS Mac and Cheese with golden crust",
    badge: "House Signature",
    notes: "Customer Favorite"
  },
  {
    id: "sig-tico-crispy",
    name: "Tico Crispy",
    description: "A customer-mentioned favorite.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1000&auto=format&fit=crop",
    alt: "Golden crispy fried chicken tenders seasoned to perfection",
    badge: "Guest Favorite",
    notes: "Signature Crunch"
  },
  {
    id: "sig-honey-chipotle",
    name: "Honey Chipotle Crispers",
    description: "Crispy with a sweet and smoky character.",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=1000&auto=format&fit=crop",
    alt: "Crispy hand-breaded chicken crispers glazed in sweet and smoky honey chipotle",
    badge: "Sweet & Smoky",
    notes: "Highly Recommended"
  },
  {
    id: "sig-mexican-rice",
    name: "Mexican Rice",
    description: "Balanced flavors and a great accompaniment.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop",
    alt: "Seasoned Mexican rice with aromatic herbs, sweet corn and spices",
    badge: "Classic Side",
    notes: "Perfect Pairing"
  },
  {
    id: "sig-steak",
    name: "Steak",
    description: "Juicy and tender according to customer feedback.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    alt: "Juicy seared steak with garlic butter herbs on a rustic cast iron board",
    badge: "Chef's Cut",
    notes: "Tender & Savory"
  }
];
