import { NearbyGroundsResponse } from "@/types/ground";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

export async function fetchNearbyGrounds(
  lat: number,
  lng: number,
  radiusKm: number = 10
): Promise<NearbyGroundsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/grounds/nearby?lat=${lat}&lng=${lng}&radius=${radiusKm}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch nearby grounds: ${response.statusText}`);
  }

  return response.json();
}