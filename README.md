# UniVision 👁️

### Unified Industrial Computer Vision Platform

**UniVision** is a modular and scalable platform designed to address diverse industrial computer vision challenges. It simplifies the deployment and management of multiple vision applications within a single system, bridging the gap between complex CV models and intuitive industrial workflows.

---

## 🏛️ Project Architecture

UniVision is built on a decoupled architecture for maximum flexibility and performance:

1.  **Visual Pipeline Workbench (Frontend)**: An intuitive, node-based editor for designing computer vision pipelines visually.
2.  **CV Execution Engine (Backend)**: Responsible for executing high-performance models, processing data pipelines, and performing downstream analytics.
3.  **Communication Interface**: A real-time data exchange layer ensuring seamless interaction between the workbench and the deployed vision models.

## 🛠️ Technical Stack

UniVision leverages a modern, industrial-grade technical stack:

### **Frontend (Visual Workbench)**
*   **Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Editor/Canvas**: [React Flow](https://reactflow.dev/) (Canvas interaction) + [Dagre](https://github.com/dagrejs/dagre) (Auto-layout)
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Lightweight, atomic state)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (Animations)
*   **Code Viewer**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (Powering the code generation panel)
*   **Iconography**: [Lucide React](https://lucide.dev/)

### **Backend (Execution Engine)**
*   **Language**: Python 3.x
*   **CV Framework**: [OpenCV](https://opencv.org/)
*   **AI Models**: Support for YOLO-based detectors, EasyOCR, and custom Vision Transformers.
*   **Code Generation**: (Planned) LLM-backed service for automated Python script generation from visual graphs.

---

## 🚀 Key Features

*   **Node-Based Visual Editor**: Drag-and-drop vision concepts (Detectors, Preprocessors, Post-processors) to build complex pipelines without writing code.
*   **Industrial Component Registry**: A schema-driven block library including YOLO, EasyOCR, RTSP stream handling, and more.
*   **Real-time DAG Validation**: Automated validation for port type-safety (e.g., matching frame outputs to frame inputs) and cycle detection.
*   **Automated Code Generation**: Instantly translate visual pipelines into executable Python scripts optimized for industrial environments.
*   **Modular Extensibility**: Easily add custom vision blocks via schema definitions without deep UI modifications.

## 📂 Project Structure

```text
univision/
├── src/                # Frontend source code (React + TypeScript)
│   ├── app/            # App shell and providers
│   ├── components/     # UI components (Blocks, Canvas, Inspector, Palette)
│   ├── lib/            # Core logic (Validation, Serialization, Registry)
│   └── store/          # Zustand state management
├── public/             # Static assets
├── tailwind.config.js  # Styling configuration
└── vite.config.ts      # Build configuration
```

---

## 🔧 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd univision
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```

---

*UniVision aims to improve operational efficiency and accessibility of computer vision solutions in industrial environments.*
