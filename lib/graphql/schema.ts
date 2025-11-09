import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime
  scalar Upload
  scalar JSON

  """
  Service type enumeration
  """
  enum ServiceType {
    WATER_DAMAGE
    FIRE_DAMAGE
    MOULD_REMEDIATION
    STORM_DAMAGE
    EMERGENCY_RESPONSE
  }

  """
  Booking status enumeration
  """
  enum BookingStatus {
    PENDING
    CONFIRMED
    IN_PROGRESS
    COMPLETED
    CANCELLED
  }

  """
  Priority level for emergency bookings
  """
  enum PriorityLevel {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  """
  Pagination information
  """
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  """
  Service offering with detailed information
  """
  type Service {
    id: ID!
    type: ServiceType!
    name: String!
    slug: String!
    description: String!
    shortDescription: String
    features: [String!]!
    benefits: [String!]!
    process: [ProcessStep!]!
    pricing: PricingInfo
    averageResponseTime: Int
    certifications: [String!]!
    equipment: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  """
  Process step in service delivery
  """
  type ProcessStep {
    order: Int!
    title: String!
    description: String!
    estimatedDuration: Int
  }

  """
  Pricing information
  """
  type PricingInfo {
    basePrice: Float
    currency: String!
    priceRange: String
    factors: [String!]!
    insuranceAccepted: Boolean!
  }

  """
  Service location coverage
  """
  type Location {
    id: ID!
    name: String!
    slug: String!
    suburb: String!
    postcode: String!
    region: String!
    latitude: Float
    longitude: Float
    coverage: CoverageInfo!
    services: [Service!]!
    responseTime: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  """
  Coverage information
  """
  type CoverageInfo {
    residential: Boolean!
    commercial: Boolean!
    emergencyOnly: Boolean!
    radius: Int
  }

  """
  Emergency booking
  """
  type Booking {
    id: ID!
    service: Service!
    location: Location!
    customer: Customer!
    status: BookingStatus!
    priority: PriorityLevel!
    scheduledAt: DateTime
    completedAt: DateTime
    estimatedArrival: DateTime
    actualArrival: DateTime
    notes: String
    damagePhotos: [DamagePhoto!]!
    quote: Quote
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  """
  Customer information
  """
  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    address: Address
    bookings: BookingConnection!
    insuranceProvider: String
    policyNumber: String
    createdAt: DateTime!
  }

  """
  Physical address
  """
  type Address {
    street: String!
    suburb: String!
    postcode: String!
    state: String!
    country: String!
  }

  """
  Damage photo with metadata
  """
  type DamagePhoto {
    id: ID!
    url: String!
    thumbnail: String
    caption: String
    uploadedAt: DateTime!
    metadata: JSON
  }

  """
  Quote for service
  """
  type Quote {
    id: ID!
    booking: Booking!
    items: [QuoteItem!]!
    subtotal: Float!
    tax: Float!
    total: Float!
    currency: String!
    validUntil: DateTime!
    status: QuoteStatus!
    notes: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  """
  Quote status
  """
  enum QuoteStatus {
    DRAFT
    SENT
    APPROVED
    REJECTED
    EXPIRED
  }

  """
  Quote line item
  """
  type QuoteItem {
    id: ID!
    description: String!
    quantity: Float!
    unit: String!
    unitPrice: Float!
    total: Float!
  }

  """
  Booking connection with cursor pagination
  """
  type BookingConnection {
    edges: [BookingEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  """
  Booking edge
  """
  type BookingEdge {
    cursor: String!
    node: Booking!
  }

  """
  Service connection with cursor pagination
  """
  type ServiceConnection {
    edges: [ServiceEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  """
  Service edge
  """
  type ServiceEdge {
    cursor: String!
    node: Service!
  }

  """
  Location connection with cursor pagination
  """
  type LocationConnection {
    edges: [LocationEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  """
  Location edge
  """
  type LocationEdge {
    cursor: String!
    node: Location!
  }

  """
  Input for creating a booking
  """
  input CreateBookingInput {
    serviceId: ID!
    locationId: ID!
    priority: PriorityLevel!
    scheduledAt: DateTime
    customer: CustomerInput!
    notes: String
    damagePhotos: [Upload!]
  }

  """
  Customer input
  """
  input CustomerInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    address: AddressInput
    insuranceProvider: String
    policyNumber: String
  }

  """
  Address input
  """
  input AddressInput {
    street: String!
    suburb: String!
    postcode: String!
    state: String!
    country: String!
  }

  """
  Input for updating booking status
  """
  input UpdateBookingStatusInput {
    bookingId: ID!
    status: BookingStatus!
    estimatedArrival: DateTime
    actualArrival: DateTime
    notes: String
  }

  """
  Input for creating a quote
  """
  input CreateQuoteInput {
    bookingId: ID!
    items: [QuoteItemInput!]!
    validUntil: DateTime!
    notes: String
  }

  """
  Quote item input
  """
  input QuoteItemInput {
    description: String!
    quantity: Float!
    unit: String!
    unitPrice: Float!
  }

  """
  Booking update subscription payload
  """
  type BookingUpdatePayload {
    booking: Booking!
    updateType: String!
    updatedFields: [String!]!
  }

  """
  Query operations
  """
  type Query {
    """
    Get all services with optional filtering
    """
    services(
      type: ServiceType
      first: Int
      after: String
      last: Int
      before: String
    ): ServiceConnection!

    """
    Get a single service by ID or slug
    """
    service(id: ID, slug: String): Service

    """
    Get all locations with optional filtering
    """
    locations(
      region: String
      postcode: String
      first: Int
      after: String
      last: Int
      before: String
    ): LocationConnection!

    """
    Get a single location by ID or slug
    """
    location(id: ID, slug: String): Location

    """
    Get bookings with filtering and pagination
    """
    bookings(
      status: BookingStatus
      priority: PriorityLevel
      customerId: ID
      serviceId: ID
      locationId: ID
      first: Int
      after: String
      last: Int
      before: String
    ): BookingConnection!

    """
    Get a single booking by ID
    """
    booking(id: ID!): Booking

    """
    Get customer by ID
    """
    customer(id: ID!): Customer

    """
    Get quote by ID
    """
    quote(id: ID!): Quote

    """
    Search across services and locations
    """
    search(query: String!, limit: Int): SearchResults!

    """
    Get emergency services availability
    """
    emergencyAvailability(locationId: ID!): EmergencyAvailability!
  }

  """
  Search results
  """
  type SearchResults {
    services: [Service!]!
    locations: [Location!]!
    totalResults: Int!
  }

  """
  Emergency availability information
  """
  type EmergencyAvailability {
    available: Boolean!
    estimatedResponseTime: Int!
    nearestTeam: String
    message: String
  }

  """
  Mutation operations
  """
  type Mutation {
    """
    Create a new emergency booking
    """
    createBooking(input: CreateBookingInput!): Booking!

    """
    Update booking status
    """
    updateBookingStatus(input: UpdateBookingStatusInput!): Booking!

    """
    Cancel a booking
    """
    cancelBooking(bookingId: ID!, reason: String): Booking!

    """
    Upload damage photos
    """
    uploadDamagePhotos(bookingId: ID!, photos: [Upload!]!): [DamagePhoto!]!

    """
    Create a quote
    """
    createQuote(input: CreateQuoteInput!): Quote!

    """
    Update quote status
    """
    updateQuoteStatus(quoteId: ID!, status: QuoteStatus!): Quote!

    """
    Approve quote
    """
    approveQuote(quoteId: ID!): Quote!
  }

  """
  Subscription operations for real-time updates
  """
  type Subscription {
    """
    Subscribe to booking updates
    """
    bookingUpdated(bookingId: ID!): BookingUpdatePayload!

    """
    Subscribe to emergency bookings
    """
    emergencyBookingCreated: Booking!

    """
    Subscribe to quote updates
    """
    quoteUpdated(quoteId: ID!): Quote!
  }
`;
