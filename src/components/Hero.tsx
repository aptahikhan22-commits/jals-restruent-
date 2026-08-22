import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Star, ChevronDown } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#17110D]"
      aria-label="Hero Section"
    >
      {/* 1. Cinematic Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=2000&auto=format&fit=crop"
          alt="Atmospheric gourmet dining at JAL'S Restaurant & Cafe"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
          fetchPriority="high"
        />
        {/* 2. Layered Vignette & Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17110D] via-[#17110D]/60 to-[#17110D]/50" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#17110D]/40 to-[#17110D]/90" />
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Small Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#211812]/70 border border-[#C9A35B]/30 backdrop-blur-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A35B]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#DCCBB5] uppercase">
              {restaurantData.subTagline}
            </span>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F8F3EA] leading-[1.08] mb-6 max-w-4xl text-balance"
          >
            GOOD FOOD.
            <br />
            <span className="text-[#F7F1E7] font-normal italic">GOOD MOMENTS.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-[#DCCBB5] max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            {restaurantData.description}
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mb-10"
          >
            {/* Primary Button */}
            <a
              href="#menu"
              id="hero-explore-menu-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] font-semibold text-sm tracking-wider uppercase shadow-xl hover:shadow-[#A84E32]/30 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <span>EXPLORE THE MENU</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Button */}
            <a
              href="#location"
              id="hero-get-directions-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-transparent hover:bg-[#211812]/60 text-[#F8F3EA] hover:text-[#C9A35B] border border-[#DCCBB5]/40 hover:border-[#C9A35B] font-semibold text-sm tracking-wider uppercase backdrop-blur-xs transition-all duration-300 transform hover:-translate-y-1"
            >
              <MapPin className="w-4 h-4 text-[#C9A35B]" />
              <span>GET DIRECTIONS</span>
            </a>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#211812]/80 border border-[#DCCBB5]/15 backdrop-blur-md"
          >
            <div className="flex items-center text-[#C9A35B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C9A35B] text-[#C9A35B]" />
              ))}
            </div>
            <div className="h-3.5 w-px bg-[#DCCBB5]/20" />
            <span className="text-sm font-semibold text-[#F8F3EA]">★ 4.8 / 5</span>
            <span className="text-xs text-[#DCCBB5]/70">• {restaurantData.reviewsCount}+ Reviews</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#DCCBB5]/60 font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#C9A35B]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
