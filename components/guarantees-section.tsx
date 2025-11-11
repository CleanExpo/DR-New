import { Card, CardContent } from "@/components/ui/card"
import { Shield, CheckCircle, Clock, ThumbsUp, Crown } from "lucide-react"

export function GuaranteesSection() {
  const guarantees = [
    {
      icon: Clock,
      title: "Rapid Response Guarantee",
      description:
        "A qualified contractor will contact you promptly after your emergency call, ensuring fast response to your crisis.",
    },
    {
      icon: Shield,
      title: "Insurance Approval Guarantee",
      description:
        "Follow our procedures and we guarantee your claim will be processed correctly. If it's denied due to our guidance, we pay your out-of-pocket costs.",
    },
    {
      icon: CheckCircle,
      title: "Quality Work Guarantee",
      description:
        "Every contractor in our network is certified and vetted. If you're not satisfied with the work quality, we'll assign a new contractor at no extra cost.",
    },
    {
      icon: ThumbsUp,
      title: "Response Time Guarantee",
      description:
        "Our 24/7 AI assistant responds in under 30 seconds. Human support within 5 minutes. Never get voicemail during your crisis.",
    },
    {
      icon: Crown,
      title: "Coordination Guarantee",
      description:
        "We handle all insurance communication and contractor management. You focus on your family and business - we handle everything else.",
    },
  ]

  return (
    <section
      className="py-20 relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 94, 184, 0.9), rgba(0, 94, 184, 0.7)), url('/professional-guarantee-shield-background.jpg')`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Guarantees to You</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up bg-white/95 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <guarantee.icon className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{guarantee.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{guarantee.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
