'use client'

import React, { useState } from 'react'
import { MapPin, Clock, Navigation, AlertCircle, TrendingUp, Users, Truck } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface ServiceZone {
  id: string
  name: string
  suburbs: string[]
  responseTime: string
  color: string
  coverage: 'primary' | 'secondary' | 'extended'
  technicians: number
  vehicles: number
}

interface ResponseTimeMapProps {
  zones?: ServiceZone[]
  currentLocation?: { suburb: string; postcode: string }
  showLegend?: boolean
  showStats?: boolean
  interactive?: boolean
  className?: string
}

/**
 * Response Time Map Component
 * Visual representation of service areas and guaranteed response times
 * Builds trust through transparency about coverage and availability
 */
export const ResponseTimeMap: React.FC<ResponseTimeMapProps> = ({
  zones = defaultServiceZones,
  currentLocation,
  showLegend = true,
  showStats = true,
  interactive = true,
  className = ''
}) => {
  const [selectedZone, setSelectedZone] = useState<ServiceZone | null>(null)
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)

  const getZoneForSuburb = (suburb: string): ServiceZone | undefined => {
    return zones.find(zone =>
      zone.suburbs.some(s => s.toLowerCase() === suburb.toLowerCase())
    )
  }

  const currentZone = currentLocation ? getZoneForSuburb(currentLocation.suburb) : null

  const totalTechnicians = zones.reduce((sum, zone) => sum + zone.technicians, 0)
  const totalVehicles = zones.reduce((sum, zone) => sum + zone.vehicles, 0)
  const totalSuburbs = zones.reduce((sum, zone) => sum + zone.suburbs.length, 0)

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Brisbane Service Coverage Map
            </h2>
            <p className="text-blue-100 mt-1">
              24/7 Emergency Response Across Southeast Queensland
            </p>
          </div>
          {currentLocation && currentZone && (
            <div className="text-right">
              <p className="text-sm text-blue-100">Your Location</p>
              <p className="text-lg font-semibold">{currentLocation.suburb}</p>
              <p className="text-2xl font-bold text-yellow-300">{currentZone.responseTime}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Map Visualization */}
        <div className="relative bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-8 mb-6">
          {/* Simplified Brisbane Map Representation */}
          <svg
            viewBox="0 0 800 600"
            className="w-full h-auto max-h-96"
            style={{ minHeight: '300px' }}
          >
            {/* Brisbane River */}
            <path
              d="M 100 300 Q 400 250, 700 350"
              stroke="#006994"
              strokeWidth="8"
              fill="none"
              opacity="0.3"
            />

            {/* Service Zones */}
            {/* CBD & Inner North */}
            <circle
              cx="400"
              cy="300"
              r="60"
              fill="#DC2626"
              opacity="0.3"
              className={`cursor-pointer transition-all ${
                hoveredZone === 'cbd' ? 'opacity-60' : ''
              }`}
              onMouseEnter={() => setHoveredZone('cbd')}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => setSelectedZone(zones[0])}
            />
            <text x="400" y="300" textAnchor="middle" className="fill-gray-900 font-semibold text-sm">
              CBD
            </text>
            <text x="400" y="320" textAnchor="middle" className="fill-gray-600 text-xs">
              15-30 mins
            </text>

            {/* Inner North */}
            <circle
              cx="400"
              cy="200"
              r="50"
              fill="#F59E0B"
              opacity="0.3"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredZone('north')}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="400" y="200" textAnchor="middle" className="fill-gray-900 font-semibold text-sm">
              North
            </text>
            <text x="400" y="220" textAnchor="middle" className="fill-gray-600 text-xs">
              30-45 mins
            </text>

            {/* Inner South */}
            <circle
              cx="400"
              cy="400"
              r="50"
              fill="#F59E0B"
              opacity="0.3"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredZone('south')}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="400" y="400" textAnchor="middle" className="fill-gray-900 font-semibold text-sm">
              South
            </text>
            <text x="400" y="420" textAnchor="middle" className="fill-gray-600 text-xs">
              30-45 mins
            </text>

            {/* East */}
            <circle
              cx="550"
              cy="300"
              r="45"
              fill="#F59E0B"
              opacity="0.3"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredZone('east')}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="550" y="300" textAnchor="middle" className="fill-gray-900 font-semibold text-sm">
              East
            </text>
            <text x="550" y="320" textAnchor="middle" className="fill-gray-600 text-xs">
              25-40 mins
            </text>

            {/* West */}
            <circle
              cx="250"
              cy="300"
              r="45"
              fill="#F59E0B"
              opacity="0.3"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredZone('west')}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="250" y="300" textAnchor="middle" className="fill-gray-900 font-semibold text-sm">
              West
            </text>
            <text x="250" y="320" textAnchor="middle" className="fill-gray-600 text-xs">
              20-35 mins
            </text>

            {/* Ipswich */}
            <circle
              cx="100"
              cy="350"
              r="40"
              fill="#3B82F6"
              opacity="0.3"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredZone('ipswich')}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="100" y="350" textAnchor="middle" className="fill-gray-900 font-semibold text-sm">
              Ipswich
            </text>
            <text x="100" y="370" textAnchor="middle" className="fill-gray-600 text-xs">
              45-60 mins
            </text>

            {/* Logan */}
            <circle
              cx="450"
              cy="500"
              r="40"
              fill="#3B82F6"
              opacity="0.3"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredZone('logan')}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="450" y="500" textAnchor="middle" className="fill-gray-900 font-semibold text-sm">
              Logan
            </text>
            <text x="450" y="520" textAnchor="middle" className="fill-gray-600 text-xs">
              45-60 mins
            </text>

            {/* Office Location Pin */}
            <g transform="translate(200, 320)">
              <circle r="8" fill="#DC2626" />
              <circle r="5" fill="#FFFFFF" />
              <text x="15" y="5" className="fill-gray-900 font-semibold text-xs">
                Main Office
              </text>
            </g>

            {/* Current Location Pin */}
            {currentLocation && currentZone && (
              <g transform={`translate(${400}, ${300})`}>
                <circle r="10" fill="#22C55E" className="animate-pulse" />
                <circle r="6" fill="#FFFFFF" />
                <text x="15" y="5" className="fill-gray-900 font-semibold text-xs">
                  You are here
                </text>
              </g>
            )}
          </svg>

          {/* Mobile View - List Format */}
          <div className="md:hidden mt-6 space-y-2">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg"
                onClick={() => setSelectedZone(zone)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{zone.name}</p>
                    <p className="text-xs text-gray-600">{zone.suburbs.length} suburbs</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{zone.responseTime}</p>
                  <p className="text-xs text-gray-600">response</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Coverage */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              Primary Coverage (15-30 mins)
            </h3>
            <div className="space-y-2">
              {zones.filter(z => z.coverage === 'primary').map((zone) => (
                <div
                  key={zone.id}
                  className={`p-3 bg-red-50 rounded-lg cursor-pointer transition-all hover:bg-red-100 ${
                    selectedZone?.id === zone.id ? 'ring-2 ring-red-600' : ''
                  }`}
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{zone.name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {zone.suburbs.slice(0, 3).join(', ')}
                        {zone.suburbs.length > 3 && ` +${zone.suburbs.length - 3} more`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">{zone.responseTime}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Users className="w-3 h-3" />
                        {zone.technicians}
                        <Truck className="w-3 h-3 ml-1" />
                        {zone.vehicles}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Coverage */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              Secondary Coverage (30-45 mins)
            </h3>
            <div className="space-y-2">
              {zones.filter(z => z.coverage === 'secondary').map((zone) => (
                <div
                  key={zone.id}
                  className={`p-3 bg-orange-50 rounded-lg cursor-pointer transition-all hover:bg-orange-100 ${
                    selectedZone?.id === zone.id ? 'ring-2 ring-orange-600' : ''
                  }`}
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{zone.name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {zone.suburbs.slice(0, 3).join(', ')}
                        {zone.suburbs.length > 3 && ` +${zone.suburbs.length - 3} more`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">{zone.responseTime}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Users className="w-3 h-3" />
                        {zone.technicians}
                        <Truck className="w-3 h-3 ml-1" />
                        {zone.vehicles}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extended Coverage */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              Extended Coverage (45-60 mins)
            </h3>
            <div className="space-y-2">
              {zones.filter(z => z.coverage === 'extended').map((zone) => (
                <div
                  key={zone.id}
                  className={`p-3 bg-blue-50 rounded-lg cursor-pointer transition-all hover:bg-blue-100 ${
                    selectedZone?.id === zone.id ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{zone.name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {zone.suburbs.slice(0, 3).join(', ')}
                        {zone.suburbs.length > 3 && ` +${zone.suburbs.length - 3} more`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{zone.responseTime}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Users className="w-3 h-3" />
                        {zone.technicians}
                        <Truck className="w-3 h-3 ml-1" />
                        {zone.vehicles}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        {showStats && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalSuburbs}</p>
              <p className="text-xs text-gray-600">Suburbs Covered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalTechnicians}</p>
              <p className="text-xs text-gray-600">Technicians</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalVehicles}</p>
              <p className="text-xs text-gray-600">Response Vehicles</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-xs text-gray-600">Availability</p>
            </div>
          </div>
        )}

        {/* Response Time Guarantee */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-600">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">1-Hour Response Guarantee</p>
              <p className="text-sm text-gray-600 mt-1">
                We guarantee emergency response within 1 hour for all primary and secondary coverage areas.
                Extended areas may require additional travel time during peak periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Default Service Zone Data
const defaultServiceZones: ServiceZone[] = [
  {
    id: 'cbd-inner',
    name: 'CBD & Inner Brisbane',
    suburbs: ['Brisbane CBD', 'Spring Hill', 'Fortitude Valley', 'South Brisbane', 'West End', 'Kangaroo Point'],
    responseTime: '15-30 mins',
    color: '#DC2626',
    coverage: 'primary',
    technicians: 8,
    vehicles: 4
  },
  {
    id: 'inner-north',
    name: 'Inner North',
    suburbs: ['New Farm', 'Teneriffe', 'Newstead', 'Ascot', 'Hamilton', 'Clayfield', 'Albion'],
    responseTime: '20-35 mins',
    color: '#F59E0B',
    coverage: 'secondary',
    technicians: 6,
    vehicles: 3
  },
  {
    id: 'inner-west',
    name: 'Inner West',
    suburbs: ['Toowong', 'Auchenflower', 'Milton', 'Paddington', 'Red Hill', 'Bardon'],
    responseTime: '20-35 mins',
    color: '#F59E0B',
    coverage: 'secondary',
    technicians: 4,
    vehicles: 2
  },
  {
    id: 'inner-south',
    name: 'Inner South',
    suburbs: ['Woolloongabba', 'Greenslopes', 'Coorparoo', 'Camp Hill', 'Norman Park'],
    responseTime: '25-40 mins',
    color: '#F59E0B',
    coverage: 'secondary',
    technicians: 4,
    vehicles: 2
  },
  {
    id: 'ipswich',
    name: 'Ipswich Region',
    suburbs: ['Ipswich Central', 'Booval', 'Bundamba', 'Raceview', 'Flinders View'],
    responseTime: '45-60 mins',
    color: '#3B82F6',
    coverage: 'extended',
    technicians: 4,
    vehicles: 2
  },
  {
    id: 'logan',
    name: 'Logan Region',
    suburbs: ['Logan Central', 'Springwood', 'Underwood', 'Slacks Creek', 'Rochedale'],
    responseTime: '45-60 mins',
    color: '#3B82F6',
    coverage: 'extended',
    technicians: 4,
    vehicles: 2
  }
]