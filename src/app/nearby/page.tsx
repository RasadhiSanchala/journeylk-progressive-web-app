"use client";

import Link from "next/link";
import { Crosshair, Layers, MapPin, Navigation, Trees } from "lucide-react";
import TopBar from "@/components/TopBar";
import { attractions } from "@/data/attraction";
import { calculateDistanceInKm, formatDistance } from "@/lib/distance";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function NearbyPage() {
  const { latitude, longitude, loading, error, getCurrentLocation } = useGeolocation();

  const attractionsWithDistance = attractions
    .map((attraction) => ({
      attraction,
      distance:
        latitude && longitude
          ? calculateDistanceInKm(latitude, longitude, attraction.latitude, attraction.longitude)
          : null,
    }))
    .sort((first, second) => (first.distance ?? Number.MAX_SAFE_INTEGER) - (second.distance ?? Number.MAX_SAFE_INTEGER));

  const selectedAttraction = attractionsWithDistance[0]?.attraction;
  const selectedDistance = attractionsWithDistance[0]?.distance;

  return (
    <div className="min-h-screen bg-sky-100">
      <TopBar />
      <section className="relative h-[calc(100vh-9rem)] overflow-hidden map-grid">
        <button
          type="button"
          aria-label="Map layers"
          className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-slate-800 shadow-lg"
        >
          <Layers size={23} />
        </button>

        <div className="absolute left-[30%] top-[34%] grid h-12 w-12 place-items-center rounded-full bg-emerald-700 text-white shadow-lg ring-4 ring-white/70">
          <Trees size={22} />
        </div>
        <div className="absolute right-[20%] top-[56%] grid h-12 w-12 place-items-center rounded-full bg-amber-400 text-slate-950 shadow-lg ring-4 ring-white/70">
          <MapPin size={22} />
        </div>
        <div className="absolute left-[48%] top-[47%] grid h-14 w-14 place-items-center rounded-full bg-white/70 shadow-xl">
          <div className="h-9 w-9 rounded-full bg-blue-700 ring-4 ring-white" />
        </div>

        <button
          type="button"
          onClick={getCurrentLocation}
          className="absolute bottom-32 right-5 z-10 grid h-16 w-16 place-items-center rounded-full bg-blue-700 text-white shadow-xl shadow-blue-900/30"
        >
          <Crosshair size={28} />
        </button>

        <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/95 p-4 shadow-2xl shadow-slate-900/20 backdrop-blur">
          {selectedAttraction ? (
            <Link href={`/attractions/${selectedAttraction.id}`} className="flex items-center gap-4">
              <img src={selectedAttraction.image} alt={selectedAttraction.name} className="h-20 w-20 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="truncate text-lg font-semibold text-slate-950">{selectedAttraction.name}</h2>
                  <span className="shrink-0 text-sm font-bold text-amber-700">{selectedAttraction.rating} ★</span>
                </div>
                <p className="mt-1 line-clamp-1 text-slate-600">{selectedAttraction.shortDescription}</p>
                <p className="mt-2 flex items-center gap-1 text-sm font-black text-blue-700">
                  <Navigation size={16} />
                  {selectedDistance !== null ? formatDistance(selectedDistance) : "Tap target to use location"}
                </p>
              </div>
            </Link>
          ) : (
            <p className="text-slate-600">No nearby places available.</p>
          )}
          {loading && <p className="mt-3 text-sm text-blue-700">Getting your simulated location...</p>}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      </section>
    </div>
  );
}
