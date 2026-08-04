import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Soft Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(199,255,63,0.15)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-serif italic text-[#777777] text-lg mb-1">
            / Client Endorsements
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight">
            What People Say
          </h2>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-xl rounded-[36px] p-8 sm:p-12 border border-[#ECECEC] shadow-[0_25px_60px_rgba(0,0,0,0.06)] relative text-center"
            >
              <Quote className="mx-auto w-12 h-12 text-[#C7FF3F] mb-6 opacity-60" />

              {/* Star Ratings */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#9CFF00] text-[#9CFF00]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-2xl font-serif italic text-[#111111] leading-relaxed mb-8 max-w-3xl mx-auto">
                "{activeTestimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-4">
                {activeTestimonial.avatar ? (
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[#111111] text-[#C7FF3F] font-black text-base flex items-center justify-center border-2 border-[#C7FF3F] shadow-md uppercase tracking-wider shrink-0">
                    {activeTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className="text-left">
                  <h4 className="text-base font-extrabold text-[#111111]">{activeTestimonial.name}</h4>
                  <p className="text-xs text-[#777777]">
                    {activeTestimonial.role} at <span className="font-bold text-[#111111]">{activeTestimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls & Indicators */}
          <div className="flex items-center justify-between mt-8 max-w-md mx-auto px-4">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="p-3 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#C7FF3F] transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === i ? 'w-8 bg-[#111111]' : 'w-2.5 bg-[#ECECEC]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="p-3 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#C7FF3F] transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
