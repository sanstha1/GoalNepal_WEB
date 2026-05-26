"use client";

import { Ground } from "@/types/ground";

interface GroundsSidebarProps {
  grounds: Ground[];
  selectedGroundId: string | null;
  onSelect: (ground: Ground) => void;
}

export default function GroundsSidebar({ grounds, selectedGroundId, onSelect }: GroundsSidebarProps) {
  return (
    <aside className="grounds-sidebar">
      <div className="sidebar-header">
        <h2>Nearby Futsal Grounds</h2>
        <span className="count">{grounds.length} found</span>
      </div>
      <ul className="grounds-list">
        {grounds.map((ground) => {
          const [lng, lat] = ground.location.coordinates;
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
          return (
            <li
              key={ground._id}
              className={`ground-item ${selectedGroundId === ground._id ? "active" : ""}`}
              onClick={() => onSelect(ground)}
            >
              <div className="ground-icon">⚽</div>
              <div className="ground-info">
                <h3>{ground.name}</h3>
                {ground.address && <p className="address">{ground.address}</p>}
                <p className="contact">📞 {ground.contact}</p>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Directions
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}