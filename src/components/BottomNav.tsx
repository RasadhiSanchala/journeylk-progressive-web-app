"use client";

import Link from "next/link";
import { Bookmark, Compass, Navigation, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/components/FavoritesProvider";

const navLinks = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/favorites", label: "Saved", icon: Bookmark },
  { href: "/nearby", label: "Nearby", icon: Navigation },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { favoritesCount } = useFavorites();

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 grid h-20 w-full max-w-[430px] -translate-x-1/2 grid-cols-4 border-t border-slate-200 bg-white/95 px-3 pb-2 pt-2 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur">
      {navLinks.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        const showBadge = href === "/favorites" && favoritesCount > 0;

        return (
          <Link
            key={href}
            href={href}
            className={`relative flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium transition ${
              active ? "bg-blue-700 text-white shadow-lg shadow-blue-700/25" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon size={21} />
            <span>{label}</span>
            {showBadge && (
              <span className="absolute right-3 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-slate-950">
                {favoritesCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
