/**
 * Unite-Group API Client — DR-259
 *
 * Connects DR-NRPG to Unite-Group as the single source of truth for:
 *   CRM, messaging, analytics, bookkeeping, social, and webhooks.
 *
 * Env vars required:
 *   UNITE_GROUP_API_KEY      — API key for authentication
 *   UNITE_GROUP_BASE_URL     — Base URL (defaults to https://api.unite-group.com.au/v1)
 *   UNITE_GROUP_WEBHOOK_SECRET — HMAC secret for inbound webhook verification
 */

import crypto from 'crypto';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

function getBaseUrl(): string {
  return process.env.UNITE_GROUP_BASE_URL ?? 'https://api.unite-group.com.au/v1';
}

function getApiKey(): string {
  const key = process.env.UNITE_GROUP_API_KEY;
  if (!key) throw new Error('UNITE_GROUP_API_KEY is not set');
  return key;
}

// ---------------------------------------------------------------------------
// Base HTTP client with retry + structured error logging
// ---------------------------------------------------------------------------

export class UniteGroupError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly endpoint: string,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = 'UniteGroupError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  retries?: number;
}

async function request<T>(endpoint: string, opts: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, retries = 3 } = opts;
  const url = `${getBaseUrl()}${endpoint}`;
  const apiKey = getApiKey();

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'X-Client': 'dr-nrpg/1.0',
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: body != null ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new UniteGroupError(
          `Unite-Group API error: ${method} ${endpoint} → ${res.status} ${res.statusText}`,
          res.status,
          endpoint,
          errBody,
        );
      }

      // 204 No Content
      if (res.status === 204) return {} as T;
      return res.json() as Promise<T>;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Don't retry client errors (4xx)
      if (err instanceof UniteGroupError && err.statusCode >= 400 && err.statusCode < 500) {
        throw err;
      }

      // Exponential back-off: 500ms, 1000ms, 2000ms
      if (attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, 500 * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError ?? new Error(`Unite-Group request failed after ${retries} retries`);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UniteContact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UniteMessage {
  id: string;
  channel: 'email' | 'sms' | 'push';
  to: string;
  subject?: string;
  body: string;
  status: 'queued' | 'sent' | 'delivered' | 'failed';
  sentAt?: string;
}

export interface UniteAnalyticsEvent {
  event: string;
  userId?: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
}

export interface UniteInvoice {
  id?: string;
  contactId: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate?: number;
  }>;
  dueDate?: string;
  currency?: string;
  reference?: string;
}

export interface UniteSocialPost {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter';
  content: string;
  scheduleAt?: string;
  mediaUrls?: string[];
}

export interface UniteSummary {
  crm: { totalContacts: number; newThisWeek: number };
  messages: { sent: number; delivered: number; failed: number };
  revenue: { thisMonth: number; outstanding: number; currency: string };
  social: { posts: number; engagement: number };
  fetchedAt: string;
}

// ---------------------------------------------------------------------------
// Step 2 — CRM / Contacts
// ---------------------------------------------------------------------------

export const crm = {
  /** Push a new contact on user registration */
  upsertContact(data: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    tags?: string[];
    externalId?: string;
  }): Promise<UniteContact> {
    return request('/contacts/upsert', { method: 'POST', body: data });
  },

  /** Fetch a contact by email */
  getContact(email: string): Promise<UniteContact> {
    return request(`/contacts?email=${encodeURIComponent(email)}`);
  },

  /** Update contact record */
  updateContact(contactId: string, data: Partial<UniteContact>): Promise<UniteContact> {
    return request(`/contacts/${contactId}`, { method: 'PATCH', body: data });
  },
};

// ---------------------------------------------------------------------------
// Step 3 — Messaging
// ---------------------------------------------------------------------------

export const messaging = {
  /** Send outbound email */
  sendEmail(data: {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
    tags?: string[];
  }): Promise<UniteMessage> {
    return request('/messages/email', { method: 'POST', body: data });
  },

  /** Send outbound SMS */
  sendSMS(data: {
    to: string;
    body: string;
    from?: string;
  }): Promise<UniteMessage> {
    return request('/messages/sms', { method: 'POST', body: data });
  },

  /** Get message delivery status */
  getMessageStatus(messageId: string): Promise<UniteMessage> {
    return request(`/messages/${messageId}`);
  },
};

// ---------------------------------------------------------------------------
// Step 4 — Analytics
// ---------------------------------------------------------------------------

export const analytics = {
  /** Push a project event to Unite-Group analytics */
  track(event: UniteAnalyticsEvent): Promise<void> {
    return request('/analytics/events', {
      method: 'POST',
      body: { ...event, timestamp: event.timestamp ?? new Date().toISOString() },
    });
  },

  /** Batch push events (up to 100) */
  trackBatch(events: UniteAnalyticsEvent[]): Promise<void> {
    return request('/analytics/events/batch', { method: 'POST', body: { events } });
  },

  /** Fetch a named report from Unite-Group */
  getReport(reportName: string, params?: Record<string, string>): Promise<unknown> {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/analytics/reports/${encodeURIComponent(reportName)}${qs}`);
  },
};

// ---------------------------------------------------------------------------
// Step 5 — Bookkeeping / Finance
// ---------------------------------------------------------------------------

export const bookkeeping = {
  /** Send an invoice to Unite-Group bookkeeping */
  createInvoice(invoice: UniteInvoice): Promise<{ id: string; status: string }> {
    return request('/finance/invoices', { method: 'POST', body: { ...invoice, currency: invoice.currency ?? 'AUD' } });
  },

  /** Record a payment against an invoice */
  recordPayment(data: {
    invoiceId: string;
    amount: number;
    paidAt?: string;
    method?: string;
  }): Promise<void> {
    return request(`/finance/invoices/${data.invoiceId}/payments`, {
      method: 'POST',
      body: data,
    });
  },

  /** Sync transaction status from Unite-Group back to local */
  getInvoiceStatus(invoiceId: string): Promise<{ status: string; paidAt?: string; amount: number }> {
    return request(`/finance/invoices/${invoiceId}/status`);
  },
};

// ---------------------------------------------------------------------------
// Step 6 — Social
// ---------------------------------------------------------------------------

export const social = {
  /** Schedule or post immediately to a social platform */
  createPost(post: UniteSocialPost): Promise<{ id: string; scheduledAt?: string }> {
    return request('/social/posts', { method: 'POST', body: post });
  },

  /** Get engagement stats for a post */
  getPostStats(postId: string): Promise<{
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  }> {
    return request(`/social/posts/${postId}/stats`);
  },

  /** List recent posts with stats */
  listPosts(params?: { platform?: string; limit?: number }): Promise<
    Array<{ id: string; platform: string; content: string; publishedAt: string; stats: object }>
  > {
    const qs = params ? '?' + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : '';
    return request(`/social/posts${qs}`);
  },
};

// ---------------------------------------------------------------------------
// Step 8 — Unified summary (aggregated across all modules)
// ---------------------------------------------------------------------------

export async function getSummary(): Promise<UniteSummary> {
  return request('/summary');
}

// ---------------------------------------------------------------------------
// Step 9 — Health check
// ---------------------------------------------------------------------------

export async function healthCheck(): Promise<{ status: 'ok' | 'degraded' | 'down'; latencyMs: number }> {
  const start = Date.now();
  try {
    await request('/health');
    return { status: 'ok', latencyMs: Date.now() - start };
  } catch (err) {
    return { status: 'down', latencyMs: Date.now() - start };
  }
}

// ---------------------------------------------------------------------------
// Step 7 — Webhook signature verification (inbound)
// ---------------------------------------------------------------------------

export function verifyUniteWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.UNITE_GROUP_WEBHOOK_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') return false;
    return true; // dev: skip
  }
  if (!signatureHeader) return false;

  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expected));
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Re-export convenience
// ---------------------------------------------------------------------------

export const uniteGroup = { crm, messaging, analytics, bookkeeping, social, getSummary, healthCheck };
