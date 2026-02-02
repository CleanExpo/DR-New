'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Shield,
  Zap,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Contractor {
  id: string;
  businessName: string;
  averageRating: number;
  serviceAreas: any[];
}

interface BookingFormProps {
  contractor: Contractor;
  onSuccess?: (bookingId: string) => void;
  onCancel?: () => void;
}

// Australian service types
const SERVICE_TYPES = [
  { value: 'WATER_DAMAGE', label: 'Water Damage' },
  { value: 'FIRE_DAMAGE', label: 'Fire Damage' },
  { value: 'SMOKE_DAMAGE', label: 'Smoke Damage' },
  { value: 'MOULD_REMEDIATION', label: 'Mould Remediation' },
  { value: 'ODOUR_REMEDIATION', label: 'Odour Remediation' },
  { value: 'CARPET_CLEANING', label: 'Carpet Cleaning' },
  { value: 'COMMERCIAL_WATER_DAMAGE', label: 'Commercial Water Damage' },
  { value: 'COMMERCIAL_FIRE_DAMAGE', label: 'Commercial Fire Damage' },
  { value: 'COMMERCIAL_MOULD', label: 'Commercial Mould' },
  { value: 'COMMERCIAL_ODOUR', label: 'Commercial Odour' },
  { value: 'CRIME_SCENE_CLEANING', label: 'Crime Scene Cleaning' },
  { value: 'BIOHAZARD_REMEDIATION', label: 'Biohazard Remediation' },
  { value: 'HOARDING_CLEANUP', label: 'Hoarding Cleanup' },
  { value: 'VANDALISM_CLEANUP', label: 'Vandalism Cleanup' },
  { value: 'GENERAL_RESTORATION', label: 'General Restoration' },
];

// Emergency response levels
const EMERGENCY_LEVELS = [
  { value: 'URGENT', label: 'Urgent (Within 2 hours)', icon: Zap, color: 'text-red-500' },
  { value: 'HIGH', label: 'High Priority (Same day)', icon: AlertTriangle, color: 'text-orange-500' },
  { value: 'STANDARD', label: 'Standard (Within 24 hours)', icon: Info, color: 'text-blue-500' },
  { value: 'SCHEDULED', label: 'Scheduled (Flexible timing)', icon: Calendar, color: 'text-green-500' },
];

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

// Australian insurance providers
const INSURANCE_PROVIDERS = [
  { value: 'NRMA', label: 'NRMA Insurance' },
  { value: 'SUNCORP', label: 'Suncorp' },
  { value: 'ALLIANZ', label: 'Allianz' },
  { value: 'QBE', label: 'QBE Insurance' },
  { value: 'IAG', label: 'IAG' },
  { value: 'CGU', label: 'CGU Insurance' },
  { value: 'MEDIBANK', label: 'Medibank Private' },
  { value: 'OTHER', label: 'Other' },
];

export default function BookingForm({ contractor, onSuccess, onCancel }: BookingFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Service details
    serviceType: '',
    emergencyLevel: 'STANDARD',
    description: '',

    // Property address
    streetAddress: '',
    suburb: '',
    postcode: '',
    state: '',

    // Optional details
    preferredDateTime: '',
    estimatedDamageAUD: '',
    insuranceProvider: '',
    policyNumber: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.serviceType) {
      toast.error('Please select a service type');
      return;
    }

    if (formData.description.length < 20) {
      toast.error('Description must be at least 20 characters');
      return;
    }

    if (!formData.streetAddress || !formData.suburb || !formData.postcode || !formData.state) {
      toast.error('Please provide complete property address');
      return;
    }

    // Validate Australian postcode (4 digits)
    if (!/^\d{4}$/.test(formData.postcode)) {
      toast.error('Australian postcode must be exactly 4 digits');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        serviceType: formData.serviceType,
        emergencyLevel: formData.emergencyLevel,
        description: formData.description,
        address: {
          streetAddress: formData.streetAddress,
          suburb: formData.suburb,
          postcode: formData.postcode,
          state: formData.state,
          country: 'AU',
        },
        preferredDateTime: formData.preferredDateTime || undefined,
        estimatedDamageAUD: formData.estimatedDamageAUD
          ? parseFloat(formData.estimatedDamageAUD)
          : undefined,
        insuranceProvider: formData.insuranceProvider || undefined,
        policyNumber: formData.policyNumber || undefined,
        damagePhotos: [],
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setBookingId(data.data.id);
        setSubmitted(true);
        toast.success('Booking request submitted successfully!');

        if (onSuccess) {
          onSuccess(data.data.id);
        }
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to submit booking request');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking request');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && bookingId) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Booking Request Submitted!</h3>
            <p className="text-gray-400">
              Your booking request has been sent to {contractor.businessName}.
            </p>
            <p className="text-gray-400">
              You will receive a confirmation email shortly with your booking details.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button
                onClick={() => router.push(`/dashboard/bookings/${bookingId}`)}
                className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
              >
                View Booking Details
              </Button>
              <Button
                onClick={() => router.push('/dashboard/bookings')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                View All Bookings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Book Service with {contractor.businessName}</CardTitle>
        <CardDescription className="text-gray-400">
          Complete the form below to request a service booking
        </CardDescription>
        <div className="flex items-center gap-2 pt-2">
          <Badge variant="outline" className="border-[#00BFA6] text-[#00BFA6]">
            ⭐ {contractor.averageRating.toFixed(1)} Average Rating
          </Badge>
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            📍 {contractor.serviceAreas?.length || 0} Service Areas
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div>
            <Label htmlFor="serviceType" className="text-gray-300">
              Service Type <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleChange('serviceType', value)}>
              <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {SERVICE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-white">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Emergency Level */}
          <div>
            <Label className="text-gray-300 mb-2 block">
              Response Priority <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {EMERGENCY_LEVELS.map((level) => {
                const Icon = level.icon;
                return (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => handleChange('emergencyLevel', level.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.emergencyLevel === level.value
                        ? 'border-[#00BFA6] bg-[#00BFA6]/10'
                        : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${level.color}`} />
                      <div className="text-left">
                        <p className="text-white font-medium">{level.label.split('(')[0]}</p>
                        <p className="text-xs text-gray-400">{level.label.match(/\((.*?)\)/)?.[1]}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-300">
              Service Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Please describe the damage, issue, or service required in detail..."
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              rows={6}
              required
              minLength={20}
              maxLength={2000}
            />
            <p className="text-sm text-gray-400 mt-1">
              {formData.description.length}/2000 characters
              {formData.description.length < 20 && ' (minimum 20 characters)'}
            </p>
          </div>

          {/* Property Address */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <h3 className="font-medium text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#00BFA6]" />
              Property Address <span className="text-red-500">*</span>
            </h3>

            <div>
              <Label htmlFor="streetAddress" className="text-gray-300">
                Street Address
              </Label>
              <Input
                id="streetAddress"
                value={formData.streetAddress}
                onChange={(e) => handleChange('streetAddress', e.target.value)}
                placeholder="e.g., 123 Main Street"
                className="mt-1 bg-gray-700 border-gray-600 text-white"
                required
                minLength={5}
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="suburb" className="text-gray-300">
                  Suburb
                </Label>
                <Input
                  id="suburb"
                  value={formData.suburb}
                  onChange={(e) => handleChange('suburb', e.target.value)}
                  placeholder="e.g., Sydney"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                  minLength={2}
                  maxLength={50}
                />
              </div>

              <div>
                <Label htmlFor="postcode" className="text-gray-300">
                  Postcode
                </Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => handleChange('postcode', e.target.value)}
                  placeholder="e.g., 2000"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                  maxLength={4}
                  pattern="\d{4}"
                />
              </div>

              <div>
                <Label htmlFor="state" className="text-gray-300">
                  State
                </Label>
                <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
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
          </div>

          {/* Optional Details */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <h3 className="font-medium text-white">Additional Details (Optional)</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Preferred Date/Time */}
              <div>
                <Label htmlFor="preferredDateTime" className="text-gray-300 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Preferred Date & Time
                </Label>
                <Input
                  id="preferredDateTime"
                  type="datetime-local"
                  value={formData.preferredDateTime}
                  onChange={(e) => handleChange('preferredDateTime', e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {/* Estimated Damage Amount */}
              <div>
                <Label htmlFor="estimatedDamageAUD" className="text-gray-300 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Estimated Damage (AUD)
                </Label>
                <Input
                  id="estimatedDamageAUD"
                  type="number"
                  value={formData.estimatedDamageAUD}
                  onChange={(e) => handleChange('estimatedDamageAUD', e.target.value)}
                  placeholder="e.g., 5000"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  min="0"
                  step="100"
                />
              </div>
            </div>

            {/* Insurance Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insuranceProvider" className="text-gray-300 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Insurance Provider
                </Label>
                <Select
                  value={formData.insuranceProvider}
                  onValueChange={(value) => handleChange('insuranceProvider', value)}
                >
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select provider (if applicable)" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {INSURANCE_PROVIDERS.map((provider) => (
                      <SelectItem key={provider.value} value={provider.value} className="text-white">
                        {provider.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="policyNumber" className="text-gray-300 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Policy Number
                </Label>
                <Input
                  id="policyNumber"
                  value={formData.policyNumber}
                  onChange={(e) => handleChange('policyNumber', e.target.value)}
                  placeholder="e.g., POL123456789"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  maxLength={50}
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-700">
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#00BFA6] hover:bg-[#00A693] text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                'Submit Booking Request'
              )}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Info Note */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-300">
              ℹ️ <strong>Note:</strong> This is a booking request. The contractor will review your request
              and contact you to confirm availability and provide a detailed quote.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
