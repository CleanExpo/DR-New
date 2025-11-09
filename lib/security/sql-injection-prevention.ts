/**
 * SQL Injection Prevention
 * Provides utilities to prevent SQL injection attacks
 */

import { Prisma } from '@prisma/client';

/**
 * Detect potential SQL injection attempts
 */
export function detectSQLInjection(input: string): {
  suspicious: boolean;
  patterns: string[];
} {
  const suspiciousPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|TRUNCATE|REPLACE|MERGE)\b)/gi,
    /('|"|;|--|\*|\/\*|\*\/)/g,
    /(OR\s+1\s*=\s*1|AND\s+1\s*=\s*1)/gi,
    /(UNION\s+SELECT)/gi,
    /(\/\*.*?\*\/)/g,
    /(--\s*.*$)/gm,
    /(\bEXEC\s*\(|\bEXECUTE\s*\()/gi,
    /(\bxp_cmdshell\b)/gi,
    /(\bSLEEP\s*\(|\bBENCHMARK\s*\()/gi,
  ];

  const detectedPatterns: string[] = [];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      detectedPatterns.push(pattern.source);
    }
  }

  return {
    suspicious: detectedPatterns.length > 0,
    patterns: detectedPatterns,
  };
}

/**
 * Sanitize input for safe use in queries
 * NOTE: Always use parameterized queries instead when possible
 */
export function sanitizeForSQL(input: string): string {
  // Remove SQL keywords
  let sanitized = input.replace(
    /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|TRUNCATE|REPLACE|MERGE|SCRIPT)\b/gi,
    ''
  );

  // Escape special characters
  sanitized = sanitized
    .replace(/'/g, "''") // Escape single quotes
    .replace(/;/g, '') // Remove semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove block comment start
    .replace(/\*\//g, '') // Remove block comment end
    .replace(/\\/g, '\\\\'); // Escape backslashes

  return sanitized;
}

/**
 * Validate and sanitize identifiers (table names, column names)
 */
export function sanitizeIdentifier(identifier: string): string {
  // Only allow alphanumeric and underscore
  return identifier.replace(/[^a-zA-Z0-9_]/g, '');
}

/**
 * Build safe WHERE clause with Prisma
 */
export function buildSafeWhereClause<T extends Record<string, any>>(
  filters: Partial<T>
): Prisma.InputJsonValue {
  const safeFilters: any = {};

  for (const [key, value] of Object.entries(filters)) {
    // Sanitize the key
    const safeKey = sanitizeIdentifier(key);

    // Validate and sanitize the value
    if (typeof value === 'string') {
      const { suspicious } = detectSQLInjection(value);
      if (suspicious) {
        console.warn(`[SQL INJECTION] Suspicious input detected for key: ${key}`);
        continue; // Skip suspicious values
      }
      safeFilters[safeKey] = value;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      safeFilters[safeKey] = value;
    } else if (value === null || value === undefined) {
      safeFilters[safeKey] = value;
    }
  }

  return safeFilters;
}

/**
 * Validate ORDER BY clause
 */
export function validateOrderBy(
  orderBy: string,
  allowedColumns: string[]
): { valid: boolean; sanitized?: string } {
  const sanitized = sanitizeIdentifier(orderBy);

  if (!allowedColumns.includes(sanitized)) {
    return { valid: false };
  }

  return { valid: true, sanitized };
}

/**
 * Validate LIMIT/OFFSET values
 */
export function validatePagination(
  limit: number,
  offset: number,
  maxLimit = 1000
): { valid: boolean; sanitized?: { limit: number; offset: number } } {
  // Ensure they are positive integers
  const safeLimit = Math.max(1, Math.min(Math.floor(limit), maxLimit));
  const safeOffset = Math.max(0, Math.floor(offset));

  return {
    valid: true,
    sanitized: { limit: safeLimit, offset: safeOffset },
  };
}

/**
 * Safe query builder for dynamic queries
 */
export class SafeQueryBuilder {
  private conditions: string[] = [];
  private parameters: any[] = [];
  private paramIndex = 1;

  /**
   * Add WHERE condition with parameterized value
   */
  where(column: string, operator: string, value: any): this {
    const safeColumn = sanitizeIdentifier(column);
    const safeOperator = this.validateOperator(operator);

    if (!safeOperator) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    this.conditions.push(`${safeColumn} ${safeOperator} $${this.paramIndex}`);
    this.parameters.push(value);
    this.paramIndex++;

    return this;
  }

  /**
   * Add multiple AND conditions
   */
  whereAnd(conditions: Array<{ column: string; operator: string; value: any }>): this {
    conditions.forEach(cond => this.where(cond.column, cond.operator, cond.value));
    return this;
  }

  /**
   * Build the WHERE clause
   */
  buildWhere(): { clause: string; parameters: any[] } {
    const clause = this.conditions.length > 0
      ? `WHERE ${this.conditions.join(' AND ')}`
      : '';

    return {
      clause,
      parameters: this.parameters,
    };
  }

  /**
   * Validate SQL operator
   */
  private validateOperator(operator: string): string | null {
    const allowedOperators = ['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'IN', 'NOT IN', 'IS', 'IS NOT'];
    const normalized = operator.toUpperCase().trim();

    return allowedOperators.includes(normalized) ? normalized : null;
  }
}

/**
 * Prisma query logger for security monitoring
 */
export function logPrismaQuery(query: string, params?: any): void {
  // Log queries in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[PRISMA QUERY]', query);
    if (params) {
      console.log('[PRISMA PARAMS]', params);
    }
  }

  // In production, check for suspicious patterns
  if (process.env.NODE_ENV === 'production') {
    const { suspicious, patterns } = detectSQLInjection(query);
    if (suspicious) {
      console.error('[SECURITY] Suspicious query detected:', {
        query: query.substring(0, 100),
        patterns,
        timestamp: new Date().toISOString(),
      });
    }
  }
}

/**
 * Middleware for Prisma to prevent SQL injection
 */
export function createPrismaSecurityMiddleware() {
  return async (params: any, next: any) => {
    const { model, action, args } = params;

    // Log the query
    logPrismaQuery(`${model}.${action}`, args);

    // Validate where clause if present
    if (args?.where) {
      const whereString = JSON.stringify(args.where);
      const { suspicious, patterns } = detectSQLInjection(whereString);

      if (suspicious) {
        console.error('[SECURITY] SQL Injection attempt detected in Prisma query', {
          model,
          action,
          patterns,
        });
        throw new Error('Invalid query parameters');
      }
    }

    // Execute the query
    return next(params);
  };
}
