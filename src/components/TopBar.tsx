"use client";

import Link from "next/link";
import { MapPin, Search } from "lucide-react";

interface TopBarProps {
  title?: string;
  showSearchIcon?: boolean;
}

export default function TopBar({ title = "JourneyLK", showSearchIcon = true }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur">
      <button
        type="button"
        aria-label="Search attractions"
        className="grid min-h-12 min-w-12 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100"
      >
        {showSearchIcon ? <Search size={21} /> : <span />}
      </button>

      <Link href="/" className="text-lg font-black tracking-tight text-blue-800">
        {title}
      </Link>

      <Link
        href="/nearby"
        aria-label="Open nearby map"
        className="grid min-h-12 min-w-12 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100"
      >
        <MapPin size={22} />
      </Link>
    </header>
  );
}
