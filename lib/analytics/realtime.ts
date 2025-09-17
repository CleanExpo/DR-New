// Real-time Analytics Engine
// Provides live data streaming and real-time metrics updates

import Pusher from 'pusher-js'
import { ANALYTICS_CONFIG } from './config'

export interface RealtimeMetrics {
  activeVisitors: number
  currentPageViews: Map<string, number>
  activeConversions: number
  revenueToday: number
  emergencyCalls: number
  avgResponseTime: number
  topPages: Array<{ path: string; visitors: number }>
  topReferrers: Array<{ source: string; visitors: number }>
  deviceBreakdown: {
    desktop: number
    mobile: number
    tablet: number
  }
  locationBreakdown: Map<string, number>
  conversionFunnel: {
    visitors: number
    leads: number
    quotes: number
    customers: number
  }
}

export interface AlertNotification {
  id: string
  type: 'critical' | 'warning' | 'info' | 'success'
  title: string
  message: string
  timestamp: number
  metadata?: any
}

class RealtimeAnalytics {
  private static instance: RealtimeAnalytics
  private pusher: Pusher | null = null
  private metrics: RealtimeMetrics
  private subscribers: Map<string, Set<(data: any) => void>> = new Map()
  private alertQueue: AlertNotification[] = []
  private connected: boolean = false

  private constructor() {
    this.metrics = this.initializeMetrics()
    this.initializePusher()
    this.startMetricsPolling()
  }

  public static getInstance(): RealtimeAnalytics {
    if (!RealtimeAnalytics.instance) {
      RealtimeAnalytics.instance = new RealtimeAnalytics()
    }
    return RealtimeAnalytics.instance
  }

  private initializeMetrics(): RealtimeMetrics {
    return {
      activeVisitors: 0,
      currentPageViews: new Map(),
      activeConversions: 0,
      revenueToday: 0,
      emergencyCalls: 0,
      avgResponseTime: 0,
      topPages: [],
      topReferrers: [],
      deviceBreakdown: {
        desktop: 0,
        mobile: 0,
        tablet: 0,
      },
      locationBreakdown: new Map(),
      conversionFunnel: {
        visitors: 0,
        leads: 0,
        quotes: 0,
        customers: 0,
      },
    }
  }

  private initializePusher(): void {
    if (typeof window !== 'undefined' && ANALYTICS_CONFIG.PUSHER.key) {
      this.pusher = new Pusher(ANALYTICS_CONFIG.PUSHER.key, {
        cluster: ANALYTICS_CONFIG.PUSHER.cluster,
        forceTLS: true,
      })

      // Subscribe to channels
      const analyticsChannel = this.pusher.subscribe('analytics')
      const alertsChannel = this.pusher.subscribe('alerts')

      // Bind to events
      analyticsChannel.bind('visitor-update', (data: any) => {
        this.updateVisitorMetrics(data)
      })

      analyticsChannel.bind('conversion', (data: any) => {
        this.handleConversion(data)
      })

      analyticsChannel.bind('page-view', (data: any) => {
        this.handlePageView(data)
      })

      alertsChannel.bind('alert', (data: AlertNotification) => {
        this.handleAlert(data)
      })

      // Connection status
      this.pusher.connection.bind('connected', () => {
        this.connected = true
        this.notifySubscribers('connection', { status: 'connected' })
      })

      this.pusher.connection.bind('disconnected', () => {
        this.connected = false
        this.notifySubscribers('connection', { status: 'disconnected' })
      })
    }
  }

  private startMetricsPolling(): void {
    if (typeof window === 'undefined') return // Skip on server

    // Poll for critical metrics every second
    setInterval(() => {
      this.fetchRealtimeMetrics()
    }, ANALYTICS_CONFIG.REFRESH_INTERVALS.REAL_TIME)

    // Poll for standard metrics every 30 seconds
    setInterval(() => {
      this.fetchStandardMetrics()
    }, ANALYTICS_CONFIG.REFRESH_INTERVALS.STANDARD)

    // Poll for background metrics every 5 minutes
    setInterval(() => {
      this.fetchBackgroundMetrics()
    }, ANALYTICS_CONFIG.REFRESH_INTERVALS.BACKGROUND)
  }

  private async fetchRealtimeMetrics(): Promise<void> {
    try {
      if (typeof window === 'undefined') return // Skip on server
      const response = await fetch('/api/analytics/realtime')
      if (response.ok) {
        const data = await response.json()
        this.updateMetrics(data)
      }
    } catch (error) {
      console.error('Failed to fetch realtime metrics:', error)
    }
  }

  private async fetchStandardMetrics(): Promise<void> {
    try {
      if (typeof window === 'undefined') return // Skip on server
      const response = await fetch('/api/analytics/standard')
      if (response.ok) {
        const data = await response.json()
        this.updateStandardMetrics(data)
      }
    } catch (error) {
      console.error('Failed to fetch standard metrics:', error)
    }
  }

  private async fetchBackgroundMetrics(): Promise<void> {
    try {
      if (typeof window === 'undefined') return // Skip on server
      const response = await fetch('/api/analytics/background')
      if (response.ok) {
        const data = await response.json()
        this.updateBackgroundMetrics(data)
      }
    } catch (error) {
      console.error('Failed to fetch background metrics:', error)
    }
  }

  private updateMetrics(data: Partial<RealtimeMetrics>): void {
    Object.assign(this.metrics, data)
    this.notifySubscribers('metrics', this.metrics)
  }

  private updateStandardMetrics(data: any): void {
    // Update standard metrics
    if (data.topPages) {
      this.metrics.topPages = data.topPages
    }
    if (data.topReferrers) {
      this.metrics.topReferrers = data.topReferrers
    }
    if (data.deviceBreakdown) {
      this.metrics.deviceBreakdown = data.deviceBreakdown
    }

    this.notifySubscribers('metrics', this.metrics)
  }

  private updateBackgroundMetrics(data: any): void {
    // Update background metrics
    if (data.locationBreakdown) {
      this.metrics.locationBreakdown = new Map(Object.entries(data.locationBreakdown))
    }

    this.notifySubscribers('metrics', this.metrics)
  }

  private updateVisitorMetrics(data: any): void {
    this.metrics.activeVisitors = data.count || this.metrics.activeVisitors

    if (data.pageViews) {
      this.metrics.currentPageViews = new Map(Object.entries(data.pageViews))
    }

    this.notifySubscribers('visitors', {
      count: this.metrics.activeVisitors,
      pageViews: this.metrics.currentPageViews,
    })
  }

  private handleConversion(data: any): void {
    this.metrics.activeConversions++

    if (data.value) {
      this.metrics.revenueToday += data.value
    }

    // Update funnel
    switch (data.type) {
      case 'lead':
        this.metrics.conversionFunnel.leads++
        break
      case 'quote':
        this.metrics.conversionFunnel.quotes++
        break
      case 'customer':
        this.metrics.conversionFunnel.customers++
        break
    }

    this.notifySubscribers('conversion', data)
    this.notifySubscribers('metrics', this.metrics)

    // Check for conversion alerts
    this.checkConversionAlerts(data)
  }

  private handlePageView(data: any): void {
    const currentViews = this.metrics.currentPageViews.get(data.path) || 0
    this.metrics.currentPageViews.set(data.path, currentViews + 1)

    this.metrics.conversionFunnel.visitors++

    // Update device breakdown
    if (data.device) {
      this.metrics.deviceBreakdown[data.device as keyof typeof this.metrics.deviceBreakdown]++
    }

    // Update location breakdown
    if (data.location) {
      const currentCount = this.metrics.locationBreakdown.get(data.location) || 0
      this.metrics.locationBreakdown.set(data.location, currentCount + 1)
    }

    this.notifySubscribers('pageview', data)
    this.notifySubscribers('metrics', this.metrics)
  }

  private handleAlert(alert: AlertNotification): void {
    this.alertQueue.push(alert)

    // Keep only last 100 alerts
    if (this.alertQueue.length > 100) {
      this.alertQueue.shift()
    }

    this.notifySubscribers('alert', alert)

    // Handle critical alerts
    if (alert.type === 'critical') {
      this.handleCriticalAlert(alert)
    }
  }

  private handleCriticalAlert(alert: AlertNotification): void {
    // Log critical alert
    console.error('CRITICAL ALERT:', alert)

    // Send notification to stakeholders
    this.sendAlertNotification(alert)

    // Trigger automatic response if configured
    if (alert.metadata?.autoResponse) {
      this.triggerAutoResponse(alert)
    }
  }

  private async sendAlertNotification(alert: AlertNotification): Promise<void> {
    try {
      await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'alert',
          priority: alert.type,
          data: alert,
        }),
      })
    } catch (error) {
      console.error('Failed to send alert notification:', error)
    }
  }

  private triggerAutoResponse(alert: AlertNotification): void {
    // Implement automatic response logic based on alert type
    switch (alert.metadata?.responseType) {
      case 'scale_resources':
        // Trigger resource scaling
        this.scaleResources(alert.metadata.scalingFactor)
        break
      case 'notify_team':
        // Notify relevant team members
        this.notifyTeam(alert.metadata.teamIds)
        break
      case 'pause_campaigns':
        // Pause marketing campaigns if needed
        this.pauseCampaigns(alert.metadata.campaignIds)
        break
    }
  }

  private async scaleResources(factor: number): Promise<void> {
    // Implement resource scaling logic
    console.log('Scaling resources by factor:', factor)
  }

  private async notifyTeam(teamIds: string[]): Promise<void> {
    // Implement team notification logic
    console.log('Notifying teams:', teamIds)
  }

  private async pauseCampaigns(campaignIds: string[]): Promise<void> {
    // Implement campaign pausing logic
    console.log('Pausing campaigns:', campaignIds)
  }

  private checkConversionAlerts(conversion: any): void {
    // Check conversion rate thresholds
    const conversionRate = (this.metrics.conversionFunnel.customers / this.metrics.conversionFunnel.visitors) * 100

    if (conversionRate < ANALYTICS_CONFIG.THRESHOLDS.CONVERSION_RATE_MIN) {
      this.createAlert({
        id: `alert-${Date.now()}`,
        type: 'warning',
        title: 'Low Conversion Rate',
        message: `Conversion rate has dropped to ${conversionRate.toFixed(2)}%`,
        timestamp: Date.now(),
        metadata: {
          currentRate: conversionRate,
          threshold: ANALYTICS_CONFIG.THRESHOLDS.CONVERSION_RATE_MIN,
        },
      })
    }

    if (conversionRate > ANALYTICS_CONFIG.THRESHOLDS.CONVERSION_RATE_TARGET) {
      this.createAlert({
        id: `alert-${Date.now()}`,
        type: 'success',
        title: 'Conversion Target Achieved',
        message: `Conversion rate has reached ${conversionRate.toFixed(2)}%`,
        timestamp: Date.now(),
        metadata: {
          currentRate: conversionRate,
          target: ANALYTICS_CONFIG.THRESHOLDS.CONVERSION_RATE_TARGET,
        },
      })
    }
  }

  private createAlert(alert: AlertNotification): void {
    this.handleAlert(alert)
  }

  private notifySubscribers(event: string, data: any): void {
    const subscribers = this.subscribers.get(event)
    if (subscribers) {
      subscribers.forEach(callback => callback(data))
    }
  }

  // Public API

  public subscribe(event: string, callback: (data: any) => void): () => void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set())
    }

    this.subscribers.get(event)!.add(callback)

    // Return unsubscribe function
    return () => {
      this.subscribers.get(event)?.delete(callback)
    }
  }

  public getMetrics(): RealtimeMetrics {
    return { ...this.metrics }
  }

  public getAlerts(): AlertNotification[] {
    return [...this.alertQueue]
  }

  public isConnected(): boolean {
    return this.connected
  }

  public async testAlert(type: AlertNotification['type']): Promise<void> {
    const testAlert: AlertNotification = {
      id: `test-${Date.now()}`,
      type,
      title: 'Test Alert',
      message: `This is a test ${type} alert`,
      timestamp: Date.now(),
      metadata: { test: true },
    }

    this.handleAlert(testAlert)
  }
}

export const realtimeAnalytics = RealtimeAnalytics.getInstance()
export default realtimeAnalytics