import React from 'react';
import { MapPin, Phone, Star, ArrowUp, Shield, Calendar } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenReservation?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenReservation }) => {
  const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Story', href: '#story' },
    { label: 'Favorites', href: '#favorites' },
    { label: 'Menu', href: '#menu' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <footer
      id="main-footer"
      className="bg-[#17110D] text-[#F8F3EA] border-t border-[#DCCBB5]/15 pt-16 pb-12 relative overflow-hidden"
      aria-label="Restaurant Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-[#DCCBB5]/10">
          {/* Brand Identity & Summary */}
          <div className="md:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-serif text-3xl font-bold tracking-wider text-[#F8F3EA]">
                {restaurantData.name}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#A84E32]" />
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#C9A35B] font-semibold mb-4">
              American Fast-Casual • Ras Al Khaimah, UAE
            </p>

            <p className="text-sm text-[#DCCBB5]/80 leading-relaxed max-w-sm font-normal mb-6">
              Serving comforting American classics, generous portions, and warm hospitality in the heart of Al Dhait South.
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#DCCBB5]/70 bg-[#211812] px-3 py-1.5 rounded-lg border border-[#DCCBB5]/10 w-fit">
              <Star className="w-3.5 h-3.5 text-[#C9A35B] fill-[#C9A35B]" />
              <span>4.8 Rating • 255+ Verified Guest Reviews</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 flex flex-col">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A35B] mb-4">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    id={`footer-nav-${link.label.toLowerCase()}`}
                    className="text-[#DCCBB5]/80 hover:text-[#F8F3EA] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {onOpenReservation && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenReservation}
                    id="footer-nav-reserve-table"
                    className="text-[#C9A35B] hover:text-[#F8F3EA] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 text-left font-medium"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve Table</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A35B] mb-4">
              Contact & Location
            </h3>

            <div className="space-y-3 text-sm text-[#DCCBB5]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A35B] shrink-0 mt-1" />
                <address className="not-italic leading-relaxed">
                  {restaurantData.locationAddress}
                  <br />
                  {restaurantData.locationCity}, {restaurantData.locationCountry}
                  <br />
                  <span className="text-xs text-[#DCCBB5]/50">{restaurantData.locationCode}</span>
                </address>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <Phone className="w-4 h-4 text-[#C9A35B] shrink-0" />
                <a
                  href={`tel:${restaurantData.phoneRaw}`}
                  id="footer-phone-call"
                  className="font-semibold text-[#F8F3EA] hover:text-[#C9A35B] transition-colors"
                >
                  {restaurantData.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCCBB5]/60">
          <p>© 2026 JAL’S Restaurant & Cafe. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <p className="italic text-[#DCCBB5]/40 hidden sm:inline">
              A locally owned culinary destination in Ras Al Khaimah
            </p>

            {onOpenAdmin && (
              <button
                type="button"
                id="footer-staff-admin-btn"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-[#DCCBB5]/60 hover:text-[#C9A35B] transition-colors px-2.5 py-1 rounded-md hover:bg-[#211812] border border-transparent hover:border-[#C9A35B]/30"
              >
                <Shield className="w-3.5 h-3.5 text-[#C9A35B]" />
                <span>Staff & Admin Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
