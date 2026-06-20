import Link from "next/link";

interface TopBarProps {
  title?: string;
}

export default function TopBar({ title = "JourneyLK" }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-md items-center justify-center px-5">
        <Link
          href="/"
          aria-label="Go to JourneyLK home"
          className="text-[17px] font-black tracking-tight text-blue-800"
        >
          {title}
        </Link>
      </div>
    </header>
  );
}