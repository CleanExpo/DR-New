/**
 * useGeolocation - Auto-detect user's location (suburb detection)
 *
 * @example
 * const { location, error, loading } = useGeolocation();
 *
 * if (location) {
 *   console.log(`Lat: ${location.latitude}, Lng: ${location.longitude}`);
 * }
 */

import { useEffect, useState } from 'react';

interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

interface GeolocationState {
  location: GeolocationPosition | null;
  error: GeolocationError | null;
  loading: boolean;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
}

export function useGeolocation(options: GeolocationOptions = {}) {
  const {
    enableHighAccuracy = false,
    timeout = 5000,
    maximumAge = 0,
    watch = false,
  } = options;

  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setState({
        location: null,
        error: {
          code: 0,
          message: 'Geolocation is not supported by your browser',
        },
        loading: false,
      });
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        },
        error: null,
        loading: false,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setState({
        location: null,
        error: {
          code: error.code,
          message: error.message,
        },
        loading: false,
      });
    };

    const geoOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    let watchId: number | undefined;

    if (watch) {
      watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        geoOptions
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        geoOptions
      );
    }

    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [enableHighAccuracy, timeout, maximumAge, watch]);

  return state;
}

/**
 * Brisbane suburb detection helper
 */
export interface BrisbaneLocation {
  suburb: string;
  postcode: string;
  region: 'Brisbane' | 'Ipswich' | 'Logan' | 'Unknown';
}

export async function detectBrisbaneSuburb(
  latitude: number,
  longitude: number
): Promise<BrisbaneLocation | null> {
  try {
    // Use Google Maps Geocoding API (requires API key)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('Google Maps API key not configured');
      return null;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.results[0]) {
      return null;
    }

    const result = data.results[0];
    let suburb = '';
    let postcode = '';

    // Extract suburb and postcode from address components
    result.address_components.forEach((component: any) => {
      if (component.types.includes('locality')) {
        suburb = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        postcode = component.long_name;
      }
    });

    // Determine region
    let region: BrisbaneLocation['region'] = 'Unknown';
    if (suburb.toLowerCase().includes('ipswich') ||
        ['4305', '4306', '4300'].includes(postcode)) {
      region = 'Ipswich';
    } else if (suburb.toLowerCase().includes('logan') ||
               ['4114', '4118', '4119'].includes(postcode)) {
      region = 'Logan';
    } else if (postcode.startsWith('4')) {
      region = 'Brisbane';
    }

    return { suburb, postcode, region };
  } catch (error) {
    console.error('Error detecting Brisbane suburb:', error);
    return null;
  }
}

/**
 * Hook combining geolocation + suburb detection
 */
export function useBrisbaneLocation() {
  const { location, error, loading } = useGeolocation();
  const [suburb, setSuburb] = useState<BrisbaneLocation | null>(null);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    if (location && !suburb) {
      setDetecting(true);
      detectBrisbaneSuburb(location.latitude, location.longitude)
        .then(setSuburb)
        .finally(() => setDetecting(false));
    }
  }, [location, suburb]);

  return {
    location,
    suburb,
    error,
    loading: loading || detecting,
  };
}
