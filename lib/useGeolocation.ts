"use client";

import { useState, useEffect } from "react";
import { UserLocation } from "@/types/ground";

interface GeolocationState {
  location: UserLocation | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ location: null, error: "Geolocation is not supported by your browser.", loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
          loading: false,
        });
      },
      (err) => {
        const messages: Record<number, string> = {
          1: "Location access denied. Please allow location permission.",
          2: "Location unavailable. Please try again.",
          3: "Location request timed out. Please try again.",
        };
        setState({
          location: null,
          error: messages[err.code] || "Unable to retrieve your location.",
          loading: false,
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return state;
}