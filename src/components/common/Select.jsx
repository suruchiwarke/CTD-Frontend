import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  label,
  icon,
  options = [],
  placeholder = 'Select an option',
  error,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
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

        <select
          id={selectId}
          className={`w-full py-2.5 sm:py-3 bg-[#1e102d]/60 border border-purple-400/30 rounded-xl text-white appearance-none backdrop-blur-md transition-all duration-200 focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-400/50 focus:bg-[#28143c]/80 cursor-pointer ${
            icon ? 'pl-11' : 'pl-4'
          } pr-11 ${error ? 'border-red-400/80 focus:border-red-400' : ''} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#1a0826] text-gray-400">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#1a0826] text-white">
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3.5 flex items-center justify-center text-purple-300/70 pointer-events-none">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {error && <span className="text-xs text-red-400 pl-1">{error}</span>}
    </div>
  );
};
