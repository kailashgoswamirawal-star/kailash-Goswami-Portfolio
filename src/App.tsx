import React, { useState } from 'react';
import { SeoHead } from './components/SeoHead';
import { ScrollProgress } from './components/ScrollProgress';
import { ThreeBackground } from './components/ThreeBackground';
import { WelcomeAudio } from './components/WelcomeAudio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedCompanies } from './components/TrustedCompanies';
import { ProcessSection } from './components/ProcessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { TimelineSection } from './components/TimelineSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiAssistantWidget } from './components/AiAssistantWidget';
import { Bot } from 'lucide-react';

export default function App() {
  const [isAiWidgetOpen, setIsAiWidgetOpen] = useState(false);
  const [contactInitialService, setContactInitialService] = useState('');
  const [contactInitialProject, setContactInitialProject] = useState('');

  const handleOpenContactWithService = (serviceTitle: string) => {
    setContactInitialService(serviceTitle);
    setContactInitialProject('');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenContactWithProject = (projectName: string) => {
    setContactInitialProject(projectName);
    setContactInitialService('');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenGeneralContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] antialiased selection:bg-[#C7FF3F] selection:text-[#111111] relative">
      <SeoHead />
      <ScrollProgress />
      <ThreeBackground />
      <WelcomeAudio />
      
      <Navbar
        onOpenAiAssistant={() => setIsAiWidgetOpen(true)}
        onOpenContact={handleOpenGeneralContact}
      />

      <main>
        <Hero
          onViewProjects={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenContact={handleOpenGeneralContact}
          onOpenAiAssistant={() => setIsAiWidgetOpen(true)}
        />

        <TrustedCompanies />
        <ProcessSection />

        <ProjectsSection
          onOpenContactWithProject={handleOpenContactWithProject}
        />

        <AboutSection />
        <SkillsSection />

        <ServicesSection
          onOpenContactWithService={handleOpenContactWithService}
        />

        <TimelineSection />
        <TestimonialsSection />

        <ContactSection
          initialService={contactInitialService}
          initialProject={contactInitialProject}
        />
      </main>

      <Footer />

      {/* Persistent Floating AI Assistant Trigger Button */}
      <button
        onClick={() => setIsAiWidgetOpen(!isAiWidgetOpen)}
        id="floating-ai-trigger-btn"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#111111] text-[#C7FF3F] shadow-[0_0_30px_rgba(199,255,63,0.5)] border-2 border-[#C7FF3F] hover:scale-110 transition-transform flex items-center gap-2 group cursor-pointer"
        title="Chat with Kailash's AI Assistant"
      >
        <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs font-extrabold text-white pr-1">Ask AI</span>
      </button>

      {/* AI Assistant Chat Modal/Widget */}
      <AiAssistantWidget
        isOpen={isAiWidgetOpen}
        onClose={() => setIsAiWidgetOpen(false)}
        onOpenContact={handleOpenGeneralContact}
      />
    </div>
  );
}
