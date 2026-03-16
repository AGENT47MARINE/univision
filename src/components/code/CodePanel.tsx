import Editor from "@monaco-editor/react";
import { CodeToolbar } from "./CodeToolbar";
import { GenerateCodeButton } from "./GenerateCodeButton";
import { useCodeStore } from "../../store/codeStore";

export function CodePanel() {
  const code = useCodeStore((state) => state.code);
  const issues = useCodeStore((state) => state.issues);
  const status = useCodeStore((state) => state.status);

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Generated Python</h2>
          <p className="text-sm text-slate-400">Mocked output for the frontend-only milestone.</p>
        </div>
        <CodeToolbar />
      </div>
      <GenerateCodeButton />
      {status === "error" && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
          {issues.map((issue) => (
            <p key={issue.id}>{issue.message}</p>
          ))}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/10">
        <Editor
          defaultLanguage="python"
          options={{ minimap: { enabled: false }, fontSize: 13, readOnly: true }}
          theme="vs-dark"
          value={code || "# Generate code from the current graph to preview the scaffold.\n"}
        />
      </div>
    </div>
  );
}
