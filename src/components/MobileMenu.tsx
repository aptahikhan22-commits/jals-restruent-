import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Star, X, ChevronRight } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Favorites Worth Trying', href: '#favorites' },
    { label: 'The Menu', href: '#menu' },
    { label: 'Guest Reviews', href: '#reviews' },
    { label: 'Atmosphere & Gallery', href: '#gallery' },
    { label: 'Find JAL’S Location', href: '#location' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu-drawer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-[#17110D]/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#DCCBB5]/10 pb-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#F8F3EA]">JAL’S</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#DCCBB5]/70">
                Restaurant & Cafe • RAK
              </span>
            </div>
            <button
              id="mobile-menu-close-btn"
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#211812] text-[#F8F3EA] hover:text-[#C9A35B] border border-[#DCCBB5]/20 focus:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="my-auto py-6 flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                id={`mobile-nav-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.1, duration: 0.25 }}
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#211812]/50 hover:bg-[#A84E32]/20 border border-[#DCCBB5]/10 hover:border-[#A84E32]/40 text-lg font-medium text-[#F8F3EA] transition-all"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#C9A35B]" />
              </motion.a>
            ))}
          </nav>

          {/* Quick Actions & Business Info Footer */}
          <div className="pt-4 border-t border-[#DCCBB5]/15 space-y-3">
            <a
              href={`tel:${restaurantData.phoneRaw}`}
              id="mobile-menu-call-cta"
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-[#A84E32] text-[#F7F1E7] font-semibold text-sm tracking-wider uppercase shadow-lg active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 text-[#F7F1E7]" />
              <span>Call JAL’S: {restaurantData.phone}</span>
            </a>

            <div className="flex items-center justify-between text-xs text-[#DCCBB5]/80 px-2 pt-2">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#C9A35B] fill-[#C9A35B]" />
                <span>4.8 / 5 Rating (255 Reviews)</span>
              </div>
              <span className="text-[#DCCBB5]/60">AED 50–100</span>
            </div>

            <div className="flex items-start gap-2 text-xs text-[#DCCBB5]/70 px-2 pb-2">
              <MapPin className="w-3.5 h-3.5 text-[#C9A35B] shrink-0 mt-0.5" />
              <span>{restaurantData.locationAddress}, Ras Al Khaimah</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
