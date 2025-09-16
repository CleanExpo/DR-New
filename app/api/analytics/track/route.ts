// Analytics Tracking API Endpoint
// Receives and processes analytics events from the client

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// In-memory store for demo (replace with database in production)
const analyticsStore = {
  events: [] as any[],
  sessions: new Map(),
  conversions: [] as any[],
  pageViews: new Map(),
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headersList = headers()
    const userAgent = headersList.get('user-agent') || ''
    const ip = headersList.get('x-forwarded-for') ||
               headersList.get('x-real-ip') ||
               'unknown'

    // Enrich event data
    const enrichedData = {
      ...body,
      userAgent,
      ip: ip.split(',')[0].trim(), // Get first IP if multiple
      serverTimestamp: Date.now(),
      device: detectDevice(userAgent),
      browser: detectBrowser(userAgent),
    }

    // Process based on event type
    switch (body.type) {
      case 'event':
        handleEvent(enrichedData)
        break
      case 'pageview':
        handlePageView(enrichedData)
        break
      case 'conversion':
        handleConversion(enrichedData)
        break
      case 'identify':
        handleIdentify(enrichedData)
        break
      case 'funnel':
        handleFunnelUpdate(enrichedData)
        break
      default:
        handleGenericEvent(enrichedData)
    }

    // Store in database (implement your storage solution)
    await storeAnalytics(enrichedData)

    // Trigger real-time updates
    await triggerRealtimeUpdate(enrichedData)

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully'
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

function detectDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return 'mobile'
  if (/tablet|ipad/i.test(userAgent)) return 'tablet'
  return 'desktop'
}

function detectBrowser(userAgent: string): string {
  if (/chrome/i.test(userAgent)) return 'Chrome'
  if (/firefox/i.test(userAgent)) return 'Firefox'
  if (/safari/i.test(userAgent)) return 'Safari'
  if (/edge/i.test(userAgent)) return 'Edge'
  return 'Other'
}

function handleEvent(data: any) {
  analyticsStore.events.push(data)

  // Update session data
  if (data.sessionId) {
    const session = analyticsStore.sessions.get(data.sessionId) || {
      startTime: Date.now(),
      events: [],
      pageViews: 0,
    }
    session.events.push(data)
    session.lastActivity = Date.now()
    analyticsStore.sessions.set(data.sessionId, session)
  }
}

function handlePageView(data: any) {
  const path = data.data.path
  const currentCount = analyticsStore.pageViews.get(path) || 0
  analyticsStore.pageViews.set(path, currentCount + 1)

  // Update session
  if (data.sessionId) {
    const session = analyticsStore.sessions.get(data.sessionId) || {
      startTime: Date.now(),
      events: [],
      pageViews: 0,
    }
    session.pageViews++
    session.lastPage = path
    analyticsStore.sessions.set(data.sessionId, session)
  }
}

function handleConversion(data: any) {
  analyticsStore.conversions.push({
    ...data,
    conversionTime: Date.now(),
  })

  // Calculate conversion metrics
  const totalSessions = analyticsStore.sessions.size
  const totalConversions = analyticsStore.conversions.length
  const conversionRate = totalSessions > 0 ? (totalConversions / totalSessions) * 100 : 0

  // Check for alerts
  if (conversionRate < 2) { // Below 2% threshold
    triggerAlert('low_conversion_rate', { rate: conversionRate })
  }
}

function handleIdentify(data: any) {
  // Store user identification data
  if (data.sessionId) {
    const session = analyticsStore.sessions.get(data.sessionId)
    if (session) {
      session.userId = data.data.userId
      session.userProperties = data.data
      analyticsStore.sessions.set(data.sessionId, session)
    }
  }
}

function handleFunnelUpdate(data: any) {
  // Update funnel metrics
  if (data.sessionId) {
    const session = analyticsStore.sessions.get(data.sessionId)
    if (session) {
      session.funnelStep = data.data.step
      session.funnelProgress = session.funnelProgress || []
      session.funnelProgress.push({
        step: data.data.step,
        timestamp: Date.now(),
      })
      analyticsStore.sessions.set(data.sessionId, session)
    }
  }
}

function handleGenericEvent(data: any) {
  analyticsStore.events.push(data)
}

async function storeAnalytics(data: any) {
  // In production, store in database
  // For now, we're using in-memory storage

  // Example database storage:
  // await db.analytics.create({ data })

  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics event:', data.type, data.data)
  }
}

async function triggerRealtimeUpdate(data: any) {
  // Send to Pusher for real-time updates
  if (process.env.PUSHER_APP_ID) {
    try {
      const Pusher = require('pusher')
      const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap4',
        useTLS: true,
      })

      // Trigger appropriate channel
      switch (data.type) {
        case 'pageview':
          await pusher.trigger('analytics', 'page-view', data)
          break
        case 'conversion':
          await pusher.trigger('analytics', 'conversion', data)
          break
        case 'event':
          if (data.data.category === 'Emergency') {
            await pusher.trigger('alerts', 'emergency', data)
          }
          break
      }

      // Update visitor count
      const activeVisitors = analyticsStore.sessions.size
      await pusher.trigger('analytics', 'visitor-update', {
        count: activeVisitors,
        pageViews: Object.fromEntries(analyticsStore.pageViews),
      })
    } catch (error) {
      console.error('Pusher update failed:', error)
    }
  }
}

async function triggerAlert(type: string, data: any) {
  // Send alert notification
  if (process.env.PUSHER_APP_ID) {
    try {
      const Pusher = require('pusher')
      const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap4',
        useTLS: true,
      })

      await pusher.trigger('alerts', 'alert', {
        id: `alert-${Date.now()}`,
        type: 'warning',
        title: type.replace(/_/g, ' ').toUpperCase(),
        message: `Alert triggered: ${JSON.stringify(data)}`,
        timestamp: Date.now(),
        metadata: data,
      })
    } catch (error) {
      console.error('Alert trigger failed:', error)
    }
  }
}

// GET endpoint for retrieving analytics data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  switch (type) {
    case 'summary':
      return NextResponse.json({
        totalEvents: analyticsStore.events.length,
        activeSessions: analyticsStore.sessions.size,
        totalConversions: analyticsStore.conversions.length,
        topPages: Array.from(analyticsStore.pageViews.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([path, count]) => ({ path, count })),
      })

    case 'sessions':
      return NextResponse.json({
        sessions: Array.from(analyticsStore.sessions.entries()).map(([id, data]) => ({
          id,
          ...data,
        })),
      })

    case 'conversions':
      return NextResponse.json({
        conversions: analyticsStore.conversions,
      })

    default:
      return NextResponse.json({
        events: analyticsStore.events.slice(-100), // Last 100 events
      })
  }
}