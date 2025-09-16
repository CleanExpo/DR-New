// Heatmap Data Collection API
// Collects and processes user interaction data for heatmap visualization

import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo (use database in production)
const heatmapData: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Add timestamp if not present
    const data = {
      ...body,
      serverTimestamp: Date.now(),
    }

    // Store heatmap data
    heatmapData.push(data)

    // Keep only last 1000 data points
    if (heatmapData.length > 1000) {
      heatmapData.shift()
    }

    // In production, store in database
    // await db.heatmap.create({ data })

    return NextResponse.json({
      success: true,
      message: 'Heatmap data recorded',
    })
  } catch (error) {
    console.error('Heatmap tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to record heatmap data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '/'
  const limit = parseInt(searchParams.get('limit') || '100')

  // Filter heatmap data by page
  const pageData = heatmapData
    .filter(d => d.page === page || !page)
    .slice(-limit)

  // Aggregate click data for visualization
  const clickMap = new Map()
  const moveMap = new Map()

  pageData.forEach(point => {
    if (point.type === 'click') {
      const key = `${Math.floor(point.x / 10)},${Math.floor(point.y / 10)}`
      clickMap.set(key, (clickMap.get(key) || 0) + 1)
    } else if (point.type === 'move') {
      const key = `${Math.floor(point.x / 20)},${Math.floor(point.y / 20)}`
      moveMap.set(key, (moveMap.get(key) || 0) + 1)
    }
  })

  return NextResponse.json({
    clicks: Array.from(clickMap.entries()).map(([key, count]) => {
      const [x, y] = key.split(',').map(Number)
      return { x: x * 10, y: y * 10, count }
    }),
    movements: Array.from(moveMap.entries()).map(([key, count]) => {
      const [x, y] = key.split(',').map(Number)
      return { x: x * 20, y: y * 20, intensity: Math.min(count / 10, 1) }
    }),
    totalPoints: pageData.length,
  })
}