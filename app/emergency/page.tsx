import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Moon, Sun, AlertTriangle, ArrowRight, DollarSign, Phone} from 'lucide-react';
import { EmergencySteps } from '@/components/emergency/EmergencySteps';

export const metadata: Metadata = {
  title: '24/7 Emergency Response | 60-Min Arrival | Call 1300 309 361 NOW',
  description: 'URGENT disaster recovery Brisbane. IICRC Master Restorer on-site in 60 minutes. 24/7/365 emergency response. Water, fire, storm damage. Insurance approved.' };

const scenarios = [
  {
    "name": "After Hours Emergency Service",
    "slug": "after-hours-emergency",
    "timeframe": "5PM - 9AM Weekdays",
    "surcharge": "$500",
    "responseTime": "30 minutes",
    "urgencyLevel": "Critical"
  },
  {
    "name": "Weekend Emergency Response",
    "slug": "weekend-emergency",
    "timeframe": "Saturday & Sunday",
    "surcharge": "$750",
    "responseTime": "30 minutes",
    "urgencyLevel": "Critical"
  },
  {
    "name": "Public Holiday Emergency",
    "slug": "public-holiday-emergency",
    "timeframe": "All Public Holidays",
    "surcharge": "$1000",
    "responseTime": "45 minutes",
    "urgencyLevel": "Critical"
  },
  {
    "name": "Midnight Emergency Response",
    "slug": "midnight-emergency",
    "timeframe": "12AM - 6AM",
    "surcharge": "$750",
    "responseTime": "45 minutes",
    "urgencyLevel": "Extreme"
  },
  {
    "name": "Christmas Day Emergency",
    "slug": "christmas-emergency",
    "timeframe": "December 25th",
    "surcharge": "$1500",
    "responseTime": "60 minutes",
    "urgencyLevel": "Extreme"
  },
  {
    "name": "New Year Emergency Service",
    "slug": "new-year-emergency",
    "timeframe": "December 31st - January 1st",
    "surcharge": "$1500",
    "responseTime": "60 minutes",
    "urgencyLevel": "Extreme"
  },
  {
    "name": "Early Morning Emergency",
    "slug": "early-morning-emergency",
    "timeframe": "4AM - 7AM",
    "surcharge": "$500",
    "responseTime": "30 minutes",
    "urgencyLevel": "High"
  },
  {
    "name": "Sunday Night Emergency",
    "slug": "sunday-night-emergency",
    "timeframe": "Sunday 6PM - Monday 6AM",
    "surcharge": "$750",
    "responseTime": "30 minutes",
    "urgencyLevel": "High"
  }
];

export default function EmergencyTimesPage() {
  const getIcon = (name: string) => {
    if (name.includes('Weekend')) {return Sun;}
    if (name.includes('Night') || name.includes('Midnight')) {return Moon;}
    if (name.includes('Holiday') || name.includes('Christmas') || name.includes('Year')) {return Calendar;}
    return Clock;
  };

  const getColorClass = (level: string) => {
    if (level === 'Extreme') {return 'bg-red-700';}
    if (level === 'Critical') {return 'bg-blue-700';}
    return 'bg-yellow-600';
  };

  return (
    <div className="min-h-screen">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-4 animate-pulse sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <AlertTriangle className="h-6 w-6" />
          <span className="font-bold text-lg">EMERGENCY - CALL NOW: 1300 309 361</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-red-900 via-orange-800 to-red-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-600 px-6 py-3 rounded-full mb-6">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold uppercase tracking-wide">24/7 Emergency Service</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Emergency Disaster Recovery Brisbane
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              IICRC Master Restorer on-site within 60 minutes. Available 24/7/365 for all emergency restoration needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-1">60 Minutes</div>
                <div className="text-orange-100">Maximum Response Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-1">24/7/365</div>
                <div className="text-orange-100">Always Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-orange-100">Insurance Covered</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-5 bg-white text-red-600 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-red-500/50 transform hover:scale-105"
              >
                <Phone className="mr-3 h-6 w-6" />
                CALL NOW: 1300 309 361
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-5 bg-orange-600 text-white rounded-lg font-bold text-xl hover:bg-orange-700 transition-all border-2 border-white/30"
              >
                Emergency Online Form
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Steps Component */}
      <EmergencySteps />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Emergency Response Times & Surcharges
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const IconComponent = getIcon(scenario.name);
              const colorClass = getColorClass(scenario.urgencyLevel);
              const totalFee = 2200 + parseInt(scenario.surcharge.replace('$', '').replace(',', ''));
              
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-10 w-10 text-blue-700" />
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${colorClass}`}>
                      {scenario.urgencyLevel}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{scenario.name}</h2>
                  <div className="space-y-2 mb-4 text-gray-700">
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {scenario.timeframe}
                    </p>
                    <p className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Surcharge: {scenario.surcharge}
                    </p>
                    <p className="flex items-center font-bold text-black">
                      <AlertTriangle className="h-4 w-4 mr-2 text-blue-700" />
                      Total: $${totalFee.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded p-3 mb-4">
                    <p className="text-sm font-bold text-green-800">
                      {scenario.responseTime} Response
                    </p>
                  </div>
                  <Link href={`/emergency/${scenario.slug}`}>
                    <Button className="w-full" variant="outline">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Reference Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Quick Reference: When to Call
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="p-4 text-left">Time Period</th>
                    <th className="p-4 text-center">Surcharge</th>
                    <th className="p-4 text-center">Total Fee</th>
                    <th className="p-4 text-center">Response</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((scenario, index) => {
                    const total = 2200 + parseInt(scenario.surcharge.replace('$', '').replace(',', ''));
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4">
                          <div>
                            <p className="font-bold">{scenario.name}</p>
                            <p className="text-sm text-gray-700">{scenario.timeframe}</p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-bold">{scenario.surcharge}</td>
                        <td className="p-4 text-center font-bold text-blue-700">
                          $${total.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">{scenario.responseTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Emergency Happening Now?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Every minute counts in disaster recovery. Call now for immediate response,
            any time, any day. Insurance covers all emergency fees.
          </p>
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