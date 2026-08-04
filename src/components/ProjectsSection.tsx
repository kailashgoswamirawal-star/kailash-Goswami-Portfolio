import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ExternalLink, Github, ArrowUpRight, Sparkles, Filter, X, Check, BarChart2 } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onOpenContactWithProject?: (projectName: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenContactWithProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'AI & ML', 'Sales Automation', 'Dashboards', 'Mobile & Web', 'FinTech'];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-[#F6F7FB] relative overflow-hidden">
      {/* Background Neon Blurs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_center,_rgba(199,255,63,0.18)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_rgba(156,255,0,0.12)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-serif italic text-[#777777] text-lg mb-1">
              / Best Projects
            </p>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight">
              Selected Works
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <input
              type="text"
              placeholder="Search projects or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#ECECEC] text-xs font-medium text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#C7FF3F] focus:ring-2 focus:ring-[#C7FF3F]/30 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#111111]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              id={`filter-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-white text-[#555555] border border-[#ECECEC] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white rounded-[32px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(199,255,63,0.2)] hover:border-[#C7FF3F] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Project Image Container with Zoom Effect */}
                <div className="relative w-full h-64 sm:h-72 rounded-[24px] overflow-hidden bg-[#FAFAFA] mb-6 border border-[#ECECEC]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md border border-[#ECECEC] text-[#111111] shadow-sm">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#111111]/80 backdrop-blur-md text-white">
                      {project.year}
                    </span>
                  </div>

                  {/* Quick View Button Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="px-6 py-3 rounded-full bg-white text-[#111111] font-bold text-xs shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#C7FF3F]"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Project Title & Short Description */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#111111] transition-colors">
                    {project.title}
                  </h3>
                  <button
                    onClick={() => setActiveModalProject(project)}
                    aria-label={`Open case study for ${project.title}`}
                    className="w-10 h-10 rounded-full border border-[#ECECEC] flex items-center justify-center text-[#111111] hover:bg-[#C7FF3F] hover:border-[#C7FF3F] transition-all shrink-0"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-[#555555] leading-relaxed mb-6">
                  {project.shortDescription}
                </p>

                {/* Key Impact Metrics Pills */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] mb-6">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <p className="text-sm font-extrabold text-[#111111]">{m.value}</p>
                        <p className="text-[10px] text-[#777777] truncate">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tech Stack Badges */}
              <div className="pt-4 border-t border-[#ECECEC] flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#F6F7FB] border border-[#ECECEC] text-[10px] font-semibold text-[#555555]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2.5 py-1 rounded-md bg-[#FAFAFA] border border-[#ECECEC] text-[10px] font-bold text-[#777777]">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-bold text-[#111111] hover:text-[#9CFF00] transition-colors underline underline-offset-4"
                >
                  Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#ECECEC]">
            <p className="text-base font-bold text-[#111111]">No projects found matching "{searchQuery}"</p>
            <p className="text-xs text-[#777777] mt-1">Try clearing filters or search keyword.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#111111] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[32px] p-6 sm:p-10 border border-[#ECECEC] shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                aria-label="Close modal"
                className="absolute top-6 right-6 p-2.5 rounded-full border border-[#ECECEC] bg-white text-[#111111] hover:bg-[#F6F7FB] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Title & Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C7FF3F] text-[#111111]">
                    {activeModalProject.category}
                  </span>
                  <span className="text-xs text-[#777777]">{activeModalProject.year} • Client: {activeModalProject.client}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111111]">
                  {activeModalProject.title}
                </h3>
              </div>

              {/* Hero Image in Modal */}
              <div className="w-full h-72 rounded-2xl overflow-hidden mb-8 border border-[#ECECEC]">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[#F6F7FB] border border-[#ECECEC] mb-8">
                {activeModalProject.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xl font-extrabold text-[#111111]">{m.value}</p>
                    <p className="text-xs text-[#777777] font-medium">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-2">The Challenge</h4>
                  <p className="text-sm text-[#555555] leading-relaxed bg-[#FAFAFA] p-4 rounded-xl border border-[#ECECEC]">
                    {activeModalProject.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-2">The Solution & Architecture</h4>
                  <p className="text-sm text-[#555555] leading-relaxed bg-[#FAFAFA] p-4 rounded-xl border border-[#ECECEC]">
                    {activeModalProject.solution}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-2">Quantifiable Results</h4>
                  <ul className="space-y-2">
                    {activeModalProject.results.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#333333]">
                        <Check className="w-4 h-4 text-[#9CFF00] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack List */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-[#777777] uppercase tracking-wider mb-3">Tech Stack Used</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-[#FAFAFA] border border-[#ECECEC] text-xs font-semibold text-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 border-t border-[#ECECEC] flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-3">
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#222222] transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-white text-[#111111] border border-[#ECECEC] text-xs font-semibold flex items-center gap-2 hover:bg-[#F6F7FB] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>

                {onOpenContactWithProject && (
                  <button
                    onClick={() => {
                      const name = activeModalProject.title;
                      setActiveModalProject(null);
                      onOpenContactWithProject(name);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#C7FF3F] text-[#111111] text-xs font-extrabold hover:bg-[#9CFF00] transition-colors"
                  >
                    Build Similar Project →
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
