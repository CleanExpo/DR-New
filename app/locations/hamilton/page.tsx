import { LocationPageTemplate, LocationData } from '@/components/templates/LocationPageTemplate';
import { GEO_COORDS } from '@/components/seo/StructuredData';
import { Home, Droplets, Building2, Shield } from 'lucide-react';

const hamiltonData: LocationData = {
  name: 'Hamilton',
  slug: 'hamilton',
  description: '24/7 emergency disaster recovery in Hamilton Brisbane. IICRC Master Restorer specializing in Queenslander homes. Water damage, fire damage, flood restoration. 60-minute response to this premium riverside suburb.',
  heroImage: '/images/suburbs/hamilton-luxury-property-water-damage-restoration.webp',
  heroImageAlt: 'Hamilton Brisbane emergency disaster restoration by IICRC Master Restorer Phill McGurk - luxury riverside property water damage fire damage flood recovery specialists - 60-minute response Hamilton Ascot New Farm Queensland',
  coordinates: GEO_COORDS.hamilton,
  responseTime: '60-Minute',
  neighborhoods: ['Hamilton', 'Ascot', 'New Farm', 'Clayfield'],
  faqs: [
    {
      question: "How quickly can you respond to emergencies in Hamilton?",
      answer: "We provide 60-minute emergency response to Hamilton and surrounding Brisbane riverside suburbs. Our team is based in Wacol with direct access to Hamilton via the Centenary Highway and Story Bridge."
    },
    {
      question: "Do you specialize in Queenslander homes in Hamilton?",
      answer: "Yes! Our IICRC Master Restorer has extensive experience with Hamilton's heritage Queenslander homes. We understand the unique construction, elevated designs, timber features, and specific restoration requirements of these high-value properties."
    },
    {
      question: "What makes Hamilton properties unique for disaster restoration?",
      answer: "Hamilton's riverside location means higher flood risk, heritage Queenslander construction requires specialized knowledge, and high property values demand master-level restoration expertise. We're one of the few Brisbane companies with IICRC Master Restorer certification specifically experienced in Hamilton properties."
    }
  ],
  uniqueFeatures: [
    {
      icon: Home,
      title: 'Heritage Queenslanders',
      description: 'Specialized restoration for Hamilton\'s iconic heritage homes with traditional VJ walls, tongue-and-groove flooring, and historic architectural details.',
    },
    {
      icon: Building2,
      title: 'Modern Luxury Estates',
      description: 'Expert care for contemporary Hamilton properties featuring premium finishes, imported materials, and high-end architectural elements.',
    },
    {
      icon: Droplets,
      title: 'Riverside Flood Recovery',
      description: 'Comprehensive flood restoration expertise specific to Brisbane River proximity, including rapid water extraction and structural drying.',
    },
    {
      icon: Shield,
      title: 'High-Value Insurance Claims',
      description: 'Experienced in working with premium insurance policies for Hamilton\'s high-value properties, ensuring maximum coverage and professional documentation.',
    },
  ],
  statsOverride: {
    propertiesRestored: '100+',
    responseTime: '<60min',
    availability: '24/7',
  },
};

export default function HamiltonPage() {
  return <LocationPageTemplate data={hamiltonData} />;
}

export const metadata = {
  title: 'Hamilton Emergency Restoration | Water Damage Brisbane | IICRC Master Restorer',
  description: '60-min emergency response Hamilton Brisbane. IICRC Master Restorer. Queenslander specialists. Water damage, fire damage, flood restoration. Call 1300 309 361.',
};
