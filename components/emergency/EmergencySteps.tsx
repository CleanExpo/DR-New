import { Phone, AlertTriangle, Wrench, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    step: 1,
    title: 'Call Immediately',
    description: 'Call 1300 309 361 now. Our emergency team answers 24/7/365. Every minute counts in disaster recovery.',
    icon: Phone,
    color: 'red'
  },
  {
    step: 2,
    title: 'Rapid Response',
    description: 'IICRC Master Restorer dispatched to your location. We guarantee arrival within 60 minutes or less.',
    icon: AlertTriangle,
    color: 'orange'
  },
  {
    step: 3,
    title: 'Immediate Action',
    description: 'Emergency mitigation begins on-site: water extraction, damage containment, safety measures.',
    icon: Wrench,
    color: 'blue'
  },
  {
    step: 4,
    title: 'Insurance Coordination',
    description: 'Complete documentation for your insurance claim. Direct billing available - no upfront costs.',
    icon: CheckCircle,
    color: 'green'
  }
];

export function EmergencySteps() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Emergency Response Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            When disaster strikes, every second counts. Here's what happens when you call.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((item) => {
            const Icon = item.icon;
            const colorClasses = {
              red: 'bg-red-600 text-white',
              orange: 'bg-orange-600 text-white',
              blue: 'bg-blue-600 text-white',
              green: 'bg-green-600 text-white'
            };

            return (
              <div key={item.step} className="flex gap-4 md:gap-6 items-start">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center text-2xl font-bold shadow-lg`}>
                  {item.step}
                </div>
                <Card className="flex-1 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <Icon className={`w-8 h-8 ${item.color === 'red' ? 'text-red-600' : item.color === 'orange' ? 'text-orange-600' : item.color === 'blue' ? 'text-blue-600' : 'text-green-600'} flex-shrink-0`} />
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-lg">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Urgent CTA */}
        <div className="mt-12 text-center">
          <div className="bg-red-600 text-white rounded-xl p-8 max-w-2xl mx-auto shadow-2xl">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <p className="text-2xl font-bold mb-4">Don't Wait - Damage Spreads Fast</p>
            <p className="text-lg mb-6">Water damage can increase by $5,000+ every 6 hours</p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <Phone className="mr-2 h-6 w-6" />
              CALL NOW: 1300 309 361
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
