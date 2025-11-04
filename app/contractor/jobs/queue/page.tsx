"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  MapPin,
  Calendar,
  TrendingUp,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface QueueJob {
  id: string
  position: number
  title: string
  clientName: string
  location: string
  distance: number
  estimatedAssignment: string
  priority: "ROUTINE" | "URGENT" | "EMERGENCY"
  serviceType: string
  estimatedValue: number
}

export default function JobQueuePage() {
  const [queueJobs, setQueueJobs] = useState<QueueJob[]>([])
  const [loading, setLoading] = useState(true)
  const [yourPosition, setYourPosition] = useState(3)
  const [estimatedWait, setEstimatedWait] = useState("2-3 days")

  useEffect(() => {
    fetchQueueData()
  }, [])

  const fetchQueueData = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/jobs/queue?contractorId=contractor-1')
      // const data = await response.json()

      // Mock data
      const mockJobs: QueueJob[] = [
        {
          id: "q1",
          position: 1,
          title: "Commercial Water Damage",
          clientName: "ABC Corporation",
          location: "Brisbane CBD, QLD",
          distance: 3.2,
          estimatedAssignment: "Today",
          priority: "URGENT",
          serviceType: "Water Damage Restoration",
          estimatedValue: 4500,
        },
        {
          id: "q2",
          position: 2,
          title: "Fire Restoration - Office",
          clientName: "XYZ Pty Ltd",
          location: "Fortitude Valley, QLD",
          distance: 4.8,
          estimatedAssignment: "Tomorrow",
          priority: "EMERGENCY",
          serviceType: "Fire & Smoke Restoration",
          estimatedValue: 8200,
        },
        {
          id: "q3",
          position: 3,
          title: "Mould Assessment",
          clientName: "Property Management Co",
          location: "New Farm, QLD",
          distance: 5.1,
          estimatedAssignment: "In 2 days",
          priority: "ROUTINE",
          serviceType: "Mould Remediation",
          estimatedValue: 1200,
        },
        {
          id: "q4",
          position: 4,
          title: "Storm Damage Repairs",
          clientName: "Residential Client",
          location: "Ascot, QLD",
          distance: 6.3,
          estimatedAssignment: "In 3 days",
          priority: "URGENT",
          serviceType: "Storm Damage",
          estimatedValue: 2800,
        },
        {
          id: "q5",
          position: 5,
          title: "Water Extraction",
          clientName: "Commercial Property",
          location: "Toowong, QLD",
          distance: 8.2,
          estimatedAssignment: "In 4 days",
          priority: "URGENT",
          serviceType: "Water Damage Restoration",
          estimatedValue: 3100,
        },
        {
          id: "q6",
          position: 6,
          title: "Contents Restoration",
          clientName: "Insurance Claim",
          location: "Indooroopilly, QLD",
          distance: 9.5,
          estimatedAssignment: "In 5 days",
          priority: "ROUTINE",
          serviceType: "Contents Pack-Out",
          estimatedValue: 1800,
        },
        {
          id: "q7",
          position: 7,
          title: "Biohazard Cleanup",
          clientName: "Commercial Client",
          location: "Hamilton, QLD",
          distance: 4.9,
          estimatedAssignment: "In 6 days",
          priority: "URGENT",
          serviceType: "Biohazard Cleaning",
          estimatedValue: 5500,
        },
      ]

      setQueueJobs(mockJobs)
    } catch (error) {
      console.error("Failed to fetch queue data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      ROUTINE: "bg-blue-100 text-blue-800",
      URGENT: "bg-amber-100 text-amber-800",
      EMERGENCY: "bg-red-100 text-red-800",
    }
    return <Badge className={colors[priority]}>{priority}</Badge>
  }

  const totalEstimatedValue = queueJobs.reduce((sum, job) => sum + job.estimatedValue, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Clock className="h-8 w-8" />
          Rotation Queue
        </h1>
        <p className="text-muted-foreground mt-1">
          View your position in the job rotation queue
        </p>
      </div>

      {/* Your Position Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Your Queue Position
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Position</p>
              <p className="text-4xl font-bold text-blue-600">#{yourPosition}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated Wait Time</p>
              <p className="text-2xl font-semibold">{estimatedWait}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Queue Progress</span>
              <span className="font-medium">{Math.round((yourPosition / queueJobs.length) * 100)}%</span>
            </div>
            <Progress value={(yourPosition / queueJobs.length) * 100} className="h-2" />
          </div>

          <div className="bg-white rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">How the rotation works</p>
                <p className="text-muted-foreground">
                  Jobs are assigned to contractors based on their position in the rotation queue,
                  coverage area, and availability. Emergency jobs may be assigned out of rotation order.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{queueJobs.length}</div>
            <p className="text-xs text-muted-foreground">Jobs in Queue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              ${totalEstimatedValue.toLocaleString("en-AU")}
            </div>
            <p className="text-xs text-muted-foreground">Total Est. Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {queueJobs.filter((j) => j.priority === "EMERGENCY").length}
            </div>
            <p className="text-xs text-muted-foreground">Emergency Jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* Queue List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Jobs in Queue</CardTitle>
          <CardDescription>
            Jobs that may be assigned to you based on your coverage area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {queueJobs.map((job) => (
              <Card
                key={job.id}
                className={job.position === yourPosition ? "border-blue-300 bg-blue-50/30" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Position Badge */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted font-bold text-lg">
                        #{job.position}
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.serviceType}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(job.priority)}
                            {job.position === yourPosition && (
                              <Badge className="bg-blue-600">Your Turn Next</Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{job.location}</span>
                            <Badge variant="outline" className="ml-auto">{job.distance}km</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Est. Assignment: {job.estimatedAssignment}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div>
                            <p className="text-sm text-muted-foreground">Estimated Value</p>
                            <p className="text-lg font-semibold">
                              ${job.estimatedValue.toLocaleString("en-AU")}
                            </p>
                          </div>
                          {job.position === yourPosition && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="font-medium">Ready for assignment</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            Improve Your Queue Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <span>Complete jobs quickly and professionally to improve your rating</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <span>Keep your availability up to date to receive more assignments</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <span>Upgrade your subscription for priority queue positioning</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <span>Maintain valid IICRC certifications for all service types</span>
            </li>
          </ul>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contractor/schedule/availability">Update Availability</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contractor/subscription">Upgrade Plan</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
