"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { AvailabilityChecker } from "@/components/schedule/AvailabilityChecker"
import { Plus, Calendar, AlertTriangle, CheckCircle } from "lucide-react"

const appointmentSchema = z.object({
  workOrderId: z.string().min(1, "Work order is required"),
  technicianId: z.string().min(1, "Technician is required"),
  scheduledStart: z.string().min(1, "Start date/time is required"),
  scheduledEnd: z.string().min(1, "End date/time is required"),
  travelTime: z.number().min(0).optional(),
  isEmergency: z.boolean().default(false),
  notes: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

interface WorkOrder {
  id: string
  title: string
  description: string
  priority: string
}

interface Technician {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default function CreateAppointmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [technicians, setTechnicians] = useState<Technician[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [conflictWarning, setConflictWarning] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTechnicianId, setSelectedTechnicianId] = useState("")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      isEmergency: false,
      travelTime: 0,
    },
  })

  const watchedStart = watch("scheduledStart")
  const watchedEnd = watch("scheduledEnd")
  const watchedTechnician = watch("technicianId")

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true)
      try {
        const [workOrdersRes, techniciansRes] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/staff"),
        ])

        if (workOrdersRes.ok) {
          const workOrdersData = await workOrdersRes.json()
          setWorkOrders(workOrdersData)
        }

        if (techniciansRes.ok) {
          const techniciansData = await workOrdersRes.json()
          setTechnicians(techniciansData)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        })
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (watchedStart && watchedEnd && watchedTechnician) {
      checkAvailability()
    }
  }, [watchedStart, watchedEnd, watchedTechnician])

  const checkAvailability = async () => {
    if (!watchedStart || !watchedEnd || !watchedTechnician) return

    try {
      const date = format(new Date(watchedStart), "yyyy-MM-dd")
      const response = await fetch(
        `/api/schedule/availability?technicianId=${watchedTechnician}&date=${date}`
      )

      if (response.ok) {
        const data = await response.json()
        const startTime = new Date(watchedStart)
        const endTime = new Date(watchedEnd)

        const hasConflict = data.bookedAppointments.some((apt: any) => {
          const aptStart = new Date(apt.scheduledStart)
          const aptEnd = new Date(apt.scheduledEnd)
          return (
            (startTime >= aptStart && startTime < aptEnd) ||
            (endTime > aptStart && endTime <= aptEnd) ||
            (startTime <= aptStart && endTime >= aptEnd)
          )
        })

        if (hasConflict) {
          setConflictWarning("Warning: This time slot conflicts with an existing appointment!")
        } else {
          setConflictWarning("")
        }
      }
    } catch (error) {
      console.error("Error checking availability:", error)
    }
  }

  const calculateDuration = () => {
    if (watchedStart && watchedEnd) {
      const start = new Date(watchedStart)
      const end = new Date(watchedEnd)
      const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60)
      return durationMinutes > 0 ? Math.round(durationMinutes) : 0
    }
    return 0
  }

  const onSubmit = async (data: AppointmentFormData) => {
    if (conflictWarning && !window.confirm("There is a scheduling conflict. Do you want to proceed anyway?")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to create appointment")

      toast({
        title: "Success",
        description: "Appointment created successfully",
      })
      router.push("/admin/schedule")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create appointment",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Plus className="w-8 h-8" />
          Create New Appointment
        </h1>
        <p className="text-muted-foreground mt-1">
          Schedule a new appointment for a work order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>
                Fill in the appointment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="workOrderId">Work Order *</Label>
                  <Select
                    onValueChange={(value) => setValue("workOrderId", value)}
                    disabled={loadingData}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select work order" />
                    </SelectTrigger>
                    <SelectContent>
                      {workOrders.map((wo) => (
                        <SelectItem key={wo.id} value={wo.id}>
                          {wo.title} - {wo.priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.workOrderId && (
                    <p className="text-sm text-red-500">{errors.workOrderId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technicianId">Technician *</Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("technicianId", value)
                      setSelectedTechnicianId(value)
                    }}
                    disabled={loadingData}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicians.map((tech) => (
                        <SelectItem key={tech.id} value={tech.id}>
                          {tech.firstName} {tech.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.technicianId && (
                    <p className="text-sm text-red-500">{errors.technicianId.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduledStart">Scheduled Start *</Label>
                    <Input
                      id="scheduledStart"
                      type="datetime-local"
                      {...register("scheduledStart")}
                      onChange={(e) => {
                        setValue("scheduledStart", e.target.value)
                        setSelectedDate(e.target.value.split("T")[0])
                      }}
                    />
                    {errors.scheduledStart && (
                      <p className="text-sm text-red-500">{errors.scheduledStart.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduledEnd">Scheduled End *</Label>
                    <Input
                      id="scheduledEnd"
                      type="datetime-local"
                      {...register("scheduledEnd")}
                    />
                    {errors.scheduledEnd && (
                      <p className="text-sm text-red-500">{errors.scheduledEnd.message}</p>
                    )}
                  </div>
                </div>

                {watchedStart && watchedEnd && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Duration:</span>
                      <span>{calculateDuration()} minutes</span>
                    </div>
                  </div>
                )}

                {conflictWarning && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{conflictWarning}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="travelTime">Estimated Travel Time (minutes)</Label>
                  <Input
                    id="travelTime"
                    type="number"
                    min="0"
                    {...register("travelTime", { valueAsNumber: true })}
                  />
                  {errors.travelTime && (
                    <p className="text-sm text-red-500">{errors.travelTime.message}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isEmergency"
                    onCheckedChange={(checked) => setValue("isEmergency", checked as boolean)}
                  />
                  <Label
                    htmlFor="isEmergency"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark as emergency appointment
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes for this appointment..."
                    {...register("notes")}
                  />
                  {errors.notes && (
                    <p className="text-sm text-red-500">{errors.notes.message}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? (
                      "Creating..."
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Create Appointment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <AvailabilityChecker
            technicianId={selectedTechnicianId}
            onTechnicianChange={setSelectedTechnicianId}
            onDateChange={setSelectedDate}
          />
        </div>
      </div>
    </div>
  )
}
