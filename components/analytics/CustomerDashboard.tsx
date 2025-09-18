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
import { Star, Heart, MessageCircle, TrendingUp, Users, Award } from 'lucide-react'

export default function CustomerDashboard() {
  // Customer satisfaction data
  const satisfactionTrend = [
    { month: 'Jan', score: 4.5, nps: 68, reviews: 45 },
    { month: 'Feb', score: 4.6, nps: 70, reviews: 52 },
    { month: 'Mar', score: 4.7, nps: 72, reviews: 48 },
    { month: 'Apr', score: 4.8, nps: 75, reviews: 61 },
    { month: 'May', score: 4.8, nps: 74, reviews: 58 },
    { month: 'Jun', score: 4.9, nps: 78, reviews: 65 },
  ]

  const feedbackCategories = [
    { category: 'Response Time', positive: 85, negative: 15 },
    { category: 'Service Quality', positive: 92, negative: 8 },
    { category: 'Communication', positive: 88, negative: 12 },
    { category: 'Professionalism', positive: 95, negative: 5 },
    { category: 'Value for Money', positive: 82, negative: 18 },
  ]

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">Customer Experience Dashboard</h2>
        <p className="text-pink-100 mt-2">
          Satisfaction metrics, feedback analysis, and loyalty tracking
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Satisfaction Score</p>
              <p className="text-2xl font-bold">4.9/5.0</p>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= 4.9 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Heart className="h-8 w-8 text-pink-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Promoter Score</p>
              <p className="text-2xl font-bold">78</p>
              <p className="text-sm text-green-600 mt-1">Excellent</p>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold">68%</p>
              <p className="text-sm text-gray-600 mt-1">65 reviews</p>
            </div>
            <MessageCircle className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold">82%</p>
              <p className="text-sm text-green-600 mt-1">↑ 5%</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Satisfaction Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={satisfactionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} name="Satisfaction" />
              <Line type="monotone" dataKey="nps" stroke="#3B82F6" strokeWidth={2} name="NPS" yAxisId="right" />
              <YAxis yAxisId="right" orientation="right" fontSize={12} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Feedback Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feedbackCategories} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={12} />
              <YAxis dataKey="category" type="category" fontSize={12} width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" fill="#10B981" name="Positive" stackId="a" />
              <Bar dataKey="negative" fill="#EF4444" name="Negative" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}