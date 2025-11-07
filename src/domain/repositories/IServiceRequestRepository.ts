import { ServiceRequest, ServiceStatus, ServicePriority } from '../entities/ServiceRequest';
import { Address } from '../value-objects/Address';

/**
 * Pagination Options
 */
export interface PaginationOptions {
  page: number;
  pageSize: number;
  orderBy: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

/**
 * Paginated Result
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Service Request Repository Interface
 *
 * Defines data access operations for ServiceRequest aggregate.
 * Implementation details are in infrastructure layer.
 */
export interface IServiceRequestRepository {
  /**
   * Find service request by ID
   */
  findById(id: string): Promise<ServiceRequest | null>;

  /**
   * Find all service requests for a customer
   */
  findByCustomerId(customerId: string): Promise<ServiceRequest[]>;

  /**
   * Find service requests by status
   */
  findByStatus(status: ServiceStatus): Promise<ServiceRequest[]>;

  /**
   * Find emergency requests in a specific area
   */
  findEmergencyRequests(location: Address): Promise<ServiceRequest[]>;

  /**
   * Find requests by priority
   */
  findByPriority(priority: ServicePriority): Promise<ServiceRequest[]>;

  /**
   * Find overdue requests
   */
  findOverdueRequests(): Promise<ServiceRequest[]>;

  /**
   * Save (create or update) a service request
   */
  save(request: ServiceRequest): Promise<void>;

  /**
   * Delete a service request
   */
  delete(id: string): Promise<void>;

  /**
   * Save multiple service requests
   */
  saveMany(requests: ServiceRequest[]): Promise<void>;

  /**
   * Find requests with pagination
   */
  findPaginated(options: PaginationOptions): Promise<PaginatedResult<ServiceRequest>>;

  /**
   * Count total requests
   */
  count(): Promise<number>;

  /**
   * Count requests by status
   */
  countByStatus(status: ServiceStatus): Promise<number>;
}
