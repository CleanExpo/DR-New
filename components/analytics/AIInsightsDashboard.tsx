'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { aiInsights } from '@/lib/analytics/ai-insights'
import {
  Brain, TrendingUp, AlertTriangle, Lightbulb,
  Target, Zap, ChevronRight, CheckCircle
} from 'lucide-react'

export default function AIInsightsDashboard() {
  const [insights, setInsights] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    // Load initial insights
    loadInsights()

    // Refresh insights every 30 seconds
    const interval = setInterval(loadInsights, 30000)

    return () => clearInterval(interval)
  }, [filter])

  const loadInsights = () => {
    if (filter === 'all') {
      setInsights(aiInsights.getLatestInsights(20))
    } else if (filter === 'actionable') {
      setInsights(aiInsights.getActionableInsights())
    } else {
      setInsights(aiInsights.getInsights(filter as any))
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction':
        return <TrendingUp className="h-5 w-5" />
      case 'anomaly':
        return <AlertTriangle className="h-5 w-5" />
      case 'recommendation':
        return <Lightbulb className="h-5 w-5" />
      case 'trend':
        return <Target className="h-5 w-5" />
      default:
        return <Brain className="h-5 w-5" />
    }
  }

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-yellow-200 bg-yellow-50'
      case 'low':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="h-8 w-8" />
          <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
        </div>
        <p className="text-purple-100">
          Machine learning predictions, anomaly detection, and intelligent recommendations
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'actionable', 'prediction', 'anomaly', 'recommendation', 'trend'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === type
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <Card
            key={index}
            className={`p-5 ${getInsightColor(insight.impact)} transition-all hover:shadow-lg`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getInsightIcon(insight.type)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-600">
                        {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                      </span>
                      <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                        {(insight.confidence * 100).toFixed(0)}% confidence
                      </span>
                      {insight.actionRequired && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                          Action Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {insight.impact === 'high' && (
                  <Zap className="h-5 w-5 text-red-600" />
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700">{insight.description}</p>

              {/* Data Points */}
              {insight.data && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(insight.data)
                    .filter(([key]) => key !== 'timestamp')
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <span
                        key={key}
                        className="text-xs bg-white bg-opacity-60 px-2 py-1 rounded"
                      >
                        {key.replace(/_/g, ' ')}: {
                          typeof value === 'number'
                            ? value.toFixed(value % 1 === 0 ? 0 : 1)
                            : String(value)
                        }
                      </span>
                    ))}
                </div>
              )}

              {/* Suggested Actions */}
              {insight.suggestedActions && insight.suggestedActions.length > 0 && (
                <div className="border-t pt-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">Recommended Actions:</p>
                  <div className="space-y-1">
                    {insight.suggestedActions.slice(0, 3).map((action: string, i: number) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {insight.actionRequired && (
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition-colors">
                    Take Action
                  </button>
                  <button className="px-3 py-1.5 bg-white bg-opacity-60 text-gray-700 text-sm font-medium rounded hover:bg-opacity-80 transition-colors">
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* AI Model Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">AI Model Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Revenue Forecast', accuracy: 92, status: 'active' },
            { name: 'Churn Prediction', accuracy: 88, status: 'active' },
            { name: 'Anomaly Detection', accuracy: 95, status: 'active' },
            { name: 'Demand Forecast', accuracy: 90, status: 'active' },
          ].map((model, index) => (
            <div key={index} className="border rounded-lg p-3">
              <p className="text-sm font-medium">{model.name}</p>
              <p className="text-2xl font-bold mt-1">{model.accuracy}%</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-gray-600">Active</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}