import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, X, Phone } from "lucide-react"

export function PricingSection() {
  const features = [
    "Emergency Response Guarantee - 24/7 AI assistant + human backup",
    "Rapid Contractor Contact - Certified, insured, insurance-approved",
    "Insurance Coordination - We handle all insurer communication",
    "Quality Monitoring - We oversee the entire job",
    "Documentation & Evidence - Professional damage assessment",
  ]

  const comparison = [
    {
      approach: "DIY Coordination",
      time: "45+ days",
      approval: "60% claim denial rate",
      stress: "Stressed-out property owner",
    },
    {
      approach: "Traditional Approach",
      time: "Multiple contractors",
      approval: "Conflicting advice",
      stress: "Coverage gaps",
    },
    {
      approach: "Our Platform",
      time: "7 days average",
      approval: "95% approval rate",
      stress: "Single point of contact",
    },
  ]

  return (
    <section
      className="py-20 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 240, 240, 0.95), rgba(240, 240, 240, 0.95)), url('/geometric-pattern-background.png')`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            One Fee. Complete Coordination. Total Peace of Mind.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Pricing Card */}
          <Card className="shadow-2xl border-2 border-primary/20 mb-12 animate-slide-up">
            <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 pb-8">
              <CardTitle className="text-4xl font-bold text-foreground mb-2">
                Platform Fee: <span className="text-primary">$2,750</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">What you get for one simple fee:</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-12 py-4"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Get Protected Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">Compare the Alternative</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {comparison.map((item, index) => (
                <Card
                  key={index}
                  className={`text-center p-6 ${
                    index === 2 ? "border-2 border-primary bg-primary/5 shadow-lg" : "border border-muted-foreground/20"
                  }`}
                >
                  <CardContent className="p-0">
                    <h4 className={`text-lg font-bold mb-4 ${index === 2 ? "text-primary" : "text-foreground"}`}>
                      {item.approach}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        {index === 2 ? (
                          <CheckCircle className="h-5 w-5 text-accent" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                        <span className="text-sm">{item.time}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        {index === 2 ? (
                          <CheckCircle className="h-5 w-5 text-accent" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                        <span className="text-sm">{item.approval}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        {index === 2 ? (
                          <CheckCircle className="h-5 w-5 text-accent" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                        <span className="text-sm">{item.stress}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom Line */}
          <div className="text-center bg-accent/10 p-8 rounded-lg">
            <p className="text-xl font-bold text-foreground">
              <span className="text-primary">$2,750</span> to save <span className="text-accent">$50,000+</span> in
              potential claim issues, delays, and coverage gaps.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
