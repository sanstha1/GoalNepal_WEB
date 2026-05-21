import { NextResponse } from "next/server";
import { getAuthToken } from "@/lib/cookie";

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5050";

export async function PATCH() {
  const token = await getAuthToken();

  const res = await fetch(`${BACKEND_URL}/api/notifications/mark-read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}