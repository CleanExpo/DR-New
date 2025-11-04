// Job Management Types for NRPG Platform CRM

export type JobStatus = 'DRAFT' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type JobPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'EMERGENCY';
export type ServiceType =
  | 'WATER_DAMAGE'
  | 'FIRE_DAMAGE'
  | 'MOULD_REMEDIATION'
  | 'STORM_DAMAGE'
  | 'BIOHAZARD'
  | 'SEWAGE'
  | 'COMMERCIAL'
  | 'CONTENTS_RESTORATION'
  | 'OTHER';

export interface Job {
  id: string;
  jobNumber: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: JobPriority;
  isEmergency: boolean;

  // Client information
  clientId: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;

  // Technician assignment
  technicianId?: string;
  technicianName?: string;

  // Service details
  serviceType: ServiceType;
  estimatedCost?: number;
  actualCost?: number;

  // Location
  location: string;
  address: string;
  suburb?: string;
  postcode?: string;
  gpsLatitude?: number;
  gpsLongitude?: number;

  // Insurance
  hasInsurance: boolean;
  insuranceProvider?: string;
  claimNumber?: string;

  // Dates
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  completedDate?: string;

  // Metadata
  notes?: string;
  attachments?: string[];
  equipmentUsed?: string[];
  materialsUsed?: string[];
}

export interface JobListParams {
  page?: number;
  limit?: number;
  status?: JobStatus;
  priority?: JobPriority;
  technicianId?: string;
  clientId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'scheduledDate' | 'priority' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface JobTimeline {
  id: string;
  jobId: string;
  action: string;
  description: string;
  performedBy: string;
  performedByName?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface CreateJobData {
  title: string;
  description: string;
  clientId: string;
  serviceType: ServiceType;
  priority: JobPriority;
  isEmergency: boolean;
  location: string;
  address: string;
  suburb?: string;
  postcode?: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  hasInsurance: boolean;
  insuranceProvider?: string;
  claimNumber?: string;
  estimatedCost?: number;
  scheduledDate?: string;
  technicianId?: string;
  notes?: string;
}

export interface UpdateJobData extends Partial<CreateJobData> {
  status?: JobStatus;
  actualCost?: number;
  completedDate?: string;
}

export interface JobStatusUpdate {
  status: JobStatus;
  notes?: string;
}
