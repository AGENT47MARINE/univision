import { create } from "zustand";
import type { GraphBlock } from "../types/block";
import type { GraphConnection } from "../types/connection";
import type { ProjectGraph } from "../types/graph";
import { blockRegistry, getBlockDefinition } from "../lib/blockRegistry";
import { STARTER_TEMPLATES } from "../constants/templates";
import { loadGraph, saveGraph } from "../lib/graphSerializer";

interface GraphState {
  projectName: string;
  blocks: GraphBlock[];
  connections: GraphConnection[];
  selectedBlockId: string | null;
  addBlock: (type: string, position?: { x: number; y: number }) => void;
  updateBlockConfig: (blockId: string, key: string, value: string | number | boolean) => void;
  setSelectedBlockId: (id: string | null) => void;
  setGraph: (graph: ProjectGraph) => void;
  addConnection: (connection: GraphConnection) => void;
  removeConnection: (connectionId: string) => void;
}

const initialGraph = loadGraph() ?? STARTER_TEMPLATES[1];

export const useGraphStore = create<GraphState>((set, get) => ({
  projectName: initialGraph.project.name,
  blocks: initialGraph.blocks,
  connections: initialGraph.connections,
  selectedBlockId: initialGraph.blocks[0]?.id ?? null,
  addBlock: (type, position = { x: 160, y: 160 }) => {
    const definition = getBlockDefinition(type) ?? blockRegistry[0];
    const block: GraphBlock = {
      id: `${type}-${crypto.randomUUID()}`,
      type: definition.type,
      label: definition.label,
      category: definition.category,
      position,
      config: definition.defaults,
      status: definition.configSchema.length > 0 ? "idle" : "configured",
    };
    set((state) => {
      const nextGraph = {
        project: { name: state.projectName, version: "0.1.0" },
        blocks: [...state.blocks, block],
        connections: state.connections,
      };
      saveGraph(nextGraph);
      return { blocks: nextGraph.blocks, connections: nextGraph.connections, selectedBlockId: block.id };
    });
  },
  updateBlockConfig: (blockId, key, value) => {
    set((state) => {
      const blocks = state.blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              config: { ...block.config, [key]: value },
              status: "configured" as const,
            }
          : block,
      );
      saveGraph({ project: { name: state.projectName, version: "0.1.0" }, blocks, connections: state.connections });
      return { blocks };
    });
  },
  setSelectedBlockId: (selectedBlockId) => set({ selectedBlockId }),
  setGraph: (graph) => {
    saveGraph(graph);
    set({
      projectName: graph.project.name,
      blocks: graph.blocks,
      connections: graph.connections,
      selectedBlockId: graph.blocks[0]?.id ?? null,
    });
  },
  addConnection: (connection) => {
    set((state) => {
      const connections = [...state.connections, connection];
      saveGraph({ project: { name: state.projectName, version: "0.1.0" }, blocks: state.blocks, connections });
      return { connections };
    });
  },
  removeConnection: (connectionId) => {
    set((state) => {
      const connections = state.connections.filter((connection) => connection.id !== connectionId);
      saveGraph({ project: { name: state.projectName, version: "0.1.0" }, blocks: state.blocks, connections });
      return { connections };
    });
  },
}));

export function getCurrentGraph(): ProjectGraph {
  const state = useGraphStore.getState();
  return {
    project: { name: state.projectName, version: "0.1.0" },
    blocks: state.blocks,
    connections: state.connections,
  };
}
