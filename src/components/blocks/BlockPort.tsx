import { Handle, Position } from "reactflow";
import { PORT_COLORS } from "../../constants/portTypes";
import type { PortDefinition } from "../../types/port";

export function BlockPort({ port }: { port: PortDefinition }) {
  const isInput = port.direction === "input";

  return (
    <div className="relative flex items-center gap-2 text-[10px] font-medium text-zinc-700">
      {isInput && (
        <Handle
          id={port.id}
          type="target"
          position={Position.Left}
          style={{ width: 10, height: 10, border: "2px solid #ffffff", background: PORT_COLORS[port.type], borderRadius: "0.125rem", marginLeft: -5, boxShadow: "0 0 0 1px #e2e8f0" }}
        />
      )}
      <span className="text-slate-600">{port.name}</span>
      {!isInput && (
        <Handle
          id={port.id}
          type="source"
          position={Position.Right}
          style={{ width: 10, height: 10, border: "2px solid #ffffff", background: PORT_COLORS[port.type], borderRadius: "50%", marginRight: -5, boxShadow: "0 0 0 1px #e2e8f0" }}
        />
      )}
    </div>
  );
}
