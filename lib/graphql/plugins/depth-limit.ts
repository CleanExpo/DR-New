import { GraphQLError } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import type { ApolloServerPlugin } from '@apollo/server';

/**
 * Query depth limit plugin
 * Prevents deeply nested queries that could cause performance issues
 */
export function createDepthLimitPlugin(maxDepth: number = 10): ApolloServerPlugin {
  return {
    async requestDidStart() {
      return {
        async didResolveOperation({ request, document }) {
          try {
            const depthLimitRule = depthLimit(maxDepth, {
              ignore: [
                '_service',
                '_entities',
                '__schema',
                '__type',
              ],
            });

            // Validate depth
            // Note: depthLimit returns a validation rule that should be used with graphql-js validate()
            // For Apollo Server integration, we'll implement a simpler check
            const queryDepth = calculateQueryDepth(document);

            if (queryDepth > maxDepth) {
              throw new GraphQLError(
                `Query exceeds maximum depth of ${maxDepth}. Current depth: ${queryDepth}`,
                {
                  extensions: {
                    code: 'QUERY_TOO_DEEP',
                    depth: queryDepth,
                    maxDepth,
                  },
                }
              );
            }

            console.log('[Query Depth]', {
              depth: queryDepth,
              maxDepth,
              query: request.operationName,
            });
          } catch (error: any) {
            if (error instanceof GraphQLError) {
              throw error;
            }
            // Handle other errors
            console.error('[Depth Limit Plugin Error]', error);
          }
        },
      };
    },
  };
}

/**
 * Calculate the depth of a GraphQL query
 */
function calculateQueryDepth(document: any): number {
  let maxDepth = 0;

  function traverse(node: any, currentDepth: number = 0) {
    if (!node) return;

    if (node.kind === 'Field') {
      maxDepth = Math.max(maxDepth, currentDepth);
      if (node.selectionSet) {
        node.selectionSet.selections.forEach((selection: any) => {
          traverse(selection, currentDepth + 1);
        });
      }
    } else if (node.kind === 'OperationDefinition' || node.kind === 'FragmentDefinition') {
      if (node.selectionSet) {
        node.selectionSet.selections.forEach((selection: any) => {
          traverse(selection, 1);
        });
      }
    } else if (node.kind === 'InlineFragment' || node.kind === 'FragmentSpread') {
      if (node.selectionSet) {
        node.selectionSet.selections.forEach((selection: any) => {
          traverse(selection, currentDepth);
        });
      }
    }
  }

  if (document.definitions) {
    document.definitions.forEach((definition: any) => {
      traverse(definition);
    });
  }

  return maxDepth;
}
