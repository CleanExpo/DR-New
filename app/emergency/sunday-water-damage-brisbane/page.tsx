import React from 'react';
import { Metadata } from 'next';
import EmergencyServicePage from '@/components/emergency/EmergencyServicePage';

export const metadata: Metadata = {
  title: 'Sunday Water Damage Brisbane - Emergency 24/7 Response | Open Sundays',
  description: 'Water damage emergency on Sunday in Brisbane? We\'re OPEN and responding NOW! 24/7 Sunday water damage restoration. No weekend surcharges. Call 1300 309 361.',
  keywords: 'sunday water damage brisbane, weekend water damage emergency, open sunday restoration, sunday flood repair, weekend emergency plumber brisbane',
  openGraph: {
    title: 'OPEN SUNDAY - Emergency Water Damage Brisbane | Immediate Response',
    description: 'Don\'t wait until Monday! Sunday water damage restoration available NOW in Brisbane. Same-day response, insurance approved.',
    images: ['/images/emergency/sunday-water-damage.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: 'https://disaster-recovery-seven.vercel.app/emergency/sunday-water-damage-brisbane'
  }
};

export default function SundayWaterDamageBrisbanePage() {
  return (
    <EmergencyServicePage
      title="Sunday Water Damage Emergency Brisbane"
      subtitle="YES, We're OPEN Sunday! Responding to Emergencies NOW"
      emergencyType="sunday"
      service="water-damage"
      location="Brisbane"
      urgencyMessage="Don't let water damage get worse over the weekend. We're working RIGHT NOW!"
      responseTime="45 minutes"
      availability="Working Sundays since 1987"
      features={[
        'NO weekend surcharges - same rates as weekdays',
        'Full crew available Sundays',
        'Insurance claims processed on Sunday',
        'Emergency extraction teams on standby',
        'Sunday drying equipment delivery',
        'Property managers love our Sunday service'
      ]}
      testimonials={[
        {
          author: 'Sarah M.',
          location: 'New Farm',
          content: 'Pipe burst Sunday morning. They were here before lunch and saved our hardwood floors!',
          time: 'Last Sunday'
        },
        {
          author: 'Mike D.',
          location: 'West End',
          content: 'Most companies said call back Monday. These guys arrived in 30 minutes on Sunday afternoon.',
          time: '2 Sundays ago'
        }
      ]}
      competitors={[
        { name: 'Competitor A', sundayService: false, responseTime: 'Monday only' },
        { name: 'Competitor B', sundayService: true, responseTime: '6+ hours', surcharge: '+100%' },
        { name: 'Us', sundayService: true, responseTime: '45 mins', surcharge: 'No surcharge', highlighted: true }
      ]}
      faqs={[
        {
          question: 'Are you really open on Sundays?',
          answer: 'YES! We have full crews working every Sunday. No reduced service, no delays. We treat Sunday emergencies with the same urgency as any other day.'
        },
        {
          question: 'Do you charge extra for Sunday call-outs?',
          answer: 'NO! We never charge weekend surcharges. Same transparent pricing 7 days a week. Your emergency doesn\'t wait for business hours, neither do we.'
        },
        {
          question: 'Can you handle insurance claims on Sunday?',
          answer: 'Absolutely! Our insurance team works Sundays too. We\'ll photograph everything, document the damage, and submit your claim immediately.'
        },
        {
          question: 'What time do you start on Sundays?',
          answer: 'We\'re available 24/7 including Sundays. Early morning, late night - whenever disaster strikes, we respond.'
        }
      ]}
    />
  );
}