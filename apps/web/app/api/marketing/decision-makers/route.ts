/**
 * Marketing Decision Maker Intelligence API
 *
 * Used by Synthex campaign creation engine to pull ICP personas,
 * campaign hooks, and channel intelligence from CARSI.
 *
 * Disaster Recovery Pty Ltd | ABN: 85 151 794 142
 *
 * Endpoints:
 *   GET /api/marketing/decision-makers
 *   GET /api/marketing/decision-makers?persona=insurance-loss-adjuster
 *   GET /api/marketing/decision-makers?brand=nrpg
 *   GET /api/marketing/decision-makers?stage=solution-aware
 *   GET /api/marketing/decision-makers?channel=linkedin-ads
 *   GET /api/marketing/decision-makers?hooks=true&persona=property-manager
 */

import { NextRequest, NextResponse } from 'next/server'
import decisionMakersData from '@/data/marketing/decision-makers.json'
import type { DecisionMaker } from '@/lib/marketing/types'

export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const personaId = searchParams.get('persona')
  const brand = searchParams.get('brand')
  const stage = searchParams.get('stage')
  const channel = searchParams.get('channel')
  const hooksOnly = searchParams.get('hooks') === 'true'
  const synthexConfig = searchParams.get('config') === 'true'

  // Return synthex config
  if (synthexConfig) {
    return NextResponse.json(
      {
        config: (decisionMakersData as any).synthexConfig,
        version: decisionMakersData.version,
        lastUpdated: decisionMakersData.lastUpdated,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      }
    )
  }

  let personas: DecisionMaker[] = decisionMakersData.personas as DecisionMaker[]

  // Filter by persona ID
  if (personaId) {
    personas = personas.filter((p) => p.id === personaId)
    if (personas.length === 0) {
      return NextResponse.json({ error: `Persona '${personaId}' not found` }, { status: 404 })
    }
  }

  // Filter by brand
  if (brand) {
    personas = personas.filter((p) => p.brands.includes(brand as any))
  }

  // Return hooks only (for Synthex campaign creation)
  if (hooksOnly) {
    const hooks = personas.flatMap((p) =>
      p.campaignHooks.map((hook) => ({
        ...hook,
        personaId: p.id,
        personaName: p.name,
      }))
    )

    // Filter hooks by stage
    const filteredHooks = stage ? hooks.filter((h) => h.stage === stage) : hooks

    // Filter hooks by channel
    const channelFilteredHooks = channel
      ? filteredHooks.filter((h) => h.channel.includes(channel as any))
      : filteredHooks

    return NextResponse.json(
      {
        hooks: channelFilteredHooks,
        total: channelFilteredHooks.length,
        version: decisionMakersData.version,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      }
    )
  }

  // Return minimal persona data for list views
  const summary = personas.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    brands: p.brands,
    seniority: p.seniority,
    segmentPriority: p.synthex.segmentPriority,
    estimatedAudienceSize: p.synthex.estimatedAudienceSize,
    averageDealValue: p.synthex.averageDealValue,
    salesCycle: p.synthex.salesCycle,
    primaryHook: p.messagingFramework.primaryHook,
    preferredChannels: p.preferredChannels,
    tags: p.synthex.tags,
  }))

  return NextResponse.json(
    {
      personas: personaId ? personas : summary,
      total: summary.length,
      version: decisionMakersData.version,
      lastUpdated: decisionMakersData.lastUpdated,
      brand: decisionMakersData.brand,
      abn: decisionMakersData.abn,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    }
  )
}
