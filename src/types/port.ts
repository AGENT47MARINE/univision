export type PortType =
  | "frame"
  | "bounding_box_list"
  | "text"
  | "config"
  | "number"
  | "boolean";

export type PortDirection = "input" | "output";

export interface PortDefinition {
  id: string;
  name: string;
  type: PortType;
  direction: PortDirection;
}
