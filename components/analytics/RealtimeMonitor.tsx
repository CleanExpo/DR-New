'use client'

import { useState, useEffect } from 'react'
import { Activity, Users, Eye, MousePointer } from 'lucide-react'
import { realtimeAnalytics } from '@/lib/analytics/realtime'

export default function RealtimeMonitor() {
  const [isOpen, setIsOpen] = useState(false)
  const [metrics, setMetrics] = useState({
    activeVisitors: 0,
    pageViews: 0,
    activePages: [] as Array<{ path: string; count: number }>,
    recentEvents: [] as Array<{ type: string; time: string }>
  })

  useEffect(() => {
    const unsubscribe = realtimeAnalytics.subscribe('metrics', (data) => {
      const pageViewsArray: number[] = data.currentPageViews ? Array.from(data.currentPageViews.values()) : []
      const pageViewsTotal = pageViewsArray.length > 0 ? pageViewsArray.reduce((a, b) => a + b, 0) : 0

      const activePagesArray: [string, number][] = data.currentPageViews ? Array.from(data.currentPageViews.entries()) : []

      setMetrics({
        activeVisitors: data.activeVisitors,
        pageViews: pageViewsTotal,
        activePages: activePagesArray
          .map(([path, count]) => ({ path, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5),
        recentEvents: [] // Would be populated from event stream
      })
    })

    return unsubscribe
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
      >
        <Activity className="h-5 w-5 text-blue-600" />
        {metrics.activeVisitors > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">{metrics.activeVisitors}</span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed top-16 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Real-time Monitor
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Active Visitors */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Active Visitors</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {metrics.activeVisitors}
              </span>
            </div>

            {/* Page Views */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Page Views</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {metrics.pageViews}
              </span>
            </div>

            {/* Active Pages */}
            <div>
              <h4 className="text-sm font-medium mb-2">Top Active Pages</h4>
              <div className="space-y-2">
                {metrics.activePages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 truncate flex-1">
                      {page.path}
                    </span>
                    <span className="font-medium ml-2">{page.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Feed Indicator */}
            <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600">Live data stream active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}