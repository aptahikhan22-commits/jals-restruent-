import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Star, ExternalLink, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export const LocationSection: React.FC = () => {
  return (
    <section
      id="location"
      className="py-24 sm:py-32 bg-[#211812] text-[#F8F3EA] relative overflow-hidden border-t border-[#DCCBB5]/10"
      aria-label="Location and Contact Information"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17110D] border border-[#C9A35B]/30 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C9A35B]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCCBB5]">
              Visit Our Restaurant
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F3EA] leading-tight">
            FIND JAL’S
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-[#DCCBB5]/80 max-w-xl mx-auto font-normal">
            Conveniently located in Al Dhait South, Ras Al Khaimah. We look forward to welcoming you.
          </p>
        </div>

        {/* 2-Column Info & Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Business Details & Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-[#17110D] border border-[#DCCBB5]/15 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#DCCBB5]/10">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EA]">
                    {restaurantData.name}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-[#C9A35B] font-semibold">
                    American Fast-Casual & Cafe
                  </span>
                </div>
                <div className="p-3 rounded-full bg-[#211812] border border-[#DCCBB5]/20 text-[#C9A35B]">
                  <Navigation className="w-5 h-5" />
                </div>
              </div>

              {/* Verified Details List */}
              <div className="space-y-6 my-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#211812] border border-[#DCCBB5]/20 text-[#C9A35B] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#DCCBB5]/60 uppercase tracking-wider block mb-1">
                      Address / Plus Code
                    </span>
                    <p className="text-base font-medium text-[#F8F3EA]">
                      {restaurantData.locationCode} - {restaurantData.locationAddress}
                    </p>
                    <p className="text-sm text-[#DCCBB5]/80">
                      {restaurantData.locationCity}, {restaurantData.locationCountry}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#211812] border border-[#DCCBB5]/20 text-[#C9A35B] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#DCCBB5]/60 uppercase tracking-wider block mb-1">
                      Phone Reservation & Inquiries
                    </span>
                    <a
                      href={`tel:${restaurantData.phoneRaw}`}
                      id="location-phone-number-link"
                      className="text-lg font-bold text-[#F8F3EA] hover:text-[#C9A35B] transition-colors"
                    >
                      {restaurantData.phone}
                    </a>
                    <span className="text-xs text-[#DCCBB5]/60 block mt-0.5">
                      Direct call enabled
                    </span>
                  </div>
                </div>

                {/* Rating & Price Range */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#211812] border border-[#DCCBB5]/10">
                    <span className="text-[11px] text-[#DCCBB5]/60 uppercase tracking-wider block mb-1">
                      Guest Rating
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-[#C9A35B] fill-[#C9A35B]" />
                      <span className="text-base font-bold text-[#F8F3EA]">4.8 / 5</span>
                    </div>
                    <span className="text-[11px] text-[#DCCBB5]/70">255+ Reviews</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#211812] border border-[#DCCBB5]/10">
                    <span className="text-[11px] text-[#DCCBB5]/60 uppercase tracking-wider block mb-1">
                      Price Range
                    </span>
                    <span className="text-base font-bold text-[#F8F3EA]">
                      {restaurantData.priceRange}
                    </span>
                    <span className="text-[11px] text-[#DCCBB5]/70 block">Per Person</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Open Google Maps Action */}
            <div className="pt-6 border-t border-[#DCCBB5]/10">
              <a
                href={restaurantData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="location-open-google-maps-btn"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Large Polished Map Area Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 rounded-2xl bg-[#17110D] border border-[#DCCBB5]/15 overflow-hidden flex flex-col relative min-h-[420px] shadow-xl group"
          >
            {/* Real embedded OpenStreetMap / Map frame for Ras Al Khaimah (Al Dhait) */}
            <div className="relative w-full h-full min-h-[380px] bg-[#1a1410]">
              <iframe
                title="JAL'S Restaurant & Cafe Location Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=55.9100%2C25.7300%2C55.9600%2C25.7700&amp;layer=mapnik&amp;marker=25.7533%2C55.9387"
                className="w-full h-full border-0 filter grayscale-[40%] contrast-[1.1] invert-[90%] hue-rotate-[180deg]"
                loading="lazy"
              />

              {/* Floating Location Overlay Badge */}
              <div className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-xs p-4 rounded-xl bg-[#17110D]/90 backdrop-blur-md border border-[#DCCBB5]/20 shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A84E32] animate-pulse" />
                  <h4 className="font-serif text-sm font-bold text-[#F8F3EA]">
                    JAL’S Restaurant & Cafe
                  </h4>
                </div>
                <p className="text-xs text-[#DCCBB5]/80">
                  PVPR+GX9, Al Dhait South, Ras Al Khaimah
                </p>
                <div className="mt-3 pt-2 border-t border-[#DCCBB5]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#C9A35B] font-semibold">★ 4.8 Rating</span>
                  <a
                    href={restaurantData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#F8F3EA] hover:text-[#C9A35B] underline flex items-center gap-1"
                  >
                    Directions <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="absolute bottom-4 right-4">
                <a
                  href={restaurantData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#17110D]/90 hover:bg-[#A84E32] border border-[#DCCBB5]/30 text-xs font-semibold text-[#F8F3EA] backdrop-blur-md transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C9A35B]" />
                  <span>Navigate in Google Maps</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
