import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Award, CheckCircle2, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onViewProjects?: () => void;
  onOpenContact?: () => void;
  onOpenAiAssistant?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewProjects, onOpenContact, onOpenAiAssistant }) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-12 flex flex-col justify-between overflow-hidden bg-white">
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-[#C7FF3F]/15 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10 flex-1 flex flex-col justify-between gap-10">
        
        {/* Upper Split Row: Left Headline & Intro / Right Portrait */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-between">
          
          {/* Left Text & CTA Block */}
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            
            {/* Top High Density Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#F6F7FB] border border-[#ECECEC] rounded-full w-fit"
            >
              <span className="w-2 h-2 bg-[#C7FF3F] rounded-full shadow-[0_0_8px_#C7FF3F]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777777]">
                PROJECT LEAD • SALES IT &amp; AI AUTOMATION EXPERT
              </span>
            </motion.div>

            {/* Massive High Density Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-[76px] leading-[0.88] font-black tracking-tight text-[#111111] uppercase">
                SALES IT <br />
                <span className="text-[#777777]">&amp;</span> AI AUTOMATION
              </h1>
            </motion.div>

            {/* Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#555555] max-w-lg font-light leading-relaxed"
            >
              {PERSONAL_INFO.tagline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => {
                  if (onViewProjects) onViewProjects();
                  else {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                id="hero-view-projects-btn"
                className="px-8 py-4 bg-[#111111] text-white rounded-full flex items-center gap-3 text-xs font-bold uppercase tracking-widest group shadow-lg hover:shadow-[0_0_25px_rgba(199,255,63,0.4)] transition-all cursor-pointer"
              >
                <span>VIEW PROJECTS</span>
                <div className="w-6 h-6 bg-[#C7FF3F] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#111111]" />
                </div>
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  if (onOpenContact) {
                    e.preventDefault();
                    onOpenContact();
                  }
                }}
                id="hero-contact-btn"
                className="px-8 py-4 bg-white border border-[#ECECEC] text-[#111111] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#F6F7FB] transition-all flex items-center gap-2"
              >
                <span>CONTACT ME</span>
              </a>

              {onOpenAiAssistant && (
                <button
                  onClick={onOpenAiAssistant}
                  id="hero-ai-chat-btn"
                  className="px-6 py-4 bg-[#F6F7FB] border border-[#ECECEC] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white transition-all flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-[#9CFF00]" />
                  <span>ASK AI</span>
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full sm:w-[320px] h-[380px] sm:h-[400px] bg-[#F6F7FB] rounded-[32px] border border-[#ECECEC] relative overflow-hidden group shadow-2xl shrink-0 self-center lg:self-auto"
          >
            <img
              src={PERSONAL_INFO.avatarImage}
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent z-10 pointer-events-none" />

            <div className="absolute bottom-6 left-6 z-20 text-white">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-80 mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3F] animate-pulse" />
                Available for Work
              </p>
              <p className="text-xl font-black tracking-tight uppercase">{PERSONAL_INFO.name}</p>
              <p className="text-xs text-[#CCCCCC] font-medium mt-0.5">{PERSONAL_INFO.title}</p>
            </div>
          </motion.div>

        </div>

        {/* Bottom High Density Bento Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4"
        >
          {/* Bento Card 01 */}
          <div className="bg-white border border-[#ECECEC] p-6 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex flex-col justify-between group hover:border-[#C7FF3F] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-[#C7FF3F]/20 rounded-xl flex items-center justify-center text-[#111111]">
                <Sparkles className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-[10px] font-bold text-[#999999] uppercase tracking-wider">
                Bento 01
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[#111111] mb-2 uppercase">
                SalesFlow Pro
              </h3>
              <p className="text-xs text-[#777777] line-clamp-2 leading-relaxed">
                A custom CRM automation layer that increased conversion by 42% for global distributors.
              </p>
            </div>
          </div>

          {/* Bento Card 02 (Stats) */}
          <div className="bg-[#111111] p-6 rounded-[24px] shadow-2xl flex flex-col justify-between text-white border border-[#222222]">
            <div className="text-[48px] font-black text-[#C7FF3F] leading-none mb-4">
              14+
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#CCCCCC]">
                Years Experience
              </p>
              <p className="text-[10px] text-[#999999] uppercase tracking-wider">
                Across India
              </p>
            </div>
          </div>

          {/* Bento Card 03 (Skillsets Matrix) */}
          <div className="bg-white border border-[#ECECEC] p-6 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex flex-col gap-4">
            <div className="text-[10px] font-bold text-[#999999] uppercase tracking-wider">
              Skillsets Matrix
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#C7FF3F] text-[#111111] text-[10px] font-black rounded-full uppercase">
                PYTHON
              </span>
              <span className="px-3 py-1 bg-[#F6F7FB] text-[#111111] text-[10px] font-bold rounded-full border border-[#ECECEC] uppercase">
                LLM OPS
              </span>
              <span className="px-3 py-1 bg-[#F6F7FB] text-[#111111] text-[10px] font-bold rounded-full border border-[#ECECEC] uppercase">
                DASHBOARDS
              </span>
              <span className="px-3 py-1 bg-[#F6F7FB] text-[#111111] text-[10px] font-bold rounded-full border border-[#ECECEC] uppercase">
                FASTAPI
              </span>
              <span className="px-3 py-1 bg-[#F6F7FB] text-[#111111] text-[10px] font-bold rounded-full border border-[#ECECEC] uppercase">
                AWS
              </span>
              <span className="px-3 py-1 bg-[#F6F7FB] text-[#111111] text-[10px] font-bold rounded-full border border-[#ECECEC] uppercase">
                GCP
              </span>
            </div>
          </div>

          {/* Bento Card 04 (CTA Work With Me) */}
          <a
            href="#contact"
            onClick={(e) => {
              if (onOpenContact) {
                e.preventDefault();
                onOpenContact();
              }
            }}
            className="bg-[#F6F7FB] border border-dashed border-[#999999] p-6 rounded-[24px] flex flex-col justify-center items-center text-center gap-2 group hover:border-[#111111] hover:bg-white transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#111111] flex items-center justify-center font-bold text-[#111111] group-hover:bg-[#C7FF3F] transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#777777] group-hover:text-[#111111]">
              Work With Me
            </p>
          </a>
        </motion.div>

      </div>
    </section>
  );
};
