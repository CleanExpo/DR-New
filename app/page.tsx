import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ServicesSection } from "@/components/services-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ProfessionalMembershipsSection } from "@/components/professional-memberships-section"
import { ServiceAreasSection } from "@/components/service-areas-section"
import { MasterRestorerSection } from "@/components/master-restorer-section"
import { ClaimsAssistanceSection } from "@/components/claims-assistance-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { PricingSection } from "@/components/pricing-section"
import { UrgencySection } from "@/components/urgency-section"
import { FAQSection } from "@/components/faq-section"
import { GuaranteesSection } from "@/components/guarantees-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CertificationsSection />
      <ProfessionalMembershipsSection />
      <ServiceAreasSection />
      <MasterRestorerSection />
      <ClaimsAssistanceSection />
      <SocialProofSection />
      {/* <PricingSection /> */}
      <UrgencySection />
      {/* <FAQSection /> */}
      <GuaranteesSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
