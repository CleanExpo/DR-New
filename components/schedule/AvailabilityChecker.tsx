"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { AvailabilityResponse, TimeSlot } from "@/types/schedule"
import { Clock, CheckCircle, XCircle } from "lucide-react"

interface AvailabilityCheckerProps {
  technicianId?: string
  onTechnicianChange?: (technicianId: string) => void
  onDateChange?: (date: string) => void
}

export function AvailabilityChecker({
  technicianId: initialTechnicianId = "",
  onTechnicianChange,
  onDateChange,
}: AvailabilityCheckerProps) {
  const [technicianId, setTechnicianId] = useState(initialTechnicianId)
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchAvailability = async () => {
    if (!technicianId || !date) {
      toast({
        title: "Missing Information",
        description: "Please provide both technician ID and date",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/schedule/availability?technicianId=${technicianId}&date=${date}`
      )

      if (!response.ok) throw new Error("Failed to fetch availability")

      const data: AvailabilityResponse = await response.json()
      setAvailability(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch availability data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (technicianId && date) {
      fetchAvailability()
    }
  }, [technicianId, date])

  const handleTechnicianChange = (value: string) => {
    setTechnicianId(value)
    onTechnicianChange?.(value)
  }

  const handleDateChange = (value: string) => {
    setDate(value)
    onDateChange?.(value)
  }

  const formatTime = (dateString: string | Date) => {
    return format(new Date(dateString), "HH:mm")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Availability Checker
        </CardTitle>
        <CardDescription>
          Check technician availability for a specific date
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="technician-id">Technician ID</Label>
            <Input
              id="technician-id"
              placeholder="Enter technician ID"
              value={technicianId}
              onChange={(e) => handleTechnicianChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={fetchAvailability} disabled={loading || !technicianId || !date}>
          {loading ? "Checking..." : "Check Availability"}
        </Button>

        {availability && (
          <div className="space-y-4 mt-6">
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3">
                Available Time Slots ({format(new Date(availability.date), "dd/MM/yyyy")})
              </h4>
              {availability.availableSlots.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No available time slots for this date
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availability.availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-md bg-green-50 border border-green-200"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        {formatTime(slot.start)} - {formatTime(slot.end)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3">
                Booked Appointments ({availability.bookedAppointments.length})
              </h4>
              {availability.bookedAppointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No booked appointments for this date
                </p>
              ) : (
                <div className="space-y-2">
                  {availability.bookedAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center gap-2 p-3 rounded-md bg-red-50 border border-red-200"
                    >
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {formatTime(appointment.scheduledStart)} -{" "}
                            {formatTime(appointment.scheduledEnd)}
                          </span>
                          {appointment.isEmergency && (
                            <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">
                              Emergency
                            </span>
                          )}
                        </div>
                        {appointment.workOrder && (
                          <p className="text-xs text-muted-foreground truncate">
                            {appointment.workOrder.title}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Available Slots:</span>
                <span className="font-medium">{availability.availableSlots.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Total Booked:</span>
                <span className="font-medium">{availability.bookedAppointments.length}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
