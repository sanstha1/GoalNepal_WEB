"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCheck } from "lucide-react";
import Header from "@/components/header";
import { motion } from "framer-motion";
import { useNotifications } from "@/hooks/useNotifications";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, loading, markAllRead } = useNotifications();

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const today = new Date().toDateString();
  const todayNotifs = notifications.filter(
    (n: Notification) => new Date(n.createdAt).toDateString() === today
  );
  const earlierNotifs = notifications.filter(
    (n: Notification) => new Date(n.createdAt).toDateString() !== today
  );

  const formatTime = (date: string) => {
    const d = new Date(date);
    const diff = Date.now() - d.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(diff / 86400000);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      <div style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 50, width: "100%" }}>
        <Header />
      </div>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <motion.button
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <h1 className="text-4xl font-bold text-white">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-white/40 mt-1">{unreadCount} unread messages</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={markAllRead}
            className="mb-8 flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </motion.button>

          {loading ? (
            <motion.div
              className="py-16 text-center text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Loading notifications...
            </motion.div>
          ) : notifications.length === 0 ? (
            <motion.div
              className="py-16 text-center text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No notifications yet
            </motion.div>
          ) : (
            <div className="space-y-8">
              {todayNotifs.length > 0 && (
                <Section
                  label="Today"
                  notifications={todayNotifs}
                  formatTime={formatTime}
                />
              )}
              {earlierNotifs.length > 0 && (
                <Section
                  label="Earlier"
                  notifications={earlierNotifs}
                  formatTime={formatTime}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface SectionProps {
  label: string;
  notifications: Notification[];
  formatTime: (date: string) => string;
}

function Section({ label, notifications, formatTime }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4 px-2">
        {label}
      </p>
      <div className="space-y-3">
        {notifications.map((n: Notification, index: number) => (
          <NotifCard
            key={n._id}
            n={n}
            formatTime={formatTime}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface NotifCardProps {
  n: Notification;
  formatTime: (date: string) => string;
  index: number;
}

function NotifCard({ n, formatTime, index }: NotifCardProps) {
  const getTypeColor = (type: string) => {
    if (type === "NEW_TOURNAMENT") return "#e05d2e";
    if (type === "PAYMENT") return "#22c55e";
    return "#3b82f6";
  };

  const getTypeIcon = (type: string) => {
    if (type === "NEW_TOURNAMENT") return "🏆";
    if (type === "PAYMENT") return "💰";
    return "📬";
  };

  return (
    <motion.div
      className="rounded-xl border border-white/10 overflow-hidden shadow-lg group cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.01, borderColor: "rgba(224, 93, 46, 0.3)" }}
    >
      <div className="p-5 flex gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0 flex-none"
          style={{
            backgroundColor: `${getTypeColor(n.type)}20`,
            borderLeft: `3px solid ${getTypeColor(n.type)}`,
          }}
        >
          {getTypeIcon(n.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-base font-bold text-white leading-tight">
              {n.title}
            </p>
            {!n.read && (
              <motion.span
                className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                style={{ backgroundColor: getTypeColor(n.type) }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
            )}
          </div>
          <p className="text-sm text-white/50 leading-snug mb-3">
            {n.message}
          </p>
          <p className="text-xs text-white/30 font-medium">
            {formatTime(n.createdAt)}
          </p>
        </div>
      </div>

      {!n.read && (
        <motion.div
          className="h-1 bg-linear-to-r"
          style={{
            backgroundImage: `linear-gradient(90deg, ${getTypeColor(n.type)}, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}