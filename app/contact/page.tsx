import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Phone, Mail, MapPin, Clock, AlertCircle, Shield, Building, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Disaster Recovery - 24/7 Emergency Response',
  description: 'Contact Disaster Recovery for immediate assistance. Call 1300 309 361 for 24/7 emergency response. Office at 4/17 Tile St, Wacol QLD 4076.',
  robots: 'index, follow',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl">Available 24/7 for Emergency Disaster Recovery Services</p>
            </div>
          </div>
        </section>

        {/* Emergency Contact Bar */}
        <section className="bg-red-600 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 animate-pulse" />
                <span className="font-bold text-lg">EMERGENCY? CALL NOW:</span>
              </div>
              <a
                href="tel:1300309361"
                className="flex items-center bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-6 h-6 mr-2" />
                1300 309 361
              </a>
              <div className="text-sm">1-Hour Emergency Response</div>
            </div>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Phone Contact */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Call Us</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-700">24/7 Emergency Hotline</p>
                    <a href="tel:1300309361" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                      1300 309 361
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Office Hours</p>
                    <p className="text-gray-700">Mon-Fri: 7:00 AM - 6:00 PM</p>
                    <p className="text-gray-700">Sat-Sun: Emergency Only</p>
                  </div>
                </div>
              </div>

              {/* Email Contact */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-700">General Enquiries</p>
                    <a href="mailto:info@disasterrecovery.com.au" className="text-lg text-blue-600 hover:text-blue-700 break-all">
                      info@disasterrecovery.com.au
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Insurance Claims</p>
                    <a href="mailto:claims@disasterrecovery.com.au" className="text-lg text-blue-600 hover:text-blue-700 break-all">
                      claims@disasterrecovery.com.au
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-700">Head Office</p>
                    <address className="text-gray-700 not-italic">
                      4/17 Tile St<br />
                      Wacol, QLD 4076<br />
                      Australia
                    </address>
                  </div>
                  <a
                    href="https://maps.google.com/?q=4/17+Tile+St+Wacol+QLD+4076"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-required="true"
                    aria-describedby="email-error"
                  />
                  <span id="email-error" className="hidden text-red-600 text-sm mt-1">Please enter a valid email address</span>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Required *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-required="true"
                >
                  <option value="">Select a service</option>
                  <option value="water-damage">Water Damage Restoration</option>
                  <option value="fire-damage">Fire & Smoke Damage</option>
                  <option value="mould">Mould Remediation</option>
                  <option value="storm">Storm Damage</option>
                  <option value="biohazard">Biohazard Cleaning</option>
                  <option value="trauma">Trauma Cleaning</option>
                  <option value="sewage">Sewage Cleanup</option>
                  <option value="other">Other / General Enquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="propertyAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  id="propertyAddress"
                  name="propertyAddress"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-required="true"
                  placeholder="Please describe your situation or requirements..."
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="urgent"
                  name="urgent"
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="urgent" className="ml-2 text-sm text-gray-700">
                  This is an urgent/emergency request
                </label>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>For emergencies requiring immediate assistance, please call 1300 309 361</strong>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Coverage Areas</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Building className="w-6 h-6 text-blue-600 mr-2" />
                  Primary Service Areas
                </h3>
                <p className="text-gray-700 mb-4">1-Hour Emergency Response</p>
                <div className="grid grid-cols-2 gap-2">
                  <ul className="space-y-1">
                    <li className="text-gray-700">Brisbane CBD</li>
                    <li className="text-gray-700">Ipswich</li>
                    <li className="text-gray-700">Logan</li>
                    <li className="text-gray-700">Wacol</li>
                    <li className="text-gray-700">Oxley</li>
                  </ul>
                  <ul className="space-y-1">
                    <li className="text-gray-700">Inala</li>
                    <li className="text-gray-700">Forest Lake</li>
                    <li className="text-gray-700">Springfield</li>
                    <li className="text-gray-700">Goodna</li>
                    <li className="text-gray-700">Redbank</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-6 h-6 text-blue-600 mr-2" />
                  Extended Service Areas
                </h3>
                <p className="text-gray-700 mb-4">50km Radius from Wacol</p>
                <div className="grid grid-cols-2 gap-2">
                  <ul className="space-y-1">
                    <li className="text-gray-700">Toowoomba</li>
                    <li className="text-gray-700">Moreton Bay</li>
                    <li className="text-gray-700">Redcliffe</li>
                    <li className="text-gray-700">Beaudesert</li>
                    <li className="text-gray-700">Gold Coast</li>
                  </ul>
                  <ul className="space-y-1">
                    <li className="text-gray-700">Sunshine Coast</li>
                    <li className="text-gray-700">Caboolture</li>
                    <li className="text-gray-700">Beenleigh</li>
                    <li className="text-gray-700">Cleveland</li>
                    <li className="text-gray-700">Wynnum</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8">
              <div className="max-w-3xl mx-auto text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Insurance Approved Services</h3>
                <p className="text-gray-700 mb-4">
                  We work directly with all major insurance companies including QBE, IAG, RACQ, and Allianz.
                  Our team can manage your entire claim process from start to finish.
                </p>
                <p className="text-sm text-gray-500">
                  ABN: [To be provided] | $20 Million Public Liability Insurance
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}