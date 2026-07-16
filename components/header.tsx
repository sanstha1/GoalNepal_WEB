"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Trophy, Newspaper, Bookmark, User, Bell, RefreshCw, MapPinned, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNotifications, INotification } from "../hooks/useNotifications";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    "flex items-center gap-2 text-[#2F2F2F] px-4 py-2 rounded-lg text-sm font-semibold transition-all";
  const normalClass =
    "flex items-center gap-2 text-[#6B7280] hover:text-[#2F2F2F] px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-[#FFF4E8]";

  const navItems = [
    { href: "/tournaments", label: "Tournaments", icon: Trophy },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/saved", label: "Saved", icon: Bookmark },
    { href: "/grounds", label: "Grounds", icon: MapPinned },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header
      className="w-full sticky top-0 z-50 border-b"
      style={{
        background: "#FFFFFF",
        borderColor: "#E5E7EB"
      }}
    >
      <div className="w-full flex items-center justify-between px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/home" className="cursor-pointer group flex items-center gap-2">
            <Image
              src="/images/logo2.png"
              alt="GoalNepal"
              width={140}
              height={40}
              style={{ height: "40px", width: "auto" }}
              priority
            />
          </Link>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className={isActive ? activeClass : normalClass}
                  style={
                    isActive
                      ? {
                          backgroundColor: "#FFF4E8",
                          borderLeft: "2px solid #FF8A2A"
                        }
                      : {}
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.div
            className="relative"
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={handleBellClick}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold text-sm ${
                open || pathname === "/notifications"
                  ? "text-[#2F2F2F]"
                  : "text-[#6B7280] hover:text-[#2F2F2F] hover:bg-[#FFF4E8]"
              }`}
              style={
                open || pathname === "/notifications"
                  ? {
                      backgroundColor: "#FFF4E8",
                      borderLeft: "2px solid #FF8A2A"
                    }
                  : {}
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 w-5 h-5 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #FF8A2A, #F97316)"
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {open && (
                <motion.div
                  className="absolute right-0 mt-3 w-96 rounded-xl shadow-2xl overflow-hidden z-50 border"
                  style={{
                    background: "#FFFFFF",
                    borderColor: "#E5E7EB"
                  }}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-b px-5 py-4 flex items-center justify-between" style={{ borderColor: "#E5E7EB" }}>
                    <span className="text-[#2F2F2F] font-bold text-base">Notifications</span>
                    <motion.button
                      onClick={refetch}
                      title="Refresh"
                      className="p-1.5 rounded-lg hover:bg-[#FFF4E8] transition"
                      whileHover={{ rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <RefreshCw className="w-4 h-4 text-[#6B7280]" />
                    </motion.button>
                  </div>

                  <div className="divide-y max-h-96 overflow-y-auto" style={{ borderColor: "#E5E7EB" }}>
                    {loading ? (
                      <div className="px-5 py-10 text-center text-[#9CA3AF] text-sm">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Loading notifications...
                        </motion.div>
                      </div>
                    ) : error ? (
                      <div className="px-5 py-10 text-center text-[#EF4444] text-sm">
                        {error}
                        <motion.button
                          onClick={refetch}
                          className="block mx-auto mt-3 text-[#FF8A2A] underline text-xs font-semibold hover:text-[#F97316]"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Retry
                        </motion.button>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="px-5 py-10 text-center text-[#9CA3AF] text-sm">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((n: INotification, idx) => (
                        <motion.div
                          key={n._id}
                          className="flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-[#FFF4E8] transition group"
                          style={
                            !n.read
                              ? { backgroundColor: "#FFF4E8" }
                              : {}
                          }
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <motion.div
                            className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-base font-bold flex-none"
                            style={{
                              backgroundColor: n.type === "NEW_TOURNAMENT" ? "#FFF4E8" : "rgba(100, 200, 255, 0.15)",
                              borderLeft: `3px solid ${n.type === "NEW_TOURNAMENT" ? "#FF8A2A" : "#64c8ff"}`
                            }}
                          >
                            {n.type === "NEW_TOURNAMENT" ? "🏆" : "📋"}
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#2F2F2F] leading-snug group-hover:text-[#2F2F2F]">{n.title}</p>
                            <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">{n.message}</p>
                            <p className="text-xs text-[#9CA3AF] mt-2">{new Date(n.createdAt).toLocaleDateString()}</p>
                          </div>
                          {!n.read && (
                            <motion.span
                              className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 flex-none shadow-lg"
                              style={{
                                background: "linear-gradient(135deg, #FF8A2A, #F97316)"
                              }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: idx * 0.05 + 0.2 }}
                            />
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>

                  <motion.div
                    className="px-5 py-3 text-center border-t"
                    style={{ borderColor: "#E5E7EB" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button
                      onClick={handleSeeAll}
                      className="text-[#FF8A2A] font-semibold text-sm hover:text-[#F97316] transition"
                      whileHover={{ x: 2 }}
                    >
                      See all notifications →
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#FFF4E8] transition text-[#6B7280] hover:text-[#2F2F2F]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden border-t px-6 py-4 space-y-2"
            style={{ borderColor: "#E5E7EB" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={isActive ? activeClass : normalClass}
                    style={
                      isActive
                        ? {
                            backgroundColor: "#FFF4E8",
                            borderLeft: "2px solid #FF8A2A"
                          }
                        : {}
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}