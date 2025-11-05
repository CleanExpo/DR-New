// GMB Image Posts Configuration
// These images will be automatically posted to Google My Business

export const GMB_IMAGE_POSTS = [
  {
    week: 1,
    posts: [
      {
        day: 'Monday',
        image: '/images/suburbs/hamilton-luxury-property-water-damage-restoration.png',
        caption: '🏆 Hamilton Luxury Property Restoration - Our Master Restorer certified team responding to water damage emergency. 60-minute response guaranteed! Call 1300 309 361',
        hashtags: ['#HamiltonBrisbane', '#WaterDamage', '#MasterRestorer', '#LuxuryProperty'],
        callToAction: 'CALL',
        location: 'Hamilton'
      },
      {
        day: 'Wednesday',
        image: '/images/suburbs/ascot-emergency-flood-damage-repair.png',
        caption: '💼 Ascot Emergency Response - IICRC certified technicians on-site for flood damage restoration. Insurance approved with direct billing. Available 24/7!',
        hashtags: ['#AscotBrisbane', '#FloodDamage', '#EmergencyResponse', '#InsuranceApproved'],
        callToAction: 'LEARN_MORE',
        location: 'Ascot'
      },
      {
        day: 'Friday',
        image: '/images/services/commercial-storm-damage-ascot-brisbane.png',
        caption: '🏢 Commercial Storm Damage Specialists - Minimizing business downtime for Brisbane CBD and Ascot properties. One of Queensland\'s limited Master Restorers.',
        hashtags: ['#CommercialRestoration', '#BrisbaneCBD', '#StormDamage', '#BusinessContinuity'],
        callToAction: 'CALL',
        location: 'Brisbane CBD'
      }
    ]
  },
  {
    week: 2,
    posts: [
      {
        day: 'Monday',
        image: '/images/services/atp-testing-moisture-detection-new-farm.png',
        caption: '🔬 Advanced ATP Testing in New Farm - Scientific approach to moisture detection ensures complete restoration. Trust the experts with Master Restorer certification!',
        hashtags: ['#NewFarm', '#ATPTesting', '#MoistureDetection', '#ScientificRestoration'],
        callToAction: 'LEARN_MORE',
        location: 'New Farm'
      },
      {
        day: 'Wednesday',
        image: '/images/suburbs/karalee-ipswich-storm-damage-repair.png',
        caption: '⛈️ Karalee & Springfield Lakes Storm Response - Protecting Ipswich luxury properties with rapid emergency restoration. $20M liability insurance for your peace of mind.',
        hashtags: ['#Karalee', '#SpringfieldLakes', '#IpswichQLD', '#StormDamage'],
        callToAction: 'CALL',
        location: 'Ipswich'
      },
      {
        day: 'Friday',
        image: '/images/suburbs/hamilton-water-damage-emergency-response.png',
        caption: '🚨 Hamilton 24/7 Emergency Ready - Water damage strikes without warning. Our Master Restorer team guarantees 60-minute response. Call 1300 309 361 NOW!',
        hashtags: ['#Hamilton4007', '#EmergencyResponse', '#WaterDamageRepair', '#24Hour'],
        callToAction: 'CALL',
        location: 'Hamilton'
      }
    ]
  },
  {
    week: 3,
    posts: [
      {
        day: 'Monday',
        image: '/images/suburbs/ascot-commercial-water-damage-restoration.png',
        caption: '💼 Ascot Commercial Water Damage Experts - Protecting office buildings and retail spaces. Direct insurance billing available. Business continuity is our priority!',
        hashtags: ['#AscotCommercial', '#WaterDamage', '#BusinessRecovery', '#DirectBilling'],
        callToAction: 'LEARN_MORE',
        location: 'Ascot'
      },
      {
        day: 'Wednesday',
        image: '/images/suburbs/new-farm-commercial-storm-damage-recovery.png',
        caption: '🏢 New Farm Commercial Recovery - Storm damage restoration for businesses. minimise downtime with our rapid response team. Master Restorer certified excellence.',
        hashtags: ['#NewFarmBusiness', '#StormRecovery', '#CommercialProperty', '#RapidResponse'],
        callToAction: 'CALL',
        location: 'New Farm'
      },
      {
        day: 'Friday',
        image: '/images/suburbs/ascot-storm-damage-restoration-services.png',
        caption: '⛈️ Ascot Storm Season Ready - Our emergency response team is on standby 24/7. One of a limited number of Master Restorers in Queensland. Your property is protected!',
        hashtags: ['#AscotQLD', '#StormSeason', '#EmergencyReady', '#MasterRestorer'],
        callToAction: 'CALL',
        location: 'Ascot'
      }
    ]
  },
  {
    week: 4,
    posts: [
      {
        day: 'Monday',
        image: '/images/services/ascot-commercial-property-storm-restoration.png',
        caption: '🏆 Complete Commercial Restoration - From water damage to full recovery. Brisbane CBD, Ascot, and surrounding areas. Insurance approved with $20M liability coverage.',
        hashtags: ['#CommercialRestoration', '#CompleteRecovery', '#InsuranceCovered', '#Brisbane'],
        callToAction: 'LEARN_MORE',
        location: 'Brisbane'
      },
      {
        day: 'Wednesday',
        image: '/images/phill-mcgurk-iicrc-certification.png',
        caption: '🏅 Master Restorer Certified - Phill McGurk and team bring elite expertise to every restoration. One of a limited number in Queensland. Excellence in every project!',
        hashtags: ['#MasterRestorer', '#IICRCCertified', '#EliteRestoration', '#Queensland'],
        callToAction: 'LEARN_MORE',
        location: 'Brisbane'
      },
      {
        day: 'Friday',
        image: '/images/commercial-management-brisbane.png',
        caption: '📊 Commercial Management Excellence - Complete disaster recovery solutions for Brisbane businesses. 24/7 response, direct billing, business continuity focus.',
        hashtags: ['#CommercialManagement', '#DisasterRecovery', '#BrisbaneBusiness', '#24HourService'],
        callToAction: 'CALL',
        location: 'Brisbane CBD'
      }
    ]
  }
];

// Function to get today's post
export function getTodaysGMBImagePost() {
  const today = new Date();
  const weekOfMonth = Math.ceil(today.getDate() / 7);
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

  const weekPosts = GMB_IMAGE_POSTS[Math.min(weekOfMonth - 1, 3)];
  return weekPosts.posts.find(post => post.day === dayName) || weekPosts.posts[0];
}

// Generate location-specific variations
export function generateLocationVariation(basePost: any, location: string) {
  const locationVariations = {
    'Hamilton': 'Servicing Hamilton, Portside, Racecourse Road, and surrounding luxury estates',
    'Ascot': 'Protecting Ascot, Eagle Farm, Clayfield premium properties',
    'New Farm': 'New Farm, Teneriffe, and Fortitude Valley rapid response',
    'Brisbane CBD': 'Brisbane CBD, South Brisbane, and Spring Hill commercial specialists',
    'Ipswich': 'Springfield Lakes, Brookwater, Karalee luxury property experts',
    'Logan': 'Springwood, Underwood, Shailer Park emergency response'
  };

  return {
    ...basePost,
    caption: `${basePost.caption} ${locationVariations[location] || ''}`,
    location: location
  };
}

// Rotation schedule for continuous posting
export const IMAGE_POST_ROTATION = {
  schedule: 'MWF', // Monday, Wednesday, Friday
  times: ['09:00', '12:00', '15:00'],
  priorityLocations: ['Hamilton', 'Ascot', 'New Farm', 'Brisbane CBD'],
  secondaryLocations: ['Springfield Lakes', 'Karalee', 'Logan'],

  getNextPost: function() {
    const posts = GMB_IMAGE_POSTS.flatMap(week => week.posts);
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
  }
};