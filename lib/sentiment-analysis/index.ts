/**
 * Sentiment Analysis System - Main Export
 * Complete review monitoring and response system for disaster recovery business
 */

export { ReviewSentimentAnalyzer } from './review-analyzer';
export type {
  Review,
  SentimentAnalysis,
  SentimentCategory
} from './review-analyzer';

export {
  RESPONSE_TEMPLATES,
  EXAMPLE_RESPONSE,
  getTemplate,
  getTemplatesByCategory,
  getTemplatesByRating
} from './response-templates';
export type { ResponseTemplate } from './response-templates';

export {
  ReviewMonitoringSystem,
  MONITORING_WORKFLOW,
  PLATFORM_MONITORING_TIPS
} from './review-monitoring';
export type {
  MonitoringConfig,
  ReviewPlatform,
  AlertChannel,
  ResponseTimeTarget,
  EscalationRule,
  MonitoringAlert
} from './review-monitoring';
