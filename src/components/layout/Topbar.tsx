import { Sparkles, Save, PanelRightOpen } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white shadow-sm">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">UniVision</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pipeline Management</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
          <Save size={16} />
          Save Draft
        </button>
        <button className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark transition-all shadow-sm">
          <PanelRightOpen size={16} />
          Launch Pipeline
        </button>
      </div>
    </header>
  );
}
