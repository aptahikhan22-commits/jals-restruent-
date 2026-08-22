import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Utensils } from 'lucide-react';
import { signatureDishes } from '../data/signatureDishes';

export const SignatureDishes: React.FC = () => {
  return (
    <section
      id="favorites"
      className="relative py-24 bg-[#211812] text-[#F8F3EA] overflow-hidden border-t border-[#DCCBB5]/10"
      aria-label="Favorites Worth Trying"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17110D]/70 border border-[#C9A35B]/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A35B]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DCCBB5]">
              Customer Feedback Highlights
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F3EA] leading-tight"
          >
            FAVORITES WORTH TRYING
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-[#DCCBB5]/80 max-w-xl mx-auto font-normal"
          >
            Handpicked signature items beloved and frequently recommended by our guests in Ras Al Khaimah.
          </motion.p>
        </div>

        {/* 5 Signature Dish Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureDishes.map((dish, idx) => (
            <motion.article
              key={dish.id}
              id={`favorite-dish-${dish.id}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-[#17110D] border border-[#DCCBB5]/15 overflow-hidden flex flex-col transition-all duration-300 hover:border-[#A84E32]/50 hover:shadow-2xl"
            >
              {/* Dish Image Container with Hover Zoom */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#17110D]">
                <img
                  src={dish.image}
                  alt={dish.alt}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17110D] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Badge */}
                {dish.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#A84E32] text-[#F7F1E7] shadow-md">
                      {dish.badge}
                    </span>
                  </div>
                )}

                {dish.notes && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#17110D]/80 backdrop-blur-md text-[#DCCBB5] border border-[#DCCBB5]/20">
                      {dish.notes}
                    </span>
                  </div>
                )}
              </div>

              {/* Dish Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F3EA] group-hover:text-[#C9A35B] transition-colors mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-[#DCCBB5]/90 leading-relaxed font-normal">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCCBB5]/10 flex items-center justify-between text-xs text-[#DCCBB5]/70">
                  <span className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#C9A35B]" />
                    <span>Signature Recipe</span>
                  </span>
                  <span className="italic text-[#C9A35B]">Guest Verified</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
