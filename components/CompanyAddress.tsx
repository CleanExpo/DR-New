import React from 'react';

interface CompanyAddressProps {
  className?: string;
  showLabel?: boolean;
  format?: 'inline' | 'block';
  includeSchema?: boolean;
}

export function CompanyAddress({
  className = '',
  showLabel = false,
  format = 'block',
  includeSchema = false
}: CompanyAddressProps) {
  if (format === 'inline') {
    return (
      <div className={className}>
        <strong itemProp={includeSchema ? 'name' : undefined}>Disaster Recovery</strong>,
        <span itemProp={includeSchema ? 'streetAddress' : undefined}>Unit 4/17 Tile St</span>,
        <span itemProp={includeSchema ? 'addressLocality' : undefined}>Wacol</span>
        <span itemProp={includeSchema ? 'addressRegion' : undefined}>QLD</span>
        <span itemProp={includeSchema ? 'postalCode' : undefined}>4076</span>,
        <a href="tel:1300309361" itemProp={includeSchema ? 'telephone' : undefined}> 1300 309 361</a>,
        <a href="mailto:info@disasterrecovery.com.au" itemProp={includeSchema ? 'email' : undefined}> info@disasterrecovery.com.au</a>
      </div>
    );
  }

  return (
    <address className={`not-italic ${className}`} itemProp={includeSchema ? 'address' : undefined} itemScope={includeSchema} itemType="https://schema.org/PostalAddress">
      {showLabel && <p className="font-semibold mb-2">Disaster Recovery</p>}
      <strong itemProp={includeSchema ? 'name' : undefined}>Disaster Recovery</strong><br />
      <span itemProp={includeSchema ? 'streetAddress' : undefined}>Unit 4/17 Tile St</span><br />
      <span itemProp={includeSchema ? 'addressLocality' : undefined}>Wacol</span> <span itemProp={includeSchema ? 'addressRegion' : undefined}>QLD</span> <span itemProp={includeSchema ? 'postalCode' : undefined}>4076</span><br />
      <a href="tel:1300309361" className="hover:text-blue-600" itemProp={includeSchema ? 'telephone' : undefined}>1300 309 361</a><br />
      <a href="mailto:info@disasterrecovery.com.au" className="hover:text-blue-600" itemProp={includeSchema ? 'email' : undefined}>info@disasterrecovery.com.au</a>
    </address>
  );
}
