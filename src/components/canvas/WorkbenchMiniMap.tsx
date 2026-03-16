import { MiniMap } from "reactflow";

export function WorkbenchMiniMap() {
  return (
    <MiniMap
      pannable
      zoomable
      nodeColor="#2563eb"
      maskColor="rgba(37, 99, 235, 0.05)"
      style={{ 
        background: "#f8fafc", 
        border: "2px solid #2563eb", 
        borderRadius: "12px", 
        overflow: "hidden",
        width: 140,
        height: 105
      }}
    />
  );
}
