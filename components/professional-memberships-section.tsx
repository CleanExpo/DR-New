"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Building2, Shield } from "lucide-react"

export function ProfessionalMembershipsSection() {
  const memberships = [
    {
      name: "CARSI",
      fullName: "Cleaning and Restoration Science Institute",
      description: "We are connected with Australian industry leading professional groups, ensuring the highest standards in restoration services and continuous professional development",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "IICRC",
      fullName: "Institute of Inspection Cleaning and Restoration Certification",
      description: "The global standard for inspection, cleaning, and restoration certification. IICRC certification ensures the highest level of expertise and professionalism.",
      icon: Award,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      name: "Clean Claims",
      fullName: "Field Software Partner",
      description: "Advanced field software partnership ensuring accurate documentation, efficient claims processing, and seamless communication with insurance providers.",
      icon: Shield,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-white via-muted/30 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse-slow"
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 15) % 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Professional Memberships
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are connected with Australian industry leading professional groups, ensuring the highest standards in
            restoration services and continuous professional development
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {memberships.map((membership, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-primary/30 animate-slide-up group overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-8 relative">
                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0 ${membership.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon with Animation */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`p-4 ${membership.bgColor} rounded-full group-hover:scale-110 transition-transform duration-300`}
                    >
                      <membership.icon className={`h-10 w-10 ${membership.color} group-hover:rotate-12 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Membership Name */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 text-center group-hover:text-primary transition-colors">
                    {membership.name}
                  </h3>

                  {/* Full Name */}
                  <p className="text-sm font-semibold text-secondary mb-4 text-center">
                    {membership.fullName}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-center">
                    {membership.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-6 flex justify-center">
                    <div className={`w-16 h-1 ${membership.bgColor} rounded-full group-hover:w-24 transition-all duration-300`} />
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

