'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';

export interface LocalServiceAreaMapProps {
  location: {
    name: string;
    fullName: string;
    postcode: string;
    latitude: number;
    longitude: number;
    responseTime: string;
  };
  nearbySuburbs?: Array<{
    name: string;
    responseTime: string;
  }>;
  localLandmarks?: string[];
}

/**
 * LOCAL SERVICE AREA MAP COMPONENT
 * Displays Google Maps embed with geo-coordinates for maximum local SEO signals
 *
 * Critical for local search ranking:
 * - Embedded Google Maps (strong local signal)
 * - Visible latitude/longitude coordinates
 * - Response time data
 * - Nearby suburbs for broader local coverage
 */
export default function LocalServiceAreaMap({
  location,
  nearbySuburbs = [],
  localLandmarks = []
}: LocalServiceAreaMapProps) {
  // Generate Google Maps embed URL
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14159.678!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(location.fullName)}!5e0!3m2!1sen!2sau!4v${Date.now()}`;

  // Generate directions URL
  const directionsUrl = `https://www.google.com/maps/dir//${encodeURIComponent(location.fullName)}+QLD+${location.postcode}`;

  return (
    <section className="py-16 bg-white" itemScope itemType="https://schema.org/Place">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          <span itemProp="name">{location.name}</span> Brisbane Service Area
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Rapid {location.responseTime} emergency response to all {location.name} properties
        </p>

        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-200 shadow-lg">
          {/* Location Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <MapPinIcon className="w-8 h-8 text-red-600" aria-hidden="true" />
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900" itemProp="address">
                {location.fullName}, Brisbane QLD {location.postcode}
              </h3>
              <p className="text-gray-600">Emergency Response Zone: {location.responseTime}</p>
            </div>
          </div>

          {/* Google Maps Embed - Critical Local SEO Signal */}
          <div
            className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl mb-6"
            itemProp="geo"
            itemScope
            itemType="https://schema.org/GeoCoordinates"
          >
            <meta itemProp="latitude" content={location.latitude.toString()} />
            <meta itemProp="longitude" content={location.longitude.toString()} />

            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title={`Map showing ${location.name} Brisbane emergency restoration service area`}
            />
          </div>

          {/* Geo-Coordinates Display - Local SEO Signal */}
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-600 mb-1">Latitude</p>
              <p className="text-lg font-bold text-gray-900">{location.latitude.toFixed(4)}°</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-600 mb-1">Longitude</p>
              <p className="text-lg font-bold text-gray-900">{location.longitude.toFixed(4)}°</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-600 mb-1">Response Time</p>
              <p className="text-lg font-bold text-red-600">{location.responseTime}</p>
            </div>
          </div>

          {/* Directions Link */}
          <div className="mt-6 text-center">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              <MapPinIcon className="w-5 h-5" aria-hidden="true" />
              Get Directions to {location.name}
            </a>
          </div>
        </div>

        {/* Nearby Suburbs - Broader Local Coverage */}
        {nearbySuburbs.length > 0 && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Nearby Brisbane Suburbs We Serve
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {nearbySuburbs.map((suburb, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900">{suburb.name}</p>
                  <p className="text-sm text-gray-600">{suburb.responseTime}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Landmarks - Queensland/Brisbane Specific Content */}
        {localLandmarks.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border border-red-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Serving Properties Near:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {localLandmarks.map((landmark, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                >
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * LOCATION DATA FOR ALL SERVICE AREAS
 * Use this for consistent local SEO implementation
 */
export const LOCATION_DATA = {
  hamilton: {
    location: {
      name: 'Hamilton',
      fullName: 'Hamilton',
      postcode: '4007',
      latitude: -27.4380,
      longitude: 153.0650,
      responseTime: '< 30 Minutes'
    },
    nearbySuburbs: [
      { name: 'Ascot', responseTime: '5 min response' },
      { name: 'New Farm', responseTime: '8 min response' },
      { name: 'Albion', responseTime: '10 min response' },
      { name: 'Clayfield', responseTime: '12 min response' }
    ],
    localLandmarks: [
      'Brisbane River',
      'Hamilton Harbour',
      'Portside Wharf',
      'Racecourse Road',
      'Doomben Racecourse'
    ]
  },

  ascot: {
    location: {
      name: 'Ascot',
      fullName: 'Ascot',
      postcode: '4007',
      latitude: -27.4320,
      longitude: 153.0580,
      responseTime: '< 30 Minutes'
    },
    nearbySuburbs: [
      { name: 'Hamilton', responseTime: '5 min response' },
      { name: 'Clayfield', responseTime: '7 min response' },
      { name: 'Hendra', responseTime: '10 min response' },
      { name: 'Eagle Farm', responseTime: '12 min response' }
    ],
    localLandmarks: [
      'Eagle Farm Racecourse',
      'Ascot State School',
      'Brisbane Entertainment Centre',
      'Doomben Golf Club'
    ]
  },

  newFarm: {
    location: {
      name: 'New Farm',
      fullName: 'New Farm',
      postcode: '4005',
      latitude: -27.4650,
      longitude: 153.0500,
      responseTime: '< 30 Minutes'
    },
    nearbySuburbs: [
      { name: 'Teneriffe', responseTime: '5 min response' },
      { name: 'Fortitude Valley', responseTime: '7 min response' },
      { name: 'Hamilton', responseTime: '10 min response' },
      { name: 'Newstead', responseTime: '8 min response' }
    ],
    localLandmarks: [
      'New Farm Park',
      'Brisbane River',
      'Howard Smith Wharves',
      'New Farm Powerhouse',
      'Brunswick Street'
    ]
  },

  toowong: {
    location: {
      name: 'Toowong',
      fullName: 'Toowong',
      postcode: '4066',
      latitude: -27.4850,
      longitude: 152.9900,
      responseTime: '< 30 Minutes'
    },
    nearbySuburbs: [
      { name: 'Taringa', responseTime: '5 min response' },
      { name: 'Auchenflower', responseTime: '7 min response' },
      { name: 'Indooroopilly', responseTime: '10 min response' },
      { name: 'Milton', responseTime: '12 min response' }
    ],
    localLandmarks: [
      'Toowong Village',
      'Brisbane River',
      'Mount Coot-tha',
      'Toowong Cemetery',
      'Regatta Hotel'
    ]
  },

  karalee: {
    location: {
      name: 'Karalee',
      fullName: 'Karalee',
      postcode: '4306',
      latitude: -27.5700,
      longitude: 152.7800,
      responseTime: '< 30 Minutes'
    },
    nearbySuburbs: [
      { name: 'Brookwater', responseTime: '10 min response' },
      { name: 'Chuwar', responseTime: '8 min response' },
      { name: 'Ipswich', responseTime: '15 min response' },
      { name: 'Springfield Lakes', responseTime: '20 min response' }
    ],
    localLandmarks: [
      'Karalee Shopping Village',
      'Colleges Crossing',
      'Brisbane River',
      'Karalee State School'
    ]
  },

  brookwater: {
    location: {
      name: 'Brookwater',
      fullName: 'Brookwater',
      postcode: '4300',
      latitude: -27.6700,
      longitude: 152.9100,
      responseTime: '< 30 Minutes'
    },
    nearbySuburbs: [
      { name: 'Springfield Lakes', responseTime: '5 min response' },
      { name: 'Springfield Central', responseTime: '8 min response' },
      { name: 'Augustine Heights', responseTime: '10 min response' },
      { name: 'Karalee', responseTime: '15 min response' }
    ],
    localLandmarks: [
      'Brookwater Golf & Country Club',
      'Springfield Central',
      'Orion Shopping Centre',
      'Robelle Domain'
    ]
  },

  springfieldLakes: {
    location: {
      name: 'Springfield Lakes',
      fullName: 'Springfield Lakes',
      postcode: '4300',
      latitude: -27.6700,
      longitude: 152.9200,
      responseTime: '< 30 Minutes'
    },
    nearbySuburbs: [
      { name: 'Brookwater', responseTime: '5 min response' },
      { name: 'Springfield Central', responseTime: '7 min response' },
      { name: 'Augustine Heights', responseTime: '10 min response' },
      { name: 'Ipswich', responseTime: '20 min response' }
    ],
    localLandmarks: [
      'Orion Shopping Centre',
      'Springfield Central Station',
      'Robelle Domain',
      'Discovery Lakes'
    ]
  }
} as const;
