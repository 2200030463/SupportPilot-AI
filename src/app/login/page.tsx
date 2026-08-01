"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bot, ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";

function LoginForm() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("admin@supportpilot.ai");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const target = callbackUrl.startsWith("/admin") ? callbackUrl : "/admin";

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.replace(target);
    }
  }, [status, target, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        router.refresh();
        router.replace(target);
      } else {
        router.refresh();
        router.replace(target);
      }
    } catch (err) {
      router.refresh();
      router.replace(target);
    } finally {
      setLoading(false);
    }
  };

  if (status === "authenticated") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-950 text-slate-100 p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
          <p className="text-xs text-slate-400 font-medium">Session Authenticated. Opening Admin Desk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 glass-card rounded-3xl p-8 border border-slate-800 shadow-2xl">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-violet-600 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
                <Bot className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-100">
              Admin Desk Login
            </h2>
            <p className="text-xs text-slate-400">
              SupportPilot AI Customer Experience Management Portal
            </p>
          </div>

          {/* Demo Fast Fill Pill */}
          <div className="rounded-xl bg-emerald-500/10 p-3 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Demo Admin Credentials Pre-filled</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail("admin@supportpilot.ai");
                setPassword("admin123");
              }}
              className="font-bold underline text-emerald-400 hover:text-emerald-300"
            >
              Auto Fill
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl bg-slate-950/80 pl-10 pr-4 py-2.5 text-xs text-slate-100 border border-slate-800 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl bg-slate-950/80 pl-10 pr-4 py-2.5 text-xs text-slate-100 border border-slate-800 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all"
            >
              <ShieldCheck className="h-4 w-4" />
              {loading ? "Authenticating..." : "Enter Admin Desk"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-500">
            SupportPilot AI • ChatGPT Codex India Hackathon 2026
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-950 text-slate-100 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span>Loading Login Desk...</span>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
