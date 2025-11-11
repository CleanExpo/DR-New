import { Card, CardContent } from "@/components/ui/card"
import { Clock, AlertTriangle, TrendingUp } from "lucide-react"

export function UrgencySection() {
  const timeFactors = [
    {
      time: "Hour 1-2",
      title: "Damage Spreads",
      description: "Water seeps deeper. Smoke settles. Mould begins. Each hour multiplies repair costs.",
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      time: "Day 1-3",
      title: "Insurance Windows Close",
      description: "Most policies require immediate notification. Delays can void coverage entirely.",
      icon: AlertTriangle,
      color: "text-orange-500",
    },
    {
      time: "Week 1-2",
      title: "Contractors Book Up",
      description: "Quality restoration teams fill their schedules. You get stuck with whoever's available.",
      icon: TrendingUp,
      color: "text-red-500",
    },
    {
      time: "Month 1+",
      title: "Claims Get Complicated",
      description: "The longer you wait, the harder it becomes to prove what caused what damage.",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const examples = [
    "2-hour delay turned my $5K water damage into $15K mould remediation",
    "3-day delay voided my fire coverage - $80K out of pocket",
    "1-week delay meant 2-month wait for contractors during storm season",
  ]

  return (
    <section
      className="py-20 relative bg-gray-900"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(220, 38, 38, 0.3)), url('/emergency-clock-ticking-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Every Hour You Wait Costs You Money
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeFactors.map((factor, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up border-l-4 border-l-primary bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <factor.icon className={`h-8 w-8 ${factor.color} mx-auto mb-2`} />
                    <div className="text-lg font-bold text-primary">{factor.time}</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 text-center">{factor.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Real Examples */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-white mb-8 drop-shadow-lg">Real Examples:</h3>
          <div className="space-y-4">
            {examples.map((example, index) => (
              <Card key={index} className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <blockquote className="text-red-700 italic text-center">"{example}"</blockquote>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-black/60 backdrop-blur-sm rounded-lg border border-primary/30">
            <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">The Solution:</h4>
            <p className="text-xl text-white drop-shadow-lg">Make us your first call. Every minute matters.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
