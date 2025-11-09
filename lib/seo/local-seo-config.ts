/**
 * COMPREHENSIVE LOCAL SEO CONFIGURATION
 * Centralized NAP (Name, Address, Phone) and local search signals
 * for maximum Brisbane/Ipswich/Logan ranking power
 */

export interface LocalBusinessNAP {
  name: string;
  phone: string;
  phoneFormatted: string;
  phoneHref: string;
  email: string;
  website: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    fullAddress: string;
  };
}

export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  localKeywords: string[];
}

/**
 * MASTER NAP - USE THIS EVERYWHERE FOR CONSISTENCY
 * Critical for local SEO ranking signals
 */
export const MASTER_NAP: LocalBusinessNAP = {
  name: 'Disaster Recovery Brisbane',
  phone: '1300 309 361',
  phoneFormatted: '+61-1300-309-361',
  phoneHref: 'tel:1300309361',
  email: 'admin@disasterrecovery.com.au',
  website: 'https://dr-new-ten.vercel.app',
  address: {
    streetAddress: '4/17 Tile St',
    addressLocality: 'Wacol',
    addressRegion: 'QLD',
    postalCode: '4076',
    addressCountry: 'AU',
    fullAddress: '4/17 Tile St, Wacol, QLD 4076, Australia'
  }
};

/**
 * GEO-LOCATIONS WITH COORDINATES
 * Each location has precise lat/long for schema markup and maps
 */
export const GEO_LOCATIONS: Record<string, GeoLocation> = {
  // PRIMARY SERVICE BASE
  wacol: {
    name: 'Wacol (Base)',
    latitude: -27.5976,
    longitude: 152.9323,
    description: 'Disaster Recovery Brisbane headquarters - central Brisbane location for rapid emergency response',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.123!2d152.9323!3d-27.5976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM1JzUxLjQiUyAxNTLCsDU1JzU2LjMiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//4+17+Tile+St+Wacol+QLD+4076',
    localKeywords: ['Wacol emergency restoration', 'Brisbane west disaster recovery']
  },

  // BRISBANE LOCATIONS
  brisbane: {
    name: 'Brisbane CBD',
    latitude: -27.4705,
    longitude: 153.0260,
    description: 'Brisbane central business district emergency restoration services',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.8!2d153.0260!3d-27.4705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI4JzEzLjgiUyAxNTPCsDAxJzMzLjYiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Brisbane+QLD+4000',
    localKeywords: [
      'Brisbane CBD water damage',
      'Brisbane River flooding',
      'Brisbane emergency restoration',
      'Brisbane fire damage restoration',
      'Brisbane commercial property restoration'
    ]
  },

  hamilton: {
    name: 'Hamilton',
    latitude: -27.4380,
    longitude: 153.0650,
    description: 'Hamilton Brisbane riverside prestige property emergency restoration',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.2!2d153.0650!3d-27.4380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI2JzE2LjgiUyAxNTPCsDAzJzU0LjAiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Hamilton+QLD+4007',
    localKeywords: [
      'Hamilton water damage restoration',
      'Hamilton flood recovery',
      'Hamilton luxury home restoration',
      'Hamilton Brisbane River flood damage',
      'Hamilton heritage Queenslander restoration'
    ]
  },

  ascot: {
    name: 'Ascot',
    latitude: -27.4320,
    longitude: 153.0580,
    description: 'Ascot Brisbane prestige property disaster restoration',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.1!2d153.0580!3d-27.4320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI1JzU1LjIiUyAxNTPCsDAzJzI4LjgiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Ascot+QLD+4007',
    localKeywords: [
      'Ascot water damage restoration',
      'Ascot emergency restoration',
      'Ascot prestige home restoration',
      'Ascot fire damage repair'
    ]
  },

  newFarm: {
    name: 'New Farm',
    latitude: -27.4650,
    longitude: 153.0500,
    description: 'New Farm Brisbane riverside property emergency restoration',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.5!2d153.0500!3d-27.4650!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI3JzU0LjAiUyAxNTPCsDAzJzAwLjAiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//New+Farm+QLD+4005',
    localKeywords: [
      'New Farm water damage',
      'New Farm flood restoration',
      'New Farm Brisbane River flooding',
      'New Farm heritage apartment restoration'
    ]
  },

  toowong: {
    name: 'Toowong',
    latitude: -27.4850,
    longitude: 152.9900,
    description: 'Toowong Brisbane emergency disaster restoration services',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.9!2d152.9900!3d-27.4850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI5JzA2LjAiUyAxNTLCsDU5JzI0LjAiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Toowong+QLD+4066',
    localKeywords: [
      'Toowong water damage restoration',
      'Toowong emergency restoration',
      'Toowong fire damage repair',
      'Toowong storm damage restoration'
    ]
  },

  // IPSWICH LOCATIONS
  ipswich: {
    name: 'Ipswich',
    latitude: -27.6141,
    longitude: 152.7594,
    description: 'Ipswich Queensland emergency disaster restoration services',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.2!2d152.7594!3d-27.6141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM2JzUwLjgiUyAxNTLCsDQ1JzMzLjgiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Ipswich+QLD+4305',
    localKeywords: [
      'Ipswich water damage restoration',
      'Ipswich emergency restoration',
      'Ipswich flood recovery',
      'Ipswich fire damage restoration'
    ]
  },

  karalee: {
    name: 'Karalee',
    latitude: -27.5700,
    longitude: 152.7800,
    description: 'Karalee Ipswich prestige property emergency restoration',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.8!2d152.7800!3d-27.5700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM0JzEyLjAiUyAxNTLCsDQ2JzQ4LjAiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Karalee+QLD+4306',
    localKeywords: [
      'Karalee water damage restoration',
      'Karalee acreage property restoration',
      'Karalee emergency restoration',
      'Karalee Ipswich disaster recovery'
    ]
  },

  brookwater: {
    name: 'Brookwater',
    latitude: -27.6700,
    longitude: 152.9100,
    description: 'Brookwater Ipswich luxury golf estate emergency restoration',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.8!2d152.9100!3d-27.6700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQwJzEyLjAiUyAxNTLCsDU0JzM2LjAiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Brookwater+QLD+4300',
    localKeywords: [
      'Brookwater water damage restoration',
      'Brookwater luxury home restoration',
      'Brookwater golf estate restoration',
      'Brookwater Ipswich emergency services'
    ]
  },

  springfieldLakes: {
    name: 'Springfield Lakes',
    latitude: -27.6700,
    longitude: 152.9200,
    description: 'Springfield Lakes Ipswich emergency disaster restoration',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.9!2d152.9200!3d-27.6700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQwJzEyLjAiUyAxNTLCsDU1JzEyLjAiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Springfield+Lakes+QLD+4300',
    localKeywords: [
      'Springfield Lakes water damage',
      'Springfield Lakes emergency restoration',
      'Springfield Lakes flood recovery',
      'Springfield Lakes Ipswich disaster restoration'
    ]
  },

  // LOGAN LOCATIONS
  logan: {
    name: 'Logan',
    latitude: -27.6393,
    longitude: 153.1094,
    description: 'Logan Queensland emergency disaster restoration services',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.5!2d153.1094!3d-27.6393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM4JzIxLjUiUyAxNTPCsDA2JzMzLjgiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Logan+Central+QLD+4114',
    localKeywords: [
      'Logan water damage restoration',
      'Logan emergency restoration',
      'Logan commercial property restoration',
      'Logan Central disaster recovery'
    ]
  }
};

/**
 * QUEENSLAND-SPECIFIC LOCAL CONTENT KEYWORDS
 * Use these throughout content for local relevance signals
 */
export const QUEENSLAND_LOCAL_KEYWORDS = {
  climate: [
    'Queensland subtropical climate',
    'Southeast Queensland storms',
    'Brisbane summer storms',
    'Queensland wet season',
    'tropical moisture damage'
  ],

  geography: [
    'Brisbane River flooding',
    'Brisbane River catchment',
    'Southeast Queensland flood plains',
    'Brisbane CBD flood zone',
    'Hamilton riverside properties'
  ],

  landmarks: [
    'Brisbane CBD',
    'Story Bridge',
    'Brisbane River',
    'Mount Coot-tha',
    'Portside Wharf',
    'Howard Smith Wharves',
    'Newstead riverfront',
    'Teneriffe woolstores'
  ],

  events: [
    'Brisbane floods 2011',
    'Queensland flood history',
    'Brisbane summer storm season',
    'Southeast Queensland severe weather'
  ],

  propertyTypes: [
    'Queensland heritage homes',
    'Brisbane Queenslander houses',
    'riverside apartments Brisbane',
    'Hamilton prestige properties',
    'Ascot heritage estates',
    'New Farm character homes'
  ]
};

/**
 * GOOGLE MAPS INTEGRATION
 */
export function getGoogleMapsEmbed(locationKey: string, width: number = 600, height: number = 450): string {
  const location = GEO_LOCATIONS[locationKey];
  if (!location) return '';

  return `<iframe
    width="${width}"
    height="${height}"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    src="${location.mapEmbedUrl}">
  </iframe>`;
}

/**
 * NAP CONSISTENCY CHECKER
 * Returns formatted NAP for consistent display
 */
export function getFormattedNAP(format: 'schema' | 'display' | 'footer' = 'display') {
  switch (format) {
    case 'schema':
      return {
        '@type': 'Organization',
        name: MASTER_NAP.name,
        telephone: MASTER_NAP.phoneFormatted,
        email: MASTER_NAP.email,
        url: MASTER_NAP.website,
        address: {
          '@type': 'PostalAddress',
          streetAddress: MASTER_NAP.address.streetAddress,
          addressLocality: MASTER_NAP.address.addressLocality,
          addressRegion: MASTER_NAP.address.addressRegion,
          postalCode: MASTER_NAP.address.postalCode,
          addressCountry: MASTER_NAP.address.addressCountry
        }
      };

    case 'footer':
      return {
        name: MASTER_NAP.name,
        phone: MASTER_NAP.phone,
        phoneHref: MASTER_NAP.phoneHref,
        email: MASTER_NAP.email,
        address: MASTER_NAP.address.fullAddress
      };

    case 'display':
    default:
      return MASTER_NAP;
  }
}

/**
 * SERVICE AREAS STRUCTURED DATA
 */
export function getServiceAreasSchema() {
  return {
    '@type': 'Service',
    'serviceType': 'Emergency Disaster Restoration',
    'provider': {
      '@id': `${MASTER_NAP.website}/#organization`
    },
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Brisbane',
        'containedInPlace': {
          '@type': 'State',
          'name': 'Queensland',
          'containedInPlace': {
            '@type': 'Country',
            'name': 'Australia'
          }
        }
      },
      {
        '@type': 'City',
        'name': 'Ipswich',
        'containedInPlace': { '@type': 'State', 'name': 'Queensland' }
      },
      {
        '@type': 'City',
        'name': 'Logan',
        'containedInPlace': { '@type': 'State', 'name': 'Queensland' }
      },
      {
        '@type': 'GeoCircle',
        'geoMidpoint': {
          '@type': 'GeoCoordinates',
          'latitude': GEO_LOCATIONS.brisbane.latitude,
          'longitude': GEO_LOCATIONS.brisbane.longitude
        },
        'geoRadius': '50000' // 50km radius
      }
    ]
  };
}

export default {
  MASTER_NAP,
  GEO_LOCATIONS,
  QUEENSLAND_LOCAL_KEYWORDS,
  getGoogleMapsEmbed,
  getFormattedNAP,
  getServiceAreasSchema
};
