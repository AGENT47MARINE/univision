import type { DragEvent } from "react";
import type { BlockDefinition } from "../../types/block";

interface Props {
  block: BlockDefinition;
}

export function BlockPaletteItem({ block }: Props) {
  function onDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("application/univision-block", block.type);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <div
      className="cursor-grab rounded-lg border border-slate-200 bg-white p-4 active:cursor-grabbing hover:border-accent hover:shadow-md transition-all group shadow-sm"
      draggable
      onDragStart={onDragStart}
    >
      <p className="text-[11px] font-bold text-slate-800 group-hover:text-accent transition-colors">{block.label}</p>
      <p className="mt-1 text-[10px] leading-relaxed text-slate-500">{block.description}</p>
    </div>
  );
}
