import { useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  addEdge,
} from "reactflow";
import { BlockNode } from "../blocks/BlockNode";
import { useGraphStore } from "../../store/graphStore";
import { getBlockDefinition } from "../../lib/blockRegistry";
import { CanvasToolbar } from "./CanvasToolbar";
import { WorkbenchMiniMap } from "./WorkbenchMiniMap";

const nodeTypes = {
  pipelineBlock: BlockNode,
};

export function WorkbenchCanvas() {
  const blocks = useGraphStore((state) => state.blocks);
  const connections = useGraphStore((state) => state.connections);
  const addBlock = useGraphStore((state) => state.addBlock);
  const addConnectionToStore = useGraphStore((state) => state.addConnection);
  const removeConnection = useGraphStore((state) => state.removeConnection);
  const setSelectedBlockId = useGraphStore((state) => state.setSelectedBlockId);

  const nodes = useMemo<Node[]>(
    () =>
      blocks.map((block) => ({
        id: block.id,
        type: "pipelineBlock",
        position: block.position,
        data: block,
      })),
    [blocks],
  );

  const edges = useMemo<Edge[]>(
    () =>
      connections.map((connection) => {
        const sourceType = getBlockDefinition(blocks.find((block) => block.id === connection.source)?.type ?? "")?.outputs.find(
          (port) => port.id === connection.sourceHandle,
        )?.type;

        return {
          id: connection.id,
          source: connection.source,
          sourceHandle: connection.sourceHandle,
          target: connection.target,
          targetHandle: connection.targetHandle,
          type: "smoothstep",
          borderRadius: 0,
          markerEnd: { type: MarkerType.ArrowClosed, color: sourceType === "text" ? "#ffffff" : "#94a3b8" },
          style: { stroke: sourceType === "text" ? "#ffffff" : "#94a3b8", strokeWidth: 2 },
        };
      }),
    [blocks, connections],
  );

  function onConnect(connection: Connection) {
    if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) {
      return;
    }

    const edge = addEdge(
      {
        ...connection,
        id: `edge-${crypto.randomUUID()}`,
      },
      [],
    )[0];

    if (!edge.source || !edge.target || !edge.sourceHandle || !edge.targetHandle) {
      return;
    }

    addConnectionToStore({
      id: edge.id,
      source: edge.source,
      sourceHandle: edge.sourceHandle,
      target: edge.target,
      targetHandle: edge.targetHandle,
    });
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDrop={(event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/univision-block");
        if (!type) {
          return;
        }
        addBlock(type, { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
      }}
    >
      <CanvasToolbar />
      <ReactFlow
        fitView
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgeClick={(_, edge) => removeConnection(edge.id)}
        onNodeClick={(_, node) => setSelectedBlockId(node.id)}
        proOptions={{ hideAttribution: true }}
        style={{ backgroundColor: "#006aff" }}
      >
        <Background 
          id="minor" 
          gap={10} 
          color="rgba(255, 255, 255, 0.1)" 
          variant={BackgroundVariant.Lines} 
          size={1} 
        />
        <Background 
          id="major" 
          gap={50} 
          color="rgba(255, 255, 255, 0.2)" 
          variant={BackgroundVariant.Lines} 
          size={1} 
        />
        <Controls className="bg-white/90 backdrop-blur-sm border-slate-200 fill-slate-500 rounded-md shadow-lg" />
        <WorkbenchMiniMap />
      </ReactFlow>
    </div>
  );
}
