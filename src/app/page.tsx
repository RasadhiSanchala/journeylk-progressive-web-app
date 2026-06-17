import AttractionCard from "@/components/AttractionCard";
import AttractionListItem from "@/components/AttractionListItem";
import TopBar from "@/components/TopBar";
import { attractions } from "@/data/attraction";

export default function DiscoverPage() {
  const featuredAttractions = attractions.slice(0, 2);
  const recentlyAdded = attractions.slice(2, 6);

  return (
    <div>
      <TopBar />

      <section className="px-5 pt-5">
        <div className="rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-sky-500 p-5 text-white shadow-xl shadow-blue-900/20">
          <p className="text-sm font-semibold text-blue-100">Mobile travel companion</p>
          <h1 className="mt-2 text-3xl font-black leading-tight">Explore Sri Lanka with JourneyLK</h1>
          <p className="mt-3 text-sm leading-6 text-blue-50">
            Browse Sri Lankan attractions and open a detailed travel guide for each destination.
          </p>
        </div>
      </section>

      <section className="px-5 pt-7">
        <h2 className="mb-4 text-2xl font-black text-slate-950">Featured Attractions</h2>
        <div className="space-y-4">
          {featuredAttractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      </section>

      <section className="px-5 pt-8">
        <h2 className="mb-4 text-2xl font-black text-slate-950">Recently Added</h2>
        <div className="space-y-3">
          {recentlyAdded.map((attraction) => (
            <AttractionListItem key={attraction.id} attraction={attraction} />
          ))}
        </div>
      </section>
    </div>
  );
}