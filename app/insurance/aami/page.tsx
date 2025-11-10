import { Metadata } from 'next';
import { InsuranceProviderHero } from '@/components/insurance/InsuranceProviderHero';
import { ClaimsProcess } from '@/components/insurance/ClaimsProcess';
import { CoveredServices } from '@/components/insurance/CoveredServices';

export const metadata: Metadata = {
  title: 'AAMI Insurance Claims | Approved Restoration Provider | Direct Billing',
  description: 'Preferred AAMI insurance restoration provider. Direct billing, no upfront costs, claim assistance. Call 1300 309 361 for immediate assistance.' };

export default function AAMIInsurancePage() {
  return (
    <div className="min-h-screen">
      <InsuranceProviderHero providerName="AAMI" />
      <ClaimsProcess providerName="AAMI" />
      <CoveredServices providerName="AAMI" />
    </div>
  );
}