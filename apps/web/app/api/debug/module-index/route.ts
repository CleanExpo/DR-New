import { NextResponse } from 'next/server';
import { loadNrpgTrainingIndex } from '@/lib/training/nrp-training';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const index = await loadNrpgTrainingIndex();

    return NextResponse.json({
      totalModules: index.modules.length,
      moduleIds: index.modules.map(m => m.moduleId),
      firstModule: index.modules[0],
      lastModule: index.modules[index.modules.length - 1],
      nrp021: index.modules.find(m => m.moduleId === 'NRP-021'),
      generatedAt: index.generatedAt,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
