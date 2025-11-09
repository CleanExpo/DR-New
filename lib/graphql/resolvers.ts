import { GraphQLError } from 'graphql';
import { GraphQLUpload } from 'graphql-upload-minimal';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';
import type { DataLoaders } from './dataloaders';

/**
 * GraphQL context with dataloaders and auth
 */
export interface GraphQLContext {
  dataloaders: DataLoaders;
  user?: {
    id: string;
    role: string;
    email: string;
  };
  req?: any;
}

/**
 * Authorization helper
 */
function requireAuth(context: GraphQLContext) {
  if (!context.user) {
    throw new GraphQLError('Authentication required', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return context.user;
}

/**
 * Role-based authorization helper
 */
function requireRole(context: GraphQLContext, allowedRoles: string[]) {
  const user = requireAuth(context);
  if (!allowedRoles.includes(user.role)) {
    throw new GraphQLError('Insufficient permissions', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
  return user;
}

/**
 * Cursor-based pagination helper
 */
function encodeCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

function decodeCursor(cursor: string): string {
  return Buffer.from(cursor, 'base64').toString('utf-8');
}

/**
 * GraphQL resolvers
 */
export const resolvers = {
  // Custom scalar types
  DateTime: DateTimeResolver,
  Upload: GraphQLUpload,
  JSON: JSONResolver,

  // Query resolvers
  Query: {
    services: async (
      _parent: any,
      args: {
        type?: string;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
      },
      context: GraphQLContext
    ) => {
      // TODO: Implement actual database query with filtering and pagination
      const limit = args.first || args.last || 10;
      const cursor = args.after ? decodeCursor(args.after) : null;

      // Mock implementation
      const mockServices = [
        {
          id: '1',
          type: 'WATER_DAMAGE',
          name: 'Water Damage Restoration',
          slug: 'water-damage-restoration',
        },
        {
          id: '2',
          type: 'FIRE_DAMAGE',
          name: 'Fire Damage Restoration',
          slug: 'fire-damage-restoration',
        },
      ];

      const edges = mockServices.map(service => ({
        cursor: encodeCursor(service.id),
        node: service,
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor,
        },
        totalCount: mockServices.length,
      };
    },

    service: async (
      _parent: any,
      args: { id?: string; slug?: string },
      context: GraphQLContext
    ) => {
      if (args.id) {
        return context.dataloaders.serviceLoader.load(args.id);
      }
      // TODO: Add slug-based lookup
      return null;
    },

    locations: async (
      _parent: any,
      args: {
        region?: string;
        postcode?: string;
        first?: number;
        after?: string;
      },
      context: GraphQLContext
    ) => {
      // TODO: Implement actual query
      const mockLocations = [
        { id: '1', name: 'Hamilton', slug: 'hamilton' },
        { id: '2', name: 'Ascot', slug: 'ascot' },
      ];

      const edges = mockLocations.map(location => ({
        cursor: encodeCursor(location.id),
        node: location,
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor,
        },
        totalCount: mockLocations.length,
      };
    },

    location: async (
      _parent: any,
      args: { id?: string; slug?: string },
      context: GraphQLContext
    ) => {
      if (args.id) {
        return context.dataloaders.locationLoader.load(args.id);
      }
      // TODO: Add slug-based lookup
      return null;
    },

    bookings: async (
      _parent: any,
      args: {
        status?: string;
        priority?: string;
        customerId?: string;
        serviceId?: string;
        locationId?: string;
        first?: number;
        after?: string;
      },
      context: GraphQLContext
    ) => {
      // Require authentication for bookings
      requireAuth(context);

      // TODO: Implement actual query with filtering
      const edges: any[] = [];

      return {
        edges,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
        totalCount: 0,
      };
    },

    booking: async (
      _parent: any,
      args: { id: string },
      context: GraphQLContext
    ) => {
      requireAuth(context);
      return context.dataloaders.bookingLoader.load(args.id);
    },

    customer: async (
      _parent: any,
      args: { id: string },
      context: GraphQLContext
    ) => {
      requireAuth(context);
      return context.dataloaders.customerLoader.load(args.id);
    },

    quote: async (
      _parent: any,
      args: { id: string },
      context: GraphQLContext
    ) => {
      requireAuth(context);
      return context.dataloaders.quoteLoader.load(args.id);
    },

    search: async (
      _parent: any,
      args: { query: string; limit?: number },
      context: GraphQLContext
    ) => {
      // TODO: Implement full-text search
      return {
        services: [],
        locations: [],
        totalResults: 0,
      };
    },

    emergencyAvailability: async (
      _parent: any,
      args: { locationId: string },
      context: GraphQLContext
    ) => {
      // TODO: Check real-time availability
      return {
        available: true,
        estimatedResponseTime: 60,
        nearestTeam: 'Brisbane North',
        message: '24/7 emergency response available',
      };
    },
  },

  // Mutation resolvers
  Mutation: {
    createBooking: async (
      _parent: any,
      args: { input: any },
      context: GraphQLContext
    ) => {
      // Public endpoint - no auth required for emergency bookings
      const { input } = args;

      // TODO: Implement actual booking creation
      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        serviceId: input.serviceId,
        locationId: input.locationId,
        status: 'PENDING',
        priority: input.priority,
        scheduledAt: input.scheduledAt,
        notes: input.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // TODO: Trigger subscription
      // context.pubsub.publish('EMERGENCY_BOOKING_CREATED', { emergencyBookingCreated: booking });

      return booking;
    },

    updateBookingStatus: async (
      _parent: any,
      args: { input: any },
      context: GraphQLContext
    ) => {
      requireRole(context, ['ADMIN', 'TECHNICIAN']);

      const { input } = args;

      // TODO: Implement actual update
      const booking = await context.dataloaders.bookingLoader.load(input.bookingId);

      if (!booking) {
        throw new GraphQLError('Booking not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      // TODO: Update booking and trigger subscription

      return booking;
    },

    cancelBooking: async (
      _parent: any,
      args: { bookingId: string; reason?: string },
      context: GraphQLContext
    ) => {
      requireAuth(context);

      // TODO: Implement cancellation logic
      const booking = await context.dataloaders.bookingLoader.load(args.bookingId);

      if (!booking) {
        throw new GraphQLError('Booking not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return booking;
    },

    uploadDamagePhotos: async (
      _parent: any,
      args: { bookingId: string; photos: any[] },
      context: GraphQLContext
    ) => {
      requireAuth(context);

      // TODO: Implement file upload handling
      const photos: any[] = [];

      for (const upload of args.photos) {
        const { createReadStream, filename, mimetype } = await upload;
        // Process upload, save to storage (S3, Cloudinary, etc.)
        // Generate thumbnail
        // Save metadata to database
      }

      return photos;
    },

    createQuote: async (
      _parent: any,
      args: { input: any },
      context: GraphQLContext
    ) => {
      requireRole(context, ['ADMIN', 'TECHNICIAN']);

      const { input } = args;

      // TODO: Implement quote creation
      const items = input.items;
      const subtotal = items.reduce(
        (sum: number, item: any) => sum + item.quantity * item.unitPrice,
        0
      );
      const tax = subtotal * 0.1; // 10% GST
      const total = subtotal + tax;

      const quote = {
        id: Math.random().toString(36).substr(2, 9),
        bookingId: input.bookingId,
        items,
        subtotal,
        tax,
        total,
        currency: 'AUD',
        validUntil: input.validUntil,
        status: 'DRAFT',
        notes: input.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return quote;
    },

    updateQuoteStatus: async (
      _parent: any,
      args: { quoteId: string; status: string },
      context: GraphQLContext
    ) => {
      requireRole(context, ['ADMIN', 'TECHNICIAN']);

      const quote = await context.dataloaders.quoteLoader.load(args.quoteId);

      if (!quote) {
        throw new GraphQLError('Quote not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      // TODO: Update quote status

      return quote;
    },

    approveQuote: async (
      _parent: any,
      args: { quoteId: string },
      context: GraphQLContext
    ) => {
      requireAuth(context);

      const quote = await context.dataloaders.quoteLoader.load(args.quoteId);

      if (!quote) {
        throw new GraphQLError('Quote not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      // TODO: Update quote status to APPROVED

      return quote;
    },
  },

  // Type resolvers
  Service: {
    pricing: () => ({
      basePrice: null,
      currency: 'AUD',
      priceRange: 'Contact for quote',
      factors: ['Extent of damage', 'Required equipment', 'Time required'],
      insuranceAccepted: true,
    }),
  },

  Location: {
    services: async (parent: any, _args: any, context: GraphQLContext) => {
      // TODO: Load services for this location
      return [];
    },
    coverage: () => ({
      residential: true,
      commercial: true,
      emergencyOnly: false,
      radius: 50,
    }),
    responseTime: () => 60, // 60 minutes
  },

  Booking: {
    service: (parent: any, _args: any, context: GraphQLContext) => {
      return context.dataloaders.serviceLoader.load(parent.serviceId);
    },
    location: (parent: any, _args: any, context: GraphQLContext) => {
      return context.dataloaders.locationLoader.load(parent.locationId);
    },
    customer: (parent: any, _args: any, context: GraphQLContext) => {
      return context.dataloaders.customerLoader.load(parent.customerId);
    },
    damagePhotos: (parent: any, _args: any, context: GraphQLContext) => {
      return context.dataloaders.damagePhotosByBookingLoader.load(parent.id);
    },
    quote: async (parent: any, _args: any, context: GraphQLContext) => {
      // TODO: Load quote for booking
      return null;
    },
  },

  Customer: {
    bookings: async (parent: any, args: any, context: GraphQLContext) => {
      const bookings = await context.dataloaders.bookingsByCustomerLoader.load(parent.id);

      const edges = bookings.map(booking => ({
        cursor: encodeCursor(booking.id),
        node: booking,
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor,
        },
        totalCount: bookings.length,
      };
    },
    address: (parent: any) => parent.address || null,
  },

  Quote: {
    booking: (parent: any, _args: any, context: GraphQLContext) => {
      return context.dataloaders.bookingLoader.load(parent.bookingId);
    },
    items: (parent: any) => parent.items || [],
  },

  // Subscription resolvers
  Subscription: {
    bookingUpdated: {
      subscribe: async (_parent: any, args: { bookingId: string }, context: GraphQLContext) => {
        // TODO: Implement subscription with Redis pub/sub
        // return context.pubsub.asyncIterator([`BOOKING_UPDATED_${args.bookingId}`]);
        throw new GraphQLError('Subscriptions not yet implemented', {
          extensions: { code: 'NOT_IMPLEMENTED' },
        });
      },
    },
    emergencyBookingCreated: {
      subscribe: async (_parent: any, _args: any, context: GraphQLContext) => {
        // TODO: Implement subscription
        // return context.pubsub.asyncIterator(['EMERGENCY_BOOKING_CREATED']);
        throw new GraphQLError('Subscriptions not yet implemented', {
          extensions: { code: 'NOT_IMPLEMENTED' },
        });
      },
    },
    quoteUpdated: {
      subscribe: async (_parent: any, args: { quoteId: string }, context: GraphQLContext) => {
        // TODO: Implement subscription
        // return context.pubsub.asyncIterator([`QUOTE_UPDATED_${args.quoteId}`]);
        throw new GraphQLError('Subscriptions not yet implemented', {
          extensions: { code: 'NOT_IMPLEMENTED' },
        });
      },
    },
  },
};
