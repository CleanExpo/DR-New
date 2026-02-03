import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const diagnostics: any = {
      timestamp: new Date().toISOString(),
      cwd: process.cwd(),
      nodeVersion: process.version,
      platform: process.platform,
      checks: [],
    };

    // Check all possible file locations
    const pathsToCheck = [
      // Copied sources (where files SHOULD be after build)
      path.join(process.cwd(), 'lib', 'training', 'sources', 'NRP Folder', 'NRP-021-DR-NRPG-PLATFORM-OPERATIONS.html'),
      path.join(process.cwd(), 'lib', 'training', 'sources', 'NRP Folder', 'NRP-022-CONTINUAL-EDUCATION-CREDITS.html'),
      path.join(process.cwd(), 'lib', 'training', 'sources', 'NRP Folder', 'NRP-023-ASSOCIATION-MEMBERSHIPS-BENEFITS.html'),
      path.join(process.cwd(), 'lib', 'training', 'sources', 'NRP Folder', 'NRP-024-MEMBERS-GATHERINGS-NETWORKING.html'),
      path.join(process.cwd(), 'lib', 'training', 'sources', 'NRP Folder', 'NRP-020-ADVANCED-RESTORATION-TECHNOLOGIES.html'),

      // Generated index (where module index SHOULD be after build)
      path.join(process.cwd(), 'lib', 'training', 'generated', 'nrp-training-index.json'),

      // Repository root (original sources)
      path.join(process.cwd(), '..', '..', 'training-sources', 'NRP Folder', 'NRP-021-DR-NRPG-PLATFORM-OPERATIONS.html'),
      path.join(process.cwd(), '..', '..', '..', 'training-sources', 'NRP Folder', 'NRP-021-DR-NRPG-PLATFORM-OPERATIONS.html'),
    ];

    for (const checkPath of pathsToCheck) {
      try {
        const stats = await fs.stat(checkPath);
        diagnostics.checks.push({
          path: checkPath,
          exists: true,
          size: stats.size,
          isFile: stats.isFile(),
          modified: stats.mtime,
        });
      } catch (error) {
        diagnostics.checks.push({
          path: checkPath,
          exists: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // Try to read directory listing of lib/training
    try {
      const libTrainingPath = path.join(process.cwd(), 'lib', 'training');
      const libTrainingContents = await fs.readdir(libTrainingPath);
      diagnostics.libTrainingDir = {
        path: libTrainingPath,
        contents: libTrainingContents,
      };

      // If sources dir exists, check its contents
      if (libTrainingContents.includes('sources')) {
        const sourcesPath = path.join(libTrainingPath, 'sources');
        const sourcesContents = await fs.readdir(sourcesPath);
        diagnostics.sourcesDir = {
          path: sourcesPath,
          contents: sourcesContents,
        };

        // If NRP Folder exists, check its contents
        if (sourcesContents.includes('NRP Folder')) {
          const nrpFolderPath = path.join(sourcesPath, 'NRP Folder');
          const nrpFiles = await fs.readdir(nrpFolderPath);
          diagnostics.nrpFolderDir = {
            path: nrpFolderPath,
            fileCount: nrpFiles.length,
            files: nrpFiles,
            hasNRP021: nrpFiles.includes('NRP-021-DR-NRPG-PLATFORM-OPERATIONS.html'),
            hasNRP022: nrpFiles.includes('NRP-022-CONTINUAL-EDUCATION-CREDITS.html'),
            hasNRP023: nrpFiles.includes('NRP-023-ASSOCIATION-MEMBERSHIPS-BENEFITS.html'),
            hasNRP024: nrpFiles.includes('NRP-024-MEMBERS-GATHERINGS-NETWORKING.html'),
          };
        }
      }

      // Check generated dir
      if (libTrainingContents.includes('generated')) {
        const generatedPath = path.join(libTrainingPath, 'generated');
        const generatedContents = await fs.readdir(generatedPath);
        diagnostics.generatedDir = {
          path: generatedPath,
          contents: generatedContents,
        };

        // Try to read the index file
        if (generatedContents.includes('nrp-training-index.json')) {
          try {
            const indexPath = path.join(generatedPath, 'nrp-training-index.json');
            const indexContent = await fs.readFile(indexPath, 'utf8');
            const index = JSON.parse(indexContent);
            diagnostics.indexFile = {
              totalModules: index.modules?.length || 0,
              moduleIds: index.modules?.map((m: any) => m.moduleId) || [],
              hasNRP021: index.modules?.some((m: any) => m.moduleId === 'NRP-021'),
              hasNRP022: index.modules?.some((m: any) => m.moduleId === 'NRP-022'),
              hasNRP023: index.modules?.some((m: any) => m.moduleId === 'NRP-023'),
              hasNRP024: index.modules?.some((m: any) => m.moduleId === 'NRP-024'),
            };
          } catch (error) {
            diagnostics.indexFileError = error instanceof Error ? error.message : String(error);
          }
        }
      }
    } catch (error) {
      diagnostics.libTrainingError = error instanceof Error ? error.message : String(error);
    }

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
