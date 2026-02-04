/**
 * Australian Postcode Geocoding Utility
 *
 * Provides latitude/longitude coordinates for Australian postcodes
 * to enable map visualization of contractor service areas.
 */

interface PostcodeData {
  postcode: string;
  suburb: string;
  state: string;
  lat: number;
  lng: number;
}

interface Coordinates {
  lat: number;
  lng: number;
}

// State center coordinates as fallback
const STATE_CENTERS: Record<string, Coordinates> = {
  NSW: { lat: -33.8688, lng: 151.2093 }, // Sydney
  VIC: { lat: -37.8136, lng: 144.9631 }, // Melbourne
  QLD: { lat: -27.4698, lng: 153.0251 }, // Brisbane
  SA: { lat: -34.9285, lng: 138.6007 }, // Adelaide
  WA: { lat: -31.9505, lng: 115.8605 }, // Perth
  TAS: { lat: -42.8821, lng: 147.3272 }, // Hobart
  NT: { lat: -12.4634, lng: 130.8456 }, // Darwin
  ACT: { lat: -35.2820, lng: 149.1286 }, // Canberra
};

// Cache for loaded postcode data
let postcodeCache: Map<string, PostcodeData> | null = null;

/**
 * Load Australian postcodes data from JSON file
 * Lazy-loads and caches the dataset
 */
async function loadPostcodes(): Promise<Map<string, PostcodeData>> {
  if (postcodeCache) {
    return postcodeCache;
  }

  try {
    const response = await fetch('/data/au-postcodes.json');
    if (!response.ok) {
      throw new Error(`Failed to load postcodes: ${response.statusText}`);
    }

    const data: PostcodeData[] = await response.json();
    postcodeCache = new Map(data.map((item) => [item.postcode, item]));
    return postcodeCache;
  } catch (error) {
    console.error('Error loading Australian postcodes:', error);
    postcodeCache = new Map(); // Empty cache on error
    return postcodeCache;
  }
}

/**
 * Get coordinates for a specific Australian postcode
 * @param postcode - 4-digit Australian postcode
 * @returns Coordinates or null if not found
 */
export async function getPostcodeCoordinates(
  postcode: string
): Promise<Coordinates | null> {
  const normalizedPostcode = postcode.trim().padStart(4, '0');
  const data = await loadPostcodes();
  const postcodeData = data.get(normalizedPostcode);

  if (postcodeData) {
    return {
      lat: postcodeData.lat,
      lng: postcodeData.lng,
    };
  }

  return null;
}

/**
 * Get coordinates with fallback to state center
 * @param postcode - 4-digit Australian postcode
 * @param state - Australian state code (NSW, VIC, QLD, SA, WA, TAS, NT, ACT)
 * @returns Coordinates (postcode-specific or state center)
 */
export async function getPostcodeCoordinatesWithFallback(
  postcode: string,
  state: string
): Promise<Coordinates> {
  const coordinates = await getPostcodeCoordinates(postcode);

  if (coordinates) {
    return coordinates;
  }

  // Fallback to state center
  const stateCenter = STATE_CENTERS[state.toUpperCase()];
  if (stateCenter) {
    return stateCenter;
  }

  // Ultimate fallback: Australia center
  return { lat: -25.2744, lng: 133.7751 };
}

/**
 * Get state center coordinates
 * @param state - Australian state code
 * @returns Coordinates of state center
 */
export function getStateCenter(state: string): Coordinates {
  const stateCenter = STATE_CENTERS[state.toUpperCase()];
  if (stateCenter) {
    return stateCenter;
  }

  // Fallback to Australia center
  return { lat: -25.2744, lng: 133.7751 };
}

/**
 * Get postcode information including suburb name
 * @param postcode - 4-digit Australian postcode
 * @returns Full postcode data or null
 */
export async function getPostcodeInfo(
  postcode: string
): Promise<PostcodeData | null> {
  const normalizedPostcode = postcode.trim().padStart(4, '0');
  const data = await loadPostcodes();
  return data.get(normalizedPostcode) || null;
}

/**
 * Batch get coordinates for multiple postcodes
 * Useful for loading all service area coordinates at once
 * @param postcodes - Array of 4-digit Australian postcodes
 * @returns Map of postcode to coordinates
 */
export async function getMultiplePostcodeCoordinates(
  postcodes: string[]
): Promise<Map<string, Coordinates>> {
  const data = await loadPostcodes();
  const results = new Map<string, Coordinates>();

  for (const postcode of postcodes) {
    const normalizedPostcode = postcode.trim().padStart(4, '0');
    const postcodeData = data.get(normalizedPostcode);

    if (postcodeData) {
      results.set(normalizedPostcode, {
        lat: postcodeData.lat,
        lng: postcodeData.lng,
      });
    }
  }

  return results;
}

/**
 * Calculate approximate distance between two coordinates (Haversine formula)
 * @param coord1 - First coordinate
 * @param coord2 - Second coordinate
 * @returns Distance in kilometers
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
