"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import AttractionCard from "@/components/AttractionCard";
import AttractionListItem from "@/components/AttractionListItem";
import CategoryFilter from "@/components/CategoryFilter";
import EmptyState from "@/components/EmptyState";
import TopBar from "@/components/TopBar";
import type { Attraction, AttractionCategory } from "@/types";

export default function DiscoverPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<AttractionCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAttractions() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (selectedCategory !== "All") params.set("category", selectedCategory);
        if (searchQuery.trim()) params.set("search", searchQuery.trim());

        const response = await fetch(`/api/attractions?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load attractions.");
        }

        const data = (await response.json()) as Attraction[];
        setAttractions(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setError(error instanceof Error ? error.message : "Unexpected loading error.");
      } finally {
        setLoading(false);
      }
    }

    loadAttractions();

    return () => controller.abort();
  }, [selectedCategory, searchQuery]);

  const featuredAttractions = useMemo(() => attractions.slice(0, 2), [attractions]);
  const recentlyAdded = useMemo(() => attractions.slice(2, 6), [attractions]);

  return (
    <div>
      <TopBar />
      <section className="px-5 pt-5">
        <div className="rounded-4xl bg-lienear-to-br from-blue-800 via-blue-700 to-sky-500 p-5 text-white shadow-xl shadow-blue-900/20">
          <p className="text-sm font-semibold text-blue-100">Mobile travel companion</p>
          <h1 className="mt-2 text-3xl font-black leading-tight">Explore Sri Lanka with JourneyLK</h1>
          <p className="mt-3 text-sm leading-6 text-blue-50">
            Browse attractions, filter places, save favorites, check distance, and open directions in maps.
          </p>

          <label className="mt-5 flex min-h-12 items-center gap-3 rounded-2xl bg-white px-4 text-slate-900 shadow-inner">
            <Search size={20} className="text-slate-500" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search city, attraction or category"
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              aria-label="Search attractions"
            />
          </label>
        </div>
      </section>


      <div className="mt-2 flex items-center justify-between px-5">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
          <Filter size={17} /> Categories
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <SlidersHorizontal size={15} /> {attractions.length} results
        </div>
      </div>

      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {loading && (
        <div className="space-y-4 px-5 pt-3">
          <div className="h-56 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-56 animate-pulse rounded-3xl bg-slate-200" />
        </div>
      )}

      {error && (
        <div className="mx-5 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && attractions.length === 0 && (
        <EmptyState
          title="No places found"
          message="Try another category or search keyword to continue exploring."
        />
      )}

      {!loading && !error && attractions.length > 0 && (
        <>
          <section className="px-5 pt-2">
            <h2 className="mb-4 text-2xl font-black text-slate-950">Featured Attractions</h2>
            <div className="space-y-4">
              {featuredAttractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </section>

          <section className="px-5 pt-8">
            <h2 className="mb-4 text-2xl font-black text-slate-950">Recently Added</h2>
            <div className="space-y-3">
              {recentlyAdded.map((attraction) => (
                <AttractionListItem key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
