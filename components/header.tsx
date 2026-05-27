"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Trophy, Newspaper, Bookmark, User, Bell, RefreshCw, MapPinned } from "lucide-react";
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

  const activeClass =
    "flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-white";
  const normalClass =
    "flex items-center gap-1.5 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all duration-200";

  return (
    <header
      className="w-full sticky top-0 z-50"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="absolute inset-0 border-b border-white/10" />
      <div className="w-full flex items-center justify-between px-8 py-3 relative">
        <Link href="/home" className="cursor-pointer group flex items-center gap-1">
          <span className="text-2xl font-black tracking-tight text-white">Goal</span>
          <span
            className="text-2xl font-black tracking-tight px-2 py-0.5 rounded-lg"
            style={{
              background: "linear-gradient(195deg, #000, #ff7043)",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Nepal
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link href="/tournaments" className={pathname === "/tournaments" ? activeClass : normalClass}>
            <Trophy className="w-4 h-4" />
            <span className="font-medium">Tournaments</span>
          </Link>
          <Link href="/news" className={pathname === "/news" ? activeClass : normalClass}>
            <Newspaper className="w-4 h-4" />
            <span className="font-medium">News</span>
          </Link>
          <Link href="/saved" className={pathname === "/saved" ? activeClass : normalClass}>
            <Bookmark className="w-4 h-4" />
            <span className="font-medium">Saved</span>
          </Link>
          <Link href="/profile" className={pathname === "/profile" ? activeClass : normalClass}>
            <User className="w-4 h-4" />
            <span className="font-medium">Profile</span>
          </Link>
          <Link href="/grounds" className={pathname === "/grounds" ? activeClass : normalClass}>
            <MapPinned className="w-4 h-4" />
            <span className="font-medium">Grounds</span>
          </Link>

          <div className="relative ml-1" ref={ref}>
            <button
              onClick={handleBellClick}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 font-medium ${
                open || pathname === "/notifications"
                  ? "bg-white/10 border border-white/20 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ef5350] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {open && (
              <div
                className="absolute right-0 mt-3 w-80 rounded-xl shadow-2xl overflow-hidden z-50 border border-white/10"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                }}
              >
                <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
                  <span className="text-white font-bold text-base tracking-wide">Notifications</span>
                  <button
                    onClick={refetch}
                    title="Refresh"
                    className="hover:opacity-80 transition p-1 rounded-lg hover:bg-white/10"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-300" />
                  </button>
                </div>

                <div className="divide-y divide-white/10 max-h-96 overflow-y-auto">
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
                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition ${
                          !n.read ? "bg-white/5" : ""
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold ${
                            n.type === "NEW_TOURNAMENT" ? "bg-red-500/20" : "bg-purple-500/20"
                          }`}
                        >
                          {n.type === "NEW_TOURNAMENT" ? "🏆" : "📋"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white leading-snug">{n.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                        </div>
                        {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0 mt-1 shadow-lg shadow-green-500/30" />}
                      </div>
                    ))
                  )}
                </div>

                <div className="px-4 py-3 text-center border-t border-white/10">
                  <button onClick={handleSeeAll} className="text-[#4caf50] font-semibold text-sm hover:underline">
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