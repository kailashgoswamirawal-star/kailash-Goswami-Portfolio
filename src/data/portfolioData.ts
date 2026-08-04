import { Project, Skill, Service, TimelineItem, Testimonial, Article } from '../types';

export const PERSONAL_INFO = {
  name: "Kailash Goswami",
  title: "Project Lead - Sales IT & AI Automation Expert",
  tagline: "Building agentic AI systems, Sales Force Automation (SFA), DMS networks, and AI voice agents for enterprise FMCG leaders.",
  bioShort: "14+ years of experience in Sales Force Automation (SFA), Distributor Management Systems (DMS), and Agentic AI workflows across FMCG, Beauty/Cosmetics, and Healthcare.",
  bioLong: "I am a Project Lead – Sales IT and AI Automation Specialist with over 14 years of experience driving digital transformation in the FMCG sector. Currently working at Colorbar Cosmetics (Modi Enterprises), I led nationwide rollouts of Sales Force Automation (SFA) and Distributor Management Systems (DMS) for 2,500+ field force members and 230+ distributors. In addition, I have pioneered agentic AI systems—building SAM (AI-powered sales assistant), multi-agent pipelines (LangChain, LangGraph, RAG, FastAPI), AI voice calling agents, and N8N workflow automation.",
  location: "New Delhi, India",
  email: "Kailashgoswami.rawal@gmail.com",
  phone: "+91 9811299347",
  availability: "Available for Enterprise Sales IT & AI Transformation Projects",
  resumeUrl: "#",
  avatarImage: "https://i.ibb.co/kshn2rTB/kailash-Photo.jpg",
  aboutPortrait: "https://i.ibb.co/kshn2rTB/kailash-Photo.jpg",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    huggingface: "https://huggingface.co",
  },
  stats: [
    { label: "Years Experience", value: "14+", sub: "In Sales IT & Automation" },
    { label: "Field Force Managed", value: "2,500+", sub: "Pan-India Sales Staff" },
    { label: "Distributor Networks", value: "230+", sub: "Automated DMS Hubs" },
    { label: "FMCG / Beauty Brands", value: "4+", sub: "Colorbar, VLCC, Hamdard, Dabur" },
  ],
  badges: [
    "PGP Data Science & AI (INSAID 2024)",
    "PMP Trained • Digital Transformation",
    "Colorbar Cosmetics • Sales IT Lead",
    "2,500+ Field Staff • 230+ Distributors"
  ]
};

export const TRUSTED_COMPANIES = [
  { name: "Colorbar Cosmetics", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "VLCC Personal Care", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Hamdard Laboratories", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Dabur India", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "MAssist / Fountain 9", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Botree Technologies", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Logic ERP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "INSAID AI", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200" },
];

export const PROJECTS: Project[] = [
  {
    id: "sam-ai-sales-assistant",
    title: "SAM — AI Sales Assistant & Voice Engine",
    category: "Agentic AI & ML",
    shortDescription: "AI-powered sales assistant & automated voice/reporting engine serving 2,500+ field personnel & executive leadership at Colorbar Cosmetics.",
    fullDescription: "Built SAM (Sales Assistant Manager) for Colorbar Cosmetics utilizing LangGraph, LangChain, RAG pipelines, FastAPI, and N8N workflow automation. SAM connects live primary, secondary, and tertiary sales telemetry with multi-agent intelligence to provide instant voice updates, automated reporting pipelines, and interactive AI website communication.",
    challenge: "Field managers and leadership spent hours pulling fragmented MIS reports and manually answering distributor stock questions across 230+ hubs.",
    solution: "Architected a multi-agent backend using LangChain, LangGraph, RAG vector stores, FastAPI, and N8N webhooks to enable conversational voice queries and automated report dispatch.",
    results: [
      "Reduced daily MIS report generation time by 85%",
      "Engineered real-time AI query resolution for 2,500+ field staff",
      "Automated primary & secondary sales tracking and claim validation"
    ],
    techStack: ["Python", "LangChain", "LangGraph", "RAG", "FastAPI", "N8N", "Power BI", "SQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    liveUrl: "https://example.com/sam-ai",
    githubUrl: "https://github.com/example/sam-sales-assistant",
    year: "2024 - 2025",
    client: "Colorbar Cosmetics Pvt Ltd",
    metrics: [
      { label: "Report Velocity", value: "85% Faster" },
      { label: "Users Served", value: "2,500+" },
      { label: "Distributors", value: "230+" }
    ]
  },
  {
    id: "massist-sfa-dms-crm",
    title: "MAssist SFA & DMS CRM Enterprise Network",
    category: "Sales Force Automation",
    shortDescription: "Nationwide SFA and Distributor Management System (DMS) CRM deployment managing 230+ distributors and 2,500+ field force.",
    fullDescription: "Led end-to-end requirement gathering, system architecture design, ERP (Logic) integration, and post-implementation support for Colorbar Cosmetics' nationwide SFA & DMS CRM platform.",
    challenge: "Lack of real-time visibility into distributor stock levels, manual claim verification delays, and inventory stockouts across 230+ distributors.",
    solution: "Automated primary & secondary sales tracking, AI-powered inventory replenishment forecasting, and geo-fenced Beauty Advisor (BA) tracking.",
    results: [
      "Achieved 100% real-time visibility into primary, secondary, and tertiary sales",
      "Accelerated distributor claim settlement processing cycles by 65%",
      "Trained Beauty Advisors (BAs), Sales Executives (SEs), and RSMs pan-India"
    ],
    techStack: ["MAssist CRM", "Logic ERP", "Power BI", "SQL", "Geo-Fencing", "REST APIs"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    liveUrl: "https://example.com/massist-sfa",
    githubUrl: "https://github.com/example/massist-sfa-crm",
    year: "2021 - Present",
    client: "Colorbar Cosmetics Pvt Ltd",
    metrics: [
      { label: "Distributor Hubs", value: "230+" },
      { label: "Field Force", value: "2,500+" },
      { label: "Claim Processing", value: "65% Faster" }
    ]
  },
  {
    id: "saarthi-ng-vlcc",
    title: "Saarthi NG Enterprise DMS & SFA Platform",
    category: "Enterprise Systems",
    shortDescription: "Pan-India Sales Force Automation & Beauty Advisor management platform serving 2,000+ active users at VLCC Personal Care.",
    fullDescription: "Spearheaded sales effectiveness and IT automation projects for VLCC Personal Care (Retail, Modern Trade, and Professional business). Custom-built field force, distributor, and beauty advisor management tools.",
    challenge: "Managing multi-channel sales operations across GT, MT, and retail channels without centralized master data governance or automated field attendance.",
    solution: "Implemented Botree/Channel Bridge DMS, geo-fenced attendance with selfie face detection, scheme engines, and automated SKU/price migrations.",
    results: [
      "Successfully managed 2,000+ active field users pan-India",
      "Streamlined primary sale tracking from AX ERP to DMS Lite",
      "Standardized scheme uploads, price list updates, and inventory audits"
    ],
    techStack: ["Botree DMS", "Saarthi NG", "AX ERP", "Face Detection", "MIS Analytics"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    liveUrl: "https://example.com/saarthi-ng",
    year: "2014 - 2021",
    client: "VLCC Personal Care",
    metrics: [
      { label: "Active Users", value: "2,000+" },
      { label: "Coverage", value: "Pan-India" },
      { label: "Business Units", value: "GT, MT & Retail" }
    ]
  },
  {
    id: "duniya-e-hamdard-dms",
    title: "Duniya e Hamdard DMS & Stockist Network",
    category: "Distributor Systems",
    shortDescription: "Pan-India stockist management system and L1/L2 IT service management for Hamdard Wakf Laboratories.",
    fullDescription: "Handled project planning, implementation, rollout, and stockist technical support for the 'Duniya e Hamdard' DMS platform powered by Botree.",
    challenge: "High ticket escalation volume from stockists and field sales officers regarding order discrepancies and IT incidents.",
    solution: "Established structured IT Service Management (ITSM) processes for incident, problem, and change management along with hands-on field force training.",
    results: [
      "Reduced P1 incident resolution times by 50%",
      "Increased sales velocity through seamless handheld DMS order processing",
      "Trained RSM, ASM, SO, and DSR teams across all India regions"
    ],
    techStack: ["Botree DMS", "ITSM", "Help Desk Management", "MIS Exception Reporting", "SQL"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    featured: false,
    year: "2011 - 2014",
    client: "Hamdard Wakf Laboratories",
    metrics: [
      { label: "Incident SLA", value: "50% Faster" },
      { label: "Rollout Scope", value: "Pan-India" },
      { label: "Support Tier", value: "L1 & L2 ITSM" }
    ]
  },
  {
    id: "drishti-dms-dabur",
    title: "Drishti DMS QA & Rollout System",
    category: "Quality Assurance & Rollout",
    shortDescription: "QA testing, UAT execution, and pilot rollout lead for Dabur India's Drishti DMS platform.",
    fullDescription: "Led the QA L1 team for functionality testing, User Acceptance Testing (UAT), system integration testing, and software launch of the Drishti DMS platform for Dabur India.",
    challenge: "Ensuring zero critical functional bugs prior to launching the handheld DMS application across Dabur's national distribution network.",
    solution: "Executed comprehensive test cases across development, UAT, and production environments; monitored pilot rollout performance.",
    results: [
      "Achieved 99.8% bug-free release status for production launch",
      "Successfully transitioned Dabur's distribution network to the new Drishti platform"
    ],
    techStack: ["Drishti DMS", "Botree", "UAT Testing", "System Integration Testing", "QA Execution"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    featured: false,
    year: "2010 - 2011",
    client: "Dabur India",
    metrics: [
      { label: "Release Quality", value: "99.8% Pass" },
      { label: "Rollout Stage", value: "Pilot & National" }
    ]
  },
  {
    id: "voice-ai-automation-pipeline",
    title: "Multi-Agent Voice AI & Workflow Automation Pipeline",
    category: "Agentic AI & ML",
    shortDescription: "AI Voice Calling Agents, STT/TTS pipelines, and N8N/Make workflow orchestrations.",
    fullDescription: "Developed conversational AI voice calling pipelines using VAPI, ElevenLabs, Deepgram real-time conversation flows, and N8N workflow automation with WhatsApp Business API integration.",
    challenge: "High cost of manual call center outreach for lead verification and order confirmations.",
    solution: "Integrated multi-agent voice calling with automated Webhook triggers and LLM-augmented conversation flows.",
    results: [
      "Automated 80% of routine outbound verification calls",
      "Enabled sub-second voice synthesis and real-time response generation"
    ],
    techStack: ["VAPI", "ElevenLabs", "Deepgram", "N8N", "Make", "Python", "WhatsApp API"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    featured: false,
    year: "2024",
    client: "Enterprise Voice & AI",
    metrics: [
      { label: "Call Automation", value: "80%" },
      { label: "Voice Latency", value: "< 600ms" }
    ]
  }
];

export const SKILLS: Skill[] = [
  // Sales Force Automation & ERP
  { name: "SFA & DMS Systems", category: "Sales Force Automation & ERP", level: 98, iconName: "Truck", description: "Pan-India Sales Force Automation, Distributor Management, MAssist, Botree, Channel Bridge.", isPopular: true },
  { name: "ERP & CRM Integration", category: "Sales Force Automation & ERP", level: 96, iconName: "Workflow", description: "Logic ERP, Microsoft Dynamics 365, AX ERP, Master Data Governance.", isPopular: true },
  { name: "Distributor Claim & Inventory Automation", category: "Sales Force Automation & ERP", level: 95, iconName: "BarChart3", description: "Primary/Secondary sales tracking, claim validation, SKU migrations, restocking AI." },
  { name: "Geo-Fencing & Face Attendance", category: "Sales Force Automation & ERP", level: 92, iconName: "Target", description: "Selfie attendance with face detection, beat mapping, journey plans, outlet creation." },

  // Agentic AI & LLM Systems
  { name: "Agentic AI & LangChain / LangGraph", category: "Agentic AI & LLM Systems", level: 95, iconName: "BrainCircuit", description: "Multi-agent pipelines, RAG architectures, SAM AI Sales Assistant, Meta-Prompting.", isPopular: true },
  { name: "N8N & Make Workflow Automation", category: "Agentic AI & LLM Systems", level: 96, iconName: "Workflow", description: "Advanced N8N, Make, Webhooks, API orchestration, WhatsApp Business API.", isPopular: true },
  { name: "AI Voice Calling & STT/TTS", category: "Agentic AI & LLM Systems", level: 92, iconName: "Bot", description: "VAPI, ElevenLabs, Deepgram, Real-time conversation flows, Call Center AI." },
  { name: "Python, FastAPI & Vector Databases", category: "Agentic AI & LLM Systems", level: 94, iconName: "FileCode", description: "Python, SQL, MySQL, FastAPI, REST APIs, FAISS, Pinecone, EDA, Pandas." },

  // Analytics & Management
  { name: "Power BI & MIS Analytics", category: "Analytics & Management", level: 95, iconName: "BarChart3", description: "DAX modeling, executive dashboards, primary/secondary/tertiary sales reporting.", isPopular: true },
  { name: "IT Service Management & Delivery", category: "Analytics & Management", level: 96, iconName: "Target", description: "PMP, ITSM, Incident/Problem/Change Management, Agile/Scrum, Vendor Management." },
  { name: "Docker & DevOps (CI/CD)", category: "Analytics & Management", level: 88, iconName: "Cloud", description: "Docker, GitHub Actions, Linux administration, Cloud deployment." }
];

export const SERVICES: Service[] = [
  {
    id: "sfa-dms-automation",
    title: "Sales Force Automation (SFA) & DMS Consulting",
    shortDesc: "Nationwide SFA, Distributor Management Systems (DMS), and ERP/CRM integration.",
    fullDesc: "End-to-end design, implementation, rollout, and training for SFA and DMS systems managing field forces of 2,500+ users and 230+ distributors.",
    icon: "Truck",
    features: [
      "Primary, secondary & tertiary sales tracking",
      "MAssist, Botree & ERP (Logic / Dynamics / AX) integration",
      "Distributor claim automation & inventory replenishment forecasting",
      "Geo-fencing & selfie attendance with face detection"
    ],
    expectedRoi: "Save 65%+ in claim processing time; 100% real-time field visibility.",
    deliverables: ["SFA & DMS Ecosystem", "ERP Sync Architecture", "Executive Dashboards", "Field Training Modules"]
  },
  {
    id: "agentic-ai-development",
    title: "Agentic AI & Multi-Agent Systems",
    shortDesc: "Custom SAM AI assistants, RAG pipelines, LangChain, LangGraph, and FastAPI microservices.",
    fullDesc: "Deploy autonomous AI agents that automate business reporting, answer complex ERP queries, and streamline internal operations for enterprise FMCG leaders.",
    icon: "BrainCircuit",
    features: [
      "Custom RAG pipelines over enterprise ERP/CRM data",
      "LangGraph & LangChain multi-agent orchestration",
      "Automated business reporting & anomaly alerts",
      "FastAPI microservices & secure token optimization"
    ],
    expectedRoi: "85% reduction in manual MIS report generation and query lag.",
    deliverables: ["Multi-Agent Backend", "RAG Vector Pipeline", "FastAPI Endpoints", "Telemetry Dashboard"]
  },
  {
    id: "workflow-voice-automation",
    title: "Workflow & Voice AI Automation (N8N, Make, Voice AI)",
    shortDesc: "N8N/Make automation, AI Voice Calling Agents, VAPI, ElevenLabs, and WhatsApp Business API.",
    fullDesc: "Building LLM-augmented automation pipelines and real-time conversational voice agents for customer outreach, website communication, and field support.",
    icon: "Workflow",
    features: [
      "Advanced N8N & Make (Integromat) webhook orchestration",
      "AI Voice Calling Agents (VAPI, Deepgram, ElevenLabs)",
      "WhatsApp Business API order & claim bots",
      "Sub-second voice response flows"
    ],
    expectedRoi: "Automate 80% of routine verification calls and field updates.",
    deliverables: ["N8N Workflows", "Voice Agent Integration", "WhatsApp Bot Pipeline", "API Webhook Docs"]
  },
  {
    id: "powerbi-mis-analytics",
    title: "Executive Power BI & MIS Analytics",
    shortDesc: "Real-time sales dashboards, primary/secondary/tertiary analytics, and exception reporting.",
    fullDesc: "Custom Power BI dashboards providing C-suite leadership with instant visibility into inventory stock, claim status, and regional field force performance.",
    icon: "LayoutDashboard",
    features: [
      "DAX modeling for Primary, Secondary & Tertiary sales",
      "Real-time inventory level & claim status tracking",
      "Automated weekly & monthly MIS exception reporting",
      "Role-based access control (RBAC) for RSMs, ASMs, and Executives"
    ],
    expectedRoi: "Instant data-driven decision-making for leadership.",
    deliverables: ["Power BI Embedded Workspace", "DAX Data Models", "Automated MIS Dispatch", "User Guide"]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "t1",
    company: "Colorbar Cosmetics Pvt Ltd (Modi Enterprises)",
    position: "Project Lead (AM) – Sales IT",
    period: "July 2021 — Present",
    location: "New Delhi, India",
    responsibilities: [
      "Led nationwide implementation and rollout of Sales Force Automation (SFA) & Distributor Management System (DMS) CRM managing 2,500+ field staff and 230+ distributors.",
      "Built SAM (AI Sales Assistant) using LangChain, LangGraph, RAG pipelines, and FastAPI to automate business reporting pipelines and website voice communication.",
      "Automated critical business processes including primary & secondary sales tracking, claims automation, and AI-driven inventory replenishment forecasting.",
      "Integrated MAssist CRM platform with ERP (Logic) systems, enabling real-time visibility into sales, inventory, and distributor performance.",
      "Delivered hands-on classroom and field training for Beauty Advisors (BAs), Sales Executives (SEs), Supervisors, RSMs, and distributors pan-India."
    ],
    achievements: [
      "Managed 2,500+ field force & 230+ distributors with zero downtime.",
      "Reduced report generation time and claim settlement cycle time by 65%."
    ],
    techUsed: ["MAssist CRM", "Logic ERP", "LangGraph", "LangChain", "RAG", "FastAPI", "Python", "Power BI", "N8N", "SQL"]
  },
  {
    id: "t2",
    company: "VLCC Personal Care",
    position: "Assistant Manager – IT Business Automation & Project",
    period: "July 2014 — June 2021",
    location: "New Delhi, India",
    responsibilities: [
      "Executed Sales Force Automation (SFA), DMS (Saarthi NG), and Beauty Advisor (BA) App projects across India for 2,000+ active users.",
      "Monitored field data capture accuracy using geo-fencing and selfie attendance with face detection.",
      "Managed master data setup, SKU updates, pricing configurations, and scheme uploads in SFA and DMS.",
      "Tracked daily primary sales from AX ERP to DMS Lite and secondary sales from SFA & BA app."
    ],
    achievements: [
      "Built sales automation ecosystem from scratch for Retail, Modern Trade & Professional business.",
      "Streamlined inventory audits and GRN updates across regional IT spoke teams."
    ],
    techUsed: ["Saarthi NG", "Botree DMS", "AX ERP", "Face Detection", "Geo-Fencing", "Power BI", "SQL"]
  },
  {
    id: "t3",
    company: "Hamdard Wakf Laboratories",
    position: "Senior Technical Support Officer - IT",
    period: "2011 — 2014",
    location: "New Delhi, India",
    responsibilities: [
      "Handled 'Duniya e Hamdard' DMS project planning, implementation, execution, and rollout across India.",
      "Provided L1/L2 technical and functional support for stockists, RSMs, ASMs, SOs, and DSRs.",
      "Managed IT Service Management (Incident, Problem, Change, Release) and service desk standards.",
      "Conducted root cause analysis (RCA) for Priority 1 incidents and monitored daily EOD reports."
    ],
    achievements: [
      "Successfully deployed stockist DMS network nationwide while maintaining strict SLA compliance.",
      "Trained field force on handheld DMS applications to boost daily order processing velocity."
    ],
    techUsed: ["Botree DMS", "ITSM", "Helpdesk", "MIS Reporting", "Service Desk", "SQL"]
  },
  {
    id: "t4",
    company: "Dabur India (Drishti Project)",
    position: "Helpdesk Support Officer / QA Lead",
    period: "Sep 2010 — Mar 2011",
    location: "New Delhi, India",
    responsibilities: [
      "Led the QA L1 team for functionality testing and User Acceptance Testing (UAT) for the Drishti DMS platform.",
      "Executed test cases across development, UAT, and production environments prior to new releases.",
      "Monitored pilot rollout software launch for the national distribution network."
    ],
    achievements: [
      "Delivered high-quality QA validation ensuring smooth transition to production release."
    ],
    techUsed: ["Drishti DMS", "Botree", "UAT Testing", "System Integration Testing", "QA Execution"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "m1",
    name: "Naveen Gulati",
    role: "CTO",
    company: "Colorbar Cosmetics",
    avatar: "",
    quote: "Kailash led our SFA and DMS CRM rollout across 230+ distributors and 2,500+ field force flawlessly. His integration of SAM AI sales assistant brought unprecedented efficiency to our daily sales reporting.",
    rating: 5
  },
  {
    id: "m2",
    name: "Dhiraj Gautam",
    role: "Delivery Head",
    company: "Colorbar Cosmetics",
    avatar: "",
    quote: "Kailash's execution during our nationwide sales IT transformation was exceptional. He ensured zero-downtime integration between ERP systems, handheld SFA, and live executive dashboards.",
    rating: 5
  },
  {
    id: "m3",
    name: "Raviraj Bhattacharya",
    role: "IT Head",
    company: "VLCC Personal Care",
    avatar: "",
    quote: "Kailash built our Saarthi NG DMS and Beauty Advisor app from scratch. His domain mastery in FMCG sales automation, geo-fencing, and master data governance is unmatched.",
    rating: 5
  },
  {
    id: "m4",
    name: "Vikram Malhotra",
    role: "General Manager - IT",
    company: "Hamdard Laboratories",
    avatar: "",
    quote: "Kailash handled our stockist DMS rollout with total commitment. He maintained high SLA standards and ensured our field teams were fully trained on handheld applications.",
    rating: 5
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Building SAM: Agentic AI Assistant for FMCG Sales Operations",
    slug: "building-sam-agentic-ai-fmcg-sales",
    excerpt: "How we combined LangChain, LangGraph, RAG pipelines, and FastAPI to automate sales reporting for 2,500+ field staff.",
    content: `
# Building SAM: Agentic AI Assistant for FMCG Sales Operations

In modern FMCG enterprises, managing field staff across hundreds of distribution hubs requires instant access to sales telemetry. At Colorbar Cosmetics, we built **SAM (Sales Assistant Manager)** to bridge the gap between complex ERP databases and ground-level sales representatives.

## Core Architectural Pillars

1. **Multi-Agent Orchestration**: Leveraging LangGraph and LangChain to route queries between stock reconciliation, primary/secondary sales tracking, and claim validation tools.
2. **Server-Side Security**: Running FastAPI endpoints with RAG pipelines over secure vector stores, keeping enterprise data strictly protected.
3. **Automated MIS Reporting**: Using N8N workflows to dispatch daily exception reports to regional sales managers and executive leadership.

> *"With SAM, our field teams get real-time stock and sales answers in seconds via voice and natural language queries."*
    `,
    readTime: "6 min read",
    category: "Agentic AI & ML",
    date: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Kailash Goswami",
      avatar: "https://i.ibb.co/kshn2rTB/kailash-Photo.jpg"
    },
    tags: ["Agentic AI", "LangChain", "FastAPI", "Colorbar", "Sales IT"]
  },
  {
    id: "art-2",
    title: "Scaling Distributor Management Systems (DMS) Across 2,500+ Field Staff",
    slug: "scaling-dms-sfa-fmcg-colorbar-vlcc",
    excerpt: "Lessons learned from executing nationwide SFA & DMS rollouts across 230+ distributor networks in India.",
    content: `
# Scaling Distributor Management Systems (DMS) Across 2,500+ Field Staff

Deploying Sales Force Automation (SFA) and Distributor Management Systems (DMS) across a diverse country like India requires careful planning, robust master data governance, and reliable mobile sync engines.

## Key Success Factors

1. **Master Data Governance**: Ensuring strict SKU initialization, price list mapping, and scheme uploads in SFA and ERP systems.
2. **Geo-Fencing & Face Attendance**: Integrating selfie attendance with face detection to guarantee journey plan compliance.
3. **Claim Automation**: Streamlining distributor claim processing to reduce turnaround time from weeks to days.
    `,
    readTime: "8 min read",
    category: "Sales Force Automation",
    date: "2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Kailash Goswami",
      avatar: "https://i.ibb.co/kshn2rTB/kailash-Photo.jpg"
    },
    tags: ["SFA", "DMS", "FMCG", "Colorbar", "VLCC"]
  },
  {
    id: "art-3",
    title: "AI Voice Calling & Workflow Automation with N8N and Make",
    slug: "ai-voice-calling-workflow-automation-n8n",
    excerpt: "How VAPI, ElevenLabs, Deepgram, and N8N webhooks create seamless multi-agent voice pipelines.",
    content: `
# AI Voice Calling & Workflow Automation with N8N and Make

Combining conversational voice AI with low-code workflow automation allows enterprise organizations to handle customer queries and automated field verification at scale.

## The Voice AI Stack

- **Speech-to-Text & Text-to-Speech**: Deepgram & ElevenLabs for sub-second natural voice generation.
- **Voice Orchestration**: VAPI real-time conversation flows.
- **Workflow Automation**: N8N and Make webhooks connected to WhatsApp Business API.
    `,
    readTime: "5 min read",
    category: "Voice AI & Automation",
    date: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Kailash Goswami",
      avatar: "https://i.ibb.co/kshn2rTB/kailash-Photo.jpg"
    },
    tags: ["Voice AI", "N8N", "Make", "FastAPI", "Automation"]
  }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Requirement Gathering & Architecture",
    description: "Analyzing business processes, field sales workflows, ERP/CRM dependencies, and master data structures.",
    icon: "Compass"
  },
  {
    number: "02",
    title: "System Design & AI Development",
    description: "Building SFA/DMS integrations, multi-agent AI pipelines (LangChain/FastAPI), and Power BI telemetry dashboards.",
    icon: "Layers"
  },
  {
    number: "03",
    title: "Pan-India Rollout & Field Training",
    description: "Executing UAT, pilot rollouts, distributor onboarding, and hands-on training for BAs, SEs, RSMs, and C-suite.",
    icon: "Rocket"
  }
];
