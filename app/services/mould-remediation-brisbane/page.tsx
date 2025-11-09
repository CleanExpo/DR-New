'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  AlertTriangle,
  Shield,
  Award,
  Clock,
  CheckCircle,
  Phone,
  MapPin,
  Home,
  Building2,
  Droplets,
  Wind,
  Thermometer,
  Eye,
  Activity,
  FileText,
  Users,
} from 'lucide-react';
import {
  FluidCTA,
  FluidCTAGroup,
  FluidEmergencyBanner,
  FluidFloatingCTA,
} from '@/components/fluid-cta';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  staggerItem,
  emergencyPulse,
  colors,
  typography,
  spacing,
} from '@/lib/design-system';
import StructuredData from '@/components/seo/StructuredData';

// Metadata will be generated separately - this is a client component
export default function MouldRemediationBrisbanePage() {
  const faqs = [
    {
      question: "How quickly can you respond to mould emergencies in Brisbane?",
      answer: "We provide 60-minute emergency response to Brisbane CBD and inner suburbs including Hamilton, Ascot, New Farm, Toowong, and Indooroopilly. Mould remediation is critical in Brisbane's humid climate - growth accelerates rapidly after water damage. Our IICRC Master Restorer team responds immediately with HEPA filtration and containment equipment."
    },
    {
      question: "What types of mould do you remediate in Brisbane?",
      answer: "We safely remove all mould types including black mould (Stachybotrys), Aspergillus, Penicillium, Cladosporium, and Chaetomium. Our Master Restorer uses IICRC-approved protocols with HEPA filtration, containment barriers, antimicrobial treatment, and air quality testing. Brisbane's subtropical climate creates ideal conditions for toxic mould growth."
    },
    {
      question: "Do you handle insurance claims for mould remediation?",
      answer: "Yes, we work directly with all major insurers including Suncorp, RACQ, Allianz, and QBE. Mould coverage depends on the cause - sudden water damage is typically covered, gradual moisture is not. We provide detailed documentation, moisture reports, air quality testing results, and assessor meetings. Master Restorer certification strengthens claims."
    },
    {
      question: "How long does mould remediation take in Brisbane?",
      answer: "Small mould areas (under 10 square meters) typically take 1-2 days. Large-scale mould contamination or hidden mould colonies can take 3-7 days. Brisbane's humidity requires longer drying times and dehumidification. We use thermal imaging to detect all mould growth and monitor moisture levels daily to ensure complete remediation."
    },
    {
      question: "Is mould dangerous to my health?",
      answer: "Yes, mould exposure can cause serious health issues: respiratory problems, allergic reactions, asthma attacks, headaches, fatigue, and immune system suppression. Black mould (Stachybotrys) produces mycotoxins that are especially dangerous. Children, elderly, and immunocompromised people face higher risks. Professional HEPA-filtered remediation is essential - never DIY mould removal."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        page="service"
        service={{
          name: "Mould Remediation Brisbane",
          description: "Professional mould removal Brisbane. IICRC Master Restorer certified. Black mould remediation, HEPA filtration, air quality testing. 60-minute emergency response. Insurance approved.",
          serviceType: "Mould Remediation Services",
          url: "https://disasterrecovery.com.au/services/mould-remediation-brisbane",
          offers: {
            price: "1200",
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock"
          }
        }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", url: "https://disasterrecovery.com.au" },
          { name: "Services", url: "https://disasterrecovery.com.au/services" },
          { name: "Mould Remediation Brisbane", url: "https://disasterrecovery.com.au/services/mould-remediation-brisbane" }
        ]}
      />

      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="Mould Emergency? 60-Min Response Brisbane - Master Restorer"
        sticky
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Health Risks Section */}
      <HealthRisksSection />

      {/* Mould Types Section */}
      <MouldTypesSection />

      {/* Why Brisbane is Prone to Mould */}
      <BrisbaneClimateSection />

      {/* Remediation Process */}
      <RemediationProcessSection />

      {/* HEPA Filtration & Technology */}
      <TechnologySection />

      {/* Service Areas */}
      <ServiceAreasSection />

      {/* Why Choose Master Restorer */}
      <WhyChooseSection />

      {/* Insurance Coverage */}
      <InsuranceCoverageSection />

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Floating CTA */}
      <FluidFloatingCTA
        phone="1300 309 361"
        showAfterScroll={400}
        position="bottom-right"
      />
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <motion.section
      className="relative min-h-[600px] flex items-center justify-center text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/fire-water-damage-restoration.webp"
          alt="Professional mould remediation Brisbane by IICRC Master Restorer Phill McGurk - black mould removal toxic mould cleanup HEPA filtration air quality testing Brisbane Ipswich Logan Queensland"
          title="Mould Remediation Brisbane | Master Restorer Black Mould Removal | 1300 309 361"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          {/* Emergency Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-700/90 backdrop-blur-sm rounded-full mb-6"
            variants={emergencyPulse}
            animate="animate"
          >
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold text-lg">Mould Health Hazard - Professional Removal Required</span>
          </motion.div>

          {/* Main Heading */}
          <h1
            className="mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Mould Remediation Brisbane
          </h1>

          {/* Subheading */}
          <p className="text-2xl mb-4 text-blue-200 font-semibold">
            IICRC Master Restorer • HEPA Filtration • Air Quality Testing
          </p>

          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            <strong>Phill McGurk - Master Restorer</strong> specializes in safe mould removal including black mould, toxic mould, and hidden mould colonies. HEPA-filtered containment prevents spread. Serving Brisbane, Ipswich, Logan.
          </p>

          {/* CTA Buttons */}
          <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
            <FluidCTA
              text="Call 1300 309 361 Now"
              href="tel:1300309361"
              variant="emergency"
              size="xl"
              icon="phone"
              magnetic
              ripple
              pulse
            />
            <FluidCTA
              text="Free Mould Assessment"
              href="/quote"
              variant="primary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>IICRC Master Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>HEPA Filtration Systems</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>60-Min Emergency Response</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Health Risks Section
function HealthRisksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-full">
            ⚠️ Health Hazard Warning
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Mould Health Risks - Why Professional Removal is Essential
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mould exposure causes serious health problems. Brisbane's humid climate accelerates mould growth. <strong>Never attempt DIY mould removal</strong> - improper handling spreads spores throughout your property.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              icon: Activity,
              title: "Respiratory Issues",
              description: "Asthma attacks, difficulty breathing, chronic coughing, wheezing, throat irritation, nasal congestion. Black mould produces mycotoxins that damage lung tissue. Children and elderly are especially vulnerable.",
              severity: "High Risk",
              color: colors.emergency[600],
            },
            {
              icon: AlertTriangle,
              title: "Allergic Reactions",
              description: "Skin rashes, eye irritation, sneezing, sinus infections, allergic rhinitis. Prolonged mould exposure can develop into chronic allergies requiring ongoing medical treatment.",
              severity: "Medium-High Risk",
              color: '#ea580c',
            },
            {
              icon: Eye,
              title: "Neurological & Immune",
              description: "Headaches, fatigue, dizziness, memory problems, concentration issues, immune system suppression. Toxic black mould (Stachybotrys) mycotoxins can cause severe neurological damage.",
              severity: "Severe Risk",
              color: '#dc2626',
            },
          ].map((risk, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg"
              style={{ borderTop: `4px solid ${risk.color}` }}
            >
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${risk.color}15` }}
              >
                <risk.icon className="w-8 h-8" style={{ color: risk.color }} aria-hidden="true" />
              </div>
              <div
                className="text-sm font-bold mb-2 px-3 py-1 rounded-full inline-block"
                style={{ backgroundColor: `${risk.color}20`, color: risk.color }}
              >
                {risk.severity}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{risk.title}</h3>
              <p className="text-gray-600">{risk.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Don't Risk Your Health - Call IICRC Master Restorer
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Professional mould remediation uses <strong>HEPA filtration, containment barriers, and negative air pressure</strong> to prevent spore spread. DIY mould cleaning releases millions of spores into your home's air, worsening contamination. Our Master Restorer certification ensures safe, complete mould removal.
          </p>
          <FluidCTA
            text="Emergency Mould Removal: 1300 309 361"
            href="tel:1300309361"
            variant="emergency"
            size="lg"
            icon="phone"
            magnetic
            ripple
            pulse
          />
        </motion.div>
      </div>
    </section>
  );
}

// Mould Types Section
function MouldTypesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Common Mould Types in Brisbane Homes & Buildings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Brisbane's subtropical climate creates ideal conditions for multiple mould species
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              name: "Black Mould (Stachybotrys)",
              description: "The most dangerous mould type. Produces mycotoxins causing severe health problems. Appears dark greenish-black, slimy texture. Grows on water-damaged materials: drywall, ceiling tiles, wood. Common after Brisbane floods and water damage. Requires professional HEPA remediation.",
              toxicity: "EXTREMELY TOXIC",
              color: '#000000',
              locations: "Bathrooms, under sinks, flood-damaged areas, ceiling leaks",
            },
            {
              name: "Aspergillus",
              description: "Very common in Brisbane homes. Over 180 species, some producing allergens and mycotoxins. Appears various colors: green, yellow, white, brown. Causes respiratory infections, allergic reactions. Thrives in air conditioning systems, damp walls, water-damaged materials.",
              toxicity: "MODERATE TO HIGH",
              color: '#16a34a',
              locations: "Air conditioners, walls, carpets, dust, insulation",
            },
            {
              name: "Penicillium",
              description: "Blue-green mould common in water-damaged buildings. Musty odor. Spreads rapidly through air. Causes allergies, asthma, respiratory infections. Found on wallpaper, carpets, insulation, mattresses. Brisbane's humidity accelerates growth.",
              toxicity: "MODERATE",
              color: '#0ea5e9',
              locations: "Water-damaged carpets, wallpaper, insulation, food",
            },
            {
              name: "Cladosporium",
              description: "Black or olive-green mould. Grows in cool and warm conditions. Common on fabrics, wood surfaces, bathrooms. Causes hay fever symptoms, asthma attacks, skin infections. Can grow even in low temperatures unlike other moulds.",
              toxicity: "LOW TO MODERATE",
              color: '#6b7280',
              locations: "Fabrics, wooden surfaces, bathrooms, window sills",
            },
          ].map((mould, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-gray-50 rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0"
                  style={{ backgroundColor: mould.color }}
                />
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{mould.name}</h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: mould.toxicity.includes('EXTREME') ? '#dc2626' : mould.toxicity.includes('HIGH') ? '#ea580c' : '#f59e0b',
                      color: 'white'
                    }}
                  >
                    {mould.toxicity}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{mould.description}</p>
              <div className="text-sm text-gray-700">
                <strong>Common Locations:</strong> {mould.locations}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Brisbane Climate Section
function BrisbaneClimateSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <h2
              className="font-bold text-gray-900 mb-4"
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes['4xl'],
                fontWeight: typography.weights.bold,
              }}
            >
              Why Brisbane is a Mould Hotspot
            </h2>
            <p className="text-xl text-gray-600">
              Brisbane's subtropical climate creates perfect conditions for rapid mould growth
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl mb-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <Droplets className="w-12 h-12 mx-auto mb-4" style={{ color: colors.storm[600] }} aria-hidden="true" />
                <div className="text-4xl font-bold text-gray-900 mb-2">60-80%</div>
                <div className="text-sm text-gray-600">Average Humidity</div>
                <p className="text-xs text-gray-500 mt-2">Mould thrives above 60% humidity</p>
              </div>
              <div className="text-center">
                <Thermometer className="w-12 h-12 mx-auto mb-4" style={{ color: '#ea580c' }} aria-hidden="true" />
                <div className="text-4xl font-bold text-gray-900 mb-2">20-30°C</div>
                <div className="text-sm text-gray-600">Year-Round Temps</div>
                <p className="text-xs text-gray-500 mt-2">Ideal mould growth temperature</p>
              </div>
              <div className="text-center">
                <Wind className="w-12 h-12 mx-auto mb-4" style={{ color: '#16a34a' }} aria-hidden="true" />
                <div className="text-4xl font-bold text-gray-900 mb-2">24-48hr</div>
                <div className="text-sm text-gray-600">Mould Growth Starts</div>
                <p className="text-xs text-gray-500 mt-2">After water damage in Brisbane climate</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Brisbane Mould Risk Factors</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Subtropical Humidity",
                    description: "Brisbane's 60-80% average humidity provides constant moisture for mould growth. Summer months (November-March) see even higher humidity levels.",
                  },
                  {
                    title: "Storm Season Flooding",
                    description: "Annual storm season brings flooding to riverside suburbs (Hamilton, Ascot, New Farm, Bulimba). Water damage leads to rapid mould growth within 24-48 hours.",
                  },
                  {
                    title: "Older Queensland Homes",
                    description: "Timber Queenslander homes absorb moisture easily. Poor ventilation in older homes traps humidity. Elevated designs mean flooding under houses affects stumps and subfloors.",
                  },
                  {
                    title: "Air Conditioning Issues",
                    description: "Constant AC use in Brisbane climate creates condensation. AC ducts and filters become mould breeding grounds. Temperature differences cause moisture buildup in walls.",
                  },
                ].map((factor, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: colors.success[600] }} aria-hidden="true" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{factor.title}</h4>
                      <p className="text-sm text-gray-600">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-400 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Brisbane Mould Growth Accelerates Faster Than Other Cities
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              What takes 5-7 days in dry climates happens in <strong>24-48 hours</strong> in Brisbane's humidity. Immediate professional remediation is critical. Our Master Restorer team responds within 60 minutes to prevent mould colonies from establishing.
            </p>
            <FluidCTA
              text="Emergency Mould Response: 1300 309 361"
              href="tel:1300309361"
              variant="emergency"
              size="lg"
              icon="phone"
              magnetic
              ripple
              pulse
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Remediation Process Section
function RemediationProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            IICRC Master Restorer Mould Remediation Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Certified safe mould removal following strict IICRC protocols
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              step: "1",
              title: "Mould Inspection & Assessment",
              description: "Comprehensive visual inspection using thermal imaging to detect hidden mould behind walls, under floors, in ceilings. Moisture mapping identifies all water sources. Air quality testing determines mould species and spore count. Detailed assessment report for insurance claims.",
              duration: "1-2 hours",
            },
            {
              step: "2",
              title: "Containment Setup",
              description: "Physical barriers seal off contaminated areas using 6-mil polyethylene sheeting. Negative air pressure prevents spore spread to clean areas. HEPA air scrubbers run continuously during remediation. Critical step - prevents mould spreading throughout property.",
              duration: "2-4 hours",
            },
            {
              step: "3",
              title: "HEPA Filtration & Air Scrubbing",
              description: "Industrial HEPA filtration captures 99.97% of mould spores (0.3 microns). Negative air machines create air pressure differential. Multiple air changes per hour remove airborne contamination. Protects occupants and prevents cross-contamination.",
              duration: "Ongoing throughout process",
            },
            {
              step: "4",
              title: "Mould Removal & Cleaning",
              description: "HEPA vacuum removes surface mould spores before cleaning. Antimicrobial treatment kills mould at root level. Porous materials (drywall, insulation, carpet) with heavy growth are removed. Non-porous surfaces cleaned with IICRC-approved solutions. All waste double-bagged and sealed.",
              duration: "1-3 days depending on extent",
            },
            {
              step: "5",
              title: "Moisture Source Elimination",
              description: "Repair all water leaks, plumbing failures, roof damage. Structural drying using industrial dehumidifiers and air movers. Daily moisture monitoring ensures complete drying. Brisbane's humidity requires extended drying times - typically 3-5 days minimum.",
              duration: "3-7 days",
            },
            {
              step: "6",
              title: "Antimicrobial Treatment & Prevention",
              description: "Apply antimicrobial coating to all affected areas. Prevents future mould growth on treated surfaces. HEPA vacuum final pass captures remaining spores. Encapsulation of porous materials if removal not possible.",
              duration: "4-8 hours",
            },
            {
              step: "7",
              title: "Post-Remediation Verification",
              description: "Final air quality testing confirms spore count below safe levels. Thermal imaging verifies complete moisture removal. Master Restorer final inspection. Certificate of Mould Remediation provided. Full documentation package for insurance claims.",
              duration: "2-4 hours",
            },
          ].map((process, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-gray-50 rounded-xl p-8 shadow-lg flex gap-6"
            >
              <div
                className="w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                style={{ backgroundColor: colors.success[600] }}
              >
                {process.step}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-2xl font-bold text-gray-900">{process.title}</h3>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: colors.storm[100], color: colors.storm[700] }}
                  >
                    {process.duration}
                  </span>
                </div>
                <p className="text-gray-600">{process.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Technology Section
function TechnologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Advanced Mould Remediation Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industrial-grade equipment ensures complete, safe mould removal
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              icon: Shield,
              title: "HEPA Filtration Systems",
              description: "High-Efficiency Particulate Air (HEPA) filters capture 99.97% of particles as small as 0.3 microns. Mould spores are typically 3-100 microns. Our HEPA air scrubbers remove millions of spores per hour, preventing spread during remediation.",
              specs: "Captures particles down to 0.3 microns • 99.97% efficiency",
            },
            {
              icon: Wind,
              title: "Negative Air Machines",
              description: "Create negative air pressure in containment area. Ensures contaminated air flows inward, never outward to clean areas. Filtered exhaust vented outside property. Essential for preventing cross-contamination in Brisbane homes.",
              specs: "Up to 2000 CFM air movement • HEPA filtered exhaust",
            },
            {
              icon: Thermometer,
              title: "Thermal Imaging Cameras",
              description: "FLIR infrared cameras detect moisture behind walls, under floors, in ceilings without demolition. Reveals hidden mould colonies invisible to naked eye. Temperature differential mapping locates all water intrusion points.",
              specs: "Detects 0.1°C temperature differences • Non-invasive",
            },
            {
              icon: Droplets,
              title: "Industrial Dehumidifiers",
              description: "LGR (Low Grain Refrigerant) dehumidifiers remove moisture faster than standard units. Critical in Brisbane's 60-80% humidity climate. Reduce humidity to below 50% preventing mould regrowth. Daily moisture monitoring ensures complete drying.",
              specs: "Removes up to 150 pints/day • Optimal for tropical climate",
            },
          ].map((tech, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="rounded-full p-4 flex-shrink-0"
                  style={{ backgroundColor: colors.storm[100] }}
                >
                  <tech.icon className="w-8 h-8" style={{ color: colors.storm[600] }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{tech.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{tech.description}</p>
              <div
                className="text-sm font-bold px-4 py-2 rounded-lg"
                style={{ backgroundColor: colors.storm[50], color: colors.storm[700] }}
              >
                {tech.specs}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Service Areas Section
function ServiceAreasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Mould Remediation Service Areas
          </h2>
          <p className="text-xl text-gray-600">
            60-minute response to inner Brisbane • Expert mould removal across all suburbs
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              title: "Brisbane",
              color: colors.storm[600],
              priority: "Hamilton • Ascot • New Farm • Toowong • Indooroopilly",
              areas: "Brisbane CBD, Paddington, Bulimba, West End, Fortitude Valley, Milton, South Bank, Chermside, Carindale, Mt Gravatt, Hawthorne",
            },
            {
              title: "Ipswich",
              color: '#9333ea',
              priority: "Karalee • Brookwater • Springfield Lakes",
              areas: "Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna",
            },
            {
              title: "Logan",
              color: '#ea580c',
              priority: "Logan Central • Springwood",
              areas: "Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh",
            },
          ].map((area, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-gray-50 rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8" style={{ color: area.color }} aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">{area.title}</h3>
              </div>
              <div className="mb-4">
                <p className="font-semibold mb-2" style={{ color: area.color }}>
                  60-Min Priority Response:
                </p>
                <p className="text-gray-700 text-sm mb-3">{area.priority}</p>
                <p className="font-semibold text-gray-900 mb-2">All {area.title} Areas:</p>
                <p className="text-gray-600 text-sm">{area.areas}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Why Choose Section
function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold rounded-full">
            ⭐ IICRC Master Restorer Certification
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Why Choose Master Restorer for Mould Remediation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Phill McGurk - One of limited Master Restorer certified professionals in Brisbane
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              icon: Award,
              title: "Master Restorer Mould Certification",
              description: "IICRC Master Restorer with Advanced Mould Remediation Technician (AMRT) certification. Highest credential in mould remediation industry. Extensive training in toxic mould removal, HEPA systems, containment protocols. One of very few Master Restorers in Brisbane and Queensland.",
            },
            {
              icon: Shield,
              title: "HEPA-Filtered Safe Removal",
              description: "Never spread mould spores. Professional containment barriers and negative air pressure prevent cross-contamination. Industrial HEPA filtration captures 99.97% of spores. Antimicrobial treatment prevents regrowth. Safe for occupants including children, elderly, immunocompromised.",
            },
            {
              icon: Eye,
              title: "Thermal Imaging Detection",
              description: "Advanced FLIR thermal cameras detect hidden mould behind walls, under floors, in ceilings without demolition. Moisture mapping locates all water sources fueling mould growth. Find and remove all mould - not just visible surface growth.",
            },
            {
              icon: FileText,
              title: "Insurance Claim Support",
              description: "Complete documentation: air quality testing results, moisture reports, photographic evidence, detailed scope of works. Master Restorer certification strengthens insurance claims. Direct billing to all major insurers. No upfront costs for approved insurance work.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="rounded-full p-4 flex-shrink-0"
                  style={{ backgroundColor: colors.gold[500] }}
                >
                  <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Insurance Coverage Section
function InsuranceCoverageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <h2
              className="font-bold text-gray-900 mb-4"
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes['4xl'],
                fontWeight: typography.weights.bold,
              }}
            >
              Does Insurance Cover Mould Remediation?
            </h2>
            <p className="text-xl text-gray-600">
              Mould coverage depends on the cause - we help navigate your claim
            </p>
          </div>

          <div className="bg-green-50 border-2 border-green-400 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-8 h-8 flex-shrink-0" style={{ color: colors.success[600] }} aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Typically Covered - Sudden Water Damage</h3>
                <ul className="space-y-3">
                  {[
                    "Burst pipe mould growth (water damage covered, resulting mould covered)",
                    "Storm damage roof leak causing mould (sudden event covered)",
                    "Appliance failure flooding leading to mould (sudden accidental damage)",
                    "Hot water system burst resulting in mould contamination",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.success[600] }} aria-hidden="true" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-400 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 flex-shrink-0" style={{ color: colors.emergency[600] }} aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Typically NOT Covered - Gradual Damage</h3>
                <ul className="space-y-3">
                  {[
                    "Mould from long-term moisture or humidity (maintenance issue)",
                    "Bathroom mould from poor ventilation (gradual deterioration)",
                    "Condensation mould in older homes (wear and tear)",
                    "Mould growth from unrepaired minor leaks (neglect)",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.emergency[600] }} aria-hidden="true" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              We Work With All Major Insurers
            </h3>
            <p className="text-gray-700 mb-6">
              Our Master Restorer provides detailed documentation proving mould cause, moisture timeline, and remediation scope. This strengthens your claim and speeds approvals. We bill directly to: <strong>Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct, GIO, Youi</strong> and more.
            </p>
            <p className="text-gray-700">
              <strong>Section 54 Queensland:</strong> You have the legal right to choose your own contractor for insurance work. You're not required to use the insurer's preferred restorer. Our Master Restorer certification is recognized by all major insurers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Mould Remediation FAQs - Brisbane
          </h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full"
            variants={emergencyPulse}
            animate="animate"
          >
            ⚠️ MOULD HEALTH HAZARD - Professional Removal Required
          </motion.div>

          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Don't Risk Your Health - Call Master Restorer Now
          </h2>

          <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
            HEPA Filtration • Safe Black Mould Removal • Air Quality Testing
          </p>

          <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
            <strong>IICRC Master Restorer Phill McGurk</strong> provides safe, complete mould remediation using professional HEPA equipment. Never attempt DIY mould removal - improper handling spreads spores throughout your Brisbane home.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <FluidCTA
              text="Mould Emergency: 1300 309 361"
              href="tel:1300309361"
              variant="emergency"
              size="xl"
              icon="phone"
              magnetic
              ripple
              pulse
            />
            <a
              href="mailto:admin@disasterrecovery.com.au"
              className="inline-flex items-center justify-center px-12 py-6 bg-yellow-500 text-black font-bold text-2xl rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105"
              aria-label="Email for mould assessment"
            >
              Free Mould Assessment
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">🏆 Master Restorer</div>
              <div className="text-red-100">IICRC AMRT Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">🛡️ HEPA Filtration</div>
              <div className="text-red-100">99.97% Spore Capture</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">⚡ 60 Minutes</div>
              <div className="text-red-100">Emergency Response</div>
            </div>
          </div>

          <p className="mt-8 text-lg text-red-100">
            Serving Brisbane • Ipswich • Logan • Hamilton • Ascot • New Farm • Toowong • Indooroopilly • All Brisbane Suburbs
          </p>
        </div>
      </div>
    </section>
  );
}
