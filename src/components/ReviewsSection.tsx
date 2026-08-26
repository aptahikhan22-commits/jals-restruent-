import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Quote,
  CheckCircle2,
  ThumbsUp,
  PenLine,
  Search,
  Trash2,
  Sparkles,
  Utensils,
  Filter,
  Check
} from 'lucide-react';
import { reviewsData as initialReviewsData, reviewSummary } from '../data/reviews';
import { Review } from '../types';
import { WriteReviewModal } from './WriteReviewModal';

const STORAGE_KEY = 'jals_restaurant_guest_reviews_v1';
const LIKES_STORAGE_KEY = 'jals_restaurant_liked_reviews_v1';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Combine user saved reviews at top followed by initial reviews
          return [...parsed, ...initialReviewsData];
        }
      }
    } catch {
      // ignore
    }
    return initialReviewsData;
  });

  const [likedReviews, setLikedReviews] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LIKES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | 'guest'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync user-submitted reviews to localStorage
  const saveUserReviews = (updatedReviews: Review[]) => {
    const userSubmittedOnly = updatedReviews.filter((r) => r.isUserSubmitted);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userSubmittedOnly));
    } catch {
      // ignore
    }
  };

  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'source' | 'verified'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: `user-rev-${Date.now()}`,
      source: 'Guest Community Review',
      verified: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveUserReviews(updated);

    showToast('Your review has been published! Thank you for sharing.');
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    saveUserReviews(updated);
    showToast('Review removed successfully.');
  };

  const handleToggleLike = (id: string) => {
    const isLiked = likedReviews.includes(id);
    let nextLiked: string[];

    if (isLiked) {
      nextLiked = likedReviews.filter((item) => item !== id);
    } else {
      nextLiked = [...likedReviews, id];
    }

    setLikedReviews(nextLiked);
    try {
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(nextLiked));
    } catch {
      // ignore
    }

    setReviews((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentLikes = item.likes || 0;
          return {
            ...item,
            likes: isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1
          };
        }
        return item;
      })
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Dynamic statistics calculation
  const totalReviewsCount = reviewSummary.totalReviews + reviews.filter((r) => r.isUserSubmitted).length;
  
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return reviewSummary.rating;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / reviews.length;
    return avg.toFixed(1);
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Category filter
      if (activeFilter === '5star' && review.rating < 5) return false;
      if (activeFilter === 'guest' && !review.isUserSubmitted) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesAuthor = review.author.toLowerCase().includes(q);
        const matchesText = review.text.toLowerCase().includes(q);
        const matchesDish = review.favoriteDish?.toLowerCase().includes(q);
        const matchesVisit = review.visitType?.toLowerCase().includes(q);
        return matchesAuthor || matchesText || matchesDish || matchesVisit;
      }

      return true;
    });
  }, [reviews, activeFilter, searchQuery]);

  const userReviewsCount = reviews.filter((r) => r.isUserSubmitted).length;

  return (
    <section
      id="reviews"
      className="py-24 sm:py-32 bg-[#17110D] text-[#F8F3EA] relative overflow-hidden border-t border-[#DCCBB5]/10"
      aria-label="Customer Reviews and Testimonials"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A84E32]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#C9A35B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-4 sm:right-8 z-50 bg-[#211812] border border-[#C9A35B]/40 text-[#F8F3EA] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-full bg-[#A84E32] text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block & Trust Rating Scoreboard */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211812] border border-[#C9A35B]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A35B]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A35B]">
              Verified Feedback & Experiences
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F3EA] leading-tight mb-4">
            LOVED BY OUR GUESTS
          </h2>

          <p className="text-sm sm:text-base text-[#DCCBB5]/80 max-w-2xl mx-auto mb-8">
            Real impressions from diners who visited JAL’S in Ras Al Khaimah. We welcome every guest to share their genuine culinary journey.
          </p>

          {/* Large Trust Scorecard with "Write a Review" Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#211812]/90 border border-[#DCCBB5]/15 backdrop-blur-md shadow-2xl text-left"
          >
            {/* Rating Number and Stars */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex flex-col items-center justify-center bg-[#17110D]/70 px-5 py-3 rounded-2xl border border-[#DCCBB5]/10">
                <span className="font-serif text-5xl sm:text-6xl font-bold text-[#F8F3EA] leading-none">
                  {averageRating}
                </span>
                <span className="text-[10px] text-[#DCCBB5]/60 mt-1 uppercase tracking-wider font-semibold">
                  Out of 5.0
                </span>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[#C9A35B] mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9A35B] text-[#C9A35B]" />
                  ))}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#F8F3EA]">
                  {totalReviewsCount}+ Guest Experiences
                </h3>
                <p className="text-xs text-[#DCCBB5]/70 mt-0.5">
                  Ras Al Khaimah, United Arab Emirates
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#DCCBB5]/90">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#C9A35B]" />
                  <span>98% Recommendation rate</span>
                </div>
              </div>
            </div>

            {/* Direct CTA to Write a Review */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                id="open-write-review-btn"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <PenLine className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto" role="tablist">
            <button
              type="button"
              id="filter-all-reviews-btn"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#C9A35B] text-[#17110D] shadow-md'
                  : 'bg-[#211812] text-[#DCCBB5]/80 hover:text-[#F8F3EA] border border-[#DCCBB5]/15'
              }`}
            >
              All ({reviews.length})
            </button>

            <button
              type="button"
              id="filter-5star-reviews-btn"
              onClick={() => setActiveFilter('5star')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeFilter === '5star'
                  ? 'bg-[#C9A35B] text-[#17110D] shadow-md'
                  : 'bg-[#211812] text-[#DCCBB5]/80 hover:text-[#F8F3EA] border border-[#DCCBB5]/15'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>5 Stars</span>
            </button>

            {userReviewsCount > 0 && (
              <button
                type="button"
                id="filter-guest-reviews-btn"
                onClick={() => setActiveFilter('guest')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeFilter === 'guest'
                    ? 'bg-[#C9A35B] text-[#17110D] shadow-md'
                    : 'bg-[#211812] text-[#DCCBB5]/80 hover:text-[#F8F3EA] border border-[#DCCBB5]/15'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9A35B]" />
                <span>Community ({userReviewsCount})</span>
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#DCCBB5]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-reviews-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, names, reviews..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#211812] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/40 text-xs focus:outline-none focus:border-[#C9A35B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#DCCBB5]/50 hover:text-[#F8F3EA]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Customer Review Cards Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#211812]/50 border border-[#DCCBB5]/10">
            <Filter className="w-10 h-10 text-[#DCCBB5]/30 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#F8F3EA] mb-1">
              No matching reviews found
            </h3>
            <p className="text-xs sm:text-sm text-[#DCCBB5]/70 mb-5">
              Try adjusting your search criteria or be the first to share your experience for this category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#A84E32] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider hover:bg-[#914028]"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredReviews.map((review, idx) => {
              const isLiked = likedReviews.includes(review.id);
              const likesCount = (review.likes || 0) + (isLiked ? 1 : 0);

              return (
                <motion.article
                  key={review.id}
                  id={`review-card-${review.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                  className="group relative p-7 sm:p-8 rounded-3xl bg-[#211812]/80 border border-[#DCCBB5]/15 hover:border-[#C9A35B]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl backdrop-blur-xs"
                >
                  {/* Subtle Quote Decor */}
                  <div className="absolute top-6 right-6 text-[#DCCBB5]/10 group-hover:text-[#C9A35B]/20 transition-colors pointer-events-none">
                    <Quote className="w-10 h-10" />
                  </div>

                  <div>
                    {/* Top Row: Stars + Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1 text-[#C9A35B]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#C9A35B] text-[#C9A35B]" />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {review.isUserSubmitted && (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#C9A35B] bg-[#17110D] px-2.5 py-1 rounded-full border border-[#C9A35B]/30">
                            <Sparkles className="w-3 h-3" />
                            <span>Community</span>
                          </span>
                        )}
                        {review.visitType && (
                          <span className="text-[11px] font-medium text-[#DCCBB5]/70 bg-[#17110D]/60 px-2.5 py-0.5 rounded-full border border-[#DCCBB5]/10">
                            {review.visitType}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Favorite Dish Highlight */}
                    {review.favoriteDish && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#A84E32]/20 border border-[#A84E32]/40 text-[#F8F3EA] text-xs font-medium mb-3">
                        <Utensils className="w-3.5 h-3.5 text-[#C9A35B]" />
                        <span>Recommended: <strong className="text-[#C9A35B]">{review.favoriteDish}</strong></span>
                      </div>
                    )}

                    {/* Review Text */}
                    <p className="font-serif text-base sm:text-lg text-[#F8F3EA] leading-relaxed italic mb-6">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Author & Footer */}
                  <div className="pt-4 border-t border-[#DCCBB5]/10 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#A84E32]/30 border border-[#A84E32] flex items-center justify-center font-bold text-[#F8F3EA] text-sm">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#F8F3EA] text-sm leading-tight">
                            {review.author}
                          </h4>
                          <span className="text-[#DCCBB5]/60 text-[11px]">
                            {review.date || 'Customer Review'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleLike(review.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                            isLiked
                              ? 'bg-[#A84E32]/30 border-[#A84E32] text-[#F8F3EA]'
                              : 'bg-[#17110D]/50 border-[#DCCBB5]/15 text-[#DCCBB5]/70 hover:text-[#F8F3EA] hover:border-[#C9A35B]/40'
                          }`}
                          aria-label="Helpful review"
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'text-[#C9A35B] fill-[#C9A35B]' : ''}`} />
                          <span>{likesCount > 0 ? likesCount : 'Helpful'}</span>
                        </button>

                        {/* Verified Guest badge or delete if user submitted */}
                        {review.isUserSubmitted ? (
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-1.5 rounded-full text-[#DCCBB5]/40 hover:text-red-400 hover:bg-[#17110D] transition-colors"
                            title="Delete your review"
                            aria-label="Delete review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div className="hidden sm:flex items-center gap-1 text-[#C9A35B] bg-[#17110D]/50 px-2.5 py-1 rounded-full border border-[#C9A35B]/20">
                            <CheckCircle2 className="w-3 h-3 text-[#C9A35B]" />
                            <span className="text-[11px] font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Bottom Callout inviting feedback */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#211812] via-[#2a1c14] to-[#211812] border border-[#C9A35B]/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F3EA] mb-1">
              Have you dined with us recently?
            </h3>
            <p className="text-xs sm:text-sm text-[#DCCBB5]/80">
              We appreciate your feedback! It takes less than a minute to rate your favorite dish.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A35B] hover:bg-[#b89146] text-[#17110D] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <PenLine className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>
      </div>

      {/* Review Submission Modal Dialog */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </section>
  );
};
