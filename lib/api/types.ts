/**
 * API Type Definitions
 * Centralized type definitions for API requests and responses
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  metadata?: {
    timestamp: string;
    requestId?: string;
    version: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  field?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

// Emergency Request Types
export interface EmergencyRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  suburb: string;
  emergencyType: 'water' | 'fire' | 'storm' | 'mould' | 'biohazard';
  description: string;
  severity: 'critical' | 'urgent' | 'moderate';
  hasInsurance: boolean;
  insuranceCompany?: string;
  preferredCallback?: string;
}

export interface EmergencyResponse {
  requestId: string;
  estimatedResponse: string;
  priority: 'emergency' | 'urgent' | 'standard';
  message: string;
  nextSteps: string[];
  contactPhone: string;
}

// Quote Request Types
export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string[];
  propertyType: 'residential' | 'commercial' | 'industrial';
  address?: string;
  suburb: string;
  description: string;
  preferredContactTime?: string;
  urgency: 'emergency' | 'urgent' | 'standard' | 'routine';
}

export interface QuoteResponse {
  quoteId: string;
  estimatedResponseTime: string;
  message: string;
  services: string[];
}

// Service Types
export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  responseTime: string;
  available24x7: boolean;
  certifications: string[];
  serviceAreas: string[];
}

export interface ServiceFilters {
  category?: string;
  availability?: '24x7' | 'business-hours';
  location?: string;
  emergency?: boolean;
  search?: string;
}

// Location Types
export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  type: 'suburb' | 'region' | 'city';
  state: string;
  postcode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  coverage: 'primary' | 'secondary' | 'extended';
  services: string[];
  emergencyResponse: boolean;
  responseTime: string;
}

// Contact Types
export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  urgency: 'emergency' | 'urgent' | 'standard' | 'quote' | 'routine';
  message: string;
  propertyType?: string;
  hasInsurance?: boolean;
  preferredContact?: 'phone' | 'email' | 'sms';
}

export interface ContactResponse {
  success: true;
  submissionId: string;
  message: string;
  expectedResponse?: string;
}
