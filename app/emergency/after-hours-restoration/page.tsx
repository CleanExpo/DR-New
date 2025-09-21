import React from 'react';
import { Metadata } from 'next';
import EmergencyServicePage from '@/components/emergency/EmergencyServicePage';

export const metadata: Metadata = {
  title: 'After Hours Emergency Restoration Brisbane - 24/7 Night Service',
  description: 'After hours emergency restoration in Brisbane. Available 24/7 including nights and early mornings. No after-hours surcharges. Immediate response. Call 1300 309 361.',
  keywords: 'after hours restoration brisbane, night emergency water damage, 24 hour flood repair, midnight restoration service, early morning emergency',
  openGraph: {
    title: 'After Hours Emergency Restoration - Available NOW in Brisbane',
    description: 'Don\'t wait until morning! 24/7 after-hours emergency restoration. Full crews available all night.',
    images: ['/images/emergency/after-hours.jpg'],
    type: 'website',
  }
};

export default function AfterHoursRestorationPage() {
  return (
    <EmergencyServicePage
      title="After Hours Emergency Restoration"
      subtitle="24/7 Service - Nights, Early Mornings, Whenever You Need Us"
      emergencyType="after-hours"
      service="emergency-restoration"
      location="Brisbane"
      urgencyMessage="It's 2am and you have water everywhere? We're awake and ready to help!"
      responseTime="30 minutes"
      availability="24/7/365 including nights"
      features={[
        'Full crews available all night - not just on-call',
        'Same professional service at 3am as 3pm',
        'No after-hours surcharges ever',
        'Night shift supervisors on duty',
        'Emergency equipment ready to deploy',
        '24-hour insurance claim processing'
      ]}
      testimonials={[
        {
          author: 'David L.',
          location: 'South Brisbane',
          content: 'Pipe burst at midnight. They arrived at 12:45am with full crew and equipment. Incredible!',
          time: 'Last Tuesday 12:45am'
        },
        {
          author: 'Karen W.',
          location: 'Woolloongabba',
          content: '3am storm damage call, 3:30am they were tarping our roof. Saved our entire home.',
          time: 'Last week 3am'
        },
        {
          author: 'Tony R.',
          location: 'Kangaroo Point',
          content: 'Restaurant flooded at 11pm. They worked all night and we opened for breakfast!',
          time: '5 days ago'
        }
      ]}
      faqs={[
        {
          question: 'Do you really work all night?',
          answer: 'YES! We have dedicated night shift crews working from 6pm to 6am every single night. This isn\'t an answering service - it\'s full emergency response teams ready to deploy immediately.'
        },
        {
          question: 'Is the quality the same at night?',
          answer: 'Absolutely! Our night crews are fully trained professionals with the same certifications and equipment as day crews. Many customers say our night service is even better because we can work uninterrupted.'
        },
        {
          question: 'Do you charge more for after-hours calls?',
          answer: 'NEVER! We believe emergencies don\'t check the clock, so neither should pricing. Same transparent rates 24/7/365.'
        },
        {
          question: 'How fast can you respond at night?',
          answer: 'Average night response is actually FASTER than daytime - just 30 minutes! Less traffic means we get to you quicker when it matters most.'
        }
      ]}
    />
  );
}