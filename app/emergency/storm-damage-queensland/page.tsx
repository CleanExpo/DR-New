'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud, Zap, Shield, AlertTriangle, CheckCircle, Home, Building,
  Phone, ArrowRight, MapPin, Users, Clock, TrendingUp, Star,
  FileText, DollarSign, Wrench, Droplets, Wind, CloudRain,
  AlertCircle, Calculator, ChevronRight, Award, History, Heart,
  TreePine, Umbrella, RotateCw, CheckSquare, Info, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';

// Storm Damage Assessment Calculator Component
const StormDamageCalculator = () => {
  const [damageFactors, setDamageFactors] = useState({
    roofDamage: 0,
    waterIngress: 0,
    structuralImpact: 0,
    windowsDoors: 0,
    debrisRemoval: 0,
    electricalSafety: 0
  });

  const calculateRestoreVsRebuild = () => {
    const totalDamage = Object.values(damageFactors).reduce((a, b) => a + b, 0) / 6;
    if (totalDamage < 40) return { recommendation: 'Restore', percentage: 85, timeFrame: '2-4 weeks' };
    if (totalDamage < 70) return { recommendation: 'Major Restoration', percentage: 60, timeFrame: '4-8 weeks' };
    return { recommendation: 'Consider Rebuild', percentage: 30, timeFrame: '3-6 months' };
  };

  const result = calculateRestoreVsRebuild();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Storm Damage Assessment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {Object.entries({
            roofDamage: 'Roof Damage Severity',
            waterIngress: 'Water Ingress Level',
            structuralImpact: 'Structural Impact',
            windowsDoors: 'Windows/Doors Damage',
            debrisRemoval: 'Debris Removal Needed',
            electricalSafety: 'Electrical System Impact'
          }).map(([key, label]) => (
            <div key={key}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm text-muted-foreground">
                  {damageFactors[key as keyof typeof damageFactors]}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={damageFactors[key as keyof typeof damageFactors]}
                onChange={(e) => setDamageFactors(prev => ({
                  ...prev,
                  [key]: parseInt(e.target.value)
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Recommendation:</span>
            <Badge variant={result.recommendation === 'Restore' ? 'default' : 'secondary'}>
              {result.recommendation}
            </Badge>
          </div>
          <Progress value={result.percentage} className="mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Restoration Viability: {result.percentage}%</span>
            <span>Est. Timeline: {result.timeFrame}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Restore vs Rebuild Decision Tree Component
const DecisionTree = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [decisions, setDecisions] = useState<string[]>([]);

  const steps = [
    {
      question: "Is the structural integrity compromised?",
      options: [
        { text: "No, structure is sound", next: 1, value: "restore" },
        { text: "Yes, major structural damage", next: 2, value: "rebuild" }
      ]
    },
    {
      question: "What percentage of the property is affected?",
      options: [
        { text: "Less than 40%", next: 3, value: "restore" },
        { text: "More than 40%", next: 4, value: "evaluate" }
      ]
    },
    {
      question: "Are there heritage or sentimental considerations?",
      options: [
        { text: "Yes, preservation is important", next: 5, value: "restore" },
        { text: "No, purely functional", next: 6, value: "rebuild" }
      ]
    }
  ];

  const handleDecision = (option: unknown) => {
    setDecisions([...decisions, option.value]);
    if (option.next < steps.length) {
      setCurrentStep(option.next);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCw className="h-5 w-5" />
          Restore vs Rebuild Decision Tool
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentStep < steps.length ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{steps[currentStep].question}</h3>
            <div className="space-y-2">
              {steps[currentStep].options.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleDecision(option)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Recommendation: {decisions.includes('restore') ? 'Restoration' : 'Rebuild Evaluation'}
            </h3>
            <p className="text-muted-foreground">
              Based on your answers, we recommend a detailed assessment for the best approach.
            </p>
            <Button className="mt-4" onClick={() => { setCurrentStep(0); setDecisions([]); }}>
              Start Over
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function StormDamageQueenslandPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Comprehensive SEO Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmergencyService",
        "@id": "https://disaster-recovery-seven.vercel.app/emergency/storm-damage-queensland#emergency",
        "name": "24/7 Storm Damage Restoration Queensland",
        "description": "IICRC certified storm damage restoration across Queensland. Cyclone recovery, flood damage, high wind repairs. Restore vs rebuild expertise. Insurance approved.",
        "serviceType": "Storm Damage Restoration",
        "areaServed": [
          {
            "@type": "State",
            "name": "Queensland",
            "containsPlace": [
              { "@type": "City", "name": "Brisbane" },
              { "@type": "City", "name": "Gold Coast" },
              { "@type": "City", "name": "Sunshine Coast" },
              { "@type": "City", "name": "Townsville" },
              { "@type": "City", "name": "Cairns" }
            ]
          }
        ],
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://disaster-recovery-seven.vercel.app/emergency/storm-damage-queensland",
          "servicePhone": "+61-1300-309-361",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "HowTo",
        "name": "Storm Damage Assessment and Recovery Process",
        "description": "Professional storm damage assessment focusing on restoration over rebuild",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Initial Assessment",
            "text": "Comprehensive damage evaluation using IICRC protocols"
          },
          {
            "@type": "HowToStep",
            "name": "Safety Securing",
            "text": "Immediate hazard mitigation and property securing"
          },
          {
            "@type": "HowToStep",
            "name": "Restore vs Rebuild Analysis",
            "text": "Data-driven decision on restoration viability"
          },
          {
            "@type": "HowToStep",
            "name": "Insurance Documentation",
            "text": "Complete claim support and direct billing"
          },
          {
            "@type": "HowToStep",
            "name": "Restoration Execution",
            "text": "Professional restoration preserving structure and value"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why choose restoration over rebuild after storm damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Restoration saves 40-60% in time and 30-50% in costs compared to rebuilding. You preserve the home's character, avoid council approvals, maintain sentimental value, and return to normal life weeks or months sooner. Our data shows 85% of storm-damaged properties can be successfully restored."
            }
          },
          {
            "@type": "Question",
            "name": "How do you handle old insurance claims still dragging on?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We specialize in resolving stalled claims. Our IICRC certified assessors provide independent reports that expedite approval. We negotiate directly with insurers, provide missing documentation, and can begin emergency works while finalizing claims. Most stalled claims are resolved within 2-3 weeks of our involvement."
            }
          },
          {
            "@type": "Question",
            "name": "What makes Queenslander homes vulnerable to storm damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Queenslander homes face unique vulnerabilities: elevated structures exposed to wind, timber construction susceptible to water damage, tin roofing prone to lifting, and wrap-around verandahs catching debris. Our restoration approach addresses these specific challenges while preserving architectural heritage."
            }
          },
          {
            "@type": "Question",
            "name": "What storm damage services do you provide across Queensland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Complete storm recovery including: cyclone damage restoration, flood water extraction, wind damage repairs, fallen tree removal, roof tarping and repairs, structural drying, mould prevention, electrical safety checks, and complete interior restoration. Available 24/7 from Gold Coast to Cairns."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can you respond to storm damage in Queensland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Emergency response within 2-4 hours for critical situations in major centers. Same-day service for urgent cases. Next-day for standard assessments. During major storm events, we deploy additional crews from our network to maintain rapid response times across all affected areas."
            }
          }
        ]
      }
    ]
  };

  const stormTypes = [
    {
      type: "Cyclones",
      icon: <Wind className="h-8 w-8" />,
      description: "Category 1-5 tropical cyclone damage",
      examples: ["Cyclone Debbie 2017", "Cyclone Yasi 2011", "Cyclone Larry 2006"],
      damage: ["Roof destruction", "Structural damage", "Debris impact", "Storm surge"]
    },
    {
      type: "Severe Storms",
      icon: <Zap className="h-8 w-8" />,
      description: "Supercell and thunderstorm damage",
      examples: ["Brisbane Supercell 2014", "Gap Storms", "SEQ Storm Season"],
      damage: ["Hail damage", "Lightning strikes", "Flash flooding", "Wind damage"]
    },
    {
      type: "Flooding",
      icon: <Droplets className="h-8 w-8" />,
      description: "River and flash flood damage",
      examples: ["2022 Brisbane Floods", "2011 Queensland Floods", "1974 Brisbane Flood"],
      damage: ["Water ingress", "Foundation damage", "Contamination", "Electrical damage"]
    },
    {
      type: "High Winds",
      icon: <CloudRain className="h-8 w-8" />,
      description: "Destructive wind events",
      examples: ["East Coast Lows", "Southerly Busters", "Westerly Winds"],
      damage: ["Roof lifting", "Tree falls", "Fence damage", "Window breakage"]
    }
  ];

  const restoreVsRebuildComparison = [
    {
      factor: "Time to Completion",
      restore: "2-8 weeks typical",
      rebuild: "6-12 months minimum",
      advantage: "restore"
    },
    {
      factor: "Cost",
      restore: "$15,000-$60,000 average",
      rebuild: "$300,000-$600,000+",
      advantage: "restore"
    },
    {
      factor: "Insurance Process",
      restore: "Straightforward claim",
      rebuild: "Complex approval process",
      advantage: "restore"
    },
    {
      factor: "Council Approvals",
      restore: "Minimal requirements",
      rebuild: "Full DA process required",
      advantage: "restore"
    },
    {
      factor: "Sentimental Value",
      restore: "Preserves memories",
      rebuild: "Complete replacement",
      advantage: "restore"
    },
    {
      factor: "Temporary Housing",
      restore: "Often not needed",
      rebuild: "Months of relocation",
      advantage: "restore"
    },
    {
      factor: "Environmental Impact",
      restore: "Minimal waste",
      rebuild: "Significant demolition waste",
      advantage: "restore"
    },
    {
      factor: "Property Character",
      restore: "Maintains heritage",
      rebuild: "Modern replacement",
      advantage: "restore"
    }
  ];

  const queenslanderVulnerabilities = [
    {
      feature: "Elevated Structure",
      vulnerability: "Wind exposure underneath",
      solution: "Strategic bracing and tie-downs"
    },
    {
      feature: "Timber Construction",
      vulnerability: "Water damage and rot",
      solution: "Rapid drying and treatment"
    },
    {
      feature: "Tin Roofing",
      vulnerability: "Lifting in high winds",
      solution: "Secure fastening systems"
    },
    {
      feature: "Wrap-around Verandahs",
      vulnerability: "Debris catching and damage",
      solution: "Reinforcement and screening"
    },
    {
      feature: "High Ceilings",
      vulnerability: "Increased wind load",
      solution: "Structural reinforcement"
    },
    {
      feature: "Decorative Elements",
      vulnerability: "Fretwork and lattice damage",
      solution: "Protective measures and restoration"
    }
  ];

  const preparednessChecklist = [
    { category: "Before Storm Season", items: [
      "Inspect and clean gutters",
      "Trim overhanging branches",
      "Secure loose items",
      "Check insurance coverage",
      "Prepare emergency kit",
      "Document property condition"
    ]},
    { category: "Storm Warning Issued", items: [
      "Secure outdoor furniture",
      "Fill bathtubs with water",
      "Charge all devices",
      "Close all windows and doors",
      "Move vehicles under cover",
      "Prepare safe room"
    ]},
    { category: "During Storm", items: [
      "Stay indoors",
      "Monitor emergency broadcasts",
      "Avoid windows",
      "Don't use candles",
      "Stay off phone unless emergency",
      "Move to strongest room if needed"
    ]},
    { category: "After Storm", items: [
      "Check for injuries",
      "Document all damage",
      "Contact insurance",
      "Avoid flood water",
      "Check for electrical hazards",
      "Call restoration professionals"
    ]}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* SEO Schema */}
      <Script id="storm-damage-schema" type="application/ld+json">
        {JSON.stringify(schemaData)}
      </Script>

      {/* Hero Section with Storm Image */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/storm-damage/storms-ahead.png"
            alt="Storm damage restoration contractor approaching damaged Queenslander home with cyclone and Gold Coast skyline - CURRENT OR PREVIOUS DAMAGE ASSESSMENTS"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFBv/EACQQAAIBAwQBBQEAAAAAAAAAAAABAgMEEQUSITFBEyJRYXGR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgME/8QAGREAAgMBAAAAAAAAAAAAAAAAAAECERIh/9oADAMBAAIRAxEAPwBNt7y9vJQqU3GnFvjyOK0pU6m7HwBMq0Vu/Qk7OUUOm//Z"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-orange-500 text-white">
              STORM SEASON READY
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Queensland Storm Damage Restoration
            </h1>

            <p className="text-xl md:text-2xl mb-4 font-semibold">
              "Restore, Don't Rebuild" - Save Time, Money & Memories
            </p>

            <p className="text-lg mb-8 text-gray-200">
              IICRC Certified • CARSI Accredited • Insurance Approved
              <br />
              Helping with current damage AND old dragging claims
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Phone className="mr-2 h-5 w-5" />
                1300 309 361 - Emergency Line
              </Button>
              <Button size="lg" variant="secondary">
                <FileText className="mr-2 h-5 w-5" />
                Check Your Old Claim Status
              </Button>
            </div>

            <div className="mt-8 flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <Award className="h-8 w-8 text-yellow-400" />
                <span className="font-semibold">IICRC Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="font-semibold">CARSI Member</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="bg-orange-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <AlertCircle className="h-6 w-6 animate-pulse" />
            <p className="text-center font-semibold">
              CURRENT OR PREVIOUS DAMAGE ASSESSMENTS AVAILABLE -
              Don't let your claim drag on. We resolve stalled insurance claims fast.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="restore">Restore vs Rebuild</TabsTrigger>
            <TabsTrigger value="calculator">Assessment Tools</TabsTrigger>
            <TabsTrigger value="preparation">Storm Prep</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Storm Types Grid */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Queensland Storm Damage Types We Handle</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stormTypes.map((storm, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="text-primary">{storm.icon}</div>
                        <CardTitle className="text-lg">{storm.type}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{storm.description}</p>
                      <div className="mb-3">
                        <p className="text-xs font-semibold mb-1">Historic Events:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {storm.examples.map((example, i) => (
                            <li key={i}>• {example}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-1">Common Damage:</p>
                        <div className="flex flex-wrap gap-1">
                          {storm.damage.map((dmg, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {dmg}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Queenslander Vulnerabilities */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Queenslander Home Storm Vulnerabilities</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {queenslanderVulnerabilities.map((item, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Home className="h-5 w-5 text-primary mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.feature}</h3>
                          <p className="text-sm text-red-600 mb-2">{item.vulnerability}</p>
                          <p className="text-sm text-green-600">✓ {item.solution}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Service Process */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Storm Recovery Process</h2>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { step: 1, title: "Emergency Response", desc: "24/7 immediate dispatch", icon: <Phone /> },
                  { step: 2, title: "Damage Assessment", desc: "IICRC certified evaluation", icon: <FileText /> },
                  { step: 3, title: "Restore Analysis", desc: "Data-driven restore vs rebuild", icon: <Calculator /> },
                  { step: 4, title: "Insurance Support", desc: "Direct billing & advocacy", icon: <Shield /> },
                  { step: 5, title: "Full Restoration", desc: "Complete property recovery", icon: <CheckCircle /> }
                ].map((item) => (
                  <Card key={item.step} className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-primary mb-3">{item.icon}</div>
                      <Badge className="mb-2">Step {item.step}</Badge>
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-secondary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Why Queensland Trusts Us</h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <Award className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">IICRC Certified</h3>
                  <p className="text-sm text-muted-foreground">International restoration standards</p>
                </div>
                <div>
                  <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">CARSI Accredited</h3>
                  <p className="text-sm text-muted-foreground">Continuing education credits</p>
                </div>
                <div>
                  <History className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">15+ Years Experience</h3>
                  <p className="text-sm text-muted-foreground">Major storm event response</p>
                </div>
                <div>
                  <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Insurance Approved</h3>
                  <p className="text-sm text-muted-foreground">All major insurers</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="restore" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Restore vs Rebuild: The Data-Driven Truth</h2>

              {/* Philosophy Section */}
              <Alert className="mb-8">
                <Heart className="h-4 w-4" />
                <AlertTitle>Our Philosophy: Restore First, Always</AlertTitle>
                <AlertDescription>
                  We take a holistic approach beyond just monetary considerations. Your home holds memories,
                  character, and sentimental value that can't be replaced. Our data shows 85% of storm-damaged
                  properties can be successfully restored, saving time, money, and preserving what matters most.
                </AlertDescription>
              </Alert>

              {/* Comparison Table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Factor</th>
                      <th className="text-center p-4">Restoration</th>
                      <th className="text-center p-4">Rebuild</th>
                      <th className="text-center p-4">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restoreVsRebuildComparison.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-secondary/20">
                        <td className="p-4 font-medium">{row.factor}</td>
                        <td className="p-4 text-center">{row.restore}</td>
                        <td className="p-4 text-center">{row.rebuild}</td>
                        <td className="p-4 text-center">
                          <Badge variant={row.advantage === 'restore' ? 'default' : 'secondary'}>
                            {row.advantage === 'restore' ? '✓ Restore' : 'Rebuild'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Time Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary mb-2">60-80%</p>
                    <p className="text-sm text-muted-foreground">
                      Faster than rebuilding. Return to your home in weeks, not months.
                      No lengthy council approvals or construction delays.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Cost Efficiency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary mb-2">30-50%</p>
                    <p className="text-sm text-muted-foreground">
                      Less expensive than rebuilding. Insurance covers restoration.
                      No demolition costs or new construction premiums.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Sentimental Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary mb-2">100%</p>
                    <p className="text-sm text-muted-foreground">
                      Preserved memories and character. Keep your home's unique features
                      and the irreplaceable elements that make it yours.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Old Claims Help */}
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Got an Old Claim Still Dragging On?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    We specialize in resolving stalled insurance claims from previous storms.
                    Our expert team can help expedite your claim and get your restoration moving.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Independent IICRC assessment to support your claim</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Direct negotiation with insurance companies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Emergency works can begin while claim finalizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Most stalled claims resolved within 2-3 weeks</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Get Help With Your Old Claim
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Storm Damage Assessment Tools</h2>

              <div className="space-y-8">
                <StormDamageCalculator />
                <DecisionTree />
              </div>

              {/* CTA Section */}
              <Card className="mt-8 bg-primary text-white">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Get Your Professional Assessment Today
                  </h3>
                  <p className="mb-6">
                    These tools provide estimates only. For accurate assessment and insurance documentation,
                    our IICRC certified technicians provide comprehensive evaluations.
                  </p>
                  <Button size="lg" variant="secondary">
                    <Phone className="mr-2 h-5 w-5" />
                    Book Professional Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preparation" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Queensland Storm Season Preparation</h2>

              {/* Storm Season Timeline */}
              <Alert className="mb-8">
                <Info className="h-4 w-4" />
                <AlertTitle>Queensland Storm Season: November to April</AlertTitle>
                <AlertDescription>
                  Peak cyclone season runs from December to March. Severe thunderstorms can occur
                  year-round but are most common from October to March. Prepare early and stay ready.
                </AlertDescription>
              </Alert>

              {/* Preparation Checklist */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {preparednessChecklist.map((section, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckSquare className="h-5 w-5" />
                        {section.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Kit */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Umbrella className="h-5 w-5" />
                    Essential Emergency Kit Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Supplies</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Water (3L per person/day)</li>
                        <li>• Non-perishable food</li>
                        <li>• First aid kit</li>
                        <li>• Medications</li>
                        <li>• Torch and batteries</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Documents</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Insurance policies</li>
                        <li>• ID documents</li>
                        <li>• Medical records</li>
                        <li>• Property photos</li>
                        <li>• Emergency contacts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Tools</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Battery radio</li>
                        <li>• Mobile chargers</li>
                        <li>• Tarps and rope</li>
                        <li>• Duct tape</li>
                        <li>• Basic tools</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Regional Risks */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Regional Storm Risk Profiles</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { region: "Gold Coast", risk: "High", threats: ["Cyclones", "Storm surge", "Flash flooding"] },
                    { region: "Brisbane", risk: "High", threats: ["Severe storms", "River flooding", "Hail"] },
                    { region: "Sunshine Coast", risk: "High", threats: ["Cyclones", "High winds", "Storm surge"] },
                    { region: "Cairns", risk: "Extreme", threats: ["Cat 5 cyclones", "Storm surge", "Flooding"] },
                    { region: "Townsville", risk: "Extreme", threats: ["Cyclones", "Flooding", "Storm surge"] },
                    { region: "Toowoomba", risk: "Moderate", threats: ["Severe storms", "Flash flooding", "Hail"] }
                  ].map((location, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{location.region}</h4>
                          <Badge variant={location.risk === 'Extreme' ? 'destructive' :
                                         location.risk === 'High' ? 'secondary' : 'outline'}>
                            {location.risk} Risk
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {location.threats.map((threat, i) => (
                            <div key={i} className="text-sm text-muted-foreground">
                              • {threat}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Storm Damage Restoration Coverage Across Queensland
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Southeast Queensland
              </h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Brisbane CBD & Suburbs</li>
                <li>• Gold Coast</li>
                <li>• Sunshine Coast</li>
                <li>• Ipswich</li>
                <li>• Logan</li>
                <li>• Moreton Bay</li>
                <li>• Redlands</li>
                <li>• Scenic Rim</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                North Queensland
              </h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Cairns</li>
                <li>• Townsville</li>
                <li>• Mackay</li>
                <li>• Port Douglas</li>
                <li>• Mission Beach</li>
                <li>• Innisfail</li>
                <li>• Ayr</li>
                <li>• Bowen</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Central Queensland
              </h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Rockhampton</li>
                <li>• Gladstone</li>
                <li>• Bundaberg</li>
                <li>• Hervey Bay</li>
                <li>• Maryborough</li>
                <li>• Emerald</li>
                <li>• Yeppoon</li>
                <li>• Biloela</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Western Queensland
              </h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Toowoomba</li>
                <li>• Mount Isa</li>
                <li>• Charleville</li>
                <li>• Roma</li>
                <li>• Longreach</li>
                <li>• Chinchilla</li>
                <li>• Dalby</li>
                <li>• Warwick</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Can't see your location? We service ALL of Queensland including remote and regional areas.
            </p>
            <Button size="lg">
              <MapPin className="mr-2 h-5 w-5" />
              Check Service in Your Area
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't Let Storm Damage Destroy Your Life
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether it's fresh damage from last night's storm or an old claim that's been
            dragging on for months, we're here to help. Our restore-first approach saves
            time, money, and preserves what matters most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="secondary">
              <Phone className="mr-2 h-5 w-5" />
              1300 309 361 - Call Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              <FileText className="mr-2 h-5 w-5" />
              Online Assessment Form
            </Button>
          </div>

          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>24/7 Emergency Response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Insurance Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>IICRC Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Storm Damage Restoration FAQs
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Why choose restoration over rebuild after storm damage?",
              a: "Restoration saves 40-60% in time and 30-50% in costs compared to rebuilding. You preserve the home's character, avoid council approvals, maintain sentimental value, and return to normal life weeks or months sooner. Our data shows 85% of storm-damaged properties can be successfully restored."
            },
            {
              q: "How do you handle old insurance claims still dragging on?",
              a: "We specialize in resolving stalled claims. Our IICRC certified assessors provide independent reports that expedite approval. We negotiate directly with insurers, provide missing documentation, and can begin emergency works while finalizing claims. Most stalled claims are resolved within 2-3 weeks of our involvement."
            },
            {
              q: "What makes Queenslander homes vulnerable to storm damage?",
              a: "Queenslander homes face unique vulnerabilities: elevated structures exposed to wind, timber construction susceptible to water damage, tin roofing prone to lifting, and wrap-around verandahs catching debris. Our restoration approach addresses these specific challenges while preserving architectural heritage."
            },
            {
              q: "What storm damage services do you provide across Queensland?",
              a: "Complete storm recovery including: cyclone damage restoration, flood water extraction, wind damage repairs, fallen tree removal, roof tarping and repairs, structural drying, mould prevention, electrical safety checks, and complete interior restoration. Available 24/7 from Gold Coast to Cairns."
            },
            {
              q: "How quickly can you respond to storm damage in Queensland?",
              a: "Emergency response within 2-4 hours for critical situations in major centers. Same-day service for urgent cases. Next-day for standard assessments. During major storm events, we deploy additional crews from our network to maintain rapid response times across all affected areas."
            }
          ].map((faq, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-lg">{faq.q}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}