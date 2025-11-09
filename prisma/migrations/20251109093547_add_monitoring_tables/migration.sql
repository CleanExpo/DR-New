-- DropIndex
DROP INDEX "Agency_slug_idx";

-- DropIndex
DROP INDEX "Audit_shareToken_idx";

-- DropIndex
DROP INDEX "Audit_createdAt_idx";

-- DropIndex
DROP INDEX "Audit_status_idx";

-- DropIndex
DROP INDEX "Audit_clientId_idx";

-- DropIndex
DROP INDEX "Client_createdAt_idx";

-- DropIndex
DROP INDEX "Client_email_idx";

-- DropIndex
DROP INDEX "Client_agencyId_idx";

-- DropIndex
DROP INDEX "Contractor_status_onboardingCompleted_idx";

-- DropIndex
DROP INDEX "Contractor_approvedAt_idx";

-- DropIndex
DROP INDEX "Contractor_onboardingCompleted_idx";

-- DropIndex
DROP INDEX "Contractor_email_idx";

-- DropIndex
DROP INDEX "Contractor_status_idx";

-- DropIndex
DROP INDEX "ContractorCertification_expiryDate_idx";

-- DropIndex
DROP INDEX "ContractorCertification_contractorId_status_idx";

-- DropIndex
DROP INDEX "ContractorInsurance_contractorId_status_idx";

-- DropIndex
DROP INDEX "ContractorPayment_dueDate_idx";

-- DropIndex
DROP INDEX "ContractorPayment_subscriptionId_status_idx";

-- DropIndex
DROP INDEX "ContractorSubscription_nextBillingDate_idx";

-- DropIndex
DROP INDEX "ContractorSubscription_status_idx";

-- DropIndex
DROP INDEX "Lead_status_createdAt_idx";

-- DropIndex
DROP INDEX "Lead_partnerId_status_idx";

-- DropIndex
DROP INDEX "Lead_damageType_idx";

-- DropIndex
DROP INDEX "Lead_createdAt_idx";

-- DropIndex
DROP INDEX "Lead_suburb_idx";

-- DropIndex
DROP INDEX "Lead_qualityStatus_idx";

-- DropIndex
DROP INDEX "Lead_partnerId_idx";

-- DropIndex
DROP INDEX "Lead_status_idx";

-- DropIndex
DROP INDEX "LeadTracking_createdAt_idx";

-- DropIndex
DROP INDEX "LeadTracking_event_idx";

-- DropIndex
DROP INDEX "LeadTracking_leadId_idx";

-- DropIndex
DROP INDEX "Notification_createdAt_idx";

-- DropIndex
DROP INDEX "Notification_userId_read_idx";

-- DropIndex
DROP INDEX "Partner_status_verifiedAt_idx";

-- DropIndex
DROP INDEX "Partner_verifiedAt_idx";

-- DropIndex
DROP INDEX "Partner_email_idx";

-- DropIndex
DROP INDEX "Partner_status_idx";

-- DropIndex
DROP INDEX "PartnerBilling_dueDate_idx";

-- DropIndex
DROP INDEX "PartnerBilling_leadId_idx";

-- DropIndex
DROP INDEX "PartnerBilling_partnerId_status_idx";

-- DropIndex
DROP INDEX "Proposal_auditId_idx";

-- DropIndex
DROP INDEX "Proposal_status_idx";

-- DropIndex
DROP INDEX "Proposal_clientId_idx";

-- DropIndex
DROP INDEX "User_agencyId_idx";

-- DropIndex
DROP INDEX "User_email_idx";

-- CreateTable
CREATE TABLE "WebVitalMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "metricName" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "rating" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "userAgent" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SEOMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organicClicks" INTEGER NOT NULL DEFAULT 0,
    "organicImpressions" INTEGER NOT NULL DEFAULT 0,
    "organicCTR" REAL NOT NULL DEFAULT 0,
    "averagePosition" REAL NOT NULL DEFAULT 0,
    "page" TEXT,
    "keyword" TEXT,
    "serviceArea" TEXT,
    "suburb" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ConversionMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversionType" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "source" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "campaign" TEXT,
    "keyword" TEXT,
    "page" TEXT NOT NULL,
    "referrer" TEXT,
    "serviceArea" TEXT,
    "suburb" TEXT,
    "serviceType" TEXT,
    "leadScore" INTEGER,
    "leadQuality" TEXT,
    "urgencyLevel" TEXT,
    "deviceType" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PagePerformance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avgLCP" REAL,
    "p95LCP" REAL,
    "avgFID" REAL,
    "avgINP" REAL,
    "avgCLS" REAL,
    "avgTTFB" REAL,
    "pageviews" INTEGER NOT NULL DEFAULT 0,
    "uniqueViews" INTEGER NOT NULL DEFAULT 0,
    "bounceRate" REAL,
    "avgTimeOnPage" REAL,
    "scrollDepth75" INTEGER NOT NULL DEFAULT 0,
    "scrollDepth100" INTEGER NOT NULL DEFAULT 0,
    "mobileViews" INTEGER NOT NULL DEFAULT 0,
    "desktopViews" INTEGER NOT NULL DEFAULT 0,
    "tabletViews" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "KeywordRanking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "keyword" TEXT NOT NULL,
    "position" REAL NOT NULL,
    "previousPosition" REAL,
    "page" TEXT,
    "searchVolume" INTEGER,
    "difficulty" INTEGER,
    "location" TEXT NOT NULL DEFAULT 'Brisbane, QLD, Australia',
    "deviceType" TEXT NOT NULL DEFAULT 'mobile',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL DEFAULT 'manual'
);

-- CreateTable
CREATE TABLE "CrawlError" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "errorType" TEXT NOT NULL,
    "statusCode" INTEGER,
    "severity" TEXT NOT NULL,
    "referrer" TEXT,
    "errorMessage" TEXT,
    "firstDetected" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" DATETIME,
    "resolvedBy" TEXT
);

-- CreateTable
CREATE TABLE "PerformanceAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alertType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "threshold" REAL NOT NULL,
    "page" TEXT,
    "deviceType" TEXT,
    "timeWindow" TEXT,
    "triggered" BOOLEAN NOT NULL DEFAULT true,
    "acknowledged" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgedBy" TEXT,
    "acknowledgedAt" DATETIME,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" DATETIME,
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "notificationMethod" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "keyword" TEXT,
    "referrer" TEXT,
    "deviceType" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "ipAddress" TEXT,
    "city" TEXT,
    "region" TEXT,
    "landingPage" TEXT NOT NULL,
    "exitPage" TEXT,
    "pagesViewed" INTEGER NOT NULL DEFAULT 1,
    "duration" INTEGER,
    "bounced" BOOLEAN NOT NULL DEFAULT false,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "conversionType" TEXT,
    "conversionValue" REAL,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME
);

-- CreateIndex
CREATE INDEX "WebVitalMetric_metricName_timestamp_idx" ON "WebVitalMetric"("metricName", "timestamp");

-- CreateIndex
CREATE INDEX "WebVitalMetric_page_metricName_idx" ON "WebVitalMetric"("page", "metricName");

-- CreateIndex
CREATE INDEX "WebVitalMetric_rating_timestamp_idx" ON "WebVitalMetric"("rating", "timestamp");

-- CreateIndex
CREATE INDEX "SEOMetric_date_idx" ON "SEOMetric"("date");

-- CreateIndex
CREATE INDEX "SEOMetric_page_date_idx" ON "SEOMetric"("page", "date");

-- CreateIndex
CREATE INDEX "SEOMetric_keyword_date_idx" ON "SEOMetric"("keyword", "date");

-- CreateIndex
CREATE INDEX "SEOMetric_serviceArea_date_idx" ON "SEOMetric"("serviceArea", "date");

-- CreateIndex
CREATE INDEX "ConversionMetric_conversionType_timestamp_idx" ON "ConversionMetric"("conversionType", "timestamp");

-- CreateIndex
CREATE INDEX "ConversionMetric_source_timestamp_idx" ON "ConversionMetric"("source", "timestamp");

-- CreateIndex
CREATE INDEX "ConversionMetric_serviceArea_timestamp_idx" ON "ConversionMetric"("serviceArea", "timestamp");

-- CreateIndex
CREATE INDEX "ConversionMetric_serviceType_timestamp_idx" ON "ConversionMetric"("serviceType", "timestamp");

-- CreateIndex
CREATE INDEX "ConversionMetric_leadQuality_timestamp_idx" ON "ConversionMetric"("leadQuality", "timestamp");

-- CreateIndex
CREATE INDEX "PagePerformance_date_idx" ON "PagePerformance"("date");

-- CreateIndex
CREATE INDEX "PagePerformance_page_idx" ON "PagePerformance"("page");

-- CreateIndex
CREATE UNIQUE INDEX "PagePerformance_page_date_key" ON "PagePerformance"("page", "date");

-- CreateIndex
CREATE INDEX "KeywordRanking_keyword_date_idx" ON "KeywordRanking"("keyword", "date");

-- CreateIndex
CREATE INDEX "KeywordRanking_date_idx" ON "KeywordRanking"("date");

-- CreateIndex
CREATE INDEX "KeywordRanking_position_idx" ON "KeywordRanking"("position");

-- CreateIndex
CREATE INDEX "CrawlError_url_idx" ON "CrawlError"("url");

-- CreateIndex
CREATE INDEX "CrawlError_errorType_resolved_idx" ON "CrawlError"("errorType", "resolved");

-- CreateIndex
CREATE INDEX "CrawlError_severity_resolved_idx" ON "CrawlError"("severity", "resolved");

-- CreateIndex
CREATE INDEX "PerformanceAlert_severity_resolved_idx" ON "PerformanceAlert"("severity", "resolved");

-- CreateIndex
CREATE INDEX "PerformanceAlert_alertType_timestamp_idx" ON "PerformanceAlert"("alertType", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_sessionId_key" ON "UserSession"("sessionId");

-- CreateIndex
CREATE INDEX "UserSession_sessionId_idx" ON "UserSession"("sessionId");

-- CreateIndex
CREATE INDEX "UserSession_source_startTime_idx" ON "UserSession"("source", "startTime");

-- CreateIndex
CREATE INDEX "UserSession_converted_startTime_idx" ON "UserSession"("converted", "startTime");
