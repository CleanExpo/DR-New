/**
 * Unite-Group Health Check — DR-259 (Step 9)
 *
 * GET /api/unite-group/health
 *
 * Pings Unite-Group API and returns connection status + latency.
 * Available to ADMIN / SUPER_ADMIN.
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { healthCheck } from '@/lib/unite-group';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; userType?: string };
  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised — admin required' }, { status: 401 });
  }

  const configured = !!process.env.UNITE_GROUP_API_KEY;

  if (!configured) {
    return NextResponse.json(
      {
        status: 'unconfigured',
        message: 'UNITE_GROUP_API_KEY is not set — add to Vercel env vars to enable integration',
        latencyMs: 0,
      },
      { status: 200 },
    );
  }

  const result = await healthCheck();

  return NextResponse.json(result, {
    status: result.status === 'down' ? 502 : 200,
  });
}
