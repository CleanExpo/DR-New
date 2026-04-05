'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Zap,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface ServiceArea {
  id: string;
  postcode: string;
  state: string;
  suburb?: string;
  city?: string;
  radiusKm: number;
  responseTimeMinutes: number;
  isPrimaryArea: boolean;
  coverageLevel: string;
  priorityLevel: number;
  isActive: boolean;
  latitude?: number;
  longitude?: number;
}

interface ServiceAreaManagerProps {
  onAreasUpdated?: () => void;
}

// Australian states
const AUSTRALIAN_STATES = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
];

// Coverage levels
const COVERAGE_LEVELS = [
  { value: 'STANDARD', label: 'Standard', icon: Target, color: 'text-blue-500' },
  { value: 'PRIORITY', label: 'Priority', icon: Zap, color: 'text-yellow-500' },
  { value: 'EMERGENCY_ONLY', label: 'Emergency Only', icon: AlertCircle, color: 'text-red-500' },
  { value: 'LIMITED', label: 'Limited', icon: Clock, color: 'text-gray-400' },
];

// Coverage level badge component
function CoverageLevelBadge({ level }: { level: string }) {
  const config = COVERAGE_LEVELS.find(l => l.value === level) || COVERAGE_LEVELS[0];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`gap-1.5 border ${config.color}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

export default function ServiceAreaManager({ onAreasUpdated }: ServiceAreaManagerProps) {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    postcode: '',
    state: '',
    suburb: '',
    city: '',
    radiusKm: '25',
    responseTimeMinutes: '60',
    isPrimaryArea: false,
    coverageLevel: 'STANDARD',
    priorityLevel: '1',
  });

  useEffect(() => {
    fetchServiceAreas();
  }, []);

  const fetchServiceAreas = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contractor/verification/service-areas');
      if (response.ok) {
        const data = await response.json();
        setServiceAreas(data.serviceAreas || []);
      } else {
        toast.error('Failed to load service areas');
      }
    } catch (error) {
      console.error('Error fetching service areas:', error);
      toast.error('Failed to load service areas');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      postcode: '',
      state: '',
      suburb: '',
      city: '',
      radiusKm: '25',
      responseTimeMinutes: '60',
      isPrimaryArea: false,
      coverageLevel: 'STANDARD',
      priorityLevel: '1',
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleAdd = async () => {
    if (!formData.postcode || !formData.state) {
      toast.error('Postcode and state are required');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/contractor/verification/service-areas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postcode: formData.postcode,
          state: formData.state,
          suburb: formData.suburb || null,
          city: formData.city || null,
          radiusKm: parseInt(formData.radiusKm),
          responseTimeMinutes: parseInt(formData.responseTimeMinutes),
          isPrimaryArea: formData.isPrimaryArea,
          coverageLevel: formData.coverageLevel,
          priorityLevel: parseInt(formData.priorityLevel),
        }),
      });

      if (response.ok) {
        toast.success('Service area added successfully!');
        resetForm();
        await fetchServiceAreas();
        if (onAreasUpdated) {
          onAreasUpdated();
        }
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to add service area');
      }
    } catch (error) {
      console.error('Error adding service area:', error);
      toast.error('Failed to add service area');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (area: ServiceArea) => {
    setFormData({
      postcode: area.postcode,
      state: area.state,
      suburb: area.suburb || '',
      city: area.city || '',
      radiusKm: area.radiusKm.toString(),
      responseTimeMinutes: area.responseTimeMinutes.toString(),
      isPrimaryArea: area.isPrimaryArea,
      coverageLevel: area.coverageLevel,
      priorityLevel: area.priorityLevel.toString(),
    });
    setEditingId(area.id);
    setShowAddForm(true);
  };

  const handleUpdate = async () => {
    if (!editingId || !formData.postcode || !formData.state) {
      toast.error('Postcode and state are required');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/contractor/verification/service-areas?id=${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postcode: formData.postcode,
          state: formData.state,
          suburb: formData.suburb || null,
          city: formData.city || null,
          radiusKm: parseInt(formData.radiusKm),
          responseTimeMinutes: parseInt(formData.responseTimeMinutes),
          isPrimaryArea: formData.isPrimaryArea,
          coverageLevel: formData.coverageLevel,
          priorityLevel: parseInt(formData.priorityLevel),
        }),
      });

      if (response.ok) {
        toast.success('Service area updated successfully!');
        resetForm();
        await fetchServiceAreas();
        if (onAreasUpdated) {
          onAreasUpdated();
        }
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to update service area');
      }
    } catch (error) {
      console.error('Error updating service area:', error);
      toast.error('Failed to update service area');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (areaId: string) => {
    if (!confirm('Are you sure you want to delete this service area?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contractor/verification/service-areas?id=${areaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Service area deleted successfully');
        await fetchServiceAreas();
        if (onAreasUpdated) {
          onAreasUpdated();
        }
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete service area');
      }
    } catch (error) {
      console.error('Error deleting service area:', error);
      toast.error('Failed to delete service area');
    }
  };

  return (
    <div className="space-y-6">
      {/* Service Areas List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#00BFA6]" />
                Service Coverage Areas
              </CardTitle>
              <CardDescription className="text-gray-400">
                {serviceAreas.length} area{serviceAreas.length !== 1 ? 's' : ''} configured
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Area
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
            </div>
          ) : serviceAreas.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">No service areas configured yet</p>
              <p className="text-sm mt-2">Add your first service area to start receiving job matches</p>
            </div>
          ) : (
            <div className="space-y-3">
              {serviceAreas.map((area) => (
                <div
                  key={area.id}
                  className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-gray-600 rounded">
                      <MapPin className="h-6 w-6 text-[#00BFA6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-white">
                          {area.suburb || 'Postcode'} {area.postcode}, {area.state}
                        </p>
                        {area.isPrimaryArea && (
                          <Badge variant="outline" className="gap-1 border-[#00BFA6] text-[#00BFA6]">
                            <Shield className="h-3 w-3" />
                            Primary
                          </Badge>
                        )}
                        <CoverageLevelBadge level={area.coverageLevel} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Radius: {area.radiusKm}km</span>
                        <span>•</span>
                        <span>Response: {area.responseTimeMinutes}min</span>
                        <span>•</span>
                        <span>Priority: {area.priorityLevel}</span>
                        {area.city && (
                          <>
                            <span>•</span>
                            <span>{area.city}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(area)}
                      className="text-gray-300 hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(area.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingId ? 'Edit Service Area' : 'Add New Service Area'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              Define your service coverage for client matching
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Postcode and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postcode" className="text-gray-300">
                  Postcode *
                </Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => handleInputChange('postcode', e.target.value)}
                  placeholder="2000"
                  maxLength={4}
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-gray-300">
                  State *
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleInputChange('state', value)}
                >
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {AUSTRALIAN_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value} className="text-white">
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Suburb and City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="suburb" className="text-gray-300">
                  Suburb
                </Label>
                <Input
                  id="suburb"
                  value={formData.suburb}
                  onChange={(e) => handleInputChange('suburb', e.target.value)}
                  placeholder="Sydney CBD"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-gray-300">
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Sydney"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            {/* Coverage Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="radiusKm" className="text-gray-300">
                  Radius (km) *
                </Label>
                <Input
                  id="radiusKm"
                  type="number"
                  value={formData.radiusKm}
                  onChange={(e) => handleInputChange('radiusKm', e.target.value)}
                  min="1"
                  max="500"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="responseTimeMinutes" className="text-gray-300">
                  Response Time (min) *
                </Label>
                <Input
                  id="responseTimeMinutes"
                  type="number"
                  value={formData.responseTimeMinutes}
                  onChange={(e) => handleInputChange('responseTimeMinutes', e.target.value)}
                  min="1"
                  max="1440"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="priorityLevel" className="text-gray-300">
                  Priority Level (1-10) *
                </Label>
                <Input
                  id="priorityLevel"
                  type="number"
                  value={formData.priorityLevel}
                  onChange={(e) => handleInputChange('priorityLevel', e.target.value)}
                  min="1"
                  max="10"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
            </div>

            {/* Coverage Level */}
            <div>
              <Label htmlFor="coverageLevel" className="text-gray-300">
                Coverage Level *
              </Label>
              <Select
                value={formData.coverageLevel}
                onValueChange={(value) => handleInputChange('coverageLevel', value)}
              >
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {COVERAGE_LEVELS.map((level) => {
                    const Icon = level.icon;
                    return (
                      <SelectItem key={level.value} value={level.value} className="text-white">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${level.color}`} />
                          {level.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Primary Area Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPrimaryArea"
                checked={formData.isPrimaryArea}
                onChange={(e) => handleInputChange('isPrimaryArea', e.target.checked)}
                className="rounded border-gray-600 bg-gray-700"
              />
              <Label htmlFor="isPrimaryArea" className="text-gray-300 cursor-pointer">
                Mark as primary service area
              </Label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={resetForm}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={editingId ? handleUpdate : handleAdd}
                disabled={saving}
                className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingId ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {editingId ? 'Update Area' : 'Add Area'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
