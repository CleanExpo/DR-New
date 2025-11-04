"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Briefcase,
  DollarSign,
  Star,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Award,
} from "lucide-react"
import { EarningsChart } from "@/components/contractor/EarningsChart"
import Link from "next/link"

interface DashboardMetrics {
  jobsThisMonth: number
  earningsThisMonth: number
  averageRating: number
  jobsInQueue: number
}

interface Job {
  id: string
  title: string
  clientName: string
  location: string
  scheduledDate: string
  status: "ASSIGNED" | "IN_PROGRESS" | "COMPLETED"
  priority: "ROUTINE" | "URGENT" | "EMERGENCY"
  amount: number
}

interface NextAppointment {
  id: string
  title: string
  clientName: string
  clientPhone: string
  location: string
  scheduledDate: string
  scheduledTime: string
  serviceType: string
  estimatedDuration: string
}

export default function ContractorDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    jobsThisMonth: 0,
    earningsThisMonth: 0,
    averageRating: 0,
    jobsInQueue: 0,
  })
  const [recentJobs, setRecentJobs] = useState<Job[]>([])
  const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null)
  const [loading, setLoading] = useState(true)
  const [certificationExpiry, setCertificationExpiry] = useState<number>(120) // days until expiry

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API calls
      // const response = await fetch('/api/contractors/contractor-1/dashboard')
      // const data = await response.json()

      // Mock data
      setMetrics({
        jobsThisMonth: 24,
        earningsThisMonth: 18500,
        averageRating: 4.8,
        jobsInQueue: 7,
      })

      setRecentJobs([
        {
          id: "1",
          title: "Water Damage - Kitchen Flood",
          clientName: "Sarah Johnson",
          location: "Ascot, QLD",
          scheduledDate: "2025-11-04",
          status: "COMPLETED",
          priority: "URGENT",
          amount: 850,
        },
        {
          id: "2",
          title: "Fire Restoration - Living Room",
          clientName: "Michael Brown",
          location: "New Farm, QLD",
          scheduledDate: "2025-11-03",
          status: "COMPLETED",
          priority: "EMERGENCY",
          amount: 2200,
        },
        {
          id: "3",
          title: "Mould Remediation - Bathroom",
          clientName: "Emma Wilson",
          location: "Toowong, QLD",
          scheduledDate: "2025-11-02",
          status: "COMPLETED",
          priority: "ROUTINE",
          amount: 650,
        },
        {
          id: "4",
          title: "Storm Damage Assessment",
          clientName: "James Taylor",
          location: "Indooroopilly, QLD",
          scheduledDate: "2025-11-01",
          status: "COMPLETED",
          priority: "URGENT",
          amount: 450,
        },
        {
          id: "5",
          title: "Water Extraction - Basement",
          clientName: "Lisa Anderson",
          location: "Hamilton, QLD",
          scheduledDate: "2025-10-31",
          status: "COMPLETED",
          priority: "EMERGENCY",
          amount: 1200,
        },
      ])

      setNextAppointment({
        id: "next-1",
        title: "Fire Damage Assessment",
        clientName: "David Martinez",
        clientPhone: "0412 345 678",
        location: "42 Melbourne St, Brisbane CBD, QLD 4000",
        scheduledDate: "2025-11-05",
        scheduledTime: "09:00 AM",
        serviceType: "Fire & Smoke Restoration",
        estimatedDuration: "2 hours",
      })
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      ASSIGNED: "default",
      IN_PROGRESS: "secondary",
      COMPLETED: "outline",
    }
    return <Badge variant={variants[status] || "default"}>{status.replace("_", " ")}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      ROUTINE: "bg-blue-100 text-blue-800",
      URGENT: "bg-amber-100 text-amber-800",
      EMERGENCY: "bg-red-100 text-red-800",
    }
    return (
      <Badge className={colors[priority] || ""}>{priority}</Badge>
    )
  }

  const getCertificationStatus = (days: number) => {
    if (days < 30) return { color: "text-red-600", status: "Urgent Renewal Required", icon: AlertCircle }
    if (days < 60) return { color: "text-amber-600", status: "Renewal Due Soon", icon: AlertCircle }
    return { color: "text-green-600", status: "All Certifications Valid", icon: CheckCircle }
  }

  const certStatus = getCertificationStatus(certificationExpiry)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your activity.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jobs This Month</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.jobsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Earnings This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.earningsThisMonth.toLocaleString("en-AU")}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-1">
              {metrics.averageRating}
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jobs in Queue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.jobsInQueue}</div>
            <p className="text-xs text-muted-foreground">Rotation position: #3</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Appointment */}
      {nextAppointment && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Next Appointment
            </CardTitle>
            <CardDescription>Your upcoming scheduled job</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg">{nextAppointment.title}</h3>
                <p className="text-sm text-muted-foreground">{nextAppointment.serviceType}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{nextAppointment.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(nextAppointment.scheduledDate).toLocaleDateString("en-AU", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{nextAppointment.scheduledTime} ({nextAppointment.estimatedDuration})</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Client Details</p>
                  <p className="text-sm text-muted-foreground">{nextAppointment.clientName}</p>
                  <p className="text-sm text-muted-foreground">{nextAppointment.clientPhone}</p>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/contractor/jobs/${nextAppointment.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/contractor/schedule">View Schedule</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>Your last 5 completed jobs</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/contractor/jobs">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.clientName}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>
                      {new Date(job.scheduledDate).toLocaleDateString("en-AU")}
                    </TableCell>
                    <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${job.amount.toLocaleString("en-AU")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart & Certification Status */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Earnings Overview
            </CardTitle>
            <CardDescription>Monthly earnings for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <EarningsChart />
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* IICRC Certification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-5 w-5" />
                IICRC Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <certStatus.icon className={`h-5 w-5 mt-0.5 ${certStatus.color}`} />
                <div>
                  <p className={`font-medium ${certStatus.color}`}>{certStatus.status}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {certificationExpiry} days until next renewal
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contractor/profile/certifications">View Certifications</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Subscription Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Plan</span>
                  <Badge className="bg-blue-600">50km Radius</Badge>
                </div>
                <p className="text-2xl font-bold">$199/month</p>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">Coverage: Brisbane & Ipswich</p>
                <p className="text-muted-foreground">Next billing: 15 Nov 2025</p>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contractor/subscription">Manage Subscription</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="justify-start h-auto py-4" asChild>
              <Link href="/contractor/jobs?status=assigned">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Accept New Job</p>
                    <p className="text-sm text-muted-foreground">View available assignments</p>
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4" asChild>
              <Link href="/contractor/schedule/availability">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Update Availability</p>
                    <p className="text-sm text-muted-foreground">Manage your schedule</p>
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4" asChild>
              <Link href="/contractor/schedule">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">View Schedule</p>
                    <p className="text-sm text-muted-foreground">See upcoming appointments</p>
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
