import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/landingPage/disabled';
import { typeDefs } from '@/lib/graphql/schema';
import { resolvers } from '@/lib/graphql/resolvers';
import { createContext } from '@/lib/graphql/context';
import { complexityPlugin } from '@/lib/graphql/plugins/complexity';
import { createDepthLimitPlugin } from '@/lib/graphql/plugins/depth-limit';
import { performancePlugin, resolverPerformancePlugin } from '@/lib/graphql/plugins/performance';
import { authPlugin, rateLimitPlugin, queryCostPlugin } from '@/lib/graphql/plugins/auth';
import type { NextRequest } from 'next/server';

/**
 * Apollo Server instance
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    // Security plugins
    complexityPlugin,
    createDepthLimitPlugin(10),
    authPlugin,
    rateLimitPlugin,
    queryCostPlugin,

    // Performance monitoring
    performancePlugin,
    resolverPerformancePlugin,

    // GraphQL Playground (only in development)
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault({
          embed: true,
          includeCookies: true,
        }),
  ],
  introspection: process.env.NODE_ENV !== 'production',
  formatError: (formattedError, error) => {
    // Don't expose internal errors in production
    if (process.env.NODE_ENV === 'production') {
      // Log the full error
      console.error('[GraphQL Error]', error);

      // Return sanitized error
      if (formattedError.extensions?.code === 'INTERNAL_SERVER_ERROR') {
        return {
          message: 'An internal error occurred',
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        };
      }
    }

    return formattedError;
  },
});

/**
 * Next.js handler for GraphQL endpoint
 */
const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    return createContext(req);
  },
});

/**
 * GET handler - GraphQL Playground and queries
 */
export async function GET(request: NextRequest) {
  return handler(request);
}

/**
 * POST handler - GraphQL mutations and queries
 */
export async function POST(request: NextRequest) {
  return handler(request);
}

/**
 * OPTIONS handler - CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
