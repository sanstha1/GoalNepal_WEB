"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, loading, markAllRead } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#ef5350] px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-white hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-white font-bold text-xl">Notifications</h1>
          </div>
          <button
            onClick={markAllRead}
            className="text-white text-xs font-semibold border border-white/50 px-3 py-1 rounded-full hover:bg-white/10 transition"
          >
            Mark all read
          </button>
        </div>

        <div className="bg-white divide-y divide-gray-100 shadow-sm">
          {loading ? (
            <div className="py-16 text-center text-gray-400">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="py-16 text-center text-gray-400">No notifications yet</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer ${!n.read ? "bg-white" : "bg-gray-50/40"}`}
              >
                <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-xl ${n.type === "NEW_TOURNAMENT" ? "bg-red-100" : "bg-purple-100"}`}>
                  {n.type === "NEW_TOURNAMENT" ? "🏆" : "📋"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800">{n.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p>
                </div>
                {!n.read && <span className="w-3 h-3 rounded-full bg-[#4caf50] shrink-0 mt-1" />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}