export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse p-2">
      <div className="h-8 w-64 bg-slate-900 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
        <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
        <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
        <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
      </div>
      <div className="h-64 bg-slate-900/80 rounded-2xl border border-slate-800" />
    </div>
  );
}
