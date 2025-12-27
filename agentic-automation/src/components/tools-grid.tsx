"use client";

import { hiddenTools } from "@/lib/tools";

export function ToolsGrid() {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-lg">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
          Secret AI arsenal
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Tools nobody talks about (but you should deploy)
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Stack these to keep edits fully automated and outperform every faceless channel grinding the same prompts.
        </p>
      </header>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {hiddenTools.map((tool) => (
          <article
            key={tool.name}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-400/60 hover:bg-emerald-400/10"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                {tool.pricingHint}
              </span>
            </div>
            <p className="mt-2 text-sm text-white/80">{tool.tagline}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Why it hits different
            </p>
            <p className="mt-1 text-sm text-white/70">{tool.differentiator}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Plug it into
            </p>
            <p className="mt-1 text-sm text-white/70">{tool.stackSynergy}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
              {tool.idealFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
            <a
              className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-300 hover:text-emerald-200"
              href={tool.url}
              target="_blank"
              rel="noreferrer"
            >
              Launch tool ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
