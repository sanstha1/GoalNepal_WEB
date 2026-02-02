"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import Header from "@/components/header";

const newsItems = [
  {
    id: 1,
    type: "NEWS",
    time: "Today, 2:30 PM",
    title: "Nepal Football Championship 2025 Begins",
    description: "The much-awaited Nepal Football Championship kicked off today with an exciting opening match between Kathmandu FC and Valley United.",
    image: "/images/news-1.jpg",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    type: "LIVE",
    time: "Live Now",
    title: "LIVE: Championship Final - Mountain Kings vs City Stars",
    description: "The championship final is happening right now! Mountain Kings currently leading 2-1 with 15 minutes remaining.",
    image: "/images/news-2.jpg",
    bgColor: "bg-red-50",
  },
  {
    id: 3,
    type: "RESULT",
    time: "Yesterday",
    title: "Yesterday's Results",
    description: "Kathmandu FC 3 - 1 Valley United | Pokhara United 2 - 2 Central Region",
    image: "/images/news-3.jpg",
    bgColor: "bg-green-50",
  },
  {
    id: 4,
    type: "MAN OF THE MATCH",
    time: "Today",
    title: "Man of the Match - Ronish Lama",
    description: "Outstanding performance with 3 goals and 2 assists in the championship opener. Ronish proved why he's one of the best players in Nepal.",
    image: "/images/news-4.jpg",
    bgColor: "bg-yellow-50",
  },
];

const upcomingMatches = [
  {
    id: 1,
    date: "Feb 15, 3:00 PM",
    team1: "Kathmandu FC",
    team2: "Valley United",
  },
  {
    id: 2,
    date: "Feb 16, 4:00 PM",
    team1: "Pokhara United",
    team2: "Mountain Kings",
  },
  {
    id: 3,
    date: "Feb 17, 3:30 PM",
    team1: "Central Region",
    team2: "City Stars",
  },
];

const topPerformers = [
  { id: 1, name: "Ronish Lama", goals: 5 },
  { id: 2, name: "Sunil Karki", goals: 4 },
  { id: 3, name: "Anish Upreti", goals: 3 },
];

export default function TournamentNewsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">Tournament News & Updates</h1>
            <p className="text-gray-600 text-lg">
              Stay updated with the latest news, live matches, and player highlights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Latest News</h2>

              {newsItems.map((news) => (
                <div
                  key={news.id}
                  className={`${news.bgColor} rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition`}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 shrink-0">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded text-sm font-bold ${
                            news.type === "LIVE"
                              ? "bg-red-500 text-white"
                              : news.type === "NEWS"
                              ? "bg-blue-600 text-white"
                              : news.type === "RESULT"
                              ? "bg-green-600 text-white"
                              : "bg-yellow-600 text-black"
                          }`}
                        >
                          {news.type}
                        </span>
                        <span className="text-gray-600 text-sm">{news.time}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{news.title}</h3>
                      <p className="text-gray-700">{news.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Upcoming Matches</h2>
                <div className="space-y-4">
                  {upcomingMatches.map((match) => (
                    <div
                      key={match.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{match.date}</span>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-lg mb-2 text-gray-900">{match.team1}</p>
                        <p className="text-gray-600 text-sm mb-2">VS</p>
                        <p className="font-semibold text-lg mb-4 text-gray-900">{match.team2}</p>
                        <button className="w-full bg-[#6b7280] hover:bg-[#7a8391] text-white py-2 rounded transition">
                          Set Reminder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🏆</span>
                  <h3 className="text-xl font-bold text-gray-900">Top Performers</h3>
                </div>
                <div className="space-y-3">
                  {topPerformers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">⭐</span>
                        <span className="font-medium text-gray-900">{player.name}</span>
                      </div>
                      <span className="text-[#6b7280] font-semibold">{player.goals} goals</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}