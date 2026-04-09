import { NextRequest, NextResponse } from 'next/server'
import { generateImage, isImageGenerationAvailable } from '@/lib/ai/image.service'

export async function POST(req: NextRequest) {
  if (!isImageGenerationAvailable()) {
    return NextResponse.json({ error: 'Image generation not configured' }, { status: 503 })
  }
  try {
    const body = await req.json()
    const result = await generateImage(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
