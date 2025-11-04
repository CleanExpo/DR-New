"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { JobStatusBadge } from "@/components/contractor/JobStatusBadge"
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Phone,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react"
import Link from "next/link"

type JobStatus = "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
type JobPriority = "ROUTINE" | "URGENT" | "EMERGENCY"

interface Job {
  id: string
  title: string
  clientName: string
  clientPhone: string
  location: string
  suburb: string
  distance: number
  scheduledDate: string
  scheduledTime: string
  status: JobStatus
  priority: JobPriority
  serviceType: string
  estimatedDuration: string
  amount: number
}

export default function MyJobsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = jobs

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((job) => job.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((job) => job.priority === priorityFilter)
    }

    setFilteredJobs(filtered)
  }, [jobs, searchQuery, statusFilter, priorityFilter])

  useEffect(() => {
    // Set initial filter from URL params
    const status = searchParams?.get("status")
    if (status === "active") {
      setStatusFilter("ASSIGNED")
    } else if (status === "completed") {
      setStatusFilter("COMPLETED")
    }
  }, [searchParams])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/jobs?technicianId=contractor-1')
      // const data = await response.json()

      // Mock data
      const mockJobs: Job[] = [
        {
          id: "1",
          title: "Water Damage - Kitchen Flood",
          clientName: "Sarah Johnson",
          clientPhone: "0412 345 678",
          location: "42 Melbourne St, Ascot, QLD 4007",
          suburb: "Ascot",
          distance: 5.2,
          scheduledDate: "2025-11-05",
          scheduledTime: "09:00 AM",
          status: "ASSIGNED",
          priority: "URGENT",
          serviceType: "Water Damage Restoration",
          estimatedDuration: "3-4 hours",
          amount: 1200,
        },
        {
          id: "2",
          title: "Fire Restoration - Living Room",
          clientName: "Michael Brown",
          clientPhone: "0423 456 789",
          location: "15 James St, New Farm, QLD 4005",
          suburb: "New Farm",
          distance: 3.8,
          scheduledDate: "2025-11-06",
          scheduledTime: "01:00 PM",
          status: "ASSIGNED",
          priority: "EMERGENCY",
          serviceType: "Fire & Smoke Restoration",
          estimatedDuration: "Full day",
          amount: 3500,
        },
        {
          id: "3",
          title: "Mould Inspection & Remediation",
          clientName: "Emma Wilson",
          clientPhone: "0434 567 890",
          location: "88 Sylvan Rd, Toowong, QLD 4066",
          suburb: "Toowong",
          distance: 7.1,
          scheduledDate: "2025-11-04",
          scheduledTime: "10:00 AM",
          status: "IN_PROGRESS",
          priority: "ROUTINE",
          serviceType: "Mould Remediation",
          estimatedDuration: "2-3 hours",
          amount: 850,
        },
        {
          id: "4",
          title: "Storm Damage Assessment",
          clientName: "James Taylor",
          clientPhone: "0445 678 901",
          location: "32 Station Rd, Indooroopilly, QLD 4068",
          suburb: "Indooroopilly",
          distance: 9.5,
          scheduledDate: "2025-11-02",
          scheduledTime: "08:00 AM",
          status: "COMPLETED",
          priority: "URGENT",
          serviceType: "Storm Damage",
          estimatedDuration: "2 hours",
          amount: 650,
        },
        {
          id: "5",
          title: "Water Extraction - Basement",
          clientName: "Lisa Anderson",
          clientPhone: "0456 789 012",
          location: "67 Kingsford Smith Dr, Hamilton, QLD 4007",
          suburb: "Hamilton",
          distance: 4.3,
          scheduledDate: "2025-10-31",
          scheduledTime: "11:00 AM",
          status: "COMPLETED",
          priority: "EMERGENCY",
          serviceType: "Water Damage Restoration",
          estimatedDuration: "4-5 hours",
          amount: 1800,
        },
      ]

      setJobs(mockJobs)
      setFilteredJobs(mockJobs)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptJob = async (jobId: string) => {
    // TODO: Implement accept job logic
    console.log("Accept job:", jobId)
  }

  const handleDeclineJob = async (jobId: string) => {
    // TODO: Implement decline job logic
    console.log("Decline job:", jobId)
  }

  const handleCompleteJob = async (jobId: string) => {
    // TODO: Implement complete job logic
    router.push(`/contractor/jobs/${jobId}?action=complete`)
  }

  const getPriorityBadge = (priority: JobPriority) => {
    const variants: Record<JobPriority, { color: string; label: string }> = {
      ROUTINE: { color: "bg-blue-100 text-blue-800", label: "Routine" },
      URGENT: { color: "bg-amber-100 text-amber-800", label: "Urgent" },
      EMERGENCY: { color: "bg-red-100 text-red-800", label: "Emergency" },
    }
    const variant = variants[priority]
    return <Badge className={variant.color}>{variant.label}</Badge>
  }

  const getJobActions = (job: Job) => {
    switch (job.status) {
      case "ASSIGNED":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAcceptJob(job.id)}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDeclineJob(job.id)}
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-1" />
              Decline
            </Button>
          </div>
        )
      case "IN_PROGRESS":
        return (
          <Button
            size="sm"
            onClick={() => handleCompleteJob(job.id)}
            className="w-full"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark Complete
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Briefcase className="h-8 w-8" />
          My Jobs
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your assigned jobs and view history
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="ASSIGNED">Assigned</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="ROUTINE">Routine</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
                <SelectItem value="EMERGENCY">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{jobs.filter(j => j.status === "ASSIGNED").length}</div>
            <p className="text-xs text-muted-foreground">Assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{jobs.filter(j => j.status === "IN_PROGRESS").length}</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{jobs.filter(j => j.status === "COMPLETED").length}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">In Queue</p>
          </CardContent>
        </Card>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Loading jobs...</p>
            </CardContent>
          </Card>
        ) : filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No jobs found</p>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.serviceType}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(job.priority)}
                        <JobStatusBadge status={job.status} />
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                        <Badge variant="outline" className="ml-auto">{job.distance}km</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(job.scheduledDate).toLocaleDateString("en-AU", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                        <span>{job.scheduledTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{job.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Est. {job.estimatedDuration}</span>
                        <Badge variant="outline" className="ml-auto">
                          ${job.amount.toLocaleString("en-AU")}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:w-48">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <Link href={`/contractor/jobs/${job.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Link>
                    </Button>
                    {getJobActions(job)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Rotation Queue Link */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Rotation Queue</h3>
              <p className="text-sm text-muted-foreground">
                You have 7 jobs in the rotation queue. Current position: #3
              </p>
            </div>
            <Button asChild>
              <Link href="/contractor/jobs/queue">View Queue</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
