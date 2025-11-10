import { Metadata } from 'next';
import { InsuranceProviderHero } from '@/components/insurance/InsuranceProviderHero';
import { ClaimsProcess } from '@/components/insurance/ClaimsProcess';
import { CoveredServices } from '@/components/insurance/CoveredServices';

export const metadata: Metadata = {
  title: 'Suncorp Insurance Claims | Approved Restoration Provider | Direct Billing',
  description: 'Preferred Suncorp insurance restoration provider. Direct billing, no upfront costs, claim assistance. Call 1300 309 361 for immediate assistance.' };

export default function SuncorpInsurancePage() {
  return (
    <div className="min-h-screen">
      <InsuranceProviderHero providerName="Suncorp" />
      <ClaimsProcess providerName="Suncorp" />
      <CoveredServices providerName="Suncorp" />
    </div>
  );
}