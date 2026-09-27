"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Car,
  Clock,
  Map,
  MapPin,
  Navigation,
  Star,
  Ticket,
  Wifi,
} from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import { getAttractionById } from "@/data/attraction";
import { calculateDistanceInKm, formatDistance } from "@/lib/distance";
import { createGoogleMapsDirectionsUrl } from "@/lib/maps";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function AttractionDetailPage() {
  const params = useParams<{ id: string }>();
  const attraction = getAttractionById(Number(params.id));
  const { latitude, longitude, loading, error, getCurrentLocation } = useGeolocation();

  if (!attraction) {
    return (
      <div className="grid min-h-screen place-items-center px-5 text-center">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Attraction not found</h1>
          <Link
            href="/"
            className="mt-4 inline-flex min-h-12 items-center rounded-full bg-blue-700 px-6 font-bold text-white"
          >
            Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  const distance =
    latitude && longitude
      ? calculateDistanceInKm(latitude, longitude, attraction.latitude, attraction.longitude)
      : null;

  return (
    <div className="bg-slate-50 lg:pb-24">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:pt-8 xl:px-10">
        <section className="relative h-[370px] overflow-hidden lg:h-[500px] lg:rounded-4xl">
          <Image
            src={attraction.image}
            alt={attraction.name}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-slate-950/30" />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between lg:left-6 lg:right-6 lg:top-6">
            <Link
              href="/"
              aria-label="Back to discover"
              className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-slate-950 shadow-lg backdrop-blur lg:h-14 lg:w-14"
            >
              <ArrowLeft size={22} />
            </Link>
            <FavoriteButton id={attraction.id} variant="solid" size="lg" />
          </div>
        </section>

        <section className="relative -mt-10 rounded-t-4xl bg-slate-50 px-5 pb-8 pt-7 lg:-mt-16 lg:grid lg:grid-cols-3 lg:gap-x-7 lg:rounded-4xl lg:px-8 lg:pb-10 lg:pt-9 lg:shadow-xl lg:shadow-slate-900/5 xl:px-10">
          <div className="flex items-start justify-between gap-3 lg:col-span-3">
            <div>
              <h1 className="text-3xl font-black leading-tight text-slate-950 lg:text-5xl">{attraction.name}</h1>
              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-blue-800 lg:text-base">
                <MapPin size={17} /> {attraction.location}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-2xl bg-amber-100 px-3 py-2 font-black text-slate-950 lg:px-4 lg:py-3 lg:text-lg">
              <Star size={17} fill="currentColor" className="text-amber-500" /> {attraction.rating}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 lg:col-span-3">
            <span className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-black uppercase text-white">
              {attraction.category}
            </span>
            <span className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800">
              {attraction.openingHours}
            </span>
          </div>

          <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-5 lg:col-span-1 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-700 text-white">
                <Navigation size={26} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">Real-time Distance</p>
                {distance !== null ? (
                  <p className="text-lg font-black text-blue-800">{formatDistance(distance)} away</p>
                ) : (
                  <p className="text-sm text-slate-600">Use your simulated browser location.</p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={loading}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-blue-700 px-4 font-bold text-white shadow-lg shadow-blue-700/20 disabled:opacity-60"
            >
              {loading ? "Reading Location..." : "Calculate My Distance"}
            </button>
            {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
          </div>

          <section className="mt-8 lg:col-span-2 lg:mt-6 lg:rounded-3xl lg:bg-white lg:p-7 lg:ring-1 lg:ring-slate-200">
            <h2 className="text-2xl font-black text-slate-950 lg:text-3xl">Overview</h2>
            <p className="mt-4 text-base leading-8 text-slate-600 lg:text-[17px]">{attraction.description}</p>
          </section>

          <section className="mt-8 lg:col-span-3 lg:mt-7">
            <h2 className="text-2xl font-black text-slate-950 lg:text-3xl">Features</h2>
            <div className="mt-4 grid grid-cols-3 gap-3 lg:gap-5">
              {[
                { icon: Car, label: "Parking" },
                { icon: Wifi, label: "Travel Info" },
                { icon: Ticket, label: attraction.entryFee },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="grid min-h-24 place-items-center rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm lg:min-h-32 lg:rounded-3xl lg:p-5"
                >
                  <Icon className="text-blue-700" size={24} />
                  <span className="mt-1 text-xs font-bold text-slate-700 lg:text-sm">{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 lg:col-span-2 lg:mt-9">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-950 lg:text-3xl">Gallery</h2>
              <span className="text-sm font-bold text-blue-700">See all</span>
            </div>
            <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto lg:grid lg:grid-cols-2 lg:overflow-visible">
              {attraction.gallery.map((image) => (
                <div key={image} className="relative h-36 w-56 shrink-0 overflow-hidden rounded-2xl lg:h-52 lg:w-auto lg:rounded-3xl">
                  <Image
                    src={image}
                    alt={`${attraction.name} gallery`}
                    fill
                    sizes="(max-width: 1023px) 224px, 380px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 lg:col-span-1 lg:mt-9">
            <h2 className="text-2xl font-black text-slate-950 lg:text-3xl">Visitor Tips</h2>
            <div className="mt-4 space-y-3">
              {attraction.tips.map((tip) => (
                <div key={tip} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 lg:p-5">
                  <BadgeCheck className="shrink-0 text-emerald-700" size={20} />
                  <p className="text-sm leading-6 text-slate-600">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>

      <div className="sticky bottom-20 z-20 border-t border-slate-200 bg-white/95 px-5 py-4 backdrop-blur lg:fixed lg:bottom-0 lg:left-[280px] lg:right-0 lg:border-t lg:px-8">
        <div className="flex gap-3 lg:mx-auto lg:max-w-7xl lg:justify-end">
          <a
            href={createGoogleMapsDirectionsUrl(
              attraction.latitude,
              attraction.longitude,
              latitude,
              longitude,
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-blue-700 px-5 font-black text-white shadow-lg shadow-blue-700/25 lg:max-w-sm lg:flex-none lg:px-8"
          >
            <Clock size={18} /> Get Directions
          </a>
          <a
            href={createGoogleMapsDirectionsUrl(
              attraction.latitude,
              attraction.longitude,
              latitude,
              longitude,
            )}
            target="_blank"
            rel="noreferrer"
            aria-label="Open map"
            className="grid h-14 w-14 place-items-center rounded-full border border-blue-200 bg-blue-50 text-blue-800"
          >
            <Map size={22} />
          </a>
        </div>
      </div>
    </div>
  );
}
