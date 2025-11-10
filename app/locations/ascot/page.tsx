import { LocationPageTemplate, LocationData } from '@/components/templates/LocationPageTemplate';
import { GEO_COORDS } from '@/components/seo/StructuredData';
import { Home, Trophy, Droplets, Shield } from 'lucide-react';

const ascotData: LocationData = {
  name: 'Ascot',
  slug: 'ascot',
  description: '24/7 emergency disaster recovery in Ascot Brisbane. IICRC Master Restorer specializing in prestige properties near the racecourse. Water damage, fire damage, flood restoration. 60-minute response.',
  heroImage: '/images/suburbs/ascot-commercial-water-damage-restoration.webp',
  heroImageAlt: 'Ascot Brisbane emergency restoration services - IICRC Master Restorer water damage fire damage specialists - 60-minute response Ascot racecourse area Queensland',
  coordinates: GEO_COORDS.ascot,
  responseTime: '60-Minute',
  neighborhoods: ['Ascot', 'Hamilton', 'Eagle Farm', 'Clayfield'],
  faqs: [
    {
      question: "Do you provide emergency restoration for Ascot Racecourse area homes?",
      answer: "Yes! We provide 60-minute emergency response to all Ascot properties including the prestigious racecourse area. Our IICRC Master Restorer has extensive experience with Ascot's high-value Queenslander homes and modern prestige properties."
    },
    {
      question: "What makes Ascot properties unique for restoration?",
      answer: "Ascot features a mix of heritage Queenslanders and modern luxury homes, often on valuable land near the racecourse. These properties require master-level restoration expertise. We specialize in preserving heritage features while using modern restoration techniques."
    },
    {
      question: "Can you handle water damage from storms in Ascot?",
      answer: "Absolutely. Ascot's location makes it susceptible to storm water damage. We provide rapid response with industrial water extraction equipment, thermal imaging for moisture detection, and complete structural drying to prevent secondary damage."
    }
  ],
  uniqueFeatures: [
    {
      icon: Home,
      title: 'Heritage Property Specialists',
      description: 'Expert restoration for Ascot\'s iconic Queenslander homes, preserving architectural heritage while implementing modern restoration techniques.',
    },
    {
      icon: Trophy,
      title: 'Racecourse Area Expertise',
      description: 'Specialized knowledge of properties near Ascot Racecourse with unique construction and high-value finishes requiring master-level care.',
    },
    {
      icon: Droplets,
      title: 'Storm & Flood Recovery',
      description: 'Comprehensive water damage and flood restoration expertise for Ascot\'s storm-susceptible areas with rapid emergency response.',
    },
    {
      icon: Shield,
      title: 'Premium Insurance Claims',
      description: 'Experienced with high-value insurance claims for Ascot\'s prestige properties, ensuring maximum coverage and professional documentation.',
    },
  ],
  statsOverride: {
    propertiesRestored: '75+',
    responseTime: '<60min',
    availability: '24/7',
  },
};

export default function AscotPage() {
  return <LocationPageTemplate data={ascotData} />;
}

export const metadata = {
  title: 'Ascot Emergency Restoration | Water Damage Brisbane | IICRC Master Restorer',
  description: '60-min emergency response Ascot Brisbane. IICRC Master Restorer. Racecourse area specialists. Water damage, fire damage, storm restoration. Call 1300 309 361.',
};
