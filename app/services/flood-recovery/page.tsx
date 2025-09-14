import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Droplets, Clock, Shield, AlertTriangle, CheckCircle,
  Waves, Thermometer, Wind, Users, MapPin, Phone, Heart
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Professional Flood Recovery Services | Brisbane, Ipswich, Logan',
  description: 'Expert flood damage restoration and recovery services across Brisbane, Ipswich, and Logan. 24/7 emergency response, insurance approved, IICRC certified. Call 1300 309 361',
  keywords: [
    'flood recovery Brisbane',
    'flood damage restoration',
    'flood cleanup Ipswich',
    'flood restoration Logan',
    'emergency flood response',
    'flood water extraction',
    'flood damage repair',
    'insurance flood claims'
  ],
};

export default function FloodRecoveryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />

        {/* Water wave animation background */}
        <div className="absolute inset-0 water-wave opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="damage-reveal">
              {/* Emergency Alert */}
              <Alert variant="emergency" className="mb-6">
                <Waves className="h-5 w-5" />
                <AlertTitle className="text-white">Flood Emergency Response</AlertTitle>
                <AlertDescription className="text-white">
                  First 24-48 hours are critical. Immediate action prevents permanent damage.
                </AlertDescription>
              </Alert>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Professional Flood
                <span className="block text-3xl lg:text-4xl text-blue-400 mt-2">
                  Recovery Services
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Rapid flood damage restoration across
                <strong className="text-white"> Brisbane, Ipswich & Logan</strong>.
                <span className="block mt-2">
                  <span className="response-timer">24/7 Emergency Response</span> • Insurance Direct Billing
                </span>
              </p>

              {/* Critical Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="bg-white/10 border-blue-500/30">
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-white">2hr</div>
                    <div className="text-sm text-blue-300">Response Time</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-red-500/30">
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-white">24-48hr</div>
                    <div className="text-sm text-red-300">Critical Window</div>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="emergency-contact bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
                >
                  <Link href="tel:1300309361">
                    <Phone className="mr-2 h-5 w-5" />
                    Emergency: 1300 309 361
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Link href="/client/instant-quote">
                    Free Flood Assessment
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/optimized/flood/flood-recovery-team.jpg"
                  alt="Professional flood recovery team extracting water"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="insurance" className="insurance-approved">
                    Insurance Approved
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="emergency" className="emergency-pulse">
                    24/7 Emergency
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flood Response Process */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Emergency Flood Response Process
            </h2>
            <p className="text-xl text-blue-300">
              Every minute counts in flood recovery - our systematic approach saves your property
            </p>
          </div>

          <Tabs defaultValue="immediate" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="immediate">0-2 Hours</TabsTrigger>
              <TabsTrigger value="extraction">2-24 Hours</TabsTrigger>
              <TabsTrigger value="drying">1-5 Days</TabsTrigger>
              <TabsTrigger value="restoration">5+ Days</TabsTrigger>
            </TabsList>

            <TabsContent value="immediate" className="space-y-6">
              <Card className="bg-red-900/30 border-red-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                    <CardTitle className="text-white text-2xl">Immediate Response (0-2 Hours)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Critical Actions:</h4>
                      <ul className="space-y-3 text-red-200">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                          Emergency assessment and safety evaluation
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                          Source identification and stoppage
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                          Electrical safety checks and isolation
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                          Priority area protection and containment
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Equipment Deployment:</h4>
                      <ul className="space-y-3 text-red-200">
                        <li className="flex items-start gap-2">
                          <Droplets className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          Industrial water extraction pumps
                        </li>
                        <li className="flex items-start gap-2">
                          <Wind className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          High-velocity air movers
                        </li>
                        <li className="flex items-start gap-2">
                          <Thermometer className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                          Industrial dehumidifiers
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Moisture detection equipment
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="extraction" className="space-y-6">
              <Card className="bg-orange-900/30 border-orange-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Droplets className="h-8 w-8 text-blue-400" />
                    <CardTitle className="text-white text-2xl">Water Extraction (2-24 Hours)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="restoration-progress bg-blue-900/30 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-4">Extraction Progress Stages:</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-white">Standing Water Removal</span>
                            <span className="text-blue-300">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-white">Carpet & Padding Extraction</span>
                            <span className="text-blue-300">70%</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-white">Structural Water Removal</span>
                            <span className="text-blue-300">55%</span>
                          </div>
                          <Progress value={55} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drying" className="space-y-6">
              <Card className="bg-yellow-900/30 border-yellow-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Wind className="h-8 w-8 text-gray-400" />
                    <CardTitle className="text-white text-2xl">Structural Drying (1-5 Days)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Thermometer className="h-12 w-12 text-orange-400 mx-auto mb-3" />
                      <h4 className="font-bold text-white mb-2">Temperature Control</h4>
                      <p className="text-yellow-200">Optimal 22-26°C for maximum evaporation</p>
                    </div>
                    <div className="text-center">
                      <Droplets className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                      <h4 className="font-bold text-white mb-2">Humidity Management</h4>
                      <p className="text-yellow-200">Maintain 30-50% relative humidity</p>
                    </div>
                    <div className="text-center">
                      <Wind className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h4 className="font-bold text-white mb-2">Air Movement</h4>
                      <p className="text-yellow-200">Strategic airflow for rapid drying</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="restoration" className="space-y-6">
              <Card className="bg-green-900/30 border-green-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-green-400" />
                    <CardTitle className="text-white text-2xl">Complete Restoration (5+ Days)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Restoration Services:</h4>
                      <ul className="space-y-3 text-green-200">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Flooring replacement and repair
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Wall and ceiling restoration
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Electrical system restoration
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Plumbing repairs and upgrades
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Prevention Measures:</h4>
                      <ul className="space-y-3 text-green-200">
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Waterproofing applications
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Drainage improvements
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Sump pump installation
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          Flood barrier systems
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Flood Recovery Coverage Areas
            </h2>
            <p className="text-xl text-blue-300">
              Rapid response teams positioned across South East Queensland
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/10 border-blue-500/30 text-center coverage-expand">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <CardTitle className="text-white">Brisbane Metro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200 mb-4">Complete flood coverage across greater Brisbane</p>
                <div className="space-y-2 text-sm text-blue-300">
                  <p>• CBD & Inner City</p>
                  <p>• Northern Suburbs</p>
                  <p>• Southern Suburbs</p>
                  <p>• Eastern Suburbs</p>
                  <p>• Western Suburbs</p>
                </div>
                <Badge variant="available" className="mt-3">
                  2-Hour Response
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-blue-500/30 text-center coverage-expand">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <CardTitle className="text-white">Ipswich Region</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200 mb-4">Specialized flood teams serving Ipswich area</p>
                <div className="space-y-2 text-sm text-blue-300">
                  <p>• Central Ipswich</p>
                  <p>• Springfield Lakes</p>
                  <p>• Redbank Plains</p>
                  <p>• Forest Lake</p>
                  <p>• Goodna</p>
                </div>
                <Badge variant="available" className="mt-3">
                  2-Hour Response
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-blue-500/30 text-center coverage-expand">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <CardTitle className="text-white">Logan City</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200 mb-4">Expert flood recovery services throughout Logan</p>
                <div className="space-y-2 text-sm text-blue-300">
                  <p>• Logan Central</p>
                  <p>• Springwood</p>
                  <p>• Browns Plains</p>
                  <p>• Logan West</p>
                  <p>• Woodridge</p>
                </div>
                <Badge variant="available" className="mt-3">
                  2-Hour Response
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insurance & Costs */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Insurance & Cost Information
            </h2>
            <p className="text-xl text-blue-300">
              We work directly with your insurance company to minimize your costs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-green-900/30 border-green-500/30">
              <CardHeader>
                <Shield className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Insurance Direct Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-green-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    We bill your insurance company directly
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    Minimize your out-of-pocket expenses
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    Handle all insurance paperwork
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    Provide detailed documentation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/30 border-blue-500/30">
              <CardHeader>
                <Heart className="h-8 w-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Compassionate Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-blue-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    Transparent, upfront pricing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    Payment plans available
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    Emergency service pricing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    No hidden fees or surprises
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20 bg-gradient-to-r from-red-900/80 to-blue-900/80">
        <div className="container mx-auto px-6 text-center">
          <Waves className="h-16 w-16 text-blue-400 mx-auto mb-6 emergency-pulse" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Flood Emergency? We're Ready 24/7
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Every minute counts in flood recovery. Our expert teams are standing by across
            Brisbane, Ipswich & Logan to respond immediately to your flood emergency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="emergency-response bg-white text-red-600 hover:bg-red-50 px-10 py-5 text-xl"
            >
              <Link href="tel:1300309361">
                <Phone className="mr-2 h-6 w-6" />
                Emergency: 1300 309 361
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-10 py-5 text-xl"
            >
              <Link href="/client/instant-quote">
                Get Free Assessment
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-blue-300">
            Serving Brisbane • Ipswich • Logan • Gold Coast • Sunshine Coast
          </p>
        </div>
      </section>
    </main>
  );
}