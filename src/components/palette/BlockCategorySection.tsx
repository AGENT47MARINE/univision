import { ChevronDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import type { BlockDefinition } from "../../types/block";
import { BlockPaletteItem } from "./BlockPaletteItem";

interface Props {
  category: string;
  blocks: BlockDefinition[];
}

export function BlockCategorySection({ category, blocks }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-md border border-slate-100 bg-slate-50/30">
      <button
        className="flex w-full items-center justify-between px-3 py-2.5 text-left group"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 group-hover:text-accent transition-colors">{category}</span>
        <ChevronDown size={14} className={clsx("text-slate-400 transition-transform duration-200", open ? "rotate-0" : "-rotate-90")} />
      </button>
      {open && (
        <div className="space-y-2 px-3 pb-3">
          {blocks.map((block) => (
            <BlockPaletteItem key={block.type} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}
