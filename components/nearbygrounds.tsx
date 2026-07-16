"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Navigation, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Icon, DivIcon } from "leaflet";

interface Ground {
  id: number;
  name: string;
  lat: number;
  lng: number;
  sport: string;
  surface: string | null;
  type: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

interface MapContentProps {
  userLocation: UserLocation;
  grounds: Ground[];
}

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://lz4.overpass-api.de/api/interpreter",
];

interface OverpassElement {
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

async function queryOverpass(lat: number, lng: number, radius: number): Promise<Ground[]> {
  const query = `
    [out:json][timeout:30];
    (
      node["leisure"="pitch"](around:${radius},${lat},${lng});
      way["leisure"="pitch"](around:${radius},${lat},${lng});
      node["leisure"="sports_centre"](around:${radius},${lat},${lng});
      way["leisure"="sports_centre"](around:${radius},${lat},${lng});
      node["sport"~"football|soccer|futsal|multi",i](around:${radius},${lat},${lng});
      way["sport"~"football|soccer|futsal|multi",i](around:${radius},${lat},${lng});
    );
    out center tags;
  `;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(32000),
      });

      if (!res.ok) continue;
      const json = await res.json();
      const seen = new Set<number>();

      return ((json.elements ?? []) as OverpassElement[])
        .map((el) => {
          const elLat = el.lat ?? el.center?.lat;
          const elLng = el.lon ?? el.center?.lon;
          if (!elLat || !elLng || seen.has(el.id)) return null;
          seen.add(el.id);

          return {
            id: el.id,
            name:
              el.tags?.name ||
              el.tags?.["name:en"] ||
              el.tags?.["name:ne"] ||
              "Unnamed Ground",
            lat: elLat,
            lng: elLng,
            sport: el.tags?.sport || el.tags?.leisure || "pitch",
            surface: el.tags?.surface || null,
            type: el.tags?.leisure || "pitch",
          };
        })
        .filter(Boolean) as Ground[];
    } catch {
      continue;
    }
  }

  return [];
}

function MapContent({ userLocation, grounds }: MapContentProps) {
  const [userIcon, setUserIcon] = useState<DivIcon | null>(null);
  const [groundIcon, setGroundIcon] = useState<DivIcon | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setUserIcon(
        new L.DivIcon({
          className: "",
          html: `<div style="width:18px;height:18px;background:#34A853;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 3px rgba(52,168,83,0.4)"></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        })
      );
      setGroundIcon(
        new L.DivIcon({
          className: "",
          html: `<div style="width:30px;height:30px;background:linear-gradient(135deg,#FF8A2A,#F97316);border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.15);font-size:14px">⚽</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })
      );
    });
  }, []);

  return (
    <>
      {userIcon && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon as Icon}>
          <Popup>
            <div style={{ textAlign: "center", padding: "4px" }}>
              <p style={{ fontWeight: 700, fontSize: "13px", color: "#2F2F2F" }}>Your Location</p>
            </div>
          </Popup>
        </Marker>
      )}
      {groundIcon &&
        grounds.map((g) => (
          <Marker key={g.id} position={[g.lat, g.lng]} icon={groundIcon as Icon}>
            <Popup>
              <div style={{ minWidth: "170px" }}>
                <p style={{ fontWeight: 700, fontSize: "13px", marginBottom: "4px", color: "#2F2F2F" }}>{g.name}</p>
                <p style={{ fontSize: "11px", color: "#6B7280", marginBottom: "8px", textTransform: "capitalize" }}>
                  {g.sport}{g.surface ? ` · ${g.surface}` : ""}
                </p>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${g.lat},${g.lng}&destination_place_id=${encodeURIComponent(g.name)}`,
                      "_blank"
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "7px 0",
                    background: "linear-gradient(135deg, #FF8A2A, #F97316)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  🧭 Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
}

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

export default function NearbyGrounds() {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: UserLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setLoading(false);
        if (!hasFetched.current) {
          hasFetched.current = true;
          fetchGrounds(loc);
        }
      },
      () => {
        setLocationError("Location access denied. Please allow location permission and refresh.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const fetchGrounds = async (loc: UserLocation) => {
    setFetching(true);
    setFetchError(null);
    try {
      const results = await queryOverpass(loc.lat, loc.lng, 10000);
      setGrounds(results);
      if (results.length === 0) {
        setFetchError("No grounds found. OSM coverage may be limited in your area.");
      }
    } catch {
      setFetchError("Failed to reach Overpass API. Check your internet connection.");
    } finally {
      setFetching(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-[#34A853] animate-spin" />
        <p className="text-[#6B7280] text-sm">Detecting your location...</p>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6">
        <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-[#EF4444]" />
        </div>
        <p className="text-[#2F2F2F] font-semibold text-center">{locationError}</p>
        <button
          onClick={() => router.push("/home")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#2F2F2F]"
          style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/home")}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-105"
            style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <ArrowLeft className="w-4 h-4 text-[#2F2F2F]" />
          </button>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #FF8A2A, #F97316)" }}
          >
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[#2F2F2F] font-black text-xl tracking-tight">Nearby Grounds</h1>
            <p className="text-[#6B7280] text-xs">Football & futsal grounds within 10km</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {fetching ? (
            <div className="flex items-center gap-2 text-[#6B7280] text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Searching grounds...</span>
            </div>
          ) : (
            <div
              className="px-3 py-1.5 rounded-lg text-sm font-semibold"
              style={{ background: "#ECFDF5", color: "#34A853", border: "1px solid #A7F3D0" }}
            >
              {grounds.length} ground{grounds.length !== 1 ? "s" : ""} found
            </div>
          )}
          {userLocation && (
            <button
              onClick={() => fetchGrounds(userLocation)}
              disabled={fetching}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
              style={{ background: "#FFF4E8", color: "#FF8A2A", border: "1px solid rgba(255,138,42,0.3)" }}
            >
              <Navigation className="w-3.5 h-3.5" />
              Refresh
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-2xl" style={{ height: "520px" }}>
        {userLocation && (
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MapContent userLocation={userLocation} grounds={grounds} />
          </MapContainer>
        )}
      </div>

      {!fetching && fetchError && (
        <div
          className="rounded-xl px-5 py-4 border border-[#E5E7EB] text-center"
          style={{ background: "#FFFFFF" }}
        >
          <p className="text-[#6B7280] text-sm">{fetchError}</p>
          <p className="text-[#9CA3AF] text-xs mt-1">Try zooming out on the map or check back later.</p>
        </div>
      )}

      {grounds.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {grounds.map((g) => (
            <div
              key={g.id}
              className="rounded-xl p-4 border border-[#E5E7EB] flex items-start gap-3 transition-all hover:border-[#FF8A2A]"
              style={{ background: "#FFFFFF" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-lg"
                style={{ background: "#FFF4E8" }}
              >
                ⚽
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#2F2F2F] font-semibold text-sm truncate">{g.name}</p>
                <p className="text-[#9CA3AF] text-xs mt-0.5 capitalize">
                  {g.sport}{g.surface ? ` · ${g.surface}` : ""}
                </p>
              </div>
              <button
                onClick={() =>
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${g.lat},${g.lng}`, "_blank")
                }
                className="shrink-0 p-2 rounded-lg transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FF8A2A, #F97316)" }}
              >
                <Navigation className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}