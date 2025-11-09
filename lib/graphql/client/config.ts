import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

/**
 * GraphQL client configuration for browser
 */
export function createApolloClient() {
  const isServer = typeof window === 'undefined';

  // HTTP link for queries and mutations
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/api/graphql',
    credentials: 'same-origin',
  });

  // WebSocket link for subscriptions (browser only)
  const wsLink = !isServer
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/api/graphql',
          connectionParams: () => {
            // Get auth token from localStorage or cookies
            const token = localStorage.getItem('auth-token');
            return token ? { authorization: `Bearer ${token}` } : {};
          },
        })
      )
    : null;

  // Split traffic between HTTP and WebSocket based on operation type
  const link = !isServer && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // Cursor-based pagination for bookings
            bookings: {
              keyArgs: ['status', 'priority', 'customerId', 'serviceId', 'locationId'],
              merge(existing, incoming, { args }) {
                if (!existing) return incoming;
                if (!args?.after) return incoming; // New query, replace existing

                // Merge edges
                const existingEdges = existing.edges || [];
                const incomingEdges = incoming.edges || [];

                return {
                  ...incoming,
                  edges: [...existingEdges, ...incomingEdges],
                };
              },
            },
            // Cursor-based pagination for services
            services: {
              keyArgs: ['type'],
              merge(existing, incoming, { args }) {
                if (!existing) return incoming;
                if (!args?.after) return incoming;

                return {
                  ...incoming,
                  edges: [...(existing.edges || []), ...(incoming.edges || [])],
                };
              },
            },
            // Cursor-based pagination for locations
            locations: {
              keyArgs: ['region', 'postcode'],
              merge(existing, incoming, { args }) {
                if (!existing) return incoming;
                if (!args?.after) return incoming;

                return {
                  ...incoming,
                  edges: [...(existing.edges || []), ...(incoming.edges || [])],
                };
              },
            },
          },
        },
        Booking: {
          fields: {
            // Handle quote field updates
            quote: {
              merge(existing, incoming) {
                return incoming || existing;
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    ssrMode: isServer,
  });
}
