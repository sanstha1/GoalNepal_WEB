"use client";

import { useEffect, useState } from "react";
import { Trophy, Users, ClipboardList, TrendingUp, Activity, Calendar, MapPin, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface RecentRegistration {
  team: string;
  tournament: string;
  time: string;
  type: "football" | "futsal";
}

interface RecentTournament {
  title: string;
  location: string;
  date: string;
  registrations: number;
  type: "football" | "futsal";
}

const MOCK_RECENT_REGISTRATIONS: RecentRegistration[] = [
  { team: "Eagles FC", tournament: "Jhapa 5 Futsal Cup", time: "2 min ago", type: "futsal" },
  { team: "Thunder Boys", tournament: "Kathmandu League", time: "15 min ago", type: "football" },
  { team: "Valley Warriors", tournament: "Pokhara Open", time: "1 hr ago", type: "football" },
  { team: "Mountain Lions", tournament: "Jhapa 5 Futsal Cup", time: "3 hr ago", type: "futsal" },
];

const MOCK_TOURNAMENTS: RecentTournament[] = [
  { title: "Jhapa 5 Futsal Cup", location: "Jhapa, Nepal", date: "8 Mar - 29 Mar", registrations: 12, type: "futsal" },
  { title: "Kathmandu Premier League", location: "Dasharath Stadium", date: "15 Mar - 10 Apr", registrations: 24, type: "football" },
  { title: "Pokhara Open Tournament", location: "Pokhara, Nepal", date: "20 Mar - 5 Apr", registrations: 8, type: "football" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({ users: 0, tournaments: 0, registrations: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ users: 1284, tournaments: 48, registrations: 326, revenue: 94 });
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const statCards: StatCard[] = [
    {
      label: "Total Users",
      value: loading ? "—" : stats.users.toLocaleString(),
      change: "+12% this month",
      icon: <Users size={20} />,
      color: "#3b82f6",
    },
    {
      label: "Active Tournaments",
      value: loading ? "—" : stats.tournaments.toString(),
      change: "+4 this week",
      icon: <Trophy size={20} />,
      color: "#FF8A2A",
    },
    {
      label: "Total Registrations",
      value: loading ? "—" : stats.registrations.toLocaleString(),
      change: "+38 today",
      icon: <ClipboardList size={20} />,
      color: "#34A853",
    },
    {
      label: "Completion Rate",
      value: loading ? "—" : `${stats.revenue}%`,
      change: "+2% vs last month",
      icon: <TrendingUp size={20} />,
      color: "#a78bfa",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-[#2F2F2F] mb-2">Dashboard</h1>
        <p className="text-[#6B7280]">Welcome back! Here&apos;s what&apos;s happening with GoalNepal today.</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {statCards.map((card, idx) => (
          <motion.div
            key={card.label}
            className="rounded-xl border p-6"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            whileHover={{ borderColor: "rgba(255, 138, 42, 0.3)" }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{card.label}</span>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${card.color}20`, color: card.color }}
              >
                {card.icon}
              </div>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-[#2F2F2F] mb-1">{card.value}</div>
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#34A853" }}>
                <ArrowUpRight size={12} />
                {card.change}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="lg:col-span-2 rounded-xl border p-6"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB"
          }}
          whileHover={{ borderColor: "rgba(255, 138, 42, 0.3)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#2F2F2F]">Recent Registrations</h2>
              <p className="text-xs text-[#6B7280] mt-1">Latest team sign-ups</p>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "rgba(52, 168, 83, 0.12)", color: "#34A853" }}
            >
              <Activity size={12} />
              LIVE
            </div>
          </div>

          <div className="space-y-2">
            {MOCK_RECENT_REGISTRATIONS.map((reg, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg border transition"
                style={{
                  backgroundColor: "#FAFAFA",
                  borderColor: "#E5E7EB"
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ backgroundColor: "#FFF4E8", borderColor: "rgba(255, 138, 42, 0.25)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{
                      background: reg.type === "football" ? "#F3F4F6" : "rgba(255, 138, 42, 0.15)",
                      color: reg.type === "football" ? "#2F2F2F" : "#FF8A2A"
                    }}
                  >
                    {reg.type === "football" ? "⚽" : "🥅"}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#2F2F2F]">{reg.team}</div>
                    <div className="text-xs text-[#6B7280] mt-0.5">{reg.tournament}</div>
                  </div>
                </div>
                <span className="text-xs text-[#9CA3AF]">{reg.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border p-6"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB"
          }}
          whileHover={{ borderColor: "rgba(255, 138, 42, 0.3)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#2F2F2F]">Top Info</h2>
              <p className="text-xs text-[#6B7280] mt-1">Quick stats</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Active Now", value: "42", icon: "⚡", color: "#34A853" },
              { label: "Pending", value: "8", icon: "⏳", color: "#F59E0B" },
              { label: "This Month", value: "156", icon: "📊", color: "#3b82f6" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: "#FAFAFA", borderLeft: `3px solid ${item.color}` }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <span className="text-xs text-[#6B7280]">{item.label}</span>
                <span className="text-base font-bold" style={{ color: item.color }}>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="rounded-xl border p-6"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ borderColor: "rgba(255, 138, 42, 0.3)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#2F2F2F]">Active Tournaments</h2>
            <p className="text-xs text-[#6B7280] mt-1">Currently ongoing events</p>
          </div>
          <Link href="/admin/tournaments">
            <motion.button
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition"
              style={{
                color: "#FF8A2A",
                backgroundColor: "rgba(255, 138, 42, 0.1)",
                border: "1px solid rgba(255, 138, 42, 0.2)"
              }}
              whileHover={{ backgroundColor: "rgba(255, 138, 42, 0.2)" }}
            >
              View All
              <ChevronRight size={14} />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_TOURNAMENTS.map((t, idx) => (
            <motion.div
              key={idx}
              className="rounded-lg border p-4 hover:border-[#FF8A2A]/30 transition"
              style={{
                backgroundColor: "#FAFAFA",
                borderColor: "#E5E7EB"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                  style={{
                    background: t.type === "football" ? "#F3F4F6" : "rgba(255, 138, 42, 0.15)"
                  }}
                >
                  {t.type === "football" ? "⚽" : "🥅"}
                </div>
                <span className="text-xs font-bold text-[#6B7280]">{t.registrations} teams</span>
              </div>
              <h3 className="text-sm font-bold text-[#2F2F2F] mb-2 line-clamp-2">{t.title}</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <MapPin size={12} />
                  <span className="truncate">{t.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <Calendar size={12} />
                  <span>{t.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}