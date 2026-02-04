'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMultiplePostcodeCoordinates, getStateCenter } from '@/lib/geo/australian-postcodes';
import 'leaflet/dist/leaflet.css';

interface ServiceArea {
  postcode: string;
  state: string;
  responseTimeMinutes: number;
  radiusKm: number;
}

interface ServiceAreaMapProps {
  contractorId: string;
  primaryState?: string;
  className?: string;
}

interface PostcodeMarker extends ServiceArea {
  lat: number;
  lng: number;
}

// Map center adjustment component
function MapCenterController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);

  return null;
}

// Get color based on response time
function getResponseTimeColor(minutes: number): string {
  if (minutes < 30) return '#10b981'; // Green
  if (minutes < 60) return '#fbbf24'; // Yellow
  if (minutes < 120) return '#f97316'; // Orange
  return '#ef4444'; // Red
}

// Get color label for legend
function getResponseTimeLabel(minutes: number): string {
  if (minutes < 30) return 'Express (< 30 min)';
  if (minutes < 60) return 'Standard (30-60 min)';
  if (minutes < 120) return 'Extended (1-2 hours)';
  return 'Long Range (> 2 hours)';
}

export function ServiceAreaMap({ contractorId, primaryState, className }: ServiceAreaMapProps) {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [markers, setMarkers] = useState<PostcodeMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-25.2744, 133.7751]); // Australia center

  // Fetch service areas from API
  useEffect(() => {
    async function fetchServiceAreas() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/public/contractors/${contractorId}/service-areas`);

        if (!response.ok) {
          throw new Error('Failed to load service areas');
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to load service areas');
        }

        setServiceAreas(data.data.serviceAreas);

        // Get coordinates for all postcodes
        const postcodes = data.data.serviceAreas.map((area: ServiceArea) => area.postcode);
        const coordinates = await getMultiplePostcodeCoordinates(postcodes);

        // Create markers for postcodes with coordinates
        const newMarkers: PostcodeMarker[] = [];
        data.data.serviceAreas.forEach((area: ServiceArea) => {
          const coord = coordinates.get(area.postcode);
          if (coord) {
            newMarkers.push({
              ...area,
              lat: coord.lat,
              lng: coord.lng,
            });
          }
        });

        setMarkers(newMarkers);

        // Set map center based on primary state or first marker
        if (primaryState) {
          const stateCenter = getStateCenter(primaryState);
          setMapCenter([stateCenter.lat, stateCenter.lng]);
        } else if (newMarkers.length > 0) {
          setMapCenter([newMarkers[0].lat, newMarkers[0].lng]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading service areas:', err);
        setError(err instanceof Error ? err.message : 'Failed to load service areas');
        setLoading(false);
      }
    }

    fetchServiceAreas();
  }, [contractorId, primaryState]);

  if (loading) {
    return (
      <Card className={cn('', className)}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Service Coverage Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || markers.length === 0) {
    return (
      <Card className={cn('', className)}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Service Coverage Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {error || 'No service areas available to display'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group markers by response time for legend
  const responseTimeGroups = {
    express: markers.filter((m) => m.responseTimeMinutes < 30).length,
    standard: markers.filter((m) => m.responseTimeMinutes >= 30 && m.responseTimeMinutes < 60).length,
    extended: markers.filter((m) => m.responseTimeMinutes >= 60 && m.responseTimeMinutes < 120).length,
    longRange: markers.filter((m) => m.responseTimeMinutes >= 120).length,
  };

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Service Coverage Map
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Showing {markers.length} service {markers.length === 1 ? 'area' : 'areas'} with response times
        </p>
      </CardHeader>
      <CardContent>
        {/* Map Container */}
        <div className="rounded-lg overflow-hidden border border-gray-200 mb-4" style={{ height: '500px' }}>
          <MapContainer
            center={mapCenter}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <MapCenterController center={mapCenter} />

            {/* OpenStreetMap Tiles */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Service Area Markers */}
            {markers.map((marker, index) => (
              <CircleMarker
                key={`${marker.postcode}-${index}`}
                center={[marker.lat, marker.lng]}
                radius={8}
                pathOptions={{
                  fillColor: getResponseTimeColor(marker.responseTimeMinutes),
                  fillOpacity: 0.8,
                  color: '#ffffff',
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900 mb-1">
                      {marker.postcode} - {marker.state}
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <Clock className="h-3 w-3" />
                      <span>{marker.responseTimeMinutes} minutes</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Coverage radius: {marker.radiusKm}km
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Response Time Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {responseTimeGroups.express > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#10b981] border-2 border-white"></div>
                <div className="text-xs">
                  <div className="font-medium text-gray-900">Express</div>
                  <div className="text-gray-600">&lt; 30 min ({responseTimeGroups.express})</div>
                </div>
              </div>
            )}
            {responseTimeGroups.standard > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#fbbf24] border-2 border-white"></div>
                <div className="text-xs">
                  <div className="font-medium text-gray-900">Standard</div>
                  <div className="text-gray-600">30-60 min ({responseTimeGroups.standard})</div>
                </div>
              </div>
            )}
            {responseTimeGroups.extended > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#f97316] border-2 border-white"></div>
                <div className="text-xs">
                  <div className="font-medium text-gray-900">Extended</div>
                  <div className="text-gray-600">1-2 hours ({responseTimeGroups.extended})</div>
                </div>
              </div>
            )}
            {responseTimeGroups.longRange > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#ef4444] border-2 border-white"></div>
                <div className="text-xs">
                  <div className="font-medium text-gray-900">Long Range</div>
                  <div className="text-gray-600">&gt; 2 hours ({responseTimeGroups.longRange})</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Postcode List */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Postcodes Served</h4>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <Badge
                key={area.postcode}
                variant="outline"
                className="border-gray-300"
              >
                {area.postcode}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
