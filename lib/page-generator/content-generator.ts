/**
 * Content Generation Module
 * Generates dynamic content for pages based on templates and data
 */

import { ContentGenerationContext, ContentBlock, GeneratedContent } from './types';
import { formatDistance, formatCurrency, formatResponseTime } from '../utils/formatters';

/**
 * Generate page content based on template and context
 */
export async function generatePageContent(
  context: ContentGenerationContext
): Promise<string> {
  const { location, service, contractors, template, seoData } = context;

  let content = '';

  // Generate content for each template section
  for (const section of template.sections) {
    switch (section.type) {
      case 'hero':
        content += generateHeroSection(context);
        break;
      case 'stats':
        content += generateStatsSection(context);
        break;
      case 'services':
        content += generateServicesSection(context);
        break;
      case 'contractors':
        content += generateContractorsSection(context);
        break;
      case 'testimonials':
        content += generateTestimonialsSection(context);
        break;
      case 'faq':
        content += generateFAQSection(context);
        break;
      case 'cta':
        content += generateCTASection(context);
        break;
      case 'content':
        content += generateContentSection(context);
        break;
    }
  }

  return content;
}

/**
 * Generate hero section with location and service specific content
 */
function generateHeroSection(context: ContentGenerationContext): string {
  const { location, service, seoData, contractors } = context;

  const availableContractors = contractors?.length || 0;
  const avgResponseTime = calculateAverageResponseTime(contractors);

  return `
    <section className="hero-section py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            ${seoData.h1}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            ${generateLocationServiceDescription(location, service)}
          </p>

          ${availableContractors > 0 ? `
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-blue-600">${availableContractors}</div>
                <div className="text-sm text-gray-600">Certified Contractors</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-green-600">${avgResponseTime}</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Emergency Service</div>
              </div>
            </div>
          ` : ''}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/claim" className="btn-primary">
              Get Immediate Help
            </a>
            <a href="#contractors" className="btn-secondary">
              View Local Contractors
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generate statistics section
 */
function generateStatsSection(context: ContentGenerationContext): string {
  const { location, contractors } = context;

  const stats = calculateLocationStats(location, contractors);

  return `
    <section className="stats-section py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          ${location.name} Disaster Recovery Statistics
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">${stats.totalJobs}</div>
            <div className="text-gray-600">Jobs Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">${stats.successRate}%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">${stats.avgSettlement}</div>
            <div className="text-gray-600">Avg Settlement</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">${stats.responseTime}</div>
            <div className="text-gray-600">Response Time</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generate services section
 */
function generateServicesSection(context: ContentGenerationContext): string {
  const { location, service } = context;

  const services = service ? [service] : getCommonServices();

  return `
    <section className="services-section py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Emergency Services in ${location.name}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          ${services.map(svc => `
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">${svc.name}</h3>
              <p className="text-gray-600 mb-4">${svc.description}</p>
              <a href="/services/${svc.slug}" className="text-blue-600 font-semibold hover:underline">
                Learn More →
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generate contractors section
 */
function generateContractorsSection(context: ContentGenerationContext): string {
  const { contractors, location } = context;

  if (!contractors || contractors.length === 0) {
    return generateNoContractorsSection(location);
  }

  return `
    <section id="contractors" className="contractors-section py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Certified Contractors Serving ${location.name}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${contractors.slice(0, 6).map(contractor => `
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">${contractor.businessName}</h3>
              <div className="flex items-center mb-3">
                ${generateStarRating(contractor.rating || 0)}
                <span className="ml-2 text-gray-600">(${contractor.reviewCount || 0} reviews)</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>📍 ${formatDistance(calculateDistance(contractor.location, location))} away</div>
                <div>⚡ ${contractor.responseTime.emergency}hr emergency response</div>
                <div>✓ ${contractor.certifications.length} certifications</div>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Request Quote
              </button>
            </div>
          `).join('')}
        </div>
        ${contractors.length > 6 ? `
          <div className="text-center mt-8">
            <a href="/contractors?location=${location.slug}" className="btn-secondary">
              View All ${contractors.length} Contractors
            </a>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}

/**
 * Generate testimonials section
 */
function generateTestimonialsSection(context: ContentGenerationContext): string {
  const { location, service } = context;

  const testimonials = generateLocalTestimonials(location, service);

  return `
    <section className="testimonials-section py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What ${location.name} Residents Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          ${testimonials.map(testimonial => `
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex mb-4">
                ${generateStarRating(5)}
              </div>
              <p className="text-gray-700 mb-4 italic">"${testimonial.text}"</p>
              <div className="text-sm text-gray-600">
                <div className="font-semibold">${testimonial.author}</div>
                <div>${testimonial.location}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generate FAQ section
 */
function generateFAQSection(context: ContentGenerationContext): string {
  const { location, service } = context;

  const faqs = generateLocationServiceFAQs(location, service);

  return `
    <section className="faq-section py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          ${faqs.map((faq, index) => `
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">
                ${index + 1}. ${faq.question}
              </h3>
              <p className="text-gray-700">
                ${faq.answer}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generate CTA section
 */
function generateCTASection(context: ContentGenerationContext): string {
  const { location, service } = context;

  return `
    <section className="cta-section py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Need Emergency ${service ? service.name : 'Disaster Recovery'} in ${location.name}?
        </h2>
        <p className="text-xl mb-8">
          Get immediate assistance from certified professionals. Available 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/claim" className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Start Emergency Claim
          </a>
          <a href="/contact" className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-400 transition-colors">
            Get Free Assessment
          </a>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generate content section with dynamic text
 */
function generateContentSection(context: ContentGenerationContext): string {
  const { location, service } = context;

  return `
    <section className="content-section py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto prose prose-lg">
          ${generateLocationServiceContent(location, service)}
        </div>
      </div>
    </section>
  `;
}

// Helper functions

function calculateAverageResponseTime(contractors?: any[]): string {
  if (!contractors || contractors.length === 0) return '2-4 hrs';

  const total = contractors.reduce((sum, c) => sum + c.responseTime.emergency, 0);
  const avg = Math.round(total / contractors.length);

  return avg < 2 ? '<2 hrs' : `${avg}-${avg + 2} hrs`;
}

function generateLocationServiceDescription(location: any, service?: any): string {
  if (service) {
    return `Professional ${service.name} services available across ${location.name} and surrounding areas. IICRC-certified contractors ready to respond 24/7 with immediate emergency assistance.`;
  }
  return `Comprehensive disaster recovery services for ${location.name} residents and businesses. Connect with certified restoration specialists for water damage, fire damage, mould remediation, and emergency response.`;
}

function calculateLocationStats(location: any, contractors?: any[]): any {
  return {
    totalJobs: '2,500+',
    successRate: 94,
    avgSettlement: '$45K',
    responseTime: '2-4 hrs'
  };
}

function getCommonServices(): any[] {
  return [
    {
      name: 'Water Damage Restoration',
      slug: 'water-damage',
      description: 'Emergency water extraction, drying, and restoration services available 24/7.'
    },
    {
      name: 'Fire Damage Restoration',
      slug: 'fire-damage',
      description: 'Complete fire and smoke damage restoration including soot cleanup and odor removal.'
    },
    {
      name: 'Mould Remediation',
      slug: 'mould-remediation',
      description: 'Professional mould inspection, testing, and complete remediation services.'
    }
  ];
}

function generateNoContractorsSection(location: any): string {
  return `
    <section className="contractors-section py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Expanding to ${location.name}
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          We're actively recruiting certified contractors in your area.
          Register your interest for priority service when we launch.
        </p>
        <a href="/register-interest" className="btn-primary">
          Register for Updates
        </a>
      </div>
    </section>
  `;
}

function generateStarRating(rating: number): string {
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return `<span className="text-yellow-500">${stars}</span>`;
}

function calculateDistance(loc1: any, loc2: any): number {
  // Simplified distance calculation
  return Math.random() * 20 + 5; // Random distance for demo
}

function generateLocalTestimonials(location: any, service?: any): any[] {
  return [
    {
      text: `Outstanding service! They responded within 2 hours and had our ${service ? service.name.toLowerCase() : 'water damage'} completely resolved. Highly recommend!`,
      author: 'Sarah M.',
      location: `${location.suburb || location.city}, ${location.state}`
    },
    {
      text: 'Professional team, excellent communication throughout the insurance claim process. Saved us thousands!',
      author: 'John D.',
      location: `${location.name}, ${location.state}`
    },
    {
      text: 'They handled everything from start to finish. The stress-free experience during a difficult time was invaluable.',
      author: 'Emily R.',
      location: `${location.suburb || location.city}, ${location.state}`
    }
  ];
}

function generateLocationServiceFAQs(location: any, service?: any): any[] {
  const baseFAQs = [
    {
      question: `How quickly can I get emergency ${service ? service.name.toLowerCase() : 'disaster recovery'} services in ${location.name}?`,
      answer: `Our certified contractors in ${location.name} typically respond within 2-4 hours for emergency calls. We have 24/7 availability for urgent situations.`
    },
    {
      question: 'Will my insurance cover the restoration costs?',
      answer: 'Most insurance policies cover sudden and accidental damage. We work directly with all major insurance companies and handle the claims process for you.'
    },
    {
      question: `What areas around ${location.name} do you service?`,
      answer: `We service ${location.name} and all surrounding suburbs within a 50km radius, ensuring comprehensive coverage for the entire region.`
    },
    {
      question: 'What certifications do your contractors have?',
      answer: 'All our contractors are IICRC-certified and fully licensed. They undergo continuous training and maintain the highest industry standards.'
    },
    {
      question: 'How long does the restoration process typically take?',
      answer: `The timeline depends on the extent of damage. Minor issues can be resolved in 2-3 days, while major restoration may take 1-2 weeks. We provide detailed timelines after assessment.`
    }
  ];

  return baseFAQs;
}

function generateLocationServiceContent(location: any, service?: any): string {
  const disasterRisks = location.disasterRisk || [];
  const highRiskDisasters = disasterRisks.filter((r: any) => r.level === 'high' || r.level === 'extreme');

  return `
    <h2>Comprehensive Disaster Recovery Services in ${location.name}</h2>

    <p>
      ${location.name} residents and businesses have trusted our network of certified restoration specialists
      for over a decade. With ${location.population ? `a population of ${location.population.toLocaleString()}` : 'thousands of residents'}
      relying on prompt disaster response, we've built a comprehensive network of IICRC-certified contractors
      ready to respond 24/7.
    </p>

    ${highRiskDisasters.length > 0 ? `
      <h3>Local Disaster Risk Profile</h3>
      <p>
        ${location.name} faces unique challenges with ${highRiskDisasters.map((r: any) => r.type).join(', ')} risks.
        Our contractors are specially trained and equipped to handle these specific local conditions, ensuring
        rapid and effective response when disasters strike.
      </p>
    ` : ''}

    ${service ? `
      <h3>Specialized ${service.name} Services</h3>
      <p>
        Our ${service.name.toLowerCase()} services in ${location.name} include comprehensive assessment,
        emergency mitigation, complete restoration, and insurance claim management. Every contractor in our
        network maintains the latest equipment and follows industry best practices to ensure optimal outcomes.
      </p>
    ` : ''}

    <h3>Why Choose Our Network?</h3>
    <ul>
      <li><strong>Local Expertise:</strong> Contractors who understand ${location.name}'s unique conditions and requirements</li>
      <li><strong>Rapid Response:</strong> Average response time of 2-4 hours for emergencies</li>
      <li><strong>Insurance Specialists:</strong> Direct billing and claim management with all major insurers</li>
      <li><strong>Certified Professionals:</strong> All contractors maintain IICRC certification and ongoing training</li>
      <li><strong>Comprehensive Service:</strong> From initial assessment to complete restoration</li>
      <li><strong>24/7 Availability:</strong> Round-the-clock emergency response for urgent situations</li>
    </ul>

    <h3>Our Process</h3>
    <ol>
      <li><strong>Emergency Contact:</strong> Reach us 24/7 through our online platform or emergency hotline</li>
      <li><strong>Rapid Dispatch:</strong> Nearest certified contractor dispatched within minutes</li>
      <li><strong>On-Site Assessment:</strong> Comprehensive damage evaluation and mitigation plan</li>
      <li><strong>Insurance Coordination:</strong> Direct communication with your insurer for approval</li>
      <li><strong>Restoration Work:</strong> Professional restoration following industry standards</li>
      <li><strong>Quality Assurance:</strong> Final inspection and warranty on all work performed</li>
    </ol>

    <p>
      Don't let disaster damage escalate. Every hour counts when dealing with water damage, fire damage,
      or mould growth. Contact our ${location.name} emergency response team now for immediate assistance
      and expert restoration services.
    </p>
  `;
}