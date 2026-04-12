'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Globe,
  Building,
  Settings,
  Loader2,
  CreditCard,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';

// ---------------------------------------------------------------------------
// Tenant Billing Types
// ---------------------------------------------------------------------------

interface BillingStatus {
  tenant: {
    id: string;
    name: string;
    tier: string;
    status: string;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    trialEndsAt: string | null;
  };
  usage: {
    users: { current: number; limit: number; percentage: number };
    requests: { current: number; limit: number; percentage: number };
  };
  stripe: {
    id: string;
    cancelAtPeriodEnd: boolean;
    canceledAt: string | null;
  } | null;
}

type BillingTier = 'BASIC' | 'PRO' | 'ENTERPRISE';

const TIER_LABELS: Record<string, string> = {
  BASIC: 'Basic',
  PRO: 'Pro',
  ENTERPRISE: 'Enterprise',
  TRIAL: 'Trial',
};

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  ACTIVE: 'default',
  TRIAL: 'secondary',
  PAST_DUE: 'destructive',
  CANCELED: 'outline',
  INACTIVE: 'outline',
};

function formatBillingDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// TenantBillingPanel — fetches current tenant billing status
// ---------------------------------------------------------------------------

function TenantBillingPanel() {
  const [billingStatus, setBillingStatus] = useState<BillingStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [checkoutTier, setCheckoutTier] = useState<BillingTier>('BASIC');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/admin/tenant-billing/status');
      if (!res.ok) throw new Error('Failed to load billing status');
      const json: BillingStatus = await res.json();
      setBillingStatus(json);
    } catch {
      toast.error('Failed to load billing status');
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleSetupBilling = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/admin/tenant-billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: checkoutTier }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? 'Checkout failed');
      if (json.url) {
        window.location.href = json.url;
      } else {
        toast.error('No Stripe URL returned');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Checkout failed';
      toast.error(message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleBillingPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/admin/tenant-billing/portal');
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? 'Portal unavailable');
      if (json.url) {
        window.open(json.url, '_blank', 'noopener,noreferrer');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Portal unavailable';
      toast.error(message);
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <Card className="border-indigo-100 bg-indigo-50/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-indigo-600" />
            <CardTitle className="text-base">Tenant Subscription</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchStatus}
            disabled={loadingStatus}
            title="Refresh billing status"
          >
            <RefreshCw className={`h-4 w-4 ${loadingStatus ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <CardDescription>
          Manage your tenant&apos;s Stripe subscription and billing portal access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingStatus ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-9 w-36" />
          </div>
        ) : billingStatus ? (
          <div className="space-y-4">
            {/* Status row */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={STATUS_VARIANT[billingStatus.tenant.status] ?? 'outline'}>
                {billingStatus.tenant.status}
              </Badge>
              <span className="text-sm text-gray-600">
                Plan:{' '}
                <strong>{TIER_LABELS[billingStatus.tenant.tier] ?? billingStatus.tenant.tier}</strong>
              </span>
              {billingStatus.tenant.currentPeriodEnd && (
                <span className="text-sm text-gray-500">
                  Renews {formatBillingDate(billingStatus.tenant.currentPeriodEnd)}
                </span>
              )}
              {billingStatus.tenant.trialEndsAt && (
                <span className="text-sm text-amber-600">
                  Trial ends {formatBillingDate(billingStatus.tenant.trialEndsAt)}
                </span>
              )}
              {billingStatus.stripe?.cancelAtPeriodEnd && (
                <Badge variant="outline" className="border-orange-400 text-orange-600">
                  Cancels at period end
                </Badge>
              )}
            </div>

            {/* Usage */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Users</p>
                <p className="font-medium">
                  {billingStatus.usage.users.current} / {billingStatus.usage.users.limit || '∞'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Monthly Requests</p>
                <p className="font-medium">
                  {billingStatus.usage.requests.current} / {billingStatus.usage.requests.limit || '∞'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              {/* Show portal if subscription exists, else show setup */}
              {billingStatus.stripe ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBillingPortal}
                  disabled={portalLoading}
                >
                  {portalLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ExternalLink className="mr-2 h-4 w-4" />
                  )}
                  Billing Portal
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Select
                    value={checkoutTier}
                    onValueChange={(v) => setCheckoutTier(v as BillingTier)}
                  >
                    <SelectTrigger className="w-36 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BASIC">Basic</SelectItem>
                      <SelectItem value="PRO">Pro</SelectItem>
                      <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    onClick={handleSetupBilling}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CreditCard className="mr-2 h-4 w-4" />
                    )}
                    Setup Billing
                  </Button>
                </div>
              )}
              {/* Always show portal button if they have a customer (even if stripe sub details missing) */}
              {billingStatus.stripe && (
                <Button
                  size="sm"
                  onClick={handleSetupBilling}
                  disabled={checkoutLoading}
                  variant="secondary"
                >
                  {checkoutLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Change Plan
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Billing information unavailable.</p>
        )}
      </CardContent>
    </Card>
  );
}

interface Tenant {
  id: string;
  name: string;
  domain?: string;
  subdomain?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  industry?: string;
  isActive: boolean;
  createdAt: string;
  userCount: number;
  requestCount: number;
}

export default function TenantsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loadingTenants, setLoadingTenants] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: '',
    domain: '',
    subdomain: '',
    logo: '',
    primaryColor: '#00BFA6',
    secondaryColor: '#7C4DFF',
    industry: 'restoration',
    customCss: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType !== 'ADMIN') {
      router.push('/dashboard');
    } else if (user && user.userType === 'ADMIN') {
      fetchTenants();
    }
  }, [user, loading, router]);

  const fetchTenants = async () => {
    try {
      setLoadingTenants(true);
      // Mock data for now - replace with actual API call
      const mockTenants: Tenant[] = [
        {
          id: '1',
          name: 'Restoration Pro',
          domain: 'restorationpro.com',
          subdomain: 'restorationpro',
          logo: '/placeholder-logo.png',
          primaryColor: '#00BFA6',
          secondaryColor: '#7C4DFF',
          industry: 'restoration',
          isActive: true,
          createdAt: '2024-01-15',
          userCount: 150,
          requestCount: 89
        },
        {
          id: '2',
          name: 'HealthConnect',
          domain: 'healthconnect.com.au',
          subdomain: 'healthconnect',
          logo: '/placeholder-logo.png',
          primaryColor: '#EF4444',
          secondaryColor: '#F59E0B',
          industry: 'healthcare',
          isActive: true,
          createdAt: '2024-02-01',
          userCount: 75,
          requestCount: 45
        },
        {
          id: '3',
          name: 'LegalMatch',
          domain: 'legalmatch.com.au',
          subdomain: 'legalmatch',
          logo: '/placeholder-logo.png',
          primaryColor: '#3B82F6',
          secondaryColor: '#1E40AF',
          industry: 'legal',
          isActive: false,
          createdAt: '2024-01-20',
          userCount: 25,
          requestCount: 12
        }
      ];
      setTenants(mockTenants);
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    } finally {
      setLoadingTenants(false);
    }
  };

  const handleCreateTenant = async () => {
    try {
      setCreateLoading(true);
      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTenant),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewTenant({
          name: '',
          domain: '',
          subdomain: '',
          logo: '',
          primaryColor: '#00BFA6',
          secondaryColor: '#7C4DFF',
          industry: 'restoration',
          customCss: ''
        });
        fetchTenants();
      }
    } catch (error) {
      console.error('Failed to create tenant:', error);
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.subdomain?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || tenant.industry === industryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && tenant.isActive) ||
                         (statusFilter === 'inactive' && !tenant.isActive);
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-400">Manage white-label platform instances</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Tenant</DialogTitle>
              <DialogDescription>
                Set up a new white-label platform instance for a client.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tenant Name</Label>
                  <Input
                    id="name"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Client company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={newTenant.industry}
                    onValueChange={(value) => setNewTenant(prev => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restoration">Restoration</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={newTenant.domain}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, domain: e.target.value }))}
                    placeholder="client.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomain</Label>
                  <Input
                    id="subdomain"
                    value={newTenant.subdomain}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, subdomain: e.target.value }))}
                    placeholder="client"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={newTenant.logo}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={newTenant.primaryColor}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, primaryColor: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={newTenant.secondaryColor}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCss">Custom CSS</Label>
                <Textarea
                  id="customCss"
                  value={newTenant.customCss}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, customCss: e.target.value }))}
                  placeholder="Custom CSS styles..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTenant} disabled={createLoading}>
                  {createLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Tenant'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Billing Panel */}
      <TenantBillingPanel />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="restoration">Restoration</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tenants Grid */}
      {loadingTenants ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {tenant.logo && (
                      <Image src={tenant.logo} alt={tenant.name} width={32} height={32} className="rounded" unoptimized={tenant.logo?.startsWith('http')} />
                    )}
                    <div>
                      <CardTitle className="text-lg">{tenant.name}</CardTitle>
                      <CardDescription>
                        {tenant.domain || `${tenant.subdomain}.platform.com`}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={tenant.isActive ? 'default' : 'secondary'}>
                    {tenant.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Industry:</span>
                    <Badge variant="outline" className="capitalize">
                      {tenant.industry}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Users:</span>
                      <span className="ml-2 font-medium">{tenant.userCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Requests:</span>
                      <span className="ml-2 font-medium">{tenant.requestCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Created:</span>
                    <span>{new Date(tenant.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTenants.length === 0 && !loadingTenants && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tenants found</h3>
          <p className="mt-1 text-sm text-gray-400">
            {searchTerm || industryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first tenant.'}
          </p>
        </div>
      )}
    </div>
  );
}
