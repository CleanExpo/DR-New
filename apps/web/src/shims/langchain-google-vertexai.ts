/**
 * Shim for @langchain/google-vertexai — minimal type stubs.
 * Install the real package with: pnpm add @langchain/google-vertexai
 */
export class ChatVertexAI {
  constructor(config?: Record<string, any>) {}
  invoke(messages: any[]): Promise<any> {
    throw new Error('@langchain/google-vertexai is not installed.');
  }
  stream(messages: any[]): AsyncIterable<any> {
    throw new Error('@langchain/google-vertexai is not installed.');
  }
}
