import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_CATEGORIES, menuItems } from '../data/menu';
import { Sparkles, Leaf, Star, Info } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('starters');

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      className="py-24 sm:py-32 bg-[#F7F1E7] text-[#211812] relative overflow-hidden"
      aria-label="Restaurant Menu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17110D]/5 border border-[#DCCBB5] mb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A84E32]">
              Explore Our Offerings
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#211812] leading-tight">
            THE MENU
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#75685D] max-w-xl mx-auto font-normal">
            Comforting favorites. Bold flavors. Something for every mood.
          </p>

          {/* Transparent Notice about Menu Structure */}
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#75685D]/80 bg-[#17110D]/5 px-3 py-1 rounded-md">
            <Info className="w-3.5 h-3.5 text-[#A84E32]" />
            <span>Sample menu preview. Easily customizable in menu data file.</span>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar gap-2 sm:gap-3">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`menu-category-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#F7F1E7] bg-[#A84E32] shadow-md'
                    : 'text-[#211812]/80 bg-[#DCCBB5]/30 hover:bg-[#DCCBB5]/60 hover:text-[#211812]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article
                key={item.id}
                id={`menu-item-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group rounded-2xl bg-white border border-[#DCCBB5]/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {item.image && (
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#DCCBB5]/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {item.isCustomerFavorite && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#A84E32] text-[#F7F1E7] shadow-sm">
                        <Star className="w-3 h-3 fill-current" />
                        Favorite
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-700 text-white shadow-sm">
                        <Leaf className="w-3 h-3" />
                        Veg
                      </span>
                    )}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#211812] group-hover:text-[#A84E32] transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#75685D] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#DCCBB5]/30 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F7F1E7] text-[#75685D] border border-[#DCCBB5]/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Menu Note & Download / Customization Hook */}
        <div className="mt-16 text-center border-t border-[#DCCBB5]/50 pt-8">
          <p className="text-xs text-[#75685D] max-w-lg mx-auto">
            Price range: AED 50–100 per person. Please inform our staff of any food allergies or specific dietary preferences when placing your order.
          </p>
        </div>
      </div>
    </section>
  );
};
