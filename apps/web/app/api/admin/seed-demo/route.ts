import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// RA-3009 2026-05-12: replaced public query-param guard with DB-verified ADMIN auth.
// Previous implementation: `?key=seed-demo-2026` literal in the public repo wrote
// real auth accounts to prod DB. See RA-1282 (pre-fix) + RA-3009 (this fix).
//
// Also gated behind NODE_ENV !== 'production' — seed endpoints should never be
// reachable on prod regardless of caller identity.

export async function POST(request: NextRequest) {
  // Step 1: refuse on production — seed routes are dev/staging only
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_SEED_ON_PROD !== 'true') {
    return NextResponse.json(
      { error: 'Seed endpoints are disabled on production. Set ALLOW_SEED_ON_PROD=true to override.' },
      { status: 404 }
    )
  }

  // Step 2: require ADMIN authentication (same pattern as app/api/admin/users/route.ts)
  const authResult = await authenticateRequest(request)
  if (!authResult.success) {
    return authResult.response
  }
  const { user } = authResult.context
  if (!requireRole(user, ['ADMIN'])) {
    return unauthorizedRoleResponse(['ADMIN'])
  }

  // Step 3: read demo password from env (no committed default)
  const demoPlaintext = process.env.SEED_DEMO_PASSWORD
  if (!demoPlaintext) {
    return NextResponse.json(
      { error: 'SEED_DEMO_PASSWORD env var must be set to seed demo accounts.' },
      { status: 503 }
    )
  }
  const demoHash = bcrypt.hashSync(demoPlaintext, 10)

  try {
    const results: string[] = []

    // 1. Demo Client
    const demoClient = await prisma.user.upsert({
      where: { email: 'demo.client@disasterrecovery.com.au' },
      update: { password: demoHash },
      create: {
        email: 'demo.client@disasterrecovery.com.au',
        name: 'Demo Client - RIA 2026',
        password: demoHash,
        userType: 'CLIENT',
        australianState: 'VIC',
        australianPostcode: '3000',
        suburb: 'Melbourne CBD',
        streetAddress: '120 Collins Street',
        isEmailVerified: true,
        isActive: true,
      },
    })
    results.push(`Client: ${demoClient.email}`)

    // 2. Demo Contractor
    const demoContractorUser = await prisma.user.upsert({
      where: { email: 'demo.contractor@disasterrecovery.com.au' },
      update: { password: demoHash },
      create: {
        email: 'demo.contractor@disasterrecovery.com.au',
        name: 'Rapid Response Restoration',
        password: demoHash,
        userType: 'CONTRACTOR',
        australianState: 'VIC',
        australianPostcode: '3000',
        suburb: 'Melbourne CBD',
        streetAddress: '200 Bourke Street',
        isEmailVerified: true,
        isActive: true,
      },
    })
    results.push(`Contractor: ${demoContractorUser.email}`)

    // 3. Demo Admin
    const demoAdmin = await prisma.user.upsert({
      where: { email: 'demo.admin@disasterrecovery.com.au' },
      update: { password: demoHash },
      create: {
        email: 'demo.admin@disasterrecovery.com.au',
        name: 'Demo Admin',
        password: demoHash,
        userType: 'ADMIN',
        australianState: 'VIC',
        australianPostcode: '3000',
        suburb: 'Melbourne CBD',
        streetAddress: '1 Admin Plaza',
        isEmailVerified: true,
        isActive: true,
      },
    })
    results.push(`Admin: ${demoAdmin.email}`)

    return NextResponse.json({
      success: true,
      message: 'Demo accounts seeded successfully.',
      accounts: results,
      // Password is NOT echoed back — caller already knows it (they set the env var)
    })
  } catch (error) {
    console.error('[seed-demo] error:', error)
    return NextResponse.json(
      { error: 'Failed to seed demo accounts. See server logs.' },
      { status: 500 }
    )
  }
}
