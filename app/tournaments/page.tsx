"use client";

import Header from "@/components/header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Calendar, Bookmark, Trophy, Users, Phone, Mail, Hash, X, IndianRupee, ShieldCheck, ArrowRight } from "lucide-react";
import { useSaved, Tournament } from "@/context/SavedContext";
import { toast } from "react-toastify";

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateRange(start: string, end: string) {
  const s = new Date(start), e = new Date(end);
  return `${s.getDate()} ${MONTHS[s.getMonth() + 1]} - ${e.getDate()} ${MONTHS[e.getMonth() + 1]}, ${e.getFullYear()}`;
}

function getBannerUrl(bannerImage?: string | null) {
  if (!bannerImage) return null;
  if (bannerImage.startsWith("http")) return bannerImage;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
  return `${baseUrl}/tournament_banners/${bannerImage.split("/").pop()}`;
}

interface FormData { teamName: string; captainName: string; captainPhone: string; captainEmail: string; playerCount: string; }
interface FormErrors { teamName?: string; captainName?: string; captainPhone?: string; captainEmail?: string; playerCount?: string; }

function Field({ label, value, onChange, placeholder, icon, type = "text", error }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
  icon: React.ReactNode; type?: string; error?: string;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: "6px" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", pointerEvents: "none" }}>{icon}</div>
        <input
          type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: "100%", paddingLeft: "36px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px", fontSize: "14px", color: "rgba(255,255,255,0.85)", backgroundColor: error ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)", border: `1.5px solid ${error ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: "12px", outline: "none", boxSizing: "border-box" }}
          onFocus={(e) => { e.target.style.borderColor = "rgba(224, 93, 46, 0.5)"; e.target.style.backgroundColor = "rgba(255,255,255,0.07)"; }}
          onBlur={(e) => { e.target.style.borderColor = error ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.1)"; e.target.style.backgroundColor = error ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)"; }}
        />
      </div>
      {error && <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>{error}</p>}
    </div>
  );
}

function PaymentSuccessDialog({ tournamentTitle, onClose }: { tournamentTitle: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 70 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white w-full overflow-hidden"
        style={{ maxWidth: "380px", borderRadius: "24px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", padding: "32px 24px 28px" }}>
          <motion.div
            className="flex items-center justify-center mb-4"
            style={{ width: "62px", height: "62px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </motion.div>
          <h2 style={{ color: "white", fontSize: "20px", fontWeight: 800, margin: 0 }}>Payment Successful</h2>
        </div>
        <div style={{ padding: "24px" }}>
          <div className="flex items-center gap-2 justify-center mb-4" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "999px", padding: "8px 16px" }}>
            <Trophy size={13} style={{ color: "#16a34a" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#16a34a" }}>{tournamentTitle}</span>
          </div>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.7", textAlign: "center", marginBottom: "22px" }}>Your registration fee has been paid and your team has been registered.</p>
          <button onClick={onClose} style={{ width: "100%", height: "48px", borderRadius: "14px", backgroundColor: "#16a34a", color: "white", border: "none", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}>Done</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SuccessDialog({ tournamentTitle, onClose }: { tournamentTitle: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 70 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white w-full overflow-hidden"
        style={{ maxWidth: "380px", borderRadius: "24px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #111827, #374151)", padding: "32px 24px 28px" }}>
          <motion.div
            className="flex items-center justify-center mb-4"
            style={{ width: "62px", height: "62px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </motion.div>
          <h2 style={{ color: "white", fontSize: "20px", fontWeight: 800, margin: 0 }}>Registration Submitted!</h2>
        </div>
        <div style={{ padding: "24px" }}>
          <div className="flex items-center gap-2 justify-center mb-4" style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "999px", padding: "8px 16px" }}>
            <Trophy size={13} style={{ color: "#374151" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>{tournamentTitle}</span>
          </div>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.7", textAlign: "center", marginBottom: "22px" }}>Your team has been successfully registered. The organizer will review and confirm shortly.</p>
          <button onClick={onClose} style={{ width: "100%", height: "48px", borderRadius: "14px", backgroundColor: "#111827", color: "white", border: "none", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}>Done</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PaymentModal({ tournament, onClose }: { tournament: Tournament; onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleEsewaPayment = async () => {
    setLoading(true);
    try {
      const amount = String(tournament.registrationFee);

      const res = await fetch("/api/esewa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (!res.ok) { toast.error("Failed to initiate payment"); setLoading(false); return; }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields: Record<string, string> = {
        amount: amount,
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: data.transaction_uuid,
        product_code: data.product_code,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: `${window.location.origin}/payment-success`,
        failure_url: `${window.location.origin}/payment-failure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: data.signature,
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", zIndex: 65 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-black w-full overflow-hidden"
        style={{ maxWidth: "520px", borderRadius: "28px", border: "1px solid rgba(224,93,46,0.3)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ padding: "26px" }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div style={{ width: "58px", height: "58px", borderRadius: "18px", backgroundColor: "rgba(224,93,46,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IndianRupee size={26} color="#e05d2e" />
              </div>
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "rgba(255,255,255,0.95)", margin: 0 }}>Complete Registration</h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>Secure your tournament slot with eSewa payment</p>
              </div>
            </div>
            <button onClick={onClose} style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)" }}><X size={18} /></button>
          </div>

          <div style={{ marginTop: "24px", backgroundColor: "rgba(224,93,46,0.08)", border: "1.5px solid rgba(224,93,46,0.2)", borderRadius: "18px", padding: "18px" }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: "12px", color: "#e05d2e", fontWeight: 700, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Tournament</p>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "rgba(255,255,255,0.95)", margin: 0 }}>{tournament.title}</h3>
              </div>
              <div style={{ width: "52px", height: "52px", borderRadius: "16px", backgroundColor: "rgba(224,93,46,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><Trophy size={22} color="#e05d2e" /></div>
            </div>
            <div className="flex items-center justify-between" style={{ marginTop: "18px", paddingTop: "18px", borderTop: "1px solid rgba(224,93,46,0.2)" }}>
              <div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: "5px" }}>Registration Fee</p>
                <h1 style={{ fontSize: "32px", fontWeight: 900, color: "rgba(255,255,255,0.95)", margin: 0, lineHeight: 1 }}>NPR {tournament.registrationFee?.toLocaleString()}</h1>
              </div>
              <div style={{ backgroundColor: "rgba(224,93,46,0.2)", color: "#e05d2e", fontSize: "12px", fontWeight: 800, borderRadius: "999px", padding: "8px 14px" }}>Required</div>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "12px" }}>Select Payment Method</p>
            <div style={{ border: "2px solid #e05d2e", borderRadius: "18px", padding: "18px" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#e05d2e", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: "28px" }}>e</div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "rgba(255,255,255,0.95)" }}>eSewa</h3>
                    <p style={{ margin: "4px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>Pay securely using eSewa</p>
                  </div>
                </div>
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "rgba(224,93,46,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={18} color="#e05d2e" /></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between" style={{ marginTop: "20px", backgroundColor: "rgba(224,93,46,0.08)", border: "1px solid rgba(224,93,46,0.2)", borderRadius: "14px", padding: "14px 16px" }}>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} color="#e05d2e" />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#e05d2e" }}>Your payment is 100% secure</span>
            </div>
            <ShieldCheck size={16} color="#e05d2e" />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={onClose} disabled={loading} style={{ height: "50px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", fontWeight: 800, cursor: "pointer" }}>Cancel</button>
            <button onClick={handleEsewaPayment} disabled={loading} style={{ height: "50px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #e05d2e, #d45a28)", color: "white", fontWeight: 800, cursor: "pointer" }}>
              {loading ? "Redirecting..." : "Pay with eSewa"}
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.25)", marginTop: "14px" }}>You will be redirected to eSewa to complete the payment.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RegistrationModal({ tournament, onClose }: { tournament: Tournament; onClose: () => void }) {
  const [form, setForm] = useState<FormData>({ teamName: "", captainName: "", captainPhone: "", captainEmail: "", playerCount: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFreeSuccess, setShowFreeSuccess] = useState(false);

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

  const handleProceed = async () => {
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
      if (tournament.registrationFee && tournament.registrationFee > 0) setShowPayment(true);
      else setShowFreeSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasFee = tournament.registrationFee && tournament.registrationFee > 0;

  return (
    <>
      <motion.div
        className="fixed inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 40 }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: 41 }}>
        <div className="flex min-h-full items-start justify-center px-4" style={{ paddingTop: "130px", paddingBottom: "60px" }}>
          <motion.div
            className="bg-black rounded-3xl w-full shadow-2xl"
            style={{ maxWidth: "448px", border: "1px solid rgba(224,93,46,0.2)" }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-6 pb-4 border-b" style={{ borderColor: "rgba(224,93,46,0.2)" }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <Trophy size={20} style={{ color: "#e05d2e", marginTop: "2px" }} />
                  <div className="min-w-0 w-full">
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontWeight: 500, marginBottom: "4px" }}>Registering for</p>
                    <h2 className="text-base font-bold" style={{ color: "rgba(255,255,255,0.95)", lineHeight: "1.3", marginBottom: "6px" }}>{tournament.title}</h2>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{tournament.location} · {formatDateRange(tournament.startDate, tournament.endDate)}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px", padding: "12px", borderRadius: "12px", backgroundColor: hasFee ? "rgba(224,93,46,0.08)" : "rgba(34,197,94,0.08)", border: hasFee ? "1px solid rgba(224,93,46,0.2)" : "1px solid rgba(34,197,94,0.2)" }}>
                      <div className="flex items-center gap-2">
                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: hasFee ? "#e05d2e" : "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <IndianRupee size={13} color="white" />
                        </div>
                        <div>
                          <p style={{ fontSize: "9px", fontWeight: 700, color: hasFee ? "#e05d2e" : "#22c55e", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Registration Fee</p>
                          <p style={{ fontSize: "14px", fontWeight: 800, color: "rgba(255,255,255,0.95)", margin: 0, lineHeight: 1.1 }}>
                            {hasFee ? `NPR ${tournament.registrationFee?.toLocaleString()}` : "Free"}
                          </p>
                        </div>
                      </div>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: hasFee ? "#e05d2e" : "#22c55e", backgroundColor: hasFee ? "rgba(224,93,46,0.15)" : "rgba(34,197,94,0.15)", borderRadius: "999px", padding: "3px 8px" }}>
                        {hasFee ? "Required" : "No Cost"}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0" style={{ color: "rgba(255,255,255,0.3)", border: "none", background: "none", cursor: "pointer" }}><X size={20} /></button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <Field label="Team Name" value={form.teamName} onChange={setField("teamName")} placeholder="e.g. Eagles FC" icon={<Users size={15} />} error={errors.teamName} />
              <Field label="Captain Name" value={form.captainName} onChange={setField("captainName")} placeholder="Full name" icon={<Users size={15} />} error={errors.captainName} />
              <Field label="Captain Phone" value={form.captainPhone} onChange={setField("captainPhone")} placeholder="98XXXXXXXX" icon={<Phone size={15} />} type="tel" error={errors.captainPhone} />
              <Field label="Captain Email" value={form.captainEmail} onChange={setField("captainEmail")} placeholder="email@example.com" icon={<Mail size={15} />} type="email" error={errors.captainEmail} />
              <Field label="Number of Players" value={form.playerCount} onChange={setField("playerCount")} placeholder={tournament.type === "futsal" ? "e.g. 5" : "e.g. 11"} icon={<Hash size={15} />} type="number" error={errors.playerCount} />
            </div>

            <div className="px-6 pb-6 space-y-2">
              <button onClick={handleProceed} disabled={isLoading} style={{ width: "100%", height: "48px", backgroundColor: "#e05d2e", color: "white", borderRadius: "12px", fontWeight: 800, fontSize: "14px", cursor: "pointer", border: "none", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s" }}>
                {isLoading ? <div style={{ width: "18px", height: "18px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : hasFee ? "Continue to Payment" : "Submit Registration"}
              </button>
              <button onClick={onClose} disabled={isLoading} style={{ width: "100%", height: "40px", fontSize: "14px", color: "rgba(255,255,255,0.35)", border: "none", background: "none", cursor: "pointer", transition: "color 0.2s" }}>Cancel</button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {showPayment && <PaymentModal tournament={tournament} onClose={() => setShowPayment(false)} onSuccess={() => { setShowPayment(false); setShowSuccess(true); }} />}
      {showSuccess && <PaymentSuccessDialog tournamentTitle={tournament.title} onClose={() => { setShowSuccess(false); onClose(); }} />}
      {showFreeSuccess && <SuccessDialog tournamentTitle={tournament.title} onClose={() => { setShowFreeSuccess(false); onClose(); }} />}
    </>
  );
}

function TournamentCard({ tournament, index }: { tournament: Tournament; index: number }) {
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
      <motion.div
        className="rounded-xl border border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative h-48 bg-gray-900">
          {bannerUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={bannerUrl} alt={tournament.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-900 to-black"><Trophy size={40} color="rgba(255,255,255,0.15)" /></div>
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4))" }} />
          <motion.button
            onClick={handleToggle}
            className="absolute top-3 right-3 w-8 h-8 bg-black rounded-full shadow flex items-center justify-center"
            style={{ border: "1px solid rgba(224,93,46,0.3)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bookmark size={15} className={saved ? "fill-orange-500" : ""} style={{ color: saved ? "#e05d2e" : "rgba(255,255,255,0.35)" }} />
          </motion.button>
          <div className="absolute top-3 left-3">
            <span style={{ fontSize: "12px", fontWeight: 700, padding: "6px 12px", borderRadius: "8px", backgroundColor: tournament.type === "football" ? "#e05d2e" : "rgba(34,197,94,0.2)", color: tournament.type === "football" ? "white" : "#22c55e", border: tournament.type === "football" ? "none" : "1px solid rgba(34,197,94,0.5)" }}>
              {tournament.type === "football" ? "⚽ Football" : "🥅 Futsal"}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h2 className="font-bold text-lg mb-3 line-clamp-2 leading-snug" style={{ color: "rgba(255,255,255,0.95)" }}>{tournament.title}</h2>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}><MapPin size={14} className="shrink-0" /><span className="truncate">{tournament.location}</span></div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}><Calendar size={14} className="shrink-0" /><span>{formatDateRange(tournament.startDate, tournament.endDate)}</span></div>
          </div>
          <motion.button
            onClick={() => setShowModal(true)}
            className="mt-auto w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{ backgroundColor: "#e05d2e", color: "white", border: "none", cursor: "pointer" }}
            whileHover={{ backgroundColor: "#d45a28" }}
            whileTap={{ scale: 0.98 }}
          >
            Register
          </motion.button>
        </div>
      </motion.div>
      {showModal && <RegistrationModal tournament={tournament} onClose={() => setShowModal(false)} />}
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden shadow-lg" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
      <div className="h-48 bg-gray-900" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-900 rounded w-3/4" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        <div className="h-3 bg-gray-900 rounded w-1/2" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        <div className="h-3 bg-gray-900 rounded w-2/3" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        <div className="h-10 bg-gray-900 rounded-xl mt-4" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
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
  const filters: { label: string; value: FilterType }[] = [{ label: "All", value: "all" }, { label: "Football", value: "football" }, { label: "Futsal", value: "futsal" }];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff" }}
    >
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.2; } }
      `}</style>
      <div style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 50, width: "100%" }}>
        <Header />
      </div>
      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-bold mb-4" style={{ color: "rgba(255,255,255,0.95)" }}>Ongoing Tournaments</h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "18px", fontWeight: 300 }}>Discover and register for the best football and futsal tournaments across Nepal</p>
          </motion.div>

          <motion.div
            className="flex gap-3 justify-center mb-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {filters.map(({ label, value }, idx) => (
              <motion.button
                key={value}
                onClick={() => setFilter(value)}
                className="px-6 py-2.5 rounded-xl font-bold text-sm border-2 transition-all duration-150"
                style={{
                  borderColor: "#e05d2e",
                  backgroundColor: filter === value ? "#e05d2e" : "transparent",
                  color: filter === value ? "white" : "rgba(255,255,255,0.55)"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <motion.div
              className="flex flex-col items-center justify-center py-24 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy size={48} style={{ color: "rgba(255,255,255,0.15)", marginBottom: "16px" }} />
              <p style={{ color: "#ef4444", fontWeight: 500, fontSize: "18px" }}>{error}</p>
              <motion.button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 rounded-xl text-sm font-bold transition-all"
                style={{ backgroundColor: "#e05d2e", color: "white", border: "none", cursor: "pointer" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-24 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy size={48} style={{ color: "rgba(255,255,255,0.15)", marginBottom: "16px" }} />
              <p style={{ color: "rgba(255,255,255,0.35)", fontWeight: 500, fontSize: "18px" }}>No tournaments found</p>
              {filter !== "all" && (
                <motion.button
                  onClick={() => setFilter("all")}
                  className="mt-3 text-sm"
                  style={{ color: "rgba(255,255,255,0.35)", textDecoration: "underline", border: "none", background: "none", cursor: "pointer" }}
                  whileHover={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Show all tournaments
                </motion.button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, i) => <TournamentCard key={t._id} tournament={t} index={i} />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}