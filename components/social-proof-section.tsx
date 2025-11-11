"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, TrendingUp, Clock, Users, Award } from "lucide-react"

export function SocialProofSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote:
        "At 3 AM with water everywhere, I didn't know what to do first. Their AI guided me step-by-step, and a contractor was at my door by 7 AM. My claim was approved without issues. Worth every dollar of the platform fee.",
      name: "Sarah M.",
      location: "Brisbane",
      rating: 5,
      image: "/professional-woman-headshot.png",
    },
    {
      quote:
        "Our restaurant kitchen fire could have closed us for months. They coordinated everything with our insurance and had certified fire restoration experts working within hours. We reopened in 2 weeks instead of 3 months.",
      name: "Marco D.",
      location: "Melbourne",
      rating: 5,
      image: "/restaurant-owner-headshot.jpg",
    },
    {
      quote:
        "Managing 200+ properties, disasters happen regularly. This platform is now our first call every time. Faster response, better contractors, happier tenants.",
      name: "Jennifer K.",
      location: "Sydney",
      rating: 5,
      image: "/property-manager-headshot.png",
    },
  ]

  const stats = [
    {
      icon: Clock,
      value: "24/7",
      label: "Emergency Response",
      comparison: "Always available when you need us",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Insurance Claim Approval Rate",
      comparison: "vs 60% industry average",
    },
    {
      icon: Users,
      value: "7 days",
      label: "Average Completion Time",
      comparison: "vs 45-day industry average",
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "Customer Satisfaction Rating",
      comparison: "Based on 10,000+ reviews",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-muted/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Property Owners Across Australia
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-start space-x-6">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].location}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={prevTestimonial} className="p-2 bg-transparent">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={nextTestimonial} className="p-2 bg-transparent">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Stats That Matter</h3>
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <stat.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
                      <p className="text-xs text-muted-foreground">{stat.comparison}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
