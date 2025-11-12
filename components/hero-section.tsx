"use client"

import { Button } from "@/components/ui/button"
import { Phone, Shield, Clock, CheckCircle, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hero.jpeg')`,
        }}
      />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-primary/20 animate-pulse" />

      {/* Moving Objects - Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Phone Icons */}
        <div className="absolute top-20 left-10 animate-float-slow">
          <Phone className="h-8 w-8 text-primary/30" />
        </div>
        <div className="absolute top-40 right-20 animate-float-medium">
          <Shield className="h-10 w-10 text-accent/30" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float-fast">
          <CheckCircle className="h-6 w-6 text-secondary/30" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float-slow">
          <Clock className="h-7 w-7 text-accent/30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float-medium">
          <MapPin className="h-9 w-9 text-primary/30" />
        </div>

        {/* Animated Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Moving Background Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4 animate-fade-in-cascade">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-delay-100">
                <span className="inline-block animate-slide-in-left">DISASTER RECOVERY</span>
                <br />
                <span className="inline-block text-primary animate-slide-in-right">BRISBANE</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 animate-delay-200">
                24/7 Emergency Property Restoration Services
              </p>
              <div className="flex flex-wrap items-center gap-4 text-lg animate-delay-300">
                <MapPin className="h-5 w-5 text-accent animate-bounce" />
                <span className="font-semibold">Brisbane | Ipswich | Logan</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-delay-300">
              <a
                href="tel:+611300309361"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold text-lg animate-pulse-emergency group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Phone className="mr-2 h-5 w-5 group-hover:animate-spin" />
                  Call Now: 1300 309 361
                </span>
                <div className="absolute inset-0 bg-accent/20 animate-pulse" />
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-lg px-8 py-4 bg-transparent backdrop-blur-sm"
              >
                Available 24/7
              </Button>
            </div>

            {/* Trust Elements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 animate-delay-400">
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-colors">
                <Clock className="h-5 w-5 text-accent animate-pulse" />
                <span>24/7 Emergency Response</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>IICRC Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-colors">
                <Shield className="h-5 w-5 text-accent" />
                <span>Insurance-Approved</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>30+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Right Side - Emergency Indicator with Enhanced Animation */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Outer Ring */}
              <div className="absolute inset-0 w-64 h-64 rounded-full border-4 border-primary/30 animate-ping" />
              <div className="absolute inset-0 w-64 h-64 rounded-full border-4 border-primary/20 animate-ping" style={{ animationDelay: '0.5s' }} />
              
              {/* Main Circle */}
              <div className="w-64 h-64 rounded-full bg-primary/20 flex items-center justify-center animate-pulse backdrop-blur-sm">
                <div className="w-48 h-48 rounded-full bg-primary/40 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.2s' }}>
                  <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center animate-bounce-slow shadow-2xl">
                    <Phone className="h-16 w-16 text-white animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Live Support Badge */}
              <div className="absolute -top-4 -right-4 bg-accent text-foreground px-4 py-2 rounded-full text-sm font-semibold animate-bounce shadow-lg">
                Live Support
              </div>
              
              {/* Rotating Icons Around Circle */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-8 h-8 bg-accent/50 rounded-full flex items-center justify-center animate-spin-slow"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: `${i * 60}px 0`,
                    transform: `rotate(${i * 60}deg) translateY(-120px)`,
                  }}
                >
                  <Shield className="h-4 w-4 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
