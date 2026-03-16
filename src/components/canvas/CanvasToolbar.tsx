import { KEYBOARD_SHORTCUTS } from "../../constants/keyboardShortcuts";

export function CanvasToolbar() {
  return (
    <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-4 rounded-lg bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-slate-600 uppercase shadow-md">
      {KEYBOARD_SHORTCUTS.slice(0, 3).map((shortcut) => (
        <span key={shortcut} className="border-r border-slate-200 pr-4 last:border-0">{shortcut}</span>
      ))}
    </div>
  );
}
