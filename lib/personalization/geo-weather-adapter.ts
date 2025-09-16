// Geolocation and Weather-Based Adaptation System
import { LocationData, WeatherData, WeatherAlert, WeatherEvent } from './types';

export class GeoWeatherAdapter {
  private readonly SERVICE_AREAS = {
    primary: ['Brisbane', 'Ipswich', 'Logan'],
    extended: ['Gold Coast', 'Sunshine Coast'],
    suburbs: {
      brisbane: [
        'CBD', 'South Brisbane', 'West End', 'New Farm', 'Fortitude Valley',
        'Spring Hill', 'Kangaroo Point', 'Woolloongabba', 'East Brisbane',
        'Norman Park', 'Morningside', 'Bulimba', 'Hawthorne', 'Balmoral',
        'Ascot', 'Hamilton', 'Clayfield', 'Albion', 'Bowen Hills',
        'Newstead', 'Teneriffe', 'Newmarket', 'Wilston', 'Windsor',
        'Lutwyche', 'Kedron', 'Chermside', 'Stafford', 'Everton Park',
        'Mitchelton', 'Gaythorne', 'Enoggera', 'The Gap', 'Ashgrove',
        'Bardon', 'Paddington', 'Red Hill', 'Kelvin Grove', 'Herston',
        'Toowong', 'Auchenflower', 'Milton', 'St Lucia', 'Indooroopilly',
        'Taringa', 'Chapel Hill', 'Kenmore', 'Fig Tree Pocket', 'Jindalee',
        'Mount Ommaney', 'Corinda', 'Sherwood', 'Graceville', 'Chelmer',
        'Yeronga', 'Fairfield', 'Annerley', 'Moorooka', 'Salisbury',
        'Coopers Plains', 'Sunnybank', 'Calamvale', 'Stretton', 'Parkinson',
        'Algester', 'Acacia Ridge', 'Inala', 'Richlands', 'Forest Lake'
      ],
      ipswich: [
        'Ipswich Central', 'Booval', 'Bundamba', 'Riverview', 'Redbank',
        'Goodna', 'Springfield', 'Springfield Lakes', 'Augustine Heights',
        'Brookwater', 'Bellbird Park', 'Camira', 'Carole Park', 'Gailes',
        'Springfield Central', 'One Mile', 'Leichhardt', 'Sadliers Crossing',
        'Eastern Heights', 'Flinders View', 'Raceview', 'Yamanto', 'Churchill'
      ],
      logan: [
        'Beenleigh', 'Eagleby', 'Mount Warren Park', 'Windaroo', 'Bethania',
        'Waterford', 'Loganholme', 'Tanah Merah', 'Shailer Park', 'Loganlea',
        'Meadowbrook', 'Springwood', 'Underwood', 'Rochedale South', 'Priestdale',
        'Slacks Creek', 'Daisy Hill', 'Kingston', 'Woodridge', 'Logan Central',
        'Berrinba', 'Browns Plains', 'Regents Park', 'Heritage Park', 'Hillcrest',
        'Boronia Heights', 'Park Ridge', 'Parkwood', 'Bahrs Scrub', 'Buccan'
      ]
    }
  };

  private readonly WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '';
  private readonly GEOLOCATION_API_KEY = process.env.NEXT_PUBLIC_GEO_API_KEY || '';

  // Get location from IP or browser
  async detectLocation(): Promise<LocationData> {
    try {
      // Try browser geolocation first
      if (typeof window !== 'undefined' && 'geolocation' in navigator) {
        const position = await this.getBrowserLocation();
        if (position) {
          return await this.reverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          );
        }
      }

      // Fallback to IP-based location
      return await this.getIPLocation();
    } catch (error) {
      console.error('Location detection failed:', error);
      return this.getDefaultLocation();
    }
  }

  private getBrowserLocation(): Promise<GeolocationPosition | null> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(null);
        return;
      }

      const timeout = setTimeout(() => resolve(null), 5000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeout);
          resolve(position);
        },
        () => {
          clearTimeout(timeout);
          resolve(null);
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    });
  }

  private async reverseGeocode(lat: number, lng: number): Promise<LocationData> {
    try {
      // In production, this would call a geocoding API
      // For now, use distance calculation to determine nearest service area
      const brisbane = { lat: -27.4689, lng: 153.0251 };
      const ipswich = { lat: -27.6178, lng: 152.7659 };
      const logan = { lat: -27.6393, lng: 153.1093 };

      const distances = [
        { city: 'Brisbane', distance: this.calculateDistance(lat, lng, brisbane.lat, brisbane.lng) },
        { city: 'Ipswich', distance: this.calculateDistance(lat, lng, ipswich.lat, ipswich.lng) },
        { city: 'Logan', distance: this.calculateDistance(lat, lng, logan.lat, logan.lng) }
      ];

      distances.sort((a, b) => a.distance - b.distance);
      const nearest = distances[0];

      return {
        city: nearest.city,
        state: 'QLD',
        country: 'Australia',
        coordinates: { lat, lng },
        timezone: 'Australia/Brisbane',
        isInServiceArea: nearest.distance < 50, // Within 50km
        nearestServiceCenter: nearest.city,
        distanceToService: nearest.distance
      };
    } catch (error) {
      return this.getDefaultLocation();
    }
  }

  private async getIPLocation(): Promise<LocationData> {
    try {
      // In production, this would call an IP geolocation API
      // For now, return default Brisbane location
      return this.getDefaultLocation();
    } catch (error) {
      return this.getDefaultLocation();
    }
  }

  private getDefaultLocation(): LocationData {
    return {
      city: 'Brisbane',
      state: 'QLD',
      country: 'Australia',
      timezone: 'Australia/Brisbane',
      isInServiceArea: true,
      nearestServiceCenter: 'Brisbane',
      distanceToService: 0
    };
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Get weather data for location
  async getWeatherData(location: LocationData): Promise<WeatherData | undefined> {
    try {
      // Check for recent weather events
      const recentEvents = await this.checkRecentWeatherEvents(location);
      const currentConditions = await this.getCurrentWeatherConditions(location);
      const alerts = await this.getWeatherAlerts(location);

      return {
        condition: this.determineWeatherCondition(currentConditions, recentEvents),
        severity: this.determineWeatherSeverity(currentConditions, alerts),
        alerts,
        recentEvents
      };
    } catch (error) {
      console.error('Weather data fetch failed:', error);
      return undefined;
    }
  }

  private async checkRecentWeatherEvents(location: LocationData): Promise<WeatherEvent[]> {
    // In production, this would check real weather event data
    // For now, return simulated data based on season
    const events: WeatherEvent[] = [];
    const now = new Date();
    const month = now.getMonth();

    // Summer storms (Oct-Mar)
    if (month >= 9 || month <= 2) {
      // Higher chance of storm events
      if (Math.random() > 0.7) {
        events.push({
          type: 'storm',
          date: Date.now() - 86400000, // Yesterday
          impactRadius: 20,
          affectedSuburbs: this.getNearbySuburbs(location.city || 'Brisbane', 5)
        });
      }
    }

    // Flood season (Nov-Apr)
    if (month >= 10 || month <= 3) {
      if (Math.random() > 0.8) {
        events.push({
          type: 'flood',
          date: Date.now() - 172800000, // 2 days ago
          impactRadius: 30,
          affectedSuburbs: this.getNearbySuburbs(location.city || 'Brisbane', 8)
        });
      }
    }

    // Hail events (Sep-Dec)
    if (month >= 8 && month <= 11) {
      if (Math.random() > 0.85) {
        events.push({
          type: 'hail',
          date: Date.now() - 259200000, // 3 days ago
          impactRadius: 15,
          affectedSuburbs: this.getNearbySuburbs(location.city || 'Brisbane', 3)
        });
      }
    }

    return events;
  }

  private getNearbySuburbs(city: string, count: number): string[] {
    const cityLower = city.toLowerCase();
    let suburbs: string[] = [];

    if (cityLower === 'brisbane' && this.SERVICE_AREAS.suburbs.brisbane) {
      suburbs = this.SERVICE_AREAS.suburbs.brisbane;
    } else if (cityLower === 'ipswich' && this.SERVICE_AREAS.suburbs.ipswich) {
      suburbs = this.SERVICE_AREAS.suburbs.ipswich;
    } else if (cityLower === 'logan' && this.SERVICE_AREAS.suburbs.logan) {
      suburbs = this.SERVICE_AREAS.suburbs.logan;
    }

    // Return random selection of suburbs
    const shuffled = [...suburbs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private async getCurrentWeatherConditions(location: LocationData): Promise<any> {
    // In production, this would call a weather API
    // For now, return simulated conditions
    const conditions = ['clear', 'rain', 'storm', 'cloudy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

    return {
      condition: randomCondition,
      temperature: 20 + Math.random() * 15,
      humidity: 60 + Math.random() * 30,
      windSpeed: 10 + Math.random() * 30,
      precipitation: randomCondition === 'rain' || randomCondition === 'storm' ?
        5 + Math.random() * 20 : 0
    };
  }

  private async getWeatherAlerts(location: LocationData): Promise<WeatherAlert[]> {
    const alerts: WeatherAlert[] = [];

    // Simulate alerts based on current conditions
    if (Math.random() > 0.7) {
      alerts.push({
        type: 'Severe Thunderstorm Warning',
        severity: 'high',
        message: 'Severe thunderstorms possible this afternoon with damaging winds and large hail',
        validUntil: Date.now() + 21600000 // 6 hours
      });
    }

    if (Math.random() > 0.85) {
      alerts.push({
        type: 'Flood Watch',
        severity: 'medium',
        message: 'Minor flooding possible in low-lying areas',
        validUntil: Date.now() + 43200000 // 12 hours
      });
    }

    return alerts;
  }

  private determineWeatherCondition(
    current: any,
    events: WeatherEvent[]
  ): 'storm' | 'flood' | 'fire' | 'hail' | 'normal' {
    // Check recent events first
    if (events.length > 0) {
      const mostRecent = events.sort((a, b) => b.date - a.date)[0];
      const hoursSince = (Date.now() - mostRecent.date) / 3600000;

      if (hoursSince < 48) {
        return mostRecent.type as any;
      }
    }

    // Check current conditions
    if (current.condition === 'storm') return 'storm';
    if (current.precipitation > 50) return 'flood';

    return 'normal';
  }

  private determineWeatherSeverity(
    current: any,
    alerts: WeatherAlert[]
  ): 'low' | 'medium' | 'high' | 'extreme' {
    if (alerts.some(a => a.severity === 'extreme')) return 'extreme';
    if (alerts.some(a => a.severity === 'high')) return 'high';

    if (current.condition === 'storm' && current.windSpeed > 40) return 'high';
    if (current.precipitation > 30) return 'medium';

    return 'low';
  }

  // Location-based service availability
  getServiceAvailability(location: LocationData): {
    available: boolean;
    responseTime: string;
    surcharge: number;
    message: string;
  } {
    if (!location.isInServiceArea) {
      return {
        available: false,
        responseTime: 'N/A',
        surcharge: 0,
        message: 'Unfortunately, we do not currently service your area. Please call for special arrangements.'
      };
    }

    const distance = location.distanceToService || 0;

    if (distance < 15) {
      return {
        available: true,
        responseTime: '30-60 minutes',
        surcharge: 0,
        message: 'Fast response available in your area!'
      };
    } else if (distance < 30) {
      return {
        available: true,
        responseTime: '1-2 hours',
        surcharge: 0,
        message: 'We service your area with standard response times.'
      };
    } else if (distance < 50) {
      return {
        available: true,
        responseTime: '2-4 hours',
        surcharge: 50,
        message: 'Extended service area - small travel surcharge applies.'
      };
    } else {
      return {
        available: true,
        responseTime: '4-6 hours',
        surcharge: 100,
        message: 'Remote service area - please call for availability.'
      };
    }
  }

  // Get location-specific messaging
  getLocationMessaging(location: LocationData): {
    headline: string;
    subheadline: string;
    trustSignal: string;
  } {
    const city = location.city || 'Brisbane';
    const isInServiceArea = location.isInServiceArea;

    if (!isInServiceArea) {
      return {
        headline: `Professional Disaster Recovery Services`,
        subheadline: 'Expanding our service area - call for availability',
        trustSignal: 'IICRC Certified Professionals'
      };
    }

    const suburb = location.suburb || '';
    const nearestCenter = location.nearestServiceCenter || city;

    return {
      headline: `${city} Emergency Disaster Recovery Services`,
      subheadline: suburb ?
        `Servicing ${suburb} and surrounding areas - 24/7 Emergency Response` :
        `${nearestCenter} Local Team - 24/7 Emergency Response`,
      trustSignal: `Trusted by ${city} residents for over 10 years`
    };
  }
}