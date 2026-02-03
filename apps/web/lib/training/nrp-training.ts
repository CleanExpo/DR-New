import path from 'path';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';

export interface NrpgTrainingSource {
  path: string;
  sha256: string;
  bytes: number;
}

export interface NrpgTrainingModuleIndexEntry {
  moduleId: string;
  moduleNumber: number;
  title: string;
  sourcePath: string;
  sourceSha256: string;
}

export interface NrpgTrainingQuizModuleIndexEntry {
  moduleId: string;
  moduleNumber: number;
  name: string;
  description: string;
  questionCount: number;
}

export interface NrpgTrainingIndex {
  generatedAt: string;
  sources: NrpgTrainingSource[];
  modules: NrpgTrainingModuleIndexEntry[];
  quiz: {
    sourcePath: string;
    sourceSha256: string;
    modules: NrpgTrainingQuizModuleIndexEntry[];
  };
}

export interface NrpgQuizQuestion {
  id: string;
  type: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  reference?: string;
}

export interface NrpgQuizModule {
  name: string;
  description: string;
  questions: NrpgQuizQuestion[];
}

export interface NrpgQuizBank {
  generatedAt: string;
  sourcePath: string;
  sourceSha256: string;
  quizData: Record<string, NrpgQuizModule>;
}

function generatedDir(): string {
  return path.join(process.cwd(), 'src', 'lib', 'training', 'generated');
}

function trainingSourcesDir(): string {
  return path.join(process.cwd(), 'training-sources');
}

function sha256Hex(content: Buffer): string {
  return createHash('sha256').update(content).digest('hex');
}

export async function loadNrpgTrainingIndex(): Promise<NrpgTrainingIndex> {
  const raw = await fs.readFile(path.join(generatedDir(), 'nrp-training-index.json'), 'utf8');
  return JSON.parse(raw) as NrpgTrainingIndex;
}

export async function loadNrpgQuizBank(): Promise<NrpgQuizBank> {
  const raw = await fs.readFile(path.join(generatedDir(), 'nrp-quiz-bank.json'), 'utf8');
  return JSON.parse(raw) as NrpgQuizBank;
}

export async function getNrpgQuizModule(moduleNumber: number): Promise<NrpgQuizModule | null> {
  const bank = await loadNrpgQuizBank();
  const quizModule = bank.quizData[String(moduleNumber)];
  return quizModule ?? null;
}

export function parseNrpgModuleNumber(moduleId: string): number | null {
  const match = moduleId.match(/^NRP-(\d{3})$/i);
  if (!match) return null;
  return parseInt(match[1], 10);
}

/**
 * Parse CSE module ID to extract module number
 * Format: CSE-M01, CSE-M02, etc.
 */
export function parseCseModuleNumber(moduleId: string): number | null {
  const match = moduleId.match(/^CSE-M(\d{2})$/i);
  if (!match) return null;
  return parseInt(match[1], 10);
}

/**
 * Parse WRT module ID to extract module number
 * Format: WRT-M01, WRT-M02, etc.
 */
export function parseWrtModuleNumber(moduleId: string): number | null {
  const match = moduleId.match(/^WRT-M(\d{2})$/i);
  if (!match) return null;
  return parseInt(match[1], 10);
}

/**
 * Determine course type from module ID
 */
export function getCourseTypeFromModuleId(moduleId: string): 'NRPG' | 'CSE' | 'WRT' | null {
  if (moduleId.match(/^NRP-\d{3}$/i)) return 'NRPG';
  if (moduleId.match(/^CSE-M\d{2}$/i)) return 'CSE';
  if (moduleId.match(/^WRT-M\d{2}$/i)) return 'WRT';
  return null;
}

/**
 * Get module path based on course type
 */
function getModulePath(courseType: 'NRPG' | 'CSE' | 'WRT', moduleNumber: number): string {
  switch (courseType) {
    case 'NRPG':
      return path.join('training-sources', 'modules', `nrp-${moduleNumber.toString().padStart(3, '0')}.html`);
    case 'CSE':
      return path.join('..', '..', 'NRPG-Onboarding-Framework', 'contractor-onboarding', 'customer-service-excellence', 'modules', `module-${moduleNumber.toString().padStart(2, '0')}-training-content.md`);
    case 'WRT':
      return path.join('..', '..', 'NRPG-Onboarding-Framework', 'contractor-onboarding', 'water-damage-restoration', 'modules', `module-${moduleNumber.toString().padStart(2, '0')}-training-content.md`);
    default:
      throw new Error(`Unknown course type: ${courseType}`);
  }
}

export async function getTrainingModuleHtmlById(
  moduleId: string
): Promise<{ html: string; sourcePath: string; sha256: string }> {
  const courseType = getCourseTypeFromModuleId(moduleId);
  
  if (!courseType) {
    throw new Error(`Invalid module ID format: ${moduleId}. Expected NRP-XXX, CSE-MXX, or WRT-MXX`);
  }

  // Try to load from index first (for NRPG modules)
  if (courseType === 'NRPG') {
    const index = await loadNrpgTrainingIndex();
    const entry = index.modules.find((m) => m.moduleId.toUpperCase() === moduleId.toUpperCase());
    if (entry) {
      const absolutePath = path.join(process.cwd(), entry.sourcePath);
      const buffer = await fs.readFile(absolutePath);
      const sha = sha256Hex(buffer);

      if (sha !== entry.sourceSha256) {
        throw new Error(`Training module source hash mismatch for ${moduleId}`);
      }

      return {
        html: buffer.toString('utf8'),
        sourcePath: entry.sourcePath,
        sha256: sha,
      };
    }
  }

  // For CSE/WRT modules, load directly from framework
  const moduleNumber = courseType === 'CSE' 
    ? parseCseModuleNumber(moduleId) 
    : parseWrtModuleNumber(moduleId);
    
  if (!moduleNumber) {
    throw new Error(`Training module not found: ${moduleId}`);
  }

  const sourcePath = getModulePath(courseType, moduleNumber);
  const absolutePath = path.join(process.cwd(), sourcePath);
  
  try {
    const buffer = await fs.readFile(absolutePath);
    const sha = sha256Hex(buffer);
    
    return {
      html: buffer.toString('utf8'),
      sourcePath,
      sha256: sha,
    };
  } catch (error) {
    throw new Error(`Training module not found: ${moduleId} (tried ${sourcePath})`);
  }
}

export async function verifyTrainingSourcesPresent(): Promise<void> {
  const root = trainingSourcesDir();
  const stat = await fs.stat(root).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    throw new Error('Missing training-sources directory');
  }
}

export async function getVerifiedTrainingSourceHtml(
  relativePath: string
): Promise<{ html: string; sha256: string; bytes: number }> {
  const index = await loadNrpgTrainingIndex();
  const entry = index.sources.find((s) => s.path === relativePath);
  if (!entry) {
    throw new Error(`Training source not found in index: ${relativePath}`);
  }

  const absolutePath = path.join(process.cwd(), relativePath);
  const buffer = await fs.readFile(absolutePath);
  const sha = sha256Hex(buffer);

  if (sha !== entry.sha256) {
    throw new Error(`Training source hash mismatch for ${relativePath}`);
  }

  return { html: buffer.toString('utf8'), sha256: sha, bytes: buffer.byteLength };
}
