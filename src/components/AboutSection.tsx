import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Github, Linkedin, Twitter, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO, TIMELINE } from '../data/portfolioData';
import { ResumeModal } from './ResumeModal';

export const AboutSection: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(199,255,63,0.12)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Label */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-serif italic text-[#777777] text-lg mb-1">
            / Who Am I
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight">
            Pushing Boundaries <span className="font-serif italic font-normal text-[#555555]">since 2011</span>
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left: Professional Portrait Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-md rounded-[32px] overflow-hidden bg-[#FAFAFA] border border-[#ECECEC] shadow-[0_20px_50px_rgba(0,0,0,0.06)] group">
              <img
                src={PERSONAL_INFO.aboutPortrait}
                alt={PERSONAL_INFO.name}
                className="w-full h-[450px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#ECECEC] flex items-center justify-between shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-[#111111]">{PERSONAL_INFO.name}</h3>
                  <p className="text-xs text-[#777777]">{PERSONAL_INFO.title}</p>
                </div>

                {/* Social Icons Bar */}
                <div className="flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#C7FF3F] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#C7FF3F] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#C7FF3F] transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Biography & Experience Trajectory */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8"
          >
            <div>
              <p className="text-base sm:text-lg text-[#333333] leading-relaxed mb-6 font-medium">
                {PERSONAL_INFO.bioShort}
              </p>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-8">
                {PERSONAL_INFO.bioLong}
              </p>
            </div>

            {/* Career Summary Table */}
            <div className="p-6 rounded-[24px] bg-[#FAFAFA] border border-[#ECECEC]">
              <h4 className="text-xs font-bold text-[#777777] uppercase tracking-wider mb-4">Career Trajectory</h4>
              <div className="space-y-3">
                {TIMELINE.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs py-2 border-b border-[#ECECEC] last:border-none"
                  >
                    <div>
                      <span className="font-bold text-[#111111]">{item.position}</span>
                      <span className="text-[#777777] ml-2">({item.company})</span>
                    </div>
                    <span className="font-semibold text-[#555555] shrink-0">{item.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsResumeOpen(true)}
                id="about-download-resume-btn"
                className="px-7 py-3.5 rounded-full bg-[#111111] text-white text-xs font-bold shadow-lg hover:shadow-[0_0_25px_rgba(199,255,63,0.4)] transition-all flex items-center gap-2 hover:bg-[#222222]"
              >
                <FileText className="w-4 h-4 text-[#C7FF3F]" />
                <span>Download / View Resume</span>
              </button>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-full bg-white text-[#111111] border border-[#ECECEC] text-xs font-semibold hover:border-[#C7FF3F] hover:bg-[#F6F7FB] transition-all flex items-center gap-2"
              >
                <span>Read Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </motion.div>
        </div>

        {/* Animated Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[#ECECEC]">
          {PERSONAL_INFO.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] text-center hover:border-[#C7FF3F] transition-all shadow-sm"
            >
              <h4 className="text-4xl sm:text-5xl font-extrabold text-[#111111] mb-1 tracking-tight">
                {stat.value}
              </h4>
              <p className="text-xs font-bold text-[#111111] mb-0.5">{stat.label}</p>
              <p className="text-[10px] text-[#777777]">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};
