import { Phone, Clock, Shield, Droplets, Flame, Wind, Package, AlertTriangle, Biohazard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/landing-page-hero.png"
            alt="Emergency Water Damage Restoration Brisbane by IICRC Master Restorer Phill McGurk - 24/7 emergency response for water, fire, and storm damage across Brisbane, Ipswich, and Logan"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-90"
            priority
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 opacity-40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,24,39,0.8)_100%)]"></div>

        {/* Hero Content */}
        <div className="relative z-10 container px-4 md:px-6 py-16 md:py-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              DISASTER RECOVERY BRISBANE
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              24/7 Emergency Property Restoration Services
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-md">Brisbane | Ipswich | Logan</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg h-auto">
                <a href="tel:1300309361">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: 1300 309 361
                </a>
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 text-lg h-auto"
              >
                <Clock className="mr-2 h-5 w-5" />
                Available 24/7
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-4">Our Restoration Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Professional disaster recovery and restoration services available 24/7 across Brisbane, Ipswich, and Logan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
            <Link href="/services/water-damage-restoration" className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/services/water-damage-restoration.webp"
                alt="Water damage restoration team performing professional water extraction"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Water Damage Restoration</h3>
                <p className="text-gray-600">
                  Emergency water extraction, drying, and restoration services for floods, leaks, and burst pipes.
                </p>
              </div>
            </Link>

            <Link href="/services/fire-damage-restoration" className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/services/fire-damage-restoration.webp"
                alt="Fire damage restoration services"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Flame className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fire & Smoke Restoration</h3>
                <p className="text-gray-600">
                  Complete fire damage restoration including smoke removal, odour elimination, and structural repairs.
                </p>
              </div>
            </Link>

            <Link href="/services/storm-damage-restoration" className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/services/Ascot, Qld Storm.webp"
                alt="Storm damage recovery and disaster restoration"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Wind className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Storm Damage Recovery</h3>
                <p className="text-gray-600">
                  Expert storm and wind damage repairs, roof tarping, and emergency boarding services.
                </p>
              </div>
            </Link>

            <Link href="/services/mould-remediation" className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/services/mould-remediation.webp"
                alt="Mould remediation services - before and after"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Mould Remediation</h3>
                <p className="text-gray-600">
                  Professional mould inspection, testing, and complete remediation with preventive solutions.
                </p>
              </div>
            </Link>

            <Link href="/services/biohazard-remediation" className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/services/crime-scene-remediation.webp"
                alt="Biohazard cleanup and remediation services"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Biohazard className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hazard & Biohazard Remediation</h3>
                <p className="text-gray-600">
                  Specialised hazardous material cleanup and biohazard remediation with certified safety protocols.
                </p>
              </div>
            </Link>

            <Link href="/services/sewage-backup-remediation" className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/services/sewage-sanitisation.webp"
                alt="Sewage backup remediation services"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sewage Backup Remediation</h3>
                <p className="text-gray-600">
                  Emergency sewage cleanup and sanitisation with proper disposal and decontamination procedures.
                </p>
              </div>
            </Link>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/commercial-management-brisbane.webp"
                alt="Contents packout and storage services"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Contents Packout & Storage</h3>
                <p className="text-gray-600">
                  Professional inventory, packing, and secure storage of your belongings during restoration.
                </p>
              </div>
            </div>

            <Link href="/services/commercial" className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/services/Commercial Restoration Services.webp"
                alt="Commercial property restoration services"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Commercial Restoration</h3>
                <p className="text-gray-600">
                  Specialised commercial property restoration services minimising business downtime and disruption.
                </p>
              </div>
            </Link>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/images/hero/disaster-recovery-services.webp"
                alt="Professional property damage assessments"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Insurance Claims Assistance</h3>
                <p className="text-gray-600">
                  Expert guidance through the insurance claims process with detailed documentation and assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Disaster Recovery Brisbane?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                24/7
              </div>
              <h3 className="font-bold mb-2">Emergency Response</h3>
              <p className="text-gray-600 text-sm">Available around the clock for your emergency restoration needs</p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                IICRC
              </div>
              <h3 className="font-bold mb-2">Certified Professionals</h3>
              <p className="text-gray-600 text-sm">IICRC Master Restorer certified - Phill McGurk leads our expert team</p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                30+
              </div>
              <h3 className="font-bold mb-2">Years Experience</h3>
              <p className="text-gray-600 text-sm">Decades of expertise in disaster recovery and restoration</p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                100%
              </div>
              <h3 className="font-bold mb-2">Insurance Approved</h3>
              <p className="text-gray-600 text-sm">Work with all major insurance companies - Suncorp, RACQ, Allianz, QBE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Associations Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-4">Our Professional Memberships</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We are connected with Australian industry leading professional groups, ensuring the highest standards in
            restoration services and continuous professional development
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            {/* CARSI */}
            <a
              href="https://carsi.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 hover:bg-gray-100"
            >
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src="/images/logos/3d-carsi-logo.webp"
                  alt="CARSI - Cleaning and Restoration Science Institute"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="font-bold text-center mb-2">CARSI</h3>
              <p className="text-sm text-gray-600 text-center">Cleaning and Restoration Science Institute</p>
            </a>

            {/* IICRC */}
            <a
              href="https://iicrc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 hover:bg-gray-100"
            >
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src="/images/optimized/branding/iicrc-logo.webp"
                  alt="IICRC - Institute of Inspection Cleaning and Restoration Certification"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="font-bold text-center mb-2">IICRC</h3>
              <p className="text-sm text-gray-600 text-center">
                Institute of Inspection Cleaning, Restoration, and Certification
              </p>
            </a>

            {/* Clean Claims */}
            <a
              href="https://www.cleanclaims.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 hover:bg-gray-100"
            >
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src="/images/logos/3d-clean-claims-logo.webp"
                  alt="Clean Claims - Field Software"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="font-bold text-center mb-2">Clean Claims</h3>
              <p className="text-sm text-gray-600 text-center">Field Software Partner</p>
            </a>

            {/* Disaster Recovery Logo */}
            <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50">
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src="/images/optimized/branding/disaster-recovery-logo.webp"
                  alt="Disaster Recovery Brisbane - Professional Restoration Services"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="font-bold text-center mb-2">Disaster Recovery</h3>
              <p className="text-sm text-gray-600 text-center">Brisbane • Ipswich • Logan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Master Restorer Certification Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">IICRC Master Restorer - Phill McGurk</h2>
              <p className="text-gray-600 mb-6">
                Phill McGurk is one of Brisbane's limited IICRC Master Restorer certified professionals - the highest credential in disaster recovery. This means your property receives master-level expertise in water, fire, and smoke restoration.
              </p>
              <p className="text-gray-600 mb-6">
                Master Restorer certification requires extensive experience, advanced training, and proven track records on complex high-value property restoration. When disaster strikes your Brisbane property, trust a true Master Restorer.
              </p>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-4">
                <a href="tel:1300309361">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Master Restorer: 1300 309 361
                </a>
              </Button>
            </div>
            <div>
              <Image
                src="/images/services/122821_IICRC_Master_Plaques.webp"
                alt="IICRC Master Certifications for Phill McGurk"
                width={600}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-4">Service Areas</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Emergency restoration services across Brisbane, Ipswich, and Logan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Brisbane</h3>
              <p className="text-gray-600 mb-4">
                <strong>High-Value Suburbs:</strong> Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba
              </p>
              <p className="text-gray-600 text-sm">
                Brisbane CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Chermside, Carindale, Mt Gravatt, Indooroopilly
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Ipswich</h3>
              <p className="text-gray-600 mb-4">
                <strong>Premium Areas:</strong> Karalee, Brookwater, Springfield Lakes
              </p>
              <p className="text-gray-600 text-sm">
                Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Logan</h3>
              <p className="text-gray-600 mb-4">
                <strong>Commercial Focus:</strong> Logan Central business district, industrial areas
              </p>
              <p className="text-gray-600 text-sm">
                Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby
              </p>
            </div>
          </div>
          <div className="mt-8 text-center bg-blue-50 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-gray-700">
              <strong>Emergency Response Times:</strong> 60 minutes Brisbane CBD & inner suburbs • 90 minutes greater Brisbane, Ipswich, Logan
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold mb-6">Need Emergency Restoration Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait! Contact our 24/7 emergency response team now for immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg h-auto">
              <a href="tel:1300309361">
                <Phone className="mr-2 h-5 w-5" />
                1300 309 361
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg h-auto bg-transparent"
            >
              <a href="mailto:admin@disasterrecovery.com.au">
                Request a Quote
              </a>
            </Button>
          </div>
          <p className="mt-8 text-lg text-red-100">
            Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs
          </p>
        </div>
      </section>
    </div>
  )
}
