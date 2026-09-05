import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

interface FinalCTAProps {
  onOpenReservation?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenReservation }) => {
  return (
    <section
      id="cta"
      className="relative py-28 sm:py-36 bg-[#17110D] overflow-hidden flex items-center justify-center"
      aria-label="Call to Action"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=85&w=1800&auto=format&fit=crop"
          alt="Warm hospitality and dining at JAL'S Restaurant & Cafe"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17110D] via-[#17110D]/70 to-[#17110D]" />
        <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#211812]/80 border border-[#C9A35B]/40 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A35B]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCCBB5]">
              Experience JAL’S
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F8F3EA] leading-tight mb-6">
            YOUR TABLE IS WAITING.
          </h2>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-[#DCCBB5] max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            Make your next meal one worth remembering.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto">
            {/* Book a Table Button */}
            {onOpenReservation && (
              <button
                type="button"
                id="final-cta-book-table-btn"
                onClick={onOpenReservation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C9A35B] hover:bg-[#b89149] text-[#17110D] font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-[#C9A35B]/30 transform hover:-translate-y-1"
              >
                <Calendar className="w-4 h-4 text-[#17110D]" />
                <span>BOOK TABLE ONLINE</span>
              </button>
            )}

            {/* Get Directions Button */}
            <a
              href={restaurantData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="final-cta-get-directions-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-[#A84E32]/30 transform hover:-translate-y-1"
            >
              <MapPin className="w-4 h-4 text-[#F7F1E7]" />
              <span>GET DIRECTIONS</span>
            </a>

            {/* Call Button */}
            <a
              href={`tel:${restaurantData.phoneRaw}`}
              id="final-cta-call-jals-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#211812]/90 hover:bg-[#211812] text-[#F8F3EA] hover:text-[#C9A35B] border border-[#DCCBB5]/40 hover:border-[#C9A35B] font-semibold text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <Phone className="w-4 h-4 text-[#C9A35B]" />
              <span>CALL JAL’S ({restaurantData.phone})</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
