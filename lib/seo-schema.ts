export function generateSchema(type: string, data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
}
