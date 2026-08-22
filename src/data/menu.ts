import { MenuItem } from '../types';

/**
 * ============================================================================
 * PLACEHOLDER MENU DATA
 * ============================================================================
 * Note: Exact menu items & prices are marked as placeholders as per prompt instructions.
 * Update this file when official printed menu pricing and items are provided by JAL'S management.
 */

export const MENU_CATEGORIES = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks & Cafe' },
  { id: 'desserts', label: 'Desserts' },
] as const;

export const menuItems: MenuItem[] = [
  // STARTERS
  {
    id: 'm-starter-1',
    name: 'Honey Chipotle Crispers',
    category: 'starters',
    description: 'Crispy hand-breaded tenders tossed in a smoky honey-chipotle glaze with house dipping sauce.',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=800&auto=format&fit=crop',
    tags: ['Customer Favorite', 'Signature'],
    isCustomerFavorite: true,
  },
  {
    id: 'm-starter-2',
    name: 'Tico Crispy Wings',
    category: 'starters',
    description: 'Crispy seasoned wings fried to golden perfection, served with cooling herb ranch.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop',
    tags: ['Crispy & Savory'],
    isCustomerFavorite: true,
  },
  {
    id: 'm-starter-3',
    name: 'Loaded American Cheese Fries',
    category: 'starters',
    description: 'Crisp golden french fries smothered in melted cheddar, jalapeños, and spiced seasoning.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop',
    tags: ['Sharable'],
    isVegetarian: true,
  },

  // MAINS
  {
    id: 'm-main-1',
    name: 'JALS Classic Mac & Cheese',
    category: 'mains',
    description: 'Rich three-cheese blend folded with al dente pasta, baked with a golden herb crumb crust.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop',
    tags: ['House Specialty', 'Comfort Classic'],
    isCustomerFavorite: true,
    isVegetarian: true,
  },
  {
    id: 'm-main-2',
    name: 'Grilled Ribeye / Tenderloin Steak',
    category: 'mains',
    description: 'Juicy, tender cut seasoned with rosemary garlic butter, served with roasted greens.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    tags: ['Chef Recommendation', 'Tender Cut'],
    isCustomerFavorite: true,
  },
  {
    id: 'm-main-3',
    name: 'Crispy Golden Platter with Mexican Rice',
    category: 'mains',
    description: 'Generous combination of seasoned crispers paired alongside freshly steamed Mexican rice.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop',
    tags: ['Generous Portion'],
    isCustomerFavorite: true,
  },

  // BURGERS
  {
    id: 'm-burger-1',
    name: 'The JAL’S Classic Smash Burger',
    category: 'burgers',
    description: 'Double beef patties with crisp edges, melted American cheddar, pickles, and secret house sauce on toasted brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    tags: ['Signature Burger'],
    isCustomerFavorite: true,
  },
  {
    id: 'm-burger-2',
    name: 'Tico Crispy Chicken Sandwich',
    category: 'burgers',
    description: 'Crispy fried chicken breast, creamy coleslaw, honey-chipotle drizzle, and dill pickles in a warm buttered bun.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=800&auto=format&fit=crop',
    tags: ['Popular Choice'],
  },
  {
    id: 'm-burger-3',
    name: 'Smoky BBQ Bacon Cheddar',
    category: 'burgers',
    description: 'Grilled premium patty topped with crispy beef bacon, smoked cheddar, crispy onion rings, and sweet barbecue reduction.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop',
    tags: ['Smoky & Rich'],
  },

  // SIDES
  {
    id: 'm-side-1',
    name: 'Authentic Mexican Rice',
    category: 'sides',
    description: 'Fluffy long-grain rice infused with tomato, garlic, sweet peppers, and mild Mexican spices.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop',
    tags: ['Accompaniment'],
    isVegetarian: true,
  },
  {
    id: 'm-side-2',
    name: 'Seasoned Rustic Fries',
    category: 'sides',
    description: 'Hand-cut skin-on potatoes tossed in sea salt and crushed black pepper.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=800&auto=format&fit=crop',
    tags: ['Crispy Side'],
    isVegetarian: true,
  },
  {
    id: 'm-side-3',
    name: 'Creamy Homestyle Coleslaw',
    category: 'sides',
    description: 'Fresh shredded cabbage and carrots dressed in a light, tangy-sweet dressing.',
    image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=800&auto=format&fit=crop',
    tags: ['Fresh'],
    isVegetarian: true,
  },

  // DRINKS
  {
    id: 'm-drink-1',
    name: 'Specialty Espresso & Cortado',
    category: 'drinks',
    description: 'Locally crafted rich roast coffee extracted to aromatic perfection with silky micro-foam.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    tags: ['Cafe Special'],
  },
  {
    id: 'm-drink-2',
    name: 'Iced Spanish Latte',
    category: 'drinks',
    description: 'Chilled espresso layered with condensed milk and fresh dairy over ice.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    tags: ['Bestseller Cafe'],
  },
  {
    id: 'm-drink-3',
    name: 'Artisan Passionfruit & Mint Cooler',
    category: 'drinks',
    description: 'Refreshing sparkling cooler infused with real passionfruit pulp, fresh lime, and crushed mint leaves.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
    tags: ['Refreshing'],
  },

  // DESSERTS
  {
    id: 'm-dessert-1',
    name: 'Warm Chocolate Molten Skillet',
    category: 'desserts',
    description: 'Decadent dark chocolate cake with a molten center, served with vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    tags: ['Warm Dessert'],
    isVegetarian: true,
  },
  {
    id: 'm-dessert-2',
    name: 'Caramelised Brioche French Toast',
    category: 'desserts',
    description: 'Thick cut brioche griddled with cinnamon sugar, topped with wild berries and pure maple syrup.',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=800&auto=format&fit=crop',
    tags: ['Cafe Favorite'],
    isVegetarian: true,
  }
];
