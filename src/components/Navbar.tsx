import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, MapPin, Calendar, Shield } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMobileMenu,
  isMobileMenuOpen,
  onOpenReservation,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Favorites', href: '#favorites' },
    { label: 'Menu', href: '#menu' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-[#17110D]/90 backdrop-blur-md border-b border-[#DCCBB5]/10 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#17110D]/80 via-[#17110D]/30 to-transparent py-5 md:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a
          href="#home"
          id="navbar-brand-logo"
          className="group flex flex-col items-start focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#F8F3EA] group-hover:text-[#C9A35B] transition-colors duration-300">
              JAL’S
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#A84E32]"></span>
          </div>
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#DCCBB5]/70 font-medium">
            Restaurant & Cafe
          </span>
        </a>

        {/* Right: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-[#F8F3EA]/80 hover:text-[#F8F3EA] tracking-wide transition-colors duration-200 relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A84E32] group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Desktop Actions & CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${restaurantData.phoneRaw}`}
            id="nav-phone-call-btn"
            className="flex items-center gap-2 text-xs font-semibold text-[#DCCBB5] hover:text-[#F8F3EA] px-3.5 py-2 rounded-full border border-[#DCCBB5]/20 hover:border-[#C9A35B]/50 transition-all duration-200"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A35B]" />
            <span>{restaurantData.phone}</span>
          </a>

          <button
            type="button"
            id="nav-book-table-btn"
            onClick={onOpenReservation}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#211812] hover:bg-[#2C1F17] text-[#F8F3EA] border border-[#C9A35B]/40 hover:border-[#C9A35B] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C9A35B]" />
            <span>Reserve Table</span>
          </button>

          <a
            href="#location"
            id="nav-visit-jals-btn"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Visit JAL’S
          </a>

          <button
            type="button"
            id="nav-admin-portal-btn"
            onClick={onOpenAdmin}
            className={`p-2 rounded-full border text-xs transition-colors ${
              isAdminLoggedIn
                ? 'bg-[#C9A35B] text-[#17110D] border-[#C9A35B]'
                : 'bg-[#17110D]/70 text-[#DCCBB5]/70 hover:text-[#C9A35B] border-[#DCCBB5]/20 hover:border-[#C9A35B]/40'
            }`}
            title="Staff & Admin Portal (Manage Reviews & Bookings)"
            aria-label="Staff Portal"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            id="nav-mobile-book-btn"
            onClick={onOpenReservation}
            className="p-2 text-[#F8F3EA] bg-[#211812]/80 border border-[#DCCBB5]/20 rounded-full hover:bg-[#A84E32] transition-colors"
            aria-label="Reserve a Table"
          >
            <Calendar className="w-4 h-4 text-[#C9A35B]" />
          </button>

          <a
            href={`tel:${restaurantData.phoneRaw}`}
            id="nav-mobile-call-icon"
            className="p-2 text-[#F8F3EA] bg-[#211812]/80 border border-[#DCCBB5]/20 rounded-full hover:bg-[#A84E32] transition-colors"
            aria-label="Call JAL'S Restaurant"
          >
            <Phone className="w-4 h-4 text-[#C9A35B]" />
          </a>

          <button
            type="button"
            id="nav-mobile-admin-btn"
            onClick={onOpenAdmin}
            className="p-2 text-[#DCCBB5]/80 bg-[#211812]/80 border border-[#DCCBB5]/20 rounded-full hover:text-[#C9A35B] transition-colors"
            aria-label="Staff Admin"
          >
            <Shield className="w-4 h-4" />
          </button>

          <button
            id="navbar-mobile-toggle-btn"
            onClick={onOpenMobileMenu}
            className="p-2 text-[#F8F3EA] hover:text-[#C9A35B] bg-[#211812]/80 border border-[#DCCBB5]/20 rounded-full transition-colors focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
