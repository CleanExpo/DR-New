'use client';

import Image from 'next/image';
import Card from '../ui/Card';

const processSteps = [
  {
    step: 1,
    title: 'Emergency Response',
    description: 'Immediate response within 1 hour to assess damage and begin mitigation',
    image: '/images/optimized/process/3D Emergency Squalor Cleanup.png',
    duration: '0-1 Hours'
  },
  {
    step: 2,
    title: 'Hazardous Material Removal',
    description: 'Safe removal and disposal of contaminated materials and hazardous substances',
    image: '/images/optimized/process/3D Hazardous Cleaning.png',
    duration: '1-24 Hours'
  }
];

export default function ProcessShowcase() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Professional Restoration Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48 mb-6">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Step {step.step}: {step.title}
              </h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              <div className="text-primary-600 font-semibold">{step.duration}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
