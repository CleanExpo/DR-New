import { Shield, Award, Star, Phone, Droplets, Flame } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <a href="/" className="flex items-center gap-3 group">
            {/* Logo Icon with Pattern */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-red-600 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-red-600 p-2.5 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="relative w-8 h-8">
                  {/* Shield Icon */}
                  <Shield className="w-full h-full text-white" strokeWidth={2.5} fill="currentColor" />
                  {/* Water Droplet Overlay */}
                  <Droplets className="absolute -top-1 -right-1 w-3 h-3 text-blue-200" fill="currentColor" />
                  {/* Fire Icon Overlay */}
                  <Flame className="absolute -bottom-1 -left-1 w-3 h-3 text-red-200" fill="currentColor" />
                </div>
              </div>
            </div>
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-red-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-red-300 transition-all duration-300">
                Disaster Recovery
              </span>
              <span className="text-[10px] text-gray-300 font-medium -mt-0.5">
                Master Restorer
              </span>
            </div>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="text-center mb-12">
          <h3 className="text-xl font-bold mb-8">Trusted & Certified</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-accent" />
              <span className="text-sm">IICRC Master Restorer Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-accent" />
              <span className="text-sm">30+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-accent" />
              <span className="text-sm">Google Reviews 4.9/5</span>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Emergency: +61 1300 309 361</p>
                  <p className="text-xs text-gray-300">24/7 Available</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Service Areas</h4>
            <p className="text-sm text-gray-300 mb-2">Brisbane • Ipswich • Logan</p>
            <p className="text-sm text-gray-300 mb-2">Rapid emergency response</p>
            <p className="text-sm text-gray-300">24/7/365 availability</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Professional</h4>
            <p className="text-sm text-gray-300 mb-2">IICRC Master Restorer</p>
            <p className="text-sm text-gray-300 mb-2">CARSI Member</p>
            <p className="text-sm text-gray-300">30+ Years Experience</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Insurance Approved</h4>
            <p className="text-sm text-gray-300 mb-2">Suncorp • RACQ • Allianz • QBE</p>
            <p className="text-sm text-gray-300 mb-2">95% Approval Rate</p>
            <p className="text-sm text-gray-300">Expert Claims Support</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Disaster Recovery Brisbane. IICRC Master Restorer - Phill McGurk. All rights reserved. Your trusted
            partner in emergency restoration across Brisbane, Ipswich, and Logan.
          </p>
        </div>
      </div>
    </footer>
  )
}
