import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield, Eye, Users, Search, BarChart3, CheckCircle, Globe, Mail, FileText, AlertTriangle, Heart, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: 'Modern Slavery Statement | NRPG — Disaster Recovery Australia',
  description: 'NRPG\'s modern slavery statement under the Australian Modern Slavery Act 2018. Our commitment to ethical supply chains and contractor practices.',
}

export default function ModernSlaveryPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-8">
              Modern Slavery <span className="gradient-text-teal-purple">Statement</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-4">
              Our commitment to combating modern slavery and human trafficking in our operations and supply chains.
            </p>
            <p className="text-[#9CA3AF]">Last updated: 5 March 2026</p>
          </div>

          {/* Legal Framework Notice */}
          <div className="mb-12">
            <div className="bg-[#00BFA6]/10 rounded-2xl p-6 border border-[#00BFA6]/30">
              <div className="flex items-start">
                <Scale className="h-6 w-6 text-[#00BFA6] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-poppins font-semibold text-lg text-white mb-2">Compliance Statement</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    This statement is made pursuant to the <strong className="text-white">Modern Slavery Act 2018 (Cth)</strong> and sets out
                    the steps that <strong className="text-white">Disaster Recovery Pty Ltd</strong> (ABN: 85 151 794 142), trading as
                    &quot;Disaster Recovery&quot;, &quot;NRPG&quot; (National Restoration Partners Guild), and &quot;Restore Assist&quot;, has
                    taken and is continuing to take to understand and minimise the risk of modern slavery and human
                    trafficking in our business operations and supply chains. This statement covers the reporting
                    period ending 30 June 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Our Organisation & Structure */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Globe className="h-8 w-8 text-[#00BFA6] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">1. Our Organisation & Structure</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Who We Are</h3>
                  <p className="text-[#9CA3AF] mb-4 leading-relaxed">
                    Disaster Recovery Pty Ltd is an Australian company operating a digital platform that connects
                    property owners, insurers, and loss assessors with independent restoration and disaster recovery
                    contractors across Australia and New Zealand.
                  </p>
                  <p className="text-[#9CA3AF] leading-relaxed">
                    We are headquartered in Brisbane, Queensland, and operate primarily through our online platform
                    at https://disasterrecovery.com.au. Our business activities involve the facilitation of
                    connections between users and independent contractors — we do not directly employ tradespeople
                    or perform restoration work.
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Our Supply Chain</h3>
                  <p className="text-[#9CA3AF] mb-4 leading-relaxed">
                    Our supply chain includes:
                  </p>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Technology providers</strong> — Cloud hosting, software services, and
                      payment processing (primarily US and EU-based providers)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Independent contractors</strong> — Restoration and disaster recovery
                      contractors who list on our platform (Australia and New Zealand)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Professional services</strong> — Legal, accounting, and consulting
                      services supporting our business operations
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Marketing services</strong> — Advertising, content creation, and
                      digital marketing providers
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Risk Assessment */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Search className="h-8 w-8 text-[#FF9800] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">2. Risk Assessment</h2>
              </div>

              <p className="text-[#9CA3AF] mb-6 leading-relaxed">
                We have assessed the modern slavery risks in our operations and supply chain. Given the nature of
                our business as a digital platform, we have identified the following risk areas:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0F1115] rounded-lg p-6 border border-[#374151]">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="h-5 w-5 text-[#FF9800] mr-2" />
                    <h3 className="font-semibold text-white">Higher-Risk Areas</h3>
                  </div>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#FF9800] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Construction and restoration sector</strong> — The building and
                      construction industry is recognised as a higher-risk sector for modern slavery practices,
                      including labour exploitation, underpayment, and unsafe working conditions
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#FF9800] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Subcontracting arrangements</strong> — Contractors on our platform may
                      use subcontractors, creating deeper supply chain layers that are harder to monitor
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#FF9800] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Migrant and temporary workers</strong> — The construction sector
                      frequently employs migrant workers who may be more vulnerable to exploitation
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-6 border border-[#374151]">
                  <div className="flex items-center mb-3">
                    <Shield className="h-5 w-5 text-[#00BFA6] mr-2" />
                    <h3 className="font-semibold text-white">Lower-Risk Areas</h3>
                  </div>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Direct employees</strong> — Our direct workforce is small and
                      Australia-based, with all employment compliant with the Fair Work Act 2009
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Technology providers</strong> — Our major technology providers are
                      large, publicly listed companies with their own modern slavery compliance programmes
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong className="text-white">Professional services</strong> — Legal and accounting firms we engage
                      are subject to professional regulation and accreditation requirements
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Actions Taken */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-8 w-8 text-[#00BFA6] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">3. Actions Taken</h2>
              </div>

              <p className="text-[#9CA3AF] mb-6 leading-relaxed">
                We have taken the following actions to address and mitigate the risk of modern slavery in our
                operations and supply chain:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0F1115] rounded-lg p-6 border border-[#374151]">
                  <div className="flex items-center mb-3">
                    <FileText className="h-5 w-5 text-[#00BFA6] mr-2" />
                    <h3 className="font-semibold text-white">Policies & Governance</h3>
                  </div>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Adopted a Modern Slavery Policy that applies to all directors, employees, and contractors
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Incorporated modern slavery clauses into our contractor terms and conditions
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Established a Code of Conduct for all platform participants
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-6 border border-[#374151]">
                  <div className="flex items-center mb-3">
                    <Search className="h-5 w-5 text-[#2196F3] mr-2" />
                    <h3 className="font-semibold text-white">Due Diligence</h3>
                  </div>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Contractor verification processes including ABN/NZBN validation and licence checks
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Review of key third-party suppliers&apos; modern slavery statements and policies
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Risk assessment of supply chain partners based on sector, geography, and business model
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-6 border border-[#374151]">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-[#7C4DFF] mr-2" />
                    <h3 className="font-semibold text-white">Training & Awareness</h3>
                  </div>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Modern slavery awareness training for all employees and leadership
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Information resources for contractors on recognising and reporting modern slavery
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Promotion of the Australian Federal Police&apos;s human trafficking referral mechanism
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-6 border border-[#374151]">
                  <div className="flex items-center mb-3">
                    <Heart className="h-5 w-5 text-[#FF4444] mr-2" />
                    <h3 className="font-semibold text-white">Reporting Mechanisms</h3>
                  </div>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Established confidential reporting channels for suspected modern slavery
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Whistleblower protection policy in place for those who report concerns in good faith
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#00BFA6] mr-2 mt-0.5 flex-shrink-0" />
                      Commitment to investigating all reports promptly and thoroughly
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Effectiveness Measures */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <BarChart3 className="h-8 w-8 text-[#2196F3] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">4. Measuring Effectiveness</h2>
              </div>

              <p className="text-[#9CA3AF] mb-6 leading-relaxed">
                We are committed to continuously improving our approach to combating modern slavery. We measure
                the effectiveness of our actions through:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151] text-center">
                  <div className="bg-[#00BFA6]/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Eye className="h-6 w-6 text-[#00BFA6]" />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-2">Regular Reviews</h4>
                  <p className="text-[#9CA3AF] text-xs">
                    Annual review of modern slavery risks and the effectiveness of our response
                  </p>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151] text-center">
                  <div className="bg-[#2196F3]/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-6 w-6 text-[#2196F3]" />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-2">KPI Tracking</h4>
                  <p className="text-[#9CA3AF] text-xs">
                    Monitoring the percentage of contractors who have acknowledged our modern slavery policy
                  </p>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151] text-center">
                  <div className="bg-[#7C4DFF]/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-[#7C4DFF]" />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-2">Training Completion</h4>
                  <p className="text-[#9CA3AF] text-xs">
                    Tracking employee completion rates for modern slavery awareness training
                  </p>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151] text-center">
                  <div className="bg-[#FF9800]/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-[#FF9800]" />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-2">Incident Reports</h4>
                  <p className="text-[#9CA3AF] text-xs">
                    Monitoring and responding to any reports or concerns raised through our reporting channels
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Future Commitments */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-[#7C4DFF] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">5. Future Commitments</h2>
              </div>

              <p className="text-[#9CA3AF] mb-6 leading-relaxed">
                We recognise that addressing modern slavery is an ongoing process. In the coming reporting period,
                we commit to:
              </p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#00BFA6] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-[#9CA3AF] leading-relaxed">
                    Enhancing our contractor onboarding process to include explicit modern slavery risk questions
                    and self-assessment tools
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#00BFA6] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-[#9CA3AF] leading-relaxed">
                    Developing industry-specific guidance for our contractors on identifying and preventing modern
                    slavery in the restoration and construction sectors
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#00BFA6] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-[#9CA3AF] leading-relaxed">
                    Engaging with industry bodies and peer organisations to share best practices and collaborate
                    on sector-wide initiatives
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#00BFA6] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-[#9CA3AF] leading-relaxed">
                    Reviewing and strengthening our grievance mechanisms to ensure accessibility and effectiveness
                    for vulnerable workers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Reporting Concerns */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-8 w-8 text-[#FF9800] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">6. Reporting Concerns</h2>
              </div>

              <p className="text-[#9CA3AF] mb-6 leading-relaxed">
                If you have any concerns about modern slavery practices related to our operations or supply chain,
                or if you suspect that modern slavery may be occurring in connection with any contractor on our
                platform, please contact us. All reports will be treated confidentially and investigated promptly.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <div className="flex items-center mb-2">
                    <Mail className="h-5 w-5 text-[#00BFA6] mr-2" />
                    <span className="text-white font-medium">Report to Us</span>
                  </div>
                  <a href="/contact" className="text-[#00BFA6] text-sm hover:underline">Contact us online</a>
                  <p className="text-[#9CA3AF] text-xs mt-1">Subject line: &quot;Modern Slavery Concern&quot;</p>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-[#2196F3] mr-2" />
                    <span className="text-white font-medium">Australian Federal Police</span>
                  </div>
                  <p className="text-[#9CA3AF] text-xs mt-1">
                    Report human trafficking via the AFP&apos;s online reporting tool or by contacting Crime Stoppers
                  </p>
                </div>

                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-[#7C4DFF] mr-2" />
                    <span className="text-white font-medium">Anti-Slavery Commissioner</span>
                  </div>
                  <p className="text-[#9CA3AF] text-xs mt-1">
                    Australia&apos;s Anti-Slavery Commissioner can be contacted for guidance and reporting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Approval & Signature */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-[#00BFA6] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">Approval</h2>
              </div>

              <p className="text-[#9CA3AF] mb-6 leading-relaxed">
                This Modern Slavery Statement has been approved by the principal governing body of Disaster Recovery Pty Ltd
                Pty Ltd in accordance with section 13 of the Modern Slavery Act 2018 (Cth).
              </p>

              <div className="bg-[#0F1115] rounded-lg p-6 border border-[#374151]">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[#9CA3AF] text-sm mb-1">Signed by:</p>
                    <p className="text-white font-medium">[Director Name]</p>
                    <p className="text-[#9CA3AF] text-sm">Director, Disaster Recovery Pty Ltd</p>
                  </div>
                  <div>
                    <p className="text-[#9CA3AF] text-sm mb-1">Date:</p>
                    <p className="text-white font-medium">5 March 2026</p>
                    <p className="text-[#9CA3AF] text-sm">Reporting period: 1 July 2025 — 30 June 2026</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-[#2196F3] mr-2" />
                    <span className="text-white font-medium">Registered Address</span>
                  </div>
                  <p className="text-[#9CA3AF] text-sm">
                    Disaster Recovery Pty Ltd
                    <br />
                    Australia-wide · AI-automated online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
