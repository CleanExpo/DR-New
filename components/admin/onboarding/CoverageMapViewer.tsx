'use client';

import { useEffect, useRef } from 'react';
import { ContractorApplication, NearbyContractor } from '@/lib/types/contractor-onboarding';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Circle, Users, DollarSign } from 'lucide-react';

interface CoverageMapViewerProps {
  contractor: ContractorApplication;
  baseLocation: { lat: number; lng: number };
  radius: number;
  nearbyContractors?: NearbyContractor[];
}

export function CoverageMapViewer({
  contractor,
  baseLocation,
  radius,
  nearbyContractors = []
}: CoverageMapViewerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Placeholder for map initialization
    // In production, integrate with Leaflet or Google Maps
    // This would initialize the map with:
    // - Base location marker
    // - Coverage radius circle
    // - Nearby contractor markers with different colors
  }, [baseLocation, radius, nearbyContractors]);

  const getTierLabel = (tier: string | undefined) => {
    if (!tier) return 'Not selected';
    return tier.replace('TIER_', '').replace('KM', 'km Radius');
  };

  const hasConflicts = nearbyContractors.some(
    (nearby) => nearby.distance < radius * 0.5 // Within 50% of radius
  );

  return (
    <div className="space-y-6">
      {/* Coverage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Circle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Selected Tier</p>
              <p className="text-sm font-semibold text-gray-900">
                {getTierLabel(contractor.subscription?.tier)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Monthly Fee</p>
              <p className="text-sm font-semibold text-gray-900">
                ${contractor.subscription?.amount || 0}/month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Nearby Contractors</p>
              <p className="text-sm font-semibold text-gray-900">
                {nearbyContractors.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Conflict Warning */}
      {hasConflicts && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                Territory Overlap Detected
              </h4>
              <p className="text-xs text-yellow-700">
                This contractor's coverage area overlaps significantly with{' '}
                {nearbyContractors.filter((n) => n.distance < radius * 0.5).length}{' '}
                existing contractor(s). Review capacity before approving.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <Card className="p-0 overflow-hidden">
        <div
          ref={mapRef}
          className="w-full h-[400px] bg-gray-100 flex items-center justify-center relative"
        >
          {/* Placeholder Map */}
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium">
              Map View - {getTierLabel(contractor.subscription?.tier)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Base: {baseLocation.lat.toFixed(4)}, {baseLocation.lng.toFixed(4)}
            </p>
            <p className="text-xs text-gray-500">
              Coverage Radius: {radius}km
            </p>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
            <h4 className="text-xs font-semibold text-gray-900 mb-2">Legend</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-700">Your Coverage Area</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-700">Active Contractors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-700">Pending Contractors</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Nearby Contractors List */}
      {nearbyContractors.length > 0 && (
        <Card className="p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Nearby Contractors ({nearbyContractors.length})
          </h4>
          <div className="space-y-3">
            {nearbyContractors.map((nearby) => (
              <div
                key={nearby.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{nearby.name}</p>
                    <p className="text-xs text-gray-500">
                      {nearby.radius}km radius coverage
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={nearby.distance < radius * 0.5 ? 'destructive' : 'secondary'}
                  >
                    {nearby.distance.toFixed(1)}km away
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Estimated Job Volume */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          Estimated Job Volume
        </h4>
        <p className="text-sm text-blue-700">
          Based on the selected {getTierLabel(contractor.subscription?.tier)} tier and
          current market data, this contractor can expect approximately{' '}
          <strong>
            {contractor.subscription?.tier === 'TIER_25KM' && '5-10'}
            {contractor.subscription?.tier === 'TIER_50KM' && '10-20'}
            {contractor.subscription?.tier === 'TIER_75KM' && '15-30'}
            {contractor.subscription?.tier === 'TIER_100KM' && '20-40'}
            {contractor.subscription?.tier === 'RURAL' && '5-15'}
          </strong>{' '}
          jobs per month in this area.
        </p>
      </Card>
    </div>
  );
}
