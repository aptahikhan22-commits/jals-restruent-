import React, { useState, useEffect } from 'react';
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
import { ReservationModal } from './components/ReservationModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { initialReservationsData } from './data/reservations';
import { reviewsData as initialReviewsData } from './data/reviews';
import { Reservation, Review } from './types';
import { Shield } from 'lucide-react';

const RESERVATIONS_STORAGE_KEY = 'jals_restaurant_reservations_v1';
const REVIEWS_STORAGE_KEY = 'jals_restaurant_guest_reviews_v1';
const ADMIN_AUTH_KEY = 'jals_admin_authenticated';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Admin auth & view state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash === '#admin';
  });

  // Reservations State
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return initialReservationsData;
  });

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return [...parsed, ...initialReviewsData];
        }
      }
    } catch {
      // ignore
    }
    return initialReviewsData;
  });

  // Hash-based routing listener
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        if (isAdminLoggedIn) {
          setIsAdminView(true);
        } else {
          setIsLoginModalOpen(true);
        }
      } else if (isAdminView && window.location.hash !== '#admin') {
        setIsAdminView(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminLoggedIn, isAdminView]);

  // Save reservations to localStorage
  const saveReservations = (list: Reservation[]) => {
    try {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
  };

  // Save reviews to localStorage (saving user-submitted or modified reviews)
  const saveReviews = (list: Review[]) => {
    try {
      // Save all user-submitted and modified reviews (e.g. with managementResponse or status: hidden)
      const persistentItems = list.filter((r) => r.isUserSubmitted || r.managementResponse || r.status === 'hidden');
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(persistentItems));
    } catch {
      // ignore
    }
  };

  // Reservation actions
  const handleMakeReservation = (resData: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
    const newRes: Reservation = {
      ...resData,
      id: `JAL-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const nextList = [newRes, ...reservations];
    setReservations(nextList);
    saveReservations(nextList);
    return newRes;
  };

  const handleUpdateReservation = (updated: Reservation) => {
    const nextList = reservations.map((r) => (r.id === updated.id ? updated : r));
    setReservations(nextList);
    saveReservations(nextList);
  };

  const handleDeleteReservation = (id: string) => {
    const nextList = reservations.filter((r) => r.id !== id);
    setReservations(nextList);
    saveReservations(nextList);
  };

  const handleAddReservation = (newRes: Reservation) => {
    const nextList = [newRes, ...reservations];
    setReservations(nextList);
    saveReservations(nextList);
  };

  const handleResetReservations = () => {
    setReservations(initialReservationsData);
    saveReservations(initialReservationsData);
  };

  // Review actions
  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'source' | 'verified'>) => {
    const newRev: Review = {
      ...newReviewData,
      id: `user-rev-${Date.now()}`,
      source: 'Guest Community Review',
      verified: true,
      isUserSubmitted: true
    };
    const nextReviews = [newRev, ...reviews];
    setReviews(nextReviews);
    saveReviews(nextReviews);
  };

  const handleUpdateReview = (updated: Review) => {
    const nextReviews = reviews.map((r) => (r.id === updated.id ? updated : r));
    setReviews(nextReviews);
    saveReviews(nextReviews);
  };

  const handleDeleteReview = (id: string) => {
    const nextReviews = reviews.filter((r) => r.id !== id);
    setReviews(nextReviews);
    saveReviews(nextReviews);
  };

  // Admin access triggers
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminView(true);
      window.location.hash = '#admin';
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    try {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } catch {
      // ignore
    }
    setIsLoginModalOpen(false);
    setIsAdminView(true);
    window.location.hash = '#admin';
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore
    }
    setIsAdminView(false);
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  };

  const handleExitAdmin = () => {
    setIsAdminView(false);
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  };

  // Render Admin Portal View if active
  if (isAdminView && isAdminLoggedIn) {
    return (
      <AdminDashboard
        reservations={reservations}
        onUpdateReservation={handleUpdateReservation}
        onDeleteReservation={handleDeleteReservation}
        onAddReservation={handleAddReservation}
        onResetReservations={handleResetReservations}
        reviews={reviews}
        onUpdateReview={handleUpdateReview}
        onDeleteReview={handleDeleteReview}
        onExitAdmin={handleExitAdmin}
        onLogout={handleLogout}
      />
    );
  }

  // Public Facing Website View
  return (
    <div className="min-h-screen bg-[#17110D] text-[#F8F3EA] flex flex-col selection:bg-[#A84E32] selection:text-[#F7F1E7]">
      {/* Top Sticky Navigation */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenReservation={() => setIsReservationModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Mobile Animated Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenReservation={() => setIsReservationModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Page Landmark */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <Hero onOpenReservation={() => setIsReservationModalOpen(true)} />

        {/* 2. Intro / Brand Story Section */}
        <IntroSection />

        {/* 3. Customer Favorites Signature Food Showcase */}
        <SignatureDishes />

        {/* 4. Full Menu Section */}
        <MenuSection />

        {/* 5. Verified Customer Reviews & Trust Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
          onDeleteReview={handleDeleteReview}
        />

        {/* 6. Atmosphere & Gallery Section with Lightbox */}
        <GallerySection />

        {/* 7. Full-Width Experience Highlights */}
        <ExperienceSection />

        {/* 8. Location, Directions & Contact Section */}
        <LocationSection />

        {/* 9. Final Dramatic Call to Action */}
        <FinalCTA onOpenReservation={() => setIsReservationModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        onOpenReservation={() => setIsReservationModalOpen(true)}
      />

      {/* Floating Scroll to Top Action */}
      <ScrollToTop />

      {/* Floating Staff Admin Quick Portal Button when logged in */}
      {isAdminLoggedIn && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            type="button"
            id="floating-admin-portal-btn"
            onClick={() => {
              setIsAdminView(true);
              window.location.hash = '#admin';
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1C140F] text-[#F8F3EA] hover:text-[#C9A35B] text-xs font-bold uppercase tracking-wider shadow-2xl border border-[#C9A35B]/40 hover:border-[#C9A35B] transition-all transform hover:-translate-y-0.5"
          >
            <Shield className="w-3.5 h-3.5 text-[#C9A35B]" />
            <span>Admin Portal</span>
          </button>
        </div>
      )}

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onMakeReservation={handleMakeReservation}
      />

      {/* Staff & Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
