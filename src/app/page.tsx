import Link from "next/link";
import { Footer } from "@/components/Footer";
import {
  Bot,
  Zap,
  Globe,
  Truck,
  ShieldCheck,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Headphones,
  CheckCircle2,
  Cpu,
  Layers,
  BarChart,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 gradient-glow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Track Pill & Live Demo Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ChatGPT Codex India Hackathon 2026 • AI Agents for Bharat&apos;s Businesses</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-500/10 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>Live Demo Ready</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-5xl mx-auto leading-[1.1]">
            AI-Powered Multilingual Customer Support Agent for{" "}
            <span className="text-gradient-emerald">Indian Businesses</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
            Automate order tracking with Delhivery & BlueDart, process 7-day return eligibility, resolve UPI refunds, and recommend products in INR (₹) across 8+ Indian languages.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/chat"
              className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all duration-200"
            >
              <Bot className="h-5 w-5" />
              Try Customer AI Agent Live
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white transition-all"
            >
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              View Admin CSAT Desk
            </Link>
          </div>

          {/* Stat Badges */}
          <div id="features" className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left scroll-mt-20">
            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <span className="block text-2xl font-bold text-emerald-400">94.2%</span>
              <span className="text-xs text-slate-400">AI Instant Resolution</span>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <span className="block text-2xl font-bold text-cyan-400">8+ Languages</span>
              <span className="text-xs text-slate-400">Hindi, Hinglish, Tamil, etc.</span>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <span className="block text-2xl font-bold text-amber-400">&lt;1.2 Sec</span>
              <span className="text-xs text-slate-400">Avg Agent Response</span>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <span className="block text-2xl font-bold text-violet-400">4.8 / 5.0</span>
              <span className="text-xs text-slate-400">Customer CSAT Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="workflows" className="py-20 border-t border-slate-800/80 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">10 Automated Internal Tools</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-100">
              Behaves like a Real Indian Support Employee
            </h3>
            <p className="mt-4 text-slate-400 text-sm">
              SupportPilot AI automatically detects customer intent, selects internal tools, queries databases, and responds naturally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
              <div className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                <Truck className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-200">Delhivery & BlueDart RAG</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Tracks live logistics status, AWB numbers, facility checkpoints, and estimated delivery dates across India.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
              <div className="h-11 w-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/20">
                <RotateCcw className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-200">7-Day Return & Refund Check</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Verifies return policy eligibility, generates doorstep pickup orders, and tracks instant UPI refund status.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
              <div className="h-11 w-11 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 border border-violet-500/20">
                <Globe className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-200">Multilingual & Hinglish NLP</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Seamlessly understands &quot;Mera order kab aayega?&quot;, Hindi, Tamil, Telugu, and English with auto sentiment classification.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
              <div className="h-11 w-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-200">INR (₹) Product Recommendations</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Recommends top 3 products tailored to price budget in Rupees, specifications, and ratings with reasoning.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
              <div className="h-11 w-11 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4 border border-rose-500/20">
                <Headphones className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-200">Instant Human Escalation</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Detects frustrated customer sentiment and seamlessly hands off tickets to senior live agent desks.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
              <div className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                <BarChart className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-200">Admin CSAT & Analytics</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Real-time dashboard displaying CSAT percentages, sentiment breakdown charts, and ticket queues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Showcase */}
      <section id="architecture" className="py-20 border-t border-slate-800/80 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Technical Architecture</h2>
            <h3 className="text-3xl font-bold text-slate-100">Enterprise AI Agent Stack</h3>
          </div>

          <div className="glass-card rounded-3xl p-8 border border-slate-800 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <Cpu className="h-7 w-7 text-emerald-400 mx-auto mb-2" />
                <span className="font-bold text-sm block text-slate-200">Next.js 15 App Router</span>
                <span className="text-[11px] text-slate-400">Server Actions & API Routes</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <Layers className="h-7 w-7 text-cyan-400 mx-auto mb-2" />
                <span className="font-bold text-sm block text-slate-200">OpenAI GPT-4o Agent</span>
                <span className="text-[11px] text-slate-400">Multi-Turn Tool Calling Loop</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <Truck className="h-7 w-7 text-amber-400 mx-auto mb-2" />
                <span className="font-bold text-sm block text-slate-200">Tool Execution Layer</span>
                <span className="text-[11px] text-slate-400">10 Autonomous Agent Tools</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <Users className="h-7 w-7 text-violet-400 mx-auto mb-2" />
                <span className="font-bold text-sm block text-slate-200">MongoDB Mongoose</span>
                <span className="text-[11px] text-slate-400">Conversations & Collections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 border-t border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
            Ready to experience the future of <span className="text-gradient-emerald">Bharat CX</span>?
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
            Test the live customer AI chat agent now with sample orders like #ORD-8921 or asking for product recommendations under ₹3000.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/chat"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-sm font-bold text-slate-950 shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all"
            >
              Launch SupportPilot AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
