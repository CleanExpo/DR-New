'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface MobileServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  emergency?: boolean;
  icon?: React.ReactNode;
}

export default function MobileServiceCard({
  title,
  description,
  image,
  href,
  emergency = false,
  icon
}: MobileServiceCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl active:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 active:scale-[0.98] transform"
    >
      {/* Image Container - Optimized aspect ratio for mobile */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {emergency && (
          <div className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            24/7 Emergency
          </div>
        )}
      </div>

      {/* Content - Touch-optimized spacing */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {title}
          </h3>
          {icon && (
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-50 rounded-xl text-blue-600">
              {icon}
            </div>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* CTA - Touch friendly */}
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-semibold text-sm">
            Learn More
          </span>
          <div className="flex items-center justify-center min-w-[40px] min-h-[40px] bg-blue-600 text-white rounded-full group-hover:bg-blue-700 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
