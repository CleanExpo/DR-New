import { Button } from "@/components/ui/button"
import { Phone, Shield, MessageCircle, Mail } from "lucide-react"

export function FinalCTASection() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url('/emergency-response-lights-dramatic-background.jpg')`,
      }}
    >
      {/* Animated emergency light effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Don't Wait for Disaster to Strike</h2>

          <div className="mb-12">
            <p className="text-2xl text-white mb-4">Save this number now:</p>
            <a
              href="tel:1800347278"
              className="text-4xl md:text-6xl font-bold text-primary hover:text-primary/80 transition-colors animate-pulse-emergency"
            >
              1800-DISASTER
            </a>
            <p className="text-lg text-gray-300 mt-2">(1800-347-278)</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Emergency Scenario */}
          <div className="text-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border-2 border-primary/50 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">If You're in an Emergency Right Now:</h3>
            <p className="text-gray-100 mb-8 leading-relaxed">
              Don't waste another minute. Call us immediately. Every second counts.
            </p>
            <a
              href="tel:+611300309361"
              className="inline-flex items-center justify-center h-10 rounded-md px-12 py-6 bg-primary hover:bg-primary/90 text-white font-bold text-xl animate-pulse-emergency w-full shadow-lg"
            >
              <Phone className="mr-3 h-6 w-6" />
              Call Now - Available 24/7
            </a>
          </div>

          {/* Preparation Scenario */}
          <div className="text-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border-2 border-secondary/50 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">If You Want to Be Prepared:</h3>
            <p className="text-gray-100 mb-8 leading-relaxed">
              Smart property owners prepare before disaster strikes. Get instant access to our network.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-xl px-12 py-6 w-full bg-white/10 shadow-lg"
            >
              <Shield className="mr-3 h-6 w-6" />
              Get Prepared Now
            </Button>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-bold text-white mb-8">Contact Methods:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <Phone className="h-8 w-8 text-primary" />
              <span className="text-white font-semibold">Call</span>
              <span className="text-gray-300 text-sm">1800-DISASTER (24/7)</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <MessageCircle className="h-8 w-8 text-primary" />
              <span className="text-white font-semibold">Text</span>
              <span className="text-gray-300 text-sm">Emergency photos</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <MessageCircle className="h-8 w-8 text-primary" />
              <span className="text-white font-semibold">Chat</span>
              <span className="text-gray-300 text-sm">Instant AI assistant</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Mail className="h-8 w-8 text-primary" />
              <span className="text-white font-semibold">Email</span>
              <span className="text-gray-300 text-sm">help@disasterrecovery.com.au</span>
            </div>
          </div>
        </div>

        {/* Final Hook */}
        <div className="mt-16 text-center">
          <p className="text-2xl text-white font-bold mb-4">
            The next disaster you face, you'll either wish you had called us first...
          </p>
          <p className="text-2xl text-accent font-bold">or you'll be grateful that you did.</p>
          <p className="text-lg text-gray-300 mt-6 italic">
            Your insurance claim depends on your first call. Make it the right one.
          </p>
        </div>
      </div>
    </section>
  )
}
