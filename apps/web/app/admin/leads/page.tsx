'use client';

import { useCallback, useEffect, useState } from 'react';

interface LeadItem {
  kind: 'contact' | 'lead_capture';
  id: string;
  name: string;
  email: string;
  phone: string | null;
  category: string;
  status: string;
  assignedTo: string | null;
  submittedAt: string;
}

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'QUALIFIED', 'RESOLVED', 'CONVERTED', 'CLOSED'];

export default function AdminLeadsPage() {
  const [items, setItems] = useState<LeadItem[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'unauthorized' | 'error'>('loading');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const res = await fetch('/api/admin/leads');
      if (res.status === 401 || res.status === 403) {
        setState('unauthorized');
        return;
      }
      if (!res.ok) {
        setState('error');
        return;
      }
      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(item: LeadItem, status: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id && i.kind === item.kind ? { ...i, status } : i)),
    );
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: item.kind, id: item.id, status }),
    }).catch(() => {});
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Lead Inbox</h1>
            <p className="text-sm text-slate-500">Inbound contact enquiries and damage leads.</p>
          </div>
          <button
            onClick={load}
            className="px-4 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            Refresh
          </button>
        </div>

        {state === 'loading' && <p className="text-slate-500">Loading…</p>}
        {state === 'unauthorized' && (
          <p className="text-red-600">You must be signed in as an administrator to view leads.</p>
        )}
        {state === 'error' && (
          <p className="text-red-600">Could not load leads. Please try again.</p>
        )}

        {state === 'ready' && items.length === 0 && (
          <p className="text-slate-500">No leads yet.</p>
        )}

        {state === 'ready' && items.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="px-4 py-3 font-medium">Received</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={`${item.kind}:${item.id}`} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {new Date(item.submittedAt).toLocaleDateString('en-AU')}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                        {item.kind === 'contact' ? 'Enquiry' : 'Damage lead'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{item.email}</div>
                      {item.phone && <div className="text-slate-400">{item.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.category}</td>
                    <td className="px-4 py-3">
                      <select
                        value={STATUS_OPTIONS.includes(item.status) ? item.status : 'NEW'}
                        onChange={(e) => updateStatus(item, e.target.value)}
                        className="border border-slate-300 rounded-lg px-2 py-1 text-sm"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
