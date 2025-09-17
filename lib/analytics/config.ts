// Analytics Configuration for Disaster Recovery Brisbane
// World-class analytics system for comprehensive business intelligence

export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',

  // Real-time monitoring
  PUSHER: {
    appId: process.env.PUSHER_APP_ID || '',
    key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
    secret: process.env.PUSHER_SECRET || '',
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap4',
  },

  // Data refresh intervals (in milliseconds)
  REFRESH_INTERVALS: {
    REAL_TIME: 10000,      // 10 seconds for critical metrics (reduced from 1s)
    NEAR_REAL_TIME: 30000, // 30 seconds for important metrics (reduced from 5s)
    STANDARD: 120000,      // 2 minutes for standard metrics (reduced from 30s)
    BACKGROUND: 600000,    // 10 minutes for background data (reduced from 5m)
  },

  // Performance thresholds
  THRESHOLDS: {
    EMERGENCY_RESPONSE_TIME: 60,     // 60 minutes target
    PAGE_LOAD_TIME: 2000,            // 2 seconds
    CONVERSION_RATE_MIN: 2,          // 2% minimum
    CONVERSION_RATE_TARGET: 8,       // 8% target
    CUSTOMER_SATISFACTION_MIN: 4.5,  // 4.5/5 minimum
    BOUNCE_RATE_MAX: 40,             // 40% maximum
  },

  // Key Performance Indicators
  KPIs: {
    FINANCIAL: [
      'revenue',
      'profit_margin',
      'customer_acquisition_cost',
      'lifetime_value',
      'average_order_value',
      'revenue_per_visit',
    ],
    OPERATIONAL: [
      'response_time',
      'job_completion_time',
      'first_call_resolution',
      'service_quality_score',
      'equipment_utilization',
      'technician_productivity',
    ],
    MARKETING: [
      'conversion_rate',
      'cost_per_conversion',
      'return_on_ad_spend',
      'organic_traffic_growth',
      'brand_awareness_score',
      'market_share',
    ],
    CUSTOMER: [
      'satisfaction_score',
      'net_promoter_score',
      'customer_effort_score',
      'retention_rate',
      'churn_rate',
      'complaint_resolution_time',
    ],
  },

  // Service areas for geographic analytics
  SERVICE_AREAS: {
    PRIMARY: ['Brisbane', 'Ipswich', 'Logan'],
    EXTENDED: ['Gold Coast', 'Sunshine Coast'],
    SUBURBS: {
      BRISBANE: [
        'CBD', 'South Bank', 'West End', 'New Farm', 'Fortitude Valley',
        'Toowong', 'Indooroopilly', 'St Lucia', 'Kenmore', 'Chelmer',
        'Graceville', 'Sherwood', 'Corinda', 'Oxley', 'Darra',
      ],
      IPSWICH: [
        'Ipswich Central', 'Booval', 'Bundamba', 'Riverview', 'Redbank',
        'Goodna', 'Springfield', 'Brookwater', 'Augustine Heights',
      ],
      LOGAN: [
        'Springwood', 'Underwood', 'Slacks Creek', 'Woodridge', 'Kingston',
        'Marsden', 'Shailer Park', 'Tanah Merah', 'Rochedale',
      ],
    },
  },

  // Alert thresholds
  ALERTS: {
    CRITICAL: {
      revenue_drop: -20,           // 20% revenue drop
      conversion_rate_drop: -30,   // 30% conversion drop
      response_time_exceed: 90,    // 90 minutes response time
      site_downtime: 5,            // 5 minutes downtime
    },
    WARNING: {
      revenue_drop: -10,           // 10% revenue drop
      conversion_rate_drop: -15,   // 15% conversion drop
      response_time_exceed: 75,    // 75 minutes response time
      high_bounce_rate: 50,        // 50% bounce rate
    },
    INFO: {
      traffic_spike: 200,          // 200% traffic increase
      new_competitor: true,        // New competitor detected
      review_posted: true,         // New review posted
    },
  },

  // Predictive analytics models
  ML_MODELS: {
    REVENUE_FORECAST: 'revenue_lstm_v2',
    CHURN_PREDICTION: 'churn_xgboost_v1',
    DEMAND_FORECAST: 'demand_prophet_v1',
    SENTIMENT_ANALYSIS: 'sentiment_bert_v1',
    ANOMALY_DETECTION: 'anomaly_isolation_forest_v1',
  },

  // Competitor tracking
  COMPETITORS: [
    {
      name: 'IICRC Restoration',
      domain: 'iicrc.com.au',
      trackMetrics: ['rankings', 'traffic', 'backlinks'],
    },
    {
      name: 'Steamatic',
      domain: 'steamatic.com.au',
      trackMetrics: ['rankings', 'traffic', 'reviews'],
    },
    {
      name: 'ServiceMaster',
      domain: 'servicemaster.com.au',
      trackMetrics: ['rankings', 'traffic', 'social'],
    },
  ],

  // Data retention policies
  DATA_RETENTION: {
    REAL_TIME: 24,          // 24 hours
    DAILY_AGGREGATES: 90,   // 90 days
    MONTHLY_AGGREGATES: 730, // 2 years
    YEARLY_AGGREGATES: 3650, // 10 years
  },
}