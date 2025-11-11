import { Card, CardContent } from "@/components/ui/card"
import { Phone, Network, CheckCircle, ArrowRight, Clock, Shield, Zap } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Phone,
      title: "Emergency Response",
      description:
        "Call, text, or chat with our 24/7 AI assistant. Take guided photos. Get immediate safety instructions.",
      time: "Instant",
      timeIcon: Zap,
      color: "text-primary",
      bgGradient: "from-primary/10 to-primary/5",
      borderColor: "border-primary/30",
    },
    {
      number: 2,
      icon: Network,
      title: "Instant Coordination",
      description:
        "We contact your insurance company and match you with the perfect contractor from our certified network.",
      time: "24/7",
      timeIcon: Clock,
      color: "text-secondary",
      bgGradient: "from-secondary/10 to-secondary/5",
      borderColor: "border-secondary/30",
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Guaranteed Service",
      description: "Your contractor contacts you promptly. Work begins same day. We monitor everything.",
      time: "7 Days",
      timeIcon: Shield,
      color: "text-primary",
      bgGradient: "from-primary/10 to-secondary/5",
      borderColor: "border-primary/30",
    },
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Three Steps to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Complete Recovery
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From emergency to restoration complete in record time
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={`relative border-2 ${step.borderColor} bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.bgGradient}`} />
              
              <CardContent className="p-8">
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.bgGradient} flex items-center justify-center border-2 ${step.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`text-3xl font-bold ${step.color}`}>{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground/40" />
                  )}
                </div>

                {/* Icon and title */}
                <div className="mb-4">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${step.bgGradient} mb-4`}>
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

                {/* Time badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br ${step.bgGradient} border ${step.borderColor}`}>
                  <step.timeIcon className={`h-4 w-4 ${step.color}`} />
                  <span className={`text-sm font-semibold ${step.color}`}>{step.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-block p-6 md:p-8 bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg">
            <p className="text-xl md:text-2xl font-bold text-white mb-2">
              Ready to Get Started?
            </p>
            <p className="text-white/90 text-base md:text-lg">
              One call connects you to everything you need
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
