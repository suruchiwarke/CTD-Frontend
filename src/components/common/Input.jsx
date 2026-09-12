import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  icon,
  error,
  isPassword = false,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs uppercase font-medium tracking-wider text-purple-200/90 pl-1"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3.5 flex items-center justify-center text-purple-300/70 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={effectiveType}
          className={`w-full py-2.5 sm:py-3 bg-[#1e102d]/60 border border-purple-400/30 rounded-xl text-white placeholder-purple-300/40 text-sm sm:text-base backdrop-blur-md transition-all duration-200 focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-400/50 focus:bg-[#28143c]/80 ${
            icon ? 'pl-11' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'} ${
            error ? 'border-red-400/80 focus:border-red-400' : ''
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-purple-300/60 hover:text-purple-200 transition-colors focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && <span className="text-xs text-red-400 pl-1">{error}</span>}
    </div>
  );
};
