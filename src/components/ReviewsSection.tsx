import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2, ThumbsUp } from 'lucide-react';
import { reviewsData, reviewSummary } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  return (
    <section
      id="reviews"
      className="py-24 sm:py-32 bg-[#17110D] text-[#F8F3EA] relative overflow-hidden border-t border-[#DCCBB5]/10"
      aria-label="Customer Reviews and Testimonials"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A84E32]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block & Trust Rating Scoreboard */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211812] border border-[#C9A35B]/30 mb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A35B]">
              Verified Feedback
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F3EA] leading-tight mb-8">
            LOVED BY OUR GUESTS
          </h2>

          {/* Large Trust Scorecard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-6 sm:p-8 rounded-2xl bg-[#211812]/90 border border-[#DCCBB5]/15 backdrop-blur-md shadow-2xl"
          >
            <div className="flex flex-col items-center">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-[#F8F3EA] leading-none">
                {reviewSummary.rating}
              </span>
              <span className="text-xs text-[#DCCBB5]/60 mt-1 uppercase tracking-wider">Out of 5.0</span>
            </div>

            <div className="h-10 w-px bg-[#DCCBB5]/20 hidden sm:block" />

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1 text-[#C9A35B] mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C9A35B] text-[#C9A35B]" />
                ))}
              </div>
              <span className="text-sm sm:text-base font-semibold text-[#F8F3EA]">
                {reviewSummary.totalReviews} Verified Customer Reviews
              </span>
              <span className="text-xs text-[#DCCBB5]/70 mt-0.5">
                Ras Al Khaimah • UAE
              </span>
            </div>

            <div className="h-10 w-px bg-[#DCCBB5]/20 hidden sm:block" />

            <div className="flex items-center gap-2 text-xs text-[#DCCBB5]/90 bg-[#17110D]/60 px-3.5 py-2 rounded-lg border border-[#DCCBB5]/10">
              <ThumbsUp className="w-4 h-4 text-[#C9A35B]" />
              <span>Recommended for generous portions & peaceful vibe</span>
            </div>
          </motion.div>
        </div>

        {/* Customer Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {reviewsData.map((review, idx) => (
            <motion.article
              key={review.id}
              id={`review-card-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative p-8 rounded-2xl bg-[#211812]/80 border border-[#DCCBB5]/15 hover:border-[#C9A35B]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl"
            >
              {/* Subtle Quote Icon */}
              <div className="absolute top-6 right-6 text-[#DCCBB5]/10 group-hover:text-[#C9A35B]/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#C9A35B] mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A35B] text-[#C9A35B]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif text-lg text-[#F8F3EA] leading-relaxed italic mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#DCCBB5]/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#A84E32]/30 border border-[#A84E32] flex items-center justify-center font-bold text-[#F8F3EA]">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#F8F3EA] text-sm">{review.author}</h3>
                    <span className="text-[#DCCBB5]/60 text-[11px]">{review.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#C9A35B] bg-[#17110D]/50 px-2.5 py-1 rounded-full border border-[#C9A35B]/20">
                  <CheckCircle2 className="w-3 h-3 text-[#C9A35B]" />
                  <span className="text-[11px] font-medium">Verified Guest</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
