import { WandSparkles } from "lucide-react";
import { getCurrentGraph } from "../../store/graphStore";
import { useCodeStore } from "../../store/codeStore";
import { validateGraph } from "../../lib/graphValidator";
import { mockGenerateCode } from "../../lib/mockCodeGenerator";

export function GenerateCodeButton() {
  const setLoading = useCodeStore((state) => state.setLoading);
  const setCode = useCodeStore((state) => state.setCode);
  const setIssues = useCodeStore((state) => state.setIssues);
  const status = useCodeStore((state) => state.status);

  async function onGenerate() {
    const graph = getCurrentGraph();
    const issues = validateGraph(graph.blocks, graph.connections);

    if (issues.length > 0) {
      setIssues(issues);
      return;
    }

    setLoading();
    const code = await mockGenerateCode(graph);
    setCode(code);
  }

  return (
    <button
      className="w-full rounded-2xl border border-accent/30 bg-accent/15 px-4 py-3 text-sm font-medium text-accent"
      onClick={onGenerate}
      type="button"
    >
      <WandSparkles size={16} className="mr-2 inline-block" />
      {status === "loading" ? "Compiling..." : "Generate Mock Code"}
    </button>
  );
}
