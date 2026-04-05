'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  DollarSign,
  FileText,
  Loader2,
  Send,
} from 'lucide-react';

interface InvoiceData {
  jobId: string;
  jobNumber: string;
  jobType: string;
  contractor: {
    name: string;
    abn: string | null;
  };
  property: string;
  hoursWorked: number | null;
  materialsUsed: string | null;
  completedDate: string | null;
  lineItems: Array<{
    description: string;
    amount: number;
  }>;
  subtotalAUD: number;
  gstAUD: number;
  totalAUD: number;
}

export default function InvoicePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/jobs/${jobId}/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setInvoice(data.data);
        setGenerated(true);
      } else {
        setError(data.error || 'Failed to generate invoice');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push(`/dashboard/jobs/${jobId}`)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colours mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Job
        </button>
        <h1 className="text-2xl font-bold">Invoice</h1>
        <p className="text-sm text-gray-400 mt-1">
          Generate and preview the invoice for this job
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-lg text-sm text-[#FF4444]">
            {error}
          </div>
        )}

        {!generated ? (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">Generate Invoice</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
              This will calculate line items from the completed job data including labour hours,
              materials, and 10% GST.
            </p>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 bg-[#a78bfa]/20 border border-[#a78bfa]/30 text-[#a78bfa] rounded-lg font-medium hover:bg-[#a78bfa]/30 disabled:opacity-50 transition-colours text-sm flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4" />
                  Generate Invoice
                </>
              )}
            </button>
          </div>
        ) : invoice ? (
          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">TAX INVOICE</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Job: <span className="font-mono text-[#00F5FF]">{invoice.jobNumber}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#00FF88]">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Generated</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <p className="text-gray-400 mb-1">Contractor</p>
                  <p className="text-white font-medium">{invoice.contractor.name}</p>
                  {invoice.contractor.abn && (
                    <p className="text-xs text-gray-400">ABN: {invoice.contractor.abn}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Property</p>
                  <p className="text-white text-sm">{invoice.property}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Service Type</p>
                  <p className="text-white">
                    {invoice.jobType.charAt(0).toUpperCase() + invoice.jobType.slice(1)} Restoration
                  </p>
                </div>
                {invoice.completedDate && (
                  <div>
                    <p className="text-gray-400 mb-1">Completed</p>
                    <p className="text-white">
                      {new Date(invoice.completedDate).toLocaleDateString('en-AU')}
                    </p>
                  </div>
                )}
              </div>

              {/* Line Items */}
              <div className="border-t border-white/10 pt-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-xs font-medium text-gray-400 uppercase">Description</th>
                      <th className="text-right py-2 text-xs font-medium text-gray-400 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.lineItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-white/5">
                        <td className="py-3 text-sm text-gray-300">{item.description}</td>
                        <td className="py-3 text-sm text-gray-300 text-right">
                          {item.amount > 0 ? `$${item.amount.toLocaleString('en-AU')}` : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal (ex. GST)</span>
                  <span className="text-white">${invoice.subtotalAUD.toLocaleString('en-AU')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GST (10%)</span>
                  <span className="text-gray-300">${invoice.gstAUD.toLocaleString('en-AU')}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-lg">
                  <span className="text-white">Total (inc. GST)</span>
                  <span className="text-[#00FF88]">${invoice.totalAUD.toLocaleString('en-AU')}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/dashboard/jobs/${jobId}`)}
                className="flex-1 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-lg font-medium hover:bg-white/10 transition-colours text-sm"
              >
                Back to Job
              </button>
              <button
                onClick={() => {
                  // In future: send invoice via email
                  alert('Invoice sending will be available in the next release.');
                }}
                className="flex-1 py-3 bg-[#0d9488] hover:bg-[#0d9488]/80 text-white rounded-lg font-medium transition-colours text-sm flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Invoice
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
