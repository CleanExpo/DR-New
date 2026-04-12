// @ts-nocheck
/**
 * Admin Revenue Analytics Page — CONN-018
 *
 * Detailed revenue breakdown by service type and region.
 * Calls GET /api/admin/analytics/revenue with date range params.
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  DollarSign,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  BarChart2,
  Loader,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RevenueByType {
  australianServiceType: string;
  _sum: { finalCostAUD: number | null };
  _count: number;
}

interface RevenueByRegion {
  serviceState: string;
  _sum: { finalCostAUD: number | null };
  _count: number;
}

interface RevenueData {
  totalRevenue: number;
  platformFees: number;
  contractorPayouts: number;
  successRate: number;
  revenueByServiceType: RevenueByType[];
  revenueByRegion: RevenueByRegion[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(v);

const formatPct = (v: number) => `${(v * 100).toFixed(1)}%`;

const RANGES: { label: string; days: number }[] = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Last 12 months', days: 365 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminRevenueAnalyticsPage() {
  const [data, setData] = React.useState<RevenueData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [days, setDays] = React.useState(30);

  const load = React.useCallback(async (rangeDays: number) => {
    setLoading(true);
    setError(null);
    try {
      const end = new Date();
      const start = new Date(end.getTime() - rangeDays * 24 * 60 * 60 * 1000);
      const url = `/api/admin/analytics/revenue?startDate=${start.toISOString().slice(0, 10)}&endDate=${end.toISOString().slice(0, 10)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load revenue data');
      const json = await res.json();
      setData(json.data ?? json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load revenue data');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load(days);
  }, [days, load]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/dashboard/admin/analytics"
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition w-fit"
      >
        <ChevronLeft className="h-4 w-4" />
        Analytics
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-500" />
            Revenue Analytics
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Breakdown by service type and region
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
            <SelectTrigger className="w-40 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RANGES.map((r) => (
                <SelectItem key={r.days} value={String(r.days)}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => load(days)} disabled={loading}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* KPI cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.totalRevenue)}</p>
                <p className="text-xs text-gray-400 mt-1">incl. GST</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Platform Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(data.platformFees)}</p>
                <p className="text-xs text-gray-400 mt-1">20% margin</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Contractor Payouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(data.contractorPayouts)}</p>
                <p className="text-xs text-gray-400 mt-1">80% to contractors</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Payment Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900">{formatPct(data.successRate)}</p>
                <p className="text-xs text-gray-400 mt-1">of all attempts</p>
              </CardContent>
            </Card>
          </div>

          {/* By service type */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-gray-400" />
                Revenue by Service Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.revenueByServiceType?.length === 0 ? (
                <p className="text-sm text-gray-400">No data for this period</p>
              ) : (
                <div className="space-y-2">
                  {data.revenueByServiceType?.map((row) => {
                    const revenue = Number(row._sum?.finalCostAUD ?? 0);
                    const maxRevenue = Math.max(
                      ...data.revenueByServiceType.map((r) => Number(r._sum?.finalCostAUD ?? 0))
                    );
                    const pct = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0;
                    return (
                      <div key={row.australianServiceType} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-700 capitalize">
                            {row.australianServiceType?.replace(/_/g, ' ') ?? '—'}
                          </span>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-xs">
                              {row._count} jobs
                            </Badge>
                            <span className="font-semibold text-gray-900 w-24 text-right">
                              {formatCurrency(revenue)}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* By region */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                Revenue by State
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.revenueByRegion?.length === 0 ? (
                <p className="text-sm text-gray-400">No data for this period</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.revenueByRegion?.map((row) => (
                    <div
                      key={row.serviceState}
                      className="bg-gray-50 rounded-lg p-4 text-center"
                    >
                      <p className="text-xl font-bold text-gray-900">
                        {row.serviceState ?? '—'}
                      </p>
                      <p className="text-sm font-semibold text-emerald-600 mt-1">
                        {formatCurrency(Number(row._sum?.finalCostAUD ?? 0))}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{row._count} jobs</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}
