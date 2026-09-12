import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  withArrow = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: 'py-2 px-5 text-xs tracking-wider',
    md: 'py-2.5 px-7 text-sm tracking-widest',
    lg: 'py-3.5 px-9 text-base tracking-widest',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#9333ea] via-[#c084fc] to-[#fed7aa] text-[#160624] font-bold shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_25px_rgba(244,114,182,0.6),0_0_40px_rgba(192,132,252,0.4)] hover:opacity-95',
    secondary:
      'bg-purple-900/40 text-purple-100 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-800/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    outline:
      'bg-transparent text-purple-200 border border-purple-400/50 hover:border-purple-300 hover:text-white hover:bg-purple-900/20 shadow-[0_0_10px_rgba(192,132,252,0.2)]',
    ghost: 'bg-transparent text-purple-200 hover:text-white hover:bg-white/5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {withArrow && <ArrowRight className="w-4 h-4 ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" />}
        </>
      )}
    </button>
  );
};
