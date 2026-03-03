"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MapPin, Calendar, Bookmark, Trophy, Users, Phone, Mail, Hash, X } from "lucide-react";
import { useSaved, Tournament } from "@/context/SavedContext";
import { toast } from "react-toastify";

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

interface FormData {
  teamName: string;
  captainName: string;
  captainPhone: string;
  captainEmail: string;
  playerCount: string;
}

interface FormErrors {
  teamName?: string;
  captainName?: string;
  captainPhone?: string;
  captainEmail?: string;
  playerCount?: string;
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  error?: string;
}

function Field({ label, value, onChange, placeholder, icon, type = "text", error }: FieldProps) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            paddingLeft: "36px",
            paddingRight: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",
            fontSize: "14px",
            color: "#111827",
            backgroundColor: error ? "#fff1f2" : "#f9fafb",
            border: `1.5px solid ${error ? "#f87171" : "#e5e7eb"}`,
            borderRadius: "12px",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.target.style.borderColor = "#111827"; e.target.style.backgroundColor = "#ffffff"; }}
          onBlur={(e) => { e.target.style.borderColor = error ? "#f87171" : "#e5e7eb"; e.target.style.backgroundColor = error ? "#fff1f2" : "#f9fafb"; }}
        />
      </div>
      {error && <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>{error}</p>}
    </div>
  );
}

function SuccessDialog({ tournamentTitle, onClose }: { tournamentTitle: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 60 }}>
      <div className="bg-white w-full overflow-hidden" style={{ maxWidth: "360px", borderRadius: "20px", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
        <div className="flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", padding: "28px 24px 24px" }}>
          <div className="flex items-center justify-center mb-3" style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: 800, margin: 0 }}>Registration Submitted!</h2>
        </div>
        <div style={{ padding: "20px 24px 24px" }}>
          <div className="flex items-center gap-2 justify-center mb-3" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "100px", padding: "6px 14px" }}>
            <Trophy size={13} style={{ color: "#16a34a", flexShrink: 0 }} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#16a34a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "240px" }}>
              {tournamentTitle}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.6", marginBottom: "20px", textAlign: "center" }}>
            Your team has been successfully registered. The organizer will review and confirm shortly.
          </p>
          <button onClick={onClose} style={{ width: "100%", height: "44px", backgroundColor: "#111827", color: "white", borderRadius: "12px", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer" }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function RegistrationModal({ tournament, onClose }: { tournament: Tournament; onClose: () => void }) {
  const [form, setForm] = useState<FormData>({ teamName: "", captainName: "", captainPhone: "", captainEmail: "", playerCount: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const setField = (field: keyof FormData) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.teamName.trim()) e.teamName = "Team name is required";
    if (!form.captainName.trim()) e.captainName = "Captain name is required";
    if (!form.captainPhone.trim()) e.captainPhone = "Phone is required";
    else if (form.captainPhone.trim().length < 10) e.captainPhone = "Enter a valid phone number";
    if (!form.captainEmail.trim()) e.captainEmail = "Email is required";
    else if (!form.captainEmail.includes("@")) e.captainEmail = "Enter a valid email";
    if (!form.playerCount.trim()) e.playerCount = "Player count is required";
    else if (isNaN(Number(form.playerCount)) || Number(form.playerCount) < 1) e.playerCount = "Enter a valid number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const { handleRegisterForTournament } = await import("@/lib/actions/registration-action");
      const result = await handleRegisterForTournament({
        tournamentId: tournament._id,
        tournamentTitle: tournament.title,
        teamName: form.teamName.trim(),
        captainName: form.captainName.trim(),
        captainPhone: form.captainPhone.trim(),
        captainEmail: form.captainEmail.trim(),
        playerCount: Number(form.playerCount.trim()),
      });
      if (!result.success) { toast.error(result.message || "Registration failed"); return; }
      setShowSuccess(true);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Dark overlay — clicking closes modal */}
      <div
        className="fixed inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 40 }}
        onClick={onClose}
      />

      {/* Scroll container — above overlay, pointer-events only on modal box */}
      <div
        className="fixed inset-0 overflow-y-auto"
        style={{ zIndex: 41 }}
      >
        <div
          className="flex min-h-full items-start justify-center px-4"
          style={{ paddingTop: "130px", paddingBottom: "60px" }}
        >
          <div
            className="bg-white rounded-3xl w-full shadow-2xl"
            style={{ maxWidth: "448px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <Trophy size={20} className="text-gray-700 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Registering for</p>
                    <h2 className="text-base font-bold text-gray-900 leading-snug">{tournament.title}</h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {tournament.location} · {formatDateRange(tournament.startDate, tournament.endDate)}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="p-6 space-y-4">
              <Field label="Team Name" value={form.teamName} onChange={setField("teamName")} placeholder="e.g. Eagles FC" icon={<Users size={15} />} error={errors.teamName} />
              <Field label="Captain Name" value={form.captainName} onChange={setField("captainName")} placeholder="Full name" icon={<Users size={15} />} error={errors.captainName} />
              <Field label="Captain Phone" value={form.captainPhone} onChange={setField("captainPhone")} placeholder="98XXXXXXXX" icon={<Phone size={15} />} type="tel" error={errors.captainPhone} />
              <Field label="Captain Email" value={form.captainEmail} onChange={setField("captainEmail")} placeholder="email@example.com" icon={<Mail size={15} />} type="email" error={errors.captainEmail} />
              <Field label="Number of Players" value={form.playerCount} onChange={setField("playerCount")} placeholder={tournament.type === "futsal" ? "e.g. 5" : "e.g. 11"} icon={<Hash size={15} />} type="number" error={errors.playerCount} />
            </div>

            {/* Buttons */}
            <div className="px-6 pb-6 space-y-2">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-12 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center"
              >
                {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Submit Registration"}
              </button>
              <button onClick={onClose} disabled={isLoading} className="w-full h-10 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-60">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessDialog tournamentTitle={tournament.title} onClose={() => { setShowSuccess(false); onClose(); }} />
      )}
    </>
  );
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const { isSaved, toggleSaved } = useSaved();
  const [showModal, setShowModal] = useState(false);
  const saved = isSaved(tournament._id);
  const bannerUrl = getBannerUrl(tournament.bannerImage);

  const handleToggle = () => {
    toggleSaved(tournament);
    toast[saved ? "info" : "success"](saved ? "Tournament removed from saved." : "Tournament saved successfully!");
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
        <div className="relative h-48 bg-gray-100">
          {bannerUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={bannerUrl} alt={tournament.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
              <Trophy size={40} className="text-gray-300" />
            </div>
          )}
          <button onClick={handleToggle} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform">
            <Bookmark size={15} className={saved ? "text-black fill-black" : "text-gray-400"} />
          </button>
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${tournament.type === "football" ? "bg-black text-white" : "bg-white text-black border border-black"}`}>
              {tournament.type === "football" ? "⚽ Football" : "🥅 Futsal"}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h2 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 leading-snug">{tournament.title}</h2>
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <MapPin size={13} className="shrink-0" />
              <span className="truncate">{tournament.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Calendar size={13} className="shrink-0" />
              <span>{formatDateRange(tournament.startDate, tournament.endDate)}</span>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="mt-auto w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">
            Register
          </button>
        </div>
      </div>
      {showModal && <RegistrationModal tournament={tournament} onClose={() => setShowModal(false)} />}
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-10 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

type FilterType = "all" | "football" | "futsal";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
        const res = await fetch(`${baseUrl}/api/tournaments`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch tournaments");
        const data = await res.json();
        setTournaments(data.data || data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load tournaments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  const filtered = filter === "all" ? tournaments : tournaments.filter((t) => t.type === filter);
  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Football", value: "football" },
    { label: "Futsal", value: "futsal" },
  ];

  return (
    <div className="min-h-screen bg-[#fefee3] flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black">Ongoing Tournaments</h1>
            <p className="text-gray-600 mt-1 text-sm">Discover and register for the best football and futsal tournaments in Nepal</p>
          </div>
          <div className="flex gap-3 shrink-0">
            {filters.map(({ label, value }) => (
              <button key={value} onClick={() => setFilter(value)} className={`px-6 py-2.5 rounded-xl font-bold text-sm border-2 border-black transition-all duration-150 ${filter === value ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Trophy size={48} className="text-gray-300 mb-4" />
            <p className="text-red-500 font-medium">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">Try Again</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Trophy size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No tournaments found</p>
            {filter !== "all" && <button onClick={() => setFilter("all")} className="mt-3 text-sm text-gray-400 underline">Show all tournaments</button>}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => <TournamentCard key={t._id} tournament={t} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}