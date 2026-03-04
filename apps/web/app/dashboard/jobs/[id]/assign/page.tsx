'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Search,
  Shield,
  Star,
  User,
  UserPlus,
  XCircle,
} from 'lucide-react';

interface ContractorUser {
  id: string;
  name: string;
  email: string;
  contractor: {
    id: string;
    businessName: string;
    completedJobs: number;
    isVerified: boolean;
  } | null;
}

export default function AssignContractorPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [contractors, setContractors] = useState<ContractorUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const fetchContractors = useCallback(async () => {
    try {
      const res = await fetch('/api/contractor?isVerified=true&limit=50');
      const data = await res.json();
      if (data.success && data.data) {
        // Filter to only those with contractor profiles
        setContractors(data.data.filter((c: ContractorUser) => c.contractor));
      }
    } catch (err) {
      console.error('Error fetching contractors:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchContractors();
  }, [user, fetchContractors]);

  const handleAssign = async () => {
    if (!selectedId) {
      setError('Please select a contractor');
      return;
    }

    setAssigning(true);
    setError('');
    try {
      const res = await fetch(`/api/jobs/${jobId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorId: selectedId }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.message || 'Contractor assigned successfully');
        setTimeout(() => router.push(`/dashboard/jobs/${jobId}`), 1500);
      } else {
        setError(data.error || 'Failed to assign contractor');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setAssigning(false);
    }
  };

  const filteredContractors = contractors.filter((c) =>
    (c.contractor?.businessName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          onClick={() => router.push(`/dashboard/jobs/${jobId}`)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colours mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Job
        </button>
        <h1 className="text-2xl font-bold">Assign Contractor</h1>
        <p className="text-sm text-gray-400 mt-1">
          Select a verified contractor to assign to this job
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
        {error && (
          <div className="mb-4 p-3 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-lg text-sm text-[#FF4444]">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg text-sm text-[#00FF88] flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            {success}
          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search contractors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
          />
        </div>

        {/* Contractor List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#0d9488]" />
          </div>
        ) : filteredContractors.length === 0 ? (
          <div className="text-center py-16">
            <User className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No verified contractors found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredContractors.map((cu) => {
              const c = cu.contractor!;
              const isSelected = selectedId === c.id;
              const isAvailable = c.isVerified;
              return (
                <button
                  key={c.id}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => setSelectedId(isSelected ? '' : c.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-[border-color,background-color,box-shadow,opacity] ${
                    isSelected
                      ? 'border-[#0d9488] bg-[#0d9488]/10 ring-1 ring-[#0d9488]'
                      : isAvailable
                      ? 'border-white/10 bg-white/5 hover:border-white/20'
                      : 'border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{c.businessName}</p>
                      <p className="text-sm text-gray-400">{cu.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.isVerified ? (
                        <span className="flex items-center gap-1 text-xs text-[#00FF88]">
                          <Shield className="h-3 w-3" /> Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-[#FF4444]">
                          <XCircle className="h-3 w-3" /> Unverified
                        </span>
                      )}
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-[#0d9488]" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>{c.completedJobs} jobs completed</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Assign Button */}
        {selectedId && (
          <div className="mt-6 sticky bottom-6">
            <button
              onClick={handleAssign}
              disabled={assigning}
              className="w-full py-3 bg-[#0d9488] hover:bg-[#0d9488]/80 disabled:opacity-50 text-white rounded-lg font-medium transition-colours text-sm flex items-center justify-center gap-2"
            >
              {assigning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Confirm Assignment
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

