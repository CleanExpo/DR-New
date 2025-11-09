import DataLoader from 'dataloader';

// Mock data store - replace with actual database queries
interface Service {
  id: string;
  type: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  features: string[];
  benefits: string[];
  process: ProcessStep[];
  certifications: string[];
  equipment: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProcessStep {
  order: number;
  title: string;
  description: string;
  estimatedDuration?: number;
}

interface Location {
  id: string;
  name: string;
  slug: string;
  suburb: string;
  postcode: string;
  region: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Booking {
  id: string;
  serviceId: string;
  locationId: string;
  customerId: string;
  status: string;
  priority: string;
  scheduledAt?: Date;
  completedAt?: Date;
  estimatedArrival?: Date;
  actualArrival?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  insuranceProvider?: string;
  policyNumber?: string;
  createdAt: Date;
}

interface Quote {
  id: string;
  bookingId: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  validUntil: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DamagePhoto {
  id: string;
  bookingId: string;
  url: string;
  thumbnail?: string;
  caption?: string;
  uploadedAt: Date;
  metadata?: any;
}

/**
 * DataLoader for batching and caching service queries
 */
const batchServices = async (ids: readonly string[]): Promise<(Service | null)[]> => {
  // TODO: Replace with actual Prisma query
  // const services = await prisma.service.findMany({
  //   where: { id: { in: [...ids] } }
  // });

  // Mock implementation
  const serviceMap = new Map<string, Service>();

  // Simulate database query
  const services: Service[] = [
    {
      id: '1',
      type: 'WATER_DAMAGE',
      name: 'Water Damage Restoration',
      slug: 'water-damage-restoration',
      description: 'Professional water damage restoration services',
      features: ['24/7 Emergency Response', 'IICRC Certified', 'Insurance Direct Billing'],
      benefits: ['Fast Response', 'Expert Technicians', 'Complete Restoration'],
      process: [
        { order: 1, title: 'Emergency Contact', description: 'Call us immediately', estimatedDuration: 5 },
        { order: 2, title: 'Assessment', description: 'On-site damage assessment', estimatedDuration: 30 },
        { order: 3, title: 'Water Extraction', description: 'Remove standing water', estimatedDuration: 120 },
        { order: 4, title: 'Drying', description: 'Industrial dehumidification', estimatedDuration: 2880 }
      ],
      certifications: ['IICRC Master Restorer', 'IICRC Water Damage Restoration'],
      equipment: ['Industrial Dehumidifiers', 'Water Extractors', 'Moisture Meters'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  services.forEach(service => serviceMap.set(service.id, service));

  return ids.map(id => serviceMap.get(id) || null);
};

/**
 * DataLoader for batching and caching location queries
 */
const batchLocations = async (ids: readonly string[]): Promise<(Location | null)[]> => {
  // TODO: Replace with actual Prisma query
  const locationMap = new Map<string, Location>();

  const locations: Location[] = [
    {
      id: '1',
      name: 'Hamilton',
      slug: 'hamilton',
      suburb: 'Hamilton',
      postcode: '4007',
      region: 'Brisbane',
      latitude: -27.4386,
      longitude: 153.0631,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  locations.forEach(location => locationMap.set(location.id, location));

  return ids.map(id => locationMap.get(id) || null);
};

/**
 * DataLoader for batching and caching booking queries
 */
const batchBookings = async (ids: readonly string[]): Promise<(Booking | null)[]> => {
  // TODO: Replace with actual Prisma query
  const bookingMap = new Map<string, Booking>();

  const bookings: Booking[] = [];

  bookings.forEach(booking => bookingMap.set(booking.id, booking));

  return ids.map(id => bookingMap.get(id) || null);
};

/**
 * DataLoader for batching customer queries
 */
const batchCustomers = async (ids: readonly string[]): Promise<(Customer | null)[]> => {
  // TODO: Replace with actual Prisma query
  const customerMap = new Map<string, Customer>();

  const customers: Customer[] = [];

  customers.forEach(customer => customerMap.set(customer.id, customer));

  return ids.map(id => customerMap.get(id) || null);
};

/**
 * DataLoader for batching quote queries
 */
const batchQuotes = async (ids: readonly string[]): Promise<(Quote | null)[]> => {
  // TODO: Replace with actual Prisma query
  const quoteMap = new Map<string, Quote>();

  const quotes: Quote[] = [];

  quotes.forEach(quote => quoteMap.set(quote.id, quote));

  return ids.map(id => quoteMap.get(id) || null);
};

/**
 * DataLoader for batching damage photo queries by booking ID
 */
const batchDamagePhotosByBookingId = async (
  bookingIds: readonly string[]
): Promise<DamagePhoto[][]> => {
  // TODO: Replace with actual Prisma query
  const photosByBooking = new Map<string, DamagePhoto[]>();

  return bookingIds.map(id => photosByBooking.get(id) || []);
};

/**
 * DataLoader for batching booking queries by customer ID
 */
const batchBookingsByCustomerId = async (
  customerIds: readonly string[]
): Promise<Booking[][]> => {
  // TODO: Replace with actual Prisma query
  const bookingsByCustomer = new Map<string, Booking[]>();

  return customerIds.map(id => bookingsByCustomer.get(id) || []);
};

/**
 * Create DataLoader instances for request context
 */
export function createDataLoaders() {
  return {
    serviceLoader: new DataLoader<string, Service | null>(batchServices, {
      cache: true,
      maxBatchSize: 100,
    }),
    locationLoader: new DataLoader<string, Location | null>(batchLocations, {
      cache: true,
      maxBatchSize: 100,
    }),
    bookingLoader: new DataLoader<string, Booking | null>(batchBookings, {
      cache: true,
      maxBatchSize: 100,
    }),
    customerLoader: new DataLoader<string, Customer | null>(batchCustomers, {
      cache: true,
      maxBatchSize: 100,
    }),
    quoteLoader: new DataLoader<string, Quote | null>(batchQuotes, {
      cache: true,
      maxBatchSize: 100,
    }),
    damagePhotosByBookingLoader: new DataLoader<string, DamagePhoto[]>(
      batchDamagePhotosByBookingId,
      {
        cache: true,
        maxBatchSize: 100,
      }
    ),
    bookingsByCustomerLoader: new DataLoader<string, Booking[]>(
      batchBookingsByCustomerId,
      {
        cache: true,
        maxBatchSize: 100,
      }
    ),
  };
}

export type DataLoaders = ReturnType<typeof createDataLoaders>;
