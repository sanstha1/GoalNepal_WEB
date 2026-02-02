import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Heart, MapPin, Calendar } from "lucide-react";

const tournaments = [
  {
    id: 1,
    title: "Nepal Football Championship 2025",
    location: "Dasharath Rangasala, Kathmandu",
    date: "Jan 15 - Feb 20, 2025",
    image: "/images/football1.jpg",
  },
  {
    id: 2,
    title: "Futsal Premier League",
    location: "Sports Hall, Pokhara",
    date: "Feb 1 - Mar 15, 2025",
    image: "/images/futsal1.jpg",
  },
  {
    id: 3,
    title: "Kathmandu League Cup",
    location: "Bhaktapur Stadium",
    date: "Feb 10 - Apr 10, 2025",
    image: "/images/football2.jpg",
  },
  {
    id: 4,
    title: "Mixed Event Tournament",
    location: "Lalitpur Sports Complex",
    date: "Mar 1 - Mar 25, 2025",
    image: "/images/futsal2.jpg",
  },
  {
    id: 5,
    title: "Central Region Futsal",
    location: "Community Hall, Kathmandu",
    date: "Feb 5 - Mar 5, 2025",
    image: "/images/futsal3.jpg",
  },
  {
    id: 6,
    title: "Youth Football Cup",
    location: "School Ground, Lalitpur",
    date: "Feb 20 - Mar 30, 2025",
    image: "/images/football3.jpg",
  },
];

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-[#fefee3] flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-black mb-2">
          Ongoing Tournaments
        </h1>

        <p className="text-black mb-8">
          Discover and register for the best football and futsal tournaments in Nepal
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={tournament.image}
                  alt={tournament.title}
                  fill
                  className="object-cover"
                />

                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                  <Heart size={18} className="text-black" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-black mb-3">
                  {tournament.title}
                </h2>

                <div className="flex items-center text-sm text-black mb-2 gap-2">
                  <MapPin size={16} />
                  <span>{tournament.location}</span>
                </div>

                <div className="flex items-center text-sm text-black mb-6 gap-2">
                  <Calendar size={16} />
                  <span>{tournament.date}</span>
                </div>

                <button className="w-full bg-[#6f849b] text-white py-3 rounded-full font-medium hover:bg-[#5f7388] transition">
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
