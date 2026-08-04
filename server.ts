import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI client if GEMINI_API_KEY is provided
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasAiKey: !!apiKey,
      timestamp: new Date().toISOString(),
    });
  });

  // Contact Form Submission API
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message, serviceType } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    console.log(`[Contact Submission] From: ${name} (${email}) | Subject: ${subject || 'General Inquiry'} | Service: ${serviceType || 'Not specified'}`);
    
    return res.json({
      success: true,
      message: "Thank you for reaching out! Kailash Goswami will respond promptly within 12 hours.",
      ticketId: `KG-${Math.floor(100000 + Math.random() * 900000)}`,
      receivedAt: new Date().toISOString()
    });
  });

  // Deep Knowledge Base for Offline / Fallback and System Prompting
  const KNOWLEDGE_BASE = {
    sfa: `Sales Force Automation (SFA) Project:
Objective: Replaced manual sales processes with a mobile-first platform providing real-time visibility into field activities for 2,500+ field force personnel pan-India.
Key Objectives: Digitize field sales operations, real-time order booking, improve sales rep productivity, increase outlet coverage, live telemetry dashboards.
Modules: Attendance & Check-in/Check-out, GPS Tracking, Beat Planning, Route Optimization, Retailer Visit Planning, Outlet Creation & Approval, Product Catalog, Order Booking, Returns, Collection Entry, Expense Claims, Daily Activity Reporting, Target vs Achievement, Geo-fencing, Scheme Visibility.
Strategy & Impact: Workflow mapping, ERP/DMS integration, phase-wise pilot launch, zone-wise rollout. Resulted in 35% higher field productivity, faster order processing, and zero reporting latency.`,

    dms: `Distribution Management System (DMS) Strategy:
Implementation Focus: Digitized distributor operations across 230+ hubs pan-India with seamless ERP & SFA sync.
Modules: Distributor Master, Retailer Master, Product Master, Pricing & Tax, Inventory, Batch Management, Sales Invoice, Purchase Entry, Secondary Sales, Stock Transfer, Claims Settlement, Collections & Retailer Outstanding.
Methodology: Gap analysis, BRD preparation, Master Data Governance, ERP integration testing, UAT execution, Pilot launch & Hypercare support.
Benefits: Real-time inventory visibility, 40% faster claim processing, automated secondary sales tracking, zero stockout errors.`,

    erp: `ERP Integration Strategy:
Master Data Sync: Product Master, Customer/Retailer Master, Employee Master, Multi-tier Pricing, Tax Structures, Batch Details, Credit Notes, Sales & Purchase Orders, Inventory, Promotions, Collections, and Ledgers.
Architecture & Operations: Microservice API integration layers, automated scheduler cron jobs, dead-letter queue error handling, retry mechanisms, structured logging, and real-time monitoring alerts.`,

    ai_chatbot: `AI Chatbot & SAM Agentic Architecture:
Objective: Enterprise conversational AI representative and automated sales assistant (SAM) built for Colorbar Cosmetics & enterprise clients.
Architecture: RAG (Retrieval-Augmented Generation) pipelines, Vector Databases (FAISS/Pinecone), LLMs (Gemini / OpenAI), LangChain & LangGraph agent workflows, Meta-prompting, Memory retention, API integrations, OAuth authentication, multi-language support, and enterprise analytics.`,

    voice_agent: `AI Voice Agent Implementation:
Capabilities: Inbound/outbound call handling, automated customer support, HR assistant, sales assistant, appointment booking, lead qualification, live call transfer to human agents.
Stack & Workflows: VAPI, Deepgram STT, ElevenLabs TTS, N8N/Make automation, WhatsApp Business API integration, and CRM sync.`,

    power_bi: `Power BI & Analytics Strategy:
Dashboards Built: Primary Sales, Secondary Sales, Tertiary Sales, Distributor Stock & Inventory, Distributor KPI Matrix, Sales Rep Productivity, Market Coverage & Beat Adherence, Retailer Outstanding & Collections, Scheme Analysis, Category & Brand Performance, Executive C-Suite Dashboards.`,

    ai_forecasting: `AI Demand & Sales Forecasting:
Capabilities: Sales forecasting, demand forecasting, stock replenishment optimization, seasonal baseline modeling, promotion lift forecasting.
Techniques: Python ML models (LightGBM, Prophet, ARIMA, Pandas feature engineering), accuracy measurement (MAPE/RMSE), reducing inventory holding costs by 18%.`,

    digital_transformation: `Digital Transformation Methodology:
Consulting Approach: 1. Business Assessment -> 2. Process Analysis & Pain Point Identification -> 3. Target State Solution Architecture -> 4. Technology Selection -> 5. Implementation Roadmap -> 6. Pilot Deployment & Change Management -> 7. User Training -> 8. Enterprise Rollout & Continuous KPI Monitoring.`,

    project_management: `Project Management Methodology:
Approach: Agile-Waterfall hybrid execution. Stakeholder workshops, BRD & Functional Spec authoring, Technical Architecture design, Sprint planning, UAT execution, Hypercare support, Risk matrix mitigation, Vendor SLA management, and C-level status reviews.`,

    leadership: `Leadership & Stakeholder Management:
Approach: Led cross-functional teams across IT, Sales, Finance, Supply Chain, and Marketing. Managed top IT vendors (MAssist, Botree, Logic ERP), conducted nationwide UAT sessions, achieved 95%+ field user adoption, and mentored business units on AI adoption.`
  };

  // Interactive AI Assistant Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required." });
      }

      const lowerMsg = message.toLowerCase();

      // Intelligent Fallback search when Gemini API key is not configured or in sandbox
      let intelligentFallback = "";
      if (lowerMsg.includes("sfa") || lowerMsg.includes("sales force automation")) {
        intelligentFallback = KNOWLEDGE_BASE.sfa;
      } else if (lowerMsg.includes("dms") || lowerMsg.includes("distribution management")) {
        intelligentFallback = KNOWLEDGE_BASE.dms;
      } else if (lowerMsg.includes("erp") || lowerMsg.includes("integration")) {
        intelligentFallback = KNOWLEDGE_BASE.erp;
      } else if (lowerMsg.includes("voice") || lowerMsg.includes("vapi") || lowerMsg.includes("call")) {
        intelligentFallback = KNOWLEDGE_BASE.voice_agent;
      } else if (lowerMsg.includes("power bi") || lowerMsg.includes("dashboard") || lowerMsg.includes("analytics")) {
        intelligentFallback = KNOWLEDGE_BASE.power_bi;
      } else if (lowerMsg.includes("forecast") || lowerMsg.includes("demand") || lowerMsg.includes("ml")) {
        intelligentFallback = KNOWLEDGE_BASE.ai_forecasting;
      } else if (lowerMsg.includes("digital transformation") || lowerMsg.includes("consulting")) {
        intelligentFallback = KNOWLEDGE_BASE.digital_transformation;
      } else if (lowerMsg.includes("project management") || lowerMsg.includes("methodology") || lowerMsg.includes("brd")) {
        intelligentFallback = KNOWLEDGE_BASE.project_management;
      } else if (lowerMsg.includes("leadership") || lowerMsg.includes("vendor") || lowerMsg.includes("stakeholder")) {
        intelligentFallback = KNOWLEDGE_BASE.leadership;
      } else if (lowerMsg.includes("bot") || lowerMsg.includes("rag") || lowerMsg.includes("langchain") || lowerMsg.includes("sam") || lowerMsg.includes("architecture")) {
        intelligentFallback = KNOWLEDGE_BASE.ai_chatbot;
      }

      if (!ai) {
        if (intelligentFallback) {
          return res.json({ reply: intelligentFallback });
        }
        return res.json({
          reply: `I'm KALI X AI, Kailash Goswami's AI career representative. Kailash has 14+ years of expertise in SFA, DMS, ERP Integrations, Agentic AI (RAG/LangChain), Voice AI, Power BI Analytics, AI Forecasting, and FMCG Digital Transformation. Ask me specifically about his SFA rollout, DMS strategy, ERP sync, AI Voice Agents, or Leadership approach!`
        });
      }

      const systemInstruction = `You are "KALI X AI", the official AI representative & strategic consulting assistant for Kailash Goswami.
Kailash Goswami is a Project Lead - Sales IT, AI Automation Specialist & FMCG Digital Transformation Leader with 14+ years of experience across India.

You possess exhaustive knowledge about Kailash's technical architecture, projects, consulting framework, and methodologies:

1. Sales Force Automation (SFA):
- Digitize field sales, real-time order booking, 2,500+ field force, 230+ distributors.
- Modules: Attendance & Check-in/Check-out, GPS Location Tracking, Beat Planning, Route Optimization, Retailer Visit Planning, Outlet Creation & Approval, Product Catalog, Order Booking, Returns Management, Collection Entry, Expense Claims, Daily Activity Reporting, Target vs Achievement, Geo-fencing.
- Strategy & Impact: Process mapping, mobile-first UX, ERP/DMS integration, zone-wise rollout. Improved field visibility, 35% higher productivity.

2. Distribution Management System (DMS):
- Implementation Strategy for 230+ distributor networks pan-India.
- Modules: Distributor Master, Retailer Master, Product Master, Pricing, Inventory, Batch Management, Sales Invoice, Purchase Entry, Secondary Sales, Stock Transfer, Claims, Collections, Payment Tracking, Retailer Outstanding, Scheme Management.
- Benefits: Real-time inventory, faster billing, 40% faster claim settlements, reduced stockouts.

3. ERP Integration Strategy:
- Master Sync: Product Master, Customer Master, Employee Master, Pricing, Tax, Batch, Claims, Credit Notes, Sales Orders, Purchase Orders, Inventory, Promotions, Collections, Ledgers.
- Tech: Microservices, REST APIs, Scheduler Jobs, Dead-Letter Queue Error Handling, Retry Mechanisms, Logging & Alert Monitoring.

4. AI Chatbot & Agentic Project (SAM):
- Built using LangChain, LangGraph, RAG (Retrieval-Augmented Generation), Vector DBs (FAISS, Pinecone), LLMs (Gemini/OpenAI), Prompt Engineering, Memory, Multi-language support, and enterprise API auth.

5. AI Voice Agent:
- Automated call handling, customer support, sales assistant, lead qualification, CRM integration, live call transfer, VAPI, ElevenLabs, Deepgram, N8N, WhatsApp API automation.

6. Power BI & Executive Dashboards:
- Primary Sales, Secondary Sales, Tertiary Sales, Inventory, Distributor KPI, Sales Representative Productivity, Market Coverage, Retailer Outstanding & Collections, Scheme Analysis, C-suite Dashboards.

7. AI Forecasting & ML:
- Sales Forecasting, Demand Forecasting, Stock Replenishment, Promotional Lift modeling using Python, Pandas, LightGBM, Prophet, and MAPE/RMSE tracking.

8. Digital Transformation Strategy & Consulting Methodology:
- 1. Business Assessment -> 2. Current Process Analysis -> 3. Pain Point Identification -> 4. Target Architecture -> 5. Roadmap -> 6. Pilot & Change Management -> 7. User Training -> 8. Enterprise Rollout.

9. Project Management Methodology:
- BRD preparation, Functional Specs, Technical Design, Sprint Planning, UAT, Hypercare Support, Risk Matrix Management, Vendor SLA coordination.

10. Leadership & Stakeholder Management:
- Leading cross-functional teams (Sales, IT, SCM, Finance, Marketing), managing IT vendors, driving 95%+ user adoption, executive presentations.

Provide clear, structured, well-formatted, executive-ready answers. Be professional, confident, and accurate.`;

      let formattedPrompt = message;
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6).map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'User' : 'KALI X AI'}: ${h.text}`).join('\n');
        formattedPrompt = `Recent context:\n${recentHistory}\n\nUser Question: ${message}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || (intelligentFallback || "I'd be glad to discuss Kailash's experience in SFA, DMS, ERP integration, Voice AI, or AI Agentic workflows in detail.");

      return res.json({ reply });
    } catch (error: any) {
      console.error("[Gemini AI Error]:", error);
      return res.status(500).json({
        error: "Failed to process AI assistant request.",
        details: error?.message || "Unknown server error"
      });
    }
  });

  // Vite integration / Static file serving for express
  const distPath = path.join(process.cwd(), "dist");
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Portfolio backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

