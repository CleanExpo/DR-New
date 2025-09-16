// Real-time Analytics API
// Provides live metrics for dashboard updates

import { NextRequest, NextResponse } from 'next/server'

// Simulated real-time metrics
function generateRealtimeMetrics() {
  const now = new Date()
  const hour = now.getHours()

  // Simulate traffic patterns (higher during business hours)
  const trafficMultiplier = hour >= 9 && hour <= 17 ? 1.5 : 0.7

  return {
    activeVisitors: Math.floor(20 + Math.random() * 30 * trafficMultiplier),
    currentPageViews: {
      '/': Math.floor(10 + Math.random() * 20),
      '/services/water-damage': Math.floor(5 + Math.random() * 15),
      '/contact': Math.floor(3 + Math.random() * 10),
      '/locations/brisbane': Math.floor(2 + Math.random() * 8),
      '/emergency': Math.floor(1 + Math.random() * 5),
    },
    activeConversions: Math.floor(Math.random() * 5),
    revenueToday: 35000 + Math.floor(Math.random() * 15000),
    emergencyCalls: Math.floor(Math.random() * 8),
    avgResponseTime: 35 + Math.floor(Math.random() * 20),
    conversionFunnel: {
      visitors: Math.floor(100 + Math.random() * 200),
      leads: Math.floor(20 + Math.random() * 40),
      quotes: Math.floor(10 + Math.random() * 20),
      customers: Math.floor(5 + Math.random() * 10),
    },
    deviceBreakdown: {
      desktop: Math.floor(40 + Math.random() * 20),
      mobile: Math.floor(30 + Math.random() * 20),
      tablet: Math.floor(5 + Math.random() * 10),
    },
  }
}

export async function GET(request: NextRequest) {
  try {
    const metrics = generateRealtimeMetrics()

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Error generating real-time metrics:', error)
    return NextResponse.json(
      { error: 'Failed to generate metrics' },
      { status: 500 }
    )
  }
}