/**
 * Test Data Factories
 *
 * Realistic test data generators for all domain models.
 * Uses @faker-js/faker for realistic data generation.
 */

import { faker } from '@faker-js/faker';

// Brisbane suburbs for location testing
const BRISBANE_SUBURBS = [
  'Hamilton', 'Ascot', 'New Farm', 'Toowong', 'Paddington',
  'Fortitude Valley', 'CBD', 'West End', 'South Brisbane',
  'Kangaroo Point', 'Woolloongabba', 'Spring Hill'
];

const IPSWICH_SUBURBS = [
  'Karalee', 'Brookwater', 'Springfield Lakes', 'Ipswich CBD',
  'Yamanto', 'Leichhardt', 'Booval', 'Goodna'
];

const LOGAN_SUBURBS = [
  'Logan Central', 'Springwood', 'Shailer Park', 'Browns Plains',
  'Woodridge', 'Kingston', 'Loganholme'
];

// Service types
const SERVICE_TYPES = [
  'water-damage-restoration',
  'fire-damage-restoration',
  'mould-remediation',
  'storm-damage-restoration',
  'emergency-response'
];

// Insurance companies
const INSURANCE_PROVIDERS = [
  'AAMI', 'Suncorp', 'NRMA', 'Allianz', 'QBE',
  'Youi', 'Budget Direct', 'RACQ'
];

/**
 * Emergency Contact Factory
 */
export const emergencyContactFactory = {
  create: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.helpers.fromRegExp(/04[0-9]{2} [0-9]{3} [0-9]{3}/),
    address: `${faker.location.streetAddress()}, ${faker.helpers.arrayElement([...BRISBANE_SUBURBS, ...IPSWICH_SUBURBS, ...LOGAN_SUBURBS])}, QLD ${faker.helpers.fromRegExp(/4[0-9]{3}/)}`,
    serviceType: faker.helpers.arrayElement(SERVICE_TYPES),
    urgency: faker.helpers.arrayElement(['immediate', 'same-day', 'next-day']),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.recent(),
    ...overrides,
  }),

  createBatch: (count: number) =>
    Array.from({ length: count }, () => emergencyContactFactory.create()),

  createWaterDamage: () => emergencyContactFactory.create({
    serviceType: 'water-damage-restoration',
    urgency: 'immediate',
    description: 'Burst pipe in bathroom, water flooding through ceiling',
  }),

  createFireDamage: () => emergencyContactFactory.create({
    serviceType: 'fire-damage-restoration',
    urgency: 'immediate',
    description: 'Kitchen fire, smoke damage throughout property',
  }),

  createMouldIssue: () => emergencyContactFactory.create({
    serviceType: 'mould-remediation',
    urgency: 'same-day',
    description: 'Black mould discovered in bathroom and bedroom walls',
  }),
};

/**
 * Quote Request Factory
 */
export const quoteRequestFactory = {
  create: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.helpers.fromRegExp(/04[0-9]{2} [0-9]{3} [0-9]{3}/),
    suburb: faker.helpers.arrayElement([...BRISBANE_SUBURBS, ...IPSWICH_SUBURBS]),
    postcode: faker.helpers.fromRegExp(/4[0-9]{3}/),
    serviceType: faker.helpers.arrayElement(SERVICE_TYPES),
    propertyType: faker.helpers.arrayElement(['residential', 'commercial', 'industrial']),
    insuranceProvider: faker.helpers.arrayElement(INSURANCE_PROVIDERS),
    claimNumber: faker.helpers.fromRegExp(/[A-Z]{3}[0-9]{8}/),
    description: faker.lorem.paragraphs(2),
    urgency: faker.helpers.arrayElement(['emergency', 'urgent', 'standard']),
    createdAt: faker.date.recent(),
    ...overrides,
  }),

  createBatch: (count: number) =>
    Array.from({ length: count }, () => quoteRequestFactory.create()),

  createInsuranceClaim: () => quoteRequestFactory.create({
    insuranceProvider: faker.helpers.arrayElement(INSURANCE_PROVIDERS),
    claimNumber: faker.helpers.fromRegExp(/[A-Z]{3}[0-9]{8}/),
    urgency: 'urgent',
  }),

  createHighNetWorth: () => quoteRequestFactory.create({
    suburb: faker.helpers.arrayElement(['Hamilton', 'Ascot', 'New Farm', 'Toowong']),
    propertyType: 'residential',
  }),
};

/**
 * Service Area Factory
 */
export const serviceAreaFactory = {
  create: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([...BRISBANE_SUBURBS, ...IPSWICH_SUBURBS, ...LOGAN_SUBURBS]),
    region: faker.helpers.arrayElement(['Brisbane', 'Ipswich', 'Logan']),
    postcode: faker.helpers.fromRegExp(/4[0-9]{3}/),
    responseTime: faker.helpers.arrayElement([30, 45, 60]),
    active: true,
    ...overrides,
  }),

  createBatch: (count: number) =>
    Array.from({ length: count }, () => serviceAreaFactory.create()),

  createBrisbane: () => serviceAreaFactory.create({
    name: faker.helpers.arrayElement(BRISBANE_SUBURBS),
    region: 'Brisbane',
    responseTime: 30,
  }),

  createIpswich: () => serviceAreaFactory.create({
    name: faker.helpers.arrayElement(IPSWICH_SUBURBS),
    region: 'Ipswich',
    responseTime: 45,
  }),
};

/**
 * Certification Factory
 */
export const certificationFactory = {
  create: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      'IICRC Master Restorer',
      'IICRC Water Damage Restoration',
      'IICRC Fire & Smoke Restoration',
      'IICRC Mould Remediation',
      'IICRC Applied Structural Drying',
    ]),
    issuer: 'IICRC',
    number: faker.helpers.fromRegExp(/[0-9]{6}/),
    issueDate: faker.date.past({ years: 5 }),
    expiryDate: faker.date.future({ years: 2 }),
    holder: 'Phill McGurk',
    active: true,
    ...overrides,
  }),

  createBatch: (count: number) =>
    Array.from({ length: count }, () => certificationFactory.create()),

  createMasterRestorer: () => certificationFactory.create({
    name: 'IICRC Master Restorer',
    holder: 'Phill McGurk',
  }),
};

/**
 * Review/Testimonial Factory
 */
export const reviewFactory = {
  create: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    suburb: faker.helpers.arrayElement([...BRISBANE_SUBURBS, ...IPSWICH_SUBURBS]),
    rating: faker.helpers.arrayElement([4, 5]),
    serviceType: faker.helpers.arrayElement(SERVICE_TYPES),
    comment: faker.lorem.paragraphs(2),
    date: faker.date.recent({ days: 90 }),
    verified: true,
    source: faker.helpers.arrayElement(['Google', 'Facebook', 'Direct']),
    ...overrides,
  }),

  createBatch: (count: number) =>
    Array.from({ length: count }, () => reviewFactory.create()),

  create5Star: () => reviewFactory.create({
    rating: 5,
    comment: faker.helpers.arrayElement([
      'Outstanding service! They arrived within 30 minutes and had the water extracted quickly. Professional and thorough.',
      'Excellent work on our fire damage restoration. The team was compassionate and efficient. Highly recommend!',
      'Phill and his team did an amazing job removing mould from our home. Very knowledgeable and professional.',
    ]),
  }),
};

/**
 * Equipment Factory
 */
export const equipmentFactory = {
  create: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      'Industrial Dehumidifier',
      'Air Scrubber',
      'Moisture Meter',
      'Thermal Camera',
      'Water Extraction Pump',
      'Air Mover',
      'Negative Air Machine',
    ]),
    type: faker.helpers.arrayElement(['extraction', 'drying', 'monitoring', 'cleaning']),
    status: 'operational',
    lastMaintenance: faker.date.recent({ days: 30 }),
    nextMaintenance: faker.date.future({ days: 30 }),
    ...overrides,
  }),

  createBatch: (count: number) =>
    Array.from({ length: count }, () => equipmentFactory.create()),
};

/**
 * Job/Project Factory
 */
export const jobFactory = {
  create: (overrides = {}) => ({
    id: faker.string.uuid(),
    jobNumber: faker.helpers.fromRegExp(/DR[0-9]{6}/),
    clientName: faker.person.fullName(),
    address: `${faker.location.streetAddress()}, ${faker.helpers.arrayElement(BRISBANE_SUBURBS)}, QLD`,
    serviceType: faker.helpers.arrayElement(SERVICE_TYPES),
    status: faker.helpers.arrayElement(['scheduled', 'in-progress', 'completed']),
    startDate: faker.date.recent(),
    estimatedCompletion: faker.date.future({ days: 7 }),
    assignedTechnician: 'Phill McGurk',
    insuranceProvider: faker.helpers.arrayElement(INSURANCE_PROVIDERS),
    claimNumber: faker.helpers.fromRegExp(/[A-Z]{3}[0-9]{8}/),
    ...overrides,
  }),

  createBatch: (count: number) =>
    Array.from({ length: count }, () => jobFactory.create()),

  createEmergency: () => jobFactory.create({
    status: 'in-progress',
    startDate: new Date(),
    serviceType: faker.helpers.arrayElement(['water-damage-restoration', 'fire-damage-restoration']),
  }),
};

/**
 * Analytics Event Factory
 */
export const analyticsEventFactory = {
  create: (overrides = {}) => ({
    id: faker.string.uuid(),
    event: faker.helpers.arrayElement([
      'page_view',
      'phone_click',
      'quote_request',
      'emergency_contact',
      'service_inquiry',
    ]),
    page: faker.helpers.arrayElement([
      '/',
      '/services/water-damage-restoration',
      '/emergency',
      '/locations/hamilton',
    ]),
    timestamp: faker.date.recent(),
    sessionId: faker.string.uuid(),
    userId: faker.string.uuid(),
    metadata: {
      userAgent: faker.internet.userAgent(),
      referrer: faker.internet.url(),
    },
    ...overrides,
  }),

  createBatch: (count: number) =>
    Array.from({ length: count }, () => analyticsEventFactory.create()),

  createPhoneClick: () => analyticsEventFactory.create({
    event: 'phone_click',
    metadata: {
      phoneNumber: '1300 309 361',
      page: faker.helpers.arrayElement([
        '/',
        '/services/water-damage-restoration',
        '/emergency',
      ]),
    },
  }),
};

// Export all factories
export default {
  emergencyContact: emergencyContactFactory,
  quoteRequest: quoteRequestFactory,
  serviceArea: serviceAreaFactory,
  certification: certificationFactory,
  review: reviewFactory,
  equipment: equipmentFactory,
  job: jobFactory,
  analyticsEvent: analyticsEventFactory,
};
