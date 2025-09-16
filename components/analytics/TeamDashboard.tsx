'use client'

import { Card } from '@/components/ui/Card'
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'
import { Users, Trophy, Target, Clock, Star, TrendingUp } from 'lucide-react'

export default function TeamDashboard() {
  const teamPerformance = [
    { name: 'John Smith', jobs: 145, rating: 4.9, efficiency: 95, revenue: 125000 },
    { name: 'Sarah Johnson', jobs: 132, rating: 4.8, efficiency: 92, revenue: 112000 },
    { name: 'Mike Wilson', jobs: 128, rating: 4.7, efficiency: 88, revenue: 98000 },
    { name: 'Emily Brown', jobs: 118, rating: 5.0, efficiency: 98, revenue: 105000 },
    { name: 'David Lee', jobs: 125, rating: 4.6, efficiency: 85, revenue: 95000 },
  ]

  const teamSkills = [
    { skill: 'Water Damage', John: 95, Sarah: 88, Mike: 92, Emily: 85, David: 90 },
    { skill: 'Fire Restoration', John: 85, Sarah: 92, Mike: 88, Emily: 90, David: 87 },
    { skill: 'Mould Remediation', John: 90, Sarah: 85, Mike: 82, Emily: 95, David: 88 },
    { skill: 'Customer Service', John: 92, Sarah: 95, Mike: 88, Emily: 98, David: 85 },
    { skill: 'Technical Skills', John: 88, Sarah: 85, Mike: 95, Emily: 82, David: 92 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">Team Performance Dashboard</h2>
        <p className="text-orange-100 mt-2">
          Individual performance, skills assessment, and team analytics
        </p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Team Size</p>
              <p className="text-2xl font-bold">22</p>
              <p className="text-sm text-gray-600 mt-1">18 active</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold">4.8</p>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= 4.8 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Trophy className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Efficiency</p>
              <p className="text-2xl font-bold">91%</p>
              <p className="text-sm text-green-600 mt-1">↑ 3%</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jobs/Day</p>
              <p className="text-2xl font-bold">42</p>
              <p className="text-sm text-gray-600 mt-1">1.9 per tech</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Team Leaderboard */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Team Leaderboard</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Technician</th>
                <th className="text-center py-2">Jobs</th>
                <th className="text-center py-2">Rating</th>
                <th className="text-center py-2">Efficiency</th>
                <th className="text-right py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((member, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">
                    {index === 0 && <span className="mr-2">🥇</span>}
                    {index === 1 && <span className="mr-2">🥈</span>}
                    {index === 2 && <span className="mr-2">🥉</span>}
                    {member.name}
                  </td>
                  <td className="text-center">{member.jobs}</td>
                  <td className="text-center">
                    <span className="inline-flex items-center">
                      {member.rating}
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`font-medium ${
                      member.efficiency >= 90 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {member.efficiency}%
                    </span>
                  </td>
                  <td className="text-right font-medium">
                    ${member.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Skills Matrix */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Team Skills Matrix</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={teamSkills}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis dataKey="skill" fontSize={12} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={12} />
            <Radar name="John" dataKey="John" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
            <Radar name="Sarah" dataKey="Sarah" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
            <Radar name="Emily" dataKey="Emily" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}