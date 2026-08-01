"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Paperclip,
  Image as ImageIcon,
  Sparkles,
  Search,
  MessageSquarePlus,
  ShieldAlert,
  ThumbsUp,
  RotateCcw,
  Zap,
  Globe,
  Smile,
  Frown,
  AlertTriangle,
  History,
  X,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { VoiceController } from "./VoiceController";
import { OrderTimelineWidget } from "./OrderTimelineWidget";
import { ProductRecommendationWidget } from "./ProductRecommendationWidget";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  toolCalls?: any[];
  attachmentName?: string;
  attachmentUrl?: string;
}

const SUGGESTED_QUESTIONS = [
  "Mera order kahan hai? (#ORD-8921)",
  "I want to return my shoes (#ORD-7712)",
  "Suggest bluetooth earphones under ₹3000",
  "Where is my refund for #ORD-6540?",
  "What is your 7-day return policy?",
  "Connect me to a live support executive",
];

const TOOL_LABEL_MAP: Record<string, { icon: string; label: string }> = {
  search_orders: { icon: "🔍", label: "Search Orders" },
  track_shipment: { icon: "🚚", label: "Track Shipment" },
  search_products: { icon: "🛍️", label: "Search Products" },
  search_faq: { icon: "📚", label: "Query Knowledge Base" },
  return_eligibility: { icon: "🔄", label: "Return Eligibility Check" },
  refund_status: { icon: "💳", label: "Verify Refund Status" },
  customer_profile_lookup: { icon: "👤", label: "Customer Profile Lookup" },
  create_support_ticket: { icon: "🎫", label: "Create Support Ticket" },
  recommend_products: { icon: "💡", label: "Compare Product Recommendations" },
  human_escalation: { icon: "🎧", label: "Transfer to Live Agent" },
};

export function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      content:
        "Namaste! 🙏 Welcome to **SupportPilot AI**.\n\nI am your intelligent support executive. How can I help you today? You can ask me to track orders, check return eligibility, inquire about refunds, or recommend products in INR (₹).",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState<string>("Neutral");
  const [languageDetected, setLanguageDetected] = useState<string>("English");
  const [isEscalated, setIsEscalated] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<{ name: string; url: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText && !attachment) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content: queryText || (attachment ? `Uploaded attachment: ${attachment.name}` : ""),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attachmentName: attachment?.name,
      attachmentUrl: attachment?.url,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachment(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: "conv-session-101",
          messages: [...messages, userMessage].map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-reply-${Date.now()}`,
            sender: "assistant",
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            toolCalls: data.toolsExecuted,
          },
        ]);
        if (data.sentiment) setSentiment(data.sentiment);
        if (data.languageDetected) setLanguageDetected(data.languageDetected);
        if (data.isEscalated) {
          setIsEscalated(true);
          setTicketCode(data.ticketCode);
          showToast(`Live Executive Ticket #${data.ticketCode} Created`);
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "assistant",
          content: "Sorry, I encountered a temporary connection glitch. Let me process your query right away.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment({
        name: file.name,
        url: URL.createObjectURL(file),
      });
      showToast(`Attached file: ${file.name}`);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950 text-slate-100 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30 shadow-2xl animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar - Conversation History */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } flex-shrink-0 transition-all duration-300 border-r border-slate-800/80 bg-slate-900/60 backdrop-blur-xl hidden md:flex flex-col`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-emerald-400" />
            <span className="font-bold text-sm text-slate-200">Chat History</span>
          </div>
          <button
            onClick={() => {
              setMessages([
                {
                  id: "welcome-1",
                  sender: "assistant",
                  content: "Namaste! 🙏 How can I assist you with your orders or products today?",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ]);
              setIsEscalated(false);
              showToast("New chat session started");
            }}
            aria-label="Start new chat"
            className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Chat
          </button>
        </div>

        {/* History Search */}
        <div className="p-3 border-b border-slate-800/60">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchHistoryQuery}
              onChange={(e) => setSearchHistoryQuery(e.target.value)}
              className="w-full rounded-lg bg-slate-950/80 pl-9 pr-3 py-1.5 text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Recent Chat List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="rounded-xl border border-emerald-500/30 bg-slate-800/80 p-3 shadow-md cursor-pointer">
            <div className="flex justify-between items-start text-xs">
              <span className="font-semibold text-slate-200">Order #ORD-8921 Query</span>
              <span className="text-[10px] text-emerald-400 font-medium">Active</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">Mera order kahan hai? Delhivery tracking...</p>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
              <span className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">Hinglish</span>
              <span className="text-emerald-400 font-medium">Auto Tools (2)</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:bg-slate-800/40 cursor-pointer">
            <div className="flex justify-between items-start text-xs">
              <span className="font-semibold text-slate-300">Earbuds under ₹3000</span>
              <span className="text-[10px] text-slate-400">Yesterday</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">boAt Airdopes 141 vs Realme T100...</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:bg-slate-800/40 cursor-pointer">
            <div className="flex justify-between items-start text-xs">
              <span className="font-semibold text-slate-300">Refund Status ORD-6540</span>
              <span className="text-[10px] text-slate-400">3 days ago</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">UPI refund credited to Google Pay...</p>
          </div>
        </div>
      </div>

      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col h-full bg-slate-950">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                <Bot className="h-5 w-5 text-slate-950" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-slate-100">SupportPilot AI Agent</h3>
                {isEscalated && (
                  <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/30">
                    Live Executive Queue #{ticketCode}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>Auto Tool-Calling Agent</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Globe className="h-3 w-3" />
                  {languageDetected}
                </span>
              </p>
            </div>
          </div>

          {/* AI Metrics Badges */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300">
              {sentiment === "Frustrated" ? (
                <Frown className="h-3.5 w-3.5 text-rose-400" />
              ) : sentiment === "Urgent" ? (
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Smile className="h-3.5 w-3.5 text-emerald-400" />
              )}
              <span className="text-[11px]">Sentiment: <strong className="text-slate-100">{sentiment}</strong></span>
            </div>

            {/* Voice Controller */}
            <VoiceController
              onSpeechResult={(transcript) => handleSend(transcript)}
              lastAssistantResponse={messages[messages.length - 1]?.sender === "assistant" ? messages[messages.length - 1].content : undefined}
            />
          </div>
        </div>

        {/* Human Escalation Alert Banner */}
        {isEscalated && (
          <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-b border-rose-800/50 px-4 py-2.5 flex items-center justify-between text-xs text-rose-200">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-400 animate-pulse" />
              <span>
                <strong>Human Escalation Active:</strong> Ticket <strong>#{ticketCode}</strong> pushed to Senior Executive Queue. Response time: &lt;3 mins.
              </span>
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "assistant" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 mt-1">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className="max-w-[85%] sm:max-w-[75%] space-y-2">
                {/* Visual Reasoning Steps Badge above Assistant Messages */}
                {msg.sender === "assistant" && msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-1 rounded-xl bg-slate-900/90 px-3 py-1.5 border border-slate-800/80 text-[11px] text-slate-300">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">🧠 Reasoning:</span>
                    {msg.toolCalls.map((t: any, i: number) => {
                      const info = TOOL_LABEL_MAP[t.toolName] || { icon: "⚡", label: t.toolName };
                      return (
                        <span key={i} className="inline-flex items-center gap-1 rounded-md bg-slate-950 px-2 py-0.5 border border-slate-800 text-slate-300 font-medium">
                          <span>{info.icon}</span>
                          <span>{info.label}</span>
                        </span>
                      );
                    })}
                    <span className="text-emerald-400 font-bold text-[10px] ml-auto">✅ Done</span>
                  </div>
                )}

                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-br-none shadow-md shadow-emerald-500/10"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md"
                  }`}
                >
                  {/* Text Content */}
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* Attachment Preview */}
                  {msg.attachmentName && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-950/50 p-2 border border-slate-800 text-xs">
                      <Paperclip className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="truncate">{msg.attachmentName}</span>
                    </div>
                  )}

                  {/* Executed Tools Card Widgets */}
                  {msg.toolCalls?.map((t: any, idx: number) => (
                    <div key={idx} className="mt-3">
                      {t.toolName === "track_shipment" && t.result?.timeline && (
                        <OrderTimelineWidget data={t.result} />
                      )}
                      {t.toolName === "recommend_products" && t.result?.recommendations && (
                        <ProductRecommendationWidget items={t.result.recommendations} />
                      )}
                    </div>
                  ))}

                  <div className="mt-1 text-[10px] text-slate-400 text-right opacity-80">
                    {msg.timestamp}
                  </div>
                </div>
              </div>

              {msg.sender === "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mt-1">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing & Reasoning Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-emerald-400">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 text-xs text-slate-400">
                <div className="flex gap-1">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  🧠 Understanding request & selecting internal tools...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions Quick Chips */}
        {messages.length < 5 && (
          <div className="px-4 py-2 bg-slate-950 border-t border-slate-900">
            <p className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-400" />
              Suggested Questions:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400 transition-all hover:scale-105 active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Box */}
        <div className="border-t border-slate-800 bg-slate-900/90 p-3 sm:p-4">
          {attachment && (
            <div className="mb-2 flex items-center justify-between rounded-lg bg-slate-950 px-3 py-1.5 text-xs text-slate-300 border border-slate-800">
              <span className="truncate">📎 Attached: {attachment.name}</span>
              <button
                onClick={() => setAttachment(null)}
                aria-label="Remove attachment"
                className="text-slate-400 hover:text-rose-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach file or screenshot"
              className="rounded-lg p-2.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
              title="Attach File / Screenshot"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything in English, Hindi (मेरा ऑर्डर कहां है?), Hinglish..."
              className="flex-1 rounded-xl bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !attachment)}
              aria-label="Send message"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 hover:brightness-110 disabled:opacity-50 transition-all active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
