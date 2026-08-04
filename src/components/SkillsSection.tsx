import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BrainCircuit, Cpu, Sparkles, Bot, FileCode, Code2, Terminal, Palette, Workflow, Truck, Target, BarChart3, Cloud, Database } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'AI & Machine Learning', 'Development & Frameworks', 'Sales Automation & Systems', 'Cloud & Analytics'];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCat = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-[#9CFF00]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#9CFF00]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#9CFF00]" />;
      case 'Bot': return <Bot className="w-5 h-5 text-[#9CFF00]" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-[#111111]" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-[#111111]" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-[#111111]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#111111]" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-[#111111]" />;
      case 'Truck': return <Truck className="w-5 h-5 text-[#111111]" />;
      case 'Target': return <Target className="w-5 h-5 text-[#111111]" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-[#111111]" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-[#111111]" />;
      case 'Database': return <Database className="w-5 h-5 text-[#111111]" />;
      default: return <BrainCircuit className="w-5 h-5 text-[#9CFF00]" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#F6F7FB] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_rgba(199,255,63,0.15)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-serif italic text-[#777777] text-lg mb-1">
              / Tech Stack & Competencies
            </p>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight">
              Skills & Expertise
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <input
              type="text"
              placeholder="Search skill or framework..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#ECECEC] text-xs font-medium text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#C7FF3F] focus:ring-2 focus:ring-[#C7FF3F]/30 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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

        {/* Interactive Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group bg-white rounded-[24px] p-6 border border-[#ECECEC] shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(199,255,63,0.18)] hover:border-[#C7FF3F] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] flex items-center justify-center group-hover:bg-[#C7FF3F]/20 transition-colors">
                    {getIcon(skill.iconName)}
                  </div>
                  {skill.isPopular && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#C7FF3F] text-[#111111] shadow-xs">
                      Core Mastery
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#111111] mb-1 group-hover:translate-x-0.5 transition-transform">
                  {skill.name}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed mb-6">
                  {skill.description}
                </p>
              </div>

              {/* Progress Meter Bar */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-[#777777] text-[11px]">{skill.category}</span>
                  <span className="text-[#111111]">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F6F7FB] overflow-hidden border border-[#ECECEC]/60">
                  <div
                    className="h-full bg-gradient-to-r from-[#111111] via-[#9CFF00] to-[#C7FF3F] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
