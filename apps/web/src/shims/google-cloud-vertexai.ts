/**
 * Shim for @google-cloud/vertexai — minimal type stubs.
 * Install the real package with: pnpm add @google-cloud/vertexai
 */
export class VertexAI {
  constructor(config?: { project?: string; location?: string }) {}
  getGenerativeModel(params: Record<string, any>): any {
    throw new Error('@google-cloud/vertexai is not installed.');
  }
}
