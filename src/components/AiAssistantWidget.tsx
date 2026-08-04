import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, User, RefreshCw, MessageSquare, ArrowUpRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({ isOpen, onClose, onOpenContact }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Hello! I'm KALI X AI, Kailash Goswami's artificial intelligence assistant. I can answer questions about his Sales IT & AI Automation projects, SFA & DMS rollouts, AI voice agents, or availability. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Tell me about your Sales Force Automation (SFA) project.',
    'Explain your DMS implementation strategy.',
    'What is your ERP Integration Strategy?',
    'Tell me about the AI Chatbot project architecture.',
    'Explain your AI Voice Agent implementation.',
    'What is your Power BI Analytics strategy?',
    'Explain your AI Forecasting & ML models.',
    'What is Kailash\'s Digital Transformation methodology?',
    'How do you manage projects and UAT?',
    'Describe your leadership & vendor management approach.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages,
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || "I'm happy to help you connect with Kailash directly!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI Assistant Fetch Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "Kailash Goswami is a Project Lead – Sales IT and AI Automation Specialist with 14+ years of experience in SFA, DMS, Python, LangChain, and Agentic AI. Feel free to use the contact form to message him directly!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] max-h-[600px] flex flex-col bg-white rounded-[28px] border border-[#ECECEC] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#111111] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C7FF3F] text-[#111111] flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold flex items-center gap-1.5">
                KALI X AI
                <span className="w-2 h-2 rounded-full bg-[#9CFF00] animate-pulse" />
              </h4>
              <p className="text-[10px] text-[#999999]">Official AI Career &amp; Strategy Representative</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close AI chat"
            className="p-2 rounded-full text-[#999999] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[380px] bg-[#FAFAFA]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user' ? 'bg-[#111111] text-white' : 'bg-[#C7FF3F] text-[#111111]'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#111111] text-white rounded-tr-none'
                    : 'bg-white border border-[#ECECEC] text-[#111111] shadow-xs rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <span className={`text-[9px] block mt-1 ${m.sender === 'user' ? 'text-[#999999]' : 'text-[#777777]'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#777777] bg-white p-3 rounded-2xl border border-[#ECECEC] w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#9CFF00]" />
              <span>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-[#ECECEC] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 rounded-full bg-[#F6F7FB] border border-[#ECECEC] text-[10px] font-semibold text-[#555555] hover:border-[#111111] hover:text-[#111111] whitespace-nowrap shrink-0 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#ECECEC] flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask anything about Kailash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-xs text-[#111111] focus:outline-none focus:border-[#C7FF3F]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-full bg-[#111111] text-white hover:bg-[#222222] disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4 text-[#C7FF3F]" />
          </button>
        </div>

        {/* Footer Link */}
        <div className="py-2 bg-[#FAFAFA] border-t border-[#ECECEC] text-center">
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="text-[11px] font-bold text-[#111111] hover:text-[#9CFF00] inline-flex items-center gap-1"
          >
            Schedule a Direct Discovery Call <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </AnimatePresence>
  );
};
