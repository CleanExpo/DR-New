import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emergency Disaster Recovery Questions Brisbane | When To Call 24/7 Help',
  description: 'What to do when water is pouring through your ceiling at 2am in Brisbane. How much does emergency water damage restoration cost in Hamilton. Who do I call for urgent flood damage repair in Ipswich.'
};

export default function LongTailEmergencyQuestionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-900 to-red-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Emergency Questions Answered: What To Do When Disaster Strikes Brisbane
            </h1>
            <p className="text-xl mb-8">
              Real answers to urgent questions when water is flooding your home at 2am,
              your ceiling is collapsing, or fire has damaged your property in Brisbane, Hamilton, Ascot, or Ipswich.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Emergency Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Critical Emergency Questions - Get Help Now
          </h2>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Water Emergency Questions */}
            <Card className="p-8 border-l-4 border-l-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                What do I do when water is pouring through my ceiling at 2am in Brisbane Hamilton area?
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  <strong>IMMEDIATE ACTIONS:</strong> Turn off electricity at the main switch if water is near power points.
                  Place buckets under drips. Call Phill McGurk Master Restorer immediately at <strong>[Emergency Number]</strong> -
                  we provide 24/7 emergency response in Hamilton, Ascot, New Farm, and all Brisbane suburbs.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="font-bold text-red-800">
                    DON'T WAIT: Water damage doubles every hour. Call now to prevent $10,000+ additional damage.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-green-600">
              <h3 className="text-2xl font-bold mb-4 text-green-800">
                How much does emergency water damage restoration cost in Brisbane expensive suburbs like Hamilton and Ascot?
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  Emergency response in Hamilton, Ascot, and New Farm starts at $2,200 for immediate assessment,
                  water extraction, and initial drying. Full restoration costs vary:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li><strong>Single room flooding:</strong> $2,200 - $4,500</li>
                  <li><strong>Multiple rooms/ceiling damage:</strong> $4,500 - $12,000</li>
                  <li><strong>Full house water damage:</strong> $12,000 - $35,000+</li>
                  <li><strong>High-end Hamilton/Ascot properties:</strong> Premium rates for heritage/luxury finishes</li>
                </ul>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-800">
                    INSURANCE COVERED: Most water damage is covered. You typically only pay your excess ($500-$2,500).
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-orange-600">
              <h3 className="text-2xl font-bold mb-4 text-orange-800">
                Who is the best Master Restorer for emergency water damage in Brisbane and Ipswich right now?
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  Phill McGurk is one of only a limited number of Master Restorers in Brisbane and Queensland.
                  With 24/7 emergency response covering:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">Brisbane High-Value Areas:</h4>
                    <ul className="list-disc list-inside">
                      <li>Hamilton waterfront properties</li>
                      <li>Ascot heritage homes</li>
                      <li>New Farm luxury apartments</li>
                      <li>Bulimba riverside homes</li>
                      <li>Toowong executive properties</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Ipswich Premium Areas:</h4>
                    <ul className="list-disc list-inside">
                      <li>Karalee acreage properties</li>
                      <li>Brookwater golf course homes</li>
                      <li>Springfield Lakes estates</li>
                      <li>Augustine Heights developments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-purple-600">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">
                What should I do if my hot water system has burst and flooded my Ipswich home on Christmas Day?
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  Even on Christmas Day, we provide emergency response in Ipswich, Karalee, and Brookwater:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-lg">
                  <li><strong>Turn off water supply</strong> at the main meter (usually near the street)</li>
                  <li><strong>Turn off hot water system power</strong> at the switch/circuit breaker</li>
                  <li><strong>Move belongings</strong> to dry areas immediately</li>
                  <li><strong>Take photos</strong> for insurance before touching anything</li>
                  <li><strong>Call Master Restorer Phill McGurk</strong> - we work Christmas, Easter, and all public holidays</li>
                </ol>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-purple-800">
                    CHRISTMAS/HOLIDAY RESPONSE: No extra charges for public holidays. Same professional service.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-red-600">
              <h3 className="text-2xl font-bold mb-4 text-red-800">
                How do I know if the mould growing in my bathroom after water damage is dangerous black mould?
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  ANY mould growth after water damage requires professional assessment. Signs of dangerous mould:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">DANGER SIGNS:</h4>
                    <ul className="list-disc list-inside">
                      <li>Black or dark green patches</li>
                      <li>Musty smell that won't go away</li>
                      <li>Health symptoms (headaches, breathing issues)</li>
                      <li>Mould returning after cleaning</li>
                      <li>Mould in HVAC/air conditioning</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">IMMEDIATE ACTIONS:</h4>
                    <ul className="list-disc list-inside">
                      <li>Don't try to clean it yourself</li>
                      <li>Ventilate the area if possible</li>
                      <li>Close off affected rooms</li>
                      <li>Call for professional mould testing</li>
                      <li>Document with photos for insurance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-yellow-600">
              <h3 className="text-2xl font-bold mb-4 text-yellow-800">
                My ceiling collapsed from water damage in my Hamilton house - will insurance cover the full repair cost?
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  Ceiling collapse from water damage is typically covered if caused by a sudden, unexpected event.
                  For Hamilton high-value properties, coverage includes:
                </p>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">USUALLY COVERED:</h4>
                    <ul className="list-disc list-inside">
                      <li>Burst pipes, appliance leaks, storm damage</li>
                      <li>Structural repairs including ceiling replacement</li>
                      <li>Water extraction and drying</li>
                      <li>Content restoration/replacement</li>
                      <li>Temporary accommodation during repairs</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">NOT USUALLY COVERED:</h4>
                    <ul className="list-disc list-inside">
                      <li>Gradual leaks or poor maintenance</li>
                      <li>Flood damage (needs separate flood cover)</li>
                      <li>DIY plumbing failures</li>
                    </ul>
                  </div>
                </div>
                <p className="text-lg font-bold">
                  Call us immediately - we handle all insurance paperwork and billing for Hamilton residents.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Action Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don't Wait - Every Minute Counts
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Water damage doubles every hour. Mould can start growing in 24-48 hours.
            Get immediate help from Queensland's Master Restorer covering Brisbane, Ipswich, and Logan.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">24/7 Emergency Response</h3>
              <p>Available Christmas, Easter, weekends</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Rapid Response Time</h3>
              <p>On-site within 60-90 minutes</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Master Restorer Certified</h3>
              <p>One of limited certified in QLD</p>
            </div>
          </div>
          <Link href="/emergency">
            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 text-xl px-8 py-4">
              Get Emergency Help Now - Call [Number]
            </Button>
          </Link>
        </div>
      </section>

      {/* Location-Specific Help */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Emergency Help By Location
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Brisbane Emergency</h3>
              <p className="mb-4">Hamilton, Ascot, New Farm, Bulimba, CBD</p>
              <Link href="/locations/brisbane">
                <Button variant="outline">Brisbane Emergency Help</Button>
              </Link>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Ipswich Emergency</h3>
              <p className="mb-4">Karalee, Brookwater, Springfield Lakes</p>
              <Link href="/locations/ipswich">
                <Button variant="outline">Ipswich Emergency Help</Button>
              </Link>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Logan Emergency</h3>
              <p className="mb-4">Springwood, Shailer Park, Daisy Hill</p>
              <Link href="/locations/logan">
                <Button variant="outline">Logan Emergency Help</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}