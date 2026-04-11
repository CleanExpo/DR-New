/**
 * DR-7 — Unite-Hub API Connector
 * Pushes DR/NRPG events and health metrics to the Unite-Group Nexus hub.
 * Requires env var: UNITE_HUB_API_KEY
 * Requires env var: UNITE_HUB_BASE_URL (default: https://hub.unite-group.com.au)
 */

export type UniteHubEventType =
  | 'partner.joined'
  | 'partner.upgraded'
  | 'event.submitted'
  | 'event.approved'
  | 'content.published'
  | 'job.quoted'
  | 'job.completed'
  | 'payment.received'

export interface UniteHubEvent {
  event: UniteHubEventType
  source: 'disaster-recovery' | 'nrpg' | 'restore-assist'
  timestamp: string
  data: Record<string, unknown>
}

export interface UniteHubHealth {
  source: string
  status: 'ok' | 'degraded' | 'down'
  uptime: number
  metrics: {
    partners: { community: number; standard: number; premium: number; total: number }
    content: { published: number }
    eventsThisMonth: number
    nrpgJobsInProgress: number
    revenue: {
      partnerMrr: number
      nrpgJobsThisMonth: number
      eventSponsorshipThisMonth: number
    }
  }
  checkedAt: string
}

class UniteHubConnector {
  private readonly apiKey: string
  private readonly baseUrl: string

  constructor() {
    this.apiKey = process.env.UNITE_HUB_API_KEY ?? ''
    this.baseUrl = process.env.UNITE_HUB_BASE_URL ?? 'https://hub.unite-group.com.au'
  }

  private get isConfigured(): boolean {
    return Boolean(this.apiKey)
  }

  private get headers(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'X-Api-Key': this.apiKey,
      'X-Source': 'disaster-recovery',
    }
  }

  /**
   * Push a single event to the Unite-Hub.
   * Returns true on success, false on failure (non-throwing — callers should fire-and-forget).
   */
  async pushEvent(event: UniteHubEventType, data: Record<string, unknown>): Promise<boolean> {
    if (!this.isConfigured) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[UniteHub] Event (not configured): ${event}`, data)
      }
      return false
    }

    const payload: UniteHubEvent = {
      event,
      source: 'disaster-recovery',
      timestamp: new Date().toISOString(),
      data,
    }

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/events`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      })
      return res.ok
    } catch {
      // Network errors are non-fatal — log only, don't throw
      console.error(`[UniteHub] Failed to push event: ${event}`)
      return false
    }
  }

  /**
   * Push multiple events in a single batch request.
   */
  async pushEvents(events: Array<{ event: UniteHubEventType; data: Record<string, unknown> }>): Promise<boolean> {
    if (!this.isConfigured) return false

    const payload = events.map(e => ({
      event: e.event,
      source: 'disaster-recovery',
      timestamp: new Date().toISOString(),
      data: e.data,
    }))

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/events/batch`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ events: payload }),
        signal: AbortSignal.timeout(8000),
      })
      return res.ok
    } catch {
      console.error('[UniteHub] Failed to push event batch')
      return false
    }
  }

  /**
   * Build the health/status payload for the Unite-Hub health endpoint.
   * Fetches metrics from the DR platform and returns a structured health object.
   */
  async buildHealthPayload(metrics: {
    partnerCounts: { community: number; standard: number; premium: number }
    publishedContentCount: number
    eventsThisMonth: number
    nrpgJobsInProgress: number
    nrpgJobRevenueThisMonth: number
    eventSponsorshipThisMonth: number
  }): Promise<UniteHubHealth> {
    const { community, standard, premium } = metrics.partnerCounts
    const partnerMrr = standard * 49 + premium * 149

    return {
      source: 'disaster-recovery',
      status: 'ok',
      uptime: process.uptime(),
      metrics: {
        partners: {
          community,
          standard,
          premium,
          total: community + standard + premium,
        },
        content: {
          published: metrics.publishedContentCount,
        },
        eventsThisMonth: metrics.eventsThisMonth,
        nrpgJobsInProgress: metrics.nrpgJobsInProgress,
        revenue: {
          partnerMrr,
          nrpgJobsThisMonth: metrics.nrpgJobRevenueThisMonth,
          eventSponsorshipThisMonth: metrics.eventSponsorshipThisMonth,
        },
      },
      checkedAt: new Date().toISOString(),
    }
  }
}

// Singleton — reuse across server-side calls
export const uniteHub = new UniteHubConnector()
