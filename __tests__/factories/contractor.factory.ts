import { ContractorStatus, ContractorTier } from '@prisma/client';

export const createMockContractor = (overrides = {}) => ({
  id: 'contractor-123',
  companyName: 'Brisbane Elite Restoration',
  abn: '12345678901',
  contactName: 'Mike Johnson',
  email: 'mike@eliterestoration.com.au',
  phone: '0412987654',
  mobile: '0412987654',

  // Location details
  addressLine1: '25 Commercial Road',
  addressLine2: 'Suite 5',
  suburb: 'Newstead',
  state: 'QLD',
  postcode: '4006',
  latitude: -27.4456,
  longitude: 153.0461,
  serviceRadiusKm: 50,

  // Tier and capacity
  tier: ContractorTier.PREMIUM,
  status: ContractorStatus.ACTIVE,
  maxConcurrentJobs: 5,
  currentJobCount: 2,

  // Performance metrics
  averageRating: 4.8,
  totalJobsCompleted: 127,
  totalRevenue: 850000.00,
  onTimeCompletionRate: 94.5,

  // Specialisations
  specialisations: ['WATER_DAMAGE', 'MOULD_REMEDIATION', 'FIRE_DAMAGE'],
  certifications: ['IICRC_WRT', 'IICRC_AMRT', 'MASTER_RESTORER'],
  insuranceCertificate: 'INS-CERT-2025-001',
  insuranceExpiryDate: new Date('2026-06-30'),

  // Financial
  standardHourlyRate: 150.00,
  emergencyHourlyRate: 225.00,

  // Rotation tracking
  lastJobAssignedAt: new Date('2025-11-03T14:30:00Z'),
  rotationScore: 85,

  // Metadata
  createdAt: new Date('2024-01-15T10:00:00Z'),
  updatedAt: new Date('2025-11-04T08:00:00Z'),
  isAvailable: true,

  ...overrides,
});

export const createMockContractorList = (count: number = 5) => {
  const contractors = [];
  const suburbs = ['Newstead', 'Fortitude Valley', 'Milton', 'Toowong', 'Ipswich'];
  const tiers = [ContractorTier.PREMIUM, ContractorTier.STANDARD, ContractorTier.BASIC];
  const companies = [
    'Brisbane Elite Restoration',
    'QLD Emergency Services',
    'Rapid Response Restoration',
    'Professional Disaster Recovery',
    'Master Restoration Services',
  ];

  for (let i = 0; i < count; i++) {
    contractors.push(createMockContractor({
      id: `contractor-${i + 1}`,
      companyName: companies[i % companies.length],
      suburb: suburbs[i % suburbs.length],
      tier: tiers[i % tiers.length],
      currentJobCount: i % 3,
      totalJobsCompleted: 50 + (i * 20),
      averageRating: 4.2 + (i * 0.1),
      rotationScore: 50 + (i * 10),
    }));
  }

  return contractors;
};

export const createMockContractorWithLocation = (
  latitude: number,
  longitude: number,
  overrides = {}
) => {
  return createMockContractor({
    latitude,
    longitude,
    ...overrides,
  });
};
