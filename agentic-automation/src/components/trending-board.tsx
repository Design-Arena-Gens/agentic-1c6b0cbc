/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export interface TrendingTopic {
  id: string;
  source: string;
  title: string;
  summary?: string;
  url?: string;
  thumbnail?: string;
  publishedAt?: string;
  score?: number;
}

interface TrendingBoardProps {
  initialTopics?: TrendingTopic[];
}

interface TrendingResponse {
  success: boolean;
  topics: TrendingTopic[];
}

export function TrendingBoard({ initialTopics = [] }: TrendingBoardProps) {
  const [topics, setTopics] = useState<TrendingTopic[]>(initialTopics);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trending");
      if (!res.ok) {
        throw new Error(`Request failed with ${res.status}`);
      }

      const data = (await res.json()) as TrendingResponse;
      if (!data.success) {
        throw new Error("API error");
      }

      setTopics(data.topics);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!topics.length) {
      refresh();
    }
  }, []);

  const grouped = useMemo(() => {
    const buckets: Record<string, TrendingTopic[]> = {};
    topics.forEach((topic) => {
      const sourceLabel = topic.source?.split(",")[0]?.trim() ?? "Global Radar";
      buckets[sourceLabel] ??= [];
      buckets[sourceLabel].push(topic);
    });
    return Object.entries(buckets);
  }, [topics]);

  return (
    <section className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl shadow-emerald-500/10 ring-1 ring-white/10 backdrop-blur-xl">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Trend Radar
          </p>
          <h2 className="text-2xl font-bold text-white">
            Today&apos;s monetizable spikes
          </h2>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="rounded-full border border-emerald-500/50 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Sync now"}
        </button>
      </header>
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Failed to refresh: {error}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {grouped.map(([source, items]) => (
          <div key={source} className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
              {source}
            </p>
            <ul className="mt-3 space-y-3">
              {items.map((topic) => (
                <li key={topic.id} className="rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-emerald-400/60 hover:bg-emerald-400/10">
                  <p className="text-sm font-semibold text-white">
                    {topic.title}
                  </p>
                  {topic.summary ? (
                    <p className="mt-1 text-xs text-white/70">
                      {topic.summary.slice(0, 160)}
                      {topic.summary.length > 160 ? "…" : ""}
                    </p>
                  ) : null}
                  <div className="mt-2 flex items-center justify-between text-xs text-white/50">
                    <span>{new Date(topic.publishedAt ?? Date.now()).toLocaleString()}</span>
                    {topic.url && (
                      <a
                        className="font-semibold text-emerald-300 hover:text-emerald-200"
                        href={topic.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open source ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
