import { BlockPalette } from "../palette/BlockPalette";
import { TemplateLibrary } from "../palette/TemplateLibrary";

export function LeftSidebar() {
  return (
    <aside className="flex h-full flex-col gap-4 overflow-hidden">
      <BlockPalette />
      <TemplateLibrary />
    </aside>
  );
}
