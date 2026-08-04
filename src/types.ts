export interface Project {
  id: string;
  title: string;
  category: 'AI & ML' | 'Agentic AI & ML' | 'Sales Automation' | 'Sales Force Automation' | 'Enterprise Systems' | 'Distributor Systems' | 'Quality Assurance & Rollout' | 'Dashboards' | 'Mobile & Web' | 'FinTech';
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  image: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  client: string;
  metrics: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  category: 'Sales Force Automation & ERP' | 'Agentic AI & LLM Systems' | 'Analytics & Management' | 'AI & Machine Learning' | 'Development & Frameworks' | 'Sales Automation & Systems' | 'Cloud & Analytics';
  level: number; // 0-100
  iconName: string;
  description: string;
  isPopular?: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  features: string[];
  expectedRoi: string;
  deliverables: string[];
}

export interface TimelineItem {
  id: string;
  company: string;
  companyLogo?: string;
  position: string;
  period: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
  techUsed: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: string;
  date: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  serviceType: string;
  budget?: string;
  message: string;
}
