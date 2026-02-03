import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const cwd = process.cwd();
    const checks = [];

    // Check various possible locations for training files
    const pathsToCheck = [
      path.join(cwd, 'training-sources', 'NRP Folder'),
      path.join(cwd, '..', 'training-sources', 'NRP Folder'),
      path.join(cwd, '..', '..', 'training-sources', 'NRP Folder'),
      path.join(cwd, 'lib', 'training', 'sources', 'NRP Folder'),
    ];

    for (const checkPath of pathsToCheck) {
      try {
        const files = await fs.readdir(checkPath);
        checks.push({
          path: checkPath,
          exists: true,
          fileCount: files.length,
          files: files.filter(f => f.startsWith('NRP-02')).slice(0, 10),
        });
      } catch (error) {
        checks.push({
          path: checkPath,
          exists: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return NextResponse.json({
      cwd,
      checks,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
