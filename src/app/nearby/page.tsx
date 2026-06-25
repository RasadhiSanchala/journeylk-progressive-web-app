"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Crosshair, Loader2, LocateFixed, MapPin, Navigation, Route, Star } from "lucide-react";
import TopBar from "@/components/TopBar";
import { attractions } from "@/data/attraction";
import { calculateDistanceInKm, formatDistance } from "@/lib/distance";
import { createGoogleMapsDirectionsUrl } from "@/lib/maps";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function NearbyPage() {
  const { latitude, longitude, loading, error, getCurrentLocation } = useGeolocation();

  // Automatically request the user's location when the Nearby page is opened.
  // This makes the page immediately show the nearest attractions after permission is allowed.
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const attractionsWithDistance = useMemo(
    () =>
      attractions
        .map((attraction) => ({
          attraction,
          distance:
            latitude && longitude
              ? calculateDistanceInKm(latitude, longitude, attraction.latitude, attraction.longitude)
              : null,
        }))
        .sort((first, second) =>
          (first.distance ?? Number.MAX_SAFE_INTEGER) - (second.distance ?? Number.MAX_SAFE_INTEGER),
        ),
    [latitude, longitude],
  );

  const nearestAttraction = attractionsWithDistance[0]?.attraction;
  const nearestDistance = attractionsWithDistance[0]?.distance;
  const nearbyPlaces = attractionsWithDistance.slice(0, 5);
  const hasLocation = latitude !== null && longitude !== null;

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />

      <section className="px-5 pb-5 pt-7">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">Nearby</p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950">Places closest to you</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          JourneyLK uses your browser location to sort attractions by real-time distance.
        </p>
      </section>

      <section className="mx-5 rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-5 text-white shadow-xl shadow-blue-900/20">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
            {loading ? <Loader2 className="animate-spin" size={27} /> : <LocateFixed size={27} />}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-black">
              {loading ? "Detecting your location..." : hasLocation ? "Location detected" : "Location needed"}
            </h2>
            <p className="mt-1 text-sm leading-5 text-blue-50">
              {hasLocation
                ? "Nearest places are sorted using your current coordinates."
                : "Allow location access to calculate nearby attractions automatically."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 font-black text-blue-800 shadow-lg shadow-blue-950/10 disabled:opacity-70"
        >
          <Crosshair size={20} />
          {loading ? "Reading Location..." : hasLocation ? "Refresh My Location" : "Use My Location"}
        </button>

        {error && <p className="mt-3 rounded-2xl bg-white/15 p-3 text-sm font-semibold text-white">{error}</p>}
      </section>

      {nearestAttraction && (
        <section className="mx-5 mt-5 rounded-[2rem] bg-white p-4 shadow-md shadow-slate-900/8 ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Nearest attraction</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">{nearestAttraction.name}</h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-2xl bg-amber-100 px-3 py-2 text-sm font-black text-slate-950">
              <Star size={16} fill="currentColor" className="text-amber-500" /> {nearestAttraction.rating}
            </span>
          </div>

          <div className="mt-4 flex gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl">
              <Image
                src={nearestAttraction.image}
                alt={nearestAttraction.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm leading-6 text-slate-600">{nearestAttraction.shortDescription}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
                  {nearestAttraction.category}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  {nearestDistance !== null ? `${formatDistance(nearestDistance)} away` : "Distance unavailable"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href={`/attractions/${nearestAttraction.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-black text-white"
            >
              View Details
            </Link>
            <a
              href={createGoogleMapsDirectionsUrl(
                nearestAttraction.latitude,
                nearestAttraction.longitude,
                latitude,
                longitude,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-4 text-sm font-black text-white"
            >
              <Navigation size={17} /> Directions
            </a>
          </div>
        </section>
      )}

      <section className="px-5 pb-6 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-950">Nearby attractions</h2>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
            <Route size={16} /> Sorted by distance
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {nearbyPlaces.map(({ attraction, distance }, index) => (
            <Link
              key={attraction.id}
              href={`/attractions/${attraction.id}`}
              className="flex min-h-24 items-center gap-4 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-blue-50 text-sm font-black text-blue-800">
                {index + 1}
              </div>
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-black text-slate-950">{attraction.name}</h3>
                <p className="mt-1 flex items-center gap-1 truncate text-sm text-slate-600">
                  <MapPin size={15} /> {attraction.city} • {attraction.category}
                </p>
                <p className="mt-1 text-sm font-black text-blue-700">
                  {distance !== null ? `${formatDistance(distance)} away` : "Allow location to calculate distance"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}