/**
 * Unite-Group Unified Dashboard Summary — DR-259 (Step 8)
 *
 * GET /api/unite-group/summary
 *
 * Aggregates CRM, messages, revenue, and social metrics from Unite-Group.
 * ADMIN / SUPER_ADMIN only.
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSummary, UniteGroupError } from '@/lib/unite-group';

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

  try {
    const summary = await getSummary();
    return NextResponse.json(summary);
  } catch (err) {
    if (err instanceof UniteGroupError) {
      return NextResponse.json(
        { error: err.message, statusCode: err.statusCode },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: 'Failed to fetch Unite-Group summary' }, { status: 500 });
  }
}
