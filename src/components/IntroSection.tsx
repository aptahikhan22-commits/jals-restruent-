import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Coffee } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export const IntroSection: React.FC = () => {
  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 bg-[#17110D] overflow-hidden border-t border-[#DCCBB5]/10"
      aria-label="Our Story and Introduction"
    >
      {/* Ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A84E32]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A35B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Heading & Visual Stamp */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C9A35B]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A35B]">
                Our Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F3EA] leading-[1.15] mb-6">
              A LITTLE TREASURE
              <br />
              <span className="text-[#DCCBB5] font-normal italic">IN RAK</span>
            </h2>

            {/* Subtle decorative gold badge */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A84E32]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9A35B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#DCCBB5]" />
              </div>
              <span className="text-xs text-[#DCCBB5]/70 tracking-widest uppercase font-medium">
                Locally Owned • Fast-Casual • Ras Al Khaimah
              </span>
            </div>
          </motion.div>

          {/* Right Column: Narrative Story Quote & Value Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            {/* Story Quote Block */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#A84E32]/70">
              <p className="font-serif text-xl sm:text-2xl text-[#F8F3EA] leading-relaxed italic">
                "{restaurantData.storyQuote}"
              </p>
            </div>

            {/* Supporting Micro-Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#DCCBB5]/10">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[#C9A35B] mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F8F3EA]">Generous</span>
                </div>
                <p className="text-xs text-[#DCCBB5]/80 leading-normal">
                  Satisfying portions made with quality comforting ingredients.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[#C9A35B] mb-1.5">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F8F3EA]">Warm Service</span>
                </div>
                <p className="text-xs text-[#DCCBB5]/80 leading-normal">
                  Attentive hospitality that makes every guest feel at home.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[#C9A35B] mb-1.5">
                  <Coffee className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F8F3EA]">Peaceful</span>
                </div>
                <p className="text-xs text-[#DCCBB5]/80 leading-normal">
                  A calm, welcoming atmosphere for friends and family alike.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
