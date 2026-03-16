import { LeftSidebar } from "../components/layout/LeftSidebar";
import { RightPanel } from "../components/layout/RightPanel";
import { Topbar } from "../components/layout/Topbar";
import { WorkbenchCanvas } from "../components/canvas/WorkbenchCanvas";

export function AppShell() {
  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900">
      <Topbar />
      <main className="grid flex-1 grid-cols-[320px_1fr_380px] gap-6 p-6 overflow-hidden">
        <LeftSidebar />
        <section className="overflow-hidden rounded-xl border-2 border-accent bg-white shadow-lg relative h-full">
          <WorkbenchCanvas />
        </section>
        <RightPanel />
      </main>
    </div>
  );
}
