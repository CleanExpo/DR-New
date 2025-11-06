// SEMrush API integration
export async function getSEMrushData(domain: string) {
  return {
    domain,
    metrics: {}
  };
}

export async function checkSEMrushConnection() {
  // Stub implementation - returns false if no API key configured
  const apiKey = process.env.SEMRUSH_API_KEY;
  return {
    configured: !!apiKey,
    connected: false
  };
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
