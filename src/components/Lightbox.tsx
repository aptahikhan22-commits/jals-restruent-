import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="gallery-lightbox-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Photo lightbox: ${item.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-[#17110D]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto bg-[#211812]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DCCBB5]/20 text-xs text-[#DCCBB5]">
            <Tag className="w-3.5 h-3.5 text-[#C9A35B]" />
            <span>{item.category}</span>
            <span className="text-[#DCCBB5]/40">•</span>
            <span>{currentIndex + 1} / {totalCount}</span>
          </div>

          <button
            id="lightbox-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="pointer-events-auto p-2.5 rounded-full bg-[#211812]/80 hover:bg-[#A84E32] text-[#F8F3EA] border border-[#DCCBB5]/20 transition-all focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        <button
          id="lightbox-prev-btn"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#211812]/80 hover:bg-[#A84E32] text-[#F8F3EA] border border-[#DCCBB5]/20 transition-all focus:outline-none"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          id="lightbox-next-btn"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#211812]/80 hover:bg-[#A84E32] text-[#F8F3EA] border border-[#DCCBB5]/20 transition-all focus:outline-none"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Image Container */}
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[80vh] flex flex-col items-center"
        >
          <img
            src={item.imageUrl}
            alt={item.alt}
            className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl border border-[#DCCBB5]/20"
          />

          <div className="mt-4 text-center">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#F8F3EA]">
              {item.title}
            </h4>
            <p className="text-xs text-[#DCCBB5]/70 mt-1">{item.alt}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
