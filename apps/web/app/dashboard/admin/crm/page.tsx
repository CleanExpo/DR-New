// @ts-nocheck
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Activity,
  TrendingUp,
  Loader2,
  AlertCircle,
  Search,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Briefcase,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ============================================================================
// Types
// ============================================================================

interface CustomerLifecycle {
  id: string;
  status: string;
  leadScore: number;
  user: {
    name: string | null;
    email: string | null;
    australianState: string | null;
  };
}

interface Opportunity {
  id: string;
  stage: string;
  estimatedValue: number | null;
  probability: number | null;
  expectedCloseDate: string | null;
  serviceType: string | null;
  serviceState: string | null;
  customerLifecycle: {
    user: { name: string | null; email: string | null; australianState: string | null };
  };
  assignedContractor: { businessName: string; averageRating: number } | null;
}

interface Activity {
  id: string;
  type: string;
  subject: string;
  description: string | null;
  scheduledAt: string | null;
  completedAt: string | null;
  outcome: string | null;
}

interface PipelineMetrics {
  totalOpportunities: number;
  totalPipelineValue: number;
  weightedValue: number;
  byStage: Record<string, { count: number; value: number }>;
}

interface PipelineData {
  opportunities: Opportunity[];
  metrics: PipelineMetrics;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// ============================================================================
// Constants
// ============================================================================

const STAGE_COLOURS: Record<string, string> = {
  LEAD: '#9ca3af',
  PROSPECT: '#60a5fa',
  PROPOSAL: '#a78bfa',
  NEGOTIATION: '#fbbf24',
  CLOSED_WON: '#34d399',
  CLOSED_LOST: '#f87171',
};

const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  CALL: 'Call',
  EMAIL: 'Email',
  MEETING: 'Meeting',
  NOTE: 'Note',
  TASK: 'Task',
  SITE_VISIT: 'Site Visit',
};

const formatAUD = (value: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

// ============================================================================
// Sub-components
// ============================================================================

function ContactsTab() {
  const [customers, setCustomers] = useState<CustomerLifecycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/crm/customers/all', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load contacts');
      const json = await res.json();
      // Customers endpoint varies — use pipeline data to get contacts via lifecycle
      // Fall back to fetching from opportunities
      if (json.success && Array.isArray(json.data)) {
        setCustomers(json.data);
      }
    } catch {
      // Try pipeline endpoint and extract unique contacts from customerLifecycle
      try {
        const pRes = await fetch('/api/crm/pipeline?limit=100');
        const pJson = await pRes.json();
        if (pJson.success && pJson.data?.opportunities) {
          const seen = new Set<string>();
          const contacts: CustomerLifecycle[] = [];
          for (const opp of pJson.data.opportunities as Opportunity[]) {
            if (!seen.has(opp.id)) {
              seen.add(opp.id);
              contacts.push({
                id: opp.id,
                status: opp.stage,
                leadScore: opp.probability ?? 0,
                user: opp.customerLifecycle.user,
              });
            }
          }
          setCustomers(contacts);
        }
      } catch {
        toast.error('Failed to load contacts');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchCustomers(); }, [fetchCustomers]);

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.user.name?.toLowerCase().includes(q) ||
      c.user.email?.toLowerCase().includes(q) ||
      c.user.australianState?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search contacts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">No contacts found</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-gray-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900/50 text-gray-400">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-800/50 text-gray-300 hover:bg-gray-900/30">
                  <td className="px-4 py-3 font-medium text-white">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      {c.user.name ?? '—'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Mail className="h-3.5 w-3.5" />
                      {c.user.email ?? '—'}
                    </div>
                  </td>
                  <td className="px-4 py-3">{c.user.australianState ?? '—'}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className="border-teal-800 text-teal-400 text-xs"
                    >
                      {c.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs" style={{ color: '#fbbf24' }}>
                    {c.leadScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PipelineTab() {
  const [data, setData] = useState<PipelineData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPipeline = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/crm/pipeline?limit=50');
      if (!res.ok) throw new Error('Failed to load pipeline');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch {
      toast.error('Failed to load pipeline data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchPipeline(); }, [fetchPipeline]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!data) return null;

  // Group opportunities by stage
  const stages = ['LEAD', 'PROSPECT', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];
  const byStage = stages.reduce<Record<string, Opportunity[]>>((acc, s) => {
    acc[s] = data.opportunities.filter((o) => o.stage === s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <p className="text-xs text-gray-400">Total Pipeline</p>
            <p className="mt-1 text-lg font-bold text-white">
              {data.metrics?.totalOpportunities ?? data.opportunities.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <p className="text-xs text-gray-400">Pipeline Value</p>
            <p className="mt-1 text-lg font-bold" style={{ color: '#34d399' }}>
              {data.metrics?.totalPipelineValue != null
                ? formatAUD(data.metrics.totalPipelineValue)
                : '—'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <p className="text-xs text-gray-400">Weighted Value</p>
            <p className="mt-1 text-lg font-bold" style={{ color: '#60a5fa' }}>
              {data.metrics?.weightedValue != null
                ? formatAUD(data.metrics.weightedValue)
                : '—'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban columns */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {stages.map((stage) => {
          const opps = byStage[stage] ?? [];
          const colour = STAGE_COLOURS[stage] ?? '#9ca3af';
          return (
            <div key={stage} className="rounded-sm border border-gray-800 bg-gray-900/30">
              <div className="flex items-center justify-between border-b border-gray-800 px-3 py-2">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: colour }}>
                  {stage.replace('_', ' ')}
                </span>
                <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs">
                  {opps.length}
                </Badge>
              </div>
              <div className="space-y-2 p-2">
                {opps.length === 0 ? (
                  <p className="py-4 text-center text-xs text-gray-500">Empty</p>
                ) : (
                  opps.map((opp) => (
                    <div
                      key={opp.id}
                      className="rounded border border-gray-800 bg-gray-900 p-2.5 text-xs space-y-1"
                    >
                      <p className="font-medium text-white truncate">
                        {opp.customerLifecycle.user.name ?? 'Unknown'}
                      </p>
                      {opp.serviceType && (
                        <p className="text-gray-500 truncate">{opp.serviceType}</p>
                      )}
                      {opp.estimatedValue != null && (
                        <p style={{ color: '#34d399' }}>{formatAUD(opp.estimatedValue)}</p>
                      )}
                      {opp.probability != null && (
                        <p className="text-gray-400">{opp.probability}% probability</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivitiesTab() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      // Activities require a userId — use the pipeline endpoint to get a userId
      // and then fetch activities, or fetch from accountability dashboard
      const pRes = await fetch('/api/crm/pipeline?limit=1');
      const pJson = await pRes.json();
      const userId = pJson.data?.opportunities?.[0]?.customerLifecycle?.user?.email ?? null;

      if (!userId) {
        setActivities([]);
        return;
      }

      const res = await fetch(`/api/crm/activities?userId=${encodeURIComponent(userId)}&limit=30`);
      if (!res.ok) throw new Error('Failed to load activities');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) setActivities(json.data);
    } catch {
      toast.error('Failed to load activities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchActivities(); }, [fetchActivities]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-400">
        No recent activities. Activities are loaded per-contact.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-gray-800">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/50 text-gray-400">
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Subject</th>
            <th className="px-4 py-3 font-medium">Scheduled</th>
            <th className="px-4 py-3 font-medium">Outcome</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a.id} className="border-b border-gray-800/50 text-gray-300">
              <td className="px-4 py-3">
                <Badge variant="outline" className="border-gray-700 text-teal-400 text-xs">
                  {ACTIVITY_TYPE_LABELS[a.type] ?? a.type}
                </Badge>
              </td>
              <td className="px-4 py-3 text-white">{a.subject}</td>
              <td className="px-4 py-3 text-gray-400">
                {a.scheduledAt
                  ? new Date(a.scheduledAt).toLocaleDateString('en-AU')
                  : '—'}
              </td>
              <td className="px-4 py-3 text-gray-400">{a.outcome ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OpportunitiesTab() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOpportunities = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/crm/opportunities');
      if (!res.ok) throw new Error('Failed to load opportunities');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) setOpportunities(json.data);
    } catch {
      toast.error('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchOpportunities(); }, [fetchOpportunities]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-gray-800">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/50 text-gray-400">
            <th className="px-4 py-3 font-medium">Contact</th>
            <th className="px-4 py-3 font-medium">Stage</th>
            <th className="px-4 py-3 font-medium text-right">Value</th>
            <th className="px-4 py-3 font-medium text-right">Probability</th>
            <th className="px-4 py-3 font-medium">Close Date</th>
            <th className="px-4 py-3 font-medium">Contractor</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                No opportunities found
              </td>
            </tr>
          ) : (
            opportunities.map((opp) => (
              <tr key={opp.id} className="border-b border-gray-800/50 text-gray-300 hover:bg-gray-900/20">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{opp.customerLifecycle.user.name ?? '—'}</p>
                  <p className="text-xs text-gray-500">{opp.customerLifecycle.user.email}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor: STAGE_COLOURS[opp.stage] ?? '#374151',
                      color: STAGE_COLOURS[opp.stage] ?? '#9ca3af',
                    }}
                  >
                    {opp.stage.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right font-medium" style={{ color: '#34d399' }}>
                  {opp.estimatedValue != null ? formatAUD(opp.estimatedValue) : '—'}
                </td>
                <td className="px-4 py-3 text-right text-gray-400">
                  {opp.probability != null ? `${opp.probability}%` : '—'}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {opp.expectedCloseDate
                      ? new Date(opp.expectedCloseDate).toLocaleDateString('en-AU')
                      : '—'}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {opp.assignedContractor?.businessName ?? '—'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Main page
// ============================================================================

export default function CRMPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#050505' }}>
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8" style={{ backgroundColor: '#050505' }}>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">CRM Pipeline</h1>
          <p className="mt-1 text-sm text-gray-400">
            Contacts, opportunities, activities and sales pipeline
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contacts">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-400"
            >
              <Users className="mr-1.5 h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="pipeline"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-400"
            >
              <TrendingUp className="mr-1.5 h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-400"
            >
              <Activity className="mr-1.5 h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger
              value="opportunities"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-400"
            >
              <Briefcase className="mr-1.5 h-4 w-4" />
              Opportunities
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 rounded-sm border border-gray-800 p-4 sm:p-6" style={{ backgroundColor: '#0a0a0a' }}>
            <TabsContent value="contacts">
              <ContactsTab />
            </TabsContent>
            <TabsContent value="pipeline">
              <PipelineTab />
            </TabsContent>
            <TabsContent value="activities">
              <ActivitiesTab />
            </TabsContent>
            <TabsContent value="opportunities">
              <OpportunitiesTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
