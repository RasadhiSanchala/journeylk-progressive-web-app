"use client";

import { BookmarkCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import FavoriteButton from "@/components/FavoriteButton";
import TopBar from "@/components/TopBar";
import { useFavorites } from "@/components/FavoritesProvider";
import { attractions } from "@/data/attraction";

export default function FavoritesPage() {
  const { favorites, mounted, removeFavorite } = useFavorites();
  const favoriteAttractions = attractions.filter((attraction) => favorites.includes(attraction.id));

  return (
    <div>
      <TopBar />
      <section className="px-5 pb-4 pt-7">
        <h1 className="text-3xl font-black text-slate-950">My Favorites</h1>
        <div className="mt-4 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-600">
          <BookmarkCheck className="mt-0.5 shrink-0 text-blue-700" size={20} />
          <p>Saved places are stored securely in your browser using LocalStorage and remain after refresh.</p>
        </div>
      </section>

      {!mounted && <div className="mx-5 h-64 animate-pulse rounded-3xl bg-slate-200" />}

      {mounted && favoriteAttractions.length === 0 && (
        <div className="pt-10">
          <EmptyState
            title="No favorites yet"
            message="Start exploring and save your top spots. Your curated travel list will appear here."
            actionLabel="Discover Places"
            actionHref="/"
          />
        </div>
      )}

      {mounted && favoriteAttractions.length > 0 && (
        <section className="space-y-5 px-5 pb-8">
          {favoriteAttractions.map((attraction) => (
            <article
              key={attraction.id}
              className="overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-900/8 ring-1 ring-slate-200"
            >
              <div className="relative h-60">
                <img src={attraction.image} alt={attraction.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute left-4 top-4 rounded-lg bg-amber-400 px-3 py-2 text-xs font-black text-slate-900">
                  {attraction.category}
                </span>
                <div className="absolute right-4 top-4">
                  <FavoriteButton id={attraction.id} variant="solid" />
                </div>
                <h2 className="absolute bottom-5 left-5 text-2xl font-black text-white">{attraction.name}</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-blue-800">{attraction.location}</p>
                  <p className="font-bold text-amber-600">★ {attraction.rating}</p>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{attraction.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <button
                    type="button"
                    onClick={() => removeFavorite(attraction.id)}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full px-2 text-sm font-bold text-red-600"
                  >
                    <Trash2 size={17} /> Remove
                  </button>
                  <Link
                    href={`/attractions/${attraction.id}`}
                    className="inline-flex min-h-12 items-center rounded-full bg-blue-700 px-6 text-sm font-bold text-white shadow-lg shadow-blue-700/20"
                  >
                    View Guide
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
