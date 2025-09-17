'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Award, Shield, GraduationCap, Calendar, Star, Phone, Mail, Linkedin, CheckCircle2 } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface Certification {
  name: string
  issuer: string
  year: string
  icon?: React.ReactNode
}

interface TeamMember {
  id: string
  name: string
  role: string
  image?: string
  experience: string
  specializations: string[]
  certifications: Certification[]
  bio: string
  phone?: string
  email?: string
  linkedin?: string
}

interface TeamCredentialsProps {
  members?: TeamMember[]
  variant?: 'grid' | 'carousel' | 'detailed'
  showContact?: boolean
  highlightFounders?: boolean
  className?: string
}

/**
 * Team Credentials Display Component
 * Showcases IICRC certifications and team expertise
 * Builds trust through transparency and professional credentials
 */
export const TeamCredentials: React.FC<TeamCredentialsProps> = ({
  members = defaultTeamMembers,
  variant = 'grid',
  showContact = false,
  highlightFounders = true,
  className = ''
}) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const founders = members.filter(m => m.role.includes('Founder'))
  const teamMembers = members.filter(m => !m.role.includes('Founder'))

  if (variant === 'detailed') {
    return (
      <div className={`${className}`}>
        {/* Founders Section */}
        {highlightFounders && founders.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Leadership Team</h2>
              <p className="text-gray-600 mt-2">25+ Years of Industry Excellence</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {founders.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <div className="flex items-start gap-6">
                      {/* Photo */}
                      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>

                      {/* Basic Info */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold">{member.name}</h3>
                        <p className="text-blue-100">{member.role}</p>
                        <p className="text-sm mt-2 text-blue-50">
                          {member.experience} Experience
                        </p>
                      </div>

                      {/* Founder Badge */}
                      <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
                        FOUNDER
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Bio */}
                    <p className="text-gray-700 mb-6">{member.bio}</p>

                    {/* Specializations */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specializations.map((spec, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Professional Certifications</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {member.certifications.map((cert, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                          >
                            <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{cert.name}</p>
                              <p className="text-xs text-gray-600">{cert.issuer} • {cert.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    {showContact && (
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                        {member.phone && (
                          <a
                            href={`tel:${member.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{member.phone}</span>
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">Email</span>
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                            <span className="text-sm">LinkedIn</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Our Certified Technicians</h2>
            <p className="text-gray-600 mt-2">IICRC Certified Restoration Specialists</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                showContact={showContact}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>

        {/* Modal for Selected Member */}
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            showContact={showContact}
          />
        )}
      </div>
    )
  }

  // Grid variant (default)
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {members.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          showContact={showContact}
          isFounder={member.role.includes('Founder')}
        />
      ))}
    </div>
  )
}

// Team Member Card Component
const TeamMemberCard: React.FC<{
  member: TeamMember
  showContact?: boolean
  isFounder?: boolean
  onClick?: () => void
}> = ({ member, showContact, isFounder, onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
        isFounder ? 'ring-2 ring-yellow-400' : ''
      }`}
      onClick={onClick}
    >
      {/* Photo */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}

        {isFounder && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-blue-900 px-2 py-0.5 rounded text-xs font-bold">
            FOUNDER
          </div>
        )}

        {/* Experience Badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
          {member.experience}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{member.name}</h3>
        <p className="text-sm text-gray-600">{member.role}</p>

        {/* Certifications Count */}
        <div className="flex items-center gap-2 mt-3">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-700">
            {member.certifications.length} Certifications
          </span>
        </div>

        {/* Top Specializations */}
        <div className="mt-3 flex flex-wrap gap-1">
          {member.specializations.slice(0, 2).map((spec, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {spec}
            </span>
          ))}
          {member.specializations.length > 2 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
              +{member.specializations.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Member Modal Component
const MemberModal: React.FC<{
  member: TeamMember
  onClose: () => void
  showContact?: boolean
}> = ({ member, onClose, showContact }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          ×
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-600">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
              <p className="text-sm text-gray-500 mt-1">{member.experience} Experience</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 mb-6">{member.bio}</p>

          {/* Certifications */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Professional Certifications</h3>
            <div className="space-y-2">
              {member.certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    <p className="text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          {showContact && (member.phone || member.email) && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-2">
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Default Team Data
const defaultTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Phill McGurk',
    role: 'Co-Founder & Technical Director',
    experience: '25+ Years',
    specializations: ['Water Damage', 'Fire Restoration', 'Complex Claims', 'NRPG Initiative'],
    certifications: [
      { name: 'WRT - Water Damage', issuer: 'IICRC', year: '2020' },
      { name: 'FSRT - Fire & Smoke', issuer: 'IICRC', year: '2020' },
      { name: 'AMRT - Mould Remediation', issuer: 'IICRC', year: '2021' },
      { name: 'HST - Health & Safety', issuer: 'IICRC', year: '2021' }
    ],
    bio: 'Industry pioneer with over 25 years of restoration experience. Founder of the National Restoration Professionals Group (NRPG) and developer of Australia's first ASQA-approved restoration training course.',
    phone: '0400 123 456',
    email: 'phill@disasterrecovery.com.au',
    linkedin: 'https://linkedin.com/in/phillmcgurk'
  },
  {
    id: '2',
    name: 'Bronwyn McGurk',
    role: 'Co-Founder & Operations Director',
    experience: '25+ Years',
    specializations: ['Business Operations', 'Customer Care', 'Insurance Liaison', 'Quality Assurance'],
    certifications: [
      { name: 'Business Management', issuer: 'QUT', year: '2010' },
      { name: 'Insurance Claims', issuer: 'ANZIIF', year: '2018' },
      { name: 'Quality Systems', issuer: 'ISO', year: '2019' }
    ],
    bio: 'Co-founder with extensive experience in restoration operations and customer service excellence. Instrumental in building Disaster Recovery's reputation for exceptional client care and insurance company partnerships.',
    phone: '0400 123 457',
    email: 'bronwyn@disasterrecovery.com.au'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Senior Restoration Technician',
    experience: '10+ Years',
    specializations: ['Water Extraction', 'Structural Drying', 'Moisture Mapping'],
    certifications: [
      { name: 'WRT - Water Damage', issuer: 'IICRC', year: '2022' },
      { name: 'ASD - Applied Structural', issuer: 'IICRC', year: '2022' }
    ],
    bio: 'Specialist in water damage restoration with expertise in advanced drying techniques and moisture control systems.',
  }
]