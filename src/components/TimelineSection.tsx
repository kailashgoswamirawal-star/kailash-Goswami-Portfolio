import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Terminal } from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';

export const TimelineSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#F6F7FB] relative overflow-hidden">
      {/* Background radial blurs */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_rgba(199,255,63,0.15)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-serif italic text-[#777777] text-lg mb-1">
            / Experience Timeline
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight">
            Work History & Milestones
          </h2>
          <p className="mt-4 text-[#555555] text-base leading-relaxed">
            14+ years of hands-on engineering leadership spanning AI agent development, enterprise automation, and full-stack software.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Vertical Guide Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#C7FF3F] via-[#ECECEC] to-transparent -translate-x-1/2 z-0" />

          <div className="space-y-12 relative z-10">
            {TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Icon in Center */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-4 border-[#C7FF3F] shadow-md flex items-center justify-center text-[#111111] z-20">
                    <Briefcase className="w-4 h-4 text-[#111111]" />
                  </div>

                  {/* Timeline Card */}
                  <div className={`w-full sm:w-[calc(50%-3rem)] pl-12 sm:pl-0 ${isEven ? 'sm:pr-4 text-left' : 'sm:pl-4 text-left'}`}>
                    <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:border-[#C7FF3F] hover:shadow-[0_20px_45px_rgba(199,255,63,0.15)] transition-all duration-300">
                      
                      {/* Period Badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#111111] text-white flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#C7FF3F]" />
                          {item.period}
                        </span>
                        <span className="text-xs font-semibold text-[#777777] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>

                      {/* Position & Company */}
                      <h3 className="text-xl font-extrabold text-[#111111] mb-1">
                        {item.position}
                      </h3>
                      <h4 className="text-sm font-bold text-[#555555] mb-4">
                        {item.company}
                      </h4>

                      {/* Responsibilities */}
                      <div className="space-y-2 mb-4">
                        {item.responsibilities.map((resp, i) => (
                          <p key={i} className="text-xs text-[#555555] leading-relaxed flex items-start gap-2">
                            <span className="text-[#9CFF00] font-bold text-sm leading-none">•</span>
                            <span>{resp}</span>
                          </p>
                        ))}
                      </div>

                      {/* Key Achievements */}
                      {item.achievements.length > 0 && (
                        <div className="mb-4 p-3 rounded-xl bg-[#FAFAFA] border border-[#ECECEC] text-xs">
                          <p className="font-extrabold text-[#111111] mb-1 flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-[#9CFF00]" />
                            Key Achievement
                          </p>
                          <p className="text-[#555555]">{item.achievements[0]}</p>
                        </div>
                      )}

                      {/* Tech Used Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#ECECEC]">
                        {item.techUsed.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded-md bg-[#F6F7FB] border border-[#ECECEC] text-[10px] font-semibold text-[#555555]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
