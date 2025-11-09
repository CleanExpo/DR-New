export const COLORS = {
  primary: '#1E40AF',
  primaryLight: '#EFF6FF',
  secondary: '#3B82F6',
  emergency: '#DC2626',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
};

export const SERVICES = {
  WATER_DAMAGE: {
    id: 'water',
    name: 'Water Damage Restoration',
    icon: 'water',
    color: COLORS.secondary,
  },
  FIRE_DAMAGE: {
    id: 'fire',
    name: 'Fire Damage Restoration',
    icon: 'flame',
    color: COLORS.error,
  },
  MOULD: {
    id: 'mould',
    name: 'Mould Remediation',
    icon: 'bug',
    color: COLORS.success,
  },
  STORM_DAMAGE: {
    id: 'storm',
    name: 'Storm Damage Restoration',
    icon: 'thunderstorm',
    color: '#8B5CF6',
  },
};

export const CONTACT = {
  phone: '1300 309 361',
  email: 'admin@disasterrecovery.com.au',
  website: 'https://disasterrecovery.com.au',
};

export const SERVICE_AREAS = [
  { name: 'Hamilton', postcode: '4007', type: 'High Net Worth' },
  { name: 'Ascot', postcode: '4007', type: 'High Net Worth' },
  { name: 'New Farm', postcode: '4005', type: 'High Net Worth' },
  { name: 'Toowong', postcode: '4066', type: 'High Net Worth' },
  { name: 'Brisbane CBD', postcode: '4000', type: 'Commercial' },
  { name: 'Fortitude Valley', postcode: '4006', type: 'Commercial' },
  { name: 'Ipswich', postcode: '4305', type: 'Residential' },
  { name: 'Logan', postcode: '4114', type: 'Residential' },
];

export const RESPONSE_TIMES = {
  EMERGENCY: '60 minutes',
  STANDARD: '24 hours',
  INSPECTION: '48 hours',
};
