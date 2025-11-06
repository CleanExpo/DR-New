import Script from 'next/script';

interface SchemaScriptProps {
  schema: any;
}

export function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <Script
      id={`schema-${Math.random().toString(36).substr(2, 9)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default SchemaScript;
