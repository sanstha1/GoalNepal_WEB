import Image from "next/image";
import { Heart, MapPin, Calendar } from "lucide-react";
import Header from "@/components/header";

const savedTournaments = [
  {
    id: 1,
    title: "Nepal Football Championship 2025",
    location: "Dasharath Rangasala, Kathmandu",
    date: "Jan 15 - Feb 20, 2025",
    image: "/images/football1.jpg",
  },
  {
    id: 2,
    title: "Mixed Event Tournament",
    location: "Lalitpur Sports Complex",
    date: "Mar 1 - Mar 25, 2025",
    image: "/images/football2.jpg",
  },
  {
    id: 3,
    title: "Youth Football Cup",
    location: "School Ground, Lalitpur",
    date: "Feb 20 - Mar 30, 2025",
    image: "/images/football3.jpg",
  },
];

export default function SavedPage() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Content */}
      <div className="min-h-screen bg-[#faf8e8] px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Saved Tournaments
          </h1>
          <p className="mt-2 text-gray-600">
            Your bookmarked tournaments that you&apos;re interested in
          </p>
          <p className="mt-4 text-gray-700">
            You have {savedTournaments.length} saved tournaments
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md"
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={tournament.image}
                  alt={tournament.title}
                  fill
                  className="object-cover"
                />

                {/* Heart */}
                <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow">
                  <Heart className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                  {tournament.title}
                </h2>

                <div className="mb-2 flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{tournament.location}</span>
                </div>

                <div className="mb-4 flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{tournament.date}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 rounded-full bg-[#6b7f95] px-4 py-2 text-white hover:opacity-90">
                    Register
                  </button>
                  <button className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
