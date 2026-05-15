"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      {/* Background */}
      <Image
        src="/images/futsal.jpg"
        alt="Background"
        fill
        className="object-cover scale-110"
        priority
      />
      {/* Dark overlay with slight warm tint */}
      <div className="absolute inset-0 bg-[#1a1200]/75 backdrop-blur-[2px]" />

      {/* Decorative corner accents */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#fefee3]/30 rounded-tl-sm" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#fefee3]/30 rounded-tr-sm" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#fefee3]/30 rounded-bl-sm" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#fefee3]/30 rounded-br-sm" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-4">

        {/* Logo area */}
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-[#fefee3] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] mb-5">
            <Image
              src="/images/GoalNepalLogo.png"
              alt="GoalNepal Logo"
              width={120}
              height={48}
              className="mx-auto"
            />
          </div>
          <p className="text-[#fefee3]/60 text-xs tracking-[0.25em] uppercase">
            Your Football Hub
          </p>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={() => router.push("/login")}
            className="
              group relative w-full overflow-hidden
              bg-[#fefee3] text-[#1a1200]
              py-3.5 px-6 rounded-xl
              text-sm font-semibold tracking-widest uppercase
              shadow-[0_4px_20px_rgba(254,254,227,0.2)]
              transition-all duration-300
              hover:shadow-[0_6px_28px_rgba(254,254,227,0.35)]
              hover:scale-[1.02] active:scale-[0.98]
            "
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
          </button>

          <button
            onClick={() => router.push("/register")}
            className="
              group relative w-full overflow-hidden
              bg-transparent text-[#fefee3]
              py-3.5 px-6 rounded-xl
              text-sm font-semibold tracking-widest uppercase
              border border-[#fefee3]/40
              transition-all duration-300
              hover:border-[#fefee3]/80 hover:bg-[#fefee3]/8
              hover:scale-[1.02] active:scale-[0.98]
            "
          >
            <span className="relative z-10">Sign Up</span>
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-[#fefee3]/35 text-[11px] tracking-wide text-center">
          Nepal&apos;s futsal & football platform
        </p>
      </div>
    </div>
  );
}