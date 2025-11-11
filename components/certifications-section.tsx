import { Card, CardContent } from "@/components/ui/card"

export function CertificationsSection() {
  const certifications = [
    {
      name: "24/7 Emergency Response",
      description: "Available around the clock for your emergency restoration needs",
      icon: "⚡",
      details: "Always available when you need us most",
    },
    {
      name: "IICRC Certified Professionals",
      description: "IICRC Master Restorer certified - Phill McGurk leads our expert team",
      icon: "🏆",
      details: "Highest credential in disaster recovery certification",
    },
    {
      name: "30+ Years Experience",
      description: "Decades of expertise in disaster recovery and restoration",
      icon: "⭐",
      details: "Proven track record with thousands of successful restorations",
    },
    {
      name: "100% Insurance Approved",
      description: "Work with all major insurance companies - Suncorp, RACQ, Allianz, QBE",
      icon: "✓",
      details: "Trusted by all major Australian insurers",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-secondary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Why Choose Disaster Recovery Brisbane?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional credentials, proven experience, and unwavering commitment to recovery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-secondary/50 animate-fade-in-cascade"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{cert.name}</h3>
                <p className="text-sm font-semibold text-secondary mb-3">{cert.description}</p>
                <p className="text-sm text-muted-foreground">{cert.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
