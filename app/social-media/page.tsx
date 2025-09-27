import type { Metadata } from 'next'
import { Facebook, Instagram, Youtube, Linkedin, Share2, Users, TrendingUp, Calendar, Zap } from 'lucide-react'
import SocialMediaSharing from '@/components/social/SocialMediaSharing'
import SocialMediaAutomation from '@/components/social/SocialMediaAutomation'
import { SOCIAL_MEDIA, SOCIAL_CONTENT_TEMPLATES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Social Media | Connect with Disaster Recovery Brisbane',
  description: 'Follow Disaster Recovery Brisbane on social media for emergency response updates, prevention tips, and before/after transformations. Professional disaster recovery content across all platforms.',
  keywords: 'disaster recovery social media, emergency response updates, Brisbane restoration, Facebook, Instagram, LinkedIn, YouTube, prevention tips',
  openGraph: {
    title: 'Follow Disaster Recovery Brisbane on Social Media',
    description: 'Stay connected with professional disaster recovery content, emergency updates, and prevention tips across all social platforms.',
    type: 'website',
    locale: 'en_AU',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/social-media'
  }
}

export default function SocialMediaPage() {
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: SOCIAL_MEDIA.facebook.url,
      handle: SOCIAL_MEDIA.facebook.handle,
      description: 'Emergency updates, customer stories, and prevention tips',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      features: ['24/7 Updates', 'Community Support', 'Live Videos', 'Event Announcements']
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: SOCIAL_MEDIA.instagram.url,
      handle: SOCIAL_MEDIA.instagram.handle,
      description: 'Before/after transformations and behind-the-scenes content',
      color: 'bg-pink-600 hover:bg-pink-700',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      features: ['Before/After Photos', 'Stories', 'Reels', 'Equipment Showcase']
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: SOCIAL_MEDIA.linkedin.url,
      handle: SOCIAL_MEDIA.linkedin.handle,
      description: 'Professional insights and industry expertise',
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      features: ['Industry Articles', 'Professional Tips', 'Case Studies', 'Certifications']
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: SOCIAL_MEDIA.youtube.url,
      handle: SOCIAL_MEDIA.youtube.handle,
      description: 'Educational videos and restoration process documentation',
      color: 'bg-red-600 hover:bg-red-700',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      features: ['Tutorial Videos', 'Process Documentation', 'Expert Interviews', 'Equipment Reviews']
    }
  ];

  const contentTypes = [
    {
      type: 'emergency_response',
      name: 'Emergency Response',
      icon: Zap,
      description: '24/7 emergency response content and real-time updates',
      example: SOCIAL_CONTENT_TEMPLATES.emergency_response.facebook.substring(0, 100) + '...',
      color: 'text-red-600 bg-red-100'
    },
    {
      type: 'before_after',
      name: 'Before & After',
      icon: TrendingUp,
      description: 'Dramatic transformations showcasing restoration expertise',
      example: SOCIAL_CONTENT_TEMPLATES.before_after.instagram.substring(0, 100) + '...',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      type: 'prevention_tips',
      name: 'Prevention Tips',
      icon: Users,
      description: 'Educational content helping prevent disasters',
      example: SOCIAL_CONTENT_TEMPLATES.prevention_tips.linkedin.substring(0, 100) + '...',
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with
              <span className="text-blue-300"> Disaster Recovery Brisbane</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Follow us across social media for emergency response updates, expert prevention tips, and incredible before/after transformations. Stay connected with Brisbane's leading disaster recovery specialists.
            </p>

            <div className="flex justify-center mb-8">
              <SocialMediaSharing
                title="Follow Disaster Recovery Brisbane on Social Media"
                description="Professional disaster recovery content, emergency updates, and prevention tips"
                showLabels={true}
                size="lg"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Share2 className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm">Platforms</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold">2.5K+</div>
                <div className="text-sm">Followers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold">Daily</div>
                <div className="text-sm">Updates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Platforms */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Us Everywhere</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find us on your favorite social platform for disaster recovery content tailored to each audience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${platform.bgColor} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <platform.icon className={`h-8 w-8 ${platform.textColor}`} />
                    <span className={`px-3 py-1 ${platform.color} text-white text-sm rounded-full`}>
                      Active
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{platform.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{platform.handle}</p>
                  <p className="text-gray-700">{platform.description}</p>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What to Expect:</h4>
                  <ul className="space-y-2">
                    {platform.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 w-full ${platform.color} text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}
                  >
                    <platform.icon className="h-5 w-5" />
                    Follow on {platform.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Content We Share</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional disaster recovery content designed to educate, inform, and showcase our expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contentTypes.map((content) => (
              <div key={content.type} className="bg-gray-50 rounded-lg p-6">
                <div className={`w-12 h-12 rounded-lg ${content.color} flex items-center justify-center mb-4`}>
                  <content.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{content.name}</h3>
                <p className="text-gray-600 mb-4">{content.description}</p>
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700 italic">"{content.example}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Automation Tool */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Social Media Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Automated content generation and scheduling tool integrated with Airtable for comprehensive social media strategy
            </p>
          </div>

          <SocialMediaAutomation />
        </div>
      </section>

      {/* Emergency Updates Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Zap className="h-12 w-12 text-yellow-400 mr-4" />
            <h2 className="text-3xl font-bold">24/7 Emergency Updates</h2>
          </div>
          <p className="text-xl text-red-100 mb-8">
            Follow our social media for real-time emergency response updates, weather alerts, and immediate disaster recovery advice when you need it most.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                <platform.icon className="h-5 w-5" />
                {platform.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}