import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { SignatureDishes } from './components/SignatureDishes';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { ExperienceSection } from './components/ExperienceSection';
import { LocationSection } from './components/LocationSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#17110D] text-[#F8F3EA] flex flex-col selection:bg-[#A84E32] selection:text-[#F7F1E7]">
      {/* Top Sticky Navigation */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Animated Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Page Landmark */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Intro / Brand Story Section */}
        <IntroSection />

        {/* 3. Customer Favorites Signature Food Showcase */}
        <SignatureDishes />

        {/* 4. Full Menu Section */}
        <MenuSection />

        {/* 5. Verified Customer Reviews & Trust Section */}
        <ReviewsSection />

        {/* 6. Atmosphere & Gallery Section with Lightbox */}
        <GallerySection />

        {/* 7. Full-Width Experience Highlights */}
        <ExperienceSection />

        {/* 8. Location, Directions & Contact Section */}
        <LocationSection />

        {/* 9. Final Dramatic Call to Action */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll to Top Action */}
      <ScrollToTop />
    </div>
  );
}
