"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSmartBack } from "@/hooks/useSmartBack";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Home, ArrowLeft, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const handleSmartBack = useSmartBack();

  const getBreadcrumb = () => {
    if (pathname === "/admin") return "Overview Analytics";
    if (pathname === "/admin/tickets") return "Escalation Queue";
    if (pathname === "/admin/orders") return "Orders & Logistics";
    if (pathname === "/admin/products") return "Products Catalog";
    if (pathname === "/admin/faqs") return "FAQ Knowledge RAG";
    return "Management";
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Admin Header Bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-3.5 backdrop-blur-xl">
          {/* Left Breadcrumbs & Smart Back */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSmartBack}
              aria-label="Go back"
              className="flex items-center justify-center rounded-xl bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 border border-slate-800 transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-400" />
            </button>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <Link href="/admin" className="hover:text-emerald-400 transition-colors">
                Admin
              </Link>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <span className="font-semibold text-slate-200">{getBreadcrumb()}</span>
            </div>
          </div>

          {/* Right Actions: Home & Logout */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 border border-slate-800 hover:bg-slate-800 transition-colors"
            >
              <Home className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-rose-400 border border-rose-500/20 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
