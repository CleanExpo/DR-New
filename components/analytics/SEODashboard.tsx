'use client'

import { Card } from '@/components/ui/Card'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from '@/components/charts/DynamicCharts'
import { Search, Globe, Link, TrendingUp, FileText, Award } from 'lucide-react'

export default function SEODashboard() {
  const organicTraffic = [
    { month: 'Jan', traffic: 45000, keywords: 245, backlinks: 1250 },
    { month: 'Feb', traffic: 48000, keywords: 258, backlinks: 1320 },
    { month: 'Mar', traffic: 52000, keywords: 275, backlinks: 1380 },
    { month: 'Apr', traffic: 51000, keywords: 282, backlinks: 1420 },
    { month: 'May', traffic: 58000, keywords: 295, backlinks: 1480 },
    { month: 'Jun', traffic: 62000, keywords: 310, backlinks: 1550 },
  ]

  const topKeywords = [
    { keyword: 'water damage brisbane', position: 2, volume: 2400, traffic: 680 },
    { keyword: 'emergency restoration', position: 1, volume: 1800, traffic: 920 },
    { keyword: 'flood cleanup', position: 3, volume: 1500, traffic: 380 },
    { keyword: 'mould removal', position: 2, volume: 1200, traffic: 450 },
    { keyword: 'fire damage repair', position: 4, volume: 900, traffic: 180 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">SEO Performance Dashboard</h2>
        <p className="text-indigo-100 mt-2">
          Organic search visibility, rankings, and technical SEO health
        </p>
      </div>

      {/* SEO Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Organic Traffic</p>
              <p className="text-2xl font-bold">62K</p>
              <p className="text-sm text-green-600 mt-1">↑ 12% MoM</p>
            </div>
            <Globe className="h-8 w-8 text-indigo-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Keywords Ranking</p>
              <p className="text-2xl font-bold">310</p>
              <p className="text-sm text-green-600 mt-1">45 in top 3</p>
            </div>
            <Search className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Domain Authority</p>
              <p className="text-2xl font-bold">52</p>
              <p className="text-sm text-gray-600 mt-1">Good</p>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Backlinks</p>
              <p className="text-2xl font-bold">1.5K</p>
              <p className="text-sm text-green-600 mt-1">↑ 70 new</p>
            </div>
            <Link className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Traffic Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Organic Traffic & Growth Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={organicTraffic}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="traffic" stroke="#3B82F6" strokeWidth={2} name="Traffic" />
            <Line type="monotone" dataKey="keywords" stroke="#10B981" strokeWidth={2} name="Keywords" yAxisId="right" />
            <YAxis yAxisId="right" orientation="right" fontSize={12} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Keywords Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Keywords</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Keyword</th>
                <th className="text-center py-2">Position</th>
                <th className="text-center py-2">Volume</th>
                <th className="text-center py-2">Traffic</th>
              </tr>
            </thead>
            <tbody>
              {topKeywords.map((kw, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{kw.keyword}</td>
                  <td className="text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      kw.position <= 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      #{kw.position}
                    </span>
                  </td>
                  <td className="text-center">{kw.volume.toLocaleString()}</td>
                  <td className="text-center">{kw.traffic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}