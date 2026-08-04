import React from 'react';
import { TRUSTED_COMPANIES } from '../data/portfolioData';

export const TrustedCompanies: React.FC = () => {
  // Multiply list to ensure smooth infinite loop scroll
  const marqueeList = [...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES];

  return (
    <section className="py-10 bg-[#FAFAFA] border-y border-[#ECECEC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-6 text-center">
        <p className="text-xs font-bold tracking-widest text-[#777777] uppercase">
          Trusted by Innovative Global Enterprises & Scale-ups
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left/Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-12 sm:gap-16 items-center whitespace-nowrap animate-marquee">
          {marqueeList.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/50 border border-[#ECECEC]/60 transition-all duration-300 hover:border-[#C7FF3F] hover:bg-white hover:shadow-md cursor-pointer shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F6F7FB] flex items-center justify-center p-1.5 grayscale group-hover:grayscale-0 transition-all">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Fallback visual icon if external SVG fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xs font-bold text-[#555555] group-hover:text-[#111111] transition-colors tracking-wide">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
