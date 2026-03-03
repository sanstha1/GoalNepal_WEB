"use client";

import { useEffect, useState } from "react";
import { Trophy, Users, ClipboardList, TrendingUp, Activity, Calendar, MapPin, ChevronRight } from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

interface RecentRegistration {
  team: string;
  tournament: string;
  captain: string;
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
  { team: "Eagles FC", tournament: "Jhapa 5 Futsal Cup", captain: "Ram Thapa", time: "2 min ago", type: "futsal" },
  { team: "Thunder Boys", tournament: "Kathmandu League", captain: "Sujal KC", time: "15 min ago", type: "football" },
  { team: "Valley Warriors", tournament: "Pokhara Open", captain: "Bikash Rai", time: "1 hr ago", type: "football" },
  { team: "Mountain Lions", tournament: "Jhapa 5 Futsal Cup", captain: "Niroj Shah", time: "3 hr ago", type: "futsal" },
  { team: "City Strikers", tournament: "Lalitpur Cup", captain: "Aman Shrestha", time: "5 hr ago", type: "football" },
];

const MOCK_TOURNAMENTS: RecentTournament[] = [
  { title: "Jhapa 5 Futsal Cup", location: "Jhapa, Nepal", date: "8 Mar - 29 Mar, 2026", registrations: 12, type: "futsal" },
  { title: "Kathmandu Premier League", location: "Dasharath Stadium", date: "15 Mar - 10 Apr, 2026", registrations: 24, type: "football" },
  { title: "Pokhara Open Tournament", location: "Pokhara, Nepal", date: "20 Mar - 5 Apr, 2026", registrations: 8, type: "football" },
  { title: "Lalitpur Futsal Cup", location: "Lalitpur, Nepal", date: "1 Apr - 15 Apr, 2026", registrations: 6, type: "futsal" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({ users: 0, tournaments: 0, registrations: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animate numbers on load
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
      positive: true,
      icon: <Users size={22} />,
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      label: "Active Tournaments",
      value: loading ? "—" : stats.tournaments.toString(),
      change: "+4 this week",
      positive: true,
      icon: <Trophy size={22} />,
      color: "#f97316",
      bg: "#fff7ed",
    },
    {
      label: "Total Registrations",
      value: loading ? "—" : stats.registrations.toLocaleString(),
      change: "+38 today",
      positive: true,
      icon: <ClipboardList size={22} />,
      color: "#16a34a",
      bg: "#f0fdf4",
    },
    {
      label: "Completion Rate",
      value: loading ? "—" : `${stats.revenue}%`,
      change: "+2% vs last month",
      positive: true,
      icon: <TrendingUp size={22} />,
      color: "#8b5cf6",
      bg: "#f5f3ff",
    },
  ];

  return (
    <div style={{ backgroundColor: "#fefee3", minHeight: "100vh", padding: "32px" }}>

      {/* Page Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
          Welcome back! Here&apos;s what&apos;s happening with GoalNepal today.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #f3f4f6",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>{card.label}</span>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: card.bg, display: "flex", alignItems: "center", justifyContent: "center", color: card.color }}>
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: "30px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>{card.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <TrendingUp size={12} style={{ color: "#16a34a" }} />
              <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600 }}>{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

        {/* Recent Registrations */}
        <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Recent Registrations</h2>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>Latest team sign-ups</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#f0fdf4", padding: "4px 10px", borderRadius: "100px" }}>
              <Activity size={12} style={{ color: "#16a34a" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a" }}>LIVE</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {MOCK_RECENT_REGISTRATIONS.map((reg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "12px", backgroundColor: "#f9fafb" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                  backgroundColor: reg.type === "football" ? "#111827" : "#f97316",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px"
                }}>
                  {reg.type === "football" ? "⚽" : "🥅"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{reg.team}</div>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{reg.tournament}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>{reg.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tournaments */}
        <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Active Tournaments</h2>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>Currently ongoing events</p>
            </div>
            <a href="/admin/tournaments" style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "12px", fontWeight: 600, color: "#3b82f6", textDecoration: "none" }}>
              View all <ChevronRight size={14} />
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {MOCK_TOURNAMENTS.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "12px", border: "1px solid #f3f4f6" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                  backgroundColor: t.type === "football" ? "#111827" : "#fff7ed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px"
                }}>
                  {t.type === "football" ? "⚽" : "🥅"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <MapPin size={10} style={{ color: "#9ca3af" }} />
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>{t.location}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Calendar size={10} style={{ color: "#9ca3af" }} />
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>{t.date}</span>
                    </div>
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div style={{ fontSize: "15px", fontWeight: 800, color: "#111827" }}>{t.registrations}</div>
                  <div style={{ fontSize: "10px", color: "#9ca3af" }}>teams</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 16px 0" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
          {[
            { label: "Add Tournament", icon: "🏆", href: "/admin/tournaments", color: "#111827" },
            { label: "Manage Users", icon: "👥", href: "/admin/users", color: "#3b82f6" },
            { label: "View Registrations", icon: "📋", href: "", color: "#16a34a" },
            { label: "Generate Report", icon: "📊", href: "", color: "#8b5cf6" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 16px",
                borderRadius: "12px",
                backgroundColor: "#f9fafb",
                border: "1.5px solid #f3f4f6",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#f3f4f6"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#f9fafb"; }}
            >
              <span style={{ fontSize: "20px" }}>{action.icon}</span>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{action.label}</span>
              <ChevronRight size={14} style={{ color: "#9ca3af", marginLeft: "auto" }} />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}