"use client";

import { useState, useEffect } from "react";
import {
  LifeBuoy,
  Search,
  ShieldAlert,
  Clock,
  User,
  CheckCircle2,
  Send,
  MessageSquare,
  AlertTriangle,
  Smile,
  Frown,
} from "lucide-react";

export default function TicketsQueuePage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTickets = () => {
    fetch("/api/tickets")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTickets(data.tickets);
          if (data.tickets.length > 0 && !selectedTicket) {
            setSelectedTicket(data.tickets[0]);
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return;

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketCode: selectedTicket.ticketCode,
          responseMessage: replyMessage,
          newStatus: "Resolved",
          assignedAgent: "Rohit Verma (Head of CX)",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReplyMessage("");
        fetchTickets();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    const matchesSearch =
      t.ticketCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-100">Live Escalation Desk</h1>
            <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-400 border border-rose-500/20 flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              {tickets.filter((t) => t.status === "Escalated").length} Escalated Priority
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              Showing {filteredTickets.length} of {tickets.length} tickets
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time human agent resolution queue for customer tickets handed off by SupportPilot AI
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {["All", "Escalated", "Open", "Resolved"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === st
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Ticket List + Reply Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket List Column */}
        <div className="lg:col-span-5 space-y-3 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search ticket code, customer, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-900 pl-9 pr-3 py-2 text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {filteredTickets.map((t) => (
            <div
              key={t.ticketCode}
              onClick={() => setSelectedTicket(t)}
              className={`rounded-2xl p-4 border transition-all cursor-pointer ${
                selectedTicket?.ticketCode === t.ticketCode
                  ? "border-emerald-500 bg-slate-900 shadow-lg shadow-emerald-500/10"
                  : "border-slate-800 bg-slate-950/60 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-emerald-400">{t.ticketCode}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      t.priority === "Urgent"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : t.priority === "High"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                    t.status === "Escalated"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : t.status === "Resolved"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <h4 className="font-semibold text-xs text-slate-200 mt-2 line-clamp-1">{t.subject}</h4>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                <span>👤 {t.customerName}</span>
                <span>{t.sentiment}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Ticket Conversation & Resolution Drawer */}
        <div className="lg:col-span-7">
          {selectedTicket ? (
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5">
              {/* Ticket Details Header */}
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-100">{selectedTicket.subject}</h3>
                    <span className="text-xs text-emerald-400 font-mono">#{selectedTicket.ticketCode}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Customer: <strong className="text-slate-200">{selectedTicket.customerName}</strong> ({selectedTicket.customerPhone})</span>
                    <span>•</span>
                    <span>Category: <strong className="text-cyan-400">{selectedTicket.category}</strong></span>
                  </div>
                </div>
              </div>

              {/* Conversation Summary */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">AI Conversation Context Summary</span>
                <p className="text-slate-300 leading-relaxed">{selectedTicket.conversationSummary}</p>
              </div>

              {/* Response Messages Thread */}
              <div className="space-y-3 max-h-64 overflow-y-auto p-2">
                {selectedTicket.responses?.map((resp: any, idx: number) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-3.5 text-xs space-y-1 ${
                      resp.sender === "customer"
                        ? "bg-slate-950 border border-slate-800 text-slate-200"
                        : "bg-emerald-950/40 border border-emerald-800/40 text-emerald-200"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span className="font-bold text-slate-300">{resp.senderName} ({resp.sender.toUpperCase()})</span>
                      <span>{resp.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{resp.message}</p>
                  </div>
                ))}
              </div>

              {/* Agent Reply Box */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Send Response as Senior Executive (Resolves Ticket)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type official reply to customer..."
                    className="flex-1 rounded-xl bg-slate-950 px-4 py-2.5 text-xs text-slate-100 border border-slate-800 focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSendReply}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    Resolve Ticket
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-slate-400 text-xs glass-card rounded-3xl border border-slate-800">
              Select a ticket to view full context and issue resolution drawer
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
