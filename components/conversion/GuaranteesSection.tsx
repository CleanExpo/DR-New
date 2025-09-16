'use client';

import { motion } from 'framer-motion';
import { useConversionTracking } from '@/lib/conversion-tracking';

export function GuaranteesSection() {
  const { trackEngagement } = useConversionTracking();

  const guarantees = [
    {
      icon: '⏱️',
      title: '1-Hour Response Guarantee',
      description: 'We guarantee arrival within 60 minutes of your emergency call or your callout fee is FREE',
      terms: 'Applies to emergency calls within Brisbane, Ipswich & Logan metro areas',
      value: '$149 VALUE'
    },
    {
      icon: '💰',
      title: 'Price Match Promise',
      description: 'Find a cheaper written quote? We\'ll beat it by 10% PLUS give you $100 off',
      terms: 'Valid quotes must be from licensed, insured competitors for identical services',
      value: 'SAVE 10% + $100'
    },
    {
      icon: '✅',
      title: '100% Satisfaction Guarantee',
      description: 'Not completely satisfied? We\'ll redo the work FREE or refund your money',
      terms: 'Must notify us within 30 days of service completion',
      value: 'RISK-FREE'
    },
    {
      icon: '🛡️',
      title: 'No Hidden Fees Promise',
      description: 'The price we quote is the price you pay. No surprises, no extras, guaranteed',
      terms: 'Excludes additional work requested after initial assessment',
      value: 'TRANSPARENT'
    },
    {
      icon: '📋',
      title: 'Insurance Direct Billing',
      description: 'We handle all insurance paperwork and bill them directly - you pay nothing upfront',
      terms: 'Subject to insurance approval and policy coverage',
      value: 'NO UPFRONT COST'
    },
    {
      icon: '🏆',
      title: 'Lifetime Warranty',
      description: 'All our restoration work comes with a lifetime warranty against defects',
      terms: 'Covers workmanship only, not future damage from new incidents',
      value: 'LIFETIME PROTECTION'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100 rounded-full px-6 py-2 mb-4">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 font-semibold">Our Iron-Clad Guarantees</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We Put Our Money Where Our Mouth Is
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every promise backed by legal guarantee. If we don't deliver, you don't pay.
          </p>
        </motion.div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer"
              onClick={() => trackEngagement(`guarantee_clicked_${guarantee.title}`)}
            >
              <div className="text-4xl mb-4">{guarantee.icon}</div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{guarantee.title}</h3>

              <p className="text-gray-700 mb-4">{guarantee.description}</p>

              <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3">
                <p className="text-xs text-blue-700">{guarantee.terms}</p>
              </div>

              <div className="inline-flex items-center bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-full">
                {guarantee.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Why We Can Offer These Guarantees
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
            After 15+ years and 10,000+ successful restorations, we've perfected our processes.
            We're so confident in our service that we're willing to guarantee everything.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-blue-200">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-sm text-blue-200">Properties Restored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">98.7%</div>
              <div className="text-sm text-blue-200">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-blue-200">Hidden Fees Ever</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-700 mb-6">
            Ready to experience service backed by real guarantees?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:1300309361"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all inline-flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call 1300 309 361
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition-all"
            >
              View All Terms & Conditions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Risk Reversal Component
export function RiskReversal() {
  return (
    <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Zero Risk to You
      </h3>

      <p className="text-gray-700 mb-6">
        Try our service with absolutely no risk. If you're not 100% satisfied with our work, we'll either fix it for free or give you a full refund. No questions asked.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-3">
          <div className="text-2xl mb-1">🔄</div>
          <p className="text-sm font-semibold">Free Re-do</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <div className="text-2xl mb-1">💵</div>
          <p className="text-sm font-semibold">Full Refund</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <div className="text-2xl mb-1">📝</div>
          <p className="text-sm font-semibold">Written Guarantee</p>
        </div>
      </div>

      <p className="text-xs text-gray-600">
        This guarantee is legally binding and backed by our $20M insurance policy
      </p>
    </div>
  );
}

// Trust Seals Component
export function TrustSeals() {
  const seals = [
    { name: 'IICRC Certified', icon: '🏅' },
    { name: 'Fully Insured', icon: '🛡️' },
    { name: 'Licensed Builder', icon: '🏗️' },
    { name: 'Police Checked', icon: '👮' },
    { name: 'WorkSafe Certified', icon: '⚠️' },
    { name: 'EPA Approved', icon: '🌿' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {seals.map((seal) => (
        <motion.div
          key={seal.name}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="bg-white rounded-full px-4 py-2 shadow-md border border-gray-200 flex items-center gap-2"
        >
          <span className="text-2xl">{seal.icon}</span>
          <span className="text-sm font-semibold text-gray-700">{seal.name}</span>
        </motion.div>
      ))}
    </div>
  );
}