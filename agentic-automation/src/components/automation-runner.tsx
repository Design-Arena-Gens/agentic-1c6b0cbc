"use client";

import { useState } from "react";

interface AutomationRunnerProps {
  defaultUpload?: boolean;
}

interface AutomationResponse {
  success: boolean;
  result?: {
    report: {
      id: string;
      startedAt: string;
      completedAt?: string;
      status: string;
      notes?: string[];
      artifacts: Array<{
        id: string;
        type: string;
        path: string;
        target: string;
      }>;
    };
  };
  error?: string;
}

export function AutomationRunner({ defaultUpload = false }: AutomationRunnerProps) {
  const [generating, setGenerating] = useState(false);
  const [upload, setUpload] = useState(defaultUpload);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trigger = async () => {
    setGenerating(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/run-automation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          upload,
        }),
      });

      const data = (await res.json()) as AutomationResponse;
      if (!data.success) {
        throw new Error(data.error ?? "Pipeline failed");
      }

      const completedAt = data.result?.report.completedAt
        ? new Date(data.result.report.completedAt).toLocaleString()
        : "now";
      const artifactSummary = data.result?.report.artifacts
        .map((artifact) => `${artifact.type.toUpperCase()} → ${artifact.path}`)
        .join("\n");

      setMessage(`Automation finished at ${completedAt}\n${artifactSummary}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 shadow-emerald-500/20">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Launchpad</p>
        <h2 className="text-2xl font-semibold text-white">
          Fire the Agentic YouTube machine
        </h2>
        <p className="text-sm text-white/70">
          Spins up research, scripts, narration, renders, and optionally uploads directly to your channel.
        </p>
      </header>
      <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
        <label className="flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-emerald-500/50 bg-black/20"
            checked={upload}
            onChange={(event) => setUpload(event.target.checked)}
          />
          Auto-upload to YouTube
        </label>
        <span className="text-xs text-white/50">
          Provide OAuth credentials in environment variables to enable.
        </span>
      </div>
      <button
        type="button"
        onClick={trigger}
        disabled={generating}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-500/50"
      >
        {generating ? "Running automation…" : "Launch full pipeline"}
      </button>
      {message && (
        <pre className="mt-4 rounded-2xl bg-black/40 p-4 text-xs text-emerald-200">
          {message}
        </pre>
      )}
      {error && (
        <div className="mt-4 rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}
    </section>
  );
}
