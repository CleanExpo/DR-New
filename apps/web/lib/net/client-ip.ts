import type { NextRequest } from 'next/server';

/**
 * Extract the client IP from a request, honouring the trusted proxy chain.
 *
 * Takes the first entry of `x-forwarded-for` (the original client) and strips
 * whitespace, falling back to `x-real-ip`, then `'unknown'`. Centralised here so
 * server-authoritative records (e.g. ICA acceptance, DR-886) extract IP the same
 * way everywhere.
 */
export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}
