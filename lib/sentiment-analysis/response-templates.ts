/**
 * Professional Response Templates for Disaster Recovery Reviews
 * All templates signed by Phill McGurk, Master Restorer & Director
 */

export interface ResponseTemplate {
  id: string;
  name: string;
  category: 'positive' | 'neutral' | 'negative' | 'specialized';
  rating: number | 'any';
  template: string;
  customizationNotes: string;
  estimatedReadTime: string;
}

export const RESPONSE_TEMPLATES: ResponseTemplate[] = [
  // POSITIVE REVIEWS (5 STAR)
  {
    id: 'positive_water_damage',
    name: 'Water Damage Emergency Response Praise',
    category: 'positive',
    rating: 5,
    template: `Thank you so much for taking the time to share your experience, {NAME}!

We're absolutely thrilled that we could respond quickly to your water damage emergency in {LOCATION}. At Disaster Recovery Local Service, we understand how stressful water damage can be, and our priority is always to minimize disruption and restore your property to its pre-loss condition as quickly as possible.

As an IICRC Master Restorer, I take personal pride in ensuring every restoration project meets the highest industry standards. Your {PROPERTY_TYPE} received the same meticulous care and attention we bring to every project across Brisbane, Ipswich, and Logan.

{SPECIFIC_PRAISE_ACKNOWLEDGMENT}

Thank you for trusting us during a difficult time. If you ever need emergency restoration services again (though we hope you won't!), we're available 24/7 on 1300 309 361.

Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Replace {NAME}, {LOCATION}, {PROPERTY_TYPE}, and {SPECIFIC_PRAISE_ACKNOWLEDGMENT} with details from the review.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'positive_fire_damage',
    name: 'Fire Damage Restoration Quality Praise',
    category: 'positive',
    rating: 5,
    template: `{NAME}, thank you for this wonderful review!

Fire damage restoration is one of the most complex services we provide, requiring specialized knowledge in smoke remediation, structural assessment, and content restoration. I'm so pleased that you're happy with the results and that we could help you through such a challenging time.

As a Master Restorer with extensive IICRC certification in fire and smoke restoration, I personally oversee every project to ensure comprehensive recovery. Your property in {LOCATION} received the thorough, systematic approach that fire damage demands.

{SPECIFIC_PRAISE_ACKNOWLEDGMENT}

We know how devastating fire damage can be, both emotionally and practically. Thank you for trusting our Brisbane-based team with your restoration. We're here 24/7 if you ever need us again – 1300 309 361.

Warmest regards,
Phill McGurk
Master Restorer & Director
IICRC Fire & Smoke Restoration Certified
1300 309 361`,
    customizationNotes: 'Personalize with reviewer name, location, and specific aspects they praised.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'positive_insurance_claim',
    name: 'Insurance Claim Assistance Praise',
    category: 'positive',
    rating: 5,
    template: `Thank you, {NAME}! We really appreciate your kind words about our insurance claim support.

Navigating insurance claims can be incredibly stressful, especially when you're dealing with property damage. As a Master Restorer, I work directly with insurance companies and loss adjusters daily, which allows us to provide comprehensive documentation, accurate scoping, and professional advocacy for our clients throughout Brisbane, Ipswich, and Logan.

{SPECIFIC_PRAISE_ACKNOWLEDGMENT}

We're committed to making the entire restoration process – from emergency response through to final sign-off – as smooth as possible. Your successful claim outcome is exactly what we aim for with every project.

If you know anyone who needs emergency restoration services or insurance claim assistance, we're always here to help. Call us anytime on 1300 309 361.

Best wishes,
Phill McGurk
Master Restorer & Director
IICRC Certified | Insurance Restoration Specialist
1300 309 361`,
    customizationNotes: 'Acknowledge specific insurance challenges mentioned in the review.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'positive_master_restorer',
    name: 'Phill McGurk/Master Restorer Praise',
    category: 'positive',
    rating: 5,
    template: `{NAME}, I'm truly humbled by your recognition of our Master Restorer standards. Thank you!

Being one of the limited number of Master Restorers in Queensland is both a privilege and a responsibility. It represents decades of experience, ongoing professional development, and commitment to the highest standards in disaster recovery and restoration. Every project we undertake in {LOCATION} reflects this dedication to excellence.

{SPECIFIC_PRAISE_ACKNOWLEDGMENT}

Your {PROPERTY_TYPE} received the comprehensive, methodical approach that Master Restorer certification demands. I personally oversee quality control on all our projects to ensure this standard is maintained across every restoration job in Brisbane, Ipswich, and Logan.

Thank you for recognizing the difference that professional certification makes. We're here 24/7 for any emergency restoration needs – 1300 309 361.

With appreciation,
Phill McGurk
Master Restorer & Director
One of Limited Master Restorers in QLD | IICRC Certified
1300 309 361`,
    customizationNotes: 'This template is for reviews specifically mentioning Master Restorer credentials or Phill McGurk personally.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'positive_brisbane_local',
    name: 'Brisbane Local Service Praise',
    category: 'positive',
    rating: 5,
    template: `Thank you so much, {NAME}!

As a locally-owned Brisbane business, reviews like yours mean the world to us. We've built our reputation across Brisbane, Ipswich, and Logan by providing rapid emergency response and exceptional restoration services to our community.

{SPECIFIC_PRAISE_ACKNOWLEDGMENT}

Being local means we can respond quickly – often within hours – to emergencies in {LOCATION} and surrounding areas. As a Master Restorer, I take personal pride in serving our local community with the highest standards of care and professionalism.

Thank you for supporting local business and for trusting us with your {SERVICE_TYPE} restoration. We're available 24/7 for any future emergency needs – 1300 309 361.

Kind regards,
Phill McGurk
Master Restorer & Director
Proudly Serving Brisbane, Ipswich & Logan | IICRC Certified
1300 309 361`,
    customizationNotes: 'Use when review emphasizes local service, community connection, or rapid response.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'positive_general',
    name: 'General Excellent Service Praise',
    category: 'positive',
    rating: 5,
    template: `Thank you for this wonderful review, {NAME}!

We're absolutely delighted that you're happy with our service. At Disaster Recovery Local Service, every project receives the same high standard of care – whether it's an emergency water damage call-out or a planned restoration project in {LOCATION}.

{SPECIFIC_PRAISE_ACKNOWLEDGMENT}

As a Master Restorer and IICRC certified professional, I'm committed to delivering excellence in every aspect of disaster recovery and restoration across Brisbane, Ipswich, and Logan. Your satisfaction is exactly what we work hard to achieve with every client.

Thank you for choosing us and for taking the time to share your experience. We're here 24/7 if you ever need us – 1300 309 361.

Best regards,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'General positive template for 4-5 star reviews without specific service mentions.',
    estimatedReadTime: '2 minutes'
  },

  // NEUTRAL REVIEWS (3 STAR)
  {
    id: 'neutral_expensive',
    name: 'Good Service But Expensive',
    category: 'neutral',
    rating: 3,
    template: `Thank you for your honest feedback, {NAME}.

I'm pleased that you're satisfied with the quality of our {SERVICE_TYPE} restoration work in {LOCATION}. I appreciate you acknowledging {SPECIFIC_POSITIVE}.

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
1300 309 361`,
    customizationNotes: 'Use when review praises quality but mentions high cost. Be prepared to justify pricing with value explanation.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'neutral_communication',
    name: 'Good Service But Slow Communication',
    category: 'neutral',
    rating: 3,
    template: `Thank you for your feedback, {NAME}. I appreciate your honesty.

I'm glad that you're happy with the final restoration results for your {PROPERTY_TYPE} in {LOCATION}, and I genuinely appreciate you acknowledging {SPECIFIC_POSITIVE}.

However, I'm disappointed to hear that our communication didn't meet your expectations. Clear, timely communication is essential during restoration projects, and we clearly fell short in this area for you.

{SPECIFIC_COMMUNICATION_ISSUE_ACKNOWLEDGMENT}

I take full responsibility for this, and I'd like to understand what happened so we can improve. We've recently implemented new client communication protocols to ensure regular updates throughout every project.

Would you be willing to speak with me directly about your experience? I'd value the opportunity to learn from your feedback and make things right. Please call me on 1300 309 361 at your convenience.

Thank you for choosing Disaster Recovery Local Service. Your feedback helps us maintain Master Restorer standards across all aspects of our service.

Sincerely,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Acknowledge specific communication gaps. Be genuine in taking responsibility.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'neutral_process_stress',
    name: 'Good Outcome But Stressful Process',
    category: 'neutral',
    rating: 3,
    template: `{NAME}, thank you for sharing your experience. I'm genuinely sorry the process was stressful for you.

I'm relieved that you're pleased with the final outcome of your {SERVICE_TYPE} restoration in {LOCATION}, and I appreciate you recognizing {SPECIFIC_POSITIVE}. However, I understand that the journey to get there was more stressful than it should have been.

{SPECIFIC_STRESS_POINT_ACKNOWLEDGMENT}

Property damage and restoration is inherently stressful, but our role should be to reduce that stress, not add to it. As a Master Restorer, I hold myself and our team to the highest standards – not just in technical restoration work, but in client care throughout the entire process.

I'd very much like to understand what specific aspects caused stress so we can improve for future clients. Would you be willing to have a brief conversation with me? Please call 1300 309 361, or I'm happy to call you at a convenient time.

Thank you for giving us the opportunity to serve you, and for the constructive feedback that helps us improve.

Warmest regards,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Show genuine empathy for their stress while acknowledging the positive outcome.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'neutral_scheduling',
    name: 'Good Work But Scheduling Issues',
    category: 'neutral',
    rating: 3,
    template: `Thank you for your feedback, {NAME}.

I'm pleased that you're satisfied with the quality of our restoration work on your {PROPERTY_TYPE} in {LOCATION}. As a Master Restorer, delivering high-quality results is my priority, and I appreciate you acknowledging {SPECIFIC_POSITIVE}.

I'm disappointed that our scheduling didn't meet your expectations. {SPECIFIC_SCHEDULING_ISSUE_ACKNOWLEDGMENT}

Restoration timelines can be affected by factors like equipment drying times, insurance approval processes, and material availability. However, we should have communicated these factors more clearly and managed expectations better from the outset.

Emergency response is unpredictable in our industry, but that's not an excuse for poor scheduling communication. I'd like to discuss your specific experience to understand what went wrong and ensure we improve.

Please call me directly on 1300 309 361. I'd value the chance to explain what happened and ensure you're completely satisfied.

Thank you for choosing Disaster Recovery Local Service and for helping us improve our processes.

Regards,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Balance explanation of restoration realities with genuine acknowledgment of scheduling failures.',
    estimatedReadTime: '2 minutes'
  },

  // NEGATIVE REVIEWS (1-2 STAR)
  {
    id: 'negative_pricing',
    name: 'Too Expensive - Value Justification',
    category: 'negative',
    rating: 2,
    template: `{NAME}, I'm genuinely sorry you feel our pricing didn't represent good value. I take this feedback seriously.

I'd like to address your concerns directly and explain what's included in our Master Restorer-level service:

**What You're Paying For:**
• One of limited Master Restorers in Queensland personally overseeing your project
• 24/7 emergency availability with rapid response across Brisbane, Ipswich & Logan
• IICRC certified techniques ensuring comprehensive restoration
• Professional equipment and proven methodologies
• Full insurance documentation and compliance
• Ongoing warranty and quality guarantees

**Why Proper Restoration Matters:**
Cutting corners on {SERVICE_TYPE} restoration can lead to hidden moisture, mould growth, structural damage, and insurance complications that cost far more long-term.

{SPECIFIC_PRICING_CONCERN_ACKNOWLEDGMENT}

I'd like to review your specific project and invoice with you personally. If there's been any miscommunication or error, I'll make it right. Please call me directly on 1300 309 361.

Your satisfaction matters to me, not just as a business owner but as a Master Restorer committed to client care.

Sincerely,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Be prepared to review invoice and potentially offer resolution. Focus on value, not defending price.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'negative_timeline',
    name: 'Took Too Long - Process Explanation',
    category: 'negative',
    rating: 2,
    template: `{NAME}, I'm truly sorry the restoration timeline for your {PROPERTY_TYPE} in {LOCATION} didn't meet your expectations. I understand how frustrating delays can be when you want to get back to normal.

I'd like to explain what's involved in proper {SERVICE_TYPE} restoration:

**Why Restoration Takes Time:**
• Scientific drying: Water-damaged materials require proper drying time to prevent mould (typically 3-7 days)
• Insurance processes: Documentation and approval can add time
• Material availability: Quality restoration materials must meet specific standards
• Quality control: Master Restorer protocols require systematic verification at each stage

{SPECIFIC_TIMELINE_ISSUE_ACKNOWLEDGMENT}

However, I acknowledge that we may not have communicated these timelines clearly enough at the outset. If there were avoidable delays on our part, that's on me, and I take full responsibility.

I'd like to review your specific project timeline with you to understand what happened and whether we could have done better. Please call me directly on 1300 309 361.

As a Master Restorer, I'm committed to both quality results AND reasonable timelines. Let me make this right.

Regards,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Balance education about proper processes with genuine acknowledgment if delays were avoidable.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'negative_insurance_coverage',
    name: 'Insurance Didn\'t Cover Everything - Process Explanation',
    category: 'negative',
    rating: 2,
    template: `{NAME}, I'm genuinely sorry you're frustrated with your insurance coverage outcome. Insurance claim disputes are one of the most stressful aspects of property damage, and I understand your disappointment.

**Important Clarification:**
While we provide comprehensive documentation and work directly with insurance companies, we cannot control what your insurer chooses to cover. Coverage decisions are made by your insurance company based on your specific policy terms, excess, and assessment of the damage.

**What We Do:**
• Provide detailed, accurate damage documentation
• Submit professional scope-of-works to loss adjusters
• Advocate for comprehensive coverage based on industry standards
• Explain policy limitations and exclusions

{SPECIFIC_COVERAGE_ISSUE_ACKNOWLEDGMENT}

If you feel your claim was unfairly assessed, you have options:
• Request internal insurance review
• Engage a public loss adjuster
• Seek independent building assessment

I'd like to review your specific situation to ensure we provided the most comprehensive documentation possible. If there's anything we could have done better in supporting your claim, I'll make it right.

Please call me on 1300 309 361. As a Master Restorer who works with insurers daily, I may be able to provide additional perspective.

Sincerely,
Phill McGurk
Master Restorer & Director
IICRC Certified | Insurance Restoration Specialist
1300 309 361`,
    customizationNotes: 'Be empathetic but clear about the distinction between your service and insurance decisions.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'negative_communication',
    name: 'Communication Issues - Apology and Improvement',
    category: 'negative',
    rating: 2,
    template: `{NAME}, I owe you a sincere apology. The communication issues you experienced are completely unacceptable, and I take full responsibility.

{SPECIFIC_COMMUNICATION_FAILURE_ACKNOWLEDGMENT}

**What Went Wrong:**
{BRIEF_EXPLANATION_IF_APPROPRIATE}

**What We're Doing:**
I've personally reviewed your project file and identified where our communication broke down. We've since implemented:
• Mandatory daily client update protocols
• Direct mobile contact for all active projects
• Project milestone notifications
• 24/7 accessible project managers

**What I'd Like To Do:**
I'd appreciate the opportunity to speak with you directly about your experience. Not to make excuses, but to understand the full impact and ensure we learn from this.

As a Master Restorer serving Brisbane, Ipswich, and Logan, I hold myself to the highest standards. We failed to meet those standards for you, and I'm committed to making it right.

Please call me directly on 1300 309 361. I'd value the chance to discuss this personally and address any ongoing concerns.

Again, I'm truly sorry.

Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Be genuinely apologetic. Take full ownership. Offer specific resolution.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'negative_expectations',
    name: 'Expected More from Master Restorer - Address Expectations',
    category: 'negative',
    rating: 2,
    template: `{NAME}, I'm genuinely sorry we didn't meet your expectations. As one of the limited Master Restorers in Queensland, I take this feedback very seriously.

You hired a Master Restorer specifically because you expected the highest level of service, and we clearly fell short. That's on me, and I take full responsibility.

{SPECIFIC_EXPECTATION_GAP_ACKNOWLEDGMENT}

**What Master Restorer Means:**
Master Restorer certification represents the highest level of IICRC qualification in disaster recovery, requiring extensive experience, ongoing professional development, and demonstrated expertise across multiple restoration disciplines. It's a standard I'm deeply proud of and committed to upholding.

**Where We Failed:**
{SPECIFIC_FAILURE_ACKNOWLEDGMENT}

I'd like to understand exactly what aspects of our service didn't meet Master Restorer standards in your experience. This feedback is invaluable because it helps me ensure every client receives the level of service that this certification demands.

Please call me directly on 1300 309 361. I'd like to discuss your experience in detail and explore how I can make this right. Whether that's additional work, fee adjustment, or simply a thorough explanation, I'm committed to your satisfaction.

Your trust in Master Restorer standards deserves better than what we delivered.

Sincerely,
Phill McGurk
Master Restorer & Director
One of Limited Master Restorers in QLD | IICRC Certified
1300 309 361`,
    customizationNotes: 'This is critical - someone hired specifically for Master Restorer level. Take very seriously.',
    estimatedReadTime: '2 minutes'
  },

  // SPECIALIZED RESPONSES
  {
    id: 'specialized_emergency_response',
    name: 'Emergency Response Thank You',
    category: 'specialized',
    rating: 'any',
    template: `{NAME}, thank you so much for this review!

Emergency response is at the heart of what we do. Water damage, fire, storms – these disasters don't wait for business hours, and neither do we. I'm so pleased we could be there for you quickly when you needed us most in {LOCATION}.

{SPECIFIC_EMERGENCY_ACKNOWLEDGMENT}

As a Master Restorer, I know that rapid response in the first 24-48 hours makes all the difference in minimizing damage and reducing restoration costs. Your {PROPERTY_TYPE} received immediate professional attention to prevent secondary damage and start the recovery process right away.

Thank you for trusting Disaster Recovery Local Service during a crisis. We're here 24/7 for any emergency – 1300 309 361.

Stay safe,
Phill McGurk
Master Restorer & Director
24/7 Emergency Response | IICRC Certified
1300 309 361`,
    customizationNotes: 'Use when review specifically emphasizes emergency response, rapid service, or after-hours availability.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'specialized_insurance_success',
    name: 'Insurance Claim Success Thank You',
    category: 'specialized',
    rating: 'any',
    template: `{NAME}, I'm delighted your insurance claim was successful! Thank you for sharing this outcome.

Navigating insurance claims is often the most stressful part of property damage recovery. As a Master Restorer who works with insurance companies and loss adjusters daily across Brisbane, Ipswich, and Logan, I understand how important comprehensive documentation and professional advocacy are to claim success.

{SPECIFIC_INSURANCE_SUCCESS_ACKNOWLEDGMENT}

Your {SERVICE_TYPE} restoration in {LOCATION} received thorough documentation, accurate scoping, and professional representation throughout the claim process. A successful outcome is exactly what we aim for with every insurance restoration project.

Thank you for trusting us to handle both the restoration work and the insurance process. If you know anyone dealing with property damage and insurance claims, we're here to help – 1300 309 361.

Best wishes,
Phill McGurk
Master Restorer & Director
IICRC Certified | Insurance Restoration Specialist
1300 309 361`,
    customizationNotes: 'Use when review specifically mentions successful insurance claim, payout, or adjuster approval.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'specialized_referral',
    name: 'Referral Thank You',
    category: 'specialized',
    rating: 'any',
    template: `{NAME}, thank you so much for recommending us! Referrals like yours are the highest compliment we can receive.

As a local Brisbane business built on reputation and trust, word-of-mouth recommendations from satisfied clients are invaluable. I'm thrilled that your experience with our {SERVICE_TYPE} restoration in {LOCATION} was positive enough that you'd refer others to us.

{SPECIFIC_REFERRAL_ACKNOWLEDGMENT}

We'll take excellent care of anyone you send our way, treating them with the same Master Restorer-level service and attention you received. That's my personal commitment.

Thank you again for your trust and for supporting local business. We're here 24/7 for any future emergency needs – 1300 309 361.

With gratitude,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Use when review mentions recommending to others, word-of-mouth, or specific referral.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'specialized_repeat_customer',
    name: 'Repeat Customer Thank You',
    category: 'specialized',
    rating: 'any',
    template: `{NAME}, it's wonderful to hear from you again! Though I'm sorry you needed restoration services a second time.

When clients come back to us – even for unfortunate reasons like property damage – it tells me we did something right the first time. Your continued trust in Disaster Recovery Local Service means everything to our team.

{SPECIFIC_REPEAT_SERVICE_ACKNOWLEDGMENT}

Both your {FIRST_SERVICE} and now your {CURRENT_SERVICE} in {LOCATION} have received the same comprehensive Master Restorer-level care. Consistency and reliability are what Master certification represents, and I'm pleased we've maintained those standards for you across multiple projects.

Thank you for choosing us again. While we hope you won't need us a third time, we're here 24/7 if you do – 1300 309 361.

With appreciation,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`,
    customizationNotes: 'Use when review indicates repeat customer or mentions previous service experience.',
    estimatedReadTime: '2 minutes'
  },

  {
    id: 'specialized_high_value_property',
    name: 'High-Value Property (Hamilton/Ascot/Karalee) Thank You',
    category: 'specialized',
    rating: 'any',
    template: `{NAME}, thank you for this thoughtful review!

Properties in {HIGH_VALUE_SUBURB} deserve the highest level of restoration care, and I'm pleased we could provide that for your {PROPERTY_TYPE}. As a Master Restorer, I personally oversee all significant restoration projects to ensure they meet the exacting standards that prestige properties require.

{SPECIFIC_PROPERTY_ACKNOWLEDGMENT}

High-end homes and commercial properties demand:
• Meticulous attention to architectural details
• Premium materials and finishes
• Discretion and professional conduct
• Coordination with architects, interior designers, and insurers
• Restoration that preserves or enhances property value

Your property received exactly this level of care, and your satisfaction confirms we delivered on that commitment.

Thank you for trusting Disaster Recovery Local Service with your valuable property. We're honored to serve the {HIGH_VALUE_SUBURB} community, and we're here 24/7 for any future needs – 1300 309 361.

Warmest regards,
Phill McGurk
Master Restorer & Director
IICRC Certified | Prestige Property Restoration Specialist
1300 309 361`,
    customizationNotes: 'Use for reviews from Hamilton, Ascot, New Farm, Toowong, Karalee, Brookwater, Springfield Lakes, or high-value commercial properties.',
    estimatedReadTime: '2 minutes'
  }
];

/**
 * Get template by ID
 */
export function getTemplate(templateId: string): ResponseTemplate | undefined {
  return RESPONSE_TEMPLATES.find(t => t.id === templateId);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): ResponseTemplate[] {
  return RESPONSE_TEMPLATES.filter(t => t.category === category);
}

/**
 * Get templates by rating
 */
export function getTemplatesByRating(rating: number): ResponseTemplate[] {
  return RESPONSE_TEMPLATES.filter(t => t.rating === rating || t.rating === 'any');
}

/**
 * Example response for the specific 2-star review about confusing documentation/process
 */
export const EXAMPLE_RESPONSE = `Thank you for your honest feedback. I'm pleased that you're satisfied with the quality of our restoration work, but I'm disappointed to hear that our process documentation and onboarding communication were confusing for you.

You're absolutely right – when you're dealing with property damage, the last thing you need is unclear information about what happens next. As a Master Restorer serving Brisbane, Ipswich, and Logan, I should be making the entire restoration process clear and straightforward, not adding to your stress.

We've recently updated our client onboarding materials to provide:
• Clear timeline expectations for each restoration phase
• Step-by-step explanation of the insurance claim process
• Daily progress updates during active restoration
• Direct contact details for questions at any stage

I'd like to send you our updated onboarding guide and hear your specific feedback on what was confusing. This would help us improve for future clients. Please call me directly on 1300 309 361, or email, and I'll arrange to send the updated materials.

Thank you for taking the time to provide this constructive feedback. It helps us maintain the highest standards of client care across all aspects of our service.

Regards,
Phill McGurk
Master Restorer & Director
IICRC Certified | Disaster Recovery Local Service
1300 309 361`;

export default RESPONSE_TEMPLATES;
