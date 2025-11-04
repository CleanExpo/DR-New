export interface Appointment {
  id: string
  workOrderId: string
  technicianId: string
  scheduledStart: Date
  scheduledEnd: Date
  actualStart?: Date | null
  actualEnd?: Date | null
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  travelTime?: number
  isEmergency: boolean
  notes?: string | null
  createdAt: Date
  updatedAt: Date
  
  // Related data
  workOrder?: {
    id: string
    title: string
    description: string
    priority: string
    client?: {
      id: string
      firstName: string
      lastName: string
      email: string
      phone?: string
    }
  }
  technician?: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string
  }
}

export interface TimeSlot {
  start: Date
  end: Date
  available: boolean
}

export interface AvailabilityResponse {
  technicianId: string
  date: string
  availableSlots: TimeSlot[]
  bookedAppointments: Appointment[]
}

export interface OptimizeScheduleRequest {
  technicianId: string
  date: string
}

export interface OptimizedRoute {
  appointments: Array<{
    appointmentId: string
    order: number
    suggestedStart: Date
    suggestedEnd: Date
    travelTimeToPrevious: number
  }>
  totalTravelTime: number
  totalWorkTime: number
}
