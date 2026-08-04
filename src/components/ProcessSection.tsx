import React from 'react';
import { motion } from 'motion/react';
import { Compass, Layers, Rocket, Quote, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS, TESTIMONIALS } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_rgba(199,255,63,0.15)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-serif italic text-[#777777] text-lg mb-1">
            / Our Projects Explained
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight">
            Here's how it works
          </h2>
          <p className="mt-4 text-[#555555] text-base leading-relaxed">
            A battle-tested 3-phase framework that bridges complex AI models and business automation with human-centered product engineering.
          </p>
        </div>

        {/* 3 Step Cards Grid with Curved Connector Effects */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Subtle SVG Path Connector for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-20 -translate-y-12 pointer-events-none z-0 px-12">
            <svg className="w-full h-full" viewBox="0 0 1000 100" fill="none">
              <path
                d="M 150,50 Q 350,0 500,50 T 850,50"
                stroke="#C7FF3F"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
            </svg>
          </div>

          {PROCESS_STEPS.map((step, idx) => {
            const IconComp = idx === 0 ? Compass : idx === 1 ? Layers : Rocket;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative z-10 bg-white rounded-[28px] p-8 border border-[#ECECEC] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(199,255,63,0.18)] hover:border-[#C7FF3F] transition-all duration-300"
              >
                {/* Large Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-extrabold text-[#111111]/15 group-hover:text-[#9CFF00] transition-colors duration-300">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F7FB] border border-[#ECECEC] flex items-center justify-center group-hover:bg-[#C7FF3F] group-hover:text-[#111111] transition-colors duration-300">
                    <IconComp className="w-6 h-6 text-[#111111]" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#111111] mb-3 group-hover:translate-x-1 transition-transform">
                  {step.title}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  {step.description}
                </p>

                {/* Step Features List */}
                <div className="mt-6 pt-6 border-t border-[#ECECEC] flex items-center gap-2 text-xs font-semibold text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#9CFF00]" />
                  <span>
                    {idx === 0 ? 'Research & Data Audit' : idx === 1 ? 'AI Models & UX Prototype' : 'Production Deployment'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Testimonials Row Below Steps */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.slice(0, 2).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative p-6 sm:p-8 rounded-[24px] bg-[#FAFAFA] border border-[#ECECEC] flex flex-col justify-between shadow-sm hover:bg-white hover:border-[#C7FF3F] transition-all"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#ECECEC] pointer-events-none" />
              <p className="text-sm text-[#333333] italic leading-relaxed mb-6 font-serif">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#111111]">{t.name}</h4>
                  <p className="text-[11px] text-[#777777]">{t.role} at <span className="font-semibold text-[#111111]">{t.company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
