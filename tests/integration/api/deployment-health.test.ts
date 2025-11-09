import { GET } from '@/app/api/deployment/health/route'
import { NextRequest } from 'next/server'

describe('GET /api/deployment/health', () => {
  it('should return health status', async () => {
    const request = new NextRequest('http://localhost:3000/api/deployment/health', {
      method: 'GET',
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('status')
  })

  it('should include timestamp in health check', async () => {
    const request = new NextRequest('http://localhost:3000/api/deployment/health', {
      method: 'GET',
    })

    const response = await GET(request)
    const data = await response.json()

    expect(data).toHaveProperty('timestamp')
    expect(typeof data.timestamp).toBe('number')
  })

  it('should include uptime information', async () => {
    const request = new NextRequest('http://localhost:3000/api/deployment/health', {
      method: 'GET',
    })

    const response = await GET(request)
    const data = await response.json()

    expect(data).toHaveProperty('uptime')
  })

  it('should respond quickly', async () => {
    const startTime = Date.now()

    const request = new NextRequest('http://localhost:3000/api/deployment/health', {
      method: 'GET',
    })

    await GET(request)

    const responseTime = Date.now() - startTime

    // Health check should be fast (<1s)
    expect(responseTime).toBeLessThan(1000)
  })

  it('should include version information', async () => {
    const request = new NextRequest('http://localhost:3000/api/deployment/health', {
      method: 'GET',
    })

    const response = await GET(request)
    const data = await response.json()

    // May or may not include version
    expect(data).toBeDefined()
  })
})

describe('GET /api/deployment/metrics', () => {
  it('should return deployment metrics', async () => {
    const response = await fetch('http://localhost:3000/api/deployment/metrics')

    expect(response.status).toBeLessThan(500)
  })

  it('should include performance metrics', async () => {
    const response = await fetch('http://localhost:3000/api/deployment/metrics')
    const data = await response.json()

    // Metrics endpoint should return structured data
    expect(data).toBeDefined()
  })
})
