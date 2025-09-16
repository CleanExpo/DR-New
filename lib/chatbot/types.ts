// Chatbot System Types and Interfaces

export type ChatLanguage = 'en' | 'zh' | 'ar';

export type MessageRole = 'user' | 'assistant' | 'system' | 'agent';

export type MessageType =
  | 'text'
  | 'voice'
  | 'image'
  | 'file'
  | 'location'
  | 'emergency'
  | 'booking'
  | 'quote'
  | 'insurance'
  | 'feedback';

export type ConversationStatus =
  | 'active'
  | 'waiting'
  | 'agent_handoff'
  | 'resolved'
  | 'emergency';

export type EmotionalState =
  | 'neutral'
  | 'anxious'
  | 'distressed'
  | 'frustrated'
  | 'satisfied'
  | 'grateful';

export type ServiceType =
  | 'water-damage'
  | 'fire-damage'
  | 'mould-remediation'
  | 'biohazard'
  | 'storm-recovery'
  | 'general';

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  metadata?: MessageMetadata;
  timestamp: Date;
  language: ChatLanguage;
  emotionalState?: EmotionalState;
  attachments?: Attachment[];
  agentId?: string;
}

export interface MessageMetadata {
  intent?: string;
  confidence?: number;
  entities?: Entity[];
  sentiment?: SentimentAnalysis;
  urgency?: UrgencyLevel;
  suggestedActions?: Action[];
  formData?: Record<string, any>;
  location?: LocationData;
  weatherAlert?: WeatherAlert;
}

export interface Entity {
  type: string;
  value: string;
  confidence: number;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1
  magnitude: number; // 0 to infinity
  emotion: EmotionalState;
}

export interface UrgencyLevel {
  level: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  suggestedResponseTime: number; // in seconds
}

export interface Action {
  type: 'book' | 'call' | 'quote' | 'upload' | 'form' | 'escalate';
  label: string;
  data?: Record<string, any>;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'audio';
  url: string;
  name: string;
  size: number;
  mimeType: string;
  analysis?: ImageAnalysis | DocumentAnalysis;
}

export interface ImageAnalysis {
  damageType?: string[];
  severity?: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  affectedArea?: number; // in square meters
  estimatedCost?: number;
  recommendations?: string[];
  insuranceRelevant?: boolean;
}

export interface DocumentAnalysis {
  documentType?: string;
  extractedData?: Record<string, any>;
  insuranceInfo?: InsuranceInfo;
}

export interface LocationData {
  lat: number;
  lng: number;
  address?: string;
  suburb?: string;
  postcode?: string;
  serviceArea?: string;
}

export interface WeatherAlert {
  type: string;
  severity: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  affectedAreas: string[];
}

export interface Conversation {
  id: string;
  userId?: string;
  status: ConversationStatus;
  language: ChatLanguage;
  messages: ChatMessage[];
  context: ConversationContext;
  startTime: Date;
  endTime?: Date;
  agentId?: string;
  rating?: number;
  feedback?: string;
}

export interface ConversationContext {
  serviceType?: ServiceType;
  propertyType?: 'residential' | 'commercial';
  urgency?: UrgencyLevel;
  location?: LocationData;
  customerInfo?: CustomerInfo;
  damageAssessment?: DamageAssessment;
  insuranceInfo?: InsuranceInfo;
  bookingInfo?: BookingInfo;
  quoteInfo?: QuoteInfo;
  emotionalJourney?: EmotionalState[];
  previousInteractions?: string[];
  weatherContext?: WeatherAlert;
}

export interface CustomerInfo {
  name?: string;
  email?: string;
  phone?: string;
  preferredLanguage?: ChatLanguage;
  preferredContactMethod?: 'phone' | 'email' | 'chat';
  customerType?: 'new' | 'returning' | 'vip';
  propertyDetails?: PropertyDetails;
}

export interface PropertyDetails {
  type: 'house' | 'apartment' | 'commercial' | 'industrial';
  size?: number;
  rooms?: number;
  yearBuilt?: number;
  insuranceProvider?: string;
  policyNumber?: string;
}

export interface DamageAssessment {
  type: ServiceType;
  severity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  affectedAreas: string[];
  timeOfIncident?: Date;
  description: string;
  images?: string[];
  estimatedCost?: CostEstimate;
  urgentAction?: boolean;
  healthHazards?: string[];
}

export interface CostEstimate {
  min: number;
  max: number;
  currency: string;
  breakdown?: CostBreakdown[];
}

export interface CostBreakdown {
  item: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber?: string;
  claimNumber?: string;
  coverageType?: string;
  deductible?: number;
  claimStatus?: 'not_filed' | 'pending' | 'approved' | 'denied';
  documentationRequired?: string[];
}

export interface BookingInfo {
  id?: string;
  serviceType: ServiceType;
  preferredDate?: Date;
  preferredTime?: string;
  urgency: 'immediate' | 'today' | 'tomorrow' | 'this_week' | 'flexible';
  duration?: number;
  technicians?: number;
  specialRequirements?: string[];
  status?: 'pending' | 'confirmed' | 'in_progress' | 'completed';
}

export interface QuoteInfo {
  id?: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  validUntil: Date;
  terms?: string;
  status?: 'draft' | 'sent' | 'accepted' | 'rejected';
}

export interface QuoteItem {
  service: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface AgentInfo {
  id: string;
  name: string;
  specialization?: ServiceType[];
  languages?: ChatLanguage[];
  availability?: 'available' | 'busy' | 'offline';
  currentChats?: number;
  maxChats?: number;
  rating?: number;
}

export interface ChatbotConfig {
  personality: PersonalityConfig;
  responseSettings: ResponseSettings;
  escalationRules: EscalationRule[];
  proactiveRules: ProactiveRule[];
  integrations: IntegrationConfig;
}

export interface PersonalityConfig {
  tone: 'professional' | 'friendly' | 'empathetic';
  name: string;
  avatar?: string;
  greetingMessage: Record<ChatLanguage, string>;
  farewellMessage: Record<ChatLanguage, string>;
  errorMessage: Record<ChatLanguage, string>;
}

export interface ResponseSettings {
  maxResponseTime: number; // milliseconds
  typingIndicator: boolean;
  readReceipts: boolean;
  suggestionsEnabled: boolean;
  voiceEnabled: boolean;
  translationEnabled: boolean;
}

export interface EscalationRule {
  condition: 'emergency' | 'frustrated' | 'complex' | 'vip' | 'request';
  threshold?: number;
  action: 'notify' | 'transfer' | 'priority';
  target?: string; // agent or queue ID
}

export interface ProactiveRule {
  trigger: 'time_on_page' | 'scroll_depth' | 'exit_intent' | 'error' | 'cart_abandonment';
  threshold: number;
  message: Record<ChatLanguage, string>;
  delay?: number;
}

export interface IntegrationConfig {
  crm?: CRMIntegration;
  booking?: BookingIntegration;
  payment?: PaymentIntegration;
  analytics?: AnalyticsIntegration;
  weather?: WeatherIntegration;
}

export interface CRMIntegration {
  provider: string;
  apiKey: string;
  syncFields?: string[];
}

export interface BookingIntegration {
  calendarId: string;
  availabilityApi: string;
  confirmationWebhook?: string;
}

export interface PaymentIntegration {
  provider: string;
  publicKey: string;
  acceptedMethods: string[];
}

export interface AnalyticsIntegration {
  googleAnalyticsId?: string;
  customEvents?: string[];
}

export interface WeatherIntegration {
  apiKey: string;
  alertTypes: string[];
  updateFrequency: number;
}

export interface ChatAnalytics {
  totalConversations: number;
  activeConversations: number;
  averageResponseTime: number;
  averageSatisfaction: number;
  escalationRate: number;
  resolutionRate: number;
  conversionRate: number;
  topIntents: Array<{intent: string; count: number}>;
  languageDistribution: Record<ChatLanguage, number>;
  peakHours: Array<{hour: number; count: number}>;
  commonIssues: Array<{issue: string; count: number}>;
}