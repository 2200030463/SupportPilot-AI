"use client";

import Link from "next/link";
import { useState } from "react";
import { Bot, MessageSquare, ShieldCheck, Sparkles, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-violet-600 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Bot className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-100 tracking-tight">SupportPilot</span>
              <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Bharat E-Commerce Support</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">
            Capabilities
          </Link>
          <Link href="/#workflows" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">
            Agent Workflows
          </Link>
          <Link href="/#architecture" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">
            Architecture
          </Link>
          <Link href="/admin" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
            <ShieldCheck className="h-4 w-4" />
            Admin Desk
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800/60 border border-slate-800 transition-colors"
          >
            Admin Login
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/20 hover:brightness-110 transition-all duration-200"
          >
            <MessageSquare className="h-4 w-4" />
            Launch Customer AI
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-4">
          <Link href="/chat" className="flex items-center justify-center gap-2 w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950">
            Launch Customer AI Chat
          </Link>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/#features" className="text-slate-300 hover:text-emerald-400" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="/#workflows" className="text-slate-300 hover:text-emerald-400" onClick={() => setMobileMenuOpen(false)}>Workflows</Link>
            <Link href="/admin" className="text-cyan-400 font-medium" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
            <Link href="/login" className="text-slate-300" onClick={() => setMobileMenuOpen(false)}>Admin Login</Link>
          </div>
        </div>
      )}
    </header>
  );
}
