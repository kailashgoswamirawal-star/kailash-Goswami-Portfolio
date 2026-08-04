import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, Tag, X, ArrowRight, Sparkles } from 'lucide-react';
import { ARTICLES } from '../data/portfolioData';
import { Article } from '../types';

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section id="blog" className="py-24 bg-[#F6F7FB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-serif italic text-[#777777] text-lg mb-1">
              / Insights & Articles
            </p>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight">
              Latest Articles
            </h2>
          </div>
          <p className="text-xs text-[#555555] max-w-sm">
            Technical write-ups on Gemini AI pipelines, offline-first Sales Force Automation, and Awwwards-grade frontend engineering.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => setActiveArticle(art)}
              className="group bg-white rounded-[28px] p-6 border border-[#ECECEC] shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(199,255,63,0.18)] hover:border-[#C7FF3F] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#FAFAFA] mb-5 border border-[#ECECEC]">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-white/90 backdrop-blur-md text-[#111111]">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#777777] mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#9CFF00]" />
                    {art.readTime}
                  </span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>

                <h3 className="text-xl font-bold text-[#111111] mb-3 leading-snug group-hover:text-[#111111] transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-[#555555] leading-relaxed mb-6 line-clamp-2">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ECECEC] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={art.author.avatar}
                    alt={art.author.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-[#111111]">{art.author.name}</span>
                </div>

                <span className="text-xs font-bold text-[#111111] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[32px] p-6 sm:p-10 border border-[#ECECEC] shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                aria-label="Close article modal"
                className="absolute top-6 right-6 p-2.5 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#F6F7FB] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C7FF3F] text-[#111111]">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-[#777777]">{activeArticle.date} • {activeArticle.readTime}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111111] leading-tight">
                  {activeArticle.title}
                </h3>
              </div>

              {/* Cover Image */}
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 border border-[#ECECEC]">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-md bg-[#FAFAFA] border border-[#ECECEC] text-xs text-[#555555]">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Article Content */}
              <div className="prose prose-sm max-w-none text-[#333333] space-y-4 whitespace-pre-line leading-relaxed font-sans">
                {activeArticle.content}
              </div>

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-[#ECECEC] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#111111]">{activeArticle.author.name}</h4>
                    <p className="text-[11px] text-[#777777]">Lead AI Engineer & Author</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-bold"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
