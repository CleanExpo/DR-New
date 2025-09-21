import React from 'react';

interface EmergencyCTAProps {
  suburb: string;
  message: string;
}

export const EmergencyCTA: React.FC<EmergencyCTAProps> = ({ suburb, message }) => {
  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{message}</h2>
        <p className="text-xl mb-8">Call now for immediate assistance in {suburb}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:1300309361"
            className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg inline-block"
          >
            Call 1300 309 361
          </a>
          <a
            href="/claim"
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg inline-block"
          >
            Submit Claim Online
          </a>
        </div>
      </div>
    </section>
  );
};