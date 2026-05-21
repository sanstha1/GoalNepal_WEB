"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Trophy, Newspaper, Bookmark, User, Bell, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNotifications, INotification } from "../hooks/useNotifications";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, loading, error, refetch } = useNotifications();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleBellClick = () => {
    setOpen((v) => {
      if (!v) refetch();
      return !v;
    });
  };

  const handleSeeAll = () => {
    setOpen(false);
    router.push("/notifications");
  };

  const activeClass = "flex items-center gap-1.5 bg-[#6b7280] px-3 py-1.5 rounded-lg";
  const normalClass = "flex items-center gap-1.5 hover:text-gray-300 transition";

  return (
    <header className="w-full bg-[#4a4a4a] border-b border-gray-600 sticky top-0 z-50">
      <div className="w-full flex items-center justify-between px-6 py-2">
        <Link href="/home" className="cursor-pointer">
          <Image src="/images/GoalNepalLogo.png" alt="GoalNepal Logo" width={75} height={75} />
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

          <div className="relative" ref={ref}>
            <button
              onClick={handleBellClick}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${open || pathname === "/notifications" ? "bg-[#6b7280]" : "hover:text-gray-300"}`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ef5350] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="bg-[#4a4a4a] border-b border-gray-600 px-4 py-3 flex items-center justify-between">
                  <span className="text-white font-bold text-base">Notifications</span>
                  <button
                    onClick={refetch}
                    title="Refresh"
                    className="hover:opacity-80 transition"
                  >
                    <RefreshCw className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="px-4 py-8 text-center text-gray-400 text-sm">Loading...</div>
                  ) : error ? (
                    <div className="px-4 py-8 text-center text-red-400 text-sm">
                      {error}
                      <button onClick={refetch} className="block mx-auto mt-2 text-[#ef5350] underline text-xs">
                        Retry
                      </button>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-400 text-sm">No notifications</div>
                  ) : (
                    notifications.slice(0, 5).map((n: INotification) => (
                      <div
                        key={n._id}
                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition ${!n.read ? "bg-white" : "bg-gray-50/50"}`}
                      >
                        <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold ${n.type === "NEW_TOURNAMENT" ? "bg-red-100" : "bg-purple-100"}`}>
                          {n.type === "NEW_TOURNAMENT" ? "🏆" : "📋"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 leading-snug">{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0 mt-1" />}
                      </div>
                    ))
                  )}
                </div>

                <div className="px-4 py-3 text-center border-t border-gray-100">
                  <button
                    onClick={handleSeeAll}
                    className="text-[#4caf50] font-semibold text-sm hover:underline"
                  >
                    See all recent activity
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}