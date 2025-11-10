import { Phone, Camera, FileCheck, Hammer, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ClaimsProcessProps {
  providerName: string;
}

const processSteps = [
  {
    step: 1,
    title: 'Contact Us Immediately',
    description: 'Call us as soon as damage occurs. We will guide you through the initial steps and coordinate with your insurer.',
    icon: Phone,
    action: 'Call 1300 309 361 or submit online form',
    color: 'blue'
  },
  {
    step: 2,
    title: 'Professional Assessment',
    description: 'Our IICRC Master Restorer arrives on-site to assess damage, take photos, and create detailed documentation.',
    icon: Camera,
    action: 'Comprehensive damage assessment',
    color: 'orange'
  },
  {
    step: 3,
    title: 'Insurance Coordination',
    description: 'We communicate directly with your insurance adjuster, provide all required documentation, and handle the claim process.',
    icon: FileCheck,
    action: 'Direct insurer communication',
    color: 'green'
  },
  {
    step: 4,
    title: 'Restoration Work',
    description: 'Approved restoration work begins. We provide regular updates to you and your insurer throughout the process.',
    icon: Hammer,
    action: 'Professional restoration services',
    color: 'purple'
  },
  {
    step: 5,
    title: 'Claim Completion',
    description: 'Final inspection, completion certificate, and direct billing to your insurance company. No upfront costs.',
    icon: CheckCircle2,
    action: 'Direct billing to insurer',
    color: 'blue'
  }
];

export function ClaimsProcess({ providerName }: ClaimsProcessProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We Handle Your {providerName} Insurance Claim
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make the insurance claims process simple and stress-free. Here's our step-by-step approach.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {processSteps.map((item) => {
              const Icon = item.icon;
              const bgColors = {
                blue: 'bg-blue-600',
                orange: 'bg-orange-600',
                green: 'bg-green-600',
                purple: 'bg-purple-600'
              };
              const textColors = {
                blue: 'text-blue-600',
                orange: 'text-orange-600',
                green: 'text-green-600',
                purple: 'text-purple-600'
              };

              return (
                <div key={item.step} className="flex gap-4 md:gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 ${bgColors[item.color as keyof typeof bgColors]} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <Icon className={`w-10 h-10 ${textColors[item.color as keyof typeof textColors]} flex-shrink-0 mt-1`} />
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-gray-700 text-lg mb-4">{item.description}</p>
                        <div className={`inline-flex items-center px-4 py-2 ${item.color === 'blue' ? 'bg-blue-50 text-blue-700' : item.color === 'orange' ? 'bg-orange-50 text-orange-700' : item.color === 'green' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'} rounded-lg font-semibold text-sm`}>
                          {item.action}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-blue-50 border-2 border-blue-200 p-8">
            <div className="flex items-start gap-4">
              <FileCheck className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-900">
                  Complete Documentation Provided
                </h3>
                <p className="text-gray-700 mb-4">
                  We provide all documentation required by {providerName} including detailed damage assessments,
                  moisture readings, photographic evidence, scope of work, and progress reports. Our comprehensive
                  documentation helps ensure smooth claim approval.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Pre & post-damage photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Detailed repair estimates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Moisture & thermal readings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Daily progress reports</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
