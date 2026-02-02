"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Image
        src="/images/futsal.jpg"
        alt="Background"
        fill
        className="object-cover blur-md scale-110"
        priority
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 bg-[#fefee3] p-10 rounded-xl text-center w-96 shadow-2xl">
        <Image
          src="/images/GoalNepalLogo.png"
          alt="GoalNepal Logo"
          width={200}
          height={80}
          className="mx-auto mb-6"
        />

        <button
          onClick={() => router.push("/login")}
          className="w-full bg-black text-white py-2 rounded mb-4 hover:bg-gray-800 transition"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}