"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  LifeBuoy,
  ShoppingBag,
  Package,
  HelpCircle,
  Bot,
  LogOut,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [counts, setCounts] = useState({
    tickets: 0,
    orders: 0,
    products: 0,
    faqs: 0,
  });

  useEffect(() => {
    async function loadCounts() {
      try {
        const [ticketsRes, ordersRes, productsRes, faqsRes] = await Promise.all([
          fetch("/api/tickets").then((r) => r.json()).catch(() => ({})),
          fetch("/api/orders").then((r) => r.json()).catch(() => ({})),
          fetch("/api/products").then((r) => r.json()).catch(() => ({})),
          fetch("/api/faqs").then((r) => r.json()).catch(() => ({})),
        ]);

        setCounts({
          tickets: ticketsRes.tickets?.length || 0,
          orders: ordersRes.orders?.length || 0,
          products: productsRes.products?.length || 0,
          faqs: faqsRes.faqs?.length || 0,
        });
      } catch (err) {
        console.error("Error loading sidebar counts:", err);
      }
    }

    loadCounts();
  }, [pathname]);

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
    await signOut({ redirect: false });
    router.replace("/");
  };

  const navItems = [
    { href: "/admin", label: "Analytics Overview", icon: LayoutDashboard },
    { href: "/admin/tickets", label: "Escalation Queue", icon: LifeBuoy, badge: counts.tickets },
    { href: "/admin/orders", label: "Orders & Deliveries", icon: Package, badge: counts.orders },
    { href: "/admin/products", label: "Products Catalog", icon: ShoppingBag, badge: counts.products },
    { href: "/admin/faqs", label: "FAQ RAG Knowledge", icon: HelpCircle, badge: counts.faqs },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/90 flex flex-col h-screen sticky top-0">
      {/* Admin Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-violet-600 p-0.5 shadow-md shadow-emerald-500/20">
          <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
            <Bot className="h-5 w-5 text-emerald-400" />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-sm text-slate-100">SupportPilot Admin</h2>
          <p className="text-[10px] text-slate-400 font-medium">Enterprise Portal</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
          Operations
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const showBadge = item.badge !== undefined && item.badge !== null;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {showBadge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin User Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
              AD
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Rohit Verma</p>
              <p className="text-[10px] text-slate-400">Head of CX</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
            title="Logout"
            aria-label="Logout from admin panel"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
