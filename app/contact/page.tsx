"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto text-gray-300">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center gap-2 mb-8 text-white hover:text-[#4caf50] transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        <h1 className="text-3xl font-bold mb-6 text-white">Contact Us</h1>
        <p className="mb-6 leading-relaxed">
          We’d love to hear from you. Whether you have questions, feedback, or partnership inquiries, reach out below.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Email</h2>
            <p>
              You can email us at{" "}
              <a href="mailto:support@goalnepal.com" className="text-[#4caf50] hover:underline">
                support@goalnepal.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Phone</h2>
            <p>
              Call us at{" "}
              <a href="tel:+9779848843744" className="text-[#4caf50] hover:underline">
                +977 9848843744
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Address</h2>
            <p>GoalNepal, Pepsicola, Bagmati, Nepal</p>
          </section>
        </div>
      </div>
    </main>
  );
}
