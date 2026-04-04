'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';
import ScopeDiagramView from '@/components/jobs/ScopeDiagram';
import {
  generateScopeDiagram,
  type JobType,
  type RoomInput,
  type ScopeDiagram,
  type SeverityLevel,
} from '@/lib/diagrams/scope-generator';
import { generateProposalPDF } from '@/lib/diagrams/proposal-pdf';

const JOB_TYPE_LABELS: Record<string, string> = {
  water: 'Water Damage',
  fire: 'Fire Damage',
  mould: 'Mould Remediation',
  storm: 'Storm Damage',
  asbestos: 'Asbestos Removal',
};

const SEVERITY_OPTIONS: { value: SeverityLevel; label: string; colour: string }[] = [
  { value: 'low', label: 'Low', colour: '#22C55E' },
  { value: 'moderate', label: 'Moderate', colour: '#FFB800' },
  { value: 'high', label: 'High', colour: '#F97316' },
  { value: 'critical', label: 'Critical', colour: '#EF4444' },
];

interface JobData {
  id: string;
  jobNumber: string;
  type: string;
  status: string;
  notes: string | null;
  scheduledDate: string | null;
  property: {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}

let roomIdCounter = 0;
function nextRoomId(): string {
  return `room-${++roomIdCounter}`;
}

export default function ScopeDiagramPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);

  // Room inputs
  const [rooms, setRooms] = useState<RoomInput[]>([
    {
      id: nextRoomId(),
      name: 'Living Room',
      width: 5,
      length: 4,
      damageType: 'water',
      severity: 'moderate',
    },
  ]);

  const [diagram, setDiagram] = useState<ScopeDiagram | null>(null);

  const fetchJob = useCallback(async () => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`);
      const data = await res.json();
      if (data.success) {
        setJob(data.data);
        // Pre-fill damage type from job type
        setRooms((prev) =>
          prev.map((r) => ({ ...r, damageType: data.data.type as JobType }))
        );
      } else {
        setError('Job not found');
      }
    } catch {
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

  // Live preview: regenerate diagram whenever rooms change
  useEffect(() => {
    if (!job || rooms.length === 0) {
      setDiagram(null);
      return;
    }
    const d = generateScopeDiagram(job.type as JobType, rooms);
    setDiagram(d);
  }, [rooms, job]);

  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      {
        id: nextRoomId(),
        name: `Room ${prev.length + 1}`,
        width: 4,
        length: 3,
        damageType: (job?.type as JobType) || 'water',
        severity: 'moderate',
      },
    ]);
  };

  const removeRoom = (id: string) => {
    if (rooms.length <= 1) return;
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoom = (id: string, field: keyof RoomInput, value: string | number) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      )
    );
  };

  const handleGenerateProposal = async () => {
    if (!job || !diagram) return;
    setGenerating(true);

    try {
      const propertyAddress = `${job.property.streetAddress}, ${job.property.suburb}, ${job.property.state} ${job.property.postcode}`;

      const pdfBlob = await generateProposalPDF(
        {
          jobNumber: job.jobNumber,
          jobType: job.type,
          propertyAddress,
          scheduledDate: job.scheduledDate
            ? new Date(job.scheduledDate).toLocaleDateString('en-AU')
            : undefined,
          notes: job.notes || undefined,
        },
        diagram,
      );

      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NRPG-Proposal-${job.jobNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating proposal:', err);
    } finally {
      setGenerating(false);
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

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Job
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Scope Diagram Generator</h1>
            <p className="text-sm text-gray-400 mt-1">
              <span className="font-mono text-[#00F5FF]">{job.jobNumber}</span> |{' '}
              {JOB_TYPE_LABELS[job.type] || job.type} |{' '}
              {job.property.suburb}, {job.property.state}
            </p>
          </div>
          <button
            onClick={handleGenerateProposal}
            disabled={!diagram || generating}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0d9488]/80 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            Generate Proposal PDF
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Room Input Form */}
          <div className="xl:col-span-1 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Damage Areas ({rooms.length})
              </h2>
              <button
                onClick={addRoom}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d9488]/10 border border-[#0d9488]/30 text-[#0d9488] rounded-lg text-xs hover:bg-[#0d9488]/20 transition-colors"
              >
                <Plus className="h-3 w-3" />
                Add Room
              </button>
            </div>

            {rooms.map((room, idx) => (
              <div
                key={room.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Room {idx + 1}</span>
                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Room name */}
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Room Name</label>
                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
                  />
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Width (m)</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      step={0.5}
                      value={room.width}
                      onChange={(e) => updateRoom(room.id, 'width', parseFloat(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Length (m)</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      step={0.5}
                      value={room.length}
                      onChange={(e) => updateRoom(room.id, 'length', parseFloat(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
                    />
                  </div>
                </div>

                {/* Area display */}
                <div className="text-xs text-gray-400">
                  Area: <span className="text-white font-medium">{room.width * room.length} m2</span>
                </div>

                {/* Severity */}
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Severity</label>
                  <div className="grid grid-cols-4 gap-1">
                    {SEVERITY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateRoom(room.id, 'severity', opt.value)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          room.severity === opt.value
                            ? 'border-2'
                            : 'border border-white/10 text-gray-400 hover:bg-white/5'
                        }`}
                        style={
                          room.severity === opt.value
                            ? { borderColor: opt.colour, color: opt.colour, backgroundColor: `${opt.colour}15` }
                            : {}
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Live Diagram Preview */}
          <div className="xl:col-span-2">
            {diagram ? (
              <ScopeDiagramView
                diagram={diagram}
                jobNumber={job.jobNumber}
                propertyAddress={`${job.property.streetAddress}, ${job.property.suburb}`}
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-gray-400 text-sm">Add rooms to generate a scope diagram</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
