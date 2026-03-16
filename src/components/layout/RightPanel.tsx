import clsx from "clsx";
import { BlockInspector } from "../inspector/BlockInspector";
import { CodePanel } from "../code/CodePanel";
import { useUiStore } from "../../store/uiStore";

export function RightPanel() {
  const tab = useUiStore((state) => state.rightPanelTab);
  const setTab = useUiStore((state) => state.setRightPanelTab);

  return (
    <aside className="flex h-full flex-col rounded-lg border-2 border-accent bg-white shadow-md overflow-hidden">
      <div className="flex bg-slate-50 p-1 border-b border-slate-200">
        {[
          { id: "inspector", label: "Inspector" },
          { id: "code", label: "Code" },
        ].map((item) => (
          <button
            key={item.id}
            className={clsx(
              "flex-1 py-1 px-3 text-[10px] font-bold tracking-[0.2em] rounded transition-all",
              tab === item.id
                ? "bg-white text-accent shadow-sm"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            )}
            onClick={() => setTab(item.id as "inspector" | "code")}
            type="button"
          >
            {item.label.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {tab === "inspector" ? <BlockInspector /> : <CodePanel />}
      </div>
    </aside>
  );
}
