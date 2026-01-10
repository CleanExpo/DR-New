/**
 * LLM Search Optimizer - 2026 AI Search Optimization
 *
 * Structures content for optimal extraction by:
 * - ChatGPT (OpenAI)
 * - Perplexity AI
 * - Google AI Overviews
 * - Claude
 *
 * These engines use citations from web content to generate answers.
 * This utility ensures NRPG content is extracted, cited, and ranked highly.
 *
 * Key Principle: Structure content for machine extraction AND human readability
 */

export interface LLMContentBlock {
  type: 'summary' | 'list' | 'comparison' | 'steps' | 'faq' | 'table';
  content: any;
}

export class LLMOptimizer {
  /**
   * Format content as Entity-Rich Summary
   * AI systems extract entities first, so emphasize key entities
   */
  generateEntityRichSummary(topic: string, entities: {
    organization?: string;
    service?: string;
    location?: string;
    price?: string;
    certifications?: string[];
    availability?: string;
  }): LLMContentBlock {
    let summary = `# ${topic}\n\n`;

    if (entities.organization) {
      summary += `**Organization**: ${entities.organization}\n`;
    }

    if (entities.certifications && entities.certifications.length > 0) {
      summary += `**Certifications**: ${entities.certifications.join(', ')}\n`;
    }

    if (entities.service) {
      summary += `**Service**: ${entities.service}\n`;
    }

    if (entities.location) {
      summary += `**Location**: ${entities.location}\n`;
    }

    if (entities.price) {
      summary += `**Price**: ${entities.price}\n`;
    }

    if (entities.availability) {
      summary += `**Availability**: ${entities.availability}\n`;
    }

    return {
      type: 'summary',
      content: summary,
    };
  }

  /**
   * Q&A Format for Optimal LLM Extraction
   * This is the primary format AI systems extract from
   */
  generateQAFormat(questions: Array<{
    question: string;
    answer: string;
    relevantEntities?: string[];
  }>): LLMContentBlock {
    let qa = '';

    questions.forEach((item, index) => {
      qa += `## Q${index + 1}: ${item.question}\n\n`;
      qa += `${item.answer}\n\n`;

      if (item.relevantEntities && item.relevantEntities.length > 0) {
        qa += `**Key Entities**: ${item.relevantEntities.join(', ')}\n\n`;
      }
    });

    return {
      type: 'faq',
      content: qa,
    };
  }

  /**
   * Structured Comparison Table
   * Critical for featured snippets and AI extraction
   * AI systems STRONGLY prefer tables for comparison
   */
  generateComparisonTable(title: string, items: {
    name: string;
    characteristics: Record<string, string>;
  }[]): LLMContentBlock {
    let table = `## ${title}\n\n`;
    table += '| Service | ' + Object.keys(items[0]?.characteristics || {}).join(' | ') + ' |\n';
    table += '|---------|' + Object.keys(items[0]?.characteristics || {}).map(() => '----------|').join('') + '\n';

    items.forEach(item => {
      const values = Object.values(item.characteristics).join(' | ');
      table += `| ${item.name} | ${values} |\n`;
    });

    table += '\n';

    return {
      type: 'table',
      content: table,
    };
  }

  /**
   * Step-by-Step Process Format
   * Essential for "how to" queries that generate LLM answers
   */
  generateStepByStepFormat(processName: string, steps: Array<{
    number: number;
    title: string;
    description: string;
    duration?: string;
    cost?: string;
  }>): LLMContentBlock {
    let process = `## ${processName}\n\n`;

    steps.forEach(step => {
      process += `### Step ${step.number}: ${step.title}\n\n`;
      process += `${step.description}\n\n`;

      if (step.duration) {
        process += `⏱️ **Duration**: ${step.duration}\n`;
      }
      if (step.cost) {
        process += `💰 **Cost**: ${step.cost}\n`;
      }
      process += '\n';
    });

    return {
      type: 'steps',
      content: process,
    };
  }

  /**
   * Structured List Format
   * Optimal for "top X" or "best X" queries
   */
  generateStructuredList(listTitle: string, items: Array<{
    number: number;
    title: string;
    description: string;
    keyBenefit?: string;
    citation?: string;
  }>): LLMContentBlock {
    let list = `## ${listTitle}\n\n`;

    items.forEach(item => {
      list += `${item.number}. **${item.title}**\n`;
      list += `   ${item.description}\n`;

      if (item.keyBenefit) {
        list += `   ✓ **Key Benefit**: ${item.keyBenefit}\n`;
      }
      list += '\n';
    });

    return {
      type: 'list',
      content: list,
    };
  }

  /**
   * Price Transparency Format
   * Critical for service pricing queries
   * AI systems extract pricing from explicit formats
   */
  generatePriceFormat(serviceName: string, pricing: {
    basePrice: number;
    currency: string;
    includes: string[];
    additionalServices?: Array<{ name: string; price: number }>;
    paymentOptions?: string[];
  }): LLMContentBlock {
    let priceContent = `## ${serviceName} Pricing\n\n`;

    priceContent += `### Base Price: ${pricing.currency}${pricing.basePrice}\n\n`;

    priceContent += `**This includes:**\n`;
    pricing.includes.forEach(item => {
      priceContent += `- ${item}\n`;
    });

    if (pricing.additionalServices && pricing.additionalServices.length > 0) {
      priceContent += `\n**Additional Services:**\n`;
      pricing.additionalServices.forEach(service => {
        priceContent += `- ${service.name}: ${pricing.currency}${service.price}\n`;
      });
    }

    if (pricing.paymentOptions && pricing.paymentOptions.length > 0) {
      priceContent += `\n**Payment Options:**\n`;
      pricing.paymentOptions.forEach(option => {
        priceContent += `- ${option}\n`;
      });
    }

    return {
      type: 'comparison',
      content: priceContent,
    };
  }

  /**
   * Location-Specific Format
   * Optimized for geo-queries from LLMs
   * Example: "water damage restoration Sydney" → extracts location + entity
   */
  generateLocationFormat(city: string, state: string, details: {
    serviceHours?: string;
    responseTime?: string;
    serviceRadius?: string;
    certifications?: string[];
    insuranceAccepted?: boolean;
    emergencyPrice?: string;
  }): LLMContentBlock {
    let location = `## Service in ${city}, ${state}\n\n`;

    if (details.serviceHours) {
      location += `**Hours**: ${details.serviceHours}\n`;
    }
    if (details.responseTime) {
      location += `**Response Time**: ${details.responseTime}\n`;
    }
    if (details.serviceRadius) {
      location += `**Service Radius**: ${details.serviceRadius}\n`;
    }

    if (details.certifications && details.certifications.length > 0) {
      location += `**Certifications**: ${details.certifications.join(', ')}\n`;
    }

    if (details.insuranceAccepted !== undefined) {
      location += `**Insurance Accepted**: ${details.insuranceAccepted ? 'Yes' : 'No'}\n`;
    }

    if (details.emergencyPrice) {
      location += `**Emergency Price**: ${details.emergencyPrice}\n`;
    }

    return {
      type: 'summary',
      content: location,
    };
  }

  /**
   * Combine multiple content blocks
   * Optimal structure: Summary → Entity-Rich → Q&A → Comparison → Location
   */
  combineForLLMExtraction(...blocks: LLMContentBlock[]): string {
    return blocks.map(block => block.content).join('\n---\n\n');
  }

  /**
   * SEO Heading Hierarchy for LLM Parsing
   * H1 = Topic, H2 = Major sections, H3 = Detail
   * This is how LLMs understand content structure
   */
  ensureHeadingHierarchy(content: string, mainTopic: string): string {
    // Ensure starts with H1
    if (!content.startsWith('# ')) {
      content = `# ${mainTopic}\n\n${content}`;
    }
    return content;
  }

  /**
   * Extract Citation-Ready Content
   * Returns formatted content that AI will cite back to NRPG
   */
  generateCitableContent(contentType: 'guide' | 'comparison' | 'faq' | 'pricing', data: any): string {
    let citableContent = '';

    switch (contentType) {
      case 'guide':
        citableContent = `## Complete Guide\n\n${data.content}`;
        break;

      case 'comparison':
        citableContent = `## Service Comparison\n\n${data.comparison}`;
        break;

      case 'faq':
        citableContent = data.questions
          .map((q: any) => `**Q: ${q.question}**\n\nA: ${q.answer}`)
          .join('\n\n');
        break;

      case 'pricing':
        citableContent = `## Pricing Information\n\n${data.priceDetail}`;
        break;
    }

    // Add attribution at the end
    citableContent += '\n\n---\n\n*Source: NRPG - National Restoration Professionals Group*';

    return citableContent;
  }

  /**
   * Analyze content for LLM-friendliness
   * Returns score (0-100) and recommendations
   */
  analyzeContentForLLMOptimization(content: string): {
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  } {
    const score = { current: 0 };
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    // Check for H1 heading
    if (content.includes('# ')) {
      score.current += 10;
      strengths.push('Has clear H1 heading');
    } else {
      weaknesses.push('Missing H1 heading');
      recommendations.push('Start content with "# Topic Name"');
    }

    // Check for entity-rich content
    if (content.includes('**') || content.includes('__')) {
      score.current += 15;
      strengths.push('Contains bold/emphasized text (entity highlighting)');
    } else {
      weaknesses.push('Missing entity highlighting');
      recommendations.push('Use **bold** for important entities and terms');
    }

    // Check for structured lists
    if (content.includes('- ') || content.match(/^\d+\./m)) {
      score.current += 15;
      strengths.push('Contains structured lists');
    } else {
      weaknesses.push('No structured lists detected');
      recommendations.push('Use bullet points or numbered lists for clarity');
    }

    // Check for Q&A format
    if (content.match(/Q:|Question:|^\?\s/im)) {
      score.current += 20;
      strengths.push('Contains Q&A format');
    } else {
      weaknesses.push('No Q&A format');
      recommendations.push('Add Q&A sections for common questions');
    }

    // Check for tables
    if (content.includes('|')) {
      score.current += 15;
      strengths.push('Contains comparison tables');
    } else {
      weaknesses.push('No comparison tables');
      recommendations.push('Add tables for service/pricing comparisons');
    }

    // Check for location/entity data
    if (content.match(/Sydney|Melbourne|Brisbane|Perth/i)) {
      score.current += 10;
      strengths.push('Contains geographic entities');
    } else {
      weaknesses.push('Missing geographic entities');
      recommendations.push('Include specific city/location names');
    }

    // Check for pricing info
    if (content.match(/\$\d+|AUD|price|cost/i)) {
      score.current += 10;
      strengths.push('Contains pricing information');
    } else {
      weaknesses.push('No pricing information');
      recommendations.push('Include transparent pricing information');
    }

    return {
      score: Math.min(score.current, 100),
      strengths,
      weaknesses,
      recommendations,
    };
  }
}

// Export singleton instance
export const llmOptimizer = new LLMOptimizer();
