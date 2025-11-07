# Sentiment Analysis & Review Response System

## Overview

Complete sentiment analysis and review monitoring system for Disaster Recovery Local Service. Monitors reviews across Google Business, Facebook, True Local, and other platforms, categorizes sentiment, and provides professional response templates.

## System Components

### 1. Review Analyzer (`lib/sentiment-analysis/review-analyzer.ts`)
Automatically analyzes reviews and categorizes them by:
- **Sentiment**: Positive, Neutral, Negative
- **Topic**: Emergency response, Insurance claims, Master Restorer mentions
- **Service Type**: Water damage, Fire damage, Mould, Storm, Commercial
- **Location**: High-value suburbs (Hamilton, Ascot, Karalee, etc.)
- **Urgency**: High, Medium, Low

### 2. Response Templates (`lib/sentiment-analysis/response-templates.ts`)
20 pre-written, professional response templates covering:
- ✅ **Positive Reviews (5 star)** - 6 templates
- 📊 **Neutral Reviews (3 star)** - 4 templates
- ⚠️ **Negative Reviews (1-2 star)** - 5 templates
- ⭐ **Specialized Responses** - 5 templates

### 3. Monitoring System (`lib/sentiment-analysis/review-monitoring.ts`)
Automated review monitoring with:
- Platform-specific checking frequencies
- Alert generation for urgent reviews
- Response time tracking
- Escalation rules
- Daily summary reports

## Quick Start Guide

### Step 1: Check for New Reviews Daily

**Morning Routine (8:00 AM):**
```bash
1. Open Google Business Profile
2. Check Facebook page reviews
3. Check True Local profile
4. Review monitoring dashboard
```

### Step 2: Categorize Reviews

**Use the analyzer to determine:**
- Star rating (1-5)
- Primary sentiment category
- Service type mentioned
- Keywords present (emergency, insurance, Master Restorer)
- Location/suburb mentioned

### Step 3: Select Appropriate Template

**Template Selection Matrix:**

| Rating | Keywords | Template ID |
|--------|----------|-------------|
| 5 star | Water damage, emergency | `positive_water_damage` |
| 5 star | Fire damage | `positive_fire_damage` |
| 5 star | Insurance claim | `positive_insurance_claim` |
| 5 star | Master Restorer, Phill | `positive_master_restorer` |
| 5 star | Brisbane, local | `positive_brisbane_local` |
| 5 star | General | `positive_general` |
| 3 star | Expensive, cost | `neutral_expensive` |
| 3 star | Communication | `neutral_communication` |
| 3 star | Stressful, process | `neutral_process_stress` |
| 3 star | Scheduling, delays | `neutral_scheduling` |
| 1-2 star | Too expensive | `negative_pricing` |
| 1-2 star | Took too long | `negative_timeline` |
| 1-2 star | Insurance coverage | `negative_insurance_coverage` |
| 1-2 star | Communication | `negative_communication` |
| 1-2 star | Master Restorer expectations | `negative_expectations` |
| Any | Emergency response praise | `specialized_emergency_response` |
| Any | Insurance success | `specialized_insurance_success` |
| Any | Referred us to others | `specialized_referral` |
| Any | Repeat customer | `specialized_repeat_customer` |
| Any | Hamilton, Ascot, Karalee | `specialized_high_value_property` |

### Step 4: Customize Template

**Replace placeholders:**
- `{NAME}` - Reviewer's first name
- `{LOCATION}` - Brisbane/Ipswich/Logan or specific suburb
- `{PROPERTY_TYPE}` - Home, business, commercial property, etc.
- `{SERVICE_TYPE}` - Water damage, fire damage, mould remediation, etc.
- `{SPECIFIC_PRAISE_ACKNOWLEDGMENT}` - Reference specific positive comments
- `{SPECIFIC_ISSUE_ACKNOWLEDGMENT}` - Address specific concerns raised

**Customization time: 2 minutes per response**

### Step 5: Post Response

**Response posting guidelines:**
1. Read template completely
2. Customize all placeholders
3. Ensure tone matches review sentiment
4. Double-check spelling of reviewer name
5. Copy/paste into review platform
6. Save copy in CRM/documentation system

## Response Time Targets

### Priority Levels

**🚨 CRITICAL (Respond within 2 hours):**
- Any 1-2 star review
- Google Business reviews (highest SEO impact)
- Master Restorer mentions in negative/neutral reviews
- High-value suburb clients (Hamilton, Ascot, Karalee, Brookwater)

**⚠️ HIGH (Respond within 8 hours):**
- 3 star neutral reviews
- Insurance-related concerns
- Emergency service mentions

**📋 MEDIUM (Respond within 24 hours):**
- 4-5 star positive reviews
- Referral mentions
- Repeat customer reviews

## Template Examples

### Example 1: Positive Water Damage Review (5 Star)

**Original Review:**
> "Phill and his team were amazing! We had a burst pipe at 2am and they were at our Hamilton home within an hour. Professional, thorough, and our insurance claim was seamless. Highly recommend!" - Sarah M.

**Response using `positive_water_damage` template:**
```
Thank you so much for taking the time to share your experience, Sarah!

We're absolutely thrilled that we could respond quickly to your water damage emergency in Hamilton. At Disaster Recovery Local Service, we understand how stressful water damage can be, and our priority is always to minimize disruption and restore your property to its pre-loss condition as quickly as possible.

As an IICRC Master Restorer, I take personal pride in ensuring every restoration project meets the highest industry standards. Your Hamilton home received the same meticulous care and attention we bring to every project across Brisbane, Ipswich, and Logan.

I'm especially pleased that our 2am emergency response met your needs and that the insurance claim process was smooth for you. Rapid response and professional documentation are what we do best.

Thank you for trusting us during a difficult time. If you ever need emergency restoration services again (though we hope you won't!), we're available 24/7 on 1300 309 361.

Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361
```

### Example 2: Neutral Review About Price (3 Star)

**Original Review:**
> "The work was good and they were professional, but I thought it was quite expensive compared to other quotes I received." - David T.

**Response using `neutral_expensive` template:**
```
Thank you for your honest feedback, David.

I'm pleased that you're satisfied with the quality of our restoration work. I appreciate you acknowledging our professionalism.

I understand your concerns about pricing. As a Master Restorer with comprehensive IICRC certification, our pricing reflects several factors:

• 24/7 emergency availability with rapid response times
• Master Restorer-level expertise and supervision
• Professional-grade equipment and certified techniques
• Full insurance documentation and compliance
• Ongoing quality control and warranty support

We work directly with insurance companies to ensure fair pricing and comprehensive coverage. Many clients find that proper restoration actually saves money long-term by preventing secondary damage, mould growth, and structural deterioration.

I'd be happy to discuss your specific project and explain our pricing structure in detail. Please call me directly on 1300 309 361 – I'd value the opportunity to address your concerns personally.

Regards,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361
```

### Example 3: Negative Review About Timeline (2 Star)

**Original Review:**
> "The final result was acceptable but it took way longer than I expected. Three weeks for water damage restoration seems excessive." - Michelle R.

**Response using `negative_timeline` template:**
```
Michelle, I'm truly sorry the restoration timeline for your property didn't meet your expectations. I understand how frustrating delays can be when you want to get back to normal.

I'd like to explain what's involved in proper water damage restoration:

**Why Restoration Takes Time:**
• Scientific drying: Water-damaged materials require proper drying time to prevent mould (typically 3-7 days)
• Insurance processes: Documentation and approval can add time
• Material availability: Quality restoration materials must meet specific standards
• Quality control: Master Restorer protocols require systematic verification at each stage

In your case, we identified moisture in structural elements that required extended drying to prevent mould growth. While this extended your timeline, it protected your property from serious long-term damage.

However, I acknowledge that we may not have communicated these timelines clearly enough at the outset. If there were avoidable delays on our part, that's on me, and I take full responsibility.

I'd like to review your specific project timeline with you to understand what happened and whether we could have done better. Please call me directly on 1300 309 361.

As a Master Restorer, I'm committed to both quality results AND reasonable timelines. Let me make this right.

Regards,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361
```

## Daily Monitoring Workflow

### Morning (8:00 AM - 10:00 AM)
- ✅ Check overnight reviews across all platforms
- ✅ Identify urgent responses needed (1-2 star, Google reviews)
- ✅ Draft responses for negative reviews using templates
- ✅ Post urgent responses within 2-hour target

### Midday (10:00 AM - 2:00 PM)
- ✅ Process neutral 3-star reviews
- ✅ Customize appropriate templates
- ✅ Post responses to neutral reviews

### Afternoon (2:00 PM - 5:00 PM)
- ✅ Thank positive reviewers (4-5 star)
- ✅ Personalize positive templates
- ✅ Post responses to positive reviews
- ✅ Verify all day's reviews have responses
- ✅ Generate daily summary report

### Weekly (Monday Morning)
- ✅ Review weekend reviews
- ✅ Respond to any urgent reviews first
- ✅ Generate weekly summary report
- ✅ Identify patterns or recurring themes
- ✅ Update templates if needed

## Platform-Specific Guidelines

### Google Business Profile
**Importance:** 🔴 CRITICAL (Highest local SEO impact)

**Response Strategy:**
- Respond to ALL reviews (positive and negative)
- Negative reviews get priority (within 2 hours)
- Professional tone - future clients read these
- Include phone number (1300 309 361) in every response
- Mention Master Restorer credentials
- Acknowledge specific praise or concerns
- Keep responses concise but complete

**SEO Benefits:**
- Review responses show up in Google Search
- Regular responses signal active business
- Keywords in responses boost local rankings
- Response rate impacts Google My Business ranking

### Facebook Reviews
**Importance:** 🟡 HIGH (Social proof and community engagement)

**Response Strategy:**
- Slightly warmer, more personable tone acceptable
- Can be longer and more conversational
- Consider private message for sensitive issues
- Encourage before/after photos if client willing
- Social shares extend visibility

**Community Benefits:**
- Friends/family of reviewer see responses
- Can lead to additional discussion/questions
- Shows personality of business owner (Phill)
- Builds local community trust

### True Local
**Importance:** 🟢 MEDIUM (Local directory, insurance company research)

**Response Strategy:**
- Professional, formal tone
- Emphasize Master Restorer credentials
- Highlight insurance work experience
- Include IICRC certifications
- Target commercial property managers

**Audience:**
- Insurance companies researching contractors
- Property managers seeking qualified restorers
- Body corporate committees
- Commercial facility managers

### ProductReview.com.au
**Importance:** 🟢 MEDIUM (Consumer comparison platform)

**Response Strategy:**
- Detailed responses explaining process
- Address pricing concerns transparently
- Highlight value and quality differences
- Can be educational in tone
- Link to website for more information

**Audience:**
- Consumers actively comparing services
- Price-conscious homeowners
- People researching before emergency occurs

## Escalation Rules

### When to Escalate to Director (Phill McGurk)

**IMMEDIATE ESCALATION:**
1. Any review mentioning "Master Restorer" negatively
2. Any 1-star Google review
3. Reviews from high-value suburbs (Hamilton, Ascot, Karalee, Brookwater)
4. Legal threats or serious allegations
5. Reviews mentioning insurance disputes
6. Media or public figure reviews

**STANDARD ESCALATION:**
1. All 1-2 star reviews (for review before posting)
2. Complex insurance-related reviews
3. Reviews requiring service credits/refunds
4. Reviews from repeat customers with complaints

## Metrics to Track

### Weekly Review Metrics
- Total reviews received
- Average star rating
- Platform breakdown (Google, Facebook, etc.)
- Sentiment distribution (positive, neutral, negative)
- Response rate (% of reviews responded to)
- Average response time
- Keywords appearing frequently

### Monthly Review Metrics
- Overall rating trend (improving/declining)
- Top positive themes (what clients love)
- Top negative themes (what needs improvement)
- Service-specific feedback (water vs fire vs mould)
- Location-specific patterns
- Insurance claim satisfaction trends

### Quarterly Strategic Review
- Template effectiveness (which work best)
- Response tone adjustments needed
- New templates needed for recurring themes
- Training needs for team based on feedback
- Process improvements identified
- Competitive positioning insights

## Best Practices

### DO:
✅ Respond to every single review (positive and negative)
✅ Use reviewer's first name
✅ Acknowledge specific points they raised
✅ Sign every response "Phill McGurk, Master Restorer & Director"
✅ Include phone number 1300 309 361
✅ Mention IICRC certification
✅ Emphasize local Brisbane/Ipswich/Logan service
✅ Be genuine and empathetic
✅ Take responsibility for failures
✅ Offer direct contact for issues
✅ Respond within target timeframes
✅ Keep professional tone throughout

### DON'T:
❌ Ignore any reviews (especially negative)
❌ Get defensive or argumentative
❌ Make excuses without taking responsibility
❌ Copy/paste templates without customization
❌ Delay responses to negative reviews
❌ Share client confidential information
❌ Make promises you can't keep
❌ Use informal language on professional platforms
❌ Respond emotionally to criticism
❌ Dispute facts publicly (handle privately)

## Crisis Management

### Handling Review Crisis Situations

**Scenario 1: Multiple Negative Reviews in Short Period**

**Actions:**
1. Respond to each individually with customized templates
2. Identify common theme causing issues
3. Alert team to systemic problem
4. Implement immediate corrective action
5. Follow up with affected clients personally
6. Document root cause and prevention plan

**Scenario 2: Viral Negative Review**

**Actions:**
1. Respond within 1 hour with professional template
2. Acknowledge issue sincerely
3. Offer direct resolution offline (phone call)
4. Do NOT argue or defend publicly
5. Take conversation private ASAP
6. Document everything
7. Seek legal advice if defamatory

**Scenario 3: Review Containing False Information**

**Actions:**
1. Respond professionally, correcting misinformation factually
2. Avoid accusatory language
3. Provide verifiable facts (dates, documents)
4. Offer to discuss privately
5. If seriously defamatory, consult lawyer
6. Flag review with platform if violates terms

**Scenario 4: Competitor Fake Review**

**Actions:**
1. Do NOT respond publicly
2. Report to platform as fraudulent
3. Document evidence of fake review
4. Continue monitoring for additional fake reviews
5. Focus on generating authentic positive reviews
6. Consult legal if pattern emerges

## Advanced Tips

### Generating Positive Reviews

**Best Times to Request:**
1. Immediately after emergency response success
2. Upon successful insurance claim completion
3. After final inspection and client satisfaction
4. When client provides verbal praise
5. After referral to friends/family

**How to Ask:**
1. Send follow-up email with direct links
2. Include links to Google, Facebook, True Local
3. Make it easy (one-click to review page)
4. Don't incentivize (against platform policies)
5. Thank them in advance

### Improving Response Quality

**Continuous Improvement:**
1. Read competitor responses for ideas
2. Note which templates get best reactions
3. Update templates quarterly
4. Add new templates for emerging themes
5. Get team feedback on effectiveness
6. A/B test different response approaches
7. Track follow-up satisfaction after responses

### Training Team Members

**Response Training Checklist:**
- [ ] Understand all 20 templates
- [ ] Practice customizing each template
- [ ] Know when to escalate to director
- [ ] Understand response time targets
- [ ] Can identify urgency levels
- [ ] Know platform-specific guidelines
- [ ] Familiar with crisis protocols
- [ ] Can use monitoring system

## Technical Implementation

### Review Monitoring Automation

**System Components:**
```typescript
// Initialize analyzer
const analyzer = new ReviewSentimentAnalyzer();

// Analyze review
const analysis = analyzer.analyzeReview(review);

// Generate alert if needed
const alert = monitoringSystem.generateAlert(review, analysis);

// Select appropriate template
const template = getTemplate(analysis.recommendedTemplate);

// Customize and post
```

**Integration Points:**
- Google My Business API for automated review fetching
- Facebook Graph API for Facebook reviews
- True Local API (if available) or manual check
- Email notifications for urgent reviews
- SMS alerts for critical reviews
- Dashboard for review monitoring

## Support & Resources

### Templates Location
- Full templates: `lib/sentiment-analysis/response-templates.ts`
- 20 ready-to-use responses
- Customization notes included
- Example responses provided

### Analyzer Location
- Sentiment analyzer: `lib/sentiment-analysis/review-analyzer.ts`
- Automatic categorization
- Keyword detection
- Urgency assessment

### Monitoring System
- Monitoring tools: `lib/sentiment-analysis/review-monitoring.ts`
- Alert generation
- Response time tracking
- Daily summaries

### Contact for Review Issues
- **Director:** Phill McGurk
- **Phone:** 1300 309 361
- **Email:** [Insert email]
- **Emergency:** Use phone for urgent review alerts

---

## Summary Checklist

**Daily Tasks:**
- [ ] Check all review platforms
- [ ] Respond to urgent reviews within 2 hours
- [ ] Respond to neutral reviews within 8 hours
- [ ] Respond to positive reviews within 24 hours
- [ ] Generate daily summary
- [ ] Document any patterns

**Weekly Tasks:**
- [ ] Review weekend reviews Monday morning
- [ ] Generate weekly metrics report
- [ ] Update templates if needed
- [ ] Check response time compliance
- [ ] Review escalation items

**Monthly Tasks:**
- [ ] Generate monthly analytics
- [ ] Identify improvement themes
- [ ] Update training materials
- [ ] Review template effectiveness
- [ ] Competitor review analysis

---

*Disaster Recovery Local Service - Review Response System*
*Master Restorer Excellence in Every Interaction*
*1300 309 361*
