'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Home,
  MapPin,
  Calendar,
  Ruler,
  Users,
  Droplets,
  Zap,
  Flame,
  Wind,
  Edit,
  ExternalLink,
} from 'lucide-react';

export interface Property {
  id: string;
  address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country?: string;
  };
  propertyType: 'house' | 'unit' | 'apartment' | 'townhouse' | 'commercial' | 'other';
  ownershipType?: 'owner' | 'tenant' | 'landlord';
  buildingDetails?: {
    yearBuilt?: number;
    floorArea?: number; // in square meters
    landArea?: number; // in square meters
    bedrooms?: number;
    bathrooms?: number;
    stories?: number;
    garageSpaces?: number;
  };
  utilities?: {
    water?: boolean;
    electricity?: boolean;
    gas?: boolean;
    airConditioning?: boolean;
    heating?: boolean;
    solar?: boolean;
  };
  features?: string[];
  notes?: string;
  images?: string[];
}

interface PropertyDetailsCardProps {
  property: Property | null;
  onEditProperty?: () => void;
  onViewMap?: (address: string) => void;
  title?: string;
  showImages?: boolean;
  className?: string;
}

const propertyTypeLabels: Record<Property['propertyType'], string> = {
  house: 'House',
  unit: 'Unit',
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  commercial: 'Commercial',
  other: 'Other',
};

const ownershipTypeLabels: Record<NonNullable<Property['ownershipType']>, string> = {
  owner: 'Owner',
  tenant: 'Tenant',
  landlord: 'Landlord',
};

const formatAddress = (address: Property['address']): string => {
  return `${address.street}, ${address.suburb} ${address.state} ${address.postcode}`;
};

const formatFullAddress = (address: Property['address']): string => {
  const base = formatAddress(address);
  return address.country ? `${base}, ${address.country}` : base;
};

export function PropertyDetailsCard({
  property,
  onEditProperty,
  onViewMap,
  title = 'Property Details',
  showImages = false,
  className = '',
}: PropertyDetailsCardProps) {
  if (!property) {
    return (
      <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
        <CardHeader className="pb-3 border-b border-portal-border">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Home className="h-16 w-16 text-portal-muted mx-auto mb-4 opacity-50" />
            <p className="text-portal-muted font-medium mb-2">No Property Details on File</p>
            <p className="text-sm text-portal-muted mb-4">
              Add your property information for faster service
            </p>
            {onEditProperty && (
              <Button
                onClick={onEditProperty}
                className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
              >
                Add Property Details
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const fullAddress = formatFullAddress(property.address);

  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-semantic-contractor/20 to-blue-500/20 p-3 rounded-lg">
              <Home className="h-6 w-6 text-semantic-contractor" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
              <p className="text-sm text-portal-muted mt-0.5">
                {propertyTypeLabels[property.propertyType]}
                {property.ownershipType && ` • ${ownershipTypeLabels[property.ownershipType]}`}
              </p>
            </div>
          </div>
          {onEditProperty && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEditProperty}
              className="hover:bg-portal-hover"
            >
              <Edit className="h-4 w-4 text-portal-muted" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Images */}
        {showImages && property.images && property.images.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.images.slice(0, 3).map((image, index) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden border border-portal-border">
                  <img
                    src={image}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Address */}
        <div className="mb-6 p-4 bg-portal-hover rounded-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <MapPin className="h-5 w-5 text-semantic-contractor flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{property.address.street}</p>
                <p className="text-sm text-portal-muted">
                  {property.address.suburb} {property.address.state} {property.address.postcode}
                  {property.address.country && `, ${property.address.country}`}
                </p>
              </div>
            </div>
            {onViewMap && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewMap(fullAddress)}
                className="hover:bg-portal-card"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Building Details */}
        {property.buildingDetails && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Building Information</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.buildingDetails.yearBuilt && (
                <div className="bg-portal-hover rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-3 w-3 text-portal-muted" />
                    <p className="text-xs text-portal-muted">Year Built</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.buildingDetails.yearBuilt}
                  </p>
                </div>
              )}

              {property.buildingDetails.floorArea && (
                <div className="bg-portal-hover rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Ruler className="h-3 w-3 text-portal-muted" />
                    <p className="text-xs text-portal-muted">Floor Area</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.buildingDetails.floorArea}m²
                  </p>
                </div>
              )}

              {property.buildingDetails.landArea && (
                <div className="bg-portal-hover rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Ruler className="h-3 w-3 text-portal-muted" />
                    <p className="text-xs text-portal-muted">Land Area</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.buildingDetails.landArea}m²
                  </p>
                </div>
              )}

              {property.buildingDetails.bedrooms !== undefined && (
                <div className="bg-portal-hover rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="h-3 w-3 text-portal-muted" />
                    <p className="text-xs text-portal-muted">Bedrooms</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.buildingDetails.bedrooms}
                  </p>
                </div>
              )}

              {property.buildingDetails.bathrooms !== undefined && (
                <div className="bg-portal-hover rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="h-3 w-3 text-portal-muted" />
                    <p className="text-xs text-portal-muted">Bathrooms</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.buildingDetails.bathrooms}
                  </p>
                </div>
              )}

              {property.buildingDetails.stories && (
                <div className="bg-portal-hover rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="h-3 w-3 text-portal-muted" />
                    <p className="text-xs text-portal-muted">Stories</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.buildingDetails.stories}
                  </p>
                </div>
              )}

              {property.buildingDetails.garageSpaces !== undefined && (
                <div className="bg-portal-hover rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="h-3 w-3 text-portal-muted" />
                    <p className="text-xs text-portal-muted">Garage Spaces</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.buildingDetails.garageSpaces}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Utilities */}
        {property.utilities && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Utilities & Features</h4>
            <div className="flex flex-wrap gap-2">
              {property.utilities.water && (
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                  <Droplets className="h-3 w-3 mr-1" />
                  Water
                </Badge>
              )}
              {property.utilities.electricity && (
                <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-700">
                  <Zap className="h-3 w-3 mr-1" />
                  Electricity
                </Badge>
              )}
              {property.utilities.gas && (
                <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                  <Flame className="h-3 w-3 mr-1" />
                  Gas
                </Badge>
              )}
              {property.utilities.airConditioning && (
                <Badge variant="outline" className="bg-cyan-50 border-cyan-200 text-cyan-700">
                  <Wind className="h-3 w-3 mr-1" />
                  Air Conditioning
                </Badge>
              )}
              {property.utilities.heating && (
                <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700">
                  <Flame className="h-3 w-3 mr-1" />
                  Heating
                </Badge>
              )}
              {property.utilities.solar && (
                <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                  <Zap className="h-3 w-3 mr-1" />
                  Solar Power
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Additional Features */}
        {property.features && property.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Additional Features</h4>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-portal-hover border-portal-border text-gray-700"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {property.notes && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Property Notes</h4>
            <p className="text-sm text-blue-700">{property.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
