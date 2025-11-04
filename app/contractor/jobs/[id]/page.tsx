"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { JobStatusBadge } from "@/components/contractor/JobStatusBadge"
import {
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  FileText,
  Upload,
  CheckCircle,
  ArrowLeft,
  DollarSign,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

type JobStatus = "ASSIGNED" | "IN_PROGRESS" | "COMPLETED"

interface JobDetails {
  id: string
  title: string
  description: string
  clientName: string
  clientPhone: string
  clientEmail: string
  location: string
  scheduledDate: string
  scheduledTime: string
  status: JobStatus
  priority: string
  serviceType: string
  estimatedDuration: string
  amount: number
  specialInstructions?: string
  equipmentNeeded: string[]
  notes: string[]
  photos: string[]
}

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [job, setJob] = useState<JobDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  useEffect(() => {
    if (params?.id) {
      fetchJobDetails(params.id as string)
    }
  }, [params?.id])

  const fetchJobDetails = async (jobId: string) => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/jobs/${jobId}`)
      // const data = await response.json()

      // Mock data
      const mockJob: JobDetails = {
        id: jobId,
        title: "Water Damage - Kitchen Flood",
        description: "Major water damage in kitchen due to burst pipe under sink. Water has spread to adjacent dining area. Client requires immediate extraction and drying services.",
        clientName: "Sarah Johnson",
        clientPhone: "0412 345 678",
        clientEmail: "sarah.johnson@email.com",
        location: "42 Melbourne St, Ascot, QLD 4007",
        scheduledDate: "2025-11-05",
        scheduledTime: "09:00 AM",
        status: "ASSIGNED",
        priority: "URGENT",
        serviceType: "Water Damage Restoration",
        estimatedDuration: "3-4 hours",
        amount: 1200,
        specialInstructions: "Client has two dogs. Please ensure all doors are closed when entering/exiting. Parking available in driveway.",
        equipmentNeeded: [
          "Industrial water extraction unit",
          "Commercial dehumidifiers (x2)",
          "Air movers (x4)",
          "Moisture meters",
          "Personal protective equipment",
        ],
        notes: [
          "Initial assessment completed - 15m² affected area",
          "Insurance claim lodged with RACQ - Claim #12345",
        ],
        photos: [],
      }

      setJob(mockJob)
    } catch (error) {
      console.error("Failed to fetch job details:", error)
      toast({
        title: "Error",
        description: "Failed to load job details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    try {
      // TODO: API call to add note
      setJob((prev) => prev ? {
        ...prev,
        notes: [...prev.notes, newNote],
      } : null)
      setNewNote("")
      toast({
        title: "Note added",
        description: "Your note has been saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add note",
        variant: "destructive",
      })
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingPhoto(true)
    try {
      // TODO: Upload to server/cloud storage
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Photos uploaded",
        description: `${files.length} photo(s) uploaded successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload photos",
        variant: "destructive",
      })
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleUpdateStatus = async (newStatus: JobStatus) => {
    try {
      // TODO: API call to update status
      setJob((prev) => prev ? { ...prev, status: newStatus } : null)

      toast({
        title: "Status updated",
        description: `Job marked as ${newStatus.toLowerCase().replace("_", " ")}`,
      })

      if (newStatus === "COMPLETED") {
        router.push(`/contractor/earnings/invoices?job=${job?.id}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-muted-foreground">Loading job details...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-4">Job not found</p>
        <Button asChild>
          <Link href="/contractor/jobs">Back to Jobs</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/contractor/jobs">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground">{job.serviceType}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-100 text-amber-800">{job.priority}</Badge>
          <JobStatusBadge status={job.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Scheduled Date</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {new Date(job.scheduledDate).toLocaleDateString("en-AU", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Time</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {job.scheduledTime} ({job.estimatedDuration})
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{job.location}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Job Value</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-lg">
                      ${job.amount.toLocaleString("en-AU")}
                    </span>
                  </div>
                </div>
              </div>

              {job.specialInstructions && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-900 mb-1">Special Instructions</h4>
                      <p className="text-sm text-amber-800">{job.specialInstructions}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Equipment Needed */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment & Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.equipmentNeeded.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Job Notes</CardTitle>
              <CardDescription>Add notes and observations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {job.notes.map((note, index) => (
                <div key={index} className="bg-muted rounded-lg p-3">
                  <p className="text-sm">{note}</p>
                </div>
              ))}
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a new note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddNote} size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>Upload job site photos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {job.photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {job.photos.map((photo, index) => (
                      <div key={index} className="aspect-square bg-muted rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No photos uploaded yet</p>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    disabled={uploadingPhoto}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Label htmlFor="photo-upload">
                    <Button
                      variant="outline"
                      disabled={uploadingPhoto}
                      asChild
                    >
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadingPhoto ? "Uploading..." : "Upload Photos"}
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Name</Label>
                <p className="font-medium">{job.clientName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Phone</Label>
                <a
                  href={`tel:${job.clientPhone}`}
                  className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {job.clientPhone}
                </a>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <a
                  href={`mailto:${job.clientEmail}`}
                  className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {job.clientEmail}
                </a>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    job.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Open in Maps
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Job Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {job.status === "ASSIGNED" && (
                <>
                  <Button
                    onClick={() => handleUpdateStatus("IN_PROGRESS")}
                    className="w-full"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Start Job
                  </Button>
                  <Button variant="outline" className="w-full">
                    Decline Job
                  </Button>
                </>
              )}
              {job.status === "IN_PROGRESS" && (
                <Button
                  onClick={() => handleUpdateStatus("COMPLETED")}
                  className="w-full"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              )}
              {job.status === "COMPLETED" && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/contractor/earnings/invoices?job=${job.id}`}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
