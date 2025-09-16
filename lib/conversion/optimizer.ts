// Conversion Optimizer
// Optimizes conversion rates through data-driven insights

export interface ConversionConfig {
  enabled: boolean
  trackingEnabled: boolean
  optimizationThreshold: number
  debugMode: boolean
}

export interface ConversionEvent {
  id: string
  type: 'page_view' | 'form_submission' | 'phone_call' | 'chat_started' | 'conversion'
  timestamp: number
  userId?: string
  sessionId: string
  data: any
}

class ConversionOptimizer {
  private config: ConversionConfig = {
    enabled: true,
    trackingEnabled: true,
    optimizationThreshold: 0.05, // 5% improvement threshold
    debugMode: process.env.NODE_ENV === 'development'
  }

  private events: ConversionEvent[] = []
  private conversionFunnel: Map<string, number> = new Map()

  public trackEvent(type: ConversionEvent['type'], data: any, sessionId?: string): void {
    if (!this.config.trackingEnabled) return

    const event: ConversionEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: Date.now(),
      sessionId: sessionId || this.generateSessionId(),
      data
    }

    this.events.push(event)
    this.updateConversionFunnel(event)

    if (this.config.debugMode) {
      console.log('📊 Conversion Event:', event)
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private updateConversionFunnel(event: ConversionEvent): void {
    const funnelStep = this.getFunnelStep(event.type)
    const currentCount = this.conversionFunnel.get(funnelStep) || 0
    this.conversionFunnel.set(funnelStep, currentCount + 1)
  }

  private getFunnelStep(eventType: ConversionEvent['type']): string {
    switch (eventType) {
      case 'page_view':
        return 'visitors'
      case 'form_submission':
      case 'phone_call':
      case 'chat_started':
        return 'engaged'
      case 'conversion':
        return 'converted'
      default:
        return 'other'
    }
  }

  public getConversionRate(): number {
    const visitors = this.conversionFunnel.get('visitors') || 0
    const converted = this.conversionFunnel.get('converted') || 0

    if (visitors === 0) return 0
    return (converted / visitors) * 100
  }

  public getFunnelMetrics(): any {
    return {
      visitors: this.conversionFunnel.get('visitors') || 0,
      engaged: this.conversionFunnel.get('engaged') || 0,
      converted: this.conversionFunnel.get('converted') || 0,
      conversionRate: this.getConversionRate(),
      engagementRate: this.getEngagementRate()
    }
  }

  private getEngagementRate(): number {
    const visitors = this.conversionFunnel.get('visitors') || 0
    const engaged = this.conversionFunnel.get('engaged') || 0

    if (visitors === 0) return 0
    return (engaged / visitors) * 100
  }

  public optimizeConversions(): any[] {
    const recommendations: any[] = []
    const metrics = this.getFunnelMetrics()

    // Check conversion rate
    if (metrics.conversionRate < 2) {
      recommendations.push({
        type: 'low_conversion_rate',
        priority: 'high',
        message: 'Conversion rate is below 2%. Consider A/B testing CTA buttons and emergency messaging.',
        data: { currentRate: metrics.conversionRate, targetRate: 5 }
      })
    }

    // Check engagement rate
    if (metrics.engagementRate < 10) {
      recommendations.push({
        type: 'low_engagement',
        priority: 'medium',
        message: 'Low engagement rate. Consider improving page content and call-to-action placement.',
        data: { currentRate: metrics.engagementRate, targetRate: 20 }
      })
    }

    // Check for drop-offs
    const dropoffRate = ((metrics.engaged - metrics.converted) / metrics.engaged) * 100
    if (dropoffRate > 50) {
      recommendations.push({
        type: 'high_dropoff',
        priority: 'high',
        message: 'High drop-off between engagement and conversion. Review form complexity and trust signals.',
        data: { dropoffRate, engaged: metrics.engaged, converted: metrics.converted }
      })
    }

    if (this.config.debugMode) {
      console.log('🎯 Conversion Recommendations:', recommendations)
    }

    return recommendations
  }

  public getRecentEvents(limit: number = 50): ConversionEvent[] {
    return this.events
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
  }

  public clearData(): void {
    this.events = []
    this.conversionFunnel.clear()
  }

  public updateConfig(config: Partial<ConversionConfig>): void {
    this.config = { ...this.config, ...config }
  }

  public getConfig(): ConversionConfig {
    return { ...this.config }
  }

  // Emergency-specific conversion tracking
  public trackEmergencyCall(): void {
    this.trackEvent('phone_call', {
      type: 'emergency',
      number: '1300309361',
      timestamp: Date.now()
    })
  }

  public trackServiceInquiry(service: string): void {
    this.trackEvent('form_submission', {
      type: 'service_inquiry',
      service,
      timestamp: Date.now()
    })
  }

  public trackChatStart(): void {
    this.trackEvent('chat_started', {
      type: 'customer_support',
      timestamp: Date.now()
    })
  }
}

export const conversionOptimizer = new ConversionOptimizer()
export default conversionOptimizer