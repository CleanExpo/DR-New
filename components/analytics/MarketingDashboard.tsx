'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, RadarAxis, PolarGrid, Radar, PolarAngleAxis, PolarRadiusAxis,
  Treemap, Sankey
} from 'recharts'
import {
  TrendingUp, Users, MousePointer, Target, DollarSign,
  Share2, Globe, Smartphone, Monitor, Tablet, Search
} from 'lucide-react'

export default function MarketingDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  // Mock data for marketing metrics
  const campaignPerformance = [
    { campaign: 'Google Ads - Water', spend: 2500, clicks: 850, conversions: 45, cpc: 2.94, roas: 4.2 },
    { campaign: 'Facebook - Emergency', spend: 1800, clicks: 620, conversions: 28, cpc: 2.90, roas: 3.8 },
    { campaign: 'Google Ads - Fire', spend: 2200, clicks: 720, conversions: 38, cpc: 3.06, roas: 4.5 },
    { campaign: 'SEO Organic', spend: 0, clicks: 2450, conversions: 98, cpc: 0, roas: 0 },
    { campaign: 'Email Marketing', spend: 150, clicks: 380, conversions: 22, cpc: 0.39, roas: 12.5 },
  ]

  const channelAttribution = [
    { channel: 'Organic Search', firstTouch: 35, lastTouch: 28, linear: 31, value: 125000 },
    { channel: 'Paid Search', firstTouch: 25, lastTouch: 30, linear: 28, value: 112000 },
    { channel: 'Social Media', firstTouch: 20, lastTouch: 18, linear: 19, value: 76000 },
    { channel: 'Direct', firstTouch: 10, lastTouch: 15, linear: 13, value: 52000 },
    { channel: 'Referral', firstTouch: 10, lastTouch: 9, linear: 9, value: 36000 },
  ]

  const contentPerformance = [
    { title: 'Water Damage Guide', views: 8500, engagement: 4.2, shares: 145, conversions: 82 },
    { title: 'Emergency Response Tips', views: 6200, engagement: 5.1, shares: 210, conversions: 45 },
    { title: 'Mould Prevention', views: 5800, engagement: 3.8, shares: 98, conversions: 38 },
    { title: 'Insurance Claims Help', views: 4500, engagement: 4.5, shares: 165, conversions: 72 },
    { title: 'Storm Damage Checklist', views: 3200, engagement: 4.0, shares: 88, conversions: 28 },
  ]

  const audienceSegments = [
    { segment: 'Homeowners 35-54', size: 35, value: 45, engagement: 72 },
    { segment: 'Property Managers', size: 20, value: 55, engagement: 68 },
    { segment: 'Insurance Adjusters', size: 15, value: 38, engagement: 82 },
    { segment: 'Commercial Property', size: 18, value: 65, engagement: 75 },
    { segment: 'Emergency Seekers', size: 12, value: 85, engagement: 95 },
  ]

  const keywordPerformance = [
    { keyword: 'water damage brisbane', position: 2, volume: 2400, difficulty: 68, clicks: 680 },
    { keyword: 'emergency restoration', position: 1, volume: 1800, difficulty: 45, clicks: 920 },
    { keyword: 'fire damage repair', position: 3, volume: 1200, difficulty: 72, clicks: 320 },
    { keyword: 'mould removal services', position: 2, volume: 980, difficulty: 55, clicks: 410 },
    { keyword: 'flood cleanup brisbane', position: 1, volume: 850, difficulty: 38, clicks: 580 },
  ]

  const socialMetrics = [
    { platform: 'Facebook', followers: 8500, engagement: 4.2, reach: 125000, posts: 45 },
    { platform: 'Instagram', followers: 5200, engagement: 5.8, reach: 85000, posts: 62 },
    { platform: 'LinkedIn', followers: 2800, engagement: 3.1, reach: 45000, posts: 28 },
    { platform: 'Twitter', followers: 1850, engagement: 2.5, reach: 32000, posts: 85 },
  ]

  const conversionPaths = [
    { path: 'Google > Landing > Contact', conversions: 145, value: 87000 },
    { path: 'Direct > Service > Quote', conversions: 98, value: 58800 },
    { path: 'Facebook > Blog > Contact', conversions: 72, value: 43200 },
    { path: 'SEO > Service > Call', conversions: 165, value: 99000 },
    { path: 'Email > Landing > Quote', conversions: 45, value: 27000 },
  ]

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">Marketing Performance</h2>
        <p className="text-purple-100 mt-2">
          Campaign analytics, attribution, and ROI tracking
        </p>
      </div>

      {/* Campaign Performance Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Campaign Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Campaign</th>
                <th className="text-right py-2">Spend</th>
                <th className="text-right py-2">Clicks</th>
                <th className="text-right py-2">Conversions</th>
                <th className="text-right py-2">CPC</th>
                <th className="text-right py-2">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaignPerformance.map((campaign, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{campaign.campaign}</td>
                  <td className="text-right">${campaign.spend.toLocaleString()}</td>
                  <td className="text-right">{campaign.clicks.toLocaleString()}</td>
                  <td className="text-right">{campaign.conversions}</td>
                  <td className="text-right">${campaign.cpc.toFixed(2)}</td>
                  <td className="text-right">
                    <span className={`font-medium ${campaign.roas >= 4 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {campaign.roas > 0 ? `${campaign.roas}x` : '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Channel Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Channel Attribution Models</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelAttribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="channel" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="firstTouch" fill="#3B82F6" name="First Touch" />
              <Bar dataKey="lastTouch" fill="#10B981" name="Last Touch" />
              <Bar dataKey="linear" fill="#F59E0B" name="Linear" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Audience Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={audienceSegments}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis dataKey="segment" fontSize={12} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={12} />
              <Radar name="Size %" dataKey="size" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Radar name="Value %" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              <Radar name="Engagement %" dataKey="engagement" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Content Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Content Performance</h3>
        <div className="space-y-4">
          {contentPerformance.map((content, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <p className="font-medium">{content.title}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>{content.views.toLocaleString()} views</span>
                  <span>{content.engagement}min avg time</span>
                  <span>{content.shares} shares</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{content.conversions}</p>
                <p className="text-sm text-gray-600">conversions</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SEO Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Keyword Rankings</h3>
          <div className="space-y-3">
            {keywordPerformance.map((kw, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium text-sm">{kw.keyword}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">Vol: {kw.volume}</span>
                    <span className="text-xs text-gray-500">Diff: {kw.difficulty}%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{kw.clicks} clicks</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    kw.position <= 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    #{kw.position}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Social Media Reach</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={socialMetrics}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="reach"
              >
                {socialMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Conversion Paths */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Conversion Paths</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conversionPaths.map((path, index) => (
            <div key={index} className="border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">{path.path}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold">{path.conversions}</p>
                  <p className="text-xs text-gray-500">conversions</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-green-600">
                    ${(path.value / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-gray-500">value</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}