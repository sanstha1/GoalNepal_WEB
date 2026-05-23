/* eslint-disable @next/next/no-page-custom-font */
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />

      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(224,93,46,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(15,52,96,0.6) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Top line accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(224,93,46,0.4), transparent)" }} />

      {/* HEADER BAR */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>Goal</span>
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", background: "linear-gradient(195deg, #000, #ff7043)", padding: "2px 10px", borderRadius: "8px" }}>Nepal</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e05d2e", background: "rgba(224,93,46,0.1)", border: "1px solid rgba(224,93,46,0.2)", borderRadius: "100px", padding: "5px 14px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e05d2e", display: "inline-block" }} />
          Nepal&apos;s #1 Football Platform
        </div>
      </div>

      {/* MAIN SPLIT LAYOUT */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          minHeight: "calc(100vh - 80px)",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 48px 48px",
          alignItems: "center",
        }}
      >
        {/* LEFT — Hero copy */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ paddingRight: "60px" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(40px, 4.5vw, 64px)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 20px",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Where Football
            <br />
            <span style={{ color: "#e05d2e" }}>Meets Passion</span>{" "}
            <span style={{ fontSize: "0.7em" }}>🇳🇵</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: "17px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontWeight: 300, margin: "0 0 40px", maxWidth: "440px" }}
          >
            Discover, register, and manage football &amp; futsal tournaments across Nepal — all in one place.
          </motion.p>

          {/* Feature checklist */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}
          >
            {[
              "Real-time tournament schedules & fixtures",
              "One-click team & player registration",
              "Live scores and match notifications",
            ].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle2 size={16} style={{ color: "#e05d2e", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>{f}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/login")}
              style={{
                height: "52px",
                padding: "0 32px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#e05d2e",
                color: "white",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.04em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Login <ArrowRight size={15} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/register")}
              style={{
                height: "52px",
                padding: "0 32px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Create Account
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ marginTop: "24px", fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", fontWeight: 300 }}
          >
            Free to join · No credit card required
          </motion.p>
        </motion.div>

        {/* RIGHT — Stats & cards */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* Top stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { icon: <Trophy size={22} style={{ color: "#e05d2e" }} />, value: "24+", label: "Active Tournaments", sub: "Across 7 cities" },
              { icon: <Users size={22} style={{ color: "#e05d2e" }} />, value: "8,500+", label: "Registered Players", sub: "Across Nepal" },
            ].map(({ icon, value, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "80px", height: "80px", background: "rgba(224,93,46,0.05)", borderRadius: "50%" }} />
                <div style={{ width: "44px", height: "44px", background: "rgba(224,93,46,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>{icon}</div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "32px", fontWeight: 800, color: "#fff", margin: "0 0 2px", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)", margin: "0 0 2px" }}>{label}</p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", margin: 0, fontWeight: 300 }}>{sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Wide card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div style={{ width: "52px", height: "52px", background: "rgba(224,93,46,0.1)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Calendar size={24} style={{ color: "#e05d2e" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>1,240+ Team Registrations</p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: 0, fontWeight: 300 }}>This season across all tournaments in Nepal</p>
            </div>
            <div style={{ background: "rgba(224,93,46,0.15)", border: "1px solid rgba(224,93,46,0.2)", borderRadius: "8px", padding: "4px 10px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#e05d2e", letterSpacing: "0.06em" }}>LIVE</span>
            </div>
          </motion.div>

          {/* Feature pills row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            {[
              { icon: <MapPin size={13} />, label: "Location Aware" },
              { icon: <Trophy size={13} />, label: "Tournament Hub" },
              { icon: <Users size={13} />, label: "Team Management" },
              { icon: <CheckCircle2 size={13} />, label: "Instant Registration" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "100px",
                  padding: "7px 14px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <span style={{ color: "#e05d2e" }}>{icon}</span>
                {label}
              </div>
            ))}
          </motion.div>

          {/* Testimonial snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "20px 24px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ fontSize: "28px", color: "#e05d2e", fontFamily: "Georgia, serif", lineHeight: 1, flexShrink: 0, marginTop: "-4px" }}>&quot;</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: "0 0 14px", fontWeight: 300 }}>
                GoalNepal made tournament registration super easy. No more calling organizers again and again.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(224,93,46,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#e05d2e" }}>R</div>
                <div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "13px", margin: 0, color: "#fff" }}>Pabina Shrestha</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", margin: 0, fontWeight: 300 }}>Futsal Player, Kathmandu</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}