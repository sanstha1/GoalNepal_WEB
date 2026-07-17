"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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

        <h1 className="text-3xl font-bold mb-6 text-[#2F2F2F]">Terms & Conditions</h1>
        <p className="mb-6 leading-relaxed">
          By using GoalNepal, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">Use of Service</h2>
            <p>You agree not to misuse our services or engage in activities that harm the platform or other users.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">Content Ownership</h2>
            <p>All content provided on GoalNepal is owned by us or our partners. Unauthorized use is prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">Changes</h2>
            <p>We may update these terms from time to time. Continued use of the platform means you accept the changes.</p>
          </section>
        </div>
      </div>
    </main>
  );
}