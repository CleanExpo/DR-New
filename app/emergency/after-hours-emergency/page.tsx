import { Metadata } from 'next';
import { Clock, AlertTriangle, DollarSign, Zap, Shield, Calendar, Moon, Phone} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmergencyHero } from '@/components/emergency/EmergencyHero';

export const metadata: Metadata = {
  title: 'After Hours Emergency Service | 5PM - 9AM Weekdays | Call 1300 309 361',
  description: 'URGENT after-hours emergency response. 30 minutes response time. Available 5PM - 9AM Weekdays. IICRC Master Restorer. Insurance approved.',
  keywords: ["after hours emergency","night time disaster recovery","evening emergency service"]
};

export default function AfterHoursEmergencyServicePage() {
  return (
    <div className="min-h-screen">
      <EmergencyHero
        title="After Hours Emergency Service"
        subtitle="Critical emergency response when disaster strikes outside business hours"
        timeframe="5PM - 9AM Weekdays"
        responseTime="30 Minutes"
        totalFee="$2,700"
        urgencyLevel="critical"
      />

      {/* Why We Charge More Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why After Hours Emergency Service Costs More
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">
                5PM - 9AM Weekdays Surcharge: $500
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Premium rates for specialised technicians</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Double-time penalty rates for staff</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>On-call team availability costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Emergency vehicle dispatch priority</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Immediate parts and equipment access</span>
                </li>
              </ul>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                What You Get for the Premium
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>30 minutes guaranteed response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Senior technicians only (10+ years)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Priority over standard callouts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Complete equipment mobilization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Insurance direct billing available</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost of Waiting Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-red-600">
              The True Cost of Waiting Until Business Hours
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-red-600 mb-2">+$5,000</p>
                <p className="font-bold mb-2">Every 6 Hours</p>
                <p className="text-gray-200">Additional damage from water spreading</p>
              </Card>
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-blue-700 mb-2">+$8,000</p>
                <p className="font-bold mb-2">After 12 Hours</p>
                <p className="text-gray-200">Mould growth begins, structural damage</p>
              </Card>
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-red-700 mb-2">+$15,000</p>
                <p className="font-bold mb-2">After 24 Hours</p>
                <p className="text-gray-200">Major structural repairs required</p>
              </Card>
            </div>
            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-8">
              <p className="text-2xl font-bold text-green-800 mb-4">
                Save Thousands by Acting Now
              </p>
              <p className="text-lg text-gray-200 mb-6">
                Our $500 5pm - 9am weekdays surcharge is a fraction 
                of the cost of waiting until regular hours.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-800">
                <MessageSquare className="mr-2 h-5 w-5" />
                Submit Form Now - Save $15,000+ in Damage
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Insurance Covers After Hours Emergency Service Fees
            </h2>
            <Card className="p-8 bg-blue-50">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-2xl font-bold">Most Policies Include After-Hours Coverage</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">Standard Coverage Includes:</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• Emergency response fees</li>
                    <li>• After-hours surcharges</li>
                    <li>• Weekend penalty rates</li>
                    <li>• Holiday service premiums</li>
                    <li>• Priority response costs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-3">We Handle Everything:</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• Direct insurance billing</li>
                    <li>• All documentation provided</li>
                    <li>• Photos and reports included</li>
                    <li>• Adjuster coordination</li>
                    <li>• No upfront payment needed</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6">
            After Hours Emergency Happening Now?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't let after-hours timing cost you thousands more in damage.
            Our expert teams are ready NOW with 30 minutes response.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">Total Emergency Fee:</p>
            <p className="text-3xl font-bold">$2,200 base + $500 = $2,700</p>
            <p className="text-lg mt-2">Insurance Approved - Direct Billing Available</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-5 bg-white text-red-600 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
            >
              <Phone className="mr-3 h-6 w-6" />
              CALL NOW: 1300 309 361
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-5 bg-red-800 text-white rounded-lg font-bold text-xl hover:bg-red-900 transition-all border-2 border-white/30"
            >
              Submit Emergency Form
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}