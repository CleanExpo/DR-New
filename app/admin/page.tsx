import * as React from 'react'
import {
  Briefcase,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

// This would typically come from your API
const mockData = {
  metrics: {
    totalJobs: 247,
    activeJobs: 42,
    revenue: 1245000,
    contractors: 156,
  },
  recentJobs: [
    {
      id: 'JOB-001',
      title: 'Water Damage - Brisbane CBD',
      client: 'ABC Insurance',
      status: 'In Progress',
      priority: 'High',
      date: '2025-11-04',
    },
    {
      id: 'JOB-002',
      title: 'Fire Restoration - Ipswich',
      client: 'XYZ Property',
      status: 'Pending',
      priority: 'Medium',
      date: '2025-11-04',
    },
    {
      id: 'JOB-003',
      title: 'Mould Remediation - Gold Coast',
      client: 'Sunshine Homes',
      status: 'Completed',
      priority: 'Low',
      date: '2025-11-03',
    },
  ],
  activities: [
    {
      id: 1,
      action: 'New job created',
      detail: 'JOB-004 - Storm Damage Assessment',
      time: '10 minutes ago',
    },
    {
      id: 2,
      action: 'Invoice paid',
      detail: 'INV-156 - $15,500',
      time: '1 hour ago',
    },
    {
      id: 3,
      action: 'Contractor registered',
      detail: 'John Smith - Brisbane',
      time: '2 hours ago',
    },
  ],
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card hover>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.metrics.totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card hover>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.metrics.activeJobs}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-warning">+5</span> since yesterday
            </p>
          </CardContent>
        </Card>

        <Card hover>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(mockData.metrics.revenue / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card hover>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.metrics.contractors}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8</span> new this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Jobs */}
        <Card className="lg:col-span-4" gradient>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Jobs</CardTitle>
              <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {job.id}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          job.priority === 'High'
                            ? 'bg-destructive/10 text-destructive'
                            : job.priority === 'Medium'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-success/10 text-success'
                        }`}
                      >
                        {job.priority}
                      </span>
                    </div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.client}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        job.status === 'Completed'
                          ? 'text-success'
                          : job.status === 'In Progress'
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {job.status === 'Completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                      {job.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{job.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="lg:col-span-3" gradient>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="mt-1 rounded-full bg-primary/10 p-1">
                    <AlertCircle className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.detail}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card gradient>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <button className="flex items-center gap-3 rounded-lg border border-border p-4 transition-all hover:border-primary hover:bg-primary/5">
              <div className="rounded-lg bg-primary/10 p-2">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Create New Job</p>
                <p className="text-sm text-muted-foreground">Start a new project</p>
              </div>
            </button>

            <button className="flex items-center gap-3 rounded-lg border border-border p-4 transition-all hover:border-success hover:bg-success/5">
              <div className="rounded-lg bg-success/10 p-2">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="text-left">
                <p className="font-medium">View Analytics</p>
                <p className="text-sm text-muted-foreground">Check performance</p>
              </div>
            </button>

            <button className="flex items-center gap-3 rounded-lg border border-border p-4 transition-all hover:border-warning hover:bg-warning/5">
              <div className="rounded-lg bg-warning/10 p-2">
                <Users className="h-5 w-5 text-warning" />
              </div>
              <div className="text-left">
                <p className="font-medium">Manage Contractors</p>
                <p className="text-sm text-muted-foreground">View all contractors</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
