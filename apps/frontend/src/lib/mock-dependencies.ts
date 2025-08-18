// Mock implementations for missing dependencies

// Mock for class-variance-authority
export function cva(base: string, config?: any) {
  return function(options: Record<string, any> = {}) {
    if (!options || !config || !config.variants) return base;
    
    const { className, variant, size, ...rest } = options;
    let classes = [base];
    
    if (variant && config.variants.variant && config.variants.variant[variant]) {
      classes.push(config.variants.variant[variant]);
    }
    
    if (size && config.variants.size && config.variants.size[size]) {
      classes.push(config.variants.size[size]);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };
}

export type VariantProps<T> = Record<string, any>;

// Mock for clsx
export function clsx(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

// Mock for tailwind-merge
export function twMerge(...inputs: string[]) {
  // Filter out falsy values and split classes
  const allClasses = inputs
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .filter(Boolean);
  
  // Remove duplicates while preserving order
  const uniqueClasses = [...new Set(allClasses)];
  
  return uniqueClasses.join(' ');
}

// Mock for radix-ui/react-slot
export const Slot = 'div';
