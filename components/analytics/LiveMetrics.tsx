/**
 * Live Metrics Component
 * Real-time KPI cards with live updates
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRealtime } from '@/lib/hooks/useRealtime';
import { RealtimeEventType } from '@/lib/realtime/event-emitter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Activity,
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  formatter?: (value: number) => string;
  color?: string;
}

function MetricCard({
  title,
  value,
  icon,
  trend,
  formatter = (v) => v.toString(),
  color = 'text-blue-600',
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      setDisplayValue(value);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [value, displayValue]);

  return (
    <Card className={isAnimating ? 'ring-2 ring-blue-500 transition-all' : ''}>
      <CardHeader className="flex flex-row items-centre justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={color}>{icon}</div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={displayValue}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold"
          >
            {formatter(displayValue)}
          </motion.div>
        </AnimatePresence>
        {trend !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend > 0 ? (
              <span className="text-green-600">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +{trend}% from last period
              </span>
            ) : trend < 0 ? (
              <span className="text-red-600">
                <TrendingUp className="h-3 w-3 inline mr-1 rotate-180" />
                {trend}% from last period
              </span>
            ) : (
              <span className="text-gray-600">No change from last period</span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface LiveMetricsProps {
  initialMetrics?: {
    jobsToday: number;
    activeContractors: number;
    pendingInvoices: number;
    avgResponseTime: number;
  };
}

export function LiveMetrics({ initialMetrics }: LiveMetricsProps) {
  const [metrics, setMetrics] = useState({
    jobsToday: initialMetrics?.jobsToday || 0,
    activeContractors: initialMetrics?.activeContractors || 0,
    pendingInvoices: initialMetrics?.pendingInvoices || 0,
    avgResponseTime: initialMetrics?.avgResponseTime || 0,
    totalRevenue: 0,
  });

  // Subscribe to real-time events
  const { events, status } = useRealtime({
    eventTypes: [
      RealtimeEventType.JOB_CREATED,
      RealtimeEventType.JOB_STATUS_CHANGED,
      RealtimeEventType.CONTRACTOR_ASSIGNED,
      RealtimeEventType.PAYMENT_RECEIVED,
    ],
  });

  // Update metrics based on events
  useEffect(() => {
    events.forEach((event) => {
      switch (event.type) {
        case RealtimeEventType.JOB_CREATED:
          setMetrics((prev) => ({
            ...prev,
            jobsToday: prev.jobsToday + 1,
          }));
          break;

        case RealtimeEventType.CONTRACTOR_ASSIGNED:
          setMetrics((prev) => ({
            ...prev,
            activeContractors: prev.activeContractors + 1,
          }));
          break;

        case RealtimeEventType.PAYMENT_RECEIVED:
          setMetrics((prev) => ({
            ...prev,
            pendingInvoices: Math.max(0, prev.pendingInvoices - 1),
            totalRevenue: prev.totalRevenue + event.payload.amount,
          }));
          break;

        default:
          break;
      }
    });
  }, [events]);

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-centre justify-between">
        <h2 className="text-2xl font-bold">Live Metrics</h2>
        {status.connected ? (
          <div className="flex items-centre gap-2 text-sm text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
            Real-time updates active
          </div>
        ) : (
          <div className="flex items-centre gap-2 text-sm text-gray-500">
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            Offline
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Jobs Today"
          value={metrics.jobsToday}
          icon={<Briefcase className="h-4 w-4" />}
          color="text-blue-600"
        />

        <MetricCard
          title="Active Contractors"
          value={metrics.activeContractors}
          icon={<Users className="h-4 w-4" />}
          color="text-green-600"
        />

        <MetricCard
          title="Pending Invoices"
          value={metrics.pendingInvoices}
          icon={<DollarSign className="h-4 w-4" />}
          color="text-yellow-600"
        />

        <MetricCard
          title="Avg Response Time"
          value={metrics.avgResponseTime}
          icon={<Clock className="h-4 w-4" />}
          formatter={(v) => `${v} min`}
          color="text-purple-600"
        />
      </div>

      {/* Revenue Card (Full Width) */}
      {metrics.totalRevenue > 0 && (
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-centre justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue (Today)
            </CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={metrics.totalRevenue}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold"
              >
                ${metrics.totalRevenue.toLocaleString('en-AU', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
