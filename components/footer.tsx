import { Shield, Award, Star, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <a href="/" className="flex items-center group">
            <img 
              src="/logo1.jpeg" 
              alt="Disaster Recovery - Master Restorer" 
              className="h-16 w-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
            />
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
                  <p className="text-sm font-semibold">Emergency: 1300 309 361</p>
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
