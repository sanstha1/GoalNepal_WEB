/* eslint-disable @next/next/no-page-custom-font */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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
            backgroundColor: "#34A853",
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
            <CheckCircle2 size={36} color="white" />
          </motion.div>
          <h1 style={{ color: "white", fontSize: "24px", fontWeight: 800, margin: 0, fontFamily: "'Sora', sans-serif" }}>
            Payment Successful!
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", marginTop: "8px", fontWeight: 300 }}>
            Your registration is confirmed
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
              backgroundColor: "rgba(52,168,83,0.1)",
              border: "1px solid rgba(52,168,83,0.25)",
              borderRadius: "999px",
              padding: "10px 20px",
            }}
          >
            <Trophy size={14} style={{ color: "#34A853" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#34A853", letterSpacing: "0.04em" }}>
              eSewa Payment Verified
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
              Your registration fee has been paid successfully and your team has been registered. The organizer will review and confirm shortly.
            </p>
          </div>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "13px", color: "#9CA3AF", margin: 0 }}>
              Redirecting to tournaments in{" "}
              <span style={{ fontWeight: 800, color: "#34A853" }}>{countdown}s</span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/tournaments")}
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "12px",
              backgroundColor: "#34A853",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Back to Tournaments
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}