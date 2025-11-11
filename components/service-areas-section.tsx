import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"

export function ServiceAreasSection() {
  const areas = [
    {
      region: "Brisbane",
      premium: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington"],
      other: ["Brisbane CBD", "West End", "Fortitude Valley", "South Bank", "Indooroopilly"],
      responseTime: "Rapid Response",
    },
    {
      region: "Ipswich",
      premium: ["Karalee", "Brookwater", "Springfield Lakes"],
      other: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna"],
      responseTime: "Rapid Response",
    },
    {
      region: "Logan",
      premium: ["Logan Central business district"],
      other: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Beenleigh"],
      responseTime: "Rapid Response",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Service Areas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Emergency restoration services across Brisbane, Ipswich, and Logan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {areas.map((area, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6 pb-4 border-b-2 border-secondary/20">
                  <MapPin className="h-6 w-6 text-secondary mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">{area.region}</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-accent mb-2 text-sm">Premium Areas</h4>
                    <p className="text-sm text-muted-foreground">{area.premium.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-2 text-sm">Service Coverage</h4>
                    <p className="text-sm text-muted-foreground">{area.other.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-secondary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-secondary mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Emergency Response</p>
                    <p className="text-lg font-bold text-foreground">Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
