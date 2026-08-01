"use client";

import { useState, useEffect } from "react";
import { HelpCircle, Search, ThumbsUp, Tag, Globe, CheckCircle2 } from "lucide-react";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFaqs(data.faqs);
      });
  }, []);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Multilingual FAQ Knowledge RAG Base</h1>
          <p className="text-xs text-slate-400 mt-1">
            50+ curated FAQs across English, Hindi, Hinglish, Tamil, and Telugu used by SupportPilot AI
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search FAQs or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-900 pl-10 pr-4 py-2 text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-100">{faq.question}</span>
                <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-slate-800">
                  {faq.language?.toUpperCase() || "EN"}
                </span>
              </div>
              <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                {faq.category}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">{faq.answer}</p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Tag className="h-3 w-3 text-slate-500" />
                <span>Tags: {faq.tags?.join(", ")}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <ThumbsUp className="h-3 w-3" />
                <span>{faq.helpfulCount} Helpful Votes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
