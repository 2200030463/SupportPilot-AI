"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Bot,
  Clock,
  ThumbsUp,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.analytics);
      });
  }, []);

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400 text-sm">
        Loading SupportPilot AI Admin Analytics...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-100">Executive CX Dashboard</h1>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              Live Agent Operational Data
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time SupportPilot AI Metrics across Bharat E-Commerce Logistics & Conversational RAG
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">CSAT Satisfaction</span>
            <ThumbsUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">{data.csatScore}</span>
            <span className="text-xs text-slate-400">/ 5.0 ({data.csatPercentage}%)</span>
          </div>
          <p className="text-[11px] text-emerald-400/90 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" /> +2.4% increase this week
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">AI Resolution Rate</span>
            <Bot className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cyan-400">{data.aiResolutionRate}%</span>
            <span className="text-xs text-slate-400">Autonomous</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Human Escalation Rate: <strong className="text-slate-200">{data.humanEscalationRate}%</strong>
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Avg Agent Response</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400">{data.avgResponseTimeSec}s</span>
            <span className="text-xs text-slate-400">Latency</span>
          </div>
          <p className="text-[11px] text-slate-400">Real-time tool execution</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Total Query Volume</span>
            <MessageSquare className="h-4 w-4 text-violet-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-violet-400">
              {data.totalConversations.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Est. Cost Saved: <strong className="text-emerald-400">₹{data.costSavingsINR.toLocaleString("en-IN")}</strong>
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Query & Resolution Volume */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-100">Weekly Query Volume & AI Resolutions</h3>
            <span className="text-xs text-slate-400">Last 7 Days</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weeklyVolume}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }} />
                <Bar dataKey="volume" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Total Volume" />
                <Bar dataKey="resolvedByAI" fill="#10b981" radius={[4, 4, 0, 0]} name="AI Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Breakdown Pie Chart */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-100">Customer Sentiment Distribution</h3>
          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.sentimentBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={4}
                >
                  {data.sentimentBreakdown.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {data.sentimentBreakdown.map((item: any) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400">{item.name}: <strong className="text-slate-200">{item.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multilingual & Tool Usage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Breakdown */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-100">Multilingual Distribution (Bharat)</h3>
          <div className="space-y-3">
            {data.languageBreakdown.map((lang: any) => (
              <div key={lang.language} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{lang.language}</span>
                  <span className="text-emerald-400">{lang.percentage}% ({lang.count.toLocaleString("en-IN")})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${lang.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Autonomous Tools Execution */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-100">Autonomous Tool Execution Statistics</h3>
          <div className="space-y-3">
            {data.toolUsageStats.map((tool: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                <span className="font-medium text-slate-200">{tool.name}</span>
                <span className="font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                  {tool.count.toLocaleString("en-IN")} Executions
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
