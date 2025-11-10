import { LocationPageTemplate, LocationData } from '@/components/templates/LocationPageTemplate';
import { GEO_COORDS } from '@/components/seo/StructuredData';
import { Building2, Home, Droplets, Shield } from 'lucide-react';

const newFarmData: LocationData = {
  name: 'New Farm',
  slug: 'new-farm',
  description: '24/7 emergency disaster recovery in New Farm Brisbane. IICRC Master Restorer specializing in heritage homes and modern apartments. Water damage, fire damage, flood restoration. 60-minute response.',
  heroImage: '/images/suburbs/new-farm-commercial-storm-damage-recovery.webp',
  heroImageAlt: 'New Farm Brisbane emergency restoration services - IICRC Master Restorer water damage fire damage storm recovery specialists - 60-minute response New Farm riverside Queensland',
  coordinates: GEO_COORDS.newFarm,
  responseTime: '60-Minute',
  neighborhoods: ['New Farm', 'Teneriffe', 'Fortitude Valley', 'Newstead'],
  faqs: [
    {
      question: "Do you service New Farm apartments and units?",
      answer: "Yes! We provide emergency restoration for all New Farm properties including apartments, townhouses, and heritage homes. Our team has specialized experience with multi-level buildings, body corporate coordination, and high-density residential restoration."
    },
    {
      question: "Can you handle water damage in New Farm high-rises?",
      answer: "Absolutely. We have extensive experience with apartment water damage including top-floor leaks affecting multiple levels. We coordinate with body corporate, manage insurance claims, and minimize disruption to residents."
    },
    {
      question: "How quickly can you respond to New Farm emergencies?",
      answer: "We provide 60-minute emergency response to New Farm and surrounding Brisbane riverside suburbs. Our strategic location enables rapid deployment to minimize damage and begin immediate restoration."
    }
  ],
  uniqueFeatures: [
    {
      icon: Building2,
      title: 'Apartment & Unit Specialists',
      description: 'Expert restoration for New Farm\'s high-density residential buildings with body corporate coordination and multi-level damage management.',
    },
    {
      icon: Home,
      title: 'Heritage Home Restoration',
      description: 'Specialized care for New Farm\'s iconic Queenslander and federation homes, preserving historical features with modern restoration techniques.',
    },
    {
      icon: Droplets,
      title: 'Riverside Property Expertise',
      description: 'Comprehensive flood and water damage restoration for New Farm\'s riverside location with rapid response and structural drying expertise.',
    },
    {
      icon: Shield,
      title: 'Body Corporate Coordination',
      description: 'Experienced in working with strata managers and body corporates for seamless insurance claims and restoration approvals.',
    },
  ],
  statsOverride: {
    propertiesRestored: '150+',
    responseTime: '<60min',
    availability: '24/7',
  },
};

export default function NewFarmPage() {
  return <LocationPageTemplate data={newFarmData} />;
}

export const metadata = {
  title: 'New Farm Emergency Restoration | Water Damage Brisbane | IICRC Master Restorer',
  description: '60-min emergency response New Farm Brisbane. IICRC Master Restorer. Apartment & heritage home specialists. Water damage, fire damage, flood restoration. Call 1300 309 361.',
};
