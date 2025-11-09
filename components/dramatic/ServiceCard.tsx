import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface ServiceCardProps {
  /** Card icon component */
  icon: ReactNode;
  /** Icon color - matches landing page pattern */
  iconColor?: 'blue' | 'red' | 'green' | 'cyan' | 'orange' | 'purple';
  /** Service title */
  title: string;
  /** Service description */
  description: string;
  /** Features/benefits list */
  features?: string[];
  /** Link to service page */
  link: string;
  /** Link text */
  linkText?: string;
  /** Border accent color */
  borderColor?: 'blue' | 'red' | 'green' | 'cyan' | 'orange' | 'purple';
}

const iconColorClasses = {
  blue: 'text-blue-600',
  red: 'text-red-600',
  green: 'text-green-600',
  cyan: 'text-cyan-600',
  orange: 'text-orange-600',
  purple: 'text-purple-600',
};

const borderColorClasses = {
  blue: 'border-blue-500 hover:border-blue-600',
  red: 'border-red-500 hover:border-red-600',
  green: 'border-green-500 hover:border-green-600',
  cyan: 'border-cyan-500 hover:border-cyan-600',
  orange: 'border-orange-500 hover:border-orange-600',
  purple: 'border-purple-500 hover:border-purple-600',
};

const linkColorClasses = {
  blue: 'text-blue-600 hover:text-blue-700',
  red: 'text-red-600 hover:text-red-700',
  green: 'text-green-600 hover:text-green-700',
  cyan: 'text-cyan-600 hover:text-cyan-700',
  orange: 'text-orange-600 hover:text-orange-700',
  purple: 'text-purple-600 hover:text-purple-700',
};

/**
 * ServiceCard - Consistent service card design matching landing page
 *
 * Features:
 * - Hover effects with border color transition
 * - Icon with customizable color
 * - Feature list with checkmarks
 * - Animated arrow link
 * - Shadow effects on hover
 *
 * @example
 * ```tsx
 * <ServiceCard
 *   icon={<Droplets className="w-16 h-16" />}
 *   iconColor="blue"
 *   title="Water Damage Restoration Brisbane"
 *   description="Emergency water extraction 24/7. Burst pipes, floods, storm damage."
 *   features={[
 *     "60-min response",
 *     "Insurance approved",
 *     "IICRC Master certified"
 *   ]}
 *   link="/emergency/water-damage-brisbane"
 *   linkText="Emergency Service"
 *   borderColor="blue"
 * />
 * ```
 */
export function ServiceCard({
  icon,
  iconColor = 'blue',
  title,
  description,
  features = [],
  link,
  linkText = 'Learn More',
  borderColor = 'blue',
}: ServiceCardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 border-2 border-transparent ${borderColorClasses[borderColor]}`}
    >
      {/* Icon */}
      <div className={`${iconColorClasses[iconColor]} mb-4`}>{icon}</div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Features List */}
      {features.length > 0 && (
        <div className="mb-4 text-sm text-gray-700 space-y-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className={iconColorClasses[iconColor]}>✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      )}

      {/* Link */}
      <Link href={link} className={`${linkColorClasses[borderColor]} font-bold inline-flex items-center group`}>
        {linkText}{' '}
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

interface ServiceCardGridProps {
  /** Array of service cards */
  children: ReactNode;
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
}

/**
 * ServiceCardGrid - Grid container for service cards
 *
 * @example
 * ```tsx
 * <ServiceCardGrid columns={3}>
 *   <ServiceCard {...props1} />
 *   <ServiceCard {...props2} />
 *   <ServiceCard {...props3} />
 * </ServiceCardGrid>
 * ```
 */
export function ServiceCardGrid({ children, columns = 3 }: ServiceCardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>{children}</div>;
}
