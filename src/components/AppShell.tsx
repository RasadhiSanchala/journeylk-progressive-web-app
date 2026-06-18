import BottomNav from "@/components/BottomNav";
import { FavoritesProvider } from "@/components/FavoritesProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
     <FavoritesProvider>
      <div className="min-h-screen bg-slate-200 text-slate-950">
        <div className="mx-auto min-h-screen max-w-[430px] bg-slate-50 shadow-2xl shadow-slate-900/20">
          <main className="min-h-screen pb-24">{children}</main>
          <BottomNav />
        </div>
      </div>
    </FavoritesProvider>
  );
}