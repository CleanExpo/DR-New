import { GraphQLError } from 'graphql';
import {
  getComplexity,
  simpleEstimator,
  fieldExtensionsEstimator,
} from 'graphql-query-complexity';
import type { ApolloServerPlugin } from '@apollo/server';

/**
 * Query complexity analysis plugin
 * Prevents overly complex queries that could overwhelm the server
 */
export const complexityPlugin: ApolloServerPlugin = {
  async requestDidStart() {
    return {
      async didResolveOperation({ request, document, schema }) {
        const complexity = getComplexity({
          schema,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        const maxComplexity = 1000;

        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
            {
              extensions: {
                code: 'QUERY_TOO_COMPLEX',
                complexity,
                maxComplexity,
              },
            }
          );
        }

        console.log('[Query Complexity]', {
          complexity,
          maxComplexity,
          query: request.operationName,
        });
      },
    };
  },
};
