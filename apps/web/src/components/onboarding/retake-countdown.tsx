'use client';

import { useEffect, useState } from 'react';

const TICK_MS = 30_000;

function formatRemaining(msRemaining: number): string {
  if (msRemaining <= 0) return 'now';
  const totalMinutes = Math.ceil(msRemaining / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

/**
 * Live countdown to a DR-894 retake cooldown expiry (DR-919).
 * Renders "23h 40m" (updating every 30s), or "now" once the cooldown has
 * elapsed. Accepts the ISO string the API returns (`cooldownUntil`/`retryAt`).
 */
export function RetakeCountdown({ until }: { until: string | Date }) {
  const target = typeof until === 'string' ? new Date(until) : until;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(timer);
  }, []);

  return <span>{formatRemaining(target.getTime() - now)}</span>;
}
