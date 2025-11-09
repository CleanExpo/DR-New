'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

/* ===== FORM CONTEXT ===== */
interface FormContextValue {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
}

const FormContext = React.createContext<FormContextValue | null>(null);

const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within Form');
  }
  return context;
};

/* ===== FORM ROOT ===== */
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  initialValues?: Record<string, any>;
  validate?: (values: Record<string, any>) => Record<string, string>;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, initialValues = {}, validate, children, ...props }, ref) => {
    const [values, setValues] = React.useState(initialValues);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const setFieldValue = React.useCallback((name: string, value: any) => {
      setValues(prev => ({ ...prev, [name]: value }));
      setTouched(prev => ({ ...prev, [name]: true }));
    }, []);

    const setFieldTouched = React.useCallback((name: string, touched: boolean) => {
      setTouched(prev => ({ ...prev, [name]: touched }));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
          // Mark all fields as touched to show errors
          const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {} as Record<string, boolean>);
          setTouched(allTouched);
          return;
        }
      }

      // Submit
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <FormContext.Provider
        value={{
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }}
      >
        <form
          ref={ref}
          className={cn('space-y-6', className)}
          onSubmit={handleSubmit}
          noValidate
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);
Form.displayName = 'Form';

/* ===== FORM FIELD ===== */
interface FormFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactElement;
}

export const FormField = ({ name, label, description, required, children }: FormFieldProps) => {
  const { errors, touched } = useFormContext();
  const hasError = touched[name] && errors[name];
  const fieldId = `field-${name}`;
  const errorId = `error-${name}`;
  const descriptionId = `description-${name}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={fieldId}
        className="block text-sm font-semibold text-neutral-900"
      >
        {label}
        {required && (
          <span className="ml-1 text-emergency-600" aria-label="required">
            *
          </span>
        )}
      </label>

      {description && (
        <p
          id={descriptionId}
          className="text-sm text-neutral-600"
        >
          {description}
        </p>
      )}

      {React.cloneElement(children, {
        id: fieldId,
        name,
        'aria-invalid': hasError ? 'true' : 'false',
        'aria-describedby': cn(
          description && descriptionId,
          hasError && errorId
        ),
        'aria-required': required ? 'true' : 'false',
      })}

      {hasError && (
        <div
          id={errorId}
          className="flex items-start gap-2 text-sm text-emergency-700 animate-in slide-in-from-top-1 duration-200"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );
};

/* ===== FORM INPUT ===== */
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, name, onChange, onBlur, ...props }, ref) => {
    const { setFieldValue, setFieldTouched, errors, touched } = useFormContext();
    const hasError = name && touched[name] && errors[name];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (name) {
        setFieldValue(name, e.target.value);
      }
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (name) {
        setFieldTouched(name, true);
      }
      onBlur?.(e);
    };

    return (
      <input
        ref={ref}
        name={name}
        className={cn(
          'flex h-12 w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-colors',
          'placeholder:text-neutral-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          hasError
            ? 'border-emergency-600 focus-visible:ring-emergency-600'
            : 'border-neutral-300 hover:border-neutral-400 focus-visible:border-primary-600',
          className
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);
FormInput.displayName = 'FormInput';

/* ===== FORM TEXTAREA ===== */
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, name, onChange, onBlur, ...props }, ref) => {
    const { setFieldValue, setFieldTouched, errors, touched } = useFormContext();
    const hasError = name && touched[name] && errors[name];

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (name) {
        setFieldValue(name, e.target.value);
      }
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (name) {
        setFieldTouched(name, true);
      }
      onBlur?.(e);
    };

    return (
      <textarea
        ref={ref}
        name={name}
        className={cn(
          'flex min-h-[120px] w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-colors',
          'placeholder:text-neutral-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-vertical',
          hasError
            ? 'border-emergency-600 focus-visible:ring-emergency-600'
            : 'border-neutral-300 hover:border-neutral-400 focus-visible:border-primary-600',
          className
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);
FormTextarea.displayName = 'FormTextarea';

/* ===== FORM SELECT ===== */
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ label: string; value: string }>;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, name, onChange, onBlur, options, ...props }, ref) => {
    const { setFieldValue, setFieldTouched, errors, touched } = useFormContext();
    const hasError = name && touched[name] && errors[name];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (name) {
        setFieldValue(name, e.target.value);
      }
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      if (name) {
        setFieldTouched(name, true);
      }
      onBlur?.(e);
    };

    return (
      <select
        ref={ref}
        name={name}
        className={cn(
          'flex h-12 w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          hasError
            ? 'border-emergency-600 focus-visible:ring-emergency-600'
            : 'border-neutral-300 hover:border-neutral-400 focus-visible:border-primary-600',
          className
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);
FormSelect.displayName = 'FormSelect';

/* ===== FORM CHECKBOX ===== */
interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ className, name, label, onChange, onBlur, ...props }, ref) => {
    const { setFieldValue, setFieldTouched } = useFormContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (name) {
        setFieldValue(name, e.target.checked);
      }
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (name) {
        setFieldTouched(name, true);
      }
      onBlur?.(e);
    };

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          name={name}
          className={cn(
            'w-5 h-5 mt-0.5 rounded border-2 border-neutral-300 text-primary-600',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors cursor-pointer',
            className
          )}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-neutral-900 cursor-pointer select-none"
        >
          {label}
        </label>
      </div>
    );
  }
);
FormCheckbox.displayName = 'FormCheckbox';

/* ===== FORM SUCCESS MESSAGE ===== */
interface FormSuccessProps {
  children: React.ReactNode;
}

export const FormSuccess = ({ children }: FormSuccessProps) => {
  return (
    <div
      className="flex items-start gap-3 rounded-lg bg-success-50 border-2 border-success-600 p-4 text-success-800 animate-in slide-in-from-top-2 duration-300"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-success-600" aria-hidden="true" />
      <div className="text-sm font-medium">{children}</div>
    </div>
  );
};

/* ===== FORM ERROR MESSAGE ===== */
interface FormErrorProps {
  children: React.ReactNode;
}

export const FormError = ({ children }: FormErrorProps) => {
  return (
    <div
      className="flex items-start gap-3 rounded-lg bg-emergency-50 border-2 border-emergency-600 p-4 text-emergency-800 animate-in slide-in-from-top-2 duration-300"
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-emergency-600" aria-hidden="true" />
      <div className="text-sm font-medium">{children}</div>
    </div>
  );
};

/* ===== FORM SUBMIT BUTTON ===== */
interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText?: string;
}

export const FormSubmit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ children, loadingText = 'Submitting...', className, ...props }, ref) => {
    const { isSubmitting } = useFormContext();

    return (
      <button
        ref={ref}
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg',
          'bg-primary-600 text-white font-semibold text-base',
          'hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-lg',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
          'transition-all duration-200',
          'shadow-md shadow-primary-500/30',
          className
        )}
        {...props}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
FormSubmit.displayName = 'FormSubmit';
