import { Bot } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-violet-500/20 border border-slate-800 shadow-xl">
          <Bot className="h-8 w-8 text-emerald-400 animate-pulse" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-200">Loading SupportPilot AI...</p>
          <p className="text-xs text-slate-400">Initializing route & data models</p>
        </div>
        <div className="flex gap-1.5 pt-2">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
