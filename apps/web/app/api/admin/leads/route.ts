/**
 * Admin API - Lead inbox
 *
 * GET   /api/admin/leads        list recent inbound leads (contact enquiries +
 *                               damage lead-captures), newest first
 * PATCH /api/admin/leads        update a lead's status / assignee
 *
 * Admin-only. Surfaces PII, so it must stay behind the ADMIN/SUPER_ADMIN gate.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: 'Unauthorized', status: 401 as const };
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || (user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN')) {
    return { error: 'Forbidden', status: 403 as const };
  }
  return { user };
}

export type LeadKind = 'contact' | 'lead_capture';

export async function GET() {
  const auth = await requireAdmin();
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const [contacts, leads] = await Promise.all([
    prisma.contactEnquiry.findMany({ orderBy: { submittedAt: 'desc' }, take: 100 }),
    prisma.leadCapture.findMany({ orderBy: { submittedAt: 'desc' }, take: 100 }),
  ]);

  const items = [
    ...contacts.map((c) => ({
      kind: 'contact' as LeadKind,
      id: c.id,
      name: `${c.firstName} ${c.lastName}`.trim(),
      email: c.email,
      phone: c.phone,
      category: c.subject,
      status: c.status,
      assignedTo: c.assignedTo,
      submittedAt: c.submittedAt,
    })),
    ...leads.map((l) => ({
      kind: 'lead_capture' as LeadKind,
      id: l.id,
      name: `${l.firstName} ${l.lastName}`.trim(),
      email: l.email,
      phone: l.phone,
      category: l.damageType,
      status: l.status,
      assignedTo: l.assignedTo,
      submittedAt: l.submittedAt,
    })),
  ].sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());

  return NextResponse.json({ items, count: items.length });
}

const patchSchema = z.object({
  kind: z.enum(['contact', 'lead_capture']),
  id: z.string().min(1),
  status: z.string().min(1).max(40).optional(),
  assignedTo: z.string().max(200).nullable().optional(),
});

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.errors },
      { status: 400 },
    );
  }

  const { kind, id, status, assignedTo } = parsed.data;
  const data: { status?: string; assignedTo?: string | null } = {};
  if (status !== undefined) data.status = status;
  if (assignedTo !== undefined) data.assignedTo = assignedTo;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  try {
    if (kind === 'contact') {
      await prisma.contactEnquiry.update({ where: { id }, data });
    } else {
      await prisma.leadCapture.update({ where: { id }, data });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[admin/leads] update failed:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
