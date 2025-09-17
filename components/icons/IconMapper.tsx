import React from 'react';
import {
  Flame,
  Zap,
  Droplets,
  Trophy,
  Phone,
  Check,
  CheckCircle,
  AlertCircle,
  Star,
  Target,
  Home,
  DollarSign,
  Lock,
  Shield,
  BarChart,
  Users,
  AlertTriangle,
  Sparkles,
  Waves,
  Clock,
  Bell,
  Heart,
  Award,
  MapPin,
  ThumbsUp,
  TrendingUp,
  Wrench,
  ShieldCheck,
  PhoneCall,
  Building,
  Truck,
  Calendar,
  FileCheck,
  HelpCircle,
  Info,
  Settings,
  type LucideIcon
} from 'lucide-react';

// Mapping of emojis to their corresponding Lucide icons
export const emojiToIcon: Record<string, LucideIcon> = {
  '🔥': Flame,
  '⚡': Zap,
  '💧': Droplets,
  '🏆': Trophy,
  '📞': Phone,
  '✓': Check,
  '✅': CheckCircle,
  '🚨': AlertCircle,
  '⭐': Star,
  '🎯': Target,
  '🏠': Home,
  '💰': DollarSign,
  '🔒': Lock,
  '🛡️': Shield,
  '📊': BarChart,
  '👥': Users,
  '⚠️': AlertTriangle,
  '✨': Sparkles,
  '🌊': Waves,
  '⏰': Clock,
  '🔔': Bell,
  '❤️': Heart,
  '🥇': Award,
  '📍': MapPin,
  '👍': ThumbsUp,
  '📈': TrendingUp,
  '🔧': Wrench,
  '🛡': ShieldCheck,
  '☎️': PhoneCall,
  '🏢': Building,
  '🚚': Truck,
  '📅': Calendar,
  '📋': FileCheck,
  '❓': HelpCircle,
  'ℹ️': Info,
  '⚙️': Settings,
};

interface IconProps {
  emoji?: string;
  icon?: LucideIcon;
  className?: string;
  size?: number;
  color?: string;
  'aria-label'?: string;
}

/**
 * Accessible icon component that replaces emojis with proper SVG icons
 * Includes proper ARIA labels for screen readers
 */
export const Icon: React.FC<IconProps> = ({
  emoji,
  icon,
  className = '',
  size = 20,
  color,
  'aria-label': ariaLabel
}) => {
  const IconComponent = icon || (emoji ? emojiToIcon[emoji] : null);

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      className={className}
      size={size}
      color={color}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    />
  );
};

/**
 * Utility function to replace emoji text with accessible icons
 */
export const replaceEmojisWithIcons = (
  text: string,
  iconClass?: string
): React.ReactNode[] => {
  const emojiRegex = /([🔥⚡💧🏆📞✓✅🚨⭐🎯🏠💰🔒🛡️📊👥⚠️✨🌊⏰🔔❤️🥇📍👍📈🔧🛡☎️🏢🚚📅📋❓ℹ️⚙️])/g;

  const parts = text.split(emojiRegex);

  return parts.map((part, index) => {
    if (emojiToIcon[part]) {
      return (
        <Icon
          key={index}
          emoji={part}
          className={iconClass}
          aria-label={getAriaLabelForEmoji(part)}
        />
      );
    }
    return part;
  });
};

/**
 * Get appropriate ARIA label for emoji
 */
function getAriaLabelForEmoji(emoji: string): string {
  const labels: Record<string, string> = {
    '🔥': 'fire',
    '⚡': 'lightning',
    '💧': 'water droplet',
    '🏆': 'trophy',
    '📞': 'phone',
    '✓': 'check mark',
    '✅': 'checked',
    '🚨': 'emergency alert',
    '⭐': 'star',
    '🎯': 'target',
    '🏠': 'home',
    '💰': 'money',
    '🔒': 'lock',
    '🛡️': 'shield',
    '📊': 'chart',
    '👥': 'users',
    '⚠️': 'warning',
    '✨': 'sparkles',
    '🌊': 'waves',
    '⏰': 'clock',
    '🔔': 'bell',
    '❤️': 'heart',
    '🥇': 'first place',
    '📍': 'location',
    '👍': 'thumbs up',
    '📈': 'trending up',
    '🔧': 'wrench',
    '🛡': 'shield check',
    '☎️': 'phone call',
    '🏢': 'building',
    '🚚': 'truck',
    '📅': 'calendar',
    '📋': 'clipboard',
    '❓': 'question',
    'ℹ️': 'information',
    '⚙️': 'settings',
  };

  return labels[emoji] || 'icon';
}

export default Icon;