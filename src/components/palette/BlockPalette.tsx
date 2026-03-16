import { Search } from "lucide-react";
import { blockRegistry } from "../../lib/blockRegistry";
import { useUiStore } from "../../store/uiStore";
import { BlockCategorySection } from "./BlockCategorySection";

export function BlockPalette() {
  const query = useUiStore((state) => state.paletteQuery);
  const setQuery = useUiStore((state) => state.setPaletteQuery);

  const grouped = blockRegistry.reduce<Record<string, typeof blockRegistry>>((acc, definition) => {
    if (query && !definition.label.toLowerCase().includes(query.toLowerCase())) {
      return acc;
    }
    acc[definition.category] ??= [];
    acc[definition.category].push(definition);
    return acc;
  }, {});

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg border-2 border-accent bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-accent/20 transition-all">
        <Search size={16} className="text-slate-400" />
        <input
          className="w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search blocks"
          value={query}
        />
      </div>
      <div className="space-y-3 overflow-auto">
        {Object.entries(grouped).map(([category, blocks]) => (
          <BlockCategorySection key={category} category={category} blocks={blocks} />
        ))}
      </div>
    </section>
  );
}
