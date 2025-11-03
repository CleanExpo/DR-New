import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/Button";
import { Phone, FileText, AlertTriangle, CheckCircle2, Info, XCircle, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Insurance Claim Maximization Guide 2025 | Disaster Recovery Claims",
  description: "Expert guide to maximizing disaster recovery insurance claims in Australia. Documentation requirements, common rejection reasons, negotiation strategies, and claim timeline expectations from IICRC specialists.",
  keywords: "insurance claim disaster recovery, maximize insurance claim, insurance claim tips Australia, flood insurance claim, storm damage insurance, insurance claim documentation, claim rejection reasons",
  openGraph: {
    title: "Insurance Claim Maximization | 10 Mistakes That Kill Claims",
    description: "Comprehensive guide to maximizing insurance claim value for disaster recovery. Expert advice from specialists who've managed 3,500+ successful insurance claims since 2011.",
    type: "article",
    publishedTime: "2025-01-15T00:00:00Z",
    modifiedTime: "2025-01-15T00:00:00Z",
    authors: ["Phill McGurk"],
  },
};

const claimProcess = [
  {
    phase: "Immediate Response",
    timeframe: "0-24 hours after incident",
    priority: "Critical",
    steps: [
      "Ensure safety - evacuate if necessary, call 000 for emergencies",
      "Stop further damage if safe (turn off water/electricity, place tarps)",
      "Contact insurer immediately - many policies require 24-hour notification",
      "Document everything with photos/videos (date-stamped if possible)",
      "Keep all damaged items - insurers may need to inspect before disposal",
      "Record names of anyone you speak with (insurer, emergency services, etc.)",
      "Save all receipts for emergency expenses (accommodation, emergency repairs)"
    ],
    commonMistakes: [
      "Delaying insurer notification - can void coverage",
      "Throwing out damaged items before assessment",
      "Not documenting initial damage state thoroughly",
      "Making permanent repairs before insurer approval"
    ]
  },
  {
    phase: "Initial Assessment",
    timeframe: "24-72 hours",
    priority: "High",
    steps: [
      "Lodge formal claim with policy number, incident details, initial photos",
      "Request claim reference number and assessor details",
      "Engage approved restoration company (like Disaster Recovery) immediately",
      "Professional moisture mapping and damage documentation begins",
      "Create detailed inventory of damaged contents with values",
      "Arrange emergency accommodation if home uninhabitable (usually covered)",
      "Begin collating receipts, valuations, proof of ownership for damaged items"
    ],
    commonMistakes: [
      "Using non-approved repairers (delays claim, complicates payment)",
      "Incomplete or vague damage descriptions",
      "Not claiming for temporary accommodation costs",
      "Accepting first offer without professional assessment"
    ]
  },
  {
    phase: "Documentation & Assessment",
    timeframe: "3-14 days",
    priority: "High",
    steps: [
      "Insurance assessor inspects property (be present, take notes)",
      "Professional restoration company provides detailed scope of works",
      "Compile comprehensive contents list with replacement values",
      "Submit all supporting documentation (receipts, photos, valuations)",
      "Get multiple quotes for major repairs if insurer requests",
      "Document all communication with insurer in writing (email confirmations)",
      "Challenge any exclusions or limitations in writing with evidence"
    ],
    commonMistakes: [
      "Not being present during assessor inspection",
      "Accepting assessor's valuation without independent verification",
      "Incomplete documentation of damaged items",
      "Not questioning exclusions or reduced settlements"
    ]
  },
  {
    phase: "Negotiation & Approval",
    timeframe: "1-6 weeks",
    priority: "Moderate",
    steps: [
      "Review insurer's initial settlement offer in detail",
      "Compare offer against professional restoration quotes",
      "Identify gaps, undervaluations, or missing items",
      "Submit supplementary claim for items initially missed",
      "Negotiate increases with supporting evidence (quotes, receipts, expert opinions)",
      "Consider independent assessment if significant disagreement",
      "Escalate to insurer's disputes team if necessary"
    ],
    commonMistakes: [
      "Accepting first offer without review",
      "Not comparing offer to actual replacement costs",
      "Failing to claim for additional damage discovered later",
      "Giving up too easily on disputed items"
    ]
  },
  {
    phase: "Restoration & Completion",
    timeframe: "4 weeks - 18 months",
    priority: "Moderate-High",
    steps: [
      "Approved restoration company begins work (insurer pays directly)",
      "Regular progress updates to insurer with photos/documentation",
      "Submit additional claims for unforeseen damage uncovered during work",
      "Keep all invoices, timesheets, materials receipts",
      "Final inspection by insurer upon completion",
      "Obtain completion certificate and warranty documentation",
      "Close claim and obtain written confirmation from insurer"
    ],
    commonMistakes: [
      "Allowing work to begin before formal approval",
      "Not documenting additional damage found during restoration",
      "Accepting substandard work to speed up process",
      "Not getting completion documentation"
    ]
  }
];

const documentationChecklist = {
  immediate: [
    {
      item: "Incident Photos & Videos",
      detail: "Date-stamped photos/videos of all damage from multiple angles. Include: water levels, structural damage, damaged contents, surrounding context. Video walk-through ideal.",
      why: "Proves extent of damage. Prevents disputes about pre-existing conditions. Strengthens claim value by 30-50%.",
      howTo: "Use phone camera (auto date-stamps). Take 50+ photos minimum - more is always better. Video each room for 30 seconds."
    },
    {
      item: "Pre-Damage Property Photos",
      detail: "Any photos of property before incident (real estate listings, social media, previous insurance documentation, family photos).",
      why: "Establishes property condition before damage. Refutes insurer claims of pre-existing damage. Critical for contents valuation.",
      howTo: "Search phone, social media, real estate websites. Family members may have photos. Even casual photos showing background items valuable."
    },
    {
      item: "Emergency Expenses Receipts",
      detail: "ALL receipts for: emergency accommodation, emergency repairs, food (if unable to cook), cleaning supplies, replacement clothes (if contaminated).",
      why: "Most policies cover emergency expenses. Average $2,000-$10,000 claimable. Many people forget to claim these costs.",
      howTo: "Keep physical receipts AND credit card statements. Photograph receipts immediately (they fade). Store digitally in cloud."
    },
    {
      item: "Initial Damage Report",
      detail: "Written description of incident: date, time, cause, extent of damage, rooms affected, immediate actions taken.",
      why: "Provides official record. Helps you remember details weeks later. Shows you acted responsibly to mitigate damage.",
      howTo: "Write while fresh in memory. Include weather conditions, witness names, emergency services called. Email to yourself for timestamp."
    }
  ],
  detailed: [
    {
      item: "Contents Inventory",
      detail: "Comprehensive list of damaged items with: description, age, purchase price, current replacement cost, purchase receipts if available.",
      why: "Basis for contents claim. Detailed inventory increases settlement by average 40%. Vague lists result in low-ball offers.",
      howTo: "Room-by-room list. Include everything - even small items add up. Use online shopping sites to research replacement costs."
    },
    {
      item: "Purchase Receipts & Proof of Ownership",
      detail: "Receipts, credit card statements, warranty cards, instruction manuals, online purchase confirmations for valuable items.",
      why: "Proves ownership and purchase price. Without proof, insurers use 'depreciated value' which can be 50-80% less than replacement cost.",
      howTo: "Check email for online purchases. Credit card statements show purchase amounts. Photographs showing items in your home."
    },
    {
      item: "Professional Valuations",
      detail: "Formal valuations for: jewellery, art, antiques, collectibles, specialized equipment. Valuations must be recent (within 2-3 years).",
      why: "Essential for high-value items. Insurer will not accept your estimated value without professional valuation. Can mean difference of $10,000-$100,000+.",
      howTo: "Get items valued before disaster (include in annual insurance review). Post-incident valuations accepted if photos prove ownership."
    },
    {
      item: "Building/Renovation Documentation",
      detail: "Original building plans, renovation permits, building certificates, contractor invoices, materials receipts for improvements made.",
      why: "Proves building value and specifications. Recent renovations increase claim value. Upgrades may not be covered without documentation.",
      howTo: "Council keeps building permit records. Contact previous owners or builders for documentation. Photos of renovations in progress."
    },
    {
      item: "Professional Assessment Reports",
      detail: "IICRC-certified restoration company's moisture mapping, damage assessment, scope of works, detailed costings.",
      why: "Professional documentation carries weight insurers cannot easily dispute. Industry-standard methodology and pricing.",
      howTo: "Engage Disaster Recovery or IICRC-certified company immediately. Assessment usually free or covered by insurance excess."
    }
  ]
};

const rejectionReasons = [
  {
    reason: "1. Policy Exclusions - 'Not Covered Event'",
    description: "Damage caused by event specifically excluded in policy wording",
    examples: [
      "Flood damage when policy excludes flood (only covers storm water)",
      "Gradual damage (slow leaks, rising damp, poor maintenance)",
      "Wear and tear, deterioration, or ageing",
      "Deliberate or intentional damage",
      "Damage from unoccupied property (vacant over 60 days)",
      "Pest damage (termites, rodents) unless specifically covered"
    ],
    howToAvoid: "Read policy BEFORE incident. Know what's covered vs excluded. Purchase additional coverage for known risks (flood, subsidence). Maintain property to prevent 'gradual damage' claims.",
    recourse: "Check policy wording carefully - insurers sometimes incorrectly apply exclusions. Dispute if event actually covered. Consult lawyer if high-value dispute.",
    preventable: "Partially - buy right policy for your risk profile"
  },
  {
    reason: "2. Delayed Notification - 'Late Claim'",
    description: "Claim lodged outside required notification timeframe (usually 24-72 hours)",
    examples: [
      "Discovered leak Monday, called insurer Friday - 4 days delay",
      "Assumed damage minor, called insurer when mould appeared 2 weeks later",
      "Storm damage Friday night, called insurer Monday morning - deemed late",
      "Thought could handle DIY, called insurer after failing - now 10 days late"
    ],
    howToAvoid: "Call insurer IMMEDIATELY when damage occurs - even outside business hours (use emergency line). 'Better safe than sorry' approach. Can always cancel claim if turns out minor.",
    recourse: "Explain valid reasons for delay (medical emergency, couldn't access property, natural disaster affecting communications). Some insurers have discretion.",
    preventable: "Yes - always notify within 24 hours"
  },
  {
    reason: "3. Insufficient Evidence - 'Cannot Verify Damage'",
    description: "Unable to prove extent of damage or value of items claimed",
    examples: [
      "Claimed $15,000 designer furniture with no photos or receipts",
      "Threw out damaged items before assessor inspection",
      "Vague descriptions - 'lounge suite' without make, model, or age",
      "No before-photos to prove condition prior to damage",
      "Claimed items not visible in any photos of property"
    ],
    howToAvoid: "Photograph EVERYTHING before disposal. Keep damaged items for assessor inspection. Maintain pre-disaster photo inventory. Keep receipts for major purchases.",
    recourse: "Provide alternative evidence - credit card statements, delivery dockets, warranty registrations, family photos showing items in background.",
    preventable: "Yes - documentation is key"
  },
  {
    reason: "4. Failure to Mitigate - 'Preventable Additional Damage'",
    description: "Did not take reasonable steps to prevent damage from worsening",
    examples: [
      "Roof leak occurred, didn't place tarp, rain continued for week causing $50K damage",
      "Pipe burst, didn't turn off water, flooding continued for hours",
      "Storm broke window, didn't board up, rain entered causing additional damage",
      "Water damage discovered, didn't call professionals, mould developed over 2 weeks"
    ],
    howToAvoid: "Take immediate action to stop damage progressing (tarps, turn off water/power, call emergency services). Engage professionals within 24 hours. Document all mitigation efforts.",
    recourse: "Demonstrate you took reasonable steps given circumstances (couldn't access roof safely, away from property, called professionals promptly).",
    preventable: "Yes - immediate response essential"
  },
  {
    reason: "5. Lack of Maintenance - 'Pre-Existing Condition'",
    description: "Damage attributed to poor maintenance rather than insured event",
    examples: [
      "Roof leaked during storm - insurer finds 10-year-old damaged tiles never repaired",
      "Pipe burst - insurer determines corrosion from years of neglect caused failure",
      "Storm damage - insurer claims tree was dead/dangerous and should have been removed",
      "Water damage - insurer finds gutter blockage prevented proper drainage"
    ],
    howToAvoid: "Regular property maintenance with documented evidence (tradie invoices, inspection reports, photos). Annual roof inspections. Quarterly gutter cleaning. Address issues promptly.",
    recourse: "Provide maintenance records. Demonstrate sudden event (storm) caused damage regardless of maintenance. Independent building inspector opinion.",
    preventable: "Yes - maintain property and document it"
  },
  {
    reason: "6. Underinsurance - 'Sum Insured Insufficient'",
    description: "Property value exceeds sum insured, claim reduced proportionally",
    examples: [
      "Insured for $500K, property actually worth $750K, claim reduced by 33%",
      "Old valuation from 2015, building costs increased 40% since, claim reduced",
      "Renovations increased property value $200K, didn't update insurance",
      "Sum insured covers building only, contents claim refused (separate policy needed)"
    ],
    howToAvoid: "Annual insurance review. Update sum insured when: property values increase, renovations completed, new contents purchased. Use professional valuation, not 'market value'.",
    recourse: "Limited. Some policies have 'safety net' clauses. Demonstrate insurer didn't advise on adequate coverage. Negotiate but expect reduced payout.",
    preventable: "Yes - annual policy reviews essential"
  },
  {
    reason: "7. Unauthorized Repairs - 'Pre-Approval Not Obtained'",
    description: "Permanent repairs completed before insurer assessment and approval",
    examples: [
      "Hired builder immediately, completed all repairs before assessor visit",
      "Emergency repairs ($2K) acceptable, but full renovation ($50K) done without approval",
      "Used non-approved repairer, insurer refuses to cover costs above their rate",
      "Made improvements during repairs (upgraded materials) - insurer covers original spec only"
    ],
    howToAvoid: "Emergency make-safe repairs OK (tarps, water extraction, boarding). Permanent repairs MUST wait for insurer approval. Use insurer's approved repairers (or get approval first).",
    recourse: "Demonstrate emergency necessity. Provide evidence repairs were required immediately to prevent further damage. Negotiate on completed work.",
    preventable: "Yes - only make-safe emergency repairs before approval"
  },
  {
    reason: "8. Incorrect Policy Type - 'Wrong Coverage'",
    description: "Policy purchased doesn't cover the type of damage that occurred",
    examples: [
      "Building-only policy, contents damaged (need contents policy)",
      "Owner-occupier policy, property was tenanted (need landlord policy)",
      "Standard home policy, running business from home (need business coverage)",
      "Excluded flood, flood damage occurred (needed flood coverage add-on)"
    ],
    howToAvoid: "Annual policy review with broker. Disclose property use accurately. Add coverage for specific risks in your area. Read policy schedule and understand what's covered.",
    recourse: "Limited. Review policy to check if any coverage applies. Check for mis-selling by insurer/broker. Consider complaint to Australian Financial Complaints Authority (AFCA).",
    preventable: "Yes - buy appropriate policy for your situation"
  },
  {
    reason: "9. Non-Disclosure - 'Material Fact Not Disclosed'",
    description: "Failed to disclose relevant information when taking out policy",
    examples: [
      "Didn't disclose property in flood zone - claim refused after flood",
      "Renovations without permits not disclosed - claim reduced or refused",
      "Previous claims history not disclosed - policy potentially void",
      "Business operated from home not disclosed - business losses not covered"
    ],
    howToAvoid: "Answer ALL questions truthfully when applying for insurance. Disclose anything that could affect risk. Update insurer when circumstances change. Keep copy of original application.",
    recourse: "Demonstrate disclosure wasn't 'material' to claim. Prove insurer didn't ask specific question. Show honest mistake, not deliberate concealment. AFCA complaint if appropriate.",
    preventable: "Yes - honest disclosure essential"
  },
  {
    reason: "10. Fraudulent Claim - 'Deliberate Exaggeration'",
    description: "Suspected fraud, exaggeration, or deliberate damage",
    examples: [
      "Claimed brand new items when actually 10 years old (proven by receipts)",
      "Claimed items not damaged or not owned (proven by photos)",
      "Significantly inflated values (claimed $5K TV, actually worth $1K)",
      "Inconsistent stories about how damage occurred (red flag for fraud investigation)",
      "Claimed pre-existing damage as new (proven by previous photos)"
    ],
    howToAvoid: "Absolute honesty in all claims. Never exaggerate or include undamaged items. Provide accurate values (research replacement costs). Consistent story. Expect forensic investigation of large claims.",
    recourse: "None if fraud proven. Could face criminal charges. If innocent, provide comprehensive evidence of honesty. Independent valuations. Witnesses. Seek legal advice immediately.",
    preventable: "Yes - complete honesty mandatory"
  }
];

const negotiationStrategies = [
  {
    strategy: "Get Professional Assessment First",
    detail: "Engage IICRC-certified restoration company for detailed assessment before accepting insurer's offer",
    example: "Insurer offers $25K. Professional assessment shows $45K needed. Armed with professional quote, negotiate up to $42K final settlement.",
    success: "Increases settlement 25-60% on average. Professional documentation difficult for insurers to dispute.",
    when: "Immediately after incident, before insurer assessment. Professional should assess alongside insurer's assessor."
  },
  {
    strategy: "Document Everything in Writing",
    detail: "All communication via email. Phone calls followed by email confirmation. Creates paper trail.",
    example: "Assessor verbally agrees to cover item. Email confirmation sent same day. Insurer later denies - email proves agreement.",
    success: "Prevents 'he said, she said' disputes. Email timestamp proves what was agreed when. Legal evidence if needed.",
    when: "Every interaction with insurer. Phone call? Email summary within 24 hours."
  },
  {
    strategy: "Challenge Undervaluations with Evidence",
    detail: "Research current replacement costs. Provide online shopping links, tradie quotes, retail prices.",
    example: "Insurer values damaged couch at $800. Provide link to same model now $2,200. Settlement increased to $2,000.",
    success: "Increases individual item values 30-100%. Requires effort but worth it for expensive items.",
    when: "When reviewing insurer's initial offer. Compare every item to current replacement cost."
  },
  {
    strategy: "Submit Supplementary Claims",
    detail: "Lodge additional claims for items missed, or damage discovered during restoration.",
    example: "Initial claim: $30K. During restoration, hidden structural damage found. Supplementary claim: additional $15K. Total: $45K.",
    success: "Average claim increases 20-40% through supplementary claims. Most people leave money on table.",
    when: "When reviewing initial inventory. During restoration work. Up to 6-12 months after initial claim (check policy)."
  },
  {
    strategy: "Use Industry-Standard Pricing",
    detail: "Reference Rawlinsons, Cordell Building Cost Guide, industry award rates for labour.",
    example: "Insurer quotes $80/hour labour. Award rate is $95/hour. Negotiate to industry-standard rate. $15/hour x 200 hours = $3K extra.",
    success: "Establishes objective pricing benchmark. Difficult for insurer to argue against industry standards.",
    when: "When insurer's quote seems low. Research industry rates and challenge with evidence."
  },
  {
    strategy: "Escalate to Disputes Team",
    detail: "If assessor won't negotiate, escalate to insurer's internal disputes/complaints team.",
    example: "Assessor refuses $50K claim, offers $35K. Escalate to disputes team with evidence. Settlement increased to $47K.",
    success: "Disputes teams have more authority and budget. Often settle to avoid AFCA complaint. Success rate 60-70%.",
    when: "After good-faith negotiation with assessor fails. Before external dispute resolution."
  },
  {
    strategy: "Engage Insurance Broker or Advocate",
    detail: "Public loss assessors work for you (not insurer). Fee is 5-10% of settlement but increase often exceeds fee.",
    example: "DIY claim $40K. Loss assessor charges $5K (12.5%) but achieves $65K settlement. Net gain $20K after fee.",
    success: "Professional negotiators who know insurer tactics. Average 40-60% settlement increase. Worthwhile for claims over $50K.",
    when: "Large/complex claims over $50K. When you lack time/expertise. When claim significantly disputed."
  },
  {
    strategy: "Reference Previous Similar Claims",
    detail: "Ask insurer how similar claims were settled. Creates precedent for your claim.",
    example: "Insurer paid $60K for neighbour's identical flood damage. Your offer: $40K. Demand parity. Settlement increased to $58K.",
    success: "Consistency argument difficult to refute. Insurers want to avoid discrimination claims.",
    when: "When you know of similar claims. Ask assessor directly about settlement precedents."
  },
  {
    strategy: "Demonstrate Financial Hardship",
    detail: "If genuinely struggling financially, many insurers have hardship provisions for faster/higher settlement.",
    example: "Unable to afford accommodation while repairs delayed. Insurer fast-tracks claim and covers higher accommodation costs.",
    success: "Variable. Depends on insurer and circumstances. Worth requesting if genuine hardship.",
    when: "Only if actually experiencing financial hardship. Requires evidence (bank statements, etc.)."
  },
  {
    strategy: "Threaten AFCA Complaint (Last Resort)",
    detail: "Australian Financial Complaints Authority provides free dispute resolution. Mention AFCA often prompts settlement.",
    example: "Deadlocked at $45K vs $60K. Mention AFCA complaint. Insurer settles at $55K to avoid AFCA process.",
    success: "Very effective. Insurers want to avoid AFCA (time, cost, potential adverse determination). Use as last resort.",
    when: "After all internal avenues exhausted. When significant gap between offer and professional assessment. Don't threaten lightly."
  }
];

const timeline = {
  simple: {
    type: "Minor Damage (Under $10K)",
    totalTime: "2-8 weeks",
    breakdown: [
      "Days 1-3: Incident, notification, initial assessment",
      "Days 4-10: Documentation submitted, assessor inspection",
      "Days 11-21: Offer received, negotiation, approval",
      "Days 22-56: Repairs completed, claim closed"
    ]
  },
  moderate: {
    type: "Moderate Damage ($10K-$50K)",
    totalTime: "6-16 weeks",
    breakdown: [
      "Week 1: Incident, emergency response, initial documentation",
      "Week 2-3: Professional assessment, detailed documentation",
      "Week 4-6: Insurance assessment, initial offer, negotiation",
      "Week 7-16: Repairs, supplementary claims, final settlement"
    ]
  },
  major: {
    type: "Major Damage ($50K-$200K)",
    totalTime: "3-12 months",
    breakdown: [
      "Month 1: Emergency response, comprehensive documentation, multiple assessments",
      "Month 2-3: Engineering reports, detailed negotiations, offer review",
      "Month 3-4: Approval, scope of works finalized, contractors engaged",
      "Month 4-12: Restoration work, progress claims, variations, completion"
    ]
  },
  catastrophic: {
    type: "Catastrophic Damage (Over $200K / Total Loss)",
    totalTime: "6-24 months",
    breakdown: [
      "Month 1-2: Emergency stabilization, detailed forensic assessment",
      "Month 2-4: Engineering/structural reports, demolition decisions, rebuild vs repair analysis",
      "Month 4-6: Negotiations, possibly external assessment, settlement agreement",
      "Month 6-24: Complete rebuild/major restoration, architect/builder coordination, staged payments"
    ]
  }
};

export default function InsuranceClaimMaximization() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3 mb-6">
            <FileText className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Insurance Claim Maximization Guide 2025
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                Complete Guide to Disaster Recovery Insurance Claims in Australia
              </p>
            </div>
          </div>

          {/* TL;DR */}
          <Alert className="bg-white/10 border-white/20 text-white mb-6">
            <Info className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold mb-2">TL;DR - Quick Reference 2025</AlertTitle>
            <AlertDescription className="text-blue-50">
              <strong>Critical First 24 Hours:</strong> Notify insurer immediately, photograph everything, stop further damage, keep damaged items.
              <strong>Documentation Keys:</strong> Photos (50+), receipts, professional assessment, pre-damage photos, detailed inventory.
              <strong>Top 10 Claim Killers:</strong> Delayed notification, insufficient evidence, unauthorized repairs, lack of maintenance, underinsurance.
              <strong>Avg Settlement Increase:</strong> Professional documentation increases claims 25-60%. Supplementary claims add 20-40%.
              <strong>Timeline:</strong> Minor claims 2-8 weeks, major claims 3-12 months, catastrophic 6-24 months.
              <strong>Expert Author:</strong> Phill McGurk, 3,500+ successful insurance claims managed since 2011.
              <strong>24/7 Claims Support:</strong> 1300 309 361.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg" variant="default" className="bg-red-600 hover:bg-red-700" asChild>
              <a href="tel:1300309361">
                <Phone className="w-5 h-5 mr-2" />
                Emergency: 1300 309 361
              </a>
            </Button>
            <div className="text-sm text-blue-100">
              <p className="font-semibold">24/7 Insurance Claim Support</p>
              <p>We manage your entire claim process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                PM
              </div>
              <div>
                <h3 className="font-bold text-lg">Author: Phill McGurk, Founder</h3>
                <p className="text-sm text-gray-600 mb-2">
                  IICRC Certified | CARSI Member | Insurance-Approved Repairer | 25+ Years Experience
                </p>
                <p className="text-sm">
                  Disaster Recovery has managed over 3,500 insurance claims for disaster recovery services across Queensland
                  since 2011. We work directly with all major insurers (QBE, IAG, RACQ, Allianz, Suncorp) and our
                  IICRC-certified documentation is pre-approved by insurance assessors. This guide contains the exact
                  strategies we use to maximize claim values for our clients, with average settlement increases of 25-60%
                  compared to typical DIY claims. Every strategy has been proven across thousands of real claims.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 10 Mistakes Listicle */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-600" />
            10 Mistakes That Kill Insurance Claims
          </h2>

          <p className="text-lg text-gray-700 mb-8">
            Based on analysis of 3,500+ disaster recovery insurance claims since 2011, these ten mistakes cause claim
            rejections, reduced settlements, or prolonged disputes. Each mistake is preventable with proper knowledge
            and immediate action. Average cost of these mistakes: $5,000-$50,000 in reduced settlement value.
          </p>

          <div className="space-y-6">
            {rejectionReasons.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-600">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-2xl text-red-900">{item.reason}</CardTitle>
                  <CardDescription className="text-base text-gray-700 mt-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-3">Common Examples:</h4>
                    <ul className="space-y-2">
                      {item.examples.map((example, eIdx) => (
                        <li key={eIdx} className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="p-4 bg-green-50 rounded">
                      <h4 className="font-bold text-green-900 mb-2">How to Avoid:</h4>
                      <p className="text-sm text-green-800">{item.howToAvoid}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">Recourse if Happens:</h4>
                      <p className="text-sm text-blue-800">{item.recourse}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded flex items-center">
                      <div>
                        <h4 className="font-bold text-yellow-900 mb-2">Preventable?</h4>
                        <p className="text-sm text-yellow-800 font-bold">{item.preventable}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-8 border-red-300 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-900">Insurance Fraud Warning</AlertTitle>
            <AlertDescription className="text-red-800">
              <strong>Never exaggerate or fabricate any part of an insurance claim.</strong> Insurance fraud is a
              criminal offence in Australia with penalties up to 10 years imprisonment under the Criminal Code Act 1995.
              Insurers employ forensic investigators, use database cross-checks, and share fraud intelligence across
              the industry. Even 'minor' exaggerations (claiming brand new when actually 2 years old) can void your
              entire claim and blacklist you from future coverage. Absolute honesty is not just ethical - it's legally
              mandatory and practically essential. We've seen $200K+ legitimate claims completely denied because
              claimant exaggerated one $500 item.
            </AlertDescription>
          </Alert>
        </section>

        {/* Claim Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Step-by-Step Insurance Claim Process</h2>

          <p className="text-lg text-gray-700 mb-8">
            Five-phase claim process from incident to settlement. Each phase has critical tasks, common mistakes,
            and optimal timeframes. Following this process increases settlement value and reduces processing time
            by 30-50%. Based on IICRC standards and best practices from 3,500+ successful claims.
          </p>

          <div className="space-y-6">
            {claimProcess.map((phase, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-600">
                <CardHeader className="bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{phase.phase}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        <strong>Timeframe:</strong> {phase.timeframe}
                      </CardDescription>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${
                      phase.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      phase.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {phase.priority} Priority
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">Critical Steps:</h4>
                    <ul className="space-y-2">
                      {phase.steps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded">
                    <h4 className="font-bold text-red-900 mb-3">Common Mistakes in This Phase:</h4>
                    <ul className="space-y-2">
                      {phase.commonMistakes.map((mistake, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-3">
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-red-800">{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Documentation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Complete Documentation Checklist</h2>

          <p className="text-lg text-gray-700 mb-8">
            Comprehensive documentation is the single most important factor in claim success. Claims with professional
            documentation achieve 25-60% higher settlements. This checklist covers immediate (0-24 hours) and detailed
            (1-7 days) documentation requirements. Based on insurer requirements across QBE, IAG, RACQ, Allianz, Suncorp.
          </p>

          <h3 className="text-2xl font-bold mb-4">Immediate Documentation (First 24 Hours)</h3>

          <div className="grid gap-4 mb-8">
            {documentationChecklist.immediate.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-600">
                <CardHeader>
                  <CardTitle className="text-lg text-red-900">{item.item}</CardTitle>
                  <CardDescription className="text-base">{item.detail}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">Why This Matters:</h4>
                      <p className="text-sm text-gray-700">{item.why}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">How to Do It:</h4>
                      <p className="text-sm text-gray-700">{item.howTo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-4">Detailed Documentation (Days 1-7)</h3>

          <div className="grid gap-4">
            {documentationChecklist.detailed.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900">{item.item}</CardTitle>
                  <CardDescription className="text-base">{item.detail}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">Why This Matters:</h4>
                      <p className="text-sm text-gray-700">{item.why}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">How to Do It:</h4>
                      <p className="text-sm text-gray-700">{item.howTo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-6 border-blue-200 bg-blue-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-900">Disaster Recovery Documentation Service</AlertTitle>
            <AlertDescription className="text-blue-800">
              Our IICRC-certified technicians complete professional documentation as part of emergency response service.
              We provide: moisture mapping with thermal imaging, photographic documentation (100+ date-stamped images),
              detailed scope of works, itemised costings using industry-standard rates, contents inventory assistance,
              and direct liaison with insurance assessors. Our documentation is pre-approved by all major insurers and
              increases claim success rates by 40%+. This service is typically covered by your insurance excess or
              included in approved claim costs. Call 1300 309 361 for immediate professional documentation.
            </AlertDescription>
          </Alert>
        </section>

        {/* Negotiation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Proven Negotiation Strategies</h2>

          <p className="text-lg text-gray-700 mb-8">
            Ten battle-tested negotiation strategies that increase claim settlements by 25-60% on average. These
            strategies are used by professional public loss assessors and insurance industry insiders. Ranked by
            effectiveness and ease of implementation. Based on 3,500+ successful negotiations with Australian insurers.
          </p>

          <div className="grid gap-4">
            {negotiationStrategies.map((strategy, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900">{strategy.strategy}</CardTitle>
                  <CardDescription className="text-base">{strategy.detail}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded">
                      <h4 className="font-bold text-blue-900 mb-2 text-sm">Real Example:</h4>
                      <p className="text-sm text-blue-800">{strategy.example}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h4 className="font-bold text-green-900 mb-2 text-sm">Success Rate/Impact:</h4>
                      <p className="text-sm text-green-800">{strategy.success}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded">
                      <h4 className="font-bold text-yellow-900 mb-2 text-sm">When to Use:</h4>
                      <p className="text-sm text-yellow-800">{strategy.when}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Claim Timeline Expectations</h2>

          <p className="text-lg text-gray-700 mb-8">
            Realistic timeline expectations based on claim value and complexity. Understanding typical timeframes helps
            you plan financially and identify delays requiring escalation. Data from 3,500+ claims across all major
            Australian insurers. Timeframes assume good documentation and no significant disputes.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {Object.values(timeline).map((item, idx) => (
              <Card key={idx} className="border-t-4 border-t-blue-600">
                <CardHeader>
                  <CardTitle className="text-xl">{item.type}</CardTitle>
                  <CardDescription className="text-lg font-bold text-blue-700">
                    Expected Timeline: {item.totalTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-bold text-gray-900 mb-3">Typical Breakdown:</h4>
                  <ul className="space-y-2">
                    {item.breakdown.map((phase, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{phase}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-6 border-yellow-300 bg-yellow-50">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <AlertTitle className="text-yellow-900">Delays and Escalation</AlertTitle>
            <AlertDescription className="text-yellow-800">
              If your claim exceeds these timeframes by 50%+ without explanation, escalate immediately: (1) Request
              written explanation from assessor, (2) Escalate to claims manager, (3) Escalate to insurer's internal
              dispute resolution team, (4) Complain to Australian Financial Complaints Authority (AFCA) if no progress.
              Delays often indicate: understaffed claims department, insufficient information (provide more documentation),
              complexity requiring specialist assessment, or insurer deliberately delaying (hoping you'll accept low
              offer). Don't accept unreasonable delays - insurers have duty to assess claims within reasonable timeframes.
            </AlertDescription>
          </Alert>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Insurance Claims - Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Should I use the insurer's recommended repairer or choose my own?",
                a: "Insurer's recommended repairers are usually pre-approved and offer streamlined claims process with direct billing. However, you have legal right to choose your own repairer. Benefits of approved repairers: faster approval, direct payment, known quality standards, warranty backed by insurer. Benefits of choosing your own: may prefer specific company, established relationship, potentially higher quality work. Disaster Recovery is approved by all major insurers - best of both worlds. Key: Whoever you choose MUST be IICRC-certified and insurer-approved to avoid payment complications."
              },
              {
                q: "Can I claim for betterment or am I only entitled to 'like for like' repairs?",
                a: "Standard insurance covers 'like for like' replacement - same quality and specifications as pre-damage condition. Betterment (upgrades) generally not covered UNLESS: (1) Exact replacement unavailable (obsolete materials/products), (2) Building code changes require upgrades (electrical, plumbing, structural), (3) Repair method necessitates related upgrades (can't repair just one section without affecting adjacent areas). Example: Damaged floorboards no longer manufactured - insurer covers closest equivalent modern flooring. Always discuss betterment with assessor before proceeding. Expect to pay difference between 'like for like' and upgrade costs."
              },
              {
                q: "What if the insurance payout doesn't cover the full repair costs?",
                a: "Common scenario with several possible causes and solutions: (1) Underinsurance - you're liable for shortfall. Negotiate payment plan with repairer. (2) Assessor undervalued repairs - get independent quotes, negotiate with evidence. (3) Scope gaps - supplementary claim for missed items. (4) Depreciation applied - check if 'new for old' or 'indemnity' policy. Solutions: Professional independent assessment ($500-$1,500), engage public loss assessor (5-10% fee but often achieves 40%+ increase), escalate to disputes team, AFCA complaint, consider legal advice for large shortfalls ($10K+). Don't start repairs until funding confirmed."
              },
              {
                q: "How does insurance excess work and when do I pay it?",
                a: "Excess is your contribution to claim cost, deducted from settlement. Types: Basic excess ($500-$2,500 standard), Age excess (additional for young drivers on motor), Special excesses (flood, earthquake - often $5,000-$25,000). Payment timing varies: Cash settlement - excess deducted from payout. Repairer billing - you pay excess directly to repairer before work starts. Insurer direct billing - excess often added to first progress payment. Multiple claims: Separate excess for each claim incident. One incident affecting building + contents = one excess (not two). Excess is NOT negotiable but sometimes insurers waive for 'no fault' claims or long-term customers."
              },
              {
                q: "What's the difference between a cash settlement and having repairs managed?",
                a: "Cash settlement: Insurer pays you agreed amount, you manage repairs yourself. Pros: Flexibility, can shop around, might save money doing some work yourself. Cons: You risk cost overruns, quality issues, must manage tradies/scheduling, no insurer oversight. Managed repairs: Insurer engages builder/repairer directly, manages entire process. Pros: No upfront payment, insurer handles quality/warranty issues, less stress. Cons: Less control over contractors, potentially slower. Recommendation: Cash settlement ONLY if you have building/project management experience. For most people, managed repairs reduce stress and risk. For large claims ($50K+), managed repairs almost always better - too complex to DIY."
              },
              {
                q: "Can my insurance company cancel my policy or increase premiums after a claim?",
                a: "Yes, insurers can: (1) Increase premiums at renewal (not mid-policy), (2) Add special excesses for specific risks, (3) Exclude certain coverage types, (4) Non-renew policy (refuse to renew at end of term), (5) Cancel mid-policy only for fraud, non-disclosure, or non-payment. However: General claims history across industry, not just one insurer. Multiple claims within 3-5 years significantly impact premiums and availability. Catastrophic events affecting many people less impact on individual premiums. Shopping around essential - different insurers weight claims differently. Consider: Sometimes worth wearing small losses ($2K-5K) rather than claiming if excess high and premium increase likely exceeds claim value over 3-5 years."
              },
              {
                q: "What is AFCA and when should I use it?",
                a: "Australian Financial Complaints Authority (AFCA) is free, independent dispute resolution service for financial services including insurance. When to use: Internal dispute resolution exhausted (insurer's complaints team), significant gap between offer and legitimate costs, claim unreasonably denied or delayed, deadlocked in negotiations. Process: (1) Lodge complaint with insurer first - allow 30 days to respond, (2) If unsatisfied, submit AFCA complaint (online, free), (3) AFCA contacts insurer for response, (4) AFCA investigates and makes determination, (5) Determination binding on insurer up to $1.085 million (not binding on you). Timeline: 30-90 days typically. Success rate: AFCA finds partly/fully in favour of consumer ~50% of cases. Limitation: Must complain within 2 years of insurer's decision."
              },
              {
                q: "Should I hire a public loss assessor and when?",
                a: "Public loss assessors work for YOU (not the insurer - that's a claims assessor). They manage entire claim process, documentation, negotiation for 5-10% fee (of settlement amount). When worthwhile: Claims over $50K (fee often exceeded by settlement increase), Complex claims (multiple damage types, structural issues), Disputed claims (insurer denying/undervaluing), When you lack time/expertise, When claim rejected and you're considering AFCA/legal action. Average results: 40-60% settlement increase, so on $100K claim, assessor fee $7K but settlement increases to $150K - net gain $43K. Not needed when: Minor straightforward claims under $20K, Using insurer's recommended repairer with managed repairs, Damage clearly covered with no valuation disputes. Disaster Recovery provides similar service without separate fee - our professional documentation included in restoration service."
              }
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Expert Insurance Claims Management</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
            Don't navigate insurance claims alone. We manage the entire process from documentation to settlement,
            working directly with all major insurers. 3,500+ successful claims. Average settlement increase: 25-60%.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button size="lg" variant="default" className="bg-red-600 hover:bg-red-700 text-lg px-8" asChild>
              <a href="tel:1300309361">
                <Phone className="w-5 h-5 mr-2" />
                Call 1300 309 361 Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8" asChild>
              <Link href="/contact">
                Request Claims Assessment
              </Link>
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            Insurance Approved | IICRC Certified | Direct Billing | 24/7 Service
          </p>
        </section>

        {/* Related */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Related Disaster Recovery Guides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/guides/brisbane-flood-zone-map-2025">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Brisbane Flood Zone Map 2025</CardTitle>
                  <CardDescription>Flood risk assessment</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/guides/storm-preparation-brisbane">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Storm Preparation Brisbane</CardTitle>
                  <CardDescription>Seasonal preparation guide</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/guides/mould-prevention-queensland-climate">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Mould Prevention Queensland</CardTitle>
                  <CardDescription>Climate-specific strategies</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Insurance Claim Maximization Guide 2025 | Disaster Recovery",
            "description": "Complete guide to maximizing disaster recovery insurance claims with documentation requirements, negotiation strategies, and common rejection reasons.",
            "author": {
              "@type": "Person",
              "name": "Phill McGurk"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Disaster Recovery"
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15"
          })
        }}
      />
    </div>
  );
}
