import { LocationPageTemplate, LocationData } from '@/components/templates/LocationPageTemplate';
import { GEO_COORDS } from '@/components/seo/StructuredData';
import { Home, TreesIcon as Trees, Droplets, Shield } from 'lucide-react';

const karaleeData: LocationData = {
  name: 'Karalee',
  slug: 'karalee',
  description: '24/7 emergency disaster recovery in Karalee Ipswich. IICRC Master Restorer specializing in prestige acreage properties. Water damage, fire damage, storm restoration. 60-minute response.',
  heroImage: '/images/suburbs/karalee-ipswich-storm-damage-repair.webp',
  heroImageAlt: 'Karalee Ipswich emergency storm damage restoration services - IICRC Master Restorer water damage fire damage specialists - 60-minute response Karalee prestige properties Queensland',
  coordinates: { lat: -27.6089, lng: 152.7847 },
  responseTime: '60-Minute',
  neighborhoods: ['Karalee', 'Brookwater', 'Springfield Lakes', 'Bellbird Park'],
  faqs: [
    {
      question: "Do you service large acreage properties in Karalee?",
      answer: "Yes! We specialize in Karalee's prestige acreage properties with equipment and expertise for large homes, outbuildings, and rural features. Our team handles properties of all sizes."
    },
    {
      question: "How quickly can you respond to Karalee?",
      answer: "We provide 60-minute emergency response to Karalee and surrounding Ipswich areas. Our location enables rapid deployment to protect your property investment."
    },
    {
      question: "Can you handle storm damage to large properties?",
      answer: "Absolutely. Karalee's elevated location can experience severe storms. We provide emergency roof tarping, structural repairs, and complete storm damage restoration for acreage properties."
    }
  ],
  statsOverride: {
    propertiesRestored: '60+',
    responseTime: '<60min',
    availability: '24/7',
  },
};

export default function KaraleePage() {
  return <LocationPageTemplate data={karaleeData} />;
}

export const metadata = {
  title: 'Karalee Emergency Restoration | Water Damage Ipswich | IICRC Master Restorer',
  description: '60-min emergency response Karalee Ipswich. IICRC Master Restorer. Acreage property specialists. Water damage, fire damage, storm restoration. Call 1300 309 361.',
};
