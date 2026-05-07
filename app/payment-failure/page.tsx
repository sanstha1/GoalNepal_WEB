"use client";

import { useRouter } from "next/navigation";
import { XCircle, Trophy } from "lucide-react";

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fefee3] flex items-center justify-center px-4">
      <div className="bg-white w-full overflow-hidden" style={{ maxWidth: "420px", borderRadius: "28px", boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}>
        <div className="flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", padding: "40px 24px 32px" }}>
          <div className="flex items-center justify-center mb-4" style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)" }}>
            <XCircle size={36} color="white" />
          </div>
          <h1 style={{ color: "white", fontSize: "24px", fontWeight: 800, margin: 0 }}>Payment Failed</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginTop: "8px" }}>Something went wrong</p>
        </div>

        <div style={{ padding: "28px 24px 32px" }}>
          <div className="flex items-center gap-2 justify-center mb-6" style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "999px", padding: "10px 20px" }}>
            <Trophy size={14} style={{ color: "#dc2626" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#dc2626" }}>eSewa Payment Cancelled</span>
          </div>

          <div style={{ backgroundColor: "#f9fafb", borderRadius: "16px", padding: "18px", marginBottom: "24px" }}>
            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.7", textAlign: "center", margin: 0 }}>
              Your payment was not completed. No charges have been made. Please try again or contact support if the issue persists.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push("/tournaments")}
              style={{ height: "50px", borderRadius: "14px", border: "none", backgroundColor: "#f3f4f6", color: "#374151", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}
            >
              Go Back
            </button>
            <button
              onClick={() => router.push("/tournaments")}
              style={{ height: "50px", borderRadius: "14px", border: "none", backgroundColor: "#dc2626", color: "white", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}