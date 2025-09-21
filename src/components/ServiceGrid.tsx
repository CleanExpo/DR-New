import React from 'react';

interface ServiceGridProps {
  location: string;
  services: string[];
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ location, services }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Our {location} Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{service}</h3>
              <p className="text-gray-600">Professional {service.toLowerCase()} services available 24/7 in {location}.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};