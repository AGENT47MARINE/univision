import type { ProjectGraph } from "../types/graph";

const STORAGE_KEY = "univision-graph";

export function saveGraph(graph: ProjectGraph) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(graph));
}

export function loadGraph(): ProjectGraph | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ProjectGraph;
  } catch {
    return null;
  }
}
