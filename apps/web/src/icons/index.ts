/**
 * NRPG Icon System
 *
 * Unified export for all icons - both custom disaster recovery icons
 * and selected Lucide React icons for standard UI elements
 *
 * Custom Icons (10 total):
 * - Service Icons: WaterDamage, FireSmoke, MouldRemediation, BioForensic
 * - Trust Icons: IICRCBadge, VerifiedBadge
 * - Emergency Icons: EmergencyAlert, PhoneCall, ChatMessage
 * - Calendar Icons: ScheduleCalendar
 *
 * Lucide Icons (generic UI only):
 * - Navigation: ChevronDown, ChevronUp, Menu, X
 * - Forms: Search, Check
 * - Status: AlertCircle, Loader2, CheckCircle
 * - Actions: ArrowRight, ArrowLeft
 * - Communication: Mail, Phone, MessageSquare, Calendar
 */

// Export custom icon system
export { Icon } from './lib/Icon';
export type { IconProps } from './lib/Icon';

// Export custom service icons
export { WaterDamage, FireSmoke, MouldRemediation, BioForensic } from './custom/services';

// Export custom trust badges
export { IICRCBadge, VerifiedBadge } from './custom/trust';

// Export custom emergency icons
export { EmergencyAlert, PhoneCall, ChatMessage } from './custom/emergency';

// Export custom calendar icons
export { ScheduleCalendar } from './custom/calendar';

// Export icon type definitions and utilities
export {
  type ServiceIcon,
  type TrustIcon,
  type EmergencyIcon,
  type CalendarIcon,
  type CustomIconName,
  type IconName,
  type IconSizeVariant,
  type IconGradientVariant,
  type IconCategory,
  type IconMetadata,
  customIconRegistry,
  getIconMetadata,
  getIconsByCategory,
  searchIcons,
  ICON_SIZES,
  ICON_GRADIENTS,
} from './lib/icon-registry';

// Keep Lucide React icons we need for generic UI
// These are NOT re-exported here - import directly from 'lucide-react' when needed:
// import { ChevronDown, Menu, X, Search, AlertCircle } from 'lucide-react'
//
// This is intentional - it prevents bundling unused icons while maintaining
// clear separation between custom and generic icons
