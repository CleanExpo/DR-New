import Card from '../ui/Card';

const serviceAreas = [
  {
    city: 'Brisbane',
    description: 'Complete coverage across all Brisbane suburbs including CBD, North, South, East, and West Brisbane.',
    suburbs: ['Brisbane CBD', 'Fortitude Valley', 'South Brisbane', 'West End', 'New Farm', 'Paddington', 'Milton', 'Toowong'],
    responseTime: '30-45 minutes',
    population: '2.6M+',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    city: 'Ipswich',
    description: 'Comprehensive disaster recovery services throughout Ipswich and surrounding areas.',
    suburbs: ['Ipswich CBD', 'Springfield', 'Redbank', 'Goodna', 'Brassall', 'Bundamba', 'Booval', 'Karalee'],
    responseTime: '45-60 minutes',
    population: '200K+',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    )
  },
  {
    city: 'Logan',
    description: 'Professional restoration services across Logan City and surrounding commercial districts.',
    suburbs: ['Logan Central', 'Browns Plains', 'Springwood', 'Woodridge', 'Beenleigh', 'Shailer Park', 'Logan Village', 'Loganholme'],
    responseTime: '45-60 minutes',
    population: '350K+',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm2 10a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/>
      </svg>
    )
  }
];

export default function ServiceAreas() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-50 rounded-full px-6 py-2 mb-4">
            <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span className="text-primary-700 font-semibold">Service Coverage</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Rapid Response Across South East Queensland
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our strategically located teams provide fast emergency response across Brisbane, Ipswich, and Logan.
            We understand that every minute counts in disaster recovery, which is why we guarantee rapid response
            times across all service areas.
          </p>
        </div>

        {/* Service Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {serviceAreas.map((area, index) => (
            <Card key={index} hover className="group">
              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {area.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{area.city}</h3>

                <div className="flex items-center justify-center space-x-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {area.responseTime}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3h3a3 3 0 013 3v2a3 3 0 01-3 3z"/>
                    </svg>
                    {area.population}
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {area.description}
                </p>

                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Areas Covered:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {area.suburbs.map((suburb, suburbIndex) => (
                      <div key={suburbIndex} className="flex items-center text-sm text-gray-600">
                        <svg className="w-3 h-3 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {suburb}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Response Time Guarantee */}
        <div className="bg-gradient-to-r from-emergency-600 to-emergency-700 rounded-2xl p-8 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Emergency Response Time Guarantee
            </h3>
            <p className="text-emergency-100 text-lg mb-6 leading-relaxed">
              We guarantee arrival within 1 hour for emergency situations across all service areas.
              Our mobile response units are strategically positioned to ensure the fastest possible response
              when disaster strikes your property.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-emergency-200">Available Every Day</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">&lt;1hr</div>
                <div className="text-emergency-200">Emergency Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-emergency-200">Satisfaction Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Map Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            <strong>Extended Coverage:</strong> We also provide emergency services to Gold Coast and Sunshine Coast
            for critical situations. Contact us for availability and response times to areas outside our primary service zones.
          </p>
        </div>
      </div>
    </section>
  );
}