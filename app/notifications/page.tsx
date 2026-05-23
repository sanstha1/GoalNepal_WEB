"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCheck, Clock, Calendar } from "lucide-react";
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
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-4">

        {/* Header */}
        <div
          className="rounded-2xl px-5 py-4 flex items-center justify-between mb-3"
          style={{ background: "linear-gradient(135deg, #1e1e2e 0%, #2d2640 100%)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-white/8 text-white hover:bg-white/15 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-white font-semibold text-lg tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="text-xs font-medium text-white/70 bg-white/10 border border-white/15 px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs font-medium text-white/70 bg-white/8 border border-white/15 px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No notifications yet</div>
        ) : (
          <>
            {todayNotifs.length > 0 && (
              <Section label="Today" notifications={todayNotifs} formatTime={formatTime} />
            )}
            {earlierNotifs.length > 0 && (
              <Section label="Earlier" notifications={earlierNotifs} formatTime={formatTime} />
            )}
          </>
        )}
      </div>
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
    <div className="mb-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 px-1 pb-2">
        {label}
      </p>
      <div className="flex flex-col gap-1.5">
        {notifications.map((n: Notification) => (
          <NotifCard key={n._id} n={n} formatTime={formatTime} />
        ))}
      </div>
    </div>
  );
}

interface NotifCardProps {
  n: Notification;
  formatTime: (date: string) => string;
}

function NotifCard({ n, formatTime }: NotifCardProps) {
  const isToday = new Date(n.createdAt).toDateString() === new Date().toDateString();

  return (
    <div
      className={`
        flex items-start gap-3.5 px-4 py-3.5 rounded-xl border cursor-pointer
        transition-all duration-150 hover:-translate-y-px hover:shadow-sm
        ${n.read
          ? "bg-white border-gray-100"
          : "bg-white border-l-[3px] border-l-violet-400 border-gray-100"
        }
      `}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
          n.type === "NEW_TOURNAMENT" ? "bg-violet-50" : "bg-emerald-50"
        }`}
      >
        {n.type === "NEW_TOURNAMENT" ? "🏆" : "📋"}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 leading-snug">{n.title}</p>
        <p className="text-sm text-gray-500 mt-0.5 leading-snug">{n.message}</p>
        <p className="flex items-center gap-1 text-[11px] text-gray-400 mt-1.5">
          {isToday ? <Clock className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
          {formatTime(n.createdAt)}
        </p>
      </div>

      {!n.read && (
        <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0 mt-1.5" />
      )}
    </div>
  );
}