import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Claims Guide | Disaster Recovery Brisbane | Master Restorer',
  description: 'Navigate insurance claims with IICRC Master Restorer Phill McGurk. Expert guidance for water, fire & storm damage claims. Brisbane insurance-approved restoration.',
  keywords: 'insurance claims Brisbane, disaster recovery insurance, water damage insurance claim, fire damage insurance, storm damage claims, insurance approved restorer Brisbane, claim assistance Brisbane, Phill McGurk insurance',
  openGraph: {
    title: 'Insurance Claims Guide | IICRC Master Restorer Brisbane',
    description: 'Expert insurance claims assistance from Phill McGurk. Navigate disaster recovery claims successfully. Brisbane insurance-approved services.',
    type: 'article',
    url: 'https://dr-new-ten.vercel.app/insurance-decoder',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/insurance-decoder',
  },
};

export default function InsuranceDecoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
