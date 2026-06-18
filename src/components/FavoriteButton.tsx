"use client";

import { Bookmark } from "lucide-react";
import { useFavorites } from "@/components/FavoritesProvider";

interface FavoriteButtonProps {
  id: number;
  variant?: "solid" | "glass";
  size?: "sm" | "lg";
}

export default function FavoriteButton({ id, variant = "glass", size = "sm" }: FavoriteButtonProps) {
  const { isFavorite, mounted, toggleFavorite } = useFavorites();

  if (!mounted) {
    return (
      <span className="block h-12 w-12 animate-pulse rounded-full bg-white/50" aria-hidden="true" />
    );
  }

  const active = isFavorite(id);
  const buttonSize = size === "lg" ? "h-14 w-14" : "h-12 w-12";
  const activeClass = active ? "bg-blue-700 text-white" : "bg-white/90 text-slate-700";
  const glassClass = active ? "bg-blue-700 text-white" : "bg-white/75 text-slate-700 backdrop-blur";

  return (
    <button
      type="button"
      aria-label={active ? "Remove from saved places" : "Save this place"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(id);
      }}
      className={`grid ${buttonSize} place-items-center rounded-full shadow-lg transition hover:scale-105 ${
        variant === "solid" ? activeClass : glassClass
      }`}
    >
      <Bookmark size={size === "lg" ? 24 : 20} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
