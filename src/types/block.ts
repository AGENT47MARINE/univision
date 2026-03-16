import type { ConfigFieldSchema } from "./configSchema";
import type { PortDefinition } from "./port";

export type BlockCategory =
  | "Input"
  | "Detection"
  | "Preprocessing"
  | "OCR"
  | "PostProcessing"
  | "Output"
  | "Utility";

export type BlockStatus = "idle" | "configured" | "error";

export interface BlockConfig {
  [key: string]: string | number | boolean;
}

export interface BlockDefinition {
  type: string;
  label: string;
  description: string;
  category: BlockCategory;
  inputs: PortDefinition[];
  outputs: PortDefinition[];
  defaults: BlockConfig;
  configSchema: ConfigFieldSchema[];
}

export interface GraphBlock {
  id: string;
  type: string;
  label: string;
  category: BlockCategory;
  position: { x: number; y: number };
  config: BlockConfig;
  status: BlockStatus;
}
