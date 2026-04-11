/**
 * Shim for `@anthropic-ai/sdk`.
 *
 * Allows the codebase to import from `@anthropic-ai/sdk` without the package installed.
 * Exported APIs throw when invoked — real functionality requires installing the SDK.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

class AnthropicNotInstalled extends Error {
  constructor() {
    super('@anthropic-ai/sdk is not installed. Install it to use Anthropic batch features.');
  }
}

class Anthropic {
  messages = {
    batches: {
      create: async (..._args: any[]): Promise<any> => { throw new AnthropicNotInstalled(); },
      retrieve: async (..._args: any[]): Promise<any> => { throw new AnthropicNotInstalled(); },
      results: async (..._args: any[]): Promise<any> => { throw new AnthropicNotInstalled(); },
      cancel: async (..._args: any[]): Promise<any> => { throw new AnthropicNotInstalled(); },
    },
  };

  constructor(_config?: Record<string, unknown>) {}
}

// Merge declaration to provide namespace members used in type positions
declare namespace Anthropic {
  namespace Messages {
    interface MessageCreateParamsNonStreaming {
      [key: string]: unknown;
    }
  }
  interface TextBlock {
    type: 'text';
    text: string;
  }
}

export default Anthropic;
