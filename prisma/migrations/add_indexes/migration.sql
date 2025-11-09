-- Add performance indexes for frequently queried fields

-- Lead indexes
CREATE INDEX IF NOT EXISTS "Lead_status_idx" ON "Lead"("status");
CREATE INDEX IF NOT EXISTS "Lead_partnerId_idx" ON "Lead"("partnerId");
CREATE INDEX IF NOT EXISTS "Lead_qualityStatus_idx" ON "Lead"("qualityStatus");
CREATE INDEX IF NOT EXISTS "Lead_suburb_idx" ON "Lead"("suburb");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "Lead_damageType_idx" ON "Lead"("damageType");
CREATE INDEX IF NOT EXISTS "Lead_partnerId_status_idx" ON "Lead"("partnerId", "status");
CREATE INDEX IF NOT EXISTS "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt" DESC);

-- Partner indexes
CREATE INDEX IF NOT EXISTS "Partner_status_idx" ON "Partner"("status");
CREATE INDEX IF NOT EXISTS "Partner_email_idx" ON "Partner"("email");
CREATE INDEX IF NOT EXISTS "Partner_verifiedAt_idx" ON "Partner"("verifiedAt");
CREATE INDEX IF NOT EXISTS "Partner_status_verifiedAt_idx" ON "Partner"("status", "verifiedAt");

-- Contractor indexes
CREATE INDEX IF NOT EXISTS "Contractor_status_idx" ON "Contractor"("status");
CREATE INDEX IF NOT EXISTS "Contractor_email_idx" ON "Contractor"("email");
CREATE INDEX IF NOT EXISTS "Contractor_onboardingCompleted_idx" ON "Contractor"("onboardingCompleted");
CREATE INDEX IF NOT EXISTS "Contractor_approvedAt_idx" ON "Contractor"("approvedAt" DESC);
CREATE INDEX IF NOT EXISTS "Contractor_status_onboardingCompleted_idx" ON "Contractor"("status", "onboardingCompleted");

-- Client indexes
CREATE INDEX IF NOT EXISTS "Client_agencyId_idx" ON "Client"("agencyId");
CREATE INDEX IF NOT EXISTS "Client_email_idx" ON "Client"("email");
CREATE INDEX IF NOT EXISTS "Client_createdAt_idx" ON "Client"("createdAt" DESC);

-- Audit indexes
CREATE INDEX IF NOT EXISTS "Audit_clientId_idx" ON "Audit"("clientId");
CREATE INDEX IF NOT EXISTS "Audit_status_idx" ON "Audit"("status");
CREATE INDEX IF NOT EXISTS "Audit_createdAt_idx" ON "Audit"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "Audit_shareToken_idx" ON "Audit"("shareToken");

-- Proposal indexes
CREATE INDEX IF NOT EXISTS "Proposal_clientId_idx" ON "Proposal"("clientId");
CREATE INDEX IF NOT EXISTS "Proposal_status_idx" ON "Proposal"("status");
CREATE INDEX IF NOT EXISTS "Proposal_auditId_idx" ON "Proposal"("auditId");

-- PartnerBilling indexes
CREATE INDEX IF NOT EXISTS "PartnerBilling_partnerId_status_idx" ON "PartnerBilling"("partnerId", "status");
CREATE INDEX IF NOT EXISTS "PartnerBilling_leadId_idx" ON "PartnerBilling"("leadId");
CREATE INDEX IF NOT EXISTS "PartnerBilling_dueDate_idx" ON "PartnerBilling"("dueDate");

-- LeadTracking indexes
CREATE INDEX IF NOT EXISTS "LeadTracking_leadId_idx" ON "LeadTracking"("leadId");
CREATE INDEX IF NOT EXISTS "LeadTracking_event_idx" ON "LeadTracking"("event");
CREATE INDEX IF NOT EXISTS "LeadTracking_createdAt_idx" ON "LeadTracking"("createdAt" DESC);

-- ContractorCertification indexes
CREATE INDEX IF NOT EXISTS "ContractorCertification_contractorId_status_idx" ON "ContractorCertification"("contractorId", "status");
CREATE INDEX IF NOT EXISTS "ContractorCertification_expiryDate_idx" ON "ContractorCertification"("expiryDate");

-- ContractorInsurance indexes (already has index on expiryDate)
CREATE INDEX IF NOT EXISTS "ContractorInsurance_contractorId_status_idx" ON "ContractorInsurance"("contractorId", "status");

-- ContractorSubscription indexes
CREATE INDEX IF NOT EXISTS "ContractorSubscription_status_idx" ON "ContractorSubscription"("status");
CREATE INDEX IF NOT EXISTS "ContractorSubscription_nextBillingDate_idx" ON "ContractorSubscription"("nextBillingDate");

-- ContractorPayment indexes
CREATE INDEX IF NOT EXISTS "ContractorPayment_subscriptionId_status_idx" ON "ContractorPayment"("subscriptionId", "status");
CREATE INDEX IF NOT EXISTS "ContractorPayment_dueDate_idx" ON "ContractorPayment"("dueDate");

-- ErrorLog indexes (already exists in schema)
-- AuditLog indexes (already exists in schema)

-- Notification indexes
CREATE INDEX IF NOT EXISTS "Notification_userId_read_idx" ON "Notification"("userId", "read");
CREATE INDEX IF NOT EXISTS "Notification_createdAt_idx" ON "Notification"("createdAt" DESC);

-- User indexes
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_agencyId_idx" ON "User"("agencyId");

-- Agency indexes
CREATE INDEX IF NOT EXISTS "Agency_slug_idx" ON "Agency"("slug");
