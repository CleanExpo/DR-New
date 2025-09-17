'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExecutiveDashboard from '@/components/analytics/ExecutiveDashboard'
import MarketingDashboard from '@/components/analytics/MarketingDashboard'
import OperationsDashboard from '@/components/analytics/OperationsDashboard'
import FinancialDashboard from '@/components/analytics/FinancialDashboard'
import CustomerDashboard from '@/components/analytics/CustomerDashboard'
import SEODashboard from '@/components/analytics/SEODashboard'
import TeamDashboard from '@/components/analytics/TeamDashboard'
import AIInsightsDashboard from '@/components/analytics/AIInsightsDashboard'
import RealtimeMonitor from '@/components/analytics/RealtimeMonitor'
import AlertsPanel from '@/components/analytics/AlertsPanel'
import { realtimeAnalytics } from '@/lib/analytics/realtime'
import { Bell, Activity, TrendingUp, Users, DollarSign, Search, Shield, BarChart3, Brain } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('executive')
  const [isConnected, setIsConnected] = useState(false)
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    // Subscribe to connection status
    const unsubConnect = realtimeAnalytics.subscribe('connection', (data) => {
      setIsConnected(data.status === 'connected')
    })

    // Subscribe to alerts
    const unsubAlerts = realtimeAnalytics.subscribe('alert', (alert) => {
      setAlerts(prev => [alert, ...prev].slice(0, 10)) // Keep last 10 alerts
    })

    // Check initial connection
    setIsConnected(realtimeAnalytics.isConnected())

    return () => {
      unsubConnect()
      unsubAlerts()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                Analytics Command Center
              </h1>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-sm text-gray-700">
                  {isConnected ? 'Live' : 'Connecting...'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Alert Indicator */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-700" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{alerts.length}</span>
                  </span>
                )}
              </button>

              {/* Real-time Monitor Toggle */}
              <RealtimeMonitor />
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-1 bg-gray-100">
            <TabsTrigger value="executive" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Executive</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Operations</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Customer</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">SEO/SEM</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Insights</span>
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-12 gap-6">
            {/* Main Dashboard Area */}
            <div className="col-span-12 lg:col-span-9">
              <TabsContent value="executive" className="space-y-4 mt-0">
                <ExecutiveDashboard />
              </TabsContent>

              <TabsContent value="marketing" className="space-y-4 mt-0">
                <MarketingDashboard />
              </TabsContent>

              <TabsContent value="operations" className="space-y-4 mt-0">
                <OperationsDashboard />
              </TabsContent>

              <TabsContent value="financial" className="space-y-4 mt-0">
                <FinancialDashboard />
              </TabsContent>

              <TabsContent value="customer" className="space-y-4 mt-0">
                <CustomerDashboard />
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-0">
                <SEODashboard />
              </TabsContent>

              <TabsContent value="team" className="space-y-4 mt-0">
                <TeamDashboard />
              </TabsContent>

              <TabsContent value="ai-insights" className="space-y-4 mt-0">
                <AIInsightsDashboard />
              </TabsContent>
            </div>

            {/* Alerts Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <AlertsPanel alerts={alerts} />
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}