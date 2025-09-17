'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TestimonialsCarousel() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center mb-4">
              {/* 5 Star Rating Display */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-8 h-8 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className="text-2xl font-semibold text-gray-900 mb-2">
              5.0 Rating
            </p>

            <p className="text-lg text-gray-700 mb-6">
              Based on 50+ verified Google Reviews
            </p>

            <p className="text-gray-700 mb-8">
              Our customers consistently rate us 5 stars for our emergency response,
              professional service, and quality restoration work across Brisbane,
              Ipswich and Logan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/search?q=disaster+recovery+brisbane+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Read Our Google Reviews
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-700">
            All reviews are from verified customers who have used our restoration services.
          </p>
        </motion.div>
      </div>
    </section>
  );
}