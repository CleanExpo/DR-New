import { LocationPageTemplate, LocationData } from '@/components/templates/LocationPageTemplate';
import { GEO_COORDS } from '@/components/seo/StructuredData';
import { Home, Droplets, Building2, Shield } from 'lucide-react';

const toowongData: LocationData = {
  name: 'Toowong',
  slug: 'toowong',
  description: '24/7 emergency disaster recovery in Toowong Brisbane. IICRC Master Restorer specializing in inner-west Brisbane properties. Water damage, fire damage, storm restoration. 60-minute response.',
  heroImage: '/images/suburbs/hamilton-water-damage-emergency-response.webp',
  heroImageAlt: 'Toowong Brisbane emergency restoration services - IICRC Master Restorer water damage fire damage specialists - 60-minute response Toowong inner-west Queensland',
  coordinates: GEO_COORDS.toowong,
  responseTime: '60-Minute',
  neighborhoods: ['Toowong', 'Taringa', 'Auchenflower', 'Indooroopilly'],
  faqs: [
    {
      question: "How quickly can you respond to Toowong emergencies?",
      answer: "We provide 60-minute emergency response to Toowong and surrounding inner-west Brisbane suburbs. Our strategic location enables rapid deployment to minimize damage."
    },
    {
      question: "Do you service Toowong Village area properties?",
      answer: "Yes! We provide emergency restoration for all Toowong properties including apartments, townhouses, and houses near Toowong Village, the Brisbane River, and surrounding areas."
    },
    {
      question: "Can you handle water damage from Brisbane River flooding?",
      answer: "Absolutely. Toowong's proximity to the Brisbane River means flood risk. We have extensive experience with river flooding, rapid water extraction, and complete flood restoration."
    }
  ],
  statsOverride: {
    propertiesRestored: '120+',
    responseTime: '<60min',
    availability: '24/7',
  },
};

export default function ToowongPage() {
  return <LocationPageTemplate data={toowongData} />;
}

export const metadata = {
  title: 'Toowong Emergency Restoration | Water Damage Brisbane | IICRC Master Restorer',
  description: '60-min emergency response Toowong Brisbane. IICRC Master Restorer. Inner-west specialists. Water damage, fire damage, storm restoration. Call 1300 309 361.',
};
