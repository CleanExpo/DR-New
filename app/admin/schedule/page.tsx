"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Calendar as BigCalendar, dateFnsLocalizer, View } from "react-big-calendar"
import { format, parse, startOfWeek, getDay, addDays } from "date-fns"
import { enAU } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { AppointmentDetailsModal } from "@/components/schedule/AppointmentDetailsModal"
import { Appointment } from "@/types/schedule"
import { Calendar, Plus, Filter, RefreshCw } from "lucide-react"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-AU": enAU,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: enAU }),
  getDay,
  locales,
})

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource: Appointment
}

const statusColors: Record<string, string> = {
  SCHEDULED: "#3b82f6",
  IN_PROGRESS: "#eab308",
  COMPLETED: "#22c55e",
  CANCELLED: "#ef4444",
}

export default function AdminSchedulePage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<View>("month")
  const [date, setDate] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [technicianFilter, setTechnicianFilter] = useState<string>("all")
  const [technicians, setTechnicians] = useState<Array<{ id: string; name: string }>>([])
  const { toast } = useToast()

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/schedule")
      if (!response.ok) throw new Error("Failed to fetch appointments")

      const data: Appointment[] = await response.json()
      setAppointments(data)
      setFilteredAppointments(data)

      const uniqueTechs = Array.from(
        new Set(data.map((apt) => apt.technicianId))
      ).map((id) => {
        const apt = data.find((a) => a.technicianId === id)
        return {
          id,
          name: apt?.technician
            ? `${apt.technician.firstName} ${apt.technician.lastName}`
            : "Unknown",
        }
      })
      setTechnicians(uniqueTechs)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  useEffect(() => {
    if (technicianFilter === "all") {
      setFilteredAppointments(appointments)
    } else {
      setFilteredAppointments(
        appointments.filter((apt) => apt.technicianId === technicianFilter)
      )
    }
  }, [technicianFilter, appointments])

  const events: CalendarEvent[] = useMemo(() => {
    return filteredAppointments.map((appointment) => ({
      id: appointment.id,
      title: appointment.workOrder?.title || "Untitled Appointment",
      start: new Date(appointment.scheduledStart),
      end: new Date(appointment.scheduledEnd),
      resource: appointment,
    }))
  }, [filteredAppointments])

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedAppointment(event.resource)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleUpdate = () => {
    fetchAppointments()
  }

  const eventStyleGetter = (event: CalendarEvent) => {
    const backgroundColor = statusColors[event.resource.status] || "#6b7280"
    const style = {
      backgroundColor,
      borderRadius: "4px",
      opacity: event.resource.status === "CANCELLED" ? 0.5 : 1,
      color: "white",
      border: event.resource.isEmergency ? "2px solid #dc2626" : "none",
      display: "block",
    }
    return { style }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="w-8 h-8" />
              Schedule Calendar
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and view all appointments
            </p>
          </div>
          <Button
            onClick={() => router.push("/admin/schedule/new")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Appointment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchAppointments}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Technician</label>
                <Select value={technicianFilter} onValueChange={setTechnicianFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Technicians" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Technicians</SelectItem>
                    {technicians.map((tech) => (
                      <SelectItem key={tech.id} value={tech.id}>
                        {tech.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.SCHEDULED }} />
                  <span>Scheduled</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.IN_PROGRESS }} />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.COMPLETED }} />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.CANCELLED }} />
                  <span>Cancelled</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            style={{ height: 700 }}
            views={["month", "week", "day", "agenda"]}
            formats={{
              dateFormat: "dd",
              dayFormat: (date, culture, localizer) =>
                localizer?.format(date, "EEE dd/MM", culture) ?? "",
              monthHeaderFormat: (date, culture, localizer) =>
                localizer?.format(date, "MMMM yyyy", culture) ?? "",
            }}
            tooltipAccessor={(event) => {
              const apt = event.resource
              return `${event.title}\nStatus: ${apt.status}\nTechnician: ${
                apt.technician
                  ? `${apt.technician.firstName} ${apt.technician.lastName}`
                  : "Unassigned"
              }`
            }}
          />
        )}
      </Card>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        open={modalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />
    </div>
  )
}
