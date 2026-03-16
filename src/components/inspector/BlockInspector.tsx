import { getBlockDefinition } from "../../lib/blockRegistry";
import { useGraphStore } from "../../store/graphStore";
import { ConfigFieldRenderer } from "./ConfigFieldRenderer";

export function BlockInspector() {
  const selectedBlockId = useGraphStore((state) => state.selectedBlockId);
  const blocks = useGraphStore((state) => state.blocks);
  const updateBlockConfig = useGraphStore((state) => state.updateBlockConfig);

  const block = blocks.find((item) => item.id === selectedBlockId);
  const definition = block ? getBlockDefinition(block.type) : undefined;

  if (!block || !definition) {
    return (
      <div className="p-5">
        <p className="text-sm text-slate-400">Select a block on the canvas to edit its configuration.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-accent" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">{block.category}</p>
        </div>
        <h2 className="mt-3 text-lg font-bold tracking-tight text-zinc-950">{block.label}</h2>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">{definition.description}</p>
      </div>
      <div className="space-y-4">
        {definition.configSchema.length === 0 && <p className="text-sm text-slate-400">This block has no configuration.</p>}
        {definition.configSchema.map((field) => (
          <ConfigFieldRenderer
            key={field.key}
            field={field}
            onChange={(value) => updateBlockConfig(block.id, field.key, value)}
            value={block.config[field.key]}
          />
        ))}
      </div>
    </div>
  );
}
