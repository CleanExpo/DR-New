import { LocationPageTemplate, LocationData } from '@/components/templates/LocationPageTemplate';
import { Home, Users, Droplets, Shield } from 'lucide-react';

const springfieldLakesData: LocationData = {
  name: 'Springfield Lakes',
  slug: 'springfield-lakes',
  description: '24/7 emergency disaster recovery in Springfield Lakes Ipswich. IICRC Master Restorer specializing in modern residential properties. Water damage, fire damage, storm restoration. 60-minute response.',
  heroImage: '/images/suburbs/karalee-ipswich-storm-damage-repair.webp',
  heroImageAlt: 'Springfield Lakes Ipswich emergency restoration services - IICRC Master Restorer water damage fire damage specialists - 60-minute response Springfield Lakes Queensland',
  coordinates: { lat: -27.6694, lng: 152.9219 },
  responseTime: '60-Minute',
  neighborhoods: ['Springfield Lakes', 'Springfield Central', 'Augustine Heights', 'Brookwater'],
  faqs: [
    {
      question: "Do you service Springfield Lakes residential properties?",
      answer: "Yes! We provide emergency restoration for all Springfield Lakes properties including houses, townhouses, and apartments. Our team has extensive experience with modern residential construction."
    },
    {
      question: "How quickly can you respond to Springfield Lakes?",
      answer: "We provide 60-minute emergency response to Springfield Lakes and surrounding Ipswich areas. Our strategic location enables rapid deployment to minimize damage."
    },
    {
      question: "Can you handle storm water damage?",
      answer: "Absolutely. Springfield Lakes can experience severe storms and flash flooding. We provide rapid water extraction, structural drying, and complete storm damage restoration."
    }
  ],
  statsOverride: {
    propertiesRestored: '80+',
    responseTime: '<60min',
    availability: '24/7',
  },
};

export default function SpringfieldLakesPage() {
  return <LocationPageTemplate data={springfieldLakesData} />;
}

export const metadata = {
  title: 'Springfield Lakes Emergency Restoration | Water Damage Ipswich | IICRC Master Restorer',
  description: '60-min emergency response Springfield Lakes Ipswich. IICRC Master Restorer. Modern residential specialists. Water damage, fire damage, storm restoration. Call 1300 309 361.',
};
