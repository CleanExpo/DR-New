import Link from 'next/link';
import { Phone } from 'lucide-react';

export function EmergencyCTA() {
  return (
    <div className="bg-red-600 text-white py-8 px-6 rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4">24/7 Emergency Response</h3>
      <p className="text-lg mb-6">Call now for immediate assistance</p>
      <Link
        href="tel:1300309361"
        className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Phone className="w-5 h-5 mr-2" />
        1300 309 361
      </Link>
    </div>
  );
}

export default EmergencyCTA;
