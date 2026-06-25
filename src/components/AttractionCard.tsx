import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import type { Attraction } from "@/types";

interface AttractionCardProps {
  attraction: Attraction;
  priority?: boolean;
}

export default function AttractionCard({ attraction, priority = false }: AttractionCardProps) {
  return (
    <Link
      href={`/attractions/${attraction.id}`}
      className="group relative block overflow-hidden rounded-3xl bg-slate-900 shadow-lg shadow-slate-900/10"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={attraction.image}
          alt={attraction.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 430px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

      <div className="absolute right-4 top-4">
        <FavoriteButton id={attraction.id} />
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <span className="mb-2 inline-flex rounded-full bg-blue-700/90 px-3 py-1 text-xs font-bold text-white">
          {attraction.category}
        </span>

        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black leading-tight text-white">{attraction.name}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/85">
              <MapPin size={15} />
              {attraction.city}
            </p>
          </div>

          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-400 px-2 py-1 text-sm font-black text-slate-950">
            <Star size={14} fill="currentColor" /> {attraction.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}