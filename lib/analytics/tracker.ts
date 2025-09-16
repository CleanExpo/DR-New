// Core Analytics Tracker
// Comprehensive tracking system for all user interactions and business metrics

import { ANALYTICS_CONFIG } from './config'

interface EventData {
  category: string
  action: string
  label?: string
  value?: number
  metadata?: Record<string, any>
}

interface PageViewData {
  path: string
  title: string
  referrer?: string
  duration?: number
  scrollDepth?: number
}

interface ConversionData {
  type: 'lead' | 'quote' | 'booking' | 'emergency_call'
  value?: number
  service?: string
  source?: string
  campaign?: string
}

interface UserProperties {
  userId?: string
  userType?: 'residential' | 'commercial' | 'insurance'
  location?: string
  serviceInterest?: string[]
  customerValue?: 'high' | 'medium' | 'low'
}

class AnalyticsTracker {
  private static instance: AnalyticsTracker
  private sessionId: string
  private userId: string | null = null
  private sessionStartTime: number
  private pageLoadTime: number = 0
  private interactions: EventData[] = []
  private heatmapData: any[] = []
  private conversionFunnel: Map<string, number> = new Map()

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.sessionStartTime = Date.now()
    this.initializeTracking()
  }

  public static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker()
    }
    return AnalyticsTracker.instance
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
  }

  private initializeTracking(): void {
    if (typeof window !== 'undefined') {
      // Track page load performance
      this.trackPageLoadPerformance()

      // Initialize heatmap tracking
      this.initializeHeatmapTracking()

      // Track user engagement
      this.trackUserEngagement()

      // Initialize error tracking
      this.initializeErrorTracking()

      // Track conversion funnel
      this.initializeConversionFunnel()
    }
  }

  private trackPageLoadPerformance(): void {
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

      if (perfData) {
        this.pageLoadTime = perfData.loadEventEnd - perfData.fetchStart

        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          ttfb: perfData.responseStart - perfData.requestStart,
          download: perfData.responseEnd - perfData.responseStart,
          domInteractive: perfData.domInteractive - perfData.fetchStart,
          domComplete: perfData.domComplete - perfData.fetchStart,
          loadComplete: this.pageLoadTime,
        }

        this.trackEvent({
          category: 'Performance',
          action: 'PageLoad',
          metadata: metrics,
        })
      }
    }
  }

  private initializeHeatmapTracking(): void {
    if (typeof document !== 'undefined') {
      // Track clicks
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const data = {
          x: e.clientX,
          y: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
          element: target.tagName,
          id: target.id,
          className: target.className,
          text: target.innerText?.substring(0, 50),
          timestamp: Date.now(),
          sessionId: this.sessionId,
        }

        this.heatmapData.push(data)
        this.sendHeatmapData(data)
      })

      // Track mouse movements (throttled)
      let lastMove = 0
      document.addEventListener('mousemove', (e) => {
        const now = Date.now()
        if (now - lastMove > 100) { // Throttle to 10Hz
          lastMove = now
          const data = {
            type: 'move',
            x: e.clientX,
            y: e.clientY,
            timestamp: now,
            sessionId: this.sessionId,
          }
          this.heatmapData.push(data)
        }
      })

      // Track scroll depth
      let maxScrollDepth = 0
      window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollDepth = (window.scrollY / scrollHeight) * 100

        if (scrollDepth > maxScrollDepth) {
          maxScrollDepth = scrollDepth

          // Track milestone scroll depths
          const milestones = [25, 50, 75, 90, 100]
          milestones.forEach(milestone => {
            if (maxScrollDepth >= milestone && maxScrollDepth < milestone + 10) {
              this.trackEvent({
                category: 'Engagement',
                action: 'ScrollDepth',
                label: `${milestone}%`,
                value: milestone,
              })
            }
          })
        }
      })
    }
  }

  private trackUserEngagement(): void {
    if (typeof document !== 'undefined') {
      let engagementTime = 0
      let isEngaged = true
      let lastActivity = Date.now()

      // Track active time
      setInterval(() => {
        if (isEngaged) {
          engagementTime += 1000
        }

        // Check for inactivity
        if (Date.now() - lastActivity > 30000) { // 30 seconds of inactivity
          isEngaged = false
        }
      }, 1000)

      // Reset engagement on user activity
      const resetEngagement = () => {
        lastActivity = Date.now()
        isEngaged = true
      }

      document.addEventListener('mousemove', resetEngagement)
      document.addEventListener('keypress', resetEngagement)
      document.addEventListener('scroll', resetEngagement)
      document.addEventListener('click', resetEngagement)

      // Send engagement data before page unload
      window.addEventListener('beforeunload', () => {
        this.trackEvent({
          category: 'Engagement',
          action: 'SessionTime',
          value: engagementTime,
          metadata: {
            sessionId: this.sessionId,
            pageCount: this.conversionFunnel.size,
            interactionCount: this.interactions.length,
          },
        })
      })
    }
  }

  private initializeErrorTracking(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (e) => {
        this.trackEvent({
          category: 'Error',
          action: 'JavaScript',
          label: e.message,
          metadata: {
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            stack: e.error?.stack,
          },
        })
      })

      window.addEventListener('unhandledrejection', (e) => {
        this.trackEvent({
          category: 'Error',
          action: 'UnhandledPromise',
          label: e.reason?.toString(),
          metadata: {
            reason: e.reason,
            promise: e.promise,
          },
        })
      })
    }
  }

  private initializeConversionFunnel(): void {
    // Track funnel progression
    const funnelSteps = [
      'homepage_view',
      'service_page_view',
      'contact_form_view',
      'contact_form_start',
      'contact_form_submit',
      'thank_you_page',
    ]

    // Initialize funnel metrics
    funnelSteps.forEach(step => {
      this.conversionFunnel.set(step, 0)
    })
  }

  private sendHeatmapData(data: any): void {
    // Send to analytics endpoint
    if (typeof fetch !== 'undefined') {
      fetch('/api/analytics/heatmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(console.error)
    }
  }

  // Public methods for tracking

  public trackEvent(data: EventData): void {
    this.interactions.push(data)

    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', data.action, {
        event_category: data.category,
        event_label: data.label,
        value: data.value,
        ...data.metadata,
      })
    }

    // Send to internal analytics
    this.sendToAnalytics('event', data)
  }

  public trackPageView(data: PageViewData): void {
    // Update funnel if applicable
    if (data.path === '/') {
      this.updateFunnel('homepage_view')
    } else if (data.path.includes('/services/')) {
      this.updateFunnel('service_page_view')
    } else if (data.path === '/contact') {
      this.updateFunnel('contact_form_view')
    } else if (data.path === '/thank-you') {
      this.updateFunnel('thank_you_page')
    }

    // Send to analytics
    this.sendToAnalytics('pageview', data)
  }

  public trackConversion(data: ConversionData): void {
    // Update funnel
    this.updateFunnel('contact_form_submit')

    // Calculate conversion value
    const conversionValue = data.value || this.estimateConversionValue(data.type)

    // Track in GA
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: ANALYTICS_CONFIG.GA4_MEASUREMENT_ID,
        value: conversionValue,
        currency: 'AUD',
        conversion_type: data.type,
        ...data,
      })
    }

    // Send to internal analytics
    this.sendToAnalytics('conversion', {
      ...data,
      value: conversionValue,
      sessionId: this.sessionId,
      timestamp: Date.now(),
    })
  }

  public identifyUser(properties: UserProperties): void {
    this.userId = properties.userId || null

    // Send user properties to analytics
    this.sendToAnalytics('identify', {
      ...properties,
      sessionId: this.sessionId,
    })
  }

  public trackFormInteraction(formId: string, field: string, action: 'focus' | 'blur' | 'change'): void {
    if (action === 'focus' && formId === 'contact-form') {
      this.updateFunnel('contact_form_start')
    }

    this.trackEvent({
      category: 'Form',
      action: action,
      label: `${formId}:${field}`,
    })
  }

  public trackEmergencyCall(phoneNumber: string): void {
    this.trackConversion({
      type: 'emergency_call',
      value: 500, // Estimated value of emergency call
    })

    this.trackEvent({
      category: 'Emergency',
      action: 'CallInitiated',
      label: phoneNumber,
      value: 1,
    })
  }

  private updateFunnel(step: string): void {
    const currentCount = this.conversionFunnel.get(step) || 0
    this.conversionFunnel.set(step, currentCount + 1)

    // Send funnel update
    this.sendToAnalytics('funnel', {
      step,
      count: currentCount + 1,
      sessionId: this.sessionId,
    })
  }

  private estimateConversionValue(type: string): number {
    const valueMap: Record<string, number> = {
      lead: 150,
      quote: 250,
      booking: 750,
      emergency_call: 500,
    }
    return valueMap[type] || 100
  }

  private sendToAnalytics(type: string, data: any): void {
    // Queue for batch sending
    if (typeof fetch !== 'undefined') {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          data,
          sessionId: this.sessionId,
          userId: this.userId,
          timestamp: Date.now(),
        }),
      }).catch(console.error)
    }
  }

  // Utility methods

  public getSessionMetrics() {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.sessionStartTime,
      pageLoadTime: this.pageLoadTime,
      interactionCount: this.interactions.length,
      funnel: Object.fromEntries(this.conversionFunnel),
    }
  }

  public getHeatmapData() {
    return this.heatmapData
  }
}

export const analytics = AnalyticsTracker.getInstance()
export default analytics