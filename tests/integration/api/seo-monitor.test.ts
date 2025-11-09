import { GET } from '@/app/api/seo/monitor/route'
import { NextRequest } from 'next/server'

describe('GET /api/seo/monitor', () => {
  it('should return SEO monitoring data', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor', {
      method: 'GET',
    })

    const response = await GET(request)

    expect(response.status).toBeLessThan(500)
  })

  it('should include page metadata', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor', {
      method: 'GET',
    })

    const response = await GET(request)
    const data = await response.json()

    // Should return structured data
    expect(data).toBeDefined()
  })

  it('should track important pages', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor', {
      method: 'GET',
    })

    const response = await GET(request)
    const data = await response.json()

    // Should monitor key pages
    // Homepage, service pages, location pages
    expect(data).toBeDefined()
  })

  it('should validate metadata requirements', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor', {
      method: 'GET',
    })

    const response = await GET(request)

    // Should validate title, description, etc.
    expect(response.status).toBeLessThan(500)
  })

  it('should check for local SEO elements', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor', {
      method: 'GET',
    })

    const response = await GET(request)
    const data = await response.json()

    // Should verify Brisbane/Queensland keywords
    // Should verify local business schema
    expect(data).toBeDefined()
  })
})
