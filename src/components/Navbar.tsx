"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useSmartBack } from "@/hooks/useSmartBack";
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  UserCheck,
  ArrowLeft,
  LogOut,
  Bot,
  Menu,
  X,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleSmartBack = useSmartBack();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = useSession()?.data;
  const isAuthenticated = !!session;

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
    await signOut({ redirect: false });
    router.refresh();
    router.replace("/");
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/chat", label: "Customer Chat", icon: MessageSquare },
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: isAuthenticated ? "/admin" : "/login", label: isAuthenticated ? "Admin Desk" : "Admin Login", icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo & Smart Back Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSmartBack}
            aria-label="Go back to previous page"
            className="flex items-center justify-center rounded-xl bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 border border-slate-800 transition-colors"
            title="Go Back"
          >
            <ArrowLeft className="h-4 w-4 text-cyan-400" />
          </button>

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
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-900 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/10"
                    : "text-slate-300 hover:bg-slate-900/60 hover:text-slate-100"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: User Profile / Logout */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-rose-400 border border-rose-500/20 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900 border border-slate-800 transition-colors"
            >
              Admin Portal
            </Link>
          )}

          <Link
            href="/chat"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:brightness-110 transition-all duration-200"
          >
            <MessageSquare className="h-4 w-4" />
            Launch AI
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile navigation menu"
          className="md:hidden rounded-xl p-2 text-slate-400 hover:bg-slate-800 border border-slate-800"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-xl p-3 border ${
                    isActive
                      ? "bg-slate-900 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-950 text-slate-300 border-slate-800"
                  }`}
                >
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-900">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleSmartBack();
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-slate-300 border border-slate-800"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-400" />
              Back
            </button>

            {isAuthenticated && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-rose-500/10 py-2.5 text-xs font-semibold text-rose-400 border border-rose-500/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
