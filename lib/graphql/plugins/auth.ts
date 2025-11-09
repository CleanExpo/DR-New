import { GraphQLError } from 'graphql';
import type { ApolloServerPlugin } from '@apollo/server';

/**
 * Field-level authorization plugin
 * Enforces authentication and authorization rules
 */
export const authPlugin: ApolloServerPlugin = {
  async requestDidStart() {
    return {
      async executionDidStart() {
        return {
          willResolveField({ source, args, contextValue, info }) {
            // Skip auth for introspection queries
            if (info.parentType.name === '__Schema' || info.parentType.name === '__Type') {
              return;
            }

            // Define protected fields that require authentication
            const protectedFields = new Map([
              ['Query.bookings', ['ADMIN', 'TECHNICIAN', 'CUSTOMER']],
              ['Query.booking', ['ADMIN', 'TECHNICIAN', 'CUSTOMER']],
              ['Query.customer', ['ADMIN', 'TECHNICIAN', 'CUSTOMER']],
              ['Query.quote', ['ADMIN', 'TECHNICIAN', 'CUSTOMER']],
              ['Mutation.updateBookingStatus', ['ADMIN', 'TECHNICIAN']],
              ['Mutation.cancelBooking', ['ADMIN', 'TECHNICIAN', 'CUSTOMER']],
              ['Mutation.uploadDamagePhotos', ['ADMIN', 'TECHNICIAN', 'CUSTOMER']],
              ['Mutation.createQuote', ['ADMIN', 'TECHNICIAN']],
              ['Mutation.updateQuoteStatus', ['ADMIN', 'TECHNICIAN']],
              ['Mutation.approveQuote', ['ADMIN', 'TECHNICIAN', 'CUSTOMER']],
            ]);

            const fieldPath = `${info.parentType.name}.${info.fieldName}`;
            const allowedRoles = protectedFields.get(fieldPath);

            if (allowedRoles) {
              const user = contextValue.user;

              // Check authentication
              if (!user) {
                throw new GraphQLError('Authentication required', {
                  extensions: {
                    code: 'UNAUTHENTICATED',
                    field: fieldPath,
                  },
                });
              }

              // Check authorization
              if (!allowedRoles.includes(user.role)) {
                throw new GraphQLError('Insufficient permissions', {
                  extensions: {
                    code: 'FORBIDDEN',
                    field: fieldPath,
                    requiredRoles: allowedRoles,
                    userRole: user.role,
                  },
                });
              }

              // Additional ownership checks
              if (info.parentType.name === 'Query' && info.fieldName === 'booking') {
                // Customer can only view their own bookings
                if (user.role === 'CUSTOMER' && source?.customerId !== user.id) {
                  throw new GraphQLError('Access denied', {
                    extensions: {
                      code: 'FORBIDDEN',
                      message: 'You can only access your own bookings',
                    },
                  });
                }
              }
            }
          },
        };
      },
    };
  },
};

/**
 * Rate limiting plugin
 * Prevents abuse by limiting requests per user/IP
 */
export const rateLimitPlugin: ApolloServerPlugin = {
  async requestDidStart({ request, contextValue }) {
    // TODO: Implement rate limiting with Redis
    // This is a placeholder for demonstration

    const rateLimits = new Map<string, { count: number; resetAt: number }>();
    const maxRequestsPerMinute = 100;
    const windowMs = 60000; // 1 minute

    return {
      async responseForOperation() {
        const identifier = contextValue.user?.id || contextValue.req?.ip || 'anonymous';
        const now = Date.now();

        let limit = rateLimits.get(identifier);

        if (!limit || now > limit.resetAt) {
          limit = { count: 0, resetAt: now + windowMs };
          rateLimits.set(identifier, limit);
        }

        limit.count++;

        if (limit.count > maxRequestsPerMinute) {
          throw new GraphQLError('Rate limit exceeded', {
            extensions: {
              code: 'RATE_LIMIT_EXCEEDED',
              retryAfter: Math.ceil((limit.resetAt - now) / 1000),
            },
          });
        }

        return null; // Continue with normal execution
      },
    };
  },
};

/**
 * Query cost analysis plugin
 * Assigns cost to operations and limits expensive queries
 */
export const queryCostPlugin: ApolloServerPlugin = {
  async requestDidStart() {
    return {
      async didResolveOperation({ request, document }) {
        // Calculate query cost based on operation type and fields
        let cost = 0;

        // Simple cost calculation (can be made more sophisticated)
        const operationType = request.query?.trim().split(/\s+/)[0];

        switch (operationType) {
          case 'query':
            cost = 1;
            break;
          case 'mutation':
            cost = 5;
            break;
          case 'subscription':
            cost = 10;
            break;
        }

        const maxCost = 100;

        if (cost > maxCost) {
          throw new GraphQLError('Query cost exceeds maximum allowed', {
            extensions: {
              code: 'QUERY_TOO_EXPENSIVE',
              cost,
              maxCost,
            },
          });
        }

        console.log('[Query Cost]', {
          operationName: request.operationName,
          cost,
          maxCost,
        });
      },
    };
  },
};
