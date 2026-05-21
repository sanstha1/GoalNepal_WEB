"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface INotification {
  _id: string;
  userId: string;
  type: "NEW_TOURNAMENT" | "REGISTRATION_PENDING";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();

      if (!res.ok) {
        setError(`Failed: ${res.status}`);
        return;
      }

      setNotifications(Array.isArray(data) ? data : data.data ?? []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  const markAllRead = useCallback(async () => {
    try {
      await fetch("/api/notifications/mark-read", { method: "PATCH" });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    intervalRef.current = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAllRead,
    loading,
    error,
    refetch: fetchNotifications,
  };
}