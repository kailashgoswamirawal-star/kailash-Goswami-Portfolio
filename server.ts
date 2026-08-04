import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    
    // Return success response with simulated response time & ID
    return res.json({
      success: true,
      message: "Thank you for reaching out! Kailash Goswami will respond promptly.",
      ticketId: `KG-${Math.floor(100000 + Math.random() * 900000)}`,
      receivedAt: new Date().toISOString()
    });
  });

  // Interactive AI Assistant Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required." });
      }

      if (!ai) {
        // Fallback intelligent responder if key is not configured
        return res.json({
          reply: `Hi! I'm Kailash's AI Assistant. Kailash Goswami is a Project Lead - Sales IT & AI Automation Expert with 14+ years of experience in Sales Force Automation (SFA), Distributor Management Systems (DMS), and Agentic AI (SAM Sales Assistant, LangChain, RAG, N8N, Voice AI). He has managed field teams of 2,500+ users and 230+ distributors across India for top FMCG brands like Colorbar Cosmetics, VLCC, Hamdard, and Dabur.`
        });
      }

      const systemInstruction = `You are "Kailash AI", the official AI representative & career assistant for Kailash Goswami.
Kailash Goswami is a Project Lead - Sales IT, AI Automation Specialist & FMCG Digital Transformation Leader.

Key Details about Kailash Goswami:
- Current Role: Project Lead (AM) – Sales IT at Colorbar Cosmetics Pvt Ltd (Modi Enterprises) (July 2021 – Present).
- Contact: Email: Kailashgoswami.rawal@gmail.com | Phone: +91 9811299347 | Location: New Delhi, India.
- Experience: 14+ years of total experience in Sales Force Automation (SFA), Distributor Management Systems (DMS), and IT Service Operations in FMCG (Cosmetics, Beauty, Skincare, Healthcare & Food).
- Enterprise Impact: Managed rollouts for 2,500+ field force personnel and 230+ distributor networks pan-India.
- Signature Projects:
  1. SAM (AI-Powered Sales Assistant): Built for Colorbar Cosmetics using LangChain, LangGraph, RAG pipelines, FastAPI, N8N, and voice calling bots to automate business reporting pipelines.
  2. MAssist SFA & DMS CRM: Nationwide rollout across India for 2,500+ field sales force and 230 distributors, automating primary & secondary sales tracking and claim settlements.
  3. Saarthi NG (VLCC Personal Care): Managed DMS, SFA, and BA app for 2,000+ users pan-India with geo-fencing and selfie attendance face detection.
  4. Duniya e Hamdard (Hamdard Wakf): Stockist management and ITSM service desk lead for nationwide rollout.
  5. Drishti DMS QA (Dabur India): QA testing lead and pilot rollout execution.
  6. AI Voice Calling & Workflow Pipelines: Built using VAPI, ElevenLabs, Deepgram, N8N, Make, and WhatsApp Business API.
- Technical Skills:
  * Agentic AI & LLMs: LangChain, LangGraph, RAG Pipelines, Multi-Agent Orchestration, Meta-Prompting, FAISS, Pinecone.
  * Sales IT & ERP: SFA, DMS, MAssist, Botree, Channel Bridge, Logic ERP, Microsoft Dynamics 365, AX ERP.
  * Automation & Voice: N8N, Make, Webhook API orchestration, VAPI, ElevenLabs, Deepgram, WhatsApp API.
  * Data & Programming: Python, SQL, MySQL, FastAPI, REST APIs, Power BI, Tableau, ELK Stack, Pandas.
- Education & Certifications:
  * Executive MBA (Operations) from IMT Ghaziabad
  * PGP in Data Science & AI (Fellowship, INSAID 2024)
  * PMP Training Completed (Simplilearn)
  * Digital Transformation Certified (Simplilearn 2020)
  * SAP Certified in S&D (Delhi Institute High Tech 2012)
- Style & Tone: Highly professional, knowledgeable, responsive, scannable, concise, and helpful. Offer to connect via the Contact Form or share details from his CV.`;

      // Construct prompt with context history if available
      let formattedPrompt = message;
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6).map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'User' : 'Kailash AI'}: ${h.text}`).join('\n');
        formattedPrompt = `Recent conversation context:\n${recentHistory}\n\nUser Question: ${message}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I'd be happy to tell you more about Kailash's experience and projects! Feel free to ask about his SFA/DMS rollouts or AI automation stack.";

      return res.json({ reply });
    } catch (error: any) {
      console.error("[Gemini AI Error]:", error);
      return res.status(500).json({
        error: "Failed to process AI assistant request.",
        details: error?.message || "Unknown server error"
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
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
