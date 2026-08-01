import Link from "next/link";
import { Bot, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Bot className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">404 - Page Not Found</h1>
        <p className="text-sm text-slate-400">
          The support page or resource you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to SupportPilot AI Home
        </Link>
      </div>
    </div>
  );
}
