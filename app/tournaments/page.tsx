"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MapPin, Calendar, Bookmark, Trophy } from "lucide-react";
import { useSaved, Tournament } from "@/context/SavedContext";
import { toast } from "react-toastify";

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getDate()} ${MONTHS[s.getMonth() + 1]} - ${e.getDate()} ${MONTHS[e.getMonth() + 1]}, ${e.getFullYear()}`;
}

function getBannerUrl(bannerImage?: string | null): string | null {
  if (!bannerImage) return null;
  if (bannerImage.startsWith("http")) return bannerImage;
  const filename = bannerImage.split("/").pop();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
  return `${baseUrl}/tournament_banners/${filename}`;
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const { isSaved, toggleSaved } = useSaved();
  const saved = isSaved(tournament._id);
  const bannerUrl = getBannerUrl(tournament.bannerImage);

  const handleToggle = () => {
    toggleSaved(tournament);
    if (!saved) {
      toast.success("Tournament saved successfully!");
    } else {
      toast.info("Tournament removed from saved.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="relative h-48 bg-gray-100">
        {bannerUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bannerUrl}
            alt={tournament.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
            <Trophy size={40} className="text-gray-300" />
          </div>
        )}
        <button
          onClick={handleToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Bookmark
            size={15}
            className={saved ? "text-black fill-black" : "text-gray-400"}
          />
        </button>
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            tournament.type === "football"
              ? "bg-black text-white"
              : "bg-white text-black border border-black"
          }`}>
            {tournament.type === "football" ? "⚽ Football" : "🥅 Futsal"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 leading-snug">
          {tournament.title}
        </h2>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <MapPin size={13} className="shrink-0" />
            <span className="truncate">{tournament.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <Calendar size={13} className="shrink-0" />
            <span>{formatDateRange(tournament.startDate, tournament.endDate)}</span>
          </div>
        </div>
        <button className="mt-auto w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">
          Register
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-10 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

type FilterType = "all" | "football" | "futsal";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
        const res = await fetch(`${baseUrl}/api/tournaments`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch tournaments");
        const data = await res.json();
        setTournaments(data.data || data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load tournaments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  const filtered = filter === "all" ? tournaments : tournaments.filter((t) => t.type === filter);
  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Football", value: "football" },
    { label: "Futsal", value: "futsal" },
  ];

  return (
    <div className="min-h-screen bg-[#fefee3] flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black">Ongoing Tournaments</h1>
            <p className="text-gray-600 mt-1 text-sm">
              Discover and register for the best football and futsal tournaments in Nepal
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            {filters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm border-2 border-black transition-all duration-150 ${
                  filter === value ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Trophy size={48} className="text-gray-300 mb-4" />
            <p className="text-red-500 font-medium">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Trophy size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No tournaments found</p>
            {filter !== "all" && (
              <button onClick={() => setFilter("all")} className="mt-3 text-sm text-gray-400 underline">
                Show all tournaments
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => <TournamentCard key={t._id} tournament={t} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}