"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Calendar as BigCalendar, dateFnsLocalizer, View } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
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
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, RefreshCw, MapPin, Route } from "lucide-react"
import Link from "next/link"
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

interface Appointment {
  id: string
  title: string
  start: Date
  end: Date
  status: "ASSIGNED" | "IN_PROGRESS" | "COMPLETED"
  location: string
  clientName: string
  priority: "ROUTINE" | "URGENT" | "EMERGENCY"
}

const statusColors: Record<string, string> = {
  ASSIGNED: "#3b82f6",
  IN_PROGRESS: "#eab308",
  COMPLETED: "#22c55e",
}

export default function ContractorSchedulePage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<View>("month")
  const [date, setDate] = useState(new Date())
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchSchedule()
  }, [])

  const fetchSchedule = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/schedule?technicianId=contractor-1')
      // const data = await response.json()

      // Mock data
      const mockAppointments: Appointment[] = [
        {
          id: "1",
          title: "Water Damage - Kitchen Flood",
          start: new Date(2025, 10, 5, 9, 0),
          end: new Date(2025, 10, 5, 13, 0),
          status: "ASSIGNED",
          location: "Ascot, QLD",
          clientName: "Sarah Johnson",
          priority: "URGENT",
        },
        {
          id: "2",
          title: "Fire Restoration - Living Room",
          start: new Date(2025, 10, 6, 13, 0),
          end: new Date(2025, 10, 6, 17, 0),
          status: "ASSIGNED",
          location: "New Farm, QLD",
          clientName: "Michael Brown",
          priority: "EMERGENCY",
        },
        {
          id: "3",
          title: "Mould Inspection",
          start: new Date(2025, 10, 4, 10, 0),
          end: new Date(2025, 10, 4, 13, 0),
          status: "IN_PROGRESS",
          location: "Toowong, QLD",
          clientName: "Emma Wilson",
          priority: "ROUTINE",
        },
        {
          id: "4",
          title: "Storm Damage Assessment",
          start: new Date(2025, 10, 2, 8, 0),
          end: new Date(2025, 10, 2, 10, 0),
          status: "COMPLETED",
          location: "Indooroopilly, QLD",
          clientName: "James Taylor",
          priority: "URGENT",
        },
        {
          id: "5",
          title: "Water Extraction",
          start: new Date(2025, 9, 31, 11, 0),
          end: new Date(2025, 9, 31, 16, 0),
          status: "COMPLETED",
          location: "Hamilton, QLD",
          clientName: "Lisa Anderson",
          priority: "EMERGENCY",
        },
      ]

      setAppointments(mockAppointments)
    } catch (error) {
      console.error("Failed to fetch schedule:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAppointments = useMemo(() => {
    if (statusFilter === "all") return appointments
    return appointments.filter((apt) => apt.status === statusFilter)
  }, [appointments, statusFilter])

  const handleSelectEvent = (event: Appointment) => {
    router.push(`/contractor/jobs/${event.id}`)
  }

  const eventStyleGetter = (event: Appointment) => {
    const backgroundColor = statusColors[event.status] || "#6b7280"
    const style = {
      backgroundColor,
      borderRadius: "4px",
      opacity: event.status === "COMPLETED" ? 0.7 : 1,
      color: "white",
      border: event.priority === "EMERGENCY" ? "2px solid #dc2626" : "none",
      display: "block",
    }
    return { style }
  }

  const getTodayAppointments = () => {
    const today = new Date()
    return appointments.filter(
      (apt) =>
        apt.start.toDateString() === today.toDateString() &&
        apt.status !== "COMPLETED"
    )
  }

  const todayAppointments = getTodayAppointments()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calendar className="h-8 w-8" />
          My Schedule
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage your appointments
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Today's Appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {appointments.filter((a) => a.status === "ASSIGNED").length}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {appointments.filter((a) => a.status === "IN_PROGRESS").length}
            </div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {appointments.filter((a) => a.status === "COMPLETED").length}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      {todayAppointments.length > 0 && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contractor/schedule/optimize">
                  <Route className="h-4 w-4 mr-2" />
                  Optimize Route
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border cursor-pointer hover:border-blue-300"
                  onClick={() => handleSelectEvent(apt)}
                >
                  <div>
                    <h4 className="font-medium">{apt.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>
                        {format(apt.start, "h:mm a")} - {format(apt.end, "h:mm a")}
                      </span>
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      <span>{apt.location}</span>
                    </div>
                  </div>
                  <Badge className={statusColors[apt.status] ? "bg-blue-600" : ""}>
                    {apt.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSchedule}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="ASSIGNED">Assigned</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 md:col-span-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link href="/contractor/schedule/availability">
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Availability
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.ASSIGNED }} />
              <span>Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.IN_PROGRESS }} />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.COMPLETED }} />
              <span>Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <BigCalendar
            localizer={localizer}
            events={filteredAppointments}
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
              return `${event.title}\nClient: ${event.clientName}\nLocation: ${event.location}`
            }}
          />
        )}
      </Card>
    </div>
  )
}
