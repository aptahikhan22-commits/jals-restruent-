import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Camera } from 'lucide-react';
import { galleryItems } from '../data/gallery';
import { GalleryItem } from '../types';
import { Lightbox } from './Lightbox';

export const GallerySection: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const handleNext = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % galleryItems.length);
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 bg-[#211812] text-[#F8F3EA] relative overflow-hidden border-t border-[#DCCBB5]/10"
      aria-label="Restaurant Atmosphere and Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17110D] border border-[#C9A35B]/30 mb-4">
            <Camera className="w-3.5 h-3.5 text-[#C9A35B]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCCBB5]">
              Atmosphere & Moments
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F3EA] leading-tight">
            COME FOR THE FOOD.
            <br />
            <span className="text-[#C9A35B] font-normal italic">STAY FOR THE MOMENTS.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#DCCBB5]/80 max-w-xl mx-auto font-normal">
            Take a glimpse into our cozy dining rooms, comforting culinary creations, and relaxed Ras Al Khaimah experience.
          </p>
        </div>

        {/* Masonry / Bento Responsive Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[220px]">
          {galleryItems.map((item, idx) => {
            // Apply varied spanning for organic masonry feeling
            let spanClasses = 'col-span-1 row-span-1';
            if (idx === 0) spanClasses = 'sm:col-span-2 sm:row-span-2';
            else if (idx === 2) spanClasses = 'sm:col-span-2 sm:row-span-1';
            else if (idx === 4) spanClasses = 'sm:col-span-2 sm:row-span-2';
            else if (idx === 5) spanClasses = 'sm:col-span-2 sm:row-span-1';

            return (
              <motion.div
                key={item.id}
                id={`gallery-photo-${item.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setSelectedItemIndex(idx)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#17110D] border border-[#DCCBB5]/15 ${spanClasses}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17110D]/90 via-[#17110D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                {/* Hover Details */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C9A35B] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#F8F3EA]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-2 rounded-full bg-[#A84E32] text-[#F7F1E7] shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal Component */}
      <Lightbox
        item={selectedItemIndex !== null ? galleryItems[selectedItemIndex] : null}
        onClose={() => setSelectedItemIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={selectedItemIndex ?? 0}
        totalCount={galleryItems.length}
      />
    </section>
  );
};
