import { LocationPageTemplate, LocationData } from '@/components/templates/LocationPageTemplate';
import { Home, Award, Droplets, Shield } from 'lucide-react';

const brookwaterData: LocationData = {
  name: 'Brookwater',
  slug: 'brookwater',
  description: '24/7 emergency disaster recovery in Brookwater Ipswich. IICRC Master Restorer specializing in prestige golf course properties. Water damage, fire damage, flood restoration. 60-minute response.',
  heroImage: '/images/suburbs/karalee-ipswich-storm-damage-repair.webp',
  heroImageAlt: 'Brookwater Ipswich emergency restoration services - IICRC Master Restorer water damage fire damage specialists - 60-minute response Brookwater golf course properties Queensland',
  coordinates: { lat: -27.6544, lng: 152.8872 },
  responseTime: '60-Minute',
  neighborhoods: ['Brookwater', 'Springfield Lakes', 'Augustine Heights', 'Spring Mountain'],
  faqs: [
    {
      question: "Do you service Brookwater golf course properties?",
      answer: "Yes! We specialize in Brookwater's prestige golf course properties with experience in high-value homes, premium finishes, and luxury features requiring master-level restoration."
    },
    {
      question: "How quickly can you respond to Brookwater emergencies?",
      answer: "We provide 60-minute emergency response to Brookwater and surrounding Springfield/Ipswich areas. Rapid deployment protects your property investment."
    },
    {
      question: "Can you handle water damage in luxury homes?",
      answer: "Absolutely. We specialize in high-value properties with premium finishes, imported materials, and architectural features. Our IICRC Master Restorer has extensive luxury home experience."
    }
  ],
  statsOverride: {
    propertiesRestored: '45+',
    responseTime: '<60min',
    availability: '24/7',
  },
};

export default function BrookwaterPage() {
  return <LocationPageTemplate data={brookwaterData} />;
}

export const metadata = {
  title: 'Brookwater Emergency Restoration | Water Damage Ipswich | IICRC Master Restorer',
  description: '60-min emergency response Brookwater Ipswich. IICRC Master Restorer. Golf course property specialists. Water damage, fire damage, flood restoration. Call 1300 309 361.',
};
