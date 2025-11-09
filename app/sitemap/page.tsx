import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MapPin, FileText, DollarSign, Shield, Users, HelpCircle, Clock, Building, AlertCircle, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Sitemap - All Pages | IICRC Master Restorer Brisbane',
  description: 'Complete sitemap of all emergency restoration services, locations, and resources. Brisbane, Ipswich & Logan disaster recovery services.',
  robots: {
    index: true,
    follow: true
  }
};

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: FileText,
      links: [
        { href: '/', label: 'Homepage' },
        { href: '/get-help', label: 'Get Emergency Help - 24/7' },
        { href: '/about', label: 'About Phill McGurk - Master Restorer' },
        { href: '/contact', label: 'Contact Us' },
        { href: '/pricing', label: 'Pricing Guide' },
        { href: '/insurance-claims', label: 'Insurance Claims Support' },
      ]
    },
    {
      title: 'Core Restoration Services',
      icon: Shield,
      links: [
        { href: '/services', label: 'All Services' },
        { href: '/services/water-damage-restoration', label: 'Water Damage Restoration' },
        { href: '/services/fire-damage-restoration', label: 'Fire & Smoke Damage Restoration' },
        { href: '/services/mould-remediation', label: 'Mould Remediation' },
        { href: '/services/storm-damage-restoration', label: 'Storm Damage Restoration' },
        { href: '/services/flood-recovery', label: 'Flood Recovery' },
      ]
    },
    {
      title: 'Emergency Services',
      icon: AlertCircle,
      links: [
        { href: '/services/emergency-response', label: '24/7 Emergency Response' },
        { href: '/services/emergency-services', label: 'Emergency Services Overview' },
        { href: '/services/structural-drying', label: 'Structural Drying' },
        { href: '/services/biohazard-cleanup', label: 'Biohazard Cleanup' },
        { href: '/services/sewage-cleanup', label: 'Sewage Cleanup' },
        { href: '/services/trauma-cleanup', label: 'Trauma Cleanup' },
      ]
    },
    {
      title: 'Water Damage Services',
      icon: Wrench,
      links: [
        { href: '/services/water-damage', label: 'Water Damage Services' },
        { href: '/services/water-damage/burst-pipes', label: 'Burst Pipe Repair' },
        { href: '/services/water-damage/ceiling-water-damage', label: 'Ceiling Water Damage' },
        { href: '/services/water-damage/roof-leak-damage', label: 'Roof Leak Damage' },
        { href: '/services/water-damage/hot-water-system-burst', label: 'Hot Water System Burst' },
        { href: '/services/water-damage/toilet-overflow', label: 'Toilet Overflow' },
        { href: '/services/water-damage/washing-machine-flooding', label: 'Washing Machine Flooding' },
        { href: '/services/water-damage/dishwasher-leaks', label: 'Dishwasher Leaks' },
        { href: '/services/water-damage/shower-leaks', label: 'Shower Leaks' },
      ]
    },
    {
      title: 'Fire Damage Services',
      icon: Shield,
      links: [
        { href: '/services/fire-damage', label: 'Fire Damage Services' },
        { href: '/services/fire-damage/bushfire-smoke-damage', label: 'Bushfire Smoke Damage' },
        { href: '/services/fire-damage/commercial-fire-damage', label: 'Commercial Fire Damage' },
        { href: '/services/fire-damage/electrical-fire-damage', label: 'Electrical Fire Damage' },
        { href: '/services/fire-damage/kitchen-fire-damage', label: 'Kitchen Fire Damage' },
        { href: '/services/fire-damage/smoke-odour-removal', label: 'Smoke Odour Removal' },
        { href: '/services/fire-damage/soot-damage-cleanup', label: 'Soot Damage Cleanup' },
      ]
    },
    {
      title: 'Commercial Services',
      icon: Building,
      links: [
        { href: '/services/commercial', label: 'Commercial Services' },
        { href: '/services/commercial-services', label: 'Commercial Services Overview' },
        { href: '/services/commercial-services/office-water-damage', label: 'Office Water Damage' },
        { href: '/services/commercial-services/retail-flood-damage', label: 'Retail Flood Damage' },
        { href: '/services/commercial-services/warehouse-flooding', label: 'Warehouse Flooding' },
        { href: '/services/commercial-services/hospital-water-damage', label: 'Hospital Water Damage' },
        { href: '/services/commercial-services/school-water-damage', label: 'School Water Damage' },
        { href: '/services/commercial-services/hotel-flood-recovery', label: 'Hotel Flood Recovery' },
      ]
    },
    {
      title: 'Brisbane Service Areas',
      icon: MapPin,
      links: [
        { href: '/locations/hamilton', label: 'Hamilton Water Damage' },
        { href: '/locations/ascot', label: 'Ascot Water Damage' },
        { href: '/locations/new-farm', label: 'New Farm Water Damage' },
        { href: '/locations/toowong', label: 'Toowong Water Damage' },
      ]
    },
    {
      title: 'Ipswich Service Areas',
      icon: MapPin,
      links: [
        { href: '/locations/karalee', label: 'Karalee Water Damage' },
        { href: '/locations/brookwater', label: 'Brookwater Water Damage' },
        { href: '/locations/springfield-lakes', label: 'Springfield Lakes Water Damage' },
      ]
    },
    {
      title: 'Emergency Response Times',
      icon: Clock,
      links: [
        { href: '/emergency', label: 'Emergency Response' },
        { href: '/emergency/after-hours', label: 'After Hours Service' },
        { href: '/emergency/weekend', label: 'Weekend Emergency' },
        { href: '/emergency/public-holiday', label: 'Public Holiday Service' },
        { href: '/emergency/christmas', label: 'Christmas Emergency' },
        { href: '/emergency/new-year', label: 'New Year Service' },
        { href: '/emergency/easter', label: 'Easter Emergency' },
        { href: '/emergency/midnight', label: 'Midnight Emergency' },
      ]
    },
    {
      title: 'FAQs & Resources',
      icon: HelpCircle,
      links: [
        { href: '/faq', label: 'All FAQs' },
        { href: '/faq/general', label: 'General Questions' },
        { href: '/faq/water-damage', label: 'Water Damage FAQs' },
        { href: '/faq/fire-damage', label: 'Fire Damage FAQs' },
        { href: '/faq/mould-removal', label: 'Mould Removal FAQs' },
        { href: '/faq/insurance-claims', label: 'Insurance FAQs' },
        { href: '/faq/emergency-response', label: 'Emergency Response FAQs' },
      ]
    },
    {
      title: 'Insurance Partners',
      icon: Shield,
      links: [
        { href: '/insurance/aami', label: 'AAMI Insurance' },
        { href: '/insurance/allianz', label: 'Allianz Insurance' },
        { href: '/insurance/suncorp', label: 'Suncorp Insurance' },
        { href: '/insurance/nrma', label: 'NRMA Insurance' },
        { href: '/insurance/qbe', label: 'QBE Insurance' },
        { href: '/insurance/racq', label: 'RACQ Insurance' },
        { href: '/insurance/gio', label: 'GIO Insurance' },
        { href: '/insurance/cgu', label: 'CGU Insurance' },
      ]
    },
    {
      title: 'Guides & Education',
      icon: FileText,
      links: [
        { href: '/guides/water-damage', label: 'Water Damage Guides' },
        { href: '/guides/fire-damage', label: 'Fire Damage Guides' },
        { href: '/guides/mould', label: 'Mould Guides' },
        { href: '/guides/storm-damage', label: 'Storm Damage Guides' },
        { href: '/guides/insurance', label: 'Insurance Guides' },
        { href: '/guides/emergency', label: 'Emergency Guides' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              HTML Sitemap
            </h1>
            <p className="text-xl mb-4">
              Complete directory of all disaster recovery services and resources
            </p>
            <p className="text-blue-200">
              IICRC Master Restorer serving Brisbane, Ipswich & Logan
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sitemapSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" />
                      <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className="text-gray-700 hover:text-blue-600 hover:underline text-sm block py-1 transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Need Emergency Help?</h2>
          <p className="mb-6 text-red-100">
            24/7 Emergency Response - 60 Minute Arrival
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-help">
              <button className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
                Get Help Now
              </button>
            </Link>
            <Link href="tel:1300309361">
              <button className="bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition font-semibold border-2 border-white">
                Call 1300 309 361
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            IICRC Master Restorer | 24/7 Emergency Water, Fire & Mould Restoration | Brisbane, Ipswich & Logan
          </p>
        </div>
      </section>
    </div>
  );
}
