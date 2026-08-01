"use client";

import Link from "next/link";
import { useSmartBack } from "@/hooks/useSmartBack";
import { Bot, Home, ArrowLeft, LayoutDashboard, ShieldAlert } from "lucide-react";

export default function NotFound() {
  const handleSmartBack = useSmartBack();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-4 selection:bg-emerald-500 selection:text-slate-950">
      <div className="text-center space-y-6 max-w-lg glass-card rounded-3xl p-8 border border-slate-800 shadow-2xl">
        {/* Visual Illustration */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-violet-500/20 border border-slate-800 shadow-xl">
          <Bot className="h-12 w-12 text-emerald-400 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
            Route Not Found
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or support endpoint you requested does not exist or has been relocated.
          </p>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleSmartBack}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-cyan-400" />
            Go Back
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:brightness-110 transition-all"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>

          <Link
            href="/admin"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LayoutDashboard className="h-4 w-4 text-violet-400" />
            Dashboard
          </Link>
        </div>

        <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-900">
          SupportPilot AI • Bharat E-Commerce Support Desk
        </div>
      </div>
    </div>
  );
}
