import { STARTER_TEMPLATES } from "../../constants/templates";
import { useGraphStore } from "../../store/graphStore";

export function TemplateLibrary() {
  const setGraph = useGraphStore((state) => state.setGraph);

  return (
    <section className="rounded-lg border-2 border-accent bg-white p-4 shadow-md">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">Starter Blueprints</h2>
      <div className="mt-3 space-y-2">
        {STARTER_TEMPLATES.map((template) => (
          <button
            key={template.project.name}
            className="w-full rounded-lg border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-accent/40 hover:bg-white hover:shadow-md group shadow-sm"
            onClick={() => setGraph(template)}
            type="button"
          >
            <p className="text-[11px] font-bold text-slate-800 group-hover:text-accent transition-colors">{template.project.name}</p>
            <p className="mt-1 text-[10px] text-slate-500">Run blueprint blueprint</p>
          </button>
        ))}
      </div>
    </section>
  );
}
