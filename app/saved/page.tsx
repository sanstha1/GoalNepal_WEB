"use client";

import Header from "@/components/header";
import { MapPin, Calendar, Bookmark, Trophy } from "lucide-react";
import { useSaved, Tournament } from "@/context/SavedContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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

function SavedCard({ tournament }: { tournament: Tournament }) {
  const { toggleSaved } = useSaved();
  const bannerUrl = getBannerUrl(tournament.bannerImage);

  const handleRemove = () => {
    toggleSaved(tournament);
    toast.success("Tournament unsaved successfully!");
  };

  return (
    <motion.div
      className="rounded-2xl border border-white/10 overflow-hidden shadow-lg flex flex-col hover:shadow-xl transition"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative h-48 bg-gray-900">
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
          <div className="w-full h-full flex items-center justify-center">
            <Trophy size={40} className="text-gray-500" />
          </div>
        )}
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Bookmark size={15} className="text-black fill-black" />
        </button>
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              tournament.type === "football"
                ? "bg-[#4caf50] text-white"
                : "bg-yellow-400 text-black"
            }`}
          >
            {tournament.type === "football" ? "⚽ Football" : "🥅 Futsal"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-bold text-white text-base mb-3 line-clamp-2 leading-snug">
          {tournament.title}
        </h2>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <MapPin size={13} className="shrink-0" />
            <span className="truncate">{tournament.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Calendar size={13} className="shrink-0" />
            <span>{formatDateRange(tournament.startDate, tournament.endDate)}</span>
          </div>
        </div>
        <div className="mt-auto flex gap-3">
          <button className="flex-1 bg-[#4caf50] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#43a047] transition-colors">
            Register
          </button>
          <button
            onClick={handleRemove}
            className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-600 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SavedPage() {
  const { savedTournaments } = useSaved();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full text-gray-300">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white">Saved Tournaments</h1>
          <p className="mt-2 text-gray-400 text-sm">
            Your bookmarked tournaments that you&apos;re interested in
          </p>
          <p className="mt-3 text-gray-400 text-sm font-medium">
            You have {savedTournaments.length} saved tournament{savedTournaments.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {savedTournaments.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Bookmark size={48} className="text-gray-500 mb-4" />
            <p className="text-gray-400 font-medium">No saved tournaments yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Bookmark tournaments from the{" "}
              <a href="/tournaments" className="underline hover:text-[#4caf50]">
                Tournaments page
              </a>
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {savedTournaments.map((t, index) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <SavedCard tournament={t} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
