import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 relative overflow-hidden border-t border-[#222222]">
      {/* Soft Neon Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C7FF3F] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-10">
        
        {/* Top High Density Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-[#222222] gap-8">
          <div>
            <a href="#home" className="flex items-center gap-2 text-2xl font-black tracking-tighter uppercase text-white">
              <div className="w-8 h-8 bg-[#C7FF3F] rounded-lg flex items-center justify-center shrink-0">
                <div className="w-4 h-4 bg-[#111111] rounded-full" />
              </div>
              <span>KALI X<span className="text-[#C7FF3F]"> AI</span></span>
            </a>
            <p className="text-xs text-[#888888] mt-2 max-w-md uppercase tracking-wider font-mono">
              Project Lead - Sales IT • AI Automation Expert
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-3 rounded-full border border-[#333333] bg-[#1A1A1A] text-white hover:border-[#C7FF3F] hover:text-[#C7FF3F] transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-3 rounded-full border border-[#333333] bg-[#1A1A1A] text-white hover:border-[#C7FF3F] hover:text-[#C7FF3F] transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="p-3 rounded-full border border-[#333333] bg-[#1A1A1A] text-white hover:border-[#C7FF3F] hover:text-[#C7FF3F] transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* High Density Brand Grid Marquee / Badges */}
        <div className="py-4 border-b border-[#222222] flex flex-wrap items-center justify-between gap-6 text-[10px] font-bold text-[#666666] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-8 flex-wrap">
            <span>SFA &amp; DMS</span>
            <span>•</span>
            <span>COLORBAR</span>
            <span>•</span>
            <span>LANGGRAPH</span>
            <span>•</span>
            <span>FASTAPI</span>
            <span>•</span>
            <span>POWER BI</span>
            <span>•</span>
            <span>N8N &amp; MAKE</span>
          </div>

          <button
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#333333] bg-[#1A1A1A] text-[10px] font-extrabold uppercase tracking-widest text-white hover:border-[#C7FF3F] hover:text-[#C7FF3F] transition-all"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C7FF3F]" />
          </button>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-6 text-[12px] font-medium text-[#AAAAAA] uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#home" className="hover:text-[#C7FF3F] transition-colors">Home</a>
            <a href="#process" className="hover:text-[#C7FF3F] transition-colors">Process</a>
            <a href="#projects" className="hover:text-[#C7FF3F] transition-colors">Projects</a>
            <a href="#about" className="hover:text-[#C7FF3F] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#C7FF3F] transition-colors">Skills</a>
            <a href="#services" className="hover:text-[#C7FF3F] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#C7FF3F] transition-colors">Contact</a>
          </div>

          <p className="text-[10px] text-[#666666] uppercase tracking-widest">
            © {new Date().getFullYear()} KAILASH GOSWAMI. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
};
