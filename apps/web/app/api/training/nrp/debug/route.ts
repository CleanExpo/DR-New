import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function listFiles(dir: string, depth: number = 2): Promise<any> {
  if (depth === 0) return null;

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const result: any = {};

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        result[entry.name + '/'] = await listFiles(fullPath, depth - 1);
      } else {
        result[entry.name] = 'file';
      }
    }

    return result;
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function GET() {
  try {
    const cwd = process.cwd();

    // Check various paths
    const checks = {
      'process.cwd()': cwd,
      '__dirname': __dirname,
      'lib/training': await listFiles(path.join(cwd, 'lib', 'training'), 3),
      'public': await listFiles(path.join(cwd, 'public'), 2),
    };

    // Check if specific directories exist
    const dirChecks = {
      'lib/training/sources exists': await fs.stat(path.join(cwd, 'lib', 'training', 'sources')).then(() => true).catch(() => false),
      'lib/training/sources/NRP Folder exists': await fs.stat(path.join(cwd, 'lib', 'training', 'sources', 'NRP Folder')).then(() => true).catch(() => false),
    };

    // Try to list files in lib/training/sources/NRP Folder if it exists
    let nrpFolderContents = null;
    try {
      const nrpFolderPath = path.join(cwd, 'lib', 'training', 'sources', 'NRP Folder');
      const files = await fs.readdir(nrpFolderPath);
      nrpFolderContents = files.slice(0, 10); // First 10 files
    } catch (error) {
      nrpFolderContents = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    return NextResponse.json({
      success: true,
      environment: process.env.VERCEL ? 'Vercel' : 'Local',
      checks,
      dirChecks,
      nrpFolderContents,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
