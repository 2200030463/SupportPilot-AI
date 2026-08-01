import Link from "next/link";
import { Bot, Heart, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <Bot className="h-5 w-5" />
              </div>
              <span className="font-bold text-slate-100 text-lg">SupportPilot AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Powered Multilingual Customer Support Agent built specifically for Indian E-Commerce and SaaS Businesses.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
              <Shield className="h-3 w-3" />
              Codex India Hackathon 2026
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">Capabilities</h4>
            <ul className="space-y-2 text-xs">
              <li>Order Tracking & Courier RAG</li>
              <li>Multilingual Voice & Text AI</li>
              <li>Return Eligibility Automation</li>
              <li>UPI & Card Refund Verification</li>
              <li>Product Recommendation Engine</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">Indian Logistics</h4>
            <ul className="space-y-2 text-xs">
              <li>Delhivery AWB Tracking</li>
              <li>BlueDart Air Express</li>
              <li>Xpressbees & Ecom Express</li>
              <li>Razorpay & PhonePe UPI Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">Admin Portal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/admin" className="hover:text-emerald-400">CSAT Analytics Dashboard</Link></li>
              <li><Link href="/admin/tickets" className="hover:text-emerald-400">Live Human Escalation Queue</Link></li>
              <li><Link href="/admin/orders" className="hover:text-emerald-400">Orders & Deliveries Manager</Link></li>
              <li><Link href="/admin/products" className="hover:text-emerald-400">Products & Catalog Manager</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 SupportPilot AI. Built for Bharat Businesses.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-[11px] text-emerald-400 font-semibold">
              ⚡ Powered by OpenAI & Next.js 15
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
