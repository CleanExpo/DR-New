'use client';

import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  caption?: string;
}

export function OptimizedImage({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
  caption
}: OptimizedImageProps) {
  return (
    <figure className={`image-container ${className}`}>
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
      />
      {caption && (
        <figcaption className="image-caption text-sm text-gray-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Image data for all website images
export const siteImages = {
  // Image 1: Storm water timber floor damage
  timberFloorStormDamage: {
    src: '/images/case-studies/timber-floor-storm-water-damage-brisbane.webp',
    alt: 'Timber floor water damage from storm water backup in Brisbane home showing dark staining and contamination requiring professional assessment',
    title: 'Storm Water Damage to Timber Floors - Black Water Contamination Case Study',
    width: 1920,
    height: 1080,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Category 3 water damage to timber flooring from storm drain backup. This contamination level requires full disposal of affected materials including flooring, kitchen cabinetry, and wall linings up to 600mm.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Storm Water Timber Floor Damage Brisbane',
      description: 'Professional assessment photo showing Category 3 black water damage to timber floors from city drain backup during heavy storms. Dark staining indicates contamination requiring disposal of flooring, kitchen carcasses, and wall linings to 600mm height.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/timber-floor-storm-water-damage-brisbane.webp',
      keywords: ['storm water damage', 'timber floor water damage', 'black water contamination', 'Brisbane flooding', 'Category 3 water damage', 'insurance claim assessment'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/timber-floor-storm-water-damage-brisbane-thumb.webp'
    }
  },

  // Image 2: Hidden mould damage under carpet
  hiddenMouldCarpetEdge: {
    src: '/images/case-studies/hidden-mould-damage-carpet-smooth-edge-brisbane.webp',
    alt: 'Hidden mould growth on carpet smooth edge discovered during Brisbane water damage inspection showing extensive contamination behind furniture',
    title: 'Hidden Mould Damage Under Carpet - Child Bedroom Health Risk Assessment',
    width: 1920,
    height: 2560,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Hidden mould contamination on smooth edge under carpet pile. Water ingress behind bed went unnoticed until visible wall dampness appeared. Child\'s bedroom required full decontamination including carpet, underlay, wall plaster, and all porous materials.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Hidden Mould Damage Carpet Edge Brisbane',
      description: 'Professional inspection revealing extensive mould growth on carpet smooth edge (tack strip) in child\'s bedroom. Long-term water ingress behind furniture created serious health risks requiring complete material removal and decontamination.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/hidden-mould-damage-carpet-smooth-edge-brisbane.webp',
      keywords: ['hidden mould damage', 'carpet mould Brisbane', 'smooth edge contamination', 'bedroom water damage', 'child health risk mould', 'furniture hiding water damage'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/hidden-mould-damage-carpet-smooth-edge-brisbane-thumb.webp'
    }
  },

  // Image 3: Specialized drying equipment deployment
  specializedDryingEquipment: {
    src: '/images/case-studies/specialized-drying-equipment-storm-flood-brisbane.webp',
    alt: 'Specialized drying equipment deployed in Brisbane kitchen after storm water flooding showing professional yellow drying hoses preventing secondary damage',
    title: 'Emergency Make-Safe Drying Equipment - Storm Water Flood Response Brisbane',
    width: 1920,
    height: 2560,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Professional drying equipment installed as emergency make-safe while awaiting insurance assessor (2 weeks delay). Critical intervention prevents secondary damage and mould growth during assessment delays.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Specialized Drying Equipment Storm Response Brisbane',
      description: 'Emergency make-safe drying equipment deployment after storm water flooding. Professional restoration services often first on-site, providing critical damage mitigation while insurance assessors delayed 2 weeks. Shows importance of immediate response vs waiting.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/specialized-drying-equipment-storm-flood-brisbane.webp',
      keywords: ['specialized drying equipment', 'make-safe services', 'storm water flooding Brisbane', 'emergency drying', 'insurance delay response', 'first responder restoration'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/specialized-drying-equipment-storm-flood-brisbane-thumb.webp'
    }
  },

  // Image 4: Exterior environmental mould on patio awning
  exteriorEnvironmentalMould: {
    src: '/images/case-studies/exterior-environmental-mould-patio-awning-brisbane.webp',
    alt: 'Extensive exterior mould contamination on patio awning affecting immunocompromised residents requiring professional environmental health assessment Brisbane',
    title: 'Environmental Mould Risk Assessment - Exterior Contamination Affecting Health-Compromised Residents',
    width: 1920,
    height: 2560,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Severe exterior mould contamination on patio awning creating health risks for immunocompromised residents. Professional environmental assessment and remediation required to prevent spore infiltration into living spaces.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Exterior Environmental Mould Patio Awning Brisbane',
      description: 'Environmental health assessment showing extensive mould growth on exterior patio awning. Clients with health conditions and medication-compromised immune systems at risk from airborne spores entering home. Professional cleaning and prevention strategies essential.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/exterior-environmental-mould-patio-awning-brisbane.webp',
      keywords: ['exterior mould contamination', 'environmental health assessment', 'immunocompromised mould risk', 'patio awning mould', 'Brisbane mould inspection', 'health condition mould exposure'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/exterior-environmental-mould-patio-awning-brisbane-thumb.webp'
    }
  },

  // Image 5: Commercial environmental mould - $330k savings case
  commercialMouldSavings: {
    src: '/images/case-studies/commercial-environmental-mould-330k-savings-brisbane.webp',
    alt: 'Commercial building environmental mould remediation saving $330,000 through expert protocol development versus contractor overquoting Brisbane',
    title: 'Commercial Mould Remediation - How Expert Assessment Saved $330,000',
    width: 1920,
    height: 2560,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Commercial facility with environmental mould. Initial quote: $80,000 + 6 weeks closure. Expert protocol: $20,000, 2 days work, zero downtime. Total savings: $330,000 when including business interruption costs.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Commercial Environmental Mould 330k Savings Brisbane',
      description: 'Case study showing $330,000 savings on commercial mould remediation. Initial contractor quote $80,000 with 6 weeks closure. Expert protocol delivered $20,000 solution with zero downtime. Demonstrates importance of right expertise versus any contractor.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/commercial-environmental-mould-330k-savings-brisbane.webp',
      keywords: ['commercial mould remediation', '$330k savings mould', 'expert protocol development', 'business interruption prevention', 'Brisbane commercial mould', 'overquoting contractors'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/commercial-environmental-mould-330k-savings-thumb.webp'
    }
  },

  // Image 6: Thermal imaging showing thermal bridging
  thermalBridgingFlir: {
    src: '/images/case-studies/thermal-bridging-flir-no-insulation-brisbane.webp',
    alt: 'FLIR thermal camera showing extreme thermal bridging with -29.1°C to 30°C temperature differential causing condensation and mould in Brisbane rental property',
    title: 'Thermal Imaging Reveals Missing Insulation - Thermal Bridging Causing Recurring Mould',
    width: 1920,
    height: 2560,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'FLIR MR277 thermal imaging showing extreme temperature differential (-29.1°C to 30°C) indicating missing insulation and thermal bridging. This causes condensation at dew point, leading to persistent mould growth in south-facing rooms.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Thermal Bridging FLIR Inspection Brisbane',
      description: 'Professional thermal imaging inspection revealing missing insulation causing thermal bridging in rental property. Temperature differentials of 59°C create condensation when dew point is reached, resulting in recurring mould issues. Shows importance of thermal camera diagnostics.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/thermal-bridging-flir-no-insulation-brisbane.webp',
      keywords: ['thermal bridging inspection', 'FLIR thermal camera', 'missing insulation mould', 'condensation dew point', 'rental property mould', 'thermal imaging Brisbane'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/thermal-bridging-flir-no-insulation-thumb.webp'
    }
  },

  // Image 7: Biohazard concrete decontamination
  biohazardConcreteDecontamination: {
    src: '/images/case-studies/biohazard-concrete-decontamination-animal-waste-brisbane.webp',
    alt: 'Biohazard concrete floor decontamination treatment for animal urine and feces contamination showing professional odour removal process Brisbane',
    title: 'Biohazard Decontamination - Setting Realistic Expectations for Complex Odour Removal',
    width: 1920,
    height: 1440,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Biohazard decontamination of concrete floor contaminated by animal waste. White treatment powder shows extent of contamination. 90% odour reduction achieved with honest assessment of limitations due to porous material penetration.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Biohazard Concrete Decontamination Brisbane',
      description: 'Professional biohazard decontamination of concrete floor contaminated by animal urine and feces. Shows realistic approach to odour removal with 90% reduction achieved while explaining limitations of porous material contamination. Demonstrates expertise in setting realistic expectations.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/biohazard-concrete-decontamination-animal-waste-brisbane.webp',
      keywords: ['biohazard decontamination', 'animal waste cleanup', 'concrete odour removal', 'pet urine remediation', 'realistic expectations restoration', 'Brisbane biohazard cleaning'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/biohazard-concrete-decontamination-thumb.webp'
    }
  },

  // Image 8: Bathroom leak structural mould
  bathroomLeakStructuralMould: {
    src: '/images/case-studies/bathroom-leak-structural-mould-timber-assessment-brisbane.webp',
    alt: 'Bathroom shower leak causing structural mould on timber framing requiring fitness for purpose assessment not just cosmetic cleaning Brisbane',
    title: 'Structural Mould Assessment - When Cosmetic Cleaning Isn\'t Enough',
    width: 1920,
    height: 2560,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Long-term shower leak revealing extensive mould on structural timber. Expert assessment determines if timber is "fit for purpose" beyond visible mould. Structural integrity matters more than cosmetic appearance.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Bathroom Leak Structural Mould Assessment Brisbane',
      description: 'Professional structural assessment of mould-affected timber framing from bathroom shower leak. Shows importance of evaluating timber fitness for purpose versus cosmetic mould removal. Demonstrates expertise in structural integrity assessment beyond surface cleaning.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/bathroom-leak-structural-mould-timber-assessment-brisbane.webp',
      keywords: ['structural mould assessment', 'bathroom leak damage', 'timber fitness evaluation', 'shower leak mould', 'structural integrity testing', 'Brisbane mould inspection'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/bathroom-leak-structural-mould-thumb.webp'
    }
  },

  // Image 9: Extensive subfloor mould contamination
  subfloorMouldContamination: {
    src: '/images/case-studies/subfloor-mould-contamination-brisbane-property-assessment.webp',
    alt: 'Extensive subfloor mould contamination requiring comprehensive scope assessment for insurance claims and remediation planning Brisbane',
    title: 'Subfloor Mould Contamination - Hidden Damage Assessment',
    width: 1920,
    height: 1440,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Extensive subfloor mould contamination often missed in standard inspections. Professional assessment reveals true scope for accurate insurance claims and proper remediation planning.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Subfloor Mould Contamination Brisbane Assessment',
      description: 'Comprehensive subfloor mould assessment revealing extensive contamination requiring professional scope documentation for insurance claims. Demonstrates expertise in identifying hidden damage that standard inspections miss.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/subfloor-mould-contamination-brisbane-property-assessment.webp',
      keywords: ['subfloor mould contamination', 'hidden damage assessment', 'insurance claim documentation', 'Brisbane property inspection', 'comprehensive mould scope', 'under house mould'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/subfloor-mould-contamination-thumb.webp'
    }
  },

  // Image 10: Mould affected contents assessment
  mouldAffectedContents: {
    src: '/images/case-studies/mould-affected-contents-assessment-disposal-restoration-brisbane.webp',
    alt: 'Professional assessment of mould affected contents determining what can be restored versus disposal requirements for insurance claims Brisbane',
    title: 'Contents Assessment - Restore vs Replace Decision Making',
    width: 1920,
    height: 1440,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Expert contents assessment determining restoration potential versus disposal requirements. Critical for accurate insurance claims and avoiding unnecessary replacement costs.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Mould Affected Contents Assessment Brisbane',
      description: 'Professional contents assessment for mould-affected items showing expertise in determining restoration viability versus disposal requirements. Essential for accurate insurance claims and cost-effective remediation strategies.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/mould-affected-contents-assessment-disposal-restoration-brisbane.webp',
      keywords: ['mould contents assessment', 'restore versus replace', 'insurance contents claim', 'mould affected belongings', 'Brisbane contents inspection', 'disposal requirements'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/mould-affected-contents-thumb.webp'
    }
  },

  // Image 11: Storm water entry comprehensive assessment
  stormWaterComprehensiveAssessment: {
    src: '/images/case-studies/storm-water-entry-comprehensive-carpet-assessment-brisbane.webp',
    alt: 'Storm water entry assessment showing water line on wool carpet requiring comprehensive claims strategy for 180sqm replacement across connected areas Brisbane',
    title: 'Strategic Claims Assessment - When Small Damage Justifies Large Replacement',
    width: 1920,
    height: 1440,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Storm water entry via concrete patio showing water line on 100% wool carpet. Expert assessment identified previous water damage, 180sqm connected carpet area, and multiple policies with same insurer - securing full carpet replacement for entire connected area despite limited visible damage.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Storm Water Entry Comprehensive Assessment Brisbane',
      description: 'Professional claims consulting showing how understanding history, external factors, and insurance policy details transforms small visible damage into justified large-scale replacement. Demonstrates expertise beyond simple damage assessment to strategic claims maximization.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/storm-water-entry-comprehensive-carpet-assessment-brisbane.webp',
      keywords: ['storm water damage assessment', 'wool carpet water damage', 'comprehensive claims strategy', 'insurance policy leverage', 'Brisbane water damage consulting', 'strategic replacement justification'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/storm-water-entry-thumb.webp'
    }
  },

  // Image 12: Hidden fridge ice maker leak
  hiddenFridgeIceMakerLeak: {
    src: '/images/case-studies/hidden-fridge-ice-maker-leak-mould-kitchen-brisbane.webp',
    alt: 'Hidden mould damage behind refrigerator from ice maker leak discovered through thermal imaging and moisture testing revealing extensive contamination Brisbane',
    title: 'Hidden Ice Maker Leak - When Only the Smell Gives It Away',
    width: 1920,
    height: 2560,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    caption: 'Hidden ice maker leak discovered after client reported damp smell. Thermal imaging and moisture meters revealed extensive mould behind fridge. Kitchen kickboard damage was the only visible clue to months of concealed water damage.',
    metadata: {
      '@type': 'ImageObject',
      name: 'Hidden Fridge Ice Maker Leak Mould Brisbane',
      description: 'Professional inspection using thermal cameras and moisture meters uncovered extensive hidden mould from slow ice maker leak. Shows importance of investigating odours and using proper diagnostic tools beyond visual inspection.',
      contentUrl: 'https://dr-new-ten.vercel.app/images/case-studies/hidden-fridge-ice-maker-leak-mould-kitchen-brisbane.webp',
      keywords: ['hidden ice maker leak', 'fridge water damage', 'thermal imaging inspection', 'kitchen mould damage', 'concealed water leak Brisbane', 'moisture detection expertise'],
      datePublished: new Date().toISOString(),
      copyrightHolder: 'Disaster Recovery Claims Consulting',
      acquireLicensePage: 'https://dr-new-ten.vercel.app/contact',
      thumbnailUrl: 'https://dr-new-ten.vercel.app/images/case-studies/hidden-fridge-leak-thumb.webp'
    }
  }
};

// Component to render image with full SEO markup
export function CaseStudyImage({ imageKey }: { imageKey: keyof typeof siteImages }) {
  const image = siteImages[imageKey];

  return (
    <>
      <OptimizedImage {...image} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(image.metadata)
        }}
      />
    </>
  );
}