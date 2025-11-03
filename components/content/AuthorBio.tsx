'use client';

import Image from 'next/image';
import { Award, Shield, Briefcase, GraduationCap, Phone, Mail } from 'lucide-react';

interface AuthorBioProps {
  author: 'phill' | 'bronwyn' | 'team';
  variant?: 'full' | 'compact' | 'inline';
  showContact?: boolean;
  className?: string;
}

export default function AuthorBio({
  author,
  variant = 'full',
  showContact = false,
  className = ''
}: AuthorBioProps) {
  const authorData = {
    phill: {
      name: 'Phill McGurk',
      title: 'Co-Founder & Technical Director',
      image: '/images/team/phill-mcgurk.jpg',
      bio: 'Master Restorer with 25+ years of disaster restoration experience. IICRC certified instructor and co-founder of the National Restoration Professionals Group (NRPG). Phill is a leading voice in the Australian restoration industry, contributing to the development of Australia\'s first ASQA-approved restoration training course.',
      credentials: [
        'Master Restorer Qualification',
        'IICRC Certified Instructor',
        'Water Damage Restoration Expert',
        'Fire & Smoke Restoration Specialist',
        'Mould Remediation Certified',
        'Biohazard Cleaning Certified',
        'NRPG Co-Founder'
      ],
      expertise: [
        'Advanced restoration techniques',
        'Industry education & training',
        'Technical problem-solving',
        'Insurance restoration processes',
        'Quality assurance protocols'
      ],
      experience: '25+ years',
      certifications: 'IICRC Master Restorer, Multiple Certifications'
    },
    bronwyn: {
      name: 'Bronwyn McGurk',
      title: 'Co-Founder & Operations Director',
      image: '/images/team/bronwyn-mcgurk.jpg',
      bio: 'Operations and customer service expert with 14+ years managing disaster recovery operations. Bronwyn specialises in emergency response coordination, insurance claims management, and ensuring exceptional customer experiences during the most challenging times.',
      credentials: [
        'IICRC Operations Management',
        'Emergency Response Coordinator',
        'Insurance Claims Specialist',
        'Customer Service Excellence',
        'Business Operations Management'
      ],
      expertise: [
        '24/7 emergency coordination',
        'Insurance claims management',
        'Customer experience design',
        'Quality assurance',
        'Team leadership'
      ],
      experience: '14+ years',
      certifications: 'IICRC Certified, Operations Management'
    },
    team: {
      name: 'Disaster Recovery Team',
      title: '100% IICRC Certified Specialists',
      image: '/images/team/disaster-recovery-team.jpg',
      bio: 'Our team of certified disaster restoration specialists brings over 25 years of combined experience to every project. Every technician is IICRC certified and trained in the latest restoration techniques, ensuring your property receives the highest standard of care.',
      credentials: [
        '100% IICRC Certified Technicians',
        'CARSI Member Company',
        '$20 Million Public Liability Insurance',
        'Insurance Approved Processes',
        'Ongoing Professional Development'
      ],
      expertise: [
        'Water damage restoration',
        'Fire & smoke damage',
        'Mould remediation',
        'Biohazard cleaning',
        'Storm damage recovery',
        'Emergency response',
        'Insurance coordination'
      ],
      experience: '25+ years',
      certifications: '100% IICRC Certified, CARSI Member'
    }
  };

  const data = authorData[author];

  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
            {data.name.charAt(0)}
          </div>
        </div>
        <div>
          <div className="font-bold text-gray-900">{data.name}</div>
          <div className="text-sm text-gray-600">{data.title}</div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600 ${className}`}>
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl">
            {data.name.charAt(0)}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{data.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{data.title}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3">{data.bio}</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              <Briefcase className="w-3 h-3" />
              {data.experience}
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              <Award className="w-3 h-3" />
              {data.certifications}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-4xl">
              {data.name.charAt(0)}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{data.name}</h2>
            <p className="text-blue-100 text-lg mb-2">{data.title}</p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Briefcase className="w-4 h-4" />
                {data.experience}
              </span>
              <span className="inline-flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Award className="w-4 h-4" />
                Certified Expert
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            About {author === 'team' ? 'Our Team' : data.name.split(' ')[0]}
          </h3>
          <p className="text-gray-700 leading-relaxed">{data.bio}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Credentials & Certifications
            </h4>
            <ul className="space-y-2">
              {data.credentials.map((credential, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Areas of Expertise
            </h4>
            <ul className="space-y-2">
              {data.expertise.map((area, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {showContact && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3">Contact Information</h4>
            <div className="flex flex-col gap-2">
              <a
                href="tel:1300309361"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>1300 309 361</span>
              </a>
              <a
                href="mailto:admin@disasterrecovery.com.au"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>admin@disasterrecovery.com.au</span>
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-4 text-center">
        <p className="text-sm text-gray-600">
          <strong>{data.name}</strong> {author === 'team' ? 'has' : 'and the team have'} helped thousands of Brisbane families and businesses recover from disasters since 2011
        </p>
      </div>
    </div>
  );
}

// Publication metadata component
interface PublicationMetaProps {
  author: 'phill' | 'bronwyn' | 'team';
  datePublished: string;
  dateModified?: string;
  readTime?: string;
  className?: string;
}

export function PublicationMeta({
  author,
  datePublished,
  dateModified,
  readTime,
  className = ''
}: PublicationMetaProps) {
  const authorNames = {
    phill: 'Phill McGurk',
    bronwyn: 'Bronwyn McGurk',
    team: 'Disaster Recovery Team'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-600 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs">
          {authorNames[author].charAt(0)}
        </div>
        <span className="font-medium text-gray-900">{authorNames[author]}</span>
      </div>

      <span className="text-gray-400">•</span>

      <time dateTime={datePublished} className="text-gray-600">
        Published {formatDate(datePublished)}
      </time>

      {dateModified && dateModified !== datePublished && (
        <>
          <span className="text-gray-400">•</span>
          <time dateTime={dateModified} className="text-gray-600">
            Updated {formatDate(dateModified)}
          </time>
        </>
      )}

      {readTime && (
        <>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{readTime} read</span>
        </>
      )}
    </div>
  );
}
