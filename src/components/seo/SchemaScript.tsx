'use client';

import Script from 'next/script';

interface SchemaScriptProps {
  schema: unknown;
  id?: string;
}

/**
 * Component for rendering JSON-LD schema markup
 * Implements structured data for SEO optimisation
 */
export function SchemaScript(...args: any[]): void {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
      strategy="beforeInteractive"
    />
  );
}

/**
 * Component for multiple schema scripts
 */
export function MultiSchemaScript(...args: any[]): void {
  return (
    <>
      {schemas.map((schema, index) => (
        <SchemaScript
          key={`schema-${index}`}
          id={`schema-script-${index}`}
          schema={schema}
        />
      ))}
    </>
  );
}