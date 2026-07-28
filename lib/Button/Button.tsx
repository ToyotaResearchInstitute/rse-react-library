import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The color of the button.
   */
  color?: 'primary' | 'success' | 'info' | 'warning' | 'error';

  /**
   * The size of the button.
   */
  size?: 'small' | 'medium' | 'large';
}

const variants = {
  base: 'tri-text-white tri-rounded-md tri-transition-colors tri-duration-200 focus-visible:tri-ring-2 focus-visible:tri-ring-offset-2 focus-visible:tri-ring-indigo-500 disabled:tri-opacity-50 disabled:tri-pointer-event-none',
  primary: 'tri-bg-indigo-500 hover:tri-bg-indigo-500/90',
  success: 'tri-bg-green-500 hover:tri-bg-green-500/90',
  info: 'tri-bg-blue-500 hover:tri-bg-blue-500/90',
  warning: 'tri-bg-amber-500 hover:tri-bg-amber-500/90',
  error: 'tri-bg-red-500 hover:tri-bg-red-500/90',
  small: 'tri-px-2.5 tri-py-1.5 tri-text-xs',
  medium: 'tri-px-3.5 tri-py-2 tri-text-sm',
  large: 'tri-px-4 tri-py-2 tri-text-base',
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = 'primary', size = 'medium', className, ...rest }, ref) => (
    <button
      ref={ref}
      className={twMerge(clsx(variants.base, variants[color], variants[size], className))}
      {...rest}
    />
  ),
);

Button.displayName = 'Button';
