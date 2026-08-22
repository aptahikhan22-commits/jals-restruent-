import React from 'react';
import { motion } from 'motion/react';
import { Utensils, HeartHandshake, Sparkles } from 'lucide-react';
import { experienceHighlights } from '../data/restaurant';

export const ExperienceSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'utensils':
        return <Utensils className="w-6 h-6 text-[#C9A35B]" />;
      case 'heart-handshake':
        return <HeartHandshake className="w-6 h-6 text-[#C9A35B]" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-[#C9A35B]" />;
    }
  };

  return (
    <section
      id="experience"
      className="py-24 sm:py-32 bg-[#17110D] text-[#F8F3EA] relative overflow-hidden border-t border-[#DCCBB5]/10 bg-noise"
      aria-label="Dining Experience Highlights"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211812] border border-[#C9A35B]/30 mb-4"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A35B]">
              The JAL’S Experience
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F3EA] leading-tight"
          >
            GOOD FOOD FEELS BETTER
            <br />
            <span className="text-[#DCCBB5] font-normal italic">WHEN SHARED.</span>
          </motion.h2>
        </div>

        {/* 3 Experience Highlight Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {experienceHighlights.map((highlight, idx) => (
            <motion.div
              key={highlight.id}
              id={`experience-highlight-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative p-8 rounded-2xl bg-[#211812]/70 border border-[#DCCBB5]/15 flex flex-col items-center text-center group hover:border-[#A84E32]/50 hover:bg-[#211812] transition-all duration-300 shadow-lg"
            >
              {/* Icon Bubble */}
              <div className="w-14 h-14 rounded-2xl bg-[#17110D] border border-[#C9A35B]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#C9A35B] transition-all duration-300">
                {getIcon(highlight.iconName)}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F3EA] mb-3 tracking-wide group-hover:text-[#C9A35B] transition-colors">
                {highlight.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#DCCBB5]/80 leading-relaxed font-normal">
                {highlight.description}
              </p>

              {/* Decorative bottom hairline */}
              <div className="mt-6 w-8 h-0.5 bg-[#A84E32]/40 group-hover:w-16 group-hover:bg-[#A84E32] transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
