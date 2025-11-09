/**
 * Type-safe Routing with Template Literal Types
 *
 * Provides compile-time route validation and type-safe parameters
 */

/**
 * Service Routes (Template Literal Types)
 */
export type ServiceSlug =
  | 'water-damage-restoration'
  | 'fire-damage-restoration'
  | 'mould-remediation'
  | 'storm-damage-restoration'
  | 'emergency-response'
  | 'structural-drying'
  | 'biohazard-cleanup'
  | 'trauma-cleanup';

export type ServiceRoute = `/services/${ServiceSlug}`;

/**
 * Location Routes
 */
export type LocationSlug =
  | 'hamilton'
  | 'ascot'
  | 'new-farm'
  | 'toowong'
  | 'brookwater'
  | 'karalee'
  | 'springfield-lakes';

export type LocationRoute = `/locations/${LocationSlug}`;

/**
 * Emergency Routes
 */
export type EmergencyRoute =
  | '/emergency'
  | '/emergency/weekend'
  | '/emergency/after-hours'
  | '/emergency/public-holiday'
  | '/emergency/christmas'
  | '/emergency/new-year'
  | '/emergency/easter'
  | '/emergency/anzac-day'
  | '/emergency/water-damage-brisbane'
  | '/emergency/fire-damage-brisbane'
  | '/emergency/storm-damage-queensland';

/**
 * Insurance Provider Routes
 */
export type InsuranceProvider =
  | 'aami'
  | 'allianz'
  | 'anz-insurance'
  | 'budget-direct'
  | 'cgu'
  | 'coles-insurance'
  | 'comminsure'
  | 'gio'
  | 'nab-insurance'
  | 'nrma'
  | 'qbe'
  | 'racq'
  | 'suncorp'
  | 'youi';

export type InsuranceRoute = `/insurance/${InsuranceProvider}`;

/**
 * FAQ Routes
 */
export type FAQSlug =
  | 'water-damage'
  | 'fire-damage'
  | 'mould-remediation'
  | 'storm-damage'
  | 'carpet-drying'
  | 'ceiling-repairs'
  | 'sewage-cleanup'
  | 'biohazard-cleanup';

export type FAQRoute = `/faq/${FAQSlug}`;

/**
 * All Valid Routes (Union Type)
 */
export type ValidRoute =
  | '/'
  | ServiceRoute
  | LocationRoute
  | EmergencyRoute
  | InsuranceRoute
  | FAQRoute
  | '/about-carsi'
  | '/privacy'
  | '/terms'
  | '/cookies'
  | '/testimonials'
  | '/training';

/**
 * Route Parameters (Mapped Types)
 */
export type RouteParams<T extends string> = T extends `${infer Start}/${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & RouteParams<`${Start}/${Rest}`>
  : T extends `${infer Start}/${infer Param}`
  ? { [K in Param]: string }
  : {};

/**
 * Route Builder
 */
export class RouteBuilder {
  static service(slug: ServiceSlug): ServiceRoute {
    return `/services/${slug}`;
  }

  static location(slug: LocationSlug): LocationRoute {
    return `/locations/${slug}`;
  }

  static insurance(provider: InsuranceProvider): InsuranceRoute {
    return `/insurance/${provider}`;
  }

  static faq(slug: FAQSlug): FAQRoute {
    return `/faq/${slug}`;
  }

  static emergency(): EmergencyRoute {
    return '/emergency';
  }

  static emergencyWeekend(): EmergencyRoute {
    return '/emergency/weekend';
  }

  static emergencyAfterHours(): EmergencyRoute {
    return '/emergency/after-hours';
  }

  static emergencyPublicHoliday(): EmergencyRoute {
    return '/emergency/public-holiday';
  }
}

/**
 * Route Metadata
 */
export interface RouteMetadata {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  sitemap?: {
    priority: number;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  };
}

/**
 * Route Configuration
 */
export type RouteConfig = {
  [K in ValidRoute]: RouteMetadata;
};

/**
 * Navigation Item
 */
export interface NavigationItem {
  label: string;
  href: ValidRoute;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
}

/**
 * Breadcrumb Item
 */
export interface BreadcrumbItem {
  label: string;
  href: ValidRoute | null;
}

/**
 * Query String Parameters
 */
export interface QueryParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ref?: string;
  [key: string]: string | undefined;
}

/**
 * Type-safe URL Builder
 */
export interface URLBuilder {
  pathname: ValidRoute;
  query?: QueryParams;
  hash?: string;
}

/**
 * Build URL with type safety
 */
export function buildURL(builder: URLBuilder): string {
  const { pathname, query, hash } = builder;
  const searchParams = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, value);
      }
    });
  }

  const search = searchParams.toString();
  const url = pathname + (search ? `?${search}` : '') + (hash ? `#${hash}` : '');

  return url;
}

/**
 * Route Pattern Matching
 */
export type RoutePattern<T extends string> = T extends `${infer Start}[${infer Param}]${infer Rest}`
  ? `${Start}${string}${Rest}`
  : T;

/**
 * Extract Route Params
 */
export type ExtractRouteParams<T extends string> =
  T extends `${infer _Start}/[${infer Param}]${infer Rest}`
    ? { [K in Param]: string } & ExtractRouteParams<Rest>
    : {};

/**
 * Dynamic Route
 */
export interface DynamicRoute<T extends string> {
  pattern: T;
  params: ExtractRouteParams<T>;
}

/**
 * Route Guard
 */
export interface RouteGuard {
  canActivate: (route: ValidRoute) => boolean | Promise<boolean>;
  redirectTo?: ValidRoute;
}

/**
 * Route Middleware
 */
export type RouteMiddleware = (
  route: ValidRoute,
  next: () => void
) => void | Promise<void>;

/**
 * Location + Service Combined Routes
 */
export type LocationServiceRoute = `${LocationRoute}${ServiceRoute}`;

/**
 * Sitemap Entry
 */
export interface SitemapEntry {
  url: ValidRoute;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    hreflang: string;
    href: string;
  }[];
}

/**
 * Route Helpers
 */
export const Routes = {
  home: '/' as const,

  services: {
    waterDamage: '/services/water-damage-restoration' as const,
    fireDamage: '/services/fire-damage-restoration' as const,
    mouldRemediation: '/services/mould-remediation' as const,
    stormDamage: '/services/storm-damage-restoration' as const,
    emergency: '/services/emergency-response' as const,
    structuralDrying: '/services/structural-drying' as const,
    biohazard: '/services/biohazard-cleanup' as const,
    trauma: '/services/trauma-cleanup' as const,
  },

  locations: {
    hamilton: '/locations/hamilton' as const,
    ascot: '/locations/ascot' as const,
    newFarm: '/locations/new-farm' as const,
    toowong: '/locations/toowong' as const,
    brookwater: '/locations/brookwater' as const,
    karalee: '/locations/karalee' as const,
    springfieldLakes: '/locations/springfield-lakes' as const,
  },

  emergency: {
    base: '/emergency' as const,
    weekend: '/emergency/weekend' as const,
    afterHours: '/emergency/after-hours' as const,
    publicHoliday: '/emergency/public-holiday' as const,
    christmas: '/emergency/christmas' as const,
    newYear: '/emergency/new-year' as const,
  },

  legal: {
    privacy: '/privacy' as const,
    terms: '/terms' as const,
    cookies: '/cookies' as const,
  },
} as const;

/**
 * Type guard for valid routes
 */
export function isValidRoute(path: string): path is ValidRoute {
  // Implementation would validate against all valid routes
  return path.startsWith('/');
}
