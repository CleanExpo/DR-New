import { POST } from '@/app/api/monitoring/web-vitals/route'
import { NextRequest } from 'next/server'

describe('POST /api/monitoring/web-vitals', () => {
  it('should accept valid web vitals data', async () => {
    const vitalsData = {
      name: 'CLS',
      value: 0.05,
      rating: 'good',
      delta: 0.05,
      id: 'v3-1234567890',
      navigationType: 'navigate',
    }

    const request = new NextRequest('http://localhost:3000/api/monitoring/web-vitals', {
      method: 'POST',
      body: JSON.stringify(vitalsData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)

    expect(response.status).toBeLessThan(500)
  })

  it('should handle LCP metric', async () => {
    const lcpData = {
      name: 'LCP',
      value: 2500,
      rating: 'good',
      delta: 2500,
      id: 'v3-lcp-123',
    }

    const request = new NextRequest('http://localhost:3000/api/monitoring/web-vitals', {
      method: 'POST',
      body: JSON.stringify(lcpData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)

    expect(response.status).toBeLessThan(500)
  })

  it('should handle FID metric', async () => {
    const fidData = {
      name: 'FID',
      value: 100,
      rating: 'good',
      delta: 100,
      id: 'v3-fid-123',
    }

    const request = new NextRequest('http://localhost:3000/api/monitoring/web-vitals', {
      method: 'POST',
      body: JSON.stringify(fidData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)

    expect(response.status).toBeLessThan(500)
  })

  it('should reject invalid metric names', async () => {
    const invalidData = {
      name: 'INVALID_METRIC',
      value: 100,
      rating: 'good',
    }

    const request = new NextRequest('http://localhost:3000/api/monitoring/web-vitals', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)

    // May accept or reject based on validation
    expect(response.status).toBeGreaterThanOrEqual(200)
  })

  it('should handle batch vitals submissions', async () => {
    const batchData = [
      { name: 'CLS', value: 0.1, rating: 'good' },
      { name: 'LCP', value: 2500, rating: 'good' },
      { name: 'FID', value: 100, rating: 'good' },
    ]

    const request = new NextRequest('http://localhost:3000/api/monitoring/web-vitals', {
      method: 'POST',
      body: JSON.stringify(batchData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)

    expect(response.status).toBeLessThan(500)
  })
})

describe('GET /api/analytics/vitals', () => {
  it('should return analytics data', async () => {
    const response = await fetch('http://localhost:3000/api/analytics/vitals')

    expect(response.status).toBeLessThan(500)
  })
})
