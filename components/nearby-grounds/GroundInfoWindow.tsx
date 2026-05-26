"use client";

import { Ground } from "@/types/ground";

interface GroundInfoWindowProps {
  ground: Ground;
}

export default function GroundInfoWindow({ ground }: GroundInfoWindowProps) {
  const [lng, lat] = ground.location.coordinates;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ fontFamily: "sans-serif", minWidth: 200, maxWidth: 260 }}>
      <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#111" }}>
        {ground.name}
      </h3>
      {ground.address && (
        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#555" }}>
          {ground.address}
        </p>
      )}
      <p style={{ margin: "0 0 10px", fontSize: 13, color: "#333" }}>
        📞 <a href={`tel:${ground.contact}`} style={{ color: "#16a34a", textDecoration: "none" }}>
          {ground.contact}
        </a>
      </p>
      <button
        onClick={handleDirections}
        style={{
          width: "100%",
          padding: "8px 0",
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Get Directions →
      </button>
    </div>
  );
}