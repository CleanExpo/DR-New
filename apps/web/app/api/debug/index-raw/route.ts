import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const results: any = {
      cwd: process.cwd(),
      attempts: [],
    };

    // Try multiple possible locations
    const pathsToTry = [
      path.join(process.cwd(), 'lib', 'training', 'generated', 'nrp-training-index.json'),
      path.join(process.cwd(), 'src', 'lib', 'training', 'generated', 'nrp-training-index.json'),
      path.join(process.cwd(), '..', '..', 'apps', 'web', 'src', 'lib', 'training', 'generated', 'nrp-training-index.json'),
    ];

    for (const tryPath of pathsToTry) {
      try {
        const content = await fs.readFile(tryPath, 'utf8');
        const index = JSON.parse(content);
        results.attempts.push({
          path: tryPath,
          exists: true,
          totalModules: index.modules?.length || 0,
          firstModule: index.modules?.[0]?.moduleId,
          lastModule: index.modules?.[index.modules.length - 1]?.moduleId,
          has_NRP_021: index.modules?.some((m: any) => m.moduleId === 'NRP-021'),
        });
      } catch (error) {
        results.attempts.push({
          path: tryPath,
          exists: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
