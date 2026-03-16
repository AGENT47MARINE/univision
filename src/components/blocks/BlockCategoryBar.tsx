import { CATEGORY_COLORS } from "../../constants/categories";
import type { BlockCategory } from "../../types/block";

export function BlockCategoryBar({ category }: { category: BlockCategory }) {
  return <div className="h-1 rounded-none" style={{ backgroundColor: CATEGORY_COLORS[category] }} />;
}
