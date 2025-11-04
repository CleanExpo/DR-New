'use client';

import React from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

interface CoverageMapProps {
  baseLocation: { lat: number; lng: number };
  radius: number; // in km
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem',
};

const defaultCenter = {
  lat: -27.4705, // Brisbane
  lng: 153.0260,
};

export function CoverageMap({ baseLocation, radius }: CoverageMapProps) {
  const center = baseLocation.lat ? baseLocation : defaultCenter;

  // Calculate zoom level based on radius
  const getZoomLevel = (radiusKm: number) => {
    if (radiusKm <= 25) return 11;
    if (radiusKm <= 50) return 10;
    if (radiusKm <= 100) return 9;
    return 8;
  };

  const circleOptions = {
    strokeColor: '#3B82F6',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#3B82F6',
    fillOpacity: 0.15,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: radius * 1000, // Convert km to meters
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={getZoomLevel(radius)}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          zoomControl: true,
        }}
      >
        {baseLocation.lat && (
          <>
            <Marker
              position={baseLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="white" stroke-width="3"/>
                    <circle cx="20" cy="20" r="8" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
            <Circle center={baseLocation} options={circleOptions} />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

// Fallback component if Google Maps is not available
export function CoverageMapFallback({ radius }: { radius: number }) {
  return (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="text-6xl">📍</div>
        <p className="text-lg font-semibold text-gray-700">
          Coverage Radius: {radius}km
        </p>
        <p className="text-sm text-gray-500">
          Map will be displayed once location is set
        </p>
      </div>
    </div>
  );
}
