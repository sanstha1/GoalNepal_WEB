/* eslint-disable @next/next/no-page-custom-font */
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
  color: "#FF8A2A",
  background: "#FFF4E8",
  border: "1px solid rgba(255,138,42,0.2)",
  borderRadius: "100px",
  padding: "4px 12px",
  marginBottom: "20px",
};

const SECTION_STYLE: React.CSSProperties = {
  background: "#FAFAFA",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
};

export default function HomePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    color: "rgba(0,0,0,0.04)",
    position: "absolute",
    top: "-16px",
    left: "-8px",
    userSelect: "none",
  };

  return (
    <div style={{ background: "#FAFAFA", color: "#2F2F2F", fontFamily: "'DM Sans', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700;800&display=swap"
        rel="stylesheet"
      />
      <Header />

      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#FAFAFA",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 60% at 80% 30%, rgba(255,138,42,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,138,42,0.4), transparent)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "left" }}>
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
                  background: "#FF8A2A",
                  display: "inline-block",
                }}
              />
              Nepal&apos;s #1 Football Platform
            </div>

            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
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
              <span style={{ color: "#FF8A2A" }}>Meets Passion</span>{" "}
              <span style={{ fontSize: "0.7em" }}>🇳🇵</span>
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "#6B7280",
                lineHeight: 1.65,
                maxWidth: "480px",
                margin: "0 0 40px",
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
                  background: "#FF8A2A",
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
                  background: "#FFFFFF",
                  color: "#2F2F2F",
                  fontWeight: 500,
                  fontSize: "15px",
                  padding: "13px 28px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  border: "1px solid #E5E7EB",
                  transition: "background 0.2s",
                }}
              >
                Latest News
              </Link>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.15s",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src="/images/football.png"
                alt="Football"
                width={600}
                height={600}
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                left: "-24px",
                width: "120px",
                height: "120px",
                background: "#FFF4E8",
                borderRadius: "50%",
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </section>

      <div
        style={{
          textAlign: "center",
          padding: "64px 24px 0",
          background: "#FAFAFA",
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
          GoalNepal in <span style={{ color: "#FF8A2A" }}>Action</span>
        </h2>
      </div>

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
                  color: "#9CA3AF",
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
                <span style={{ color: "#FF8A2A" }}>Across Nepal</span>
              </h3>
              <p
                style={{
                  color: "#6B7280",
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
                  <CheckCircle2 size={16} style={{ color: "#FF8A2A", flexShrink: 0 }} />
                  <span style={{ color: "#6B7280", fontSize: "14px" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <MockupCard icon={<Trophy size={36} style={{ color: "#FF8A2A" }} />} title="Active Tournaments" count="24" sub="Across 7 cities" />
          </div>
        </div>
      </section>

      <section
        style={{
          ...SECTION_STYLE,
          padding: "80px 0",
          background: "#FFFFFF",
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
                  color: "#9CA3AF",
                  margin: "0 0 16px",
                }}
              >
                Seamless Payments
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
                Join Tournaments <br />
                <span style={{ color: "#FF8A2A" }}>Pay with eSewa</span>
              </h3>
              <p
                style={{
                  color: "#6B7280",
                  lineHeight: 1.7,
                  fontSize: "16px",
                  fontWeight: 300,
                  marginBottom: "32px",
                }}
              >
                No paperwork, no phone calls. Register for any tournament and pay securely through eSewa in just a few taps — instantly confirmed on your dashboard.
              </p>
              {[
                "One-click tournament registration",
                "Secure payments via eSewa integration",
                "Instant confirmation & digital receipt",
              ].map((f) => (
                <div
                  key={f}
                  style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}
                >
                  <CheckCircle2 size={16} style={{ color: "#FF8A2A", flexShrink: 0 }} />
                  <span style={{ color: "#6B7280", fontSize: "14px" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ order: 1, display: "flex", justifyContent: "center" }}>
            <MockupCard icon={<Calendar size={36} style={{ color: "#FF8A2A" }} />} title="Registrations Completed" count="1,240+" sub="This season" />
          </div>
        </div>
      </section>

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
                  color: "#9CA3AF",
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
                <span style={{ color: "#FF8A2A" }}>Organizers & Fans</span>
              </h3>
              <p
                style={{
                  color: "#6B7280",
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
                  <CheckCircle2 size={16} style={{ color: "#FF8A2A", flexShrink: 0 }} />
                  <span style={{ color: "#6B7280", fontSize: "14px" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <MockupCard icon={<Users size={36} style={{ color: "#FF8A2A" }} />} title="Active Players" count="8,500+" sub="Across Nepal" />
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#FFFFFF",
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
            <span style={{ color: "#FF8A2A" }}>provide</span>
          </h2>
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "16px",
              fontWeight: 300,
              maxWidth: "480px",
              margin: "0 auto 60px",
              lineHeight: 1.6,
              opacity: featuresVisible ? 1 : 0,
              transition: "all 0.6s ease 0.1s",
            }}
          >
            From tournament discovery to secure payments, GoalNepal turns your football journey into organized success — effortlessly.
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
                icon: <Trophy size={28} style={{ color: "#FF8A2A" }} />,
                title: "Tournament Discovery",
                desc: "Browse all active and upcoming tournaments with filters by city and format.",
                delay: "0s",
              },
              {
                icon: <Calendar size={28} style={{ color: "#FF8A2A" }} />,
                title: "Smart Scheduling",
                desc: "Daily fixture updates, automated reminders, and match schedule exports.",
                delay: "0.08s",
              },
              {
                icon: <MapPin size={28} style={{ color: "#FF8A2A" }} />,
                title: "Location Aware",
                desc: "Discover matches and events happening near you on an interactive map.",
                delay: "0.16s",
              },
              {
                icon: <Users size={28} style={{ color: "#FF8A2A" }} />,
                title: "Seamless eSewa Payments",
                desc: "Pay tournament fees securely through integrated eSewa checkout.",
                delay: "0.24s",
              },
            ].map(({ icon, title, desc, delay }) => (
              <div
                key={title}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
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
                    background: "#FFF4E8",
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
                    color: "#2F2F2F",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
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

      <section style={{ background: "#FAFAFA", padding: "80px 40px" }}>
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
                icon: <Shield size={24} style={{ color: "#FF8A2A" }} />,
                title: "Private & Secure",
                desc: "Your data and payment details are kept private and never shared with third parties.",
              },
              {
                icon: <Wifi size={24} style={{ color: "#FF8A2A" }} />,
                title: "Works Offline",
                desc: "Access your saved tournaments and schedules even without internet.",
              },
              {
                icon: <MapPin size={24} style={{ color: "#FF8A2A" }} />,
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
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#FFF4E8",
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
                      color: "#2F2F2F",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6B7280",
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

      <section style={{ background: "#FFFFFF", padding: "100px 40px" }}>
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
              Trusted by <span style={{ color: "#FF8A2A" }}>Nepal&apos;s players</span>
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
                text: "GoalNepal made tournament registration super easy. Paying the fee through eSewa took seconds.",
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
                text: "Managing registrations and payments has never been this smooth. This platform is a game changer.",
                delay: "0.2s",
              },
            ].map(({ name, role, text, delay }) => (
              <div
                key={name}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
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
                    color: "#FF8A2A",
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
                    color: "#6B7280",
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
                      background: "#FFF4E8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#FF8A2A",
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
                        color: "#2F2F2F",
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9CA3AF",
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

      <section
        style={{
          background: "#FAFAFA",
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
              "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(255,138,42,0.08) 0%, transparent 70%)",
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
            <span style={{ color: "#FF8A2A" }}>to the next level</span>
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#6B7280",
              lineHeight: 1.65,
              margin: "0 0 40px",
              fontWeight: 300,
            }}
          >
            No spreadsheets needed. GoalNepal keeps tracking your tournaments and payments as easy as talking about them.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/tournaments"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#FF8A2A",
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
                background: "#FFFFFF",
                color: "#6B7280",
                fontWeight: 500,
                fontSize: "15px",
                padding: "14px 32px",
                borderRadius: "10px",
                textDecoration: "none",
                border: "1px solid #E5E7EB",
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
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
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
          background: "rgba(255,138,42,0.06)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          width: "72px",
          height: "72px",
          background: "#FFF4E8",
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
          color: "#9CA3AF",
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
          color: "#2F2F2F",
          margin: "0 0 4px",
          lineHeight: 1,
        }}
      >
        {count}
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "#9CA3AF",
          margin: 0,
          fontWeight: 300,
        }}
      >
        {sub}
      </p>
    </div>
  );
}