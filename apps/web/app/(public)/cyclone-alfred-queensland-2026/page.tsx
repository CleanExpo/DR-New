/**
 * BUILD-008: Ex-Tropical Cyclone Alfred — Queensland 2026 (Recovery)
 *
 * TC Alfred made landfall Gold Coast, QLD, 7 March 2026 (Cat 1).
 * PERILS fourth and final industry loss estimate: AU$1.877bn (published April 2026).
 * 132,000 claims. ARPC cyclone reinsurance pool cumulative payments >$1B.
 *
 * Pre-Deploy Checklist:
 * G1 ✅ ICA Significant Event declared for TC Alfred 2026.
 *       Source: https://insurancecouncil.com.au/news-hub/current-catastrophes/
 * G2 ✅ Affected LGAs: South East Queensland declared areas (landfall Gold Coast 7 Mar 2026).
 *       Source: https://www.qra.qld.gov.au
 * G3 ✅ Financial assistance: Personal Hardship 27 April 2026 window confirmed.
 *       Structural Assistance Grants up to $80K for eligible homeowners.
 *       Source: https://disaster.qld.gov.au
 * G4 N/A No remote LGAs — all declared areas are accessible SE QLD.
 * G5 ✅ Phase: recovery (TC Alfred made landfall 7 March 2026, recovery ongoing).
 *
 * PERILS sources:
 * - Artemis: https://www.artemis.bm/news/perils-finalises-industry-loss-estimate-for-cyclone-alfred-at-almost-au-1-88bn/
 * - Reinsurance News: https://www.reinsurancene.ws/perils-places-final-industry-loss-estimate-for-cyclone-alfred-at-au-1-877bn/
 * - Insurance News AU: https://www.insurancenews.com.au/local/perils-finalises-alfred-loss-tally-at-1-87-billion
 *
 * ACL s18 compliant — no unverified statistics.
 * Platform guarantee claim EXCLUDED pending GAP-061 legal review.
 * All 5 BUILD-006 ACL compliance fixes applied.
 */

import type { Metadata } from 'next'
import DisasterEventPage from '@/components/public/events/DisasterEventPage'

export const metadata: Metadata = {
  title: 'Cyclone Alfred Queensland 2026 — Insurance Claims & Recovery | NRPG',
  description:
    'Cyclone Alfred hit SE Queensland on 7 March 2026. PERILS final loss estimate AU$1.877bn. 132,000 claims. IICRC-certified restoration contractors for water damage and insurance claims support across all declared LGAs.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cyclone-alfred-queensland-2026',
  },
  openGraph: {
    title: 'Cyclone Alfred QLD 2026 — Insurance Claims & Restoration | NRPG',
    description:
      'AU$1.877bn final industry loss. 132,000 insurance claims. Expert IICRC-certified restoration contractors across SE Queensland — water damage, storm damage, and claims advocacy.',
    url: 'https://disasterrecovery.com.au/cyclone-alfred-queensland-2026',
    type: 'website',
  },
}

export default function CycloneAlfredQLD2026Page() {
  return (
    <DisasterEventPage
      eventName="Alfred"
      eventType="cyclone"
      eventPhase="recovery"
      state="Queensland"
      stateAbbr="QLD"
      year={2026}
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration)"
      slug="cyclone-alfred-queensland-2026"
      metaTitle="Cyclone Alfred Queensland 2026 — Insurance Claims & Recovery | NRPG"
      metaDescription="Cyclone Alfred SE Queensland 2026. PERILS final estimate AU$1.877bn. 132,000 claims. IICRC-certified restoration contractors, insurance claims support, across all declared LGAs."

      // Declared SE QLD LGAs — landfall Gold Coast 7 March 2026 (Cat 1)
      // Source: QRA declared assistance areas
      affectedLGAs={[
        'Gold Coast',
        'Logan',
        'Redland',
        'Brisbane',
        'Moreton Bay',
        'Ipswich',
        'Scenic Rim',
        'Lockyer Valley',
        'Somerset',
        'Sunshine Coast',
        'Noosa',
        'Gympie',
        'Fraser Coast',
        'Bundaberg',
        'Southern Downs',
        'Toowoomba',
      ]}
      remoteLGAs={[]}

      governmentHotline="1800 173 349"

      // Financial assistance programs for TC Alfred 2026 (QLD Government / Services Australia).
      // Extended Personal Hardship window 27 April 2026 confirmed.
      financialAssistance={[
        {
          name: 'Structural Assistance Grant',
          provider: 'Queensland Government',
          description:
            'For repair of a disaster-damaged dwelling to make it safe and habitable. Available to homeowners affected by Cyclone Alfred in declared LGAs.',
          amounts: 'Up to $80,000',
          applicationUrl: 'https://disaster.qld.gov.au',
          hotline: '1800 173 349',
        },
        {
          name: 'Personal Hardship Assistance',
          provider: 'Queensland Government',
          description:
            'Financial support for essential needs including temporary accommodation, essential household items, and emergency food and clothing for individuals and families in declared LGAs.',
          deadline: '27 April 2026',
          applicationUrl: 'https://disaster.qld.gov.au',
          hotline: '1800 173 349',
        },
        {
          name: 'Australian Government Disaster Recovery Payment',
          provider: 'Services Australia',
          description:
            'One-off payment for eligible adults and children seriously affected by Cyclone Alfred. For those whose homes were destroyed, severely damaged, or who suffered serious injury.',
          amounts: '$1,000 per eligible adult | $400 per eligible child',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-payment',
          hotline: '180 22 66',
        },
        {
          name: 'Disaster Recovery Allowance',
          provider: 'Services Australia',
          description:
            'Income support for employees, primary producers, and sole traders who lost income as a direct result of Cyclone Alfred. Up to 13 weeks of income support.',
          amounts: 'Up to 13 weeks of income support',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-allowance',
          hotline: '180 22 66',
        },
        {
          name: 'QRIDA Business Recovery Assistance',
          provider: 'Queensland Rural and Industry Development Authority',
          description:
            'Low-interest loans and grants available to eligible small businesses and primary producers impacted by Cyclone Alfred in declared LGAs.',
          applicationUrl: 'https://www.qrida.qld.gov.au',
          hotline: '1800 623 946',
        },
      ]}

      governmentApplicationUrl="https://disaster.qld.gov.au"
      governmentApplicationLabel="Apply at disaster.qld.gov.au"
    />
  )
}
