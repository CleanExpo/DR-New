'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import {
  Bell, AlertTriangle, CheckCircle, Info, X,
  TrendingDown, TrendingUp, Clock, DollarSign
} from 'lucide-react'
// Removed date-fns import - using native Date formatting

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info' | 'success'
  title: string
  message: string
  timestamp: number
  metadata?: any
}

interface AlertsPanelProps {
  alerts: Alert[]
}

export default function AlertsPanel({ alerts: initialAlerts }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts || [])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    setAlerts(initialAlerts)
  }, [initialAlerts])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'success':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter(alert => alert.type === filter)

  // Mock some alerts if none provided
  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'critical',
      title: 'High Response Time',
      message: 'Average response time exceeded 75 minutes in Logan area',
      timestamp: Date.now() - 300000,
      metadata: { area: 'Logan', responseTime: 78 }
    },
    {
      id: '2',
      type: 'success',
      title: 'Conversion Target Met',
      message: 'Daily conversion rate reached 8.5%, exceeding target',
      timestamp: Date.now() - 600000,
      metadata: { rate: 8.5, target: 8 }
    },
    {
      id: '3',
      type: 'warning',
      title: 'Equipment Shortage',
      message: 'Only 2 dehumidifiers available, consider maintenance schedule',
      timestamp: Date.now() - 900000,
      metadata: { equipment: 'dehumidifiers', available: 2 }
    },
    {
      id: '4',
      type: 'info',
      title: 'Traffic Spike Detected',
      message: '250% increase in website traffic from Google Ads campaign',
      timestamp: Date.now() - 1200000,
      metadata: { source: 'Google Ads', increase: 250 }
    }
  ]

  const displayAlerts = filteredAlerts.length > 0 ? filteredAlerts : mockAlerts

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alerts & Notifications
          </h3>
          <span className="text-sm text-gray-500">
            {displayAlerts.length} active
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {['all', 'critical', 'warning', 'info', 'success'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {displayAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 border rounded-lg ${getAlertStyle(alert.type)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                    {alert.metadata && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(alert.metadata).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-xs bg-white bg-opacity-60 px-2 py-1 rounded"
                          >
                            {key}: {String(value)}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(alert.timestamp).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="p-1 hover:bg-white hover:bg-opacity-60 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-4">
        <h4 className="text-sm font-medium mb-3">Alert Summary</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs text-gray-600">
              {displayAlerts.filter(a => a.type === 'critical').length} Critical
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <span className="text-xs text-gray-600">
              {displayAlerts.filter(a => a.type === 'warning').length} Warnings
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">
              {displayAlerts.filter(a => a.type === 'info').length} Info
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">
              {displayAlerts.filter(a => a.type === 'success').length} Success
            </span>
          </div>
        </div>
      </Card>

      {/* Alert Actions */}
      <Card className="p-4">
        <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors">
            Configure Alert Rules
          </button>
          <button className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors">
            View Alert History
          </button>
          <button className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors">
            Export Alert Report
          </button>
          <button className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors">
            Notification Settings
          </button>
        </div>
      </Card>
    </div>
  )
}