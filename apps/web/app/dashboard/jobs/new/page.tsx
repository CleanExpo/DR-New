'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  Loader2,
  MapPin,
} from 'lucide-react';

const JOB_TYPES = [
  { value: 'water', label: 'Water Damage', icon: '💧' },
  { value: 'fire', label: 'Fire Damage', icon: '🔥' },
  { value: 'mould', label: 'Mould Remediation', icon: '🦠' },
  { value: 'storm', label: 'Storm Damage', icon: '⛈️' },
  { value: 'asbestos', label: 'Asbestos Removal', icon: '⚠️' },
];

interface Property {
  id: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
}

export default function NewJobPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [type, setType] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('/api/client/properties');
        const data = await res.json();
        if (data.success && data.data) {
          setProperties(data.data);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoadingProperties(false);
      }
    }
    if (user) fetchProperties();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!type) {
      setError('Please select a job type');
      return;
    }
    if (!propertyId) {
      setError('Please select a property');
      return;
    }

    setSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        type,
        propertyId,
      };
      if (estimatedCost) body.estimatedCost = parseFloat(estimatedCost);
      if (scheduledDate) body.scheduledDate = new Date(scheduledDate).toISOString();
      if (notes) body.notes = notes;

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/jobs/${data.data.id}`);
      } else {
        setError(data.error || 'Failed to create job');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push('/dashboard/jobs')}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colours mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </button>
        <h1 className="text-2xl font-bold">Create New Job</h1>
        <p className="text-sm text-gray-400 mt-1">
          Create an emergency restoration job request
        </p>
      </div>

      {/* Form */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-lg text-sm text-[#FF4444]">
              {error}
            </div>
          )}

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Job Type <span className="text-[#FF4444]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOB_TYPES.map((jt) => (
                <button
                  key={jt.value}
                  type="button"
                  onClick={() => setType(jt.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-[border-color,background-color,box-shadow] text-left ${
                    type === jt.value
                      ? 'border-[#0d9488] bg-[#0d9488]/10 ring-1 ring-[#0d9488]'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{jt.icon}</span>
                  <span className="text-sm font-medium text-white">{jt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Property Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Property <span className="text-[#FF4444]">*</span>
            </label>
            {loadingProperties ? (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading properties...
              </div>
            ) : properties.length === 0 ? (
              <p className="text-sm text-gray-400">
                No properties found. Please add a property to your profile first.
              </p>
            ) : (
              <select
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
              >
                <option value="">Select a property</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.streetAddress}, {p.suburb}, {p.state} {p.postcode}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Estimated Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Estimated Cost (AUD)
            </label>
            <input
              type="number"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              placeholder="e.g. 5000"
              min="0"
              step="50"
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
            />
          </div>

          {/* Scheduled Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Scheduled Date
            </label>
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="inline h-4 w-4 mr-1" />
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the situation, access requirements, urgency..."
              rows={4}
              maxLength={2000}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488] resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{notes.length}/2000 characters</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !type || !propertyId}
            className="w-full py-3 bg-[#0d9488] hover:bg-[#0d9488]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colours text-sm flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Job...
              </>
            ) : (
              'Create Job'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
