"use client";

import React, { useEffect, useState, useRef } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Users, Calendar, MapPin, ArrowRight, CheckCircle2, Shield, Wifi } from "lucide-react";

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

const BADGE_STYLE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "#e05d2e",
  background: "rgba(224,93,46,0.1)",
  border: "1px solid rgba(224,93,46,0.2)",
  borderRadius: "100px",
  padding: "4px 12px",
  marginBottom: "20px",
};

const SECTION_STYLE: React.CSSProperties = {
  background: "#080810",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
};

export default function HomePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [s1Ref, s1Visible] = useFadeIn();
  const [s2Ref, s2Visible] = useFadeIn();
  const [s3Ref, s3Visible] = useFadeIn();
  const [featuresRef, featuresVisible] = useFadeIn();
  const [testimonialsRef, testimonialsVisible] = useFadeIn();
  const [privacyRef, privacyVisible] = useFadeIn();
  const [ctaRef, ctaVisible] = useFadeIn();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const numStyle: React.CSSProperties = {
    fontFamily: "'Georgia', serif",
    fontSize: "120px",
    fontWeight: 700,
    lineHeight: 1,
    color: "rgba(255,255,255,0.04)",
    position: "absolute",
    top: "-16px",
    left: "-8px",
    userSelect: "none",
  };

  return (
    <div style={{ background: "#080810", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700;800&display=swap"
        rel="stylesheet"
      />
      <Header />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#08080f",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <Image
            src="/images/football1.jpg"
            alt="Football Background"
            fill
            priority
            style={{ objectFit: "cover", opacity: 0.18 }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(224,93,46,0.12) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(224,93,46,0.5), transparent)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "820px",
            margin: "0 auto",
            padding: "0 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              ...BADGE_STYLE,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.5s ease",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#e05d2e",
                display: "inline-block",
              }}
            />
            Nepal&apos;s #1 Football Platform
          </div>

          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.08,
              margin: "0 0 24px",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            Where Football
            <br />
            <span style={{ color: "#e05d2e" }}>Meets Passion</span>{" "}
            <span style={{ fontSize: "0.7em" }}>🇳🇵</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.65,
              maxWidth: "520px",
              margin: "0 auto 40px",
              fontWeight: 300,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.2s",
            }}
          >
            Discover, register, and manage football & futsal tournaments across Nepal — all in one place.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.3s",
            }}
          >
            <Link
              href="/tournaments"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#e05d2e",
                color: "#fff",
                fontWeight: 600,
                fontSize: "15px",
                padding: "13px 28px",
                borderRadius: "10px",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              Explore Tournaments <ArrowRight size={16} />
            </Link>
            <Link
              href="/news"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 500,
                fontSize: "15px",
                padding: "13px 28px",
                borderRadius: "10px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "background 0.2s",
              }}
            >
              Latest News
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER LABEL */}
      <div
        style={{
          textAlign: "center",
          padding: "64px 24px 0",
          background: "#080810",
        }}
      >
        <span style={BADGE_STYLE}>See it in action</span>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            margin: "0 0 4px",
          }}
        >
          GoalNepal in <span style={{ color: "#e05d2e" }}>Action</span>
        </h2>
      </div>

      {/* NUMBERED SECTION 1 — Tournaments */}
      <section style={{ ...SECTION_STYLE, padding: "80px 0" }}>
        <div
          ref={s1Ref}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            opacity: s1Visible ? 1 : 0,
            transform: s1Visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.7s ease",
          }}
        >
          <div>
            <div style={{ position: "relative", paddingTop: "8px" }}>
              <span style={numStyle}>1</span>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  margin: "0 0 16px",
                }}
              >
                Tournament Hub
              </p>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 700,
                  margin: "0 0 20px",
                  lineHeight: 1.2,
                }}
              >
                Find Every Match <br />
                <span style={{ color: "#e05d2e" }}>Across Nepal</span>
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  fontSize: "16px",
                  fontWeight: 300,
                  marginBottom: "32px",
                }}
              >
                Browse ongoing and upcoming football & futsal tournaments anywhere in Nepal. Filter by city, format, and date — never miss a game again.
              </p>
              {[
                "Real-time schedules & fixtures",
                "Filter by city, league, or format",
                "Instant match notifications",
              ].map((f) => (
                <div
                  key={f}
                  style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}
                >
                  <CheckCircle2 size={16} style={{ color: "#e05d2e", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <MockupCard icon={<Trophy size={36} style={{ color: "#e05d2e" }} />} title="Active Tournaments" count="24" sub="Across 7 cities" />
          </div>
        </div>
      </section>

      {/* NUMBERED SECTION 2 — Registration */}
      <section
        style={{
          ...SECTION_STYLE,
          padding: "80px 0",
          background: "#0b0b16",
        }}
      >
        <div
          ref={s2Ref}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            opacity: s2Visible ? 1 : 0,
            transform: s2Visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.7s ease",
          }}
        >
          <div style={{ order: 2 }}>
            <div style={{ position: "relative", paddingTop: "8px" }}>
              <span style={numStyle}>2</span>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  margin: "0 0 16px",
                }}
              >
                Easy Registration
              </p>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 700,
                  margin: "0 0 20px",
                  lineHeight: 1.2,
                }}
              >
                Register Teams <br />
                <span style={{ color: "#e05d2e" }}>In Minutes</span>
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  fontSize: "16px",
                  fontWeight: 300,
                  marginBottom: "32px",
                }}
              >
                No paperwork, no phone calls. Register your team and players for any tournament with just a few taps. Manage rosters, track registrations, all in one dashboard.
              </p>
              {[
                "One-click team registration",
                "Player roster management",
                "Confirmation & receipts instantly",
              ].map((f) => (
                <div
                  key={f}
                  style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}
                >
                  <CheckCircle2 size={16} style={{ color: "#e05d2e", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ order: 1, display: "flex", justifyContent: "center" }}>
            <MockupCard icon={<Calendar size={36} style={{ color: "#e05d2e" }} />} title="Team Registrations" count="1,240+" sub="Teams this season" />
          </div>
        </div>
      </section>

      {/* NUMBERED SECTION 3 — Community */}
      <section style={{ ...SECTION_STYLE, padding: "80px 0" }}>
        <div
          ref={s3Ref}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            opacity: s3Visible ? 1 : 0,
            transform: s3Visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.7s ease",
          }}
        >
          <div>
            <div style={{ position: "relative", paddingTop: "8px" }}>
              <span style={numStyle}>3</span>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  margin: "0 0 16px",
                }}
              >
                Community
              </p>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 700,
                  margin: "0 0 20px",
                  lineHeight: 1.2,
                }}
              >
                Connect Players,<br />
                <span style={{ color: "#e05d2e" }}>Organizers & Fans</span>
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  fontSize: "16px",
                  fontWeight: 300,
                  marginBottom: "32px",
                }}
              >
                One platform that bridges the gap between players, team captains, and organizers. Follow results, share news, and build Nepal&apos;s football community together.
              </p>
              {[
                "Follow teams & get live updates",
                "Discover events near your location",
                "Organizer & player profiles",
              ].map((f) => (
                <div
                  key={f}
                  style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}
                >
                  <CheckCircle2 size={16} style={{ color: "#e05d2e", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <MockupCard icon={<Users size={36} style={{ color: "#e05d2e" }} />} title="Active Players" count="8,500+" sub="Across Nepal" />
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section
        style={{
          background: "#0b0b16",
          padding: "100px 40px",
          textAlign: "center",
        }}
      >
        <div ref={featuresRef}>
          <span style={BADGE_STYLE}>Check our services</span>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 700,
              margin: "0 0 12px",
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            Everything we{" "}
            <span style={{ color: "#e05d2e" }}>provide</span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "16px",
              fontWeight: 300,
              maxWidth: "480px",
              margin: "0 auto 60px",
              lineHeight: 1.6,
              opacity: featuresVisible ? 1 : 0,
              transition: "all 0.6s ease 0.1s",
            }}
          >
            From tournament discovery to team management, GoalNepal turns your football journey into organized success — effortlessly.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {[
              {
                icon: <Trophy size={28} style={{ color: "#e05d2e" }} />,
                title: "Tournament Discovery",
                desc: "Browse all active and upcoming tournaments with filters by city and format.",
                delay: "0s",
              },
              {
                icon: <Calendar size={28} style={{ color: "#e05d2e" }} />,
                title: "Smart Scheduling",
                desc: "Daily fixture updates, automated reminders, and match schedule exports.",
                delay: "0.08s",
              },
              {
                icon: <MapPin size={28} style={{ color: "#e05d2e" }} />,
                title: "Location Aware",
                desc: "Discover matches and events happening near you on an interactive map.",
                delay: "0.16s",
              },
              {
                icon: <Users size={28} style={{ color: "#e05d2e" }} />,
                title: "Team Management",
                desc: "Manage rosters, track registrations, and coordinate with your squad.",
                delay: "0.24s",
              },
            ].map(({ icon, title, desc, delay }) => (
              <div
                key={title}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "28px 24px",
                  textAlign: "left",
                  opacity: featuresVisible ? 1 : 0,
                  transform: featuresVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.6s ease ${delay}`,
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "rgba(224,93,46,0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  {icon}
                </div>
                <h4
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    margin: "0 0 8px",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.35)",
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / PRIVACY STRIP */}
      <section style={{ background: "#080810", padding: "80px 40px" }}>
        <div ref={privacyRef}>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
              opacity: privacyVisible ? 1 : 0,
              transform: privacyVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease",
            }}
          >
            {[
              {
                icon: <Shield size={24} style={{ color: "#e05d2e" }} />,
                title: "Private & Secure",
                desc: "Your data and team info are kept private and never shared with third parties.",
              },
              {
                icon: <Wifi size={24} style={{ color: "#e05d2e" }} />,
                title: "Works Offline",
                desc: "Access your saved tournaments and schedules even without internet.",
              },
              {
                icon: <MapPin size={24} style={{ color: "#e05d2e" }} />,
                title: "Hyper Local",
                desc: "Content curated for Nepal — cities, leagues, and venues you actually know.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(224,93,46,0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      margin: "0 0 6px",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.35)",
                      margin: 0,
                      lineHeight: 1.55,
                      fontWeight: 300,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#0b0b16", padding: "100px 40px" }}>
        <div ref={testimonialsRef} style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={BADGE_STYLE}>What players say</span>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 700,
                margin: 0,
                opacity: testimonialsVisible ? 1 : 0,
                transform: testimonialsVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease",
              }}
            >
              Trusted by <span style={{ color: "#e05d2e" }}>Nepal&apos;s players</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                name: "Rajan Shrestha",
                role: "Futsal Player, Kathmandu",
                text: "GoalNepal made tournament registration super easy. No more calling organizers again and again.",
                delay: "0s",
              },
              {
                name: "Sujal Thapa",
                role: "Team Captain, Pokhara",
                text: "Everything is in one place — schedules, locations, and updates. Clean and reliable.",
                delay: "0.1s",
              },
              {
                name: "Anish Gurung",
                role: "Tournament Organizer",
                text: "Managing teams and players has never been this smooth. This platform is a game changer.",
                delay: "0.2s",
              },
            ].map(({ name, role, text, delay }) => (
              <div
                key={name}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "28px 24px",
                  opacity: testimonialsVisible ? 1 : 0,
                  transform: testimonialsVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.65s ease ${delay}`,
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    color: "#e05d2e",
                    fontFamily: "Georgia, serif",
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}
                >
                  &quot;
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.65,
                    margin: "0 0 24px",
                    fontWeight: 300,
                  }}
                >
                  {text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(224,93,46,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#e05d2e",
                    }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        margin: 0,
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.3)",
                        margin: 0,
                        fontWeight: 300,
                      }}
                    >
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          background: "#080810",
          padding: "100px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(224,93,46,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          ref={ctaRef}
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "620px",
            margin: "0 auto",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <span style={BADGE_STYLE}>Get started today</span>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              margin: "0 0 16px",
              lineHeight: 1.15,
            }}
          >
            Take your football journey
            <br />
            <span style={{ color: "#e05d2e" }}>to the next level</span>
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.65,
              margin: "0 0 40px",
              fontWeight: 300,
            }}
          >
            No spreadsheets needed. GoalNepal keeps tracking your teams and tournaments as easy as talking about them.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/tournaments"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#e05d2e",
                color: "#fff",
                fontWeight: 600,
                fontSize: "15px",
                padding: "14px 32px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Browse Tournaments <ArrowRight size={16} />
            </Link>
            <Link
              href="/news"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
                fontSize: "15px",
                padding: "14px 32px",
                borderRadius: "10px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Read News
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function MockupCard({
  icon,
  title,
  count,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  count: string;
  sub: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "40px",
        minWidth: "260px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          right: "-40px",
          width: "140px",
          height: "140px",
          background: "rgba(224,93,46,0.06)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          width: "72px",
          height: "72px",
          background: "rgba(224,93,46,0.1)",
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}
      >
        {icon}
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.35)",
          fontWeight: 400,
          margin: "0 0 8px",
          letterSpacing: "0.04em",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "44px",
          fontWeight: 800,
          color: "#fff",
          margin: "0 0 4px",
          lineHeight: 1,
        }}
      >
        {count}
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.3)",
          margin: 0,
          fontWeight: 300,
        }}
      >
        {sub}
      </p>
    </div>
  );
}