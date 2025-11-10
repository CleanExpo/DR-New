/*
 * DISASTER RECOVERY BRISBANE - UI COMPONENT LIBRARY
 * Centralized exports for all UI components
 */

// Buttons
export { Button, buttonVariants, type ButtonProps } from './button'
export { Button as ButtonEnhanced } from './button-enhanced'

// Cards
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card'

export {
  Card as CardEnhanced,
  CardHeader as CardHeaderEnhanced,
  CardFooter as CardFooterEnhanced,
  CardTitle as CardTitleEnhanced,
  CardDescription as CardDescriptionEnhanced,
  CardContent as CardContentEnhanced,
  ServiceCard,
  StatsCard,
} from './card-enhanced'

// Forms
export {
  Form,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormSuccess,
  FormError,
  FormSubmit,
} from './form'

// Modals
export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ConfirmationModal,
} from './modal'

// Toasts
export {
  ToastProvider,
  useToast,
  toast,
  type Toast,
  type ToastVariant,
} from './toast'

// Loading States
export {
  Spinner,
  LoadingOverlay,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonGrid,
  ProgressBar,
  CircularProgress,
  DotsLoader,
  PulseLoader,
} from './loading-states'

// Empty States
export {
  EmptyState,
  NoResults,
  NotFound,
  ErrorState,
  NoConnection,
  EmptyInbox,
  ImageError,
  PermissionDenied,
  UnderConstruction,
  InlineEmptyState,
} from './empty-states'

// Existing shadcn components
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'
export { Alert, AlertTitle, AlertDescription } from './alert'
export { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator } from './breadcrumbs'
export { Checkbox } from './checkbox'
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'
export { Input } from './input'
export { Progress } from './progress'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
