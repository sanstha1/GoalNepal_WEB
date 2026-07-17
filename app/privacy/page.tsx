"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{
        backgroundColor: "#FAFAFA",
      }}
    >
      <div className="max-w-4xl mx-auto text-[#6B7280]">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center gap-2 mb-8 text-[#2F2F2F] hover:text-[#FF8A2A] transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        <h1 className="text-3xl font-bold mb-6 text-[#2F2F2F]">Privacy Policy</h1>
        <p className="mb-6 leading-relaxed">
          At GoalNepal, we value your privacy. This page explains how we collect, use, and protect your personal information.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">Information We Collect</h2>
            <p>We may collect data such as your name, email address, and usage activity to improve our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">How We Use Information</h2>
            <p>Your information is used to personalize your experience, provide updates, and ensure platform security.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">Contact Us</h2>
            <p>
              If you have questions about this policy, please reach out via our{" "}
              <a href="/contact" className="text-[#FF8A2A] hover:underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}