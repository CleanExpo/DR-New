/**
 * Generic Type-safe API Client
 *
 * Provides type-safe API requests with automatic type inference
 */

import type {
  HTTPMethod,
  APIResponse,
  APISuccessResponse,
  APIErrorResponse,
  RequestConfig,
  RetryPolicy,
  ErrorCode,
} from '@/lib/types';

/**
 * API Client Configuration
 */
export interface APIClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  retryPolicy?: RetryPolicy;
  interceptors?: {
    request?: RequestInterceptor[];
    response?: ResponseInterceptor[];
  };
}

/**
 * Request Interceptor
 */
export type RequestInterceptor = (
  config: RequestConfig
) => RequestConfig | Promise<RequestConfig>;

/**
 * Response Interceptor
 */
export type ResponseInterceptor = <T>(
  response: APIResponse<T>
) => APIResponse<T> | Promise<APIResponse<T>>;

/**
 * Generic API Client
 */
export class APIClient {
  private config: Required<Omit<APIClientConfig, 'interceptors'>> & {
    interceptors: {
      request: RequestInterceptor[];
      response: ResponseInterceptor[];
    };
  };

  constructor(config: APIClientConfig) {
    this.config = {
      baseURL: config.baseURL,
      timeout: config.timeout ?? 30000,
      headers: config.headers ?? {},
      retryPolicy: config.retryPolicy ?? this.getDefaultRetryPolicy(),
      interceptors: {
        request: config.interceptors?.request ?? [],
        response: config.interceptors?.response ?? [],
      },
    };
  }

  /**
   * GET request
   */
  async get<T>(
    path: string,
    params?: Record<string, any>,
    config?: Partial<RequestConfig>
  ): Promise<APIResponse<T>> {
    return this.request<T>({
      method: 'GET',
      ...config,
      params,
    }, path);
  }

  /**
   * POST request
   */
  async post<T>(
    path: string,
    body?: any,
    config?: Partial<RequestConfig>
  ): Promise<APIResponse<T>> {
    return this.request<T>(
      {
        method: 'POST',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      },
      path,
      body
    );
  }

  /**
   * PUT request
   */
  async put<T>(
    path: string,
    body?: any,
    config?: Partial<RequestConfig>
  ): Promise<APIResponse<T>> {
    return this.request<T>(
      {
        method: 'PUT',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      },
      path,
      body
    );
  }

  /**
   * PATCH request
   */
  async patch<T>(
    path: string,
    body?: any,
    config?: Partial<RequestConfig>
  ): Promise<APIResponse<T>> {
    return this.request<T>(
      {
        method: 'PATCH',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      },
      path,
      body
    );
  }

  /**
   * DELETE request
   */
  async delete<T>(
    path: string,
    config?: Partial<RequestConfig>
  ): Promise<APIResponse<T>> {
    return this.request<T>(
      {
        method: 'DELETE',
        ...config,
      },
      path
    );
  }

  /**
   * Generic request method
   */
  private async request<T>(
    requestConfig: Partial<RequestConfig> & { method: HTTPMethod },
    path: string,
    body?: any
  ): Promise<APIResponse<T>> {
    let config: RequestConfig = {
      method: requestConfig.method,
      headers: {
        ...this.config.headers,
        ...requestConfig.headers,
      },
      timeout: requestConfig.timeout ?? this.config.timeout,
      retries: requestConfig.retries ?? this.config.retryPolicy.maxRetries,
      params: requestConfig.params,
      cache: requestConfig.cache,
    };

    // Apply request interceptors
    for (const interceptor of this.config.interceptors.request) {
      config = await interceptor(config);
    }

    const url = this.buildURL(path, config.params);

    let response: APIResponse<T>;
    let attempt = 0;
    const maxAttempts = (config.retries ?? 0) + 1;

    while (attempt < maxAttempts) {
      try {
        response = await this.executeRequest<T>(url, config, body);

        // Apply response interceptors
        for (const interceptor of this.config.interceptors.response) {
          response = await interceptor(response);
        }

        // Return if successful or non-retryable error
        if (
          response.status === 'success' ||
          (response.status === 'error' &&
            !this.isRetryableError(response.error.code))
        ) {
          return response;
        }

        attempt++;
        if (attempt < maxAttempts) {
          await this.delay(this.getRetryDelay(attempt));
        }
      } catch (error) {
        if (attempt === maxAttempts - 1) {
          return this.createErrorResponse(error);
        }
        attempt++;
        await this.delay(this.getRetryDelay(attempt));
      }
    }

    return this.createErrorResponse(new Error('Max retries exceeded'));
  }

  /**
   * Execute HTTP request
   */
  private async executeRequest<T>(
    url: string,
    config: RequestConfig,
    body?: any
  ): Promise<APIResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      const response = await fetch(url, {
        method: config.method,
        headers: config.headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        cache: config.cache,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        return {
          status: 'error',
          error: {
            code: this.mapHTTPStatusToErrorCode(response.status),
            message: data.message ?? response.statusText,
            details: data,
          },
          metadata: {
            timestamp: Date.now(),
            requestId: response.headers.get('x-request-id') ?? '',
          },
        } as APIErrorResponse;
      }

      return {
        status: 'success',
        data: data as T,
        metadata: {
          timestamp: Date.now(),
          requestId: response.headers.get('x-request-id') ?? '',
          version: response.headers.get('x-api-version') ?? '1.0',
        },
      } as APISuccessResponse<T>;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Build full URL with query parameters
   */
  private buildURL(path: string, params?: Record<string, any>): string {
    const url = new URL(path, this.config.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Create error response from exception
   */
  private createErrorResponse<T>(error: unknown): APIErrorResponse {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const code: ErrorCode = error instanceof Error && error.name === 'AbortError'
      ? 'TIMEOUT'
      : 'NETWORK_ERROR';

    return {
      status: 'error',
      error: {
        code,
        message,
        details: error,
      },
      metadata: {
        timestamp: Date.now(),
        requestId: '',
      },
    };
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(code: ErrorCode): boolean {
    return this.config.retryPolicy.retryableErrors.includes(code);
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private getRetryDelay(attempt: number): number {
    const delay =
      this.config.retryPolicy.initialDelay *
      Math.pow(this.config.retryPolicy.backoffMultiplier, attempt - 1);

    return Math.min(delay, this.config.retryPolicy.maxDelay);
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Map HTTP status to error code
   */
  private mapHTTPStatusToErrorCode(status: number): ErrorCode {
    const mapping: Record<number, ErrorCode> = {
      400: 'VALIDATION_ERROR',
      401: 'AUTHENTICATION_ERROR',
      403: 'AUTHORIZATION_ERROR',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      429: 'RATE_LIMIT_EXCEEDED',
      500: 'SERVER_ERROR',
      503: 'SERVER_ERROR',
    };

    return mapping[status] ?? 'UNKNOWN_ERROR';
  }

  /**
   * Default retry policy
   */
  private getDefaultRetryPolicy(): RetryPolicy {
    return {
      maxRetries: 3,
      backoffMultiplier: 2,
      initialDelay: 1000,
      maxDelay: 10000,
      retryableErrors: ['NETWORK_ERROR', 'TIMEOUT', 'SERVER_ERROR'],
    };
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.config.interceptors.request.push(interceptor);
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.config.interceptors.response.push(interceptor);
  }
}

/**
 * Create API client instance
 */
export function createAPIClient(config: APIClientConfig): APIClient {
  return new APIClient(config);
}

/**
 * Default API client for the application
 */
export const apiClient = createAPIClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://disasterrecovery.com.au',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add authentication interceptor
 */
apiClient.addRequestInterceptor(async (config) => {
  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return config;
});

/**
 * Add logging interceptor
 */
if (process.env.NODE_ENV === 'development') {
  apiClient.addRequestInterceptor(async (config) => {
    console.log('[API Request]', config.method, config);
    return config;
  });

  apiClient.addResponseInterceptor(async (response) => {
    console.log('[API Response]', response.status, response);
    return response;
  });
}
