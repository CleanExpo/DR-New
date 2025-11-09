'use client';

import { AlertTriangle, Droplets, Flame, Wind, Zap, Phone, Shield, Clock, CheckCircle } from 'lucide-react';

export default function EmergencyGuidePage() {
  const emergencySteps = {
    water: [
      'Turn off main water supply immediately',
      'Switch off electricity at the main breaker if safe',
      'Move valuables to higher ground',
      'Document damage with photos/videos',
      'Contact insurance company',
      'Call professional restoration service'
    ],
    fire: [
      'Ensure everyone is safe and accounted for',
      'Do NOT enter the property until cleared by fire department',
      'Contact insurance company immediately',
      'Document all damage thoroughly',
      'Secure the property to prevent further damage',
      'Contact professional fire restoration service'
    ],
    storm: [
      'Stay away from damaged power lines',
      'Document all damage before cleanup',
      'Cover roof damage with tarps if safe',
      'Remove standing water promptly',
      'Contact insurance adjuster',
      'Begin professional restoration immediately'
    ],
    mould: [
      'Do not disturb visible mould growth',
      'Turn off HVAC to prevent spore spread',
      'Isolate affected area if possible',
      'Avoid DIY cleanup for areas >10 sq ft',
      'Document extent of growth',
      'Contact certified mould remediation specialist'
    ]
  };

  const emergencyContacts = [
    { service: 'Emergency Services', number: '000', description: 'Police, Fire, Ambulance' },
    { service: 'SES Storm Damage', number: '132 500', description: 'State Emergency Service' },
    { service: 'Poisons Information', number: '13 11 26', description: '24/7 Poison Help' },
    { service: 'Gas Leaks', number: '1800 427 532', description: 'Gas Emergency' },
    { service: 'Electrical Emergencies', number: '13 13 88', description: 'Power Outages & Hazards' }
  ];

  const preventionTips = [
    {
      icon: Droplets,
      title: 'Water Damage Prevention',
      tips: [
        'Regular plumbing inspections',
        'Install water leak detectors',
        'Know water shut-off locations',
        'Maintain appliance hoses'
      ]
    },
    {
      icon: Flame,
      title: 'Fire Prevention',
      tips: [
        'Test smoke alarms monthly',
        'Have fire extinguishers ready',
        'Create evacuation plan',
        'Regular electrical inspections'
      ]
    },
    {
      icon: Wind,
      title: 'Storm Preparation',
      tips: [
        'Trim trees near property',
        'Secure loose outdoor items',
        'Check roof and gutters',
        'Prepare emergency kit'
      ]
    },
    {
      icon: Shield,
      title: 'Mould Prevention',
      tips: [
        'Control humidity levels',
        'Fix leaks immediately',
        'Ensure proper ventilation',
        'Regular HVAC maintenance'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Emergency Alert Banner */}
        <div className="bg-red-700 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-8 h-8" />
            <h1 className="text-3xl font-bold">24/7 Emergency Response Guide</h1>
          </div>
          <p className="text-xl mb-4">If you're experiencing an emergency, call 000 immediately</p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <Phone className="inline w-5 h-5 mr-2" />
              Call Emergency Services
            </button>
            <button className="px-6 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors">
              Contact Restoration Team
            </button>
          </div>
        </div>

        {/* Emergency Response Steps */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Emergency Response Steps</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(emergencySteps).map(([type, steps]) => (
              <div key={type} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  {type === 'water' && <Droplets className="w-6 h-6 text-blue-600" />}
                  {type === 'fire' && <Flame className="w-6 h-6 text-red-600" />}
                  {type === 'storm' && <Wind className="w-6 h-6 text-purple-600" />}
                  {type === 'mould' && <Shield className="w-6 h-6 text-green-600" />}
                  <h3 className="text-xl font-semibold text-white capitalize">{type} Damage</h3>
                </div>
                <ol className="space-y-2">
                  {steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <h3 className="text-white font-semibold mb-1">{contact.service}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">{contact.number}</p>
                <p className="text-gray-700 text-sm">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Critical First 48 Hours */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-bold text-white">Critical First 48 Hours</h2>
          </div>
          <p className="text-white mb-4">
            The first 48 hours after water damage are crucial. Acting quickly can prevent:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <Zap className="w-6 h-6 text-yellow-700 mb-2" />
              <h3 className="text-white font-semibold mb-1">Mould Growth</h3>
              <p className="text-gray-700 text-sm">Starts within 24-48 hours</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Zap className="w-6 h-6 text-yellow-700 mb-2" />
              <h3 className="text-white font-semibold mb-1">Structural Damage</h3>
              <p className="text-gray-700 text-sm">Wood swelling and warping</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Zap className="w-6 h-6 text-yellow-700 mb-2" />
              <h3 className="text-white font-semibold mb-1">Secondary Damage</h3>
              <p className="text-gray-700 text-sm">50% cost increase if delayed</p>
            </div>
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Prevention & Preparedness</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preventionTips.map((category, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <category.icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Kit Checklist */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Emergency Kit Essentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">Documents</h3>
              <ul className="space-y-2">
                {['Insurance policies', 'Property documents', 'Medical records', 'Photo inventory'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Supplies</h3>
              <ul className="space-y-2">
                {['First aid kit', 'Flashlights & batteries', 'Emergency water', 'Non-perishable food'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Tools</h3>
              <ul className="space-y-2">
                {['Battery radio', 'Phone chargers', 'Basic tools', 'Plastic sheeting'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}