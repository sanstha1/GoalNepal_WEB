// "use client";

// import { useEffect, useState } from "react";
// import { Ground } from "@/types/ground";
// import { useGeolocation } from "@/lib/useGeolocation";
// import { fetchNearbyGrounds } from "@/lib/api";
// import NearbyGroundsMap from "@/components/nearby-grounds/NearbyGroundsMap";
// import GroundsSidebar from "@/components/nearby-grounds/GroundsSidebar";
// import "@/app/nearby-grounds/nearby-grounds.css";

// export default function NearbyGroundsPage() {
//   const { location, error: geoError, loading: geoLoading } = useGeolocation();
//   const [grounds, setGrounds] = useState<Ground[]>([]);
//   const [selectedGroundId, setSelectedGroundId] = useState<string | null>(null);
//   const [fetchError, setFetchError] = useState<string | null>(null);
//   const [fetching, setFetching] = useState(false);

//   useEffect(() => {
//     if (!location) return;

//     setFetching(true);
//     fetchNearbyGrounds(location.lat, location.lng)
//       .then((res) => {
//         setGrounds(res.data);
//         setFetchError(null);
//       })
//       .catch((err) => setFetchError(err.message))
//       .finally(() => setFetching(false));
//   }, [location]);

//   const handleGroundSelect = (ground: Ground | null) => {
//     setSelectedGroundId(ground?._id ?? null);
//   };

//   if (geoLoading) {
//     return (
//       <div className="ng-state-screen">
//         <div className="ng-spinner" />
//         <p>Detecting your location...</p>
//       </div>
//     );
//   }

//   if (geoError) {
//     return (
//       <div className="ng-state-screen ng-error">
//         <span className="ng-error-icon">📍</span>
//         <h2>Location Required</h2>
//         <p>{geoError}</p>
//       </div>
//     );
//   }

//   if (fetching) {
//     return (
//       <div className="ng-state-screen">
//         <div className="ng-spinner" />
//         <p>Finding nearby futsal grounds...</p>
//       </div>
//     );
//   }

//   if (fetchError) {
//     return (
//       <div className="ng-state-screen ng-error">
//         <span className="ng-error-icon">⚠️</span>
//         <h2>Something went wrong</h2>
//         <p>{fetchError}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="ng-layout">
//       <header className="ng-header">
//         <div className="ng-header-brand">
//           <span className="ng-logo">⚽</span>
//           <span className="ng-brand-name">GoalNepal</span>
//         </div>
//         <h1 className="ng-title">Nearby Futsal Grounds</h1>
//       </header>

//       <main className="ng-main">
//         {grounds.length === 0 ? (
//           <div className="ng-state-screen">
//             <span className="ng-error-icon">🏟️</span>
//             <h2>No grounds found nearby</h2>
//             <p>Try expanding your search radius or check back later.</p>
//           </div>
//         ) : (
//           <>
//             <GroundsSidebar
//               grounds={grounds}
//               selectedGroundId={selectedGroundId}
//               onSelect={(g) => setSelectedGroundId(g._id)}
//             />
//             <div className="ng-map-container">
//               {location && (
//                 <NearbyGroundsMap
//                   grounds={grounds}
//                   userLocation={location}
//                   onGroundSelect={handleGroundSelect}
//                   selectedGroundId={selectedGroundId}
//                 />
//               )}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }