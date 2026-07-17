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
        backgroundColor: "#FAFAFA",
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
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            backgroundColor: "#EF4444",
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
              background: "rgba(255,255,255,0.08)",
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
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.5)",
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
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", marginTop: "8px", fontWeight: 300 }}>
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
              backgroundColor: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "999px",
              padding: "10px 20px",
            }}
          >
            <Trophy size={14} style={{ color: "#EF4444" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#EF4444", letterSpacing: "0.04em" }}>
              eSewa Payment Cancelled
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#FAFAFA",
              border: "1px solid #E5E7EB",
              borderRadius: "14px",
              padding: "18px",
              marginBottom: "24px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: "1.7", textAlign: "center", margin: 0, fontWeight: 300 }}>
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
                border: "1px solid #E5E7EB",
                backgroundColor: "#FAFAFA",
                color: "#6B7280",
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
                backgroundColor: "#EF4444",
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