'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Home,
  Plus,
  Search,
  MapPin,
  Calendar,
  Shield,
  ChevronRight,
  LayoutGrid,
  List,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Property {
  id: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  state: string;
  propertyType: string;
  propertySize: string | null;
  buildingAge: string | null;
  isPrimary: boolean;
  securityAccess: boolean;
  petOnPremises: boolean;
  createdAt: string;
}

const PROPERTY_TYPES = [
  'House',
  'Apartment',
  'Townhouse',
  'Unit',
  'Villa',
  'Duplex',
  'Rural',
  'Commercial',
];

const AUSTRALIAN_STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

export default function PropertiesListPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    streetAddress: '',
    suburb: '',
    postcode: '',
    state: '',
    propertyType: '',
  });

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('/api/client/properties');
        if (res.ok) {
          const data = await res.json();
          setProperties(data.properties || []);
        }
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();

    if (process.env.NODE_ENV === 'development') {
      setProperties([
        {
          id: 'prop-1',
          streetAddress: '42 Harbour Street',
          suburb: 'Sydney',
          postcode: '2000',
          state: 'NSW',
          propertyType: 'Apartment',
          propertySize: '85 sqm',
          buildingAge: '2015',
          isPrimary: true,
          securityAccess: true,
          petOnPremises: false,
          createdAt: '2024-03-15T10:00:00Z',
        },
        {
          id: 'prop-2',
          streetAddress: '15 Beach Road',
          suburb: 'Bondi',
          postcode: '2026',
          state: 'NSW',
          propertyType: 'House',
          propertySize: '220 sqm',
          buildingAge: '1998',
          isPrimary: false,
          securityAccess: false,
          petOnPremises: true,
          createdAt: '2024-06-20T14:30:00Z',
        },
        {
          id: 'prop-3',
          streetAddress: '7 Collins Street',
          suburb: 'Melbourne',
          postcode: '3000',
          state: 'VIC',
          propertyType: 'Townhouse',
          propertySize: '150 sqm',
          buildingAge: '2020',
          isPrimary: false,
          securityAccess: true,
          petOnPremises: false,
          createdAt: '2025-01-10T09:15:00Z',
        },
      ]);
      setLoading(false);
    }
  }, []);

  const filtered = properties.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.streetAddress.toLowerCase().includes(q) ||
      p.suburb.toLowerCase().includes(q) ||
      p.postcode.includes(q) ||
      p.state.toLowerCase().includes(q)
    );
  });

  const handleAddProperty = async () => {
    try {
      const res = await fetch('/api/client/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setProperties((prev) => [...prev, data.property]);
        setShowAddModal(false);
        setFormData({ streetAddress: '', suburb: '', postcode: '', state: '', propertyType: '' });
      }
    } catch (err) {
      console.error('Failed to add property:', err);
    }
  };

  const getPropertyIcon = (type: string) => {
    if (['Apartment', 'Unit'].includes(type)) return Building2;
    return Home;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Properties</h1>
            <p className="text-sm text-white/50 mt-1">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} registered
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search by address, suburb, or postcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/[0.06] text-white placeholder:text-white/30 rounded-sm"
            />
          </div>
          <div className="flex gap-1 border border-white/[0.06] rounded-sm p-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-sm',
                viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                'rounded-sm',
                viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40'
              )}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <Home className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white/60 mb-2">No properties found</h3>
            <p className="text-sm text-white/40 mb-6">
              {searchQuery ? 'Try a different search term' : 'Add your first property to get started'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            )}
          </div>
        )}

        {/* Grid View */}
        {!loading && filtered.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((property) => {
              const Icon = getPropertyIcon(property.propertyType);
              return (
                <Card
                  key={property.id}
                  className="bg-white/[0.02] border-white/[0.06] hover:border-teal-500/30 transition-colors cursor-pointer rounded-sm"
                  onClick={() => router.push(`/dashboard/property/${property.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-sm bg-teal-500/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-teal-400" />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium text-white">
                            {property.streetAddress}
                          </CardTitle>
                          <p className="text-xs text-white/50 mt-0.5">
                            {property.suburb}, {property.state} {property.postcode}
                          </p>
                        </div>
                      </div>
                      {property.isPrimary && (
                        <Badge className="bg-teal-500/20 text-teal-300 border-0 text-[10px] rounded-sm">
                          Primary
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-xs text-white/40">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3" />
                        <span>{property.propertyType}</span>
                        {property.propertySize && (
                          <span className="text-white/20">|</span>
                        )}
                        {property.propertySize && <span>{property.propertySize}</span>}
                      </div>
                      {property.buildingAge && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Built {property.buildingAge}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {property.securityAccess && (
                          <Badge variant="outline" className="border-white/10 text-white/40 text-[10px] rounded-sm">
                            <Shield className="h-2.5 w-2.5 mr-1" />
                            Security
                          </Badge>
                        )}
                        {property.petOnPremises && (
                          <Badge variant="outline" className="border-white/10 text-white/40 text-[10px] rounded-sm">
                            Pet on site
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-4 text-teal-400">
                      <span className="text-xs mr-1">View details</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* List View */}
        {!loading && filtered.length > 0 && viewMode === 'list' && (
          <div className="space-y-2">
            {filtered.map((property) => {
              const Icon = getPropertyIcon(property.propertyType);
              return (
                <div
                  key={property.id}
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-sm hover:border-teal-500/30 transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/property/${property.id}`)}
                >
                  <div className="h-10 w-10 rounded-sm bg-teal-500/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white truncate">{property.streetAddress}</p>
                      {property.isPrimary && (
                        <Badge className="bg-teal-500/20 text-teal-300 border-0 text-[10px] rounded-sm shrink-0">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-white/40">
                      {property.suburb}, {property.state} {property.postcode} &middot; {property.propertyType}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/20 shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-[#0a0a0a] border-white/[0.06] text-white rounded-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Property</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-white/70 text-sm">Street Address</Label>
              <Input
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                placeholder="e.g. 42 Harbour Street"
                className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/70 text-sm">Suburb</Label>
                <Input
                  value={formData.suburb}
                  onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                  placeholder="e.g. Sydney"
                  className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Postcode</Label>
                <Input
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  placeholder="e.g. 2000"
                  className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/70 text-sm">State</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, state: v })}>
                  <SelectTrigger className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/[0.06] rounded-sm">
                    {AUSTRALIAN_STATES.map((s) => (
                      <SelectItem key={s} value={s} className="text-white">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white/70 text-sm">Property Type</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, propertyType: v })}>
                  <SelectTrigger className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/[0.06] rounded-sm">
                    {PROPERTY_TYPES.map((t) => (
                      <SelectItem key={t} value={t} className="text-white">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowAddModal(false)}
                className="flex-1 text-white/60 hover:text-white rounded-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProperty}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
                disabled={!formData.streetAddress || !formData.suburb || !formData.state}
              >
                Add Property
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
