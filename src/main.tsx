import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";
import { AppShell } from "./app/AppShell";
import "./styles.css";
import "reactflow/dist/style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <AppShell />
    </ReactFlowProvider>
  </React.StrictMode>,
);
