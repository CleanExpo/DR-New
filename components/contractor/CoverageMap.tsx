"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CoverageMapProps {
  centre: { lat: number; lng: number }
  radius: number // in kilometers
  height?: string
}

export function CoverageMap({
  centre,
  radius,
  height = "400px",
}: CoverageMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if Google Maps is available
    if (typeof window === "undefined" || !window.google) {
      setError("Google Maps not loaded")
      setLoading(false)
      return
    }

    try {
      const map = new google.maps.Map(mapRef.current!, {
        centre,
        zoom: getZoomLevel(radius),
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      })

      // Add marker at centre
      new google.maps.Marker({
        position: centre,
        map,
        title: "Your Base Location",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#2563eb",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      })

      // Add coverage circle
      new google.maps.Circle({
        strokeColor: "#2563eb",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#2563eb",
        fillOpacity: 0.15,
        map,
        centre,
        radius: radius * 1000, // Convert km to meters
      })

      setLoading(false)
    } catch (err) {
      setError("Failed to initialize map")
      setLoading(false)
    }
  }, [centre, radius])

  const getZoomLevel = (km: number) => {
    if (km <= 25) return 11
    if (km <= 50) return 10
    if (km <= 100) return 9
    return 8
  }

  if (error) {
    return (
      <Card className="flex items-centre justify-centre" style={{ height }}>
        <div className="text-centre p-6">
          <p className="text-muted-foreground">{error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Coverage radius: {radius}km from base location
          </p>
        </div>
      </Card>
    )
  }

  if (loading) {
    return <Skeleton className="w-full" style={{ height }} />
  }

  return (
    <div
      ref={mapRef}
      className="w-full rounded-lg border overflow-hidden"
      style={{ height }}
    />
  )
}

// Fallback component when Google Maps is not available
export function CoverageMapFallback({
  radius,
  height = "400px",
}: {
  radius: number
  height?: string
}) {
  return (
    <Card
      className="flex flex-col items-centre justify-centre bg-gradient-to-br from-blue-50 to-blue-100"
      style={{ height }}
    >
      <div className="text-centre p-6">
        <div className="mb-4">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-blue-600"
              style={{
                clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)",
              }}
            ></div>
            <div className="absolute inset-0 flex items-centre justify-centre">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2">Coverage Area</h3>
        <p className="text-2xl font-bold text-blue-600 mb-1">{radius}km Radius</p>
        <p className="text-sm text-muted-foreground">
          Covering approximately {Math.round(Math.PI * radius * radius)} km² area
        </p>
      </div>
    </Card>
  )
}
