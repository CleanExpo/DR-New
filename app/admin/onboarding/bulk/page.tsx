'use client';

import { useState, useEffect } from 'react';
import { ContractorApplication } from '@/lib/types/contractor-onboarding';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle2,
  Mail,
  Download,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/lib/hooks/use-toast';

export default function BulkActionsPage() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<ContractorApplication[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/onboarding?status=PENDING,UNDER_REVIEW');
      if (!response.ok) throw new Error('Failed to fetch applications');

      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === applications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(applications.map((app) => app.id)));
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkApprove = async () => {
    if (selectedIds.size === 0) return;

    if (
      !confirm(
        `Are you sure you want to approve ${selectedIds.size} contractor(s)? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setProcessing(true);
      const response = await fetch('/api/admin/onboarding/bulk/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorIds: Array.from(selectedIds) }),
      });

      if (!response.ok) throw new Error('Failed to approve contractors');

      const data = await response.json();

      toast({
        title: 'Success',
        description: `${data.approved} contractor(s) approved successfully`,
      });

      setSelectedIds(new Set());
      fetchApplications();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve contractors',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleSendReminders = async () => {
    if (selectedIds.size === 0) return;

    try {
      setProcessing(true);
      const response = await fetch('/api/admin/onboarding/bulk/remind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorIds: Array.from(selectedIds) }),
      });

      if (!response.ok) throw new Error('Failed to send reminders');

      const data = await response.json();

      toast({
        title: 'Success',
        description: `Reminder emails sent to ${data.sent} contractor(s)`,
      });

      setSelectedIds(new Set());
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reminders',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleExport = async () => {
    if (selectedIds.size === 0) return;

    try {
      setProcessing(true);
      const response = await fetch('/api/admin/onboarding/bulk/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorIds: Array.from(selectedIds) }),
      });

      if (!response.ok) throw new Error('Failed to export data');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contractor-applications-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: 'Success',
        description: 'Applications exported successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export applications',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Bulk Actions</h2>
            <p className="text-sm text-gray-600 mt-1">
              Select multiple applications to perform bulk actions
            </p>
          </div>

          <Badge variant="secondary" className="text-base px-4 py-2">
            {selectedIds.size} Selected
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="default"
            onClick={handleBulkApprove}
            disabled={selectedIds.size === 0 || processing}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approve Selected ({selectedIds.size})
          </Button>

          <Button
            variant="outline"
            onClick={handleSendReminders}
            disabled={selectedIds.size === 0 || processing}
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Reminders
          </Button>

          <Button
            variant="outline"
            onClick={handleExport}
            disabled={selectedIds.size === 0 || processing}
          >
            <Download className="w-4 h-4 mr-2" />
            Export to CSV
          </Button>
        </div>
      </Card>

      {/* Applications Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Checkbox
                    checked={selectedIds.size === applications.length && applications.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Insurance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No pending applications</p>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className={`hover:bg-gray-50 ${
                      selectedIds.has(app.id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={selectedIds.has(app.id)}
                        onCheckedChange={() => handleSelectOne(app.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {app.companyProfile?.companyName || app.username}
                      </div>
                      <div className="text-sm text-gray-500">
                        ABN: {app.companyProfile?.abn || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{app.email}</div>
                      <div className="text-sm text-gray-500">{app.mobileNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          app.status === 'PENDING' ? 'secondary' : 'default'
                        }
                      >
                        {app.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {format(new Date(app.createdAt), 'dd MMM yyyy')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(app.createdAt), 'HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">
                          {app.certifications.filter((c) => c.verified).length}/
                          {app.certifications.length}
                        </span>
                        {app.certifications.every((c) => c.verified) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">
                          {app.insurance.filter((i) => i.verified).length}/
                          {app.insurance.length}
                        </span>
                        {app.insurance.every((i) => i.verified) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info Alert */}
      {selectedIds.size > 0 && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                {selectedIds.size} application(s) selected
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Bulk approve will only process applications where all qualifications
                and insurance have been verified.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
