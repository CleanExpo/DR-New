import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthorBio from '@/components/content/AuthorBio';
import AuthorSchema from '@/components/seo/AuthorSchema';
import { Mic, Award, Users, BookOpen, Radio, Tv, Newspaper, TrendingUp, Calendar, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Media & Recognition | Industry Leadership | Disaster Recovery Brisbane',
  description: 'Disaster Recovery\'s media appearances, industry recognition, and educational contributions. NRPG founding member, podcast host, and ASQA course developer.',
  keywords: 'restoration industry podcast, NRPG, disaster recovery education, restoration training, industry leadership Brisbane',
  robots: 'index, follow',
  openGraph: {
    title: 'Media & Recognition | Industry Leadership | Disaster Recovery',
    description: 'Industry leadership, media appearances, and educational contributions from Brisbane\'s restoration experts.',
    url: 'https://disasterrecovery.com.au/media',
    type: 'website'
  }
};

export default function MediaPage() {
  const podcasts = [
    {
      title: 'The Restoration Professional Podcast',
      role: 'Host & Producer',
      description: 'Phill McGurk hosts Australia\'s premier restoration industry podcast, featuring interviews with industry leaders, technical deep-dives, and practical advice for restoration professionals.',
      status: 'In Production',
      episodes: 'Coming 2025',
      topics: [
        'Advanced restoration techniques',
        'Industry standards and best practices',
        'Insurance claim management',
        'Business development for restorers',
        'New technologies in restoration',
        'Case study analysis'
      ]
    }
  ];

  const mediaAppearances = [
    {
      outlet: 'Industry Trade Publications',
      type: 'Articles & Features',
      year: '2024',
      topics: [
        'Heritage property restoration techniques',
        'Emergency response best practices',
        'Climate change impact on restoration demand',
        'Training next-generation restorers'
      ]
    },
    {
      outlet: 'CARSI Industry Events',
      type: 'Speaking Engagements',
      year: '2023-2024',
      topics: [
        'Advanced mould remediation techniques',
        'Insurance coordination strategies',
        'Quality assurance in restoration',
        'Business growth in restoration industry'
      ]
    },
    {
      outlet: 'NRPG National Conferences',
      type: 'Keynote Speaker',
      year: '2022-2024',
      topics: [
        'Industry education initiatives',
        'Developing Australian restoration standards',
        'Collaboration in the restoration industry',
        'Technology adoption in restoration'
      ]
    }
  ];

  const industryContributions = [
    {
      title: 'ASQA-Approved Restoration Course Development',
      organisation: 'Australian Skills Quality Authority',
      year: '2023-2024',
      description: 'Phill McGurk contributed to developing Australia\'s first ASQA-approved restoration training course, creating a formalised education pathway for restoration professionals.',
      impact: 'Establishing national training standards for the restoration industry',
      status: 'Active Development',
      achievements: [
        'Curriculum design and technical content',
        'Practical assessment frameworks',
        'Industry consultation and feedback',
        'Alignment with IICRC international standards',
        'Creating career pathways for restorers'
      ]
    },
    {
      title: 'National Restoration Professionals Group (NRPG)',
      organisation: 'Industry Association',
      year: '2018-Present',
      description: 'Co-founded NRPG based on the American CORE Group model, bringing together Australia\'s leading restoration companies to share knowledge, develop standards, and advance the industry.',
      impact: 'Fostering collaboration and raising industry standards nationwide',
      status: 'Founding Member',
      achievements: [
        'Established national restoration network',
        'Industry best practice sharing',
        'Collaborative problem-solving forums',
        'Educational resource development',
        'Advocacy for industry recognition'
      ]
    },
    {
      title: 'IICRC Instructor Contributions',
      organisation: 'Institute of Inspection Cleaning and Restoration Certification',
      year: '2015-Present',
      description: 'As an IICRC certified instructor, Phill contributes to training the next generation of restoration technicians through courses, workshops, and ongoing education.',
      impact: 'Raising technical competency across the Australian restoration industry',
      status: 'Active Instructor',
      achievements: [
        'Water damage restoration training',
        'Fire and smoke restoration courses',
        'Mould remediation certification',
        'Advanced technical workshops',
        'Mentoring emerging instructors'
      ]
    }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Industry Innovation Award',
      organisation: 'CARSI',
      description: 'Recognised for contributions to education and training development'
    },
    {
      year: '2023',
      title: 'Excellence in Restoration',
      organisation: 'NRPG',
      description: 'Outstanding project delivery and quality standards'
    },
    {
      year: '2022',
      title: 'Community Service Recognition',
      organisation: 'Brisbane Business',
      description: 'Supporting families and businesses during disaster recovery'
    },
    {
      year: '2021',
      title: 'Customer Service Excellence',
      organisation: 'Insurance Industry',
      description: 'Outstanding service delivery and client satisfaction'
    }
  ];

  const upcomingEvents = [
    {
      date: '2025-03-15',
      title: 'CARSI Annual Conference',
      role: 'Keynote Speaker',
      topic: 'The Future of Restoration Education in Australia',
      location: 'Sydney, NSW'
    },
    {
      date: '2025-05-20',
      title: 'NRPG Technical Workshop',
      role: 'Workshop Leader',
      topic: 'Advanced Water Damage Restoration Techniques',
      location: 'Brisbane, QLD'
    },
    {
      date: '2025-07-10',
      title: 'Insurance Industry Summit',
      role: 'Panel Speaker',
      topic: 'Restoration Industry Standards and Best Practices',
      location: 'Melbourne, VIC'
    }
  ];

  return (
    <>
      <AuthorSchema
        author="phill"
        articleTitle="Media & Recognition | Industry Leadership"
        articleUrl="https://disasterrecovery.com.au/media"
        datePublished="2025-01-15"
        dateModified="2025-01-15"
      />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Mic className="w-5 h-5" />
                <span className="text-sm font-semibold">Industry Leadership & Recognition</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">Media & Recognition</h1>
              <p className="text-xl text-blue-100">
                Leading Australia's restoration industry through education, innovation, and thought leadership. Discover our contributions to advancing disaster recovery standards.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">NRPG</div>
                <div className="font-semibold text-gray-900 mb-2">Founding Member</div>
                <div className="text-sm text-gray-600">National industry leadership</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600 mb-2">ASQA</div>
                <div className="font-semibold text-gray-900 mb-2">Course Developer</div>
                <div className="text-sm text-gray-600">Australia's first certified course</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <Mic className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-600 mb-2">Podcast</div>
                <div className="font-semibold text-gray-900 mb-2">Host & Producer</div>
                <div className="text-sm text-gray-600">Industry education content</div>
              </div>
            </div>

            <AuthorBio author="phill" variant="compact" className="mb-8" />
          </div>
        </section>

        {/* Podcast Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Restoration Professional Podcast</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Australia's premier restoration industry podcast, sharing expertise and advancing professional knowledge.
              </p>
            </div>

            {podcasts.map((podcast, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{podcast.title}</h3>
                      <p className="text-purple-100 mb-4">{podcast.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                          <Mic className="w-4 h-4" />
                          {podcast.role}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                          <Radio className="w-4 h-4" />
                          {podcast.status}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                          <Calendar className="w-4 h-4" />
                          {podcast.episodes}
                        </span>
                      </div>
                    </div>
                    <Mic className="w-16 h-16 flex-shrink-0 ml-4" />
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Topics Covered</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {podcast.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Contributions */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Contributions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advancing the restoration industry through education, standards development, and professional collaboration.
              </p>
            </div>

            <div className="space-y-8">
              {industryContributions.map((contribution, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg border-l-4 border-blue-600 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">{contribution.title}</h3>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {contribution.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <span className="font-semibold">{contribution.organisation}</span>
                          <span>•</span>
                          <span>{contribution.year}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{contribution.description}</p>
                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                          <div className="flex items-start gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900 mb-1">Impact</div>
                              <div className="text-sm text-gray-700">{contribution.impact}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <BookOpen className="w-12 h-12 text-blue-600 ml-4 flex-shrink-0" />
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3">Key Achievements</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {contribution.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <Award className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Appearances */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Appearances & Speaking</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sharing expertise through industry publications, conferences, and professional events.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {mediaAppearances.map((appearance, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {appearance.type === 'Articles & Features' && <Newspaper className="w-6 h-6 text-blue-600" />}
                      {appearance.type === 'Speaking Engagements' && <Mic className="w-6 h-6 text-blue-600" />}
                      {appearance.type === 'Keynote Speaker' && <Users className="w-6 h-6 text-blue-600" />}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{appearance.outlet}</div>
                      <div className="text-sm text-gray-600">{appearance.type}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">{appearance.year}</div>
                  <ul className="space-y-2">
                    {appearance.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry recognition for excellence, innovation, and community service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-yellow-700 mb-1">{award.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{award.title}</h3>
                      <div className="text-sm text-gray-600 mb-2">{award.organisation}</div>
                      <p className="text-gray-700">{award.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Speaking Engagements</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with us at upcoming industry events and conferences.
              </p>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-semibold text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {event.role}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-700 mb-2">{event.topic}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ExternalLink className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Work With Industry Leaders</h2>
            <p className="text-xl mb-8 text-blue-100">
              When you choose Disaster Recovery, you're working with Brisbane's most qualified and recognised restoration specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Call 1300 309 361
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
