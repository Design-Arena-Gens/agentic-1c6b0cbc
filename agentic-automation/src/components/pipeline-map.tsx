const steps = [
  {
    id: "research",
    title: "Multi-source trend radar",
    description:
      "Scrapes Google Trends, Product Hunt, Hacker News, and YouTube trending in under 3 seconds with dedupe scoring.",
    metric: "10 feeds",
    accent: "from-sky-500 to-emerald-500",
  },
  {
    id: "script",
    title: "AI scriptwriter",
    description:
      "Calls GPT-4.1-mini with viral hook prompt engineering tuned for ₹1L/month monetization funnels.",
    metric: "2 scripts",
    accent: "from-emerald-500 to-lime-400",
  },
  {
    id: "voice",
    title: "Synthetic narration",
    description:
      "Leverages GPT-4o-mini-TTS for bilingual pacing; falls back to manual templates if API key missing.",
    metric: "2 voiceovers",
    accent: "from-lime-400 to-amber-400",
  },
  {
    id: "render",
    title: "FFmpeg waveform reels",
    description:
      "Builds vertical Shorts and horizontal long-form exports with retina waveforms and faststart metadata.",
    metric: "MP4 + AAC",
    accent: "from-amber-400 to-rose-400",
  },
  {
    id: "upload",
    title: "One-click upload",
    description:
      "Uses YouTube Data API with OAuth refresh token to publish instantly — when credentials are provided.",
    metric: "Ready",
    accent: "from-rose-400 to-fuchsia-500",
  },
];

export function PipelineMap() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.35em] text-white/70">
        Automation topology
      </p>
      <h2 className="mt-2 text-3xl font-bold text-white">
        Agent stack to print ₹1L/month without filming
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {steps.map((step) => (
          <article
            key={step.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-emerald-400/60"
          >
            <div
              className={`absolute -right-12 -top-12 h-24 w-24 rotate-12 rounded-full bg-gradient-to-br opacity-40 group-hover:opacity-70 ${step.accent}`}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
              {step.metric}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-white/70">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
