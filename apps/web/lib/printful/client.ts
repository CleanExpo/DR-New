/**
 * Printful API v2 Client
 *
 * Handles authenticated requests to the Printful dropshipping API.
 * All prices returned from Printful are in USD — conversion to AUD
 * happens at the application layer.
 */

const PRINTFUL_BASE_URL = 'https://api.printful.com'

interface PrintfulError {
  code: number
  result: string
  error: {
    reason: string
    message: string
  }
}

interface PrintfulResponse<T = unknown> {
  code: number
  result: T
}

function getApiKey(): string {
  const key = process.env.PRINTFUL_API_KEY
  if (!key) {
    throw new Error('PRINTFUL_API_KEY environment variable is not configured')
  }
  return key
}

function buildHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getApiKey()}`,
  }
}

async function handleResponse<T>(response: Response): Promise<PrintfulResponse<T>> {
  const data = await response.json()

  if (!response.ok) {
    const error = data as PrintfulError
    throw new PrintfulApiError(
      error.error?.message || `Printful API error: ${response.status}`,
      response.status,
      error.error?.reason
    )
  }

  return data as PrintfulResponse<T>
}

export class PrintfulApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public reason?: string
  ) {
    super(message)
    this.name = 'PrintfulApiError'
  }
}

export async function get<T = unknown>(path: string): Promise<PrintfulResponse<T>> {
  const response = await fetch(`${PRINTFUL_BASE_URL}${path}`, {
    method: 'GET',
    headers: buildHeaders(),
  })
  return handleResponse<T>(response)
}

export async function post<T = unknown>(
  path: string,
  body: Record<string, unknown>
): Promise<PrintfulResponse<T>> {
  const response = await fetch(`${PRINTFUL_BASE_URL}${path}`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<T>(response)
}

export async function put<T = unknown>(
  path: string,
  body: Record<string, unknown>
): Promise<PrintfulResponse<T>> {
  const response = await fetch(`${PRINTFUL_BASE_URL}${path}`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<T>(response)
}

export const printful = { get, post, put }
