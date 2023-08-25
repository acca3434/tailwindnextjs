import React from 'react';
import { cn } from "@/app/lib/utils"

const ButtonVariant = {
  primary: {
    base: [
      'bg-primary-500 text-black',
      'border-primary-600 border',
      'hover:bg-primary-600 hover:text-sky-400',
      'active:bg-primary-700',
      'disabled:bg-primary-700',
    ],
    sm: [
      'bg-primary-500 text-black',
      'border-primary-600 border',
      'hover:bg-primary-600 hover:text-sky-400',
      'active:bg-primary-700',
      'disabled:bg-primary-700',
    ],
  },
  outline: {
    base: [
      'text-primary-500',
      'border-primary-500 border',
      'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
    ],
    sm: [
      'text-primary-500',
      'border-primary-500 border',
      'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
    ],
  },
  ghost: {
    base: [
      'text-primary-500',
      'shadow-none',
      'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
    ],
    sm: [
      'text-primary-500',
      'shadow-none',
      'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
    ],
  },
  light: {
    base: [
      'bg-white text-gray-700',
      'border border-gray-300',
      'hover:text-dark hover:bg-gray-100',
      'active:bg-white/80 disabled:bg-gray-200',
    ],
    sm: [
      'bg-white text-gray-700',
      'border border-gray-300',
      'hover:text-dark hover:bg-gray-100',
      'active:bg-white/80 disabled:bg-gray-200',
    ],
  },
  dark: {
    base: [
      'bg-gray-900 text-white',
      'border border-gray-600',
      'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
    ],
    sm: [
      'bg-gray-900 text-white',
      'border border-gray-600',
      'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
    ],
  },
};

const ButtonSize = {
  base: ['px-4 py-2', 'text-sm md:text-base'],
  sm: ['px-2 py-1', 'text-xs md:text-sm'],
};

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  disabled?: boolean;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'base',
      isDarkBg = false,
    },
    ref
  ) => {
    return (
      <div className="relative overflow-auto rounded-xl p-8">
        <div className="flex items-center justify-center">
          <span className="relative inline-flex">
            <button
              ref={ref}
              type="button"
              className={cn(
                'inline-flex items-center rounded-md text-sm font-semibold leading-6 text-sky-500 shadow ring-1 ring-slate-900/10 transition duration-150 ease-in-out',
                ButtonSize[size],
                ...ButtonVariant[variant][size], // Use spread operator to include the classes
                isDarkBg && ['hover:bg-gray-900', 'active:bg-gray-800', 'disabled:bg-gray-800'], // Add isDarkBg classes here
              )}
              // disabled={disabled}
            >
              Transactions
            </button>
            <span className="absolute right-[-5%] top-[-10%] -mr-1 -mt-1 flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full animate-bounce rounded-full bg-sky-400"></span>
            </span>
          </span>
        </div>
      </div>
    );
  }
);

export default Button;