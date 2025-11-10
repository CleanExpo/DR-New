import { Droplet, Flame, Wind, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CoveredServicesProps {
  providerName: string;
}

const services = [
  {
    title: 'Water Damage Restoration',
    icon: Droplet,
    description: 'Burst pipes, flooding, appliance leaks, storm water intrusion',
    coverage: 'Typically covered when sudden and accidental',
    services: [
      'Emergency water extraction',
      'Structural drying',
      'Dehumidification',
      'Moisture monitoring',
      'Damage repair'
    ],
    color: 'blue'
  },
  {
    title: 'Fire & Smoke Damage',
    icon: Flame,
    description: 'Fire damage, smoke cleanup, soot removal, odor elimination',
    coverage: 'Usually fully covered under comprehensive policies',
    services: [
      'Smoke & soot cleanup',
      'Odor removal',
      'Structural repairs',
      'Content restoration',
      'Board-up services'
    ],
    color: 'red'
  },
  {
    title: 'Storm Damage',
    icon: Wind,
    description: 'Wind damage, hail damage, fallen trees, emergency repairs',
    coverage: 'Covered under most home insurance policies',
    services: [
      'Emergency tarping',
      'Tree removal',
      'Roof repairs',
      'Window replacement',
      'Structural restoration'
    ],
    color: 'orange'
  },
  {
    title: 'Mould Remediation',
    icon: Shield,
    description: 'Mould removal following water damage or moisture events',
    coverage: 'Coverage depends on cause - sudden events usually covered',
    services: [
      'Mould inspection',
      'Containment',
      'Safe removal',
      'HEPA air filtration',
      'Prevention measures'
    ],
    color: 'green'
  }
];

export function CoveredServices({ providerName }: CoveredServicesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Services Covered by {providerName} Insurance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We handle all types of disaster recovery and restoration services covered under your {providerName} policy.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              const colorClasses = {
                blue: {
                  bg: 'bg-blue-100',
                  text: 'text-blue-600',
                  border: 'border-blue-200'
                },
                red: {
                  bg: 'bg-red-100',
                  text: 'text-red-600',
                  border: 'border-red-200'
                },
                orange: {
                  bg: 'bg-orange-100',
                  text: 'text-orange-600',
                  border: 'border-orange-200'
                },
                green: {
                  bg: 'bg-green-100',
                  text: 'text-green-600',
                  border: 'border-green-200'
                }
              };

              const colors = colorClasses[service.color as keyof typeof colorClasses];

              return (
                <Card key={service.title} className="p-6 bg-white hover:shadow-xl transition-shadow">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${colors.bg} p-3 rounded-lg`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>

                  {/* Coverage Notice */}
                  <div className={`${colors.bg} border ${colors.border} rounded-lg p-3 mb-4`}>
                    <p className={`text-sm font-semibold ${colors.text}`}>
                      {service.coverage}
                    </p>
                  </div>

                  {/* Services List */}
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Services Include:</h4>
                    <ul className="space-y-1">
                      {service.services.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-yellow-50 border-2 border-yellow-200 p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Important Coverage Information</h3>
                <p className="text-sm text-yellow-800">
                  Coverage varies by policy. Sudden and accidental damage is typically covered by {providerName}.
                  Gradual damage or lack of maintenance may not be covered. Contact us immediately after damage
                  occurs for best coverage outcomes. We'll help determine if your damage is covered.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
