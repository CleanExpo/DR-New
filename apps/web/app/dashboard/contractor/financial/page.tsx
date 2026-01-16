/**
 * NRPG Growth Portal - Financial Insights Page
 *
 * Financial overview with earnings, invoices, and payment tracking.
 */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  FileText,
  Download,
  Calendar,
  BarChart3,
} from 'lucide-react';

interface Transaction {
  id: string;
  projectName: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'processing';
  date: string;
  invoiceId: string;
}

const statusConfig = {
  paid: {
    color: 'text-portal-success',
    bg: 'bg-portal-success/10',
    label: 'Paid',
  },
  pending: {
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    label: 'Pending',
  },
  processing: {
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    label: 'Processing',
  },
};

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    projectName: 'Commercial Water Extraction - Sydney CBD',
    client: 'ABC Properties Pty Ltd',
    amount: 48500,
    status: 'paid',
    date: '2024-12-01',
    invoiceId: 'INV-2024-0156',
  },
  {
    id: '2',
    projectName: 'Residential Mould Remediation - Parramatta',
    client: 'John Smith',
    amount: 15200,
    status: 'paid',
    date: '2024-11-28',
    invoiceId: 'INV-2024-0155',
  },
  {
    id: '3',
    projectName: 'Storm Damage Repair - Wollongong',
    client: 'Coastal Homes Group',
    amount: 22800,
    status: 'processing',
    date: '2024-12-05',
    invoiceId: 'INV-2024-0157',
  },
  {
    id: '4',
    projectName: 'Fire Restoration Assessment - Newcastle',
    client: 'Industrial Park Management',
    amount: 95000,
    status: 'pending',
    date: '2024-12-08',
    invoiceId: 'INV-2024-0158',
  },
  {
    id: '5',
    projectName: 'Emergency Water Damage - Alexandria',
    client: 'Tech Solutions Ltd',
    amount: 62500,
    status: 'paid',
    date: '2024-11-15',
    invoiceId: 'INV-2024-0154',
  },
];

export default function FinancialPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const totalEarnings = transactions
    .filter((t) => t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions
    .filter((t) => t.status === 'pending' || t.status === 'processing')
    .reduce((sum, t) => sum + t.amount, 0);
  const avgProjectValue = totalEarnings / transactions.filter((t) => t.status === 'paid').length || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nrpg-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-portal-text font-heading flex items-center gap-3">
            <BarChart3 className="size-8 text-nrpg-teal" />
            Financial Insights
          </h1>
          <p className="text-portal-muted font-body mt-1">
            Track earnings, invoices, and payment status
          </p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={cn(
                'px-3 py-1.5 text-xs font-bold font-heading rounded-lg transition-colors capitalize',
                selectedPeriod === period
                  ? 'bg-earth-primary text-white'
                  : 'bg-portal-card border border-portal-border text-portal-muted hover:text-portal-text'
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Earnings */}
        <div className="bg-portal-card rounded-xl border border-portal-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 bg-portal-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="size-5 text-portal-success" />
            </div>
            <div className="flex items-center gap-1 text-portal-success text-sm font-bold">
              <TrendingUp className="size-4" />
              +12%
            </div>
          </div>
          <p className="text-3xl font-bold text-portal-text font-heading">
            ${totalEarnings.toLocaleString()}
          </p>
          <p className="text-portal-muted text-sm font-body mt-1">Total Earnings</p>
        </div>

        {/* Pending Amount */}
        <div className="bg-portal-card rounded-xl border border-portal-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Clock className="size-5 text-amber-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-portal-text font-heading">
            ${pendingAmount.toLocaleString()}
          </p>
          <p className="text-portal-muted text-sm font-body mt-1">Pending Payments</p>
        </div>

        {/* Average Project Value */}
        <div className="bg-portal-card rounded-xl border border-portal-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 bg-earth-secondary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="size-5 text-earth-secondary" />
            </div>
            <div className="flex items-center gap-1 text-portal-success text-sm font-bold">
              <TrendingUp className="size-4" />
              +8%
            </div>
          </div>
          <p className="text-3xl font-bold text-portal-text font-heading">
            ${Math.round(avgProjectValue).toLocaleString()}
          </p>
          <p className="text-portal-muted text-sm font-body mt-1">Avg Project Value</p>
        </div>

        {/* Projects Completed */}
        <div className="bg-portal-card rounded-xl border border-portal-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 bg-nrpg-teal/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="size-5 text-nrpg-teal" />
            </div>
          </div>
          <p className="text-3xl font-bold text-portal-text font-heading">
            {transactions.filter((t) => t.status === 'paid').length}
          </p>
          <p className="text-portal-muted text-sm font-body mt-1">Completed Projects</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-portal-card rounded-xl border border-portal-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-portal-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-portal-text font-heading">
              Recent Transactions
            </h3>
            <button className="text-nrpg-teal text-sm font-bold font-heading hover:underline flex items-center gap-1">
              <Download className="size-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-portal-border/30">
              <tr>
                <th className="px-6 py-4 text-left text-portal-muted text-xs font-bold font-heading uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-portal-muted text-xs font-bold font-heading uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-portal-muted text-xs font-bold font-heading uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-portal-muted text-xs font-bold font-heading uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-portal-muted text-xs font-bold font-heading uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-right text-portal-muted text-xs font-bold font-heading uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-portal-border">
              {transactions.map((transaction) => {
                const config = statusConfig[transaction.status];
                return (
                  <tr key={transaction.id} className="hover:bg-portal-border/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-portal-text font-heading">
                          {transaction.projectName}
                        </p>
                        <p className="text-xs text-portal-muted font-body">
                          {transaction.invoiceId}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-portal-text font-body">{transaction.client}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-portal-muted font-body">
                        {new Date(transaction.date).toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'px-2 py-1 text-xs font-bold rounded font-heading',
                          config.bg,
                          config.color
                        )}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-bold text-portal-text font-heading">
                        ${transaction.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-nrpg-teal hover:text-nrpg-teal-dark text-sm font-bold font-heading flex items-center gap-1 ml-auto">
                        <FileText className="size-4" />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-portal-border bg-portal-border/20">
          <button className="w-full text-center text-nrpg-teal text-sm font-bold font-heading hover:underline">
            View All Transactions
          </button>
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="bg-earth-primary/5 rounded-xl border border-earth-primary/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-portal-text font-heading">
              Next Payment Schedule
            </h3>
            <p className="text-portal-muted font-body text-sm">
              Payments are processed weekly on Fridays
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-earth-primary font-heading">
              ${pendingAmount.toLocaleString()}
            </p>
            <p className="text-portal-muted text-sm font-body">Expected: Dec 13, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
