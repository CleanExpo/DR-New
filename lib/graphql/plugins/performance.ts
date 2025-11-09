import type { ApolloServerPlugin } from '@apollo/server';

/**
 * Performance monitoring plugin
 * Tracks query execution time and logs slow queries
 */
export const performancePlugin: ApolloServerPlugin = {
  async requestDidStart() {
    const startTime = Date.now();
    let operationName = 'Unknown';

    return {
      async didResolveOperation({ request }) {
        operationName = request.operationName || 'Anonymous';
      },

      async willSendResponse({ response }) {
        const duration = Date.now() - startTime;

        // Log slow queries (over 1 second)
        if (duration > 1000) {
          console.warn('[Slow Query]', {
            operationName,
            duration: `${duration}ms`,
            errors: response.body.kind === 'single' ? response.body.singleResult.errors : null,
          });
        } else {
          console.log('[Query Performance]', {
            operationName,
            duration: `${duration}ms`,
          });
        }

        // Add performance headers
        if (response.http) {
          response.http.headers.set('X-Response-Time', `${duration}ms`);
          response.http.headers.set('X-Operation-Name', operationName);
        }
      },

      async didEncounterErrors({ errors }) {
        console.error('[GraphQL Errors]', {
          operationName,
          errors: errors.map(err => ({
            message: err.message,
            path: err.path,
            extensions: err.extensions,
          })),
        });
      },
    };
  },
};

/**
 * Resolver performance tracking plugin
 * Tracks individual resolver execution times
 */
export const resolverPerformancePlugin: ApolloServerPlugin = {
  async requestDidStart() {
    const resolverTimings: Record<string, number> = {};

    return {
      async executionDidStart() {
        return {
          willResolveField({ info }) {
            const start = Date.now();
            const fieldPath = `${info.parentType.name}.${info.fieldName}`;

            return () => {
              const duration = Date.now() - start;
              resolverTimings[fieldPath] = (resolverTimings[fieldPath] || 0) + duration;
            };
          },
        };
      },

      async willSendResponse() {
        // Log resolver timings for slow resolvers (over 100ms)
        const slowResolvers = Object.entries(resolverTimings)
          .filter(([, duration]) => duration > 100)
          .sort((a, b) => b[1] - a[1]);

        if (slowResolvers.length > 0) {
          console.warn('[Slow Resolvers]', {
            resolvers: slowResolvers.map(([path, duration]) => ({
              path,
              duration: `${duration}ms`,
            })),
          });
        }
      },
    };
  },
};

/**
 * Cache hit/miss tracking plugin
 */
export const cachePlugin: ApolloServerPlugin = {
  async requestDidStart() {
    let cacheHits = 0;
    let cacheMisses = 0;

    return {
      async willSendResponse({ response }) {
        const totalRequests = cacheHits + cacheMisses;
        const hitRate = totalRequests > 0 ? (cacheHits / totalRequests * 100).toFixed(2) : '0';

        console.log('[Cache Performance]', {
          hits: cacheHits,
          misses: cacheMisses,
          hitRate: `${hitRate}%`,
        });

        // Add cache stats to response headers
        if (response.http) {
          response.http.headers.set('X-Cache-Hits', cacheHits.toString());
          response.http.headers.set('X-Cache-Misses', cacheMisses.toString());
          response.http.headers.set('X-Cache-Hit-Rate', `${hitRate}%`);
        }
      },
    };
  },
};
