/**
 * Insurance Claim Documents API
 * GET    /api/claims/[id]/documents - List documents for a claim
 * POST   /api/claims/[id]/documents - Upload document metadata to a claim
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

// ============================================================================
// GET /api/claims/[id]/documents - List claim documents
// ============================================================================

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const claim = await db.insuranceClaimAU.findUnique({
      where: { id: params.id },
      select: {
        clientId: true,
        damagePhotos: true,
        invoiceUrl: true,
        estimateUrl: true,
        additionalDocuments: true,
      },
    });

    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    if (claim.clientId !== user.id && user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
    }

    // Consolidate all documents into a normalised list
    const documents: Array<{
      id: string;
      name: string;
      category: string;
      url: string;
      uploadedAt: string;
    }> = [];

    claim.damagePhotos.forEach((url, i) => {
      documents.push({
        id: `photo-${i}`,
        name: `Damage Photo ${i + 1}`,
        category: 'Damage Photo',
        url,
        uploadedAt: new Date().toISOString(),
      });
    });

    if (claim.invoiceUrl) {
      documents.push({
        id: 'invoice',
        name: 'Invoice',
        category: 'Invoice',
        url: claim.invoiceUrl,
        uploadedAt: new Date().toISOString(),
      });
    }

    if (claim.estimateUrl) {
      documents.push({
        id: 'estimate',
        name: 'Cost Estimate',
        category: 'Quote',
        url: claim.estimateUrl,
        uploadedAt: new Date().toISOString(),
      });
    }

    claim.additionalDocuments.forEach((url, i) => {
      documents.push({
        id: `doc-${i}`,
        name: `Supporting Document ${i + 1}`,
        category: 'Supporting',
        url,
        uploadedAt: new Date().toISOString(),
      });
    });

    return NextResponse.json({ success: true, documents });
  } catch (error) {
    console.error('Error fetching claim documents:', error);
    return NextResponse.json({ error: 'Error fetching documents' }, { status: 500 });
  }
}

// ============================================================================
// POST /api/claims/[id]/documents - Add document to claim
// ============================================================================

export async function POST(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const claim = await db.insuranceClaimAU.findUnique({
      where: { id: params.id },
      select: {
        clientId: true,
        damagePhotos: true,
        additionalDocuments: true,
      },
    });

    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    if (claim.clientId !== user.id && user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
    }

    const body = await request.json();
    const { url, category } = body;

    if (!url) {
      return NextResponse.json({ error: 'Document URL is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};

    if (category === 'photo') {
      updateData.damagePhotos = [...claim.damagePhotos, url];
    } else if (category === 'invoice') {
      updateData.invoiceUrl = url;
    } else if (category === 'estimate') {
      updateData.estimateUrl = url;
    } else {
      updateData.additionalDocuments = [...claim.additionalDocuments, url];
    }

    await db.insuranceClaimAU.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Document added to claim',
    });
  } catch (error) {
    console.error('Error adding document:', error);
    return NextResponse.json({ error: 'Error adding document' }, { status: 500 });
  }
}
