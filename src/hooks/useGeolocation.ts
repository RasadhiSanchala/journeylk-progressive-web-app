"use client";

import { useCallback, useState } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  });

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((currentState) => ({
        ...currentState,
        error: "Geolocation is not supported by this browser.",
      }));
      return;
    }

    setState((currentState) => ({ ...currentState, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied. You can still browse attractions without distance."
            : "Unable to read your location. Please try again.";

        setState((currentState) => ({
          ...currentState,
          loading: false,
          error: message,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  return { ...state, getCurrentLocation };
}
