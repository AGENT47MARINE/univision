# Concept Document
## OpenCV Visual Pipeline Workbench
### A Node-Based Visual Programming Environment for OpenCV Pipeline Design and AI-Powered Code Generation

---

| Field               | Details                                                              |
|---------------------|----------------------------------------------------------------------|
| **Document Type**   | Product Concept & Frontend Design Specification                      |
| **Codename**        | TBD                                                             |
| **Domain**          | Visual Programming · Computer Vision · Developer Tooling             |
| **Version**         | 1.0.0 — Concept                                                      |
| **Date**            | 2026-03-11                                                           |
| **Status**          | Pre-Development — Concept Approval Stage                             |

---

## Table of Contents

1. [Concept Summary](#1-concept-summary)
2. [Problem It Solves](#2-problem-it-solves)
3. [Core Design Philosophy](#3-core-design-philosophy)
4. [Inspiration and Analogues](#4-inspiration-and-analogues)
5. [Application Layout Architecture](#5-application-layout-architecture)
6. [The Block System](#6-the-block-system)
7. [The Workbench Canvas](#7-the-workbench-canvas)
8. [Connection and Port System](#8-connection-and-port-system)
9. [Block Library — Full Catalogue](#9-block-library--full-catalogue)
10. [AI Code Generation Engine](#10-ai-code-generation-engine)
11. [Graph Serialisation — Data Model](#11-graph-serialisation--data-model)
12. [UI/UX Design Principles](#12-uiux-design-principles)
13. [Interaction Design](#13-interaction-design)
14. [Technical Frontend Stack](#14-technical-frontend-stack)
15. [Component Architecture](#15-component-architecture)
16. [Future Scope](#16-future-scope)
17. [Glossary](#17-glossary)

---

## 1. Concept Summary

This tool is a browser-based, node-graph visual programming workbench purpose-built for designing **OpenCV-powered computer vision pipelines**. Users construct processing pipelines by dragging pre-built functional blocks onto an infinite canvas, connecting them with directional data-flow arrows, and configuring each block via an inline property panel. When the pipeline is ready, the system serialises the graph and sends it to an AI code generation engine that produces a clean, runnable, fully-commented **Python script** — ready to execute with no manual wiring required.

The tool is aimed at computer vision engineers, researchers, and students who need to rapidly prototype, document, and share OpenCV pipelines without writing boilerplate code from scratch. It simultaneously functions as a **visual documentation tool** — the workbench diagram IS the architecture diagram — and as a **code scaffold generator**, dramatically reducing the time from pipeline concept to executable script.

Think of it as **Scratch meets draw.io meets the Claude API**, oriented entirely around OpenCV.

---

## 2. Problem It Solves

### For Engineers and Developers
- Setting up an OpenCV pipeline from scratch requires extensive boilerplate: imports, stream initialisation, loop management, inter-stage data passing, error handling, and cleanup. This friction slows prototyping.
- Pipeline architecture is typically only visible in code, making it hard to communicate the design to non-developers or to reason about the flow visually.
- Switching OCR engines, detection models, or preprocessing steps requires manual refactoring across multiple code locations.

### For Students and Researchers
- Learners new to OpenCV lack a visual mental model of how pipeline stages connect and what data flows between them.
- Writing full pipeline scripts to experiment with a new technique (e.g., swapping CLAHE for histogram equalisation) requires understanding all surrounding code, not just the target stage.

### **Solution Overview
| Pain Point | Solution |
|---|---|
| Boilerplate code overhead | AI generates the full script from the visual graph |
| Pipeline architecture is invisible | The canvas IS the architecture diagram |
| Reconfiguring stages requires code edits | Drag, delete, reconnect — then regenerate |
| Learning curve for pipeline composition | Visual block connections make data flow explicit |
| Communicating architecture to stakeholders | Export the canvas as a diagram image or PDF |

---

## 3. Core Design Philosophy

### 3.1 Blocks are Intentions, Not Code
Each block in the palette represents a **high-level intention** — "Detect Vehicles", "Enhance Contrast", "Read OCR" — not a specific function call. The AI code generator resolves those intentions into concrete, correct Python implementations, selecting the right OpenCV functions, model loaders, and wiring based on block configuration and connections.

### 3.2 The Canvas is the Source of Truth
The workbench graph is the canonical representation of the pipeline. Generated code is a *derivative* of the graph, not the other way around. This means the graph can be saved, versioned, shared, and re-imported to regenerate updated code at any point.

### 3.3 Ports Enforce Type Safety
Every block's input and output ports are explicitly typed. The system prevents the user from connecting incompatible ports (e.g., connecting a `bounding_box` output directly to an `OCR` input that expects a `frame`). This eliminates a class of pipeline logic errors before code is even generated.

### 3.4 Progressive Disclosure of Complexity
Basic use — drop blocks, connect them, generate code — requires zero configuration. Advanced users can expand each block's property panel to tune parameters (confidence thresholds, model paths, regex patterns) that the AI will incorporate into the generated code.

### 3.5 AI as a Compiler, Not a Guesser
The AI code generator receives a deterministic, structured JSON representation of the graph. It is not asked to interpret ambiguous natural language; it is given a precise graph specification and asked to produce the corresponding Python. This makes the output predictable, reproducible, and debuggable.

---

## 4. Inspiration and Analogues

| Tool | What We Borrow |
|---|---|
| **draw.io / Lucidchart** | Shape library panel, infinite canvas, connection arrow UX, zoom/pan interaction |
| **Scratch** | Block-based abstraction, visual flow representation, approachability for learners |
| **Blender Node Editor** | Typed ports, data-flow graph, inline node configuration, socket colour coding by data type |
| **Unreal Engine Blueprints** | Node categories, execution flow vs data flow, live validation, professional-grade node editor UX |
| **Node-RED** | Browser-based flow editor, wiring paradigm, deploy-on-demand code execution |
| **ComfyUI** | AI pipeline as node graph, category-coloured nodes, real-time output preview |

This tool is distinct from all of these in that it is **domain-specific to OpenCV and computer vision**, ships with a curated, expert-designed block library rather than generic shapes, and uses AI to generate production-quality Python rather than simply executing pre-wired functions.

---

## 5. Application Layout Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  TOPBAR: Logo | Project Name | Save | Export | Share | Settings        [?] [⚙]  │
├──────────────┬──────────────────────────────────────────┬──────────────────────┤
│              │                                          │                      │
│  LEFT PANEL  │           WORKBENCH CANVAS               │   RIGHT PANEL        │
│  ─────────── │           ────────────────               │   ────────────       │
│  🔍 Search   │                                          │  [ Python Code ]     │
│              │   ┌─────────┐      ┌─────────┐           │                      │
│  📁 Input    │   │  Block  │─────▶│  Block  │           │  import cv2          │
│  📁 Detect   │   │         │      │         │           │  import numpy as np  │
│  📁 Preproc  │   └─────────┘      └────┬────┘           │  ...                 │
│  📁 Enhance  │                        │                 │                      │
│  📁 OCR      │                   ┌────▼────┐            │  [Copy] [Run]        │
│  📁 PostProc │                   │  Block  │            │  ──────────────      │
│  📁 Output   │                   └─────────┘            │  Block Inspector     │
│  📁 Custom   │                                          │  ──────────────      │
│              │   [+ Block]  [Auto-Layout]  [🔍±]        │  (selected block     │
│  ─────────── │                                          │   properties here)   │
│  Templates   │                                          │                      │
│              │                                          │  [Generate Code ▶]   │
└──────────────┴──────────────────────────────────────────┴──────────────────────┘
```

### Panel Descriptions

#### Left Panel — Block Palette
- **Search bar** at top for instant block lookup by name or tag
- Blocks organised into **collapsible category folders**
- Each block entry shows: icon, name, and a short one-line description
- Drag any block from the palette onto the canvas to instantiate it
- A **Templates** section at the bottom offers pre-wired pipeline templates (e.g., "ANPR Pipeline", "Motion Detection", "Face Recognition")

#### Centre — Workbench Canvas
- Infinite, pannable (middle-click drag or space+drag), zoomable (scroll wheel) canvas
- Grid-snapping for clean block alignment
- Blocks are placed, moved, selected, grouped, and deleted here
- Connections drawn by clicking and dragging from one port to another
- Multi-select via shift-click or drag-select rectangle
- Mini-map in the bottom-right corner for navigation on large graphs

#### Right Panel — Code & Inspector
- **Block Inspector** (top half): when a block is selected, its configurable properties appear here as form fields
- **Generated Code Viewer** (bottom half): syntax-highlighted Python code output, updated on demand
- **Generate Code** button triggers AI code generation from the current graph
- **Copy** and **Run** (if backend execution is enabled) action buttons on the code panel

---

## 6. The Block System

### Block Anatomy

Every block on the canvas is a self-contained visual component with the following structure:

```
┌────────────────────────────────────┐
│  🟦  [Category Colour Bar]         │
│  ┌──────────────────────────────┐  │
│  │  BLOCK NAME                  │  │
│  │  Short description           │  │
│  └──────────────────────────────┘  │
│                                    │
│  ◉ input_port_1    output_port ◉  │
│  ◉ input_port_2                    │
│                                    │
│  [⚙ Configure]                    │
└────────────────────────────────────┘
```

### Block Properties
| Property | Description |
|---|---|
| `block_id` | Unique UUID assigned on instantiation |
| `block_type` | Identifier from the block library (e.g., `yolov8_detector`) |
| `category` | One of: Input, Detection, Preprocessing, Enhancement, OCR, PostProcessing, Output, Custom |
| `label` | Display name, editable by user |
| `input_ports` | Array of typed input port definitions |
| `output_ports` | Array of typed output port definitions |
| `config` | Key-value configuration object (thresholds, paths, model names, etc.) |
| `position` | `{x, y}` canvas coordinates |
| `status` | One of: `idle`, `configured`, `error`, `running` |

### Block States (Visual Feedback)
| State | Visual Indicator |
|---|---|
| `idle` | Default border colour |
| `configured` | Green checkmark badge |
| `error` | Red border, error tooltip |
| `selected` | Blue highlight border + shadow |
| `running` | Animated pulse ring (if live execution enabled) |

---

## 7. The Workbench Canvas

### Canvas Interactions

| Action | Interaction |
|---|---|
| **Pan canvas** | Space + drag, or middle-click drag |
| **Zoom in/out** | Scroll wheel, or `Ctrl +/-` |
| **Add block** | Drag from palette, or double-click canvas → search popup |
| **Move block** | Click and drag |
| **Select block** | Single click |
| **Multi-select** | Shift + click, or drag-select rectangle |
| **Delete block** | `Delete` / `Backspace` key, or right-click → Delete |
| **Duplicate block** | `Ctrl + D` |
| **Draw connection** | Drag from output port (●) to input port (◉) |
| **Delete connection** | Click on arrow → `Delete`, or right-click → Remove |
| **Open block config** | Double-click block, or click ⚙ icon |
| **Undo / Redo** | `Ctrl+Z` / `Ctrl+Shift+Z` |
| **Fit to screen** | `Ctrl+Shift+F` or mini-map reset button |
| **Group blocks** | Select multiple → `Ctrl+G` |
| **Auto-layout** | Toolbar button — applies Dagre/ELK hierarchical layout to all blocks |

### Canvas Toolbar (Floating, Top-Centre)
```
[Select ▾] [Connect] [Comment] | [Auto-Layout] [Align ▾] [Distribute ▾] | [🔍+] [🔍-] [Fit]
```

### Right-Click Context Menu (on canvas)
- Add Block (opens search)
- Paste
- Select All
- Auto-Layout
- Add Comment Node

### Right-Click Context Menu (on block)
- Configure
- Duplicate
- Delete
- Copy Block ID
- View Block Docs

---

## 8. Connection and Port System

### Port Types and Colour Coding

Ports are typed to ensure only semantically compatible blocks can be connected. Visual colour coding on ports makes types immediately identifiable.

| Port Type | Colour | Description |
|---|---|---|
| `frame` | 🔵 Blue | OpenCV image frame (NumPy ndarray, BGR) |
| `frame_batch` | 🔷 Dark Blue | List of frames (batch processing) |
| `bounding_box` | 🟠 Orange | Bounding box coordinates `[x, y, w, h]` |
| `bounding_box_list` | 🟧 Amber | List of bounding boxes + class labels |
| `plate_image` | 🟣 Purple | Cropped plate image (NumPy ndarray) |
| `text` | 🟢 Green | String — raw or validated text |
| `model` | 🔴 Red | Loaded model object (YOLO, OCR engine) |
| `config` | ⚪ White | Configuration dictionary |
| `mask` | 🟡 Yellow | Binary mask (NumPy ndarray) |
| `keypoints` | 🩷 Pink | Pose estimation keypoints |
| `signal` | ⬛ Dark Grey | Execution signal (trigger / control flow) |
| `number` | 🩵 Light Blue | Numeric scalar (confidence score, count) |
| `boolean` | 🟤 Brown | Boolean flag |

### Connection Validation Rules
- An output port can connect to any input port of the **same type**.
- A `frame` output can connect to a `frame` input only — cross-type connections are blocked and shown with a red X tooltip.
- One output port can fan out to **multiple** input ports (broadcast).
- One input port accepts only **one** connection (no merge by default; use a Merge block).
- Self-loops (a block connecting to itself) are blocked.
- Cyclic graphs are detected and flagged with a warning — the system targets DAG (Directed Acyclic Graph) pipelines only.

### Connection Arrow Design
- Drawn as smooth cubic Bézier curves
- Colour matches the port type of the connection
- Hover state: highlights the connection and shows a tooltip with port names and types
- Animated dashes (optional) to indicate data flow direction

---

## 9. Block Library — Full Catalogue

### 📁 Category 1: Input

| Block Name | Inputs | Outputs | Key Config |
|---|---|---|---|
| **Static Image Reader** | — | `frame` | `file_path` |
| **Video File Reader** | — | `frame`, `signal` | `file_path`, `loop` |
| **CCTV Camera** | — | `frame` | `device_index` |
| **IP / RTSP Stream** | — | `frame` | `stream_url`, `reconnect` |
| **Frame Sampler** | `frame` | `frame` | `fps_target` (1–5), `dedup_enabled` |
| **Frame Buffer** | `frame` | `frame_batch` | `buffer_size` |
| **Multi-Source Mux** | `frame ×N` | `frame`, `camera_id` | `sources[]` |

---

### 📁 Category 2: Detection

| Block Name | Inputs | Outputs | Key Config |
|---|---|---|---|
| **YOLOv8 Vehicle Detector** | `frame`, `model` | `frame`, `bounding_box_list` | `model_path`, `conf_threshold`, `classes[]` |
| **YOLOv8 Object Detector** | `frame`, `model` | `frame`, `bounding_box_list` | `model_path`, `conf_threshold`, `classes[]` |
| **License Plate Detector** | `frame`, `bounding_box_list` | `plate_image`, `bounding_box` | `model_path`, `conf_threshold` |
| **Face Detector** | `frame` | `frame`, `bounding_box_list` | `backend` (Haar/DNN/YOLOv8) |
| **Motion Detector** | `frame` | `frame`, `mask`, `boolean` | `method` (MOG2/KNN), `threshold` |
| **Contour Detector** | `mask` | `frame`, `bounding_box_list` | `min_area`, `mode` |
| **Background Subtractor** | `frame` | `mask` | `method` (MOG2/KNN), `learning_rate` |
| **HOG Person Detector** | `frame` | `frame`, `bounding_box_list` | `win_stride`, `scale` |
| **Haar Cascade Detector** | `frame` | `frame`, `bounding_box_list` | `cascade_path`, `scale_factor` |
| **Custom Model Loader** | — | `model` | `model_path`, `framework` |

---

### 📁 Category 3: Preprocessing

| Block Name | Inputs | Outputs | Key Config |
|---|---|---|---|
| **Crop ROI** | `frame`, `bounding_box` | `frame` | `padding` (px) |
| **Resize** | `frame` | `frame` | `width`, `height`, `mode` (fixed/min_height) |
| **Rotate / Deskew** | `frame` | `frame` | `angle` (auto/manual), `max_angle` |
| **Flip** | `frame` | `frame` | `axis` (horizontal/vertical/both) |
| **Grayscale Convert** | `frame` | `frame` | — |
| **Colour Space Convert** | `frame` | `frame` | `from_space`, `to_space` |
| **Perspective Warp** | `frame` | `frame` | `source_points`, `target_points` |
| **Threshold** | `frame` | `mask` | `method` (binary/otsu/adaptive), `thresh_val` |
| **Morphology** | `mask` | `mask` | `operation` (erode/dilate/open/close), `kernel_size` |
| **Frame Differencing** | `frame_batch` | `mask` | `method` (absdiff/optical_flow) |

---

### 📁 Category 4: Enhancement

| Block Name | Inputs | Outputs | Key Config |
|---|---|---|---|
| **CLAHE Contrast** | `frame` | `frame` | `clip_limit`, `tile_grid_size` |
| **Histogram Equalization** | `frame` | `frame` | `method` (global/adaptive) |
| **Gaussian Blur** | `frame` | `frame` | `kernel_size`, `sigma` |
| **Bilateral Filter** | `frame` | `frame` | `d`, `sigma_color`, `sigma_space` |
| **Median Blur** | `frame` | `frame` | `kernel_size` |
| **Sharpen** | `frame` | `frame` | `intensity` |
| **Denoise** | `frame` | `frame` | `method` (fastNlMeans/bilateral) |
| **Brightness/Contrast** | `frame` | `frame` | `alpha` (contrast), `beta` (brightness) |
| **Gamma Correction** | `frame` | `frame` | `gamma` |
| **Super Resolution** | `frame` | `frame` | `model` (ESPCN/FSRCNN/LapSRN), `scale` |

---

### 📁 Category 5: OCR

| Block Name | Inputs | Outputs | Key Config |
|---|---|---|---|
| **EasyOCR** | `frame` | `text`, `number` | `languages[]`, `gpu` |
| **PaddleOCR** | `frame` | `text`, `number` | `lang`, `use_gpu` |
| **CRNN OCR** | `frame` | `text`, `number` | `model_path`, `charset` |
| **Tesseract OCR** | `frame` | `text`, `number` | `lang`, `psm`, `oem` |
| **OCR Engine Selector** | `frame` | `text`, `number` | `engine` (easy/paddle/crnn/tesseract) |

---

### 📁 Category 6: Post-Processing

| Block Name | Inputs | Outputs | Key Config |
|---|---|---|---|
| **Regex Validator** | `text` | `text`, `boolean` | `pattern`, `locale` |
| **Character Corrector** | `text` | `text` | `correction_map` (JSON) |
| **Text Deduplicator** | `text` | `text`, `boolean` | `window_seconds` |
| **Confidence Filter** | `number`, `frame` | `frame` | `min_confidence` |
| **Class Filter** | `bounding_box_list` | `bounding_box_list` | `allowed_classes[]` |
| **NMS Filter** | `bounding_box_list` | `bounding_box_list` | `iou_threshold` |
| **Data Formatter** | `text`, `number` | `config` | `output_schema` (JSON template) |
| **Event Timestamp** | `signal` | `config` | `timezone`, `format` |
| **Counter** | `bounding_box_list` | `number` | `count_by` (class/total) |

---

### 📁 Category 7: Output

| Block Name | Inputs | Outputs | Key Config |
|---|---|---|---|
| **Display Window** | `frame` | — | `window_title`, `fullscreen` |
| **Annotator** | `frame`, `bounding_box_list` | `frame` | `show_labels`, `show_conf`, `colour` |
| **Text Overlay** | `frame`, `text` | `frame` | `position`, `font_size`, `colour` |
| **Video Writer** | `frame` | — | `output_path`, `fps`, `codec` |
| **Image Saver** | `frame` | — | `output_dir`, `naming_scheme` |
| **REST API Push** | `config` | — | `endpoint_url`, `method`, `auth_header` |
| **Database Writer** | `config` | — | `db_type` (postgres/sqlite), `connection_str`, `table` |
| **CSV Logger** | `config` | — | `output_path`, `columns[]` |
| **Console Logger** | `text`, `number` | — | `log_level` |
| **Webhook Trigger** | `config` | — | `webhook_url`, `payload_template` |

---

### 📁 Category 8: Utility / Logic

| Block Name | Inputs | Outputs | Key Config |
|---|---|---|---|
| **Frame Splitter** | `frame` | `frame ×N` | `n_outputs` |
| **Frame Merger** | `frame ×N` | `frame` | `method` (stack/overlay/side-by-side) |
| **Conditional Branch** | `boolean`, `frame` | `frame_true`, `frame_false` | — |
| **Python Script Block** | `frame` | `frame` | `custom_code` (inline editor) |
| **Comment Node** | — | — | `comment_text` |
| **Config Injector** | — | `config` | `key_value_pairs` (JSON) |
| **Loop Controller** | `signal` | `signal` | `iterations`, `delay_ms` |

---

## 10. AI Code Generation Engine

### How It Works

When the user clicks **Generate Code**, the workbench:

1. **Serialises the graph** into a structured JSON payload (see Section 11)
2. **Sends the payload** to the Claude API via `POST /v1/messages`
3. **Receives the generated Python script** as a structured response
4. **Renders the code** in the right panel with syntax highlighting

### System Prompt Design

The AI code generator is given a carefully engineered system prompt that instructs it to:

- Act as a senior Python/OpenCV engineer
- Accept a JSON graph specification and generate a single, clean, runnable Python file
- Respect the topological order of the DAG (perform a topological sort before generating)
- Generate all required imports at the top
- Wrap the pipeline in a `main()` function with a `if __name__ == "__main__":` guard
- Add inline comments explaining each stage corresponding to the block name
- Include proper error handling (try/except) around model loading and stream capture
- Honour all configuration values from each block's `config` object
- Generate GPU/CPU conditional logic for detection and OCR stages

### AI Prompt Structure

```
System Prompt:
  "You are a senior Python and OpenCV engineer. You will receive a JSON 
   object describing a computer vision pipeline as a directed acyclic graph 
   (DAG) of functional blocks. Generate a single, clean, well-commented, 
   runnable Python 3.10+ script that implements this pipeline exactly.
   
   Rules:
   - Perform topological sort of the DAG before generating code
   - Group all imports at the top
   - Use a main() function with __name__ guard
   - Add a comment for each block referencing its label
   - Use only: opencv-python, numpy, ultralytics, easyocr, paddleocr, torch
   - Include GPU/CPU detection with automatic fallback
   - Add error handling around stream capture and model loading
   - Honour all config values from the block definitions
   - Output ONLY the Python code. No explanation, no markdown fences."

User Message:
  "<pipeline_graph_json>"
```

### Generated Code Structure

```python
# ============================================================
# OpenCV Visual Pipeline — Generated Output — [Project Name]
# Generated: 2026-03-11 | Graph Version: abc123
# ============================================================

# --- Imports ---
import cv2
import numpy as np
from ultralytics import YOLO
import easyocr
import re
import psycopg2
from datetime import datetime, timezone

# --- Configuration ---
CAMERA_SOURCE   = "rtsp://192.168.1.100:554/stream"
YOLO_MODEL_PATH = "models/yolov8n.pt"
LPD_MODEL_PATH  = "models/lpd.pt"
VEHICLE_CONF    = 0.60
PLATE_CONF      = 0.65
OCR_CONF        = 0.75
PLATE_REGEX     = r"^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$"
DEDUP_WINDOW_S  = 10

# --- Stage 1: Load Models ---
# [Block: YOLOv8 Vehicle Detector]
vehicle_model = YOLO(YOLO_MODEL_PATH)

# [Block: License Plate Detector]
lpd_model = YOLO(LPD_MODEL_PATH)

# [Block: EasyOCR]
reader = easyocr.Reader(['en'], gpu=torch.cuda.is_available())

# --- Main Pipeline ---
def main():
    # [Block: RTSP Stream]
    cap = cv2.VideoCapture(CAMERA_SOURCE)
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open stream: {CAMERA_SOURCE}")
    ...

if __name__ == "__main__":
    main()
```

---

## 11. Graph Serialisation — Data Model

The workbench serialises the current graph state as a JSON object before sending to the AI. This JSON is also the save format for projects.

```json
{
  "project": {
    "name": "ANPR Toll Gate Pipeline",
    "version": "1.0.0",
    "created_at": "2026-03-11T08:00:00Z",
    "graph_id": "g_abc123"
  },
  "blocks": [
    {
      "block_id": "b_001",
      "block_type": "rtsp_stream",
      "label": "Toll Gate Camera 1",
      "category": "Input",
      "position": { "x": 100, "y": 200 },
      "config": {
        "stream_url": "rtsp://192.168.1.100:554/stream",
        "reconnect": true
      },
      "input_ports": [],
      "output_ports": [
        { "port_id": "p_001_out_frame", "name": "frame", "type": "frame" }
      ]
    },
    {
      "block_id": "b_002",
      "block_type": "frame_sampler",
      "label": "Frame Sampler",
      "category": "Input",
      "position": { "x": 320, "y": 200 },
      "config": {
        "fps_target": 3,
        "dedup_enabled": true
      },
      "input_ports": [
        { "port_id": "p_002_in_frame", "name": "frame", "type": "frame" }
      ],
      "output_ports": [
        { "port_id": "p_002_out_frame", "name": "frame", "type": "frame" }
      ]
    }
  ],
  "connections": [
    {
      "connection_id": "c_001",
      "source_block_id": "b_001",
      "source_port_id": "p_001_out_frame",
      "target_block_id": "b_002",
      "target_port_id": "p_002_in_frame"
    }
  ]
}
```

---

## 12. UI/UX Design Principles

### Visual Design System

| Element | Specification |
|---|---|
| **Colour Scheme** | Dark theme canvas (`#1a1a2e`) with high-contrast block cards (`#16213e`) |
| **Block Card Background** | `#0f3460` with subtle gradient |
| **Category Accent Colours** | Each category has a distinct top-border accent colour (see below) |
| **Port Circles** | 10px diameter, filled with port-type colour, white stroke |
| **Connection Arrows** | 2px Bézier curves, colour matches port type, semi-transparent on hover |
| **Selected State** | 2px `#4fc3f7` border with `0 0 12px rgba(79,195,247,0.5)` box-shadow |
| **Typography** | Block labels: `Inter 13px 600`; Descriptions: `Inter 11px 400 #8892b0` |
| **Grid** | Subtle dot grid, `#1e2840`, 20px spacing |

### Category Accent Colours
| Category | Accent Colour |
|---|---|
| Input | `#00b4d8` (Cyan) |
| Detection | `#ef233c` (Red) |
| Preprocessing | `#f77f00` (Orange) |
| Enhancement | `#7209b7` (Purple) |
| OCR | `#2dc653` (Green) |
| Post-Processing | `#fcbf49` (Yellow) |
| Output | `#4361ee` (Indigo) |
| Utility | `#6c757d` (Grey) |

### Responsive Considerations
- The workbench is designed for desktop (minimum 1280px width)
- On smaller viewports, the left panel collapses to an icon rail
- The right panel collapses to a slide-over drawer

---

## 13. Interaction Design

### Adding a Block
1. User drags a block from the left palette
2. Block appears on canvas at drop position with a placement animation
3. Block is immediately in `idle` state — ports visible, config empty
4. If the block has required config, a badge indicates "needs configuration"

### Drawing a Connection
1. User hovers over an output port — port enlarges and shows a tooltip with port type
2. User clicks and drags from the output port — a live Bézier preview curve follows the cursor
3. As the cursor approaches a compatible input port, it highlights in green
4. Incompatible ports show a red highlight and display a tooltip explaining the type mismatch
5. User releases over the input port — connection is drawn and persists

### Configuring a Block
1. User double-clicks a block or clicks the ⚙ icon
2. The right panel switches to Block Inspector mode
3. Config fields are rendered as appropriate form controls (text input, slider, dropdown, toggle)
4. Changes apply immediately and are reflected in the graph JSON
5. Validated fields show a green check; invalid values show inline error text

### Generating Code
1. User clicks **Generate Code ▶** in the right panel
2. A loading state animates on the button and shows "AI is compiling your pipeline..."
3. The graph is serialised and sent to the Claude API
4. Generated code appears in the code panel with a fade-in animation
5. A toast notification confirms: "Code generated successfully ✓"
6. If the graph has errors (disconnected required ports, missing config), the system shows an error list before sending

### Keyboard Shortcuts Summary
| Shortcut | Action |
|---|---|
| `Ctrl+S` | Save project |
| `Ctrl+Z` / `Ctrl+Shift+Z` | Undo / Redo |
| `Ctrl+D` | Duplicate selected block |
| `Delete` | Delete selected block or connection |
| `Ctrl+G` | Group selected blocks |
| `Ctrl+Shift+F` | Fit canvas to screen |
| `Ctrl+A` | Select all blocks |
| `Escape` | Deselect / cancel connection draw |
| `Space + Drag` | Pan canvas |
| `Double-click canvas` | Open quick-add block search |

---

## 14. Technical Frontend Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | React 18 + TypeScript | Component model ideal for node-graph UI; strict typing prevents runtime graph errors |
| **Node Graph Engine** | React Flow (`reactflow`) | Purpose-built for node editors; handles canvas, connections, zoom/pan, mini-map out of the box |
| **State Management** | Zustand | Lightweight, performant store for graph state without Redux boilerplate |
| **Styling** | Tailwind CSS + CSS Modules | Utility-first for layout; scoped CSS Modules for complex block animations |
| **Code Highlighting** | Monaco Editor (VS Code engine) | Professional code editor in the right panel with Python syntax, themes, and IntelliSense |
| **AI API** | Anthropic Claude API (`claude-sonnet-4-20250514`) | Code generation from graph JSON |
| **Icons** | Lucide React | Consistent, lightweight icon set |
| **Animations** | Framer Motion | Block placement, connection draw, panel transitions |
| **Graph Layout** | Dagre.js | Auto-layout algorithm for hierarchical DAG arrangement |
| **Serialisation** | JSON (native) | Graph save/load format |
| **Build Tool** | Vite | Fast HMR during development |
| **Testing** | Vitest + React Testing Library | Unit and integration tests for graph logic |

---

## 15. Component Architecture

```
src/
├── components/
│   ├── canvas/
│   │   ├── WorkbenchCanvas.tsx       ← React Flow wrapper, canvas root
│   │   ├── ConnectionLine.tsx        ← Custom Bézier connection renderer
│   │   └── MiniMap.tsx               ← Canvas mini-map overlay
│   │
│   ├── blocks/
│   │   ├── BlockNode.tsx             ← Base block node component
│   │   ├── BlockPort.tsx             ← Input/output port component
│   │   ├── BlockCategoryBar.tsx      ← Colour accent bar per category
│   │   └── blocks/                   ← Per-block-type override components
│   │       ├── RTSPStreamBlock.tsx
│   │       ├── YOLOv8DetectorBlock.tsx
│   │       └── ...
│   │
│   ├── palette/
│   │   ├── BlockPalette.tsx          ← Left panel wrapper
│   │   ├── BlockPaletteSearch.tsx    ← Search bar + filtered results
│   │   ├── BlockCategory.tsx         ← Collapsible category folder
│   │   ├── BlockPaletteItem.tsx      ← Draggable block entry
│   │   └── TemplateLibrary.tsx       ← Pre-wired pipeline templates
│   │
│   ├── inspector/
│   │   ├── BlockInspector.tsx        ← Right panel config form
│   │   ├── fields/
│   │   │   ├── TextField.tsx
│   │   │   ├── SliderField.tsx
│   │   │   ├── DropdownField.tsx
│   │   │   └── ToggleField.tsx
│   │   └── ValidationBadge.tsx
│   │
│   ├── codepanel/
│   │   ├── CodePanel.tsx             ← Right panel code viewer
│   │   ├── CodeEditor.tsx            ← Monaco Editor integration
│   │   ├── GenerateButton.tsx        ← AI trigger button with loading state
│   │   └── CodeToolbar.tsx           ← Copy, download, run actions
│   │
│   └── topbar/
│       ├── Topbar.tsx
│       ├── ProjectName.tsx
│       └── ActionButtons.tsx
│
├── store/
│   ├── graphStore.ts                 ← Zustand store: blocks, connections, selection
│   ├── uiStore.ts                    ← Panel state, modal visibility, theme
│   └── codeStore.ts                  ← Generated code, generation status
│
├── lib/
│   ├── blockRegistry.ts              ← Block type definitions and port schemas
│   ├── graphSerializer.ts            ← Graph → JSON serialisation
│   ├── graphValidator.ts             ← DAG validation, type checking
│   ├── topologicalSort.ts            ← Kahn's algorithm for DAG ordering
│   ├── claudeApi.ts                  ← Claude API integration
│   └── autoLayout.ts                 ← Dagre layout integration
│
├── types/
│   ├── Block.ts
│   ├── Port.ts
│   ├── Connection.ts
│   └── Graph.ts
│
└── constants/
    ├── portTypes.ts                  ← Port type definitions and colours
    ├── blockLibrary.ts               ← Full block catalogue definitions
    └── keyboardShortcuts.ts
```

---

## 16. Future Scope

### Phase 2 Features
- **Live Execution Mode:** Run the generated pipeline directly in the browser via a Python backend WebSocket, with live frame previews streamed back to the canvas
- **Per-Block Preview:** When in live mode, each block shows a thumbnail preview of its output frame — akin to Blender's shader node previews
- **Version History:** Git-style graph versioning with diff view between graph versions
- **Collaboration Mode:** Real-time multi-user canvas editing via WebSocket (Figma-style cursors)

### Phase 3 Features
- **Custom Block Builder:** A form-based interface for users to define their own custom blocks and publish them to a community library
- **Pipeline Marketplace:** A shared library of community-contributed pipeline templates
- **Export Formats:** Export graph as draw.io XML, Mermaid diagram, or PDF architecture document
- **Performance Profiler:** Annotate each block in the generated code with timing instrumentation and display a flame graph of pipeline stage latencies

### AI Enhancements
- **Graph Suggestion:** AI analyses a partial graph and suggests the next most likely block to add
- **Error Explanation:** If generated code fails to run, AI explains the error and suggests graph modifications
- **Pipeline Optimiser:** AI analyses the graph and suggests preprocessing reordering or redundant block removal for improved performance

---

## 17. Glossary

| Term | Definition |
|---|---|
| **DAG** | Directed Acyclic Graph — a graph with directed edges and no cycles; the underlying data structure of the pipeline |
| **Node / Block** | A self-contained functional unit in the pipeline, displayed as a card on the canvas |
| **Port** | A typed connection point on a block; inputs receive data, outputs emit data |
| **Edge / Connection** | A directed link from an output port to an input port, representing data flow |
| **Port Type** | The data type constraint on a port (e.g., `frame`, `bounding_box`, `text`) |
| **Block Registry** | The master catalogue of all available block types and their definitions |
| **Graph JSON** | The serialised representation of the current workbench state, used for saving and AI prompting |
| **Topological Sort** | An ordering of DAG nodes such that every node appears before the nodes it points to — used to determine code generation order |
| **React Flow** | The open-source JavaScript library used as the canvas and node-graph engine |
| **Workbench** | The central canvas area where blocks are placed and connected |
| **Block Inspector** | The right-panel form that appears when a block is selected, showing its configurable properties |
| **Code Panel** | The right-panel section displaying the AI-generated Python code |
| **Auto-Layout** | Automatic arrangement of blocks on the canvas using the Dagre hierarchical layout algorithm |

---

*This concept document describes the intended design of this workbench at version 1.0.0. Implementation details are subject to refinement during development sprints. For the related system context, refer to: **ANPR System PRD v1.0.0** and **ANPR Technical Abstract v1.0.0**.*

---
**Concept Document End — OpenCV Visual Pipeline Workbench v1.0.0**
