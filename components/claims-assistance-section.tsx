import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, FileText, Shield, TrendingUp } from "lucide-react"

export function ClaimsAssistanceSection() {
  const steps = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Comprehensive damage assessment and detailed documentation for insurance",
    },
    {
      icon: Shield,
      title: "Claims Coordination",
      description: "Expert guidance through the entire insurance claims process",
    },
    {
      icon: CheckCircle2,
      title: "Approval Support",
      description: "We work directly with insurers to maximize your coverage",
    },
    {
      icon: TrendingUp,
      title: "Fast Resolution",
      description: "95% insurance claim approval rate vs 60% industry average",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-white to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Insurance Claims Assistance</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert support through the entire claims process. We work with all major Australian insurers including
            Suncorp, RACQ, Allianz, and QBE.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 animate-slide-up border-0 bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-secondary/10 rounded-full">
                    <step.icon className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground text-center mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-secondary/30 bg-white shadow-lg">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Insurance Partners</h3>
                <div className="space-y-3">
                  {["Suncorp", "RACQ", "Allianz", "QBE", "And all major providers"].map((partner, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-accent mr-3" />
                      <span className="text-muted-foreground font-medium">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Our Claims Assistance</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ 95% claim approval rate</li>
                  <li>✓ Direct insurer coordination</li>
                  <li>✓ Expert documentation</li>
                  <li>✓ Faster claim resolution</li>
                  <li>✓ Maximized coverage</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
