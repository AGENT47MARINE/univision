# Frontend Implementation Plan
## OpenCV Visual Pipeline Workbench

This document refines the original concept in `frontend_concept.md` into a practical, frontend-only build plan. It keeps the product direction intact while narrowing the initial implementation to the editor experience we can ship confidently without backend dependencies.

---

## 1. Frontend-Only Scope

The first implementation should focus on the browser application only:

- Workbench layout and navigation
- Block palette and search
- Canvas-based node editing
- Port and connection validation
- Block inspector and config editing
- Graph serialization, save, and load
- Mocked code generation panel
- Keyboard shortcuts and editor usability

The following should be deferred from the initial build:

- Real API-based AI code generation
- Running Python code from the UI
- Live execution previews
- Collaboration features
- Marketplace and community sharing
- Full custom block builder

This keeps the first version focused on proving the core editor workflow.

---

## 2. Recommended Product Changes

### 2.1 Reduce the initial block catalogue

The original concept includes a very large block library. For the first frontend release, use a smaller curated set of blocks:

- Input: `Image Input`, `Video File`, `RTSP Stream`
- Detection: `YOLO Detector`, `License Plate Detector`
- Preprocessing: `Resize`, `Grayscale`, `Threshold`
- OCR: `EasyOCR`
- Post-Processing: `Regex Validator`
- Output: `Annotator`, `Console Logger`
- Utility: `Comment Node`, `Merge`

This is enough to validate the UX without introducing excessive schema and state complexity.

### 2.2 Treat code generation as an interface, not a built feature

For the frontend phase, the app should not depend on a live AI provider. Instead:

- Define a `generateCode(graph)` adapter interface
- Mock the response locally
- Render loading, success, and validation error states in the code panel

This keeps the frontend integration-ready while avoiding backend coupling.

### 2.3 Use schema-driven block configuration

Avoid building one custom React component per block unless the block truly needs unique UI behavior.

Each block definition should include:

- metadata
- input and output ports
- default config
- config field schema
- validation rules

This allows the inspector UI to render dynamically and keeps the system maintainable.

### 2.4 Make the right panel tab-based for MVP

Instead of splitting the right panel vertically between inspector and code viewer, use tabs:

- `Inspector`
- `Code`

This improves readability on laptop screens and reduces layout pressure.

### 2.5 Add onboarding to reduce editor friction

The workbench needs a better first-run experience:

- starter template cards
- empty canvas hint
- quick-add modal on double-click
- short shortcut hint overlay

This will make the tool feel much more approachable.

---

## 3. Frontend Architecture

### 3.1 Core stack

- React 18 + TypeScript
- Vite
- React Flow
- Zustand
- Tailwind CSS
- CSS Modules for complex node styling
- Monaco Editor
- Framer Motion
- Dagre
- Vitest + React Testing Library

### 3.2 Architecture principles

- The graph JSON is the source of truth
- UI state is separate from graph state
- Block definitions live in a registry
- Validation happens before code generation
- Save/load format must remain stable from the start

---

## 4. Proposed File Structure

```text
src/
  app/
    AppShell.tsx
    routes.tsx
  components/
    canvas/
      WorkbenchCanvas.tsx
      CanvasToolbar.tsx
      CustomConnectionLine.tsx
      WorkbenchMiniMap.tsx
    blocks/
      BlockNode.tsx
      BlockPort.tsx
      BlockStatusBadge.tsx
      BlockCategoryBar.tsx
    palette/
      BlockPalette.tsx
      BlockPaletteSearch.tsx
      BlockCategorySection.tsx
      BlockPaletteItem.tsx
      TemplateLibrary.tsx
    inspector/
      BlockInspector.tsx
      ConfigFieldRenderer.tsx
      fields/
        TextField.tsx
        NumberField.tsx
        SelectField.tsx
        ToggleField.tsx
        JsonField.tsx
    code/
      CodePanel.tsx
      CodeToolbar.tsx
      GenerateCodeButton.tsx
    layout/
      Topbar.tsx
      LeftSidebar.tsx
      RightPanel.tsx
    feedback/
      EmptyState.tsx
      ToastHost.tsx
      ValidationPanel.tsx
  store/
    graphStore.ts
    uiStore.ts
    historyStore.ts
    codeStore.ts
  lib/
    blockRegistry.ts
    graphSerializer.ts
    graphValidator.ts
    cycleDetection.ts
    autoLayout.ts
    mockCodeGenerator.ts
  types/
    graph.ts
    block.ts
    port.ts
    connection.ts
    configSchema.ts
  constants/
    categories.ts
    portTypes.ts
    keyboardShortcuts.ts
    templates.ts
```

---

## 5. Implementation Phases

### Phase 1: Foundation

Goal: establish the shell, types, and state model.

Tasks:

- initialize Vite React TypeScript app
- set up Tailwind, base theme tokens, and layout primitives
- define all TypeScript domain types
- create the block registry format
- build Zustand stores for graph, UI, and code state
- define sample starter templates

Deliverable:

- static shell with left panel, canvas area, and right panel tabs

### Phase 2: Canvas Editor MVP

Goal: make the workbench interactive.

Tasks:

- integrate React Flow
- support drag-drop block creation from palette
- support node move, select, multi-select, and delete
- support edge creation and removal
- add minimap, zoom, fit view, and grid background
- build reusable `BlockNode` and `BlockPort`

Deliverable:

- users can visually build a graph on the canvas

### Phase 3: Validation and Inspector

Goal: make the graph semantically correct and editable.

Tasks:

- implement same-type port validation
- enforce one connection per input
- block self-loops
- detect DAG cycles
- build schema-driven inspector form renderer
- update node status from validation state

Deliverable:

- users can configure blocks and receive real-time graph validation

### Phase 4: Save, Load, and Templates

Goal: make the editor persistent and reusable.

Tasks:

- serialize graph to JSON
- load graph from JSON
- autosave to local storage
- add import/export project actions
- add starter pipeline templates

Deliverable:

- users can save, restore, and start from templates

### Phase 5: Code Panel and UX Polish

Goal: make the frontend feel complete before backend integration.

Tasks:

- integrate Monaco Editor
- create mocked code generation adapter
- show validation errors before generation
- add loading and success states
- implement keyboard shortcuts
- add context menus and duplicate action
- add auto-layout using Dagre
- add helpful empty and onboarding states

Deliverable:

- polished frontend-only prototype ready for backend hookup

---

## 6. Suggested MVP Feature Set

The MVP should include only the following:

- desktop-first three-panel layout
- searchable block palette
- draggable block placement
- typed connections
- validation feedback
- inspector-driven config editing
- graph save/load
- templates
- mocked code generation
- undo/redo
- keyboard shortcuts

The MVP should exclude:

- execution mode
- authentication
- cloud save
- collaboration
- per-block previews
- full library coverage

---

## 7. State Model

Use separate stores for clear responsibility boundaries.

### Graph store

Holds:

- blocks
- connections
- selected block ids
- viewport snapshot

Actions:

- add block
- update block
- remove block
- connect ports
- disconnect edge
- duplicate selection
- import graph
- export graph

### UI store

Holds:

- active right-panel tab
- palette search query
- collapsed sidebar state
- modal and toast state

### Code store

Holds:

- generated code
- generation status
- generation errors

### History store

Holds:

- undo stack
- redo stack

---

## 8. Validation Rules for MVP

The frontend validator should implement these first:

- source and target port types must match
- one input port accepts only one incoming connection
- output ports may fan out to multiple targets
- a block cannot connect to itself
- cycles are invalid
- required config fields must be present before generation

The validator should return structured errors tied to:

- block id
- port id
- connection id
- human-readable message

---

## 9. UX Recommendations

### Layout

- Keep the left palette collapsible
- Use tabs in the right panel instead of a stacked split
- Keep the canvas visually dominant

### Onboarding

- show an empty-state hint on first load
- offer 2 to 3 templates
- support double-click quick-add

### Performance

- keep node components lightweight
- avoid unnecessary block-specific components
- derive expensive graph computations outside render paths

### Accessibility

- keyboard access for primary actions
- visible focus states
- readable contrast in the node cards and ports

---

## 10. Testing Plan

Prioritize tests around behavior rather than visuals.

### Unit tests

- graph serialization
- graph validation
- cycle detection
- block registry config parsing
- store actions

### Integration tests

- dragging a block from palette to canvas
- connecting compatible ports
- rejecting invalid connections
- editing config in inspector updates node state
- save/load restores graph correctly

---

## 11. Final Recommendation

The best path is to build this as a frontend graph editor first, not as a full platform. The strongest first version is a polished node-based workbench with a smaller block library, schema-driven forms, stable graph JSON, and a mocked code-generation experience.

That approach will:

- reduce delivery risk
- make the UI testable early
- avoid premature backend coupling
- give a clean base for later AI and execution integration

---

## 12. Immediate Next Steps

1. Set up the React + TypeScript + Vite frontend project.
2. Define the graph types and block registry schema.
3. Implement the app shell and React Flow canvas.
4. Build the inspector and validation layer.
5. Add save/load and mocked code generation.

This should be treated as the frontend build baseline going forward.
