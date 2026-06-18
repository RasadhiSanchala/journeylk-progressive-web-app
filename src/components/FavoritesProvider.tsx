"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readJsonFromStorage, writeJsonToStorage } from "@/lib/storage";

const FAVORITES_STORAGE_KEY = "journeylk:favorites";

interface FavoritesContextValue {
  favorites: number[];
  favoritesCount: number;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  mounted: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(readJsonFromStorage<number[]>(FAVORITES_STORAGE_KEY, []));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    writeJsonToStorage(FAVORITES_STORAGE_KEY, favorites);
  }, [favorites, mounted]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((favoriteId) => favoriteId !== id)
        : [...currentFavorites, id],
    );
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((currentFavorites) => currentFavorites.filter((favoriteId) => favoriteId !== id));
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      favoritesCount: favorites.length,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      mounted,
    }),
    [favorites, isFavorite, mounted, removeFavorite, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider.");
  }

  return context;
}
