import { ArrowRight, Phone, Users, CheckCircle, AlertCircle, Zap, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SolutionSection() {
  const steps = [
    {
      icon: AlertCircle,
      title: "Emergency Happens",
      description: "You're confused, stressed, don't know who to call",
      color: "from-slate-400 to-slate-500",
    },
    {
      icon: Phone,
      title: "You Call Us",
      description: "24/7 AI assistant guides you through immediate steps",
      highlight: true,
      color: "from-primary to-primary/80",
    },
    {
      icon: Users,
      title: "We Coordinate Everything",
      description: "Insurance, contractors, documentation handled",
      color: "from-secondary to-secondary/80",
    },
    {
      icon: Zap,
      title: "Help Arrives Fast",
      description: "Qualified contractor contacts you promptly",
      color: "from-accent to-accent/80",
    },
    {
      icon: CheckCircle,
      title: "Claim Approved",
      description: "We ensure proper procedures protect your coverage",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-primary/5 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">The Solution</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            One Call
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Coordinates Everything
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We don't do the restoration work. We make sure the <span className="font-semibold text-foreground">RIGHT</span> people do the <span className="font-semibold text-foreground">RIGHT</span> work at the <span className="font-semibold text-foreground">RIGHT</span> time to protect <span className="font-semibold text-foreground">YOUR</span> claim.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-full flex flex-col items-center">
                    {/* Step circle */}
                    <div
                      className={`
                        relative w-20 h-20 rounded-full flex items-center justify-center
                        bg-gradient-to-br ${step.color} shadow-xl
                        transition-all duration-500 hover:scale-110 hover:shadow-2xl
                        border-4 border-white
                        ${step.highlight ? "ring-4 ring-primary/50 ring-offset-4 ring-offset-white scale-110" : ""}
                      `}
                    >
                      <step.icon className="h-10 w-10 text-white" />
                      {step.highlight && (
                        <div className="absolute -top-3 -right-3 bg-accent text-foreground text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                          YOU
                        </div>
                      )}
                    </div>

                    {/* Arrow for mobile */}
                    {index < steps.length - 1 && (
                      <ArrowRight className="lg:hidden h-8 w-8 text-primary my-4 rotate-90" />
                    )}

                    {/* Content card */}
                    <Card className={`mt-6 w-full border-2 ${step.highlight ? "border-primary shadow-xl" : "border-border"} bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                      <CardContent className="p-6 text-center">
                        <h3 className={`font-bold text-lg mb-2 ${step.highlight ? "text-primary" : "text-foreground"}`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Before/After Visual */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="group overflow-hidden border-2 border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-2xl">
            <div className="relative h-64 bg-gradient-to-br from-red-100 to-red-200">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('/chaotic-disaster-scene-with-confused-homeowner.jpg')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-2xl font-bold text-white mb-2">Before: Chaos</h4>
                <p className="text-red-100">Multiple calls, wrong contractors, insurance issues</p>
              </div>
            </div>
          </Card>

          <Card className="group overflow-hidden border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl">
            <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                style={{
                  backgroundImage: `url('/organized-professional-restoration-team-working.jpg')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-2xl font-bold text-white mb-2">After: Coordination</h4>
                <p className="text-green-100">One call, right professionals, protected claim</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
