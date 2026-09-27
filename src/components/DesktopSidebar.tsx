"use client";

import Link from "next/link";
import { Bookmark, Compass, MapPinned, Navigation, Plane, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/components/FavoritesProvider";

const navLinks = [
  { href: "/", label: "Discover", description: "Explore places", icon: Compass },
  { href: "/favorites", label: "Saved", description: "Your favorites", icon: Bookmark },
  { href: "/nearby", label: "Nearby", description: "Places around you", icon: Navigation },
  { href: "/profile", label: "Profile", description: "Preferences & app", icon: UserRound },
];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { favoritesCount } = useFavorites();

  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-100 px-7 py-7">
        <Link href="/" className="flex items-center gap-3" aria-label="Go to JourneyLK home">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
            <Plane size={22} />
          </span>
          <div>
            <p className="text-xl font-black tracking-tight text-slate-950">JourneyLK</p>
            <p className="text-xs font-semibold text-slate-500">Sri Lanka Travel Guide</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6" aria-label="Desktop navigation">
        {navLinks.map(({ href, label, description, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          const showBadge = href === "/favorites" && favoritesCount > 0;

          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                active
                  ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                  active ? "bg-white/15" : "bg-slate-100 text-blue-700 group-hover:bg-white"
                }`}
              >
                <Icon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black">{label}</span>
                <span className={`block text-xs ${active ? "text-blue-100" : "text-slate-500"}`}>
                  {description}
                </span>
              </span>
              {showBadge && (
                <span
                  className={`grid h-6 min-w-6 place-items-center rounded-full px-1 text-[11px] font-black ${
                    active ? "bg-amber-300 text-slate-950" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {favoritesCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-3xl bg-slate-950 p-5 text-white">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-sky-300">
            <MapPinned size={20} />
          </span>
          <div>
            <p className="text-sm font-black">Travel smarter</p>
            <p className="text-xs text-slate-400">Save places and find nearby attractions.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
