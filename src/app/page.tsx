"use client";

import { useEffect, useMemo, useState } from "react";
import AttractionCard from "@/components/AttractionCard";
import AttractionListItem from "@/components/AttractionListItem";
import EmptyState from "@/components/EmptyState";
import TopBar from "@/components/TopBar";
import type { Attraction } from "@/types";

export default function DiscoverPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAttractions() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/attractions", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load attractions.");
        }

        const data = (await response.json()) as Attraction[];
        setAttractions(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Unexpected loading error.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadAttractions();

    return () => controller.abort();
  }, []);

  const featuredAttractions = useMemo(
    () => attractions.slice(0, 2),
    [attractions],
  );

  const recentlyAdded = useMemo(
    () => attractions.slice(2, 6),
    [attractions],
  );

  return (
    <div>
      <TopBar />

      <section className="px-5 pt-5">
        <div className="rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-sky-500 p-5 text-white shadow-xl shadow-blue-900/20">
          <p className="text-sm font-semibold text-blue-100">
            Mobile travel companion
          </p>

          <h1 className="mt-2 text-3xl font-black leading-tight">
            Explore Sri Lanka with JourneyLK
          </h1>

          <p className="mt-3 text-sm leading-6 text-blue-50">
            Browse Sri Lankan attractions and open a detailed travel guide for
            each destination.
          </p>
        </div>
      </section>

      {loading && (
        <div className="space-y-4 px-5 pt-6">
          <div className="h-56 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-56 animate-pulse rounded-3xl bg-slate-200" />
        </div>
      )}

      {error && (
        <div className="mx-5 mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && attractions.length === 0 && (
        <EmptyState
          title="No places found"
          message="No attractions are currently available. Please try again later."
        />
      )}

      {!loading && !error && attractions.length > 0 && (
        <>
          <section className="px-5 pt-6">
            <h2 className="mb-4 text-2xl font-black text-slate-950">
              Featured Attractions
            </h2>

            <div className="space-y-4">
              {featuredAttractions.map((attraction) => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                />
              ))}
            </div>
          </section>

          <section className="px-5 pt-8">
            <h2 className="mb-4 text-2xl font-black text-slate-950">
              Recently Added
            </h2>

            <div className="space-y-3">
              {recentlyAdded.map((attraction) => (
                <AttractionListItem
                  key={attraction.id}
                  attraction={attraction}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}