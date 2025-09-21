'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield,
  AlertTriangle,
  Microscope,
  Activity,
  Users,
  Award,
  FileText,
  CheckCircle,
  Brain,
  Heart,
  Wind,
  Droplets,
  Flame,
  AlertCircle,
  Building,
  Home,
  GraduationCap,
  Hospital,
  Factory,
  TreePine,
  Beaker,
  Stethoscope,
  ClipboardCheck,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ThermometerSun,
  Zap
} from 'lucide-react'
// import SymptomChecker from '@/components/health/SymptomChecker'
// import HealthQuiz from '@/components/health/HealthQuiz'
import ComprehensiveSEO from '@/components/seo/ComprehensiveSEO'

const IndoorEnvironmentalHealthPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const healthConditions = [
    {
      name: 'Sick Building Syndrome',
      icon: Building,
      symptoms: ['Headaches', 'Fatigue', 'Respiratory issues', 'Skin irritation'],
      causes: 'Poor ventilation, chemical contaminants, biological growth'
    },
    {
      name: 'Multiple Chemical Sensitivity',
      icon: Beaker,
      symptoms: ['Nausea', 'Dizziness', 'Breathing difficulties', 'Cognitive issues'],
      causes: 'VOCs, pesticides, cleaning products, building materials'
    },
    {
      name: 'Chronic Inflammatory Response Syndrome',
      icon: Brain,
      symptoms: ['Memory problems', 'Concentration issues', 'Joint pain', 'Fatigue'],
      causes: 'Biotoxins from water-damaged buildings, mould exposure'
    },
    {
      name: 'Mould Illness/Biotoxin Illness',
      icon: AlertTriangle,
      symptoms: ['Chronic fatigue', 'Respiratory problems', 'Neurological symptoms'],
      causes: 'Toxic mould species, mycotoxin exposure, water damage'
    }
  ]

  const specialistNetwork = [
    {
      title: 'Industrial Hygienists',
      icon: Shield,
      description: 'Certified professionals identifying workplace and home hazards',
      certifications: ['CIH', 'AIHA', 'ABIH']
    },
    {
      title: 'Microbiologists',
      icon: Microscope,
      description: 'Laboratory experts analyzing biological contaminants',
      certifications: ['ASM', 'AIHA', 'EPA']
    },
    {
      title: 'Environmental Consultants',
      icon: TreePine,
      description: 'Building science experts solving complex indoor issues',
      certifications: ['CIEC', 'CMC', 'CRMI']
    },
    {
      title: 'Medical Liaison Specialists',
      icon: Stethoscope,
      description: 'Bridging restoration services with healthcare providers',
      certifications: ['Environmental Medicine', 'Functional Medicine']
    }
  ]

  const testingServices = [
    {
      category: 'Air Quality Testing',
      icon: Wind,
      tests: [
        'Volatile Organic Compounds (VOCs)',
        'Particulate Matter (PM2.5/PM10)',
        'Carbon Monoxide & Dioxide',
        'Formaldehyde & Aldehydes',
        'Radon Gas Detection',
        'Allergen Testing'
      ]
    },
    {
      category: 'Surface Sampling',
      icon: Microscope,
      tests: [
        'Bacterial Culture & Identification',
        'Mould Species Analysis',
        'Endotoxin Testing',
        'Mycotoxin Detection',
        'Chemical Residue Analysis',
        'Heavy Metal Testing'
      ]
    },
    {
      category: 'Water Quality Analysis',
      icon: Droplets,
      tests: [
        'Microbial Contamination',
        'Chemical Pollutants',
        'Heavy Metals',
        'pH & Mineral Content',
        'Legionella Testing',
        'Biofilm Analysis'
      ]
    },
    {
      category: 'Material Testing',
      icon: Beaker,
      tests: [
        'Asbestos Identification',
        'Lead Paint Analysis',
        'PCB Detection',
        'Flame Retardant Testing',
        'Off-gassing Analysis',
        'Building Material Toxicity'
      ]
    }
  ]

  const remediationTechnologies = [
    {
      name: 'HEPA Filtration Systems',
      description: 'Medical-grade air purification removing 99.97% of particles',
      applications: ['Mould spores', 'Bacteria', 'Allergens', 'Fine particulates']
    },
    {
      name: 'Negative Air Machines',
      description: 'Creating controlled airflow to prevent cross-contamination',
      applications: ['Containment zones', 'Pressure differentials', 'Exhausting contaminants']
    },
    {
      name: 'Hydroxyl Generators',
      description: 'Safe atmospheric cleaning using natural hydroxyl radicals',
      applications: ['Odor elimination', 'VOC breakdown', 'Bacterial reduction']
    },
    {
      name: 'Ozone Treatment',
      description: 'Powerful oxidation for severe contamination scenarios',
      applications: ['Fire damage', 'Severe odors', 'Biological contamination']
    },
    {
      name: 'Chemical Neutralization',
      description: 'Targeted treatments for specific chemical contaminants',
      applications: ['Pesticide residues', 'Industrial chemicals', 'Drug lab cleanup']
    },
    {
      name: 'Antimicrobial Applications',
      description: 'EPA-registered products for biological control',
      applications: ['Mould prevention', 'Bacterial control', 'Viral deactivation']
    }
  ]

  const caseStudies = [
    {
      title: 'Office Building Mystery Illness',
      type: 'Commercial',
      icon: Building,
      issue: '40+ employees reporting headaches, fatigue, respiratory issues',
      investigation: 'Comprehensive IAQ testing revealed hidden mould in HVAC system',
      solution: 'HVAC remediation, duct cleaning, HEPA filtration installation',
      outcome: '100% symptom resolution within 2 weeks',
      testimonial: 'Finally found the source after months of suffering'
    },
    {
      title: 'School Health Crisis',
      type: 'Educational',
      icon: GraduationCap,
      issue: 'Students and teachers experiencing chronic health problems',
      investigation: 'Water intrusion causing widespread hidden mould growth',
      solution: 'Full remediation, moisture control, air quality monitoring',
      outcome: 'Attendance improved 35%, health complaints eliminated',
      testimonial: 'Our children can finally learn in a safe environment'
    },
    {
      title: 'Family Home Syndrome',
      type: 'Residential',
      icon: Home,
      issue: 'Entire family experiencing unexplained chronic symptoms',
      investigation: 'Multiple sources: mould, VOCs, and bacterial contamination',
      solution: 'Comprehensive remediation, material replacement, air purification',
      outcome: 'Complete health recovery for all family members',
      testimonial: 'We got our lives back thanks to your thorough approach'
    },
    {
      title: 'Hospital Wing Contamination',
      type: 'Healthcare',
      icon: Hospital,
      issue: 'Immunocompromised patients developing infections',
      investigation: 'Aspergillus contamination from construction dust',
      solution: 'HEPA containment, antimicrobial treatment, clearance testing',
      outcome: 'Zero infections post-remediation, Joint Commission approved',
      testimonial: 'Critical for our patient safety protocols'
    }
  ]

  return (
    <>
      <ComprehensiveSEO
        title="Indoor Environmental Health Specialists | Hidden Dangers Revealed | Brisbane"
        description="Expert testing and remediation for sick building syndrome, mould illness, chemical sensitivity. Medical-grade documentation. IICRC certified. 24/7 emergency response."
        keywords="indoor air quality testing Brisbane, sick building syndrome Queensland, mould illness specialist, environmental health testing, hidden mould symptoms, CIRS treatment Brisbane, chemical sensitivity testing, biotoxin illness, water damage health effects"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "Indoor Environmental Health Specialists",
          "description": "Comprehensive testing and remediation for indoor environmental hazards",
          "url": "https://disaster-recovery-seven.vercel.app/services/indoor-environmental-health",
          "telephone": "1300-DISASTER",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Brisbane",
            "addressRegion": "Queensland",
            "addressCountry": "AU"
          },
          "medicalSpecialty": [
            "Environmental Medicine",
            "Industrial Hygiene",
            "Toxicology"
          ],
          "availableService": [
            {
              "@type": "MedicalTest",
              "name": "Indoor Air Quality Testing",
              "description": "Comprehensive testing for VOCs, mould, bacteria, and chemicals"
            },
            {
              "@type": "MedicalProcedure",
              "name": "Environmental Remediation",
              "description": "Medical-grade cleanup and restoration services"
            }
          ],
          "certification": [
            {
              "@type": "Certification",
              "name": "IICRC Certified",
              "issuedBy": "Institute of Inspection Cleaning and Restoration Certification"
            }
          ]
        }}
      />

      {/* Hero Section with Overlay */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/optimized/damage/Mould Remediation - Black Mould.png"
            alt="Indoor environmental health hazards showing bacteria, air filtration, and human health impacts"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-red-600 text-white">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Hidden Dangers Revealed
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Indoor Environmental Health Specialists
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Where others test for basics, we test for everything. Our vetted specialist
              network and comprehensive laboratory partnerships reveal the hidden dangers
              affecting your health in living and working environments.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Response
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <ClipboardCheck className="mr-2 h-5 w-5" />
                Get Health Assessment
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['IICRC Certified', 'Medical Documentation', 'Laboratory Partnerships', 'Specialist Network'].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <span className="text-white text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Is Your Building Making You Sick?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our diagnostic tools to identify potential environmental health hazards
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="symptom-checker">Symptom Checker</TabsTrigger>
              <TabsTrigger value="health-quiz">Health Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>The Hidden Health Crisis</CardTitle>
                  <CardDescription>
                    Understanding invisible threats in your environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                        Why Standard Testing Fails
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Basic tests miss 70% of environmental hazards</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Not all laboratories test for mycotoxins or VOCs</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Hidden contamination requires specialized detection</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Health symptoms often misdiagnosed without environmental data</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                        Our Comprehensive Approach
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Multi-disciplinary specialist network</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Medical-grade testing and documentation</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Direct collaboration with healthcare providers</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Evidence-based remediation protocols</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <p className="font-semibold text-orange-900 mb-2">Critical Connection</p>
                    <p className="text-orange-800">
                      Water damage, fire incidents, and mould growth create complex environmental
                      hazards that require specialized expertise to identify and remediate properly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="symptom-checker" className="mt-8">
              {/* <SymptomChecker /> */}
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-600">Symptom Checker component coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health-quiz" className="mt-8">
              {/* <HealthQuiz /> */}
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-600">Health Quiz component coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Health Conditions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Health Conditions We Address</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized expertise in environmental health conditions often misdiagnosed or overlooked
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {healthConditions.map((condition, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <condition.icon className="mr-3 h-6 w-6 text-orange-600" />
                    {condition.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm text-gray-600 mb-2">Common Symptoms:</p>
                      <div className="flex flex-wrap gap-2">
                        {condition.symptoms.map((symptom, idx) => (
                          <Badge key={idx} variant="secondary">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-600 mb-2">Primary Causes:</p>
                      <p className="text-gray-600">{condition.causes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Network Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Specialist Network</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pre-vetted experts across multiple disciplines ready to deploy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {specialistNetwork.map((specialist, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <specialist.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{specialist.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{specialist.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {specialist.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Testing & Analysis</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Laboratory partnerships providing medical-grade documentation for healthcare providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testingServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-orange-600 mb-3" />
                  <CardTitle className="text-lg">{service.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.tests.map((test, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <FileText className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Medical-Grade Reporting</h3>
                <p className="text-gray-700 mb-4">
                  All testing includes comprehensive documentation suitable for submission to
                  healthcare providers, insurance companies, and legal proceedings.
                </p>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Sample Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remediation Technologies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Advanced Remediation Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art equipment and proven methodologies for complete restoration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {remediationTechnologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-orange-600" />
                    {tech.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{tech.description}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-700">Applications:</p>
                    {tech.applications.map((app, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-2 mb-1">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Proven Results: Case Studies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real examples of our detective work uncovering and resolving environmental health issues
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{study.type}</Badge>
                    <study.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-red-600 mb-1">Issue:</p>
                    <p className="text-gray-600">{study.issue}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-orange-600 mb-1">Investigation:</p>
                    <p className="text-gray-600">{study.investigation}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-600 mb-1">Solution:</p>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-green-600 mb-1">Outcome:</p>
                    <p className="text-gray-600">{study.outcome}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="italic text-gray-600">"{study.testimonial}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Value Propositions */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why We're Different</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Microscope className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Complete Testing</h3>
                <p className="text-orange-100">Where others test for basics, we test for everything</p>
              </div>

              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Vetted Network</h3>
                <p className="text-orange-100">Specialist network ready to deploy immediately</p>
              </div>

              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Medical Documentation</h3>
                <p className="text-orange-100">Reports your doctor will understand and accept</p>
              </div>

              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Health Connection</h3>
                <p className="text-orange-100">Understanding restoration-health relationships</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Get Your Building Tested
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Health Professional Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Resources for Healthcare Professionals</CardTitle>
              <CardDescription>
                Educational materials and collaboration opportunities for medical providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <GraduationCap className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Continuing Education</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    CEU credits available for environmental medicine courses
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>

                <div className="text-center">
                  <FileText className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Published Research</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Access our library of case studies and white papers
                  </p>
                  <Button variant="outline" size="sm">View Library</Button>
                </div>

                <div className="text-center">
                  <Stethoscope className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Provider Network</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Join our network of environmental medicine practitioners
                  </p>
                  <Button variant="outline" size="sm">Join Network</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Don't Let Your Building Make You Sick
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step toward identifying and eliminating environmental health hazards.
              Our comprehensive testing and remediation services provide the answers and solutions
              you need for a healthy indoor environment.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Phone className="mr-2 h-5 w-5" />
                1300-DISASTER
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="mr-2 h-5 w-5" />
                Schedule Assessment
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">24/7 Response</p>
              </div>
              <div>
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">IICRC Certified</p>
              </div>
              <div>
                <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Insurance Approved</p>
              </div>
              <div>
                <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Australia Wide</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default IndoorEnvironmentalHealthPage