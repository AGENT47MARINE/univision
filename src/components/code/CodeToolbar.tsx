export function CodeToolbar() {
  return (
    <div className="flex gap-2">
      <button className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-sm transition-all focus:ring-2 focus:ring-accent/10 outline-none">Copy</button>
      <button className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-sm transition-all focus:ring-2 focus:ring-accent/10 outline-none">Download</button>
    </div>
  );
}
