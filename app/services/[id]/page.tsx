import React from 'react'
import { notFound } from 'next/navigation'
import { getServiceById, getAllServiceIds } from '@/lib/services-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, AlertTriangle, Shield, CheckCircle, MapPin } from 'lucide-react'
import { Footer } from '@/components/footer'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = getAllServiceIds()
  return ids.map((id) => ({
    id: id,
  }))
}

export default async function ServicePage({ params }: PageProps) {
  const { id } = await params
  const service = getServiceById(id)

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 30, 60, 0.85), rgba(0, 30, 60, 0.85)), url('${service.heroImage || '/professional-emergency-response-team-background-wi.jpg'}')`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {service.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {service.heroSubtitle}
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {service.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href={`tel:+61${service.phoneNumber.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center h-10 rounded-md px-8 py-6 bg-primary hover:bg-primary/90 text-white font-semibold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                {service.ctaText}
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 bg-transparent backdrop-blur-sm"
              >
                Free {service.title.includes('Mould') ? 'Mould' : 'Service'} Assessment
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>IICRC Master Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Safe Removal Protocols</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Health-Focused Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Warning Section */}
      {service.healthWarning && (
        <section className="py-16 bg-red-50 dark:bg-red-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600 shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
                    {service.healthWarning.title}
                  </h2>
                  <p className="text-lg text-red-800 dark:text-red-200 mb-6">
                    {service.healthWarning.description}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {service.healthWarning.risks.map((risk, index) => (
                  <Card key={index} className="border-red-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-red-900">{risk.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-red-800">{risk.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Professional Section */}
      {service.whyProfessional && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <img 
                  src="/images/WhatsApp Image 2025-11-11 at 08.05.42 (1).jpeg" 
                  alt="Professional service" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {service.whyProfessional.title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  {service.whyProfessional.description}
                </p>
                <a
                href={`tel:+61${service.phoneNumber.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center h-10 rounded-md px-4 py-2 bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Emergency: {service.phoneNumber}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Common Problems Section */}
      {service.commonProblems && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Common {service.title.includes('Mould') ? 'Mould' : 'Service'} Problems We Remediate
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                From black mould to bathroom mould - Master Restorer certified safe removal for all mould types
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {service.commonProblems.map((problem, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="relative h-40 overflow-hidden rounded-t-lg">
                    <img 
                      src={`/images/WhatsApp Image 2025-11-11 at 08.06.${30 + (index % 3)}.jpeg`}
                      alt={problem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">{problem.description}</p>
                    {problem.dangerLevel && (
                      <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                          Danger Level: {problem.dangerLevel}
                        </p>
                      </div>
                    )}
                    {problem.detection && (
                      <div>
                        <p className="text-sm font-semibold mb-1">Detection:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{problem.detection}</p>
                      </div>
                    )}
                    {problem.treatment && (
                      <div>
                        <p className="text-sm font-semibold mb-1">Treatment:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{problem.treatment}</p>
                      </div>
                    )}
                    {problem.certification && (
                      <div>
                        <p className="text-sm font-semibold mb-1">Certification:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{problem.certification}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {service.process && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Master Restorer {service.title.includes('Mould') ? 'Mould Remediation' : 'Service'} Process
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                IICRC certified {service.process.length}-step safe {service.title.includes('Mould') ? 'mould removal' : 'service'} process developed by Master Restorer Phill McGurk
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-1">
                          <img 
                            src={`/images/WhatsApp Image 2025-11-11 at 08.06.${31 + (index % 2)}.jpeg`}
                            alt={step.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                      <div className="flex gap-6">
                        <div className="shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                        </div>
                      </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Excellence Section */}
      {service.excellence && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {service.excellence.title}
              </h2>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {service.excellence.points.map((point, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <div className="relative h-40 overflow-hidden rounded-t-lg">
                      <img 
                        src={`/images/WhatsApp Image 2025-11-11 at 08.06.${32 + (index % 2)}.jpeg`}
                        alt={point.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{point.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">{point.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service Areas Section */}
      {service.serviceAreas && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {service.serviceAreas.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Professional {service.title.includes('Mould') ? 'mould removal' : 'service'} across all Brisbane metro areas - residential and commercial properties
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {service.serviceAreas.areas.map((area, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-primary" />
                        {area.region}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">High Priority Suburbs:</p>
                        <p className="text-gray-700 dark:text-gray-300">{area.highPriority.join(' • ')}</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">All {area.region} Areas:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{area.allAreas.join(', ')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Visual Guide Section */}
      {service.visualGuide && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {service.visualGuide.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                See how our IICRC Master certified process safely removes mould and restores healthy indoor air quality
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {service.visualGuide.stages.map((stage, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="text-sm font-semibold text-primary mb-2">{stage.stage}</div>
                      <CardTitle className="text-xl">{stage.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">{stage.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      {service.finalCta && (
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">
                {service.finalCta.title}
              </h2>
              <p className="text-xl text-gray-100">
                {service.finalCta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:+61${service.phoneNumber.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center h-10 rounded-md px-8 py-6 bg-white text-primary hover:bg-gray-100 font-semibold text-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call {service.phoneNumber} Now
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 bg-transparent"
                >
                  Email for Assessment
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
                {service.finalCta.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-200 pt-4">
                {service.finalCta.servingAreas}
              </p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
