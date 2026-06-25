import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import type { Attraction } from "@/types";

interface AttractionListItemProps {
  attraction: Attraction;
}

export default function AttractionListItem({ attraction }: AttractionListItemProps) {
  return (
    <Link
      href={`/attractions/${attraction.id}`}
      className="flex min-h-24 items-center gap-4 rounded-2xl bg-white p-3 shadow-sm shadow-slate-900/5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={attraction.image}
          alt={attraction.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-black text-slate-950">{attraction.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} />
          {attraction.category} • {attraction.city}
        </p>
      </div>
      <ChevronRight className="text-blue-700" size={23} />
    </Link>
  );
}