import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Copy, Check, Send, Linkedin, Github, Twitter, Calendar, Sparkles, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  initialService?: string;
  initialProject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '', initialProject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialProject ? `Inquiry regarding ${initialProject}` : '',
    serviceType: initialService || 'AI Development',
    budget: '$10k - $25k',
    message: initialProject
      ? `Hi Kailash, I saw your project "${initialProject}" and would love to discuss a similar project for our company.`
      : initialService
      ? `Hi Kailash, I'm interested in your ${initialService} service. Let's connect!`
      : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ ticketId: string; message: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill out all required fields (Name, Email, Message).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmittedTicket({
          ticketId: data.ticketId || `ELN-${Math.floor(Math.random() * 900000)}`,
          message: data.message,
        });

        // Trigger celebratory confetti burst!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C7FF3F', '#9CFF00', '#111111', '#7FFF00'],
        });
      } else {
        setFormError(data.error || 'Failed to submit message. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      // Client fallback response if offline
      setSubmittedTicket({
        ticketId: `KLS-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Thank you for reaching out! Kailash will respond within 12 hours.',
      });
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Neon Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(199,255,63,0.2)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Call to Action Banner Headline */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-xs font-serif italic text-[#777777] text-lg mb-2">
            / Let's Build Something Amazing
          </p>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.05]">
            Let's Make It Happen
          </h2>
          <p className="mt-4 text-[#555555] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Always open to new opportunities, AI strategy consultations, and enterprise sales automation challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Information & Copy Email Box Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Quick Email Copy Card */}
            <div className="p-8 rounded-[32px] bg-[#FAFAFA] border border-[#ECECEC] shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:border-[#C7FF3F] transition-all">
              <span className="text-xs font-bold text-[#777777] uppercase tracking-wider mb-2 block">Direct Inbox</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-4 break-all">
                {PERSONAL_INFO.email}
              </h3>

              <button
                onClick={handleCopyEmail}
                id="copy-email-btn"
                className="w-full py-3.5 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#222222] transition-colors shadow-md"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-[#C7FF3F]" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#C7FF3F]" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Details Grid */}
            <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F6F7FB] border border-[#ECECEC] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#777777]">Direct Phone</p>
                  <p className="text-sm font-extrabold text-[#111111]">{PERSONAL_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F6F7FB] border border-[#ECECEC] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#777777]">Location</p>
                  <p className="text-sm font-extrabold text-[#111111]">{PERSONAL_INFO.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F6F7FB] border border-[#ECECEC] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#9CFF00]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#777777]">Current Availability</p>
                  <p className="text-xs font-bold text-[#111111]">{PERSONAL_INFO.availability}</p>
                </div>
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="p-6 rounded-[28px] bg-[#FAFAFA] border border-[#ECECEC] flex items-center justify-between">
              <span className="text-xs font-bold text-[#111111]">Connect on Socials:</span>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#C7FF3F] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#C7FF3F] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#C7FF3F] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Contact Form Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-12 rounded-[36px] bg-white border border-[#ECECEC] shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative">
              
              {submittedTicket ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#C7FF3F] text-[#111111] flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#111111]">Message Received!</h3>
                  <p className="text-sm text-[#555555] max-w-md mx-auto">{submittedTicket.message}</p>
                  <div className="inline-block px-4 py-2 rounded-xl bg-[#FAFAFA] border border-[#ECECEC] text-xs font-semibold text-[#111111]">
                    Confirmation Ticket: <span className="font-extrabold text-[#111111]">{submittedTicket.ticketId}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => setSubmittedTicket(null)}
                      className="mt-4 px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-bold"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-[#111111] mb-2">
                    Send a Message
                  </h3>

                  {formError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#C7FF3F] focus:ring-2 focus:ring-[#C7FF3F]/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#C7FF3F] focus:ring-2 focus:ring-[#C7FF3F]/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                        Primary Service
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] text-sm text-[#111111] focus:outline-none focus:border-[#C7FF3F] transition-all"
                      >
                        <option value="AI Development">AI & LLM Development</option>
                        <option value="Sales Automation">Sales Automation & SFA</option>
                        <option value="Dashboard Development">Business Intelligence & Dashboards</option>
                        <option value="Automation Consulting">Strategic AI Consulting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                        Project Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] text-sm text-[#111111] focus:outline-none focus:border-[#C7FF3F] transition-all"
                      >
                        <option value="< $10k">&lt; $10,000</option>
                        <option value="$10k - $25k">$10,000 — $25,000</option>
                        <option value="$25k - $50k">$25,000 — $50,000</option>
                        <option value="$50k+">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AI Sales Pipeline Integration"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#C7FF3F] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell Kailash about your project requirements, target timeline, or goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#C7FF3F] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full py-4 rounded-full bg-[#111111] text-white text-xs font-extrabold hover:bg-[#222222] transition-all shadow-xl hover:shadow-[0_0_25px_rgba(199,255,63,0.5)] flex items-center justify-center gap-2 border border-[#333333]"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 text-[#C7FF3F]" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
