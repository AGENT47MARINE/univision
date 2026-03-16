import type { NodeProps } from "reactflow";
import { getBlockDefinition } from "../../lib/blockRegistry";
import type { GraphBlock } from "../../types/block";
import { BlockCategoryBar } from "./BlockCategoryBar";
import { BlockPort } from "./BlockPort";
import { BlockStatusBadge } from "./BlockStatusBadge";

export function BlockNode({ data }: NodeProps<GraphBlock>) {
  const definition = getBlockDefinition(data.type);

  if (!definition) {
    return null;
  }

  return (
    <div className="w-64 rounded-md border border-slate-200 bg-white p-0 transition-all hover:shadow-card group overflow-hidden shadow-sm">
      <div className="h-1 bg-accent" />
      <div className="p-4">
        <BlockCategoryBar category={data.category} />
        <div className="mt-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-slate-900">{data.label}</p>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-500">{definition.description}</p>
          </div>
          <BlockStatusBadge status={data.status} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {definition.inputs.map((port) => (
              <BlockPort key={port.id} port={port} />
            ))}
          </div>
          <div className="space-y-2">
            {definition.outputs.map((port) => (
              <div key={port.id} className="flex justify-end">
                <BlockPort port={port} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
