"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Appointment } from "@/types/schedule"
import { Calendar, Clock, User, Phone, Mail, AlertCircle, MapPin } from "lucide-react"

interface AppointmentDetailsModalProps {
  appointment: Appointment | null
  open: boolean
  onClose: () => void
  onUpdate: () => void
}

const statusColors = {
  SCHEDULED: "bg-blue-500",
  IN_PROGRESS: "bg-yellow-500",
  COMPLETED: "bg-green-500",
  CANCELLED: "bg-red-500",
}

export function AppointmentDetailsModal({
  appointment,
  open,
  onClose,
  onUpdate,
}: AppointmentDetailsModalProps) {
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState<string>("")
  const { toast } = useToast()

  if (!appointment) return null

  const handleStatusUpdate = async () => {
    if (!newStatus) return

    setUpdating(true)
    try {
      const response = await fetch(`/api/schedule/appointments/${appointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      toast({
        title: "Status Updated",
        description: `Appointment status changed to ${newStatus}`,
      })
      onUpdate()
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment status",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return

    setUpdating(true)
    try {
      const response = await fetch(`/api/schedule/appointments/${appointment.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to cancel appointment")

      toast({
        title: "Appointment Cancelled",
        description: "The appointment has been cancelled successfully",
      })
      onUpdate()
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Appointment Details
            {appointment.isEmergency && (
              <Badge variant="destructive" className="ml-2">
                <AlertCircle className="w-3 h-3 mr-1" />
                Emergency
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            View and manage appointment information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge className={statusColors[appointment.status]}>
              {appointment.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Scheduled Start
              </h4>
              <p className="text-sm text-muted-foreground">
                {format(new Date(appointment.scheduledStart), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Scheduled End
              </h4>
              <p className="text-sm text-muted-foreground">
                {format(new Date(appointment.scheduledEnd), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
          </div>

          {(appointment.actualStart || appointment.actualEnd) && (
            <div className="grid grid-cols-2 gap-4">
              {appointment.actualStart && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Actual Start</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(appointment.actualStart), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
              )}
              {appointment.actualEnd && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Actual End</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(appointment.actualEnd), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
              )}
            </div>
          )}

          {appointment.workOrder && (
            <div className="space-y-2 border-t pt-4">
              <h4 className="text-sm font-medium">Work Order</h4>
              <div className="space-y-1">
                <p className="text-sm font-medium">{appointment.workOrder.title}</p>
                <p className="text-sm text-muted-foreground">
                  {appointment.workOrder.description}
                </p>
                <Badge variant="outline">{appointment.workOrder.priority}</Badge>
              </div>
            </div>
          )}

          {appointment.workOrder?.client && (
            <div className="space-y-2 border-t pt-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Client Information
              </h4>
              <div className="space-y-1">
                <p className="text-sm">
                  {appointment.workOrder.client.firstName}{" "}
                  {appointment.workOrder.client.lastName}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  {appointment.workOrder.client.email}
                </div>
                {appointment.workOrder.client.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    {appointment.workOrder.client.phone}
                  </div>
                )}
              </div>
            </div>
          )}

          {appointment.technician && (
            <div className="space-y-2 border-t pt-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Assigned Technician
              </h4>
              <div className="space-y-1">
                <p className="text-sm">
                  {appointment.technician.firstName} {appointment.technician.lastName}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  {appointment.technician.email}
                </div>
                {appointment.technician.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    {appointment.technician.phone}
                  </div>
                )}
              </div>
            </div>
          )}

          {appointment.travelTime && (
            <div className="space-y-2 border-t pt-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Travel Time
              </h4>
              <p className="text-sm text-muted-foreground">
                {appointment.travelTime} minutes
              </p>
            </div>
          )}

          {appointment.notes && (
            <div className="space-y-2 border-t pt-4">
              <h4 className="text-sm font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {appointment.notes}
              </p>
            </div>
          )}

          <div className="space-y-2 border-t pt-4">
            <h4 className="text-sm font-medium">Update Status</h4>
            <div className="flex gap-2">
              <Select onValueChange={setNewStatus} defaultValue={appointment.status}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusUpdate} disabled={updating || !newStatus}>
                Update
              </Button>
            </div>
          </div>

          <div className="flex gap-2 border-t pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={updating || appointment.status === "CANCELLED"}
              className="flex-1"
            >
              Cancel Appointment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
