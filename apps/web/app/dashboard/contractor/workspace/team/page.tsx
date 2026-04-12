// @ts-nocheck
'use client';

/**
 * CONN-029: Workspace Team Management
 *
 * POST /api/workspace/invite - invite a team member
 * GET  /api/workspace/usage  - list current members + seats
 *
 * Available roles: MANAGER | TECHNICIAN | ADMIN_STAFF
 */

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  CheckCircle,
  Loader2,
  Mail,
  Plus,
  Shield,
  UserCheck,
  Users,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

// ─── Types ────────────────────────────────────────────────────────────────────

type MemberRole = 'MANAGER' | 'TECHNICIAN' | 'ADMIN_STAFF' | 'OWNER';

interface WorkspaceMember {
  id: string;
  userId: string;
  role: MemberRole;
  user?: {
    name?: string | null;
    email: string;
  };
  createdAt?: string;
}

interface WorkspaceUsage {
  workspace: {
    id: string;
    businessName: string;
    tier: string;
    status: string;
  };
  usage: {
    seats: {
      current: number;
      limit: number | string;
      remaining: number | string;
      usagePercent: number;
    };
  };
}

const ROLE_LABELS: Record<MemberRole, string> = {
  OWNER:       'Owner',
  MANAGER:     'Manager',
  TECHNICIAN:  'Technician',
  ADMIN_STAFF: 'Admin Staff',
};

const ROLE_BADGE_VARIANT: Record<MemberRole, 'default' | 'secondary' | 'outline'> = {
  OWNER:       'default',
  MANAGER:     'secondary',
  TECHNICIAN:  'outline',
  ADMIN_STAFF: 'outline',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkspaceTeamPage() {
  const [usage, setUsage] = useState<WorkspaceUsage | null>(null);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'MANAGER' | 'TECHNICIAN' | 'ADMIN_STAFF'>('TECHNICIAN');
  const [inviting, setInviting] = useState(false);

  // Pending invitations (held client-side after successful invite in this session)
  const [pendingInvites, setPendingInvites] = useState<{ email: string; role: string; token: string }[]>([]);

  // ── Fetch usage + members ────────────────────────────────────────────────────

  const fetchUsage = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/workspace/usage', { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Could not load workspace data');
        return;
      }

      setUsage(data);
      // The usage endpoint includes members array via workspace.members
      // We map them here if available
      if (data._members) {
        setMembers(data._members);
      }
    } catch {
      setError('Failed to load workspace');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsage();
  }, []);

  // ── Send invite ──────────────────────────────────────────────────────────────

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteEmail.trim()) {
      toast.error('Email address is required');
      return;
    }

    if (!usage?.workspace?.id) {
      toast.error('Workspace not found — please refresh');
      return;
    }

    setInviting(true);
    try {
      const res = await fetch('/api/workspace/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: usage.workspace.id,
          email: inviteEmail.trim().toLowerCase(),
          role: inviteRole,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to send invite');
        return;
      }

      toast.success(`Invitation sent to ${inviteEmail}`);
      setPendingInvites((prev) => [
        ...prev,
        { email: inviteEmail.trim().toLowerCase(), role: inviteRole, token: data.inviteToken || '' },
      ]);
      setInviteEmail('');
      setInviteRole('TECHNICIAN');
    } finally {
      setInviting(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-56 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh] gap-3">
        <XCircle className="size-10 text-destructive" />
        <p className="text-destructive font-medium">{error}</p>
        <Button variant="outline" onClick={fetchUsage}>Try Again</Button>
      </div>
    );
  }

  const seatLimit = usage?.usage?.seats?.limit;
  const seatCurrent = usage?.usage?.seats?.current ?? 0;
  const isUnlimited = seatLimit === 'Unlimited' || seatLimit === 999;
  const atLimit = !isUnlimited && typeof seatLimit === 'number' && seatCurrent >= seatLimit;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="size-6 text-primary" />
          Team Management
        </h1>
        {usage?.workspace?.businessName && (
          <p className="text-sm text-muted-foreground mt-1">
            {usage.workspace.businessName} — {usage.workspace.tier} plan
          </p>
        )}
      </div>

      {/* ── Seat usage summary ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            Seat Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Team members</span>
            <span className="font-semibold">
              {seatCurrent} / {isUnlimited ? 'Unlimited' : seatLimit}
            </span>
          </div>
          {!isUnlimited && typeof seatLimit === 'number' && (
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min((seatCurrent / seatLimit) * 100, 100)}%` }}
              />
            </div>
          )}
          {atLimit && (
            <p className="text-xs text-destructive mt-2 flex items-center gap-1">
              <XCircle className="size-3" />
              Seat limit reached.{' '}
              <a href="/dashboard/contractor/subscription" className="underline">
                Upgrade your plan
              </a>{' '}
              to add more members.
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Current team members ───────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserCheck className="size-4 text-primary" />
            Current Members
          </CardTitle>
          <CardDescription>People with access to this workspace</CardDescription>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No additional members yet — invite your first team member below.
            </p>
          ) : (
            <div className="divide-y">
              {members.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold uppercase">
                      {(m.user?.name || m.user?.email || '?').charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{m.user?.name || '—'}</p>
                      <p className="text-xs text-muted-foreground">{m.user?.email}</p>
                    </div>
                  </div>
                  <Badge variant={ROLE_BADGE_VARIANT[m.role] ?? 'outline'}>
                    {ROLE_LABELS[m.role] ?? m.role}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Invite form ────────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="size-4 text-primary" />
            Invite Team Member
          </CardTitle>
          <CardDescription>
            Send an invitation email to add someone to your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="invite-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="technician@example.com"
                  className="pl-9"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  disabled={atLimit}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="invite-role">Role</Label>
              <Select
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as typeof inviteRole)}
                disabled={atLimit}
              >
                <SelectTrigger id="invite-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MANAGER">Manager — can invite, manage jobs</SelectItem>
                  <SelectItem value="TECHNICIAN">Technician — field work access</SelectItem>
                  <SelectItem value="ADMIN_STAFF">Admin Staff — office/admin access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={inviting || atLimit}>
              {inviting ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Mail className="size-4 mr-2" />
              )}
              Send Invitation
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ── Pending invitations ────────────────────────────────────────────────── */}
      {pendingInvites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Invitations</CardTitle>
            <CardDescription>Sent during this session — awaiting acceptance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {pendingInvites.map((inv, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="size-4 text-green-500 shrink-0" />
                    <span>{inv.email}</span>
                  </div>
                  <Badge variant="outline">{ROLE_LABELS[inv.role as MemberRole] ?? inv.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
