import type { BlockDefinition } from "../types/block";

export const blockRegistry: BlockDefinition[] = [
  {
    type: "image-input",
    label: "Image Input",
    description: "Loads a single image into the pipeline.",
    category: "Input",
    inputs: [],
    outputs: [{ id: "frame-out", name: "frame", type: "frame", direction: "output" }],
    defaults: { path: "/images/sample.jpg" },
    configSchema: [{ key: "path", label: "Image Path", type: "text", required: true }],
  },
  {
    type: "rtsp-stream",
    label: "RTSP Stream",
    description: "Streams frames from a remote camera source.",
    category: "Input",
    inputs: [],
    outputs: [{ id: "frame-out", name: "frame", type: "frame", direction: "output" }],
    defaults: { streamUrl: "rtsp://camera.local/stream" },
    configSchema: [{ key: "streamUrl", label: "Stream URL", type: "text", required: true }],
  },
  {
    type: "yolo-detector",
    label: "YOLO Detector",
    description: "Detects objects and emits bounding boxes.",
    category: "Detection",
    inputs: [{ id: "frame-in", name: "frame", type: "frame", direction: "input" }],
    outputs: [
      { id: "frame-out", name: "frame", type: "frame", direction: "output" },
      { id: "boxes-out", name: "boxes", type: "bounding_box_list", direction: "output" },
    ],
    defaults: { model: "yolov8n.pt", confidence: 0.6 },
    configSchema: [
      { key: "model", label: "Model", type: "text", required: true },
      { key: "confidence", label: "Confidence", type: "number", required: true, min: 0, max: 1 },
    ],
  },
  {
    type: "grayscale",
    label: "Grayscale",
    description: "Converts frames into grayscale.",
    category: "Preprocessing",
    inputs: [{ id: "frame-in", name: "frame", type: "frame", direction: "input" }],
    outputs: [{ id: "frame-out", name: "frame", type: "frame", direction: "output" }],
    defaults: {},
    configSchema: [],
  },
  {
    type: "easy-ocr",
    label: "EasyOCR",
    description: "Reads text from image regions.",
    category: "OCR",
    inputs: [{ id: "frame-in", name: "frame", type: "frame", direction: "input" }],
    outputs: [{ id: "text-out", name: "text", type: "text", direction: "output" }],
    defaults: { language: "en" },
    configSchema: [
      {
        key: "language",
        label: "Language",
        type: "select",
        options: [
          { label: "English", value: "en" },
          { label: "Hindi", value: "hi" },
        ],
      },
    ],
  },
  {
    type: "regex-validator",
    label: "Regex Validator",
    description: "Filters text using a regex pattern.",
    category: "PostProcessing",
    inputs: [{ id: "text-in", name: "text", type: "text", direction: "input" }],
    outputs: [{ id: "text-out", name: "text", type: "text", direction: "output" }],
    defaults: { pattern: "^[A-Z0-9]+$" },
    configSchema: [{ key: "pattern", label: "Pattern", type: "text", required: true }],
  },
  {
    type: "annotator",
    label: "Annotator",
    description: "Draws detections on top of a frame.",
    category: "Output",
    inputs: [
      { id: "frame-in", name: "frame", type: "frame", direction: "input" },
      { id: "boxes-in", name: "boxes", type: "bounding_box_list", direction: "input" },
    ],
    outputs: [{ id: "frame-out", name: "frame", type: "frame", direction: "output" }],
    defaults: { showLabels: true },
    configSchema: [{ key: "showLabels", label: "Show Labels", type: "toggle" }],
  },
  {
    type: "console-logger",
    label: "Console Logger",
    description: "Logs text output for inspection.",
    category: "Output",
    inputs: [{ id: "text-in", name: "text", type: "text", direction: "input" }],
    outputs: [],
    defaults: { level: "info" },
    configSchema: [
      {
        key: "level",
        label: "Level",
        type: "select",
        options: [
          { label: "Info", value: "info" },
          { label: "Warning", value: "warning" },
        ],
      },
    ],
  },
];

export function getBlockDefinition(type: string) {
  return blockRegistry.find((definition) => definition.type === type);
}
