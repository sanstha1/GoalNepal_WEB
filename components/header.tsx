"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Newspaper, Bookmark, User, Bell } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const activeClass = "flex items-center gap-1.5 bg-[#6b7280] px-3 py-1.5 rounded-lg";
  const normalClass = "flex items-center gap-1.5 hover:text-gray-300 transition";

  return (
    <header className="w-full bg-[#4a4a4a] border-b border-gray-600 sticky top-0 z-50">
      <div className="w-full flex items-center justify-between px-6 py-2">
        <Link href="/home" className="cursor-pointer">
          <Image
            src="/images/GoalNepalLogo.png"
            alt="GoalNepal Logo"
            width={75}
            height={75}
          />
        </Link>

        <nav className="flex items-center gap-5 text-white text-sm">
          <Link href="/tournaments" className={pathname === "/tournaments" ? activeClass : normalClass}>
            <Trophy className="w-4 h-4" />
            <span>Tournaments</span>
          </Link>

          <Link href="/news" className={pathname === "/news" ? activeClass : normalClass}>
            <Newspaper className="w-4 h-4" />
            <span>News</span>
          </Link>

          <Link href="/saved" className={pathname === "/saved" ? activeClass : normalClass}>
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
          </Link>

          <Link href="/profile" className={pathname === "/profile" ? activeClass : normalClass}>
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>

          <Link href="/notifications" className={pathname === "/notifications" ? activeClass : normalClass}>
            <Bell className="w-4 h-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}