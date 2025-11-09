import { useQuery, useMutation, useSubscription, gql } from '@apollo/client';

/**
 * Custom React hooks for GraphQL operations
 */

// ==================== QUERIES ====================

/**
 * Hook to fetch all services
 */
export function useServices(type?: string) {
  const SERVICES_QUERY = gql`
    query GetServices($type: ServiceType, $first: Int, $after: String) {
      services(type: $type, first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            type
            name
            slug
            description
            shortDescription
            features
            benefits
            certifications
            averageResponseTime
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  `;

  return useQuery(SERVICES_QUERY, {
    variables: { type, first: 10 },
  });
}

/**
 * Hook to fetch a single service
 */
export function useService(idOrSlug: string, bySlug = false) {
  const SERVICE_QUERY = gql`
    query GetService($id: ID, $slug: String) {
      service(id: $id, slug: $slug) {
        id
        type
        name
        slug
        description
        shortDescription
        features
        benefits
        process {
          order
          title
          description
          estimatedDuration
        }
        pricing {
          basePrice
          currency
          priceRange
          factors
          insuranceAccepted
        }
        certifications
        equipment
        createdAt
        updatedAt
      }
    }
  `;

  return useQuery(SERVICE_QUERY, {
    variables: bySlug ? { slug: idOrSlug } : { id: idOrSlug },
  });
}

/**
 * Hook to fetch locations
 */
export function useLocations(region?: string, postcode?: string) {
  const LOCATIONS_QUERY = gql`
    query GetLocations($region: String, $postcode: String, $first: Int, $after: String) {
      locations(region: $region, postcode: $postcode, first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            name
            slug
            suburb
            postcode
            region
            coverage {
              residential
              commercial
              emergencyOnly
              radius
            }
            responseTime
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  `;

  return useQuery(LOCATIONS_QUERY, {
    variables: { region, postcode, first: 20 },
  });
}

/**
 * Hook to check emergency availability
 */
export function useEmergencyAvailability(locationId: string) {
  const AVAILABILITY_QUERY = gql`
    query GetEmergencyAvailability($locationId: ID!) {
      emergencyAvailability(locationId: $locationId) {
        available
        estimatedResponseTime
        nearestTeam
        message
      }
    }
  `;

  return useQuery(AVAILABILITY_QUERY, {
    variables: { locationId },
    pollInterval: 30000, // Poll every 30 seconds
  });
}

/**
 * Hook to fetch bookings
 */
export function useBookings(filters?: {
  status?: string;
  priority?: string;
  customerId?: string;
}) {
  const BOOKINGS_QUERY = gql`
    query GetBookings(
      $status: BookingStatus
      $priority: PriorityLevel
      $customerId: ID
      $first: Int
      $after: String
    ) {
      bookings(
        status: $status
        priority: $priority
        customerId: $customerId
        first: $first
        after: $after
      ) {
        edges {
          cursor
          node {
            id
            status
            priority
            scheduledAt
            estimatedArrival
            service {
              id
              name
              type
            }
            location {
              id
              name
              suburb
            }
            customer {
              id
              firstName
              lastName
            }
            createdAt
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  `;

  return useQuery(BOOKINGS_QUERY, {
    variables: { ...filters, first: 20 },
  });
}

// ==================== MUTATIONS ====================

/**
 * Hook to create a booking
 */
export function useCreateBooking() {
  const CREATE_BOOKING_MUTATION = gql`
    mutation CreateBooking($input: CreateBookingInput!) {
      createBooking(input: $input) {
        id
        status
        priority
        scheduledAt
        estimatedArrival
        service {
          id
          name
        }
        location {
          id
          name
        }
        customer {
          id
          email
        }
        createdAt
      }
    }
  `;

  return useMutation(CREATE_BOOKING_MUTATION);
}

/**
 * Hook to update booking status
 */
export function useUpdateBookingStatus() {
  const UPDATE_STATUS_MUTATION = gql`
    mutation UpdateBookingStatus($input: UpdateBookingStatusInput!) {
      updateBookingStatus(input: $input) {
        id
        status
        estimatedArrival
        actualArrival
        updatedAt
      }
    }
  `;

  return useMutation(UPDATE_STATUS_MUTATION);
}

/**
 * Hook to upload damage photos
 */
export function useUploadDamagePhotos() {
  const UPLOAD_PHOTOS_MUTATION = gql`
    mutation UploadDamagePhotos($bookingId: ID!, $photos: [Upload!]!) {
      uploadDamagePhotos(bookingId: $bookingId, photos: $photos) {
        id
        url
        thumbnail
        caption
        uploadedAt
      }
    }
  `;

  return useMutation(UPLOAD_PHOTOS_MUTATION);
}

/**
 * Hook to create a quote
 */
export function useCreateQuote() {
  const CREATE_QUOTE_MUTATION = gql`
    mutation CreateQuote($input: CreateQuoteInput!) {
      createQuote(input: $input) {
        id
        subtotal
        tax
        total
        currency
        validUntil
        status
        items {
          id
          description
          quantity
          unit
          unitPrice
          total
        }
        createdAt
      }
    }
  `;

  return useMutation(CREATE_QUOTE_MUTATION);
}

/**
 * Hook to approve a quote
 */
export function useApproveQuote() {
  const APPROVE_QUOTE_MUTATION = gql`
    mutation ApproveQuote($quoteId: ID!) {
      approveQuote(quoteId: $quoteId) {
        id
        status
        updatedAt
      }
    }
  `;

  return useMutation(APPROVE_QUOTE_MUTATION);
}

// ==================== SUBSCRIPTIONS ====================

/**
 * Hook to subscribe to booking updates
 */
export function useBookingUpdates(bookingId: string) {
  const BOOKING_SUBSCRIPTION = gql`
    subscription OnBookingUpdated($bookingId: ID!) {
      bookingUpdated(bookingId: $bookingId) {
        booking {
          id
          status
          priority
          estimatedArrival
          actualArrival
          updatedAt
        }
        updateType
        updatedFields
      }
    }
  `;

  return useSubscription(BOOKING_SUBSCRIPTION, {
    variables: { bookingId },
  });
}

/**
 * Hook to subscribe to emergency bookings
 */
export function useEmergencyBookings() {
  const EMERGENCY_SUBSCRIPTION = gql`
    subscription OnEmergencyBookingCreated {
      emergencyBookingCreated {
        id
        priority
        service {
          id
          name
        }
        location {
          id
          name
        }
        customer {
          id
          firstName
          lastName
          phone
        }
        createdAt
      }
    }
  `;

  return useSubscription(EMERGENCY_SUBSCRIPTION);
}

/**
 * Hook to subscribe to quote updates
 */
export function useQuoteUpdates(quoteId: string) {
  const QUOTE_SUBSCRIPTION = gql`
    subscription OnQuoteUpdated($quoteId: ID!) {
      quoteUpdated(quoteId: $quoteId) {
        id
        status
        total
        updatedAt
      }
    }
  `;

  return useSubscription(QUOTE_SUBSCRIPTION, {
    variables: { quoteId },
  });
}
