"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoints";

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
      const response = await axios.get(API.NOTIFICATIONS.GET_ALL);
      const data = response.data;
      setNotifications(Array.isArray(data) ? data : data.notifications ?? []);
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to fetch notifications", err);
      setError(`Failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAllRead = useCallback(async () => {
    try {
      await axios.patch(API.NOTIFICATIONS.MARK_READ);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err: unknown) {
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