import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, Check, Utensils, Heart, AlertCircle, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'source' | 'verified'>) => void;
}

const VISIT_TYPES = [
  'Dine-in Dinner',
  'Casual Lunch',
  'Cafe & Coffee',
  'Family Gathering',
  'Special Celebration',
  'Takeaway / Delivery'
];

const POPULAR_DISHES = [
  'Tico Crispy',
  'Honey Chipotle Crispers',
  'Tender Steak',
  'Mac & Cheese',
  'Signature Jal Burger',
  'Spanish Latte & Dessert'
];

const RATING_LABELS: Record<number, string> = {
  1: '1.0 — Disappointing',
  2: '2.0 — Fair / Needs Improvement',
  3: '3.0 — Good Experience',
  4: '4.0 — Very Good & Enjoyable',
  5: '5.0 — Exceptional & Highly Recommended'
};

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [visitType, setVisitType] = useState(VISIT_TYPES[0]);
  const [favoriteDish, setFavoriteDish] = useState('');
  const [customDish, setCustomDish] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const activeRating = hoverRating !== null ? hoverRating : rating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!author.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (author.trim().length < 2) {
      setErrorMessage('Name must be at least 2 characters long.');
      return;
    }
    if (!text.trim()) {
      setErrorMessage('Please write a brief description of your experience.');
      return;
    }
    if (text.trim().length < 10) {
      setErrorMessage('Review feedback must be at least 10 characters.');
      return;
    }

    const selectedDish = customDish.trim() ? customDish.trim() : favoriteDish;

    onSubmitReview({
      author: author.trim(),
      rating: rating,
      text: text.trim(),
      date: 'Just now',
      visitType: visitType,
      favoriteDish: selectedDish ? selectedDish : undefined,
      isUserSubmitted: true,
      likes: 0
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setAuthor('');
      setText('');
      setFavoriteDish('');
      setCustomDish('');
      setRating(5);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="write-review-modal-container"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0C0806]/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#211812] border border-[#DCCBB5]/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-[#F8F3EA] max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
          >
            {/* Close Button */}
            <button
              id="close-review-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#DCCBB5]/70 hover:text-[#F8F3EA] hover:bg-[#17110D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A35B]"
              aria-label="Close review dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-[#A84E32] text-[#F7F1E7] flex items-center justify-center mb-5 shadow-lg"
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </motion.div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EA] mb-2">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-sm text-[#DCCBB5]/80 max-w-md">
                  Your review has been successfully posted to JAL’S Restaurant & Cafe testimonials.
                </p>
              </div>
            ) : (
              <div>
                {/* Modal Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17110D] border border-[#C9A35B]/30 mb-3 text-xs font-semibold uppercase tracking-wider text-[#C9A35B]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Share Your Experience</span>
                  </div>
                  <h2
                    id="write-review-title"
                    className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EA] tracking-tight"
                  >
                    Rate & Review JAL’S
                  </h2>
                  <p className="text-xs sm:text-sm text-[#DCCBB5]/70 mt-1">
                    Help other diners discover great dishes and share your authentic dining story in Ras Al Khaimah.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-2">
                      Overall Rating <span className="text-[#A84E32]">*</span>
                    </label>
                    <div className="flex items-center gap-2 bg-[#17110D]/70 p-3.5 rounded-2xl border border-[#DCCBB5]/15">
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            id={`star-rating-button-${star}`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none focus:ring-1 focus:ring-[#C9A35B]"
                            aria-label={`Rate ${star} out of 5 stars`}
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                                star <= activeRating
                                  ? 'fill-[#C9A35B] text-[#C9A35B]'
                                  : 'text-[#DCCBB5]/30'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <div className="ml-auto text-right">
                        <span className="text-xs sm:text-sm font-semibold text-[#C9A35B] block">
                          {RATING_LABELS[activeRating]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="review-author-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5"
                    >
                      Your Name <span className="text-[#A84E32]">*</span>
                    </label>
                    <input
                      type="text"
                      id="review-author-name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g., Sarah Johnson"
                      className="w-full px-4 py-3 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/40 text-sm focus:outline-none focus:border-[#C9A35B] focus:ring-1 focus:ring-[#C9A35B] transition-colors"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* Visit Type selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-2">
                      Occasion / Visit Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {VISIT_TYPES.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setVisitType(type)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                            visitType === type
                              ? 'bg-[#A84E32] text-[#F8F3EA] border-[#A84E32] shadow-sm'
                              : 'bg-[#17110D]/60 text-[#DCCBB5]/80 border-[#DCCBB5]/15 hover:border-[#C9A35B]/40'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Favorite Dish (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-2">
                      Favorite Dish / Item Ordered (Optional)
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {POPULAR_DISHES.map((dish) => (
                        <button
                          type="button"
                          key={dish}
                          onClick={() => {
                            setFavoriteDish(favoriteDish === dish ? '' : dish);
                            setCustomDish('');
                          }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                            favoriteDish === dish
                              ? 'bg-[#C9A35B] text-[#17110D] border-[#C9A35B] font-semibold'
                              : 'bg-[#17110D]/50 text-[#DCCBB5]/75 border-[#DCCBB5]/15 hover:border-[#C9A35B]/40'
                          }`}
                        >
                          {dish}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      id="custom-dish-input"
                      value={customDish}
                      onChange={(e) => {
                        setCustomDish(e.target.value);
                        if (e.target.value) setFavoriteDish('');
                      }}
                      placeholder="Or enter another dish name..."
                      className="w-full px-3.5 py-2 rounded-lg bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/40 text-xs focus:outline-none focus:border-[#C9A35B]"
                      maxLength={60}
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label
                        htmlFor="review-feedback-text"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90"
                      >
                        Your Review <span className="text-[#A84E32]">*</span>
                      </label>
                      <span className="text-[11px] text-[#DCCBB5]/50">
                        {text.length} / 600
                      </span>
                    </div>
                    <textarea
                      id="review-feedback-text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Tell us what you enjoyed most about the food, atmosphere, staff, or menu..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/40 text-sm focus:outline-none focus:border-[#C9A35B] focus:ring-1 focus:ring-[#C9A35B] transition-colors resize-none"
                      maxLength={600}
                      required
                    />
                  </div>

                  {/* Submit and Cancel Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 px-4 rounded-xl border border-[#DCCBB5]/20 text-[#DCCBB5] hover:text-[#F8F3EA] hover:bg-[#17110D] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="submit-review-form-btn"
                      className="flex-2 py-3 px-6 rounded-xl bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
