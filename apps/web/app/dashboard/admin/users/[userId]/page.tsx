'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';

type UserType = 'CLIENT' | 'ADMIN' | 'CONTRACTOR' | 'SUPER_ADMIN';

interface Booking {
  id: string;
  createdAt: string;
  status?: string;
}

interface Payment {
  id: string;
  createdAt: string;
  amount?: number;
}

interface LoginAttempt {
  id: string;
  attemptedAt: string;
  success?: boolean;
}

interface AdminUserDetail {
  id: string;
  email: string;
  name: string | null;
  userType: UserType;
  avatar: string | null;
  australianPhoneNumber: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  bookings: Booking[];
  payments: Payment[];
  loginAttempts: LoginAttempt[];
}

const ROLE_LABELS: Record<UserType, string> = {
  CLIENT: 'Client',
  ADMIN: 'Admin',
  CONTRACTOR: 'Contractor',
  SUPER_ADMIN: 'Super Admin',
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminUserDetailPage() {
  const { user: currentUser, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId as string;

  const [userData, setUserData] = useState<AdminUserDetail | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Editable state — mirrors fetched values until saved
  const [editRole, setEditRole] = useState<UserType>('CLIENT');
  const [editActive, setEditActive] = useState(true);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    } else if (!loading && currentUser && currentUser.userType !== 'ADMIN' && currentUser.userType !== 'SUPER_ADMIN') {
      router.push('/dashboard');
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    if (!userId || !currentUser) return;
    const fetchUser = async () => {
      setLoadingUser(true);
      try {
        const res = await fetch(`/api/admin/users/${userId}`);
        if (!res.ok) {
          if (res.status === 404) {
            toast.error('User not found');
            router.push('/dashboard/admin/users');
            return;
          }
          throw new Error('Failed to load user');
        }
        const json = await res.json();
        const u: AdminUserDetail = json.data;
        setUserData(u);
        setEditRole(u.userType);
        setEditActive(u.isActive);
      } catch {
        toast.error('Failed to load user');
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [userId, currentUser, router]);

  const hasChanges = userData
    ? editRole !== userData.userType || editActive !== userData.isActive
    : false;

  const handleSave = async () => {
    if (!userData || !hasChanges) return;

    // Require confirmation if deactivating
    if (editActive === false && userData.isActive === true) {
      setShowConfirm(true);
      return;
    }

    await persistChanges();
  };

  const persistChanges = async () => {
    if (!userData) return;
    setSaving(true);
    try {
      const payload: { userType?: UserType; isActive?: boolean } = {};
      if (editRole !== userData.userType) payload.userType = editRole;
      if (editActive !== userData.isActive) payload.isActive = editActive;

      const res = await fetch(`/api/admin/users/${userData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to save changes');
      }

      const json = await res.json();
      // Merge returned fields back into local state
      setUserData((prev) => prev ? { ...prev, ...json.data } : prev);
      toast.success('User updated successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save changes';
      toast.error(message);
    } finally {
      setSaving(false);
      setShowConfirm(false);
    }
  };

  if (loading || loadingUser) {
    return (
      <div className="space-y-6 p-6 md:p-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 lg:col-span-1" />
          <Skeleton className="h-64 lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (!userData) return null;

  const isSelf = currentUser?.id === userData.id;
  const canChangeRole = currentUser?.userType === 'SUPER_ADMIN' ||
    (editRole !== 'ADMIN' && editRole !== 'SUPER_ADMIN');

  return (
    <div className="space-y-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard/admin/users')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Users
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {userData.name ?? userData.email}
          </h1>
          <p className="text-gray-500 text-sm">{userData.id}</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="break-all">{userData.email}</span>
              {userData.isEmailVerified ? (
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
            </div>
            {userData.australianPhoneNumber && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{userData.australianPhoneNumber}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>Joined {formatDate(userData.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" />
              <span>Last login {formatDate(userData.lastLoginAt)}</span>
            </div>
            <div className="pt-2 border-t space-y-1">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Activity</p>
              <p className="text-sm text-gray-600">
                {userData.bookings.length} bookings &middot;{' '}
                {userData.payments.length} payments
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Admin Controls */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Admin Controls</CardTitle>
            <CardDescription>
              Changes take effect immediately. Role changes to Admin require Super Admin access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={editRole}
                onValueChange={(v) => setEditRole(v as UserType)}
                disabled={isSelf || !canChangeRole}
              >
                <SelectTrigger id="role" className="w-full sm:w-60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLIENT">Client</SelectItem>
                  <SelectItem value="CONTRACTOR">Contractor</SelectItem>
                  {currentUser?.userType === 'SUPER_ADMIN' && (
                    <>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              {isSelf && (
                <p className="text-xs text-gray-400">You cannot change your own role.</p>
              )}
              {editRole !== userData.userType && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {ROLE_LABELS[userData.userType]}
                  </Badge>
                  <span className="text-xs text-gray-400">→</span>
                  <Badge className="text-xs">{ROLE_LABELS[editRole]}</Badge>
                </div>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-sm">Account Active</p>
                <p className="text-xs text-gray-500">
                  {editActive
                    ? 'User can log in and access the platform.'
                    : 'User is suspended and cannot log in.'}
                </p>
              </div>
              <Switch
                checked={editActive}
                onCheckedChange={setEditActive}
                disabled={isSelf}
              />
            </div>

            {isSelf && (
              <p className="text-xs text-amber-600">
                You cannot deactivate your own account.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Login Attempts */}
        {userData.loginAttempts.length > 0 && (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Recent Login Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-gray-100">
                {userData.loginAttempts.map((attempt) => (
                  <li key={attempt.id} className="py-2 flex items-center gap-3 text-sm">
                    {attempt.success !== false ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    )}
                    <span className="text-gray-500">{formatDate(attempt.attemptedAt)}</span>
                    <span className="text-gray-400 text-xs">
                      {attempt.success !== false ? 'Successful' : 'Failed'}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Deactivate Confirm */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate this user?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{userData.name ?? userData.email}</strong> will be suspended and
              notified by email. You can reactivate them at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditActive(true)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={persistChanges}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
