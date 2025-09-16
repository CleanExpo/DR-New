/**
 * Security monitoring and logging system for DR-New
 * Provides comprehensive security event tracking and alerting
 */

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: SecurityEventType;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  source: string;
  ip?: string;
  userAgent?: string;
  details: Record<string, any>;
  metadata?: Record<string, any>;
}

type SecurityEventType =
  | 'AUTHENTICATION_FAILURE'
  | 'AUTHORIZATION_FAILURE'
  | 'RATE_LIMIT_EXCEEDED'
  | 'SUSPICIOUS_REQUEST'
  | 'XSS_ATTEMPT'
  | 'SQL_INJECTION_ATTEMPT'
  | 'CSRF_FAILURE'
  | 'FILE_UPLOAD_VIOLATION'
  | 'DATA_BREACH_ATTEMPT'
  | 'DOS_ATTACK'
  | 'MALICIOUS_FILE'
  | 'SECURITY_HEADER_VIOLATION'
  | 'ENCRYPTION_FAILURE'
  | 'CRITICAL_ERROR';

// Event severity mappings
const EVENT_SEVERITY: Record<SecurityEventType, 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'> = {
  'DATA_BREACH_ATTEMPT': 'CRITICAL',
  'SQL_INJECTION_ATTEMPT': 'CRITICAL',
  'MALICIOUS_FILE': 'CRITICAL',
  'ENCRYPTION_FAILURE': 'CRITICAL',
  'CRITICAL_ERROR': 'CRITICAL',
  'XSS_ATTEMPT': 'HIGH',
  'CSRF_FAILURE': 'HIGH',
  'DOS_ATTACK': 'HIGH',
  'AUTHENTICATION_FAILURE': 'MEDIUM',
  'AUTHORIZATION_FAILURE': 'MEDIUM',
  'SUSPICIOUS_REQUEST': 'MEDIUM',
  'FILE_UPLOAD_VIOLATION': 'MEDIUM',
  'RATE_LIMIT_EXCEEDED': 'LOW',
  'SECURITY_HEADER_VIOLATION': 'LOW',
};

// Alert thresholds
const ALERT_THRESHOLDS = {
  CRITICAL: 1, // Alert immediately
  HIGH: 3,     // Alert after 3 events in 5 minutes
  MEDIUM: 10,  // Alert after 10 events in 15 minutes
  LOW: 50,     // Alert after 50 events in 30 minutes
};

// Event storage (in production, use database or logging service)
const eventStore: SecurityEvent[] = [];
const alertHistory = new Map<string, number>();

/**
 * Log security event
 */
export function logSecurityEvent(
  type: SecurityEventType,
  details: Record<string, any>,
  metadata?: Record<string, any>
): SecurityEvent {
  const event: SecurityEvent = {
    id: generateEventId(),
    timestamp: new Date().toISOString(),
    type,
    severity: EVENT_SEVERITY[type],
    source: detectSource(),
    ip: details.ip,
    userAgent: details.userAgent,
    details,
    metadata,
  };

  // Store event
  eventStore.push(event);

  // Process event for alerting
  processSecurityEvent(event);

  // Log to console (in production, send to logging service)
  logEvent(event);

  return event;
}

/**
 * Process security event for alerting
 */
function processSecurityEvent(event: SecurityEvent): void {
  const threshold = ALERT_THRESHOLDS[event.severity];
  const key = `${event.type}:${event.severity}`;

  // Check if alert should be triggered
  const recentEvents = getRecentEvents(event.type, getTimeWindow(event.severity));

  if (recentEvents.length >= threshold) {
    triggerAlert(event, recentEvents);
  }

  // Track patterns for anomaly detection
  detectAnomalies(event);
}

/**
 * Trigger security alert
 */
function triggerAlert(event: SecurityEvent, relatedEvents: SecurityEvent[]): void {
  const alert = {
    id: generateEventId(),
    timestamp: new Date().toISOString(),
    severity: event.severity,
    type: event.type,
    message: generateAlertMessage(event, relatedEvents),
    events: relatedEvents.map(e => e.id),
    actionRequired: getRequiredAction(event),
  };

  // Log alert
  console.error('[SECURITY_ALERT]', JSON.stringify(alert, null, 2));

  // In production, send alerts via:
  // - Email to security team
  // - SMS for critical alerts
  // - Slack/Teams webhook
  // - PagerDuty integration
  // - SIEM system

  // Update alert history
  alertHistory.set(alert.id, Date.now());
}

/**
 * Detect anomalies in security events
 */
function detectAnomalies(event: SecurityEvent): void {
  // Check for patterns indicating coordinated attacks
  const patterns = [
    checkBruteForcePattern(event),
    checkDistributedAttackPattern(event),
    checkScanningPattern(event),
    checkDataExfiltrationPattern(event),
  ];

  const detectedPatterns = patterns.filter(p => p.detected);

  if (detectedPatterns.length > 0) {
    logSecurityEvent('SUSPICIOUS_REQUEST', {
      patterns: detectedPatterns.map(p => p.type),
      originalEvent: event.id,
      confidence: calculateConfidence(detectedPatterns),
    });
  }
}

/**
 * Check for brute force pattern
 */
function checkBruteForcePattern(event: SecurityEvent): { detected: boolean; type: string; confidence: number } {
  if (event.type !== 'AUTHENTICATION_FAILURE') {
    return { detected: false, type: 'brute_force', confidence: 0 };
  }

  const recentFailures = eventStore.filter(
    e => e.type === 'AUTHENTICATION_FAILURE' &&
         e.ip === event.ip &&
         Date.now() - new Date(e.timestamp).getTime() < 300000 // 5 minutes
  );

  const detected = recentFailures.length > 5;
  const confidence = Math.min(recentFailures.length / 10, 1);

  return { detected, type: 'brute_force', confidence };
}

/**
 * Check for distributed attack pattern
 */
function checkDistributedAttackPattern(event: SecurityEvent): { detected: boolean; type: string; confidence: number } {
  const recentEvents = getRecentEvents(event.type, 60000); // 1 minute
  const uniqueIps = new Set(recentEvents.map(e => e.ip));

  const detected = uniqueIps.size > 10 && recentEvents.length > 50;
  const confidence = Math.min(uniqueIps.size / 20, 1);

  return { detected, type: 'distributed_attack', confidence };
}

/**
 * Check for scanning pattern
 */
function checkScanningPattern(event: SecurityEvent): { detected: boolean; type: string; confidence: number } {
  const scanIndicators = [
    'nikto', 'sqlmap', 'nmap', 'burp', 'owasp', 'acunetix', 'nessus'
  ];

  const userAgent = event.userAgent?.toLowerCase() || '';
  const detected = scanIndicators.some(indicator => userAgent.includes(indicator));
  const confidence = detected ? 0.9 : 0;

  return { detected, type: 'vulnerability_scanning', confidence };
}

/**
 * Check for data exfiltration pattern
 */
function checkDataExfiltrationPattern(event: SecurityEvent): { detected: boolean; type: string; confidence: number } {
  // Check for unusual data access patterns
  const recentDataAccess = eventStore.filter(
    e => e.ip === event.ip &&
         Date.now() - new Date(e.timestamp).getTime() < 600000 // 10 minutes
  );

  const detected = recentDataAccess.length > 100; // Excessive requests
  const confidence = Math.min(recentDataAccess.length / 200, 1);

  return { detected, type: 'data_exfiltration', confidence };
}

/**
 * Get recent events of specific type
 */
function getRecentEvents(type: SecurityEventType, windowMs: number): SecurityEvent[] {
  const cutoff = Date.now() - windowMs;
  return eventStore.filter(
    e => e.type === type && new Date(e.timestamp).getTime() > cutoff
  );
}

/**
 * Get time window for severity level
 */
function getTimeWindow(severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'): number {
  switch (severity) {
    case 'CRITICAL': return 60000;    // 1 minute
    case 'HIGH': return 300000;        // 5 minutes
    case 'MEDIUM': return 900000;      // 15 minutes
    case 'LOW': return 1800000;        // 30 minutes
  }
}

/**
 * Generate alert message
 */
function generateAlertMessage(event: SecurityEvent, relatedEvents: SecurityEvent[]): string {
  const messages: Record<SecurityEventType, string> = {
    'DATA_BREACH_ATTEMPT': `CRITICAL: Potential data breach attempt detected from IP ${event.ip}`,
    'SQL_INJECTION_ATTEMPT': `CRITICAL: SQL injection attempt blocked from IP ${event.ip}`,
    'MALICIOUS_FILE': `CRITICAL: Malicious file upload attempt from IP ${event.ip}`,
    'ENCRYPTION_FAILURE': `CRITICAL: Encryption system failure - immediate action required`,
    'CRITICAL_ERROR': `CRITICAL: System security error - ${event.details.error}`,
    'XSS_ATTEMPT': `HIGH: XSS attack attempt detected from IP ${event.ip}`,
    'CSRF_FAILURE': `HIGH: CSRF token validation failure from IP ${event.ip}`,
    'DOS_ATTACK': `HIGH: Potential DoS attack - ${relatedEvents.length} requests from ${event.ip}`,
    'AUTHENTICATION_FAILURE': `Authentication failures detected: ${relatedEvents.length} attempts`,
    'AUTHORIZATION_FAILURE': `Unauthorized access attempts: ${relatedEvents.length} from IP ${event.ip}`,
    'SUSPICIOUS_REQUEST': `Suspicious activity detected from IP ${event.ip}`,
    'FILE_UPLOAD_VIOLATION': `File upload policy violation from IP ${event.ip}`,
    'RATE_LIMIT_EXCEEDED': `Rate limit exceeded: ${relatedEvents.length} requests from IP ${event.ip}`,
    'SECURITY_HEADER_VIOLATION': `Security header policy violation detected`,
  };

  return messages[event.type] || `Security event: ${event.type}`;
}

/**
 * Get required action for event
 */
function getRequiredAction(event: SecurityEvent): string {
  const actions: Record<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW', string> = {
    'CRITICAL': 'Immediate investigation required. Check logs and block IP if necessary.',
    'HIGH': 'Review security logs and consider temporary IP blocking.',
    'MEDIUM': 'Monitor for continued activity and review security policies.',
    'LOW': 'Log for analysis. No immediate action required.',
  };

  return actions[event.severity];
}

/**
 * Calculate confidence score for detected patterns
 */
function calculateConfidence(patterns: Array<{ confidence: number }>): number {
  if (patterns.length === 0) return 0;
  const total = patterns.reduce((sum, p) => sum + p.confidence, 0);
  return total / patterns.length;
}

/**
 * Detect source of request
 */
function detectSource(): string {
  // In a real implementation, this would detect the actual source
  return typeof window !== 'undefined' ? 'client' : 'server';
}

/**
 * Generate unique event ID
 */
function generateEventId(): string {
  return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Log event to console/service
 */
function logEvent(event: SecurityEvent): void {
  const logLevel = event.severity === 'CRITICAL' || event.severity === 'HIGH' ? 'error' : 'warn';
  console[logLevel](`[SECURITY_${event.severity}]`, JSON.stringify(event, null, 2));
}

/**
 * Get security metrics
 */
export function getSecurityMetrics(): {
  totalEvents: number;
  eventsBySeverity: Record<string, number>;
  eventsByType: Record<string, number>;
  recentAlerts: number;
  topIpAddresses: Array<{ ip: string; count: number }>;
  anomalyScore: number;
} {
  const now = Date.now();
  const last24Hours = eventStore.filter(
    e => now - new Date(e.timestamp).getTime() < 86400000
  );

  // Count events by severity
  const eventsBySeverity = last24Hours.reduce((acc, event) => {
    acc[event.severity] = (acc[event.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count events by type
  const eventsByType = last24Hours.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count IPs
  const ipCounts = last24Hours.reduce((acc, event) => {
    if (event.ip) {
      acc[event.ip] = (acc[event.ip] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topIpAddresses = Object.entries(ipCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([ip, count]) => ({ ip, count }));

  // Calculate anomaly score
  const criticalCount = eventsBySeverity['CRITICAL'] || 0;
  const highCount = eventsBySeverity['HIGH'] || 0;
  const anomalyScore = Math.min(
    (criticalCount * 10 + highCount * 5) / 100,
    1
  );

  return {
    totalEvents: last24Hours.length,
    eventsBySeverity,
    eventsByType,
    recentAlerts: Array.from(alertHistory.values()).filter(
      time => now - time < 3600000 // Last hour
    ).length,
    topIpAddresses,
    anomalyScore,
  };
}

/**
 * Export monitoring dashboard data
 */
export function getDashboardData() {
  const metrics = getSecurityMetrics();
  const recentEvents = eventStore
    .slice(-50)
    .reverse()
    .map(e => ({
      id: e.id,
      timestamp: e.timestamp,
      type: e.type,
      severity: e.severity,
      ip: e.ip,
      summary: e.details.summary || `${e.type} event`,
    }));

  return {
    metrics,
    recentEvents,
    systemStatus: getSystemStatus(),
    recommendations: getSecurityRecommendations(metrics),
  };
}

/**
 * Get system security status
 */
function getSystemStatus(): 'SECURE' | 'WARNING' | 'CRITICAL' {
  const metrics = getSecurityMetrics();

  if (metrics.eventsBySeverity['CRITICAL'] > 0) return 'CRITICAL';
  if (metrics.eventsBySeverity['HIGH'] > 5) return 'WARNING';
  if (metrics.anomalyScore > 0.5) return 'WARNING';

  return 'SECURE';
}

/**
 * Get security recommendations
 */
function getSecurityRecommendations(metrics: ReturnType<typeof getSecurityMetrics>): string[] {
  const recommendations: string[] = [];

  if (metrics.eventsBySeverity['CRITICAL'] > 0) {
    recommendations.push('Immediate action required: Critical security events detected');
  }

  if (metrics.topIpAddresses[0]?.count > 100) {
    recommendations.push(`Consider blocking IP ${metrics.topIpAddresses[0].ip} - excessive requests`);
  }

  if (metrics.anomalyScore > 0.7) {
    recommendations.push('High anomaly score detected - review security logs');
  }

  if (metrics.eventsByType['AUTHENTICATION_FAILURE'] > 20) {
    recommendations.push('Multiple authentication failures - possible brute force attack');
  }

  return recommendations;
}

export default {
  logSecurityEvent,
  getSecurityMetrics,
  getDashboardData,
};