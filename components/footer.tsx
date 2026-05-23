"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t mt-16"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
        <p>© 2025 GoalNepal. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <Link href="/privacy" className="hover:text-white cursor-pointer">Privacy</Link>
          <Link href="/terms" className="hover:text-white cursor-pointer">Terms</Link>
          <Link href="/contact" className="hover:text-white cursor-pointer">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
