"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { OptimizedRoute } from "@/types/schedule"
import { Route, Clock, TrendingUp, CheckCircle } from "lucide-react"

interface ScheduleOptimizerProps {
  technicianId: string
  date: string
  onOptimized?: () => void
}

export function ScheduleOptimizer({
  technicianId,
  date,
  onOptimized,
}: ScheduleOptimizerProps) {
  const [optimizing, setOptimizing] = useState(false)
  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedRoute | null>(null)
  const [applied, setApplied] = useState(false)
  const { toast } = useToast()

  const optimizeSchedule = async () => {
    if (!technicianId || !date) {
      toast({
        title: "Missing Information",
        description: "Technician ID and date are required",
        variant: "destructive",
      })
      return
    }

    setOptimizing(true)
    try {
      const response = await fetch("/api/schedule/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technicianId, date }),
      })

      if (!response.ok) throw new Error("Failed to optimize schedule")

      const data: OptimizedRoute = await response.json()
      setOptimizedRoute(data)
      setApplied(false)

      toast({
        title: "Schedule Optimized",
        description: `Found optimized route with ${data.appointments.length} appointments`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize schedule",
        variant: "destructive",
      })
    } finally {
      setOptimizing(false)
    }
  }

  const applyOptimizedSchedule = async () => {
    if (!optimizedRoute) return

    setOptimizing(true)
    try {
      const updatePromises = optimizedRoute.appointments.map((apt) =>
        fetch(`/api/schedule/appointments/${apt.appointmentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            scheduledStart: apt.suggestedStart,
            scheduledEnd: apt.suggestedEnd,
            travelTime: apt.travelTimeToPrevious,
          }),
        })
      )

      await Promise.all(updatePromises)

      setApplied(true)
      toast({
        title: "Schedule Updated",
        description: "Optimized schedule has been applied successfully",
      })
      onOptimized?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply optimized schedule",
        variant: "destructive",
      })
    } finally {
      setOptimizing(false)
    }
  }

  const formatTime = (dateString: string | Date) => {
    return format(new Date(dateString), "HH:mm")
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="w-5 h-5" />
          Schedule Optimizer
        </CardTitle>
        <CardDescription>
          Optimize technician route to minimize travel time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={optimizeSchedule} disabled={optimizing || !technicianId || !date}>
            {optimizing ? "Optimizing..." : "Optimize Schedule"}
          </Button>
          {optimizedRoute && !applied && (
            <Button
              onClick={applyOptimizedSchedule}
              disabled={optimizing}
              variant="default"
            >
              Apply Optimized Schedule
            </Button>
          )}
          {applied && (
            <Badge className="bg-green-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              Applied
            </Badge>
          )}
        </div>

        {optimizedRoute && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Total Travel Time
                </div>
                <p className="text-2xl font-bold">
                  {formatDuration(optimizedRoute.totalTravelTime)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  Total Work Time
                </div>
                <p className="text-2xl font-bold">
                  {formatDuration(optimizedRoute.totalWorkTime)}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3">
                Optimized Route ({optimizedRoute.appointments.length} appointments)
              </h4>
              <div className="space-y-2">
                {optimizedRoute.appointments.map((appointment, index) => (
                  <div
                    key={appointment.appointmentId}
                    className="relative p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {appointment.order}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {formatTime(appointment.suggestedStart)} -{" "}
                            {formatTime(appointment.suggestedEnd)}
                          </span>
                          <Badge variant="outline">
                            Appointment {appointment.order}
                          </Badge>
                        </div>
                        {appointment.travelTimeToPrevious > 0 && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatDuration(appointment.travelTimeToPrevious)} travel time from previous
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {index < optimizedRoute.appointments.length - 1 && (
                      <div className="absolute left-[15px] top-[48px] bottom-[-8px] w-0.5 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Appointments:</span>
                  <span className="font-medium">{optimizedRoute.appointments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Travel Time:</span>
                  <span className="font-medium">
                    {optimizedRoute.appointments.length > 0
                      ? formatDuration(
                          Math.round(optimizedRoute.totalTravelTime / optimizedRoute.appointments.length)
                        )
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Efficiency Rating:</span>
                  <span className="font-medium">
                    {optimizedRoute.totalWorkTime > 0
                      ? Math.round(
                          (optimizedRoute.totalWorkTime /
                            (optimizedRoute.totalWorkTime + optimizedRoute.totalTravelTime)) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </div>

            {!applied && (
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Review the optimized route above and click &quot;Apply Optimized Schedule&quot; to update all
                  appointments with the suggested times.
                </p>
              </div>
            )}
          </div>
        )}

        {!optimizedRoute && (
          <div className="text-center py-8 text-muted-foreground">
            <Route className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Click &quot;Optimize Schedule&quot; to generate an optimized route</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
