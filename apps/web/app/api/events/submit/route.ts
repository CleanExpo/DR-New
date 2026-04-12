import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// ── Validation helpers ─────────────────────────────────────────────────────────

const VALID_CATEGORIES = ['IICRC_TRAINING', 'CONFERENCE', 'TRADE_SHOW', 'WEBINAR', 'WORKSHOP', 'OTHER'] as const
const VALID_FORMATS = ['IN_PERSON', 'ONLINE', 'HYBRID'] as const
const VALID_COUNTRIES = ['AU', 'NZ', 'JP'] as const

type Category = typeof VALID_CATEGORIES[number]
type Format = typeof VALID_FORMATS[number]
type Country = typeof VALID_COUNTRIES[number]

function isValidCategory(v: unknown): v is Category {
  return typeof v === 'string' && (VALID_CATEGORIES as readonly string[]).includes(v)
}
function isValidFormat(v: unknown): v is Format {
  return typeof v === 'string' && (VALID_FORMATS as readonly string[]).includes(v)
}
function isValidCountry(v: unknown): v is Country {
  return typeof v === 'string' && (VALID_COUNTRIES as readonly string[]).includes(v)
}
function isValidEmail(v: unknown): v is string {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}
function isValidUrl(v: unknown): v is string {
  if (!v) return true // optional
  try { new URL(v as string); return true } catch { return false }
}

// ── POST /api/events/submit ────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    eventName,
    organizerName,
    organizerCompany,
    category,
    format,
    country,
    state,
    city,
    venue,
    startDate,
    endDate,
    description,
    websiteUrl,
    ticketUrl,
    priceAud,
    isFree,
    iicrcCeus,
    iicrcCertApplicable,
    submittedByEmail,
  } = body

  // ── Required field validation ────────────────────────────────────────────────

  const errors: Record<string, string> = {}

  if (!eventName || typeof eventName !== 'string' || eventName.trim().length < 3) {
    errors.eventName = 'Event name is required (min 3 characters)'
  }
  if (!organizerName || typeof organizerName !== 'string' || organizerName.trim().length < 2) {
    errors.organizerName = 'Organiser name is required'
  }
  if (!isValidCategory(category)) {
    errors.category = `Category must be one of: ${VALID_CATEGORIES.join(', ')}`
  }
  if (!isValidFormat(format)) {
    errors.format = `Format must be one of: ${VALID_FORMATS.join(', ')}`
  }
  if (!isValidCountry(country)) {
    errors.country = `Country must be one of: ${VALID_COUNTRIES.join(', ')}`
  }
  if (!startDate || isNaN(Date.parse(startDate as string))) {
    errors.startDate = 'Valid start date is required'
  }
  if (!endDate || isNaN(Date.parse(endDate as string))) {
    errors.endDate = 'Valid end date is required'
  }
  if (startDate && endDate && new Date(endDate as string) < new Date(startDate as string)) {
    errors.endDate = 'End date must be after start date'
  }
  if (!description || typeof description !== 'string' || description.trim().length < 20) {
    errors.description = 'Description is required (min 20 characters)'
  }
  if (!isValidEmail(submittedByEmail)) {
    errors.submittedByEmail = 'Valid email address is required'
  }
  if (!isValidUrl(websiteUrl)) {
    errors.websiteUrl = 'Must be a valid URL (https://...)'
  }
  if (!isValidUrl(ticketUrl)) {
    errors.ticketUrl = 'Must be a valid URL (https://...)'
  }
  if (priceAud !== undefined && priceAud !== null && isNaN(Number(priceAud))) {
    errors.priceAud = 'Price must be a number'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 })
  }

  // ── Write to DB ──────────────────────────────────────────────────────────────

  try {
    const submission = await prisma.eventSubmission.create({
      data: {
        eventName: (eventName as string).trim(),
        organizerName: (organizerName as string).trim(),
        organizerCompany: organizerCompany ? (organizerCompany as string).trim() : null,
        category: category as Category,
        format: format as Format,
        country: country as Country,
        state: state ? (state as string).trim() : null,
        city: city ? (city as string).trim() : null,
        venue: venue ? (venue as string).trim() : null,
        startDate: new Date(startDate as string),
        endDate: new Date(endDate as string),
        description: (description as string).trim(),
        websiteUrl: websiteUrl ? (websiteUrl as string).trim() : null,
        ticketUrl: ticketUrl ? (ticketUrl as string).trim() : null,
        priceAud: priceAud ? Number(priceAud) : null,
        isFree: Boolean(isFree),
        iicrcCeus: iicrcCeus ? Number(iicrcCeus) : null,
        iicrcCertApplicable: iicrcCertApplicable ? (iicrcCertApplicable as string).trim() : null,
        submittedByEmail: (submittedByEmail as string).toLowerCase().trim(),
        status: 'PENDING',
      },
      select: { id: true, eventName: true, status: true, createdAt: true },
    })

    return NextResponse.json(
      {
        success: true,
        submissionId: submission.id,
        message: 'Event submitted for review. You will be notified when it is approved.',
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[POST /api/events/submit]', err)
    return NextResponse.json({ error: 'Failed to save submission. Please try again.' }, { status: 500 })
  }
}
