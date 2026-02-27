"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Newspaper, Bookmark, User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const activeClass =
    "flex items-center gap-2 bg-[#6b7280] px-4 py-2 rounded-lg";
  const normalClass =
    "flex items-center gap-2 hover:text-gray-300 transition";

  return (
    <header className="w-full bg-[#4a4a4a] border-b border-gray-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/home" className="cursor-pointer">
          <Image
            src="/images/GoalNepalLogo.png"
            alt="GoalNepal Logo"
            width={100}
            height={100}
          />
        </Link>

        <nav className="flex items-center gap-8 text-white">
          <Link
            href="/tournaments"
            className={pathname === "/tournaments" ? activeClass : normalClass}
          >
            <Trophy className="w-5 h-5" />
            <span>Tournaments</span>
          </Link>

          <Link
            href="/news"
            className={pathname === "/news" ? activeClass : normalClass}
          >
            <Newspaper className="w-5 h-5" />
            <span>News</span>
          </Link>

          <Link
            href="/saved"
            className={pathname === "/saved" ? activeClass : normalClass}
          >
            <Bookmark className="w-5 h-5" />
            <span>Saved</span>
          </Link>

          <Link
            href="/profile"
            className={pathname === "/profile" ? activeClass : normalClass}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>

          
        </nav>
      </div>
    </header>
  );
}