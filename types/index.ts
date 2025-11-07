// Core application types and interfaces

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface ServiceArea {
  name: string;
  slug: string;
  region: 'brisbane' | 'ipswich' | 'logan';
  suburbs: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: 'emergency' | 'restoration' | 'commercial' | 'residential';
  features: string[];
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface EmergencyContact {
  phone: string;
  email: string;
  address: string;
  availability: string;
}

export interface PageProps<T = Record<string, never>> {
  params: T;
  searchParams?: Record<string, string | string[] | undefined>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params?: Record<string, string>;
}

// Component Props Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export interface CardProps {
  title: string;
  description?: string;
  image?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  cta?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

// API Response Types
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  emergencyLevel?: 'urgent' | 'normal';
}

export interface BookingFormData extends ContactFormData {
  preferredDate?: string;
  preferredTime?: string;
  address: string;
  suburb: string;
  postcode: string;
}

// Schema.org Types
export interface LocalBusiness {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHours?: string;
  priceRange?: string;
  image?: string;
  sameAs?: string[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}
