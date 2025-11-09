// Internal Linking Hub - SEO Architecture
// Defines pillar pages, cluster pages, and strategic internal linking structure

export interface LinkingCluster {
  pillarPage: {
    title: string;
    url: string;
    priority: number;
  };
  clusterPages: Array<{
    title: string;
    url: string;
    category: 'location' | 'service-variant' | 'process' | 'insurance' | 'emergency';
    relatedKeywords: string[];
  }>;
  relatedPillars?: string[];
}

// Main Service Pillars - Core Topics
export const SERVICE_PILLARS: LinkingCluster[] = [
  {
    pillarPage: {
      title: 'Water Damage Restoration',
      url: '/services/water-damage',
      priority: 0.95
    },
    clusterPages: [
      {
        title: 'Structural Drying',
        url: '/services/structural-drying',
        category: 'service-variant',
        relatedKeywords: ['water extraction', 'dehumidification', 'IICRC S500']
      },
      {
        title: 'Emergency Water Damage Brisbane',
        url: '/emergency/water-damage-brisbane',
        category: 'emergency',
        relatedKeywords: ['24/7 water removal', 'flood emergency', 'burst pipe']
      },
      {
        title: 'Water Damage Hamilton',
        url: '/locations/hamilton',
        category: 'location',
        relatedKeywords: ['Hamilton flood restoration', 'local water damage']
      },
      {
        title: 'Water Damage Ascot',
        url: '/locations/ascot',
        category: 'location',
        relatedKeywords: ['Ascot water restoration', 'emergency response Ascot']
      }
    ],
    relatedPillars: ['/services/mould-remediation', '/services/fire-damage']
  },
  {
    pillarPage: {
      title: 'Fire Damage Restoration',
      url: '/services/fire-damage',
      priority: 0.95
    },
    clusterPages: [
      {
        title: 'Smoke Damage Cleanup',
        url: '/services/trauma-cleanup',
        category: 'service-variant',
        relatedKeywords: ['smoke odour removal', 'soot cleaning', 'thermal fogging']
      },
      {
        title: 'Fire Damage Emergency',
        url: '/emergency/after-hours-emergency',
        category: 'emergency',
        relatedKeywords: ['24/7 fire restoration', 'emergency board-up']
      }
    ],
    relatedPillars: ['/services/water-damage', '/services/biohazard-cleanup']
  },
  {
    pillarPage: {
      title: 'Mould Remediation',
      url: '/services/mould-remediation',
      priority: 0.95
    },
    clusterPages: [
      {
        title: 'Mould Prevention Guide',
        url: '/faq/flood-restoration',
        category: 'process',
        relatedKeywords: ['prevent mould growth', 'IICRC S520', 'humidity control']
      },
      {
        title: 'Emergency Mould Checklist',
        url: '/emergency/checklists/mould',
        category: 'emergency',
        relatedKeywords: ['mould assessment', 'immediate response']
      }
    ],
    relatedPillars: ['/services/water-damage', '/services/structural-drying']
  },
  {
    pillarPage: {
      title: 'Emergency Response Services',
      url: '/services/emergency-response',
      priority: 1.0
    },
    clusterPages: [
      {
        title: 'Weekend Emergency',
        url: '/emergency/weekend',
        category: 'emergency',
        relatedKeywords: ['Saturday emergency', 'Sunday restoration', '24/7 response']
      },
      {
        title: 'After Hours Emergency',
        url: '/emergency/after-hours',
        category: 'emergency',
        relatedKeywords: ['late night service', 'midnight emergency', '60-minute response']
      },
      {
        title: 'Public Holiday Emergency',
        url: '/emergency/public-holiday',
        category: 'emergency',
        relatedKeywords: ['Christmas emergency', 'Easter service', 'ANZAC day']
      }
    ],
    relatedPillars: ['/services/water-damage', '/services/fire-damage', '/services/biohazard-cleanup']
  },
  {
    pillarPage: {
      title: 'Biohazard Cleanup',
      url: '/services/biohazard-cleanup',
      priority: 0.9
    },
    clusterPages: [
      {
        title: 'Trauma Cleanup',
        url: '/services/trauma-cleanup',
        category: 'service-variant',
        relatedKeywords: ['crime scene cleanup', 'blood cleanup', 'biohazard disposal']
      },
      {
        title: 'Biohazard FAQ',
        url: '/faq/biohazard-cleanup',
        category: 'process',
        relatedKeywords: ['biohazard safety', 'PPE requirements', 'disposal regulations']
      }
    ],
    relatedPillars: ['/services/trauma-cleanup']
  }
];

// Location-Based Clusters
export const LOCATION_CLUSTERS: LinkingCluster[] = [
  {
    pillarPage: {
      title: 'Brisbane Disaster Recovery',
      url: '/locations/brisbane',
      priority: 0.8
    },
    clusterPages: [
      {
        title: 'Hamilton',
        url: '/locations/hamilton',
        category: 'location',
        relatedKeywords: ['Hamilton Brisbane', 'waterfront restoration', 'luxury homes']
      },
      {
        title: 'Ascot',
        url: '/locations/ascot',
        category: 'location',
        relatedKeywords: ['Ascot Brisbane', 'heritage restoration', 'flood zone']
      }
    ],
    relatedPillars: ['/services/water-damage', '/services/emergency-response']
  }
];

// Insurance Provider Clusters
export const INSURANCE_CLUSTERS: LinkingCluster[] = [
  {
    pillarPage: {
      title: 'Insurance Claims Assistance',
      url: '/insurance-claims',
      priority: 0.9
    },
    clusterPages: [
      {
        title: 'AAMI Insurance',
        url: '/insurance/aami',
        category: 'insurance',
        relatedKeywords: ['AAMI claims', 'AAMI approved restorer']
      },
      {
        title: 'Suncorp Insurance',
        url: '/insurance/suncorp',
        category: 'insurance',
        relatedKeywords: ['Suncorp claims', 'Suncorp builder']
      },
      {
        title: 'Allianz Insurance',
        url: '/insurance/allianz',
        category: 'insurance',
        relatedKeywords: ['Allianz restoration', 'Allianz approved']
      }
    ]
  }
];

// Get related links for a given page
export function getRelatedLinks(currentUrl: string, maxLinks: number = 5): Array<{title: string; url: string}> {
  const allClusters = [...SERVICE_PILLARS, ...LOCATION_CLUSTERS, ...INSURANCE_CLUSTERS];
  const relatedLinks: Array<{title: string; url: string}> = [];

  // Find current page in clusters
  for (const cluster of allClusters) {
    // If current page is pillar, show cluster pages
    if (cluster.pillarPage.url === currentUrl) {
      relatedLinks.push(...cluster.clusterPages.slice(0, maxLinks).map(p => ({
        title: p.title,
        url: p.url
      })));

      // Add related pillars
      if (cluster.relatedPillars) {
        const relatedPillarLinks = allClusters
          .filter(c => cluster.relatedPillars?.includes(c.pillarPage.url))
          .map(c => ({
            title: c.pillarPage.title,
            url: c.pillarPage.url
          }));
        relatedLinks.push(...relatedPillarLinks);
      }
      break;
    }

    // If current page is cluster page, show pillar and sibling pages
    const clusterPage = cluster.clusterPages.find(p => p.url === currentUrl);
    if (clusterPage) {
      // Add pillar page
      relatedLinks.push({
        title: cluster.pillarPage.title,
        url: cluster.pillarPage.url
      });

      // Add sibling cluster pages
      const siblings = cluster.clusterPages
        .filter(p => p.url !== currentUrl)
        .slice(0, 3)
        .map(p => ({ title: p.title, url: p.url }));
      relatedLinks.push(...siblings);

      // Add related pillars
      if (cluster.relatedPillars) {
        const relatedPillarLinks = allClusters
          .filter(c => cluster.relatedPillars?.includes(c.pillarPage.url))
          .slice(0, 2)
          .map(c => ({
            title: c.pillarPage.title,
            url: c.pillarPage.url
          }));
        relatedLinks.push(...relatedPillarLinks);
      }
      break;
    }
  }

  return relatedLinks.slice(0, maxLinks);
}

// Get breadcrumb path for a page
export function getBreadcrumbPath(currentUrl: string): Array<{name: string; url: string}> {
  const breadcrumbs: Array<{name: string; url: string}> = [
    { name: 'Home', url: '/' }
  ];

  const allClusters = [...SERVICE_PILLARS, ...LOCATION_CLUSTERS, ...INSURANCE_CLUSTERS];

  for (const cluster of allClusters) {
    // Check if current page is in this cluster
    const clusterPage = cluster.clusterPages.find(p => p.url === currentUrl);
    if (clusterPage) {
      breadcrumbs.push({
        name: cluster.pillarPage.title,
        url: cluster.pillarPage.url
      });
      breadcrumbs.push({
        name: clusterPage.title,
        url: clusterPage.url
      });
      return breadcrumbs;
    }

    // Check if current page is pillar
    if (cluster.pillarPage.url === currentUrl) {
      breadcrumbs.push({
        name: cluster.pillarPage.title,
        url: cluster.pillarPage.url
      });
      return breadcrumbs;
    }
  }

  return breadcrumbs;
}
