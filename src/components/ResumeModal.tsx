import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, CheckCircle2, Award, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, TIMELINE } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    // Simulated PDF print view launch
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[32px] p-6 sm:p-10 border border-[#ECECEC] shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#ECECEC] mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C7FF3F] flex items-center justify-center text-[#111111]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#111111]">{PERSONAL_INFO.name} — Curriculum Vitae</h3>
                <p className="text-xs text-[#777777]">{PERSONAL_INFO.title} • Updated August 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#222222] transition-colors shadow-md"
              >
                <Download className="w-3.5 h-3.5 text-[#C7FF3F]" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2.5 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#F6F7FB] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Document Sheet Preview */}
          <div className="bg-[#FAFAFA] rounded-2xl p-6 sm:p-8 border border-[#ECECEC] text-[#111111] space-y-8">
            
            {/* Summary */}
            <div>
              <h4 className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#9CFF00]" />
                Executive Summary
              </h4>
              <p className="text-sm text-[#333333] leading-relaxed">
                {PERSONAL_INFO.bioLong}
              </p>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white border border-[#ECECEC]">
              {PERSONAL_INFO.stats.map((s, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-xl font-extrabold text-[#111111]">{s.value}</p>
                  <p className="text-[11px] text-[#777777] font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#9CFF00]" />
                Work Experience & Key Accomplishments
              </h4>
              <div className="space-y-6">
                {TIMELINE.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-white border border-[#ECECEC]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h5 className="text-base font-bold text-[#111111]">{item.position}</h5>
                      <span className="text-xs font-semibold text-[#777777]">{item.company} • {item.period}</span>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {item.responsibilities.map((r, i) => (
                        <li key={i} className="text-xs text-[#555555] flex items-start gap-1.5">
                          <span className="text-[#9CFF00] font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {item.techUsed.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-[#F6F7FB] text-[10px] text-[#555555]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white border border-[#ECECEC]">
                <h4 className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#9CFF00]" />
                  Academia & Education
                </h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-bold text-[#111111]">Executive MBA — Operations</p>
                    <p className="text-xs text-[#777777]">IMT Ghaziabad</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111111]">PGP in Data Science & AI</p>
                    <p className="text-xs text-[#777777]">INSAID (With Fellowship, 2024)</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111111]">Bachelor of Arts (B.A.)</p>
                    <p className="text-xs text-[#777777]">Delhi University</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#ECECEC]">
                <h4 className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#9CFF00]" />
                  Certifications & Training
                </h4>
                <ul className="space-y-1.5 text-xs text-[#333333]">
                  <li>• <strong>PGP Data Science & AI Fellowship</strong> — INSAID (2024)</li>
                  <li>• <strong>PMP Training Completed</strong> — Simplilearn</li>
                  <li>• <strong>Digital Transformation Certified</strong> — Simplilearn (2020)</li>
                  <li>• <strong>First Level IoT Certified</strong> — Simplilearn (2020)</li>
                  <li>• <strong>Linux Security Certified</strong> — Inferno Solution UK (2013)</li>
                  <li>• <strong>SAP Certified in S&D</strong> — Delhi Institute High Tech (2012)</li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
