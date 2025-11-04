"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { format, addHours, isSameDay } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { AppointmentDetailsModal } from "@/components/schedule/AppointmentDetailsModal"
import { ScheduleOptimizer } from "@/components/schedule/ScheduleOptimizer"
import { Appointment } from "@/types/schedule"
import { Calendar, Clock, User, MapPin, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"

const timeSlots = Array.from({ length: 9 }, (_, i) => i + 9)

export default function TechnicianSchedulePage() {
  const params = useParams()
  const router = useRouter()
  const technicianId = params.id as string
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [technician, setTechnician] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { toast } = useToast()

  const fetchTechnicianSchedule = async () => {
    setLoading(true)
    try {
      const [scheduleRes, techRes] = await Promise.all([
        fetch(`/api/schedule?technicianId=${technicianId}&date=${date}`),
        fetch(`/api/staff/${technicianId}`),
      ])

      if (scheduleRes.ok) {
        const scheduleData: Appointment[] = await scheduleRes.json()
        const filteredAppointments = scheduleData.filter((apt) =>
          isSameDay(new Date(apt.scheduledStart), new Date(date))
        )
        setAppointments(filteredAppointments)
      }

      if (techRes.ok) {
        const techData = await techRes.json()
        setTechnician(techData)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch technician schedule",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (technicianId && date) {
      fetchTechnicianSchedule()
    }
  }, [technicianId, date])

  const handlePreviousDay = () => {
    const prevDate = new Date(date)
    prevDate.setDate(prevDate.getDate() - 1)
    setDate(format(prevDate, "yyyy-MM-dd"))
  }

  const handleNextDay = () => {
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)
    setDate(format(nextDate, "yyyy-MM-dd"))
  }

  const handleToday = () => {
    setDate(format(new Date(), "yyyy-MM-dd"))
  }

  const getAppointmentAtTime = (hour: number) => {
    return appointments.find((apt) => {
      const aptStart = new Date(apt.scheduledStart)
      const aptHour = aptStart.getHours()
      return aptHour === hour
    })
  }

  const calculateTotalHours = () => {
    return appointments.reduce((total, apt) => {
      const start = new Date(apt.scheduledStart)
      const end = new Date(apt.scheduledEnd)
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      return total + hours
    }, 0)
  }

  const calculateTravelTime = () => {
    return appointments.reduce((total, apt) => total + (apt.travelTime || 0), 0)
  }

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleUpdate = () => {
    fetchTechnicianSchedule()
  }

  const statusColors = {
    SCHEDULED: "bg-blue-500",
    IN_PROGRESS: "bg-yellow-500",
    COMPLETED: "bg-green-500",
    CANCELLED: "bg-red-500",
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Calendar
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <User className="w-8 h-8" />
              Technician Schedule
            </h1>
            {technician && (
              <p className="text-muted-foreground mt-1">
                {technician.firstName} {technician.lastName} - {technician.email}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTechnicianSchedule}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateTotalHours().toFixed(1)}h</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Travel Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateTravelTime()}m</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Emergency Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter((apt) => apt.isEmergency).length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Daily Schedule
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handlePreviousDay}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleToday}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextDay}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                {format(new Date(date), "EEEE, dd/MM/yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-2">
                  {timeSlots.map((hour) => {
                    const appointment = getAppointmentAtTime(hour)
                    const timeLabel = `${hour}:00 - ${hour + 1}:00`

                    return (
                      <div
                        key={hour}
                        className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-[140px]">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{timeLabel}</span>
                        </div>

                        {appointment ? (
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">
                                    {appointment.workOrder?.title || "Untitled"}
                                  </h4>
                                  <Badge className={statusColors[appointment.status]}>
                                    {appointment.status}
                                  </Badge>
                                  {appointment.isEmergency && (
                                    <Badge variant="destructive">Emergency</Badge>
                                  )}
                                </div>
                                {appointment.workOrder?.client && (
                                  <p className="text-sm text-muted-foreground">
                                    Client: {appointment.workOrder.client.firstName}{" "}
                                    {appointment.workOrder.client.lastName}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span>
                                    {format(new Date(appointment.scheduledStart), "HH:mm")} -{" "}
                                    {format(new Date(appointment.scheduledEnd), "HH:mm")}
                                  </span>
                                  {appointment.travelTime && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {appointment.travelTime}m travel
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 text-sm text-muted-foreground italic">
                            Available
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <ScheduleOptimizer
            technicianId={technicianId}
            date={date}
            onOptimized={handleUpdate}
          />
        </div>
      </div>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        open={modalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />
    </div>
  )
}
