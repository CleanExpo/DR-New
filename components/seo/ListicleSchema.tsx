'use client';

import Script from 'next/script';

interface ListicleSchemaProps {
  title: string;
  description: string;
  items: {
    position: number;
    name: string;
    description: string;
    url?: string;
  }[];
  author?: string;
  datePublished?: string;
  image?: string;
}

export function ListicleSchema({
  title,
  description,
  items,
  author = 'Disaster Recovery Claims Consulting',
  datePublished = new Date().toISOString(),
  image = '/images/listicles/default.webp'
}: ListicleSchemaProps) {

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": description,
    "numberOfItems": items.length,
    "itemListElement": items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "description": item.description,
      "url": item.url || `#item-${item.position}`
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://disaster-recovery-seven.vercel.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Disaster Recovery Claims Consulting",
      "logo": {
        "@type": "ImageObject",
        "url": "https://disaster-recovery-seven.vercel.app/logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== 'undefined' ? window.location.href : ''
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "image": image,
    "totalTime": "PT10M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "AUD",
      "value": "0"
    },
    "step": items.map(item => ({
      "@type": "HowToStep",
      "name": item.name,
      "text": item.description,
      "url": item.url || `#step-${item.position}`
    }))
  };

  // Featured Snippet optimisation
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.slice(0, 5).map(item => ({
      "@type": "Question",
      "name": `What is ${item.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.description
      }
    }))
  };

  return (
    <>
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

// Pre-configured schemas for our top listicles
export const listicleData = {
  insuranceMistakes: {
    title: "Top 10 Insurance Claim Mistakes That Cost Brisbane Homeowners $1000s",
    description: "Avoid costly insurance claim mistakes that deny coverage",
    items: [
      {
        position: 1,
        name: "Not documenting damage immediately",
        description: "Costs 40% of claim value. Document everything within 2 hours with photos, videos, and detailed inventory."
      },
      {
        position: 2,
        name: "Accepting first offer",
        description: "Average 75% below entitlement. First offers are always low. Get independent assessment."
      },
      {
        position: 3,
        name: "Using wrong terminology",
        description: "Instant denial trigger. Say 'storm water' not 'flood', 'sudden discovery' not 'gradual damage'."
      },
      {
        position: 4,
        name: "Waiting too long to claim",
        description: "48-hour critical window. Notify within 24 hours, prevent damage within 48 hours."
      },
      {
        position: 5,
        name: "DIY repairs before assessment",
        description: "Voids coverage completely. Only emergency tarps and safety measures allowed."
      },
      {
        position: 6,
        name: "Not getting expert assessment",
        description: "Loses 10-50x ROI. Expert assessment averages $180,000 more than insurance assessment."
      },
      {
        position: 7,
        name: "Poor contractor selection",
        description: "Doubles costs. Verify QBCC license, insurance, references, and get fixed quotes."
      },
      {
        position: 8,
        name: "Missing hidden damage",
        description: "80% damage is below floors. Requires thermal imaging and moisture meters."
      },
      {
        position: 9,
        name: "Inadequate temporary repairs",
        description: "Damage escalates 400%. Professional drying and antimicrobial treatment essential."
      },
      {
        position: 10,
        name: "Not understanding policy exclusions",
        description: "Causes 35% of denials. Know gradual damage, maintenance, and flood definitions."
      }
    ]
  },
  hiddenWaterDamage: {
    title: "Top 10 Hidden Water Damage Signs Every Brisbane Homeowner Misses",
    description: "Early detection saves $50,000 average in water damage repairs",
    items: [
      {
        position: 1,
        name: "Electricity bill suddenly increases",
        description: "20-40% spike indicates hidden moisture making AC work harder."
      },
      {
        position: 2,
        name: "Ants appearing in random places",
        description: "Ants follow moisture trails to find leaks before you do."
      },
      {
        position: 3,
        name: "Paint bubbling in different room",
        description: "Water travels 10m horizontally through walls before showing."
      },
      {
        position: 4,
        name: "Doors starting to stick",
        description: "Wood absorbs moisture and expands before visible damage."
      },
      {
        position: 5,
        name: "Old house smell",
        description: "Not age but active mould. No house should smell old."
      },
      {
        position: 6,
        name: "Insects dying in one area",
        description: "Dead insects indicate toxic mould levels requiring evacuation."
      },
      {
        position: 7,
        name: "WiFi signal weakening in spots",
        description: "Water absorbs radio frequencies creating dead zones."
      },
      {
        position: 8,
        name: "Windows fogging sometimes",
        description: "Random fogging indicates hidden moisture and temperature differentials."
      },
      {
        position: 9,
        name: "Nail pops in random patterns",
        description: "Wood movement from moisture changes causes nail pops."
      },
      {
        position: 10,
        name: "Pets avoiding certain areas",
        description: "Animals detect mould and structural issues humans can't sense."
      }
    ]
  },
  suburbDenials: {
    title: "Top 10 Brisbane Suburbs Where Insurance Claims Get Denied Most",
    description: "Milton 67%, West End 61% denial rates. Learn why and how to fight back.",
    items: [
      {
        position: 1,
        name: "Milton - 67% denial rate",
        description: "Known risk excuse. Document storm drain failure before river rise."
      },
      {
        position: 2,
        name: "West End - 61% denial rate",
        description: "Gentrification penalty. Challenge maintenance assumptions with heritage defence."
      },
      {
        position: 3,
        name: "Rocklea - 58% denial rate",
        description: "Industrial excuse. Separate residential from industrial contamination."
      },
      {
        position: 4,
        name: "Newstead - 54% denial rate",
        description: "Luxury problem. Document specifications and challenge betterment claims."
      },
      {
        position: 5,
        name: "Goodna - 52% denial rate",
        description: "Socioeconomic bias. Use community action and legal aid assistance."
      },
      {
        position: 6,
        name: "Fairfield - 49% denial rate",
        description: "Creek confusion. Prove storm water arrived first with timestamps."
      },
      {
        position: 7,
        name: "Yeronga - 47% denial rate",
        description: "Repeated flooding trap. Keep all repair records between events."
      },
      {
        position: 8,
        name: "Bulimba - 45% denial rate",
        description: "Riverside premium problem. Use premium payment history as leverage."
      },
      {
        position: 9,
        name: "St Lucia - 43% denial rate",
        description: "University complication. Document occupancy and inspection schedules."
      },
      {
        position: 10,
        name: "Toowong - 41% denial rate",
        description: "Elevation assumption. Prove creek flooding with hydrology reports."
      }
    ]
  }
};