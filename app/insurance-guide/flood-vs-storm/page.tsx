import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { CloudRain, Waves, AlertTriangle, CheckCircle, Info, MapPin, Clock, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Flood vs Storm Damage Insurance | Critical Coverage Differences Explained',
  description: 'Understand the critical differences between flood and storm damage for insurance coverage. Learn how definitions affect claims, what\'s covered, and how to protect your property.',
  keywords: ["flood vs storm damage", "flood insurance Australia", "storm damage coverage", "flood definition insurance", "water damage claims"],
};

export default function FloodVsStormPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Guide', href: '/insurance-guide' },
            { label: 'Flood vs Storm Damage' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Link href="/insurance-guide" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
                ← Back to Insurance Guide
              </Link>

              <h1 className="text-5xl font-bold mb-6">
                Flood vs Storm Damage
              </h1>

              <p className="text-xl text-blue-100">
                Understanding the critical differences between flood and storm damage can mean the difference
                between a covered claim and thousands of dollars out-of-pocket. Learn how insurance defines
                these events and what it means for your coverage.
              </p>
            </div>
          </div>
        </section>

        {/* Critical Importance Banner */}
        <section className="py-8 bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Critical Coverage Alert</h3>
                <p className="text-red-800 text-sm">
                  Many Australians discover too late that their "water damage" isn't covered because it's
                  classified as flood, not storm damage. Since 2012, standard flood definitions apply,
                  but coverage varies significantly between insurers. This distinction can save or cost
                  you tens of thousands of dollars.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Key Distinction */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">The Critical Distinction</h2>

              <div className="prose prose-lg mb-8 text-center">
                <p>
                  The difference between flood and storm damage isn't about how much water there is or how
                  fast it moves - it's about the <strong>source</strong> and <strong>path</strong> of the water.
                  The same rainfall event can cause both storm damage (covered by most policies) and flood
                  damage (which may not be covered) to the same property.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-blue-300 bg-blue-50/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <CloudRain className="w-8 h-8 text-blue-600" />
                      <CardTitle className="text-xl text-blue-700">Storm Damage</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-green-700">Usually Covered - Water From Above</h4>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>✓ Rain entering through damaged roof</li>
                      <li>✓ Wind-driven rain through windows/doors</li>
                      <li>✓ Hail damage allowing water entry</li>
                      <li>✓ Water from blocked gutters due to storm</li>
                      <li>✓ Burst pipes from storm pressure</li>
                      <li>✓ Tree damage allowing rain penetration</li>
                    </ul>

                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>Key:</strong> Water enters from above due to storm action -
                        rain, wind, hail causing immediate damage to building envelope.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-300 bg-orange-50/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Waves className="w-8 h-8 text-orange-600" />
                      <CardTitle className="text-xl text-orange-700">Flood Damage</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibant mb-3 text-red-700">Often NOT Covered - Water From Ground/Outside</h4>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>✗ Rising water from overflowing rivers/creeks</li>
                      <li>✗ Stormwater overwhelming drainage systems</li>
                      <li>✗ Water entering from ground level up</li>
                      <li>✗ Overland flow across neighbouring properties</li>
                      <li>✗ Storm surge and king tides</li>
                      <li>✗ Council drainage system failures</li>
                    </ul>

                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <p className="text-sm text-red-800">
                        <strong>Key:</strong> Water comes from outside the property at ground level,
                        regardless of ultimate source (rain, river, sea).
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Official Definition */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Official Australian Flood Definition (2012)</h2>

            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-blue-700">
                    Standard Industry Definition
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                    <h4 className="font-bold text-blue-900 mb-3 text-lg">Flood means:</h4>
                    <p className="text-blue-800 italic">
                      "The covering of normally dry land by water that has escaped or been released from the
                      normal confines of any lake, river, creek, or other natural watercourse, whether or not
                      altered or modified; or any reservoir, canal, or dam."
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-green-50 p-4 rounded border border-green-200">
                      <h5 className="font-semibold text-green-700 mb-2">Includes:</h5>
                      <ul className="space-y-1 text-green-700">
                        <li>• River/creek overflow</li>
                        <li>• Dam or reservoir overflow</li>
                        <li>• Levee/embankment failure</li>
                        <li>• Tidal surges</li>
                        <li>• Tsunami</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-4 rounded border border-orange-200">
                      <h5 className="font-semibold text-orange-700 mb-2">Excludes:</h5>
                      <ul className="space-y-1 text-orange-700">
                        <li>• Burst water mains</li>
                        <li>• Swimming pool overflow</li>
                        <li>• Blocked household drains</li>
                        <li>• Roof gutters overflowing</li>
                        <li>• Appliance water leaks</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                      <h5 className="font-semibold text-yellow-700 mb-2">Grey Areas:</h5>
                      <ul className="space-y-1 text-yellow-700">
                        <li>• Council storm drains</li>
                        <li>• Street flooding</li>
                        <li>• Natural watercourse disputes</li>
                        <li>• Modified drainage systems</li>
                        <li>• Overland flow paths</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real-World Scenarios */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Real-World Scenarios: What's Covered?</h2>

            <div className="max-w-5xl mx-auto space-y-6">
              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-green-700">Scenario 1: Heavy Rainfall - Storm Damage ✓</h3>
                  <p className="text-gray-700 mb-2">
                    During a severe thunderstorm, high winds drive rain through damaged roof tiles into your home.
                    The same storm also causes a tree branch to break your window, allowing more rain inside.
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <strong className="text-green-700">Coverage:</strong> Usually covered as storm damage.
                    Water entered due to storm action damaging the building envelope (roof, windows).
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-red-500">
                <CardContent className="p-6">
                  <h3 className="font-semibant mb-2 text-red-700">Scenario 2: Same Storm - Flood Damage ✗</h3>
                  <p className="text-gray-700 mb-2">
                    The same heavy rainfall overwhelms local creek systems. Water rises above its banks,
                    flows across the road and surrounding properties, and enters your home through doors and windows.
                  </p>
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <strong className="text-red-700">Coverage:</strong> Often NOT covered without flood insurance.
                    Water came from overflowing natural watercourse, meeting flood definition.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-orange-700">Scenario 3: Stormwater System Failure ⚠️</h3>
                  <p className="text-gray-700 mb-2">
                    Heavy rain overwhelms council stormwater drains. Water backs up through street drains
                    and enters your property from ground level, flooding your garage and lower level.
                  </p>
                  <div className="bg-orange-50 p-3 rounded text-sm">
                    <strong className="text-orange-700">Coverage:</strong> Often disputed. May be covered if
                    council system failure is deemed "accidental," but many insurers classify as flood.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-blue-700">Scenario 4: Combined Storm and Flood ⚠️</h3>
                  <p className="text-gray-700 mb-2">
                    Storm damages your roof (storm damage) allowing rain inside. Simultaneously, nearby creek
                    overflows flooding your ground floor (flood damage). Both happen during the same weather event.
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <strong className="text-blue-700">Coverage:</strong> Typically split claim. Roof/upper level
                    damage from storm covered, ground floor flood damage may not be covered.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-purple-700">Scenario 5: Storm Surge vs Storm Damage ⚠️</h3>
                  <p className="text-gray-700 mb-2">
                    Cyclone creates storm surge (seawater pushed inland by wind) that floods coastal properties.
                    The same cyclone's winds also damage roofs allowing rain penetration.
                  </p>
                  <div className="bg-purple-50 p-3 rounded text-sm">
                    <strong className="text-purple-700">Coverage:</strong> Wind damage typically covered,
                    storm surge often classified as flood and may not be covered.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Variations */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How Coverage Varies Between Insurers</h2>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Flood Included Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-green-700">Comprehensive Coverage</h4>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>✓ Storm damage included</li>
                      <li>✓ Flood damage included</li>
                      <li>✓ Actions of the sea (some policies)</li>
                      <li>✓ Higher premiums</li>
                      <li>✓ May have higher excess for flood</li>
                      <li>✓ Better protection overall</li>
                    </ul>
                    <div className="bg-green-50 p-3 rounded text-sm">
                      <strong>Best for:</strong> High-risk flood areas, peace of mind,
                      comprehensive protection.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Storm Only Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibant mb-3 text-orange-700">Basic Coverage</h4>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>✓ Storm damage included</li>
                      <li>✗ Flood damage excluded</li>
                      <li>✗ Limited water damage coverage</li>
                      <li>✓ Lower premiums</li>
                      <li>⚠ Significant coverage gaps</li>
                      <li>⚠ High financial risk</li>
                    </ul>
                    <div className="bg-orange-50 p-3 rounded text-sm">
                      <strong>Risk:</strong> Major financial exposure if flood occurs.
                      Claims often disputed over flood vs storm.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Optional Flood Cover</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-blue-700">Flexible Options</h4>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>✓ Storm damage standard</li>
                      <li>+ Flood cover available as add-on</li>
                      <li>+ Choose your level of flood protection</li>
                      <li>⚠ Easy to overlook flood option</li>
                      <li>⚠ May have different excess</li>
                      <li>⚠ Sub-limits may apply</li>
                    </ul>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      <strong>Important:</strong> Must actively select flood cover.
                      Default policies often exclude flood.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Geographic Risk Factors */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Australian Geographic Risk Factors</h2>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-red-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibant mb-4 text-red-700">High Flood Risk Areas</h3>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800">Southeast Queensland</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Brisbane River catchment</li>
                          <li>• Logan and Albert Rivers</li>
                          <li>• Gold Coast hinterland</li>
                          <li>• Lockyer Valley</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">Northern NSW</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Lismore and Richmond Valley</li>
                          <li>• Tweed and Brunswick Rivers</li>
                          <li>• Clarence River system</li>
                          <li>• Hunter Valley</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">Other Risk Areas</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Murray River (NSW/VIC/SA)</li>
                          <li>• Melbourne's Maribyrnong River</li>
                          <li>• Adelaide Hills catchments</li>
                          <li>• Perth Swan River areas</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-blue-700">Storm Damage Risk Factors</h3>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800">Cyclone Zones</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• North Queensland coast</li>
                          <li>• Northern Territory coast</li>
                          <li>• Pilbara and Kimberley (WA)</li>
                          <li>• Some Gold Coast/Northern NSW</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">Severe Thunderstorm Areas</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Southeast Queensland</li>
                          <li>• Eastern NSW</li>
                          <li>• Northern Victoria</li>
                          <li>• Adelaide Hills and plains</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">Hailstorm Corridors</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Western Sydney to Newcastle</li>
                          <li>• Brisbane to Sunshine Coast</li>
                          <li>• Melbourne's outer eastern suburbs</li>
                          <li>• Perth Hills and eastern suburbs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Claims Investigation Process */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How Insurers Investigate Flood vs Storm Claims</h2>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Weather Data Analysis</h3>
                    <p className="text-gray-700">
                      Insurers access Bureau of Meteorology data, satellite images, and rainfall records to determine
                      weather patterns during the claim period. They analyse wind speeds, rainfall intensity, and
                      timing to establish whether damage was caused by storm action or flooding.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibant mb-2">Water Flow and Entry Point Investigation</h3>
                    <p className="text-gray-700">
                      Loss assessors examine where water entered the property, water marks on walls, debris patterns,
                      and damage distribution. They distinguish between water from above (storm) versus ground level
                      entry (flood). Photography and measurements are critical evidence.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Hydrology and Terrain Analysis</h3>
                    <p className="text-gray-700">
                      For disputed claims, insurers may engage hydrologists to analyse local water flow patterns,
                      topography, and drainage systems. They determine if water came from defined watercourses
                      or natural drainage paths versus direct storm impacts.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Neighbouring Property Comparison</h3>
                    <p className="text-gray-700">
                      Insurers compare damage patterns with neighbouring properties. If elevated properties suffered
                      roof damage while lower properties flooded, this supports both storm and flood causes for
                      the same event. Witness statements from neighbours are valuable evidence.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Timing and Sequence Analysis</h3>
                    <p className="text-gray-700">
                      The sequence of damage is crucial. Storm damage typically occurs during peak wind/hail activity,
                      while flooding may develop hours later as water accumulates. Time-stamped photos, security
                      footage, and witness accounts help establish the timeline.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Important for Policyholders:</h4>
                  <p className="text-yellow-800 text-sm">
                    Document everything immediately after the event. Take photos showing water entry points, damage patterns,
                    and water levels. Note the time sequence of events. This evidence is crucial if your claim is disputed.
                    Consider engaging your own loss assessor for significant claims involving flood vs storm disputes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Protection Strategies */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Protection Strategies for Property Owners</h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibant mb-2 text-green-700">Insurance Protection</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Choose policies that include flood cover</li>
                    <li>• Understand your policy's flood definition</li>
                    <li>• Consider higher excess for better coverage</li>
                    <li>• Review coverage annually and after major events</li>
                    <li>• Document all property improvements</li>
                    <li>• Maintain adequate sum insured amounts</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-blue-700">Physical Protection</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Install flood barriers or sandbag points</li>
                    <li>• Raise electrical outlets above potential flood levels</li>
                    <li>• Ensure proper roof and gutter maintenance</li>
                    <li>• Install non-return valves on drains</li>
                    <li>• Consider elevated storage for valuables</li>
                    <li>• Maintain clear drainage around property</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-purple-700">Early Warning Systems</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Monitor BoM weather warnings</li>
                    <li>• Sign up for local flood warning systems</li>
                    <li>• Understand your area's flood history</li>
                    <li>• Identify evacuation routes and safe areas</li>
                    <li>• Prepare emergency contact lists</li>
                    <li>• Keep emergency supplies readily available</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-500">
                <CardContent className="p-6">
                  <h3 className="font-semibant mb-2 text-orange-700">Documentation Preparation</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Create digital inventory of possessions</li>
                    <li>• Store important documents in waterproof storage</li>
                    <li>• Keep insurance policies easily accessible</li>
                    <li>• Maintain contact details for insurers/brokers</li>
                    <li>• Know your policy numbers and key terms</li>
                    <li>• Have emergency contact numbers ready</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Key Takeaways</h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">The Source Matters More Than the Amount</h3>
                    <p className="text-gray-700 text-sm">
                      It doesn't matter if there's 10cm or 2m of water - what matters is where it came from.
                      Water from above due to storm action is usually covered. Water from ground level due to
                      overflow from natural watercourses often isn't.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibant mb-2">One Event Can Cause Both Types of Damage</h3>
                    <p className="text-gray-700 text-sm">
                      The same storm can cause covered storm damage and excluded flood damage to the same property.
                      Understanding this helps explain why some parts of your claim may be covered while others aren't.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Read Your Policy Carefully</h3>
                    <p className="text-gray-700 text-sm">
                      Standard flood definitions apply since 2012, but not all policies include flood cover.
                      Even when included, there may be different excesses, sub-limits, or waiting periods for flood claims.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Documentation Is Critical</h3>
                    <p className="text-gray-700 text-sm">
                      In disputed claims, evidence about water source and entry point determines coverage.
                      Immediate photography and detailed records can make the difference between a paid and denied claim.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer and Legal */}
        <section className="py-12 bg-yellow-50 border-t border-yellow-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This guide provides general information only about flood and storm damage distinctions in
                  Australian insurance. Specific coverage, definitions, and claim outcomes vary significantly
                  between insurers, policies, and individual circumstances. The examples provided are for
                  illustration only and do not guarantee coverage decisions. Always read your Product
                  Disclosure Statement (PDS) and policy documents carefully. For specific coverage questions
                  or claims, consult with your insurance broker, insurer, or professional loss assessor.
                  This information should not be considered legal or professional advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Water Damage to Your Property?</h2>
            <p className="text-xl mb-8">
              Whether it's flood or storm damage, we have the expertise to restore your property properly.
              We work with all insurers and understand the complexities of water damage claims.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Call 1300 309 361
              </a>
              <Link
                href="/services/water-damage-restoration"
                className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
              >
                Water Damage Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}