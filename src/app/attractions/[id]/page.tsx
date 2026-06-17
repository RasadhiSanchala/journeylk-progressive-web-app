
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Car,
  MapPin,
  Star,
  Ticket,
  Wifi,
} from "lucide-react";
import { getAttractionById } from "@/data/attraction";

export default function AttractionDetailPage() {
  const params = useParams<{ id: string }>();
  const attraction = getAttractionById(Number(params.id));

  if (!attraction) {
    return (
      <div className="grid min-h-screen place-items-center px-5 text-center">
        <div>
          <h1 className="text-2xl font-black text-slate-950">
            Attraction not found
          </h1>

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

  return (
    <div className="bg-slate-50">
      <section className="relative h-[370px] overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/30" />

        <div className="absolute left-4 top-4">
          <Link
            href="/"
            aria-label="Back to discover"
            className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-slate-950 shadow-lg backdrop-blur"
          >
            <ArrowLeft size={22} />
          </Link>
        </div>
      </section>

      <section className="relative -mt-10 rounded-t-[2rem] bg-slate-50 px-5 pb-8 pt-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black leading-tight text-slate-950">
              {attraction.name}
            </h1>

            <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-blue-800">
              <MapPin size={17} />
              {attraction.location}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1 rounded-2xl bg-amber-100 px-3 py-2 font-black text-slate-950">
            <Star
              size={17}
              fill="currentColor"
              className="text-amber-500"
            />
            {attraction.rating}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-black uppercase text-white">
            {attraction.category}
          </span>

          <span className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800">
            {attraction.openingHours}
          </span>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-950">Overview</h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            {attraction.description}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-950">Features</h2>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Car, label: "Parking" },
              { icon: Wifi, label: "Travel Info" },
              { icon: Ticket, label: attraction.entryFee },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="grid min-h-24 place-items-center rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm"
              >
                <Icon className="text-blue-700" size={24} />

                <span className="mt-1 text-xs font-bold text-slate-700">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-950">Gallery</h2>

            <span className="text-sm font-bold text-blue-700">See all</span>
          </div>

          <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto">
            {attraction.gallery.map((image) => (
              <img
                key={image}
                src={image}
                alt={`${attraction.name} gallery`}
                className="h-36 w-56 shrink-0 rounded-2xl object-cover"
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-950">
            Visitor Tips
          </h2>

          <div className="mt-4 space-y-3">
            {attraction.tips.map((tip) => (
              <div
                key={tip}
                className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                <BadgeCheck
                  className="shrink-0 text-emerald-700"
                  size={20}
                />

                <p className="text-sm leading-6 text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

