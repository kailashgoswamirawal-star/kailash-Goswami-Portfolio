import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Workflow, LayoutDashboard, Sparkles, ArrowRight, CheckCircle2, Calculator, DollarSign, Clock, Users } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onOpenContactWithService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContactWithService }) => {
  // Calculator States
  const [teamSize, setTeamSize] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(65);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(14);

  // Calculations
  const weeklyHoursSaved = Math.round(teamSize * manualHoursPerWeek * 0.75);
  const annualHoursSaved = weeklyHoursSaved * 50;
  const annualDollarsSaved = Math.round(annualHoursSaved * hourlyRate);
  const estimatedInvestment = Math.round(annualDollarsSaved * 0.18);
  const roiMultiplier = (annualDollarsSaved / (estimatedInvestment || 1)).toFixed(1);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6 text-[#111111]" />;
      case 'Workflow': return <Workflow className="w-6 h-6 text-[#111111]" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-6 h-6 text-[#111111]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#111111]" />;
      default: return <BrainCircuit className="w-6 h-6 text-[#111111]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_rgba(199,255,63,0.18)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-serif italic text-[#777777] text-lg mb-1">
            / Services & Solutions
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight">
            Premium Services
          </h2>
          <p className="mt-4 text-[#555555] text-base leading-relaxed">
            From autonomous AI agents to enterprise Sales Force Automation (SFA) networks — built for measurable growth and reliability.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group bg-white rounded-[32px] p-8 border border-[#ECECEC] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(199,255,63,0.2)] hover:border-[#C7FF3F] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] flex items-center justify-center group-hover:bg-[#C7FF3F] transition-colors duration-300">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-[#F6F7FB] border border-[#ECECEC] text-[#111111]">
                    {service.expectedRoi}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#111111] mb-3 group-hover:translate-x-1 transition-transform">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
                  {service.fullDesc}
                </p>

                {/* Key Features */}
                <div className="space-y-2 mb-8 bg-[#FAFAFA] p-5 rounded-2xl border border-[#ECECEC]">
                  <h4 className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mb-3">Key Capabilities</h4>
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#333333]">
                      <CheckCircle2 className="w-4 h-4 text-[#9CFF00] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (onOpenContactWithService) {
                    onOpenContactWithService(service.title);
                  }
                }}
                id={`service-inquire-${service.id}`}
                className="w-full py-3.5 rounded-full bg-[#111111] text-white text-xs font-bold hover:bg-[#222222] transition-colors flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(199,255,63,0.4)]"
              >
                <span>Request {service.title}</span>
                <ArrowRight className="w-4 h-4 text-[#C7FF3F] group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Interactive Automation ROI & Savings Calculator Widget */}
        <div className="p-8 sm:p-12 rounded-[36px] bg-[#111111] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,_rgba(199,255,63,0.25)_0%,_transparent_60%)] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C7FF3F] text-[#111111] flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold">Automation ROI & Time Saved Calculator</h3>
                <p className="text-xs text-[#999999]">Estimate your organization's annual hours and dollar savings from custom AI workflows.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-8">
              {/* Sliders Left */}
              <div className="lg:col-span-7 space-y-6 bg-[#222222]/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#333333]">
                {/* Slider 1: Team Size */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-[#CCCCCC] flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#C7FF3F]" /> Team Size (Representatives / Staff)
                    </span>
                    <span className="text-[#C7FF3F] text-sm">{teamSize} reps</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-[#C7FF3F] cursor-pointer"
                  />
                </div>

                {/* Slider 2: Average Hourly Rate */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-[#CCCCCC] flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-[#C7FF3F]" /> Blended Hourly Cost
                    </span>
                    <span className="text-[#C7FF3F] text-sm">${hourlyRate}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="180"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-[#C7FF3F] cursor-pointer"
                  />
                </div>

                {/* Slider 3: Manual Task Hours per Week */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-[#CCCCCC] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#C7FF3F]" /> Manual Repetitive Hours / Rep / Week
                    </span>
                    <span className="text-[#C7FF3F] text-sm">{manualHoursPerWeek} hours</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="30"
                    value={manualHoursPerWeek}
                    onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                    className="w-full accent-[#C7FF3F] cursor-pointer"
                  />
                </div>
              </div>

              {/* Instant Output Card Right */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#222222] to-[#1A1A1A] p-6 sm:p-8 rounded-3xl border border-[#C7FF3F]/30 text-center flex flex-col justify-between shadow-xl">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-[#999999] uppercase tracking-wider mb-1">Estimated Annual Dollars Saved</p>
                    <h4 className="text-4xl sm:text-5xl font-extrabold text-[#C7FF3F]">
                      ${annualDollarsSaved.toLocaleString()}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#333333]">
                    <div>
                      <p className="text-[11px] text-[#999999]">Annual Hours Reclaimed</p>
                      <p className="text-xl font-extrabold text-white">{annualHoursSaved.toLocaleString()} hrs</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#999999]">Estimated ROI</p>
                      <p className="text-xl font-extrabold text-[#9CFF00]">{roiMultiplier}x ROI</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onOpenContactWithService) {
                      onOpenContactWithService(`Automation Strategy (${annualHoursSaved} hrs/yr savings target)`);
                    }
                  }}
                  className="mt-6 w-full py-3.5 rounded-full bg-[#C7FF3F] text-[#111111] text-xs font-extrabold hover:bg-[#9CFF00] transition-colors shadow-lg"
                >
                  Schedule Automation Audit →
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
