'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Image,
  Loader2,
  MapPin,
  PenTool,
  Shield,
  User,
  UserPlus,
  Wrench,
} from 'lucide-react';

const JOB_STATUS_CONFIG: Record<string, { label: string; colour: string; bgColour: string }> = {
  PENDING: { label: 'Pending', colour: '#FFB800', bgColour: 'rgba(255, 184, 0, 0.15)' },
  ASSIGNED: { label: 'Assigned', colour: '#00F5FF', bgColour: 'rgba(0, 245, 255, 0.15)' },
  IN_PROGRESS: { label: 'In Progress', colour: '#0d9488', bgColour: 'rgba(13, 148, 136, 0.15)' },
  COMPLETED: { label: 'Completed', colour: '#00FF88', bgColour: 'rgba(0, 255, 136, 0.15)' },
  INVOICED: { label: 'Invoiced', colour: '#a78bfa', bgColour: 'rgba(167, 139, 250, 0.15)' },
  PAID: { label: 'Paid', colour: '#34d399', bgColour: 'rgba(52, 211, 153, 0.15)' },
};

const JOB_TYPE_LABELS: Record<string, string> = {
  water: 'Water Damage',
  fire: 'Fire Damage',
  mould: 'Mould Remediation',
  storm: 'Storm Damage',
  asbestos: 'Asbestos Removal',
};

const STATUS_ORDER = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'INVOICED', 'PAID'];

interface JobDetail {
  id: string;
  jobNumber: string;
  type: string;
  status: string;
  estimatedCost: string | null;
  actualCost: string | null;
  scheduledDate: string | null;
  completedDate: string | null;
  hoursWorked: string | null;
  materialsUsed: string | null;
  notes: string | null;
  insuranceClaimId: string | null;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
    propertyType: string;
  };
  contractor: {
    id: string;
    businessName: string;
    averageRating: string;
    completedJobs: number;
    isVerified: boolean;
    user: { name: string; email: string };
  } | null;
  documents: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    createdAt: string;
  }>;
  photos: Array<{
    id: string;
    url: string;
    caption: string | null;
    takenAt: string;
  }>;
}

export default function JobDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const fetchJob = useCallback(async () => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`);
      const data = await res.json();
      if (data.success) {
        setJob(data.data);
      } else {
        setError('Job not found');
      }
    } catch (err) {
      setError('Error loading job');
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchJob();
  }, [user, fetchJob]);

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setJob((prev) => prev ? { ...prev, status: newStatus } : prev);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#FF4444] mb-4">{error || 'Job not found'}</p>
          <button
            onClick={() => router.push('/dashboard/jobs')}
            className="text-sm text-[#0d9488] hover:underline"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const statusCfg = JOB_STATUS_CONFIG[job.status] || JOB_STATUS_CONFIG.PENDING;
  const currentStatusIndex = STATUS_ORDER.indexOf(job.status);

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-mono text-[#00F5FF]">{job.jobNumber}</h1>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{ color: statusCfg.colour, backgroundColor: statusCfg.bgColour }}
              >
                {statusCfg.label}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {JOB_TYPE_LABELS[job.type] || job.type} &middot; Created{' '}
              {new Date(job.createdAt).toLocaleDateString('en-AU')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.status === 'PENDING' && (
              <button
                onClick={() => router.push(`/dashboard/jobs/${job.id}/assign`)}
                className="flex items-center gap-2 px-4 py-2 bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[#00F5FF] rounded-lg text-sm font-medium hover:bg-[#00F5FF]/20 transition-colours"
              >
                <UserPlus className="h-4 w-4" />
                Assign Contractor
              </button>
            )}
            {(job.status === 'ASSIGNED' || job.status === 'IN_PROGRESS') && (
              <button
                onClick={() => router.push(`/dashboard/jobs/${job.id}/complete`)}
                className="flex items-center gap-2 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg text-sm font-medium hover:bg-[#00FF88]/20 transition-colours"
              >
                <CheckCircle className="h-4 w-4" />
                Complete Job
              </button>
            )}
            {job.status === 'ASSIGNED' && (
              <button
                onClick={() => handleStatusUpdate('IN_PROGRESS')}
                disabled={updating}
                className="flex items-center gap-2 px-4 py-2 bg-[#0d9488]/10 border border-[#0d9488]/30 text-[#0d9488] rounded-lg text-sm font-medium hover:bg-[#0d9488]/20 transition-colours disabled:opacity-50"
              >
                <Wrench className="h-4 w-4" />
                Start Work
              </button>
            )}
            {job.status === 'COMPLETED' && (
              <button
                onClick={() => router.push(`/dashboard/jobs/${job.id}/invoice`)}
                className="flex items-center gap-2 px-4 py-2 bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-[#a78bfa] rounded-lg text-sm font-medium hover:bg-[#a78bfa]/20 transition-colours"
              >
                <DollarSign className="h-4 w-4" />
                Generate Invoice
              </button>
            )}
            <button
              onClick={() => router.push(`/dashboard/jobs/${job.id}/scope`)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0d9488]/10 border border-[#0d9488]/30 text-[#0d9488] rounded-lg text-sm font-medium hover:bg-[#0d9488]/20 transition-colours"
            >
              <PenTool className="h-4 w-4" />
              Scope Diagram
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Status Timeline */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Status Timeline</h2>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {STATUS_ORDER.map((status, idx) => {
              const sCfg = JOB_STATUS_CONFIG[status];
              const isCompleted = idx < currentStatusIndex;
              const isCurrent = idx === currentStatusIndex;
              return (
                <div key={status} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-[#00FF88]/20 text-[#00FF88]'
                          : isCurrent
                          ? 'ring-2 ring-offset-2 ring-offset-[#050505]'
                          : 'bg-white/5 text-gray-600'
                      }`}
                      style={isCurrent ? { backgroundColor: sCfg.bgColour, color: sCfg.colour, ringColor: sCfg.colour } : {}}
                    >
                      {isCompleted ? '✓' : idx + 1}
                    </div>
                    <span className={`text-xs mt-1.5 whitespace-nowrap ${isCurrent ? 'text-white font-medium' : 'text-gray-500'}`}>
                      {sCfg.label}
                    </span>
                  </div>
                  {idx < STATUS_ORDER.length - 1 && (
                    <div
                      className={`w-8 sm:w-12 h-0.5 mx-1 ${
                        idx < currentStatusIndex ? 'bg-[#00FF88]/40' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Property
              </h3>
              <p className="text-white font-medium">{job.property.streetAddress}</p>
              <p className="text-sm text-gray-400">
                {job.property.suburb}, {job.property.state} {job.property.postcode}
              </p>
              <p className="text-xs text-gray-500 mt-1">{job.property.propertyType}</p>
            </div>

            {/* Cost Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Cost Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Estimated</p>
                  <p className="text-lg font-semibold text-white">
                    {job.estimatedCost ? `$${Number(job.estimatedCost).toLocaleString('en-AU')}` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Actual</p>
                  <p className="text-lg font-semibold text-[#00FF88]">
                    {job.actualCost ? `$${Number(job.actualCost).toLocaleString('en-AU')}` : 'N/A'}
                  </p>
                </div>
                {job.hoursWorked && (
                  <div>
                    <p className="text-xs text-gray-500">Hours Worked</p>
                    <p className="text-sm text-white">{Number(job.hoursWorked)}h</p>
                  </div>
                )}
                {job.materialsUsed && (
                  <div>
                    <p className="text-xs text-gray-500">Materials</p>
                    <p className="text-sm text-white">{job.materialsUsed}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {job.notes && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Notes
                </h3>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{job.notes}</p>
              </div>
            )}

            {/* Documents */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Documents ({job.documents.length})
              </h3>
              {job.documents.length === 0 ? (
                <p className="text-sm text-gray-500">No documents uploaded yet.</p>
              ) : (
                <div className="space-y-2">
                  {job.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div>
                        <p className="text-sm text-white">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.type} &middot; {(doc.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0d9488] hover:underline"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Photos */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <Image className="h-4 w-4" /> Photos ({job.photos.length})
              </h3>
              {job.photos.length === 0 ? (
                <p className="text-sm text-gray-500">No photos uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {job.photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <div className="aspect-square bg-white/10 rounded-lg overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.caption || 'Job photo'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {photo.caption && (
                        <p className="text-xs text-gray-400 mt-1 truncate">{photo.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contractor Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <User className="h-4 w-4" /> Contractor
              </h3>
              {job.contractor ? (
                <div>
                  <p className="text-white font-medium">{job.contractor.businessName}</p>
                  <p className="text-sm text-gray-400">{job.contractor.user.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{job.contractor.user.email}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-gray-400">
                      Rating: {Number(job.contractor.averageRating).toFixed(1)}/5
                    </span>
                    <span className="text-xs text-gray-400">
                      {job.contractor.completedJobs} jobs
                    </span>
                  </div>
                  {job.contractor.isVerified && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-[#00FF88]">
                      <Shield className="h-3 w-3" /> Verified
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 mb-3">No contractor assigned</p>
                  {job.status === 'PENDING' && (
                    <button
                      onClick={() => router.push(`/dashboard/jobs/${job.id}/assign`)}
                      className="w-full py-2 bg-[#0d9488] hover:bg-[#0d9488]/80 text-white rounded-lg text-sm font-medium transition-colours"
                    >
                      Assign Contractor
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Schedule Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Schedule
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="text-gray-300">
                    {new Date(job.createdAt).toLocaleDateString('en-AU')}
                  </span>
                </div>
                {job.scheduledDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scheduled</span>
                    <span className="text-gray-300">
                      {new Date(job.scheduledDate).toLocaleDateString('en-AU')}
                    </span>
                  </div>
                )}
                {job.completedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Completed</span>
                    <span className="text-[#00FF88]">
                      {new Date(job.completedDate).toLocaleDateString('en-AU')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Updated</span>
                  <span className="text-gray-300">
                    {new Date(job.updatedAt).toLocaleDateString('en-AU')}
                  </span>
                </div>
              </div>
            </div>

            {/* Insurance */}
            {job.insuranceClaimId && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Insurance
                </h3>
                <p className="text-sm text-gray-300">
                  Claim ID: <span className="font-mono text-[#00F5FF]">{job.insuranceClaimId}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
