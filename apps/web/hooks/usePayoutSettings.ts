'use client';

import { useState, useCallback, useEffect } from 'react';

export type PayoutSchedule = 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY';

export interface PayoutSettings {
  contractorName: string;
  stripeConnectStatus: 'CONNECTED' | 'NOT_CONNECTED';
  stripeConnectAccountId: string | null;
  bankAccountLinked: boolean;
  totalEarnings: number;
  totalPaidOut: number;
  pendingPayout: number;
  payoutSchedule: PayoutSchedule;
}

export interface RecentPayout {
  id: string;
  amount: number;
  date: string | null;
}

export interface PayoutSettingsData {
  settings: PayoutSettings;
  stripeConnectSetupUrl: string | null;
  recentPayouts: RecentPayout[];
  nextPayoutDate: string;
}

export interface UsePayoutSettingsReturn {
  data: PayoutSettingsData | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updatePayoutSchedule: (schedule: PayoutSchedule) => Promise<{ success: boolean; error?: string }>;
}

export function usePayoutSettings(): UsePayoutSettingsReturn {
  const [data, setData] = useState<PayoutSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contractor/payout-settings', { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Failed to load payout settings');
        return;
      }
      setData({
        settings: json.settings,
        stripeConnectSetupUrl: json.stripeConnectSetupUrl,
        recentPayouts: json.recentPayouts,
        nextPayoutDate: json.nextPayoutDate,
      });
    } catch {
      setError('Failed to load payout settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updatePayoutSchedule = useCallback(
    async (schedule: PayoutSchedule): Promise<{ success: boolean; error?: string }> => {
      setSaving(true);
      try {
        const res = await fetch('/api/contractor/payout-settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payoutSchedule: schedule }),
        });
        const json = await res.json();
        if (!res.ok) {
          return { success: false, error: json.error ?? 'Failed to save settings' };
        }
        // Optimistically update local state
        setData((prev) =>
          prev
            ? {
                ...prev,
                settings: {
                  ...prev.settings,
                  payoutSchedule: json.settings?.payoutSchedule ?? schedule,
                },
              }
            : prev
        );
        return { success: true };
      } catch {
        return { success: false, error: 'Failed to save settings' };
      } finally {
        setSaving(false);
      }
    },
    []
  );

  return { data, loading, saving, error, refetch: fetchSettings, updatePayoutSchedule };
}
