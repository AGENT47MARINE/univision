import dagre from "dagre";
import type { Edge, Node } from "reactflow";

const graph = new dagre.graphlib.Graph();
graph.setDefaultEdgeLabel(() => ({}));

export function applyAutoLayout(nodes: Node[], edges: Edge[]) {
  graph.setGraph({ rankdir: "LR", nodesep: 36, ranksep: 80 });

  nodes.forEach((node) => {
    graph.setNode(node.id, { width: 240, height: 120 });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  return nodes.map((node) => {
    const position = graph.node(node.id);
    return {
      ...node,
      position: {
        x: position.x - 120,
        y: position.y - 60,
      },
    };
  });
}
