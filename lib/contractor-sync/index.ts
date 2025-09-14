/**
 * Contractor-Driven Content System
 * Automatically generates and updates content based on contractor data
 */

import { ContractorData, LocationData, ServiceData } from '../page-generator/types';
import { generatePagesForNewContractor, batchGeneratePages } from '../page-generator';
import { getAustralianLocations } from '../location-service';
import { getAllServices } from '../services-data';

export interface ContractorWebhookPayload {
  event: 'contractor.created' | 'contractor.updated' | 'contractor.deleted';
  contractor: ContractorData;
  timestamp: Date;
}

export interface ContractorSyncConfig {
  autoGenerate: boolean;
  generateRadius: number; // km
  maxPagesPerContractor: number;
  priorityServices: string[];
  webhookSecret: string;
}

const defaultConfig: ContractorSyncConfig = {
  autoGenerate: true,
  generateRadius: 50,
  maxPagesPerContractor: 100,
  priorityServices: ['water-damage', 'fire-damage', 'mould-remediation'],
  webhookSecret: process.env.CONTRACTOR_WEBHOOK_SECRET || ''
};

/**
 * Process contractor webhook events
 */
export async function processContractorWebhook(
  payload: ContractorWebhookPayload,
  config: ContractorSyncConfig = defaultConfig
): Promise<void> {
  const { event, contractor } = payload;

  switch (event) {
    case 'contractor.created':
      await handleNewContractor(contractor, config);
      break;
    case 'contractor.updated':
      await handleContractorUpdate(contractor, config);
      break;
    case 'contractor.deleted':
      await handleContractorDeletion(contractor);
      break;
  }
}

/**
 * Handle new contractor registration
 */
async function handleNewContractor(
  contractor: ContractorData,
  config: ContractorSyncConfig
): Promise<void> {
  if (!config.autoGenerate) return;

  console.log(`Processing new contractor: ${contractor.businessName}`);

  // Get all locations within service radius
  const allLocations = await getAustralianLocations();
  const servableLocations = filterLocationsByRadius(
    allLocations,
    contractor.location,
    contractor.serviceRadius
  );

  console.log(`Found ${servableLocations.length} locations within ${contractor.serviceRadius}km`);

  // Generate pages for priority services first
  const priorityServices = contractor.services.filter(
    service => config.priorityServices.includes(service.slug)
  );

  if (priorityServices.length > 0) {
    await generatePagesForServices(
      contractor,
      servableLocations,
      priorityServices,
      'priority'
    );
  }

  // Generate pages for remaining services
  const remainingServices = contractor.services.filter(
    service => !config.priorityServices.includes(service.slug)
  );

  if (remainingServices.length > 0) {
    await generatePagesForServices(
      contractor,
      servableLocations,
      remainingServices,
      'standard'
    );
  }

  // Update contractor coverage map
  await updateCoverageMap(contractor, servableLocations);

  // Send notification to contractor
  await notifyContractorOfPageGeneration(contractor, servableLocations.length);
}

/**
 * Handle contractor update
 */
async function handleContractorUpdate(
  contractor: ContractorData,
  config: ContractorSyncConfig
): Promise<void> {
  console.log(`Updating content for contractor: ${contractor.businessName}`);

  // Check what changed
  const changes = await detectContractorChanges(contractor);

  if (changes.serviceRadiusChanged) {
    // Regenerate all pages with new radius
    await handleNewContractor(contractor, config);
  } else if (changes.servicesChanged) {
    // Generate pages only for new services
    const newServices = changes.newServices || [];
    const allLocations = await getAustralianLocations();
    const servableLocations = filterLocationsByRadius(
      allLocations,
      contractor.location,
      contractor.serviceRadius
    );

    await generatePagesForServices(
      contractor,
      servableLocations,
      newServices,
      'update'
    );
  }

  // Update existing pages with new contractor data
  await updateExistingPages(contractor, changes);
}

/**
 * Handle contractor deletion
 */
async function handleContractorDeletion(contractor: ContractorData): Promise<void> {
  console.log(`Removing contractor from pages: ${contractor.businessName}`);

  // Remove contractor from all generated pages
  await removeContractorFromPages(contractor.id);

  // Check if any pages now have no contractors
  await checkForEmptyPages();
}

/**
 * Generate pages for specific services
 */
async function generatePagesForServices(
  contractor: ContractorData,
  locations: LocationData[],
  services: ServiceData[],
  priority: 'priority' | 'standard' | 'update'
): Promise<void> {
  const template = await getPageTemplate(priority);

  for (const service of services) {
    const pages = await batchGeneratePages(
      locations,
      [service],
      [contractor],
      template
    );

    // Save generated pages
    await saveGeneratedPages(pages, priority);

    // Index pages for search
    await indexPagesForSearch(pages);
  }
}

/**
 * Filter locations within service radius
 */
function filterLocationsByRadius(
  locations: LocationData[],
  contractorLocation: LocationData,
  radius: number
): LocationData[] {
  return locations.filter(location => {
    const distance = calculateDistance(contractorLocation, location);
    return distance <= radius;
  });
}

/**
 * Calculate distance between two locations
 */
function calculateDistance(loc1: LocationData, loc2: LocationData): number {
  if (!loc1.coordinates || !loc2.coordinates) return Infinity;

  const R = 6371; // Earth's radius in km
  const dLat = (loc2.coordinates.lat - loc1.coordinates.lat) * Math.PI / 180;
  const dLon = (loc2.coordinates.lng - loc1.coordinates.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(loc1.coordinates.lat * Math.PI / 180) *
    Math.cos(loc2.coordinates.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Update coverage map with contractor service areas
 */
async function updateCoverageMap(
  contractor: ContractorData,
  locations: LocationData[]
): Promise<void> {
  const coverageData = {
    contractorId: contractor.id,
    businessName: contractor.businessName,
    centerPoint: contractor.location.coordinates,
    radius: contractor.serviceRadius,
    coveredLocations: locations.map(loc => ({
      id: loc.id,
      name: loc.name,
      postcode: loc.postcode
    })),
    services: contractor.services.map(s => s.name),
    lastUpdated: new Date()
  };

  // Save to database or cache
  await saveCoverageData(coverageData);
}

/**
 * Notify contractor about page generation
 */
async function notifyContractorOfPageGeneration(
  contractor: ContractorData,
  pageCount: number
): Promise<void> {
  const notification = {
    to: contractor.email || 'admin@example.com',
    subject: 'Your Service Pages Are Live!',
    body: `
      Hello ${contractor.businessName},

      Great news! We've automatically generated ${pageCount} location-specific pages
      for your services across your coverage area.

      These pages are now live and optimized for search engines, helping potential
      customers find your services in their local area.

      Coverage Summary:
      - Service Radius: ${contractor.serviceRadius}km
      - Locations Covered: ${pageCount}
      - Services Listed: ${contractor.services.map(s => s.name).join(', ')}

      View your contractor dashboard for detailed analytics and lead tracking.

      Best regards,
      National Restoration Platform
    `
  };

  await sendNotification(notification);
}

/**
 * Detect what changed in contractor data
 */
async function detectContractorChanges(contractor: ContractorData): Promise<any> {
  // This would compare with previous version in database
  // For now, return mock changes
  return {
    serviceRadiusChanged: false,
    servicesChanged: true,
    newServices: contractor.services.slice(0, 1),
    removedServices: [],
    certificationChanges: false
  };
}

/**
 * Update existing pages with new contractor data
 */
async function updateExistingPages(
  contractor: ContractorData,
  changes: any
): Promise<void> {
  // Update contractor information on all relevant pages
  console.log(`Updating ${contractor.businessName} on existing pages`);
  // Implementation would update database records
}

/**
 * Remove contractor from all pages
 */
async function removeContractorFromPages(contractorId: string): Promise<void> {
  console.log(`Removing contractor ${contractorId} from all pages`);
  // Implementation would update database records
}

/**
 * Check for pages with no contractors
 */
async function checkForEmptyPages(): Promise<void> {
  console.log('Checking for pages with no contractors');
  // Implementation would query database and handle empty pages
}

/**
 * Get page template based on priority
 */
async function getPageTemplate(priority: string): Promise<any> {
  // Return appropriate template based on priority
  return {
    id: 'contractor-service',
    name: 'Contractor Service Page',
    type: 'location-service',
    sections: [],
    schemaType: 'Service',
    contentBlocks: []
  };
}

/**
 * Save generated pages
 */
async function saveGeneratedPages(pages: any[], priority: string): Promise<void> {
  console.log(`Saving ${pages.length} ${priority} pages`);
  // Implementation would save to database
}

/**
 * Index pages for search
 */
async function indexPagesForSearch(pages: any[]): Promise<void> {
  console.log(`Indexing ${pages.length} pages for search`);
  // Implementation would update search index
}

/**
 * Save coverage data
 */
async function saveCoverageData(data: any): Promise<void> {
  console.log(`Saving coverage data for ${data.businessName}`);
  // Implementation would save to database
}

/**
 * Send notification
 */
async function sendNotification(notification: any): Promise<void> {
  console.log(`Sending notification to ${notification.to}`);
  // Implementation would send email
}

/**
 * Batch process multiple contractor updates
 */
export async function batchProcessContractors(
  contractors: ContractorData[],
  config: ContractorSyncConfig = defaultConfig
): Promise<void> {
  console.log(`Batch processing ${contractors.length} contractors`);

  for (const contractor of contractors) {
    await handleNewContractor(contractor, config);
  }
}

/**
 * Generate coverage report
 */
export async function generateCoverageReport(): Promise<any> {
  const allLocations = await getAustralianLocations();
  const coveredLocations = await getCoveredLocations();

  const coverage = {
    totalLocations: allLocations.length,
    coveredLocations: coveredLocations.length,
    coveragePercentage: (coveredLocations.length / allLocations.length * 100).toFixed(2),
    uncoveredLocations: allLocations.filter(
      loc => !coveredLocations.find(c => c.id === loc.id)
    ),
    timestamp: new Date()
  };

  return coverage;
}

/**
 * Get covered locations
 */
async function getCoveredLocations(): Promise<LocationData[]> {
  // Implementation would query database
  return [];
}

export * from '../page-generator/types';