/**
 * JSON-LD Structured Data Components — DR-231/235/236/240/246
 *
 * Reusable schema.org components for SEO:
 *   - BreadcrumbList (DR-236)
 *   - FAQPage (reusable — DR-237 uses this on /faq)
 *   - SiteLinksSearchBox (DR-246)
 *   - Product (DR-231)
 *   - Review / AggregateRating (DR-235)
 *   - Generic JsonLd wrapper
 */

import React from 'react';

// ---------------------------------------------------------------------------
// Generic JSON-LD wrapper
// ---------------------------------------------------------------------------

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbList — DR-236
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbListSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

// ---------------------------------------------------------------------------
// FAQPage — reusable (used by DR-237 /faq page)
// ---------------------------------------------------------------------------

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPageSchema({ faqs }: { faqs: FAQItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

// ---------------------------------------------------------------------------
// SiteLinksSearchBox — DR-246
// ---------------------------------------------------------------------------

export function SiteLinksSearchBoxSchema({
  siteUrl = 'https://disasterrecovery.com.au',
  searchPath = '/search?q={search_term_string}',
}: {
  siteUrl?: string;
  searchPath?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}${searchPath}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLd data={data} />;
}

// ---------------------------------------------------------------------------
// Product — DR-231
// ---------------------------------------------------------------------------

export interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  sku?: string;
  brand?: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url: string;
}

export function ProductSchema({
  name,
  description,
  image,
  sku,
  brand = 'NRPG',
  price,
  currency = 'AUD',
  availability = 'InStock',
  url,
}: ProductSchemaProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    brand: { '@type': 'Brand', name: brand },
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url,
    },
  };
  if (sku) data.sku = sku;
  return <JsonLd data={data} />;
}

// ---------------------------------------------------------------------------
// AggregateRating — DR-235
// ---------------------------------------------------------------------------

export interface AggregateRatingSchemaProps {
  itemName: string;
  itemType?: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}

export function AggregateRatingSchema({
  itemName,
  itemType = 'LocalBusiness',
  ratingValue,
  reviewCount,
  bestRating = 5,
}: AggregateRatingSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': itemType,
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toFixed(1),
      reviewCount,
      bestRating,
    },
  };
  return <JsonLd data={data} />;
}

// ---------------------------------------------------------------------------
// Review — DR-235
// ---------------------------------------------------------------------------

export interface ReviewSchemaProps {
  itemName: string;
  reviewerName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
}

export function ReviewSchema({
  itemName,
  reviewerName,
  reviewBody,
  ratingValue,
  datePublished,
}: ReviewSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'LocalBusiness', name: itemName },
    author: { '@type': 'Person', name: reviewerName },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: ratingValue.toFixed(1),
      bestRating: '5',
    },
    datePublished,
  };
  return <JsonLd data={data} />;
}
