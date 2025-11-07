// Component-specific type definitions
import { ReactNode } from 'react';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

export interface LinkProps extends BaseComponentProps {
  href: string;
  target?: '_blank' | '_self';
  rel?: string;
  external?: boolean;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  container?: boolean;
  background?: 'white' | 'gray' | 'blue' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  external?: boolean;
  badge?: string;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
  retry?: () => void;
}

// Form Component Props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// Modal/Dialog Props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

// Alert/Toast Props
export interface AlertProps extends BaseComponentProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
}

// Accordion Props
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps extends BaseComponentProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
}

// Tab Props
export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends BaseComponentProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

// Card Component Props
export interface CardHeaderProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export interface CardBodyProps extends BaseComponentProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardFooterProps extends BaseComponentProps {
  justify?: 'start' | 'center' | 'end' | 'between';
}
