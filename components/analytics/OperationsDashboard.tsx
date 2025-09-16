'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar, Cell, PieChart, Pie
} from 'recharts'
import {
  Clock, TrendingUp, Users, Truck, AlertTriangle,
  CheckCircle, Activity, MapPin, Phone, Shield
} from 'lucide-react'

export default function OperationsDashboard() {
  // Mock operational data
  const responseTimeData = [
    { hour: '00:00', avgTime: 45, calls: 2 },
    { hour: '04:00', avgTime: 42, calls: 1 },
    { hour: '08:00', avgTime: 38, calls: 5 },
    { hour: '12:00', avgTime: 52, calls: 8 },
    { hour: '16:00', avgTime: 48, calls: 6 },
    { hour: '20:00', avgTime: 44, calls: 4 },
  ]

  const jobStatus = [
    { status: 'In Progress', count: 24, value: 45, color: '#3B82F6' },
    { status: 'Scheduled', count: 18, value: 35, color: '#F59E0B' },
    { status: 'Completed Today', count: 32, value: 62, color: '#10B981' },
    { status: 'Pending', count: 8, value: 15, color: '#EF4444' },
  ]

  const technicianPerformance = [
    { name: 'John Smith', jobs: 8, rating: 4.9, efficiency: 95, response: 28 },
    { name: 'Sarah Johnson', jobs: 7, rating: 4.8, efficiency: 92, response: 32 },
    { name: 'Mike Wilson', jobs: 9, rating: 4.7, efficiency: 88, response: 35 },
    { name: 'Emily Brown', jobs: 6, rating: 5.0, efficiency: 98, response: 25 },
    { name: 'David Lee', jobs: 7, rating: 4.6, efficiency: 85, response: 38 },
  ]

  const equipmentStatus = [
    { equipment: 'Dehumidifiers', total: 45, inUse: 38, maintenance: 2, available: 5 },
    { equipment: 'Air Movers', total: 60, inUse: 52, maintenance: 3, available: 5 },
    { equipment: 'Air Scrubbers', total: 20, inUse: 15, maintenance: 1, available: 4 },
    { equipment: 'Moisture Meters', total: 30, inUse: 25, maintenance: 0, available: 5 },
    { equipment: 'Thermal Cameras', total: 10, inUse: 8, maintenance: 0, available: 2 },
  ]

  const serviceAreaActivity = [
    { area: 'Brisbane CBD', jobs: 45, revenue: 125000, avgResponse: 32 },
    { area: 'South Brisbane', jobs: 38, revenue: 98000, avgResponse: 35 },
    { area: 'North Brisbane', jobs: 32, revenue: 85000, avgResponse: 38 },
    { area: 'Ipswich', jobs: 28, revenue: 72000, avgResponse: 42 },
    { area: 'Logan', jobs: 22, revenue: 58000, avgResponse: 45 },
  ]

  const jobTypeDistribution = [
    { type: 'Emergency Water', value: 35, jobs: 145 },
    { type: 'Fire Restoration', value: 25, jobs: 98 },
    { type: 'Mould Remediation', value: 20, jobs: 82 },
    { type: 'Storm Damage', value: 12, jobs: 48 },
    { type: 'Biohazard', value: 8, jobs: 32 },
  ]

  const qualityMetrics = [
    { metric: 'First Call Resolution', value: 92, target: 90, status: 'good' },
    { metric: 'Customer Satisfaction', value: 4.8, target: 4.5, status: 'good' },
    { metric: 'Job Completion Rate', value: 98, target: 95, status: 'good' },
    { metric: 'Safety Incidents', value: 0, target: 0, status: 'good' },
    { metric: 'Equipment Utilization', value: 85, target: 80, status: 'good' },
    { metric: 'Response Time (min)', value: 42, target: 60, status: 'good' },
  ]

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">Operations Dashboard</h2>
        <p className="text-blue-100 mt-2">
          Service delivery, response times, and resource management
        </p>
      </div>

      {/* Key Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-green-600 mt-1">↑ 12% from yesterday</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold">42 min</p>
              <p className="text-sm text-green-600 mt-1">18 min under target</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Technicians Active</p>
              <p className="text-2xl font-bold">18/22</p>
              <p className="text-sm text-gray-600 mt-1">82% capacity</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Equipment Available</p>
              <p className="text-2xl font-bold">88%</p>
              <p className="text-sm text-yellow-600 mt-1">5 units in maintenance</p>
            </div>
            <Truck className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Response Time Trend & Job Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Response Time Trend (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgTime"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Avg Response (min)"
              />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#10B981"
                strokeWidth={2}
                yAxisId="right"
                name="Call Volume"
              />
              <YAxis yAxisId="right" orientation="right" fontSize={12} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Job Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="count"
              >
                {jobStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Technician Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Technician Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Technician</th>
                <th className="text-center py-2">Jobs Today</th>
                <th className="text-center py-2">Rating</th>
                <th className="text-center py-2">Efficiency</th>
                <th className="text-center py-2">Avg Response</th>
                <th className="text-center py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {technicianPerformance.map((tech, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{tech.name}</td>
                  <td className="text-center">{tech.jobs}</td>
                  <td className="text-center">
                    <span className="inline-flex items-center">
                      {tech.rating}
                      <span className="text-yellow-500 ml-1">★</span>
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`font-medium ${
                      tech.efficiency >= 90 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {tech.efficiency}%
                    </span>
                  </td>
                  <td className="text-center">{tech.response} min</td>
                  <td className="text-center">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Equipment Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Equipment Inventory Status</h3>
        <div className="space-y-4">
          {equipmentStatus.map((item, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{item.equipment}</h4>
                <span className="text-sm text-gray-600">Total: {item.total}</span>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="h-full flex">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${(item.inUse / item.total) * 100}%` }}
                    />
                    <div
                      className="bg-yellow-500 h-full"
                      style={{ width: `${(item.maintenance / item.total) * 100}%` }}
                    />
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${(item.available / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>In Use: {item.inUse}</span>
                <span>Maintenance: {item.maintenance}</span>
                <span>Available: {item.available}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Service Area Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Service Area Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceAreaActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="area" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="jobs" fill="#3B82F6" name="Jobs" />
              <Bar dataKey="avgResponse" fill="#F59E0B" name="Avg Response (min)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quality Metrics</h3>
          <div className="space-y-3">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm font-medium">{metric.metric}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold">{metric.value}{metric.metric.includes('%') ? '%' : ''}</span>
                  <span className="text-xs text-gray-500">Target: {metric.target}</span>
                  {metric.status === 'good' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}