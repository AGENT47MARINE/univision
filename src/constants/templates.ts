import type { ProjectGraph } from "../types/graph";

export const STARTER_TEMPLATES: ProjectGraph[] = [
  {
    project: { name: "Blank Pipeline", version: "0.1.0" },
    blocks: [],
    connections: [],
  },
  {
    project: { name: "ANPR Starter", version: "0.1.0" },
    blocks: [
      {
        id: "block-input",
        type: "rtsp-stream",
        label: "RTSP Stream",
        category: "Input",
        position: { x: 80, y: 140 },
        config: { streamUrl: "rtsp://camera.local/stream" },
        status: "configured",
      },
      {
        id: "block-detector",
        type: "yolo-detector",
        label: "YOLO Detector",
        category: "Detection",
        position: { x: 360, y: 140 },
        config: { model: "yolov8n.pt", confidence: 0.6 },
        status: "configured",
      },
    ],
    connections: [
      {
        id: "edge-stream-detector",
        source: "block-input",
        sourceHandle: "frame-out",
        target: "block-detector",
        targetHandle: "frame-in",
      },
    ],
  },
];
