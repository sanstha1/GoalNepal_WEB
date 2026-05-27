"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Navigation, AlertCircle, Loader2 } from "lucide-react";

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

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

function MapContent({ userLocation, grounds }: { userLocation: UserLocation; grounds: Ground[] }) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setL(leaflet);
    });
  }, []);

  const userIcon = L
    ? new L.DivIcon({
        className: "",
        html: `<div style="width:18px;height:18px;background:#4caf50;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 3px rgba(76,175,80,0.4)"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })
    : undefined;

  const groundIcon = L
    ? new L.DivIcon({
        className: "",
        html: `<div style="width:28px;height:28px;background:linear-gradient(135deg,#ef5350,#ff7043);border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.4);font-size:13px">⚽</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })
    : undefined;

  const handleDirections = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {userIcon && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div className="text-center p-1">
              <p className="font-bold text-sm text-gray-800">Your Location</p>
            </div>
          </Popup>
        </Marker>
      )}
      {groundIcon &&
        grounds.map((g) => (
          <Marker key={g.id} position={[g.lat, g.lng]} icon={groundIcon}>
            <Popup>
              <div style={{ minWidth: "160px" }}>
                <p style={{ fontWeight: 700, fontSize: "13px", marginBottom: "4px", color: "#1a1a2e" }}>{g.name}</p>
                <p style={{ fontSize: "11px", color: "#666", marginBottom: "8px", textTransform: "capitalize" }}>
                  {g.sport} · {g.surface || g.type}
                </p>
                <button
                  onClick={() => handleDirections(g.lat, g.lng, g.name)}
                  style={{
                    width: "100%",
                    padding: "6px 0",
                    background: "linear-gradient(135deg, #ef5350, #ff7043)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  <span>🧭</span> Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
}

export default function NearbyGrounds() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
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
    try {
      const res = await fetch(`/api/grounds?lat=${loc.lat}&lng=${loc.lng}&radius=5000`);
      const data = await res.json();
      if (data.grounds) setGrounds(data.grounds);
    } catch {
      // silently fail, map still shows
    } finally {
      setFetching(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-[#4caf50] animate-spin" />
        <p className="text-gray-300 text-sm">Detecting your location...</p>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-[#ef5350]" />
        </div>
        <p className="text-white font-semibold text-center">{locationError}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ef5350] to-[#ff7043] flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-black text-xl tracking-tight">Nearby Grounds</h1>
            <p className="text-gray-400 text-xs">Football & futsal grounds within 5km</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {fetching && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading grounds...</span>
            </div>
          )}
          {!fetching && (
            <div
              className="px-3 py-1.5 rounded-lg text-sm font-semibold"
              style={{ background: "rgba(76,175,80,0.15)", color: "#4caf50", border: "1px solid rgba(76,175,80,0.3)" }}
            >
              {grounds.length} ground{grounds.length !== 1 ? "s" : ""} found
            </div>
          )}
          {userLocation && (
            <button
              onClick={() => fetchGrounds(userLocation)}
              disabled={fetching}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: "rgba(239,83,80,0.15)",
                color: "#ef5350",
                border: "1px solid rgba(239,83,80,0.3)",
              }}
            >
              <Navigation className="w-3.5 h-3.5" />
              Refresh
            </button>
          )}
        </div>
      </div>

      <div
        className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        style={{ height: "520px" }}
      >
        {userLocation && (
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <MapContent userLocation={userLocation} grounds={grounds} />
          </MapContainer>
        )}
      </div>

      {grounds.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {grounds.map((g) => (
            <div
              key={g.id}
              className="rounded-xl p-4 border border-white/10 flex items-start gap-3 transition-all hover:border-white/20"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ef5350]/30 to-[#ff7043]/30 flex items-center justify-center shrink-0 text-lg">
                ⚽
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{g.name}</p>
                <p className="text-gray-500 text-xs mt-0.5 capitalize">{g.sport}{g.surface ? ` · ${g.surface}` : ""}</p>
              </div>
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${g.lat},${g.lng}`, "_blank")}
                className="shrink-0 p-2 rounded-lg transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #ef5350, #ff7043)" }}
                title="Get Directions"
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