// SEMrush API integration
export async function getSEMrushData(domain: string) {
  return {
    domain,
    metrics: {}
  };
}

export const semrushApi = {
  getData: getSEMrushData
};

// Add uppercase variant for compatibility
export const semrushAPI = semrushApi;
