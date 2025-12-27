import { AutomationRunner } from "@/components/automation-runner";
import { PipelineMap } from "@/components/pipeline-map";
import { ToolsGrid } from "@/components/tools-grid";
import { TrendingBoard } from "@/components/trending-board";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-[#050d0a] to-[#04120c] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(20,83,45,0.35),_transparent_60%)]" />
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-16">
        <section className="rounded-3xl border border-emerald-500/30 bg-black/40 p-10 shadow-[0_0_120px_-40px_rgba(16,185,129,0.6)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
            Agentic Automation Stack
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-6xl">
            Launch a ₹1,00,000/mo faceless YouTube empire with zero filming,
            zero voice, pure AI control.
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">
            This dashboard orchestrates research, scripting, editing, narration,
            and publishing to{" "}
            <span className="font-semibold text-emerald-200">
              youtube.com/@SFS0002
            </span>{" "}
            using a swarm of under-the-radar AI agents. Hit launch, collect
            artifacts, or schedule daily drops — every flow ships production-ready
            Shorts and long-form uploads.
          </p>
        </section>
        <AutomationRunner />
        <PipelineMap />
        <TrendingBoard />
        <ToolsGrid />
      </main>
    </div>
  );
}
