import { NextRequest, NextResponse } from 'next/server'
import { translateText, batchTranslate } from '@/lib/translation/translator'
import { SUPPORTED_LANGUAGES } from '@/lib/translation/languages'

/**
 * POST /api/translate
 *
 * Single text translation
 * Body: { text: string, targetLanguage: string, sourceLanguage?: string, context?: string }
 *
 * GET /api/translate
 * Returns list of supported languages
 */

export async function GET() {
  return NextResponse.json({
    languages: SUPPORTED_LANGUAGES,
    defaultLanguage: 'en',
    totalCount: SUPPORTED_LANGUAGES.length,
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Batch mode: { texts: string[], targetLanguage: string, context?: string }
    if (Array.isArray(body.texts)) {
      if (!body.targetLanguage) {
        return NextResponse.json({ error: 'targetLanguage is required' }, { status: 400 })
      }
      if (body.texts.length > 50) {
        return NextResponse.json({ error: 'Maximum 50 texts per batch request' }, { status: 400 })
      }

      const translations = await batchTranslate(body.texts, body.targetLanguage, body.context)
      return NextResponse.json({ translations, targetLanguage: body.targetLanguage })
    }

    // Single mode
    const { text, targetLanguage, sourceLanguage, context } = body

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'text is required and must be a string' }, { status: 400 })
    }
    if (!targetLanguage || typeof targetLanguage !== 'string') {
      return NextResponse.json({ error: 'targetLanguage is required' }, { status: 400 })
    }
    if (text.length > 5000) {
      return NextResponse.json({ error: 'text must be 5000 characters or less' }, { status: 400 })
    }

    const result = await translateText({ text, targetLanguage, sourceLanguage, context })

    return NextResponse.json(result)
  } catch (error) {
    console.error('[/api/translate] error:', error)
    return NextResponse.json(
      { error: 'Translation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
