// SEMrush API integration
export interface SEMrushData {
  domain: string;
  metrics: Record<string, unknown>;
}

export async function getSEMrushData(domain: string): Promise<SEMrushData> {
  try {
    return {
      domain,
      metrics: {}
    };
  } catch (error) {
    console.error('Error in getSEMrushData:', error);
    throw error;
  }
}

export interface SEMrushConnection {
  configured: boolean;
  connected: boolean;
}

export async function checkSEMrushConnection(): Promise<SEMrushConnection> {
  try {
    // Stub implementation - returns false if no API key configured
    const apiKey = process.env.SEMRUSH_API_KEY;
    return {
      configured: !!apiKey,
      connected: false
    };
  } catch (error) {
    console.error('Error in checkSEMrushConnection:', error);
    throw error;
  }
}

export const semrushApi = {
  getData: getSEMrushData,
  isConfigured: () => {
    return !!process.env.SEMRUSH_API_KEY;
  },
  getKeywordOverview: async (keyword: string) => {
    // Stub implementation - return mock data if API key is not configured
    if (!process.env.SEMRUSH_API_KEY) {
      return null;
    }
    return {
      keyword,
      volume: 0,
      difficulty: 0,
      cpc: 0
    };
  },
  getRemainingUnits: () => {
    // Stub implementation
    return 0;
  }
};

// Add uppercase variant for compatibility
export const semrushAPI = semrushApi;
