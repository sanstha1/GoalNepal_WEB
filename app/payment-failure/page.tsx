/* eslint-disable @next/next/no-page-custom-font */
"use client";

import { useRouter } from "next/navigation";
import { XCircle, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "24px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            padding: "40px 24px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "50%",
            }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <XCircle size={36} color="white" />
          </motion.div>
          <h1 style={{ color: "white", fontSize: "24px", fontWeight: 800, margin: 0, fontFamily: "'Sora', sans-serif" }}>
            Payment Failed
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginTop: "8px", fontWeight: 300 }}>
            Something went wrong
          </p>
        </div>

        <div style={{ padding: "28px 24px 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              marginBottom: "24px",
              backgroundColor: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.25)",
              borderRadius: "999px",
              padding: "10px 20px",
            }}
          >
            <Trophy size={14} style={{ color: "#ef4444" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#ef4444", letterSpacing: "0.04em" }}>
              eSewa Payment Cancelled
            </span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              padding: "18px",
              marginBottom: "24px",
            }}
          >
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.7", textAlign: "center", margin: 0, fontWeight: 300 }}>
              Your payment was not completed. No charges have been made. Please try again or contact support if the issue persists.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/tournaments")}
              style={{
                height: "50px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              Go Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/tournaments")}
              style={{
                height: "50px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#dc2626",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}