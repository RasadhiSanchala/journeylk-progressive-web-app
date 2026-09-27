import BottomNav from "@/components/BottomNav";
import DesktopSidebar from "@/components/DesktopSidebar";
import { FavoritesProvider } from "@/components/FavoritesProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-slate-200 text-slate-950 lg:bg-slate-100">
        <div className="mx-auto min-h-screen max-w-[430px] bg-slate-50 shadow-2xl shadow-slate-900/20 lg:flex lg:max-w-none lg:bg-transparent lg:shadow-none">
          <DesktopSidebar />
          <div className="min-w-0 flex-1 lg:bg-slate-50">
            <main className="min-h-screen pb-24 lg:pb-0">{children}</main>
          </div>
          <BottomNav />
        </div>
      </div>
    </FavoritesProvider>
  );
}
