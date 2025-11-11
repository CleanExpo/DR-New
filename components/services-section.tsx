import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Droplets, Flame, Biohazard, Wind, Building, Clock, Shield, AlertTriangle, Package, FileText } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Droplets,
      title: "Water Damage Restoration",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      image: "/professional-water-extraction-team-responding-to-f.jpg",
      description: "Emergency water extraction, drying, and restoration services for floods, leaks, and burst pipes.",
      services: ["Burst pipes", "Flooding", "Storm damage", "Appliance leaks", "Roof leaks"],
      tagline: "Available 24/7. Professional emergency response.",
    },
    {
      icon: Flame,
      title: "Fire & Smoke Restoration",
      color: "text-red-500",
      bgColor: "bg-red-50",
      image: "/iicrc-certified-fire-damage-restoration-technician.jpg",
      description:
        "Complete fire damage restoration including smoke removal, odour elimination, and structural repairs.",
      services: ["Kitchen fires", "Electrical fires", "Smoke damage", "Soot removal", "Structural repair"],
      tagline: "Insurance-approved procedures from day one.",
    },
    {
      icon: Wind,
      title: "Storm Damage Recovery",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      image: "/severe-storm-damage-aftermath-with-emergency-resto.jpg",
      description: "Expert storm and wind damage repairs, roof tarping, and emergency boarding services.",
      services: ["Roof damage", "Debris removal", "Structural assessment", "Emergency boarding"],
      tagline: "We coordinate with your insurance for full coverage.",
    },
    {
      icon: Shield,
      title: "Mould Remediation",
      color: "text-green-500",
      bgColor: "bg-green-50",
      image: "/professional-mould-remediation-specialist-performi.jpg",
      description: "Professional mould inspection, testing, and complete remediation with preventive solutions.",
      services: ["Health assessments", "Safe removal", "Prevention strategies", "Air quality testing"],
      tagline: "Certified professionals only. Your family's safety first.",
    },
    {
      icon: Biohazard,
      title: "Hazard & Biohazard Remediation",
      color: "text-red-500",
      bgColor: "bg-red-50",
      image: "/certified-biohazard-remediation-technician-in-prot.jpg",
      description: "Specialised hazardous material cleanup and biohazard remediation with certified safety protocols.",
      services: ["Trauma cleanup", "Hazmat removal", "Decontamination", "Safe disposal"],
      tagline: "Professional certified team. Complete confidentiality.",
    },
    {
      icon: AlertTriangle,
      title: "Sewage Backup Remediation",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      image: "/iicrc-certified-fire-damage-restoration-technician.jpg",
      description: "Emergency sewage cleanup and sanitisation with proper disposal and decontamination procedures.",
      services: ["Category 3 water extraction", "Sanitization", "Proper disposal", "Decontamination"],
      tagline: "Emergency response. Professional safety protocols.",
    },
    {
      icon: Package,
      title: "Contents Packout & Storage",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      image: "/organized-professional-restoration-team-working.jpg",
      description: "Professional inventory, packing, and secure storage of your belongings during restoration.",
      services: ["Systematic inventory", "Climate-controlled storage", "Secure packing", "Property protection"],
      tagline: "Protect your valuables during restoration.",
    },
    {
      icon: Building,
      title: "Commercial Restoration",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      image: "/large-scale-commercial-property-emergency-restorat.jpg",
      description: "Specialised commercial property restoration services minimising business downtime and disruption.",
      services: ["Office buildings", "Retail spaces", "Warehouses", "Manufacturing facilities"],
      tagline: "Minimize downtime. Maximize coverage.",
    },
    {
      icon: FileText,
      title: "Insurance Claims Assistance",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      image: "/professional-restoration-expert-background.jpg",
      description: "Expert guidance through the insurance claims process with detailed documentation and assessments.",
      services: ["Claims documentation", "Damage assessments", "Insurance coordination", "Coverage maximization"],
      tagline: "Expert guidance. Maximize your coverage.",
    },
  ]

  return (
    <section
      className="py-20 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 30, 60, 0.9), rgba(0, 30, 60, 0.9)), url('/professional-emergency-response-team-background-wi.jpg')`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our Restoration Services
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Professional disaster recovery and restoration services available 24/7 across Brisbane, Ipswich, and Logan
          </p>
        </div>

        <div className="flex flex-wrap gap-6 max-w-7xl mx-auto justify-center">
          {services.map((service, index) => (
            <Card
              key={index}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/10 overflow-hidden group bg-white/95 backdrop-blur-sm p-0"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 right-4">
                  <div className="p-3 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl border-2 border-white/50">
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <CardTitle className="text-xl font-bold text-white drop-shadow-2xl leading-tight">
                    {service.title}
                  </CardTitle>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.services.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 bg-primary/60`} />
                      <span>{item}</span>
                    </li>
                  ))}
                  {service.services.length > 3 && (
                    <li className="text-xs text-muted-foreground italic">
                      +{service.services.length - 3} more services
                    </li>
                  )}
                </ul>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${service.color} shrink-0`} />
                    <span className="text-xs font-medium text-muted-foreground">{service.tagline}</span>
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
