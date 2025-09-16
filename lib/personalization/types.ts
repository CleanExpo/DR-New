// Personalization Types and Interfaces
export interface VisitorProfile {
  id: string;
  sessionId: string;
  intent: VisitorIntent;
  urgencyLevel: UrgencyLevel;
  segment: VisitorSegment;
  location: LocationData;
  device: DeviceInfo;
  behavior: BehaviorData;
  history: VisitHistory;
  preferences: UserPreferences;
  weatherContext?: WeatherData;
  timestamp: number;
}

export enum VisitorIntent {
  EMERGENCY = 'emergency',
  PREVENTION = 'prevention',
  INFORMATION = 'information',
  INSURANCE_CLAIM = 'insurance_claim',
  QUOTE_REQUEST = 'quote_request',
  MAINTENANCE = 'maintenance',
  UNKNOWN = 'unknown'
}

export enum UrgencyLevel {
  CRITICAL = 'critical',     // Active emergency
  HIGH = 'high',             // Recent damage, needs immediate help
  MEDIUM = 'medium',         // Planning prevention or non-urgent repair
  LOW = 'low',              // Information gathering
  UNKNOWN = 'unknown'
}

export enum VisitorSegment {
  EMERGENCY_RESIDENTIAL = 'emergency_residential',
  EMERGENCY_COMMERCIAL = 'emergency_commercial',
  HIGH_VALUE_RESIDENTIAL = 'high_value_residential',
  COMMERCIAL_PROPERTY = 'commercial_property',
  INSURANCE_AGENT = 'insurance_agent',
  PROPERTY_MANAGER = 'property_manager',
  PREVENTION_FOCUSED = 'prevention_focused',
  RETURNING_CLIENT = 'returning_client',
  NEW_VISITOR = 'new_visitor'
}

export interface LocationData {
  city?: string;
  suburb?: string;
  postcode?: string;
  state?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  timezone?: string;
  isInServiceArea: boolean;
  nearestServiceCenter?: string;
  distanceToService?: number;
}

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  os: string;
  browser: string;
  screenSize: {
    width: number;
    height: number;
  };
  isTouch: boolean;
  connection?: 'slow' | 'fast' | 'unknown';
}

export interface BehaviorData {
  entryPoint: string;
  referrer: string;
  searchTerms?: string[];
  pagesViewed: PageView[];
  interactions: UserInteraction[];
  scrollDepth: number;
  timeOnSite: number;
  bounceRisk: number; // 0-1 probability
  engagementScore: number; // 0-100
}

export interface PageView {
  url: string;
  title: string;
  timestamp: number;
  duration: number;
  exitIntent: boolean;
}

export interface UserInteraction {
  type: 'click' | 'form_start' | 'form_submit' | 'call' | 'chat' | 'video_play' | 'download';
  target: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface VisitHistory {
  firstVisit: number;
  lastVisit: number;
  totalVisits: number;
  previousIntents: VisitorIntent[];
  servicesViewed: string[];
  quotesRequested: number;
  conversions: Conversion[];
}

export interface Conversion {
  type: 'call' | 'form' | 'chat' | 'booking';
  timestamp: number;
  value?: number;
  service?: string;
}

export interface UserPreferences {
  language: string;
  communicationPreference: 'call' | 'email' | 'sms' | 'chat';
  budgetRange?: 'economy' | 'standard' | 'premium';
  propertyType?: 'residential' | 'commercial' | 'industrial';
  insuranceStatus?: 'insured' | 'uninsured' | 'processing_claim';
}

export interface WeatherData {
  condition: 'storm' | 'flood' | 'fire' | 'hail' | 'normal';
  severity: 'low' | 'medium' | 'high' | 'extreme';
  alerts: WeatherAlert[];
  recentEvents: WeatherEvent[];
}

export interface WeatherAlert {
  type: string;
  severity: string;
  message: string;
  validUntil: number;
}

export interface WeatherEvent {
  type: string;
  date: number;
  impactRadius: number;
  affectedSuburbs: string[];
}

export interface PersonalizationContext {
  profile: VisitorProfile;
  recommendations: ServiceRecommendation[];
  content: ContentAdaptation;
  messaging: MessagingStrategy;
  pricing: PricingStrategy;
  ui: UIAdaptation;
}

export interface ServiceRecommendation {
  service: string;
  priority: number;
  reason: string;
  relevanceScore: number;
  urgency: UrgencyLevel;
  estimatedValue?: number;
  cta: CallToAction;
}

export interface CallToAction {
  text: string;
  action: string;
  style: 'emergency' | 'urgent' | 'standard' | 'soft';
  placement: 'hero' | 'sticky' | 'inline' | 'modal';
}

export interface ContentAdaptation {
  heroMessage: string;
  heroImage: string;
  emphasizedServices: string[];
  hiddenSections: string[];
  testimonialFilter?: string;
  caseStudyFilter?: string;
}

export interface MessagingStrategy {
  tone: 'emergency' | 'supportive' | 'professional' | 'educational';
  urgencyLevel: UrgencyLevel;
  trustSignals: string[];
  socialProof: string[];
  guarantees: string[];
}

export interface PricingStrategy {
  showPricing: boolean;
  pricingTier: 'economy' | 'standard' | 'premium';
  discounts: Discount[];
  paymentOptions: string[];
  insuranceMessaging: boolean;
}

export interface Discount {
  type: string;
  amount: number;
  condition: string;
  validUntil?: number;
}

export interface UIAdaptation {
  layout: 'emergency' | 'standard' | 'minimal';
  colorScheme: 'default' | 'high_contrast' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  chatPosition: 'bottom-right' | 'bottom-left' | 'center';
  stickyElements: string[];
}

export interface ABTestVariant {
  id: string;
  name: string;
  traffic: number; // 0-100 percentage
  modifications: Record<string, any>;
  metrics: TestMetrics;
}

export interface TestMetrics {
  impressions: number;
  conversions: number;
  revenue: number;
  avgTimeOnSite: number;
  bounceRate: number;
}

export interface PersonalizationEvent {
  type: string;
  timestamp: number;
  profileId: string;
  data: Record<string, any>;
}

export interface ConsentPreferences {
  analytics: boolean;
  personalization: boolean;
  marketing: boolean;
  necessary: boolean;
  timestamp: number;
}