"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Trophy, Users, Calendar, MapPin, Quote } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fefee3]">
      <Header />

      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ transform: mounted ? `translateY(${scrollY * 0.4}px)` : "translateY(0px)" }}
        >
          <Image
            src="/images/football1.jpg"
            alt="Football Background"
            fill
            priority
            className="object-cover brightness-75"
          />
        </div>

        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Where Football Meets Passion 🇳🇵
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Discover, register, and manage football & futsal tournaments across Nepal — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tournaments"
              className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Explore Tournaments
            </a>

            <a
              href="/news"
              className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Latest News
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className={`${poppins.className} text-3xl font-bold text-center mb-12 text-black`}>
          What We Provide
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <FeatureCard
            icon={<Trophy size={40} />}
            title="Tournaments"
            description="Find ongoing and upcoming football & futsal tournaments across Nepal."
          />
          <FeatureCard
            icon={<Calendar size={40} />}
            title="Easy Registration"
            description="Register teams and players easily without any hassle."
          />
          <FeatureCard
            icon={<MapPin size={40} />}
            title="Locations"
            description="Discover matches and events happening near you."
          />
          <FeatureCard
            icon={<Users size={40} />}
            title="Community"
            description="Connect players, teams, and organizers in one platform."
          />
        </div>
      </section>

      <section className="bg-[#4a4a4a] py-20 px-6">
        <h2 className={`${poppins.className} text-3xl font-bold text-center mb-12 text-white`}>
          What Our Players Say
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Rajan Shrestha"
            role="Futsal Player, Kathmandu"
            text="GoalNepal made tournament registration super easy. No more calling organizers again and again."
          />
          <Testimonial
            name="Sujal Thapa"
            role="Team Captain, Pokhara"
            text="I love how everything is in one place — schedules, locations, and updates. Clean and reliable."
          />
          <Testimonial
            name="Anish Gurung"
            role="Tournament Organizer"
            text="Managing teams and players has never been this smooth. This platform is a game changer."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
      <div className="flex justify-center text-[#6f849b] mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-black mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function Testimonial({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
      <Quote className="mx-auto mb-4 text-[#6f849b]" />
      <p className="text-gray-700 mb-6 italic">&quot;{text}&quot;</p>
      <h4 className="font-semibold text-black">{name}</h4>
      <span className="text-sm text-gray-500">{role}</span>
    </div>
  );
}