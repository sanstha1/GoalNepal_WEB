"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/tournaments");
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-[#fefee3] flex items-center justify-center px-4">
      <div className="bg-white w-full overflow-hidden" style={{ maxWidth: "420px", borderRadius: "28px", boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}>
        <div className="flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", padding: "40px 24px 32px" }}>
          <div className="flex items-center justify-center mb-4" style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)" }}>
            <CheckCircle2 size={36} color="white" />
          </div>
          <h1 style={{ color: "white", fontSize: "24px", fontWeight: 800, margin: 0 }}>Payment Successful!</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginTop: "8px" }}>Your registration is confirmed</p>
        </div>

        <div style={{ padding: "28px 24px 32px" }}>
          <div className="flex items-center gap-2 justify-center mb-6" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "999px", padding: "10px 20px" }}>
            <Trophy size={14} style={{ color: "#16a34a" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#16a34a" }}>eSewa Payment Verified</span>
          </div>

          <div style={{ backgroundColor: "#f9fafb", borderRadius: "16px", padding: "18px", marginBottom: "24px" }}>
            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.7", textAlign: "center", margin: 0 }}>
              Your registration fee has been paid successfully and your team has been registered. The organizer will review and confirm shortly.
            </p>
          </div>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>
              Redirecting to tournaments in <span style={{ fontWeight: 800, color: "#16a34a" }}>{countdown}s</span>
            </p>
          </div>

          <button
            onClick={() => router.push("/tournaments")}
            style={{ width: "100%", height: "50px", borderRadius: "14px", backgroundColor: "#16a34a", color: "white", border: "none", fontWeight: 800, fontSize: "15px", cursor: "pointer" }}
          >
            Back to Tournaments
          </button>
        </div>
      </div>
    </div>
  );
}