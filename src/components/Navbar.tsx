import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowUpRight, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenAiAssistant?: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiAssistant, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Intersection detection for active link
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-[#ECECEC] py-3.5 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#111111]"
          id="nav-logo"
        >
          <div className="w-8 h-8 bg-[#111111] rounded-lg flex items-center justify-center shrink-0">
            <div className="w-4 h-4 bg-[#C7FF3F] rounded-full shadow-[0_0_8px_#C7FF3F]" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase text-[#111111]">
            KALI <span className="text-[#777777] font-light">X AI</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-medium text-[#555555] uppercase tracking-wider bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-[#ECECEC] shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                id={`nav-link-${link.id}`}
                className={`transition-all duration-200 ${
                  isActive
                    ? 'text-[#111111] font-extrabold border-b-2 border-[#C7FF3F] pb-0.5'
                    : 'hover:text-[#111111]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions (AI Chat & Contact Me) */}
        <div className="hidden lg:flex items-center gap-3">
          {onOpenAiAssistant && (
            <button
              onClick={onOpenAiAssistant}
              id="nav-ai-assistant-btn"
              className="group flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:border-[#C7FF3F] hover:bg-[#F6F7FB] transition-all duration-200"
              title="Ask Kailash's AI Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-[#9CFF00] group-hover:scale-110 transition-transform" />
              <span>Ask AI</span>
            </button>
          )}

          <a
            href="#contact"
            onClick={(e) => {
              if (onOpenContact) {
                e.preventDefault();
                onOpenContact();
              } else {
                handleNavClick(e, '#contact');
              }
            }}
            id="nav-get-in-touch-btn"
            className="px-6 py-2.5 bg-[#111111] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(199,255,63,0.4)] transition-all flex items-center gap-2"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C7FF3F]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="nav-mobile-toggle"
          aria-label="Toggle navigation menu"
          className="md:hidden p-2.5 rounded-full border border-[#ECECEC] text-[#111111] bg-white hover:bg-[#F6F7FB] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bg-white/95 backdrop-blur-xl border-b border-[#ECECEC] shadow-xl p-6 transition-all animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                id={`mobile-nav-${link.id}`}
                className={`px-4 py-3 text-base font-semibold rounded-2xl transition-all ${
                  activeSection === link.id
                    ? 'bg-[#111111] text-white'
                    : 'text-[#111111] hover:bg-[#F6F7FB]'
                }`}
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-[#ECECEC] flex flex-col gap-3 mt-2">
              {onOpenAiAssistant && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiAssistant();
                  }}
                  id="mobile-ai-btn"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-[#ECECEC] text-sm font-semibold text-[#111111] bg-[#FAFAFA]"
                >
                  <Bot className="w-4 h-4 text-[#9CFF00]" />
                  <span>Chat with Kailash's AI Assistant</span>
                </button>
              )}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                id="mobile-contact-btn"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-bold text-white bg-[#111111] shadow-lg"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-[#C7FF3F]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
