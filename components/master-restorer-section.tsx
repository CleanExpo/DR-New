import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, CheckCircle2, Phone, Star, Shield, TrendingUp } from "lucide-react"

export function MasterRestorerSection() {
  const credentials = [
    "IICRC Master Restorer Certification",
    "30+ Years Disaster Recovery Experience",
    "Water Restoration Specialist",
    "Fire & Smoke Restoration Expert",
    "Advanced Mould Remediation",
    "Commercial Property Specialist",
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-6">
              <Award className="h-4 w-4 text-secondary" />
              <Badge className="bg-secondary text-white border-0">Master Restorer</Badge>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Meet Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                Master Restorer
              </span>
            </h2>
            <p className="text-xl font-semibold text-primary mb-3">
              IICRC Master Restorer - Phill McGurk
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              One of Brisbane's limited IICRC Master Restorer certified professionals - the highest credential in disaster recovery. Your property receives master-level expertise in water, fire, and smoke restoration.
            </p>
          </div>

          {/* Main Content Card */}
          <Card className="border-0 shadow-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-full min-h-[500px] md:min-h-[600px] overflow-hidden group">
                  <img 
                    src="/professional-master-restorer-portrait.jpg" 
                    alt="Phill McGurk - Master Restorer" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">30+</div>
                        <div className="text-xs text-white/90">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">1000+</div>
                        <div className="text-xs text-white/90">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">100%</div>
                        <div className="text-xs text-white/90">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-8">
                    {/* Certification Section */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-primary shadow-lg">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-foreground">Master Restorer Certification</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Master Restorer certification requires extensive experience, advanced training, and proven track records on complex high-value property restoration. When disaster strikes your Brisbane property, trust a true Master Restorer.
                      </p>
                    </div>

                    {/* Credentials Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Shield className="h-5 w-5 text-secondary" />
                        <h4 className="text-xl font-bold text-foreground">Key Credentials</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {credentials.map((cred, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                            <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                            <span className="text-foreground font-medium">{cred}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-secondary to-primary text-white shadow-xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Star className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2 italic">
                          "When disaster strikes your Brisbane property, trust a true Master Restorer with decades of proven expertise."
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-white/90 mb-1">Emergency Response</p>
                        <p className="text-2xl font-bold">+61 1300 309 361</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Badge */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-primary rounded-full text-white shadow-lg">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Master-Level Expertise • Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
