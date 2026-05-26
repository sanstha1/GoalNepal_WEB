// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { Ground, UserLocation } from "@/types/ground";
// import GroundInfoWindow from "./GroundInfoWindow";
// import { createRoot } from "react-dom/client";

// interface NearbyGroundsMapProps {
//   grounds: Ground[];
//   userLocation: UserLocation;
//   onGroundSelect: (ground: Ground | null) => void;
//   selectedGroundId: string | null;
// }

// declare global {
//   interface Window {
//     google: typeof google;
//     initGoogleMaps: () => void;
//   }
// }

// export default function NearbyGroundsMap({
//   grounds,
//   userLocation,
//   onGroundSelect,
//   selectedGroundId,
// }: NearbyGroundsMapProps) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstanceRef = useRef<google.maps.Map | null>(null);
//   const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
//   const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   const initMap = useCallback(() => {
//     if (!mapRef.current || mapInstanceRef.current) return;

//     const map = new window.google.maps.Map(mapRef.current, {
//       center: { lat: userLocation.lat, lng: userLocation.lng },
//       zoom: 13,
//       mapTypeControl: false,
//       fullscreenControl: false,
//       streetViewControl: false,
//       styles: [
//         { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
//       ],
//     });

//     mapInstanceRef.current = map;
//     infoWindowRef.current = new window.google.maps.InfoWindow();

//     new window.google.maps.Marker({
//       position: { lat: userLocation.lat, lng: userLocation.lng },
//       map,
//       title: "Your Location",
//       icon: {
//         path: window.google.maps.SymbolPath.CIRCLE,
//         scale: 10,
//         fillColor: "#4285F4",
//         fillOpacity: 1,
//         strokeColor: "#fff",
//         strokeWeight: 3,
//       },
//       zIndex: 999,
//     });

//     setMapLoaded(true);
//   }, [userLocation]);

//   useEffect(() => {
//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
//     if (!apiKey) return;

//     if (window.google?.maps) {
//       initMap();
//       return;
//     }

//     window.initGoogleMaps = initMap;
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMaps`;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, [initMap]);

//   useEffect(() => {
//     if (!mapLoaded || !mapInstanceRef.current) return;

//     markersRef.current.forEach((marker) => marker.setMap(null));
//     markersRef.current.clear();

//     grounds.forEach((ground) => {
//       const [lng, lat] = ground.location.coordinates;
//       const marker = new window.google.maps.Marker({
//         position: { lat, lng },
//         map: mapInstanceRef.current!,
//         title: ground.name,
//         icon: {
//           url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
//             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
//               <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="#16a34a"/>
//               <circle cx="18" cy="18" r="10" fill="white"/>
//               <text x="18" y="23" text-anchor="middle" font-size="13">⚽</text>
//             </svg>
//           `),
//           scaledSize: new window.google.maps.Size(36, 48),
//           anchor: new window.google.maps.Point(18, 48),
//         },
//       });

//       marker.addListener("click", () => {
//         onGroundSelect(ground);

//         const container = document.createElement("div");
//         const root = createRoot(container);
//         root.render(<GroundInfoWindow ground={ground} />);

//         infoWindowRef.current?.setContent(container);
//         infoWindowRef.current?.open(mapInstanceRef.current!, marker);
//       });

//       markersRef.current.set(ground._id, marker);
//     });
//   }, [grounds, mapLoaded, onGroundSelect]);

//   useEffect(() => {
//     if (!selectedGroundId || !mapLoaded || !mapInstanceRef.current) return;
//     const marker = markersRef.current.get(selectedGroundId);
//     if (!marker) return;

//     mapInstanceRef.current.panTo(marker.getPosition()!);
//     mapInstanceRef.current.setZoom(15);

//     window.google.maps.event.trigger(marker, "click");
//   }, [selectedGroundId, mapLoaded]);

//   return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
// }