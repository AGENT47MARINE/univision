import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { BlockDefinition } from "../../types/block";
import { BlockPaletteItem } from "./BlockPaletteItem";

interface Props {
  category: string;
  blocks: BlockDefinition[];
}

export function BlockCategorySection({ category, blocks }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      <button
        className="flex w-full items-center justify-between px-3 py-3 text-left"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="text-sm font-semibold text-white">{category}</span>
        <ChevronDown size={16} className={open ? "rotate-0" : "-rotate-90"} />
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
