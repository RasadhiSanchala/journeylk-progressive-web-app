"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [{ href: "/", label: "Discover", icon: Compass }];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 grid h-20 w-full max-w-[430px] -translate-x-1/2 grid-cols-1 border-t border-slate-200 bg-white/95 px-3 pb-2 pt-2 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur">
      {navLinks.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium transition ${
              active ? "bg-blue-700 text-white shadow-lg shadow-blue-700/25" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon size={21} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}