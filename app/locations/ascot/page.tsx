'use client';

import { motion } from 'framer-motion';
import { FluidEmergencyBanner } from '@/components/fluid-cta/FluidEmergencyBanner';
import { FluidFloatingCTA } from '@/components/fluid-cta/FluidFloatingCTA';
import { FluidCTA } from '@/components/fluid-cta/FluidCTA';
import { MapPin, Clock, Shield, Award, CheckCircle2, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import StructuredData, { GEO_COORDS } from '@/components/seo/StructuredData';

export default function AscotPage() {
  const faqs = [
    {
      question: "Do you provide emergency restoration for Ascot Racecourse area homes?",
      answer: "Yes! We provide 60-minute emergency response to all Ascot properties including the prestigious racecourse area. Our IICRC Master Restorer has extensive experience with Ascot's high-value Queenslander homes and modern prestige properties."
    },
    {
      question: "What makes Ascot properties unique for restoration?",
      answer: "Ascot features a mix of heritage Queenslanders and modern luxury homes, often on valuable land near the racecourse. These properties require master-level restoration expertise. We specialize in preserving heritage features while using modern restoration techniques."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        page="location"
        location={{
          locationName: "Ascot",
          suburb: "Ascot",
          coordinates: GEO_COORDS.ascot,
          description: "24/7 emergency disaster recovery in Ascot Brisbane. IICRC Master Restorer specializing in prestige properties near the racecourse. Water damage, fire damage, flood restoration. 60-minute response.",
          serviceRadius: "5000"
        }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", url: "https://disasterrecovery.com.au" },
          { name: "Locations", url: "https://disasterrecovery.com.au/locations" },
          { name: "Ascot", url: "https://disasterrecovery.com.au/locations/ascot" }
        ]}
      />

      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Emergency Restoration Ascot - 60-Min Response"
        sticky
      />

      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Ascot Emergency Restoration</h1>
        <p className="text-xl mb-8">24/7 Water Damage, Fire Damage, Flood Restoration</p>
        <FluidCTA
          text="Call 1300 309 361"
          href="tel:1300309361"
          variant="emergency"
          size="xl"
          icon="phone"
          magnetic
          ripple
          pulse
        />
      </section>

      <FluidFloatingCTA
        phone="1300 309 361"
        showAfterScroll={400}
        position="bottom-right"
      />
    </div>
  );
}
